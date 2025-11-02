// src/pages/QuickSlotsHelp.tsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Search as SearchIcon } from 'lucide-react';

export default function QuickSlotsHelp() {
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
      // Titre supprimé pour éviter le doublon (gardé côté Settings)
      intro:
        'Ces 4 boutons, alignés à droite du sélecteur Livre/Chapitre, permettent de revenir instantanément sur vos lectures fréquentes — pratique pour lire plusieurs livres en parallèle : utilisez 1/2/3 pour des emplacements distincts, et 🔎 pour revenir au dernier passage consulté.',
    },
    en: {
      intro:
        'These 4 buttons, aligned to the right of the Book/Chapter selector, let you jump back to frequent readings instantly — handy to read several books in parallel: use 1/2/3 for different locations, and 🔎 to resume the last passage.',
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
        {/* Loupe en bleu, comme Lecture */}
        <span className={`${CHIP_BASE} ${SEARCH_FILLED}`} title={lang === 'fr' ? 'Dernier passage' : 'Last passage'}>
          <SearchIcon className="w-4 h-4" />
        </span>

        {/* 1 (actif) — anneau léger pour illustrer l’état actif */}
        <span
          className={`${CHIP_BASE} ${SLOT1} ring-2 ring-offset-1 ${isDark ? 'ring-amber-300/50' : 'ring-amber-300'}`}
          title={lang === 'fr' ? 'Raccourci 1 (actif)' : 'Shortcut 1 (active)'}
        >
          1
        </span>

        {/* 2 — VIOLET */}
        <span className={`${CHIP_BASE} ${SLOT2}`} title={(lang === 'fr' ? 'Raccourci ' : 'Shortcut ') + '2'}>
          2
        </span>

        {/* 3 — ÉMERAUDE */}
        <span className={`${CHIP_BASE} ${SLOT3}`} title={(lang === 'fr' ? 'Raccourci ' : 'Shortcut ') + '3'}>
          3
        </span>
      </div>

      {/* Texte : uniquement le 1er paragraphe demandé */}
      <p
        className={`${isDark ? 'text-white' : 'text-gray-900'} mt-4 md:mt-5`}
        style={{ fontSize: '18px', lineHeight: 1.7 }}
      >
        {copy.intro}
      </p>
    </section>
  );
}
