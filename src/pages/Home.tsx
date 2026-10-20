// src/pages/home.tsx
import { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { getRandomVerse, warmBibleCache } from '../services/bibleService';
import { BibleVerse } from '../types/bible';
import { RefreshCw, BookOpen, Search, List, BookMarked, Settings, Info, Download } from 'lucide-react';
import { saveSlot as saveQuickSlot } from '../services/readingSlots';

const STORAGE_KEY = 'home_random_verse';
const STORAGE_LANG_KEY = 'home_random_verse_lang';

export default function Home() {
  const { state, dispatch, navigateToVerse } = useApp();
  const { t } = useTranslation();
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const verseButtonRef = useRef<HTMLButtonElement>(null);
  const verseTextRef = useRef<HTMLQuoteElement>(null);
  const verseReferenceRef = useRef<HTMLSpanElement>(null);
  const [verseLines, setVerseLines] = useState(3);

  const isDark = state.settings.theme === 'dark';
  const lang = state.settings.language;

  // ✅ Copyright auto
  const year = new Date().getFullYear();

  const saveVerseToSession = (v: BibleVerse, l: string) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(v));
      sessionStorage.setItem(STORAGE_LANG_KEY, l);
    } catch {}
  };

  const loadVerseFromSessionForLang = (l: string): BibleVerse | null => {
    try {
      const savedLang = sessionStorage.getItem(STORAGE_LANG_KEY);
      if (savedLang !== l) return null;
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as BibleVerse;
    } catch {
      return null;
    }
  };

  const fetchRandomVerse = async () => {
    setLoading(true);
    try {
      const randomVerse = await getRandomVerse(lang);
      setVerse(randomVerse);
      saveVerseToSession(randomVerse, lang);
    } catch (error) {
      console.error('Error fetching verse:', error);
      setVerse(null);
    } finally {
      setLoading(false);
    }
  };

  // Ouvrir le verset aléatoire en Lecture + enregistrer dans la loupe (slot 0)
  const handleVerseClick = () => {
    if (!verse) return;
    try {
      saveQuickSlot(0, { book: verse.book, chapter: verse.chapter, verse: verse.verse });
    } catch {}
    navigateToVerse(verse.book, verse.chapter, verse.verse);
  };

  // Au montage ET à chaque changement de langue :
  useEffect(() => {
    warmBibleCache(lang);

    const saved = loadVerseFromSessionForLang(lang);
    if (saved) {
      setVerse(saved);
      setLoading(false);
    } else {
      fetchRandomVerse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Clic sur la citation fixe -> ouvrir Jérémie 23:29 en surbrillance bleue
  const openJeremiah23 = () => {
    try {
      saveQuickSlot(0, { book: 'Jeremiah', chapter: 23, verse: 29 });
    } catch {}
    navigateToVerse('Jeremiah', 23, 29);
  };

  const sections = [
    { page: 'reading', icon: BookOpen, label: t('reading') },
    { page: 'search', icon: Search, label: t('search') },
    { page: 'notes', icon: List, label: t('notes') },
    { page: 'principes', icon: BookMarked, label: t('principles') },
    { page: 'settings', icon: Settings, label: t('settings') },
    { page: 'about', icon: Info, label: t('about') },
  ] as const;
  const androidUrl = 'https://play.google.com/store/apps/details?id=fr.theword.www.twa';
  const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const surface = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';


  // Adapter l’aperçu au véritable espace restant, même avec les barres
  // du navigateur Android. Le verset intégral reste accessible en Lecture.
  useEffect(() => {
    const button = verseButtonRef.current;
    const text = verseTextRef.current;
    if (!button || !text) return;
    const fit = () => {
      const lineHeight = parseFloat(getComputedStyle(text).lineHeight) || 24;
      const referenceHeight = verseReferenceRef.current?.offsetHeight || 20;
      setVerseLines(Math.max(1, Math.floor((button.clientHeight - referenceHeight - 8) / lineHeight)));
    };
    fit();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(fit);
    observer?.observe(button);
    window.addEventListener('resize', fit);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [verse?.text, loading]);

  return (
    <div className={`home-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`}>
      <div className="home-layout">
        <h1 className="home-brand">
          <img src="/logo192.png" alt="" width={34} height={34} className="rounded-lg shrink-0" />
          <span>The Word</span>
        </h1>

        <nav aria-label={t('home')} className="home-sections">
          {sections.map(({ page, icon: Icon, label }) => (
            <button
              key={page}
              type="button"
              onClick={() => dispatch({ type: 'SET_PAGE', payload: page })}
              className={`home-section rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${surface} ${isDark ? 'hover:bg-gray-700 hover:border-blue-500' : 'hover:bg-blue-50 hover:border-blue-500'}`}
            >
              <Icon size={26} strokeWidth={1.7} className={isDark ? 'text-blue-400' : 'text-blue-600'} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className={`home-feature ${!isMobileDevice ? 'home-feature-desktop' : ''}`}>
          {!isMobileDevice && (
            <aside className={`home-install rounded-xl border text-center ${surface}`} aria-label={t('androidApp')}>
              <h2 className="text-sm font-semibold">{t('androidApp')}</h2>
              <a href={androidUrl} target="_blank" rel="noopener noreferrer" aria-label={t('openGooglePlay')} className="home-qr-link rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <img src="/android-app-qr.svg" alt={t('scanAndroidQr')} width={104} height={104} className="home-qr rounded-lg" style={{ backgroundColor: '#fff' }} />
              </a>
              <a href={androidUrl} target="_blank" rel="noopener noreferrer" className="home-play-link inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <Download size={15} aria-hidden="true" />
                Google Play
              </a>
            </aside>
          )}

          <section className={`home-verse rounded-xl border ${surface}`} aria-label={t('randomVerse')}>
            <h2 className={`home-verse-heading font-medium uppercase tracking-widest ${isDark ? 'text-blue-100/70' : 'text-gray-500'}`}>{t('randomVerse')}</h2>
            {loading ? (
              <div className="home-verse-loading" role="status">
                <RefreshCw className="animate-spin text-blue-400" size={22} aria-hidden="true" />
                <span>{t('loading')}</span>
              </div>
            ) : verse ? (
              <button
                ref={verseButtonRef}
                type="button"
                onClick={handleVerseClick}
                title={verse.text}
                aria-label={`${verse.text} — ${verse.reference}. ${t('searchOpenInReading')}`}
                className="home-verse-open rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group"
              >
                <blockquote ref={verseTextRef} className={`home-verse-text italic transition-colors ${isDark ? 'group-hover:text-blue-300' : 'group-hover:text-blue-600'}`} style={{ WebkitLineClamp: verseLines }}>
                  “{verse.text}”
                </blockquote>
                <span ref={verseReferenceRef} className={`home-verse-reference font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{verse.reference}</span>
              </button>
            ) : (
              <p className="home-verse-loading">{t('error')}</p>
            )}
            <div className="home-verse-action">
              <button type="button" onClick={fetchRandomVerse} disabled={loading} className="inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <RefreshCw size={17} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
                {t('newVerse')}
              </button>
            </div>
          </section>
        </div>

        <div className="home-fixed-quote">
          <button type="button" onClick={openJeremiah23} aria-label={t('openJeremiah')} title={t('openJeremiah')} className="italic hover:underline rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            {t('jeremiah23Quote')}
          </button>
        </div>
      </div>
      <footer className="home-copyright text-white/60">Copyright {year}</footer>
    </div>
  );
}
