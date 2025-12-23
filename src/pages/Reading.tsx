// src/pages/Reading.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import {
  getBibleBooks,
  getChapter,
  getRandomVerse,
  copyToClipboard,
} from '../services/bibleService';
import { BibleBook, BibleChapter } from '../types/bible';
import {
  ChevronDown,
  Book,
  ChevronLeft,
  ChevronRight,
  Copy as CopyIcon,
  Check,
  Search as SearchIcon,
  Share2 as ShareIcon,
  ListPlus as ListPlusIcon,
  Languages as LanguagesIcon,
} from 'lucide-react';
import {
  readSlot as readQuickSlot,
  saveSlot as saveQuickSlot,
  type QuickSlot,
} from '../services/readingSlots';
import {
  getAllLists,
  createList,
  addVersesToList,
} from '../services/collectionsService';
import type { VerseRef, VerseList } from '../types/collections';

/* ========= Helpers de stockage pour PRINCIPES (même format que Principes.tsx) ========= */

const PRINCIPLES_LS_KEY = 'twog:principles:v1';

function pSafeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readAllPrinciples(): VerseList[] {
  try {
    return pSafeParse<VerseList[]>(localStorage.getItem(PRINCIPLES_LS_KEY), []);
  } catch {
    return [];
  }
}

function writeAllPrinciples(all: VerseList[]) {
  try {
    localStorage.setItem(PRINCIPLES_LS_KEY, JSON.stringify(all));
  } catch {}
}

function makePrincipleId() {
  return (
    'p_' +
    Date.now().toString(36) +
    '_' +
    Math.random().toString(36).slice(2, 8)
  );
}

function getAllPrinciplesLists(): VerseList[] {
  return readAllPrinciples();
}

function createPrincipleList(title: string): VerseList {
  const now = Date.now();
  const list: VerseList = {
    id: makePrincipleId(),
    title: title?.trim() || 'Nouvelle étude',
    createdAt: now,
    updatedAt: now,
    items: [],
  };
  const all = readAllPrinciples();
  all.unshift(list); // en tête
  writeAllPrinciples(all);
  return list;
}

function addVersesToPrincipleList(listId: string, verses: VerseRef[]): void {
  const all = readAllPrinciples();
  const idx = all.findIndex(l => l.id === listId);
  if (idx < 0) return;

  const existing = all[idx];
  const mergedItems = [...(existing.items || []), ...verses];

  all[idx] = {
    ...existing,
    items: mergedItems,
    updatedAt: Date.now(),
  };

  writeAllPrinciples(all);
}

/* ========= Liste des langues disponibles pour la vue multi-langues ========= */

const ALL_LANG_CODES = [
  'fr',
  'en',
  'el',
  'he',
  'ru',
  'es',
  'ar',
  'de',
  'hi',
  'id',
  'it',
  'ja',
  'ko',
  'pt',
  'sw',
  'tr',
  'yo',
  'zh',
] as const;

type LangCode = (typeof ALL_LANG_CODES)[number];

/* ================================== Page =================================== */

