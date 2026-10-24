import type { Language } from '../types/bible';
import { SUPPORTED_LANGUAGES } from '../types/bible';

export const QUIZ_KEY = 'twog:quiz:v1';
export type QuizVerse = { id: string; b: string; c: number; v: number; t: string };
export type Question = { id: string; options: string[] };
export type QuizProgress = {
  solved: Record<string, string>; attempts: number; recent: string[]; pending: Question | null;
};
export type QuizStore = { version: 1; languages: Partial<Record<Language, QuizProgress>> };
const idPattern = /^[A-Z0-9]{3}\.[1-9]\d{0,2}\.[1-9]\d{0,2}$/;
const chapterPattern = /^[A-Z0-9]{3}\.[1-9]\d{0,2}$/;
export const emptyProgress = (): QuizProgress => ({ solved: {}, attempts: 0, recent: [], pending: null });
export const emptyQuiz = (): QuizStore => ({ version: 1, languages: {} });
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

// Per-chapter bitmaps use stable references, so corpus reordering never moves progress.
function position(id: string) {
  const parts = id.split('.');
  return { chapter: parts.slice(0, 2).join('.'), bit: Number(parts[2]) - 1 };
}
export function isSolved(progress: QuizProgress, id: string): boolean {
  const { chapter, bit } = position(id);
  const bytes = atob(progress.solved[chapter] || '');
  return !!((bytes.charCodeAt(bit >> 3) || 0) & (1 << (bit & 7)));
}
export function solvedCount(progress: QuizProgress): number {
  let count = 0;
  for (const encoded of Object.values(progress.solved)) {
    for (const byte of atob(encoded)) {
      let n = byte.charCodeAt(0);
      while (n) { count++; n &= n - 1; }
    }
  }
  return count;
}
export function validateQuiz(value: unknown): QuizStore {
  const invalid = (): never => { throw new Error('invalid-quiz'); };
  if (!record(value) || value.version !== 1 || !record(value.languages)) return invalid();
  for (const [lang, p] of Object.entries(value.languages)) {
    if (!SUPPORTED_LANGUAGES.includes(lang as Language) || !record(p) || !record(p.solved)
      || typeof p.attempts !== 'number' || !Number.isSafeInteger(p.attempts) || p.attempts < 0
      || !Array.isArray(p.recent) || p.recent.length > 10
      || p.recent.some(id => typeof id !== 'string' || !idPattern.test(id))) return invalid();
    if (Object.keys(p.solved).length > 2000) return invalid();
    for (const [chapter, bits] of Object.entries(p.solved)) {
      if (!chapterPattern.test(chapter) || typeof bits !== 'string' || bits.length > 168
        || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(bits)) return invalid();
    }
    if (solvedCount(p as QuizProgress) > p.attempts) return invalid();
    if (p.pending !== null) {
      const q = p.pending;
      if (!record(q) || typeof q.id !== 'string' || !idPattern.test(q.id)
        || !Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options).size !== 4
        || !q.options.includes(q.id) || q.options.some(id => typeof id !== 'string' || !idPattern.test(id))
        || isSolved(p as QuizProgress, q.id)) return invalid();
    }
  }
  return value as QuizStore;
}
export function readQuiz(): QuizStore {
  const raw = localStorage.getItem(QUIZ_KEY);
  return raw ? validateQuiz(JSON.parse(raw)) : emptyQuiz();
}
export function saveQuiz(store: QuizStore): void {
  localStorage.setItem(QUIZ_KEY, JSON.stringify(validateQuiz(store)));
}
export function normalizeQuizText(text: string): string {
  return text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}
function shuffle<T>(items: T[], random: () => number): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
export function nextQuestion(rows: readonly QuizVerse[], progress: QuizProgress, random = Math.random): Question | null {
  // Canonical references, not source row IDs, define uniqueness.
  rows = [...new Map(rows.map(r => {
    const id = `${r.b}.${r.c}.${r.v}`;
    return [id, { ...r, id }] as const;
  })).values()];
  const byId = new Map(rows.map(r => [r.id, r]));
  const pending = progress.pending;
  if (pending && new Set(pending.options).size === 4 && byId.has(pending.id) && pending.options.every(id => byId.has(id))
    && pending.options.filter(id => normalizeQuizText(byId.get(id)!.t) === normalizeQuizText(byId.get(pending.id)!.t)).length === 1) return pending;
  const remaining = rows.filter(r => !isSolved(progress, r.id));
  if (!remaining.length) return null;
  const fresh = remaining.filter(r => !progress.recent.includes(r.id));
  // Endgame: prefer the least recently attempted verse; a sole remaining verse must repeat.
  const pool = fresh.length ? fresh : [...remaining].sort((a, b) => progress.recent.indexOf(a.id) - progress.recent.indexOf(b.id)).slice(0, 1);
  const chosen = pool[Math.floor(random() * pool.length)];
  const text = normalizeQuizText(chosen.t);
  const others = rows.filter(r => r.id !== chosen.id && normalizeQuizText(r.t) !== text);
  if (others.length < 3) throw new Error('quiz-corpus-too-small');
  const options = shuffle(others, random).slice(0, 3).map(r => r.id);
  return { id: chosen.id, options: shuffle([...options, chosen.id], random) };
}
export function answerQuestion(progress: QuizProgress, question: Question, selected: string): QuizProgress {
  if (!progress.pending || progress.pending.id !== question.id || !question.options.includes(selected)
    || progress.pending.options.join('|') !== question.options.join('|')) throw new Error('quiz-stale-question');
  const solved = { ...progress.solved };
  if (selected === question.id) {
    const { chapter, bit } = position(question.id);
    const bytes = Array.from(atob(solved[chapter] || ''), c => c.charCodeAt(0));
    while (bytes.length <= (bit >> 3)) bytes.push(0);
    bytes[bit >> 3] |= 1 << (bit & 7);
    solved[chapter] = btoa(String.fromCharCode(...bytes));
  }
  return { solved, attempts: progress.attempts + 1,
    recent: [...progress.recent.filter(id => id !== question.id), question.id].slice(-10), pending: null };
}
// Keep a complete best run per language: never union scores while losing their attempt counts.
export function mergeQuiz(current: QuizStore, imported: QuizStore): QuizStore {
  const languages = { ...current.languages };
  for (const lang of SUPPORTED_LANGUAGES) {
    const a = languages[lang], b = imported.languages[lang];
    if (b && (!a || solvedCount(b) > solvedCount(a)
      || (solvedCount(b) === solvedCount(a) && b.attempts > a.attempts))) languages[lang] = b;
  }
  return validateQuiz({ version: 1, languages });
}


/** Only the earned tier is exposed by the UI; completion follows the selected corpus. */
export function quizTier(level: number, total: number): number {
  if (total > 0 && level >= total) return 5;
  return level >= 20000 ? 4 : level >= 5000 ? 3 : level >= 500 ? 2 : level >= 100 ? 1 : 0;
}
export function resetQuizLanguage(store: QuizStore, language: Language): QuizStore {
  return { ...store, languages: { ...store.languages, [language]: emptyProgress() } };
}
