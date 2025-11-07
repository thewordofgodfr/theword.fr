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
  moveItemInList,
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
  Edit2 as EditTextIcon,
} from 'lucide-react';

/** Sentinelle pour distinguer un bloc de texte libre d'un verset */
const TEXT_SENTINEL = '__TEXT__';

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

export default function Notes() {
  const { state, setPage } = useApp();
  const { t } = useTranslation();
  const isDark = state.settings.theme === 'dark';

  const [lists, setLists] = useState<VerseList[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // item sélectionné pour afficher ses actions
  const [openItemMenu, setOpenItemMenu] = useState<{ listId: string; idx: number } | null>(null);

  const label = useMemo(
    () => ({
      title: state.settings.language === 'fr' ? 'Notes' : 'Notes',
      create: state.settings.language === 'fr' ? 'Créer une liste' : 'Create list',
      placeholder: state.settings.language === 'fr' ? 'Titre de la liste…' : 'List title…',
      empty: state.settings.language === 'fr' ? 'Aucune liste pour l’instant.' : 'No lists yet.',
      verses: state.settings.language === 'fr' ? 'éléments' : 'items',
      openReading: state.settings.language === 'fr' ? 'Ouvrir la lecture' : 'Open Reading',
      copied: state.settings.language === 'fr' ? 'Copié' : 'Copied',
      backAll: state.settings.language === 'fr' ? '← Toutes les listes' : '← All lists',
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
    }),
    [state.settings.language]
  );

  const refresh = () => setLists(getAllLists());
  useEffect(() => {
    refresh();
  }, []);

  const doCreate = () => {
    const title = prompt(label.placeholder) ?? '';
    const trimmed = title.trim();
    if (!trimmed) return;
    // éviter doublons de titre (insensible à la casse)
    const exists = getAllLists().find(
      (l) => (l.title || '').trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
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
      alert(
        state.settings.language === 'fr'
          ? 'Un titre identique existe déjà.'
          : 'A list with the same title already exists.'
      );
      return;
    }
    renameList(id, trimmed);
    refresh();
  };

  const doDelete = (id: string) => {
    if (
      !confirm(
        state.settings.language === 'fr' ? 'Supprimer cette liste ?' : 'Delete this list?'
      )
    )
      return;
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
        await nav.share({ title: list.title || 'Notes', text: payload });
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
    const list = getListById(id);
    if (!list) return;
    const txt = buildPlainListText(list);
    try {
      await navigator.clipboard.writeText(txt);
      alert(label.copied + ' ✅');
    } catch {}
  };

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

  // quand une liste est ouverte, n'afficher qu'elle
  const shownLists = expandedId ? lists.filter((l) => l.id === expandedId) : lists;

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
            {shownLists.map((list) => {
              const isOpen = expandedId === list.id;
              return (
                <div
                  key={list.id}
                  className={`${
                    isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                  } rounded-xl shadow p-4`}
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Titre cliquable pour ouvrir/fermer */}
                    <button
                      onClick={() => {
                        setOpenItemMenu(null);
                        setExpandedId(isOpen ? null : list.id);
                      }}
                      className="min-w-0 text-left"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                      aria-expanded={isOpen}
                    >
                      <div className="font-semibold truncate">{list.title}</div>
                      <div className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                        {list.items.length} {label.verses} •{' '}
                        {new Date(list.updatedAt).toLocaleString()}
                      </div>
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Partager */}
                      <button
                        onClick={() => doShare(list.id)}
                        className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                        title="Partager"
                      >
                        <Share2 size={16} />
                      </button>
                      {/* Copier */}
                      <button
                        onClick={() => copyListText(list.id)}
                        className={`${
                          isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                        } px-3 py-2 rounded`}
                        title="Copier"
                      >
                        <Copy size={16} />
                      </button>
                      {/* Renommer */}
                      <button
                        onClick={() => doRename(list.id, list.title)}
                        className={`${
                          isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                        } px-3 py-2 rounded`}
                        title="Renommer"
                      >
                        <Edit3 size={16} />
                      </button>
                      {/* Supprimer la liste */}
                      <button
                        onClick={() => doDelete(list.id)}
                        className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-500"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

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
                                  {!isText ? (
                                    <div className="font-semibold">
                                      {(it.bookName ?? it.bookId) || ''} {it.chapter}:{it.verse}
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 font-semibold">
                                      <TextIcon className="w-4 h-4 opacity-80" />
                                      {state.settings.language === 'fr'
                                        ? 'Bloc de texte'
                                        : 'Text block'}
                                    </div>
                                  )}

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
                                      <button
                                        onClick={openInReading}
                                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-500"
                                      >
                                        {label.open}
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

                                    {isText && (
                                      <button
                                        onClick={() => editTextBlock(list.id, idx, String(it.text || ''))}
                                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                                      >
                                        <EditTextIcon size={16} />
                                        {label.editTextBlock}
                                      </button>
                                    )}

                                    <button
                                      onClick={() => removeItem(list.id, idx)}
                                      className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-red-600 text-white hover:bg-red-500"
                                    >
                                      <Trash2 size={16} />
                                      {label.deleteItem}
                                    </button>

                                    <button
                                      onClick={() => setOpenItemMenu(null)}
                                      className={`ml-auto px-2 py-1.5 rounded ${
                                        isDark
                                          ? 'bg-gray-700 text-white'
                                          : 'bg-white text-gray-800'
                                      }`}
                                    >
                                      {label.cancel}
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
