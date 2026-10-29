import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { createHash, randomInt } from 'node:crypto';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

export const TOTALS = JSON.parse(readFileSync(new URL('./corpus-totals.json', import.meta.url)));
export const points = (solved, attempts) => attempts ? solved * solved / attempts : 0;
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const randomCode = () => 'TW-' + Array.from({ length: 8 }, () => alphabet[randomInt(alphabet.length)]).join('');
const hash = token => createHash('sha256').update(token).digest('hex');
const order = 'points DESC, solved DESC, attempts ASC, code ASC';
const pageSize = 25;

export function openStore(path, generateCode = randomCode) {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS players(code TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS scores(code TEXT NOT NULL REFERENCES players(code) ON DELETE CASCADE,
      lang TEXT NOT NULL, solved INTEGER NOT NULL, attempts INTEGER NOT NULL, points REAL NOT NULL,
      updated_at TEXT NOT NULL, PRIMARY KEY(code, lang));
    CREATE INDEX IF NOT EXISTS ranking ON scores(lang, points DESC, solved DESC, attempts ASC, code ASC);`);
  const get = token => db.prepare('SELECT code FROM players WHERE token_hash=?').get(hash(token));
  const register = token => {
    const existing = get(token);
    if (existing) return existing;
    // UNIQUE constraints protect both the public code and retry token, including concurrent requests.
    for (let n = 0; n < 32; n++) {
      const code = generateCode();
      const r = db.prepare('INSERT OR IGNORE INTO players VALUES(?,?,?)').run(code, hash(token), new Date().toISOString());
      if (r.changes) return { code };
      const retried = get(token);
      if (retried) return retried;
    }
    throw new Error('code-generation-failed');
  };
  const submit = (code, body) => {
    const { lang, solved, attempts } = body ?? {};
    if (typeof lang !== 'string' || !Object.hasOwn(TOTALS, lang) || !Number.isSafeInteger(solved) || !Number.isSafeInteger(attempts)
      || solved < 0 || solved > TOTALS[lang] || attempts < solved || attempts > 100000000) throw Object.assign(new Error('invalid-score'), { status: 400 });
    if (!solved) return;
    db.prepare(`INSERT INTO scores VALUES(?,?,?,?,?,?) ON CONFLICT(code,lang) DO UPDATE SET
      solved=excluded.solved, attempts=excluded.attempts, points=excluded.points, updated_at=excluded.updated_at
      WHERE excluded.points > scores.points OR (excluded.points = scores.points AND excluded.solved > scores.solved)`)
      .run(code, lang, solved, attempts, points(solved, attempts), new Date().toISOString());
  };
  const board = (lang, code, view, requestedPage) => {
    if (typeof lang !== 'string' || !Object.hasOwn(TOTALS, lang)) throw Object.assign(new Error('invalid-language'), { status: 400 });
    const total = db.prepare('SELECT COUNT(*) AS n FROM scores WHERE lang=?').get(lang).n;
    const mine = code ? db.prepare('SELECT code, solved, attempts, points FROM scores WHERE lang=? AND code=?').get(lang, code) : null;
    const rank = mine ? 1 + db.prepare(`SELECT COUNT(*) AS n FROM scores WHERE lang=? AND
      (points > ? OR (points = ? AND solved > ?) OR (points = ? AND solved = ? AND attempts < ?)
       OR (points = ? AND solved = ? AND attempts = ? AND code < ?))`)
      .get(lang, mine.points, mine.points, mine.solved, mine.points, mine.solved, mine.attempts, mine.points, mine.solved, mine.attempts, code).n : null;
    const page = Math.min(Math.max(0, Math.ceil(total / pageSize) - 1), view === 'me' && rank ? Math.floor((rank - 1) / pageSize) : requestedPage);
    const rows = db.prepare(`SELECT code, solved, attempts, points FROM scores WHERE lang=? ORDER BY ${order} LIMIT ? OFFSET ?`)
      .all(lang, pageSize, page * pageSize).map((row, i) => ({ ...row, rank: page * pageSize + i + 1 }));
    return { lang, total, corpusTotal: TOTALS[lang], page, pageSize, myCode: code, myRank: rank, rows };
  };
  return { db, register, get, submit, board, remove: code => db.prepare('DELETE FROM players WHERE code=?').run(code), close: () => db.close() };
}

export function createApp(store, { origins = ['https://theword.fr', 'https://www.theword.fr'], rateLimit = true } = {}) {
  const limits = new Map();
  function allow(key, max) {
    const now = Date.now();
    if (limits.size > 5000) for (const [k, entry] of limits) if (entry.until <= now) limits.delete(k);
    let entry = limits.get(key);
    if (!entry || entry.until <= now) {
      if (limits.size >= 10000) return false;
      entry = { count: 0, until: now + 60000 }; limits.set(key, entry);
    }
    return ++entry.count <= max;
  }
  return createServer(async (req, res) => {
    const origin = req.headers.origin;
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Vary', 'Origin');
    if (origin && !origins.includes(origin)) { res.writeHead(403); res.end(); return; }
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    const send = (status, body) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(body)); };
    try {
      const url = new URL(req.url, 'http://localhost');
      if (req.method === 'GET' && url.pathname === '/health') { store.db.prepare('SELECT 1').get(); return send(200, { ok: true, version: 1 }); }
      // Railway's edge supplies the client IP; keep only a volatile hash for abuse limits.
      const ip = hash(String(req.headers['x-real-ip'] || req.socket.remoteAddress || 'unknown'));
      if (rateLimit && !allow('ip:' + ip, 300)) { res.setHeader('Retry-After', '60'); return send(429, { error: 'rate-limit' }); }
      const bearer = /^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization || '');
      const token = bearer?.[1];
      if (req.method === 'POST' && url.pathname === '/v1/players') {
        if (!token) return send(401, { error: 'unauthorized' });
        if (!store.get(token) && rateLimit && !allow('register:' + ip, 10)) return send(429, { error: 'rate-limit' });
        return send(200, store.register(token));
      }
      const player = token ? store.get(token) : null;
      if (req.method === 'GET' && url.pathname === '/v1/leaderboard') {
        if (token && !player) return send(401, { error: 'unauthorized' });
        const page = Number(url.searchParams.get('page') || 0);
        if (!Number.isSafeInteger(page) || page < 0 || page > 1000000) return send(400, { error: 'invalid-page' });
        return send(200, store.board(url.searchParams.get('lang') || 'fr', player?.code ?? null, url.searchParams.get('view'), page));
      }
      if (!player) return send(401, { error: 'unauthorized' });
      if (rateLimit && !allow('player:' + player.code, 120)) return send(429, { error: 'rate-limit' });
      if (req.method === 'POST' && url.pathname === '/v1/scores') {
        if (!req.headers['content-type']?.startsWith('application/json')) return send(415, { error: 'json-required' });
        if (Number(req.headers['content-length']) > 1024) return send(413, { error: 'body-too-large' });
        let body = ''; let size = 0;
        for await (const chunk of req) { size += chunk.length; if (size > 1024) { send(413, { error: 'body-too-large' }); req.destroy(); return; } body += chunk; }
        let data; try { data = JSON.parse(body); } catch { return send(400, { error: 'invalid-json' }); }
        store.submit(player.code, data);
        return send(200, { ok: true });
      }
      if (req.method === 'DELETE' && url.pathname === '/v1/player') { store.remove(player.code); return send(200, { ok: true }); }
      return send(404, { error: 'not-found' });
    } catch (error) { send(error.status || 500, { error: error.status ? error.message : 'server-error' }); }
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dbPath = process.env.DB_PATH || '/data/quiz.sqlite';
  if (process.env.RAILWAY_ENVIRONMENT_ID && !process.env.RAILWAY_VOLUME_MOUNT_PATH) throw new Error('Persistent volume required');
  const store = openStore(dbPath);
  const app = createApp(store);
  app.requestTimeout = 10000; app.headersTimeout = 10000;
  app.listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => console.log('TheWord quiz leaderboard listening'));
  for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => app.close(() => { store.close(); process.exit(0); }));
}
