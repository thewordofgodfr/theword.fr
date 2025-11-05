// src/services/collectionsService.ts
// Gestion des listes de versets dans localStorage
// API utilisée par Notes.tsx & Reading.tsx

import type { VerseList, VerseRef } from '../types/collections';

const LS_KEY = 'twog:collections:v1';

/* ---------- utils stockage ---------- */
function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}
function readAll(): VerseList[] {
  try { return safeParse<VerseList[]>(localStorage.getItem(LS_KEY), []); } catch { return []; }
}
function writeAll(all: VerseList[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(all)); } catch {}
}
function makeId() {
  return 'l_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}
// IMPORTANT : on utilise bookId (pas book)
function makeKey(v: VerseRef) {
  return `${v.bookId}|${v.chapter}|${v.verse}`;
}

/* ---------- API LISTES ---------- */
export function getAllLists(): VerseList[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}
export function getListById(id: string): VerseList | null {
  return readAll().find(l => l.id === id) ?? null;
}
export function createList(title: string): VerseList {
  const now = Date.now();
  const list: VerseList = { id: makeId(), title: title?.trim() || 'Nouvelle liste', createdAt: now, updatedAt: now, items: [] };
  const all = readAll();
  all.unshift(list);
  writeAll(all);
  return list;
}
export function renameList(id: string, newTitle: string): VerseList | null {
  const all = readAll();
  const i = all.findIndex(l => l.id === id);
  if (i < 0) return null;
  all[i] = { ...all[i], title: newTitle?.trim() || all[i].title, updatedAt: Date.now() };
  writeAll(all);
  return all[i];
}
export function deleteList(id: string): boolean {
  const all = readAll();
  const next = all.filter(l => l.id !== id);
  writeAll(next);
  return next.length !== all.length;
}

/* ---------- API ÉLÉMENTS ---------- */
export function addVerseToList(id: string, v: VerseRef): VerseList | null {
  const all = readAll();
  const i = all.findIndex(l => l.id === id);
  if (i < 0) return null;

  const present = new Set(all[i].items.map(x => makeKey(x)));
  const key = makeKey(v);
  if (!present.has(key)) {
    all[i].items.push(v);
    all[i].updatedAt = Date.now();
    writeAll(all);
  }
  return all[i];
}
export function addVersesToList(id: string, verses: VerseRef[]): VerseList | null {
  const all = readAll();
  const i = all.findIndex(l => l.id === id);
  if (i < 0) return null;

  const present = new Set(all[i].items.map(x => makeKey(x)));
  let added = 0;
  for (const v of verses) {
    const key = makeKey(v);
    if (!present.has(key)) { all[i].items.push(v); present.add(key); added++; }
  }
  if (added > 0) { all[i].updatedAt = Date.now(); writeAll(all); }
  return all[i];
}
/** Supprime un verset par son index dans la liste */
export function removeVerseAt(id: string, index: number): VerseList | null {
  const all = readAll();
  const i = all.findIndex(l => l.id === id);
  if (i < 0) return null;
  if (index >= 0 && index < all[i].items.length) {
    all[i].items.splice(index, 1);
    all[i].updatedAt = Date.now();
    writeAll(all);
  }
  return all[i];
}

/* ---------- export / partage ---------- */
type ExportOptions = { header?: boolean; includeRef?: boolean; linePrefix?: string; };
export function exportListAsText(list: VerseList, opts: ExportOptions = {}): string {
  const { header = true, includeRef = true, linePrefix = '' } = opts;
  const lines: string[] = [];
  if (header) {
    const date = new Date(list.updatedAt).toLocaleString();
    lines.push(`${list.title} — ${date}`);
    lines.push('');
  }
  for (const it of list.items) {
    const ref = `${it.bookName ?? it.bookId} ${it.chapter}:${it.verse}`;
    const text = it.text ?? '';
    lines.push(linePrefix + (includeRef ? `${ref} — ${text}` : text));
  }
  return lines.join('\n');
}
export async function shareList(list: VerseList): Promise<void> {
  const text = exportListAsText(list, { header: true, includeRef: true });
  try {
    const nav: any = navigator;
    if (nav?.share) { await nav.share({ title: list.title, text }); return; }
  } catch {}
  try { await navigator.clipboard.writeText(text); } catch {}
}

