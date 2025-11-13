// src/pages/Reading.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { getBibleBooks, getChapter, getRandomVerse, copyToClipboard } from '../services/bibleService';
import { BibleBook, BibleChapter } from '../types/bible';
import {
  ChevronDown, Book, ChevronLeft, ChevronRight,
  Copy as CopyIcon, Check, Search as SearchIcon, Share2 as ShareIcon,
  ListPlus as ListPlusIcon
} from 'lucide-react';
import { readSlot as readQuickSlot, saveSlot as saveQuickSlot, type QuickSlot } from '../services/readingSlots';
import { getAllLists, createList, addVersesToList } from '../services/collectionsService';
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
  return 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
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
  const SLOT_THEMES: Record<SlotKey, { solid: string; solidHover: string; mobileBtn: string; mobileBtnHover: string; lightPaper: string; }> = {
    1: { solid: 'bg-amber-600 text-white',   solidHover: 'hover:bg-amber-500',  mobileBtn: 'bg-amber-600 text-white',  mobileBtnHover: 'hover:bg-amber-500',  lightPaper: 'bg-amber-50' },
    2: { solid: 'bg-violet-600 text-white',  solidHover: 'hover:bg-violet-500', mobileBtn: 'bg-violet-600 text-white', mobileBtnHover: 'hover:bg-violet-500', lightPaper: 'bg-violet-50' },
    3: { solid: 'bg-emerald-600 text-white', solidHover: 'hover:bg-emerald-500',mobileBtn: 'bg-emerald-600 text-white',mobileBtnHover: 'hover:bg-emerald-500',lightPaper: 'bg-emerald-50' },
  };

  const fetchChapter = async (book: BibleBook, chapterNum: number) => {
    setLoading(true);
    try { setChapter(await getChapter(book.name, chapterNum, state.settings.language)); }
    catch (error) { console.error('Error fetching chapter:', error); }
    finally { setLoading(false); }
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

  const handleBookSelect = (book: BibleBook) => {
    saveScrollForCurrent();
    setSelectedBook(book); setSelectedChapter(1);
    setSelectedVerses([]); setHighlightedVerse(null); setScrollTargetVerse(null);
    setShowBookPicker(false);
    fetchChapter(book, 1); saveReadingPosition(book.name, 1);
    try { window.scrollTo({ top: 0 }); } catch {}
  };
  const handleChapterSelect = (chapterNum: number) => {
    saveScrollForCurrent(); setSelectedChapter(chapterNum);
    if (selectedBook) {
      setSelectedVerses([]); setHighlightedVerse(null); setScrollTargetVerse(null);
      try { window.scrollTo({ top: 0 }); } catch {}
      fetchChapter(selectedBook, chapterNum); saveReadingPosition(selectedBook.name, chapterNum);
    }
  };

  const handleNextUnit = () => {
    if (!selectedBook) return;
    if (selectedChapter < selectedBook.chapters) { handleChapterSelect(selectedChapter + 1); return; }
    const idx = books.findIndex(b => b.name === selectedBook.name);
    if (idx >= 0 && idx < books.length - 1) {
      const nextBook = books[idx + 1];
      setSelectedBook(nextBook); setSelectedChapter(1);
      setSelectedVerses([]); setHighlightedVerse(null); setScrollTargetVerse(null);
      try { window.scrollTo({ top: 0 }); } catch {}
      fetchChapter(nextBook, 1); saveReadingPosition(nextBook.name, 1);
    }
  };
  const handlePrevUnit = () => {
    if (!selectedBook) return;
    if (selectedChapter > 1) { handleChapterSelect(selectedChapter - 1); return; }
    const idx = books.findIndex(b => b.name === selectedBook.name);
    if (idx > 0) {
      const prevBook = books[idx - 1];
      setSelectedBook(prevBook); setSelectedChapter(prevBook.chapters);
      setSelectedVerses([]); setHighlightedVerse(null); setScrollTargetVerse(null);
      try { window.scrollTo({ top: 0 }); } catch {}
      fetchChapter(prevBook, prevBook.chapters); saveReadingPosition(prevBook.name, prevBook.chapters);
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
    found = books.find(b => b.nameEn === bookIdentifier); if (found) return found;
    found = books.find(b => b.nameFr === bookIdentifier); if (found) return found;
    return null;
  };

  function readUrlIntent() {
    try {
      const u = new URL(window.location.href);
      const qb = u.searchParams.get('b') || u.searchParams.get('book');
      const qc = u.searchParams.get('c') || u.searchParams.get('chapter');
      const qv = u.searchParams.get('v') || u.searchParams.get('verse');
      return { qb, qc, qv };
    } catch { return { qb: null, qc: null, qv: null }; }
  }

  function clearUrlIntent() {
    try {
      const u = new URL(window.location.href);
      ['b', 'book', 'c', 'chapter', 'v', 'verse'].forEach(k => u.searchParams.delete(k));
      const next = u.pathname + (u.search || '') + (u.hash || '');
      window.history.replaceState({}, '', next);
    } catch {}
  }

  const [quickSlots, setQuickSlots] = useState<QuickSlot[]>([null, null, null, null]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [lastTappedSlot, setLastTappedSlot] = useState<number | null>(null);
  function readAllSlots(): QuickSlot[] { return [0,1,2,3].map(i => readQuickSlot(i)); }
  function refreshSlots() { try { setQuickSlots(readAllSlots()); } catch {} }
  useEffect(() => { refreshSlots(); }, []);
  useEffect(() => {
    if (!selectedBook) return;
    if (activeSlot !== null && activeSlot !== 0) {
      try { saveQuickSlot(activeSlot, { book: selectedBook.name, chapter: selectedChapter }); refreshSlots(); } catch {}
    }
  }, [selectedBook?.name, selectedChapter, activeSlot]);
  useEffect(() => { try { if (activeSlot && activeSlot !== 0) localStorage.setItem('twog:qs:lastActive', String(activeSlot)); } catch {} }, [activeSlot]);
  function setTapped(i: number) { setLastTappedSlot(i); try { localStorage.setItem('twog:qs:lastTapped', String(i)); } catch {} }

  function jumpToSlot(i: number) {
    const slot = readQuickSlot(i);
    setTapped(i);
    if (i === 0) {
      setActiveSlot(null);
      if (!slot) return;
      const b = resolveBook(slot.book); if (!b) return;
      setSelectedBook(b); setSelectedChapter(slot.chapter);
      setSelectedVerses([]); setHighlightedVerse(slot.verse ?? null); setScrollTargetVerse(slot.verse ?? null);
      try { window.scrollTo({ top: 0 }); } catch {}
      fetchChapter(b, slot.chapter); saveReadingPosition(b.name, slot.chapter);
      return;
    }
    setActiveSlot(i);
    if (!slot) {
      if (!selectedBook) return;
      saveQuickSlot(i, { book: selectedBook.name, chapter: selectedChapter }); refreshSlots(); return;
    }
    const book = resolveBook(slot.book); if (!book) return;
    setSelectedBook(book); setSelectedChapter(slot.chapter);
    setSelectedVerses([]); setHighlightedVerse(null); setScrollTargetVerse(slot.verse ?? null);
    try { window.scrollTo({ top: 0 }); } catch {}
    fetchChapter(book, slot.chapter); saveReadingPosition(book.name, slot.chapter);
  }

  const activeTheme = (activeSlot === 1 || activeSlot === 2 || activeSlot === 3) ? SLOT_THEMES[activeSlot as SlotKey] : null;
  const desktopChipBase = 'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm whitespace-nowrap';
  const desktopChipColors = activeTheme ? activeTheme.solid : 'bg-blue-600 text-white';

  const [hasLoadedContext, setHasLoadedContext] = useState(false);

  useEffect(() => {
    const applyIfChanged = (book: BibleBook, chapNum: number, verseNum: number | null) => {
      const alreadyThere =
        selectedBook?.name === book.name &&
        selectedChapter === chapNum &&
        (verseNum === null || highlightedVerse === verseNum);

      if (alreadyThere) return false;

      setSelectedBook(book);
      setSelectedChapter(chapNum);
      setSelectedVerses([]);
      setHighlightedVerse(verseNum);
      setScrollTargetVerse(verseNum);
      setTapped(0);
      setActiveSlot(null);
      try { window.scrollTo({ top: 0 }); } catch {}
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
        const changed = applyIfChanged(book, chapNum, v);
        if (!hasLoadedContext) setHasLoadedContext(true);
        clearUrlIntent();
        if (changed) return;
      }
    }

    // 2) readingContext
    const ctx = state.readingContext;
    if (ctx && ctx.book && ctx.chapter > 0) {
      const book2 = resolveBook(ctx.book);
      if (book2) {
        const v2 = ctx.verse ?? null;
        const changed = applyIfChanged(book2, ctx.chapter, v2);
        dispatch({ type: 'SET_READING_CONTEXT', payload: { book: '', chapter: 0 } });
        if (!hasLoadedContext) setHasLoadedContext(true);
        if (changed) return;
      }
    }

    // 3) si déjà chargé et pas de nouvelle intention
    if (hasLoadedContext) return;

    // 4) fallbacks
    try {
      const rawTapped = localStorage.getItem('twog:qs:lastTapped');
      if (rawTapped === '0') {
        const s0 = readQuickSlot(0);
        if (s0) {
          const b = resolveBook(s0.book);
          if (b) {
            const v = s0.verse ?? null;
            const changed = applyIfChanged(b, s0.chapter, v);
            setHasLoadedContext(true);
            if (changed) return;
          }
        }
      }
    } catch {}

    try {
      const rawActive = localStorage.getItem('twog:qs:lastActive');
      const i = rawActive ? parseInt(rawActive, 10) : NaN;
      if (i === 1 || i === 2 || i === 3) {
        const s = readQuickSlot(i);
        if (s) {
          const b = resolveBook(s.book);
          if (b) {
            const changed = applyIfChanged(b, s.chapter, s.verse ?? null);
            setActiveSlot(i);
            setLastTappedSlot(i);
            setHasLoadedContext(true);
            if (changed) return;
          }
        }
      }
    } catch {}

    const last = (state.settings as any).lastReadingPosition;
    if (last && last.book && last.chapter > 0) {
      const b = resolveBook(last.book);
      if (b) {
        applyIfChanged(b, last.chapter, last.verse ?? null);
        setHasLoadedContext(true);
        return;
      }
    }

    const john = resolveBook('John');
    if (john) {
      applyIfChanged(john, 1, null);
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
    hasLoadedContext
  ]);

  const suppressAutoSaveUntil = useRef<number>(0);
  const programmaticScrollUntil = useRef<number>(0);
  function scrollToVerseNumber(v: number, smooth: boolean, extraTop = 0) {
    const now = Date.now(); const lockMs = 2500;
    suppressAutoSaveUntil.current = now + lockMs; programmaticScrollUntil.current = now + lockMs;
    const baseOffset = NAV_H + cmdH + 14; const offset = baseOffset + extraTop;
    let tries = 0; const maxTries = 24;
    const tick = () => {
      const el = document.getElementById(`verse-${v}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        const current = window.scrollY || document.documentElement.scrollTop || 0;
        const target = current + rect.top - offset;
        window.scrollTo({ top: Math.max(target, 0), behavior: smooth ? 'smooth' : 'auto' });
        return;
      }
      if (tries++ < maxTries) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  useEffect(() => {
    if (!chapter || !selectedBook) return;
    const doScroll = () => {
      const v = (scrollTargetVerse ?? highlightedVerse);
      if (v !== null) {
        const isHighlight = highlightedVerse !== null && v === highlightedVerse;
        scrollToVerseNumber(v, isHighlight, isHighlight ? HIGHLIGHT_EXTRA_OFFSET : 0);
        return;
      }
      if (Date.now() < programmaticScrollUntil.current) return;
      try {
        const raw = sessionStorage.getItem(`twog:reading:scroll:${state.settings.language}:${selectedBook.name}:${selectedChapter}`);
        const y = raw ? parseInt(raw, 10) : 0;
        if (Number.isFinite(y) && y > 0) {
          const now = Date.now(); const lockMs = 800;
          suppressAutoSaveUntil.current = now + lockMs; programmaticScrollUntil.current = now + lockMs;
          window.scrollTo({ top: y, behavior: 'auto' });
        } else { window.scrollTo({ top: 0, behavior: 'auto' }); }
      } catch {}
    };
    const t = setTimeout(doScroll, 50);
    return () => clearTimeout(t);
  }, [chapter, highlightedVerse, scrollTargetVerse, state.settings.language, selectedBook?.name, selectedChapter]);

  const toggleSelectVerse = (num: number) => {
    setSelectedVerses(prev => (prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]));
  };
  const compressRanges = (nums: number[]) => {
    if (nums.length === 0) return '';
    const sorted = [...nums].sort((a, b) => a - b);
    const parts: string[] = [];
    let start = sorted[0]; let prev = sorted[0];
    const push = () => (start === prev ? parts.push(`${start}`) : parts.push(`${start}-${prev}`));
    for (let i = 1; i < sorted.length; i++) {
      const n = sorted[i];
      if (n === prev + 1) prev = n; else { push(); start = n; prev = n; }
    }
    push(); return parts.join(',');
  };

  const copySelection = async () => {
    if (!selectedBook || !chapter || selectedVerses.length === 0) return;
    const chosen = chapter.verses.filter(v => selectedVerses.includes(v.verse)).sort((a, b) => a.verse - b.verse);
    const ranges = compressRanges(chosen.map(v => v.verse));
    const ref = getBookName(selectedBook) + ' ' + chapter.chapter + ':' + ranges;
    const body = chosen.map(v => String(v.text)).join('\n');
    const payload = ref + '\n' + body;
    const ok = await copyToClipboard(payload);
    if (ok) { setCopiedKey('selection'); setTimeout(() => setCopiedKey(''), 1500); setSelectedVerses([]); }
  };
  const shareSelection = async () => {
    if (!selectedBook || !chapter || selectedVerses.length === 0) return;
    const chosen = chapter.verses.filter(v => selectedVerses.includes(v.verse)).sort((a, b) => a.verse - b.verse);
    const ranges = compressRanges(chosen.map(v => v.verse));
    const ref = getBookName(selectedBook) + ' ' + chapter.chapter + ':' + ranges;
    const body = chosen.map(v => String(v.text)).join('\n');
    const shareUrl = 'https://www.theword.fr';
    const shareText = ref + '\n' + body + '\n\n' + shareUrl;
    try {
      const nav = navigator as any;
      if (nav?.share) { await nav.share({ title: ref, text: shareText }); setSelectedVerses([]); }
      else {
        const ok = await copyToClipboard(shareText);
        if (ok) { setCopiedKey('shared-fallback'); setTimeout(() => setCopiedKey(''), 1800); setSelectedVerses([]); }
      }
    } catch (e) { console.error('share error', e); }
  };

  // ---- Ajout à une liste Notes / Principes ----
  const sortListsByTitle = (arr: VerseList[]) =>
    [...arr].sort((a, b) => (a.title || '').localeCompare(b.title || '', undefined, { sensitivity: 'base' }));

  // NOTES (collectionsService)
  const [showAddToNotes, setShowAddToNotes] = useState(false);
  const [notesListsForModal, setNotesListsForModal] = useState<VerseList[]>([]);
  const [selectedNotesListId, setSelectedNotesListId] = useState<string>('');
  const [newNotesListTitle, setNewNotesListTitle] = useState<string>('');

  const openAddToNotes = () => {
    const all = sortListsByTitle(getAllLists());
    setNotesListsForModal(all);
    setSelectedNotesListId(all.length > 0 ? all[0].id : '');
    setNewNotesListTitle('');
    setShowAddToNotes(true);
  };

  const confirmAddToNotes = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedBook || !chapter || selectedVerses.length === 0) return;

    const typed = newNotesListTitle.trim();
    let targetId = '';

    if (typed) {
      const existing = getAllLists().find(
        (l) => (l.title || '').trim().toLowerCase() === typed.toLowerCase()
      );
      targetId = existing ? existing.id : createList(typed).id;
    } else {
      targetId = selectedNotesListId || '';
    }
    if (!targetId) return;

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

    try { addVersesToList(targetId, chosen); } catch (err) { console.error('addVerses error', err); }

    setShowAddToNotes(false);
    setSelectedVerses([]);
    setCopiedKey('added-to-list');
    setTimeout(() => setCopiedKey(''), 1600);
  };

  // PRINCIPES (localStorage twog:principles:v1)
  const [showAddToPrinciples, setShowAddToPrinciples] = useState(false);
  const [principlesListsForModal, setPrinciplesListsForModal] = useState<VerseList[]>([]);
  const [selectedPrincipleListId, setSelectedPrincipleListId] = useState<string>('');
  const [newPrincipleListTitle, setNewPrincipleListTitle] = useState<string>('');

  const openAddToPrinciples = () => {
    const all = sortListsByTitle(getAllPrinciplesLists());
    setPrinciplesListsForModal(all);
    setSelectedPrincipleListId(all.length > 0 ? all[0].id : '');
    setNewPrincipleListTitle('');
    setShowAddToPrinciples(true);
  };

  const confirmAddToPrinciples = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedBook || !chapter || selectedVerses.length === 0) return;

    const typed = newPrincipleListTitle.trim();
    let targetId = '';

    const all = getAllPrinciplesLists();
    if (typed) {
      const existing = all.find(
        (l) => (l.title || '').trim().toLowerCase() === typed.toLowerCase()
      );
      targetId = existing ? existing.id : createPrincipleList(typed).id;
    } else {
      targetId = selectedPrincipleListId || '';
    }
    if (!targetId) return;

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

    try { addVersesToPrincipleList(targetId, chosen); } catch (err) { console.error('addVerses principles error', err); }

    setShowAddToPrinciples(false);
    setSelectedVerses([]);
    setCopiedKey('added-to-list');
    setTimeout(() => setCopiedKey(''), 1600);
  };

  const swipeStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const swipeHandled = useRef(false);
  const onTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; swipeStart.current = { x: t.clientX, y: t.clientY, time: Date.now() }; swipeHandled.current = false; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!swipeStart.current || swipeHandled.current || loading || !selectedBook) return;
    const t = e.touches[0]; const dx = t.clientX - swipeStart.current.x; const dy = t.clientY - swipeStart.current.y;
    const absDx = Math.abs(dx); const absDy = Math.abs(dy);
    if (absDx > 60 && absDx > absDy * 1.4) { swipeHandled.current = true; if (dx < 0) handleNextUnit(); else handlePrevUnit(); }
  };
  const onTouchEnd = () => { swipeStart.current = null; swipeHandled.current = false; };

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
            const el = document.getElementById(`verse-${v.verse}`); if (!el) continue;
            const top = el.getBoundingClientRect().top;
            if (top - offset <= 0) bestVerse = v.verse; else break;
          }
          if (activeSlot && activeSlot !== 0) {
            saveQuickSlot(activeSlot, { book: selectedBook.name, chapter: selectedChapter, verse: bestVerse });
            refreshSlots();
          }
          const nearBottom =
            window.innerHeight + (window.scrollY || document.documentElement.scrollTop || 0)
            >= (document.documentElement.scrollHeight || document.body.scrollHeight) - 180;
          setShowBottomRandom(nearBottom && lastTappedSlot === 0 && selectedVerses.length === 0);
        } catch {}
      }, 160);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (scrollDebounce.current) window.clearTimeout(scrollDebounce.current); };
  }, [chapter, selectedBook?.name, selectedChapter, activeSlot, cmdH, lastTappedSlot, selectedVerses.length]);

  const pickNewRandom = async () => {
    try {
      const v = await getRandomVerse(state.settings.language);
      if (!v) return;
      saveQuickSlot(0, { book: v.book, chapter: v.chapter, verse: v.verse });
      const b = resolveBook(v.book); if (!b) return;
      setSelectedBook(b); setSelectedChapter(v.chapter);
      setSelectedVerses([]);
      setHighlightedVerse(v.verse); setScrollTargetVerse(v.verse);
      setTapped(0); setActiveSlot(null);
      fetchChapter(b, v.chapter); saveReadingPosition(b.name, v.chapter);
      setShowBottomRandom(false);
      try { window.scrollTo({ top: 0 }); } catch {}
    } catch (e) { console.error('random error', e); }
  };

  return (
    <div className="min-h-[100svh] bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          {selectedBook && (
            <div ref={commandBarRef} className="sticky z-40 -mx-4 sm:mx-0" style={{ top: `${NAV_H}px` }}>
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
                          className={`min-w-0 inline-flex items-center justify-between gap-1 rounded-md px-2 py-1 text-sm leading-none font-semibold shadow active:scale-95 focus:outline-none focus:ring-2 ${activeTheme ? `${activeTheme.mobileBtn} ${activeTheme.mobileBtnHover}` : 'bg-blue-600 text-white hover:bg-blue-500'} focus:ring-blue-400 flex-1`}
                          title={getBookName(selectedBook)}
                          aria-label={state.settings.language === 'fr' ? 'Choisir un livre' : 'Choose a book'}
                        >
                          <span className="truncate w-[13ch]">{shortBookName(selectedBook)}</span>
                          <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                        </button>

                        {/* Chapitre (mobile) — idem */}
                        <button
                          type="button"
                          onClick={() => setShowChapterPicker(true)}
                          aria-expanded={showChapterPicker}
                          className={`min-w-0 inline-flex items-center justify-between gap-1 rounded-md px-2 py-1 text-sm leading-none font-semibold shadow active:scale-95 focus:outline-none focus:ring-2 ${activeTheme ? `${activeTheme.mobileBtn} ${activeTheme.mobileBtnHover}` : 'bg-blue-600 text-white hover:bg-blue-500'} focus:ring-blue-400 flex-none shrink-0 whitespace-nowrap`}
                          title={state.settings.language === 'fr' ? 'Choisir un chapitre' : 'Choose a chapter'}
                          aria-label={state.settings.language === 'fr' ? 'Choisir un chapitre' : 'Choose a chapter'}
                        >
                          <span className="truncate"><span className="md:hidden">Ch.</span><span className="hidden md:inline">{t('chapter')}</span> {selectedChapter}</span>
                          <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                        </button>

                        {/* Loupe + slots (mobile) */}
                        <div className="flex items-center gap-2 md:hidden">
                          {[0, 1, 2, 3].map((i) => {
                            const s = quickSlots[i];
                            const filled = s !== null;
                            const isNumeric = i !== 0;

                            // ronds 1/2/3 plus petits, police inchangée + box-border pour garder le diamètre extérieur
                            const base = isNumeric
                              ? 'relative overflow-visible w-7 h-7 rounded-full text-[11px] font-bold shadow active:scale-95 inline-flex items-center justify-center transition-all box-border'
                              : 'px-3 py-1.5 rounded-full text-xs font-semibold shadow active:scale-95 inline-flex items-center gap-1 transition-all box-border';

                            let cls = '';
                            if (i === 0) {
                              cls = lastTappedSlot === 0 ? 'bg-blue-600 text-white hover:bg-blue-500' :
                                'bg-white/5 border border-blue-400/60 text-blue-200';
                            } else {
                              const theme = SLOT_THEMES[i as SlotKey];
                              cls = filled ? `${theme.solid} ${theme.solidHover}` : 'bg-gray-800 text-white border border-gray-600';
                            }

                            // Cercle bleu au périmètre (1/2/3) — conservé
                            const activePerimeter = isNumeric && activeSlot === i ? 'border-2 border-blue-400' : '';

                            const title =
                              i === 0
                                ? (s ? `Recherche : ${s.book} ${s.chapter}${s.verse ? ':' + s.verse : ''}` : 'Recherche (vide)')
                                : (s ? `Mémoire ${i} : ${s.book} ${s.chapter}${s.verse ? ':' + s.verse : ''}` : `Mémoire ${i} (vide)`);
                            const isPressed = i === 0 ? lastTappedSlot === 0 : activeSlot === i;

                            // GLOW plus visible (sans changer tailles/couleurs)
                            const loupeGlow = (i === 0 && isPressed)
                              ? 'shadow-[0_0_0_2px_rgba(37,99,235,0.95),0_0_10px_rgba(37,99,235,0.55)]'
                              : '';
                            const numGlow = (isNumeric && activeSlot === i)
                              ? 'shadow-[0_0_0_2px_rgba(37,99,235,0.9),0_0_10px_rgba(37,99,235,0.6)]'
                              : '';

                            return (
                              <button
                                key={`qs-m-${i}`}
                                className={`${base} ${cls} ${activePerimeter} ${loupeGlow} ${numGlow}`}
                                onClick={() => jumpToSlot(i)}
                                aria-label={title}
                                title={title}
                                aria-pressed={isPressed}
                                aria-current={isPressed ? 'true' : undefined}
                              >
                                {i === 0 ? <SearchIcon className="w-4 h-4" /> : <span className="relative z-[1]">{i}</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* DESKTOP */}
                      <div className="hidden md:flex md:items-center md:gap-2">
                        <span className={`${desktopChipBase} ${desktopChipColors}`}>
                          <span className="truncate max-w-[28ch]">{getBookName(selectedBook)}</span>
                          <span>•</span>
                          <span>{t('chapter')} {selectedChapter}</span>
                        </span>
                      </div>
                    </h2>
                  </div>

                  {/* Desktop : actions à droite */}
                  <div className="hidden md:flex items-center gap-2 ml-auto">
                    {/* Loupe + slots (desktop) — mêmes tailles/couleurs que mobile */}
                    <div className="flex items-center gap-2 mr-2">
                      {[0,1,2,3].map((i) => {
                        const s = quickSlots[i];
                        const filled = s !== null;
                        const isNumeric = i !== 0;

                        const base = isNumeric
                          ? 'relative overflow-visible w-7 h-7 rounded-full text-[11px] font-bold shadow active:scale-95 inline-flex items-center justify-center transition-all box-border'
                          : 'px-3 py-1.5 rounded-full text-xs font-semibold shadow active:scale-95 inline-flex items-center gap-1 transition-all box-border';

                        let cls = '';
                        if (i === 0) {
                          cls = lastTappedSlot === 0 ? 'bg-blue-600 text-white hover:bg-blue-500' :
                            'bg-white/5 border border-blue-400/60 text-blue-200';
                        } else {
                          const theme = SLOT_THEMES[i as SlotKey];
                          cls = filled ? `${theme.solid} ${theme.solidHover}` : 'bg-gray-800 text-white border border-gray-600';
                        }

                        // Cercle bleu au périmètre (1/2/3) — conservé
                        const activePerimeter = isNumeric && activeSlot === i ? 'border-2 border-blue-400' : '';

                        const title =
                          i === 0
                            ? (s ? `Recherche : ${s.book} ${s.chapter}${s.verse ? ':' + s.verse : ''}` : 'Recherche (vide)')
                            : (s ? `Mémoire ${i} : ${s.book} ${s.chapter}${s.verse ? ':' + s.verse : ''}` : `Mémoire ${i} (vide)`);
                        const isPressed = i === 0 ? lastTappedSlot === 0 : activeSlot === i;

                        // GLOW plus visible (sans changer tailles/couleurs)
                        const loupeGlow = (i === 0 && isPressed)
                          ? 'shadow-[0_0_0_2px_rgba(37,99,235,0.95),0_0_10px_rgba(37,99,235,0.55)]'
                          : '';
                        const numGlow = (isNumeric && activeSlot === i)
                          ? 'shadow-[0_0_0_2px_rgba(37,99,235,0.9),0_0_10px_rgba(37,99,235,0.6)]'
                          : '';

                        return (
                          <button
                            key={`qs-d-${i}`}
                            className={`${base} ${cls} ${activePerimeter} ${loupeGlow} ${numGlow}`}
                            onClick={() => jumpToSlot(i)}
                            aria-label={title}
                            title={title}
                            aria-pressed={isPressed}
                            aria-current={isPressed ? 'true' : undefined}
                          >
                            {i === 0 ? <SearchIcon className="w-4 h-4" /> : <span className="relative z-[1]">{i}</span>}
                          </button>
                        );
                      })}
                    </div>

                    {/* PC = mêmes sélecteurs que mobile : Livres / Chapitre avec thème actif */}
                    <button
                      onClick={() => setShowBookPicker(true)}
                      className={`px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm
                        ${activeTheme ? activeTheme.solid : 'bg-blue-600 text-white'}
                        ${activeTheme ? activeTheme.solidHover : 'hover:bg-blue-500'}`}
                      title={state.settings.language === 'fr' ? 'Choisir un livre' : 'Choose a book'}
                    >
                      {state.settings.language === 'fr' ? 'Livres' : 'Books'}
                    </button>

                    <button
                      onClick={() => setShowChapterPicker(true)}
                      className={`px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm inline-flex items-center gap-1
                        ${activeTheme ? activeTheme.solid : 'bg-blue-600 text-white'}
                        ${activeTheme ? activeTheme.solidHover : 'hover:bg-blue-500'}`}
                      title={state.settings.language === 'fr' ? 'Choisir un chapitre' : 'Choose a chapter'}
                    >
                      {t('chapter')} {selectedChapter}
                      <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                    </button>

                    {/* Flèches de navigation */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePrevUnit()}
                        className="p-1.5 rounded-md transition-all bg-gray-700 text-white hover:bg-gray-600"
                        title={state.settings.language === 'fr' ? 'Chapitre précédent' : 'Previous chapter'}
                      ><ChevronLeft className="w-4 h-4" /></button>

                      <button
                        onClick={() => handleNextUnit()}
                        className="p-1.5 rounded-md transition-all bg-gray-700 text-white hover:bg-gray-600"
                        title={state.settings.language === 'fr' ? 'Chapitre suivant' : 'Next chapter'}
                      ><ChevronRight className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BARRE SELECTION (desktop) */}
          {selectedVerses.length > 0 && (
            <div className="hidden md:block sticky z-40 mb-3" style={{ top: `${NAV_H + cmdH + 8}px` }}>
              <div className="bg-white/5 text-white border border-gray-700 rounded-lg shadow px-4 py-3 flex items-center justify-between">
                <div className="text-sm">
                  {state.settings.language === 'fr'
                    ? `${selectedVerses.length} verset${selectedVerses.length > 1 ? 's' : ''} sélectionné${selectedVerses.length > 1 ? 's' : ''}`
                    : `${selectedVerses.length} verse${selectedVerses.length > 1 ? 's' : ''} selected`}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={openAddToNotes}
                    className="inline-flex items-center px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                  >
                    <ListPlusIcon size={16} className="mr-2" />
                    {state.settings.language === 'fr' ? 'Vers Notes' : 'To Notes'}
                  </button>
                  <button
                    onClick={openAddToPrinciples}
                    className="inline-flex items-center px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    <ListPlusIcon size={16} className="mr-2" />
                    {state.settings.language === 'fr' ? 'Vers Principes' : 'To Principles'}
                  </button>
                  <button onClick={copySelection} className="inline-flex items-center px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-500">
                    <CopyIcon size={16} className="mr-2" />
                    {state.settings.language === 'fr' ? 'Copier' : 'Copy'}
                  </button>
                  <button onClick={shareSelection} className="inline-flex items-center px-3 py-2 rounded bg-gray-700 text-white hover:opacity-90">
                    <ShareIcon size={16} className="mr-2" />
                    {state.settings.language === 'fr' ? 'Partager' : 'Share'}
                  </button>
                  <button onClick={() => setSelectedVerses([])} className="bg-gray-700 text-white px-3 py-2 rounded hover:opacity-90">
                    {state.settings.language === 'fr' ? 'Annuler' : 'Clear'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedBook ? (
            <div
              className="bg-white/5 -mx-4 sm:mx-0 sm:rounded-xl sm:shadow-lg px-4 py-2 sm:p-6 min-h-96"
              onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{ touchAction: 'manipulation' }}
            >
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" />
                  <span className="ml-4 text-lg text-white">{t('loading')}</span>
                </div>
              ) : chapter ? (
                <div>
                  <div className="space-y-0">
                    {chapter.verses.map((v) => {
                      const isHighlighted = highlightedVerse === v.verse;
                      const isSelected = selectedVerses.includes(v.verse);
                      const selectedBg = isSelected ? 'bg-blue-900/30' : '';
                      const highlightCls = isHighlighted ? 'bg-indigo-500/20 ring-2 ring-indigo-400/80' : '';
                      return (
                        <div
                          key={v.verse}
                          id={`verse-${v.verse}`}
                          onClick={() => toggleSelectVerse(v.verse)}
                          style={{ scrollMarginTop: NAV_H + cmdH + 12 }}
                          className={`relative cursor-pointer px-1 sm:px-2 py-2 sm:py-2.5 rounded-md transition-colors ${selectedBg} ${highlightCls}`}
                        >
                          <span className="absolute right-2 top-0.5 sm:top-1 text-[11px] sm:text-xs select-none pointer-events-none text-white/80">
                            {state.settings.language === 'fr' ? 'verset' : 'verse'} {v.verse}
                            {isSelected && <Check size={14} className="inline ml-1 text-blue-300" />}
                          </span>
                          <div className="text-white" style={{ fontSize: `${state.settings.fontSize}px`, lineHeight: '1.55' }}>
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
                    {getBookName(selectedBook)} - {selectedBook.chapters} {t('chapter')}{selectedBook.chapters > 1 ? 's' : ''}
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

          {/* Pickers */}
          {showBookPicker && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/60" onClick={() => setShowBookPicker(false)} aria-hidden="true" />
              <div className="absolute inset-0 bg-gray-900 p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white"></h3>
                  <button onClick={() => setShowBookPicker(false)} className="text-white bg-gray-700 px-3 py-1 rounded">
                    {state.settings.language === 'fr' ? 'Fermer' : 'Close'}
                  </button>
                </div>

                <h4 className="text-lg font-bold uppercase tracking-wide mb-2 text-white/80">{t('oldTestament')}</h4>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-2 mb-6">
                  {oldTestamentBooks.map(book => (
                    <button key={`ot-${book.name}`} onClick={() => handleBookSelect(book)}
                      className={`w-full inline-block mb-2 break-inside-avoid px-3 py-2 rounded-lg text-lg ${
                        selectedBook?.name === book.name ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}>
                      {state.settings.language === 'fr' ? book.nameFr : book.nameEn}
                    </button>
                  ))}
                </div>

                <h4 className="text-lg font-bold uppercase tracking-wide mb-2 text-white/80">{t('newTestament')}</h4>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-2 pb-10">
                  {newTestamentBooks.map(book => (
                    <button key={`nt-${book.name}`} onClick={() => handleBookSelect(book)}
                      className={`w-full inline-block mb-2 break-inside-avoid px-3 py-2 rounded-lg text-lg ${
                        selectedBook?.name === book.name ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}>
                      {state.settings.language === 'fr' ? book.nameFr : book.nameEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showChapterPicker && selectedBook && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/60" onClick={() => setShowChapterPicker(false)} aria-hidden="true" />
              <div className="absolute inset-0 bg-gray-900 p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{state.settings.language === 'fr' ? 'Choisir un chapitre' : 'Choose a chapter'}</h3>
                  <button onClick={() => setShowChapterPicker(false)} className="text-white bg-gray-700 px-3 py-1 rounded">
                    {state.settings.language === 'fr' ? 'Fermer' : 'Close'}
                  </button>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 pb-10">
                  {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((num) => {
                    const active = num === selectedChapter ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700';
                    return (
                      <button key={`chap-${num}`} onClick={() => { handleChapterSelect(num); setShowChapterPicker(false); }}
                        className={`h-10 rounded-lg text-lg font-medium ${active}`} aria-current={num === selectedChapter ? 'page' : undefined}>
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* BARRE SELECTION (mobile) */}
          {selectedVerses.length > 0 && (
            <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
              <div className="bg-white/5 text-white shadow-lg rounded-full px-3 py-2 flex items-center space-x-2">
                <button onClick={openAddToNotes} className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-600 text-white">
                  <ListPlusIcon size={16} className="mr-1" />
                  {state.settings.language === 'fr' ? 'Notes' : 'Notes'}
                </button>
                <button onClick={openAddToPrinciples} className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-600 text-white">
                  <ListPlusIcon size={16} className="mr-1" />
                  {state.settings.language === 'fr' ? 'Principes' : 'Principles'}
                </button>
                <button onClick={copySelection} className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-600 text-white">
                  <CopyIcon size={16} className="mr-1" />
                  {state.settings.language === 'fr' ? 'Copier' : 'Copy'}
                </button>
                <button onClick={shareSelection} className="bg-gray-700 text-white px-3 py-1.5 rounded-full inline-flex items-center">
                  <ShareIcon size={16} className="mr-1" />
                  {state.settings.language === 'fr' ? 'Partager' : 'Share'}
                </button>
                <button onClick={() => setSelectedVerses([])} className="bg-gray-700 text-white px-3 py-1.5 rounded-full">
                  {state.settings.language === 'fr' ? 'Annuler' : 'Clear'}
                </button>
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
                <h3 className="text-lg font-semibold mb-2">
                  {state.settings.language === 'fr' ? 'Ajouter à une liste (Notes)' : 'Add to a list (Notes)'}
                </h3>
                <form onSubmit={confirmAddToNotes}>
                  <div className="max-h-64 overflow-y-auto mt-2 space-y-1">
                    {notesListsForModal.length === 0 ? (
                      <p className="text-sm text-white/70">
                        {state.settings.language === 'fr'
                          ? 'Aucune liste pour l’instant. Créez-en une ci-dessous.'
                          : 'No list yet. Create one below.'}
                      </p>
                    ) : (
                      notesListsForModal.map((l) => (
                        <label
                          key={l.id}
                          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="notesList"
                            className="accent-emerald-500"
                            value={l.id}
                            checked={selectedNotesListId === l.id}
                            onChange={() => setSelectedNotesListId(l.id)}
                          />
                          <span className="text-sm truncate">{l.title || '(sans titre)'}</span>
                        </label>
                      ))
                    )}
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm mb-1">
                      {state.settings.language === 'fr'
                        ? 'Nouvelle liste (optionnel)'
                        : 'New list (optional)'}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-gray-800 border border-gray-600 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={newNotesListTitle}
                      onChange={(e) => setNewNotesListTitle(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddToNotes(false)}
                      className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                    >
                      {state.settings.language === 'fr' ? 'Annuler' : 'Cancel'}
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
                <h3 className="text-lg font-semibold mb-2">
                  {state.settings.language === 'fr'
                    ? 'Ajouter à une étude (Principes)'
                    : 'Add to a study (Principles)'}
                </h3>
                <form onSubmit={confirmAddToPrinciples}>
                  <div className="max-h-64 overflow-y-auto mt-2 space-y-1">
                    {principlesListsForModal.length === 0 ? (
                      <p className="text-sm text-white/70">
                        {state.settings.language === 'fr'
                          ? 'Aucune étude pour l’instant. Créez-en une ci-dessous.'
                          : 'No study yet. Create one below.'}
                      </p>
                    ) : (
                      principlesListsForModal.map((l) => (
                        <label
                          key={l.id}
                          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="principleList"
                            className="accent-indigo-400"
                            value={l.id}
                            checked={selectedPrincipleListId === l.id}
                            onChange={() => setSelectedPrincipleListId(l.id)}
                          />
                          <span className="text-sm truncate">{l.title || '(sans titre)'}</span>
                        </label>
                      ))
                    )}
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm mb-1">
                      {state.settings.language === 'fr'
                        ? 'Nouvelle étude (optionnel)'
                        : 'New study (optional)'}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md bg-gray-800 border border-gray-600 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={newPrincipleListTitle}
                      onChange={(e) => setNewPrincipleListTitle(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddToPrinciples(false)}
                      className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                    >
                      {state.settings.language === 'fr' ? 'Annuler' : 'Cancel'}
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

          {/* TOASTS */}
          {copiedKey === 'selection' && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 rounded text-sm shadow bg-green-600 text-white z-50">
              {state.settings.language === 'fr' ? 'Sélection copiée' : 'Selection copied'}
            </div>
          )}
          {copiedKey === 'shared-fallback' && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 rounded text-sm shadow bg-blue-600 text-white z-50">
            {state.settings.language === 'fr' ? 'Texte prêt à partager (copié)' : 'Text ready to share (copied)'}
            </div>
          )}
          {copiedKey === 'added-to-list' && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 rounded text-sm shadow bg-emerald-600 text-white z-50">
              {state.settings.language === 'fr' ? 'Ajouté à la liste' : 'Added to list'}
            </div>
          )}

          {false && showBottomRandom && (
            <div className="fixed bottom-4 right-4 z-40 sm:right-6 sm:bottom-6">
              <button onClick={pickNewRandom} className="px-3 py-2 rounded-full shadow-lg bg-indigo-600 text-white text-sm active:scale-95">
                {state.settings.language === 'fr' ? 'Nouveau aléatoire' : 'New random'}
              </button>
            </div>
          )}

          {showSwipeHint && (
            <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
              <div className="w-1/2 max-w-xs text-center px-4 py-3 rounded-2xl text-base font-bold shadow-2xl ring-2 ring-blue-200 bg-blue-600/95 text-white flex items-center justify-center">
                <span className="opacity-90 mr-2">◀</span>
                {state.settings.language === 'fr' ? 'Glissez' : 'Swipe'}
                <span className="opacity-90 ml-2">▶</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

