// src/services/bibleService.ts — version fichier unique JSONL (multi-langue) + compat warmup
import { BibleVerse, BibleChapter, Language } from '../types/bible';
import { bibleBooks } from '../data/bibleBooks';

type VerseRow = { id: string; b: string; c: number; v: number; t: string };

const versesCache = new Map<Language, VerseRow[]>();

type ChapIndex = Map<string, Map<number, [number, number]>>;
const indexCache = new Map<Language, ChapIndex>();

const codeToName: Record<string, string> = {
  GEN: 'Genesis',
  EXO: 'Exodus',
  LEV: 'Leviticus',
  NUM: 'Numbers',
  DEU: 'Deuteronomy',
  JOS: 'Joshua',
  JDG: 'Judges',
  RUT: 'Ruth',
  '1SA': '1Samuel',
  '2SA': '2Samuel',
  '1KI': '1Kings',
  '2KI': '2Kings',
  '1CH': '1Chronicles',
  '2CH': '2Chronicles',
  EZR: 'Ezra',
  NEH: 'Nehemiah',
  EST: 'Esther',
  JOB: 'Job',
  PSA: 'Psalms',
  PRO: 'Proverbs',
  ECC: 'Ecclesiastes',
  SOL: 'Song of songs',
  ISA: 'Isaiah',
  JER: 'Jeremiah',
  LAM: 'Lamentations',
  EZE: 'Ezekiel',
  DAN: 'Daniel',
  HOS: 'Hosea',
  JOE: 'Joel',
  AMO: 'Amos',
  OBA: 'Obadiah',
  JON: 'Jonah',
  MIC: 'Micah',
  NAH: 'Nahum',
  HAB: 'Habakkuk',
  ZEP: 'Zephaniah',
  HAG: 'Haggai',
  ZEC: 'Zechariah',
  MAL: 'Malachi',
  MAT: 'Matthew',
  MAR: 'Mark',
  LUK: 'Luke',
  JOH: 'John',
  ACT: 'Acts',
  ROM: 'Romans',
  '1CO': '1Corinthians',
  '2CO': '2Corinthians',
  GAL: 'Galatians',
  EPH: 'Ephesians',
  PHI: 'Philippians',
  COL: 'Colossians',
  '1TH': '1Thessalonians',
  '2TH': '2Thessalonians',
  '1TI': '1Timothy',
  '2TI': '2Timothy',
  TIT: 'Titus',
  PHM: 'Philemon',
  HEB: 'Hebrews',
  JAM: 'James',
  '1PE': '1Peter',
  '2PE': '2Peter',
  '1JO': '1John',
  '2JO': '2John',
  '3JO': '3John',
  JUD: 'Jude',
  REV: 'Revelation',
};

const nameToCode: Record<string, string> =
  Object.fromEntries(Object.entries(codeToName).map(([k, v]) => [v, k]));

function getBookReference(bookName: string, language: Language): string {
  const meta = bibleBooks.find(b => b.name === bookName);
  if (!meta) return bookName;
  return language === 'fr' ? meta.nameFr : meta.nameEn;
}

function normalizeLigatures(s: string) {
  return s.replace(/œ/g, 'oe').replace(/Œ/g, 'oe').replace(/æ/g, 'ae').replace(/Æ/g, 'ae');
}

