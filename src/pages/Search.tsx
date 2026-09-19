// src/pages/Search.tsx

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { getBibleBooks, searchInBible } from '../services/bibleService';
import type { BibleVerse } from '../types/bible';
import {
  ChevronDown,
  ChevronRight,
  Loader2,
  Search as SearchIcon,
  X,
} from 'lucide-react';
import { saveSlot as saveQuickSlot } from '../services/readingSlots';
import { useTranslation } from '../hooks/useTranslation';

type ResultItem = BibleVerse & {
  occ: number;
};

type Grouped = {
  bookId: string;
  displayName: string;
  verses: ResultItem[];
  occ: number;
};

function normalizeLigatures(value: string) {
  return value
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/Æ/g, 'ae');
}

const ALNUM =
  /[A-Za-z0-9\u0370-\u03FF\u1F00-\u1FFF\u0590-\u05FF]/;

function normalizeForSearch(value: string) {
  const withoutLigatures = normalizeLigatures(value);

  return withoutLigatures
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u0591-\u05C7]/g, '')
    .toLowerCase()
    .replace(
      /[^A-Za-z0-9\u0370-\u03FF\u1F00-\u1FFF\u0590-\u05FF]+/g,
      ' '
    )
    .trim()
    .replace(/\s+/g, ' ');
}

function buildNormalizedWithMap(input: string) {
  const source = normalizeLigatures(input);

  const normalizedCharacters: string[] = [];
  const indexMap: number[] = [];

  let lastWasSpace = false;

  for (let i = 0; i < source.length; i++) {
    const character = source[i];

    const base = character
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u0591-\u05C7]/g, '');

    let emitted = false;

    for (let k = 0; k < base.length; k++) {
      const normalizedCharacter = base[k];

      if (ALNUM.test(normalizedCharacter)) {
        normalizedCharacters.push(normalizedCharacter.toLowerCase());
        indexMap.push(i);

        emitted = true;
        lastWasSpace = false;
      }
    }

    if (!emitted && !lastWasSpace) {
      normalizedCharacters.push(' ');
      indexMap.push(i);
      lastWasSpace = true;
    }
  }

  let start = 0;

  while (
    start < normalizedCharacters.length &&
    normalizedCharacters[start] === ' '
  ) {
    start++;
  }

  let end = normalizedCharacters.length;

  while (
    end > start &&
    normalizedCharacters[end - 1] === ' '
  ) {
    end--;
  }

  return {
    norm: normalizedCharacters.slice(start, end).join(''),
    map: indexMap.slice(start, end),
  };
}

function isLetterOrDigit(character: string) {
  return /[\p{L}\p{N}]/u.test(character);
}

function scanWords(
  text: string
): Array<{ start: number; end: number }> {
  const result: Array<{ start: number; end: number }> = [];

  let index = 0;

  while (index < text.length) {
    while (
      index < text.length &&
      !isLetterOrDigit(text[index])
    ) {
      index++;
    }

    if (index >= text.length) {
      break;
    }

    const start = index;

    while (
      index < text.length &&
      isLetterOrDigit(text[index])
    ) {
      index++;
    }

    result.push({
      start,
      end: index,
    });
  }

  return result;
}

function findMatchesInNorm(
  normalizedText: string,
  normalizedQuery: string,
  endsWithSpace: boolean
): Array<{ start: number; end: number }> {
  if (!normalizedText || !normalizedQuery) {
    return [];
  }

  const matches: Array<{ start: number; end: number }> = [];

  const queryLength = normalizedQuery.length;
  const textLength = normalizedText.length;

  let index = 0;

  while (index <= textLength - queryLength) {
    if (
      index > 0 &&
      normalizedText[index - 1] !== ' '
    ) {
      index++;
      continue;
    }

    if (
      normalizedText.slice(index, index + queryLength) !==
      normalizedQuery
    ) {
      index++;
      continue;
    }

    if (endsWithSpace) {
      const end = index + queryLength;

      if (
        end < textLength &&
        normalizedText[end] !== ' '
      ) {
        index++;
        continue;
      }

      matches.push({
        start: index,
        end,
      });
    } else {
      let end = index + queryLength;

      while (
        end < textLength &&
        normalizedText[end] !== ' '
      ) {
        end++;
      }

      matches.push({
        start: index,
        end,
      });
    }

    index++;
  }

  return matches;
}

