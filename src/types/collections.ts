// src/types/collections.ts

/** Référence d’un verset stockée dans une liste */
export type VerseRef = {
  /** Identifiant canonique du livre (utilise ton book.name : p.ex. "John", "ROM", etc.) */
  bookId: string;
  /** Nom affichable capturé au moment de l’ajout (FR/EN) */
  bookName?: string;
  chapter: number;
  verse: number;
  /** Texte du verset capturé au moment de l’ajout (utile offline/partage) */
  text?: string;
  /** "fr", "en", etc. pour savoir d’où vient le verset */
  translation?: string;
};

/** Une liste de versets (ex: "Foi", "Espérance") */
export type VerseList = {
  id: string;       // uuid-like
  title: string;    // ex: "Foi"
  createdAt: number;
  updatedAt: number;
  items: VerseRef[];
};
