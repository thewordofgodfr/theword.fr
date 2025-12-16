// src/contexts/AppContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';
import { AppSettings, Language, Theme } from '../types/bible';

/** Pages supportées dans l’app */
type Page =
  | 'home'
  | 'reading'
  | 'settings'
  | 'about'
  | 'search'
  | 'notes'
  | 'principes';

interface ReadingContext {
  book: string;
  chapter: number;
  verse?: number;
}

interface AppState {
  settings: AppSettings;
  currentPage: Page;
  readingContext?: ReadingContext;
}

type AppAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_FONT_SIZE'; payload: number }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_PAGE'; payload: Page }
  | { type: 'LOAD_SETTINGS'; payload: AppSettings }
  | { type: 'SET_READING_CONTEXT'; payload: ReadingContext }
  | {
      type: 'SAVE_READING_POSITION';
      payload: { book: string; chapter: number };
    };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  updateSettings: (settings: Partial<AppSettings>) => void;
  navigateToVerse: (book: string, chapter: number, verse?: number) => void;
  saveReadingPosition: (book: string, chapter: number) => void;
  setPage: (page: Page) => void;
}

const STORAGE_KEYS = {
  settings: 'bibleApp_settings',
  language: 'bibleApp_language',
} as const;

const FIRST_RUN_KEY = 'tw_firstRun_v2';

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Association entre les pages internes et le hash dans l’URL.
 * Cela permet d’avoir des liens du type :
 *  - #home
 *  - #reading
 *  - #search
 *  - #notes
 *  - #principes
 *  - #settings
 *  - #about
 */
const PAGE_HASH_MAP: Record<Page, string> = {
  home: '#home',
  reading: '#reading',
  search: '#search',
  settings: '#settings',
  about: '#about',
  notes: '#notes',
  principes: '#principes',
};

const HASH_PAGE_MAP: Record<string, Page> = {
  '#home': 'home',
  '#reading': 'reading',
  '#search': 'search',
  '#settings': 'settings',
  '#about': 'about',
  '#notes': 'notes',
  '#principes': 'principes',
};

const getInitialPageFromHash = (): Page => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash;
  return HASH_PAGE_MAP[hash] || 'home';
};

/**
 * Détermine la langue par défaut
 * 1. Si localStorage contient déjà une langue → on la réutilise.
 * 2. Sinon, on regarde navigator.language et on mappe vers les 18 langues supportées :
 *    fr, en, ru, es, ar, de, hi, id, it, ja, ko, pt, sw, tr, yo, zh, he, el
 * 3. Si aucune correspondance → 'en'
 */
const getInitialLanguage = (): Language => {
  // 1) Langue déjà sauvegardée
  try {
    const savedLanguage =
      (typeof localStorage !== 'undefined'
        ? localStorage.getItem(STORAGE_KEYS.language)
        : null) as Language | null;
    if (savedLanguage) return savedLanguage;
  } catch {
    /* ignore */
  }

  // 2) Mapper navigator.language -> langue app
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language?.toLowerCase() || '';
    const base = browserLang.split('-')[0]; // "pt" pour "pt-BR", "fr" pour "fr-FR", etc.

    const browserToAppLangMap: Record<string, Language> = {
      fr: 'fr',
      en: 'en',
      es: 'es',
      ru: 'ru',
      ar: 'ar',
      de: 'de',
      hi: 'hi',
      id: 'id',
      it: 'it',
      ja: 'ja',
      ko: 'ko',
      pt: 'pt',
      sw: 'sw',
      tr: 'tr',
      yo: 'yo',
      zh: 'zh',
      he: 'he',
      iw: 'he', // ancien code pour hébreu dans certains navigateurs
      el: 'el',
      gr: 'el', // au cas où un navigateur renverrait "gr"
    };

    const mapped = browserToAppLangMap[base];
    if (mapped) return mapped;
  }

  // 3) Fallback : anglais
  return 'en';
};

/** Normalise la taille de police et impose [18..42], défaut = 25 */
function normalizeFontSize(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return 25;
  if (n < 18 || n > 42) return 25;
  return n;
}

const initialState: AppState = {
  settings: {
    theme: 'dark',
    fontSize: 25,
    language: getInitialLanguage(),
  },
  currentPage: getInitialPageFromHash(),
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, settings: { ...state.settings, theme: action.payload } };
    case 'SET_FONT_SIZE':
      return {
        ...state,
        settings: { ...state.settings, fontSize: action.payload },
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        settings: { ...state.settings, language: action.payload },
      };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'LOAD_SETTINGS':
      return { ...state, settings: action.payload };
    case 'SET_READING_CONTEXT':
      return { ...state, readingContext: action.payload };
    case 'SAVE_READING_POSITION':
      return {
        ...state,
        settings: {
          ...state.settings,
          // cast pour ne pas dépendre ici du détail exact d'AppSettings
          lastReadingPosition: {
            book: action.payload.book,
            chapter: action.payload.chapter,
            timestamp: Date.now(),
          },
        } as any,
      };
    default:
      return state;
  }
}

