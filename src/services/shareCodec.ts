// src/services/shareCodec.ts
import type { VerseList, VerseRef } from '../types/collections';

export type SharedListKind = 'note' | 'principle';

export interface SharedListPayloadV1 {
  v: 1;
  kind: SharedListKind;
  title: string;
  createdAt: number;
  updatedAt: number;
  items: VerseRef[];
}

// Helpers UTF-8 <-> base64 (équivalent de unescape/encodeURIComponent en JS)
function encodeBase64Utf8(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function decodeBase64Utf8(b64: string): string {
  return decodeURIComponent(escape(atob(b64)));
}

/**
 * Encodage commun Notes / Principes
 * kind = 'note' ou 'principle'
 */
export function encodeSharedList(kind: SharedListKind, list: VerseList): string {
  const payload: SharedListPayloadV1 = {
    v: 1,
    kind,
    title: (list.title || '').trim() || (kind === 'note' ? 'Liste' : 'Étude'),
    createdAt: list.createdAt || Date.now(),
    updatedAt: list.updatedAt || Date.now(),
    items: (list.items || []) as VerseRef[],
  };

  const json = JSON.stringify(payload);
  const b64 = encodeBase64Utf8(json);

  // Préfixe générique v1 (Notes & Principes)
  return `TWOG-1:${b64}`;
}

/**
 * Décodage :
 * - accepte "TWOG-1:xxxx" (nouveau format)
 * - accepte aussi "TWOG-P1:xxxx" (ancien format généré par la page HTML / Principes)
 * - ignore les espaces et retours à la ligne autour / au milieu du code
 */
export function decodeSharedList(code: string): SharedListPayloadV1 | null {
  if (!code) return null;

  // On supprime tous les espaces et retours à la ligne
  let raw = code.replace(/\s+/g, '').trim();
  if (!raw) return null;

  // Si le code commence par "TWOG..." on ne garde que ce qu'il y a après le premier ":"
  const idx = raw.indexOf(':');
  if (idx > 0 && raw.startsWith('TWOG')) {
    raw = raw.slice(idx + 1);
  }

  if (!raw) return null;

  let json: string;
  try {
    json = decodeBase64Utf8(raw);
  } catch {
    return null;
  }

  let payload: any;
  try {
    payload = JSON.parse(json);
  } catch {
    return null;
  }

  if (!payload || payload.v !== 1 || !Array.isArray(payload.items)) {
    return null;
  }

  const kind: SharedListKind =
    payload.kind === 'principle' || payload.kind === 'note'
      ? payload.kind
      : 'note';

  const title: string =
    typeof payload.title === 'string'
      ? payload.title
      : kind === 'note'
      ? 'Liste importée'
      : 'Étude importée';

  const createdAt: number =
    typeof payload.createdAt === 'number' ? payload.createdAt : Date.now();

  const updatedAt: number =
    typeof payload.updatedAt === 'number' ? payload.updatedAt : createdAt;

  const items = (payload.items || []) as VerseRef[];

  return {
    v: 1,
    kind,
    title,
    createdAt,
    updatedAt,
    items,
  };
}
