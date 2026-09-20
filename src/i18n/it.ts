// src/i18n/it.ts
import type { TranslationDict } from './types';

const it: TranslationDict = {
  // Navigation
  home: "Home",
  reading: "Lettura",
  search: "Ricerca",
  settings: "Impostazioni",
  about: "Info",
  notes: "Note",
  principles: "Studi",

  // Home page
  randomVerse: "Versetto casuale",
  newVerse: "Nuovo versetto",
  copyVerse: "Copia versetto",
  verseCopied: "Versetto copiato!",
  godSpeaks: "Dio ti parla",
  openJeremiah: "Apri Geremia 23:29",
  jeremiah23Quote:
    "«La mia parola non è forse come un fuoco, dice il SIGNORE, e come un martello che spezza la roccia?» Geremia 23:29",

  // Reading page
  selectBook: "Seleziona un libro",
  selectChapter: "Seleziona un capitolo",
  chapter: "Capitolo",
  oldTestament: "Antico Testamento",
  newTestament: "Nuovo Testamento",

  // Reading – extras
  chooseBook: "Scegli un libro",
  showInOtherLangs: 'Altre lingue',
  chooseChapter: "Scegli un capitolo",
  prevChapter: "Capitolo precedente",
  nextChapter: "Capitolo successivo",
  verseWord: "versetto",
  versesSelectedSuffix: "versetto(i) selezionato(i)",
  toNotes: "Vai a Note",
  toPrinciples: "Vai a Studi",
  copyLabel: "Copia",
  shareLabel: "Condividi",
  cancel: "Annulla",
  close: "Chiudi",
  notesModalTitle: "Aggiungi a una lista (Note)",
  notesNoList:
    "Ancora nessuna lista. Creane una qui sotto.",
  notesNewListOptional: "Nuova lista (opzionale)",
  principlesModalTitle: "Aggiungi a uno studio (Studi)",
  principlesNoList:
    "Ancora nessuno studio. Creane uno qui sotto.",
  principlesNewListOptional: "Nuovo studio (opzionale)",
  selectionCopied: "Selezione copiata",
  textReadyToShare:
    "Testo pronto da condividere (copiato)",
  addedToList: "Aggiunto alla lista",
  newRandom: "Nuovo casuale",
  swipeLabel: "Scorri",
  searchSlotLabel: "Ricerca",
  searchSlotEmpty: "Ricerca (vuota)",
  memorySlotLabel: "Memoria",
  emptySlotSuffix: "(vuoto)",
  untitledList: "(senza titolo)",

  // Short label “Copied”
  copiedShort: "Copiato",

  // Search page
  searchTitle: "Ricerca biblica",
  searchPlaceholder: "Digita la tua ricerca",
  searchMinChars: "Digita almeno 2 caratteri.",
  searchSearching: "Ricerca in corso…",
  searchResults: "Risultati",
  searchExpandAll: "Apri tutto",
  searchCollapseAll: "Chiudi tutto",
  searchNoResults: "Nessun versetto trovato.",
  searchClear: "Cancella",
  searchOpenInReading: "Apri in Lettura",

  // Notes page
  notesPage: {
    create: "Crea lista",
    placeholder: "Titolo della lista…",
    empty: "Ancora nessuna lista.",
    items: "elementi",
    backAll: "← Tutte le liste",
    addTextBlock: "Aggiungi blocco di testo",
    editTextBlock: "Modifica blocco",
    deleteItem: "Elimina",
    moveUp: "Sposta su",
    moveDown: "Sposta giù",
    open: "Apri",
    confirmDeleteItem: "Eliminare questo elemento?",
    newTextPlaceholder: "Il tuo testo…",

    shareCode: "Codice",
    importCode: "Importa codice",
    importPrompt:
      "Incolla qui il codice di condivisione TheWord:",
    importError: "Codice non valido.",
    importSuccess: "Lista importata con successo ✅",
    shareCodeCopied:
      "Codice copiato negli appunti ✅",

    importTextButton: "Testo → Lista",
    importTextTitlePlaceholder:
      "Titolo della nuova lista",
    importTextDefaultTitle: "Importa testo",
    importTextBodyPlaceholder:
      "Incolla qui il tuo testo…",
    importTextNoBody:
      "Incolla un testo da importare.",
    importTextNoBlock:
      "Nessun blocco rilevato (lascia righe vuote se vuoi dividerlo in blocchi).",
    importTextSplitLabel:
      "Dividi in blocchi (separati da almeno una riga vuota)",
    importTextInfo:
      "Ogni blocco diventerà un elemento della lista.",
    importTextCreate: "Crea lista",

    duplicateTitle:
      "Esiste già una lista con lo stesso titolo.",
    confirmDeleteList: "Eliminare questa lista?",
    emptyList: "Lista vuota.",

    importFromTextTitle: "Importa da testo",
    documentContent: "Contenuto del documento",
    renameList: "Rinomina",
  },

  // Principles page
  principlesPage: {
    create: "Crea studio",
    placeholder: "Titolo dello studio…",
    empty: "Ancora nessuno studio.",
    items: "elementi",
    backAll: "← Tutti gli studi",
    addTextBlock: "Aggiungi blocco di testo",
    editTextBlock: "Modifica blocco",
    deleteItem: "Elimina",
    moveUp: "Sposta su",
    moveDown: "Sposta giù",
    open: "Apri",
    openReading: "Apri Lettura",
    confirmDeleteItem: "Eliminare questo elemento?",
    newTextPlaceholder: "Il tuo testo…",

    shareCode: "Codice",
    importCode: "Importa codice",
    importPrompt:
      "Incolla qui il codice di condivisione TheWord (nota o studio):",
    importError: "Codice non valido.",
    importSuccess:
      "Studio importato con successo ✅",
    shareCodeCopied:
      "Codice copiato negli appunti ✅",

    importTextButton: "Testo → Studio",
    importTextTitlePlaceholder:
      "Titolo del nuovo studio",
    importTextDefaultTitle: "Importa testo",
    importTextBodyPlaceholder:
      "Incolla qui il tuo testo…",
    importTextNoBody:
      "Incolla un testo da importare.",
    importTextNoBlock:
      "Nessun blocco rilevato (lascia righe vuote se vuoi dividerlo in blocchi).",
    importTextSplitLabel:
      "Dividi in blocchi (separati da almeno una riga vuota)",
    importTextInfo:
      "Ogni blocco diventerà un elemento dello studio.",
    importTextCreate: "Crea studio",

    duplicateTitle:
      "Esiste già uno studio con lo stesso titolo.",
    confirmDeleteList:
      "Eliminare questo studio?",
    emptyList: "Studio vuoto.",

    importFromTextTitle: "Importa da testo",
    documentContent: "Contenuto del documento",
    renameList: "Rinomina",
    share: "Condividi",
    copy: "Copia",
    deleteList: "Elimina",

    shareStudyTitle: "Studio",
    shareItemTitle: "Versetto",
  },

  // Settings
  appearance: "Aspetto",
  lightMode: "Tema chiaro",
  darkMode: "Tema scuro",
  fontSize: "Dimensione del testo",
  language: "Lingua",
  french: "Francese",
  english: "Inglese",
  fontSizeXLLabel:
    "Modalità ipovisione (XL)",
  fontSizePreview:
    "Anteprima della dimensione del testo selezionata.",
  updates: "Aggiornamenti",
  updatesDescription:
    "Controlla se è disponibile una nuova versione e applicala.",
  applyUpdate: "Applica aggiornamento",
  checkUpdatesButton: "Controlla aggiornamenti",
  updatesChecking: "Verifica in corso…",
  updatesUpToDate: "L'app è aggiornata.",
  updatesReady:
    "Nuova versione pronta. Clicca su «Applica aggiornamento».",
  updatesUnavailable:
    "Aggiornamento automatico non disponibile (Service Worker non rilevato).",
  updatesError:
    "Errore durante il controllo. Riprova.",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word ti permette di scoprire la Parola di Dio attraverso versetti casuali e la lettura completa della Bibbia.",
  aboutIntro: `Perché The Word?

Ho creato The Word per poter leggere contemporaneamente diversi libri della Bibbia senza perdere il filo della lettura. Nel tempo sono state aggiunte altre funzioni, sempre con lo stesso obiettivo: aiutare ciascuno a leggere, meditare, ricordare e mettere in pratica la Parola di Dio.

Il mio desiderio

In un mondo in cui tante voci cercano di influenzarci, il mio desiderio è semplice: incoraggiare ciascuno a tornare direttamente alla Bibbia, con cuore sincero, per cercarvi la verità.

La mia preghiera è che questa applicazione vi aiuti a scoprire l’amore di Dio, a conoscere Gesù Cristo e a comprendere ciò che ha fatto per riconciliarci con Dio.

Leggete la sua Parola. Esaminatela attentamente. Chiedete a Dio di guidarvi, poi rispondete alla sua chiamata con fede, ravvedimento e obbedienza.

«Se dimorate nella mia parola, siete veramente miei discepoli; conoscerete la verità e la verità vi renderà liberi.»

Giovanni 8:31-32”`,
  bibleVersions: "Versioni della Bibbia",
  frenchVersion:
    "Francese: Louis Segond 1910 (LSG) – Revisione 2025 – Dominio pubblico",
  englishVersion:
    "Inglese: King James Version (KJV) – Dominio pubblico",
  frenchVersionDetails:
    "Versione di riferimento in francese, tradotta da Louis Segond nel 1910 e rivista nel 2025 (modernizzazione del vocabolario e della grammatica, fedele ai manoscritti).",
  englishVersionDetails:
    "Classica versione inglese (KJV), pubblicata nel 1611, rivista nel 1769 e leggermente aggiornata nel 2025.",
  otherLanguagesNote:
    "Altre lingue (tedesco, portoghese, ecc.) sono in preparazione. In attesa, l’interfaccia usa l’inglese se la traduzione non è ancora disponibile.",
  randomFeature: "Funzione casuale",
  randomFeatureDesc:
    "Il nostro generatore di versetti casuali sceglie tra più di 31.000 versetti biblici per offrirti ispirazione quotidiana.",
  musicLink: "Musica del Creatore",
  versesLabel: "Versetti",
  booksLabel: "Libri",
  readingShortcuts:
    "Scorciatoie di lettura",
  notesIntro:
    "Organizza i tuoi passi preferiti e i tuoi pensieri in liste tematiche.",
  notesPoint1:
    "Aggiungi versetti o blocchi di testo libero.",
  notesPoint2:
    "Tocca un elemento per aprire il menu (Apri in Lettura, Sposta su/giù, Elimina…).",
  notesPoint3:
    "Rinomina le liste, copia/condividi.",
  createdWithLove:
    "Creato con amore per diffondere la Parola di Dio",
  versionsFootnote:
    "Tutte le versioni bibliche utilizzate sono di dominio pubblico. Alcune sono state parzialmente modernizzate (vocabolario, grammatica), mantenendo la massima fedeltà ai manoscritti originali. Se desiderate l’app Android, inviatemi una richiesta via e-mail e vi invierò un link (app in versione di test).",

  // Quick slots
  quickSlotsIntro:
    "Questi 4 pulsanti permettono di tornare immediatamente alle letture frequenti e di leggere più libri in parallelo: usa 1/2/3 per 3 posizioni distinte e la lente d’ingrandimento per tornare all’ultimo passo (versetto casuale o risultato di ricerca).",
  quickSlotsIllustrationLabel:
    "Illustrazione delle scorciatoie",
  quickSlotLastPassageTooltip:
    "Ultimo passaggio",
  quickSlot1ActiveTooltip:
    "Scorciatoia 1 (attiva)",
  quickSlot2Tooltip: "Scorciatoia 2",
  quickSlot3Tooltip: "Scorciatoia 3",

  // Common
  loading: "Caricamento...",
  error: "Errore durante il caricamento",
};

export default it;
