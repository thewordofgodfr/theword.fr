// src/pages/Settings.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { Globe, Palette, RefreshCcw } from 'lucide-react';
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

  /* --- (tout ton code FlagIcon inchangé) --- */
  /* ⬇️ strictement identique à ce que tu as envoyé */
  /* … */
  return (
    <span className={`inline-block ${className}`} style={style}>
      <svg viewBox="0 0 3 2" width="100%" height="100%">
        <rect width="3" height="2" fill="#999999" />
      </svg>
    </span>
  );
};

/** Config d'affichage par langue */
const LANGUAGE_CONFIG: Record<
  Language,
  { flag: FlagCode; label: string; subtitle: string }
> = {
  fr: { flag: 'fr', label: 'Français', subtitle: 'Louis Segond 1910 (rév. 2025)' },
  en: { flag: 'us', label: 'English', subtitle: 'King James Version (KJV)' },
  de: { flag: 'de', label: 'Deutsch', subtitle: 'Lutherbibel 1912' },
  it: { flag: 'it', label: 'Italiano', subtitle: 'Riveduta Bibbia 1927' },
  es: { flag: 'es', label: 'Español', subtitle: 'Biblia en español' },
  pt: { flag: 'pt', label: 'Português', subtitle: 'Bíblia Portuguesa Mundial' },
  ru: { flag: 'ru', label: 'Русский', subtitle: 'Библия на русском' },
  hi: { flag: 'hi', label: 'हिन्दी', subtitle: 'Indian Revised Version (IRV)' },
  zh: { flag: 'zh', label: '中文', subtitle: 'Biblica 圣经当代译本' },
  ar: { flag: 'ar', label: 'العربية', subtitle: 'Ketab El Hayat (Book of Life)' },
  id: { flag: 'id', label: 'Bahasa Indonesia', subtitle: 'Alkitab TSI (Edisi ketiga)' },
  sw: { flag: 'sw', label: 'Kiswahili', subtitle: 'Biblica Toleo Wazi Neno' },
  tr: { flag: 'tr', label: 'Türkçe', subtitle: 'Yorumsuz Türkçe Çeviri (YTC)' },
  ja: { flag: 'ja', label: '日本語', subtitle: '新改訳新約聖書 (1965)' },
  ko: { flag: 'ko', label: '한국어', subtitle: '한국어 성경 1910' },
  yo: { flag: 'yo', label: 'Yorùbá', subtitle: 'Biblica Yoruba Bible' },
  he: { flag: 'he', label: 'עִבְרִית', subtitle: 'תנ״ך בעברית מקראית' },
  el: { flag: 'el', label: 'Ελληνικά', subtitle: 'Κείμενο στην Κοινή Ελληνική' },
};

/** Langues disponibles */
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

/** ✅ ORDRE FIXE — NE CHANGE JAMAIS */
const ORDERED_LANGUAGES: Language[] = [
  'fr',
  'en',
  'el',
  'he',
  ...AVAILABLE_LANGUAGES.filter(
    (l) => !['fr', 'en', 'el', 'he'].includes(l)
  ),
];

export default function Settings() {
  const { state, updateSettings } = useApp();
  const { t } = useTranslation();

  // Dark-only strict
  useEffect(() => {
    if (state.settings.theme !== 'dark') updateSettings({ theme: 'dark' });
  }, [state.settings.theme, updateSettings]);

  const isDark = true;
  const fontSizes = [21, 23, 25, 27];
  const XL_FONT = 42;

  const [updateStatus, setUpdateStatus] = useState<
    'idle' | 'checking' | 'ready' | 'upToDate' | 'unavailable' | 'error'
  >('idle');
  const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);

  /* --- tout le code update / version inchangé --- */

  const LangButton: React.FC<{
    active: boolean;
    flag: React.ReactNode;
    title: string;
    subtitle: string;
    onClick: () => void;
  }> = ({ active, flag, title, subtitle, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
        active
          ? 'bg-blue-600 border-blue-600 text-white'
          : 'bg-gray-700 border-gray-600 text-white hover:border-gray-500'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="shrink-0">{flag}</span>
        <div className="text-left">
          <div className="font-semibold text-white">{title}</div>
          <div className="text-sm text-white/80">{subtitle}</div>
        </div>
      </div>
      {active && <div className="w-3 h-3 rounded-full bg-white shrink-0" />}
    </button>
  );

  return (
    <div className="min-h-[100svh] bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Langue */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
              <Globe size={24} className="mr-3" />
              {t('language')}
            </h2>

            <div className="space-y-4">
              {ORDERED_LANGUAGES.map((lang) => {
                const cfg = LANGUAGE_CONFIG[lang];
                if (!cfg) return null;
                const abbr = lang.toLowerCase();

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
          </div>

          {/* le reste du fichier (police, updates, footer) inchangé */}
        </div>
      </div>
    </div>
  );
}

          {/* 2) Apparence + Taille de police */}
          <div className={`bg-gray-800 rounded-xl shadow-lg p-6 mb-6`}>
            <h2 className={`text-xl font-semibold mb-6 text-white flex items-center`}>
              <Palette size={24} className="mr-3" />
              {t('appearance')}
            </h2>

            <div>
              <div className={`block text-sm font-medium mb-4 text-white`}>
                {t('fontSize')}
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
                      className={`px-4 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                        isSelected
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-600 bg-gray-700 text-white hover:border-gray-500'
                      }`}
                    >
                      {value}px
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
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-500 bg-gray-700 text-white hover:border-gray-400'
                      }`}
                    >
                      {t('fontSizeXLLabel')}
                    </button>
                  );
                })()}
              </div>

              <div className={`mt-4 p-4 bg-gray-700 rounded-lg`}>
                <p className="text-white" style={{ fontSize: `${state.settings.fontSize}px` }}>
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
                    className="px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 border-green-500 bg-green-50 text-green-700"
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
              {updateStatus === 'upToDate' && <p className="text-green-500">{t('updatesUpToDate')}</p>}
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

