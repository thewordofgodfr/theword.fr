// src/pages/Search.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { getBibleBooks, searchInBible } from '../services/bibleService';
import type { BibleVerse } from '../types/bible';
import { ChevronDown, ChevronRight, Loader2, Search as SearchIcon, X } from 'lucide-react';
import { saveSlot as saveQuickSlot } from '../services/readingSlots';
import { useTranslation } from '../hooks/useTranslation';

/* -------- Types -------- */

type ResultItem = BibleVerse & { occ: number };

type Grouped = {
  bookId: string;
  displayName: string;
  verses: ResultItem[];
  occ: number; // total occurrences in this book
};

/* ========= Utils (accents/ligatures, préfixe, etc.) ========= */

function normalizeLigatures(s: string) {
  return s.replace(/œ/g, 'oe').replace(/Œ/g, 'oe').replace(/æ/g, 'ae').replace(/Æ/g, 'ae');
}

// Lettres/chiffres autorisés : latin, grec (deux blocs) et hébreu
const ALNUM = /[A-Za-z0-9\u0370-\u03FF\u1F00-\u1FFF\u0590-\u05FF]/;

function normalizeForSearch(s: string) {
  const noLig = normalizeLigatures(s);
  const deAccented = noLig
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u0591-\u05C7]/g, '');

  return deAccented
    .toLowerCase()
    .replace(/[^A-Za-z0-9\u0370-\u03FF\u1F00-\u1FFF\u0590-\u05FF]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function buildNormalizedWithMap(input: string) {
  const src = normalizeLigatures(input);
  const normChars: string[] = [];
  const idxMap: number[] = [];
  let lastWasSpace = false;

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    const base = ch
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u0591-\u05C7]/g, '');

    let emitted = false;
    for (let k = 0; k < base.length; k++) {
      const c = base[k];
      if (ALNUM.test(c)) {
        normChars.push(c.toLowerCase());
        idxMap.push(i);
        emitted = true;
        lastWasSpace = false;
      }
    }
    if (!emitted) {
      if (!lastWasSpace) {
        normChars.push(' ');
        idxMap.push(i);
        lastWasSpace = true;
      }
    }
  }

  let start = 0;
  while (start < normChars.length && normChars[start] === ' ') start++;
  let end = normChars.length;
  while (end > start && normChars[end - 1] === ' ') end--;

  const norm = normChars.slice(start, end).join('');
  const map = idxMap.slice(start, end);
  return { norm, map };
}

/* ===== Helpers pour la version "simple" (1 seul mot) ===== */

function isLetterOrDigit(ch: string) {
  return /[\p{L}\p{N}]/u.test(ch);
}

function scanWords(text: string): Array<{ start: number; end: number }> {
  const res: Array<{ start: number; end: number }> = [];
  const len = text.length;
  let i = 0;

  while (i < len) {
    while (i < len && !isLetterOrDigit(text[i])) i++;
    if (i >= len) break;
    const start = i;
    while (i < len && isLetterOrDigit(text[i])) i++;
    const end = i;
    res.push({ start, end });
  }

  return res;
}

function findMatchesInNorm(
  norm: string,
  normQuery: string,
  endsWithSpace: boolean
): Array<{ start: number; end: number }> {
  if (!norm || !normQuery) return [];

  const matches: Array<{ start: number; end: number }> = [];
  const qlen = normQuery.length;
  const nlen = norm.length;

  let i = 0;
  while (i <= nlen - qlen) {
    if (i > 0 && norm[i - 1] !== ' ') {
      i++;
      continue;
    }

    if (norm.slice(i, i + qlen) !== normQuery) {
      i++;
      continue;
    }

    if (endsWithSpace) {
      const end = i + qlen;
      if (end < nlen && norm[end] !== ' ') {
        i++;
        continue;
      }
      matches.push({ start: i, end });
    } else {
      let end = i + qlen;
      while (end < nlen && norm[end] !== ' ') end++;
      matches.push({ start: i, end });
    }

    i++;
  }

  return matches;
}

