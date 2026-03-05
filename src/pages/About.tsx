// src/pages/About.tsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { Shuffle, Search as SearchIcon, Mail } from 'lucide-react';

/** Tailles fixes (non dynamiques) */
const TITLE_PX = 21;
const H2_PX = 20;
const TEXT_PX = 19;

/** QuickSlotsHelp intégré localement */
const QuickSlotsHelpInline: React.FC = () => {
  const { state } = useApp();
  const { t } = useTranslation();
  const isDark = state.settings.theme === 'dark';

  const CHIP_BASE =
    'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shadow active:scale-95';
  const SEARCH_FILLED = 'bg-blue-600 text-white';
  const SLOT1 = 'bg-amber-600 text-white';
  const SLOT2 = 'bg-violet-600 text-white';
  const SLOT3 = 'bg-emerald-600 text-white';

  return (
    <section
      className={`${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-2xl p-4 shadow-md`}
    >
      <div
        className={`flex flex-wrap items-center gap-2 rounded-2xl px-3 py-3
        ${isDark ? 'bg-gray-900/40 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}
        aria-label={t('quickSlotsIllustrationLabel')}
      >
        <span
          className={`${CHIP_BASE} ${SEARCH_FILLED}`}
          title={t('quickSlotLastPassageTooltip')}
        >
          <SearchIcon className="w-4 h-4" />
        </span>
        <span className={`${CHIP_BASE} ${SLOT1}`} title={t('quickSlot1ActiveTooltip')}>
          1
        </span>
        <span className={`${CHIP_BASE} ${SLOT2}`} title={t('quickSlot2Tooltip')}>
          2
        </span>
        <span className={`${CHIP_BASE} ${SLOT3}`} title={t('quickSlot3Tooltip')}>
          3
        </span>
      </div>

      <p
        className={`${isDark ? 'text-white' : 'text-gray-900'} mt-3`}
        style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
      >
        {t('quickSlotsIntro')}
      </p>
    </section>
  );
};

export default function About() {
  const { state } = useApp();
  const { t } = useTranslation();
  const isDark = state.settings.theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <header className="mb-5 text-center">
          <h1
            className={`font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: `${TITLE_PX}px` }}
          >
            The Word
          </h1>

          {/* ✅ affichage multi-lignes (important pour le gros aboutIntro) */}
          <p
            className={`${isDark ? 'text-white/90' : 'text-gray-700'} mt-3`}
            style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7, whiteSpace: 'pre-line' }}
          >
            {t('aboutIntro')}
          </p>
        </header>

        <div className="flex flex-col gap-5">
          {/* Recherche */}
          <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md`}>
            <h2
              className={`mb-4 font-bold flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: `${H2_PX}px` }}
            >
              <SearchIcon size={22} className="mr-2" />
              {t('searchTitle')}
            </h2>
            <p
              className={`${isDark ? 'text-white' : 'text-gray-700'}`}
              style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
            >
              {t('aboutDescription')}
            </p>
          </section>

          {/* Aléatoire */}
          <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md`}>
            <h2
              className={`mb-4 font-bold flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: `${H2_PX}px` }}
            >
              <Shuffle size={22} className="mr-2" />
              {t('randomFeature')}
            </h2>
            <p
              className={`${isDark ? 'text-white' : 'text-gray-700'}`}
              style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
            >
              {t('randomFeatureDesc')}
            </p>
          </section>

          {/* Raccourcis (les 4 boutons) */}
          <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md`}>
            <h2
              className={`mb-4 font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: `${H2_PX}px` }}
            >
              {t('readingShortcuts')}
            </h2>
            <QuickSlotsHelpInline />
          </section>

          {/* Versions */}
          <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md`}>
            <h2
              className={`mb-3 font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: `${H2_PX}px` }}
            >
              {t('bibleVersions')}
            </h2>

            <p
              className={`${isDark ? 'text-white/90' : 'text-gray-700'}`}
              style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
            >
              {t('frenchVersion')}
              <br />
              <span className={`${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                {t('frenchVersionDetails')}
              </span>
            </p>

            <p
              className={`${isDark ? 'text-white/90' : 'text-gray-700'} mt-3`}
              style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
            >
              {t('englishVersion')}
              <br />
              <span className={`${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                {t('englishVersionDetails')}
              </span>
            </p>

            <p
              className={`${isDark ? 'text-white/90' : 'text-gray-700'} mt-3`}
              style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
            >
              {t('otherLanguagesNote')}
            </p>
          </section>

          <footer className="text-center">
            <p
              className={`${isDark ? 'text-white/80' : 'text-gray-600'}`}
              style={{ fontSize: `${TEXT_PX}px` }}
            >
              {t('versionsFootnote')}
            </p>

            {/* ✅ Contact (sans i18n -> évite crash si clés manquantes côté TWA cache) */}
            <p className="mt-3">
              <span
                className={`${isDark ? 'text-white/80' : 'text-gray-600'} inline-flex items-center gap-2`}
                style={{ fontSize: `${TEXT_PX}px` }}
              >
                <Mail size={18} />
                Contact :
              </span>{' '}
              <a
                href="mailto:contact@theword.fr"
                className={`${isDark ? 'text-white underline' : 'text-gray-800 underline'}`}
              >
                contact@theword.fr
              </a>
            </p>

            <p className="mt-2">
              <a
                href="https://theword.fr/privacy.html"
                className={`${isDark ? 'text-white underline' : 'text-gray-800 underline'}`}
              >
                {state.settings.language === 'fr' ? 'Politique de confidentialité' : 'Privacy policy'}
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

