// src/pages/About.tsx

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import {
  Shuffle,
  Search as SearchIcon,
  Mail,
  BookOpen,
  Languages,
} from 'lucide-react';

/** Tailles fixes du contenu */
const H2_PX = 20;
const TEXT_PX = 19;

/* =========================================================
   AIDE VISUELLE DES MÉMOIRES RAPIDES
   Même palette que la page Lecture :
   - Loupe : bleu sombre
   - 1 : ambre sombre
   - 2 : violet sombre
   - 3 : vert sombre
========================================================= */

const QuickSlotsHelpInline: React.FC = () => {
  const { state } = useApp();
  const { t } = useTranslation();

  const isDark =
    state.settings.theme === 'dark';

  const CHIP_BASE =
    'w-9 h-9 rounded-full inline-flex items-center justify-center text-sm font-bold shadow-sm transition-all';

  const SEARCH_FILLED =
    'bg-blue-700 text-white';

  const SLOT1 =
    'bg-amber-800 text-white';

  const SLOT2 =
    'bg-violet-800 text-white';

  const SLOT3 =
    'bg-emerald-800 text-white';

  return (
    <div>
      <div
        className={`
          flex
          items-center
          gap-3
          rounded-xl
          px-4
          py-4
          border

          ${
            isDark
              ? `
                bg-gray-900/55
                border-gray-700
              `
              : `
                bg-gray-50
                border-gray-200
              `
          }
        `}
        aria-label={t(
          'quickSlotsIllustrationLabel'
        )}
      >
        {/* Loupe */}
        <span
          className={`${CHIP_BASE} ${SEARCH_FILLED}`}
          title={t(
            'quickSlotLastPassageTooltip'
          )}
        >
          <SearchIcon className="w-4 h-4" />
        </span>

        {/* Mémoire 1 illustrée comme active */}
        <span
          className={`
            ${CHIP_BASE}
            ${SLOT1}
            border-2
            border-white
          `}
          title={t(
            'quickSlot1ActiveTooltip'
          )}
        >
          1
        </span>

        <span
          className={`${CHIP_BASE} ${SLOT2}`}
          title={t(
            'quickSlot2Tooltip'
          )}
        >
          2
        </span>

        <span
          className={`${CHIP_BASE} ${SLOT3}`}
          title={t(
            'quickSlot3Tooltip'
          )}
        >
          3
        </span>
      </div>

      <p
        className={`
          ${
            isDark
              ? 'text-white/90'
              : 'text-gray-700'
          }
          mt-4
        `}
        style={{
          fontSize: `${TEXT_PX}px`,
          lineHeight: 1.7,
        }}
      >
        {t('quickSlotsIntro')}
      </p>
    </div>
  );
};

/* =========================================================
   PAGE À PROPOS
========================================================= */

