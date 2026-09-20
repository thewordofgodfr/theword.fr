// src/pages/Settings.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { Check, Globe, Palette, RefreshCcw, Search, X } from 'lucide-react';
import type { Language } from '../types/bible';

/** Codes de drapeaux supportés */
type FlagCode =
  | 'fr'
  | 'us'
  | 'de'
  | 'it'
  | 'es'
  | 'pt'
  | 'ru'
  | 'hi'
  | 'zh'
  | 'ar'
  | 'id'
  | 'sw'
  | 'tr'
  | 'ja'
  | 'ko'
  | 'yo'
  | 'he'
  | 'el';

/** Petit composant Flag inline SVG pour compatibilité desktop/mobile */
const FlagIcon: React.FC<{ code: FlagCode; size?: number; className?: string }> = ({
  code,
  size = 26,
  className = '',
}) => {
  const style: React.CSSProperties = { width: size * (4 / 3), height: size };

  if (code === 'fr') {
    // Drapeau France (bleu/blanc/rouge)
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="France" role="img">
          <rect width="1" height="2" x="0" fill="#0055A4" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#EF4135" />
        </svg>
      </span>
    );
  }

  if (code === 'us') {
    // Drapeau USA (stripes + canton simplifié)
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg
          viewBox="0 0 19 10"
          width="100%"
          height="100%"
          aria-label="United States"
          role="img"
        >
          {/* Stripes */}
          {Array.from({ length: 13 }).map((_, i) => (
            <rect
              key={i}
              x="0"
              y={(i * 10) / 13}
              width="19"
              height={10 / 13}
              fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
            />
          ))}
          {/* Canton */}
          <rect x="0" y="0" width="7.6" height={(7 / 13) * 10} fill="#3C3B6E" />
          {/* Étoiles simplifiées (points) */}
          {Array.from({ length: 9 }).map((_, row) =>
            Array.from({ length: row % 2 === 0 ? 6 : 5 }).map((__, col) => {
              const cols = row % 2 === 0 ? 6 : 5;
              const cx = 0.6 + (col + 1) * (7.6 / (cols + 1));
              const cy = 0.5 + (row + 1) * ((7 / 13) * 10 / 10);
              return <circle key={`${row}-${col}`} cx={cx} cy={cy} r="0.15" fill="#FFFFFF" />;
            })
          )}
        </svg>
      </span>
    );
  }

  if (code === 'de') {
    // Allemagne : noir / rouge / or
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Germany" role="img">
          <rect width="3" height="0.6667" y="0" fill="#000000" />
          <rect width="3" height="0.6667" y="0.6667" fill="#DD0000" />
          <rect width="3" height="0.6667" y="1.3333" fill="#FFCE00" />
        </svg>
      </span>
    );
  }

  if (code === 'it') {
    // Italie : vert / blanc / rouge
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Italy" role="img">
          <rect width="1" height="2" x="0" fill="#009246" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#CE2B37" />
        </svg>
      </span>
    );
  }

  if (code === 'es') {
    // Espagne : rouge / jaune / rouge
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Spain" role="img">
          <rect width="3" height="2" fill="#AA151B" />
          <rect width="3" height="1" y="0.5" fill="#F1BF00" />
        </svg>
      </span>
    );
  }

  if (code === 'pt') {
    // Portugal approximatif : vert / rouge
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Portugal" role="img">
          <rect width="1.2" height="2" x="0" fill="#006600" />
          <rect width="1.8" height="2" x="1.2" fill="#FF0000" />
        </svg>
      </span>
    );
  }

  if (code === 'ru') {
    // Russie : blanc / bleu / rouge
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Russia" role="img">
          <rect width="3" height="0.6667" y="0" fill="#FFFFFF" />
          <rect width="3" height="0.6667" y="0.6667" fill="#0039A6" />
          <rect width="3" height="0.6667" y="1.3333" fill="#D52B1E" />
        </svg>
      </span>
    );
  }

  if (code === 'hi') {
    // Inde simplifiée : safran / blanc / vert + disque bleu
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="India" role="img">
          <rect width="3" height="0.6667" y="0" fill="#FF9933" />
          <rect width="3" height="0.6667" y="0.6667" fill="#FFFFFF" />
          <rect width="3" height="0.6667" y="1.3333" fill="#138808" />
          <circle cx="1.5" cy="1" r="0.3" fill="#000080" />
        </svg>
      </span>
    );
  }

  if (code === 'zh') {
    // Chine simplifiée : fond rouge + étoile
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="China" role="img">
          <rect width="3" height="2" fill="#DE2910" />
          <circle cx="0.7" cy="0.7" r="0.3" fill="#FFDE00" />
        </svg>
      </span>
    );
  }

  if (code === 'ar') {
    // Arabe générique : fond vert
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Arabic" role="img">
          <rect width="3" height="2" fill="#007A3D" />
        </svg>
      </span>
    );
  }

  if (code === 'id') {
    // Indonésie : rouge / blanc
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Indonesia" role="img">
          <rect width="3" height="1" y="0" fill="#CE1126" />
          <rect width="3" height="1" y="1" fill="#FFFFFF" />
        </svg>
      </span>
    );
  }

  if (code === 'sw') {
    // Swahili (style générique vert/jaune)
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Swahili" role="img">
          <rect width="3" height="2" fill="#1EB53A" />
          <rect width="3" height="0.4" y="0.8" fill="#FCD116" />
        </svg>
      </span>
    );
  }

  if (code === 'tr') {
    // Turquie : rouge + croissant/étoile simplifiés
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Turkey" role="img">
          <rect width="3" height="2" fill="#E30A17" />
          <circle cx="1.1" cy="1" r="0.45" fill="#FFFFFF" />
          <circle cx="1.2" cy="1" r="0.35" fill="#E30A17" />
          <polygon
            points="1.6,1 1.8,0.85 1.75,1.1 1.9,1.25 1.7,1.25 1.6,1.45 1.5,1.25 1.3,1.25 1.45,1.1 1.4,0.85"
            fill="#FFFFFF"
          />
        </svg>
      </span>
    );
  }

  if (code === 'ja') {
    // Japon : fond blanc + disque rouge
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Japan" role="img">
          <rect width="3" height="2" fill="#FFFFFF" />
          <circle cx="1.5" cy="1" r="0.5" fill="#BC002D" />
        </svg>
      </span>
    );
  }

  if (code === 'ko') {
    // Corée du Sud simplifiée
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Korea" role="img">
          <rect width="3" height="2" fill="#FFFFFF" />
          <circle cx="1.5" cy="1" r="0.45" fill="#003478" />
          <path d="M1.05 0.9a0.45 0.45 0 0 1 0.9 0" fill="#C60C30" />
        </svg>
      </span>
    );
  }

  if (code === 'yo') {
    // Yoruba -> drapeau type Nigéria (vert / blanc / vert)
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Yoruba" role="img">
          <rect width="1" height="2" x="0" fill="#008753" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#008753" />
        </svg>
      </span>
    );
  }

  if (code === 'he') {
    // Hébreu / Israël : bandes bleues + étoile de David simplifiée
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Hebrew" role="img">
          <rect width="3" height="2" fill="#FFFFFF" />
          <rect width="3" height="0.25" y="0" fill="#0038B8" />
          <rect width="3" height="0.25" y="1.75" fill="#0038B8" />
          {/* étoile de David simplifiée */}
          <polygon points="1.5,0.6 1.35,0.9 1.65,0.9" fill="#0038B8" />
          <polygon points="1.5,1.4 1.35,1.1 1.65,1.1" fill="#0038B8" />
          <polygon
            points="1.3,0.8 1.7,0.8 1.5,1.2"
            fill="none"
            stroke="#0038B8"
            strokeWidth="0.05"
          />
        </svg>
      </span>
    );
  }

  if (code === 'el') {
    // Grèce simplifiée : bleu / blanc + croix
    return (
      <span className={`inline-block ${className}`} style={style}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="Greece" role="img">
          <rect width="3" height="2" fill="#0D5EAF" />
          {/* bandes blanches simplifiées */}
          <rect width="3" height="0.2" y="0.3" fill="#FFFFFF" />
          <rect width="3" height="0.2" y="0.7" fill="#FFFFFF" />
          <rect width="3" height="0.2" y="1.1" fill="#FFFFFF" />
          <rect width="3" height="0.2" y="1.5" fill="#FFFFFF" />
          {/* canton avec croix */}
          <rect width="1.2" height="1.2" x="0" y="0" fill="#0D5EAF" />
          <rect width="0.3" height="1.2" x="0.45" y="0" fill="#FFFFFF" />
          <rect width="1.2" height="0.3" x="0" y="0.45" fill="#FFFFFF" />
        </svg>
      </span>
    );
  }

  // Fallback gris (ne devrait pas arriver)
  return (
    <span className={`inline-block ${className}`} style={style}>
      <svg viewBox="0 0 3 2" width="100%" height="100%">
        <rect width="3" height="2" fill="#999999" />
      </svg>
    </span>
  );
};

