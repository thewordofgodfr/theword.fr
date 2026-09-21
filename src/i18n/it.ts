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
    "Cerca istantaneamente parole o espressioni in tutta la Bibbia, apri i risultati nella sezione Lettura e copia o condividi un versetto con un solo tocco.",
  aboutIntro: `Perché The Word?

Ho creato The Word per poter leggere contemporaneamente diversi libri della Bibbia senza perdere il filo della lettura. Nel tempo sono state aggiunte altre funzioni, sempre con lo stesso obiettivo: aiutare ciascuno a leggere, meditare, ricordare e mettere in pratica la Parola di Dio.

Il mio desiderio

In un mondo in cui tante voci cercano di influenzarci, il mio desiderio è semplice: incoraggiare ciascuno a tornare direttamente alla Bibbia, con cuore sincero, per cercarvi la verità.

La mia preghiera è che questa applicazione vi aiuti a scoprire l’amore di Dio, a conoscere Gesù Cristo e a comprendere ciò che ha fatto per riconciliarci con Dio.

Leggete la sua Parola. Esaminatela attentamente. Chiedete a Dio di guidarvi, poi rispondete alla sua chiamata con fede, ravvedimento e obbedienza.

«Se dimorate nella mia parola, siete veramente miei discepoli; conoscerete la verità e la verità vi renderà liberi.»

Giovanni 8:31-32`,
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
    "Informazioni sui testi: le Bibbie integrate sono utilizzate nel rispetto delle rispettive licenze. Soltanto la Louis Segond 1910 è stata modernizzata nel 2025 (grammatica e vocabolario), nel rigoroso rispetto dei manoscritti originali.",

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
notesHelpTitle: 'Note e Studi — Guida all’uso',

notesHelpIntro:
'Le pagine Note e Studi consentono di salvare e organizzare versetti in elenchi tematici e completarli con blocchi di testo personali. Puoi raccogliere passi, aggiungere riflessioni e creare studi biblici strutturati. Note e Studi vengono salvati localmente sul dispositivo e rimangono accessibili senza un account.',

notesHelp1Title: '1. Creare e gestire gli elenchi',

notesHelp1Body:
'La pagina principale mostra tutti gli elenchi di Note o gli Studi. Puoi creare un elenco, assegnargli un titolo, rinominarlo o eliminarlo. Tocca un elenco per aprirlo. Il pulsante «Tutti gli elenchi» o «Tutti gli studi» riporta alla vista generale. Quando riapri la pagina, l’applicazione apre automaticamente l’ultimo elenco utilizzato e si posiziona vicino al suo ultimo elemento.',

notesHelp2Title: '2. Aggiungere versetti dalla Bibbia',

notesHelp2Body:
'Dalla pagina Lettura, seleziona uno o più versetti e usa il pulsante Note o Studi. I versetti vengono aggiunti agli elenchi scelti con il riferimento e il testo. Puoi selezionare più elenchi e salvare lo stesso versetto in luoghi diversi.',

notesHelp3Title: '3. Aggiungere blocchi di testo',

notesHelp3Body:
'Oltre ai versetti puoi aggiungere commenti, riflessioni, domande, preghiere, punti di predicazione o altri contenuti. «Aggiungi blocco di testo» è disponibile in alto e in basso nell’elenco aperto. Il pulsante + accanto a un elemento inserisce un blocco in quella posizione esatta. Ogni blocco può essere modificato, spostato o eliminato.',

notesHelp4Title: '4. Utilizzare e riordinare gli elementi',

notesHelp4Body:
'Apri il menu di un elemento per visualizzare le azioni disponibili. Un versetto può essere aperto in Lettura, copiato o condiviso. Un blocco di testo può essere copiato, condiviso o modificato. Le frecce Su e Giù cambiano l’ordine degli elementi. Ogni elemento può anche essere eliminato singolarmente.',

notesHelp5Title: '5. Copiare o condividere un intero elenco',

notesHelp5Body:
'Nel menu di un elenco di Note o di uno Studio, «Copia» e «Condividi» consentono di recuperare tutto il contenuto: titolo, riferimenti biblici, testi dei versetti e blocchi personali. Puoi quindi incollarlo in un messaggio o documento oppure inviarlo tramite un’applicazione compatibile.',

notesHelp6Title: '6. Condividere o trasferire con un codice The Word',

notesHelp6Body:
'Il pulsante «Codice» copia un codice compatto contenente il titolo e tutto il contenuto dell’elenco. Un altro utente di The Word può scegliere «Importa un codice» per ricrearlo sul proprio dispositivo. Puoi anche trasferire contenuti tra Note e Studi copiando il codice in una pagina e importandolo nell’altra.',

notesHelp7Title: '7. Importare un documento di testo',

notesHelp7Body:
'«Importa da testo» permette di incollare il contenuto di un documento, un’email, una predicazione o un piano di studio. Puoi conservarlo in un unico blocco oppure dividerlo automaticamente in più blocchi separati da righe vuote. Verrà creato un nuovo elenco o Studio con il titolo scelto.',

notesHelp8Title: '8. Archiviazione locale e copie di sicurezza',

notesHelp8Body:
'Note e Studi vengono salvati localmente sul dispositivo e non sono sincronizzati automaticamente con un account o un server. Se disinstalli l’applicazione, ne reimposti i dati o cancelli i dati del browser, il contenuto potrebbe essere eliminato definitivamente. Proteggi gli elenchi importanti con Copia, Condividi o un codice The Word.',

notesHelp9Title: '9. Alcune idee di utilizzo',

notesHelp9Body:
'Usa Note per conservare versetti da memorizzare, riflessioni quotidiane, preparazioni di predicazioni o elenchi di preghiera. Usa Studi per approfondire un tema o un libro, preparare un gruppo in casa, un piano didattico o una serie di messaggi.',

notesHelp10Title: '10. Combinare Note e Studi',

notesHelp10Body:
'Note e Studi possono essere utilizzati insieme. Raccogli rapidamente versetti, pensieri e preghiere nelle Note, quindi trasferisci negli Studi ciò che desideri approfondire mediante un codice The Word. Potrai poi riordinare, ampliare e condividere il contenuto.',
  // Common
  loading: "Caricamento...",
  error: "Errore durante il caricamento",
};

export default it;
