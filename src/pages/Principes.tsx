// src/pages/Principes.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import type { VerseList, VerseRef } from '../types/collections';
import {
  List as ListIcon,
  Edit3,
  Trash2,
  Share2,
  Plus,
  Copy,
  ArrowUp,
  ArrowDown,
  Type as TextIcon,
  Edit2 as EditTextIcon, // icône crayon pour modifier un bloc texte
} from 'lucide-react';

/** Sentinelle pour distinguer un bloc de texte libre d'un verset */
const TEXT_SENTINEL = '__TEXT__';

/* ===================== Stockage local dédié à Principes ===================== */

const P_LS_KEY = 'twog:principles:v1';

function p_safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}
function p_readAll(): VerseList[] {
  try { return p_safeParse<VerseList[]>(localStorage.getItem(P_LS_KEY), []); } catch { return []; }
}
function p_writeAll(all: VerseList[]) {
  try { localStorage.setItem(P_LS_KEY, JSON.stringify(all)); } catch {}
}
function p_makeId() {
  return 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

// === API similaire à collectionsService, mais indépendante et sans tri auto ===
function p_getAllLists(): VerseList[] {
  return p_readAll(); // conserver l'ordre tel qu'enregistré (utile pour le réordonnancement manuel)
}
function p_getListById(id: string): VerseList | null {
  return p_readAll().find(l => l.id === id) ?? null;
}
function p_createList(title: string): VerseList {
  const now = Date.now();
  const list: VerseList = {
    id: p_makeId(),
    title: title?.trim() || 'Nouvelle étude',
    createdAt: now,
    updatedAt: now,
    items: [],
  };
  const all = p_readAll();
  all.unshift(list); // nouvelle en tête
  p_writeAll(all);
  return list;
}
function p_renameList(id: string, newTitle: string): VerseList | null {
  const all = p_readAll();
  const i = all.findIndex(l => l.id === id);
  if (i < 0) return null;
  all[i] = { ...all[i], title: newTitle?.trim() || all[i].title, updatedAt: Date.now() };
  p_writeAll(all);
  return all[i];
}
function p_deleteList(id: string): boolean {
  const all = p_readAll();
  const next = all.filter(l => l.id !== id);
  p_writeAll(next);
  return next.length !== all.length;
}
function p_setListItems(id: string, items: VerseRef[]): VerseList | null {
  const all = p_readAll();
  const i = all.findIndex(l => l.id === id);
  if (i < 0) return null;
  all[i] = { ...all[i], items: Array.isArray(items) ? items : [], updatedAt: Date.now() };
  p_writeAll(all);
  return all[i];
}
// Réordonner les listes (monter/descendre)
function p_moveList(fromIdx: number, toIdx: number): VerseList[] {
  const all = p_readAll();
  const src = Math.max(0, Math.min(all.length - 1, fromIdx));
  const dst = Math.max(0, Math.min(all.length - 1, toIdx));
  if (src === dst) return all;
  const arr = [...all];
  const [moved] = arr.splice(src, 1);
  arr.splice(dst, 0, moved);
  p_writeAll(arr);
  return arr;
}

/* ========================== Utils d'affichage texte ========================== */

type AnyItem = VerseRef & {
  kind?: 'text' | 'verse';
};

function buildPlainListText(list: VerseList): string {
  const lines: string[] = [];
  const title = (list.title || '').trim();
  if (title) lines.push(title);
  lines.push('');

  for (const itRaw of list.items as AnyItem[]) {
    const it = itRaw || ({} as AnyItem);
    const isText = it.bookId === TEXT_SENTINEL;

    if (isText) {
      const body = (it.text || '').toString().trim();
      if (body) lines.push(body);
      lines.push('');
      continue;
    }

    const ref = `${(it.bookName ?? it.bookId) || ''} ${it.chapter}:${it.verse}`.trim();
    if (ref) lines.push(ref);
    if (it.text && String(it.text).trim()) lines.push(String(it.text).trim());
    lines.push('');
  }

  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  lines.push('');
  return lines.join('\n');
}

/** Construit le texte pour UN SEUL élément (verset ou bloc texte) */
function buildItemPlainText(it: AnyItem): string {
  const isText = it.bookId === TEXT_SENTINEL;
  if (isText) {
    return String(it.text ?? '').trim();
  }
  const ref = `${(it.bookName ?? it.bookId) || ''} ${it.chapter}:${it.verse}`.trim();
  const body = String(it.text ?? '').trim();
  return body ? `${ref}\n${body}` : ref;
}

/* ================================== Page =================================== */

export default function Principes() {
  const { state, setPage } = useApp();
  const { t } = useTranslation();
  const isDark = state.settings.theme === 'dark';

  const [lists, setLists] = useState<VerseList[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // pour réordonner les listes : connaître l'index courant dans "vue fermée"
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // item sélectionné pour afficher ses actions
  const [openItemMenu, setOpenItemMenu] = useState<{ listId: string; idx: number } | null>(null);

  const label = useMemo(
    () => ({
      title: state.settings.language === 'fr' ? 'Principes' : 'Studies',
      create: state.settings.language === 'fr' ? 'Créer une étude' : 'Create study',
      placeholder: state.settings.language === 'fr' ? 'Titre de l’étude…' : 'Study title…',
      empty: state.settings.language === 'fr' ? 'Aucune étude pour l’instant.' : 'No studies yet.',
      verses: state.settings.language === 'fr' ? 'éléments' : 'items',
      openReading: state.settings.language === 'fr' ? 'Ouvrir la lecture' : 'Open Reading',
      copied: state.settings.language === 'fr' ? 'Copié' : 'Copied',
      backAll: state.settings.language === 'fr' ? '← Toutes les études' : '← All studies',
      addTextBlock: state.settings.language === 'fr' ? 'Ajouter un bloc de texte' : 'Add text block',
      editTextBlock: state.settings.language === 'fr' ? 'Modifier le bloc' : 'Edit block',
      deleteItem: state.settings.language === 'fr' ? 'Supprimer' : 'Delete',
      moveUp: state.settings.language === 'fr' ? 'Monter' : 'Move up',
      moveDown: state.settings.language === 'fr' ? 'Descendre' : 'Move down',
      open: state.settings.language === 'fr' ? 'Ouvrir' : 'Open',
      cancel: state.settings.language === 'fr' ? 'Annuler' : 'Cancel',
      confirmDeleteItem:
        state.settings.language === 'fr'
          ? 'Supprimer cet élément ?'
          : 'Delete this item?',
      newTextPlaceholder:
        state.settings.language === 'fr' ? 'Votre texte…' : 'Your text…',
      rename: state.settings.language === 'fr' ? 'Renommer' : 'Rename',
      share: state.settings.language === 'fr' ? 'Partager' : 'Share',
      copy: state.settings.language === 'fr' ? 'Copier' : 'Copy',
      deleteList: state.settings.language === 'fr' ? 'Supprimer' : 'Delete',
    }),
    [state.settings.language]
  );

  const refresh = () => setLists(p_getAllLists());
  useEffect(() => {
    refresh();
  }, []);

  const doCreate = () => {
    const title = prompt(label.placeholder) ?? '';
    const trimmed = title.trim();
    if (!trimmed) return;
    // éviter doublons de titre (insensible à la casse)
    const exists = p_getAllLists().find(
      (l) => (l.title || '').trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setExpandedId(exists.id);
      return;
    }
    const created = p_createList(trimmed);
    refresh();
    setExpandedId(created.id);
  };

  const doRename = (id: string, current: string) => {
    const title = prompt(label.placeholder, current) ?? '';
    const trimmed = title.trim();
    if (!trimmed) return;
    const exists = p_getAllLists().find(
      (l) => l.id !== id && (l.title || '').trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      alert(
        state.settings.language === 'fr'
          ? 'Un titre identique existe déjà.'
          : 'A study with the same title already exists.'
      );
      return;
    }
    p_renameList(id, trimmed);
    refresh();
  };

  const doDelete = (id: string) => {
    if (
      !confirm(
        state.settings.language === 'fr' ? 'Supprimer cette étude ?' : 'Delete this study?'
      )
    )
      return;
    p_deleteList(id);
    refresh();
    if (expandedId === id) setExpandedId(null);
  };

  // Partage au même format que "Copier", avec lien en plus
  const doShare = async (id: string) => {
    const list = p_getListById(id);
    if (!list) return;
    const payload = buildPlainListText(list) + '\nhttps://www.theword.fr\n';
    try {
      const nav: any = navigator;
      if (nav?.share) {
        await nav.share({ title: list.title || 'Étude', text: payload });
      } else {
        await navigator.clipboard.writeText(payload);
        alert(
          (state.settings.language === 'fr'
            ? 'Texte prêt à partager (copié)'
            : 'Text ready to share (copied)') + ' ✅'
        );
      }
    } catch {}
  };

  const copyListText = async (id: string) => {
    const list = p_getListById(id);
    if (!list) return;
    const txt = buildPlainListText(list);
    try {
      await navigator.clipboard.writeText(txt);
      alert(label.copied + ' ✅');
    } catch {}
  };

  // ---------- opérations sur items ----------
  const updateItems = (listId: string, updater: (items: AnyItem[]) => AnyItem[]) => {
    const list = p_getListById(listId);
    if (!list) return;
    const next = updater((list.items as AnyItem[]) ?? []);
    try {
      p_setListItems(listId, next as VerseRef[]);
      refresh();
    } catch (e) {
      console.error('setListItems error', e);
    }
  };

  const removeItem = (listId: string, idx: number) => {
    if (!confirm(label.confirmDeleteItem)) return;
    updateItems(listId, (items) => {
      const arr = [...items];
      if (idx >= 0 && idx < arr.length) arr.splice(idx, 1);
      return arr;
    });
    setOpenItemMenu(null);
  };

  const moveItem = (listId: string, idx: number, dir: -1 | 1) => {
    updateItems(listId, (items) => {
      const arr = [...items];
      const to = Math.max(0, Math.min(arr.length - 1, idx + dir));
      if (to === idx) return arr;
      const [moved] = arr.splice(idx, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
    setOpenItemMenu(({ listId: l, idx: i }) =>
      l === listId ? { listId, idx: Math.max(0, i + dir) } : null
    );
  };

  const addTextBlock = (listId: string) => {
    const txt = prompt(label.newTextPlaceholder) ?? '';
    const trimmed = txt.trim();
    if (!trimmed) return;
    const newItem: AnyItem = {
      bookId: TEXT_SENTINEL,
      bookName: '',
      chapter: 0,
      verse: 0,
      text: trimmed,
      translation: state.settings.language,
      kind: 'text',
    };
    updateItems(listId, (items) => [...items, newItem]);
  };

  const editTextBlock = (listId: string, idx: number, currentText: string) => {
    const txt = prompt(label.newTextPlaceholder, currentText) ?? '';
    updateItems(listId, (items) => {
      const arr = [...items];
      if (idx < 0 || idx >= arr.length) return arr;
      const prev = (arr[idx] || {}) as AnyItem;
      arr[idx] = { ...(prev as any), text: txt } as AnyItem;
      return arr;
    });
  };

  // --- NOUVEAU : opérations de copie/partage pour UN élément (verset) ---
  const copyItemText = async (it: AnyItem) => {
    const txt = buildItemPlainText(it);
    if (!txt) return;
    try {
      await navigator.clipboard.writeText(txt);
      alert(label.copied + ' ✅');
    } catch {}
  };

  const shareItem = async (it: AnyItem) => {
    const payload = buildItemPlainText(it) + '\n\nhttps://www.theword.fr\n';
    try {
      const nav: any = navigator;
      if (nav?.share) {
        await nav.share({ title: 'Verset', text: payload });
      } else {
        await navigator.clipboard.writeText(payload);
        alert(
          (state.settings.language === 'fr'
            ? 'Texte prêt à partager (copié)'
            : 'Text ready to share (copied)') + ' ✅'
        );
      }
    } catch {}
  };
  // ---------------------------------------------------------------

  // quand une liste est ouverte, n'afficher qu'elle
  const shownLists = expandedId ? lists.filter((l) => l.id === expandedId) : lists;

  // format date sans heure — affichage simple type 31/12/2025
  const formatDate = (d: string | number | Date) =>
    new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <div className={`min-h-[100svh] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1
            className={`text-2xl md:text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            } flex items-center gap-2`}
          >
            <ListIcon className="w-6 h-6" />
            {label.title}
          </h1>

          {!expandedId && (
            <button
              onClick={doCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
            >
              <Plus size={18} />
              {label.create}
            </button>
          )}
        </div>

        {expandedId && (
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={() => setExpandedId(null)}
              className={`${isDark ? 'text-white bg-gray-700' : 'text-gray-700 bg-gray-200'} px-3 py-1.5 rounded`}
            >
              {label.backAll}
            </button>

            {/* Ajouter un bloc de texte quand la liste est ouverte */}
            <button
              onClick={() => addTextBlock(expandedId)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <TextIcon size={16} />
              {label.addTextBlock}
            </button>
          </div>
        )}

        {shownLists.length === 0 ? (
          <div className={`${isDark ? 'text-white/80' : 'text-gray-600'} text-center py-16`}>
            {label.empty}
          </div>
        ) : (
          <div className="space-y-4">
            {shownLists.map((list, idxInShown) => {
              const isOpen = expandedId === list.id;
              // index réel dans l'ensemble (utile pour move up/down quand tout est affiché)
              const realIndex = expandedId ? lists.findIndex(l => l.id === list.id) : idxInShown;

              return (
                <div
                  key={list.id}
                  onMouseEnter={() => setHoverIdx(isOpen ? null : realIndex)}
                  onMouseLeave={() => setHoverIdx(null)}
                  onClick={
                    !isOpen
                      ? () => {
                          setOpenItemMenu(null);
                          setExpandedId(list.id);
                        }
                      : undefined
                  }
                  className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow p-4 ${!isOpen ? 'cursor-pointer' : ''}`}
                  role={!isOpen ? 'button' : undefined}
                  aria-expanded={isOpen}
                  style={{ WebkitTapHighlightColor: 'transparent', position: 'relative' }}
                >
                  {/* En-tête : Titre + infos */}
                  <div className="min-w-0">
                    <div className="text-lg md:text-xl font-semibold leading-snug whitespace-normal break-words">
                      {list.title}
                    </div>
                    <div className={`mt-1 text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                      {list.items.length} {label.verses} • {formatDate(list.updatedAt)}
                    </div>
                  </div>

                  {/* --- NOUVEAU: boutons Monter/Descendre (vue fermée) --- */}
                  {!isOpen && hoverIdx === realIndex && (
                    <div className="absolute right-3 top-3 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = p_moveList(realIndex, realIndex - 1);
                          setLists(next);
                        }}
                        disabled={realIndex === 0}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} disabled:opacity-50`}
                        title={label.moveUp}
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = p_moveList(realIndex, realIndex + 1);
                          setLists(next);
                        }}
                        disabled={realIndex === lists.length - 1}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} disabled:opacity-50`}
                        title={label.moveDown}
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>
                  )}

                  {/* Actions (vue ouverte) */}
                  {isOpen && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => doRename(list.id, list.title)}
                        className={`${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded inline-flex items-center gap-2`}
                        title={label.rename}
                      >
                        <Edit3 size={16} />
                        {label.rename}
                      </button>

                      <button
                        onClick={() => doShare(list.id)}
                        className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 inline-flex items-center gap-2"
                        title={label.share}
                      >
                        <Share2 size={16} />
                        {label.share}
                      </button>

                      <button
                        onClick={() => copyListText(list.id)}
                        className={`${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded inline-flex items-center gap-2`}
                        title={label.copy}
                      >
                        <Copy size={16} />
                        {label.copy}
                      </button>

                      <button
                        onClick={() => doDelete(list.id)}
                        className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-500 inline-flex items-center gap-2"
                        title={label.deleteList}
                      >
                        <Trash2 size={16} />
                        {label.deleteList}
                      </button>
                    </div>
                  )}

                  {/* Contenu de la liste ouverte */}
                  {isOpen && (
                    <div className={`mt-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-3`}>
                      {list.items.length === 0 ? (
                        <div className={`${isDark ? 'text-white/70' : 'text-gray-600'} text-sm`}>
                          {state.settings.language === 'fr' ? 'Liste vide.' : 'Empty list.'}
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {(list.items as AnyItem[]).map((it, idx) => {
                            const isText = it.bookId === TEXT_SENTINEL;
                            const menuOpen =
                              openItemMenu?.listId === list.id && openItemMenu?.idx === idx;

                            const openInReading = () => {
                              if (isText) return; // pas d'ouverture pour bloc texte
                              const url = new URL(window.location.href);
                              url.searchParams.set('b', it.bookId);
                              url.searchParams.set('c', String(it.chapter));
                              url.searchParams.set('v', String(it.verse));
                              window.history.replaceState({}, '', url.toString());
                              setPage('reading');
                            };

                            return (
                              <li
                                key={idx}
                                className={`${
                                  isDark
                                    ? 'bg-gray-600/40 hover:bg-gray-600/60'
                                    : 'bg-white hover:bg-gray-100'
                                } rounded-md p-3 transition`}
                              >
                                <button
                                  className="w-full text-left"
                                  onClick={() =>
                                    setOpenItemMenu(
                                      menuOpen ? null : { listId: list.id, idx }
                                    )
                                  }
                                >
                                  {/* En-tête : pour un verset on montre la réf, pour un bloc texte on n'affiche pas de titre */}
                                  {!isText ? (
                                    <div className="font-semibold">
                                      {(it.bookName ?? it.bookId) || ''} {it.chapter}:{it.verse}
                                    </div>
                                  ) : null}

                                  {it.text ? (
                                    <div
                                      style={{
                                        fontSize: `${state.settings.fontSize}px`,
                                        lineHeight: '1.55',
                                      }}
                                      className={isDark ? 'text-white mt-1' : 'text-gray-800 mt-1'}
                                    >
                                      {it.text}
                                    </div>
                                  ) : null}
                                </button>

                                {/* Actions de l'item */}
                                {menuOpen && (
                                  <div
                                    className={`mt-3 flex flex-wrap items-center gap-2 rounded-md px-2 py-2 ${
                                      isDark ? 'bg-gray-800' : 'bg-gray-200'
                                    }`}
                                  >
                                    {!isText && (
                                      <>
                                        <button
                                          onClick={openInReading}
                                          className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-500"
                                        >
                                          {label.open}
                                        </button>

                                        {/* Copier ce verset */}
                                        <button
                                          onClick={() => copyItemText(it)}
                                          className={`inline-flex items-center gap-1 px-2 py-1.5 rounded ${
                                            isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                          }`}
                                          title={label.copy}
                                        >
                                          <Copy size={16} />
                                          {label.copy}
                                        </button>

                                        {/* Partager ce verset */}
                                        <button
                                          onClick={() => shareItem(it)}
                                          className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                                          title={label.share}
                                        >
                                          <Share2 size={16} />
                                          {label.share}
                                        </button>
                                      </>
                                    )}

                                    {/* Modifier (uniquement pour bloc de texte) */}
                                    {isText && (
                                      <button
                                        onClick={() => editTextBlock(list.id, idx, String(it.text || ''))}
                                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-amber-600 text-white hover:bg-amber-500"
                                        title={label.editTextBlock}
                                      >
                                        <EditTextIcon size={16} />
                                        {label.editTextBlock}
                                      </button>
                                    )}

                                    <button
                                      onClick={() => moveItem(list.id, idx, -1)}
                                      className={`inline-flex items-center gap-1 px-2 py-1.5 rounded ${
                                        isDark
                                          ? 'bg-gray-700 text-white'
                                          : 'bg-white text-gray-800'
                                      }`}
                                      disabled={idx === 0}
                                      title={label.moveUp}
                                    >
                                      <ArrowUp size={16} />
                                      {label.moveUp}
                                    </button>

                                    <button
                                      onClick={() => moveItem(list.id, idx, 1)}
                                      className={`inline-flex items-center gap-1 px-2 py-1.5 rounded ${
                                        isDark
                                          ? 'bg-gray-700 text-white'
                                          : 'bg-white text-gray-800'
                                      }`}
                                      disabled={idx === list.items.length - 1}
                                      title={label.moveDown}
                                    >
                                      <ArrowDown size={16} />
                                      {label.moveDown}
                                    </button>

                                    {/* Corbeille pour supprimer l'élément sélectionné */}
                                    <button
                                      onClick={() => removeItem(list.id, idx)}
                                      className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-red-600 text-white hover:bg-red-500"
                                      title={label.deleteItem}
                                    >
                                      <Trash2 size={16} />
                                      {label.deleteItem}
                                    </button>

                                    {/* Annuler (fermer le menu) */}
                                    <button
                                      onClick={() => setOpenItemMenu(null)}
                                      className={`px-2 py-1.5 rounded ${
                                        isDark
                                          ? 'bg-gray-700 text-white'
                                          : 'bg-white text-gray-800'
                                      }`}
                                    >
                                      {label.cancel}
                                    </button>

                                    {/* OK visible à droite */}
                                    <button
                                      onClick={() => setOpenItemMenu(null)}
                                      className="ml-auto px-2 py-1.5 rounded bg-green-600 text-white hover:bg-green-500"
                                    >
                                      OK
                                    </button>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

