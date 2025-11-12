// src/pages/Principes.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { getBibleBooks, getChapter } from '../services/bibleService';
import type { VerseRef } from '../types/collections';
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
  RefreshCw
} from 'lucide-react';

/** Même sentinelle que Notes pour bloc texte */
const TEXT_SENTINEL = '__TEXT__';

type AnyItem = VerseRef & {
  kind?: 'text' | 'verse';
};

type PList = {
  id: string;
  title: string;
  items: AnyItem[];
  createdAt: number;
  updatedAt: number;
};

const LS_KEY = 'twog_principles_lists_v1';

/** --- OUTILS --- */

/** map "Matthieu" -> "MT" etc., via bibleService */
function useBookMaps(lang: 'fr' | 'en') {
  const [byName, setByName] = useState<Record<string, { id: string; name: string }>>({});
  const [byId, setById] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const books = await getBibleBooks(lang);
      const _byName: Record<string, { id: string; name: string }> = {};
      const _byId: Record<string, string> = {};
      books.forEach((b: any) => {
        const n1 = (b.name || '').trim();
        const n2 = (b.alt || '').trim();
        if (n1) _byName[n1.toLowerCase()] = { id: b.id, name: n1 };
        if (n2) _byName[n2.toLowerCase()] = { id: b.id, name: n1 };
        _byId[b.id] = n1 || b.id;
      });
      setByName(_byName);
      setById(_byId);
    })();
  }, [lang]);

  return { byName, byId };
}

/** "Jean 3:16-17" -> [{bookId:'JN', chapter:3, verse:16}, {..:17}] */
function expandRefString(ref: string, byName: Record<string, { id: string; name: string }>): AnyItem[] {
  // ex: "1 Pierre 2.21-25" ou "Jean 1.1 et 14" -> on standardise aux ":" et ","
  const cleaned = ref
    .replace(/\s*et\s*/gi, ',')
    .replace(/[．。]/g, '.')
    .replace(/\s+/g, ' ')
    .trim();

  // split book name vs chapter:verse part
  const m = cleaned.match(/^(.+?)\s+(\d+)[\.:](.+)$/);
  if (!m) return [];
  const bookName = m[1].trim().toLowerCase();
  const chapter = parseInt(m[2].trim(), 10);
  const tail = m[3].trim();

  const book = byName[bookName];
  if (!book) return [];

  // tail like "1-5,8,14-16"
  const parts = tail.split(',').map(s => s.trim()).filter(Boolean);

  const items: AnyItem[] = [];
  for (const p of parts) {
    if (p.includes('-')) {
      const [a, b] = p.split('-').map(s => parseInt(s.trim(), 10));
      if (!isNaN(a) && !isNaN(b) && b >= a) {
        for (let v = a; v <= b; v++) {
          items.push({
            bookId: book.id,
            bookName: book.name,
            chapter,
            verse: v,
            text: '',
            translation: 'fr',
            kind: 'verse',
          });
        }
      }
    } else {
      const v = parseInt(p, 10);
      if (!isNaN(v)) {
        items.push({
          bookId: book.id,
          bookName: book.name,
          chapter,
          verse: v,
          text: '',
          translation: 'fr',
          kind: 'verse',
        });
      }
    }
  }
  return items;
}

/** Résout le TEXTE pour chaque verset depuis bibleService.getChapter */
async function resolveVersesText(items: AnyItem[], lang: 'fr' | 'en') {
  // group by bookId+chapter to reduce calls
  const byKey: Record<string, AnyItem[]> = {};
  for (const it of items) {
    if (it.bookId === TEXT_SENTINEL) continue;
    const key = `${it.bookId}|${it.chapter}`;
    (byKey[key] ??= []).push(it);
  }
  for (const key of Object.keys(byKey)) {
    const [bookId, chapStr] = key.split('|');
    const chapter = parseInt(chapStr, 10);
    try {
      const chapterData: any = await getChapter(lang, bookId, chapter);
      const verses: any[] = chapterData?.verses || [];
      const map: Record<number, string> = {};
      verses.forEach((v: any) => { map[Number(v.verse)] = String(v.text || ''); });
      for (const it of byKey[key]) {
        it.text = map[it.verse] ?? (it.text || '');
        it.translation = lang;
      }
    } catch {}
  }
  return items;
}