/** Config d'affichage par langue (titre + sous-titre + drapeau) */
const LANGUAGE_CONFIG: Record<Language, { flag: FlagCode; label: string; subtitle: string }> = {
  fr: {
    flag: 'fr',
    label: 'Français',
    subtitle: 'Louis Segond 1910 (rév. 2025)',
  },
  en: {
    flag: 'us',
    label: 'English',
    subtitle: 'King James Version (KJV)',
  },
  de: {
    flag: 'de',
    label: 'Deutsch',
    subtitle: 'Lutherbibel 1912',
  },
  it: {
    flag: 'it',
    label: 'Italiano',
    subtitle: 'Riveduta Bibbia 1927',
  },
  es: {
    flag: 'es',
    label: 'Español',
    subtitle: 'Biblia en español',
  },
  pt: {
    flag: 'pt',
    label: 'Português',
    subtitle: 'Bíblia Portuguesa Mundial',
  },
  ru: {
    flag: 'ru',
    label: 'Русский',
    subtitle: 'Библия на русском',
  },
  hi: {
    flag: 'hi',
    label: 'हिन्दी',
    subtitle: 'Indian Revised Version (IRV)',
  },
  zh: {
    flag: 'zh',
    label: '中文',
    subtitle: 'Biblica 圣经当代译本',
  },
  ar: {
    flag: 'ar',
    label: 'العربية',
    subtitle: 'Ketab El Hayat (Book of Life)',
  },
  id: {
    flag: 'id',
    label: 'Bahasa Indonesia',
    subtitle: 'Alkitab TSI (Edisi ketiga)',
  },
  sw: {
    flag: 'sw',
    label: 'Kiswahili',
    subtitle: 'Biblica Toleo Wazi Neno',
  },
  tr: {
    flag: 'tr',
    label: 'Türkçe',
    subtitle: 'Yorumsuz Türkçe Çeviri (YTC)',
  },
  ja: {
    flag: 'ja',
    label: '日本語',
    subtitle: '新改訳新約聖書 (1965)',
  },
  ko: {
    flag: 'ko',
    label: '한국어',
    subtitle: '한국어 성경 1910',
  },
  yo: {
    flag: 'yo',
    label: 'Yorùbá',
    subtitle: 'Biblica Yoruba Bible',
  },
  he: {
    flag: 'he',
    label: 'עִבְרִית',
    subtitle: 'תנ״ך בעברית מקראית',
  },
  el: {
    flag: 'el',
    label: 'Ελληνικά',
    subtitle: 'Κείμενο στην Κοινή Ελληνική',
  },
};