function normalizeForSearch(s: string) {
  const noLig = normalizeLigatures(s);
  const deAccented = noLig.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return deAccented
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

/** Charge / indexe le fichier unique d'une langue (si pas déjà fait)
 *  IMPORTANT: ne doit pas "planter" l'app si réseau instable. */
async function ensureLoaded(language: Language): Promise<boolean> {
  if (versesCache.has(language) && indexCache.has(language)) return true;

  const url = `/data/bible/${language}/verses.jsonl`;

  try {
    // laisse le SW gérer (cache-first côté SW)
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return false;

    const txt = await res.text();
    const rows: VerseRow[] = txt
      .split(/\r?\n/)
      .filter(Boolean)
      .map(l => JSON.parse(l));

    versesCache.set(language, rows);

    const idx: ChapIndex = new Map();
    rows.forEach((r, i) => {
      let bookMap = idx.get(r.b);
      if (!bookMap) {
        bookMap = new Map();
        idx.set(r.b, bookMap);
      }
      const cur = bookMap.get(r.c);
      if (!cur) bookMap.set(r.c, [i, i + 1]);
      else cur[1] = i + 1;
    });
    indexCache.set(language, idx);

    return true;
  } catch {
    return false;
  }
}

export async function getRandomVerse(language: Language): Promise<BibleVerse> {
  const ok = await ensureLoaded(language);
  if (!ok) {
    // Fallback neutre, sans message d'erreur
    const isFr = language === 'fr';
    return {
      book: 'John',
      chapter: 3,
      verse: 16,
      text: isFr
        ? "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle."
        : 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
      reference: isFr ? 'Jean 3:16' : 'John 3:16',
    };
  }

  const rows = versesCache.get(language)!;
  const r = rows[Math.floor(Math.random() * rows.length)];
  const bookName = codeToName[r.b] ?? 'John';
  return {
    book: bookName,
    chapter: r.c,
    verse: r.v,
    text: r.t,
    reference: `${getBookReference(bookName, language)} ${r.c}:${r.v}`,
  };
}

export async function getChapter(
  bookName: string,
  chapter: number,
  language: Language
): Promise<BibleChapter> {
  const ok = await ensureLoaded(language);
  if (!ok) {
    // Silencieux : pas de "❌"
    return { book: bookName, chapter, verses: [] };
  }

  try {
    const rows = versesCache.get(language)!;
    const idx = indexCache.get(language)!;

    const code = nameToCode[bookName];
    if (!code) return { book: bookName, chapter, verses: [] };

    const bookMap = idx.get(code);
    if (!bookMap) return { book: bookName, chapter, verses: [] };

    const span = bookMap.get(chapter);
    if (!span) return { book: bookName, chapter, verses: [] };

    const [start, end] = span;
    const verses: BibleVerse[] = [];
    for (let i = start; i < end; i++) {
      const r = rows[i];
      if (r.c !== chapter) continue;
      verses.push({
        book: bookName,
        chapter,
        verse: r.v,
        text: r.t,
        reference: `${getBookReference(bookName, language)} ${chapter}:${r.v}`,
      });
    }
    return { book: bookName, chapter, verses };
  } catch {
    return { book: bookName, chapter, verses: [] };
  }
}

export async function searchInBible(
  searchTerm: string,
  language: Language
): Promise<BibleVerse[]> {
  const raw = searchTerm.trim();
  const fq = normalizeForSearch(raw);
  if (!fq) return [];

  const ok = await ensureLoaded(language);
  if (!ok) return [];

  const key = `twog:search:cache:${language}:${fq}`;
  try {
    const cached =
      typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(key) : null;
    if (cached) return JSON.parse(cached);
  } catch {}

  const rows = versesCache.get(language)!;
  const out: BibleVerse[] = [];
  for (const r of rows) {
    if (normalizeForSearch(r.t).includes(fq)) {
      const bookName = codeToName[r.b] ?? 'John';
      out.push({
        book: bookName,
        chapter: r.c,
        verse: r.v,
        text: r.t,
        reference: `${getBookReference(bookName, language)} ${r.c}:${r.v}`,
      });
    }
  }

  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(key, JSON.stringify(out));
    }
  } catch {}

  return out;
}

export function getBibleBooks() {
  return bibleBooks;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/* ============================== Warm-up cache ============================== */

type IdleDeadline = { timeRemaining: () => number };
type IdleCb = (deadline?: IdleDeadline) => void;

const idle = (cb: IdleCb) => {
  if (typeof window !== 'undefined' && (window as any).requestIdleCallback) {
    (window as any).requestIdleCallback(cb as any);
  } else {
    setTimeout(() => cb({ timeRemaining: () => 0 }), 250);
  }
};

let warmed: Partial<Record<Language, boolean>> = {};
let warmupEnabled = true;

export function pauseWarmup() {
  warmupEnabled = false;
}
export function resumeWarmup() {
  warmupEnabled = true;
}

export function warmBibleCache(language: Language) {
  if (warmed[language]) return;
  warmed[language] = true;
  idle(() => {
    if (!warmupEnabled) return;
    ensureLoaded(language).catch(() => {});
  });
}
