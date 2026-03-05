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
  aboutIntro: `Perché ho creato The Word

All’inizio ho creato questa applicazione per una cosa molto semplice: leggere più libri della Bibbia allo stesso tempo, senza perdere il filo da un giorno all’altro, grazie alle schede 1 / 2 / 3 della pagina Lettura.

Con il tempo ho aggiunto altre funzioni, sempre con la stessa intenzione: aiutare a leggere, meditare, ricordare e mettere in pratica la Parola di Dio.

La mia preghiera per voi

La mia preghiera è che possiate essere toccati dalla Parola di Dio, che comprendiate l’amore che Dio ha per voi e l’amore di Gesù Cristo, suo Figlio, così come il prezzo che ha pagato affinché fossimo riconciliati con Dio e camminassimo con Lui nel suo amore.

L’amore di Dio e l’invito a credere sono particolarmente visibili nel Vangelo di Giovanni (es.: Giovanni 3:16).

La chiave per entrare nel Regno e il chiaro invito a rispondere a Dio appaiono chiaramente nel libro degli Atti (es.: Atti 2:38; Atti 4:12).

La Bibbia: Dio ci parla

Non bisogna mai dimenticare che tutta la Bibbia è ispirata da Dio: è Dio che ci parla, e dobbiamo temerlo e ubbidirgli.

2 Timoteo 3:16-17  “Tutta la Scrittura è ispirata da Dio…”
Proverbi 9:10  “Il timore del SIGNORE è il principio della sapienza…”
Giovanni 13:34-35  “Amatevi gli uni gli altri, come io vi ho amati…”

Il tempo è breve: rispondere alla chiamata di Dio

Credo che il tempo sia breve e che Dio desideri ardentemente che ogni persona risponda alla sua chiamata: pentirsi, credere ed essere battezzati per il perdono dei peccati. È un’opportunità immensa: essere con Dio per l’eternità. Non tardiamo, perché Dio compirà la sua giustizia nel giorno che ha stabilito, e Gesù ci ha spesso chiamati a vegliare e a farci trovare pronti.

1 Corinzi 7:29  “Il tempo è breve…”
Atti 17:30-31  Dio chiama tutti gli uomini al ravvedimento… “ha stabilito un giorno…”
Atti 2:38  “Ravvedetevi, e ciascuno di voi sia battezzato… per il perdono dei vostri peccati…”
Marco 1:15  “Ravvedetevi e credete alla buona notizia.”
Matteo 24:42-44  “Vegliate dunque… siate pronti…”
Luca 12:35-40  “Siano i vostri fianchi cinti e le vostre lampade accese…”

Purtroppo molti si sono allontanati dalle Scritture. La Bibbia avverte che verrà un tempo in cui alcuni cercheranno messaggi che piacciono loro e si daranno “una folla di maestri”.

Per questo siamo chiamati a rimanere nella Parola, a ubbidire a Dio e a camminare in modo degno del Vangelo, cercando anche di convincere coloro che ci circondano.

2 Timoteo 4:3-4  “si accumuleranno maestri…”
Giovanni 8:31-32  “Se dimorate nella mia parola…”
Colossesi 1:23  “rimanete fondati e saldi…”
Filippesi 1:27  “comportatevi in modo degno del Vangelo…”
2 Corinzi 5:20  “Noi facciamo dunque da ambasciatori…”

E talvolta una “chiesa” può semplicemente iniziare umilmente: due persone che cercano Dio insieme.

Matteo 18:20  “Dove due o tre sono riuniti nel mio nome…”

La porta è stretta: camminare umilmente con Dio

Gesù ha detto che la porta è stretta e che la via che conduce alla perdizione è larga. Non lasciamo che i nostri peccati ci allontanino da Dio. Ubbidiamo umilmente alla sua Parola, con un cuore di bambino: semplice, senza ipocrisia, ma anche lucido e prudente.

Matteo 7:13-14  “Entrate per la porta stretta…”
Ebrei 12:1-2  “deponiamo ogni peso e il peccato…”
Matteo 18:3  “se non diventate come i piccoli bambini…”
Matteo 10:16  “semplici come le colombe e prudenti come i serpenti…”

Pregare, perseverare, non arrendersi

Pregate Dio affinché vi guidi mediante la sua Parola e il suo Santo Spirito. Supplicate. Non scoraggiatevi. Non arrendetevi. Anche se il giusto attraversa sofferenze, Dio rimane fedele e libera.

Luca 18:1  “bisogna pregare sempre e non scoraggiarsi”
Giacomo 1:5  “Se qualcuno manca di saggezza, la chieda a Dio…”
Salmo 34:19  “Molte sono le afflizioni del giusto, ma il SIGNORE lo libera da tutte.”`,
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
    "Questi 4 pulsanti, allineati a destra del selettore Libro/Capitolo, permettono di tornare subito alle letture frequenti per seguire più libri in parallelo: usa 1/2/3 per tre posizioni e la lente per riprendere l’ultimo passaggio (versetto casuale o ricerca).",
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
