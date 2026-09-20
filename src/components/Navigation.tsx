// src/components/Navigation.tsx

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
  BookMarked,
} from 'lucide-react';

export default function Navigation() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();

  const isDark = state.settings.theme === 'dark';

  const navItems = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'search', icon: SearchIcon, label: t('search') },
    { id: 'reading', icon: BookOpen, label: t('reading') },
    { id: 'notes', icon: ListIcon, label: t('notes') },
    { id: 'principes', icon: BookMarked, label: t('principles') },
    { id: 'settings', icon: SettingsIcon, label: t('settings') },
    { id: 'about', icon: Info, label: t('about') },
  ] as const;

  const baseBtn =
    'transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400';

  const activeBtn = isDark
    ? 'bg-blue-700 text-white shadow-sm'
    : 'bg-blue-100 text-blue-700';

  const idleBtn = isDark
    ? 'text-white/90 hover:bg-gray-700 hover:text-white'
    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className={[
        'sticky top-0 left-0 right-0 z-50 w-full',
        isDark ? 'bg-gray-800/95' : 'bg-white/95',
        'backdrop-blur',
        isDark
          ? 'border-b border-gray-700 shadow-sm'
          : 'border-b border-gray-200 shadow-sm',
        'transition-colors duration-200',
      ].join(' ')}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-1 lg:px-4 xl:px-6">
        <div className="h-16 flex items-center">
          {/*
            TÉLÉPHONE / PETIT ÉCRAN / PAYSAGE :
            - 7 colonnes de largeur identique
            - icône au-dessus du libellé
            - tout tient sur une seule ligne

            GRAND ÉCRAN :
            - disposition horizontale classique à partir de 1024 px
          */}
          <div className="grid grid-cols-7 w-full lg:flex lg:items-center lg:justify-center lg:gap-2">
            {navItems.map(({ id, icon: Icon, label }) => {
              const active = state.currentPage === (id as any);

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'SET_PAGE',
                      payload: id as any,
                    })
                  }
                  aria-current={active ? 'page' : undefined}
                  aria-label={label}
                  title={label}
                  className={[
                    baseBtn,

                    // Téléphone, paysage et petit écran pliable
                    'min-w-0 h-[52px] px-0.5 py-1',
                    'flex flex-col items-center justify-center gap-1',

                    // Grand écran
                    'lg:h-auto lg:px-3 lg:py-2',
                    'lg:flex-row lg:gap-2',

                    active ? activeBtn : idleBtn,
                  ].join(' ')}
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  <span
                    className="
                      block
                      w-full
                      min-w-0
                      truncate
                      text-center
                      text-[9px]
                      leading-none
                      font-medium

                      lg:w-auto
                      lg:text-sm
                      lg:leading-none
                    "
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

