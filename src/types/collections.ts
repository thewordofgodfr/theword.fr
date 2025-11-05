// src/types/collections.ts

/** Référence d’un verset stockée dans une liste */
export type VerseRef = {
  /** Identifiant du livre : ex. "John", "ROM" (utilise ton book.name) */
  bookId: string;
  /** Nom affichable capturé au moment de l’ajout (FR/EN) */
  bookName?: string;
  chapter: number;
  verse: number;
  /** Texte du verset capturé (utile offline/partage) */
  text?: string;
  /** "fr", "en", etc. pour savoir d’où vient le verset */
  translation?: string;
};

/** Une liste de versets (ex: "Foi", "Espérance") */
export type VerseList = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  items: VerseRef[];
};
