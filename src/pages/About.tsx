// src/pages/About.tsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { Shuffle, Search as SearchIcon } from 'lucide-react';

/** Tailles fixes (non dynamiques) */
const TITLE_PX = 21; // Titre principal
const H2_PX = 20;    // Sous-titres
const TEXT_PX = 19;  // Paragraphes et listes

/** QuickSlotsHelp intégré localement pour pouvoir supprimer src/components/QuickSlotsHelp.tsx */
const QuickSlotsHelpInline: React.FC = () => {
  const { state } = useApp();
  const { t } = useTranslation();
  const isDark = state.settings.theme === 'dark';

  // Styles harmonisés avec la page Lecture (pills)
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
      {/* Aperçu des raccourcis (aligné sur Lecture) */}
      <div
        className={`flex flex-wrap items-center gap-2 rounded-2xl px-3 py-3
          ${isDark ? 'bg-gray-900/40 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}
        aria-label={t('quickSlotsIllustrationLabel')}
      >
        {/* Loupe en bleu */}
        <span
          className={`${CHIP_BASE} ${SEARCH_FILLED}`}
          title={t('quickSlotLastPassageTooltip')}
        >
          <SearchIcon className="w-4 h-4" />
        </span>

        {/* 1 (actif) */}
        <span
          className={`${CHIP_BASE} ${SLOT1} ring-2 ring-offset-1 ${
            isDark ? 'ring-amber-300/50' : 'ring-amber-300'
          }`}
          title={t('quickSlot1ActiveTooltip')}
        >
          1
        </span>

        {/* 2 */}
        <span className={`${CHIP_BASE} ${SLOT2}`} title={t('quickSlot2Tooltip')}>
          2
        </span>

        {/* 3 */}
        <span className={`${CHIP_BASE} ${SLOT3}`} title={t('quickSlot3Tooltip')}>
          3
        </span>
      </div>

      {/* Texte explicatif (fixe, 19px) */}
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
    <div
      className={`min-h-screen ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      } transition-colors duration-200`}
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        {/* ====== 1) INTRO (titre + paragraphe) ====== */}
        <header className="mb-5 text-center">
          <h1
            className={`font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontSize: `${TITLE_PX}px`, lineHeight: 1.25 }}
          >
            The Word
          </h1>

          <p
            className={`${
              isDark ? 'text-white/90' : 'text-gray-700'
            } mt-3 leading-relaxed`}
            style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
          >
            {t('aboutIntro')}
          </p>
        </header>

        <div className="flex flex-col gap-5">
          {/* ====== 2) RECHERCHE ====== */}
          <section
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4`}
          >
            <h2
              className={`mb-4 font-bold flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontSize: `${H2_PX}px` }}
            >
              <SearchIcon size={22} className="mr-2 opacity-90" />
              {t('searchTitle')}
            </h2>

            <div
              className={`rounded-xl p-4 ${
                isDark ? 'bg-gray-700/70' : 'bg-gradient-to-br from-blue-50 to-slate-50'
              }`}
            >
              <p
                className={`${isDark ? 'text-white' : 'text-gray-700'} leading-relaxed`}
                style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
              >
                {t('aboutDescription')}
              </p>
            </div>
          </section>

          {/* ====== 3) FONCTIONNALITÉ ALÉATOIRE ====== */}
          <section
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4`}
          >
            <h2
              className={`mb-4 font-bold flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontSize: `${H2_PX}px` }}
            >
              <Shuffle size={22} className="mr-2 opacity-90" />
              {t('randomFeature')}
            </h2>

            <div
              className={`rounded-xl p-4 ${
                isDark ? 'bg-gray-700/70' : 'bg-gradient-to-br from-green-50 to-blue-50'
              }`}
            >
              <p
                className={`${isDark ? 'text-white' : 'text-gray-700'} leading-relaxed`}
                style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
              >
                {t('randomFeatureDesc')}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="text-center">
                  <div
                    className={`font-extrabold ${
                      isDark ? 'text-blue-300' : 'text-blue-700'
                    }`}
                    style={{ fontSize: `${TITLE_PX}px`, lineHeight: 1.2 }}
                  >
                    31,000+
                  </div>
                  <div
                    className={`${isDark ? 'text-white/90' : 'text-gray-700'}`}
                    style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.4 }}
                  >
                    {t('versesLabel')}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`font-extrabold ${
                      isDark ? 'text-emerald-300' : 'text-emerald-700'
                    }`}
                    style={{ fontSize: `${TITLE_PX}px`, lineHeight: 1.2 }}
                  >
                    66
                  </div>
                  <div
                    className={`${isDark ? 'text-white/90' : 'text-gray-700'}`}
                    style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.4 }}
                  >
                    {t('booksLabel')}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====== 4) RACCOURCIS DE LECTURE ====== */}
          <section
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4`}
          >
            <h2
              className={`mb-4 font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontSize: `${H2_PX}px` }}
            >
              {t('readingShortcuts')}
            </h2>
            <div
              className={`${
                isDark ? 'text-white' : 'text-gray-800'
              } w-full leading-relaxed`}
            >
              <QuickSlotsHelpInline />
            </div>
          </section>

          {/* ====== 5) VERSIONS DE LA BIBLE ====== */}
          <section
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4`}
          >
            <h2
              className={`mb-4 font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontSize: `${H2_PX}px` }}
            >
              {t('bibleVersions')}
            </h2>

            <div
              className={`rounded-xl p-4 ${
                isDark ? 'bg-gray-700/70' : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="space-y-3">
                <div>
                  <div
                    className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}
                    style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.5 }}
                  >
                    {t('frenchVersion')}
                  </div>
                  <p
                    className={`${isDark ? 'text-white/90' : 'text-gray-700'} mt-1`}
                    style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
                  >
                    {t('frenchVersionDetails')}
                  </p>
                </div>

                <div className={`${isDark ? 'border-gray-600' : 'border-gray-200'} border-t pt-3`}>
                  <div
                    className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}
                    style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.5 }}
                  >
                    {t('englishVersion')}
                  </div>
                  <p
                    className={`${isDark ? 'text-white/90' : 'text-gray-700'} mt-1`}
                    style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
                  >
                    {t('englishVersionDetails')}
                  </p>
                </div>

                <div className={`${isDark ? 'border-gray-600' : 'border-gray-200'} border-t pt-3`}>
                  <p
                    className={`${isDark ? 'text-white/90' : 'text-gray-700'}`}
                    style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.7 }}
                  >
                    {t('otherLanguagesNote')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ====== 6) NOTE LÉGALE + LIEN CONFIDENTIALITÉ ====== */}
          <footer className="px-1 pb-2">
            <p
              className={`${
                isDark ? 'text-white/90' : 'text-gray-600'
              } text-center`}
              style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.6 }}
            >
              {t('versionsFootnote')}
            </p>

            {/* Lien vers la politique de confidentialité */}
            <p
              className={`${
                isDark ? 'text-white/70' : 'text-gray-600'
              } text-center mt-2`}
              style={{ fontSize: `${TEXT_PX}px`, lineHeight: 1.6 }}
            >
              {state.settings.language === 'fr' ? (
                <>
                  Pour consulter la politique de confidentialité,&nbsp;
                  <a href="https://theword.fr/privacy.html" className="underline">
                    cliquez ici
                  </a>
                  .
                </>
              ) : (
                <>
                  To read the privacy policy,&nbsp;
                  <a href="https://theword.fr/privacy.html" className="underline">
                    click here
                  </a>
                  .
                </>
              )}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
