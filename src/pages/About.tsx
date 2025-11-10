// src/pages/About.tsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { Heart, Shuffle, List as ListIcon, Search as SearchIcon } from 'lucide-react';

/** QuickSlotsHelp intégré localement pour pouvoir supprimer src/components/QuickSlotsHelp.tsx */
const QuickSlotsHelpInline: React.FC = () => {
  const { state } = useApp();
  const isDark = state.settings.theme === 'dark';
  const lang = state.settings.language === 'fr' ? 'fr' : 'en';

  // Styles harmonisés avec la page Lecture (pills)
  const CHIP_BASE =
    'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shadow active:scale-95';
  const SEARCH_FILLED = 'bg-blue-600 text-white';
  const SLOT1 = 'bg-amber-600 text-white';
  const SLOT2 = 'bg-violet-600 text-white';
  const SLOT3 = 'bg-emerald-600 text-white';

  const copy = {
    fr: {
      intro:
        'Ces 4 boutons, alignés à droite du sélecteur Livre/Chapitre, permettent de revenir instantanément sur vos lectures fréquentes pour lire plusieurs livres en parallèle : utilisez 1/2/3 pour 3 emplacements distincts, et la loupe pour reprendre le dernier passage (verset aléatoire ou recherche).',
    },
    en: {
      intro:
        'These 4 buttons, aligned to the right of the Book/Chapter selector, let you jump back to frequent readings to follow several books in parallel: use 1/2/3 for three locations, and the magnifier to resume the last passage (random verse or search).',
    },
  }[lang];

  return (
    <section
      className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-5 md:p-6 shadow-lg`}
    >
      {/* Aperçu des raccourcis (aligné sur Lecture) */}
      <div
        className={`flex flex-wrap items-center gap-2 md:gap-3 rounded-2xl px-3 md:px-4 py-3
          ${isDark ? 'bg-gray-900/40 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}
        aria-label={lang === 'fr' ? 'Illustration des raccourcis' : 'Shortcuts illustration'}
      >
        {/* Loupe en bleu */}
        <span className={`${CHIP_BASE} ${SEARCH_FILLED}`} title={lang === 'fr' ? 'Dernier passage' : 'Last passage'}>
          <SearchIcon className="w-4 h-4" />
        </span>

        {/* 1 (actif) */}
        <span
          className={`${CHIP_BASE} ${SLOT1} ring-2 ring-offset-1 ${isDark ? 'ring-amber-300/50' : 'ring-amber-300'}`}
          title={lang === 'fr' ? 'Raccourci 1 (actif)' : 'Shortcut 1 (active)'}
        >
          1
        </span>

        {/* 2 */}
        <span className={`${CHIP_BASE} ${SLOT2}`} title={(lang === 'fr' ? 'Raccourci ' : 'Shortcut ') + '2'}>
          2
        </span>

        {/* 3 */}
        <span className={`${CHIP_BASE} ${SLOT3}`} title={(lang === 'fr' ? 'Raccourci ' : 'Shortcut ') + '3'}>
          3
        </span>
      </div>

      {/* Texte explicatif (21px mini) */}
      <p
        className={`${isDark ? 'text-white' : 'text-gray-900'} mt-4 md:mt-5`}
        style={{ fontSize: '21px', lineHeight: 1.7 }}
      >
        {copy.intro}
      </p>
    </section>
  );
};

export default function About() {
  const { state } = useApp();
  const { t } = useTranslation();

  const isDark = state.settings.theme === 'dark';

  // Titre conditionnel : caché si vide OU s'il vaut la clé "aboutTitle"
  const rawTitle = (t('aboutTitle') ?? '').trim();
  const showTitle =
    rawTitle.length > 0 &&
    rawTitle !== 'aboutTitle' &&
    rawTitle.toLowerCase() !== 'abouttitle';

  const aboutIntro =
    state.settings.language === 'fr'
      ? "TheWord : lecture de la Bible hors-ligne, recherche instantanée, notes thématiques, partage en un geste. Retrouvez aussi TheWord sur le web : www.theword.fr"
      : "TheWord: offline reading, instant search, thematic notes, one-tap sharing. You can also use TheWord on the web: www.theword.fr";

  const notesTitle = state.settings.language === 'fr' ? 'Notes' : 'Notes';

  const notesIntro =
    state.settings.language === 'fr'
      ? "Organisez vos passages favoris et vos pensées dans des listes thématiques."
      : "Organize favorite passages and personal thoughts into thematic lists.";

  const notesPoints =
    state.settings.language === 'fr'
      ? [
          'Ajoutez des versets ou des blocs de texte libre.',
          'Touchez un élément pour afficher le menu (Ouvrir en Lecture, Monter/Descendre, Supprimer…).',
          'Renommez vos listes, copiez/partagez.',
        ]
      : [
          'Add verses or free-text blocks.',
          'Tap an item to open its menu (Open in Reading, Move up/down, Delete…).',
          'Rename lists, copy/share.',
        ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            {showTitle && (
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {rawTitle}
              </h1>
            )}
            <p
              className={`${isDark ? 'text-white' : 'text-gray-700'} max-w-3xl mx-auto leading-relaxed`}
              style={{ fontSize: '21px', lineHeight: 1.7 }}
            >
              {aboutIntro}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Random Feature */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'} flex items-center`}>
                <Shuffle size={28} className="mr-3 text-green-500" />
                {t('randomFeature')}
              </h2>

              <div className={`p-6 ${isDark ? 'bg-gray-700' : 'bg-gradient-to-br from-green-50 to-blue-50'} rounded-lg`}>
                <p
                  className={`${isDark ? 'text-white' : 'text-gray-700'} leading-relaxed mb-4`}
                  style={{ fontSize: '21px', lineHeight: 1.7 }}
                >
                  {t('randomFeatureDesc')}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>31,000+</div>
                    <div
                      className={`${isDark ? 'text-white' : 'text-gray-600'}`}
                      style={{ fontSize: '21px', lineHeight: 1.4 }}
                    >
                      {state.settings.language === 'fr' ? 'Versets' : 'Verses'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>66</div>
                    <div
                      className={`${isDark ? 'text-white' : 'text-gray-600'}`}
                      style={{ fontSize: '21px', lineHeight: 1.4 }}
                    >
                      {state.settings.language === 'fr' ? 'Livres' : 'Books'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes overview */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'} flex items-center`}>
                <ListIcon size={28} className="mr-3 text-indigo-500" />
                {notesTitle}
              </h2>
              <div className={`${isDark ? 'text-white' : 'text-gray-700'} leading-relaxed`} style={{ fontSize: '21px', lineHeight: 1.7 }}>
                <p className="mb-4">{notesIntro}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {notesPoints.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reading Shortcuts (ex-Settings) */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {state.settings.language === 'fr' ? 'Raccourcis de lecture' : 'Reading shortcuts'}
            </h2>
            <div className={`${isDark ? 'text-white' : 'text-gray-800'} w-full leading-relaxed [&>*]:w-full [&_*]:max-w-none`} style={{ fontSize: '21px' }}>
              <QuickSlotsHelpInline />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <div className={`flex items-center justify-center mb-4 ${isDark ? 'text-red-400' : 'text-red-500'}`}>
              <Heart size={20} className="mr-2" />
              <span className="font-medium" style={{ fontSize: '21px' }}>
                {state.settings.language === 'fr'
                  ? 'Créé avec amour pour répandre la Parole de Dieu'
                  : "Created with love to spread God's Word"}
              </span>
            </div>
            <p
              className={`${isDark ? 'text-white' : 'text-gray-500'}`}
              style={{ fontSize: '21px', lineHeight: 1.6 }}
            >
              {state.settings.language === 'fr'
                ? 'Toutes les versions bibliques utilisées sont dans le domaine public. Certaines ont été partiellement modernisées (vocabulaire, grammaire) tout en restant strictement fidèles aux manuscrits originaux.'
                : 'All Bible versions used are in the public domain. Some have been partially modernized (vocabulary, grammar) while remaining strictly faithful to the original manuscripts.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

