// src/services/collectionsService.ts
// Gestion des listes de versets dans localStorage
// API utilisée par Notes.tsx & Reading.tsx

import type { VerseList, VerseRef } from '../types/collections';

const LS_KEY = 'twog:collections:v1';
const TEXT_SENTINEL = '__TEXT__'; // pour blocs de texte libres

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
  const list: VerseList = {
    id: makeId(),
    title: title?.trim() || 'Nouvelle liste',
    createdAt: now,
    updatedAt: now,
    items: [],
  };
  const all = readAll();
  all.unshift(list);
  writeAll(all);
  return list;
}
export function renameList(id: string, newTitle: string): VerseList | null {
  const all = readAll();
  const i = all.findIndex(l => l.id === id);
  if (i < 0) return null;
  all[i] = {
    ...all[i],
    title: newTitle?.trim() || all[i].title,
    updatedAt: Date.now(),
  };
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
    if (!present.has(key)) {
      all[i].items.push(v);
      present.add(key);
      added++;
    }
  }
  if (added > 0) {
    all[i].updatedAt = Date.now();
    writeAll(all);
  }
  return all[i];
}
/** Supprime un élément par son index dans la liste */
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

/** Remplace entièrement les items d'une liste (utilisé par Notes pour réordonner/supprimer/ajouter des blocs texte). */
export function setListItems(id: string, items: VerseRef[]): VerseList | null {
  const all = readAll();
  const i = all.findIndex(l => l.id === id);
  if (i < 0) return null;
  all[i] = {
    ...all[i],
    items: Array.isArray(items) ? items : [],
    updatedAt: Date.now(),
  };
  writeAll(all);
  return all[i];
}

/** Déplace un item d'un index à un autre (optionnel, pratique si tu préfères l'appeler depuis l'UI). */
export function moveItemInList(id: string, from: number, to: number): VerseList | null {
  const all = readAll();
  const i = all.findIndex(l => l.id === id);
  if (i < 0) return null;

  const arr = [...all[i].items];
  const src = Math.max(0, Math.min(arr.length - 1, from));
  const dst = Math.max(0, Math.min(arr.length - 1, to));
  if (src === dst) return all[i];

  const [moved] = arr.splice(src, 1);
  arr.splice(dst, 0, moved);

  all[i].items = arr;
  all[i].updatedAt = Date.now();
  writeAll(all);
  return all[i];
}

/* ---------- export / partage texte ---------- */
type ExportOptions = { header?: boolean; includeRef?: boolean; linePrefix?: string };
export function exportListAsText(list: VerseList, opts: ExportOptions = {}): string {
  const { header = true, includeRef = true, linePrefix = '' } = opts;
  const lines: string[] = [];
  if (header) {
    const date = new Date(list.updatedAt).toLocaleString();
    lines.push(`${list.title} — ${date}`);
    lines.push('');
  }
  for (const it of list.items) {
    const isText = it.bookId === TEXT_SENTINEL;
    const text = (it.text ?? '').toString();

    if (isText) {
      // Bloc de texte libre : pas de référence
      lines.push(linePrefix + text);
      continue;
    }

    const ref = `${it.bookName ?? it.bookId} ${it.chapter}:${it.verse}`.trim();
    if (includeRef && ref) lines.push(linePrefix + ref);
    if (it.text && String(it.text).trim()) lines.push(linePrefix + String(it.text).trim());
  }
  return lines.join('\n');
}
export async function shareList(list: VerseList): Promise<void> {
  const text = exportListAsText(list, { header: true, includeRef: true });
  try {
    const nav: any = navigator;
    if (nav?.share) {
      await nav.share({ title: list.title, text });
      return;
    }
  } catch {}
  try { await navigator.clipboard.writeText(text); } catch {}
}

/* ---------- export / import par CODE (base64) ---------- */

// Helpers UTF-8 <-> base64
function utf8ToB64(str: string): string {
  // unescape/escape : OK pour usage navigateur simple
  return btoa(unescape(encodeURIComponent(str)));
}
function b64ToUtf8(b64: string): string {
  return decodeURIComponent(escape(atob(b64)));
}

/**
 * Construit un "code" portable (base64) pour une liste :
 * - titre
 * - items (versets + blocs texte)
 * - métadonnées minimales
 */
export function exportListAsCode(list: VerseList): string {
  const payload = {
    v: 1,                       // version du format
    title: list.title || 'Liste',
    items: list.items || [],    // VerseRef[] (inclut TEXT_SENTINEL)
    ts: Date.now(),
    app: 'TheWord',
    kind: 'notes',              // type logique (notes / études, etc.)
  };
  const json = JSON.stringify(payload);
  return 'TWOG1:' + utf8ToB64(json);
}

/**
 * Importe un code et crée une nouvelle liste locale.
 * Retourne la liste créée, ou null si code invalide.
 */
export function importListFromCode(code: string): VerseList | null {
  try {
    let raw = (code || '').trim();
    if (raw.startsWith('TWOG1:')) raw = raw.slice(6);
    if (!raw) return null;

    const json = b64ToUtf8(raw);
    const data = JSON.parse(json);

    if (!data || data.v !== 1 || !Array.isArray(data.items)) return null;

    const now = Date.now();
    const newList: VerseList = {
      id: makeId(),
      title: String(data.title || 'Import'),
      createdAt: now,
      updatedAt: now,
      items: data.items as VerseRef[],
    };

    const all = readAll();
    all.unshift(newList);
    writeAll(all);
    return newList;
  } catch (e) {
    console.error('importListFromCode error', e);
    return null;
  }
}
