// src/services/collectionsService.ts
import type { VerseList, VerseRef } from '../types/collections';

const STORAGE_KEY = 'tw_collections_v1';

type CollectionsStore = {
  lists: VerseList[];
};

function readStore(): CollectionsStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lists: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.lists)) return { lists: [] };
    return { lists: parsed.lists as VerseList[] };
  } catch {
    return { lists: [] };
  }
}

function writeStore(store: CollectionsStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // silencieux
  }
}

function uuid(): string {
  // Prend crypto.randomUUID si dispo, sinon fallback
  try {
    // @ts-ignore
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      // @ts-ignore
      return crypto.randomUUID();
    }
  } catch {}
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/** Retourne toutes les listes (triées par updatedAt desc) */
export function getAllLists(): VerseList[] {
  const { lists } = readStore();
  return [...lists].sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Crée une nouvelle liste */
export function createList(title: string): VerseList {
  const store = readStore();
  const now = Date.now();
  const list: VerseList = {
    id: uuid(),
    title: title?.trim() || 'Nouvelle liste',
    createdAt: now,
    updatedAt: now,
    items: [],
  };
  store.lists.push(list);
  writeStore(store);
  return list;
}

/** Renomme une liste */
export function renameList(listId: string, title: string): VerseList | null {
  const store = readStore();
  const list = store.lists.find(l => l.id === listId);
  if (!list) return null;
  list.title = title?.trim() || list.title;
  list.updatedAt = Date.now();
  writeStore(store);
  return list;
}

/** Supprime une liste */
export function deleteList(listId: string): boolean {
  const store = readStore();
  const before = store.lists.length;
  store.lists = store.lists.filter(l => l.id !== listId);
  writeStore(store);
  return store.lists.length !== before;
}

/** Ajoute 1..N versets à une liste */
export function addVersesToList(listId: string, verses: VerseRef[]): VerseList | null {
  const store = readStore();
  const list = store.lists.find(l => l.id === listId);
  if (!list) return null;

  // Tu peux dédupliquer si besoin (ex: même book/chapter/verse)
  const existingKeys = new Set(list.items.map(v => `${v.bookId}:${v.chapter}:${v.verse}:${v.translation ?? ''}`));
  const itemsToAdd = verses.filter(v => {
    const key = `${v.bookId}:${v.chapter}:${v.verse}:${v.translation ?? ''}`;
    if (existingKeys.has(key)) return false;
    existingKeys.add(key);
    return true;
  });

  list.items.push(...itemsToAdd);
  list.updatedAt = Date.now();
  writeStore(store);
  return list;
}

/** Retire un verset par index (tel qu’affiché) */
export function removeVerseAt(listId: string, index: number): VerseList | null {
  const store = readStore();
  const list = store.lists.find(l => l.id === listId);
  if (!list) return null;
  if (index < 0 || index >= list.items.length) return list;
  list.items.splice(index, 1);
  list.updatedAt = Date.now();
  writeStore(store);
  return list;
}

/** Remplace entièrement le contenu d’une liste (utile pour réordonner) */
export function replaceListItems(listId: string, items: VerseRef[]): VerseList | null {
  const store = readStore();
  const list = store.lists.find(l => l.id === listId);
  if (!list) return null;
  list.items = items;
  list.updatedAt = Date.now();
  writeStore(store);
  return list;
}

/** Export texte simple (pour partager/copier) */
export function exportListAsText(list: VerseList, opts?: {
  header?: boolean;         // inclure le titre en tête
  includeRef?: boolean;     // inclure la référence "Livre X:Y"
  linePrefix?: string;      // ex: "- "
}): string {
  const header = opts?.header !== false; // true par défaut
  const includeRef = opts?.includeRef !== false; // true par défaut
  const prefix = opts?.linePrefix ?? '';

  const lines: string[] = [];
  if (header) {
    const date = new Date(list.updatedAt).toLocaleString();
    lines.push(`${list.title} (${date})`);
    lines.push(''); // ligne vide
  }
  for (const it of list.items) {
    const ref = includeRef
      ? `${it.bookName ?? it.bookId} ${it.chapter}:${it.verse}`
      : '';
    const text = it.text ? ` — ${it.text}` : '';
    const line = `${prefix}${includeRef ? ref : ''}${text || (includeRef ? '' : '(…)')}`.trim();
    lines.push(line);
  }
  return lines.join('\n');
}

/** Partage : Web Share API si dispo, sinon copie presse-papiers */
export async function shareList(list: VerseList) {
  const content = exportListAsText(list, { header: true, includeRef: true, linePrefix: '• ' });
  try {
    // @ts-ignore
    if (navigator?.share) {
      // @ts-ignore
      await navigator.share({ title: list.title, text: content });
      return true;
    }
  } catch {
    // si échec, on tente le fallback
  }
  try {
    // @ts-ignore
    if (navigator?.clipboard?.writeText) {
      // @ts-ignore
      await navigator.clipboard.writeText(content);
      alert('Liste copiée dans le presse-papiers ✅');
      return true;
    }
  } catch {}
  // Fallback ultra-large compat
  try {
    const ta = document.createElement('textarea');
    ta.value = content;
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('Liste copiée dans le presse-papiers ✅');
    return true;
  } catch {}
  return false;
}
