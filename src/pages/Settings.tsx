// src/pages/Settings.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import QuickSlotsHelp from '../components/QuickSlotsHelp';
import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { Globe, Palette, RefreshCcw } from 'lucide-react';

export default function Settings() {
  const { state, updateSettings } = useApp();
  const { t } = useTranslation();

  useEffect(() => {
    if (state.settings.theme !== 'dark') updateSettings({ theme: 'dark' });
  }, [state.settings.theme, updateSettings]);

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
        if (!canceled) { setVersionInfo(data); setVersionError(false); }
      } catch {
        if (!canceled) { setVersionInfo(null); setVersionError(true); }
      }
    })();
    return () => { canceled = true; };
  }, [updateStatus]);

  // --- Bouton langue réutilisable ---
  const LangButton: React.FC<{
    active: boolean;
    flag: string;
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
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{flag}</span>
        <div className="text-left">
          <div className={`font-semibold ${active ? 'text-white' : (isDark ? 'text-white' : 'text-gray-800')}`}>
            {title}
          </div>
          <div className={`text-sm ${active ? 'text-white/90' : (isDark ? 'text-white/80' : 'text-gray-600')}`}>
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
                flag="🇫🇷"
                title="Français"
                subtitle="Louis Segond 1910 révision 2025"
                onClick={() => updateSettings({ language: 'fr' })}
              />
              <LangButton
                active={state.settings.language === 'en'}
                flag="🇺🇸"
                title="English"
                subtitle="King James Version"
                onClick={() => updateSettings({ language: 'en' })}
              />
            </div>
          </div>

          {/* 2) Apparence + Taille de police */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-6`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'} flex items-center`}>
              <Palette size={24} className="mr-3" />
              {t('appearance')}
            </h2>

            <div>
              <div className={`block text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>
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
                          : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'
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
                      onClick={() => updateSettings({ fontSize: Math.max(18, Math.min(XL_FONT, 42)) })}
                      aria-pressed={isXL}
                      className={`w-full px-4 py-4 rounded-lg border-2 font-semibold tracking-wide transition-all duration-200 ${
                        isXL
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : isDark
                          ? 'border-gray-500 bg-gray-700 text-white hover:border-gray-400'
                          : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400'
                      }`}
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

          {/* 3) Raccourcis de lecture */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-6`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {state.settings.language === 'fr' ? 'Raccourcis de lecture' : 'Reading shortcuts'}
            </h2>
            <div className={`${isDark ? 'text-white' : 'text-gray-800'} w-full text-base leading-relaxed [&>*]:w-full [&_*]:max-w-none`}>
              <QuickSlotsHelp />
            </div>
          </div>

          {/* 4) Mises à jour */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'} flex items-center`}>
              <RefreshCcw size={22} className="mr-3" />
              {state.settings.language === 'fr' ? 'Mises à jour' : 'Updates'}
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-sm`}>
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

            {/* Statut */}
            <div className="mt-4 text-sm">
              {updateStatus === 'checking' && (
                <p className={isDark ? 'text-white/80' : 'text-gray-700'}>
                  {state.settings.language === 'fr' ? 'Vérification en cours…' : 'Checking…'}
                </p>
              )}
              {updateStatus === 'upToDate' && (
                <p className="text-green-500">
                  {state.settings.language === 'fr' ? "Votre application est à jour." : 'Your app is up to date.'}
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

          {/* Footer : Version uniquement */}
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

