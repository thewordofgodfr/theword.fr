// src/pages/home.tsx
import React, { useState, useEffect } from 'react';
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

  return (
    <div className={`min-h-[100dvh] flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`}>
      <header className={`border-b ${surface}`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-6xl mx-auto h-16 px-5 flex items-center gap-3">
          <img src="/logo192.png" alt="" width={36} height={36} className="rounded-lg shrink-0" />
          <span className="text-xl font-bold tracking-tight">The Word</span>
        </div>
      </header>

      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8 flex-1">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{t('homeWelcome')}</h1>
          <p className={isDark ? 'text-blue-100/80' : 'text-gray-600'}>{t('homeIntro')}</p>
        </div>

        <nav aria-label={t('home')} className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
          {sections.map(({ page, icon: Icon, label }) => (
            <button
              key={page}
              type="button"
              onClick={() => dispatch({ type: 'SET_PAGE', payload: page })}
              className={`flex flex-col items-center justify-center gap-3 min-h-[106px] md:min-h-[122px] p-4 rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${surface} ${isDark ? 'hover:bg-gray-700 hover:border-blue-500' : 'hover:bg-blue-50 hover:border-blue-500'}`}
            >
              <Icon size={34} strokeWidth={1.7} className={isDark ? 'text-blue-400' : 'text-blue-600'} aria-hidden="true" />
              <span className="font-semibold text-sm md:text-base">{label}</span>
            </button>
          ))}
        </nav>

        <div className={isMobileDevice ? '' : 'lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-5'}>
          {!isMobileDevice && (
            <aside className={`hidden lg:flex flex-col items-center justify-center gap-3 p-5 rounded-xl border text-center ${surface}`} aria-label={t('androidApp')}>
              <h2 className="font-semibold">{t('androidApp')}</h2>
              <a href={androidUrl} target="_blank" rel="noopener noreferrer" aria-label={t('openGooglePlay')} className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <img src="/android-app-qr.svg" alt={t('scanAndroidQr')} width={140} height={140} className="rounded-lg" style={{ backgroundColor: '#fff' }} />
              </a>
              <p className={`text-xs ${isDark ? 'text-blue-100/80' : 'text-gray-600'}`}>{t('scanAndroidQr')}</p>
              <a href={androidUrl} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <Download size={17} aria-hidden="true" />
                Google Play
              </a>
            </aside>
          )}

          <section className={`rounded-xl border p-5 md:p-7 flex flex-col justify-center ${surface}`} aria-label={t('randomVerse')}>
            <h2 className={`text-xs font-medium uppercase tracking-widest mb-4 ${isDark ? 'text-blue-100/70' : 'text-gray-500'}`}>{t('randomVerse')}</h2>
            {loading ? (
              <div className="flex justify-center items-center gap-3 py-8" role="status">
                <RefreshCw className="animate-spin text-blue-400" size={24} aria-hidden="true" />
                <span>{t('loading')}</span>
              </div>
            ) : verse ? (
              <button type="button" onClick={handleVerseClick} className="w-full text-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group">
                <blockquote className={`italic leading-relaxed mb-3 transition-colors ${isDark ? 'group-hover:text-blue-300' : 'group-hover:text-blue-600'}`} style={{ fontSize: `${state.settings.fontSize}px`, lineHeight: '1.65' }}>
                  “{verse.text}”
                </blockquote>
                <span className={`block font-medium text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{verse.reference}</span>
              </button>
            ) : (
              <p className="text-center py-8">{t('error')}</p>
            )}
            <div className="flex justify-center mt-5">
              <button type="button" onClick={fetchRandomVerse} disabled={loading} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
                {t('newVerse')}
              </button>
            </div>
          </section>
        </div>

        <div className="text-center mt-7">
          <button type="button" onClick={openJeremiah23} aria-label={t('openJeremiah')} title={t('openJeremiah')} className="italic text-sm md:text-base hover:underline rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            {t('jeremiah23Quote')}
          </button>
        </div>
      </div>
      <footer className="text-center text-xs text-white/60 py-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}>
        Copyright {year}
      </footer>
    </div>
  );
}

