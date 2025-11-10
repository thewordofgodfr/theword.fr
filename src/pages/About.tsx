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

  // Taille de base liée aux réglages (fallback 19px)
  const base = Math.max(16, Math.round((state.settings as any)?.fontSize || 19));

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
      className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-4 shadow-md`}
    >
      {/* Aperçu des raccourcis (aligné sur Lecture) */}
      <div
        className={`flex flex-wrap items-center gap-2 rounded-2xl px-3 py-3
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

      {/* Texte explicatif lié au réglage de taille */}
      <p
        className={`${isDark ? 'text-white' : 'text-gray-900'} mt-3`}
        style={{ fontSize: `${base}px`, lineHeight: 1.7 }}
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

  // Tailles liées au réglage utilisateur (mobile-first)
  const base = Math.max(16, Math.round((state.settings as any)?.fontSize || 19)); // texte
  const titleSize = base + 2; // titre "légèrement" plus gros que l'intro
  const h2Size = base + 1; // sous-titres des blocs

  // Intro (FR/EN)
  const aboutIntro =
    state.settings.language === 'fr'
      ? 'TheWord : Lecture de la Bible hors-ligne, recherche instantanée, notes thématiques, partage en un geste. Retrouvez aussi TheWord sur le web : www.theword.fr'
      : 'TheWord: offline reading, instant search, thematic notes, one-tap sharing. You can also use TheWord on the web: www.theword.fr';

  const notesTitle = state.settings.language === 'fr' ? 'Notes' : 'Notes';
  const notesIntro =
    state.settings.language === 'fr'
      ? 'Organisez vos passages favoris et vos pensées dans des listes thématiques.'
      : 'Organize favorite passages and personal thoughts into thematic lists.';
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
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        {/* ====== 1) INTRO (titre + paragraphe) ====== */}
        <header className="mb-5 text-center">
          <h1
            className={`font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: `${titleSize}px`, lineHeight: 1.25 }}
          >
            The Word
          </h1>

          <p
            className={`${isDark ? 'text-white/90' : 'text-gray-700'} mt-3 leading-relaxed`}
            style={{ fontSize: `${base}px`, lineHeight: 1.7 }}
          >
            {aboutIntro}
          </p>
        </header>

        <div className="flex flex-col gap-5">
          {/* ====== 2) FONCTIONNALITÉ ALÉATOIRE ====== */}
          <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4`}>
            <h2
              className={`mb-4 font-bold flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: `${h2Size}px` }}
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
                style={{ fontSize: `${base}px`, lineHeight: 1.7 }}
              >
                {t('randomFeatureDesc')}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="text-center">
                  <div className={`text-xl font-extrabold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>31,000+</div>
                  <div className={`${isDark ? 'text-white/90' : 'text-gray-700'}`} style={{ fontSize: `${base - 2}px` }}>
                    {state.settings.language === 'fr' ? 'Versets' : 'Verses'}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-extrabold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>66</div>
                  <div className={`${isDark ? 'text-white/90' : 'text-gray-700'}`} style={{ fontSize: `${base - 2}px` }}>
                    {state.settings.language === 'fr' ? 'Livres' : 'Books'}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====== 3) RACCOURCIS DE LECTURE ====== */}
          <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4`}>
            <h2
              className={`mb-4 font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: `${h2Size}px` }}
            >
              {state.settings.language === 'fr' ? 'Raccourcis de lecture' : 'Reading shortcuts'}
            </h2>
            <div className={`${isDark ? 'text-white' : 'text-gray-800'} w-full leading-relaxed`}>
              <QuickSlotsHelpInline />
            </div>
          </section>

          {/* ====== 4) NOTES ====== */}
          <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4`}>
            <h2
              className={`mb-3 font-bold flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: `${h2Size}px` }}
            >
              <ListIcon size={20} className="mr-2 opacity-90" />
              {notesTitle}
            </h2>

            <div
              className={`${isDark ? 'text-white' : 'text-gray-700'} leading-relaxed`}
              style={{ fontSize: `${base}px`, lineHeight: 1.7 }}
            >
              <p className="mb-3">{notesIntro}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {notesPoints.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ====== 5) CRÉÉ AVEC AMOUR (cœur plus grand + mise en page) ====== */}
          <section
            className={`rounded-2xl p-4 text-center shadow-md ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <Heart className={`${isDark ? 'text-rose-300' : 'text-rose-500'}`} size={28} />
              <span className="font-semibold" style={{ fontSize: `${base}px` }}>
                {state.settings.language === 'fr'
                  ? 'Créé avec amour pour répandre la Parole de Dieu'
                  : "Created with love to spread God's Word"}
              </span>
            </div>
          </section>

          {/* ====== 6) COMMENTAIRE DE FIN SUR LES VERSIONS ====== */}
          <footer className="px-1 pb-2">
            <p
              className={`${isDark ? 'text-white/90' : 'text-gray-600'} text-center`}
              style={{ fontSize: `${base - 2}px`, lineHeight: 1.6 }}
            >
              {state.settings.language === 'fr'
                ? 'Toutes les versions bibliques utilisées sont dans le domaine public. Certaines ont été partiellement modernisées (vocabulaire, grammaire) tout en restant strictement fidèles aux manuscrits originaux.'
                : 'All Bible versions used are in the public domain. Some have been partially modernized (vocabulary, grammar) while remaining strictly faithful to the original manuscripts.'}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