function countMatchesFlexible(text: string, query: string): number {
  const normQuery = normalizeForSearch(query);
  if (!normQuery) return 0;

  const endsWithSpace = /\s$/.test(query);

  if (!normQuery.includes(' ')) {
    const words = scanWords(text);
    let count = 0;

    for (const w of words) {
      const word = text.slice(w.start, w.end);
      const normWord = normalizeForSearch(word);
      if (!normWord) continue;

      const match = endsWithSpace ? normWord === normQuery : normWord.startsWith(normQuery);
      if (match) count++;
    }

    return count;
  }

  const { norm } = buildNormalizedWithMap(text);
  if (!norm) return 0;

  const matches = findMatchesInNorm(norm, normQuery, endsWithSpace);
  return matches.length;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightFlexible(text: string, query: string) {
  const normQuery = normalizeForSearch(query);
  if (!normQuery) return escapeHtml(text);

  const endsWithSpace = /\s$/.test(query);

  if (!normQuery.includes(' ')) {
    const words = scanWords(text);
    const ranges: Array<{ start: number; end: number }> = [];

    for (const w of words) {
      const word = text.slice(w.start, w.end);
      const normWord = normalizeForSearch(word);
      if (!normWord) continue;

      const match = endsWithSpace ? normWord === normQuery : normWord.startsWith(normQuery);
      if (match) ranges.push({ start: w.start, end: w.end });
    }

    if (!ranges.length) return escapeHtml(text);

    ranges.sort((a, b) => a.start - b.start);
    const merged: typeof ranges = [];
    for (const r of ranges) {
      const last = merged[merged.length - 1];
      if (!last || r.start > last.end) merged.push({ ...r });
      else last.end = Math.max(last.end, r.end);
    }

    let html = '';
    let cursor = 0;
    for (const r of merged) {
      if (cursor < r.start) html += escapeHtml(text.slice(cursor, r.start));
      html += `<mark>${escapeHtml(text.slice(r.start, r.end))}</mark>`;
      cursor = r.end;
    }
    if (cursor < text.length) html += escapeHtml(text.slice(cursor));
    return html;
  }

  const { norm, map } = buildNormalizedWithMap(text);
  if (!norm) return escapeHtml(text);

  const matchesInNorm = findMatchesInNorm(norm, normQuery, endsWithSpace);
  if (!matchesInNorm.length) return escapeHtml(text);

  const ranges = matchesInNorm
    .map(({ start, end }) => {
      const origStart = map[Math.max(0, start)];
      const origEnd = (map[Math.min(map.length - 1, end - 1)] ?? map[map.length - 1]) + 1;
      return { start: origStart, end: origEnd };
    })
    .sort((a, b) => a.start - b.start);

  const merged: typeof ranges = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (!last || r.start > last.end) merged.push({ ...r });
    else last.end = Math.max(last.end, r.end);
  }

  let html = '';
  let cursor = 0;
  for (const r of merged) {
    if (cursor < r.start) html += escapeHtml(text.slice(cursor, r.start));
    html += `<mark>${escapeHtml(text.slice(r.start, r.end))}</mark>`;
    cursor = r.end;
  }
  if (cursor < text.length) html += escapeHtml(text.slice(cursor));
  return html;
}

/* ====================== Composant ====================== */

