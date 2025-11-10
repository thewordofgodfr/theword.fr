// src/pages/Settings.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { Globe, Palette, RefreshCcw } from 'lucide-react';

/** Petit composant Flag inline SVG pour compatibilité desktop/mobile */
const FlagIcon: React.FC<{ code: 'fr' | 'us'; size?: number; className?: string }> = ({
  code,
  size = 24,
  className = '',
}) => {
  if (code === 'fr') {
    return (
      <span className={`inline-block ${className}`} style={{ width: size * (4 / 3), height: size }}>
        <svg viewBox="0 0 3 2" width="100%" height="100%" aria-label="France" role="img">
          <rect width="1" height="2" x="0" fill="#0055A4" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#EF4135" />
        </svg>
      </span>
    );
  }
  return (
    <span className={`inline-block ${className}`} style={{ width: size * (4 / 3), height: size }}>
      <svg viewBox="0 0 19 10" width="100%" height="100%" aria-label="United States" role="img">
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={i} x="0" y={(i * 10) / 13} width="19" height={10 / 13} fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />
        ))}
        <rect x="0" y="0" width="7.6" height={(7 / 13) * 10} fill="#3C3B6E" />
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
};

export default function Settings() {
  const { state, updateSettings } = useApp();
  const { t } = useTranslation();

  // Force le thème sombre si besoin
  useEffect(() => {
    if (state.settings.theme !== 'dark') updateSettings({ theme: 'dark' });
  }, [state.settings.theme, updateSettings]);

  // Police par défaut à 25px au premier lancement
  useEffect(() => {
    try {
      const KEY = 'tw_firstRun_v2';
      const seen = typeof window !== 'undefined' ? localStorage.getItem(KEY) : '1';
      const current = state.settings.fontSize as number | undefined;

      const allowed = new Set([21, 23, 25, 27, 42]);
      const currentLooksInvalid =
        typeof current !== 'number' || current < 18 || current > 42 || !allowed.has(current);

      if (!seen && currentLooksInvalid) {
        updateSettings({ fontSize: 25 });
        localStorage.setItem(KEY, '1');
      }
    } catch {
      // silencieux
    }
  }, [state.settings.fontSize, updateSettings]);

  const isDark = true;

  const fontSizes = [21, 23, 25, 27];
  const XL_FONT = 42;

  const [updateStatus, setUpdateStatus] =
    useState<'idle' | 'checking' | 'ready' | 'upToDate' | 'unavailable' | 'error'>('idle');
  const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const onControllerChange = () => window.location.reload();
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
    return () => navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
  }, []);

  const handleCheckUpdates = async () => {
    if (!('serviceWorker' in navigator)) { setUpdateStatus('unavailable'); return; }
    try {
      setUpdateStatus('checking');
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) { setUpdateStatus('unavailable'); return; }
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

  // Version minimaliste depuis /version.json
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
        if (!canceled) { setVersionInfo(data); setVersionError(false); }
      } catch {
        if (!canceled) { setVersionInfo(null); setVersionError(true); }
      }
    })();
    return () => { canceled = true; };
  }, [updateStatus]);

  // Bouton langue
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
        ${active
          ? 'bg-blue-600 border-blue-600 text-white'
          : (isDark
              ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500'
              : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400')}`}
      style={{ fontSize: '21px' }}  {/* 21px mini dans le bouton */}
    >
      <div className="flex items-center space-x-3">
        <span className="shrink-0">{flag}</span>
        <div className="text-left">
          <div className={`${active ? 'text-white' : (isDark ? 'text-white' : 'text-gray-800')}`} style={{ lineHeight: 1.25 }}>
            {title}
          </div>
          <div className={`${active ? 'text-white/90' : (isDark ? 'text-white/80' : 'text-gray-600')}`} style={{ lineHeight: 1.25 }}>
            {subtitle}
          </div>
        </div>
      </div>
      {active && <div className="w-3 h-3 rounded-full bg-white" />}
    </button>
  );

  return (
    <div className={`min-h-[100svh] ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {t('settings')}
            </h1>
          </div>

          {/* 1) Langue */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-6`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'} flex items-center`}>
              <Globe size={24} className="mr-3" />
              {t('language')}
            </h2>

            <div className="space-y-4">
              <LangButton
                active={state.settings.language === 'fr'}
                flag={<FlagIcon code="fr" />}
                title="Français"
                subtitle="Louis Segond 1910 révision 2025"
                onClick={() => updateSettings({ language: 'fr' })}
              />
              <LangButton
                active={state.settings.language === 'en'}
                flag={<FlagIcon code="us" />}
                title="English"
                subtitle="King James Version"
                onClick={() => updateSettings({ language: 'en' })}
              />
            </div>

            {/* Explications des versions (21px mini) */}
            <div className="mt-6" style={{ fontSize: '21px', lineHeight: 1.7 }}>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {state.settings.language === 'fr' ? 'Versions de la Bible' : 'Bible Versions'}
              </h3>

              <div className="space-y-4">
                {/* FR */}
                <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg`}>
                  <div className="flex items-start space-x-3">
                    <FlagIcon code="fr" />
                    <div>
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Français</h4>
                      <p className={`${isDark ? 'text-white' : 'text-gray-700'} mt-1`}>
                        {t('frenchVersion')}
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-600'} mt-2`} style={{ opacity: 0.95 }}>
                        {state.settings.language === 'fr'
                          ? 'Version de référence pour la Bible en français, traduite par Louis Segond en 1910 et révisée en 2025 (modernisation du vocabulaire/grammaire, fidélité aux manuscrits).'
                          : 'Reference French Bible, translated by Louis Segond in 1910 and refreshed in 2025 (modernized wording/grammar, faithful to the manuscripts).'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* EN */}
                <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-green-50'} rounded-lg`}>
                  <div className="flex items-start space-x-3">
                    <FlagIcon code="us" />
                    <div>
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>English</h4>
                      <p className={`${isDark ? 'text-white' : 'text-gray-700'} mt-1`}>
                        {t('englishVersion')}
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-600'} mt-2`} style={{ opacity: 0.95 }}>
                        {state.settings.language === 'fr'
                          ? 'Version classique en anglais (KJV), publiée en 1611, révisée en 1769 et modernisation limitée en 2025.'
                          : 'Classic English version (KJV), published in 1611, revised in 1769, with a limited 2025 refresh.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className={`mt-3 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                {state.settings.language === 'fr'
                  ? 'D’autres langues seront ajoutées prochainement.'
                  : 'More languages will be added soon.'}
              </p>
            </div>
          </div>

          {/* 2) Apparence + Taille de police */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-6`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'} flex items-center`}>
              <Palette size={24} className="mr-3" />
              {t('appearance')}
            </h2>

            <div style={{ fontSize: '21px', lineHeight: 1.7 }}>
              <div className={`block font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                {state.settings.language === 'fr' ? 'Taille de police' : 'Font size'}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {fontSizes.map((value) => {
                  const isSelected = state.settings.fontSize === value;
                  return (
                    <button
                      key={value}
                      onClick={() => updateSettings({ fontSize: Math.max(18, Math.min(value, 42)) })}
                      aria-pressed={isSelected}
                      className={`px-4 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                        isSelected
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : isDark
                          ? 'border-gray-600 bg-gray-700 text-white hover:border-gray-500'
                          : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400'
                      }`}
                      style={{ fontSize: '21px' }}
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
                      onClick={() => updateSettings({ fontSize: Math.max(18, Math.min(XL_FONT, 42)) })}
                      aria-pressed={isXL}
                      className={`w-full px-4 py-4 rounded-lg border-2 font-semibold tracking-wide transition-all duration-200 ${
                        isXL
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : isDark
                          ? 'border-gray-500 bg-gray-700 text-white hover:border-gray-400'
                          : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400'
                      }`}
                      style={{ fontSize: '21px' }}
                    >
                      {state.settings.language === 'fr' ? 'Mode Malvoyant (XL)' : 'Low-vision mode (XL)'}
                    </button>
                  );
                })()}
              </div>

              <div className={`mt-4 p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                <p className={`${isDark ? 'text-white' : 'text-gray-700'}`} style={{ fontSize: `${state.settings.fontSize}px` }}>
                  {state.settings.language === 'fr'
                    ? 'Aperçu de la taille de police sélectionnée.'
                    : 'Preview of the selected font size.'}
                </p>
              </div>
            </div>
          </div>

          {/* 3) Mises à jour */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'} flex items-center`}>
              <RefreshCcw size={22} className="mr-3" />
              {state.settings.language === 'fr' ? 'Mises à jour' : 'Updates'}
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ fontSize: '21px', lineHeight: 1.6 }}>
              <div className={`${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                {state.settings.language === 'fr'
                  ? "Vérifie s'il existe une nouvelle version de l'application et applique-la."
                  : 'Check if a new version is available and apply it.'}
              </div>

              <div className="flex gap-3">
                {updateStatus === 'ready' ? (
                  <button
                    onClick={applyUpdate}
                    className="px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 border-green-500 bg-green-50 text-green-700"
                  >
                    {state.settings.language === 'fr' ? 'Appliquer la mise à jour' : 'Apply update'}
                  </button>
                ) : (
                  <button
                    onClick={handleCheckUpdates}
                    disabled={updateStatus === 'checking'}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                      updateStatus === 'checking'
                        ? 'opacity-70 cursor-wait border-gray-500 text-gray-300'
                        : isDark
                        ? 'border-gray-600 bg-gray-700 text-white hover:border-gray-500'
                        : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {state.settings.language === 'fr' ? 'Vérifier les mises à jour' : 'Check for updates'}
                  </button>
                )}
              </div>
            </div>

            {/* Statut (21px mini) */}
            <div className="mt-4" style={{ fontSize: '21px', lineHeight: 1.6 }}>
              {updateStatus === 'checking' && (
                <p className={isDark ? 'text-white/80' : 'text-gray-700'}>
                  {state.settings.language === 'fr' ? 'Vérification en cours…' : 'Checking…'}
                </p>
              )}
              {updateStatus === 'upToDate' && (
                <p className="text-green-500">
                  {state.settings.language === 'fr' ? 'Votre application est à jour.' : 'Your app is up to date.'}
                </p>
              )}
              {updateStatus === 'ready' && (
                <p className="text-yellow-400">
                  {state.settings.language === 'fr'
                    ? 'Nouvelle version prête. Cliquez sur « Appliquer la mise à jour ».'
                    : 'New version ready. Click “Apply update”.'}
                </p>
              )}
              {updateStatus === 'unavailable' && (
                <p className="text-red-400">
                  {state.settings.language === 'fr'
                    ? 'Mise à jour automatique indisponible (Service Worker non détecté).'
                    : 'Automatic update unavailable (No Service Worker).'}
                </p>
              )}
              {updateStatus === 'error' && (
                <p className="text-red-400">
                  {state.settings.language === 'fr'
                    ? 'Erreur lors de la vérification. Réessayez.'
                    : 'Error while checking. Please try again.'}
                </p>
              )}
            </div>
          </div>

          {/* Footer : Version (on garde petit pour ne pas surcharger l’écran) */}
          <div className="mt-8 text-center text-xs">
            {versionInfo ? (
              <p className={isDark ? 'text-white/70' : 'text-gray-600'}>
                {state.settings.language === 'fr' ? 'Version' : 'Version'} {versionInfo?.version ?? '0.0.0'}
              </p>
            ) : (
              <p className={isDark ? 'text-white/50' : 'text-gray-500'}>
                {versionError ? 'version.json indisponible' : '…'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