/** Langues réellement disponibles (Bible + interface) */
const AVAILABLE_LANGUAGES: Language[] = [
  'fr',
  'en',
  'de',
  'it',
  'es',
  'pt',
  'ru',
  'hi',
  'zh',
  'ar',
  'id',
  'sw',
  'tr',
  'ja',
  'ko',
  'yo',
  'he',
  'el',
];

/** ✅ Ordre FIXE des langues : fr, en, el, he, puis toutes les autres (sans doublon) */
const ORDERED_LANGUAGES: Language[] = [
  'fr',
  'en',
  'el',
  'he',
  ...AVAILABLE_LANGUAGES.filter((l) => !['fr', 'en', 'el', 'he'].includes(l)),
];

/**
 * Alias de recherche pour permettre de retrouver une langue
 * même si son nom affiché est écrit dans sa langue d'origine.
 */
const LANGUAGE_SEARCH_ALIASES: Partial<Record<Language, string[]>> = {
  fr: ['français', 'francais', 'french'],
  en: ['anglais', 'english'],
  de: ['allemand', 'german', 'deutsch'],
  it: ['italien', 'italian', 'italiano'],
  es: ['espagnol', 'spanish', 'español', 'espanol'],
  pt: ['portugais', 'portuguese', 'português', 'portugues'],
  ru: ['russe', 'russian'],
  hi: ['hindi', 'inde', 'india'],
  zh: ['chinois', 'chinese', 'mandarin'],
  ar: ['arabe', 'arabic'],
  id: ['indonésien', 'indonesien', 'indonesian'],
  sw: ['swahili', 'kiswahili'],
  tr: ['turc', 'turkish', 'türkçe', 'turkce'],
  ja: ['japonais', 'japanese'],
  ko: ['coréen', 'coreen', 'korean'],
  yo: ['yoruba', 'yorùbá'],
  he: ['hébreu', 'hebreu', 'hebrew'],
  el: ['grec', 'greek', 'ελληνικά'],
};

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export default function Settings() {
  const { state, updateSettings } = useApp();
  const { t } = useTranslation();

  // Option A : thème sombre strict (inchangé, mais garde-fou)
  useEffect(() => {
    if (state.settings.theme !== 'dark') updateSettings({ theme: 'dark' });
  }, [state.settings.theme, updateSettings]);

  // --- Police par défaut à 25px au tout premier lancement ---
  useEffect(() => {
    try {
      const KEY = 'tw_firstRun_v2';
      const seen = typeof window !== 'undefined' ? localStorage.getItem(KEY) : '1';
      const current = state.settings.fontSize as number | undefined;

      const allowed = new Set([21, 23, 25, 27, 42]);
      const currentLooksInvalid =
        typeof current !== 'number' || current < 18 || current > 42 || !allowed.has(current);

      if (!seen && currentLooksInvalid) {
        updateSettings({ fontSize: 25 }); // défaut demandé
        localStorage.setItem(KEY, '1');
      }
    } catch {
      // silencieux
    }
  }, [state.settings.fontSize, updateSettings]);

  const isDark = true;

  const fontSizes = [21, 23, 25, 27];
  const XL_FONT = 42;

  // Recherche dans la liste des langues
  const [languageSearch, setLanguageSearch] = useState('');

  const [updateStatus, setUpdateStatus] = useState<
    'idle' | 'checking' | 'ready' | 'upToDate' | 'unavailable' | 'error'
  >('idle');
  const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const onControllerChange = () => window.location.reload();
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
    return () =>
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
  }, []);

  const handleCheckUpdates = async () => {
    if (!('serviceWorker' in navigator)) {
      setUpdateStatus('unavailable');
      return;
    }
    try {
      setUpdateStatus('checking');
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) {
        setUpdateStatus('unavailable');
        return;
      }
      const previousWaiting = reg.waiting || null;
      await reg.update();
      setTimeout(() => {
        if (reg.waiting && reg.waiting !== previousWaiting) {
          setWaitingSW(reg.waiting);
          setUpdateStatus('ready');
        } else {
          setUpdateStatus('upToDate');
        }
      }, 800);
    } catch {
      setUpdateStatus('error');
    }
  };

  const applyUpdate = () => {
    if (waitingSW) {
      waitingSW.postMessage({ type: 'SKIP_WAITING' });
      setTimeout(() => window.location.reload(), 1200);
    } else {
      window.location.reload();
    }
  };

  // --- Version minimaliste depuis /version.json ---
  type VersionInfo = { version?: string | null };
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [versionError, setVersionError] = useState(false);

  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        const res = await fetch('/version.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('version.json not ok');
        const data = (await res.json()) as VersionInfo;
        if (!canceled) {
          setVersionInfo(data);
          setVersionError(false);
        }
      } catch {
        if (!canceled) {
          setVersionInfo(null);
          setVersionError(true);
        }
      }
    })();
    return () => {
      canceled = true;
    };
  }, [updateStatus]);

  // --- Bouton langue réutilisable ---
  const LangButton: React.FC<{
    active: boolean;
    flag: React.ReactNode;
    title: string;
    subtitle: string;
    onClick: () => void;
  }> = ({ active, flag, title, subtitle, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 transition-all duration-200
        ${
          active
            ? 'bg-blue-800 border-blue-600 text-white shadow-sm ring-1 ring-blue-500/30'
            : isDark
            ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500'
            : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400'
        }`}
    >
      <div className="flex items-center space-x-3">
        <span className="shrink-0">{flag}</span>
        <div className="text-left">
          <div
            className={`font-semibold ${
              active ? 'text-white' : isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            {title}
          </div>
          <div
            className={`text-sm ${
              active ? 'text-white/90' : isDark ? 'text-white/80' : 'text-gray-600'
            }`}
          >
            {subtitle}
          </div>
        </div>
      </div>
      {active && <div className="w-3 h-3 rounded-full bg-white shrink-0" />}
    </button>
  );

  // ✅ Ordre FIXE (ne change pas quand on clique)
  const orderedLangs = ORDERED_LANGUAGES;

  const normalizedLanguageSearch = normalizeSearchText(languageSearch);

  const filteredLangs = orderedLangs.filter((lang) => {
    if (!normalizedLanguageSearch) return true;

    const cfg = LANGUAGE_CONFIG[lang];
    if (!cfg) return false;

    const aliases = LANGUAGE_SEARCH_ALIASES[lang] ?? [];
    const searchableText = [
      String(lang),
      cfg.label,
      cfg.subtitle,
      ...aliases,
    ]
      .map(normalizeSearchText)
      .join(' ');

    return searchableText.includes(normalizedLanguageSearch);
  });

  return (
    <div className={`min-h-[100svh] bg-gray-900 transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 text-white`}>{t('settings')}</h1>
          </div>

          {/* 1) Langue */}
          <div className={`bg-gray-800 rounded-xl shadow-lg p-6 mb-6`}>
            <h2 className={`text-xl font-semibold mb-4 text-white flex items-center`}>
              <Globe size={24} className="mr-3" />
              {t('language')}
            </h2>

            {/* Recherche de langue */}
            <div className="relative mb-5">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
                aria-hidden="true"
              />

              <input
                type="search"
                value={languageSearch}
                onChange={(e) => setLanguageSearch(e.target.value)}
                placeholder={t('search')}
                aria-label={`${t('search')} - ${t('language')}`}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-600
                  bg-gray-900/70
                  pl-11
                  pr-11
                  py-3
                  text-white
                  placeholder:text-white/45
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />

              {languageSearch && (
                <button
                  type="button"
                  onClick={() => setLanguageSearch('')}
                  aria-label={t('cancel')}
                  title={t('cancel')}
                  className="
                    absolute
                    right-2
                    top-1/2
                    -translate-y-1/2
                    h-8
                    w-8
                    inline-flex
                    items-center
                    justify-center
                    rounded-lg
                    text-white/60
                    hover:text-white
                    hover:bg-gray-700
                    transition-colors
                  "
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {filteredLangs.length > 0 ? (
              <div className="space-y-4">
                {filteredLangs.map((lang) => {
                  const cfg = LANGUAGE_CONFIG[lang];
                  if (!cfg) return null;

                  // Diminutif : fr, en, es...
                  const abbr = String(lang).toLowerCase();

                  return (
                    <LangButton
                      key={lang}
                      active={state.settings.language === lang}
                      flag={<FlagIcon code={cfg.flag} />}
                      title={`${cfg.label} (${abbr})`}
                      subtitle={cfg.subtitle}
                      onClick={() => updateSettings({ language: lang })}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-gray-700 bg-gray-900/40 px-4 py-6 text-center text-white/65">
                {t('searchNoResults')}
              </div>
            )}
          </div>

          {/* 2) Apparence + Taille de police */}
          <div className={`bg-gray-800 rounded-xl shadow-lg p-6 mb-6`}>
            <h2 className={`text-xl font-semibold mb-6 text-white flex items-center`}>
              <Palette size={24} className="mr-3" />
              {t('appearance')}
            </h2>

            <div>
              {/* Taille active clairement visible */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="text-sm font-medium text-white">{t('fontSize')}</div>

                <div
                  className="
                    shrink-0
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-blue-600/60
                    bg-blue-950/60
                    px-3
                    py-1.5
                    text-sm
                    font-semibold
                    text-blue-200
                  "
                  aria-live="polite"
                  aria-label={`${t('fontSize')}: ${state.settings.fontSize}px`}
                >
                  <span className="h-2 w-2 rounded-full bg-blue-400" aria-hidden="true" />
                  {state.settings.fontSize}px
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {fontSizes.map((value) => {
                  const isSelected = state.settings.fontSize === value;

                  return (
                    <button
                      key={value}
                      onClick={() =>
                        updateSettings({
                          fontSize: Math.max(18, Math.min(value, 42)),
                        })
                      }
                      aria-pressed={isSelected}
                      className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-950/70 text-blue-100 ring-2 ring-blue-500/20'
                          : 'border-gray-600 bg-gray-700 text-white hover:border-gray-500 hover:bg-gray-600'
                      }`}
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        {isSelected && <Check size={17} aria-hidden="true" />}
                        {value}px
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4">
                {(() => {
                  const isXL = state.settings.fontSize === XL_FONT;

                  return (
                    <button
                      onClick={() =>
                        updateSettings({
                          fontSize: Math.max(18, Math.min(XL_FONT, 42)),
                        })
                      }
                      aria-pressed={isXL}
                      className={`w-full px-4 py-4 rounded-lg border-2 font-semibold tracking-wide transition-all duration-200 ${
                        isXL
                          ? 'border-blue-500 bg-blue-950/70 text-blue-100 ring-2 ring-blue-500/20'
                          : 'border-gray-500 bg-gray-700 text-white hover:border-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        {isXL && <Check size={18} aria-hidden="true" />}
                        {t('fontSizeXLLabel')}
                        <span className={isXL ? 'text-blue-200' : 'text-white/65'}>
                          ({XL_FONT}px)
                        </span>
                      </span>
                    </button>
                  );
                })()}
              </div>

              <div
                className="mt-4 rounded-lg border-2 border-blue-500 bg-blue-950/70 p-4 ring-2 ring-blue-500/20 transition-all duration-200"
                aria-label={`${t('fontSizePreview')}: ${state.settings.fontSize}px`}
              >
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-300">
                  {state.settings.fontSize}px
                </div>

                <p
                  className="text-white"
                  style={{
                    fontSize: `${state.settings.fontSize}px`,
                    lineHeight: 1.5,
                  }}
                >
                  {t('fontSizePreview')}
                </p>
              </div>
            </div>
          </div>

          {/* 3) Mises à jour */}
          <div className={`bg-gray-800 rounded-xl shadow-lg p-6`}>
            <h2 className={`text-xl font-semibold mb-6 text-white flex items-center`}>
              <RefreshCcw size={22} className="mr-3" />
              {t('updates')}
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className={`text-white/80 text-sm`}>{t('updatesDescription')}</div>

              <div className="flex gap-3">
                {updateStatus === 'ready' ? (
                  <button
                    onClick={applyUpdate}
                    className="px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 border-blue-600 bg-blue-900/60 text-blue-100 hover:bg-blue-800/70"
                  >
                    {t('applyUpdate')}
                  </button>
                ) : (
                  <button
                    onClick={handleCheckUpdates}
                    disabled={updateStatus === 'checking'}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                      updateStatus === 'checking'
                        ? 'opacity-70 cursor-wait border-gray-500 text-gray-300'
                        : 'border-gray-600 bg-gray-700 text-white hover:border-gray-500'
                    }`}
                  >
                    {t('checkUpdatesButton')}
                  </button>
                )}
              </div>
            </div>

            {/* Statut */}
            <div className="mt-4 text-sm">
              {updateStatus === 'checking' && (
                <p className="text-white/80">{t('updatesChecking')}</p>
              )}
              {updateStatus === 'upToDate' && (
                <p className="text-green-500">{t('updatesUpToDate')}</p>
              )}
              {updateStatus === 'ready' && <p className="text-yellow-400">{t('updatesReady')}</p>}
              {updateStatus === 'unavailable' && (
                <p className="text-red-400">{t('updatesUnavailable')}</p>
              )}
              {updateStatus === 'error' && <p className="text-red-400">{t('updatesError')}</p>}
            </div>
          </div>

          {/* Footer : Version uniquement */}
          <div className="mt-8 text-center text-xs">
            {versionInfo ? (
              <p className="text-white/70">Version {versionInfo?.version ?? '0.0.0'}</p>
            ) : (
              <p className="text-white/50">{versionError ? 'version.json indisponible' : '…'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