/** Crée/retourne une balise <meta name="..."> au besoin */
function ensureMeta(name: string, defaultContent = ''): HTMLMetaElement | null {
  if (typeof document === 'undefined') return null;
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    if (defaultContent) el.setAttribute('content', defaultContent);
    document.head.appendChild(el);
  }
  return el;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Charger les paramètres depuis localStorage au démarrage
  useEffect(() => {
    try {
      const saved =
        typeof localStorage !== 'undefined'
          ? localStorage.getItem(STORAGE_KEYS.settings)
          : null;

      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppSettings>;

        // Option A: on force sombre, même si un ancien storage contient "light"
        const forcedTheme: Theme = 'dark';

        const merged: AppSettings = {
          ...initialState.settings,
          ...parsed,
          theme: forcedTheme,
          fontSize: normalizeFontSize((parsed as any)?.fontSize),
        };

        dispatch({ type: 'LOAD_SETTINGS', payload: merged });

        // Réécrire si fontSize invalide OU si theme n'était pas dark
        const parsedTheme = (parsed as any)?.theme;
        const shouldRewrite =
          !parsed.fontSize ||
          normalizeFontSize(parsed.fontSize as any) !== parsed.fontSize ||
          (parsedTheme && parsedTheme !== 'dark');

        if (shouldRewrite) {
          try {
            localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(merged));
          } catch {
            /* ignore */
          }
        }
      } else {
        try {
          if (!localStorage.getItem(FIRST_RUN_KEY)) {
            localStorage.setItem(FIRST_RUN_KEY, '1');
          }
        } catch {
          /* ignore */
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persister les paramètres quand ils changent
  useEffect(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        // Option A: toujours sombre dans le storage
        const toSave: AppSettings = { ...state.settings, theme: 'dark' } as AppSettings;
        localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(toSave));
        localStorage.setItem(STORAGE_KEYS.language, state.settings.language);
      }
    } catch {
      /* ignore */
    }
  }, [state.settings]);

  // Appliquer le thème (classe HTML, meta theme-color, etc.) — Option A: dark-only strict
  useEffect(() => {
    try {
      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      const root = document.documentElement;

      const useDarkSkin = true; // <- DARK-ONLY STRICT

      root.classList.toggle('dark', useDarkSkin);
      root.classList.toggle('theme-dark-blue', useDarkSkin);
      root.setAttribute('data-theme', 'dark');

      const metaTheme = ensureMeta('theme-color');
      const metaColorScheme = ensureMeta('color-scheme');
      const metaSupportedSchemes = ensureMeta('supported-color-schemes');

      (root.style as any).colorScheme = 'dark';
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#ffffff';
      if (metaTheme) metaTheme.content = '#0f172a';
      if (metaColorScheme) metaColorScheme.content = 'dark';
      if (metaSupportedSchemes) metaSupportedSchemes.content = 'dark';
    } catch {
      /* ignore */
    }
  }, []); // <- plus besoin de dépendre d’un "theme"

  // Synchroniser la page avec le hash de l’URL (liens externes, bouton retour, etc.)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Si on arrive sans hash, on force #home pour avoir une URL explicite
    if (!window.location.hash) {
      const initialPage = getInitialPageFromHash();
      const initialHash = PAGE_HASH_MAP[initialPage] || '#home';
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search + initialHash
      );
    }

    const handleHashChange = () => {
      const newPage = getInitialPageFromHash();
      dispatch({ type: 'SET_PAGE', payload: newPage });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Mettre à jour le hash quand la page change (clic sur le menu, navigation interne, etc.)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targetHash = PAGE_HASH_MAP[state.currentPage] || '#home';
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  }, [state.currentPage]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    Object.entries(newSettings).forEach(([key, value]) => {
      switch (key) {
        case 'theme':
          // Option A: on ignore toute tentative de changer le thème
          dispatch({ type: 'SET_THEME', payload: 'dark' as Theme });
          break;
        case 'fontSize':
          dispatch({ type: 'SET_FONT_SIZE', payload: normalizeFontSize(value) });
          break;
        case 'language':
          dispatch({ type: 'SET_LANGUAGE', payload: value as Language });
          break;
        default:
          break;
      }
    });
  };

  const setPage = (page: Page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const navigateToVerse = (book: string, chapter: number, verse?: number) => {
    dispatch({ type: 'SET_READING_CONTEXT', payload: { book, chapter, verse } });
    dispatch({ type: 'SET_PAGE', payload: 'reading' });
  };

  const saveReadingPosition = (book: string, chapter: number) => {
    dispatch({ type: 'SAVE_READING_POSITION', payload: { book, chapter } });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        updateSettings,
        navigateToVerse,
        saveReadingPosition,
        setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
