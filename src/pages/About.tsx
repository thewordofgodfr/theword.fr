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

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=fr.theword.www.twa';
const GOOGLE_PLAY_QR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoAQAAAABSnlx4AAAChklEQVR4nO2by27rMAxEZy7y/7987oIP2csCVirVSoA0ts9iwAgjkmKNfvD69xP40Ic+9KEPPZH+SJLjO8bENZak8PZ6OlnJm2gAJDnfshCyJI+n6+nej/7EH8f6RTJWhlpY+TPoxHsCjTO0dqaJlJt8Wck76I4tsmTSxn9ByZ+l009iOWMTUScuhs3MV/IOOuKdy9g4V7UxIq/HIl9H9660b/W8xUgGHQG/Auvo3pWO/LvWMI5lnWmKMDJqY1lH9660iY8odWJtV3TjfroNs5W8g/YIrBWxxSP/DkexIvAL6d6bRkYQxWRGu01FEvaXlPx1uvbLdOt2lrgXMafBdXTvThO2Hb2TbKFIdhT3Pv79EO3RH8mdUuXYUm6go1m4ju5d6faObMZ2Pp5L2vTPMFnJO+iqLyvtU3YHweokpdf7Orq3pjPtjup9dExMlZs+/e8naVDukUTUJQu6O+i4t5zubenaELGVFY7lKi9pV19N96Z05SdULe/wFFPJ4ckHH6LdeV/X9t1A6TZVl0Dr6N6adlQ5UfAgGRir2lF2fkXJS2jqsFju3BARJkLdXE/3fvToD2ZjUPfu96WdMlnJi+jIuhG4O+A9j5L9k+8oeQntaFXVIU8aTE389MdyunelwYbsTblLeVNWfvKTh+iar+pRn7Ttyr3r6TlveIa+nc+PQ8zuCOq2Z66je1f6Nh+rbhNej3ZMpS4L6d6VDj+pwlKdeZeh0LNXs5W8irYr2kTTquLufMTJTybQsUNCzw/GBtojbavq3of+XC8o+7iOxvbJz2Qlr6LrHxguh/PkMpfGGPhyurej7/OxWVy6pjZRT6Qc/36Evs/H/qaSQx/60Ic+9E9e/wFSYTPpMoQosgAAAABJRU5ErkJggg==';

const ANDROID_LABELS: Record<string, readonly [string, string, string]> = {
  "fr": [
    "The Word sur Android",
    "Télécharger sur Google Play",
    "Scannez ce QR code avec votre téléphone Android."
  ],
  "en": [
    "The Word on Android",
    "Get it on Google Play",
    "Scan this QR code with your Android phone."
  ],
  "es": [
    "The Word en Android",
    "Descargar en Google Play",
    "Escanea este código QR con tu teléfono Android."
  ],
  "de": [
    "The Word für Android",
    "Bei Google Play herunterladen",
    "Scanne diesen QR-Code mit deinem Android-Smartphone."
  ],
  "it": [
    "The Word su Android",
    "Scarica su Google Play",
    "Scansiona questo codice QR con il tuo telefono Android."
  ],
  "pt": [
    "The Word no Android",
    "Baixar no Google Play",
    "Leia este código QR com seu celular Android."
  ],
  "ru": [
    "The Word для Android",
    "Скачать в Google Play",
    "Отсканируйте этот QR-код телефоном Android."
  ],
  "ar": [
    "The Word على Android",
    "تنزيل من Google Play",
    "امسح رمز QR هذا بهاتف Android."
  ],
  "hi": [
    "Android पर The Word",
    "Google Play से डाउनलोड करें",
    "अपने Android फ़ोन से यह QR कोड स्कैन करें।"
  ],
  "id": [
    "The Word di Android",
    "Unduh di Google Play",
    "Pindai kode QR ini dengan ponsel Android Anda."
  ],
  "ja": [
    "Android 版 The Word",
    "Google Play でダウンロード",
    "Android スマートフォンでこの QR コードを読み取ってください。"
  ],
  "ko": [
    "Android용 The Word",
    "Google Play에서 다운로드",
    "Android 휴대전화로 이 QR 코드를 스캔하세요."
  ],
  "sw": [
    "The Word kwenye Android",
    "Pakua kwenye Google Play",
    "Changanua msimbo huu wa QR kwa simu yako ya Android."
  ],
  "tr": [
    "Android için The Word",
    "Google Play’den indir",
    "Bu QR kodunu Android telefonunuzla tarayın."
  ],
  "yo": [
    "The Word lórí Android",
    "Ṣe ìgbàsílẹ̀ láti Google Play",
    "Fi fóònù Android rẹ ṣe àyẹ̀wò kóòdù QR yìí."
  ],
  "zh": [
    "Android 版 The Word",
    "在 Google Play 下载",
    "使用 Android 手机扫描此二维码。"
  ],
  "he": [
    "The Word ל־Android",
    "הורדה מ־Google Play",
    "סרקו את קוד ה־QR הזה באמצעות טלפון Android."
  ],
  "el": [
    "The Word για Android",
    "Λήψη από το Google Play",
    "Σαρώστε αυτόν τον κωδικό QR με το τηλέφωνό σας Android."
  ]
};

