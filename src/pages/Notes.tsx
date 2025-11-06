// src/pages/Notes.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import {
  getAllLists, createList, renameList, deleteList, getListById
} from '../services/collectionsService';
import type { VerseList } from '../types/collections';
import { List as ListIcon, Edit3, Trash2, Share2, Plus, Copy } from 'lucide-react';

/** Mise en page "texte brut" :
 *  Titre
 *  (ligne vide)
 *  Livre Chapitre:Verset
 *  Texte
 *  (ligne vide)
 *  ...
 */
function buildPlainListText(list: VerseList): string {
  const lines: string[] = [];
  lines.push((list.title || '').trim());
  lines.push(''); // <<< ligne vide entre le titre et le 1er verset

  for (const it of list.items) {
    const ref = `${(it.bookName ?? it.bookId) || ''} ${it.chapter}:${it.verse}`;
    lines.push(ref.trim());
    if (it.text && String(it.text).trim()) lines.push(String(it.text).trim());
    lines.push(''); // ligne vide entre les items
  }

  // supprimer les lignes vides terminales
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  lines.push(''); // terminer par un \n
  return lines.join('\n');
}

export default function Notes() {
  const { state, setPage } = useApp();
  const { t } = useTranslation();
  const isDark = state.settings.theme === 'dark';

  const [lists, setLists] = useState<VerseList[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const label = useMemo(() => ({
    title: state.settings.language === 'fr' ? 'Notes' : 'Notes',
    create: state.settings.language === 'fr' ? 'Créer une liste' : 'Create list',
    placeholder: state.settings.language === 'fr' ? 'Titre de la liste…' : 'List title…',
    empty: state.settings.language === 'fr' ? 'Aucune liste pour l’instant.' : 'No lists yet.',
    verses: state.settings.language === 'fr' ? 'versets' : 'verses',
    openReading: state.settings.language === 'fr' ? 'Ouvrir la lecture' : 'Open Reading',
    copied: state.settings.language === 'fr' ? 'Copié' : 'Copied',
    backAll: state.settings.language === 'fr' ? '← Toutes les listes' : '← All lists',
  }), [state.settings.language]);

  const refresh = () => setLists(getAllLists());
  useEffect(() => { refresh(); }, []);

  const doCreate = () => {
    const title = prompt(label.placeholder) ?? '';
    const trimmed = title.trim();
    if (!trimmed) return;
    // éviter doublons de titre (insensible à la casse)
    const exists = getAllLists().find(l => (l.title || '').trim().toLowerCase() === trimmed.toLowerCase());
    if (exists) { setExpandedId(exists.id); return; }
    const created = createList(trimmed);
    refresh();
    setExpandedId(created.id);
  };

  const doRename = (id: string, current: string) => {
    const title = prompt(label.placeholder, current) ?? '';
    const trimmed = title.trim();
    if (!trimmed) return;
    const exists = getAllLists().find(l => l.id !== id && (l.title || '').trim().toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      alert(state.settings.language === 'fr' ? 'Un titre identique existe déjà.' : 'A list with the same title already exists.');
      return;
    }
    renameList(id, trimmed);
    refresh();
  };

  const doDelete = (id: string) => {
    if (!confirm(state.settings.language === 'fr'
      ? 'Supprimer cette liste ?'
      : 'Delete this list?')) return;
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
        alert((state.settings.language === 'fr' ? 'Texte prêt à partager (copié)' : 'Text ready to share (copied)') + ' ✅');
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

  // quand une liste est ouverte, n'afficher qu'elle
  const shownLists = expandedId ? lists.filter(l => l.id === expandedId) : lists;

  return (
    <div className={`min-h-[100svh] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
            <ListIcon className="w-6 h-6" />
            {label.title}
          </h1>

          {!expandedId && (
            <button onClick={doCreate} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500">
              <Plus size={18} />
              {label.create}
            </button>
          )}
        </div>

        {expandedId && (
          <div className="mb-4">
            <button
              onClick={() => setExpandedId(null)}
              className={`${isDark ? 'text-white bg-gray-700' : 'text-gray-700 bg-gray-200'} px-3 py-1.5 rounded`}
            >
              {label.backAll}
            </button>
          </div>
        )}

        {shownLists.length === 0 ? (
          <div className={`${isDark ? 'text-white/80' : 'text-gray-600'} text-center py-16`}>
            {label.empty}
          </div>
        ) : (
          <div className="space-y-4">
            {shownLists.map(list => {
              const isOpen = expandedId === list.id;
              return (
                <div key={list.id} className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow p-4`}>
                  <div className="flex items-center justify-between gap-3">
                    {/* Titre cliquable pour ouvrir/fermer */}
                    <button
                      onClick={() => setExpandedId(isOpen ? null : list.id)}
                      className="min-w-0 text-left"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                      aria-expanded={isOpen}
                    >
                      <div className="font-semibold truncate">{list.title}</div>
                      <div className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                        {list.items.length} {label.verses} • {new Date(list.updatedAt).toLocaleString()}
                      </div>
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Partager (nouveau format) */}
                      <button onClick={() => doShare(list.id)} className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500" title="Partager">
                        <Share2 size={16} />
                      </button>
                      {/* Copier (nouveau format) */}
                      <button onClick={() => copyListText(list.id)} className={`${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded`} title="Copier">
                        <Copy size={16} />
                      </button>
                      {/* Renommer */}
                      <button onClick={() => doRename(list.id, list.title)} className={`${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded`} title="Renommer">
                        <Edit3 size={16} />
                      </button>
                      {/* Supprimer la liste */}
                      <button onClick={() => doDelete(list.id)} className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-500" title="Supprimer">
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
                          {list.items.map((it, idx) => {
                            const openInReading = () => {
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
                                onClick={openInReading}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openInReading()}
                                className={`${isDark ? 'bg-gray-600/40 hover:bg-gray-600/60' : 'bg-white hover:bg-gray-100'} cursor-pointer rounded-md p-3 transition`}
                              >
                                <div className="font-semibold">
                                  {it.bookName ?? it.bookId} {it.chapter}:{it.verse}
                                </div>
                                {it.text ? (
                                  <div
                                    style={{ fontSize: `${state.settings.fontSize}px`, lineHeight: '1.55' }}
                                    className={isDark ? 'text-white' : 'text-gray-800'}
                                  >
                                    {it.text}
                                  </div>
                                ) : null}
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
