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
  Edit2 as EditTextIcon,
  HelpCircle,
} from 'lucide-react';
import { encodeSharedList, decodeSharedList } from '../services/shareCodec';

/** Sentinelle pour distinguer un bloc de texte libre d'un verset */
const TEXT_SENTINEL = '__TEXT__';

/* ===================== Stockage local dédié à Principes ===================== */

// même clé que l’implémentation précédente pour ne PAS perdre les études existantes
const P_LS_KEY = 'twog:principles:v1';
// mémorise la dernière étude ouverte (utilisé aussi par Lecture)
const LAST_LIST_STORAGE_KEY = 'twog:lastPrincipleId';
// ordre manuel des listes (comme pour Notes, mais séparé)
const LIST_ORDER_STORAGE_KEY = 'theword:principlesListOrder';

function p_safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function p_readAll(): VerseList[] {
  try {
    return p_safeParse<VerseList[]>(localStorage.getItem(P_LS_KEY), []);
  } catch {
    return [];
  }
}

function p_writeAll(all: VerseList[]) {
  try {
    localStorage.setItem(P_LS_KEY, JSON.stringify(all));
  } catch {}
}

function p_makeId() {
  return 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

// === API similaire à collectionsService, mais indépendante (Études) ===
function p_getAllLists(): VerseList[] {
  return p_readAll();
}

function p_getListById(id: string): VerseList | null {
  return p_readAll().find((l) => l.id === id) ?? null;
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
  all.push(list);
  p_writeAll(all);
  return list;
}

function p_renameList(id: string, newTitle: string): VerseList | null {
  const all = p_readAll();
  const i = all.findIndex((l) => l.id === id);
  if (i < 0) return null;
  all[i] = { ...all[i], title: newTitle?.trim() || all[i].title, updatedAt: Date.now() };
  p_writeAll(all);
  return all[i];
}

function p_deleteList(id: string): boolean {
  const all = p_readAll();
  const next = all.filter((l) => l.id !== id);
  p_writeAll(next);
  return next.length !== all.length;
}

function p_setListItems(id: string, items: VerseRef[]): VerseList | null {
  const all = p_readAll();
  const i = all.findIndex((l) => l.id === id);
  if (i < 0) return null;
  all[i] = { ...all[i], items: Array.isArray(items) ? items : [], updatedAt: Date.now() };
  p_writeAll(all);
  return all[i];
}

/* ========================== Utils d'affichage texte ========================== */

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

/* ================================== Page =================================== */

export default function Principes() {
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
    insertAt?: number | null; // position d'insertion (si nouveau bloc)
  } | null>(null);
  const [editingTextValue, setEditingTextValue] = useState('');

  // Flag pour savoir si on doit scroller automatiquement vers le dernier élément
  const [shouldScrollToLast, setShouldScrollToLast] = useState(false);

  // Aide / mode d'emploi
  const [showHelp, setShowHelp] = useState(false);

  const label = useMemo(
    () => ({
      title: t('principles'),
      create: t('principlesPage.create'),
      placeholder: t('principlesPage.placeholder'),
      empty: t('principlesPage.empty'),
      verses: t('principlesPage.items'),
      copied: t('copiedShort'),
      backAll: t('principlesPage.backAll'),
      addTextBlock: t('principlesPage.addTextBlock'),
      editTextBlock: t('principlesPage.editTextBlock'),
      deleteItem: t('principlesPage.deleteItem'),
      moveUp: t('principlesPage.moveUp'),
      moveDown: t('principlesPage.moveDown'),
      open: t('principlesPage.open'),
      cancel: t('cancel'),
      confirmDeleteItem: t('principlesPage.confirmDeleteItem'),
      newTextPlaceholder: t('principlesPage.newTextPlaceholder'),
      shareCode: t('principlesPage.shareCode'),
      importCode: t('principlesPage.importCode'),
      importPrompt: t('principlesPage.importPrompt'),
      importError: t('principlesPage.importError'),
      importSuccess: t('principlesPage.importSuccess'),
      shareCodeCopied: t('principlesPage.shareCodeCopied'),
      importTextButton: t('principlesPage.importTextButton'),
      importTextTitlePlaceholder: t('principlesPage.importTextTitlePlaceholder'),
      importTextDefaultTitle: t('principlesPage.importTextDefaultTitle'),
      importTextBodyPlaceholder: t('principlesPage.importTextBodyPlaceholder'),
      importTextNoBody: t('principlesPage.importTextNoBody'),
      importTextNoBlock: t('principlesPage.importTextNoBlock'),
      importTextSplitLabel: t('principlesPage.importTextSplitLabel'),
      importTextInfo: t('principlesPage.importTextInfo'),
      importTextCreate: t('principlesPage.importTextCreate'),
      duplicateTitle: t('principlesPage.duplicateTitle'),
      confirmDeleteList: t('principlesPage.confirmDeleteList'),
      emptyList: t('principlesPage.emptyList'),
      importFromTextTitle: t('principlesPage.importFromTextTitle'),
      documentContent: t('principlesPage.documentContent'),

      // Aide / mode d'emploi (mutualisée avec Notes)
      helpTitle: t('notesHelpTitle'),
      helpIntro: t('notesHelpIntro'),
      help1Title: t('notesHelp1Title'),
      help1Body: t('notesHelp1Body'),
      help2Title: t('notesHelp2Title'),
      help2Body: t('notesHelp2Body'),
      help3Title: t('notesHelp3Title'),
      help3Body: t('notesHelp3Body'),
      help4Title: t('notesHelp4Title'),
      help4Body: t('notesHelp4Body'),
      help5Title: t('notesHelp5Title'),
      help5Body: t('notesHelp5Body'),
      help6Title: t('notesHelp6Title'),
      help6Body: t('notesHelp6Body'),
      help7Title: t('notesHelp7Title'),
      help7Body: t('notesHelp7Body'),
      help8Title: t('notesHelp8Title'),
      help8Body: t('notesHelp8Body'),
      help9Title: t('notesHelp9Title'),
      help9Body: t('notesHelp9Body'),
      help10Title: t('notesHelp10Title'),
      help10Body: t('notesHelp10Body'),
    }),
    [t, language]
  );

  const refresh = () => {
    const all = p_getAllLists();

    if (typeof window === 'undefined') {
      setLists(all);
      return;
    }

    let storedOrder: string[] = [];
    try {
      const raw = window.localStorage.getItem(LIST_ORDER_STORAGE_KEY);
      if (raw) {
        storedOrder = JSON.parse(raw);
      }
    } catch {
      storedOrder = [];
    }

    const validStored = storedOrder.filter((id) => all.some((l) => l.id === id));
    const missingIds = all
      .filter((l) => !validStored.includes(l.id))
      .map((l) => l.id);
    const finalOrder = [...validStored, ...missingIds];

    const sorted = [...all].sort((a, b) => finalOrder.indexOf(a.id) - finalOrder.indexOf(b.id));

    setLists(sorted);

    try {
      window.localStorage.setItem(LIST_ORDER_STORAGE_KEY, JSON.stringify(finalOrder));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (expandedId) {
      setShouldScrollToLast(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // mémoriser / nettoyer la dernière étude ouverte (Lecture ↔ Études)
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
    if (!lists.length) return;
    if (!lists.some((l) => l.id === expandedId)) {
      setExpandedId(null);
    }
  }, [lists, expandedId]);

  // quand une liste restaurée est ouverte, descendre automatiquement sur le dernier élément
  useEffect(() => {
    if (!expandedId || !shouldScrollToLast) return;
    const list = lists.find((l) => l.id === expandedId);
    if (!list || !list.items.length) {
      setShouldScrollToLast(false);
      return;
    }

    const lastIdx = list.items.length - 1;
    const el = document.getElementById(`principle-item-${expandedId}-${lastIdx}`);
    if (el && 'scrollIntoView' in el) {
      (el as HTMLElement).scrollIntoView({ block: 'center', behavior: 'auto' });
    }
    setShouldScrollToLast(false);
  }, [lists, expandedId, shouldScrollToLast]);

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

    const exists = p_getAllLists().find(
      (l) => (l.title || '').trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      alert(label.duplicateTitle);
      setExpandedId(exists.id);
      return;
    }
    const created = p_createList(trimmed);
    refresh();
    setExpandedId(created.id);
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {}
  };

  const doRename = (id: string, current: string) => {
    const title = prompt(label.placeholder, current) ?? '';
    const trimmed = title.trim();
    if (!trimmed) return;
    const exists = p_getAllLists().find(
      (l) => l.id !== id && (l.title || '').trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      alert(label.duplicateTitle);
      return;
    }
    p_renameList(id, trimmed);
    refresh();
  };

  const doDelete = (id: string) => {
    if (!confirm(label.confirmDeleteList)) return;
    p_deleteList(id);
    refresh();
    if (expandedId === id) setExpandedId(null);
  };

  // Réordonner les Études (monter / descendre)
  const moveList = (id: string, dir: -1 | 1) => {
    setLists((current) => {
      const arr = [...current];
      const index = arr.findIndex((l) => l.id === id);
      if (index === -1) return current;

      const target = index + dir;
      if (target < 0 || target >= arr.length) return current;

      const [moved] = arr.splice(index, 1);
      arr.splice(target, 0, moved);

      try {
        if (typeof window !== 'undefined') {
          const order = arr.map((l) => l.id);
          window.localStorage.setItem(LIST_ORDER_STORAGE_KEY, JSON.stringify(order));
        }
      } catch {
        // ignore
      }

      return arr;
    });
  };

  // Partage au même format que "Copier", avec lien en plus
  const doShare = async (id: string) => {
    const list = p_getListById(id);
    if (!list) return;

    const payload = `${buildPlainListText(list)}

Découvrir l’application The Word :
https://www.theword.fr/#about`;

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
    const list = p_getListById(id);
    if (!list) return;
    const txt = buildPlainListText(list);
    try {
      await navigator.clipboard.writeText(txt);
      alert(label.copied + ' ✅');
    } catch {}
  };

  // --- Partage / import PAR CODE (type "principle") ---
  const doShareCode = async (id: string) => {
    const list = p_getListById(id);
    if (!list) return;
    const code = encodeSharedList('principle', list);
    try {
      await navigator.clipboard.writeText(code);
      alert(label.shareCodeCopied);
    } catch {
      prompt(label.shareCode, code);
    }
  };

  const doImportFromCode = () => {
    const code = prompt(label.importPrompt) ?? '';
    const trimmed = code.trim();
    if (!trimmed) return;

    const payload = decodeSharedList(trimmed.replace(/\s+/g, ''));
    if (!payload) {
      alert(label.importError);
      return;
    }

    const title = payload.title?.trim() || label.importTextDefaultTitle;

    const created = p_createList(title);
    p_setListItems(created.id, (payload.items || []) as VerseRef[]);
    refresh();
    setExpandedId(created.id);
    alert(label.importSuccess);
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {}
  };

  // --- Import direct depuis un TEXTE ---
  const openImportFromText = () => {
    setImportTextTitle('');
    setImportTextBody('');
    setImportSplitBlocks(true);
    setShowImportFromText(true);
  };

  const handleCreateFromText = () => {
    const title = (importTextTitle || '').trim() || label.importTextDefaultTitle;
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

    const created = p_createList(title);
    p_setListItems(created.id, items as VerseRef[]);
    refresh();
    setExpandedId(created.id);
    setShowImportFromText(false);
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {}
  };

  // --- opérations de copie/partage pour UN élément ---
  const copyItemText = async (it: AnyItem) => {
    const txt = buildItemPlainText(it);
    if (!txt) return;
    try {
      await navigator.clipboard.writeText(txt);
      alert(label.copied + ' ✅');
    } catch {}
  };

  const shareItem = async (it: AnyItem) => {
    const payload = `${buildItemPlainText(it)}

Découvrir l’application The Word :
https://www.theword.fr/#about`;

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

  // Ouverture d'un nouveau bloc texte (par défaut : en fin de liste)
  const addTextBlock = (listId: string) => {
    setEditingTextBlock({
      listId,
      idx: null,
      initialValue: '',
      insertAt: null,
    });
  };

  // Insérer un nouveau bloc texte à une position précise (ex: entre 2 items)
  const insertTextBlockAt = (listId: string, insertAt: number) => {
    setEditingTextBlock({
      listId,
      idx: null,
      initialValue: '',
      insertAt,
    });
  };

  // Édition d'un bloc texte existant
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
    if (!raw.trim()) {
      setEditingTextBlock(null);
      return;
    }

    if (editingTextBlock.idx === null) {
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

        const insertAt =
          typeof editingTextBlock.insertAt === 'number'
            ? Math.max(0, Math.min(arr.length, editingTextBlock.insertAt))
            : null;

        if (insertAt === null) {
          arr.push(newItem); // comportement actuel : ajouter en fin
        } else {
          arr.splice(insertAt, 0, newItem); // ✅ insertion entre 2 items
        }

        return arr;
      });
    } else {
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

  // format date simple
  const formatDate = (d: string | number | Date) =>
    new Date(d).toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  return (
    <div className={`min-h-[100svh] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3">
            <h1
              className={`text-2xl md:text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              } flex items-center gap-2`}
            >
              <ListIcon className="w-6 h-6" />
              {label.title}
            </h1>

            {/* Bouton aide / mode d'emploi Études */}
            <button
              type="button"
              aria-label="Aide sur la page Études"
              title="Aide / Mode d'emploi"
              onClick={() => setShowHelp(true)}
              className={`inline-flex items-center justify-center rounded-full p-2 border text-sm ${
                isDark
                  ? 'border-gray-600 text-gray-200 hover:border-indigo-400 hover:text-white'
                  : 'border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-gray-900'
              }`}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {!expandedId && (
            <div className="mt-4 space-y-2">
              {/* Gros bouton : créer une étude (VERT) */}
              <button
                onClick={doCreate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm shadow hover:bg-emerald-500 active:scale-[0.98]"
              >
                <Plus size={18} />
                {label.create}
              </button>

              {/* Boutons secondaires à droite */}
              <div className="flex flex-wrap items-center justify-end gap-2">
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
            {/* Bouton retour : vert */}
            <button
              onClick={() => setExpandedId(null)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500"
            >
              {label.backAll}
            </button>

            {/* Ajouter un bloc de texte : bleu, comme Notes */}
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
              const listIndex = lists.findIndex((l) => l.id === list.id);
              const canMoveUp = listIndex > 0;
              const canMoveDown = listIndex !== -1 && listIndex < lists.length - 1;

              return (
                <div
                  key={list.id}
                  onClick={
                    !isOpen
                      ? () => {
                          setOpenItemMenu(null);
                          setExpandedId(list.id);
                          try {
                            window.scrollTo({ top: 0, behavior: 'auto' });
                          } catch {}
                        }
                      : undefined
                  }
                  className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow p-4 ${
                    !isOpen ? 'cursor-pointer' : ''
                  }`}
                  role={!isOpen ? 'button' : undefined}
                  aria-expanded={isOpen}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {/* Titre + infos + (optionnel) boutons de réorganisation de liste */}
                  <div className="min-w-0 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xl md:text-xl font-semibold leading-snug whitespace-normal break-words">
                        {list.title}
                      </div>
                      <div className={`mt-1 text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                        {list.items.length} {label.verses} • {formatDate(list.updatedAt)}
                      </div>
                    </div>

                    {!isOpen && (
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (canMoveUp) moveList(list.id, -1);
                          }}
                          disabled={!canMoveUp}
                          title={label.moveUp}
                          className={`inline-flex items-center justify-center rounded-full p-1 border text-xs ${
                            isDark
                              ? 'border-gray-600 text-gray-200 bg-gray-900'
                              : 'border-gray-300 text-gray-700 bg-gray-50'
                          } ${!canMoveUp ? 'opacity-40 cursor-default' : 'active:scale-95'}`}
                        >
                          <ArrowUp size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (canMoveDown) moveList(list.id, 1);
                          }}
                          disabled={!canMoveDown}
                          title={label.moveDown}
                          className={`inline-flex items-center justify-center rounded-full p-1 border text-xs ${
                            isDark
                              ? 'border-gray-600 text-gray-200 bg-gray-900'
                              : 'border-gray-300 text-gray-700 bg-gray-50'
                          } ${!canMoveDown ? 'opacity-40 cursor-default' : 'active:scale-95'}`}
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions de la liste ouverte */}
                  {isOpen && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => doRename(list.id, list.title)}
                        className={`${
                          isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                        } px-3 py-2 rounded inline-flex items-center gap-2`}
                        title={t('principlesPage.renameList')}
                      >
                        <Edit3 size={16} />
                        {t('principlesPage.renameList')}
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
                        <>
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
                                if (isText) return;
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
                              const textClass = isText ? `${textBaseClass} font-serif` : textBaseClass;

                              return (
                                <li
                                  key={idx}
                                  id={`principle-item-${list.id}-${idx}`}
                                  className={`${baseItemBg} rounded-md p-3 transition ${
                                    isText ? 'border-l-4 border-indigo-400' : ''
                                  }`}
                                >
                                  <button
                                    className="w-full text-left"
                                    onClick={() =>
                                      setOpenItemMenu(menuOpen ? null : { listId: list.id, idx })
                                    }
                                  >
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

                                          <button
                                            onClick={() => copyItemText(it)}
                                            className={`inline-flex items-center gap-1 px-2 py-1.5 rounded ${
                                              isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                            }`}
                                            title={t('copyLabel')}
                                          >
                                            <Copy size={16} />
                                            {t('copyLabel')}
                                          </button>

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

{/* ✅ Forcer Monter + Descendre à rester ensemble (et donc sous "Modifier" sur Android) */}
<div className="flex flex-wrap items-center gap-2 w-full">
  <button
    onClick={() => moveItem(list.id, idx, -1)}
    className={`inline-flex items-center gap-1 px-2 py-1.5 rounded ${
      isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
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
      isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
    }`}
    disabled={idx === list.items.length - 1}
    title={label.moveDown}
  >
    <ArrowDown size={16} />
    {label.moveDown}
  </button>
</div>


                                      {/* ✅ Insérer un bloc texte juste après cet item */}
                                      <button
                                        onClick={() => insertTextBlockAt(list.id, idx + 1)}
                                        className={`inline-flex items-center gap-1 px-2 py-1.5 rounded ${
                                          isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                        }`}
                                        title={label.addTextBlock}
                                      >
                                        <TextIcon size={16} />
                                        {label.addTextBlock}
                                      </button>

                                      <button
                                        onClick={() => removeItem(list.id, idx)}
                                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-red-600 text-white hover:bg-red-500"
                                        title={label.deleteItem}
                                      >
                                        <Trash2 size={16} />
                                        {label.deleteItem}
                                      </button>

                                      <button
                                        onClick={() => setOpenItemMenu(null)}
                                        className={`px-2 py-1.5 rounded ${
                                          isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                        }`}
                                      >
                                        {label.cancel}
                                      </button>

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

                          {/* Bouton "Ajouter un bloc texte" en bas de la liste ouverte */}
                          <div className="mt-4 flex justify-center">
                            <button
                              onClick={() => addTextBlock(list.id)}
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 text-sm"
                            >
                              <TextIcon size={16} />
                              {label.addTextBlock}
                            </button>
                          </div>
                        </>
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
            <h2 className="text-lg font-semibold mb-2">{label.importFromTextTitle}</h2>

            <div className="mb-3">
              <label className="block text-sm mb-1">{label.importTextTitlePlaceholder}</label>
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
              <label className="block text-sm mb-1">{label.documentContent}</label>
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
              <div className="mt-1 text-xs opacity-75">{label.importTextInfo}</div>
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
                  isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
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

      {/* MODALE : édition / création d'un bloc de texte */}
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
                  isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
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

      {/* MODALE : Aide / mode d'emploi (même texte que Notes) */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowHelp(false)} aria-hidden="true" />
          <div
            className={`relative w-full max-w-lg mx-4 rounded-2xl p-5 max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <h2 className="text-xl font-semibold mb-3">{label.helpTitle}</h2>

            <div
              className="space-y-3 leading-relaxed text-left"
              style={{
                fontSize: `${state.settings.fontSize}px`,
                lineHeight: 1.6,
              }}
            >
              <p>{label.helpIntro}</p>

              <p>
                <strong>{label.help1Title}</strong>
                <br />
                {label.help1Body}
              </p>

              <p>
                <strong>{label.help2Title}</strong>
                <br />
                {label.help2Body}
              </p>

              <p>
                <strong>{label.help3Title}</strong>
                <br />
                {label.help3Body}
              </p>

              <p>
                <strong>{label.help4Title}</strong>
                <br />
                {label.help4Body}
              </p>

              <p>
                <strong>{label.help5Title}</strong>
                <br />
                {label.help5Body}
              </p>

              <p>
                <strong>{label.help6Title}</strong>
                <br />
                {label.help6Body}
              </p>

              <p>
                <strong>{label.help7Title}</strong>
                <br />
                {label.help7Body}
              </p>

              <p>
                <strong>{label.help8Title}</strong>
                <br />
                {label.help8Body}
              </p>

              <p>
                <strong>{label.help9Title}</strong>
                <br />
                {label.help9Body}
              </p>

              <p>
                <strong>{label.help10Title}</strong>
                <br />
                {label.help10Body}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowHelp(false)}
                className={`px-3 py-1.5 rounded text-sm ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                }`}
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