/* =========================================================
   AIDE VISUELLE DES MÉMOIRES RAPIDES
   Même palette que la page Lecture :
   - état inactif : bleu nuit
   - état actif : bleu vif, contour blanc et légère lueur
========================================================= */

const QuickSlotsHelpInline: React.FC = () => {
  const { state } = useApp();
  const { t } = useTranslation();

  const isDark =
    state.settings.theme === 'dark';

  const CHIP_BASE =
    'w-9 h-9 rounded-full border-2 inline-flex items-center justify-center text-sm font-bold shadow transition-all box-border';

  const CHIP_INACTIVE =
    'border-blue-800 bg-blue-950/80 text-blue-100';

  const CHIP_ACTIVE =
    'border-white bg-blue-600 text-white shadow-[0_0_0_2px_rgba(37,99,235,0.9),0_0_12px_rgba(37,99,235,0.65)]';

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
          className={`${CHIP_BASE} ${CHIP_INACTIVE}`}
          title={t(
            'quickSlotLastPassageTooltip'
          )}
        >
          <SearchIcon className="w-4 h-4" />
        </span>

        {/* Mémoire 1 illustrée comme active */}
        <span
          className={`${CHIP_BASE} ${CHIP_ACTIVE}`}
          title={t(
            'quickSlot1ActiveTooltip'
          )}
        >
          1
        </span>

        <span
          className={`${CHIP_BASE} ${CHIP_INACTIVE}`}
          title={t(
            'quickSlot2Tooltip'
          )}
        >
          2
        </span>

        <span
          className={`${CHIP_BASE} ${CHIP_INACTIVE}`}
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
  const androidLabels = ANDROID_LABELS[state.settings.language] ?? ANDROID_LABELS.en;

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

              <section className={CARD_CLASS} aria-labelledby="android-download-title" data-android-download>
                <h2 id="android-download-title" className={HEADING_CLASS} style={{ fontSize: H2_PX }}>
                  {androidLabels[0]}
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label={androidLabels[1]} className="shrink-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">
                    <img src={GOOGLE_PLAY_QR} width={160} height={160} alt={androidLabels[2]} className="block rounded-xl bg-white" />
                  </a>
                  <div className="flex flex-col items-center sm:items-start gap-4 text-center sm:text-start">
                    <p className={BODY_TEXT_CLASS} style={{ fontSize: TEXT_PX, lineHeight: 1.7 }}>
                      {androidLabels[2]}
                    </p>
                    <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl border border-gray-600 bg-black px-5 py-3 text-white hover:bg-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">
                      <svg width="26" height="28" viewBox="0 0 24 26" aria-hidden="true" className="shrink-0">
                        <path d="M2 1 14 13 2 25Z" fill="#4285f4" />
                        <path d="M2 1 18 10 14 13Z" fill="#34a853" />
                        <path d="m14 13 4-3 5 3-5 3Z" fill="#fbbc04" />
                        <path d="m2 25 12-12 4 3Z" fill="#ea4335" />
                      </svg>
                      <span>{androidLabels[1]}</span>
                    </a>
                  </div>
                </div>
              </section>
          </div>
        </div>
      </div>
    </div>
  );
}
