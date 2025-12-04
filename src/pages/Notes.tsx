// src/pages/Notes.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import {
  getAllLists,
  createList,
  renameList,
  deleteList,
  getListById,
  setListItems,
} from '../services/collectionsService';
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
  Edit2 as EditTextIcon, // <- icône crayon pour modifier un bloc texte
} from 'lucide-react';
import {
  encodeSharedList,
  decodeSharedList,
} from '../services/shareCodec';

/** Sentinelle pour distinguer un bloc de texte libre d'un verset */
const TEXT_SENTINEL = '__TEXT__';
const LAST_LIST_STORAGE_KEY = 'theword:lastNotesListId';

type AnyItem = VerseRef & {
  kind?: 'text' | 'verse';
};

/** Découpe un texte en blocs séparés par au moins une ligne vide */
function splitIntoBlocks(raw: string): string[] {
  return raw
    .split(/\n\s*\n+/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0);
}

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

export default function Notes() {
  const { state, setPage } = useApp();
  const { t, language } = useTranslation();
  const isDark = state.settings.theme === 'dark';

  const [lists, setLists] = useState<VerseList[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(LAST_LIST_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  // item sélectionné pour afficher ses actions
  const [openItemMenu, setOpenItemMenu] = useState<{ listId: string; idx: number } | null>(null);

  // --- Mini outil "Importer depuis un texte" ---
  const [showImportFromText, setShowImportFromText] = useState(false);
  const [importTextTitle, setImportTextTitle] = useState('');
  const [importTextBody, setImportTextBody] = useState('');
  const [importSplitBlocks, setImportSplitBlocks] = useState(true);

  // --- Édition multi-lignes d'un bloc texte (création + édition) ---
  const [editingTextBlock, setEditingTextBlock] = useState<{
    listId: string;
    idx: number | null; // null = nouveau bloc
    initialValue: string;
  } | null>(null);
  const [editingTextValue, setEditingTextValue] = useState('');

  const label = useMemo(
    () => ({
      title: t('notes'), // libellé général "Notes"
      create: t('notesPage.create'),
      placeholder: t('notesPage.placeholder'),
      empty: t('notesPage.empty'),
      verses: t('notesPage.items'),
      copied: t('copiedShort'),
      backAll: t('notesPage.backAll'),
      addTextBlock: t('notesPage.addTextBlock'),
      editTextBlock: t('notesPage.editTextBlock'),
      deleteItem: t('notesPage.deleteItem'),
      moveUp: t('notesPage.moveUp'),
      moveDown: t('notesPage.moveDown'),
      open: t('notesPage.open'),
      cancel: t('cancel'),
      confirmDeleteItem: t('notesPage.confirmDeleteItem'),
      newTextPlaceholder: t('notesPage.newTextPlaceholder'),
      shareCode: t('notesPage.shareCode'),
      importCode: t('notesPage.importCode'),
      importPrompt: t('notesPage.importPrompt'),
      importError: t('notesPage.importError'),
      importSuccess: t('notesPage.importSuccess'),
      shareCodeCopied: t('notesPage.shareCodeCopied'),
      importTextButton: t('notesPage.importTextButton'),
      importTextTitlePlaceholder: t('notesPage.importTextTitlePlaceholder'),
      importTextDefaultTitle: t('notesPage.importTextDefaultTitle'),
      importTextBodyPlaceholder: t('notesPage.importTextBodyPlaceholder'),
      importTextNoBody: t('notesPage.importTextNoBody'),
      importTextNoBlock: t('notesPage.importTextNoBlock'),
      importTextSplitLabel: t('notesPage.importTextSplitLabel'),
      importTextInfo: t('notesPage.importTextInfo'),
      importTextCreate: t('notesPage.importTextCreate'),
      duplicateTitle: t('notesPage.duplicateTitle'),
      confirmDeleteList: t('notesPage.confirmDeleteList'),
      emptyList: t('notesPage.emptyList'),
      importFromTextTitle: t('notesPage.importFromTextTitle'),
      documentContent: t('notesPage.documentContent'),
    }),
    [t, language]
  );

  const refresh = () => setLists(getAllLists());
  useEffect(() => {
    refresh();
  }, []);

  // mémoriser / nettoyer la dernière liste ouverte (pour aller/retour Lecture ↔ Notes)
  useEffect(() => {
    try {
      if (expandedId) {
        window.localStorage.setItem(LAST_LIST_STORAGE_KEY, expandedId);
      } else {
        window.localStorage.removeItem(LAST_LIST_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [expandedId]);

  // si la liste mémorisée n'existe plus (supprimée), on nettoie l'état
  useEffect(() => {
    if (!expandedId) return;
    // IMPORTANT : attendre que les listes soient chargées avant de décider
    if (!lists.length) return;
    if (!lists.some((l) => l.id === expandedId)) {
      setExpandedId(null);
    }
  }, [lists, expandedId]);

  // quand une liste est ouverte, on descend automatiquement sur le dernier élément
  // pratique pour la prise de notes en direct lors d'une réunion
  useEffect(() => {
    if (!expandedId) return;
    const list = lists.find((l) => l.id === expandedId);
    if (!list || !list.items.length) return;

    const lastIdx = list.items.length - 1;
    const el = document.getElementById(`note-item-${expandedId}-${lastIdx}`);
    if (el && 'scrollIntoView' in el) {
      (el as HTMLElement).scrollIntoView({ block: 'center', behavior: 'auto' });
    }
  }, [lists, expandedId]);

  // synchroniser la valeur de la modale d'édition avec le bloc courant
  useEffect(() => {
    if (editingTextBlock) {
      setEditingTextValue(editingTextBlock.initialValue ?? '');
    } else {
      setEditingTextValue('');
    }
  }, [editingTextBlock]);

  const doCreate = () => {
    const title = prompt(label.placeholder) ?? '';
    const trimmed = title.trim();
    if (!trimmed) return;
    // éviter doublons de titre (insensible à la casse)
    const exists = getAllLists().find(
      (l) => (l.title || '').trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      alert(label.duplicateTitle);
      setExpandedId(exists.id);
      return;
    }
    const created = createList(trimmed);
    refresh();
    setExpandedId(created.id);
  };

  const doRename = (id: string, current: string) => {
    const title = prompt(label.placeholder, current) ?? '';
    const trimmed = title.trim();
    if (!trimmed) return;
    const exists = getAllLists().find(
      (l) => l.id !== id && (l.title || '').trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      alert(label.duplicateTitle);
      return;
    }
    renameList(id, trimmed);
    refresh();
  };

  const doDelete = (id: string) => {
    if (!confirm(label.confirmDeleteList)) return;
    deleteList(id);
    refresh();
    if (expandedId === id) setExpandedId(null);
  };

  // Partage au même format que "Copier", avec lien en plus
  const doShare = async (id: string) => {
    const list = getListById(id);
    if (!list) return;
    const payload = buildPlainListText(list) + '\nhttps://www.theword.fr\n';
    try {
      const nav: any = navigator;
      if (nav?.share) {
        await nav.share({ title: list.title || label.title, text: payload });
      } else {
        await navigator.clipboard.writeText(payload);
        alert(t('textReadyToShare') + ' ✅');
      }
    } catch {}
  };

  const copyListText = async (id: string) => {
    const list = getListById(id);
    if (!list) return;
    const txt = buildPlainListText(list);
    try {
      await navigator.clipboard.writeText(txt);
      alert(label.copied + ' ✅');
    } catch {}
  };

  // --- Partage / import PAR CODE ---
  const doShareCode = async (id: string) => {
    const list = getListById(id);
    if (!list) return;
    const code = encodeSharedList('note', list); // <- type "note"
    try {
      await navigator.clipboard.writeText(code);
      alert(label.shareCodeCopied);
    } catch {
      // fallback : on affiche le code dans un prompt pour copier à la main
      prompt(label.shareCode, code);
    }
  };

  const doImportFromCode = () => {
    const code = prompt(label.importPrompt) ?? '';
    const trimmed = code.trim();
    if (!trimmed) return;

    const payload = decodeSharedList(trimmed);
    if (!payload) {
      alert(label.importError);
      return;
    }

    const title = payload.title?.trim() || label.importTextDefaultTitle;

    const created = createList(title);
    setListItems(created.id, (payload.items || []) as VerseRef[]);
    refresh();
    setExpandedId(created.id);
    alert(label.importSuccess);
  };

  // --- Import direct depuis un TEXTE (mini outil interne) ---
  const openImportFromText = () => {
    setImportTextTitle('');
    setImportTextBody('');
    setImportSplitBlocks(true);
    setShowImportFromText(true);
  };

  const handleCreateFromText = () => {
    const title =
      (importTextTitle || '').trim() || label.importTextDefaultTitle;
    const raw = (importTextBody || '').trim();

    if (!raw) {
      alert(label.importTextNoBody);
      return;
    }

    const blocks = importSplitBlocks ? splitIntoBlocks(raw) : [raw];
    if (blocks.length === 0) {
      alert(label.importTextNoBlock);
      return;
    }

    const items: AnyItem[] = blocks.map((text) => ({
      bookId: TEXT_SENTINEL,
      bookName: '',
      chapter: 0,
      verse: 0,
      text,
      translation: state.settings.language,
      kind: 'text',
    }));

    const created = createList(title);
    setListItems(created.id, items as VerseRef[]);
    refresh();
    setExpandedId(created.id);
    setShowImportFromText(false);
  };

  // --- opérations de copie/partage pour UN élément (verset ou bloc texte) ---
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
        await nav.share({ title: t('verseWord'), text: payload });
      } else {
        await navigator.clipboard.writeText(payload);
        alert(t('textReadyToShare') + ' ✅');
      }
    } catch {}
  };
  // ---------------------------------------------------------------

  // ---------- opérations sur items ----------
  const updateItems = (listId: string, updater: (items: AnyItem[]) => AnyItem[]) => {
    const list = getListById(listId);
    if (!list) return;
    const next = updater((list.items as AnyItem[]) ?? []);
    try {
      setListItems(listId, next as VerseRef[]);
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

  // Ouverture d'un nouveau bloc texte (multi-lignes) via une modale
  const addTextBlock = (listId: string) => {
    setEditingTextBlock({
      listId,
      idx: null,
      initialValue: '',
    });
  };

  // Édition d'un bloc texte existant (multi-lignes) via une modale
  const editTextBlock = (listId: string, idx: number, currentText: string) => {
    setEditingTextBlock({
      listId,
      idx,
      initialValue: currentText || '',
    });
  };

  const handleSaveTextBlock = () => {
    if (!editingTextBlock) return;
    const raw = editingTextValue;
    // pas de bloc entièrement vide
    if (!raw.trim()) {
      setEditingTextBlock(null);
      return;
    }

    if (editingTextBlock.idx === null) {
      // nouveau bloc
      updateItems(editingTextBlock.listId, (items) => {
        const arr = [...items];
        const newItem: AnyItem = {
          bookId: TEXT_SENTINEL,
          bookName: '',
          chapter: 0,
          verse: 0,
          text: raw,
          translation: state.settings.language,
          kind: 'text',
        };
        arr.push(newItem);
        return arr;
      });
    } else {
      // édition d'un bloc existant
      const idx = editingTextBlock.idx;
      updateItems(editingTextBlock.listId, (items) => {
        const arr = [...items];
        if (idx < 0 || idx >= arr.length) return arr;
        const prev = (arr[idx] || {}) as AnyItem;
        arr[idx] = { ...prev, text: raw } as AnyItem;
        return arr;
      });
    }

    setEditingTextBlock(null);
  };

  // quand une liste est ouverte, n'afficher qu'elle
  const shownLists = expandedId ? lists.filter((l) => l.id === expandedId) : lists;

  // format date sans heure (création / modif) — affichage simple type 31/12/2025
  const formatDate = (d: string | number | Date) =>
    new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <div className={`min-h-[100svh] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1
              className={`text-2xl md:text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              } flex items-center gap-2`}
            >
              <ListIcon className="w-6 h-6" />
              {label.title}
            </h1>
          </div>

          {!expandedId && (
            <div className="mt-4 space-y-2">
              {/* Gros bouton primaire : + Créer une liste (ORANGE) */}
              <button
                onClick={doCreate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange-500 text-white font-semibold text-sm shadow hover:bg-orange-400 active:scale-[0.98]"
              >
                <Plus size={18} />
                {label.create}
              </button>

              {/* Ligne de boutons secondaires alignés à droite */}
              <div className="flex flex-wrap items-center justify-end gap-2">
                {/* Importer depuis un TEXTE (Texte → Liste) avec liseret harmonisé */}
                <button
                  onClick={openImportFromText}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
                    isDark
                      ? 'border-gray-500 text-gray-100 bg-gray-900'
                      : 'border-gray-300 text-gray-800 bg-white'
                  }`}
                >
                  <TextIcon size={14} />
                  {label.importTextButton}
                </button>

                {/* Importer depuis un CODE TheWord (même liseret) */}
                <button
                  onClick={doImportFromCode}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
                    isDark
                      ? 'border-gray-500 text-gray-100 bg-gray-900'
                      : 'border-gray-300 text-gray-800 bg-white'
                  }`}
                >
                  <Copy size={14} />
                  {label.importCode}
                </button>
              </div>
            </div>
          )}
        </div>

        {expandedId && (
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
            {/* Bouton retour : ORANGE, pleine largeur sur mobile */}
            <button
              onClick={() => setExpandedId(null)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold text-sm hover:bg-orange-400"
            >
              {label.backAll}
            </button>

            {/* Ajouter un bloc de texte : BLEU, même largeur/hauteur */}
            <button
              onClick={() => expandedId && addTextBlock(expandedId)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 text-sm"
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
            {shownLists.map((list) => {
              const isOpen = expandedId === list.id;

              return (
                <div
                  key={list.id}
                  // Toute la carte cliquable en "liste des notes" (vue fermée)
                  onClick={
                    !isOpen
                      ? () => {
                          setOpenItemMenu(null);
                          setExpandedId(list.id);
                        }
                      : undefined
                  }
                  className={`${
                    isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                  } rounded-xl shadow p-4 ${!isOpen ? 'cursor-pointer' : ''}`}
                  role={!isOpen ? 'button' : undefined}
                  aria-expanded={isOpen}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {/* En-tête : Titre sur toute la largeur + infos (sans heure) */}
                  <div className="min-w-0">
                    <div className="text-lg md:text-xl font-semibold leading-snug whitespace-normal break-words">
                      {list.title}
                    </div>
                    <div className={`mt-1 text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                      {list.items.length} {label.verses} • {formatDate(list.updatedAt)}
                    </div>
                  </div>

                  {/* En vue LISTE (fermée), on n'affiche AUCUNE icône d'action.
                      En vue OUVERTE, on place les icônes SOUS le titre pour libérer la largeur. */}
                  {isOpen && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => doRename(list.id, list.title)}
                        className={`${
                          isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                        } px-3 py-2 rounded inline-flex items-center gap-2`}
                        title={t('notesPage.renameList')}
                      >
                        <Edit3 size={16} />
                        {t('notesPage.renameList')}
                      </button>

                      <button
                        onClick={() => doShare(list.id)}
                        className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 inline-flex items-center gap-2"
                        title={t('shareLabel')}
                      >
                        <Share2 size={16} />
                        {t('shareLabel')}
                      </button>

                      <button
                        onClick={() => copyListText(list.id)}
                        className={`${
                          isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                        } px-3 py-2 rounded inline-flex items-center gap-2`}
                        title={t('copyLabel')}
                      >
                        <Copy size={16} />
                        {t('copyLabel')}
                      </button>

                      {/* Nouveau : bouton "Code" pour cette liste */}
                      <button
                        onClick={() => doShareCode(list.id)}
                        className={`${
                          isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                        } px-3 py-2 rounded inline-flex items-center gap-2`}
                        title={label.shareCode}
                      >
                        <Copy size={16} />
                        {label.shareCode}
                      </button>

                      <button
                        onClick={() => doDelete(list.id)}
                        className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-500 inline-flex items-center gap-2"
                        title={label.deleteItem}
                      >
                        <Trash2 size={16} />
                        {label.deleteItem}
                      </button>
                    </div>
                  )}

                  {/* Contenu de la liste ouverte */}
                  {isOpen && (
                    <div className="mt-4">
                      {list.items.length === 0 ? (
                        <div className={`${isDark ? 'text-white/70' : 'text-gray-600'} text-sm`}>
                          {label.emptyList}
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {(list.items as AnyItem[]).map((it, idx) => {
                            const isText = it.bookId === TEXT_SENTINEL;
                            const menuOpen =
                              openItemMenu?.listId === list.id && openItemMenu?.idx === idx;

                            const baseItemBg = isText
                              ? isDark
                                ? 'bg-gray-700/70 hover:bg-gray-700/90'
                                : 'bg-indigo-50 hover:bg-indigo-100'
                              : isDark
                              ? 'bg-gray-600/40 hover:bg-gray-600/60'
                              : 'bg-white hover:bg-gray-100';

                            const openInReading = () => {
                              if (isText) return; // pas d'ouverture pour bloc texte
                              const url = new URL(window.location.href);
                              url.searchParams.set('b', it.bookId);
                              url.searchParams.set('c', String(it.chapter));
                              url.searchParams.set('v', String(it.verse));
                              window.history.replaceState({}, '', url.toString());
                              setPage('reading');
                            };

                            const textBaseClass = isDark
                              ? 'text-white mt-1 whitespace-pre-wrap'
                              : 'text-gray-800 mt-1 whitespace-pre-wrap';
                            const textClass = isText
                              ? `${textBaseClass} font-serif`
                              : textBaseClass;

                            return (
                              <li
                                key={idx}
                                id={`note-item-${list.id}-${idx}`}
                                className={`${baseItemBg} rounded-md p-3 transition ${
                                  isText ? 'border-l-4 border-indigo-400' : ''
                                }`}
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
                                      className={textClass}
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
                                            isDark
                                              ? 'bg-gray-700 text-white'
                                              : 'bg-white text-gray-800'
                                          }`}
                                          title={t('copyLabel')}
                                        >
                                          <Copy size={16} />
                                          {t('copyLabel')}
                                        </button>

                                        {/* Partager ce verset */}
                                        <button
                                          onClick={() => shareItem(it)}
                                          className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                                          title={t('shareLabel')}
                                        >
                                          <Share2 size={16} />
                                          {t('shareLabel')}
                                        </button>
                                      </>
                                    )}

                                    {/* Modifier (uniquement pour bloc de texte) */}
                                    {isText && (
                                      <button
                                        onClick={() =>
                                          editTextBlock(list.id, idx, String(it.text || ''))
                                        }
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

      {/* MODALE : importer depuis un TEXTE */}
      {showImportFromText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowImportFromText(false)}
            aria-hidden="true"
          />
          <div
            className={`relative w-full max-w-lg mx-4 rounded-2xl p-4 ${
              isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <h2 className="text-lg font-semibold mb-2">
              {label.importFromTextTitle}
            </h2>

            <div className="mb-3">
              <label className="block text-sm mb-1">
                {label.importTextTitlePlaceholder}
              </label>
              <input
                type="text"
                className={`w-full rounded-md px-2 py-1.5 text-sm border ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                value={importTextTitle}
                onChange={(e) => setImportTextTitle(e.target.value)}
                placeholder={label.importTextTitlePlaceholder}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1">
                {label.documentContent}
              </label>
              <textarea
                className={`w-full rounded-md px-2 py-1.5 text-sm min-h-[160px] border resize-vertical ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                value={importTextBody}
                onChange={(e) => setImportTextBody(e.target.value)}
                placeholder={label.importTextBodyPlaceholder}
              />
              <div className="mt-1 text-xs opacity-75">
                {label.importTextInfo}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm mb-4">
              <input
                type="checkbox"
                checked={importSplitBlocks}
                onChange={(e) => setImportSplitBlocks(e.target.checked)}
              />
              <span>{label.importTextSplitLabel}</span>
            </label>

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowImportFromText(false)}
                className={`px-3 py-1.5 rounded text-sm ${
                  isDark
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {label.cancel}
              </button>
              <button
                onClick={handleCreateFromText}
                className="px-3 py-1.5 rounded text-sm bg-blue-600 text-white hover:bg-blue-500"
              >
                {label.importTextCreate}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : édition / création d'un bloc de texte multi-lignes */}
      {editingTextBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setEditingTextBlock(null)}
            aria-hidden="true"
          />
          <div
            className={`relative w-full max-w-lg mx-4 rounded-2xl p-5 ${
              isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <h2 className="text-xl font-semibold mb-3">
              {editingTextBlock.idx === null ? label.addTextBlock : label.editTextBlock}
            </h2>
            <textarea
              className={`w-full rounded-md px-3 py-2 text-base min-h-[220px] border resize-vertical ${
                isDark
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
              style={{
                fontSize: `${state.settings.fontSize}px`,
                lineHeight: '1.6',
              }}
              value={editingTextValue}
              onChange={(e) => setEditingTextValue(e.target.value)}
              placeholder={label.newTextPlaceholder}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingTextBlock(null)}
                className={`px-3 py-1.5 rounded text-base ${
                  isDark
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {label.cancel}
              </button>
              <button
                onClick={handleSaveTextBlock}
                className="px-3 py-1.5 rounded text-base bg-green-600 text-white hover:bg-green-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

