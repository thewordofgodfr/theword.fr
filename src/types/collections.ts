// src/types/collections.ts
export type VerseRef = {
  /** Identifiant du livre (ex: "GEN", "PSA", etc. ou ton id interne) */
  bookId: string;
  /** Nom affichable optionnel au moment de l’ajout (pour éviter un recalcul) */
  bookName?: string;
  chapter: number;
  verse: number;
  /** Texte du verset au moment de l’ajout (optionnel, utile pour partager offline) */
  text?: string;
  /** "fr", "en", etc. si tu veux distinguer la source */
  translation?: string;
};

export type VerseList = {
  id: string;         // uuid
  title: string;      // ex: "Foi", "Courage"
  createdAt: number;
  updatedAt: number;
  items: VerseRef[];
};
