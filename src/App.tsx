import React, { useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Reading from './pages/Reading';
import Search from './pages/Search';
import Settings from './pages/Settings';
import About from './pages/About';
import Notes from './pages/Notes';
import Principes from './pages/Principes';
import { warmBibleCache, pauseWarmup, resumeWarmup } from './services/bibleService';

function AppContent() {
  const { state } = useApp();

  useEffect(() => {
    warmBibleCache(state.settings.language, {
      batchSize: 6,
      maxBooks: 66,
      presearchDelayMs: 3000,
      presearchMaxTerms: 3,
    });
    const other = state.settings.language === 'fr' ? 'en' : 'fr';
    warmBibleCache(other, {
      batchSize: 6,
      maxBooks: 66,
      presearchDelayMs: 5000,
      presearchMaxTerms: 2,
    });
  }, [state.settings.language]);

  useEffect(() => {
    if (state.currentPage === 'home') resumeWarmup();
    else pauseWarmup();
  }, [state.currentPage]);

  useEffect(() => {
    const { language } = state.settings;
    const titles = {
      fr: {
        home: 'The Word – Verset aléatoire',
        reading: 'Lecture',
        search: 'Recherche biblique',
        settings: 'Réglages',
        about: 'À propos',
        notes: 'Notes',
        principes: 'Principes fondamentaux',
        fallback: 'TheWord.fr',
      },
      en: {
        home: 'The Word – Random verse',
        reading: 'Reading',
        search: 'Bible Search',
        settings: 'Settings',
        about: 'About',
        notes: 'Notes',
        principes: 'Core Studies',
        fallback: 'TheWord.fr',
      },
    } as const;

    const dict = language === 'fr' ? titles.fr : titles.en;
    const pageKey = (state.currentPage as keyof typeof dict) || 'fallback';
    document.title = dict[pageKey] ?? dict.fallback;

    document.documentElement.setAttribute('lang', language);
  }, [state.currentPage, state.settings.language]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {}
    }
  }, []);

  // ✅ IMPORTANT : on ne force PAS scrollTop quand on revient sur Search
  useEffect(() => {
    if (state.currentPage === 'search') return;

    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0 });
    });
    return () => cancelAnimationFrame(raf);
  }, [state.currentPage]);

  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'home':
        return <Home />;
      case 'reading':
        return <Reading />;
      case 'search':
        return <Search />;
      case 'settings':
        return <Settings />;
      case 'about':
        return <About />;
      case 'notes':
        return <Notes />;
      case 'principes':
        return <Principes />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gray-900">
      <Navigation />
      <main>{renderCurrentPage()}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

