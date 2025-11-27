// src/i18n/index.ts
import type { Language } from '../types/bible';
import type { TranslationDict } from './types';

import fr from './fr';
import en from './en';
import es from './es';
import ru from './ru';
import de from './de';
import it from './it';
import pt from './pt';
import hi from './hi';
import zh from './zh';
import ar from './ar';
import id from './id';
import sw from './sw';
import ko from './ko';
import ja from './ja';
import yo from './yo';
// Ajoute ici "tr" si tu crées src/i18n/tr.ts
// import tr from './tr';

export const translations: Partial<Record<Language, TranslationDict>> = {
  fr,
  en,
  es,
  ru,
  de,
  it,
  pt,
  hi,
  zh,
  ar,
  id,
  sw,
  ko,
  ja,
  yo,
  // tr,
};

const FALLBACK_LANG: Language = 'en';

export function getTranslations(lang: Language): TranslationDict {
  const dict = translations[lang] ?? translations[FALLBACK_LANG];
  if (!dict) {
    // Sécurité : si jamais même l'anglais manquait
    throw new Error('No translations available for fallback language');
  }
  return dict;
}