export default function About() {
  const { state } = useApp();
  const { t } = useTranslation();

  const isDark =
    state.settings.theme === 'dark';

  const CARD_CLASS = `
    rounded-xl
    border
    shadow-sm
    p-5
    sm:p-6

    ${
      isDark
        ? `
          bg-gray-800
          border-gray-700
        `
        : `
          bg-white
          border-gray-200
        `
    }
  `;

  const HEADING_CLASS = `
    mb-4
    font-bold
    flex
    items-center
    gap-3

    ${
      isDark
        ? 'text-white'
        : 'text-gray-900'
    }
  `;

  const ICON_BOX_CLASS = `
    w-10
    h-10
    shrink-0
    rounded-lg
    flex
    items-center
    justify-center
    border

    ${
      isDark
        ? `
          bg-blue-950/40
          border-blue-800/60
          text-blue-300
        `
        : `
          bg-blue-50
          border-blue-200
          text-blue-700
        `
    }
  `;

  const BODY_TEXT_CLASS =
    isDark
      ? 'text-white/90'
      : 'text-gray-700';

  return (
    <div
      className={`
        min-h-[100svh]

        ${
          isDark
            ? 'bg-gray-900'
            : 'bg-gray-50'
        }
      `}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* ==================================================
              EN-TÊTE
          ================================================== */}

          <header className="text-center mb-8">
            <h1
              className={`
                text-3xl
                md:text-4xl
                font-bold

                ${
                  isDark
                    ? 'text-white'
                    : 'text-gray-900'
                }
              `}
            >
              The Word
            </h1>

            <p
              className={`
                mt-4
                max-w-3xl
                mx-auto

                ${
                  isDark
                    ? 'text-white/80'
                    : 'text-gray-600'
                }
              `}
              style={{
                fontSize: `${TEXT_PX}px`,
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
              }}
            >
              {t('aboutIntro')}
            </p>
          </header>

          <div className="flex flex-col gap-5">

            {/* ==================================================
                RECHERCHE
            ================================================== */}

            <section className={CARD_CLASS}>
              <h2
                className={HEADING_CLASS}
                style={{
                  fontSize: `${H2_PX}px`,
                }}
              >
                <span className={ICON_BOX_CLASS}>
                  <SearchIcon size={21} />
                </span>

                {t('searchTitle')}
              </h2>

              <p
                className={BODY_TEXT_CLASS}
                style={{
                  fontSize: `${TEXT_PX}px`,
                  lineHeight: 1.7,
                }}
              >
                {t('aboutDescription')}
              </p>
            </section>

            {/* ==================================================
                VERSET ALÉATOIRE
            ================================================== */}

            <section className={CARD_CLASS}>
              <h2
                className={HEADING_CLASS}
                style={{
                  fontSize: `${H2_PX}px`,
                }}
              >
                <span className={ICON_BOX_CLASS}>
                  <Shuffle size={21} />
                </span>

                {t('randomFeature')}
              </h2>

              <p
                className={BODY_TEXT_CLASS}
                style={{
                  fontSize: `${TEXT_PX}px`,
                  lineHeight: 1.7,
                }}
              >
                {t('randomFeatureDesc')}
              </p>
            </section>

            {/* ==================================================
                RACCOURCIS DE LECTURE
            ================================================== */}

            <section className={CARD_CLASS}>
              <h2
                className={HEADING_CLASS}
                style={{
                  fontSize: `${H2_PX}px`,
                }}
              >
                <span className={ICON_BOX_CLASS}>
                  <BookOpen size={21} />
                </span>

                {t('readingShortcuts')}
              </h2>

              <QuickSlotsHelpInline />
            </section>

            {/* ==================================================
                VERSIONS BIBLIQUES
            ================================================== */}

            <section className={CARD_CLASS}>
              <h2
                className={HEADING_CLASS}
                style={{
                  fontSize: `${H2_PX}px`,
                }}
              >
                <span className={ICON_BOX_CLASS}>
                  <Languages size={21} />
                </span>

                {t('bibleVersions')}
              </h2>

              <p
                className={BODY_TEXT_CLASS}
                style={{
                  fontSize: `${TEXT_PX}px`,
                  lineHeight: 1.7,
                }}
              >
                {t('versionsFootnote')}
              </p>
            </section>

            {/* ==================================================
                CONTACT / CONFIDENTIALITÉ
            ================================================== */}

            <footer
              className={`
                mt-1
                pt-6
                pb-3
                text-center
                border-t

                ${
                  isDark
                    ? 'border-gray-800'
                    : 'border-gray-200'
                }
              `}
            >
              <div
                className={`
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-2

                  ${
                    isDark
                      ? 'text-white/70'
                      : 'text-gray-600'
                  }
                `}
                style={{
                  fontSize: `${TEXT_PX}px`,
                }}
              >
                <Mail size={18} />

                <span>
                  Contact :
                </span>

                <a
                  href="mailto:contact@theword.fr"
                  className={`
                    underline
                    underline-offset-4
                    transition-colors

                    ${
                      isDark
                        ? `
                          text-blue-300
                          hover:text-blue-200
                        `
                        : `
                          text-blue-700
                          hover:text-blue-600
                        `
                    }
                  `}
                >
                  contact@theword.fr
                </a>
              </div>

              <p className="mt-4">
                <a
                  href="https://theword.fr/privacy.html"
                  className={`
                    underline
                    underline-offset-4
                    text-sm
                    transition-colors

                    ${
                      isDark
                        ? `
                          text-white/60
                          hover:text-white/90
                        `
                        : `
                          text-gray-500
                          hover:text-gray-800
                        `
                    }
                  `}
                >
                  {state.settings.language ===
                  'fr'
                    ? 'Politique de confidentialité'
                    : 'Privacy policy'}
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
