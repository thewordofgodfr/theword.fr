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
      // Nouveau : partage / import par code
      shareCode: state.settings.language === 'fr' ? 'Code' : 'Code',
      importCode: state.settings.language === 'fr' ? 'Importer un code' : 'Import code',
      importPrompt:
        state.settings.language === 'fr'
          ? 'Collez ici le code de partage TheWord :'
          : 'Paste the TheWord share code here:',
      importError:
        state.settings.language === 'fr'
          ? 'Code invalide.'
          : 'Invalid code.',
      importSuccess:
        state.settings.language === 'fr'
          ? 'Liste importée avec succès ✅'
          : 'List imported successfully ✅',
      shareCodeCopied:
        state.settings.language === 'fr'
          ? 'Code copié dans le presse-papiers ✅'
          : 'Code copied to clipboard ✅',
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

    const title =
      payload.title?.trim() ||
      (state.settings.language === 'fr' ? 'Import TheWord' : 'TheWord import');

    // On crée une nouvelle liste avec ce titre,
    // puis on injecte les items importés (y compris blocs texte).
    const created = createList(title);
    setListItems(created.id, (payload.items || []) as VerseRef[]);
    refresh();
    setExpandedId(created.id);
    alert(label.importSuccess);
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

  // format date sans heure (création / modif) — affichage simple type 31/12/2025
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
            <div className="flex items-center gap-2">
              {/* Importer depuis un CODE TheWord */}
              <button
                onClick={doImportFromCode}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm ${
                  isDark
                    ? 'border-gray-500 text-gray-100'
                    : 'border-gray-300 text-gray-800'
                }`}
              >
                <Copy size={16} />
                {label.importCode}
              </button>

              <button
                onClick={doCreate}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
              >
                <Plus size={18} />
                {label.create}
              </button>
            </div>
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
                        className={`${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded inline-flex items-center gap-2`}
                        title="Renommer"
                      >
                        <Edit3 size={16} />
                        Renommer
                      </button>

                      <button
                        onClick={() => doShare(list.id)}
                        className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 inline-flex items-center gap-2"
                        title="Partager"
                      >
                        <Share2 size={16} />
                        Partager
                      </button>

                      <button
                        onClick={() => copyListText(list.id)}
                        className={`${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded inline-flex items-center gap-2`}
                        title="Copier"
                      >
                        <Copy size={16} />
                        Copier
                      </button>

                      {/* Nouveau : bouton "Code" pour cette liste */}
                      <button
                        onClick={() => doShareCode(list.id)}
                        className={`${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded inline-flex items-center gap-2`}
                        title={label.shareCode}
                      >
                        <Copy size={16} />
                        {label.shareCode}
                      </button>

                      <button
                        onClick={() => doDelete(list.id)}
                        className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-500 inline-flex items-center gap-2"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                        Supprimer
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
                                          title="Copier"
                                        >
                                          <Copy size={16} />
                                          Copier
                                        </button>

                                        {/* Partager ce verset */}
                                        <button
                                          onClick={() => shareItem(it)}
                                          className="inline-flex items-center gap-1 px-2 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                                          title="Partager"
                                        >
                                          <Share2 size={16} />
                                          Partager
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

