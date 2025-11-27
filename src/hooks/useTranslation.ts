// src/hooks/useTranslation.ts
import { useApp } from '../contexts/AppContext';
import type { Language } from '../types/bible';
import { getTranslations } from '../i18n';

/**
 * Résout une clé "a.b.c" dans un objet de traduction imbriqué.
 */
function resolvePath(dict: any, key: string): string | undefined {
  return key
    .split('.')
    .reduce<any>((obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined), dict);
}

export function useTranslation() {
  const { state } = useApp();
  const lang = state.settings.language as Language;

  const current = getTranslations(lang);
  const fallback = getTranslations('en' as Language);

  /**
   * t('home')
   * t('notesPage.create')
   * t('principlesPage.importTextButton')
   */
  const t = (key: string): string => {
    const value = resolvePath(current, key);
    if (typeof value === 'string') return value;

    const fallbackValue = resolvePath(fallback, key);
    if (typeof fallbackValue === 'string') return fallbackValue;

    // Dernier recours : on renvoie la clé elle-même
    return key;
  };

  return { t, lang };
}
