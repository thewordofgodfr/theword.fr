import { SUPPORTED_LANGUAGES, type Language } from '../types/bible';
export const PLAYER_KEY = 'twog:quiz:player:v1';
export type ScoreSnapshot = { solved: number; attempts: number };
export type QuizPlayer = { version: 1; token: string; code: string | null; pending: Partial<Record<Language, ScoreSnapshot>> };
export const rankingPoints = (s: ScoreSnapshot) => s.attempts ? s.solved * s.solved / s.attempts : 0;
export const betterScore = (a: ScoreSnapshot, b: ScoreSnapshot) => rankingPoints(a) > rankingPoints(b)
  || (rankingPoints(a) === rankingPoints(b) && a.solved > b.solved);
export function validatePlayer(value: unknown): QuizPlayer {
  const p = value as QuizPlayer;
  if (!p || p.version !== 1 || typeof p.token !== 'string' || !/^[a-f0-9]{64}$/.test(p.token)
    || (p.code !== null && (typeof p.code !== 'string' || !/^TW-[A-HJ-NP-Z2-9]{8}$/.test(p.code)))
    || !p.pending || typeof p.pending !== 'object' || Array.isArray(p.pending)) throw new Error('invalid-quiz-player');
  for (const [lang, s] of Object.entries(p.pending)) {
    if (!SUPPORTED_LANGUAGES.includes(lang as Language) || !s || !Number.isSafeInteger(s.solved)
      || !Number.isSafeInteger(s.attempts) || s.solved < 0 || s.solved > 50000
      || s.attempts < s.solved || s.attempts > 100000000) throw new Error('invalid-quiz-player');
  }
  return { version: 1, token: p.token, code: p.code, pending: p.pending };
}
export function readPlayer(): QuizPlayer | null {
  const raw = localStorage.getItem(PLAYER_KEY);
  return raw ? validatePlayer(JSON.parse(raw)) : null;
}
export const savePlayer = (p: QuizPlayer) => localStorage.setItem(PLAYER_KEY, JSON.stringify(validatePlayer(p)));
/** Capture the best offline result before a later wrong answer or reset can reduce it. */
export function queueScore(lang: Language, score: ScoreSnapshot): void {
  const p = readPlayer();
  if (!p || !score.solved) return;
  const old = p.pending[lang];
  if (!old || betterScore(score, old)) savePlayer({ ...p, pending: { ...p.pending, [lang]: score } });
}