export default function Search() {
  const { state, navigateToVerse } = useApp();
  const { t, language } = useTranslation();

  const isDark = true;

  const queryKey = `twog:search:lastQuery:${state.settings.language}`;

  const expandedKey = `twog:search:expanded:${state.settings.language}`;
  const expandedQueryKey = `twog:search:expandedQuery:${state.settings.language}`;
  const scrollKey = `twog:search:scroll:${state.settings.language}`;
  const scrollQueryKey = `twog:search:scrollQuery:${state.settings.language}`;
  const activeQidKey = `twog:search:activeQid:${state.settings.language}`;

  // ✅ FIX IMPORTANT : init synchro depuis sessionStorage (sinon race condition au retour)
  const [query, setQuery] = useState<string>(() => {
    try {
      return sessionStorage.getItem(queryKey) || '';
    } catch {
      return '';
    }
  });

  // si langue change -> recharger query depuis storage (comme avant)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(queryKey);
      if (typeof saved === 'string') setQuery(saved);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.settings.language]);

  useEffect(() => {
    try {
      sessionStorage.setItem(queryKey, query);
    } catch {}
  }, [query, queryKey]);

  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const currentQid = useMemo(() => normalizeForSearch(query.trim()), [query]);

  // ✅ FIX IMPORTANT : activeQid init synchro
  const [activeQid, setActiveQid] = useState<string>(() => {
    try {
      return sessionStorage.getItem(activeQidKey) || '';
    } catch {
      return '';
    }
  });

  const lastExecutedQidRef = useRef<string>('');

  const books = useMemo(() => getBibleBooks(), []);
  const getBookName = (id: string) => {
    const b = books.find(x => x.name === id);
    if (!b) return id;
    return state.settings.language === 'fr' ? b.nameFr : b.nameEn;
  };
  const bibleOrder = (id: string) => {
    const idx = books.findIndex(b => b.name === id);
    return idx === -1 ? 9999 : idx;
  };

  useEffect(() => {
    document.title = t('searchTitle');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const persistExpandedNow = (nextExpanded: Record<string, boolean>) => {
    try {
      if (!currentQid) return;
      sessionStorage.setItem(expandedKey, JSON.stringify(nextExpanded));
      sessionStorage.setItem(expandedQueryKey, currentQid);
    } catch {}
  };

  const persistScrollNow = () => {
    try {
      if (!currentQid) return;
      sessionStorage.setItem(scrollKey, String(window.scrollY || 0));
      sessionStorage.setItem(scrollQueryKey, currentQid);
    } catch {}
  };

  // Recherche (debounce)
  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setResults([]);
      setExpanded({});
      setLoading(false);
      setActiveQid('');
      try {
        sessionStorage.removeItem(expandedKey);
        sessionStorage.removeItem(expandedQueryKey);
        sessionStorage.removeItem(scrollKey);
        sessionStorage.removeItem(scrollQueryKey);
        sessionStorage.removeItem(activeQidKey);
      } catch {}
      lastExecutedQidRef.current = '';
      return;
    }

    const handle = setTimeout(async () => {
      // ✅ si nouvelle recherche (différente des résultats actifs) => fermer, scrollTop
      if (currentQid && activeQid && currentQid !== activeQid) {
        setExpanded({});
        try {
          window.scrollTo({ top: 0, behavior: 'auto' });
        } catch {}
      }

      setLoading(true);
      try {
        const res = await searchInBible(query, state.settings.language);

        const enriched: ResultItem[] = [];
        for (const v of res) {
          const occ = countMatchesFlexible(v.text, query);
          if (occ > 0) enriched.push({ ...v, occ });
        }
        setResults(enriched);

        const qid = currentQid || '';
        setActiveQid(qid);
        try {
          if (qid) sessionStorage.setItem(activeQidKey, qid);
        } catch {}

        lastExecutedQidRef.current = qid;
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(handle);
  }, [
    query,
    currentQid,
    activeQid,
    state.settings.language,
    expandedKey,
    expandedQueryKey,
    scrollKey,
    scrollQueryKey,
    activeQidKey,
  ]);

  // Groupement par livre
  const grouped: Grouped[] = useMemo(() => {
    const map = new Map<string, ResultItem[]>();
    for (const v of results) {
      if (!map.has(v.book)) map.set(v.book, []);
      map.get(v.book)!.push(v);
    }
    const arr: Grouped[] = Array.from(map.entries()).map(([bookId, verses]) => ({
      bookId,
      displayName: getBookName(bookId),
      verses: verses.sort((a, b) =>
        a.chapter === b.chapter ? a.verse - b.verse : a.chapter - b.chapter
      ),
      occ: verses.reduce((s, x) => s + x.occ, 0),
    }));
    arr.sort((a, b) => bibleOrder(a.bookId) - bibleOrder(b.bookId));
    return arr;
  }, [results, state.settings.language, books]);

  // ✅ Restore expanded (si query correspond) — avec currentQid correct dès le 1er render
  useEffect(() => {
    if (!grouped.length) {
      setExpanded({});
      return;
    }

    let restoredExpanded: Record<string, boolean> | null = null;
    let restoredQid = '';

    try {
      restoredQid = sessionStorage.getItem(expandedQueryKey) || '';
      const raw = sessionStorage.getItem(expandedKey);
      if (raw) restoredExpanded = JSON.parse(raw);
    } catch {
      restoredExpanded = null;
      restoredQid = '';
    }

    if (restoredExpanded && restoredQid && restoredQid === currentQid) {
      const next: Record<string, boolean> = {};
      for (const g of grouped) next[g.bookId] = !!restoredExpanded[g.bookId];
      setExpanded(next);
    } else {
      const next: Record<string, boolean> = {};
      for (const g of grouped) next[g.bookId] = false;
      setExpanded(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grouped, currentQid]);

  // ✅ Restore scroll (si query correspond)
  useEffect(() => {
    if (!grouped.length || loading) return;
    try {
      const qid = sessionStorage.getItem(scrollQueryKey) || '';
      if (!qid || qid !== currentQid) return;

      const raw = sessionStorage.getItem(scrollKey);
      const y = raw ? parseInt(raw, 10) : 0;
      if (Number.isFinite(y) && y > 0) {
        setTimeout(() => window.scrollTo({ top: y, behavior: 'auto' }), 0);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grouped, loading, currentQid]);

  // ✅ Sauvegarde au démontage (navigation interne)
  useEffect(() => {
    return () => {
      persistScrollNow();
      persistExpandedNow(expanded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, currentQid]);

  const toggleGroup = (bookId: string) =>
    setExpanded(prev => {
      const next = { ...prev, [bookId]: !prev[bookId] };
      persistExpandedNow(next);
      return next;
    });

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    for (const g of grouped) next[g.bookId] = true;
    setExpanded(next);
    persistExpandedNow(next);
  };

  const collapseAll = () => {
    const next: Record<string, boolean> = {};
    for (const g of grouped) next[g.bookId] = false;
    setExpanded(next);
    persistExpandedNow(next);
  };

  const clearQuery = () => {
    setQuery('');
    setResults([]);
    setExpanded({});
    setLoading(false);
    setActiveQid('');
    try {
      sessionStorage.removeItem(scrollKey);
      sessionStorage.removeItem(scrollQueryKey);
      sessionStorage.removeItem(expandedKey);
      sessionStorage.removeItem(expandedQueryKey);
      sessionStorage.removeItem(activeQidKey);
    } catch {}
    lastExecutedQidRef.current = '';
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {}
  };

  const openInReading = (v: ResultItem) => {
    persistExpandedNow(expanded);
    persistScrollNow();

    try {
      saveQuickSlot(0, { book: v.book, chapter: v.chapter, verse: v.verse });
    } catch {}
    navigateToVerse(v.book, v.chapter, v.verse);
  };

  const totalOccurrences = useMemo(() => results.reduce((s, v) => s + v.occ, 0), [results]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} transition-colors`}>
      <div className="max-w-4xl mx-auto px-4 py-5">
        <h1 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('searchTitle')}
        </h1>

        <div className={`sticky top-0 z-20 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`} style={{ height: 8 }} aria-hidden />

        <div
          className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow border ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          } p-3 sticky top-[var(--nav-h)] z-30`}
        >
          <form onSubmit={e => e.preventDefault()} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className={isDark ? 'text-white/70' : 'text-gray-500'} size={18} />
            </div>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              type="text"
              placeholder={t('searchPlaceholder')}
              className={`w-full pl-10 pr-20 py-3 rounded-lg border-2 focus:outline-none transition ${
                isDark
                  ? 'bg-gray-950 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              }`}
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center space-x-1">
              {!!query && (
                <button
                  type="button"
                  onClick={clearQuery}
                  className={`p-2 rounded-lg ${
                    isDark ? 'text-white/80 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-label={t('searchClear')}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </form>

          <div className="mt-2 text-sm">
            <div className={`${isDark ? 'text-white' : 'text-gray-600'} break-words`}>
              {loading ? (
                <>
                  <Loader2 className="inline mr-2 animate-spin" size={16} />
                  {t('searchSearching')}
                </>
              ) : query.trim().length >= 2 ? (
                <>
                  {t('searchResults')} "{query}" ({totalOccurrences})
                </>
              ) : (
                t('searchMinChars')
              )}
            </div>

            {grouped.length > 1 && totalOccurrences > 0 && !loading && (
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={expandAll}
                  className="text-xs px-2 py-1 rounded border border-transparent bg-blue-600 text-white hover:bg-blue-500"
                >
                  {t('searchExpandAll')}
                </button>
                <button
                  onClick={collapseAll}
                  className={`text-xs px-2 py-1 rounded ${
                    isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t('searchCollapseAll')}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          {totalOccurrences === 0 && !loading && query.trim().length >= 2 && (
            <div className={`${isDark ? 'text-white' : 'text-gray-600'} text-center py-10`}>
              {t('searchNoResults')}
            </div>
          )}

          {grouped.map(group => {
            const open = !!expanded[group.bookId];

            return (
              <div
                key={group.bookId}
                className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg mb-3 overflow-hidden`}
              >
                <button
                  onClick={() => toggleGroup(group.bookId)}
                  className={`w-full flex items-center justify-between px-4 py-3 ${isDark ? 'text-white' : 'text-gray-800'}`}
                  aria-expanded={open}
                >
                  <div className="flex items-center">
                    {open ? (
                      <ChevronDown className={`mr-2 ${isDark ? 'text-white/80' : 'text-gray-500'}`} size={18} />
                    ) : (
                      <ChevronRight className={`mr-2 ${isDark ? 'text-white/80' : 'text-gray-500'}`} size={18} />
                    )}
                    <span className="font-semibold">{group.displayName}</span>
                  </div>
                  <span className={`${isDark ? 'text-white/80' : 'text-gray-600'}`}>({group.occ})</span>
                </button>

                {open && (
                  <div className="px-4 pb-3 space-y-3">
                    {group.verses.map(v => {
                      const key = `${v.book}-${v.chapter}-${v.verse}`;
                      return (
                        <div
                          key={key}
                          role="button"
                          tabIndex={0}
                          onClick={() => openInReading(v)}
                          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openInReading(v)}
                          className={`${
                            isDark ? 'bg-gray-800/60 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'
                          } cursor-pointer rounded-md p-3 border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition`}
                          title={t('searchOpenInReading')}
                        >
                          <div className={`${isDark ? 'text-blue-300' : 'text-blue-700'} font-medium mb-1 flex items-center gap-2`}>
                            <span>
                              {getBookName(v.book)} {v.chapter}:{v.verse}
                            </span>
                            {v.occ > 1 && (
                              <span className={`${isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} text-[11px] px-1.5 py-0.5 rounded`}>
                                ({v.occ})
                              </span>
                            )}
                          </div>
                          <div
                            className={isDark ? 'text-white' : 'text-gray-700'}
                            style={{ fontSize: `${state.settings.fontSize}px`, lineHeight: '1.7' }}
                            dangerouslySetInnerHTML={{ __html: highlightFlexible(v.text, query) }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

