import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import QuickSlotsHelp from '../components/QuickSlotsHelp';
import { Heart, Shuffle, List as ListIcon } from 'lucide-react';

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
      ? "TheWord est une application (et un site web) simple, rapide et pensée pour le mobile : lecture de la Bible hors-ligne, recherche instantanée, notes thématiques, partage en un geste — et une interface épurée qui s’adapte à votre taille de police. Retrouvez aussi TheWord sur le web : www.theword.fr."
      : "TheWord is a simple, fast, mobile-first Bible app (and website): offline reading, instant search, thematic notes, one-tap sharing — with a clean UI that adapts to your font size. You can also use TheWord on the web: www.theword.fr.";

  const notesTitle =
    state.settings.language === 'fr' ? 'Notes' : 'Notes';

  const notesIntro =
    state.settings.language === 'fr'
      ? "Organisez vos passages favoris et vos pensées dans des listes thématiques."
      : "Organize favorite passages and personal thoughts into thematic lists.";

  const notesPoints = state.settings.language === 'fr'
    ? [
        "Ajoutez des versets (avec leur texte) ou des blocs de texte libre.",
        "Touchez un élément pour afficher le menu (Ouvrir en Lecture, Monter/Descendre, Supprimer…).",
        "Renommez vos listes, copiez/partagez avec une mise en page propre (lien theword.fr inclus).",
        "Affichage en pleine largeur, police synchronisée avec vos Réglages.",
      ]
    : [
        "Add verses (with text) or free-text blocks.",
        "Tap an item to open its menu (Open in Reading, Move up/down, Delete…).",
        "Rename lists, copy/share with clean formatting (theword.fr link included).",
        "Full-width display, font size synced with your Settings.",
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
            <p className={`text-xl ${isDark ? 'text-white' : 'text-gray-700'} max-w-3xl mx-auto leading-relaxed`}>
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
                <p className={`${isDark ? 'text-white' : 'text-gray-700'} leading-relaxed mb-4`}>
                  {t('randomFeatureDesc')}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>31,000+</div>
                    <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-600'}`}>
                      {state.settings.language === 'fr' ? 'Versets' : 'Verses'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>66</div>
                    <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-600'}`}>
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
              <div className={`${isDark ? 'text-white' : 'text-gray-700'} leading-relaxed`}>
                <p className="mb-4">{notesIntro}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {notesPoints.map((li, i) => (
                    <li key={i} className={`${isDark ? 'text-white' : 'text-gray-700'}`}>{li}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reading Shortcuts (moved from Settings) */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {state.settings.language === 'fr' ? 'Raccourcis de lecture' : 'Reading shortcuts'}
            </h2>
            <div className={`${isDark ? 'text-white' : 'text-gray-800'} w-full text-base leading-relaxed [&>*]:w-full [&_*]:max-w-none`}>
              <QuickSlotsHelp />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <div className={`flex items-center justify-center mb-4 ${isDark ? 'text-red-400' : 'text-red-500'}`}>
              <Heart size={20} className="mr-2" />
              <span className="font-medium">
                {state.settings.language === 'fr' ? 'Créé avec amour pour répandre la Parole de Dieu' : "Created with love to spread God's Word"}
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-500'}`}>
              {state.settings.language === 'fr'
                ? 'Toutes les versions bibliques utilisées sont dans le domaine public. Elles ont été partiellement modernisées (vocabulaire, grammaire) tout en restant strictement fidèles aux manuscrits originaux.'
                : 'All Bible versions used are in the public domain. They have been partially modernized (vocabulary, grammar) while remaining strictly faithful to the original manuscripts.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
