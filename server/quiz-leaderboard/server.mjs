import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { createHash, randomInt } from 'node:crypto';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

export const TOTALS = JSON.parse(readFileSync(new URL('./corpus-totals.json', import.meta.url)));
export const CONSENT_VERSION = '2026-10-29.1';
export function retentionCutoff(now) {
  const date = new Date(now);
  const day = date.getUTCDate();
  date.setUTCDate(1); date.setUTCMonth(date.getUTCMonth() - 24);
  const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, last));
  return date.toISOString();
}
export const points = (solved, attempts) => attempts ? solved * solved / attempts : 0;
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const randomCode = () => 'TW-' + Array.from({ length: 8 }, () => alphabet[randomInt(alphabet.length)]).join('');
const hash = token => createHash('sha256').update(token).digest('hex');
const order = 'points DESC, solved DESC, attempts ASC, code ASC';
const pageSize = 25;

export function openStore(path, generateCode = randomCode, clock = () => new Date()) {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`PRAGMA secure_delete=ON; PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS players(code TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS scores(code TEXT NOT NULL REFERENCES players(code) ON DELETE CASCADE,
      lang TEXT NOT NULL, solved INTEGER NOT NULL, attempts INTEGER NOT NULL, points REAL NOT NULL,
      updated_at TEXT NOT NULL, PRIMARY KEY(code, lang));
    CREATE INDEX IF NOT EXISTS ranking ON scores(lang, points DESC, solved DESC, attempts ASC, code ASC);`);
  // Idempotent migration preserves existing codes/scores, but hides them until renewed consent.
  if (!db.prepare('PRAGMA table_info(players)').all().some(c => c.name === 'last_active_at')) db.exec('ALTER TABLE players ADD COLUMN last_active_at TEXT');
  db.exec(`UPDATE players SET last_active_at=MAX(created_at, COALESCE((SELECT MAX(updated_at) FROM scores WHERE scores.code=players.code),created_at)) WHERE last_active_at IS NULL;
    CREATE INDEX IF NOT EXISTS player_activity ON players(last_active_at);
    CREATE TABLE IF NOT EXISTS player_consents(code TEXT PRIMARY KEY REFERENCES players(code) ON DELETE CASCADE,
      version TEXT NOT NULL, accepted_at TEXT NOT NULL, language TEXT NOT NULL, adult_confirmed INTEGER NOT NULL CHECK(adult_confirmed=1));`);
  const purge = () => db.prepare('DELETE FROM players WHERE last_active_at <= ?').run(retentionCutoff(clock())).changes;
  purge();
  const get = token => db.prepare('SELECT code FROM players WHERE token_hash=? AND last_active_at > ?').get(hash(token), retentionCutoff(clock()));
  const consented = code => !!db.prepare('SELECT 1 FROM player_consents WHERE code=? AND version=? AND adult_confirmed=1').get(code, CONSENT_VERSION);
  const touch = code => db.prepare('UPDATE players SET last_active_at=? WHERE code=?').run(clock().toISOString(), code);
  const register = (token, consent) => {
    if (consent?.version !== CONSENT_VERSION || consent?.accepted !== true || consent?.adult !== true
      || typeof consent.language !== 'string' || !Object.hasOwn(TOTALS, consent.language)) throw Object.assign(new Error('consent-required'), { status: 428 });
    purge();
    const now = clock().toISOString();
    db.exec('BEGIN IMMEDIATE');
    try {
      let player = get(token);
      for (let n = 0; !player && n < 32; n++) {
        const code = generateCode();
        const r = db.prepare('INSERT OR IGNORE INTO players(code,token_hash,created_at,last_active_at) VALUES(?,?,?,?)').run(code, hash(token), now, now);
        player = r.changes ? { code } : get(token);
      }
      if (!player) throw new Error('code-generation-failed');
      db.prepare(`INSERT INTO player_consents VALUES(?,?,?,?,1) ON CONFLICT(code) DO UPDATE SET
        version=excluded.version, accepted_at=excluded.accepted_at, language=excluded.language, adult_confirmed=1
        WHERE player_consents.version != excluded.version`).run(player.code, CONSENT_VERSION, now, consent.language);
      touch(player.code); db.exec('COMMIT'); return player;
    } catch (e) { db.exec('ROLLBACK'); throw e; }
  };
  const visibility = () => `code IN (SELECT p.code FROM players p JOIN player_consents c ON p.code=c.code
    WHERE c.version='${CONSENT_VERSION}' AND c.adult_confirmed=1 AND p.last_active_at>'${retentionCutoff(clock())}')`;
  const submit = (code, body) => {
    const { lang, solved, attempts } = body ?? {};
    if (typeof lang !== 'string' || !Object.hasOwn(TOTALS, lang) || !Number.isSafeInteger(solved) || !Number.isSafeInteger(attempts)
      || solved < 0 || solved > TOTALS[lang] || attempts < solved || attempts > 100000000) throw Object.assign(new Error('invalid-score'), { status: 400 });
    if (!consented(code)) throw Object.assign(new Error('consent-required'), { status: 428 });
    touch(code);
    if (!solved) return;
    db.prepare(`INSERT INTO scores VALUES(?,?,?,?,?,?) ON CONFLICT(code,lang) DO UPDATE SET
      solved=excluded.solved, attempts=excluded.attempts, points=excluded.points, updated_at=excluded.updated_at
      WHERE excluded.points > scores.points OR (excluded.points = scores.points AND excluded.solved > scores.solved)`)
      .run(code, lang, solved, attempts, points(solved, attempts), clock().toISOString());
  };
  const board = (lang, code, view, requestedPage) => {
    if (typeof lang !== 'string' || !Object.hasOwn(TOTALS, lang)) throw Object.assign(new Error('invalid-language'), { status: 400 });
    const total = db.prepare(`SELECT COUNT(*) AS n FROM scores WHERE lang=? AND ${visibility()}`).get(lang).n;
    const mine = code ? db.prepare(`SELECT code, solved, attempts, points FROM scores WHERE lang=? AND code=? AND ${visibility()}`).get(lang, code) : null;
    const rank = mine ? 1 + db.prepare(`SELECT COUNT(*) AS n FROM scores WHERE lang=? AND ${visibility()} AND
      (points > ? OR (points = ? AND solved > ?) OR (points = ? AND solved = ? AND attempts < ?)
       OR (points = ? AND solved = ? AND attempts = ? AND code < ?))`)
      .get(lang, mine.points, mine.points, mine.solved, mine.points, mine.solved, mine.attempts, mine.points, mine.solved, mine.attempts, code).n : null;
    const page = Math.min(Math.max(0, Math.ceil(total / pageSize) - 1), view === 'me' && rank ? Math.floor((rank - 1) / pageSize) : requestedPage);
    const rows = db.prepare(`SELECT code, solved, attempts, points FROM scores WHERE lang=? AND ${visibility()} ORDER BY ${order} LIMIT ? OFFSET ?`)
      .all(lang, pageSize, page * pageSize).map((row, i) => ({ ...row, rank: page * pageSize + i + 1 }));
    return { lang, total, corpusTotal: TOTALS[lang], page, pageSize, myCode: code, myRank: rank, rows };
  };
  return { db, register, get, submit, board, purge, consented, touch, remove: code => db.prepare('DELETE FROM players WHERE code=?').run(code), close: () => db.close() };
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
  async function json(req) {
    if (!req.headers['content-type']?.startsWith('application/json')) throw Object.assign(new Error('json-required'), { status: 415 });
    if (Number(req.headers['content-length']) > 1024) throw Object.assign(new Error('body-too-large'), { status: 413 });
    let body = ''; let size = 0;
    for await (const chunk of req) { size += chunk.length; if (size > 1024) throw Object.assign(new Error('body-too-large'), { status: 413 }); body += chunk; }
    try { return JSON.parse(body); } catch { throw Object.assign(new Error('invalid-json'), { status: 400 }); }
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
      if (req.method === 'GET' && url.pathname === '/health') { store.db.prepare('SELECT 1').get(); return send(200, { ok: true, version: 2, consentVersion: CONSENT_VERSION }); }
      // Railway's edge supplies the client IP; keep only a volatile hash for abuse limits.
      const ip = hash(String(req.headers['x-real-ip'] || req.socket.remoteAddress || 'unknown'));
      if (rateLimit && !allow('ip:' + ip, 300)) { res.setHeader('Retry-After', '60'); return send(429, { error: 'rate-limit' }); }
      const bearer = /^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization || '');
      const token = bearer?.[1];
      if (req.method === 'POST' && url.pathname === '/v1/players') {
        if (!token) return send(401, { error: 'unauthorized' });
        if (!store.get(token) && rateLimit && !allow('register:' + ip, 10)) return send(429, { error: 'rate-limit' });
        if (!req.headers['content-type']) return send(428, { error: 'consent-required' });
        return send(200, store.register(token, await json(req)));
      }
      const player = token ? store.get(token) : null;
      if (player && req.method === 'DELETE' && url.pathname === '/v1/player') { store.remove(player.code); return send(200, { ok: true }); }
      if (player && !store.consented(player.code)) return send(428, { error: 'consent-required' });
      if (player && req.method === 'GET' && url.pathname === '/v1/player') { store.touch(player.code); return send(200, { code: player.code, consentVersion: CONSENT_VERSION }); }
      if (req.method === 'GET' && url.pathname === '/v1/leaderboard') {
        if (token && !player) return send(401, { error: 'unauthorized' });
        const page = Number(url.searchParams.get('page') || 0);
        if (!Number.isSafeInteger(page) || page < 0 || page > 1000000) return send(400, { error: 'invalid-page' });
        return send(200, store.board(url.searchParams.get('lang') || 'fr', player?.code ?? null, url.searchParams.get('view'), page));
      }
      if (!player) return send(401, { error: 'unauthorized' });
      if (rateLimit && !allow('player:' + player.code, 120)) return send(429, { error: 'rate-limit' });
      if (req.method === 'POST' && url.pathname === '/v1/scores') {
        store.submit(player.code, await json(req));
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
  // Hourly sweep, including when no one is playing; startup and queries also enforce expiry.
  const cleanup = setInterval(() => { try { store.purge(); } catch { console.error('Quiz retention sweep failed'); } }, 60 * 60 * 1000);
  cleanup.unref();
  app.requestTimeout = 10000; app.headersTimeout = 10000;
  app.listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => console.log('TheWord quiz leaderboard listening'));
  for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => app.close(() => { store.close(); process.exit(0); }));
}
