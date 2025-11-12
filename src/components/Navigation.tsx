import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import {
  Home,
  Search as SearchIcon,
  BookOpen,
  Settings as SettingsIcon,
  Info,
  List as ListIcon,
  BookMarked
} from 'lucide-react';

export default function Navigation() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const isDark = state.settings.theme === 'dark';

  const labelNotes = state.settings.language === 'fr' ? 'Notes' : 'Notes';
  const labelPrincipes = state.settings.language === 'fr' ? 'Principes' : 'Studies';

  const navItems = [
    { id: 'home',       icon: Home,        label: t('home') },
    { id: 'search',     icon: SearchIcon,  label: t('search') },
    { id: 'reading',    icon: BookOpen,    label: t('reading') },
    { id: 'notes',      icon: ListIcon,    label: labelNotes },
    { id: 'principes',  icon: BookMarked,  label: labelPrincipes },
    { id: 'settings',   icon: SettingsIcon,label: t('settings') },
    { id: 'about',      icon: Info,        label: t('about') },
  ] as const;

  // (inchangé)
  const baseBtn  = 'transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';
  const activeBtn= isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700';
  const idleBtn  = isDark ? 'text-white/90 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className={[
        'sticky top-0 left-0 right-0 z-50 w-full',
        isDark ? 'bg-gray-800/95' : 'bg-white/95',
        'backdrop-blur',
        isDark ? 'border-b border-gray-700 shadow-sm' : 'border-b border-gray-200 shadow-sm',
        'transition-colors duration-200',
      ].join(' ')}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* padding horizontal plus serré sur mobile */}
      <div className="max-w-7xl mx-auto px-1 sm:px-4 lg:px-6">
        {/* hauteur réduite pour gagner quelques px */}
        <div className="h-14 flex items-center">
          {/* gap réduit + pas de justify-between pour éviter l’étirement qui fait déborder la dernière icône */}
          <div className="flex flex-1 items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar justify-start sm:justify-center">
            {navItems.map(({ id, icon: Icon, label }) => {
              const active = state.currentPage === (id as any);
              return (
                <button
                  key={id}
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: id as any })}
                  aria-current={active ? 'page' : undefined}
                  title={label}
                  className={[
                    baseBtn,
                    // padding horizontal réduit + petit gap entre icône/texte en ≥ sm
                    'px-2 py-2 flex flex-col sm:flex-row items-center sm:gap-1.5',
                    // largeur minimale réduite pour caser toutes les icônes
                    'flex-shrink-0 min-w-[44px] sm:min-w-0',
                    active ? activeBtn : idleBtn,
                  ].join(' ')}
                >
                  {/* icône légèrement plus petite */}
                  <Icon size={18} className="shrink-0" />
                  {/* le libellé reste caché en mobile */}
                  <span className="hidden sm:inline text-sm leading-none">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}


