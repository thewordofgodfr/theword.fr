import type { Language } from '../types/bible';
import { QUIZ_CONSENT_VERSION, hasQuizConsent, PLAYER_KEY, readPlayer, savePlayer, betterScore, type QuizPlayer } from './quizPlayer';
export const LEADERBOARD_API = 'https://quiz-leaderboard-production-a676.up.railway.app';
export type RankingRow = { code: string; rank: number; solved: number; attempts: number; points: number };
export type RankingPage = { lang: string; total: number; corpusTotal: number; page: number; pageSize: number; myCode: string | null; myRank: number | null; rows: RankingRow[] };
async function request(path: string, token: string, method = 'GET', data?: unknown) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(LEADERBOARD_API + path, { method, signal: controller.signal, cache: 'no-store', credentials: 'omit',
      headers: { Authorization: `Bearer ${token}`, ...(data === undefined ? {} : { 'Content-Type': 'application/json' }) },
      ...(data === undefined ? {} : { body: JSON.stringify(data) }) });
    if (!response.ok) {
      if (method !== 'DELETE' && (response.status === 401 || response.status === 428)) {
        const p = readPlayer();
        if (p?.token === token) savePlayer({ ...p, consentVersion: undefined });
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('twog:quiz:consent-required'));
      }
      throw new Error(`leaderboard-${response.status}`);
    }
    return await response.json();
  } finally { clearTimeout(timeout); }
}
let registration: Promise<QuizPlayer> | null = null;
export function joinRanking(language: Language): Promise<QuizPlayer> {
  if (registration) return registration;
  const register = async () => {
    let p = readPlayer();
    if (!p) {
      const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('');
      p = { version: 1, token, code: null, pending: {} };
      // Persist before the request: network retries reuse the same secret and cannot create another player.
      savePlayer(p);
    }
    const result = await request('/v1/players', p.token, 'POST', { version: QUIZ_CONSENT_VERSION, accepted: true, adult: true, language });
    if (typeof result.code !== 'string' || !/^TW-[A-HJ-NP-Z2-9]{8}$/.test(result.code)) throw new Error('invalid-code');
    const current = readPlayer();
    if (!current || current.token !== p.token) throw new Error('identity-changed');
    const player = { ...current, code: result.code, consentVersion: QUIZ_CONSENT_VERSION };
    savePlayer(player); return player;
  };
  registration = (navigator.locks ? navigator.locks.request('theword-quiz-player', register) : register()).finally(() => { registration = null; });
  return registration;
}
export async function ensurePlayer(): Promise<QuizPlayer> {
  const p = readPlayer();
  if (!p || !hasQuizConsent(p)) throw new Error('consent-required');
  const result = await request('/v1/player', p.token);
  if (result.consentVersion !== QUIZ_CONSENT_VERSION || result.code !== p.code) throw new Error('invalid-player');
  return p;
}
let syncing: Promise<void> | null = null;
export function syncScores(): Promise<void> {
  if (syncing) return syncing;
  syncing = (async () => {
    if (!hasQuizConsent(readPlayer())) return;
    const player = await ensurePlayer();
    for (;;) {
      const current = readPlayer();
      if (!current || current.token !== player.token) return;
      const entry = Object.entries(current.pending)[0];
      if (!entry) return;
      const [lang, sent] = entry;
      await request('/v1/scores', player.token, 'POST', { lang, ...sent });
      const latest = readPlayer();
      if (!latest || latest.token !== player.token) return;
      const queued = latest.pending[lang as Language];
      // An answer may have arrived during the request. Never discard a newer, better result.
      if (queued && !betterScore(queued, sent)) {
        const pending = { ...latest.pending }; delete pending[lang as Language]; savePlayer({ ...latest, pending });
      }
    }
  })().finally(() => { syncing = null; });
  return syncing;
}
export async function loadRanking(lang: Language, view: 'me' | 'page', page = 0): Promise<RankingPage> {
  const player = await ensurePlayer();
  return request(`/v1/leaderboard?lang=${lang}&view=${view}&page=${page}`, player.token);
}
export async function leaveRanking(): Promise<void> {
  // Finish any queued publication before deletion, so it cannot recreate a deleted score.
  try { await syncing; } catch { /* deletion is still useful after a failed upload */ }
  const p = readPlayer();
  if (!p) return;
  try { await request('/v1/player', p.token, 'DELETE'); } catch (error) {
    if (!(error instanceof Error) || error.message !== 'leaderboard-401') throw error;
  }
  if (readPlayer()?.token === p.token) localStorage.removeItem(PLAYER_KEY);
}