/** copie intégrale d'une liste en texte simple + titre + lignes */
function buildPlainListText(list: PList): string {
  const lines: string[] = [];
  const title = (list.title || '').trim();
  if (title) lines.push(title);
  lines.push('');

  for (const it of list.items) {
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

function buildItemPlainText(it: AnyItem): string {
  const isText = it.bookId === TEXT_SENTINEL;
  if (isText) return String(it.text ?? '').trim();
  const ref = `${(it.bookName ?? it.bookId) || ''} ${it.chapter}:${it.verse}`.trim();
  const body = String(it.text ?? '').trim();
  return body ? `${ref}\n${body}` : ref;
}

/** --- BLUEPRINT des études importées du PDF (3 études préchargées) --- */
function usePrinciplesBlueprint(lang: 'fr' | 'en') {
  const { byName } = useBookMaps(lang);

  const [blueprint, setBlueprint] = useState<Array<{ title: string; blocks: Array<string | { text: string }> }>>([]);

  useEffect(() => {
    // Pour limiter la longueur du message, 3 études sont préchargées entièrement.
    // Format blocks: 
    // - string = référence composite à développer (ex: "Jean 1:1,14" ou "Jean 8:1-11")
    // - {text} = commentaire libre intercalé (bloc texte)
    setBlueprint([
      {
        title: 'Qui est Jésus ?',
        blocks: [
          { text: 'But : Découvrir Jésus et son caractère, afin de le suivre.' },
          'Matthieu 16:13-17',
          'Jean 1:1',
          'Jean 1:14',
          'Colossiens 2:9',
          'Jean 8:1-11',
          'Jean 2:13-17',
          'Matthieu 26:36-39',
          'Jean 14:6',
          '1 Jean 2:3-6',
          { text: 'Passages supplémentaires :' },
          'Hébreux 1:1-3',
          'Hébreux 4:15-16',
          'Actes 4:12',
          'Philippiens 2:5-11',
          'Philippiens 3:7-10',
          'Hébreux 2:9-11',
        ],
      },
      {
        title: 'La Parole de Dieu',
        blocks: [
          { text: 'But : Voir ce que la Bible dit d’elle-même et l’incidence pour nos vies.' },
          '2 Timothée 3:16-17',
          'Hébreux 4:12-13',
          'Jean 8:31-32',
          'Jean 12:47-50',
          'Matthieu 7:24-27',
          'Jacques 1:22-25',
          'Matthieu 15:1-9',
          '2 Timothée 4:3-4',
          'Romains 10:17',
          { text: 'Passages supplémentaires :' },
          '1 Timothée 4:16',
          '2 Pierre 1:20-21',
          'Luc 8:4-15',
          'Jean 14:15',
          'Jean 14:21',
          'Jean 14:23-24',
          'Romains 15:4',
          '2 Pierre 3:15-16',
          'Psaume 1:1-6',
          'Psaume 19:8-12',
          'Psaume 119:9-16',
          'Ésaïe 66:1-2',
        ],
      },
      {
        title: 'Disciple de Jésus',
        blocks: [
          { text: 'But : Réaliser l’appel de Jésus à le suivre et comment cela se manifeste.' },
          'Luc 6:40',
          'Luc 11:1-4',
          'Luc 9:23-26',
          'Luc 14:25-33',
          'Jean 13:34-35',
          'Jean 15:5-8',
          'Jean 4:36',
          'Matthieu 28:18-20',
          { text: 'Passages supplémentaires :' },
          'Marc 10:28-31',
          'Philippiens 1:20-21',
          'Galates 2:20',
          '1 Pierre 2:21',
        ],
      },
      // 👉 Je peux ajouter ici les 9 autres études (même format) dans un prochain envoi.
    ]);
  }, [lang]);

  /** transforme blueprint -> listes d’items (versets étendus + textes) */
  const buildLists = async (): Promise<PList[]> => {
    const now = Date.now();
    const lists: PList[] = [];
    for (const [idx, b] of blueprint.entries()) {
      const items: AnyItem[] = [];
      for (const block of b.blocks) {
        if (typeof block === 'string') {
          const expanded = expandRefString(block, byName);
          items.push(...expanded);
        } else {
          items.push({
            bookId: TEXT_SENTINEL,
            bookName: '',
            chapter: 0,
            verse: 0,
            text: block.text,
            translation: 'fr',
            kind: 'text',
          });
        }
      }
      lists.push({
        id: `principle_${idx + 1}`,
        title: b.title,
        items,
        createdAt: now,
        updatedAt: now,
      });
    }
    return lists;
  };

  return { buildLists };
}

/** --- PAGE --- */
export default function Principes() {
  const { state, setPage } = useApp();
  const { t } = useTranslation();
  const isDark = state.settings.theme === 'dark';
  const lang = state.settings.language === 'fr' ? 'fr' : 'en';

  const { buildLists } = usePrinciplesBlueprint(lang);

  const [lists, setLists] = useState<PList[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [openItemMenu, setOpenItemMenu] = useState<{ listId: string; idx: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const label = useMemo(
    () => ({
      title: state.settings.language === 'fr' ? 'Principes' : 'Studies',
      reload: state.settings.language === 'fr' ? 'Recharger depuis le PDF' : 'Reload from PDF',
      empty: state.settings.language === 'fr' ? 'Aucune étude.' : 'No studies yet.',
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
        state.settings.language === 'fr' ? 'Supprimer cet élément ?' : 'Delete this item?',
      newTextPlaceholder: state.settings.language === 'fr' ? 'Votre texte…' : 'Your text…',
      rename: state.settings.language === 'fr' ? 'Renommer' : 'Rename',
      share: state.settings.language === 'fr' ? 'Partager' : 'Share',
      copy: state.settings.language === 'fr' ? 'Copier' : 'Copy',
      deleteList: state.settings.language === 'fr' ? 'Supprimer' : 'Delete',
    }),
    [state.settings.language]
  );

  /** charge depuis LS sinon depuis blueprint, puis résout les textes */
  const loadOrSeed = async () => {
    setLoading(true);
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed: PList[] = JSON.parse(saved);
        setLists(parsed);
        setLoading(false);
        return;
      }
      // seed depuis le blueprint
      let seeded = await buildLists();
      // resolve textes
      for (const l of seeded) {
        l.items = await resolveVersesText(l.items, lang);
        l.updatedAt = Date.now();
      }
      localStorage.setItem(LS_KEY, JSON.stringify(seeded));
      setLists(seeded);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrSeed(); // première ouverture
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const save = (next: PList[]) => {
    setLists(next);
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
  };

  const refreshTexts = async () => {
    setLoading(true);
    try {
      const next = [...lists];
      for (const l of next) {
        l.items = await resolveVersesText(l.items, lang);
        l.updatedAt = Date.now();
      }
      save(next);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d: string | number | Date) =>
    new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });

  // --- actions liste ---
  const doRename = (id: string, current: string) => {
    const title = prompt(label.rename, current) ?? '';
    const trimmed = title.trim();
    if (!trimmed) return;
    const next = lists.map(l => (l.id === id ? { ...l, title: trimmed, updatedAt: Date.now() } : l));
    save(next);
  };

  const doDelete = (id: string) => {
    if (!confirm(state.settings.language === 'fr' ? 'Supprimer cette étude ?' : 'Delete this study?')) return;
    const next = lists.filter(l => l.id !== id);
    save(next);
    if (expandedId === id) setExpandedId(null);
  };

  const doShare = async (id: string) => {
    const list = lists.find(l => l.id === id);
    if (!list) return;
    const payload = buildPlainListText(list) + '\nhttps://www.theword.fr\n';
    try {
      const nav: any = navigator;
      if (nav?.share) {
        await nav.share({ title: list.title || 'Étude', text: payload });
      } else {
        await navigator.clipboard.writeText(payload);
        alert((state.settings.language === 'fr' ? 'Texte prêt à partager (copié)' : 'Text ready to share (copied)') + ' ✅');
      }
    } catch {}
  };

  const copyListText = async (id: string) => {
    const list = lists.find(l => l.id === id);
    if (!list) return;
    const txt = buildPlainListText(list);
    try {
      await navigator.clipboard.writeText(txt);
      alert(label.copied + ' ✅');
    } catch {}
  };

  // --- items ---
  const updateItems = (listId: string, updater: (items: AnyItem[]) => AnyItem[]) => {
    const next = lists.map(l => {
      if (l.id !== listId) return l;
      const items = updater(l.items);
      return { ...l, items, updatedAt: Date.now() };
    });
    save(next);
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
        alert((state.settings.language === 'fr' ? 'Texte prêt à partager (copié)' : 'Text ready to share (copied)') + ' ✅');
      }
    } catch {}
  };

  const shownLists = expandedId ? lists.filter((l) => l.id === expandedId) : lists;

  return (
    <div className={`min-h-[100svh] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
            <ListIcon className="w-6 h-6" />
            {label.title}
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshTexts}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60"
              title={label.reload}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              {label.reload}
            </button>
          </div>
        </div>

        {expandedId && (
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={() => setExpandedId(null)}
              className={`${isDark ? 'text-white bg-gray-700' : 'text-gray-700 bg-gray-200'} px-3 py-1.5 rounded`}
            >
              {label.backAll}
            </button>

            <button
              onClick={() => addTextBlock(expandedId)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <TextIcon size={16} />
              {label.addTextBlock}
            </button>
          </div>
        )}

        {loading ? (
          <div className={`${isDark ? 'text-white/80' : 'text-gray-600'} text-center py-16`}>
            {state.settings.language === 'fr' ? 'Chargement…' : 'Loading…'}
          </div>
        ) : shownLists.length === 0 ? (
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
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {/* En-tête */}
                  <div className="min-w-0">
                    <div className="text-lg md:text-xl font-semibold leading-snug whitespace-normal break-words">
                      {list.title}
                    </div>
                    <div className={`mt-1 text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                      {list.items.length} {label.verses} • {formatDate(list.updatedAt)}
                    </div>
                  </div>

                  {/* Icônes d’action (vue ouverte uniquement) */}
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

                  {/* Contenu liste */}
                  {isOpen && (
                    <div className={`mt-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-3`}>
                      {list.items.length === 0 ? (
                        <div className={`${isDark ? 'text-white/70' : 'text-gray-600'} text-sm`}>
                          {state.settings.language === 'fr' ? 'Liste vide.' : 'Empty list.'}
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {list.items.map((it, idx) => {
                            const isText = it.bookId === TEXT_SENTINEL;
                            const menuOpen = openItemMenu?.listId === list.id && openItemMenu?.idx === idx;

                            const openInReading = () => {
                              if (isText) return;
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
                                className={`${isDark ? 'bg-gray-600/40 hover:bg-gray-600/60' : 'bg-white hover:bg-gray-100'} rounded-md p-3 transition`}
                              >
                                <button
                                  className="w-full text-left"
                                  onClick={() => setOpenItemMenu(menuOpen ? null : { listId: list.id, idx })}
                                >
                                  {!isText ? (
                                    <div className="font-semibold">
                                      {(it.bookName ?? it.bookId) || ''} {it.chapter}:{it.verse}
                                    </div>
                                  ) : null}

                                  {it.text ? (
                                    <div
                                      style={{ fontSize: `${state.settings.fontSize}px`, lineHeight: '1.55' }}
                                      className={isDark ? 'text-white mt-1' : 'text-gray-800 mt-1'}
                                    >
                                      {it.text}
                                    </div>
                                  ) : null}
                                </button>

                                {menuOpen && (
                                  <div className={`mt-3 flex flex-wrap items-center gap-2 rounded-md px-2 py-2 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
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
                                          className={`inline-flex items-center gap-1 px-2 py-1.5 rounded ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                                          title={label.copy}
                                        >
                                          <Copy size={16} />
                                          {label.copy}
                                        </button>

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
                                      className={`inline-flex items-center gap-1 px-2 py-1.5 rounded ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                                      disabled={idx === 0}
                                      title={label.moveUp}
                                    >
                                      <ArrowUp size={16} />
                                      {label.moveUp}
                                    </button>

                                    <button
                                      onClick={() => moveItem(list.id, idx, 1)}
                                      className={`inline-flex items-center gap-1 px-2 py-1.5 rounded ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                                      disabled={idx === list.items.length - 1}
                                      title={label.moveDown}
                                    >
                                      <ArrowDown size={16} />
                                      {label.moveDown}
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
                                      className={`${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} ml-auto px-2 py-1.5 rounded`}
                                    >
                                      {label.cancel}
                                    </button>

                                    <button
                                      onClick={() => setOpenItemMenu(null)}
                                      className="px-2 py-1.5 rounded bg-green-600 text-white hover:bg-green-500"
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
