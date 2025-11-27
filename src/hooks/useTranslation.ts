// src/hooks/useTranslation.ts
import { useApp } from '../contexts/AppContext';
import type { Language } from '../types/bible';

/**
 * Dictionnaires de base pour toutes les langues supportées.
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

  // Reading – compléments
  chooseBook: 'Choisir un livre',
  chooseChapter: 'Choisir un chapitre',
  prevChapter: 'Chapitre précédent',
  nextChapter: 'Chapitre suivant',
  verseWord: 'verset',
  versesSelectedSuffix: 'verset(s) sélectionné(s)',
  toNotes: 'Vers Notes',
  toPrinciples: 'Vers Principes',
  copyLabel: 'Copier',
  shareLabel: 'Partager',
  cancel: 'Annuler',
  close: 'Fermer',
  notesModalTitle: 'Ajouter à une liste (Notes)',
  notesNoList: 'Aucune liste pour l’instant. Créez-en une ci-dessous.',
  notesNewListOptional: 'Nouvelle liste (optionnel)',
  principlesModalTitle: 'Ajouter à une étude (Principes)',
  principlesNoList: 'Aucune étude pour l’instant. Créez-en une ci-dessous.',
  principlesNewListOptional: 'Nouvelle étude (optionnel)',
  selectionCopied: 'Sélection copiée',
  textReadyToShare: 'Texte prêt à partager (copié)',
  addedToList: 'Ajouté à la liste',
  newRandom: 'Nouveau aléatoire',
  swipeLabel: 'Glissez',
  searchSlotLabel: 'Recherche',
  searchSlotEmpty: 'Recherche (vide)',
  memorySlotLabel: 'Mémoire',
  emptySlotSuffix: '(vide)',
  untitledList: '(sans titre)',

  // Petit libellé court pour “Copié”
  copiedShort: 'Copié',

  // *** Search page ***
  searchTitle: 'Recherche biblique',
  searchPlaceholder: 'Tapez votre recherche',
  searchMinChars: 'Saisissez au moins 2 caractères',
  searchSearching: 'Recherche en cours…',
  searchResults: 'Résultats',
  searchExpandAll: 'Tout ouvrir',
  searchCollapseAll: 'Tout fermer',
  searchNoResults: 'Aucun verset trouvé.',
  searchClear: 'Effacer',
  searchOpenInReading: 'Ouvrir dans Lecture',

  // Bloc Notes (page Notes)
  notesPage: {
    create: 'Créer une liste',
    placeholder: 'Titre de la liste…',
    empty: 'Aucune liste pour l’instant.',
    items: 'éléments',
    backAll: '← Toutes les listes',
    addTextBlock: 'Ajouter un bloc de texte',
    editTextBlock: 'Modifier le bloc',
    deleteItem: 'Supprimer',
    moveUp: 'Monter',
    moveDown: 'Descendre',
    open: 'Ouvrir',
    confirmDeleteItem: 'Supprimer cet élément ?',
    newTextPlaceholder: 'Votre texte…',

    // Partage / import via code
    shareCode: 'Code',
    importCode: 'Importer un code',
    importPrompt: 'Collez ici le code de partage TheWord :',
    importError: 'Code invalide.',
    importSuccess: 'Liste importée avec succès ✅',
    shareCodeCopied: 'Code copié dans le presse-papiers ✅',

    // Import direct depuis un texte
    importTextButton: 'Texte → Liste',
    importTextTitlePlaceholder: 'Titre de la nouvelle liste',
    importTextDefaultTitle: 'Import texte',
    importTextBodyPlaceholder: 'Colle ici ton texte…',
    importTextNoBody: 'Merci de coller un texte à importer.',
    importTextNoBlock:
      'Aucun bloc détecté (pense à laisser des lignes vides si tu découpes en blocs).',
    importTextSplitLabel:
      'Découper en blocs (séparés par au moins une ligne vide)',
    importTextInfo: 'Chaque bloc deviendra un élément dans la liste.',
    importTextCreate: 'Créer la liste',

    duplicateTitle: 'Un titre identique existe déjà.',
    confirmDeleteList: 'Supprimer cette liste ?',
    emptyList: 'Liste vide.',

    importFromTextTitle: 'Importer depuis un texte',
    documentContent: 'Contenu du document',
    renameList: 'Renommer',
  },

  // Bloc Principes (page Principes)
  principlesPage: {
    create: 'Créer une étude',
    placeholder: 'Titre de l’étude…',
    empty: 'Aucune étude pour l’instant.',
    items: 'éléments',
    backAll: '← Toutes les études',
    addTextBlock: 'Ajouter un bloc de texte',
    editTextBlock: 'Modifier le bloc',
    deleteItem: 'Supprimer',
    moveUp: 'Monter',
    moveDown: 'Descendre',
    open: 'Ouvrir',
    openReading: 'Ouvrir la lecture',
    confirmDeleteItem: 'Supprimer cet élément ?',
    newTextPlaceholder: 'Votre texte…',

    // Partage / import via code
    shareCode: 'Code',
    importCode: 'Importer un code',
    importPrompt: 'Collez ici le code de partage TheWord (note ou étude) :',
    importError: 'Code invalide.',
    importSuccess: 'Étude importée avec succès ✅',
    shareCodeCopied: 'Code copié dans le presse-papiers ✅',

    // Import direct depuis un texte
    importTextButton: 'Texte → Étude',
    importTextTitlePlaceholder: 'Titre de la nouvelle étude',
    importTextDefaultTitle: 'Import texte',
    importTextBodyPlaceholder: 'Colle ici ton texte…',
    importTextNoBody: 'Merci de coller un texte à importer.',
    importTextNoBlock:
      'Aucun bloc détecté (pense à laisser des lignes vides si tu découpes en blocs).',
    importTextSplitLabel:
      'Découper en blocs (séparés par au moins une ligne vide)',
    importTextInfo: 'Chaque bloc deviendra un élément dans l’étude.',
    importTextCreate: 'Créer l’étude',

    duplicateTitle: 'Une étude avec le même titre existe déjà.',
    confirmDeleteList: 'Supprimer cette étude ?',
    emptyList: 'Liste vide.',

    importFromTextTitle: 'Importer depuis un texte',
    documentContent: 'Contenu du document',
    renameList: 'Renommer',
    share: 'Partager',
    copy: 'Copier',
    deleteList: 'Supprimer',

    // Titres pour le partage natif
    shareStudyTitle: 'Étude',
    shareItemTitle: 'Verset',
  },

  // Settings page
  appearance: 'Apparence',
  lightMode: 'Mode Clair',
  darkMode: 'Mode Sombre',
  fontSize: 'Taille de police',
  language: 'Langue',
  french: 'Français',
  english: 'Anglais',
  fontSizeXLLabel: 'Mode Malvoyant (XL)',
  fontSizePreview: 'Aperçu de la taille de police sélectionnée.',
  updates: 'Mises à jour',
  updatesDescription:
    "Vérifie s'il existe une nouvelle version de l'application et applique-la.",
  applyUpdate: 'Appliquer la mise à jour',
  checkUpdatesButton: 'Vérifier les mises à jour',
  updatesChecking: 'Vérification en cours…',
  updatesUpToDate: "Votre application est à jour.",
  updatesReady:
    'Nouvelle version prête. Cliquez sur « Appliquer la mise à jour ».',
  updatesUnavailable:
    'Mise à jour automatique indisponible (Service Worker non détecté).',
  updatesError: 'Erreur lors de la vérification. Réessayez.',

  // About / versions
  aboutTitle: '',
  aboutDescription:
    'The Word vous permet de découvrir la parole de Dieu à travers des versets aléatoires et une lecture complète de la Bible.',
  aboutIntro:
    'TheWord : Lecture de la Bible hors-ligne, recherche instantanée, notes thématiques, partage en un geste. Retrouvez aussi TheWord sur le web : www.theword.fr',
  bibleVersions: 'Versions de la Bible',
  frenchVersion:
    'Français : Louis Segond 1910 (LSG)- Révision 2025 - Libre de droit',
  englishVersion: 'Anglais : King James Version (KJV) - Libre de droit',
  frenchVersionDetails:
    'Version de référence pour la Bible en français, traduite par Louis Segond en 1910 et révisée en 2025 (modernisation du vocabulaire/grammaire, fidélité aux manuscrits).',
  englishVersionDetails:
    'Version classique en anglais (KJV), publiée en 1611, révisée en 1769 et modernisation limitée en 2025.',
  otherLanguagesNote:
    "D'autres langues (Allemand, Portugais, etc.) sont en préparation. En attendant, l'interface utilise l'anglais si la traduction n'est pas encore disponible.",
  randomFeature: 'Fonctionnalité Aléatoire',
  randomFeatureDesc:
    'Notre générateur de versets aléatoires sélectionne parmi plus de 31,000 versets bibliques pour vous offrir une inspiration quotidienne.',
  musicLink: 'Musique du Créateur',
  versesLabel: 'Versets',
  booksLabel: 'Livres',
  readingShortcuts: 'Raccourcis de lecture',
  notesIntro:
    'Organisez vos passages favoris et vos pensées dans des listes thématiques.',
  notesPoint1: 'Ajoutez des versets ou des blocs de texte libre.',
  notesPoint2:
    'Touchez un élément pour afficher le menu (Ouvrir en Lecture, Monter/Descendre, Supprimer…).',
  notesPoint3: 'Renommez vos listes, copiez/partagez.',
  createdWithLove: 'Créé avec amour pour répandre la Parole de Dieu',
  versionsFootnote:
    'Toutes les versions bibliques utilisées sont dans le domaine public. Certaines ont été partiellement modernisées (vocabulaire, grammaire) tout en restant strictement fidèles aux manuscrits originaux.',

  // Quick slots / raccourcis lecture (About + Reading)
  quickSlotsIntro:
    'Ces 4 boutons, alignés à droite du sélecteur Livre/Chapitre, permettent de revenir instantanément sur vos lectures fréquentes pour lire plusieurs livres en parallèle : utilisez 1/2/3 pour 3 emplacements distincts, et la loupe pour reprendre le dernier passage (verset aléatoire ou recherche).',
  quickSlotsIllustrationLabel: 'Illustration des raccourcis',
  quickSlotLastPassageTooltip: 'Dernier passage',
  quickSlot1ActiveTooltip: 'Raccourci 1 (actif)',
  quickSlot2Tooltip: 'Raccourci 2',
  quickSlot3Tooltip: 'Raccourci 3',

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

  // Reading – extras
  chooseBook: 'Choose a book',
  chooseChapter: 'Choose a chapter',
  prevChapter: 'Previous chapter',
  nextChapter: 'Next chapter',
  verseWord: 'verse',
  versesSelectedSuffix: 'verse(s) selected',
  toNotes: 'To Notes',
  toPrinciples: 'To Principles',
  copyLabel: 'Copy',
  shareLabel: 'Share',
  cancel: 'Cancel',
  close: 'Close',
  notesModalTitle: 'Add to a list (Notes)',
  notesNoList: 'No list yet. Create one below.',
  notesNewListOptional: 'New list (optional)',
  principlesModalTitle: 'Add to a study (Principles)',
  principlesNoList: 'No study yet. Create one below.',
  principlesNewListOptional: 'New study (optional)',
  selectionCopied: 'Selection copied',
  textReadyToShare: 'Text ready to share (copied)',
  addedToList: 'Added to list',
  newRandom: 'New random',
  swipeLabel: 'Swipe',
  searchSlotLabel: 'Search',
  searchSlotEmpty: 'Search (empty)',
  memorySlotLabel: 'Slot',
  emptySlotSuffix: '(empty)',
  untitledList: '(untitled)',

  // Short label “Copied”
  copiedShort: 'Copied',

  // *** Search page ***
  searchTitle: 'Bible search',
  searchPlaceholder: 'Type your search',
  searchMinChars: 'Type at least 2 characters to search.',
  searchSearching: 'Searching…',
  searchResults: 'Results',
  searchExpandAll: 'Expand all',
  searchCollapseAll: 'Collapse all',
  searchNoResults: 'No verses found.',
  searchClear: 'Clear',
  searchOpenInReading: 'Open in Reading',

  // Notes page block
  notesPage: {
    create: 'Create list',
    placeholder: 'List title…',
    empty: 'No lists yet.',
    items: 'items',
    backAll: '← All lists',
    addTextBlock: 'Add text block',
    editTextBlock: 'Edit block',
    deleteItem: 'Delete',
    moveUp: 'Move up',
    moveDown: 'Move down',
    open: 'Open',
    confirmDeleteItem: 'Delete this item?',
    newTextPlaceholder: 'Your text…',

    // Share / import via code
    shareCode: 'Code',
    importCode: 'Import code',
    importPrompt: 'Paste the TheWord share code here:',
    importError: 'Invalid code.',
    importSuccess: 'List imported successfully ✅',
    shareCodeCopied: 'Code copied to clipboard ✅',

    // Direct import from text
    importTextButton: 'Text → List',
    importTextTitlePlaceholder: 'New list title',
    importTextDefaultTitle: 'Text import',
    importTextBodyPlaceholder: 'Paste your text here…',
    importTextNoBody: 'Please paste some text to import.',
    importTextNoBlock:
      'No block detected (add blank lines if you want to split into blocks).',
    importTextSplitLabel:
      'Split into blocks (separated by at least one empty line)',
    importTextInfo: 'Each block will become an item in the list.',
    importTextCreate: 'Create list',

    duplicateTitle: 'A list with the same title already exists.',
    confirmDeleteList: 'Delete this list?',
    emptyList: 'Empty list.',

    importFromTextTitle: 'Import from text',
    documentContent: 'Document content',
    renameList: 'Rename',
  },

  // Principles block (Principes page)
  principlesPage: {
    create: 'Create study',
    placeholder: 'Study title…',
    empty: 'No studies yet.',
    items: 'items',
    backAll: '← All studies',
    addTextBlock: 'Add text block',
    editTextBlock: 'Edit block',
    deleteItem: 'Delete',
    moveUp: 'Move up',
    moveDown: 'Move down',
    open: 'Open',
    openReading: 'Open Reading',
    confirmDeleteItem: 'Delete this item?',
    newTextPlaceholder: 'Your text…',

    // Share / import via code
    shareCode: 'Code',
    importCode: 'Import code',
    importPrompt: 'Paste the TheWord share code (note or study) here:',
    importError: 'Invalid code.',
    importSuccess: 'Study imported successfully ✅',
    shareCodeCopied: 'Code copied to clipboard ✅',

    // Direct import from text
    importTextButton: 'Text → Study',
    importTextTitlePlaceholder: 'New study title',
    importTextDefaultTitle: 'Text import',
    importTextBodyPlaceholder: 'Paste your text here…',
    importTextNoBody: 'Please paste some text to import.',
    importTextNoBlock:
      'No block detected (add blank lines if you split into blocks).',
    importTextSplitLabel:
      'Split into blocks (separated by at least one empty line)',
    importTextInfo: 'Each block will become an item in the study.',
    importTextCreate: 'Create study',

    duplicateTitle: 'A study with the same title already exists.',
    confirmDeleteList: 'Delete this study?',
    emptyList: 'Empty list.',

    importFromTextTitle: 'Import from text',
    documentContent: 'Document content',
    renameList: 'Rename',
    share: 'Share',
    copy: 'Copy',
    deleteList: 'Delete',

    // Titles for native share
    shareStudyTitle: 'Study',
    shareItemTitle: 'Verse',
  },

  // Settings page
  appearance: 'Appearance',
  lightMode: 'Light Mode',
  darkMode: 'Dark Mode',
  fontSize: 'Font Size',
  language: 'Language',
  french: 'French',
  english: 'English',
  fontSizeXLLabel: 'Low-vision mode (XL)',
  fontSizePreview: 'Preview of the selected font size.',
  updates: 'Updates',
  updatesDescription: 'Check if a new version is available and apply it.',
  applyUpdate: 'Apply update',
  checkUpdatesButton: 'Check for updates',
  updatesChecking: 'Checking…',
  updatesUpToDate: 'Your app is up to date.',
  updatesReady: 'New version ready. Click “Apply update”.',
  updatesUnavailable: 'Automatic update unavailable (No Service Worker).',
  updatesError: 'Error while checking. Please try again.',

  // About page
  aboutTitle: '',
  aboutDescription:
    "The Word allows you to discover God's word through random verses and complete Bible reading.",
  aboutIntro:
    'TheWord: offline reading, instant search, thematic notes, one-tap sharing. You can also use TheWord on the web: www.theword.fr',
  bibleVersions: 'Bible Versions',
  frenchVersion: 'French: Louis Segond 1910 (LSG) - Public Domain',
  englishVersion: 'English: King James Version (KJV) - Public Domain',
  frenchVersionDetails:
    'Reference French Bible, translated by Louis Segond in 1910 and refreshed in 2025 (modernized wording/grammar, faithful to the manuscripts).',
  englishVersionDetails:
    'Classic English version (KJV), published in 1611, revised in 1769, with a limited 2025 refresh.',
  otherLanguagesNote:
    'More languages (German, Portuguese, etc.) are in preparation. Until then, the interface falls back to English when a translation is not yet available.',
  randomFeature: 'Random Feature',
  randomFeatureDesc:
    'Our random verse generator selects from over 31,000 biblical verses to provide you with daily inspiration.',
  musicLink: "Creator's Music",
  versesLabel: 'Verses',
  booksLabel: 'Books',
  readingShortcuts: 'Reading shortcuts',
  notesIntro:
    'Organize favorite passages and personal thoughts into thematic lists.',
  notesPoint1: 'Add verses or free-text blocks.',
  notesPoint2:
    'Tap an item to open its menu (Open in Reading, Move up/down, Delete…).',
  notesPoint3: 'Rename lists, copy/share.',
  createdWithLove: "Created with love to spread God's Word",
  versionsFootnote:
    'All Bible versions used are in the public domain. Some have been partially modernized (vocabulary, grammar) while remaining strictly faithful to the original manuscripts.',

  // Quick slots / reading shortcuts (About + Reading)
  quickSlotsIntro:
    'These 4 buttons, aligned to the right of the Book/Chapter selector, let you jump back to frequent readings to follow several books in parallel: use 1/2/3 for three locations, and the magnifier to resume the last passage (random verse or search).',
  quickSlotsIllustrationLabel: 'Shortcuts illustration',
  quickSlotLastPassageTooltip: 'Last passage',
  quickSlot1ActiveTooltip: 'Shortcut 1 (active)',
  quickSlot2Tooltip: 'Shortcut 2',
  quickSlot3Tooltip: 'Shortcut 3',

  // Common
  loading: 'Loading...',
  error: 'Error loading content',
};

// Spanish translations
const esTranslations = {
  // Navigation
  home: 'Inicio',
  reading: 'Lectura',
  search: 'Buscar',
  settings: 'Ajustes',
  about: 'Acerca de',
  notes: 'Notas',
  principles: 'Estudios',

  // Home page
  randomVerse: 'Versículo aleatorio',
  newVerse: 'Nuevo versículo',
  copyVerse: 'Copiar versículo',
  verseCopied: '¡Versículo copiado!',
  godSpeaks: 'Dios te habla',
  openJeremiah: 'Abrir Jeremías 23:29',
  jeremiah23Quote:
    '«¿No es mi palabra como fuego, dice Jehová, y como martillo que quebranta la piedra?» Jeremías 23:29',

  // Reading page
  selectBook: 'Selecciona un libro',
  selectChapter: 'Selecciona un capítulo',
  chapter: 'Capítulo',
  oldTestament: 'Antiguo Testamento',
  newTestament: 'Nuevo Testamento',

  // Reading – extras
  chooseBook: 'Elegir un libro',
  chooseChapter: 'Elegir un capítulo',
  prevChapter: 'Capítulo anterior',
  nextChapter: 'Capítulo siguiente',
  verseWord: 'versículo',
  versesSelectedSuffix: 'versículo(s) seleccionado(s)',
  toNotes: 'Ir a Notas',
  toPrinciples: 'Ir a Estudios',
  copyLabel: 'Copiar',
  shareLabel: 'Compartir',
  cancel: 'Cancelar',
  close: 'Cerrar',
  notesModalTitle: 'Añadir a una lista (Notas)',
  notesNoList: 'Todavía no hay listas. Crea una abajo.',
  notesNewListOptional: 'Nueva lista (opcional)',
  principlesModalTitle: 'Añadir a un estudio (Estudios)',
  principlesNoList: 'Todavía no hay estudios. Crea uno abajo.',
  principlesNewListOptional: 'Nuevo estudio (opcional)',
  selectionCopied: 'Selección copiada',
  textReadyToShare: 'Texto listo para compartir (copiado)',
  addedToList: 'Añadido a la lista',
  newRandom: 'Nuevo aleatorio',
  swipeLabel: 'Desliza',
  searchSlotLabel: 'Buscar',
  searchSlotEmpty: 'Buscar (vacío)',
  memorySlotLabel: 'Memoria',
  emptySlotSuffix: '(vacío)',
  untitledList: '(sin título)',

  // Short label “Copied”
  copiedShort: 'Copiado',

  // *** Search page ***
  searchTitle: 'Búsqueda bíblica',
  searchPlaceholder: 'Escribe tu búsqueda',
  searchMinChars: 'Escribe al menos 2 caracteres.',
  searchSearching: 'Buscando…',
  searchResults: 'Resultados',
  searchExpandAll: 'Abrir todo',
  searchCollapseAll: 'Cerrar todo',
  searchNoResults: 'No se encontraron versículos.',
  searchClear: 'Borrar',
  searchOpenInReading: 'Abrir en Lectura',

  // Bloc Notes (page Notes)
  notesPage: {
    create: 'Crear lista',
    placeholder: 'Título de la lista…',
    empty: 'Todavía no hay listas.',
    items: 'elementos',
    backAll: '← Todas las listas',
    addTextBlock: 'Añadir bloque de texto',
    editTextBlock: 'Editar bloque',
    deleteItem: 'Eliminar',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    open: 'Abrir',
    confirmDeleteItem: '¿Eliminar este elemento?',
    newTextPlaceholder: 'Tu texto…',

    // Compartir / importar por código
    shareCode: 'Código',
    importCode: 'Importar código',
    importPrompt: 'Pega aquí el código de compartición de TheWord:',
    importError: 'Código no válido.',
    importSuccess: 'Lista importada correctamente ✅',
    shareCodeCopied: 'Código copiado al portapapeles ✅',

    // Importar directamente desde un texto
    importTextButton: 'Texto → Lista',
    importTextTitlePlaceholder: 'Título de la nueva lista',
    importTextDefaultTitle: 'Importar texto',
    importTextBodyPlaceholder: 'Pega aquí tu texto…',
    importTextNoBody: 'Por favor, pega el texto a importar.',
    importTextNoBlock:
      'No se ha detectado ningún bloque (recuerda dejar líneas vacías si quieres separar en bloques).',
    importTextSplitLabel:
      'Dividir en bloques (separados por al menos una línea vacía)',
    importTextInfo: 'Cada bloque se convertirá en un elemento de la lista.',
    importTextCreate: 'Crear lista',

    duplicateTitle: 'Ya existe un título idéntico.',
    confirmDeleteList: '¿Eliminar esta lista?',
    emptyList: 'Lista vacía.',

    importFromTextTitle: 'Importar desde un texto',
    documentContent: 'Contenido del documento',
    renameList: 'Renombrar',
  },

  // Bloc Principes (page Principes)
  principlesPage: {
    create: 'Crear estudio',
    placeholder: 'Título del estudio…',
    empty: 'Todavía no hay estudios.',
    items: 'elementos',
    backAll: '← Todos los estudios',
    addTextBlock: 'Añadir bloque de texto',
    editTextBlock: 'Editar bloque',
    deleteItem: 'Eliminar',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    open: 'Abrir',
    openReading: 'Abrir Lectura',
    confirmDeleteItem: '¿Eliminar este elemento?',
    newTextPlaceholder: 'Tu texto…',

    // Compartir / importar por código
    shareCode: 'Código',
    importCode: 'Importar código',
    importPrompt:
      'Pega aquí el código de compartición de TheWord (nota o estudio):',
    importError: 'Código no válido.',
    importSuccess: 'Estudio importado correctamente ✅',
    shareCodeCopied: 'Código copiado al portapapeles ✅',

    // Importar directamente desde un texto
    importTextButton: 'Texto → Estudio',
    importTextTitlePlaceholder: 'Título del nuevo estudio',
    importTextDefaultTitle: 'Importar texto',
    importTextBodyPlaceholder: 'Pega aquí tu texto…',
    importTextNoBody: 'Por favor, pega el texto a importar.',
    importTextNoBlock:
      'No se ha detectado ningún bloque (recuerda dejar líneas vacías si quieres separar en bloques).',
    importTextSplitLabel:
      'Dividir en bloques (separados por al menos una línea vacía)',
    importTextInfo: 'Cada bloque se convertirá en un elemento del estudio.',
    importTextCreate: 'Crear estudio',

    duplicateTitle: 'Ya existe un estudio con el mismo título.',
    confirmDeleteList: '¿Eliminar este estudio?',
    emptyList: 'Estudio vacío.',

    importFromTextTitle: 'Importar desde un texto',
    documentContent: 'Contenido del documento',
    renameList: 'Renombrar',
    share: 'Compartir',
    copy: 'Copiar',
    deleteList: 'Eliminar',

    // Títulos para compartir nativo
    shareStudyTitle: 'Estudio',
    shareItemTitle: 'Versículo',
  },

  // Settings page
  appearance: 'Apariencia',
  lightMode: 'Modo claro',
  darkMode: 'Modo oscuro',
  fontSize: 'Tamaño de letra',
  language: 'Idioma',
  french: 'Francés',
  english: 'Inglés',
  fontSizeXLLabel: 'Modo para baja visión (XL)',
  fontSizePreview: 'Vista previa del tamaño de letra seleccionado.',
  updates: 'Actualizaciones',
  updatesDescription:
    'Comprueba si hay una nueva versión disponible y aplícala.',
  applyUpdate: 'Aplicar actualización',
  checkUpdatesButton: 'Buscar actualizaciones',
  updatesChecking: 'Comprobando…',
  updatesUpToDate: 'Tu aplicación está actualizada.',
  updatesReady:
    'Nueva versión lista. Pulsa «Aplicar actualización».',
  updatesUnavailable:
    'Actualización automática no disponible (no se ha detectado Service Worker).',
  updatesError: 'Error al comprobar. Inténtalo de nuevo.',

  // About page
  aboutTitle: '',
  aboutDescription:
    'The Word te permite descubrir la Palabra de Dios mediante versículos aleatorios y la lectura completa de la Biblia.',
  aboutIntro:
    'TheWord: lectura de la Biblia sin conexión, búsqueda instantánea, notas temáticas, compartir con un gesto. También puedes usar TheWord en la web: www.theword.fr',
  bibleVersions: 'Versiones de la Biblia',
  frenchVersion:
    'Francés: Louis Segond 1910 (LSG) – Revisión 2025 – Dominio público',
  englishVersion:
    'Inglés: King James Version (KJV) – Dominio público',
  frenchVersionDetails:
    'Versión de referencia en francés, traducida por Louis Segond en 1910 y revisada en 2025 (modernización del vocabulario y la gramática, fiel a los manuscritos).',
  englishVersionDetails:
    'Versión clásica en inglés (KJV), publicada en 1611, revisada en 1769 y ligeramente actualizada en 2025.',
  otherLanguagesNote:
    'Otros idiomas (alemán, portugués, etc.) están en preparación. Mientras tanto, la interfaz usa el inglés si la traducción aún no está disponible.',
  randomFeature: 'Función aleatoria',
  randomFeatureDesc:
    'Nuestro generador de versículos aleatorios selecciona entre más de 31.000 versículos bíblicos para ofrecerte inspiración diaria.',
  musicLink: 'Música del Creador',
  versesLabel: 'Versículos',
  booksLabel: 'Libros',
  readingShortcuts: 'Atajos de lectura',
  notesIntro:
    'Organiza tus pasajes favoritos y tus pensamientos en listas temáticas.',
  notesPoint1: 'Añade versículos o bloques de texto libre.',
  notesPoint2:
    'Toca un elemento para mostrar el menú (Abrir en Lectura, Subir/Bajar, Eliminar…).',
  notesPoint3: 'Renombra tus listas, copia y comparte.',
  createdWithLove:
    'Creado con amor para difundir la Palabra de Dios',
  versionsFootnote:
    'Todas las versiones bíblicas utilizadas son de dominio público. Algunas han sido parcialmente modernizadas (vocabulario, gramática) manteniéndose estrictamente fieles a los manuscritos originales.',

  // Quick slots / reading shortcuts
  quickSlotsIntro:
    'Estos 4 botones, alineados a la derecha del selector Libro/Capítulo, permiten volver al instante a tus lecturas frecuentes para seguir varios libros en paralelo: usa 1/2/3 para tres posiciones distintas y la lupa para retomar el último pasaje (versículo aleatorio o búsqueda).',
  quickSlotsIllustrationLabel: 'Ilustración de los atajos',
  quickSlotLastPassageTooltip: 'Último pasaje',
  quickSlot1ActiveTooltip: 'Atajo 1 (activo)',
  quickSlot2Tooltip: 'Atajo 2',
  quickSlot3Tooltip: 'Atajo 3',

  // Common
  loading: 'Cargando...',
  error: 'Error al cargar',
};

// Russian translations – calqués sur le français de l’appli
const ruTranslations = {
  // Navigation
  home: 'Главная',
  reading: 'Чтение',
  search: 'Поиск',
  settings: 'Настройки',
  about: 'О приложении',
  notes: 'Заметки',
  principles: 'Принципы',

  // Home page
  randomVerse: 'Случайный стих',
  newVerse: 'Новый стих',
  copyVerse: 'Копировать стих',
  verseCopied: 'Стих скопирован!',
  godSpeaks: 'Бог говорит вам',
  openJeremiah: 'Открыть Иеремию 23:29',
  jeremiah23Quote:
    '«Не подобно ли слово Мое огню, говорит Господь, и как молот, разбивающий скалу?» Иеремия 23:29',

  // Reading page
  selectBook: 'Выберите книгу',
  selectChapter: 'Выберите главу',
  chapter: 'Глава',
  oldTestament: 'Ветхий Завет',
  newTestament: 'Новый Завет',

  // Reading – compléments
  chooseBook: 'Выбрать книгу',
  chooseChapter: 'Выбрать главу',
  prevChapter: 'Предыдущая глава',
  nextChapter: 'Следующая глава',
  verseWord: 'стих',
  versesSelectedSuffix: 'выбранные стихи',
  toNotes: 'К заметкам',
  toPrinciples: 'К принципам',
  copyLabel: 'Копировать',
  shareLabel: 'Поделиться',
  cancel: 'Отмена',
  close: 'Закрыть',
  notesModalTitle: 'Добавить в список (Заметки)',
  notesNoList: 'Пока нет ни одного списка. Создайте его ниже.',
  notesNewListOptional: 'Новый список (необязательно)',
  principlesModalTitle: 'Добавить в исследование (Принципы)',
  principlesNoList: 'Пока нет ни одного исследования. Создайте его ниже.',
  principlesNewListOptional: 'Новое исследование (необязательно)',
  selectionCopied: 'Выделение скопировано',
  textReadyToShare: 'Текст готов к отправке (скопирован)',
  addedToList: 'Добавлено в список',
  newRandom: 'Новый случайный',
  swipeLabel: 'Смахните',
  searchSlotLabel: 'Поиск',
  searchSlotEmpty: 'Поиск (пусто)',
  memorySlotLabel: 'Ячейка',
  emptySlotSuffix: '(пусто)',
  untitledList: '(без названия)',

  // Petit libellé court pour “Copié”
  copiedShort: 'Скопировано',

  // *** Search page ***
  searchTitle: 'Библейский поиск',
  searchPlaceholder: 'Введите запрос',
  searchMinChars: 'Введите как минимум 2 символа.',
  searchSearching: 'Поиск…',
  searchResults: 'Результаты',
  searchExpandAll: 'Открыть всё',
  searchCollapseAll: 'Свернуть всё',
  searchNoResults: 'Стихи не найдены.',
  searchClear: 'Очистить',
  searchOpenInReading: 'Открыть в Чтении',

  // Bloc Notes (page Notes)
  notesPage: {
    create: 'Создать список',
    placeholder: 'Название списка…',
    empty: 'Пока нет ни одного списка.',
    items: 'элементов',
    backAll: '← Все списки',
    addTextBlock: 'Добавить текстовый блок',
    editTextBlock: 'Изменить блок',
    deleteItem: 'Удалить',
    moveUp: 'Переместить вверх',
    moveDown: 'Переместить вниз',
    open: 'Открыть',
    confirmDeleteItem: 'Удалить этот элемент?',
    newTextPlaceholder: 'Ваш текст…',

    // Partage / import via code
    shareCode: 'Код',
    importCode: 'Импортировать код',
    importPrompt: 'Вставьте сюда код общего доступа TheWord:',
    importError: 'Недействительный код.',
    importSuccess: 'Список успешно импортирован ✅',
    shareCodeCopied: 'Код скопирован в буфер обмена ✅',

    // Import direct depuis un texte
    importTextButton: 'Текст → Список',
    importTextTitlePlaceholder: 'Название нового списка',
    importTextDefaultTitle: 'Импорт текста',
    importTextBodyPlaceholder: 'Вставьте сюда ваш текст…',
    importTextNoBody: 'Пожалуйста, вставьте текст для импорта.',
    importTextNoBlock:
      'Не найдено ни одного блока (оставьте пустые строки, если хотите разделить текст на блоки).',
    importTextSplitLabel:
      'Разделить на блоки (отделены как минимум одной пустой строкой)',
    importTextInfo: 'Каждый блок станет отдельным элементом списка.',
    importTextCreate: 'Создать список',

    duplicateTitle: 'Список с таким названием уже существует.',
    confirmDeleteList: 'Удалить этот список?',
    emptyList: 'Список пуст.',

    importFromTextTitle: 'Импортировать из текста',
    documentContent: 'Содержание документа',
    renameList: 'Переименовать',
  },

  // Bloc Principes (page Principes)
  principlesPage: {
    create: 'Создать исследование',
    placeholder: 'Название исследования…',
    empty: 'Пока нет ни одного исследования.',
    items: 'элементов',
    backAll: '← Все исследования',
    addTextBlock: 'Добавить текстовый блок',
    editTextBlock: 'Изменить блок',
    deleteItem: 'Удалить',
    moveUp: 'Переместить вверх',
    moveDown: 'Переместить вниз',
    open: 'Открыть',
    openReading: 'Открыть чтение',
    confirmDeleteItem: 'Удалить этот элемент?',
    newTextPlaceholder: 'Ваш текст…',

    // Partage / import via code
    shareCode: 'Код',
    importCode: 'Импортировать код',
    importPrompt:
      'Вставьте сюда код общего доступа TheWord (заметка или исследование):',
    importError: 'Недействительный код.',
    importSuccess: 'Исследование успешно импортировано ✅',
    shareCodeCopied: 'Код скопирован в буфер обмена ✅',

    // Import direct depuis un texte
    importTextButton: 'Текст → Исследование',
    importTextTitlePlaceholder: 'Название нового исследования',
    importTextDefaultTitle: 'Импорт текста',
    importTextBodyPlaceholder: 'Вставьте сюда ваш текст…',
    importTextNoBody: 'Пожалуйста, вставьте текст для импорта.',
    importTextNoBlock:
      'Не найдено ни одного блока (оставьте пустые строки, если хотите разделить текст на блоки).',
    importTextSplitLabel:
      'Разделить на блоки (отделены как минимум одной пустой строкой)',
    importTextInfo: 'Каждый блок станет отдельным элементом исследования.',
    importTextCreate: 'Создать исследование',

    duplicateTitle: 'Исследование с таким названием уже существует.',
    confirmDeleteList: 'Удалить это исследование?',
    emptyList: 'Исследование пусто.',

    importFromTextTitle: 'Импортировать из текста',
    documentContent: 'Содержание документа',
    renameList: 'Переименовать',
    share: 'Поделиться',
    copy: 'Копировать',
    deleteList: 'Удалить',

    // Titres pour le partage natif
    shareStudyTitle: 'Исследование',
    shareItemTitle: 'Стих',
  },

  // Settings page
  appearance: 'Оформление',
  lightMode: 'Светлая тема',
  darkMode: 'Тёмная тема',
  fontSize: 'Размер шрифта',
  language: 'Язык',
  french: 'Французский',
  english: 'Английский',
  fontSizeXLLabel: 'Режим для слабовидящих (XL)',
  fontSizePreview: 'Пример выбранного размера шрифта.',
  updates: 'Обновления',
  updatesDescription:
    'Проверяет, доступна ли новая версия приложения, и применяет её.',
  applyUpdate: 'Применить обновление',
  checkUpdatesButton: 'Проверить обновления',
  updatesChecking: 'Проверка…',
  updatesUpToDate: 'Приложение обновлено.',
  updatesReady: 'Новая версия готова. Нажмите «Применить обновление».',
  updatesUnavailable:
    'Автоматическое обновление недоступно (Service Worker не найден).',
  updatesError: 'Ошибка при проверке. Повторите попытку.',

  // About page
  aboutTitle: '',
  aboutDescription:
    'The Word помогает вам открывать Слово Божье через случайные стихи и последовательное чтение всей Библии.',
  aboutIntro:
    'TheWord: офлайн-чтение Библии, мгновенный поиск, тематические заметки, возможность делиться в один жест. Также используйте TheWord в интернете: www.theword.fr',
  bibleVersions: 'Переводы Библии',
  frenchVersion:
    'Французский: Louis Segond 1910 (LSG) – редакция 2025 – общественное достояние',
  englishVersion:
    'Английский: King James Version (KJV) – общественное достояние',
  frenchVersionDetails:
    'Версия Библии на французском языке, переведённая Луи Сегоном в 1910 году и обновлённая в 2025 году (обновлённая лексика и грамматика, верность рукописям).',
  englishVersionDetails:
    'Классический английский перевод (KJV), опубликованный в 1611 году, пересмотренный в 1769 году и слегка обновлённый в 2025 году.',
  otherLanguagesNote:
    'Другие языки (немецкий, португальский и др.) находятся в разработке. Пока нет перевода, интерфейс отображается на английском.',
  randomFeature: 'Функция «Случайный стих»',
  randomFeatureDesc:
    'Наш генератор случайных стихов выбирает из более чем 31 000 библейских стихов, чтобы ежедневно вдохновлять вас.',
  musicLink: 'Музыка Творца',
  versesLabel: 'Стихи',
  booksLabel: 'Книги',
  readingShortcuts: 'Быстрые переходы для чтения',
  notesIntro:
    'Организуйте избранные отрывки и личные мысли в тематические списки.',
  notesPoint1: 'Добавляйте стихи или произвольные текстовые блоки.',
  notesPoint2:
    'Нажмите на элемент, чтобы открыть меню (Открыть в Чтении, Переместить вверх/вниз, Удалить…).',
  notesPoint3: 'Переименовывайте списки, копируйте и делитесь.',
  createdWithLove: 'Создано с любовью, чтобы распространять Слово Божье',
  versionsFootnote:
    'Все используемые переводы Библии находятся в общественном достоянии. Некоторые из них частично модернизированы (лексика, грамматика), при этом строго сохраняя верность оригинальным рукописям.',

  // Quick slots / raccourcis lecture (About + Reading)
  quickSlotsIntro:
    'Эти 4 кнопки, расположенные справа от выбора Книга/Глава, позволяют мгновенно возвращаться к часто читаемым местам и параллельно следить за несколькими книгами: используйте 1/2/3 для трёх ячеек, а лупу — чтобы вернуться к последнему месту (случайный стих или результат поиска).',
  quickSlotsIllustrationLabel: 'Иллюстрация быстрых переходов',
  quickSlotLastPassageTooltip: 'Последний отрывок',
  quickSlot1ActiveTooltip: 'Быстрый переход 1 (активен)',
  quickSlot2Tooltip: 'Быстрый переход 2',
  quickSlot3Tooltip: 'Быстрый переход 3',

  // Common
  loading: 'Загрузка...',
  error: 'Ошибка при загрузке',
};

// German translations
const deTranslations = {
  // Navigation
  home: "Startseite",
  reading: "Lesen",
  search: "Suche",
  settings: "Einstellungen",
  about: "Info",
  notes: "Notizen",
  principles: "Studien",

  // Home page
  randomVerse: "Zufälliger Vers",
  newVerse: "Neuer Vers",
  copyVerse: "Vers kopieren",
  verseCopied: "Vers kopiert!",
  godSpeaks: "Gott spricht zu dir",
  openJeremiah: "Jeremia 23,29 öffnen",
  jeremiah23Quote:
    "„Ist mein Wort nicht wie ein Feuer, spricht der HERR, und wie ein Hammer, der Felsen zerschmettert?“ Jeremia 23,29",

  // Reading page
  selectBook: "Buch wählen",
  selectChapter: "Kapitel wählen",
  chapter: "Kapitel",
  oldTestament: "Altes Testament",
  newTestament: "Neues Testament",

  // Reading – extras
  chooseBook: "Buch auswählen",
  chooseChapter: "Kapitel auswählen",
  prevChapter: "Vorheriges Kapitel",
  nextChapter: "Nächstes Kapitel",
  verseWord: "Vers",
  versesSelectedSuffix: "ausgewählte Verse",
  toNotes: "Zu den Notizen",
  toPrinciples: "Zu den Studien",
  copyLabel: "Kopieren",
  shareLabel: "Teilen",
  cancel: "Abbrechen",
  close: "Schließen",
  notesModalTitle: "Zur Liste hinzufügen (Notizen)",
  notesNoList: "Noch keine Listen. Lege unten eine an.",
  notesNewListOptional: "Neue Liste (optional)",
  principlesModalTitle: "Zu einer Studie hinzufügen (Studien)",
  principlesNoList: "Noch keine Studien. Lege unten eine an.",
  principlesNewListOptional: "Neue Studie (optional)",
  selectionCopied: "Auswahl kopiert",
  textReadyToShare: "Text zum Teilen bereit (kopiert)",
  addedToList: "Zur Liste hinzugefügt",
  newRandom: "Neuer Zufallsvers",
  swipeLabel: "Wischen",
  searchSlotLabel: "Suche",
  searchSlotEmpty: "Suche (leer)",
  memorySlotLabel: "Speicher",
  emptySlotSuffix: "(leer)",
  untitledList: "(ohne Titel)",

  // Short label “Copied”
  copiedShort: "Kopiert",

  // Search page
  searchTitle: "Bibel-Suche",
  searchPlaceholder: "Suchbegriff eingeben",
  searchMinChars: "Gib mindestens 2 Zeichen ein.",
  searchSearching: "Suche läuft…",
  searchResults: "Ergebnisse",
  searchExpandAll: "Alle öffnen",
  searchCollapseAll: "Alle schließen",
  searchNoResults: "Keine Verse gefunden.",
  searchClear: "Löschen",
  searchOpenInReading: "In „Lesen“ öffnen",

  // Notes page
  notesPage: {
    create: "Liste erstellen",
    placeholder: "Listentitel…",
    empty: "Noch keine Listen.",
    items: "Elemente",
    backAll: "← Alle Listen",
    addTextBlock: "Textblock hinzufügen",
    editTextBlock: "Block bearbeiten",
    deleteItem: "Löschen",
    moveUp: "Nach oben",
    moveDown: "Nach unten",
    open: "Öffnen",
    confirmDeleteItem: "Dieses Element löschen?",
    newTextPlaceholder: "Dein Text…",

    shareCode: "Code",
    importCode: "Code importieren",
    importPrompt: "Füge hier den TheWord-Freigabecode ein:",
    importError: "Ungültiger Code.",
    importSuccess: "Liste erfolgreich importiert ✅",
    shareCodeCopied: "Code in die Zwischenablage kopiert ✅",

    importTextButton: "Text → Liste",
    importTextTitlePlaceholder: "Titel der neuen Liste",
    importTextDefaultTitle: "Textimport",
    importTextBodyPlaceholder: "Füge deinen Text hier ein…",
    importTextNoBody: "Bitte füge einen zu importierenden Text ein.",
    importTextNoBlock:
      "Kein Block erkannt (lasse Leerzeilen, wenn du in Blöcke aufteilen möchtest).",
    importTextSplitLabel:
      "In Blöcke aufteilen (getrennt durch mindestens eine Leerzeile)",
    importTextInfo: "Jeder Block wird zu einem Element der Liste.",
    importTextCreate: "Liste erstellen",

    duplicateTitle:
      "Es existiert bereits eine Liste mit demselben Titel.",
    confirmDeleteList: "Diese Liste löschen?",
    emptyList: "Leere Liste.",

    importFromTextTitle: "Aus Text importieren",
    documentContent: "Dokumentinhalt",
    renameList: "Umbenennen",
  },

  // Principles page
  principlesPage: {
    create: "Studie erstellen",
    placeholder: "Titel der Studie…",
    empty: "Noch keine Studien.",
    items: "Elemente",
    backAll: "← Alle Studien",
    addTextBlock: "Textblock hinzufügen",
    editTextBlock: "Block bearbeiten",
    deleteItem: "Löschen",
    moveUp: "Nach oben",
    moveDown: "Nach unten",
    open: "Öffnen",
    openReading: "Lesen öffnen",
    confirmDeleteItem: "Dieses Element löschen?",
    newTextPlaceholder: "Dein Text…",

    shareCode: "Code",
    importCode: "Code importieren",
    importPrompt:
      "Füge hier den TheWord-Freigabecode (Notiz oder Studie) ein:",
    importError: "Ungültiger Code.",
    importSuccess: "Studie erfolgreich importiert ✅",
    shareCodeCopied: "Code in die Zwischenablage kopiert ✅",

    importTextButton: "Text → Studie",
    importTextTitlePlaceholder: "Titel der neuen Studie",
    importTextDefaultTitle: "Textimport",
    importTextBodyPlaceholder: "Füge deinen Text hier ein…",
    importTextNoBody: "Bitte füge einen zu importierenden Text ein.",
    importTextNoBlock:
      "Kein Block erkannt (lasse Leerzeilen, wenn du in Blöcke aufteilen möchtest).",
    importTextSplitLabel:
      "In Blöcke aufteilen (getrennt durch mindestens eine Leerzeile)",
    importTextInfo: "Jeder Block wird zu einem Element der Studie.",
    importTextCreate: "Studie erstellen",

    duplicateTitle:
      "Eine Studie mit demselben Titel existiert bereits.",
    confirmDeleteList: "Diese Studie löschen?",
    emptyList: "Leere Studie.",

    importFromTextTitle: "Aus Text importieren",
    documentContent: "Dokumentinhalt",
    renameList: "Umbenennen",
    share: "Teilen",
    copy: "Kopieren",
    deleteList: "Löschen",

    shareStudyTitle: "Studie",
    shareItemTitle: "Vers",
  },

  // Settings
  appearance: "Darstellung",
  lightMode: "Helles Design",
  darkMode: "Dunkles Design",
  fontSize: "Schriftgröße",
  language: "Sprache",
  french: "Französisch",
  english: "Englisch",
  fontSizeXLLabel: "Modus für Sehschwache (XL)",
  fontSizePreview:
    "Vorschau der gewählten Schriftgröße.",
  updates: "Updates",
  updatesDescription:
    "Prüfen, ob eine neue Version verfügbar ist, und sie anwenden.",
  applyUpdate: "Update anwenden",
  checkUpdatesButton: "Nach Updates suchen",
  updatesChecking: "Es wird geprüft…",
  updatesUpToDate:
    "Deine App ist auf dem neuesten Stand.",
  updatesReady:
    "Neue Version bereit. Klicke auf „Update anwenden“.",
  updatesUnavailable:
    "Automatisches Update nicht verfügbar (kein Service Worker gefunden).",
  updatesError:
    "Fehler bei der Prüfung. Bitte versuche es erneut.",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word hilft dir, Gottes Wort durch Zufallsverse und vollständiges Bibellesen zu entdecken.",
  aboutIntro:
    "TheWord: Offline-Bibellesung, Sofortsuche, thematische Notizen, Teilen mit einem Tipp. Nutze TheWord auch im Web: www.theword.fr",
  bibleVersions: "Bibelübersetzungen",
  frenchVersion:
    "Französisch: Louis Segond 1910 (LSG) – Überarbeitung 2025 – gemeinfrei",
  englishVersion:
    "Englisch: King James Version (KJV) – gemeinfrei",
  frenchVersionDetails:
    "Referenzbibel auf Französisch, 1910 von Louis Segond übersetzt und 2025 überarbeitet (modernisierte Sprache, treu den Handschriften).",
  englishVersionDetails:
    "Klassische englische Bibel (KJV), 1611 veröffentlicht, 1769 revidiert, mit einer leichten Aktualisierung 2025.",
  otherLanguagesNote:
    "Weitere Sprachen (Deutsch, Portugiesisch usw.) sind in Vorbereitung. Wenn keine Übersetzung vorliegt, verwendet die Oberfläche Englisch.",
  randomFeature: "Zufallsfunktion",
  randomFeatureDesc:
    "Unser Zufallsgenerator wählt aus über 31.000 Bibelversen, um dir tägliche Inspiration zu schenken.",
  musicLink: "Musik des Schöpfers",
  versesLabel: "Verse",
  booksLabel: "Bücher",
  readingShortcuts: "Lese-Schnellzugriffe",
  notesIntro:
    "Organisiere deine Lieblingsstellen und Gedanken in thematischen Listen.",
  notesPoint1: "Füge Verse oder freie Textblöcke hinzu.",
  notesPoint2:
    "Tippe auf ein Element, um das Menü zu öffnen (In „Lesen“ öffnen, Nach oben/unten, Löschen…).",
  notesPoint3: "Listen umbenennen, kopieren/teilen.",
  createdWithLove:
    "Mit Liebe erstellt, um Gottes Wort zu verbreiten",
  versionsFootnote:
    "Alle verwendeten Bibelübersetzungen sind gemeinfrei. Einige wurden sprachlich leicht modernisiert, bleiben aber streng den ursprünglichen Handschriften treu.",

  // Quick slots
  quickSlotsIntro:
    "Diese 4 Schaltflächen rechts vom Buch/Kapitel-Wähler lassen dich schnell zu häufigen Lesungen zurückkehren, um mehrere Bücher parallel zu verfolgen: Nutze 1/2/3 für drei Speicherplätze und die Lupe, um zur letzten Stelle zurückzukehren (Zufallsvers oder Suchergebnis).",
  quickSlotsIllustrationLabel:
    "Abbildung der Schnellzugriffe",
  quickSlotLastPassageTooltip: "Letzter Abschnitt",
  quickSlot1ActiveTooltip: "Schnellzugriff 1 (aktiv)",
  quickSlot2Tooltip: "Schnellzugriff 2",
  quickSlot3Tooltip: "Schnellzugriff 3",

  // Common
  loading: "Laden...",
  error: "Fehler beim Laden",
};

// Italian translations
const itTranslations = {
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
  aboutIntro:
    "TheWord: lettura offline, ricerca immediata, note tematiche, condivisione con un tocco. Puoi usare TheWord anche sul web: www.theword.fr",
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
    "Tutte le versioni bibliche utilizzate sono di dominio pubblico. Alcune sono state parzialmente modernizzate (vocabolario, grammatica), mantenendo la massima fedeltà ai manoscritti originali.",

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

// Portuguese translations
const ptTranslations = {
  // Navigation
  home: "Início",
  reading: "Leitura",
  search: "Pesquisa",
  settings: "Configurações",
  about: "Sobre",
  notes: "Notas",
  principles: "Estudos",

  // Home page
  randomVerse: "Verso aleatório",
  newVerse: "Novo verso",
  copyVerse: "Copiar verso",
  verseCopied: "Verso copiado!",
  godSpeaks: "Deus fala com você",
  openJeremiah: "Abrir Jeremias 23:29",
  jeremiah23Quote:
    "«Não é a minha palavra como fogo, diz o SENHOR, e como um martelo que despedaça a rocha?» Jeremias 23:29",

  // Reading page
  selectBook: "Selecione um livro",
  selectChapter: "Selecione um capítulo",
  chapter: "Capítulo",
  oldTestament: "Antigo Testamento",
  newTestament: "Novo Testamento",

  // Reading – extras
  chooseBook: "Escolher um livro",
  chooseChapter: "Escolher um capítulo",
  prevChapter: "Capítulo anterior",
  nextChapter: "Próximo capítulo",
  verseWord: "verso",
  versesSelectedSuffix: "verso(s) selecionado(s)",
  toNotes: "Ir para Notas",
  toPrinciples: "Ir para Estudos",
  copyLabel: "Copiar",
  shareLabel: "Compartilhar",
  cancel: "Cancelar",
  close: "Fechar",
  notesModalTitle: "Adicionar a uma lista (Notas)",
  notesNoList:
    "Nenhuma lista ainda. Crie uma abaixo.",
  notesNewListOptional: "Nova lista (opcional)",
  principlesModalTitle:
    "Adicionar a um estudo (Estudos)",
  principlesNoList:
    "Nenhum estudo ainda. Crie um abaixo.",
  principlesNewListOptional: "Novo estudo (opcional)",
  selectionCopied: "Seleção copiada",
  textReadyToShare:
    "Texto pronto para compartilhar (copiado)",
  addedToList: "Adicionado à lista",
  newRandom: "Novo aleatório",
  swipeLabel: "Deslize",
  searchSlotLabel: "Pesquisa",
  searchSlotEmpty: "Pesquisa (vazia)",
  memorySlotLabel: "Memória",
  emptySlotSuffix: "(vazio)",
  untitledList: "(sem título)",

  // Short label “Copied”
  copiedShort: "Copiado",

  // Search page
  searchTitle: "Pesquisa bíblica",
  searchPlaceholder: "Digite sua pesquisa",
  searchMinChars:
    "Digite pelo menos 2 caracteres.",
  searchSearching: "Pesquisando…",
  searchResults: "Resultados",
  searchExpandAll: "Abrir tudo",
  searchCollapseAll: "Fechar tudo",
  searchNoResults:
    "Nenhum versículo encontrado.",
  searchClear: "Limpar",
  searchOpenInReading: "Abrir em Leitura",

  // Notes page
  notesPage: {
    create: "Criar lista",
    placeholder: "Título da lista…",
    empty: "Nenhuma lista ainda.",
    items: "itens",
    backAll: "← Todas as listas",
    addTextBlock: "Adicionar bloco de texto",
    editTextBlock: "Editar bloco",
    deleteItem: "Excluir",
    moveUp: "Mover para cima",
    moveDown: "Mover para baixo",
    open: "Abrir",
    confirmDeleteItem: "Excluir este item?",
    newTextPlaceholder: "Seu texto…",

    shareCode: "Código",
    importCode: "Importar código",
    importPrompt:
      "Cole aqui o código de compartilhamento do TheWord:",
    importError: "Código inválido.",
    importSuccess:
      "Lista importada com sucesso ✅",
    shareCodeCopied:
      "Código copiado para a área de transferência ✅",

    importTextButton: "Texto → Lista",
    importTextTitlePlaceholder:
      "Título da nova lista",
    importTextDefaultTitle: "Importar texto",
    importTextBodyPlaceholder:
      "Cole aqui o seu texto…",
    importTextNoBody:
      "Por favor, cole um texto para importar.",
    importTextNoBlock:
      "Nenhum bloco detectado (deixe linhas vazias se quiser dividir em blocos).",
    importTextSplitLabel:
      "Dividir em blocos (separados por pelo menos uma linha vazia)",
    importTextInfo:
      "Cada bloco se tornará um item da lista.",
    importTextCreate: "Criar lista",

    duplicateTitle:
      "Já existe uma lista com o mesmo título.",
    confirmDeleteList: "Excluir esta lista?",
    emptyList: "Lista vazia.",

    importFromTextTitle: "Importar de texto",
    documentContent: "Conteúdo do documento",
    renameList: "Renomear",
  },

  // Principles page
  principlesPage: {
    create: "Criar estudo",
    placeholder: "Título do estudo…",
    empty: "Nenhum estudo ainda.",
    items: "itens",
    backAll: "← Todos os estudos",
    addTextBlock: "Adicionar bloco de texto",
    editTextBlock: "Editar bloco",
    deleteItem: "Excluir",
    moveUp: "Mover para cima",
    moveDown: "Mover para baixo",
    open: "Abrir",
    openReading: "Abrir Leitura",
    confirmDeleteItem: "Excluir este item?",
    newTextPlaceholder: "Seu texto…",

    shareCode: "Código",
    importCode: "Importar código",
    importPrompt:
      "Cole aqui o código de compartilhamento do TheWord (nota ou estudo):",
    importError: "Código inválido.",
    importSuccess:
      "Estudo importado com sucesso ✅",
    shareCodeCopied:
      "Código copiado para a área de transferência ✅",

    importTextButton: "Texto → Estudo",
    importTextTitlePlaceholder:
      "Título do novo estudo",
    importTextDefaultTitle: "Importar texto",
    importTextBodyPlaceholder:
      "Cole aqui o seu texto…",
    importTextNoBody:
      "Por favor, cole um texto para importar.",
    importTextNoBlock:
      "Nenhum bloco detectado (deixe linhas vazias se quiser dividir em blocos).",
    importTextSplitLabel:
      "Dividir em blocos (separados por pelo menos uma linha vazia)",
    importTextInfo:
      "Cada bloco se tornará um item do estudo.",
    importTextCreate: "Criar estudo",

    duplicateTitle:
      "Já existe um estudo com o mesmo título.",
    confirmDeleteList:
      "Excluir este estudo?",
    emptyList: "Estudo vazio.",

    importFromTextTitle: "Importar de texto",
    documentContent: "Conteúdo do documento",
    renameList: "Renomear",
    share: "Compartilhar",
    copy: "Copiar",
    deleteList: "Excluir",

    shareStudyTitle: "Estudo",
    shareItemTitle: "Verso",
  },

  // Settings
  appearance: "Aparência",
  lightMode: "Modo claro",
  darkMode: "Modo escuro",
  fontSize: "Tamanho da fonte",
  language: "Idioma",
  french: "Francês",
  english: "Inglês",
  fontSizeXLLabel:
    "Modo para baixa visão (XL)",
  fontSizePreview:
    "Pré-visualização do tamanho de fonte selecionado.",
  updates: "Atualizações",
  updatesDescription:
    "Verifique se há uma nova versão disponível e aplique-a.",
  applyUpdate: "Aplicar atualização",
  checkUpdatesButton:
    "Verificar atualizações",
  updatesChecking: "Verificando…",
  updatesUpToDate:
    "Seu aplicativo está atualizado.",
  updatesReady:
    "Nova versão pronta. Clique em «Aplicar atualização».",
  updatesUnavailable:
    "Atualização automática indisponível (Service Worker não detectado).",
  updatesError:
    "Erro ao verificar. Tente novamente.",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word permite que você descubra a Palavra de Deus por meio de versículos aleatórios e da leitura completa da Bíblia.",
  aboutIntro:
    "TheWord: leitura da Bíblia offline, pesquisa instantânea, notas temáticas, compartilhamento com um toque. Use também TheWord na web: www.theword.fr",
  bibleVersions: "Versões da Bíblia",
  frenchVersion:
    "Francês: Louis Segond 1910 (LSG) – Revisão 2025 – Domínio público",
  englishVersion:
    "Inglês: King James Version (KJV) – Domínio público",
  frenchVersionDetails:
    "Versão de referência em francês, traduzida por Louis Segond em 1910 e revisada em 2025 (modernização de vocabulário e gramática, fiel aos manuscritos).",
  englishVersionDetails:
    "Versão clássica em inglês (KJV), publicada em 1611, revisada em 1769 e levemente atualizada em 2025.",
  otherLanguagesNote:
    "Outros idiomas (alemão, português etc.) estão em preparação. Enquanto isso, a interface usa o inglês se a tradução ainda não estiver disponível.",
  randomFeature: "Função aleatória",
  randomFeatureDesc:
    "Nosso gerador de versículos aleatórios escolhe entre mais de 31.000 versículos bíblicos para trazer inspiração diária.",
  musicLink: "Música do Criador",
  versesLabel: "Versos",
  booksLabel: "Livros",
  readingShortcuts: "Atalhos de leitura",
  notesIntro:
    "Organize seus trechos favoritos e pensamentos em listas temáticas.",
  notesPoint1:
    "Adicione versículos ou blocos de texto livre.",
  notesPoint2:
    "Toque em um item para abrir o menu (Abrir em Leitura, Mover para cima/baixo, Excluir…).",
  notesPoint3:
    "Renomeie as listas, copie e compartilhe.",
  createdWithLove:
    "Criado com amor para espalhar a Palavra de Deus",
  versionsFootnote:
    "Todas as versões bíblicas usadas são de domínio público. Algumas foram parcialmente modernizadas (vocabulário, gramática), mantendo total fidelidade aos manuscritos originais.",

  // Quick slots
  quickSlotsIntro:
    "Esses 4 botões, alinhados à direita do seletor Livro/Capítulo, permitem voltar imediatamente às leituras frequentes para acompanhar vários livros em paralelo: use 1/2/3 para três posições e a lupa para retomar a última passagem (verso aleatório ou pesquisa).",
  quickSlotsIllustrationLabel:
    "Ilustração dos atalhos",
  quickSlotLastPassageTooltip:
    "Última passagem",
  quickSlot1ActiveTooltip:
    "Atalho 1 (ativo)",
  quickSlot2Tooltip: "Atalho 2",
  quickSlot3Tooltip: "Atalho 3",

  // Common
  loading: "Carregando...",
  error: "Erro ao carregar",
};

// Hindi translations
const hiTranslations = {
  // Navigation
  home: "मुखपृष्ठ",
  reading: "पाठ",
  search: "खोज",
  settings: "सेटिंग्स",
  about: "के बारे में",
  notes: "नोट्स",
  principles: "अध्ययन",

  // Home page
  randomVerse: "यादृच्छिक पद",
  newVerse: "नया पद",
  copyVerse: "पद कॉपी करें",
  verseCopied: "पद कॉपी हो गया!",
  godSpeaks: "परमेश्वर आप से बात कर रहा है",
  openJeremiah: "यिर्मयाह 23:29 खोलें",
  jeremiah23Quote:
    "“क्या मेरा वचन आग के समान नहीं है? यहोवा की यह वाणी है, और हथौड़े के समान नहीं, जो चट्टान को तोड़ डालता है?” यिर्मयाह 23:29",

  // Reading page
  selectBook: "पुस्तक चुनें",
  selectChapter: "अध्याय चुनें",
  chapter: "अध्याय",
  oldTestament: "पुराना नियम",
  newTestament: "नया नियम",

  // Reading – extras
  chooseBook: "कोई पुस्तक चुनें",
  chooseChapter: "कोई अध्याय चुनें",
  prevChapter: "पिछला अध्याय",
  nextChapter: "अगला अध्याय",
  verseWord: "पद",
  versesSelectedSuffix: "चुने हुए पद",
  toNotes: "नोट्स पर जाएं",
  toPrinciples: "अध्ययन पर जाएं",
  copyLabel: "कॉपी",
  shareLabel: "साझा करें",
  cancel: "रद्द करें",
  close: "बंद करें",
  notesModalTitle: "सूची में जोड़ें (नोट्स)",
  notesNoList:
    "अभी तक कोई सूची नहीं है। नीचे एक सूची बनाएं।",
  notesNewListOptional:
    "नई सूची (वैकल्पिक)",
  principlesModalTitle:
    "अध्ययन में जोड़ें (अध्ययन)",
  principlesNoList:
    "अभी तक कोई अध्ययन नहीं है। नीचे एक अध्ययन बनाएं।",
  principlesNewListOptional:
    "नया अध्ययन (वैकल्पिक)",
  selectionCopied: "चयन कॉपी हो गया",
  textReadyToShare:
    "साझा करने के लिए पाठ तैयार है (कॉपी हो गया)",
  addedToList: "सूची में जोड़ा गया",
  newRandom: "नया यादृच्छिक",
  swipeLabel: "स्वाइप करें",
  searchSlotLabel: "खोज",
  searchSlotEmpty: "खोज (खाली)",
  memorySlotLabel: "स्लॉट",
  emptySlotSuffix: "(खाली)",
  untitledList: "(शीर्षक रहित)",

  // Short label “Copied”
  copiedShort: "कॉपी हो गया",

  // Search page
  searchTitle: "बाइबल खोज",
  searchPlaceholder: "अपनी खोज लिखें",
  searchMinChars:
    "कम से कम 2 अक्षर लिखें।",
  searchSearching: "खोज की जा रही है…",
  searchResults: "परिणाम",
  searchExpandAll: "सब खोलें",
  searchCollapseAll: "सब बंद करें",
  searchNoResults: "कोई पद नहीं मिला।",
  searchClear: "साफ करें",
  searchOpenInReading: "पाठ में खोलें",

  // Notes page
  notesPage: {
    create: "सूची बनाएं",
    placeholder: "सूची का शीर्षक…",
    empty: "अभी तक कोई सूची नहीं है।",
    items: "तत्व",
    backAll: "← सभी सूचियाँ",
    addTextBlock: "पाठ ब्लॉक जोड़ें",
    editTextBlock: "ब्लॉक संपादित करें",
    deleteItem: "हटाएँ",
    moveUp: "ऊपर ले जाएँ",
    moveDown: "नीचे ले जाएँ",
    open: "खोलें",
    confirmDeleteItem:
      "क्या यह तत्व हटाना है?",
    newTextPlaceholder: "आपका पाठ…",

    shareCode: "कोड",
    importCode: "कोड आयात करें",
    importPrompt:
      "यहाँ TheWord साझा-कोड चिपकाएँ:",
    importError: "अमान्य कोड।",
    importSuccess:
      "सूची सफलतापूर्वक आयात की गई ✅",
    shareCodeCopied:
      "कोड क्लिपबोर्ड में कॉपी हो गया ✅",

    importTextButton: "पाठ → सूची",
    importTextTitlePlaceholder:
      "नई सूची का शीर्षक",
    importTextDefaultTitle: "पाठ आयात",
    importTextBodyPlaceholder:
      "यहाँ अपना पाठ चिपकाएँ…",
    importTextNoBody:
      "कृपया आयात करने के लिए कुछ पाठ चिपकाएँ।",
    importTextNoBlock:
      "कोई ब्लॉक नहीं मिला (यदि आप ब्लॉकों में बाँटना चाहते हैं तो खाली पंक्तियाँ छोड़ें)।",
    importTextSplitLabel:
      "ब्लॉकों में विभाजित करें (कम से कम एक खाली पंक्ति से अलग)",
    importTextInfo:
      "हर ब्लॉक सूची में एक तत्व बन जाएगा।",
    importTextCreate: "सूची बनाएं",

    duplicateTitle:
      "इसी शीर्षक वाली एक सूची पहले से मौजूद है।",
    confirmDeleteList:
      "क्या यह सूची हटानी है?",
    emptyList: "खाली सूची।",

    importFromTextTitle:
      "पाठ से आयात करें",
    documentContent:
      "दस्तावेज़ की सामग्री",
    renameList: "नाम बदलें",
  },

  // Principles page
  principlesPage: {
    create: "अध्ययन बनाएं",
    placeholder: "अध्ययन का शीर्षक…",
    empty: "अभी तक कोई अध्ययन नहीं है।",
    items: "तत्व",
    backAll: "← सभी अध्ययन",
    addTextBlock: "पाठ ब्लॉक जोड़ें",
    editTextBlock: "ब्लॉक संपादित करें",
    deleteItem: "हटाएँ",
    moveUp: "ऊपर ले जाएँ",
    moveDown: "नीचे ले जाएँ",
    open: "खोलें",
    openReading: "पाठ खोलें",
    confirmDeleteItem:
      "क्या यह तत्व हटाना है?",
    newTextPlaceholder: "आपका पाठ…",

    shareCode: "कोड",
    importCode: "कोड आयात करें",
    importPrompt:
      "यहाँ TheWord साझा-कोड (नोट या अध्ययन) चिपकाएँ:",
    importError: "अमान्य कोड।",
    importSuccess:
      "अध्ययन सफलतापूर्वक आयात किया गया ✅",
    shareCodeCopied:
      "कोड क्लिपबोर्ड में कॉपी हो गया ✅",

    importTextButton: "पाठ → अध्ययन",
    importTextTitlePlaceholder:
      "नए अध्ययन का शीर्षक",
    importTextDefaultTitle: "पाठ आयात",
    importTextBodyPlaceholder:
      "यहाँ अपना पाठ चिपकाएँ…",
    importTextNoBody:
      "कृपया आयात करने के लिए कुछ पाठ चिपकाएँ।",
    importTextNoBlock:
      "कोई ब्लॉक नहीं मिला (यदि आप ब्लॉकों में बाँटना चाहते हैं तो खाली पंक्तियाँ छोड़ें)।",
    importTextSplitLabel:
      "ब्लॉकों में विभाजित करें (कम से कम एक खाली पंक्ति से अलग)",
    importTextInfo:
      "हर ब्लॉक अध्ययन में एक तत्व बन जाएगा.",
    importTextCreate: "अध्ययन बनाएं",

    duplicateTitle:
      "इसी शीर्षक वाला एक अध्ययन पहले से मौजूद है.",
    confirmDeleteList:
      "क्या यह अध्ययन हटाना है?",
    emptyList: "खाली अध्ययन।",

    importFromTextTitle:
      "पाठ से आयात करें",
    documentContent:
      "दस्तावेज़ की सामग्री",
    renameList: "नाम बदलें",
    share: "साझा करें",
    copy: "कॉपी करें",
    deleteList: "हटाएँ",

    shareStudyTitle: "अध्ययन",
    shareItemTitle: "पद",
  },

  // Settings
  appearance: "दिखावट",
  lightMode: "हल्का मोड",
  darkMode: "गहरा मोड",
  fontSize: "फ़ॉन्ट आकार",
  language: "भाषा",
  french: "फ़्रेंच",
  english: "अंग्रेज़ी",
  fontSizeXLLabel:
    "कम दृष्टि मोड (XL)",
  fontSizePreview:
    "चुने हुए फ़ॉन्ट आकार का पूर्वावलोकन।",
  updates: "अपडेट्स",
  updatesDescription:
    "देखें कि कोई नया संस्करण उपलब्ध है या नहीं, और उसे लागू करें।",
  applyUpdate: "अपडेट लागू करें",
  checkUpdatesButton:
    "अपडेट्स जाँचें",
  updatesChecking: "जाँच हो रही है…",
  updatesUpToDate:
    "आपका ऐप नवीनतम संस्करण पर है।",
  updatesReady:
    "नया संस्करण तैयार है। «अपडेट लागू करें» पर टैप करें।",
  updatesUnavailable:
    "स्वचालित अपडेट उपलब्ध नहीं (Service Worker नहीं मिला)।",
  updatesError:
    "जाँच के दौरान त्रुटि हुई। कृपया फिर से प्रयास करें।",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word आपको यादृच्छिक पदों और पूरी बाइबल पढ़ने के माध्यम से परमेश्वर का वचन खोजने में मदद करता है।",
  aboutIntro:
    "TheWord: ऑफ़लाइन बाइबल-पाठ, त्वरित खोज, विषयगत नोट्स, एक स्पर्श से साझा करना। आप वेब पर भी TheWord का उपयोग कर सकते हैं: www.theword.fr",
  bibleVersions: "बाइबल संस्करण",
  frenchVersion:
    "फ़्रेंच: Louis Segond 1910 (LSG) – संशोधन 2025 – पब्लिक डोमेन",
  englishVersion:
    "अंग्रेज़ी: King James Version (KJV) – पब्लिक डोमेन",
  frenchVersionDetails:
    "फ़्रेंच बाइबल का संदर्भ-अनुवाद, 1910 में Louis Segond द्वारा अनूदित और 2025 में अद्यतन (शब्दावली और व्याकरण का आधुनिकीकरण, पांडुलिपियों के प्रति निष्ठावान)।",
  englishVersionDetails:
    "क्लासिक अंग्रेज़ी संस्करण (KJV), 1611 में प्रकाशित, 1769 में संशोधित और 2025 में थोड़ा अद्यतन।",
  otherLanguagesNote:
    "अन्य भाषाएँ (जर्मन, पुर्तगाली आदि) तैयार की जा रही हैं। इस बीच, जहाँ अनुवाद उपलब्ध नहीं है, वहाँ इंटरफ़ेस अंग्रेज़ी में दिखाया जाता है।",
  randomFeature: "यादृच्छिक फ़ीचर",
  randomFeatureDesc:
    "हमारा यादृच्छिक पद-जनरेटर 31,000 से अधिक बाइबल-पदों में से चुनकर आपको हर दिन प्रेरणा देता है।",
  musicLink: "सृष्टिकर्ता का संगीत",
  versesLabel: "पद",
  booksLabel: "पुस्तकें",
  readingShortcuts: "पाठ शॉर्टकट्स",
  notesIntro:
    "अपनी पसंदीदा आयतों और विचारों को विषयगत सूचियों में व्यवस्थित करें।",
  notesPoint1:
    "पद या स्वतंत्र पाठ-ब्लॉक जोड़ें।",
  notesPoint2:
    "मेनू खोलने के लिए किसी तत्व पर टैप करें (पाठ में खोलें, ऊपर/नीचे ले जाएँ, हटाएँ…).",
  notesPoint3:
    "सूचियों का नाम बदलें, कॉपी करें और साझा करें।",
  createdWithLove:
    "परमेश्वर के वचन को फैलाने के लिए प्रेम के साथ बनाया गया",
  versionsFootnote:
    "सभी प्रयुक्त बाइबल संस्करण पब्लिक डोमेन में हैं। कुछ को (शब्दावली, व्याकरण) आंशिक रूप से आधुनिक बनाया गया है, फिर भी वे मूल पांडुलिपियों के प्रति पूर्ण निष्ठा रखते हैं।",

  // Quick slots
  quickSlotsIntro:
    "ये 4 बटन, पुस्तक/अध्याय चयनकर्ता के दाईं ओर, आपको अपनी अक्सर-पढ़ी जाने वाली स्थानों पर तुरंत लौटने देते हैं, ताकि आप कई पुस्तकों को समानांतर में पढ़ सकें: 3 स्थानों के लिए 1/2/3 का उपयोग करें, और अंतिम खंड (यादृच्छिक पद या खोज) पर लौटने के लिए आवर्धक-काँच का उपयोग करें।",
  quickSlotsIllustrationLabel:
    "शॉर्टकट्स की रूपरेखा",
  quickSlotLastPassageTooltip:
    "अंतिम खंड",
  quickSlot1ActiveTooltip:
    "शॉर्टकट 1 (सक्रिय)",
  quickSlot2Tooltip: "शॉर्टकट 2",
  quickSlot3Tooltip: "शॉर्टकट 3",

  // Common
  loading: "लोड हो रहा है...",
  error: "लोड करते समय त्रुटि हुई",
};

// Chinese (Simplified) translations
const zhTranslations = {
  // Navigation
  home: "首页",
  reading: "阅读",
  search: "搜索",
  settings: "设置",
  about: "关于",
  notes: "笔记",
  principles: "研读",

  // Home page
  randomVerse: "随机经文",
  newVerse: "新的经文",
  copyVerse: "复制经文",
  verseCopied: "经文已复制！",
  godSpeaks: "神在对你说话",
  openJeremiah: "打开耶利米书 23:29",
  jeremiah23Quote:
    "“耶和华说：我的话岂不是像火，又像能打碎磐石的锤子吗？”（耶利米书 23:29）",

  // Reading page
  selectBook: "选择卷书",
  selectChapter: "选择章",
  chapter: "章",
  oldTestament: "旧约",
  newTestament: "新约",

  // Reading – extras
  chooseBook: "选择一本书",
  chooseChapter: "选择一章",
  prevChapter: "上一章",
  nextChapter: "下一章",
  verseWord: "节",
  versesSelectedSuffix: "节已选",
  toNotes: "前往笔记",
  toPrinciples: "前往研读",
  copyLabel: "复制",
  shareLabel: "分享",
  cancel: "取消",
  close: "关闭",
  notesModalTitle: "添加到列表（笔记）",
  notesNoList:
    "目前还没有列表。请在下方创建一个。",
  notesNewListOptional:
    "新列表（可选）",
  principlesModalTitle:
    "添加到研读（研读）",
  principlesNoList:
    "目前还没有研读。请在下方创建一个。",
  principlesNewListOptional:
    "新的研读（可选）",
  selectionCopied: "选中内容已复制",
  textReadyToShare:
    "文本已复制，可直接分享",
  addedToList: "已添加到列表",
  newRandom: "新的随机经文",
  swipeLabel: "滑动",
  searchSlotLabel: "搜索",
  searchSlotEmpty: "搜索（空）",
  memorySlotLabel: "快捷位",
  emptySlotSuffix: "（空）",
  untitledList: "（无标题）",

  // Short label “Copied”
  copiedShort: "已复制",

  // Search page
  searchTitle: "圣经搜索",
  searchPlaceholder: "输入要搜索的内容",
  searchMinChars:
    "请至少输入 2 个字符。",
  searchSearching: "正在搜索…",
  searchResults: "结果",
  searchExpandAll: "全部展开",
  searchCollapseAll: "全部收起",
  searchNoResults: "未找到经文。",
  searchClear: "清除",
  searchOpenInReading: "在阅读中打开",

  // Notes page
  notesPage: {
    create: "创建列表",
    placeholder: "列表标题…",
    empty: "目前还没有列表。",
    items: "项",
    backAll: "← 所有列表",
    addTextBlock: "添加文本块",
    editTextBlock: "编辑文本块",
    deleteItem: "删除",
    moveUp: "上移",
    moveDown: "下移",
    open: "打开",
    confirmDeleteItem: "确定删除此项目？",
    newTextPlaceholder: "你的文本…",

    shareCode: "代码",
    importCode: "导入代码",
    importPrompt:
      "在此粘贴 TheWord 分享代码：",
    importError: "无效的代码。",
    importSuccess:
      "列表导入成功 ✅",
    shareCodeCopied:
      "代码已复制到剪贴板 ✅",

    importTextButton: "文本 → 列表",
    importTextTitlePlaceholder:
      "新列表标题",
    importTextDefaultTitle: "文本导入",
    importTextBodyPlaceholder:
      "在此粘贴你的文本…",
    importTextNoBody:
      "请粘贴要导入的文本。",
    importTextNoBlock:
      "未检测到任何文本块（如需分块，请在段落间留空行）。",
    importTextSplitLabel:
      "按块分割（至少一行空行分隔）",
    importTextInfo:
      "每个块都会成为列表中的一个项目。",
    importTextCreate: "创建列表",

    duplicateTitle:
      "已存在同名列表。",
    confirmDeleteList:
      "确定要删除此列表？",
    emptyList: "空列表。",

    importFromTextTitle:
      "从文本导入",
    documentContent: "文档内容",
    renameList: "重命名",
  },

  // Principles page
  principlesPage: {
    create: "创建研读",
    placeholder: "研读标题…",
    empty: "目前还没有研读。",
    items: "项",
    backAll: "← 所有研读",
    addTextBlock: "添加文本块",
    editTextBlock: "编辑文本块",
    deleteItem: "删除",
    moveUp: "上移",
    moveDown: "下移",
    open: "打开",
    openReading: "打开阅读",
    confirmDeleteItem:
      "确定删除此项目？",
    newTextPlaceholder: "你的文本…",

    shareCode: "代码",
    importCode: "导入代码",
    importPrompt:
      "在此粘贴 TheWord 分享代码（笔记或研读）：",
    importError: "无效的代码。",
    importSuccess:
      "研读导入成功 ✅",
    shareCodeCopied:
      "代码已复制到剪贴板 ✅",

    importTextButton: "文本 → 研读",
    importTextTitlePlaceholder:
      "新研读标题",
    importTextDefaultTitle: "文本导入",
    importTextBodyPlaceholder:
      "在此粘贴你的文本…",
    importTextNoBody:
      "请粘贴要导入的文本。",
    importTextNoBlock:
      "未检测到任何文本块（如需分块，请在段落间留空行）。",
    importTextSplitLabel:
      "按块分割（至少一行空行分隔）",
    importTextInfo:
      "每个块都会成为研读中的一个项目。",
    importTextCreate: "创建研读",

    duplicateTitle:
      "已存在同名研读。",
    confirmDeleteList:
      "确定要删除此研读？",
    emptyList: "空研读。",

    importFromTextTitle:
      "从文本导入",
    documentContent: "文档内容",
    renameList: "重命名",
    share: "分享",
    copy: "复制",
    deleteList: "删除",

    shareStudyTitle: "研读",
    shareItemTitle: "经文",
  },

  // Settings
  appearance: "外观",
  lightMode: "浅色模式",
  darkMode: "深色模式",
  fontSize: "字体大小",
  language: "语言",
  french: "法语",
  english: "英语",
  fontSizeXLLabel:
    "大字体模式 (XL)",
  fontSizePreview:
    "所选字体大小的预览。",
  updates: "更新",
  updatesDescription:
    "检查是否有新版本并应用。",
  applyUpdate: "应用更新",
  checkUpdatesButton: "检查更新",
  updatesChecking: "正在检查…",
  updatesUpToDate:
    "你的应用已是最新版本。",
  updatesReady:
    "新版本已准备好。请点击“应用更新”。",
  updatesUnavailable:
    "自动更新不可用（未检测到 Service Worker）。",
  updatesError:
    "检查时发生错误，请重试。",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word 帮助你通过随机经文和完整读经来发现神的话语。",
  aboutIntro:
    "TheWord：离线读经、即时搜索、主题笔记、一键分享。也可以在网页上使用 TheWord：www.theword.fr",
  bibleVersions: "圣经版本",
  frenchVersion:
    "法语：Louis Segond 1910 (LSG) – 2025 修订版 – 公有领域",
  englishVersion:
    "英语：King James Version (KJV) – 公有领域",
  frenchVersionDetails:
    "法语权威译本，由 Louis Segond 于 1910 年翻译，并于 2025 年更新（词汇和语法现代化，忠于原始手稿）。",
  englishVersionDetails:
    "经典英文译本（KJV），1611 年出版，1769 年修订，并在 2025 年略作更新。",
  otherLanguagesNote:
    "更多语言（德语、葡萄牙语等）正在准备中。在没有翻译时，界面会默认使用英语。",
  randomFeature: "随机功能",
  randomFeatureDesc:
    "我们的随机经文生成器从 31,000 多节经文中为你挑选，每天带来新的灵感。",
  musicLink: "创造主的音乐",
  versesLabel: "经文",
  booksLabel: "卷书",
  readingShortcuts: "阅读快捷方式",
  notesIntro:
    "把你喜欢的经文和想法整理在主题列表中。",
  notesPoint1:
    "添加经文或自由文本块。",
  notesPoint2:
    "点击某一项打开菜单（在阅读中打开、上移/下移、删除等）。",
  notesPoint3:
    "重命名列表、复制和分享。",
  createdWithLove:
    "怀着爱心制作，只为传扬神的话语",
  versionsFootnote:
    "所有使用的圣经版本都属于公有领域。其中一些在词汇和语法上略作现代化，但仍完全忠于原始手稿。",

  // Quick slots
  quickSlotsIntro:
    "这 4 个按钮位于卷书/章节选择器右侧，可让你立即回到常读的经文，以便并行阅读多卷书：使用 1/2/3 保存三个位置，用放大镜返回到上一次阅读的位置（随机经文或搜索结果）。",
  quickSlotsIllustrationLabel:
    "快捷方式示意图",
  quickSlotLastPassageTooltip:
    "上一次经文",
  quickSlot1ActiveTooltip:
    "快捷 1（当前）",
  quickSlot2Tooltip: "快捷 2",
  quickSlot3Tooltip: "快捷 3",

  // Common
  loading: "加载中...",
  error: "加载时出错",
};

// Arabic translations
const arTranslations = {
  // Navigation
  home: "الصفحة الرئيسية",
  reading: "القراءة",
  search: "البحث",
  settings: "الإعدادات",
  about: "حول التطبيق",
  notes: "ملاحظات",
  principles: "دراسات",

  // Home page
  randomVerse: "آية عشوائية",
  newVerse: "آية جديدة",
  copyVerse: "نسخ الآية",
  verseCopied: "تم نسخ الآية!",
  godSpeaks: "الله يتكلم معك",
  openJeremiah: "افتح إرميا 23:29",
  jeremiah23Quote:
    "«أَلَيْسَ كَلاَمِي كَنَارٍ، يَقُولُ الرَّبُّ، وَكَمِطْرَقَةٍ تُحَطِّمُ الصَّخْرَ؟» إرميا 23:29",

  // Reading page
  selectBook: "اختر سفراً",
  selectChapter: "اختر إصحاحاً",
  chapter: "إصحاح",
  oldTestament: "العهد القديم",
  newTestament: "العهد الجديد",

  // Reading – extras
  chooseBook: "اختر سفراً",
  chooseChapter: "اختر إصحاحاً",
  prevChapter: "الإصحاح السابق",
  nextChapter: "الإصحاح التالي",
  verseWord: "آية",
  versesSelectedSuffix:
    "آية/آيات محددة",
  toNotes: "إلى الملاحظات",
  toPrinciples: "إلى الدراسات",
  copyLabel: "نسخ",
  shareLabel: "مشاركة",
  cancel: "إلغاء",
  close: "إغلاق",
  notesModalTitle:
    "إضافة إلى قائمة (ملاحظات)",
  notesNoList:
    "لا توجد قوائم بعد. أنشئ قائمة في الأسفل.",
  notesNewListOptional:
    "قائمة جديدة (اختياري)",
  principlesModalTitle:
    "إضافة إلى دراسة (دراسات)",
  principlesNoList:
    "لا توجد دراسات بعد. أنشئ دراسة في الأسفل.",
  principlesNewListOptional:
    "دراسة جديدة (اختياري)",
  selectionCopied: "تم نسخ التحديد",
  textReadyToShare:
    "النص جاهز للمشاركة (تم نسخه)",
  addedToList: "تمت الإضافة إلى القائمة",
  newRandom: "آية عشوائية جديدة",
  swipeLabel: "اسحب",
  searchSlotLabel: "بحث",
  searchSlotEmpty: "بحث (فارغ)",
  memorySlotLabel: "موضع",
  emptySlotSuffix: "(فارغ)",
  untitledList: "(بلا عنوان)",

  // Short label “Copied”
  copiedShort: "تم النسخ",

  // Search page
  searchTitle: "بحث في الكتاب المقدس",
  searchPlaceholder:
    "اكتب ما تريد البحث عنه",
  searchMinChars:
    "اكتب حرفين على الأقل.",
  searchSearching: "جارٍ البحث…",
  searchResults: "النتائج",
  searchExpandAll: "فتح الكل",
  searchCollapseAll: "طيّ الكل",
  searchNoResults:
    "لم يتم العثور على آيات.",
  searchClear: "مسح",
  searchOpenInReading:
    "افتح في صفحة القراءة",

  // Notes page
  notesPage: {
    create: "إنشاء قائمة",
    placeholder: "عنوان القائمة…",
    empty: "لا توجد قوائم بعد.",
    items: "عناصر",
    backAll: "← كل القوائم",
    addTextBlock: "إضافة فقرة نصية",
    editTextBlock: "تعديل الفقرة",
    deleteItem: "حذف",
    moveUp: "تحريك لأعلى",
    moveDown: "تحريك لأسفل",
    open: "فتح",
    confirmDeleteItem:
      "هل تريد حذف هذا العنصر؟",
    newTextPlaceholder: "نصّك هنا…",

    shareCode: "رمز",
    importCode: "استيراد رمز",
    importPrompt:
      "ألصق هنا رمز المشاركة من TheWord:",
    importError: "رمز غير صالح.",
    importSuccess:
      "تم استيراد القائمة بنجاح ✅",
    shareCodeCopied:
      "تم نسخ الرمز إلى الحافظة ✅",

    importTextButton: "نص → قائمة",
    importTextTitlePlaceholder:
      "عنوان القائمة الجديدة",
    importTextDefaultTitle:
      "استيراد نص",
    importTextBodyPlaceholder:
      "ألصق نصك هنا…",
    importTextNoBody:
      "يرجى لصق نص لاستيراده.",
    importTextNoBlock:
      "لم يتم العثور على فقرات (اترك أسطراً فارغة إذا أردت تقسيم النص إلى فقرات).",
    importTextSplitLabel:
      "تقسيم إلى فقرات (مفصولة بسطر فارغ على الأقل)",
    importTextInfo:
      "كل فقرة ستصبح عنصراً في القائمة.",
    importTextCreate: "إنشاء قائمة",

    duplicateTitle:
      "هناك بالفعل قائمة تحمل العنوان نفسه.",
    confirmDeleteList:
      "هل تريد حذف هذه القائمة؟",
    emptyList: "قائمة فارغة.",

    importFromTextTitle:
      "استيراد من نص",
    documentContent: "محتوى المستند",
    renameList: "إعادة تسمية",
  },

  // Principles page
  principlesPage: {
    create: "إنشاء دراسة",
    placeholder: "عنوان الدراسة…",
    empty: "لا توجد دراسات بعد.",
    items: "عناصر",
    backAll: "← كل الدراسات",
    addTextBlock: "إضافة فقرة نصية",
    editTextBlock: "تعديل الفقرة",
    deleteItem: "حذف",
    moveUp: "تحريك لأعلى",
    moveDown: "تحريك لأسفل",
    open: "فتح",
    openReading: "افتح صفحة القراءة",
    confirmDeleteItem:
      "هل تريد حذف هذا العنصر؟",
    newTextPlaceholder: "نصّك هنا…",

    shareCode: "رمز",
    importCode: "استيراد رمز",
    importPrompt:
      "ألصق هنا رمز المشاركة من TheWord (ملاحظة أو دراسة):",
    importError: "رمز غير صالح.",
    importSuccess:
      "تم استيراد الدراسة بنجاح ✅",
    shareCodeCopied:
      "تم نسخ الرمز إلى الحافظة ✅",

    importTextButton: "نص → دراسة",
    importTextTitlePlaceholder:
      "عنوان الدراسة الجديدة",
    importTextDefaultTitle:
      "استيراد نص",
    importTextBodyPlaceholder:
      "ألصق نصك هنا…",
    importTextNoBody:
      "يرجى لصق نص لاستيراده.",
    importTextNoBlock:
      "لم يتم العثور على فقرات (اترك أسطراً فارغة إذا أردت تقسيم النص إلى فقرات).",
    importTextSplitLabel:
      "تقسيم إلى فقرات (مفصولة بسطر فارغ على الأقل)",
    importTextInfo:
      "كل فقرة ستصبح عنصراً في الدراسة.",
    importTextCreate: "إنشاء دراسة",

    duplicateTitle:
      "هناك بالفعل دراسة تحمل العنوان نفسه.",
    confirmDeleteList:
      "هل تريد حذف هذه الدراسة؟",
    emptyList: "دراسة فارغة.",

    importFromTextTitle:
      "استيراد من نص",
    documentContent: "محتوى المستند",
    renameList: "إعادة تسمية",
    share: "مشاركة",
    copy: "نسخ",
    deleteList: "حذف",

    shareStudyTitle: "دراسة",
    shareItemTitle: "آية",
  },

  // Settings
  appearance: "المظهر",
  lightMode: "الوضع الفاتح",
  darkMode: "الوضع الداكن",
  fontSize: "حجم الخط",
  language: "اللغة",
  french: "الفرنسية",
  english: "الإنجليزية",
  fontSizeXLLabel:
    "وضع ضعاف البصر (XL)",
  fontSizePreview:
    "معاينة لحجم الخط المحدد.",
  updates: "التحديثات",
  updatesDescription:
    "تحقق مما إذا كان هناك إصدار جديد وطبّقه.",
  applyUpdate: "تطبيق التحديث",
  checkUpdatesButton:
    "التحقق من التحديثات",
  updatesChecking: "جارٍ التحقق…",
  updatesUpToDate:
    "تطبيقك مُحدَّث.",
  updatesReady:
    "هناك إصدار جديد جاهز. اضغط «تطبيق التحديث».",
  updatesUnavailable:
    "التحديث التلقائي غير متاح (لم يتم العثور على Service Worker).",
  updatesError:
    "حدث خطأ أثناء التحقق. حاول مرة أخرى.",

  // About
  aboutTitle: "",
  aboutDescription:
    "يساعدك The Word على اكتشاف كلمة الله من خلال آيات عشوائية وقراءة كاملة للكتاب المقدس.",
  aboutIntro:
    "TheWord: قراءة الكتاب المقدس دون اتصال، بحث فوري، ملاحظات موضوعية، ومشاركة بلمسة واحدة. يمكنك أيضاً استخدام TheWord على الويب: www.theword.fr",
  bibleVersions: "ترجمات الكتاب المقدس",
  frenchVersion:
    "الفرنسية: Louis Segond 1910 (LSG) – مراجعة 2025 – ضمن الملكية العامة",
  englishVersion:
    "الإنجليزية: King James Version (KJV) – ضمن الملكية العامة",
  frenchVersionDetails:
    "ترجمة مرجعية للكتاب المقدس بالفرنسية، ترجمها Louis Segond عام 1910 وتم تحديثها عام 2025 (تحديث المفردات والقواعد مع الأمانة للمخطوطات).",
  englishVersionDetails:
    "ترجمة إنجليزية كلاسيكية (KJV)، نُشرت عام 1611، ونقِّحت عام 1769، مع تحديث محدود عام 2025.",
  otherLanguagesNote:
    "تُحضَّر لغات أخرى (الألمانية، البرتغالية، وغيرها). في الوقت الحالي، تُعرَض الواجهة بالإنجليزية إذا لم تكن الترجمة متوفرة بعد.",
  randomFeature: "ميزة الآية العشوائية",
  randomFeatureDesc:
    "مولِّد الآيات العشوائية لدينا يختار من أكثر من 31,000 آية كتابية ليمنحك إلهاماً يومياً.",
  musicLink: "موسيقى الخالق",
  versesLabel: "آيات",
  booksLabel: "أسفار",
  readingShortcuts: "اختصارات القراءة",
  notesIntro:
    "نظّم المقاطع المفضلة لديك وأفكارك في قوائم موضوعية.",
  notesPoint1:
    "أضف آيات أو فقرات نصية حرة.",
  notesPoint2:
    "اضغط على عنصر لفتح القائمة (افتح في صفحة القراءة، تحريك لأعلى/لأسفل، حذف…).",
  notesPoint3:
    "أعد تسمية القوائم، وانسخها وشاركها.",
  createdWithLove:
    "صُنِع بمحبة لنشر كلمة الله",
  versionsFootnote:
    "كل ترجمات الكتاب المقدس المستخدمة ضمن الملكية العامة. تم تحديث بعضها جزئياً (مفردات وقواعد) مع المحافظة على الأمانة الكاملة للمخطوطات الأصلية.",

  // Quick slots
  quickSlotsIntro:
    "هذه الأزرار الأربعة، الموجودة على يمين مُحدِّد السفر/الإصحاح، تسمح لك بالعودة فوراً إلى القراءات المتكررة لتتابع عدة أسفار في آن واحد: استخدم 1/2/3 لثلاثة مواضع، والعدسة للعودة إلى آخر مقطع (آية عشوائية أو نتيجة بحث).",
  quickSlotsIllustrationLabel:
    "توضيح للاختصارات",
  quickSlotLastPassageTooltip:
    "آخر مقطع",
  quickSlot1ActiveTooltip:
    "اختصار 1 (مفعّل)",
  quickSlot2Tooltip: "اختصار 2",
  quickSlot3Tooltip: "اختصار 3",

  // Common
  loading: "جارٍ التحميل...",
  error: "حدث خطأ أثناء التحميل",
};

// Indonesian translations
const idTranslations = {
  // Navigation
  home: "Beranda",
  reading: "Bacaan",
  search: "Pencarian",
  settings: "Pengaturan",
  about: "Tentang",
  notes: "Catatan",
  principles: "Studi",

  // Home page
  randomVerse: "Ayat acak",
  newVerse: "Ayat baru",
  copyVerse: "Salin ayat",
  verseCopied: "Ayat disalin!",
  godSpeaks: "Tuhan berbicara kepadamu",
  openJeremiah: "Buka Yeremia 23:29",
  jeremiah23Quote:
    "“Bukankah firman-Ku seperti api, demikianlah firman TUHAN, dan seperti palu yang menghancurkan bukit batu?” Yeremia 23:29",

  // Reading page
  selectBook: "Pilih kitab",
  selectChapter: "Pilih pasal",
  chapter: "Pasal",
  oldTestament: "Perjanjian Lama",
  newTestament: "Perjanjian Baru",

  // Reading – extras
  chooseBook: "Pilih suatu kitab",
  chooseChapter: "Pilih suatu pasal",
  prevChapter: "Pasal sebelumnya",
  nextChapter: "Pasal berikutnya",
  verseWord: "ayat",
  versesSelectedSuffix: "ayat terpilih",
  toNotes: "Ke Catatan",
  toPrinciples: "Ke Studi",
  copyLabel: "Salin",
  shareLabel: "Bagikan",
  cancel: "Batal",
  close: "Tutup",
  notesModalTitle:
    "Tambahkan ke daftar (Catatan)",
  notesNoList:
    "Belum ada daftar. Buat satu di bawah.",
  notesNewListOptional:
    "Daftar baru (opsional)",
  principlesModalTitle:
    "Tambahkan ke studi (Studi)",
  principlesNoList:
    "Belum ada studi. Buat satu di bawah.",
  principlesNewListOptional:
    "Studi baru (opsional)",
  selectionCopied: "Pilihan disalin",
  textReadyToShare:
    "Teks siap dibagikan (disalin)",
  addedToList: "Ditambahkan ke daftar",
  newRandom: "Ayat acak baru",
  swipeLabel: "Geser",
  searchSlotLabel: "Cari",
  searchSlotEmpty: "Cari (kosong)",
  memorySlotLabel: "Slot",
  emptySlotSuffix: "(kosong)",
  untitledList: "(tanpa judul)",

  // Short label “Copied”
  copiedShort: "Disalin",

  // Search page
  searchTitle: "Pencarian Alkitab",
  searchPlaceholder:
    "Ketik pencarian Anda",
  searchMinChars:
    "Ketik minimal 2 karakter.",
  searchSearching: "Mencari…",
  searchResults: "Hasil",
  searchExpandAll: "Buka semua",
  searchCollapseAll: "Tutup semua",
  searchNoResults:
    "Tidak ada ayat yang ditemukan.",
  searchClear: "Hapus",
  searchOpenInReading:
    "Buka di Bacaan",

  // Notes page
  notesPage: {
    create: "Buat daftar",
    placeholder: "Judul daftar…",
    empty: "Belum ada daftar.",
    items: "item",
    backAll: "← Semua daftar",
    addTextBlock: "Tambah blok teks",
    editTextBlock: "Edit blok",
    deleteItem: "Hapus",
    moveUp: "Pindah ke atas",
    moveDown: "Pindah ke bawah",
    open: "Buka",
    confirmDeleteItem:
      "Hapus item ini?",
    newTextPlaceholder: "Teks Anda…",

    shareCode: "Kode",
    importCode: "Impor kode",
    importPrompt:
      "Tempel kode berbagi TheWord di sini:",
    importError: "Kode tidak valid.",
    importSuccess:
      "Daftar berhasil diimpor ✅",
    shareCodeCopied:
      "Kode disalin ke papan klip ✅",

    importTextButton: "Teks → Daftar",
    importTextTitlePlaceholder:
      "Judul daftar baru",
    importTextDefaultTitle:
      "Impor teks",
    importTextBodyPlaceholder:
      "Tempel teks Anda di sini…",
    importTextNoBody:
      "Silakan tempel teks untuk diimpor.",
    importTextNoBlock:
      "Tidak ada blok yang terdeteksi (berilah baris kosong jika ingin memecah menjadi blok).",
    importTextSplitLabel:
      "Bagi menjadi blok (dipisahkan sedikitnya satu baris kosong)",
    importTextInfo:
      "Setiap blok akan menjadi satu item dalam daftar.",
    importTextCreate: "Buat daftar",

    duplicateTitle:
      "Sudah ada daftar dengan judul yang sama.",
    confirmDeleteList:
      "Hapus daftar ini?",
    emptyList: "Daftar kosong.",

    importFromTextTitle:
      "Impor dari teks",
    documentContent: "Isi dokumen",
    renameList: "Ganti nama",
  },

  // Principles page
  principlesPage: {
    create: "Buat studi",
    placeholder: "Judul studi…",
    empty: "Belum ada studi.",
    items: "item",
    backAll: "← Semua studi",
    addTextBlock: "Tambah blok teks",
    editTextBlock: "Edit blok",
    deleteItem: "Hapus",
    moveUp: "Pindah ke atas",
    moveDown: "Pindah ke bawah",
    open: "Buka",
    openReading: "Buka Bacaan",
    confirmDeleteItem:
      "Hapus item ini?",
    newTextPlaceholder: "Teks Anda…",

    shareCode: "Kode",
    importCode: "Impor kode",
    importPrompt:
      "Tempel kode berbagi TheWord (catatan atau studi) di sini:",
    importError: "Kode tidak valid.",
    importSuccess:
      "Studi berhasil diimpor ✅",
    shareCodeCopied:
      "Kode disalin ke papan klip ✅",

    importTextButton: "Teks → Studi",
    importTextTitlePlaceholder:
      "Judul studi baru",
    importTextDefaultTitle:
      "Impor teks",
    importTextBodyPlaceholder:
      "Tempel teks Anda di sini…",
    importTextNoBody:
      "Silakan tempel teks untuk diimpor.",
    importTextNoBlock:
      "Tidak ada blok yang terdeteksi (berilah baris kosong jika ingin memecah menjadi blok).",
    importTextSplitLabel:
      "Bagi menjadi blok (dipisahkan sedikitnya satu baris kosong)",
    importTextInfo:
      "Setiap blok akan menjadi satu item dalam studi.",
    importTextCreate: "Buat studi",

    duplicateTitle:
      "Sudah ada studi dengan judul yang sama.",
    confirmDeleteList:
      "Hapus studi ini?",
    emptyList: "Studi kosong.",

    importFromTextTitle:
      "Impor dari teks",
    documentContent: "Isi dokumen",
    renameList: "Ganti nama",
    share: "Bagikan",
    copy: "Salin",
    deleteList: "Hapus",

    shareStudyTitle: "Studi",
    shareItemTitle: "Ayat",
  },

  // Settings
  appearance: "Tampilan",
  lightMode: "Mode terang",
  darkMode: "Mode gelap",
  fontSize: "Ukuran huruf",
  language: "Bahasa",
  french: "Prancis",
  english: "Inggris",
  fontSizeXLLabel:
    "Mode huruf besar (XL)",
  fontSizePreview:
    "Pratinjau ukuran huruf yang dipilih.",
  updates: "Pembaruan",
  updatesDescription:
    "Periksa apakah ada versi baru dan terapkan.",
  applyUpdate: "Terapkan pembaruan",
  checkUpdatesButton:
    "Periksa pembaruan",
  updatesChecking: "Sedang memeriksa…",
  updatesUpToDate:
    "Aplikasi Anda sudah versi terbaru.",
  updatesReady:
    "Versi baru siap. Ketuk “Terapkan pembaruan”.",
  updatesUnavailable:
    "Pembaruan otomatis tidak tersedia (Service Worker tidak terdeteksi).",
  updatesError:
    "Terjadi kesalahan saat memeriksa. Silakan coba lagi.",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word membantu Anda menemukan firman Tuhan melalui ayat acak dan pembacaan Alkitab secara lengkap.",
  aboutIntro:
    "TheWord: pembacaan Alkitab offline, pencarian instan, catatan tematik, berbagi sekali sentuh. Anda juga dapat memakai TheWord di web: www.theword.fr",
  bibleVersions: "Versi Alkitab",
  frenchVersion:
    "Prancis: Louis Segond 1910 (LSG) – Revisi 2025 – Domain publik",
  englishVersion:
    "Inggris: King James Version (KJV) – Domain publik",
  frenchVersionDetails:
    "Versi acuan Alkitab dalam bahasa Prancis, diterjemahkan oleh Louis Segond pada 1910 dan diperbarui tahun 2025 (modernisasi kosakata dan tata bahasa, tetap setia pada naskah asli).",
  englishVersionDetails:
    "Versi klasik bahasa Inggris (KJV), diterbitkan tahun 1611, direvisi tahun 1769 dan sedikit diperbarui tahun 2025.",
  otherLanguagesNote:
    "Bahasa lain (Jerman, Portugis, dan lain-lain) sedang dipersiapkan. Sementara itu, antarmuka memakai bahasa Inggris bila terjemahan belum tersedia.",
  randomFeature: "Fitur acak",
  randomFeatureDesc:
    "Generator ayat acak kami memilih dari lebih dari 31.000 ayat Alkitab untuk memberi Anda inspirasi setiap hari.",
  musicLink: "Musik Sang Pencipta",
  versesLabel: "Ayat",
  booksLabel: "Kitab",
  readingShortcuts:
    "Jalan pintas bacaan",
  notesIntro:
    "Atur bagian favorit dan pikiran Anda dalam daftar-daftar tematik.",
  notesPoint1:
    "Tambahkan ayat atau blok teks bebas.",
  notesPoint2:
    "Ketuk sebuah item untuk membuka menu (Buka di Bacaan, Pindah ke atas/bawah, Hapus…).",
  notesPoint3:
    "Ganti nama daftar, salin dan bagikan.",
  createdWithLove:
    "Dibuat dengan kasih untuk menyebarkan Firman Tuhan",
  versionsFootnote:
    "Semua versi Alkitab yang digunakan berada di domain publik. Beberapa telah dimodernisasi sebagian (kosakata, tata bahasa) tetapi tetap sangat setia pada naskah aslinya.",

  // Quick slots
  quickSlotsIntro:
    "Keempat tombol di sebelah kanan pemilih Kitab/Pasal ini memudahkan Anda kembali ke bacaan yang sering, sehingga dapat mengikuti beberapa kitab secara paralel: gunakan 1/2/3 untuk tiga lokasi, dan kaca pembesar untuk kembali ke bagian terakhir (ayat acak atau hasil pencarian).",
  quickSlotsIllustrationLabel:
    "Ilustrasi jalan pintas",
  quickSlotLastPassageTooltip:
    "Bagian terakhir",
  quickSlot1ActiveTooltip:
    "Jalan pintas 1 (aktif)",
  quickSlot2Tooltip: "Jalan pintas 2",
  quickSlot3Tooltip: "Jalan pintas 3",

  // Common
  loading: "Memuat...",
  error: "Terjadi kesalahan saat memuat",
};

// Swahili translations
const swTranslations = {
  // Navigation
  home: "Mwanzo",
  reading: "Usomaji",
  search: "Utafutaji",
  settings: "Mipangilio",
  about: "Kuhusu",
  notes: "Dondoo",
  principles: "Masomo",

  // Home page
  randomVerse: "Aya ya nasibu",
  newVerse: "Aya mpya",
  copyVerse: "Nakili aya",
  verseCopied: "Aya imenakiliwa!",
  godSpeaks: "Mungu anazungumza nawe",
  openJeremiah: "Fungua Yeremia 23:29",
  jeremiah23Quote:
    "“Je, neno langu si kama moto? asema Bwana, na kama nyundo iivunjayo mwamba?” Yeremia 23:29",

  // Reading page
  selectBook: "Chagua kitabu",
  selectChapter: "Chagua sura",
  chapter: "Sura",
  oldTestament: "Agano la Kale",
  newTestament: "Agano Jipya",

  // Reading – extras
  chooseBook: "Chagua kitabu",
  chooseChapter: "Chagua sura",
  prevChapter: "Sura iliyotangulia",
  nextChapter: "Sura inayofuata",
  verseWord: "aya",
  versesSelectedSuffix:
    "aya zilizochaguliwa",
  toNotes: "Kwenda Dondoo",
  toPrinciples: "Kwenda Masomo",
  copyLabel: "Nakili",
  shareLabel: "Shiriki",
  cancel: "Ghairi",
  close: "Funga",
  notesModalTitle:
    "Ongeza kwenye orodha (Dondoo)",
  notesNoList:
    "Bado hakuna orodha. Unda moja hapa chini.",
  notesNewListOptional:
    "Orodha mpya (hiari)",
  principlesModalTitle:
    "Ongeza kwenye somo (Masomo)",
  principlesNoList:
    "Bado hakuna somo. Unda moja hapa chini.",
  principlesNewListOptional:
    "Somo jipya (hiari)",
  selectionCopied:
    "Uteuzi umenakiliwa",
  textReadyToShare:
    "Maandishi yako tayari kushirikiwa (yamenakiliwa)",
  addedToList: "Imeongezwa kwenye orodha",
  newRandom: "Aya ya nasibu mpya",
  swipeLabel: "Telezesha",
  searchSlotLabel: "Tafuta",
  searchSlotEmpty: "Tafuta (tupu)",
  memorySlotLabel: "Slot",
  emptySlotSuffix: "(tupu)",
  untitledList: "(bila kichwa)",

  // Short label “Copied”
  copiedShort: "Imenakiliwa",

  // Search page
  searchTitle: "Utafutaji wa Biblia",
  searchPlaceholder:
    "Andika utafutaji wako",
  searchMinChars:
    "Andika angalau herufi 2.",
  searchSearching: "Inatafuta…",
  searchResults: "Matokeo",
  searchExpandAll: "Fungua yote",
  searchCollapseAll: "Funga yote",
  searchNoResults:
    "Hakuna aya zilizopatikana.",
  searchClear: "Futa",
  searchOpenInReading:
    "Fungua katika Usomaji",

  // Notes page
  notesPage: {
    create: "Unda orodha",
    placeholder: "Kichwa cha orodha…",
    empty: "Bado hakuna orodha.",
    items: "vipengee",
    backAll: "← Orodha zote",
    addTextBlock:
      "Ongeza kifungu cha maandishi",
    editTextBlock: "Hariri kifungu",
    deleteItem: "Futa",
    moveUp: "Hamisha juu",
    moveDown: "Hamisha chini",
    open: "Fungua",
    confirmDeleteItem:
      "Ungependa kufuta kipengee hiki?",
    newTextPlaceholder:
      "Andika maandishi yako…",

    shareCode: "Msimbo",
    importCode: "Ingiza msimbo",
    importPrompt:
      "Bandika hapa msimbo wa kushirikiana wa TheWord:",
    importError: "Msimbo si sahihi.",
    importSuccess:
      "Orodha imeingizwa kwa mafanikio ✅",
    shareCodeCopied:
      "Msimbo umenakiliwa kwenye ubao wa kunakili ✅",

    importTextButton: "Maandishi → Orodha",
    importTextTitlePlaceholder:
      "Kichwa cha orodha mpya",
    importTextDefaultTitle:
      "Ingiza maandishi",
    importTextBodyPlaceholder:
      "Bandika maandishi yako hapa…",
    importTextNoBody:
      "Tafadhali bandika maandishi ya kuingizwa.",
    importTextNoBlock:
      "Hakuna vifungu vilivyopatikana (acha mistari tupu ukitaka kugawanya katika vifungu).",
    importTextSplitLabel:
      "Gawanya katika vifungu (vimetenganishwa angalau na mstari mmoja tupu)",
    importTextInfo:
      "Kila kifungu kitakuwa kipengee katika orodha.",
    importTextCreate: "Unda orodha",

    duplicateTitle:
      "Tayari kuna orodha yenye kichwa hicho.",
    confirmDeleteList:
      "Ungependa kufuta orodha hii?",
    emptyList: "Orodha tupu.",

    importFromTextTitle:
      "Ingiza kutoka kwa maandishi",
    documentContent:
      "Yaliyomo kwenye hati",
    renameList: "Badili kichwa",
  },

  // Principles page
  principlesPage: {
    create: "Unda somo",
    placeholder: "Kichwa cha somo…",
    empty: "Bado hakuna somo.",
    items: "vipengee",
    backAll: "← Masomo yote",
    addTextBlock:
      "Ongeza kifungu cha maandishi",
    editTextBlock: "Hariri kifungu",
    deleteItem: "Futa",
    moveUp: "Hamisha juu",
    moveDown: "Hamisha chini",
    open: "Fungua",
    openReading: "Fungua Usomaji",
    confirmDeleteItem:
      "Ungependa kufuta kipengee hiki?",
    newTextPlaceholder:
      "Andika maandishi yako…",

    shareCode: "Msimbo",
    importCode: "Ingiza msimbo",
    importPrompt:
      "Bandika hapa msimbo wa kushirikiana wa TheWord (dondoo au somo):",
    importError: "Msimbo si sahihi.",
    importSuccess:
      "Somo limeingizwa kwa mafanikio ✅",
    shareCodeCopied:
      "Msimbo umenakiliwa kwenye ubao wa kunakili ✅",

    importTextButton: "Maandishi → Somo",
    importTextTitlePlaceholder:
      "Kichwa cha somo jipya",
    importTextDefaultTitle:
      "Ingiza maandishi",
    importTextBodyPlaceholder:
      "Bandika maandishi yako hapa…",
    importTextNoBody:
      "Tafadhali bandika maandishi ya kuingizwa.",
    importTextNoBlock:
      "Hakuna vifungu vilivyopatikana (acha mistari tupu ukitaka kugawanya katika vifungu).",
    importTextSplitLabel:
      "Gawanya katika vifungu (vimetenganishwa angalau na mstari mmoja tupu)",
    importTextInfo:
      "Kila kifungu kitakuwa kipengee katika somo.",
    importTextCreate: "Unda somo",

    duplicateTitle:
      "Tayari kuna somo lenye kichwa hicho.",
    confirmDeleteList:
      "Ungependa kufuta somo hili?",
    emptyList: "Somo tupu.",

    importFromTextTitle:
      "Ingiza kutoka kwa maandishi",
    documentContent:
      "Yaliyomo kwenye hati",
    renameList: "Badili kichwa",
    share: "Shiriki",
    copy: "Nakili",
    deleteList: "Futa",

    shareStudyTitle: "Somo",
    shareItemTitle: "Aya",
  },

  // Settings
  appearance: "Mwonekano",
  lightMode: "Hali ya mwanga",
  darkMode: "Hali ya giza",
  fontSize: "Ukubwa wa herufi",
  language: "Lugha",
  french: "Kifaransa",
  english: "Kiingereza",
  fontSizeXLLabel:
    "Hali ya herufi kubwa (XL)",
  fontSizePreview:
    "Muonekano wa ukubwa wa herufi uliyochagua.",
  updates: "Sasisho",
  updatesDescription:
    "Kagua kama kuna toleo jipya na ulitumie.",
  applyUpdate: "Tumia sasisho",
  checkUpdatesButton:
    "Kagua sasisho",
  updatesChecking: "Inakagua…",
  updatesUpToDate:
    "Programu yako iko katika toleo la hivi karibuni.",
  updatesReady:
    "Toleo jipya liko tayari. Gonga “Tumia sasisho”.",
  updatesUnavailable:
    "Sasisho la kiotomatiki halipatikani (Service Worker haijapatikana).",
  updatesError:
    "Hitilafu imetokea wakati wa kukagua. Jaribu tena.",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word hukusaidia kugundua Neno la Mungu kupitia aya za nasibu na usomaji kamili wa Biblia.",
  aboutIntro:
    "TheWord: usomaji wa Biblia bila mtandao, utafutaji wa haraka, dondoo za mada, kushiriki kwa kubofya mara moja. Unaweza pia kutumia TheWord kwenye wavuti: www.theword.fr",
  bibleVersions: "Toleo za Biblia",
  frenchVersion:
    "Kifaransa: Louis Segond 1910 (LSG) – Marekebisho 2025 – Eneo la umma",
  englishVersion:
    "Kiingereza: King James Version (KJV) – Eneo la umma",
  frenchVersionDetails:
    "Tafsiri ya marejeo ya Biblia kwa Kifaransa, iliyotafsiriwa na Louis Segond mwaka 1910 na kurekebishwa mwaka 2025 (kusasishwa kwa msamiati na sarufi, ikiwa mwaminifu kwa maandiko asili).",
  englishVersionDetails:
    "Toleo la kale la Biblia kwa Kiingereza (KJV), lililochapishwa 1611, likarekebishwa 1769 na kusasishwa kidogo 2025.",
  otherLanguagesNote:
    "Lugha nyingine (Kijerumani, Kireno, nk.) ziko katika maandalizi. Kwa sasa, kiolesura hutumia Kiingereza pale ambapo tafsiri haijapatikana bado.",
  randomFeature: "Kipengele cha nasibu",
  randomFeatureDesc:
    "Kizalishaji chetu cha aya za nasibu huchagua kutoka kwenye zaidi ya aya 31,000 za Biblia ili kukupa msukumo wa kila siku.",
  musicLink: "Muziki wa Muumba",
  versesLabel: "Aya",
  booksLabel: "Vitabu",
  readingShortcuts:
    "Njia za mkato za usomaji",
  notesIntro:
    "Panga vifungu unavyovipenda na mawazo yako katika orodha za mada.",
  notesPoint1:
    "Ongeza aya au vifungu vya maandishi ya bure.",
  notesPoint2:
    "Gonga kipengee ili kufungua menyu (Fungua katika Usomaji, hamisha juu/chini, futa…).",
  notesPoint3:
    "Badili majina ya orodha, nakili na ushiriki.",
  createdWithLove:
    "Imetengenezwa kwa upendo ili kueneza Neno la Mungu",
  versionsFootnote:
    "Toleo zote za Biblia zinazotumika ziko katika eneo la umma. Baadhi zimesasishwa kidogo (msamiati, sarufi) huku zikiendelea kuwa waaminifu kabisa kwa maandiko asili.",

  // Quick slots
  quickSlotsIntro:
    "Vitufe hivi 4, vilivyo upande wa kulia wa kiteua Kitabu/Sura, vinakuruhusu kurudi mara moja kwenye usomaji unaourudia mara nyingi ili usome vitabu kadhaa kwa wakati mmoja: tumia 1/2/3 kwa sehemu tatu, na kioo cha kukuza kurudi kwenye sehemu ya mwisho (aya ya nasibu au matokeo ya utafutaji).",
  quickSlotsIllustrationLabel:
    "Mchoro wa njia za mkato",
  quickSlotLastPassageTooltip:
    "Sehemu ya mwisho",
  quickSlot1ActiveTooltip:
    "Njia ya mkato 1 (inayotumika)",
  quickSlot2Tooltip:
    "Njia ya mkato 2",
  quickSlot3Tooltip:
    "Njia ya mkato 3",

  // Common
  loading: "Inapakia...",
  error:
    "Hitilafu imetokea wakati wa kupakia",
};

// Korean translations
const koTranslations = {
  // Navigation
  home: "홈",
  reading: "성경 읽기",
  search: "검색",
  settings: "설정",
  about: "정보",
  notes: "노트",
  principles: "연구",

  // Home page
  randomVerse: "무작위 구절",
  newVerse: "새 구절",
  copyVerse: "구절 복사",
  verseCopied: "구절이 복사되었습니다!",
  godSpeaks: "하나님이 당신에게 말씀하십니다",
  openJeremiah: "예레미야 23:29 열기",
  jeremiah23Quote:
    "“여호와의 말씀이니라, 내 말이 불 같지 아니하냐, 바위를 쳐서 부수는 망치 같지 아니하냐?” (예레미야 23:29)",

  // Reading page
  selectBook: "책 선택",
  selectChapter: "장 선택",
  chapter: "장",
  oldTestament: "구약",
  newTestament: "신약",

  // Reading – extras
  chooseBook: "책을 선택하세요",
  chooseChapter: "장을 선택하세요",
  prevChapter: "이전 장",
  nextChapter: "다음 장",
  verseWord: "절",
  versesSelectedSuffix: "개 절 선택됨",
  toNotes: "노트로 보내기",
  toPrinciples: "연구로 보내기",
  copyLabel: "복사",
  shareLabel: "공유",
  cancel: "취소",
  close: "닫기",
  notesModalTitle: "목록에 추가 (노트)",
  notesNoList: "아직 목록이 없습니다. 아래에서 새로 만드세요.",
  notesNewListOptional: "새 목록 (선택 사항)",
  principlesModalTitle: "연구에 추가 (연구)",
  principlesNoList: "아직 연구가 없습니다. 아래에서 새로 만드세요.",
  principlesNewListOptional: "새 연구 (선택 사항)",
  selectionCopied: "선택한 내용이 복사되었습니다",
  textReadyToShare: "공유할 텍스트가 준비되었습니다 (복사 완료)",
  addedToList: "목록에 추가되었습니다",
  newRandom: "새 무작위",
  swipeLabel: "옆으로 밀기",
  searchSlotLabel: "검색",
  searchSlotEmpty: "검색 (비어 있음)",
  memorySlotLabel: "슬롯",
  emptySlotSuffix: "(비어 있음)",
  untitledList: "(제목 없음)",

  // Short label “Copied”
  copiedShort: "복사됨",

  // Search page
  searchTitle: "성경 검색",
  searchPlaceholder: "검색어를 입력하세요",
  searchMinChars: "검색하려면 최소 두 글자를 입력하세요.",
  searchSearching: "검색 중…",
  searchResults: "결과",
  searchExpandAll: "모두 펼치기",
  searchCollapseAll: "모두 접기",
  searchNoResults: "구절을 찾을 수 없습니다.",
  searchClear: "지우기",
  searchOpenInReading: "읽기에서 열기",

  // Notes page
  notesPage: {
    create: "목록 만들기",
    placeholder: "목록 제목…",
    empty: "아직 목록이 없습니다.",
    items: "개 항목",
    backAll: "← 모든 목록",
    addTextBlock: "텍스트 블록 추가",
    editTextBlock: "블록 편집",
    deleteItem: "삭제",
    moveUp: "위로 이동",
    moveDown: "아래로 이동",
    open: "열기",
    confirmDeleteItem: "이 항목을 삭제하시겠습니까?",
    newTextPlaceholder: "텍스트를 입력하세요…",

    // Share / import via code
    shareCode: "코드",
    importCode: "코드 가져오기",
    importPrompt: "여기에 TheWord 공유 코드를 붙여넣으세요:",
    importError: "잘못된 코드입니다.",
    importSuccess: "목록을 성공적으로 가져왔습니다 ✅",
    shareCodeCopied: "코드를 클립보드에 복사했습니다 ✅",

    // Direct import from text
    importTextButton: "텍스트 → 목록",
    importTextTitlePlaceholder: "새 목록 제목",
    importTextDefaultTitle: "텍스트 가져오기",
    importTextBodyPlaceholder: "여기에 텍스트를 붙여넣으세요…",
    importTextNoBody: "가져올 텍스트를 붙여넣어 주세요.",
    importTextNoBlock:
      "블록이 감지되지 않았습니다 (블록으로 나누려면 빈 줄을 남겨 두세요).",
    importTextSplitLabel:
      "블록으로 나누기 (최소 한 줄의 빈 줄로 구분)",
    importTextInfo: "각 블록은 목록의 한 항목이 됩니다.",
    importTextCreate: "목록 만들기",

    duplicateTitle: "같은 제목의 목록이 이미 존재합니다.",
    confirmDeleteList: "이 목록을 삭제하시겠습니까?",
    emptyList: "비어 있는 목록입니다.",

    importFromTextTitle: "텍스트에서 가져오기",
    documentContent: "문서 내용",
    renameList: "이름 바꾸기"
  },

  // Principles page
  principlesPage: {
    create: "연구 만들기",
    placeholder: "연구 제목…",
    empty: "아직 연구가 없습니다.",
    items: "개 항목",
    backAll: "← 모든 연구",
    addTextBlock: "텍스트 블록 추가",
    editTextBlock: "블록 편집",
    deleteItem: "삭제",
    moveUp: "위로 이동",
    moveDown: "아래로 이동",
    open: "열기",
    openReading: "읽기 열기",
    confirmDeleteItem: "이 항목을 삭제하시겠습니까?",
    newTextPlaceholder: "텍스트를 입력하세요…",

    shareCode: "코드",
    importCode: "코드 가져오기",
    importPrompt: "여기에 TheWord 공유 코드(노트 또는 연구)를 붙여넣으세요:",
    importError: "잘못된 코드입니다.",
    importSuccess: "연구를 성공적으로 가져왔습니다 ✅",
    shareCodeCopied: "코드를 클립보드에 복사했습니다 ✅",

    importTextButton: "텍스트 → 연구",
    importTextTitlePlaceholder: "새 연구 제목",
    importTextDefaultTitle: "텍스트 가져오기",
    importTextBodyPlaceholder: "여기에 텍스트를 붙여넣으세요…",
    importTextNoBody: "가져올 텍스트를 붙여넣어 주세요.",
    importTextNoBlock:
      "블록이 감지되지 않았습니다 (블록으로 나누려면 빈 줄을 남겨 두세요).",
    importTextSplitLabel:
      "블록으로 나누기 (최소 한 줄의 빈 줄로 구분)",
    importTextInfo: "각 블록은 연구의 한 항목이 됩니다.",
    importTextCreate: "연구 만들기",

    duplicateTitle: "같은 제목의 연구가 이미 존재합니다.",
    confirmDeleteList: "이 연구를 삭제하시겠습니까?",
    emptyList: "비어 있는 연구입니다.",

    importFromTextTitle: "텍스트에서 가져오기",
    documentContent: "문서 내용",
    renameList: "이름 바꾸기",
    share: "공유",
    copy: "복사",
    deleteList: "삭제",

    shareStudyTitle: "연구",
    shareItemTitle: "구절"
  },

  // Settings page
  appearance: "모양",
  lightMode: "라이트 모드",
  darkMode: "다크 모드",
  fontSize: "글자 크기",
  language: "언어",
  french: "프랑스어",
  english: "영어",
  fontSizeXLLabel: "저시력 모드 (XL)",
  fontSizePreview: "선택한 글자 크기의 미리 보기입니다.",
  updates: "업데이트",
  updatesDescription:
    "새 버전이 있는지 확인하고 적용합니다.",
  applyUpdate: "업데이트 적용",
  checkUpdatesButton: "업데이트 확인",
  updatesChecking: "확인 중…",
  updatesUpToDate: "앱이 최신 버전입니다.",
  updatesReady:
    "새 버전이 준비되었습니다. \"업데이트 적용\"을 눌러 주세요.",
  updatesUnavailable:
    "자동 업데이트를 사용할 수 없습니다 (Service Worker를 찾을 수 없음).",
  updatesError: "확인 중 오류가 발생했습니다. 다시 시도해 주세요.",

  // About page
  aboutTitle: "",
  aboutDescription:
    "The Word는 무작위 구절과 성경 전체 읽기를 통해 하나님의 말씀을 발견하도록 도와줍니다.",
  aboutIntro:
    "TheWord: 오프라인 성경 읽기, 즉시 검색, 주제별 노트, 한 번에 공유. 웹에서도 TheWord를 사용할 수 있습니다: www.theword.fr",
  bibleVersions: "성경 번역들",
  frenchVersion:
    "프랑스어: Louis Segond 1910 (LSG) – 2025 개정 – 퍼블릭 도메인",
  englishVersion:
    "영어: King James Version (KJV) – 퍼블릭 도메인",
  frenchVersionDetails:
    "프랑스어 성경의 표준 번역으로, 1910년 Louis Segond가 번역했으며 2025년에 어휘와 문법이 현대화되었습니다 (원문 사본에 충실).",
  englishVersionDetails:
    "고전적인 영어 번역(KJV)으로 1611년에 출판되고 1769년에 개정되었으며 2025년에 일부 현대화되었습니다.",
  otherLanguagesNote:
    "다른 언어(독일어, 포르투갈어 등)가 준비 중입니다. 번역이 아직 준비되지 않은 경우 인터페이스는 영어로 표시됩니다.",
  randomFeature: "무작위 기능",
  randomFeatureDesc:
    "무작위 구절 생성기는 31,000개가 넘는 성경 구절 중에서 선택하여 매일 영감을 드립니다.",
  musicLink: "창조주의 음악",
  versesLabel: "구절",
  booksLabel: "책",
  readingShortcuts: "읽기 바로가기",
  notesIntro:
    "좋아하는 구절과 생각을 주제별 목록으로 정리하세요.",
  notesPoint1: "구절이나 자유 텍스트 블록을 추가하세요.",
  notesPoint2:
    "항목을 탭하면 메뉴가 열립니다 (읽기에서 열기, 위/아래로 이동, 삭제 등).",
  notesPoint3: "목록 이름을 바꾸고 복사하거나 공유할 수 있습니다.",
  createdWithLove:
    "하나님의 말씀을 전하기 위해 사랑으로 만들었습니다",
  versionsFootnote:
    "사용되는 모든 성경 번역은 퍼블릭 도메인입니다. 일부는 어휘와 문법이 부분적으로 현대화되었지만, 원본 사본에 엄격히 충실합니다.",

  // Quick slots
  quickSlotsIntro:
    "책/장 선택기 오른쪽에 있는 네 개의 버튼은 자주 읽는 본문으로 즉시 돌아가 여러 책을 병행해서 읽을 수 있게 해 줍니다. 1/2/3은 세 개의 위치에, 돋보기는 마지막 본문(무작위 구절 또는 검색 결과)에 사용하세요.",
  quickSlotsIllustrationLabel: "바로가기 예시",
  quickSlotLastPassageTooltip: "마지막 본문",
  quickSlot1ActiveTooltip: "바로가기 1 (활성)",
  quickSlot2Tooltip: "바로가기 2",
  quickSlot3Tooltip: "바로가기 3",

  // Common
  loading: "로딩 중...",
  error: "로딩 중 오류가 발생했습니다"
};

// Japanese translations
const jaTranslations = {
  // Navigation
  home: "ホーム",
  reading: "聖書を読む",
  search: "検索",
  settings: "設定",
  about: "このアプリについて",
  notes: "ノート",
  principles: "学び",

  // Home page
  randomVerse: "ランダムな聖句",
  newVerse: "新しい聖句",
  copyVerse: "聖句をコピー",
  verseCopied: "聖句をコピーしました！",
  godSpeaks: "神様があなたに語っておられます",
  openJeremiah: "エレミヤ 23:29 を開く",
  jeremiah23Quote:
    "「わたしのことばは火のようではないか──主の御告げ──岩を砕く槌のようではないか。」（エレミヤ 23:29）",

  // Reading page
  selectBook: "書を選ぶ",
  selectChapter: "章を選ぶ",
  chapter: "章",
  oldTestament: "旧約聖書",
  newTestament: "新約聖書",

  // Reading – extras
  chooseBook: "書を選択してください",
  chooseChapter: "章を選択してください",
  prevChapter: "前の章",
  nextChapter: "次の章",
  verseWord: "節",
  versesSelectedSuffix: "節が選択されています",
  toNotes: "ノートへ",
  toPrinciples: "学びへ",
  copyLabel: "コピー",
  shareLabel: "共有",
  cancel: "キャンセル",
  close: "閉じる",
  notesModalTitle: "リストに追加（ノート）",
  notesNoList: "まだリストがありません。下で作成してください。",
  notesNewListOptional: "新しいリスト（任意）",
  principlesModalTitle: "学びに追加（学び）",
  principlesNoList: "まだ学びがありません。下で作成してください。",
  principlesNewListOptional: "新しい学び（任意）",
  selectionCopied: "選択範囲をコピーしました",
  textReadyToShare:
    "共有するためのテキストが準備できました（コピー済み）",
  addedToList: "リストに追加しました",
  newRandom: "新しいランダム",
  swipeLabel: "スワイプ",
  searchSlotLabel: "検索",
  searchSlotEmpty: "検索（空）",
  memorySlotLabel: "スロット",
  emptySlotSuffix: "（空）",
  untitledList: "（タイトルなし）",

  // Short label “Copied”
  copiedShort: "コピーしました",

  // Search page
  searchTitle: "聖書検索",
  searchPlaceholder: "検索語を入力してください",
  searchMinChars:
    "検索するには 2 文字以上入力してください。",
  searchSearching: "検索中…",
  searchResults: "結果",
  searchExpandAll: "すべて展開",
  searchCollapseAll: "すべて折りたたむ",
  searchNoResults:
    "該当する聖句は見つかりませんでした。",
  searchClear: "クリア",
  searchOpenInReading: "「読む」で開く",

  // Notes page
  notesPage: {
    create: "リストを作成",
    placeholder: "リストのタイトル…",
    empty: "まだリストがありません。",
    items: "件",
    backAll: "← すべてのリスト",
    addTextBlock: "テキストブロックを追加",
    editTextBlock: "ブロックを編集",
    deleteItem: "削除",
    moveUp: "上へ移動",
    moveDown: "下へ移動",
    open: "開く",
    confirmDeleteItem:
      "この項目を削除しますか？",
    newTextPlaceholder: "テキストを入力してください…",

    shareCode: "コード",
    importCode: "コードをインポート",
    importPrompt:
      "ここに TheWord の共有コードを貼り付けてください:",
    importError: "無効なコードです。",
    importSuccess: "リストをインポートしました ✅",
    shareCodeCopied:
      "コードをクリップボードにコピーしました ✅",

    importTextButton: "テキスト → リスト",
    importTextTitlePlaceholder:
      "新しいリストのタイトル",
    importTextDefaultTitle: "テキストのインポート",
    importTextBodyPlaceholder:
      "ここにテキストを貼り付けてください…",
    importTextNoBody:
      "インポートするテキストを貼り付けてください。",
    importTextNoBlock:
      "ブロックが検出されませんでした（ブロックに分ける場合は空行を入れてください）。",
    importTextSplitLabel:
      "ブロックに分割（1 行以上の空行で区切る）",
    importTextInfo:
      "各ブロックがリストの 1 項目になります。",
    importTextCreate: "リストを作成",

    duplicateTitle:
      "同じタイトルのリストがすでに存在します。",
    confirmDeleteList:
      "このリストを削除しますか？",
    emptyList: "空のリストです。",

    importFromTextTitle:
      "テキストからインポート",
    documentContent: "文書の内容",
    renameList: "名前を変更"
  },

  // Principles page
  principlesPage: {
    create: "学びを作成",
    placeholder: "学びのタイトル…",
    empty: "まだ学びがありません。",
    items: "件",
    backAll: "← すべての学び",
    addTextBlock: "テキストブロックを追加",
    editTextBlock: "ブロックを編集",
    deleteItem: "削除",
    moveUp: "上へ移動",
    moveDown: "下へ移動",
    open: "開く",
    openReading: "読む画面を開く",
    confirmDeleteItem:
      "この項目を削除しますか？",
    newTextPlaceholder: "テキストを入力してください…",

    shareCode: "コード",
    importCode: "コードをインポート",
    importPrompt:
      "ここに TheWord の共有コード（ノートまたは学び）を貼り付けてください:",
    importError: "無効なコードです。",
    importSuccess: "学びをインポートしました ✅",
    shareCodeCopied:
      "コードをクリップボードにコピーしました ✅",

    importTextButton: "テキスト → 学び",
    importTextTitlePlaceholder:
      "新しい学びのタイトル",
    importTextDefaultTitle: "テキストのインポート",
    importTextBodyPlaceholder:
      "ここにテキストを貼り付けてください…",
    importTextNoBody:
      "インポートするテキストを貼り付けてください。",
    importTextNoBlock:
      "ブロックが検出されませんでした（ブロックに分ける場合は空行を入れてください）。",
    importTextSplitLabel:
      "ブロックに分割（1 行以上の空行で区切る）",
    importTextInfo:
      "各ブロックが学びの 1 項目になります。",
    importTextCreate: "学びを作成",

    duplicateTitle:
      "同じタイトルの学びがすでに存在します。",
    confirmDeleteList:
      "この学びを削除しますか？",
    emptyList: "空の学びです。",

    importFromTextTitle:
      "テキストからインポート",
    documentContent: "文書の内容",
    renameList: "名前を変更",
    share: "共有",
    copy: "コピー",
    deleteList: "削除",

    shareStudyTitle: "学び",
    shareItemTitle: "聖句"
  },

  // Settings page
  appearance: "外観",
  lightMode: "ライトモード",
  darkMode: "ダークモード",
  fontSize: "文字サイズ",
  language: "言語",
  french: "フランス語",
  english: "英語",
  fontSizeXLLabel: "大きな文字モード (XL)",
  fontSizePreview:
    "選択した文字サイズのプレビュー。",
  updates: "アップデート",
  updatesDescription:
    "新しいバージョンがあるか確認して適用します。",
  applyUpdate: "アップデートを適用",
  checkUpdatesButton: "アップデートを確認",
  updatesChecking: "確認中…",
  updatesUpToDate: "アプリは最新です。",
  updatesReady:
    "新しいバージョンの準備ができました。「アップデートを適用」をタップしてください。",
  updatesUnavailable:
    "自動アップデートを利用できません（Service Worker が検出されません）。",
  updatesError:
    "確認中にエラーが発生しました。もう一度お試しください。",

  // About page
  aboutTitle: "",
  aboutDescription:
    "The Word は、ランダムな聖句と聖書通読を通して、神のことばを発見するのを助けるアプリです。",
  aboutIntro:
    "TheWord: オフラインで聖書を読み、すぐに検索し、テーマ別ノートを作り、ワンタップで共有できます。ウェブ版 TheWord もあります: www.theword.fr",
  bibleVersions: "聖書の翻訳",
  frenchVersion:
    "フランス語: Louis Segond 1910 (LSG) – 2025 改訂 – パブリックドメイン",
  englishVersion:
    "英語: King James Version (KJV) – パブリックドメイン",
  frenchVersionDetails:
    "フランス語聖書の代表的な翻訳で、Louis Segond により 1910 年に翻訳され、2025 年に語彙と文法が現代風に更新されました（原典写本に忠実）。",
  englishVersionDetails:
    "古典的な英語訳 (KJV) で、1611 年に刊行され、1769 年に改訂され、2025 年に軽い更新が加えられています。",
  otherLanguagesNote:
    "他の言語（ドイツ語、ポルトガル語など）も準備中です。それまでは、翻訳がない部分は英語で表示されます。",
  randomFeature: "ランダム機能",
  randomFeatureDesc:
    "ランダム聖句ジェネレーターが、3万1千節以上の聖句から 1 節を選び、毎日あなたに励ましを与えます。",
  musicLink: "創造主の音楽",
  versesLabel: "聖句",
  booksLabel: "書",
  readingShortcuts: "読書ショートカット",
  notesIntro:
    "お気に入りの聖句や思いを書き留め、テーマ別のリストに整理できます。",
  notesPoint1:
    "聖句や自由なテキストブロックを追加します。",
  notesPoint2:
    "項目をタップしてメニューを開きます（読む画面で開く／上へ移動／下へ移動／削除など）。",
  notesPoint3:
    "リストの名前を変更したり、コピー・共有したりできます。",
  createdWithLove:
    "神のことばを広めるために、愛を込めて作られました",
  versionsFootnote:
    "使用しているすべての聖書訳はパブリックドメインです。一部は語彙や文法が部分的に現代化されていますが、原典写本に厳密に忠実です。",

  // Quick slots
  quickSlotsIntro:
    "書／章セレクターの右側に並ぶ 4 つのボタンで、よく読む箇所にすぐ戻り、複数の書を並行して読むことができます。1/2/3 は 3 つの場所の保存に、虫眼鏡は最後に読んだ箇所（ランダム聖句または検索結果）に戻るために使います。",
  quickSlotsIllustrationLabel:
    "ショートカットのイラスト",
  quickSlotLastPassageTooltip: "最後の箇所",
  quickSlot1ActiveTooltip:
    "ショートカット 1（使用中）",
  quickSlot2Tooltip: "ショートカット 2",
  quickSlot3Tooltip: "ショートカット 3",

  // Common
  loading: "読み込み中...",
  error: "読み込み中にエラーが発生しました"
};

// Yoruba translations
const yoTranslations = {
  // Navigation
  home: "Ìbẹ̀rẹ̀",
  reading: "Kà Bíbélì",
  search: "Ṣàwárí",
  settings: "Ètò",
  about: "Nípa",
  notes: "Àkọsílẹ̀",
  principles: "Ìkẹ́kọ̀ọ́",

  // Home page
  randomVerse: "Ẹsẹ àdánidá",
  newVerse: "Ẹsẹ tuntun",
  copyVerse: "Ṣe àdákọ ẹsẹ",
  verseCopied: "A ti ṣe àdákọ ẹsẹ!",
  godSpeaks: "Ọlọ́run ń bá ọ sọ̀rọ̀",
  openJeremiah: "Ṣí Jeremíà 23:29",
  jeremiah23Quote:
    "«Ọ̀rọ̀ mi kì í ṣe bí iná? ni Oluwa wí, tí ó sì dàbí ìlùùdá tí ń fọ àpáta?» Jeremíà 23:29",

  // Reading page
  selectBook: "Yan ìwé",
  selectChapter: "Yan apá",
  chapter: "Apá",
  oldTestament: "Májẹ́mú Lailai",
  newTestament: "Májẹ́mú Titun",

  // Reading – extras
  chooseBook: "Yan ìwé kan",
  chooseChapter: "Yan apá kan",
  prevChapter: "Apá tó kọjá",
  nextChapter: "Apá tó kàn",
  verseWord: "ẹsẹ",
  versesSelectedSuffix: "ẹsẹ yàn",
  toNotes: "Lọ sí Àkọsílẹ̀",
  toPrinciples: "Lọ sí Ìkẹ́kọ̀ọ́",
  copyLabel: "Àdákọ",
  shareLabel: "Pín",
  cancel: "Fagilé",
  close: "Pa",
  notesModalTitle:
    "Fi kún àkójọ (Àkọsílẹ̀)",
  notesNoList:
    "Àkójọ kankan kò tíì sí. Dá tuntun sí isalẹ.",
  notesNewListOptional:
    "Àkójọ tuntun (àṣàyàn)",
  principlesModalTitle:
    "Fi kún ìkẹ́kọ̀ọ́ (Ìkẹ́kọ̀ọ́)",
  principlesNoList:
    "Ìkẹ́kọ̀ọ́ kankan kò tíì sí. Dá tuntun sí isalẹ.",
  principlesNewListOptional:
    "Ìkẹ́kọ̀ọ́ tuntun (àṣàyàn)",
  selectionCopied:
    "A ti ṣe àdákọ yíyàn rẹ",
  textReadyToShare:
    "Ọ̀rọ̀ ti ṣetán láti pín (a ti ṣe àdákọ)",
  addedToList: "A fi sí àkójọ",
  newRandom: "Ẹsẹ àdánidá tuntun",
  swipeLabel: "Fa",
  searchSlotLabel: "Ṣàwárí",
  searchSlotEmpty: "Ṣàwárí (òfo)",
  memorySlotLabel: "Sílòòtì",
  emptySlotSuffix: "(òfo)",
  untitledList: "(láìsí akọlé)",

  // Short label “Copied”
  copiedShort: "A dá àdákọ",

  // Search page
  searchTitle: "Ṣàwárí nínú Bíbélì",
  searchPlaceholder:
    "Tẹ ohun tí o ń wá",
  searchMinChars:
    "Tẹ o kere jù àmì lẹ́tà méjì.",
  searchSearching: "Ṣàwárí…",
  searchResults: "Àbájáde",
  searchExpandAll: "Ṣí gbogbo rẹ",
  searchCollapseAll: "Pa gbogbo rẹ mọ́",
  searchNoResults:
    "Kò sí ẹsẹ tí a rí.",
  searchClear: "Nu kúrò",
  searchOpenInReading: "Ṣí nínú Kíkà",

  // Notes page
  notesPage: {
    create: "Dá àkójọ sílẹ̀",
    placeholder: "Akọlé àkójọ…",
    empty: "Àkójọ kankan kò tíì sí.",
    items: "nkan",
    backAll: "← Gbogbo àkójọ",
    addTextBlock:
      "Fi àpínrọ ọ̀rọ̀ kun",
    editTextBlock: "Ṣàtúnṣe àpínrọ",
    deleteItem: "Pa rẹ́",
    moveUp: "Gbé s'ókè",
    moveDown: "Gbé s'ísalẹ̀",
    open: "Ṣí",
    confirmDeleteItem:
      "Ṣe o fẹ́ pa nkan yìí rẹ́?",
    newTextPlaceholder: "Ọ̀rọ̀ rẹ…",

    shareCode: "Kóòdù",
    importCode: "Gbe kóòdù wọlé",
    importPrompt:
      "Lè kóòdù pínpín TheWord síbí:",
    importError: "Kóòdù kò tọ́́nà.",
    importSuccess:
      "A ti gbe àkójọ wọlé ✅",
    shareCodeCopied:
      "A ti dá kóòdù sí àkọsílẹ̀ ✅",

    importTextButton: "Ọ̀rọ̀ → Àkójọ",
    importTextTitlePlaceholder:
      "Akọlé àkójọ tuntun",
    importTextDefaultTitle:
      "Ìgbéwọlé ọ̀rọ̀",
    importTextBodyPlaceholder:
      "Lè ọ̀rọ̀ rẹ síbí…",
    importTextNoBody:
      "Jọ̀wọ́, lè díẹ̀ nínú ọ̀rọ̀ tí a óò gbé wọlé.",
    importTextNoBlock:
      "A kò rí àpínrọ kankan (fi ìlà òfo sí láàárín bí o bá fẹ́ ya sí àpínrọ).",
    importTextSplitLabel:
      "Ya sí àpínrọ (pín pẹ̀lú o kere jù ìlà òfo kan)",
    importTextInfo:
      "Gbogbo àpínrọ yóò di nkan kan nínú àkójọ.",
    importTextCreate: "Dá àkójọ sílẹ̀",

    duplicateTitle:
      "Àkójọ pẹ̀lú akọlé yìí ti wà tẹ́lẹ̀.",
    confirmDeleteList:
      "Ṣe o fẹ́ pa àkójọ yìí rẹ́?",
    emptyList: "Àkójọ òfo.",

    importFromTextTitle:
      "Gbé wọlé láti inú ọ̀rọ̀",
    documentContent:
      "Àkóónú ìwé àkọsílẹ̀",
    renameList: "Tun akọlé ṣe"
  },

  // Principles page
  principlesPage: {
    create: "Dá ìkẹ́kọ̀ọ́ sílẹ̀",
    placeholder: "Akọlé ìkẹ́kọ̀ọ́…",
    empty: "Ìkẹ́kọ̀ọ́ kankan kò tíì sí.",
    items: "nkan",
    backAll: "← Gbogbo ìkẹ́kọ̀ọ́",
    addTextBlock:
      "Fi àpínrọ ọ̀rọ̀ kun",
    editTextBlock: "Ṣàtúnṣe àpínrọ",
    deleteItem: "Pa rẹ́",
    moveUp: "Gbé s'ókè",
    moveDown: "Gbé s'ísalẹ̀",
    open: "Ṣí",
    openReading: "Ṣí Kíkà",
    confirmDeleteItem:
      "Ṣe o fẹ́ pa nkan yìí rẹ́?",
    newTextPlaceholder: "Ọ̀rọ̀ rẹ…",

    shareCode: "Kóòdù",
    importCode: "Gbe kóòdù wọlé",
    importPrompt:
      "Lè kóòdù pínpín TheWord (àkọsílẹ̀ tàbí ìkẹ́kọ̀ọ́) síbí:",
    importError: "Kóòdù kò tọ́́nà.",
    importSuccess:
      "A ti gbe ìkẹ́kọ̀ọ́ wọlé ✅",
    shareCodeCopied:
      "A ti dá kóòdù sí àkọsílẹ̀ ✅",

    importTextButton: "Ọ̀rọ̀ → Ìkẹ́kọ̀ọ́",
    importTextTitlePlaceholder:
      "Akọlé ìkẹ́kọ̀ọ́ tuntun",
    importTextDefaultTitle:
      "Ìgbéwọlé ọ̀rọ̀",
    importTextBodyPlaceholder:
      "Lè ọ̀rọ̀ rẹ síbí…",
    importTextNoBody:
      "Jọ̀wọ́, lè díẹ̀ nínú ọ̀rọ̀ tí a óò gbé wọlé.",
    importTextNoBlock:
      "A kò rí àpínrọ kankan (fi ìlà òfo sí láàárín bí o bá fẹ́ ya sí àpínrọ).",
    importTextSplitLabel:
      "Ya sí àpínrọ (pín pẹ̀lú o kere jù ìlà òfo kan)",
    importTextInfo:
      "Gbogbo àpínrọ yóò di nkan kan nínú ìkẹ́kọ̀ọ́.",
    importTextCreate: "Dá ìkẹ́kọ̀ọ́ sílẹ̀",

    duplicateTitle:
      "Ìkẹ́kọ̀ọ́ pẹ̀lú akọlé yìí ti wà tẹ́lẹ̀.",
    confirmDeleteList:
      "Ṣe o fẹ́ pa ìkẹ́kọ̀ọ́ yìí rẹ́?",
    emptyList: "Ìkẹ́kọ̀ọ́ òfo.",

    importFromTextTitle:
      "Gbé wọlé láti inú ọ̀rọ̀",
    documentContent:
      "Àkóónú ìwé àkọsílẹ̀",
    renameList: "Tun akọlé ṣe",
    share: "Pín",
    copy: "Àdákọ",
    deleteList: "Pa rẹ́",

    shareStudyTitle: "Ìkẹ́kọ̀ọ́",
    shareItemTitle: "Ẹsẹ"
  },

  // Settings page
  appearance: "Àwòrán àfihàn",
  lightMode: "Ìmọ́lẹ̀ (light mode)",
  darkMode: "Òru (dark mode)",
  fontSize: "Ìwọn fọ́ńtì",
  language: "Èdè",
  french: "Fáransé",
  english: "Gẹ̀ẹ́sì",
  fontSizeXLLabel:
    "Ìpo ojú-rírì díẹ̀ (XL)",
  fontSizePreview:
    "Àpẹrẹ ìwọ̀n fọ́ńtì tí o yàn.",
  updates: "Ìmúdójúìwò",
  updatesDescription:
    "Ṣàyẹ̀wò bóyá àtúnṣe tuntun wà, kí o sì lò ó.",
  applyUpdate: "Lo àtúnṣe",
  checkUpdatesButton: "Ṣàyẹ̀wò àtúnṣe",
  updatesChecking: "Ṣàyẹ̀wò…",
  updatesUpToDate:
    "App rẹ wà lórí àtúnṣe tuntun jù lọ.",
  updatesReady:
    "Àtúnṣe tuntun ti ṣetán. Tẹ «Lo àtúnṣe».",
  updatesUnavailable:
    "A kì í lè ṣe àtúnṣe laifọwọyi (a kò rí Service Worker).",
  updatesError:
    "Àsìse nígbà ṣàyẹ̀wò. Jọ̀wọ́, gbìyànjú lẹ́ẹkansi.",

  // About page
  aboutTitle: "",
  aboutDescription:
    "The Word ń ràn ọ́ lọ́wọ́ láti ṣàwárí Ọ̀rọ̀ Ọlọ́run nípasẹ̀ ẹsẹ àdánidá àti kíkà Bíbélì tán.",
  aboutIntro:
    "TheWord: kíkà Bíbélì láìsí ìnítànẹ́tì, ṣàwárí kíákíá, àkọsílẹ̀ àkórí, pínpín ní tẹ̀ kan. O tún lè lò TheWord lórí wẹẹ̀bù: www.theword.fr",
  bibleVersions: "Àwọn ìtumọ̀ Bíbélì",
  frenchVersion:
    "Fáransé: Louis Segond 1910 (LSG) – Àtúnṣe 2025 – Gbólóhùn àwùjọ",
  englishVersion:
    "Gẹ̀ẹ́sì: King James Version (KJV) – Gbólóhùn àwùjọ",
  frenchVersionDetails:
    "Ìtumọ̀ àfihàn Bíbélì ní Fáransé, Louis Segond túmọ̀ rẹ̀ ní 1910, a sì tún un ṣe ní 2025 (àmúlò ọ̀rọ̀ àti gírámà tuntun, ṣùgbọ́n tí ó ṣọ́ra láti má bà a jẹ́ mọ́ ìwé àtijọ́).",
  englishVersionDetails:
    "Ìtumọ̀ Bíbélì Gẹ̀ẹ́sì àtijọ́ (KJV), tí wọ́n tẹ̀ jáde lódún 1611, tí a tún ṣe ní 1769, a sì ṣe àtúnṣe díẹ̀ ní 2025.",
  otherLanguagesNote:
    "Àwọn èdè míì (Jámánì, Pọtúgí, bẹ́ẹ̀ bẹ́ẹ̀ lọ) wà ní ìmúrasílẹ̀. Títí di àkókò yẹn, ao lo Gẹ̀ẹ́sì níbi tí ìtumọ̀ kò tíì wà.",
  randomFeature: "Àwọn aṣàyàn àdánidá",
  randomFeatureDesc:
    "Ẹrọ ẹsẹ àdánidá wa ń yàn láti inú àwọn ẹsẹ Bíbélì tó ju 31,000 lọ láti fún ọ ní ìmísí lojoojúmọ́.",
  musicLink: "Orin Olùdá",
  versesLabel: "Ẹsẹ",
  booksLabel: "Ìwé",
  readingShortcuts:
    "Àkọsílẹ̀ kíkà kíákíá",
  notesIntro:
    "Ṣètò àwọn ẹsẹ ayanfẹ rẹ àti àwọn èrò rẹ sínú àkójọ àkórí.",
  notesPoint1:
    "Fi ẹsẹ tàbí àpínrọ ọ̀rọ̀ òmìnira kun.",
  notesPoint2:
    "Tẹ̀ nkan kan láti ṣí àkójọ aṣayan (Ṣí nínú Kíkà, Gbé s'ókè/s'ísalẹ̀, Pa rẹ́…).",
  notesPoint3:
    "Tun orúkọ àkójọ ṣe, ṣe àdákọ, kí o sì pín.",
  createdWithLove:
    "A dá a sílẹ̀ pẹ̀lú ìfẹ́ láti tàn Ọ̀rọ̀ Ọlọ́run ka",
  versionsFootnote:
    "Gbogbo àwọn ìtumọ̀ Bíbélì tí a lo wà ní gbòlóhùn àwùjọ. Díẹ̀ lára wọn ni a ti ṣe àtúnṣe díẹ̀ (ọ̀rọ̀ àti gírámà) ṣùgbọ́n wọ́n ṣi wà ní ìfarahàn pípé sí àwọn ìwé àtẹ̀jáde.",

  // Quick slots
  quickSlotsIntro:
    "Àwọn bọ́tìnì mẹ́rin yìí, tí wọ́n wà ní apa ọ̀tún aṣàyàn Ìwé/Apá, ń jẹ́ kí o padà sí ìkàwé tí o máa ń kà lọ́pọ̀ jù lọ láìpé, kí o lè kà ọ̀pọ̀ ìwé ní àkókò kan: lo 1/2/3 fún ipò mẹ́ta, kí o sì lo lúpà láti padà sí apá tí o kà gbẹ́yìn (ẹsẹ àdánidá tàbí abájáde ìṣàwárí).",
  quickSlotsIllustrationLabel:
    "Àpẹẹrẹ àwọn ọ̀nà kíákíá",
  quickSlotLastPassageTooltip:
    "Apá tí o gbà gbẹ́yìn",
  quickSlot1ActiveTooltip:
    "Ọ̀nà kíákíá 1 (nṣiṣẹ́)",
  quickSlot2Tooltip: "Ọ̀nà kíákíá 2",
  quickSlot3Tooltip: "Ọ̀nà kíákíá 3",

  // Common
  loading: "Ṣíṣí…",
  error: "Àsìse nígbà títẹ̀jáde"
};

// Turkish translations
const trTranslations = {
  // Navigation
  home: "Ana sayfa",
  reading: "Okuma",
  search: "Arama",
  settings: "Ayarlar",
  about: "Hakkında",
  notes: "Notlar",
  principles: "Çalışmalar",

  // Home page
  randomVerse: "Rastgele ayet",
  newVerse: "Yeni ayet",
  copyVerse: "Ayeti kopyala",
  verseCopied: "Ayet kopyalandı!",
  godSpeaks: "Tanrı sana konuşuyor",
  openJeremiah: "Yeremya 23:29'u aç",
  jeremiah23Quote:
    "«RAB diyor ki: Sözüm ateş gibi değil mi, kayayı parçalayan çekiç gibi değil mi?» Yeremya 23:29",

  // Reading page
  selectBook: "Kitap seç",
  selectChapter: "Bölüm seç",
  chapter: "Bölüm",
  oldTestament: "Eski Antlaşma",
  newTestament: "Yeni Antlaşma",

  // Reading – extras
  chooseBook: "Bir kitap seç",
  chooseChapter: "Bir bölüm seç",
  prevChapter: "Önceki bölüm",
  nextChapter: "Sonraki bölüm",
  verseWord: "ayet",
  versesSelectedSuffix: "seçili ayet(ler)",
  toNotes: "Notlara gönder",
  toPrinciples: "Çalışmalara gönder",
  copyLabel: "Kopyala",
  shareLabel: "Paylaş",
  cancel: "İptal",
  close: "Kapat",
  notesModalTitle:
    "Listeye ekle (Notlar)",
  notesNoList:
    "Henüz liste yok. Aşağıdan bir tane oluştur.",
  notesNewListOptional:
    "Yeni liste (isteğe bağlı)",
  principlesModalTitle:
    "Çalışmaya ekle (Çalışmalar)",
  principlesNoList:
    "Henüz çalışma yok. Aşağıdan bir tane oluştur.",
  principlesNewListOptional:
    "Yeni çalışma (isteğe bağlı)",
  selectionCopied: "Seçim kopyalandı",
  textReadyToShare:
    "Metin paylaşmaya hazır (kopyalandı)",
  addedToList: "Listeye eklendi",
  newRandom: "Yeni rastgele",
  swipeLabel: "Kaydır",
  searchSlotLabel: "Ara",
  searchSlotEmpty: "Ara (boş)",
  memorySlotLabel: "Kısayol",
  emptySlotSuffix: "(boş)",
  untitledList: "(başlıksız)",

  // Short label “Copied”
  copiedShort: "Kopyalandı",

  // Search page
  searchTitle: "Kutsal Kitap arama",
  searchPlaceholder:
    "Aramak istediğinizi yazın",
  searchMinChars:
    "Arama için en az 2 karakter yazın.",
  searchSearching: "Aranıyor…",
  searchResults: "Sonuçlar",
  searchExpandAll: "Tümünü aç",
  searchCollapseAll: "Tümünü kapat",
  searchNoResults:
    "Hiç ayet bulunamadı.",
  searchClear: "Temizle",
  searchOpenInReading: "Okuma bölümünde aç",

  // Notes page
  notesPage: {
    create: "Liste oluştur",
    placeholder: "Liste başlığı…",
    empty: "Henüz liste yok.",
    items: "öğe",
    backAll: "← Tüm listeler",
    addTextBlock: "Metin bloğu ekle",
    editTextBlock: "Bloğu düzenle",
    deleteItem: "Sil",
    moveUp: "Yukarı taşı",
    moveDown: "Aşağı taşı",
    open: "Aç",
    confirmDeleteItem:
      "Bu öğe silinsin mi?",
    newTextPlaceholder: "Metniniz…",

    shareCode: "Kod",
    importCode: "Kodu içe aktar",
    importPrompt:
      "TheWord paylaşım kodunu buraya yapıştırın:",
    importError: "Geçersiz kod.",
    importSuccess:
      "Liste başarıyla içe aktarıldı ✅",
    shareCodeCopied:
      "Kod panoya kopyalandı ✅",

    importTextButton: "Metin → Liste",
    importTextTitlePlaceholder:
      "Yeni listenin başlığı",
    importTextDefaultTitle:
      "Metin içe aktarma",
    importTextBodyPlaceholder:
      "Metninizi buraya yapıştırın…",
    importTextNoBody:
      "Lütfen içe aktarılacak bir metin yapıştırın.",
    importTextNoBlock:
      "Hiç blok algılanmadı (metni bloklara ayırmak için aralara boş satırlar bırakın).",
    importTextSplitLabel:
      "Bloklara ayır (en az bir boş satırla ayrılmış)",
    importTextInfo:
      "Her blok listede bir öğe olur.",
    importTextCreate: "Liste oluştur",

    duplicateTitle:
      "Aynı başlığa sahip bir liste zaten var.",
    confirmDeleteList:
      "Bu liste silinsin mi?",
    emptyList: "Boş liste.",

    importFromTextTitle:
      "Metinden içe aktar",
    documentContent: "Belge içeriği",
    renameList: "Yeniden adlandır"
  },

  // Principles page
  principlesPage: {
    create: "Çalışma oluştur",
    placeholder: "Çalışmanın başlığı…",
    empty: "Henüz çalışma yok.",
    items: "öğe",
    backAll: "← Tüm çalışmalar",
    addTextBlock: "Metin bloğu ekle",
    editTextBlock: "Bloğu düzenle",
    deleteItem: "Sil",
    moveUp: "Yukarı taşı",
    moveDown: "Aşağı taşı",
    open: "Aç",
    openReading: "Okumayı aç",
    confirmDeleteItem:
      "Bu öğe silinsin mi?",
    newTextPlaceholder: "Metniniz…",

    shareCode: "Kod",
    importCode: "Kodu içe aktar",
    importPrompt:
      "TheWord paylaşım kodunu (not veya çalışma) buraya yapıştırın:",
    importError: "Geçersiz kod.",
    importSuccess:
      "Çalışma başarıyla içe aktarıldı ✅",
    shareCodeCopied:
      "Kod panoya kopyalandı ✅",

    importTextButton: "Metin → Çalışma",
    importTextTitlePlaceholder:
      "Yeni çalışmanın başlığı",
    importTextDefaultTitle:
      "Metin içe aktarma",
    importTextBodyPlaceholder:
      "Metninizi buraya yapıştırın…",
    importTextNoBody:
      "Lütfen içe aktarılacak bir metin yapıştırın.",
    importTextNoBlock:
      "Hiç blok algılanmadı (metni bloklara ayırmak için aralara boş satırlar bırakın).",
    importTextSplitLabel:
      "Bloklara ayır (en az bir boş satırla ayrılmış)",
    importTextInfo:
      "Her blok çalışmada bir öğe olur.",
    importTextCreate: "Çalışma oluştur",

    duplicateTitle:
      "Aynı başlığa sahip bir çalışma zaten var.",
    confirmDeleteList:
      "Bu çalışma silinsin mi?",
    emptyList: "Boş çalışma.",

    importFromTextTitle:
      "Metinden içe aktar",
    documentContent: "Belge içeriği",
    renameList: "Yeniden adlandır",
    share: "Paylaş",
    copy: "Kopyala",
    deleteList: "Sil",

    shareStudyTitle: "Çalışma",
    shareItemTitle: "Ayet"
  },

  // Settings page
  appearance: "Görünüm",
  lightMode: "Aydınlık mod",
  darkMode: "Karanlık mod",
  fontSize: "Yazı tipi boyutu",
  language: "Dil",
  french: "Fransızca",
  english: "İngilizce",
  fontSizeXLLabel:
    "Az gören modu (XL)",
  fontSizePreview:
    "Seçilen yazı tipi boyutunun önizlemesi.",
  updates: "Güncellemeler",
  updatesDescription:
    "Yeni bir sürüm olup olmadığını kontrol edin ve uygulayın.",
  applyUpdate: "Güncellemeyi uygula",
  checkUpdatesButton:
    "Güncellemeleri denetle",
  updatesChecking: "Denetleniyor…",
  updatesUpToDate:
    "Uygulamanız güncel.",
  updatesReady:
    "Yeni sürüm hazır. \"Güncellemeyi uygula\"ya tıklayın.",
  updatesUnavailable:
    "Otomatik güncelleme kullanılamıyor (Service Worker bulunamadı).",
  updatesError:
    "Denetlerken bir hata oluştu. Lütfen tekrar deneyin.",

  // About page
  aboutTitle: "",
  aboutDescription:
    "The Word, rastgele ayetler ve bütün Kutsal Kitap okumaları aracılığıyla Tanrı'nın sözünü keşfetmene yardım eder.",
  aboutIntro:
    "TheWord: çevrimdışı Kutsal Kitap okuma, anında arama, tematik notlar, tek dokunuşla paylaşma. TheWord'ü web'de de kullanabilirsin: www.theword.fr",
  bibleVersions: "Kutsal Kitap çevirileri",
  frenchVersion:
    "Fransızca: Louis Segond 1910 (LSG) – 2025 gözden geçirilmiş – Kamu malı",
  englishVersion:
    "İngilizce: King James Version (KJV) – Kamu malı",
  frenchVersionDetails:
    "Fransızca Kutsal Kitap için başvuru çevirisi; 1910'da Louis Segond tarafından çevrildi ve 2025'te söz varlığı ile dilbilgisi modernleştirildi (el yazmalarına sadık kalınarak).",
  englishVersionDetails:
    "Klasik İngilizce çeviri (KJV); 1611'de yayımlandı, 1769'da gözden geçirildi ve 2025'te sınırlı bir güncelleme aldı.",
  otherLanguagesNote:
    "Diğer diller (Almanca, Portekizce vb.) hazırlanmaktadır. O zamana kadar, çeviri olmayan yerlerde arayüz İngilizceye döner.",
  randomFeature: "Rastgele özellik",
  randomFeatureDesc:
    "Rastgele ayet üretecimiz, her gün ilham vermek için 31.000'den fazla Kutsal Kitap ayetinden seçim yapar.",
  musicLink: "Yaratıcının Müziği",
  versesLabel: "Ayetler",
  booksLabel: "Kitaplar",
  readingShortcuts: "Okuma kısayolları",
  notesIntro:
    "Sevdiğin bölümleri ve düşüncelerini tematik listelere düzenle.",
  notesPoint1:
    "Ayetler veya serbest metin blokları ekle.",
  notesPoint2:
    "Bir öğeye dokunarak menüyü aç (Okumada aç, yukarı/aşağı taşı, sil vb.).",
  notesPoint3:
    "Listeleri yeniden adlandır, kopyala ve paylaş.",
  createdWithLove:
    "Tanrı'nın Sözünü yaymak için sevgiyle oluşturuldu",
  versionsFootnote:
    "Kullanılan tüm Kutsal Kitap çevirileri kamu malıdır. Bazıları (söz varlığı ve dilbilgisi açısından) kısmen modernleştirilmiştir; ancak özgün el yazmalarına kesinlikle sadıktır.",

  // Quick slots
  quickSlotsIntro:
    "Kitap/Bölüm seçicisinin sağındaki bu 4 düğme, sık okunan yerlere anında dönmene ve birden çok kitabı paralel olarak takip etmene yardım eder: üç konum için 1/2/3'ü ve son bölüme (rastgele ayet veya arama sonucu) dönmek için büyüteci kullan.",
  quickSlotsIllustrationLabel:
    "Kısayolların görseli",
  quickSlotLastPassageTooltip:
    "Son bölüm",
  quickSlot1ActiveTooltip:
    "Kısayol 1 (etkin)",
  quickSlot2Tooltip: "Kısayol 2",
  quickSlot3Tooltip: "Kısayol 3",

  // Common
  loading: "Yükleniyor...",
  error: "Yüklenirken bir hata oluştu"
};

/**
 * Dictionnaire global par langue.
 *
 * Tous les codes de `Language` ont maintenant un dictionnaire complet.
 * La fonction `t()` garde un fallback sur l'anglais si une clé manque par erreur.
 */
const translations: Record<Language, any> = {
  fr: frTranslations,
  en: enTranslations,
  es: esTranslations,
  ru: ruTranslations,
  de: deTranslations,
  it: itTranslations,
  pt: ptTranslations,
  hi: hiTranslations,
  zh: zhTranslations,
  ar: arTranslations,
  id: idTranslations,
  sw: swTranslations,
  ko: koTranslations,
  ja: jaTranslations,
  yo: yoTranslations,
  tr: trTranslations
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