function countMatchesFlexible(
  text: string,
  query: string
): number {
  const normalizedQuery = normalizeForSearch(query);

  if (!normalizedQuery) {
    return 0;
  }

  const endsWithSpace = /\s$/.test(query);

  if (!normalizedQuery.includes(' ')) {
    const words = scanWords(text);

    let count = 0;

    for (const wordPosition of words) {
      const word = text.slice(
        wordPosition.start,
        wordPosition.end
      );

      const normalizedWord = normalizeForSearch(word);

      if (!normalizedWord) {
        continue;
      }

      const match = endsWithSpace
        ? normalizedWord === normalizedQuery
        : normalizedWord.startsWith(normalizedQuery);

      if (match) {
        count++;
      }
    }

    return count;
  }

  const { norm } = buildNormalizedWithMap(text);

  if (!norm) {
    return 0;
  }

  return findMatchesInNorm(
    norm,
    normalizedQuery,
    endsWithSpace
  ).length;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/*
 * Surlignage volontairement doux.
 *
 * Avant :
 * <mark> utilisait la couleur jaune par défaut du navigateur.
 *
 * Maintenant :
 * bleu translucide cohérent avec l'interface de The Word.
 */
function highlightedMark(value: string) {
  return `
    <mark
      style="
        background-color: rgba(59, 130, 246, 0.22);
        color: inherit;
        border-radius: 0.22em;
        padding: 0.02em 0.10em;
        box-shadow: inset 0 0 0 1px rgba(96, 165, 250, 0.28);
      "
    >${escapeHtml(value)}</mark>
  `;
}

function highlightFlexible(
  text: string,
  query: string
) {
  const normalizedQuery = normalizeForSearch(query);

  if (!normalizedQuery) {
    return escapeHtml(text);
  }

  const endsWithSpace = /\s$/.test(query);

  if (!normalizedQuery.includes(' ')) {
    const words = scanWords(text);

    const ranges: Array<{
      start: number;
      end: number;
    }> = [];

    for (const wordPosition of words) {
      const word = text.slice(
        wordPosition.start,
        wordPosition.end
      );

      const normalizedWord = normalizeForSearch(word);

      if (!normalizedWord) {
        continue;
      }

      const match = endsWithSpace
        ? normalizedWord === normalizedQuery
        : normalizedWord.startsWith(normalizedQuery);

      if (match) {
        ranges.push({
          start: wordPosition.start,
          end: wordPosition.end,
        });
      }
    }

    if (!ranges.length) {
      return escapeHtml(text);
    }

    ranges.sort(
      (a, b) => a.start - b.start
    );

    const merged: Array<{
      start: number;
      end: number;
    }> = [];

    for (const range of ranges) {
      const last = merged[merged.length - 1];

      if (!last || range.start > last.end) {
        merged.push({ ...range });
      } else {
        last.end = Math.max(
          last.end,
          range.end
        );
      }
    }

    let html = '';
    let cursor = 0;

    for (const range of merged) {
      if (cursor < range.start) {
        html += escapeHtml(
          text.slice(cursor, range.start)
        );
      }

      html += highlightedMark(
        text.slice(range.start, range.end)
      );

      cursor = range.end;
    }

    if (cursor < text.length) {
      html += escapeHtml(
        text.slice(cursor)
      );
    }

    return html;
  }

  const { norm, map } =
    buildNormalizedWithMap(text);

  if (!norm) {
    return escapeHtml(text);
  }

  const matches = findMatchesInNorm(
    norm,
    normalizedQuery,
    endsWithSpace
  );

  if (!matches.length) {
    return escapeHtml(text);
  }

  const ranges = matches
    .map(({ start, end }) => {
      const originalStart =
        map[Math.max(0, start)];

      const originalEnd =
        (
          map[
            Math.min(
              map.length - 1,
              end - 1
            )
          ] ?? map[map.length - 1]
        ) + 1;

      return {
        start: originalStart,
        end: originalEnd,
      };
    })
    .sort(
      (a, b) => a.start - b.start
    );

  const merged: Array<{
    start: number;
    end: number;
  }> = [];

  for (const range of ranges) {
    const last = merged[merged.length - 1];

    if (!last || range.start > last.end) {
      merged.push({ ...range });
    } else {
      last.end = Math.max(
        last.end,
        range.end
      );
    }
  }

  let html = '';
  let cursor = 0;

  for (const range of merged) {
    if (cursor < range.start) {
      html += escapeHtml(
        text.slice(cursor, range.start)
      );
    }

    html += highlightedMark(
      text.slice(range.start, range.end)
    );

    cursor = range.end;
  }

  if (cursor < text.length) {
    html += escapeHtml(
      text.slice(cursor)
    );
  }

  return html;
}

export default function Search() {
  const { state, navigateToVerse } = useApp();
  const { t, language } = useTranslation();

  /*
   * The Word fonctionne actuellement
   * avec son interface sombre sur cette page.
   */
  const isDark = true;

  const queryKey =
    `twog:search:lastQuery:${state.settings.language}`;

  const [query, setQuery] =
    useState<string>(() => {
      try {
        return (
          sessionStorage.getItem(queryKey) || ''
        );
      } catch {
        return '';
      }
    });

  useEffect(() => {
    try {
      const saved =
        sessionStorage.getItem(queryKey);

      if (typeof saved === 'string') {
        setQuery(saved);
      }
    } catch {
      // sessionStorage indisponible
    }
  }, [queryKey]);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        queryKey,
        query
      );
    } catch {
      // sessionStorage indisponible
    }
  }, [query, queryKey]);

  const currentQid = useMemo(
    () =>
      normalizeForSearch(query.trim()),
    [query]
  );

  const expandedKey = useMemo(() => {
    if (!currentQid) {
      return '';
    }

    return `twog:search:expanded:${state.settings.language}:${currentQid}`;
  }, [
    state.settings.language,
    currentQid,
  ]);

  const scrollKey = useMemo(() => {
    if (!currentQid) {
      return '';
    }

    return `twog:search:scroll:${state.settings.language}:${currentQid}`;
  }, [
    state.settings.language,
    currentQid,
  ]);

  const [results, setResults] =
    useState<ResultItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [expanded, setExpanded] =
    useState<Record<string, boolean>>({});

  const lastExecutedQidRef =
    useRef<string>('');

  const books = useMemo(
    () => getBibleBooks(),
    []
  );

  const getBookName = (id: string) => {
    const book = books.find(
      item => item.name === id
    );

    if (!book) {
      return id;
    }

    return state.settings.language === 'fr'
      ? book.nameFr
      : book.nameEn;
  };

  const bibleOrder = (id: string) => {
    const index = books.findIndex(
      book => book.name === id
    );

    return index === -1
      ? 9999
      : index;
  };

  useEffect(() => {
    document.title = t('searchTitle');
  }, [language, t]);

  const persistExpandedNow = (
    nextExpanded: Record<
      string,
      boolean
    >
  ) => {
    try {
      if (!expandedKey) {
        return;
      }

      sessionStorage.setItem(
        expandedKey,
        JSON.stringify(nextExpanded)
      );
    } catch {
      // sessionStorage indisponible
    }
  };

  const persistScrollNow = () => {
    try {
      if (!scrollKey) {
        return;
      }

      sessionStorage.setItem(
        scrollKey,
        String(window.scrollY || 0)
      );
    } catch {
      // sessionStorage indisponible
    }
  };

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setResults([]);
      setExpanded({});
      setLoading(false);

      lastExecutedQidRef.current = '';

      return;
    }

    const handle = window.setTimeout(
      async () => {
        if (
          currentQid &&
          lastExecutedQidRef.current &&
          currentQid !==
            lastExecutedQidRef.current
        ) {
          setExpanded({});

          try {
            window.scrollTo({
              top: 0,
              behavior: 'auto',
            });
          } catch {
            // rien
          }
        }

        setLoading(true);

        try {
          const found =
            await searchInBible(
              query,
              state.settings.language
            );

          const enriched: ResultItem[] = [];

          for (const verse of found) {
            const occ =
              countMatchesFlexible(
                verse.text,
                query
              );

            if (occ > 0) {
              enriched.push({
                ...verse,
                occ,
              });
            }
          }

          setResults(enriched);

          lastExecutedQidRef.current =
            currentQid || '';
        } finally {
          setLoading(false);
        }
      },
      300
    );

    return () =>
      window.clearTimeout(handle);
  }, [
    query,
    currentQid,
    state.settings.language,
  ]);

  const grouped: Grouped[] =
    useMemo(() => {
      const groups =
        new Map<
          string,
          ResultItem[]
        >();

      for (const verse of results) {
        if (!groups.has(verse.book)) {
          groups.set(
            verse.book,
            []
          );
        }

        groups
          .get(verse.book)!
          .push(verse);
      }

      const output: Grouped[] =
        Array.from(
          groups.entries()
        ).map(
          ([bookId, verses]) => ({
            bookId,

            displayName:
              getBookName(bookId),

            verses: verses.sort(
              (a, b) =>
                a.chapter === b.chapter
                  ? a.verse - b.verse
                  : a.chapter - b.chapter
            ),

            occ: verses.reduce(
              (total, verse) =>
                total + verse.occ,
              0
            ),
          })
        );

      output.sort(
        (a, b) =>
          bibleOrder(a.bookId) -
          bibleOrder(b.bookId)
      );

      return output;
    }, [
      results,
      state.settings.language,
      books,
    ]);

  useEffect(() => {
    if (!grouped.length) {
      setExpanded({});
      return;
    }

    if (!expandedKey) {
      const next: Record<
        string,
        boolean
      > = {};

      for (const group of grouped) {
        next[group.bookId] = false;
      }

      setExpanded(next);
      return;
    }

    try {
      const raw =
        sessionStorage.getItem(
          expandedKey
        );

      if (raw) {
        const restored =
          JSON.parse(raw) as Record<
            string,
            boolean
          >;

        const next: Record<
          string,
          boolean
        > = {};

        for (const group of grouped) {
          next[group.bookId] =
            !!restored[group.bookId];
        }

        setExpanded(next);
        return;
      }
    } catch {
      // restauration impossible
    }

    const next: Record<
      string,
      boolean
    > = {};

    for (const group of grouped) {
      next[group.bookId] = false;
    }

    setExpanded(next);
  }, [
    grouped,
    expandedKey,
  ]);

  useEffect(() => {
    if (
      !grouped.length ||
      loading ||
      !scrollKey
    ) {
      return;
    }

    try {
      const raw =
        sessionStorage.getItem(
          scrollKey
        );

      const y = raw
        ? parseInt(raw, 10)
        : 0;

      if (
        Number.isFinite(y) &&
        y > 0
      ) {
        window.setTimeout(() => {
          window.scrollTo({
            top: y,
            behavior: 'auto',
          });
        }, 0);
      }
    } catch {
      // restauration impossible
    }
  }, [
    grouped,
    loading,
    scrollKey,
  ]);

  useEffect(() => {
    return () => {
      persistScrollNow();
      persistExpandedNow(
        expanded
      );
    };
  }, [
    expandedKey,
    scrollKey,
    expanded,
  ]);

  const toggleGroup = (
    bookId: string
  ) => {
    setExpanded(previous => {
      const next = {
        ...previous,
        [bookId]:
          !previous[bookId],
      };

      persistExpandedNow(next);

      return next;
    });
  };

  const expandAll = () => {
    const next: Record<
      string,
      boolean
    > = {};

    for (const group of grouped) {
      next[group.bookId] = true;
    }

    setExpanded(next);
    persistExpandedNow(next);
  };

  const collapseAll = () => {
    const next: Record<
      string,
      boolean
    > = {};

    for (const group of grouped) {
      next[group.bookId] = false;
    }

    setExpanded(next);
    persistExpandedNow(next);
  };

  const clearQuery = () => {
    setQuery('');
    setResults([]);
    setExpanded({});
    setLoading(false);

    lastExecutedQidRef.current = '';

    try {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    } catch {
      // rien
    }
  };

  const openInReading = (
    verse: ResultItem
  ) => {
    persistExpandedNow(
      expanded
    );

    persistScrollNow();

    try {
      saveQuickSlot(0, {
        book: verse.book,
        chapter: verse.chapter,
        verse: verse.verse,
      });
    } catch {
      // rien
    }

    navigateToVerse(
      verse.book,
      verse.chapter,
      verse.verse
    );
  };

  const totalOccurrences =
    useMemo(
      () =>
        results.reduce(
          (total, verse) =>
            total + verse.occ,
          0
        ),
      [results]
    );

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? 'bg-gray-950'
          : 'bg-gray-50'
      } transition-colors`}
    >
      <div className="max-w-4xl mx-auto px-4 py-5">
        <h1
          className={`text-xl font-semibold mb-4 ${
            isDark
              ? 'text-white'
              : 'text-gray-900'
          }`}
        >
          {t('searchTitle')}
        </h1>

        <div
          className={`sticky top-0 z-20 ${
            isDark
              ? 'bg-gray-950'
              : 'bg-gray-50'
          }`}
          style={{
            height: 8,
          }}
          aria-hidden
        />

        <div
          className={`
            ${
              isDark
                ? 'bg-gray-900'
                : 'bg-white'
            }
            rounded-2xl
            shadow-sm
            border
            ${
              isDark
                ? 'border-gray-700'
                : 'border-gray-200'
            }
            p-4
            sticky
            top-[var(--nav-h)]
            z-30
          `}
        >
          <form
            onSubmit={event =>
              event.preventDefault()
            }
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                className={
                  isDark
                    ? 'text-white/70'
                    : 'text-gray-500'
                }
                size={20}
              />
            </div>

            <input
              value={query}
              onChange={event =>
                setQuery(
                  event.target.value
                )
              }
              type="text"
              placeholder={t(
                'searchPlaceholder'
              )}
              className={`
                w-full
                pl-11
                pr-14
                py-3.5
                rounded-xl
                border
                focus:outline-none
                focus:ring-2
                transition

                ${
                  isDark
                    ? `
                      bg-gray-950
                      border-gray-700
                      text-white
                      placeholder-gray-400
                      focus:border-blue-500
                      focus:ring-blue-500/20
                    `
                    : `
                      bg-white
                      border-gray-300
                      text-gray-900
                      placeholder-gray-500
                      focus:border-blue-500
                      focus:ring-blue-500/20
                    `
                }
              `}
            />

            {!!query && (
              <button
                type="button"
                onClick={clearQuery}
                className={`
                  absolute
                  inset-y-0
                  right-2
                  my-auto
                  h-9
                  w-9
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  transition

                  ${
                    isDark
                      ? `
                        text-white/70
                        hover:text-white
                        hover:bg-gray-800
                      `
                      : `
                        text-gray-500
                        hover:text-gray-800
                        hover:bg-gray-100
                      `
                  }
                `}
                aria-label={t(
                  'searchClear'
                )}
              >
                <X size={19} />
              </button>
            )}
          </form>

          <div className="mt-3 text-sm">
            <div
              className={`
                ${
                  isDark
                    ? 'text-white/90'
                    : 'text-gray-600'
                }
                break-words
              `}
            >
              {loading ? (
                <>
                  <Loader2
                    className="inline mr-2 animate-spin"
                    size={16}
                  />

                  {t(
                    'searchSearching'
                  )}
                </>
              ) : query.trim().length >=
                2 ? (
                <>
                  {t(
                    'searchResults'
                  )}{' '}
                  "{query}" (
                  {totalOccurrences})
                </>
              ) : (
                t(
                  'searchMinChars'
                )
              )}
            </div>

            {grouped.length > 1 &&
              totalOccurrences > 0 &&
              !loading && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={
                      expandAll
                    }
                    className="
                      text-xs
                      font-medium
                      px-3
                      py-2
                      rounded-lg
                      border
                      border-blue-600/50
                      bg-blue-700
                      text-white
                      hover:bg-blue-600
                      transition-colors
                    "
                  >
                    {t(
                      'searchExpandAll'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={
                      collapseAll
                    }
                    className={`
                      text-xs
                      font-medium
                      px-3
                      py-2
                      rounded-lg
                      border
                      transition-colors

                      ${
                        isDark
                          ? `
                            bg-gray-800
                            border-gray-700
                            text-white/90
                            hover:bg-gray-700
                          `
                          : `
                            bg-gray-100
                            border-gray-200
                            text-gray-700
                            hover:bg-gray-200
                          `
                      }
                    `}
                  >
                    {t(
                      'searchCollapseAll'
                    )}
                  </button>
                </div>
              )}
          </div>
        </div>

        <div className="mt-5">
          {totalOccurrences ===
            0 &&
            !loading &&
            query.trim().length >=
              2 && (
              <div
                className={`
                  ${
                    isDark
                      ? 'text-white/80'
                      : 'text-gray-600'
                  }
                  text-center
                  py-12
                `}
              >
                {t(
                  'searchNoResults'
                )}
              </div>
            )}

          {grouped.map(group => {
            const open =
              !!expanded[
                group.bookId
              ];

            return (
              <section
                key={
                  group.bookId
                }
                className={`
                  ${
                    isDark
                      ? `
                        bg-gray-900
                        border-gray-700
                      `
                      : `
                        bg-white
                        border-gray-200
                      `
                  }
                  border
                  rounded-xl
                  mb-4
                  overflow-hidden
                  shadow-sm
                `}
              >
                <button
                  type="button"
                  onClick={() =>
                    toggleGroup(
                      group.bookId
                    )
                  }
                  className={`
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-4
                    py-4
                    transition-colors

                    ${
                      isDark
                        ? `
                          text-white
                          hover:bg-gray-800/50
                        `
                        : `
                          text-gray-800
                          hover:bg-gray-50
                        `
                    }
                  `}
                  aria-expanded={
                    open
                  }
                >
                  <div className="flex items-center min-w-0">
                    {open ? (
                      <ChevronDown
                        className={`
                          mr-2
                          shrink-0
                          ${
                            isDark
                              ? 'text-blue-300'
                              : 'text-blue-600'
                          }
                        `}
                        size={19}
                      />
                    ) : (
                      <ChevronRight
                        className={`
                          mr-2
                          shrink-0
                          ${
                            isDark
                              ? 'text-blue-300'
                              : 'text-blue-600'
                          }
                        `}
                        size={19}
                      />
                    )}

                    <span className="font-semibold text-left truncate">
                      {
                        group.displayName
                      }
                    </span>
                  </div>

                  <span
                    className={`
                      shrink-0
                      text-sm
                      ${
                        isDark
                          ? 'text-white/60'
                          : 'text-gray-500'
                      }
                    `}
                  >
                    ({group.occ})
                  </span>
                </button>

                {open && (
                  <div className="px-4 pb-4 space-y-4">
                    {group.verses.map(
                      verse => {
                        const key =
                          `${verse.book}-${verse.chapter}-${verse.verse}`;

                        return (
                          <div
                            key={
                              key
                            }
                            role="button"
                            tabIndex={
                              0
                            }
                            onClick={() =>
                              openInReading(
                                verse
                              )
                            }
                            onKeyDown={event => {
                              if (
                                event.key ===
                                  'Enter' ||
                                event.key ===
                                  ' '
                              ) {
                                event.preventDefault();

                                openInReading(
                                  verse
                                );
                              }
                            }}
                            className={`
                              cursor-pointer
                              rounded-xl
                              p-4
                              border
                              transition-colors

                              ${
                                isDark
                                  ? `
                                    bg-gray-800/45
                                    border-gray-700
                                    hover:bg-gray-800/80
                                    hover:border-gray-600
                                  `
                                  : `
                                    bg-gray-50
                                    border-gray-200
                                    hover:bg-gray-100
                                    hover:border-gray-300
                                  `
                              }
                            `}
                            title={t(
                              'searchOpenInReading'
                            )}
                          >
                            <div
                              className={`
                                font-semibold
                                mb-2.5
                                flex
                                flex-wrap
                                items-center
                                gap-2

                                ${
                                  isDark
                                    ? 'text-blue-300'
                                    : 'text-blue-700'
                                }
                              `}
                            >
                              <span>
                                {getBookName(
                                  verse.book
                                )}{' '}
                                {
                                  verse.chapter
                                }
                                :
                                {
                                  verse.verse
                                }
                              </span>

                              {verse.occ >
                                1 && (
                                <span
                                  className={`
                                    text-[11px]
                                    font-medium
                                    px-2
                                    py-0.5
                                    rounded-full

                                    ${
                                      isDark
                                        ? `
                                          bg-gray-700
                                          text-white/80
                                        `
                                        : `
                                          bg-gray-200
                                          text-gray-700
                                        `
                                    }
                                  `}
                                >
                                  (
                                  {
                                    verse.occ
                                  }
                                  )
                                </span>
                              )}
                            </div>

                            <div
                              className={
                                isDark
                                  ? 'text-white/95'
                                  : 'text-gray-700'
                              }
                              style={{
                                fontSize:
                                  `${state.settings.fontSize}px`,
                                lineHeight:
                                  '1.8',
                              }}
                              dangerouslySetInnerHTML={{
                                __html:
                                  highlightFlexible(
                                    verse.text,
                                    query
                                  ),
                              }}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