export default function Reading() {
  const { state, dispatch, saveReadingPosition } = useApp();
  const { t } = useTranslation();

  const NAV_H = 64;
  const HIGHLIGHT_EXTRA_OFFSET = 46;

  const commandBarRef = useRef<HTMLDivElement>(null);
  const [cmdH, setCmdH] = useState(0);
  useEffect(() => {
    const compute = () => setCmdH(commandBarRef.current?.offsetHeight || 0);
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const [books] = useState(getBibleBooks());
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);

  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  const [scrollTargetVerse, setScrollTargetVerse] = useState<number | null>(null);

  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
  const [copiedKey, setCopiedKey] = useState<string>('');

  const [showBookPicker, setShowBookPicker] = useState<boolean>(false);
  const [showChapterPicker, setShowChapterPicker] = useState<boolean>(false);

  const [showSwipeHint, setShowSwipeHint] = useState(false);
  useEffect(() => {
    const key = `twog:hint:swipe:v4:${state.settings.language}`;
    if (!sessionStorage.getItem(key)) {
      setShowSwipeHint(true);
      sessionStorage.setItem(key, '1');
      const timer = setTimeout(() => setShowSwipeHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.settings.language]);

  // Mode sombre fixe
  const isDark = true;

  // Thèmes des slots
  type SlotKey = 1 | 2 | 3;
  const SLOT_THEMES: Record<
    SlotKey,
    {
      solid: string;
      solidHover: string;
      mobileBtn: string;
      mobileBtnHover: string;
      lightPaper: string;
    }
  > = {
    1: {
      solid: 'bg-amber-600 text-white',
      solidHover: 'hover:bg-amber-500',
      mobileBtn: 'bg-amber-600 text-white',
      mobileBtnHover: 'hover:bg-amber-500',
      lightPaper: 'bg-amber-50',
    },
    2: {
      solid: 'bg-violet-600 text-white',
      solidHover: 'hover:bg-violet-500',
      mobileBtn: 'bg-violet-600 text-white',
      mobileBtnHover: 'hover:bg-violet-500',
      lightPaper: 'bg-violet-50',
    },
    3: {
      solid: 'bg-emerald-600 text-white',
      solidHover: 'hover:bg-emerald-500',
      mobileBtn: 'bg-emerald-600 text-white',
      mobileBtnHover: 'hover:bg-emerald-500',
      lightPaper: 'bg-emerald-50',
    },
  };

  const fetchChapter = async (book: BibleBook, chapterNum: number) => {
    setLoading(true);
    try {
      setChapter(await getChapter(book.name, chapterNum, state.settings.language));
    } catch (error) {
      console.error('Error fetching chapter:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveScrollForCurrent = () => {
    if (!selectedBook) return;
    try {
      sessionStorage.setItem(
        `twog:reading:scroll:${state.settings.language}:${selectedBook.name}:${selectedChapter}`,
        String(window.scrollY || 0)
      );
    } catch {}
  };

  // --- Quick slots state (loupe + 1/2/3) ---
  const [quickSlots, setQuickSlots] = useState<QuickSlot[]>([
    null,
    null,
    null,
    null,
  ]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [lastTappedSlot, setLastTappedSlot] = useState<number | null>(null);

  function readAllSlots(): QuickSlot[] {
    return [0, 1, 2, 3].map(i => readQuickSlot(i));
  }
  function refreshSlots() {
    try {
      setQuickSlots(readAllSlots());
    } catch {}
  }

  useEffect(() => {
    refreshSlots();
  }, []);

  useEffect(() => {
    if (!selectedBook) return;
    if (activeSlot !== null && activeSlot !== 0) {
      try {
        saveQuickSlot(activeSlot, {
          book: selectedBook.name,
          chapter: selectedChapter,
        });
        refreshSlots();
      } catch {}
    }
  }, [selectedBook?.name, selectedChapter, activeSlot]);

  useEffect(() => {
    try {
      if (activeSlot && activeSlot !== 0) {
        localStorage.setItem('twog:qs:lastActive', String(activeSlot));
      }
    } catch {}
  }, [activeSlot]);

  function setTapped(i: number) {
    setLastTappedSlot(i);
    try {
      localStorage.setItem('twog:qs:lastTapped', String(i));
    } catch {}
  }

  const handleBookSelect = (book: BibleBook) => {
    saveScrollForCurrent();
    setSelectedBook(book);
    setSelectedChapter(1);
    setSelectedVerses([]);
    setHighlightedVerse(null);
    setScrollTargetVerse(null);
    setShowBookPicker(false);

    // Si la loupe (slot 0) est le contexte courant, on met à jour le slot 0
    if (lastTappedSlot === 0) {
      try {
        saveQuickSlot(0, { book: book.name, chapter: 1 });
        refreshSlots();
      } catch {}
    }

    fetchChapter(book, 1);
    saveReadingPosition(book.name, 1);
    try {
      window.scrollTo({ top: 0 });
    } catch {}
  };

  const handleChapterSelect = (chapterNum: number) => {
    saveScrollForCurrent();
    setSelectedChapter(chapterNum);
    if (selectedBook) {
      setSelectedVerses([]);
      setHighlightedVerse(null);
      setScrollTargetVerse(null);

      // Idem : si on est en mode loupe, on met à jour le slot 0
      if (lastTappedSlot === 0) {
        try {
          saveQuickSlot(0, { book: selectedBook.name, chapter: chapterNum });
          refreshSlots();
        } catch {}
      }

      try {
        window.scrollTo({ top: 0 });
      } catch {}
      fetchChapter(selectedBook, chapterNum);
      saveReadingPosition(selectedBook.name, chapterNum);
    }
  };

  const handleNextUnit = () => {
    if (!selectedBook) return;
    if (selectedChapter < selectedBook.chapters) {
      handleChapterSelect(selectedChapter + 1);
      return;
    }
    const idx = books.findIndex(b => b.name === selectedBook.name);
    if (idx >= 0 && idx < books.length - 1) {
      const nextBook = books[idx + 1];
      setSelectedBook(nextBook);
      setSelectedChapter(1);
      setSelectedVerses([]);
      setHighlightedVerse(null);
      setScrollTargetVerse(null);

      if (lastTappedSlot === 0) {
        try {
          saveQuickSlot(0, { book: nextBook.name, chapter: 1 });
          refreshSlots();
        } catch {}
      }

      try {
        window.scrollTo({ top: 0 });
      } catch {}
      fetchChapter(nextBook, 1);
      saveReadingPosition(nextBook.name, 1);
    }
  };

  const handlePrevUnit = () => {
    if (!selectedBook) return;
    if (selectedChapter > 1) {
      handleChapterSelect(selectedChapter - 1);
      return;
    }
    const idx = books.findIndex(b => b.name === selectedBook.name);
    if (idx > 0) {
      const prevBook = books[idx - 1];
      setSelectedBook(prevBook);
      setSelectedChapter(prevBook.chapters);
      setSelectedVerses([]);
      setHighlightedVerse(null);
      setScrollTargetVerse(null);

      if (lastTappedSlot === 0) {
        try {
          saveQuickSlot(0, { book: prevBook.name, chapter: prevBook.chapters });
          refreshSlots();
        } catch {}
      }

      try {
        window.scrollTo({ top: 0 });
      } catch {}
      fetchChapter(prevBook, prevBook.chapters);
      saveReadingPosition(prevBook.name, prevBook.chapters);
    }
  };

  const oldTestamentBooks = books.filter(b => b.testament === 'old');
  const newTestamentBooks = books.filter(b => b.testament === 'new');
  const getBookName = (book: BibleBook | null) =>
    state.settings.language === 'fr' ? (book?.nameFr ?? '') : (book?.nameEn ?? '');

  const shortBookName = (book: BibleBook | null) => {
    const full = getBookName(book);
    const max = 14;
    return full.length > max ? full.slice(0, max) + '…' : full;
  };

  const resolveBook = (bookIdentifier: string): BibleBook | null => {
    let found = books.find(b => b.name === bookIdentifier);
    if (found) return found;
    found = books.find(b => b.nameEn === bookIdentifier);
    if (found) return found;
    found = books.find(b => b.nameFr === bookIdentifier);
    if (found) return found;
    return null;
  };

  function readUrlIntent() {
    try {
      const u = new URL(window.location.href);
      const qb = u.searchParams.get('b') || u.searchParams.get('book');
      const qc = u.searchParams.get('c') || u.searchParams.get('chapter');
      const qv = u.searchParams.get('v') || u.searchParams.get('verse');
      return { qb, qc, qv };
    } catch {
      return { qb: null, qc: null, qv: null };
    }
  }

  function clearUrlIntent() {
    try {
      const u = new URL(window.location.href);
      ['b', 'book', 'c', 'chapter', 'v', 'verse'].forEach(k => u.searchParams.delete(k));
      const next = u.pathname + (u.search || '') + (u.hash || '');
      window.history.replaceState({}, '', next);
    } catch {}
  }

  function jumpToSlot(i: number) {
    const slot = readQuickSlot(i);
    setTapped(i);
    if (i === 0) {
      // Loupe = slot 0 : mémoire de position *sans* highlight.
      setActiveSlot(null);
      if (!slot) return;
      const b = resolveBook(slot.book);
      if (!b) return;

      setSelectedBook(b);
      setSelectedChapter(slot.chapter);
      setSelectedVerses([]);
      setHighlightedVerse(null); // pas de surlignage
      setScrollTargetVerse(slot.verse ?? null); // on utilise le verset pour le scroll uniquement

      try {
        window.scrollTo({ top: 0 });
      } catch {}
      fetchChapter(b, slot.chapter);
      saveReadingPosition(b.name, slot.chapter);
      return;
    }

    // Slots mémoire 1/2/3
    setActiveSlot(i);
    if (!slot) {
      if (!selectedBook) return;
      saveQuickSlot(i, { book: selectedBook.name, chapter: selectedChapter });
      refreshSlots();
      return;
    }
    const book = resolveBook(slot.book);
    if (!book) return;
    setSelectedBook(book);
    setSelectedChapter(slot.chapter);
    setSelectedVerses([]);
    setHighlightedVerse(null); // pas de surlignage pour 1/2/3
    setScrollTargetVerse(slot.verse ?? null); // juste pour le scroll
    try {
      window.scrollTo({ top: 0 });
    } catch {}
    fetchChapter(book, slot.chapter);
    saveReadingPosition(book.name, slot.chapter);
  }

  const activeTheme =
    activeSlot === 1 || activeSlot === 2 || activeSlot === 3
      ? SLOT_THEMES[activeSlot as SlotKey]
      : null;

  const desktopChipBase =
    'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm whitespace-nowrap';
  const desktopChipColors = activeTheme ? activeTheme.solid : 'bg-blue-600 text-white';

  const [hasLoadedContext, setHasLoadedContext] = useState(false);

  useEffect(() => {
    // scrollVerse = pour la position, highlightVerse = pour le contour
    const applyIfChanged = (
      book: BibleBook,
      chapNum: number,
      scrollVerse: number | null,
      highlightVerse: number | null
    ) => {
      setSelectedBook(book);
      setSelectedChapter(chapNum);
      setSelectedVerses([]);
      setHighlightedVerse(highlightVerse);
      setScrollTargetVerse(scrollVerse);
      setTapped(0);
      setActiveSlot(null);
      try {
        window.scrollTo({ top: 0 });
      } catch {}
      fetchChapter(book, chapNum);
      saveReadingPosition(book.name, chapNum);
      return true;
    };

    // 1) URL
    const { qb, qc, qv } = readUrlIntent();
    if (qb && qc) {
      const book = resolveBook(qb);
      const chapNum = parseInt(qc, 10);
      const verseNum = qv ? parseInt(qv, 10) : NaN;
      if (book && Number.isFinite(chapNum) && chapNum >= 1 && chapNum <= book.chapters) {
        const v = Number.isFinite(verseNum) ? verseNum : null;
        // Depuis une URL explicite : on surligne ce verset.
        const changed = applyIfChanged(book, chapNum, v, v);
        if (!hasLoadedContext) setHasLoadedContext(true);
        clearUrlIntent();
        if (changed) return;
      }
    }

    // 2) readingContext (depuis d'autres pages : recherche, random widget, etc.)
    const ctx = state.readingContext;
    if (ctx && ctx.book && ctx.chapter > 0) {
      const book2 = resolveBook(ctx.book);
      if (book2) {
        const v2 = ctx.verse ?? null;
        // Depuis une autre page avec un verset précis => on surligne une fois.
        const changed = applyIfChanged(book2, ctx.chapter, v2, v2);
        dispatch({ type: 'SET_READING_CONTEXT', payload: { book: '', chapter: 0 } });
        if (!hasLoadedContext) setHasLoadedContext(true);
        if (changed) return;
      }
    }

    // 3) si déjà chargé et pas de nouvelle intention
    if (hasLoadedContext) return;

    // 4) fallback : dernier slot tapé (loupe) -> position uniquement, PAS de highlight
    try {
      const rawTapped = localStorage.getItem('twog:qs:lastTapped');
      if (rawTapped === '0') {
        const s0 = readQuickSlot(0);
        if (s0) {
          const b = resolveBook(s0.book);
          if (b) {
            const v = s0.verse ?? null;
            const changed = applyIfChanged(b, s0.chapter, v, null); // pas de highlight ici
            setHasLoadedContext(true);
            if (changed) return;
          }
        }
      }
    } catch {}

    // 5) fallback : dernier slot mémoire actif (1/2/3) -> position uniquement, PAS de highlight
    try {
      const rawActive = localStorage.getItem('twog:qs:lastActive');
      const i = rawActive ? parseInt(rawActive, 10) : NaN;
      if (i === 1 || i === 2 || i === 3) {
        const s = readQuickSlot(i);
        if (s) {
          const b = resolveBook(s.book);
          if (b) {
            const changed = applyIfChanged(b, s.chapter, s.verse ?? null, null);
            setActiveSlot(i);
            setLastTappedSlot(i);
            setHasLoadedContext(true);
            if (changed) return;
          }
        }
      }
    } catch {}

    // 6) fallback : dernière position de lecture -> position seulement
    const last = (state.settings as any).lastReadingPosition;
    if (last && last.book && last.chapter > 0) {
      const b = resolveBook(last.book);
      if (b) {
        applyIfChanged(b, last.chapter, last.verse ?? null, null);
        setHasLoadedContext(true);
        return;
      }
    }

    // 7) fallback par défaut : Jean 1 (sans highlight)
    const john = resolveBook('John');
    if (john) {
      applyIfChanged(john, 1, null, null);
      setHasLoadedContext(true);
    }
  }, [
    state.readingContext,
    state.settings.lastReadingPosition,
    selectedBook?.name,
    selectedChapter,
    highlightedVerse,
    books,
    dispatch,
    hasLoadedContext,
    saveReadingPosition,
  ]);

  const suppressAutoSaveUntil = useRef<number>(0);
  const programmaticScrollUntil = useRef<number>(0);

  function scrollToVerseNumber(v: number, smooth: boolean, extraTop = 0) {
    const now = Date.now();
    const lockMs = 2500;
    suppressAutoSaveUntil.current = now + lockMs;
    programmaticScrollUntil.current = now + lockMs;
    const baseOffset = NAV_H + cmdH + 14;
    const offset = baseOffset + extraTop;

    let tries = 0;
    const maxTries = 24;
    const tick = () => {
      const el = document.getElementById(`verse-${v}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        const current = window.scrollY || document.documentElement.scrollTop || 0;
        const target = current + rect.top - offset;
        window.scrollTo({
          top: Math.max(target, 0),
          behavior: smooth ? 'smooth' : 'auto',
        });
        return;
      }
      if (tries++ < maxTries) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  useEffect(() => {
    if (!chapter || !selectedBook) return;
    const doScroll = () => {
      const v = scrollTargetVerse ?? highlightedVerse;
      if (v !== null) {
        const isHighlight = highlightedVerse !== null && v === highlightedVerse;
        scrollToVerseNumber(v, isHighlight, isHighlight ? HIGHLIGHT_EXTRA_OFFSET : 0);
        return;
      }
      if (Date.now() < programmaticScrollUntil.current) return;
      try {
        const raw = sessionStorage.getItem(
          `twog:reading:scroll:${state.settings.language}:${selectedBook.name}:${selectedChapter}`
        );
        const y = raw ? parseInt(raw, 10) : 0;
        if (Number.isFinite(y) && y > 0) {
          const now = Date.now();
          const lockMs = 800;
          suppressAutoSaveUntil.current = now + lockMs;
          programmaticScrollUntil.current = now + lockMs;
          window.scrollTo({ top: y, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      } catch {}
    };
    const tmo = setTimeout(doScroll, 50);
    return () => clearTimeout(tmo);
  }, [
    chapter,
    highlightedVerse,
    scrollTargetVerse,
    state.settings.language,
    selectedBook?.name,
    selectedChapter,
  ]);

  const toggleSelectVerse = (num: number) => {
    setSelectedVerses(prev => (prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]));
  };

  const compressRanges = (nums: number[]) => {
    if (nums.length === 0) return '';
    const sorted = [...nums].sort((a, b) => a - b);
    const parts: string[] = [];
    let start = sorted[0];
    let prev = sorted[0];
    const push = () => (start === prev ? parts.push(`${start}`) : parts.push(`${start}-${prev}`));
    for (let i = 1; i < sorted.length; i++) {
      const n = sorted[i];
      if (n === prev + 1) prev = n;
      else {
        push();
        start = n;
        prev = n;
      }
    }
    push();
    return parts.join(',');
  };

  const copySelection = async () => {
    if (!selectedBook || !chapter || selectedVerses.length === 0) return;
    const chosen = chapter.verses
      .filter(v => selectedVerses.includes(v.verse))
      .sort((a, b) => a.verse - b.verse);
    const ranges = compressRanges(chosen.map(v => v.verse));
    const ref = getBookName(selectedBook) + ' ' + chapter.chapter + ':' + ranges;
    const body = chosen.map(v => String(v.text)).join('\n');
    const payload = ref + '\n' + body;
    const ok = await copyToClipboard(payload);
    if (ok) {
      setCopiedKey('selection');
      setTimeout(() => setCopiedKey(''), 1500);
      setSelectedVerses([]);
    }
  };

  const shareSelection = async () => {
    if (!selectedBook || !chapter || selectedVerses.length === 0) return;

    const chosen = chapter.verses
      .filter(v => selectedVerses.includes(v.verse))
      .sort((a, b) => a.verse - b.verse);

    const ranges = compressRanges(chosen.map(v => v.verse));
    const ref = getBookName(selectedBook) + ' ' + chapter.chapter + ':' + ranges;

    const body = chosen.map(v => String(v.text)).join('\n');
    const shareUrl = 'https://www.theword.fr/#about';

    const shareText = `${ref}

${body}

Découvrir l’application The Word :
${shareUrl}`;

    try {
      const nav = navigator as any;
      if (nav?.share) {
        await nav.share({ title: ref, text: shareText });
        setSelectedVerses([]);
      } else {
        const ok = await copyToClipboard(shareText);
        if (ok) {
          setCopiedKey('shared-fallback');
          setTimeout(() => setCopiedKey(''), 1800);
          setSelectedVerses([]);
        }
      }
    } catch (e) {
      console.error('share error', e);
    }
  };

  // ---- Ajout à une liste Notes / Principes ----
  const sortListsByTitle = (arr: VerseList[]) =>
    [...arr].sort((a, b) =>
      (a.title || '').localeCompare(b.title || '', undefined, {
        sensitivity: 'base',
      })
    );

  // NOTES (collectionsService)
  const [showAddToNotes, setShowAddToNotes] = useState(false);
  const [notesListsForModal, setNotesListsForModal] = useState<VerseList[]>([]);
  const [selectedNotesListIds, setSelectedNotesListIds] = useState<string[]>([]);
  const [newNotesListTitle, setNewNotesListTitle] = useState<string>('');
  const [pendingVersesForNotes, setPendingVersesForNotes] = useState<VerseRef[] | null>(null);

  const openAddToNotes = (customVerses?: VerseRef[]) => {
    if (!selectedBook || !chapter) return;

    let versesToAdd: VerseRef[] | null = null;

    if (customVerses && customVerses.length > 0) {
      versesToAdd = customVerses;
    } else {
      if (selectedVerses.length === 0) return;
      const chosen = chapter.verses
        .filter(v => selectedVerses.includes(v.verse))
        .sort((a, b) => a.verse - b.verse)
        .map<VerseRef>(v => ({
          bookId: selectedBook.name,
          bookName: getBookName(selectedBook),
          chapter: v.chapter,
          verse: v.verse,
          text: v.text,
          translation: state.settings.language,
        }));
      versesToAdd = chosen;
    }

    const all = sortListsByTitle(getAllLists());
    setNotesListsForModal(all);
    setSelectedNotesListIds([]);
    setNewNotesListTitle('');
    setPendingVersesForNotes(versesToAdd);
    setShowAddToNotes(true);
  };

  const confirmAddToNotes = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pendingVersesForNotes || pendingVersesForNotes.length === 0) return;

    const typed = newNotesListTitle.trim();
    const allLists = getAllLists();
    let targetIds = [...selectedNotesListIds];

    if (typed) {
      const existing = allLists.find(l => (l.title || '').trim().toLowerCase() === typed.toLowerCase());
      const newId = existing ? existing.id : createList(typed).id;
      if (!targetIds.includes(newId)) targetIds.push(newId);
    }

    if (targetIds.length === 0) return;

    try {
      targetIds.forEach(id => addVersesToList(id, pendingVersesForNotes));
    } catch (err) {
      console.error('addVerses error', err);
    }

    setShowAddToNotes(false);
    setPendingVersesForNotes(null);
    setSelectedVerses([]);
    setCopiedKey('added-to-notes');
    setTimeout(() => setCopiedKey(''), 1600);
  };

  // PRINCIPES (localStorage twog:principles:v1)
  const [showAddToPrinciples, setShowAddToPrinciples] = useState(false);
  const [principlesListsForModal, setPrinciplesListsForModal] = useState<VerseList[]>([]);
  const [selectedPrincipleListIds, setSelectedPrincipleListIds] = useState<string[]>([]);
  const [newPrincipleListTitle, setNewPrincipleListTitle] = useState<string>('');
  const [pendingVersesForPrinciples, setPendingVersesForPrinciples] = useState<VerseRef[] | null>(null);

  const openAddToPrinciples = (customVerses?: VerseRef[]) => {
    if (!selectedBook || !chapter) return;

    let versesToAdd: VerseRef[] | null = null;

    if (customVerses && customVerses.length > 0) {
      versesToAdd = customVerses;
    } else {
      if (selectedVerses.length === 0) return;
      const chosen = chapter.verses
        .filter(v => selectedVerses.includes(v.verse))
        .sort((a, b) => a.verse - b.verse)
        .map<VerseRef>(v => ({
          bookId: selectedBook.name,
          bookName: getBookName(selectedBook),
          chapter: v.chapter,
          verse: v.verse,
          text: v.text,
          translation: state.settings.language,
        }));
      versesToAdd = chosen;
    }

    const all = sortListsByTitle(getAllPrinciplesLists());
    setPrinciplesListsForModal(all);
    setSelectedPrincipleListIds([]);
    setNewPrincipleListTitle('');
    setPendingVersesForPrinciples(versesToAdd);
    setShowAddToPrinciples(true);
  };

  const confirmAddToPrinciples = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pendingVersesForPrinciples || pendingVersesForPrinciples.length === 0) return;

    const typed = newPrincipleListTitle.trim();
    const all = getAllPrinciplesLists();
    let targetIds = [...selectedPrincipleListIds];

    if (typed) {
      const existing = all.find(l => (l.title || '').trim().toLowerCase() === typed.toLowerCase());
      const newId = existing ? existing.id : createPrincipleList(typed).id;
      if (!targetIds.includes(newId)) targetIds.push(newId);
    }

    if (targetIds.length === 0) return;

    try {
      targetIds.forEach(id => addVersesToPrincipleList(id, pendingVersesForPrinciples));
    } catch (err) {
      console.error('addVerses principles error', err);
    }

    setShowAddToPrinciples(false);
    setPendingVersesForPrinciples(null);
    setSelectedVerses([]);
    setCopiedKey('added-to-principles');
    setTimeout(() => setCopiedKey(''), 1600);
  };

  /* ===== Vue multi-langue pour un ou plusieurs versets sélectionnés ===== */

  const [showOtherLangs, setShowOtherLangs] = useState(false);
  const [otherLangTarget, setOtherLangTarget] = useState<{
    bookId: string;
    chapter: number;
    verses: number[];
  } | null>(null);

  const [otherLangVerses, setOtherLangVerses] = useState<
    { lang: LangCode; text: string | null; loading: boolean; error?: string }[]
  >([]);

  // ✅ Ref interne (au lieu de window.__xxx)
  const loadOtherLangRef = useRef<((lang: LangCode) => void) | null>(null);

  const openOtherLangs = () => {
    if (!selectedBook || !chapter || selectedVerses.length === 0) return;

    // On prend tous les versets sélectionnés, triés
    const sortedVerses = [...selectedVerses].sort((a, b) => a - b);

    const target = {
      bookId: selectedBook.name,
      chapter: selectedChapter,
      verses: sortedVerses,
    };
    setOtherLangTarget(target);

    const currentLang = state.settings.language as LangCode;

    // CORE souhaité :
    // - langue courante
    // - fr (si pas déjà la langue courante)
    // - en (si pas déjà la langue courante)
    // - el
    // - he
    const core: LangCode[] = [];
    const pushIfOk = (lc: LangCode) => {
      if (ALL_LANG_CODES.includes(lc) && !core.includes(lc)) core.push(lc);
    };

    if (ALL_LANG_CODES.includes(currentLang)) pushIfOk(currentLang);
    if (currentLang !== 'fr') pushIfOk('fr');
    if (currentLang !== 'en') pushIfOk('en');
    pushIfOk('el');
    pushIfOk('he');

    // Toutes les autres (pas chargées par défaut)
    const remaining = ALL_LANG_CODES.filter(l => !core.includes(l));
    const targetLangs: LangCode[] = [...core, ...remaining];

    // État initial : CORE = loading true (on va fetch), autres = loading false (au clic)
    const initial = targetLangs.map(lang => ({
      lang,
      text: null as string | null,
      loading: core.includes(lang),
      error: undefined as string | undefined,
    }));
    setOtherLangVerses(initial);
    setShowOtherLangs(true);

    // Helper de chargement d'une seule langue (réutilisable au clic)
    const loadOneLang = async (lang: LangCode) => {
      try {
        // met en loading
        setOtherLangVerses(prev =>
          prev.map(e => (e.lang === lang ? { ...e, loading: true, error: undefined } : e))
        );

        const ch = await getChapter(selectedBook.name, selectedChapter, lang as any);

        const selectedForLang = ch.verses
          .filter(v => sortedVerses.includes(v.verse))
          .sort((a, b) => a.verse - b.verse);

        const combinedText = selectedForLang.map(v => String(v.text)).join('\n');

        setOtherLangVerses(prev =>
          prev.map(entry =>
            entry.lang === lang
              ? {
                  ...entry,
                  text: selectedForLang.length > 0 ? combinedText : null,
                  loading: false,
                  error: selectedForLang.length > 0 ? undefined : 'missing',
                }
              : entry
          )
        );
      } catch (err) {
        console.error('multilang error', err);
        setOtherLangVerses(prev =>
          prev.map(entry =>
            entry.lang === lang ? { ...entry, text: null, loading: false, error: 'error' } : entry
          )
        );
      }
    };

    // ✅ On stocke la fonction dans la ref pour le bouton "Charger"
    loadOtherLangRef.current = (lang: LangCode) => {
      loadOneLang(lang);
    };

    // 1) Charger seulement les langues CORE automatiquement
    core.forEach(lang => {
      loadOneLang(lang);
    });
  };

  const copyOtherLangVerse = async (entryLang: LangCode, text: string | null) => {
    if (!otherLangTarget || !selectedBook || !text) return;
    const range = compressRanges(otherLangTarget.verses);
    const ref = getBookName(selectedBook) + ' ' + otherLangTarget.chapter + ':' + range;
    const payload = ref + '\n' + text;
    const ok = await copyToClipboard(payload);
    if (ok) {
      setCopiedKey('selection');
      setTimeout(() => setCopiedKey(''), 1500);
    }
  };

  const shareOtherLangVerse = async (entryLang: LangCode, text: string | null) => {
    if (!otherLangTarget || !selectedBook || !text) return;
    const range = compressRanges(otherLangTarget.verses);
    const ref = getBookName(selectedBook) + ' ' + otherLangTarget.chapter + ':' + range;
    const shareUrl = 'https://www.theword.fr/#about';

    const shareText = `${ref}

${text}

Découvrir l’application The Word :
${shareUrl}`;

    try {
      const nav = navigator as any;
      if (nav?.share) {
        await nav.share({ title: ref, text: shareText });
      } else {
        const ok = await copyToClipboard(shareText);
        if (ok) {
          setCopiedKey('shared-fallback');
          setTimeout(() => setCopiedKey(''), 1800);
        }
      }
    } catch (e) {
      console.error('share other lang error', e);
    }
  };

  // Pour Notes / Principes, on envoie un bloc unique correspondant à la plage de versets
  const sendOtherLangVerseToNotes = (entryLang: LangCode, text: string | null) => {
    if (!otherLangTarget || !selectedBook || !text) return;
    const verseRef: VerseRef = {
      bookId: otherLangTarget.bookId,
      bookName: getBookName(selectedBook),
      chapter: otherLangTarget.chapter,
      verse: otherLangTarget.verses[0],
      text,
      translation: entryLang,
    };
    openAddToNotes([verseRef]);
    setShowOtherLangs(false);
  };

  const sendOtherLangVerseToPrinciples = (entryLang: LangCode, text: string | null) => {
    if (!otherLangTarget || !selectedBook || !text) return;
    const verseRef: VerseRef = {
      bookId: otherLangTarget.bookId,
      bookName: getBookName(selectedBook),
      chapter: otherLangTarget.chapter,
      verse: otherLangTarget.verses[0],
      text,
      translation: entryLang,
    };
    openAddToPrinciples([verseRef]);
    setShowOtherLangs(false);
  };

  const swipeStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const swipeHandled = useRef(false);
  const onTouchStart = (e: React.TouchEvent) => {
    const tTouch = e.touches[0];
    swipeStart.current = {
      x: tTouch.clientX,
      y: tTouch.clientY,
      time: Date.now(),
    };
    swipeHandled.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!swipeStart.current || swipeHandled.current || loading || !selectedBook) return;
    const tTouch = e.touches[0];
    const dx = tTouch.clientX - swipeStart.current.x;
    const dy = tTouch.clientY - swipeStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (absDx > 60 && absDx > absDy * 1.4) {
      swipeHandled.current = true;
      if (dx < 0) handleNextUnit();
      else handlePrevUnit();
    }
  };
  const onTouchEnd = () => {
    swipeStart.current = null;
    swipeHandled.current = false;
  };

  const stickyOffset = NAV_H + cmdH + 12;

  const scrollDebounce = useRef<number | null>(null);
  const [showBottomRandom, setShowBottomRandom] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (!chapter || !selectedBook) return;
      if (Date.now() < suppressAutoSaveUntil.current) return;
      if (scrollDebounce.current) window.clearTimeout(scrollDebounce.current);
      scrollDebounce.current = window.setTimeout(() => {
        try {
          const offset = NAV_H + cmdH + 16;
          let bestVerse = 1;
          for (const v of chapter.verses) {
            const el = document.getElementById(`verse-${v.verse}`);
            if (!el) continue;
            const top = el.getBoundingClientRect().top;
            if (top - offset <= 0) bestVerse = v.verse;
            else break;
          }

          const slotToUpdate =
            activeSlot && activeSlot !== 0 ? activeSlot : lastTappedSlot === 0 ? 0 : null;

          if (slotToUpdate !== null) {
            saveQuickSlot(slotToUpdate, {
              book: selectedBook.name,
              chapter: selectedChapter,
              verse: bestVerse,
            });
            refreshSlots();
          }

          const nearBottom =
            window.innerHeight + (window.scrollY || document.documentElement.scrollTop || 0) >=
            (document.documentElement.scrollHeight || document.body.scrollHeight) - 180;

          setShowBottomRandom(nearBottom && lastTappedSlot === 0 && selectedVerses.length === 0);
        } catch {}
      }, 160);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollDebounce.current) window.clearTimeout(scrollDebounce.current);
    };
  }, [chapter, selectedBook?.name, selectedChapter, activeSlot, cmdH, lastTappedSlot, selectedVerses.length]);

  const pickNewRandom = async () => {
    try {
      const v = await getRandomVerse(state.settings.language);
      if (!v) return;
      saveQuickSlot(0, { book: v.book, chapter: v.chapter, verse: v.verse });
      const b = resolveBook(v.book);
      if (!b) return;
      setSelectedBook(b);
      setSelectedChapter(v.chapter);
      setSelectedVerses([]);
      setHighlightedVerse(v.verse);
      setScrollTargetVerse(v.verse);
      setTapped(0);
      setActiveSlot(null);
      fetchChapter(b, v.chapter);
      saveReadingPosition(b.name, v.chapter);
      setShowBottomRandom(false);
      try {
        window.scrollTo({ top: 0 });
      } catch {}
    } catch (e) {
      console.error('random error', e);
    }
  };

  return (
    <div className="min-h-[100svh] bg-gray-950 transition-colors duration-200">
      <div className="container mx-auto px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          {selectedBook && (
            <div
              ref={commandBarRef}
              className="sticky z-40 -mx-4 sm:mx-0"
              style={{ top: `${NAV_H}px` }}
            >
              <div className="bg-gray-800/95 backdrop-blur border border-gray-700 rounded-none sm:rounded-md shadow md:shadow-lg px-4 py-2 md:p-3">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-2 w-full">
                  <div className="flex flex-col w-full md:w-auto">
                    <h2 className="font-semibold text-white text-sm md:text-base flex flex-col md:flex-row md:items-center gap-2 w-full">
                      {/* MOBILE */}
                      <div className="flex w-full items-center gap-2 overflow-hidden md:hidden">
                        {/* Livre (mobile) — couleur = slot actif */}
                        <button
                          type="button"
                          onClick={() => setShowBookPicker(true)}
                          aria-expanded={showBookPicker}
                          className={`min-w-0 inline-flex items-center justify-between gap-1 rounded-md px-2 py-1 text-sm leading-none font-semibold shadow active:scale-95 focus:outline-none focus:ring-2 ${
                            activeTheme
                              ? `${activeTheme.mobileBtn} ${activeTheme.mobileBtnHover}`
                              : 'bg-blue-600 text-white hover:bg-blue-500'
                          } focus:ring-blue-400 flex-1`}
                          title={getBookName(selectedBook)}
                          aria-label={t('chooseBook')}
                        >
                          <span className="truncate w-[13ch]">{shortBookName(selectedBook)}</span>
                          <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                        </button>

                        {/* Chapitre (mobile) — idem */}
                        <button
                          type="button"
                          onClick={() => setShowChapterPicker(true)}
                          aria-expanded={showChapterPicker}
                          className={`min-w-0 inline-flex items-center justify-between gap-1 rounded-md px-2 py-1 text-sm leading-none font-semibold shadow active:scale-95 focus:outline-none focus:ring-2 ${
                            activeTheme
                              ? `${activeTheme.mobileBtn} ${activeTheme.mobileBtnHover}`
                              : 'bg-blue-600 text-white hover:bg-blue-500'
                          } focus:ring-blue-400 flex-none shrink-0 whitespace-nowrap`}
                          title={t('chooseChapter')}
                          aria-label={t('chooseChapter')}
                        >
                          <span className="truncate">
                            <span className="md:hidden">Ch.</span>
                            <span className="hidden md:inline">{t('chapter')}</span>{' '}
                            {selectedChapter}
                          </span>
                          <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                        </button>

                        {/* Loupe + slots (mobile) */}
                        <div className="flex items-center gap-2 md:hidden">
                          {[0, 1, 2, 3].map(i => {
                            const s = quickSlots[i];
                            const filled = s !== null;
                            const isNumeric = i !== 0;

                            const base = isNumeric
                              ? 'relative overflow-visible w-7 h-7 rounded-full text-[11px] font-bold shadow active:scale-95 inline-flex items-center justify-center transition-all box-border'
                              : 'px-3 py-1.5 rounded-full text-xs font-semibold shadow active:scale-95 inline-flex items-center gap-1 transition-all box-border';

                            const isActive = i === 0 ? lastTappedSlot === 0 : activeSlot === i;

                            let cls = '';
                            if (i === 0) {
                              cls = 'bg-blue-600 text-white hover:bg-blue-500';
                            } else {
                              const theme = SLOT_THEMES[i as SlotKey];
                              cls = filled
                                ? `${theme.solid} ${theme.solidHover}`
                                : 'bg-gray-800 text-white border border-gray-600';
                            }

                            const refText = s ? `${s.book} ${s.chapter}${s.verse ? ':' + s.verse : ''}` : '';
                            let title: string;
                            if (i === 0) {
                              title = s ? `${t('searchSlotLabel')}: ${refText}` : t('searchSlotEmpty');
                            } else {
                              title = s
                                ? `${t('memorySlotLabel')} ${i}: ${refText}`
                                : `${t('memorySlotLabel')} ${i} ${t('emptySlotSuffix')}`;
                            }

                            const activeRing = isActive ? 'border-2 border-white' : '';
                            const numGlow =
                              isNumeric && isActive
                                ? 'shadow-[0_0_0_2px_rgba(37,99,235,0.9),0_0_10px_rgba(37,99,235,0.6)]'
                                : '';

                            return (
                              <button
                                key={`qs-m-${i}`}
                                className={`${base} ${cls} ${activeRing} ${numGlow}`}
                                onClick={() => jumpToSlot(i)}
                                aria-label={title}
                                title={title}
                                aria-pressed={isActive}
                                aria-current={isActive ? 'true' : undefined}
                              >
                                {i === 0 ? <SearchIcon className="w-4 h-4" /> : <span className="relative z-[1]">{i}</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* DESKTOP : boutons Livre / Chapitre à gauche */}
                      <div className="hidden md:flex md:items-center md:gap-2">
                        <button
                          onClick={() => setShowBookPicker(true)}
                          className={`px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm
                            ${activeTheme ? activeTheme.solid : 'bg-blue-600 text-white'}
                            ${activeTheme ? activeTheme.solidHover : 'hover:bg-blue-500'}`}
                          title={t('chooseBook')}
                        >
                          {shortBookName(selectedBook)}
                        </button>

                        <button
                          onClick={() => setShowChapterPicker(true)}
                          className={`px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm inline-flex items-center gap-1
                            ${activeTheme ? activeTheme.solid : 'bg-blue-600 text-white'}
                            ${activeTheme ? activeTheme.solidHover : 'hover:bg-blue-500'}`}
                          title={t('chooseChapter')}
                        >
                          Ch. {selectedChapter}
                          <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                        </button>
                      </div>
                    </h2>
                  </div>

                  {/* Desktop : actions à droite (slots + flèches) */}
                  <div className="hidden md:flex items-center gap-2 ml-auto">
                    {/* Loupe + slots (desktop) */}
                    <div className="flex items-center gap-2 mr-2">
                      {[0, 1, 2, 3].map(i => {
                        const s = quickSlots[i];
                        const filled = s !== null;
                        const isNumeric = i !== 0;

                        const base = isNumeric
                          ? 'relative overflow-visible w-7 h-7 rounded-full text-[11px] font-bold shadow active:scale-95 inline-flex items-center justify-center transition-all box-border'
                          : 'px-3 py-1.5 rounded-full text-xs font-semibold shadow active:scale-95 inline-flex items-center gap-1 transition-all box-border';

                        const isActive = i === 0 ? lastTappedSlot === 0 : activeSlot === i;

                        let cls = '';
                        if (i === 0) {
                          cls = 'bg-blue-600 text-white hover:bg-blue-500';
                        } else {
                          const theme = SLOT_THEMES[i as SlotKey];
                          cls = filled
                            ? `${theme.solid} ${theme.solidHover}`
                            : 'bg-gray-800 text-white border border-gray-600';
                        }

                        const refText = s ? `${s.book} ${s.chapter}${s.verse ? ':' + s.verse : ''}` : '';
                        let title: string;
                        if (i === 0) {
                          title = s ? `${t('searchSlotLabel')}: ${refText}` : t('searchSlotEmpty');
                        } else {
                          title = s
                            ? `${t('memorySlotLabel')} ${i}: ${refText}`
                            : `${t('memorySlotLabel')} ${i} ${t('emptySlotSuffix')}`;
                        }

                        const activeRing = isActive ? 'border-2 border-white' : '';
                        const numGlow =
                          isNumeric && isActive
                            ? 'shadow-[0_0_0_2px_rgba(37,99,235,0.9),0_0_10px_rgba(37,99,235,0.6)]'
                            : '';

                        return (
                          <button
                            key={`qs-d-${i}`}
                            className={`${base} ${cls} ${activeRing} ${numGlow}`}
                            onClick={() => jumpToSlot(i)}
                            aria-label={title}
                            title={title}
                            aria-pressed={isActive}
                            aria-current={isActive ? 'true' : undefined}
                          >
                            {i === 0 ? <SearchIcon className="w-4 h-4" /> : <span className="relative z-[1]">{i}</span>}
                          </button>
                        );
                      })}
                    </div>

                    {/* Flèches de navigation */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePrevUnit()}
                        className="p-1.5 rounded-md transition-all bg-gray-700 text-white hover:bg-gray-600"
                        title={t('prevChapter')}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleNextUnit()}
                        className="p-1.5 rounded-md transition-all bg-gray-700 text-white hover:bg-gray-600"
                        title={t('nextChapter')}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BARRE SELECTION (desktop) EN BAS DE L'ÉCRAN */}
          {selectedVerses.length > 0 && (
            <div className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4">
              <div className="bg-white/5 text-white border border-gray-700 rounded-xl shadow px-4 py-3 flex items-center justify-between w-full">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/90 text-white text-xs sm:text-sm shadow">
                  {selectedVerses.length} {t('versesSelectedSuffix')}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAddToNotes()}
                    className="inline-flex items-center px-3 py-2 rounded bg-orange-500 text-white hover:bg-orange-400"
                  >
                    <ListPlusIcon size={16} className="mr-2" />
                    {t('toNotes')}
                  </button>
                  <button
                    onClick={() => openAddToPrinciples()}
                    className="inline-flex items-center px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                  >
                    <ListPlusIcon size={16} className="mr-2" />
                    {t('toPrinciples')}
                  </button>
                  <button
                    onClick={openOtherLangs}
                    className="inline-flex items-center px-3 py-2 rounded bg-teal-600 text-white hover:bg-teal-500"
                  >
                    <LanguagesIcon size={16} className="mr-2" />
                    {t('showInOtherLangs')}
                  </button>
                  <button
                    onClick={copySelection}
                    className="inline-flex items-center px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
                  >
                    <CopyIcon size={16} className="mr-2" />
                    {t('copyLabel')}
                  </button>
                  <button
                    onClick={shareSelection}
                    className="inline-flex items-center px-3 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-400"
                  >
                    <ShareIcon size={16} className="mr-2" />
                    {t('shareLabel')}
                  </button>
                  <button
                    onClick={() => setSelectedVerses([])}
                    className="bg-slate-500 text-white px-3 py-2 rounded hover:bg-slate-400"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* MODAL : Choix du livre */}
          {showBookPicker && (
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowBookPicker(false)}
                aria-hidden="true"
              />
              <div className="relative w-full max-w-3xl mx-4 bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                  <div className="font-semibold text-lg">{t('chooseBook')}</div>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                    onClick={() => setShowBookPicker(false)}
                  >
                    {t('close')}
                  </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-4 space-y-8">
                  {/* Ancien Testament */}
                  <div>
                    <div className="text-lg font-extrabold text-white/90 mb-3 tracking-wide">
    {t('oldTestament')}
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
    {oldTestamentBooks.map(b => {
      const isCurrent = selectedBook?.name === b.name;
      return (
        <button
          key={b.name}
          type="button"
          onClick={() => handleBookSelect(b)}
          className={`text-left px-3 py-2 rounded-md border transition-colors ${
            isCurrent
              ? 'border-blue-400 bg-blue-600/30'
              : 'border-gray-700 bg-white/5 hover:bg-white/10'
          }`}
        >
          <div className="font-normal text-lg sm:text-xl leading-tight">{getBookName(b)}</div>
          <div className="text-base sm:text-lg text-white/70">
            {b.chapters} {t('chapter')}
            {b.chapters > 1 ? 's' : ''}
          </div>
        </button>
      );
    })}
  </div>
</div>

{/* Nouveau Testament */}
<div>
  <div className="text-lg font-extrabold text-white/90 mb-3 tracking-wide">
    {t('newTestament')}
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
    {newTestamentBooks.map(b => {
      const isCurrent = selectedBook?.name === b.name;
      return (
        <button
          key={b.name}
          type="button"
          onClick={() => handleBookSelect(b)}
          className={`text-left px-3 py-2 rounded-md border transition-colors ${
            isCurrent
              ? 'border-blue-400 bg-blue-600/30'
              : 'border-gray-700 bg-white/5 hover:bg-white/10'
          }`}
        >
          <div className="font-normal text-lg sm:text-xl leading-tight">{getBookName(b)}</div>
          <div className="text-base sm:text-lg text-white/70">
            {b.chapters} {t('chapter')}
            {b.chapters > 1 ? 's' : ''}
          </div>
        </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODAL : Choix du chapitre */}
          {showChapterPicker && selectedBook && (
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowChapterPicker(false)}
                aria-hidden="true"
              />
              <div className="relative w-full max-w-2xl mx-4 bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                  <div className="font-semibold text-lg">
                    {t('chooseChapter')} — {getBookName(selectedBook)}
                  </div>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                    onClick={() => setShowChapterPicker(false)}
                  >
                    {t('close')}
                  </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-4">
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                    {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(n => {
                      const isCurrent = n === selectedChapter;
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setShowChapterPicker(false);
                            handleChapterSelect(n);
                          }}
                          className={`flex items-center justify-center h-11 sm:h-12 rounded-lg text-base sm:text-lg font-bold border transition-colors ${
                            isCurrent
                              ? 'border-blue-400 bg-blue-600/30'
                              : 'border-gray-700 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedBook ? (
            <div
              className="bg-white/5 -mx-4 sm:mx-0 sm:rounded-xl sm:shadow-lg px-4 py-2 sm:p-6 min-h-96"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ touchAction: 'manipulation' }}
            >
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" />
                  <span className="ml-4 text-lg text-white">{t('loading')}</span>
                </div>
              ) : chapter ? (
                <div>
                  <div className="space-y-0">
                    {chapter.verses.map(v => {
                      const isHighlighted = highlightedVerse === v.verse;
                      const isSelected = selectedVerses.includes(v.verse);
                      const selectedBg = isSelected ? 'bg-blue-900/30' : '';
                      const highlightCls = isHighlighted
                        ? 'bg-indigo-500/20 ring-2 ring-indigo-400/80'
                        : '';
                      return (
                        <div
                          key={v.verse}
                          id={`verse-${v.verse}`}
                          onClick={() => toggleSelectVerse(v.verse)}
                          style={{ scrollMarginTop: NAV_H + cmdH + 12 }}
                          className={`relative cursor-pointer px-1 sm:px-2 py-2 sm:py-2.5 rounded-md transition-colors ${selectedBg} ${highlightCls}`}
                        >
                          <span className="absolute right-2 top-0.5 sm:top-1 text-[11px] sm:text-xs select-none pointer-events-none text-white">
                            {t('verseWord')} {v.verse}
                            {isSelected && <Check size={14} className="inline ml-1 text-blue-300" />}
                          </span>
                          <div
                            className="text-white"
                            style={{
                              fontSize: `${state.settings.fontSize}px`,
                              lineHeight: '1.55',
                            }}
                          >
                            {v.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-white/80">
                  <p className="text-lg mb-2">{t('selectChapter')}</p>
                  <p className="text-sm">
                    {getBookName(selectedBook)} - {selectedBook.chapters} {t('chapter')}
                    {selectedBook.chapters > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-white/80 text-center py-16">
              <Book size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">{t('selectBook')}</p>
            </div>
          )}

          {/* BARRE SELECTION (mobile) */}
          {selectedVerses.length > 0 && (
            <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full px-3">
              <div className="bg-white/5 text-white shadow-lg rounded-2xl px-3 py-2 space-y-2 max-w-[500px] mx-auto">
                {/* Ligne 1 : Notes / Principes / Autres langues */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => openAddToNotes()}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-500 text-white text-sm"
                  >
                    <ListPlusIcon size={16} className="mr-1" />
                    {t('notes')}
                  </button>
                  <button
                    onClick={() => openAddToPrinciples()}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-600 text-white text-sm"
                  >
                    <ListPlusIcon size={16} className="mr-1" />
                    {t('principles')}
                  </button>
                  <button
                    onClick={openOtherLangs}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-teal-600 text-white text-sm"
                  >
                    <LanguagesIcon size={16} className="mr-1" />
                    {t('showInOtherLangs')}
                  </button>
                </div>

                {/* Ligne 2 : Copier / Partager / Annuler */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={copySelection}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm"
                  >
                    <CopyIcon size={16} className="mr-1" />
                    {t('copyLabel')}
                  </button>
                  <button
                    onClick={shareSelection}
                    className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1.5 rounded-full inline-flex items-center text-sm"
                  >
                    <ShareIcon size={16} className="mr-1" />
                    {t('shareLabel')}
                  </button>
                  <button
                    onClick={() => setSelectedVerses([])}
                    className="bg-slate-500 hover:bg-slate-400 text-white px-3 py-1.5 rounded-full text-sm"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* MODAL : ajout vers NOTES */}
          {showAddToNotes && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowAddToNotes(false)}
                aria-hidden="true"
              />
              <div className="relative bg-gray-900 text-white rounded-xl shadow-lg p-4 w-full max-w-md mx-4">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  {t('notesModalTitle')}
                </h3>

                <form onSubmit={confirmAddToNotes}>
                  <div className="max-h-64 overflow-y-auto mt-2 space-y-1">
                    {notesListsForModal.length === 0 ? (
                      <p className="text-base text-white/70">
                        {t('notesNoList')}
                      </p>
                    ) : (
                      notesListsForModal.map(l => (
                        <label
                          key={l.id}
                          className="flex items-center gap-2 px-2 py-2 rounded hover:bg-white/5 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="notesList"
                            className="accent-emerald-500"
                            value={l.id}
                            checked={selectedNotesListIds.includes(l.id)}
                            onChange={e => {
                              const checked = e.target.checked;
                              setSelectedNotesListIds(prev =>
                                checked
                                  ? [...prev, l.id]
                                  : prev.filter(id => id !== l.id)
                              );
                            }}
                          />
                          <span className="text-lg truncate">
                            {l.title || t('untitledList')}
                          </span>
                        </label>
                      ))
                    )}
                  </div>

                  <div className="mt-3">
                    <label className="block text-lg mb-1">
                      {t('notesNewListOptional')}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-gray-800 border border-gray-600 px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={newNotesListTitle}
                      onChange={e => setNewNotesListTitle(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddToNotes(false)}
                      className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-sm"
                    >
                      OK
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* MODAL : ajout vers PRINCIPES */}
          {showAddToPrinciples && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowAddToPrinciples(false)}
                aria-hidden="true"
              />
              <div className="relative bg-gray-900 text-white rounded-xl shadow-lg p-4 w-full max-w-md mx-4">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  {t('principlesModalTitle')}
                </h3>

                <form onSubmit={confirmAddToPrinciples}>
                  <div className="max-h-64 overflow-y-auto mt-2 space-y-1">
                    {principlesListsForModal.length === 0 ? (
                      <p className="text-base text-white/70">
                        {t('principlesNoList')}
                      </p>
                    ) : (
                      principlesListsForModal.map(l => (
                        <label
                          key={l.id}
                          className="flex items-center gap-2 px-2 py-2 rounded hover:bg-white/5 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="principleList"
                            className="accent-indigo-400"
                            value={l.id}
                            checked={selectedPrincipleListIds.includes(l.id)}
                            onChange={e => {
                              const checked = e.target.checked;
                              setSelectedPrincipleListIds(prev =>
                                checked
                                  ? [...prev, l.id]
                                  : prev.filter(id => id !== l.id)
                              );
                            }}
                          />
                          <span className="text-lg truncate">
                            {l.title || t('untitledList')}
                          </span>
                        </label>
                      ))
                    )}
                  </div>

                  <div className="mt-3">
                    <label className="block text-lg mb-1">
                      {t('principlesNewListOptional')}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-gray-800 border border-gray-600 px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={newPrincipleListTitle}
                      onChange={e => setNewPrincipleListTitle(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddToPrinciples(false)}
                      className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-sm"
                    >
                      OK
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL : verset (ou plusieurs) dans autres langues */}
          {showOtherLangs && otherLangTarget && selectedBook && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowOtherLangs(false)}
                aria-hidden="true"
              />
              <div className="relative bg-gray-900 text-white rounded-xl shadow-lg p-4 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
                <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                  {t('showInOtherLangs')}
                </h3>
                <p className="text-base text-white/70 mb-4">
                  {getBookName(selectedBook)} {otherLangTarget.chapter}:{compressRanges(otherLangTarget.verses)}
                </p>

                <div className="space-y-3">
                  {otherLangVerses.map(entry => {
                    const hasText = !!entry.text && !entry.error;
                    const canLoadManually = !entry.loading && !entry.text && !entry.error;

                    return (
                      <div
                        key={entry.lang}
                        className="border border-gray-700 rounded-lg px-3 py-3"
                      >
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <span className="text-sm font-semibold uppercase tracking-wide text-gray-300">
                            {entry.lang.toUpperCase()}
                          </span>

                          {canLoadManually && (
                            <button
                              onClick={() => loadOtherLangRef.current?.(entry.lang)}
                              className="px-2.5 py-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xs"
                            >
                              Charger
                            </button>
                          )}

                          {hasText && (
                            <div className="flex items-center gap-1.5 flex-wrap justify-end">
                              <button
                                onClick={() => sendOtherLangVerseToNotes(entry.lang, entry.text)}
                                className="px-2.5 py-1 rounded-full bg-orange-500 text-white text-xs"
                              >
                                {t('notes')}
                              </button>
                              <button
                                onClick={() =>
                                  sendOtherLangVerseToPrinciples(entry.lang, entry.text)
                                }
                                className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs"
                              >
                                {t('principles')}
                              </button>
                              <button
                                onClick={() => copyOtherLangVerse(entry.lang, entry.text)}
                                className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs"
                              >
                                {t('copyLabel')}
                              </button>
                              <button
                                onClick={() => shareOtherLangVerse(entry.lang, entry.text)}
                                className="px-2.5 py-1 rounded-full bg-indigo-500 text-white text-xs"
                              >
                                {t('shareLabel')}
                              </button>
                            </div>
                          )}
                        </div>

                        {entry.loading ? (
                          <p className="text-sm text-white/70">{t('loading')}</p>
                        ) : !entry.text || entry.error ? (
                          <p className="text-sm text-white/60 italic">
                            Verset indisponible pour cette langue.
                          </p>
                        ) : (
                          <p className="text-xl md:text-2xl leading-relaxed">{entry.text}</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowOtherLangs(false)}
                    className="px-4 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                  >
                    {t('close')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TOASTS */}
          {copiedKey === 'selection' && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 rounded text-sm shadow bg-green-600 text-white z-50">
              {t('selectionCopied')}
            </div>
          )}
          {copiedKey === 'shared-fallback' && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 rounded text-sm shadow bg-blue-600 text-white z-50">
              {t('textReadyToShare')}
            </div>
          )}
          {copiedKey === 'added-to-notes' && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 rounded text-sm shadow bg-orange-500 text-white z-50">
              {t('addedToList')}
            </div>
          )}
          {copiedKey === 'added-to-principles' && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 rounded text-sm shadow bg-emerald-600 text-white z-50">
              {t('addedToList')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

