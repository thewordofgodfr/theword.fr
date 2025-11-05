// src/services/collectionsService.ts
// Stocke des listes de versets en localStorage (simple et robuste)

export type VerseInput = {
  book: string;
  chapter: number;
  verse: number;
  text?: string;
};

export type CollectionItem = {
  key: string;            // book|chapter|verse
  book: string;
  chapter: number;
  verse: number;
  text?: string;
};

export type Collection = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  items: CollectionItem[];
};

const LS_KEY = 'twog:collections:v1';

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}
function readAll(): Collection[] {
  try { return safeParse<Collection[]>(localStorage.getItem(LS_KEY), []); } catch { return []; }
}
function writeAll(all: Collection[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(all)); } catch {}
}

function makeId() { return 'c_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8); }
function makeKey(v: VerseInput) { return `${v.book}|${v.chapter}|${v.verse}`; }

/** Liste triée (récent d’abord) */
export function listCollections(): Collection[] { return readAll().sort((a,b)=>b.updatedAt-a.updatedAt); }

export function getCollection(id: string): Collection | null {
  return readAll().find(c => c.id === id) ?? null;
}

export function createCollection(name: string): Collection {
  const now = Date.now();
  const c: Collection = { id: makeId(), name: name?.trim() || 'Nouvelle liste', createdAt: now, updatedAt: now, items: [] };
  const all = readAll(); all.unshift(c); writeAll(all); return c;
}

export function renameCollection(id: string, newName: string): Collection | null {
  const all = readAll(); const i = all.findIndex(c => c.id === id); if (i < 0) return null;
  all[i] = { ...all[i], name: newName?.trim() || all[i].name, updatedAt: Date.now() }; writeAll(all); return all[i];
}

export function deleteCollection(id: string): boolean {
  const all = readAll(); const next = all.filter(c => c.id !== id); writeAll(next); return next.length !== all.length;
}

export function addVerse(id: string, v: VerseInput): Collection | null {
  const all = readAll(); const i = all.findIndex(c => c.id === id); if (i < 0) return null;
  const key = makeKey(v);
  if (!all[i].items.some(it => it.key === key)) {
    all[i].items.push({ key, book: v.book, chapter: v.chapter, verse: v.verse, text: v.text });
  }
  all[i].updatedAt = Date.now(); writeAll(all); return all[i];
}

export function addVerses(id: string, verses: VerseInput[]): Collection | null {
  const all = readAll(); const i = all.findIndex(c => c.id === id); if (i < 0) return null;
  const present = new Set(all[i].items.map(it => it.key));
  for (const v of verses) {
    const key = makeKey(v);
    if (!present.has(key)) { all[i].items.push({ key, book: v.book, chapter: v.chapter, verse: v.verse, text: v.text }); present.add(key); }
  }
  all[i].updatedAt = Date.now(); writeAll(all); return all[i];
}

export function removeItem(id: string, itemKey: string): Collection | null {
  const all = readAll(); const i = all.findIndex(c => c.id === id); if (i < 0) return null;
  all[i].items = all[i].items.filter(it => it.key !== itemKey);
  all[i].updatedAt = Date.now(); writeAll(all); return all[i];
}

