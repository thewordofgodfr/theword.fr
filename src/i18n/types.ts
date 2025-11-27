// src/i18n/types.ts

/**
 * Dictionnaire de traduction générique, récursif,
 * qui accepte des chaînes ou des objets imbriqués.
 */
export interface TranslationDict {
  [key: string]: string | TranslationDict;
}
