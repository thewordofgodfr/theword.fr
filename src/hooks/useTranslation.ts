// src/hooks/useTranslation.ts
import { useApp } from '../contexts/AppContext';
import type { Language } from '../types/bible';

/**
 * Dictionnaires de base FR / EN.
 * On garde les mêmes clés qu'actuellement pour ne rien casser.
 */
const frTranslations = {
  // Navigation
  home: 'Accueil',
  reading: 'Lecture',
  search: 'Recherche',
  settings: 'Paramètres',
  about: 'À propos',
  notes: 'Notes',
  principles: 'Principes',

  // Home page
  randomVerse: 'Verset Aléatoire',
  newVerse: 'Nouveau Verset',
  copyVerse: 'Copier le Verset',
  verseCopied: 'Verset copié !',
  godSpeaks: 'Dieu vous parle',
  openJeremiah: 'Ouvrir Jérémie 23:29',
  jeremiah23Quote:
    '« Ma parole n’est-elle pas comme un feu, dit l’Éternel, et comme un marteau qui brise le roc ? » Jérémie 23:29',

  // Reading page
  selectBook: 'Sélectionner un livre',
  selectChapter: 'Sélectionner un chapitre',
  chapter: 'Chapitre',
  oldTestament: 'Ancien Testament',
  newTestament: 'Nouveau Testament',

  // Settings page
  appearance: 'Apparence',
  lightMode: 'Mode Clair',
  darkMode: 'Mode Sombre',
  fontSize: 'Taille de Police',
  language: 'Langue',
  french: 'Français',
  english: 'Anglais',

  // About page
  aboutTitle: '',
  aboutDescription:
    'The Word vous permet de découvrir la parole de Dieu à travers des versets aléatoires et une lecture complète de la Bible.',
  bibleVersions: 'Versions de la Bible',
  frenchVersion: 'Français : Louis Segond 1910 (LSG)- Révision 2025 - Libre de droit',
  englishVersion: 'Anglais : King James Version (KJV) - Libre de droit',
  randomFeature: 'Fonctionnalité Aléatoire',
  randomFeatureDesc:
    'Notre générateur de versets aléatoires sélectionne parmi plus de 31,000 versets bibliques pour vous offrir une inspiration quotidienne.',
  musicLink: 'Musique du Créateur',

  // Common
  loading: 'Chargement...',
  error: 'Erreur lors du chargement',
};

const enTranslations = {
  // Navigation
  home: 'Home',
  reading: 'Reading',
  search: 'Search',
  settings: 'Settings',
  about: 'About',
  notes: 'Notes',
  principles: 'Studies',

  // Home page
  randomVerse: 'Random Verse',
  newVerse: 'New Verse',
  copyVerse: 'Copy Verse',
  verseCopied: 'Verse copied!',
  godSpeaks: 'God speaks to you',
  openJeremiah: 'Open Jeremiah 23:29',
  jeremiah23Quote:
    '“Is not my word like as a fire? saith the LORD; and like a hammer that breaketh the rock in pieces?” Jeremiah 23:29',

  // Reading page
  selectBook: 'Select a book',
  selectChapter: 'Select a chapter',
  chapter: 'Chapter',
  oldTestament: 'Old Testament',
  newTestament: 'New Testament',

  // Settings page
  appearance: 'Appearance',
  lightMode: 'Light Mode',
  darkMode: 'Dark Mode',
  fontSize: 'Font Size',
  language: 'Language',
  french: 'French',
  english: 'English',

  // About page
  aboutTitle: '',
  aboutDescription:
    "The Word allows you to discover God's word through random verses and complete Bible reading.",
  bibleVersions: 'Bible Versions',
  frenchVersion: 'French: Louis Segond 1910 (LSG) - Public Domain',
  englishVersion: 'English: King James Version (KJV) - Public Domain',
  randomFeature: 'Random Feature',
  randomFeatureDesc:
    'Our random verse generator selects from over 31,000 biblical verses to provide you with daily inspiration.',
  musicLink: "Creator's Music",

  // Common
  loading: 'Loading...',
  error: 'Error loading content',
};

/**
 * Dictionnaire global par langue.
 *
 * IMPORTANT :
 * - fr / en ont des vraies traductions.
 * - les autres langues sont pour l'instant vides ({}).
 * - la fonction `t()` fait automatiquement un fallback sur l'anglais
 *   si la clé n'est pas trouvée dans la langue courante.
 */
const translations: Record<Language, any> = {
  fr: frTranslations,
  en: enTranslations,

  // Langues à venir : on les laisse vides pour le moment.
  de: {},
  it: {},
  es: {},
  pt: {},
  ru: {},
  hi: {},
  zh: {},
  ar: {},
  id: {},
  sw: {},
};

const FALLBACK_LANGUAGE: Language = 'en';

export function useTranslation() {
  const { state } = useApp();
  const lang = state.settings.language as Language;

  const t = (key: string): string => {
    const keys = key.split('.');

    const resolve = (language: Language): string | undefined => {
      let value: any = translations[language];
      for (const k of keys) {
        value = value?.[k];
      }
      return typeof value === 'string' ? value : undefined;
    };

    // 1) langue courante
    // 2) anglais
    // 3) clé brute
    return resolve(lang) ?? resolve(FALLBACK_LANGUAGE) ?? key;
  };

  return { t, language: lang };
}

