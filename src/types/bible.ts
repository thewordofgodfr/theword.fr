export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  reference: string;
}

export interface BibleBook {
  name: string;
  nameEn: string;
  nameFr: string;
  chapters: number;
  testament: 'old' | 'new';
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

/**
 * Langues supportées dans l'application.
 * On utilise un tableau + "as const" pour obtenir automatiquement
 * le type union à partir de cette liste.
 */
export const SUPPORTED_LANGUAGES = [
  'fr', // Français
  'en', // Anglais
  'de', // Allemand
  'it', // Italien
  'es', // Espagnol
  'pt', // Portugais
  'ru', // Russe
  'hi', // Hindi
  'zh', // Chinois (simplifié)
  'ar', // Arabe
  'id', // Indonésien
  'sw', // Swahili
  'tr', // Turc
  'ja', // Japonais
  'ko', // Coréen
  'yo', // Yoruba
  'he', // Hébreu biblique
  'el', // Grec (Κοινή / grec ancien)
] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export type Theme = 'light' | 'dark';

export interface AppSettings {
  theme: Theme;
  fontSize: number;
  language: Language;
}
