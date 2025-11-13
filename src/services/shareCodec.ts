// src/services/shareCodec.ts
// Encodage / décodage de listes TheWord (Notes / Principes) en "code partage"
// pour échange via WhatsApp / SMS / mail, etc.

import type { VerseRef, VerseList } from '../types/collections';

export type SharedListKind = 'note' | 'principle';

export interface SharedListPayload {
  kind: SharedListKind;
  title: string;
  items: VerseRef[];
}

/**
 * Préfixe pour reconnaître un "code TheWord".
 * Exemple : TWOG1:%7B%22kind%22%3A%22note%22%2C...%7D
 */
export const SHARE_PREFIX = 'TWOG1:';

/**
 * Encode une liste (note ou principe) en "code partage" texte,
 * prêt à être collé dans WhatsApp / SMS / mail / Notes, etc.
 */
export function encodeSharedList(kind: SharedListKind, list: VerseList): string {
  const payload: SharedListPayload = {
    kind,
    title: (list.title || '').trim(),
    // On clone les items pour éviter toute surprise
    items: Array.isArray(list.items) ? list.items.map(it => ({ ...it })) : [],
  };

  const json = JSON.stringify(payload);
  const encoded = encodeURIComponent(json);
  return SHARE_PREFIX + encoded;
}

/**
 * Test simple : est-ce que la chaîne ressemble à un code TheWord ?
 */
export function isTheWordShareCode(raw: string): boolean {
  if (!raw) return false;
  return raw.trim().startsWith(SHARE_PREFIX);
}

/**
 * Décode un "code partage" en payload exploitable (ou null si invalide).
 */
export function decodeSharedList(raw: string): SharedListPayload | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed.startsWith(SHARE_PREFIX)) return null;

  const body = trimmed.slice(SHARE_PREFIX.length);
  try {
    const json = decodeURIComponent(body);
    const data = JSON.parse(json);

    if (!data || typeof data !== 'object') return null;
    const kind = (data as any).kind;
    const title = ((data as any).title || '').toString();
    const items = (data as any).items;

    if ((kind !== 'note' && kind !== 'principle') || !title || !Array.isArray(items)) {
      return null;
    }

    // On filtre / normalise un peu les items pour rester dans le type VerseRef
    const safeItems: VerseRef[] = items.map((it: any) => ({
      bookId: String(it.bookId ?? ''),
      bookName: it.bookName ? String(it.bookName) : undefined,
      chapter: Number(it.chapter ?? 0),
      verse: Number(it.verse ?? 0),
      text: it.text != null ? String(it.text) : undefined,
      translation: it.translation ? String(it.translation) : undefined,
    })).filter((it: VerseRef) => it.bookId && it.chapter > 0 && it.verse > 0);

    return {
      kind,
      title,
      items: safeItems,
    };
  } catch {
    return null;
  }
}
