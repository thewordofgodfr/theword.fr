// src/hooks/useTranslation.ts
import { useApp } from '../contexts/AppContext';
import type { Language } from '../types/bible';

/**
 * Dictionnaires de base par langue.
 *
 * - fr / en / es / ru : traductions complètes.
 * - de / it / pt / hi / zh / ar / id / sw / tr / ja / ko / yo :
 *   → réutilisent l’anglais par défaut
 *   → avec une traduction des libellés principaux (navigation, boutons, etc.).
 * - La fonction `t()` fait automatiquement un fallback sur l'anglais
 *   si la clé n'est pas trouvée dans la langue courante.
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
    "D'autres langues (Allemand, Espagnol, Portugais, Hindi, Chinois, Arabe, etc.) sont ajoutées progressivement. Si une traduction d'interface manque, l'application utilise l'anglais par défaut.",
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
    'More languages (German, Spanish, Portuguese, Hindi, Chinese, Arabic, etc.) are being added progressively. When an interface translation is missing, the app falls back to English.',
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
  updatesReady: 'Nueva versión lista. Pulsa «Aplicar actualización».',
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
  englishVersion: 'Inglés: King James Version (KJV) – Dominio público',
  frenchVersionDetails:
    'Versión de referencia en francés, traducida por Louis Segond en 1910 y revisada en 2025 (modernización del vocabulario y la gramática, fiel a los manuscritos).',
  englishVersionDetails:
    'Versión clásica en inglés (KJV), publicada en 1611, revisada en 1769 y ligeramente actualizada en 2025.',
  otherLanguagesNote:
    'Otros idiomas (alemán, portugués, hindi, chino, árabe, etc.) se están añadiendo progresivamente. Si falta alguna traducción de la interfaz, la aplicación usa el inglés por defecto.',
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

// Russian translations
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
    'Другие языки (немецкий, испанский, португальский, хинди, китайский, арабский и др.) постепенно добавляются. Если перевода интерфейса нет, используется английский язык по умолчанию.',
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

/**
 * Nouvelles langues : on part de l’anglais et on
 * surcharge les libellés principaux pour chaque langue.
 */

// German
const deTranslations = {
  ...enTranslations,
  home: 'Startseite',
  reading: 'Lesen',
  search: 'Suche',
  settings: 'Einstellungen',
  about: 'Info',
  notes: 'Notizen',
  principles: 'Studien',

  randomVerse: 'Zufallsvers',
  newVerse: 'Neuer Vers',
  copyVerse: 'Vers kopieren',
  verseCopied: 'Vers kopiert!',
  godSpeaks: 'Gott spricht zu dir',
  openJeremiah: 'Jeremia 23,29 öffnen',

  selectBook: 'Buch auswählen',
  selectChapter: 'Kapitel auswählen',
  chapter: 'Kapitel',
  oldTestament: 'Altes Testament',
  newTestament: 'Neues Testament',
  prevChapter: 'Vorheriges Kapitel',
  nextChapter: 'Nächstes Kapitel',
  copyLabel: 'Kopieren',
  shareLabel: 'Teilen',
  cancel: 'Abbrechen',
  close: 'Schließen',
  newRandom: 'Neuer Zufallsvers',
  swipeLabel: 'Wischen',

  searchTitle: 'Bibel-Suche',
  searchPlaceholder: 'Suchbegriff eingeben',
  searchResults: 'Ergebnisse',
  searchNoResults: 'Keine Verse gefunden.',
  searchClear: 'Löschen',

  appearance: 'Darstellung',
  lightMode: 'Heller Modus',
  darkMode: 'Dunkler Modus',
  fontSize: 'Schriftgröße',
  language: 'Sprache',
  updates: 'Updates',
  checkUpdatesButton: 'Nach Updates suchen',

  aboutDescription:
    'Mit The Word entdeckst du Gottes Wort durch Zufallsverse und das vollständige Lesen der Bibel.',
  randomFeature: 'Zufallsfunktion',
  randomFeatureDesc:
    'Unser Zufallsvers-Generator wählt aus über 31.000 Bibelversen, um dich täglich zu inspirieren.',
  musicLink: 'Musik des Schöpfers',
  versesLabel: 'Verse',
  booksLabel: 'Bücher',
  readingShortcuts: 'Lese-Schnellzugriffe',
  createdWithLove:
    'Mit Liebe erstellt, um Gottes Wort zu verbreiten',

  loading: 'Wird geladen...',
  error: 'Fehler beim Laden',
};

// Italian
const itTranslations = {
  ...enTranslations,
  home: 'Home',
  reading: 'Lettura',
  search: 'Ricerca',
  settings: 'Impostazioni',
  about: 'Informazioni',
  notes: 'Note',
  principles: 'Studi',

  randomVerse: 'Versetto casuale',
  newVerse: 'Nuovo versetto',
  copyVerse: 'Copia versetto',
  verseCopied: 'Versetto copiato!',
  godSpeaks: 'Dio ti parla',
  openJeremiah: 'Apri Geremia 23:29',

  selectBook: 'Seleziona un libro',
  selectChapter: 'Seleziona un capitolo',
  chapter: 'Capitolo',
  oldTestament: 'Antico Testamento',
  newTestament: 'Nuovo Testamento',
  prevChapter: 'Capitolo precedente',
  nextChapter: 'Capitolo successivo',
  copyLabel: 'Copia',
  shareLabel: 'Condividi',
  cancel: 'Annulla',
  close: 'Chiudi',
  newRandom: 'Nuovo casuale',
  swipeLabel: 'Scorri',

  searchTitle: 'Ricerca biblica',
  searchPlaceholder: 'Digita la tua ricerca',
  searchResults: 'Risultati',
  searchNoResults: 'Nessun versetto trovato.',
  searchClear: 'Cancella',

  appearance: 'Aspetto',
  lightMode: 'Modalità chiara',
  darkMode: 'Modalità scura',
  fontSize: 'Dimensione testo',
  language: 'Lingua',
  updates: 'Aggiornamenti',
  checkUpdatesButton: 'Verifica aggiornamenti',

  aboutDescription:
    'The Word ti permette di scoprire la Parola di Dio attraverso versetti casuali e la lettura completa della Bibbia.',
  randomFeature: 'Funzione casuale',
  randomFeatureDesc:
    'Il nostro generatore di versetti casuali sceglie tra oltre 31.000 versetti biblici per offrirti ispirazione quotidiana.',
  musicLink: 'Musica del Creatore',
  versesLabel: 'Versetti',
  booksLabel: 'Libri',
  readingShortcuts: 'Scorciatoie di lettura',
  createdWithLove:
    'Creato con amore per diffondere la Parola di Dio',

  loading: 'Caricamento...',
  error: 'Errore durante il caricamento',
};

// Portuguese
const ptTranslations = {
  ...enTranslations,
  home: 'Início',
  reading: 'Leitura',
  search: 'Busca',
  settings: 'Configurações',
  about: 'Sobre',
  notes: 'Notas',
  principles: 'Estudos',

  randomVerse: 'Versículo aleatório',
  newVerse: 'Novo versículo',
  copyVerse: 'Copiar versículo',
  verseCopied: 'Versículo copiado!',
  godSpeaks: 'Deus fala com você',
  openJeremiah: 'Abrir Jeremias 23:29',

  selectBook: 'Selecione um livro',
  selectChapter: 'Selecione um capítulo',
  chapter: 'Capítulo',
  oldTestament: 'Antigo Testamento',
  newTestament: 'Novo Testamento',
  prevChapter: 'Capítulo anterior',
  nextChapter: 'Próximo capítulo',
  copyLabel: 'Copiar',
  shareLabel: 'Compartilhar',
  cancel: 'Cancelar',
  close: 'Fechar',
  newRandom: 'Novo aleatório',
  swipeLabel: 'Deslize',

  searchTitle: 'Pesquisa bíblica',
  searchPlaceholder: 'Digite sua busca',
  searchResults: 'Resultados',
  searchNoResults: 'Nenhum versículo encontrado.',
  searchClear: 'Limpar',

  appearance: 'Aparência',
  lightMode: 'Modo claro',
  darkMode: 'Modo escuro',
  fontSize: 'Tamanho da fonte',
  language: 'Idioma',
  updates: 'Atualizações',
  checkUpdatesButton: 'Verificar atualizações',

  aboutDescription:
    'The Word permite que você descubra a Palavra de Deus por meio de versículos aleatórios e da leitura completa da Bíblia.',
  randomFeature: 'Função aleatória',
  randomFeatureDesc:
    'Nosso gerador de versículos aleatórios escolhe entre mais de 31.000 versículos bíblicos para trazer inspiração diária.',
  musicLink: 'Música do Criador',
  versesLabel: 'Versículos',
  booksLabel: 'Livros',
  readingShortcuts: 'Atalhos de leitura',
  createdWithLove:
    'Criado com amor para espalhar a Palavra de Deus',

  loading: 'Carregando...',
  error: 'Erro ao carregar',
};

// Hindi
const hiTranslations = {
  ...enTranslations,
  home: 'होम',
  reading: 'पाठ',
  search: 'खोज',
  settings: 'सेटिंग्स',
  about: 'जानकारी',
  notes: 'नोट्स',
  principles: 'अध्ययन',

  randomVerse: 'यादृच्छिक पद',
  newVerse: 'नया पद',
  copyVerse: 'पद कॉपी करें',
  verseCopied: 'पद कॉपी हो गया!',
  godSpeaks: 'परमेश्वर आप से बात कर रहा है',
  openJeremiah: 'यिर्मयाह 23:29 खोलें',

  selectBook: 'पुस्तक चुनें',
  selectChapter: 'अध्याय चुनें',
  chapter: 'अध्याय',
  oldTestament: 'पुराना नियम',
  newTestament: 'नया नियम',
  prevChapter: 'पिछला अध्याय',
  nextChapter: 'अगला अध्याय',
  copyLabel: 'कॉपी',
  shareLabel: 'साझा करें',
  cancel: 'रद्द करें',
  close: 'बंद करें',
  newRandom: 'नया यादृच्छिक',
  swipeLabel: 'स्वाइप करें',

  searchTitle: 'बाइबल खोज',
  searchPlaceholder: 'अपनी खोज लिखें',
  searchResults: 'परिणाम',
  searchNoResults: 'कोई पद नहीं मिला।',
  searchClear: 'साफ करें',

  appearance: 'रूप',
  lightMode: 'हल्का मोड',
  darkMode: 'गहरा मोड',
  fontSize: 'फॉन्ट आकार',
  language: 'भाषा',
  updates: 'अद्यतन',
  checkUpdatesButton: 'अद्यतन जाँचें',

  aboutDescription:
    'The Word आपको यादृच्छिक पदों और पूरी बाइबल पढ़ने के माध्यम से परमेश्वर का वचन खोजने में मदद करता है।',
  randomFeature: 'यादृच्छिक सुविधा',
  randomFeatureDesc:
    'हमारा यादृच्छिक पद जनक 31,000 से अधिक बाइबिल पदों में से चुनता है ताकि आपको प्रतिदिन प्रेरणा मिले।',
  musicLink: 'सृष्टिकर्ता की संगीत',
  versesLabel: 'पद',
  booksLabel: 'पुस्तकें',
  readingShortcuts: 'पढ़ने के शॉर्टकट',
  createdWithLove:
    'परमेश्वर का वचन फैलाने के लिए प्रेम से बनाया गया',

  loading: 'लोड हो रहा है...',
  error: 'लोड करते समय त्रुटि',
};

// Chinese (Simplified)
const zhTranslations = {
  ...enTranslations,
  home: '首页',
  reading: '阅读',
  search: '搜索',
  settings: '设置',
  about: '关于',
  notes: '笔记',
  principles: '研读',

  randomVerse: '随机经文',
  newVerse: '新经文',
  copyVerse: '复制经文',
  verseCopied: '经文已复制！',
  godSpeaks: '神在对你说话',
  openJeremiah: '打开耶利米书23:29',

  selectBook: '选择书卷',
  selectChapter: '选择章节',
  chapter: '章',
  oldTestament: '旧约',
  newTestament: '新约',
  prevChapter: '上一章',
  nextChapter: '下一章',
  copyLabel: '复制',
  shareLabel: '分享',
  cancel: '取消',
  close: '关闭',
  newRandom: '新的随机经文',
  swipeLabel: '滑动',

  searchTitle: '圣经搜索',
  searchPlaceholder: '输入要搜索的内容',
  searchResults: '结果',
  searchNoResults: '未找到经文。',
  searchClear: '清除',

  appearance: '外观',
  lightMode: '浅色模式',
  darkMode: '深色模式',
  fontSize: '字号',
  language: '语言',
  updates: '更新',
  checkUpdatesButton: '检查更新',

  aboutDescription:
    'The Word 通过随机经文和完整读经，帮助你发现神的话语。',
  randomFeature: '随机功能',
  randomFeatureDesc:
    '我们的随机经文功能从三万一千多节经文中为你每天选出一节。',
  musicLink: '创造主的音乐',
  versesLabel: '经文',
  booksLabel: '卷',
  readingShortcuts: '阅读快捷方式',
  createdWithLove:
    '带着爱心制作，传扬神的话语',

  loading: '正在加载...',
  error: '加载时出错',
};

// Arabic
const arTranslations = {
  ...enTranslations,
  home: 'الرئيسية',
  reading: 'القراءة',
  search: 'بحث',
  settings: 'الإعدادات',
  about: 'حول',
  notes: 'ملاحظات',
  principles: 'دراسات',

  randomVerse: 'آية عشوائية',
  newVerse: 'آية جديدة',
  copyVerse: 'نسخ الآية',
  verseCopied: 'تم نسخ الآية!',
  godSpeaks: 'الله يتكلم معك',
  openJeremiah: 'افتح إرميا ٢٣:٢٩',

  selectBook: 'اختر سفراً',
  selectChapter: 'اختر إصحاحاً',
  chapter: 'إصحاح',
  oldTestament: 'العهد القديم',
  newTestament: 'العهد الجديد',
  prevChapter: 'الإصحاح السابق',
  nextChapter: 'الإصحاح التالي',
  copyLabel: 'نسخ',
  shareLabel: 'مشاركة',
  cancel: 'إلغاء',
  close: 'إغلاق',
  newRandom: 'آية عشوائية جديدة',
  swipeLabel: 'اسحب',

  searchTitle: 'بحث في الكتاب المقدس',
  searchPlaceholder: 'اكتب ما تريد البحث عنه',
  searchResults: 'النتائج',
  searchNoResults: 'لم يتم العثور على آيات.',
  searchClear: 'مسح',

  appearance: 'المظهر',
  lightMode: 'الوضع الفاتح',
  darkMode: 'الوضع الداكن',
  fontSize: 'حجم الخط',
  language: 'اللغة',
  updates: 'التحديثات',
  checkUpdatesButton: 'التحقق من التحديثات',

  aboutDescription:
    'يساعدك The Word أن تكتشف كلمة الله من خلال آيات عشوائية وقراءة كاملة للكتاب المقدس.',
  randomFeature: 'ميزة الآية العشوائية',
  randomFeatureDesc:
    'مولّد الآيات العشوائية يختار من أكثر من ٣١٬٠٠٠ آية ليعطيك تشجيعاً يومياً.',
  musicLink: 'موسيقى الخالق',
  versesLabel: 'آيات',
  booksLabel: 'أسفار',
  readingShortcuts: 'اختصارات القراءة',
  createdWithLove:
    'صُمّم بمحبة لنشر كلمة الله',

  loading: 'جارٍ التحميل...',
  error: 'حدث خطأ أثناء التحميل',
};

// Indonesian
const idTranslations = {
  ...enTranslations,
  home: 'Beranda',
  reading: 'Bacaan',
  search: 'Cari',
  settings: 'Pengaturan',
  about: 'Tentang',
  notes: 'Catatan',
  principles: 'Studi',

  randomVerse: 'Ayat acak',
  newVerse: 'Ayat baru',
  copyVerse: 'Salin ayat',
  verseCopied: 'Ayat disalin!',
  godSpeaks: 'Allah berbicara kepadamu',
  openJeremiah: 'Buka Yeremia 23:29',

  selectBook: 'Pilih kitab',
  selectChapter: 'Pilih pasal',
  chapter: 'Pasal',
  oldTestament: 'Perjanjian Lama',
  newTestament: 'Perjanjian Baru',
  prevChapter: 'Pasal sebelumnya',
  nextChapter: 'Pasal berikutnya',
  copyLabel: 'Salin',
  shareLabel: 'Bagikan',
  cancel: 'Batal',
  close: 'Tutup',
  newRandom: 'Ayat acak baru',
  swipeLabel: 'Geser',

  searchTitle: 'Pencarian Alkitab',
  searchPlaceholder: 'Ketik pencarian Anda',
  searchResults: 'Hasil',
  searchNoResults: 'Tidak ada ayat ditemukan.',
  searchClear: 'Hapus',

  appearance: 'Tampilan',
  lightMode: 'Mode terang',
  darkMode: 'Mode gelap',
  fontSize: 'Ukuran huruf',
  language: 'Bahasa',
  updates: 'Pembaruan',
  checkUpdatesButton: 'Periksa pembaruan',

  aboutDescription:
    'The Word menolong Anda menemukan firman Allah melalui ayat-ayat acak dan pembacaan Alkitab secara lengkap.',
  randomFeature: 'Fitur acak',
  randomFeatureDesc:
    'Generator ayat acak kami memilih dari lebih dari 31.000 ayat Alkitab untuk memberi inspirasi setiap hari.',
  musicLink: 'Musik Sang Pencipta',
  versesLabel: 'Ayat',
  booksLabel: 'Kitab',
  readingShortcuts: 'Jalan pintas bacaan',
  createdWithLove:
    'Dibuat dengan kasih untuk menyebarkan firman Allah',

  loading: 'Memuat...',
  error: 'Terjadi kesalahan saat memuat',
};

// Swahili
const swTranslations = {
  ...enTranslations,
  home: 'Nyumbani',
  reading: 'Usomaji',
  search: 'Tafuta',
  settings: 'Mipangilio',
  about: 'Kuhusu',
  notes: 'Dondoo',
  principles: 'Masomo',

  randomVerse: 'Aya ya bahati nasibu',
  newVerse: 'Aya mpya',
  copyVerse: 'Nakili aya',
  verseCopied: 'Aya imenakiliwa!',
  godSpeaks: 'Mungu anazungumza nawe',
  openJeremiah: 'Fungua Yeremia 23:29',

  selectBook: 'Chagua kitabu',
  selectChapter: 'Chagua sura',
  chapter: 'Sura',
  oldTestament: 'Agano la Kale',
  newTestament: 'Agano Jipya',
  prevChapter: 'Sura iliyotangulia',
  nextChapter: 'Sura inayofuata',
  copyLabel: 'Nakili',
  shareLabel: 'Shiriki',
  cancel: 'Ghairi',
  close: 'Funga',
  newRandom: 'Aya ya bahati nasibu mpya',
  swipeLabel: 'Telezesha',

  searchTitle: 'Utafutaji wa Biblia',
  searchPlaceholder: 'Andika unachotafuta',
  searchResults: 'Matokeo',
  searchNoResults: 'Hakuna aya zimepatikana.',
  searchClear: 'Futa',

  appearance: 'Mwonekano',
  lightMode: 'Hali ya mwanga',
  darkMode: 'Hali ya giza',
  fontSize: 'Ukubwa wa herufi',
  language: 'Lugha',
  updates: 'Masasisho',
  checkUpdatesButton: 'Angalia masasisho',

  aboutDescription:
    'The Word inakusaidia kugundua Neno la Mungu kupitia aya za bahati nasibu na usomaji wa Biblia yote.',
  randomFeature: 'Kipengele cha bahati nasibu',
  randomFeatureDesc:
    'Kizalishi chetu cha aya za bahati nasibu huchagua kutoka zaidi ya aya 31,000 za Biblia ili kukupa msukumo wa kila siku.',
  musicLink: 'Muziki wa Muumba',
  versesLabel: 'Aya',
  booksLabel: 'Vitabu',
  readingShortcuts: 'Njia za mkato za usomaji',
  createdWithLove:
    'Imetengenezwa kwa upendo ili kueneza Neno la Mungu',

  loading: 'Inapakia...',
  error: 'Hitilafu wakati wa kupakia',
};

// Turkish
const trTranslations = {
  ...enTranslations,
  home: 'Ana sayfa',
  reading: 'Okuma',
  search: 'Arama',
  settings: 'Ayarlar',
  about: 'Hakkında',
  notes: 'Notlar',
  principles: 'Çalışmalar',

  randomVerse: 'Rastgele ayet',
  newVerse: 'Yeni ayet',
  copyVerse: 'Ayeti kopyala',
  verseCopied: 'Ayet kopyalandı!',
  godSpeaks: 'Tanrı seninle konuşuyor',
  openJeremiah: 'Yeremya 23:29’u aç',

  selectBook: 'Kitap seç',
  selectChapter: 'Bölüm seç',
  chapter: 'Bölüm',
  oldTestament: 'Eski Antlaşma',
  newTestament: 'Yeni Antlaşma',
  prevChapter: 'Önceki bölüm',
  nextChapter: 'Sonraki bölüm',
  copyLabel: 'Kopyala',
  shareLabel: 'Paylaş',
  cancel: 'İptal',
  close: 'Kapat',
  newRandom: 'Yeni rastgele ayet',
  swipeLabel: 'Kaydır',

  searchTitle: 'Kutsal Kitap araması',
  searchPlaceholder: 'Aramak istediğini yaz',
  searchResults: 'Sonuçlar',
  searchNoResults: 'Ayet bulunamadı.',
  searchClear: 'Temizle',

  appearance: 'Görünüm',
  lightMode: 'Açık mod',
  darkMode: 'Koyu mod',
  fontSize: 'Yazı tipi boyutu',
  language: 'Dil',
  updates: 'Güncellemeler',
  checkUpdatesButton: 'Güncellemeleri kontrol et',

  aboutDescription:
    'The Word, rastgele ayetler ve Kutsal Kitap’ı baştan sona okuma ile Tanrı’nın sözünü keşfetmene yardım eder.',
  randomFeature: 'Rastgele özellik',
  randomFeatureDesc:
    'Rastgele ayet oluşturucumuz, her gün ilham vermek için 31.000’den fazla ayet arasından seçer.',
  musicLink: 'Yaratan’ın müziği',
  versesLabel: 'Ayetler',
  booksLabel: 'Kitaplar',
  readingShortcuts: 'Okuma kısayolları',
  createdWithLove:
    'Tanrı’nın sözünü yaymak için sevgiyle oluşturuldu',

  loading: 'Yükleniyor...',
  error: 'Yüklenirken bir hata oluştu',
};

// Japanese
const jaTranslations = {
  ...enTranslations,
  home: 'ホーム',
  reading: '読書',
  search: '検索',
  settings: '設定',
  about: 'このアプリについて',
  notes: 'ノート',
  principles: '学び',

  randomVerse: 'ランダムな聖句',
  newVerse: '新しい聖句',
  copyVerse: '聖句をコピー',
  verseCopied: '聖句をコピーしました！',
  godSpeaks: '神があなたに語っておられます',
  openJeremiah: 'エレミヤ 23:29 を開く',

  selectBook: '書を選択',
  selectChapter: '章を選択',
  chapter: '章',
  oldTestament: '旧約聖書',
  newTestament: '新約聖書',
  prevChapter: '前の章',
  nextChapter: '次の章',
  copyLabel: 'コピー',
  shareLabel: '共有',
  cancel: 'キャンセル',
  close: '閉じる',
  newRandom: '新しいランダム',
  swipeLabel: 'スワイプ',

  searchTitle: '聖書検索',
  searchPlaceholder: '検索したい言葉を入力',
  searchResults: '結果',
  searchNoResults: '聖句が見つかりませんでした。',
  searchClear: 'クリア',

  appearance: '表示',
  lightMode: 'ライトモード',
  darkMode: 'ダークモード',
  fontSize: '文字サイズ',
  language: '言語',
  updates: 'アップデート',
  checkUpdatesButton: 'アップデートを確認',

  aboutDescription:
    'The Word は、ランダムな聖句と聖書通読を通して神のことばを発見するのを助けます。',
  randomFeature: 'ランダム機能',
  randomFeatureDesc:
    'ランダム聖句ジェネレーターは、3万1千節以上の聖句から毎日あなたのために選びます。',
  musicLink: '創造主の音楽',
  versesLabel: '聖句',
  booksLabel: '巻',
  readingShortcuts: '読書ショートカット',
  createdWithLove:
    '神のことばを広めるために愛を込めて作られました',

  loading: '読み込み中...',
  error: '読み込み中にエラーが発生しました',
};

// Korean
const koTranslations = {
  ...enTranslations,
  home: '홈',
  reading: '읽기',
  search: '검색',
  settings: '설정',
  about: '정보',
  notes: '노트',
  principles: '공부',

  randomVerse: '무작위 말씀',
  newVerse: '새 말씀',
  copyVerse: '말씀 복사',
  verseCopied: '말씀이 복사되었습니다!',
  godSpeaks: '하나님께서 당신에게 말씀하십니다',
  openJeremiah: '예레미야 23:29 열기',

  selectBook: '성경 책 선택',
  selectChapter: '장 선택',
  chapter: '장',
  oldTestament: '구약',
  newTestament: '신약',
  prevChapter: '이전 장',
  nextChapter: '다음 장',
  copyLabel: '복사',
  shareLabel: '공유',
  cancel: '취소',
  close: '닫기',
  newRandom: '새 무작위 말씀',
  swipeLabel: '스와이프',

  searchTitle: '성경 검색',
  searchPlaceholder: '검색어를 입력하세요',
  searchResults: '결과',
  searchNoResults: '말씀을 찾을 수 없습니다.',
  searchClear: '지우기',

  appearance: '모양',
  lightMode: '라이트 모드',
  darkMode: '다크 모드',
  fontSize: '글자 크기',
  language: '언어',
  updates: '업데이트',
  checkUpdatesButton: '업데이트 확인',

  aboutDescription:
    'The Word는 무작위 말씀과 전체 성경 읽기를 통해 하나님의 말씀을 발견하도록 도와줍니다.',
  randomFeature: '무작위 기능',
  randomFeatureDesc:
    '무작위 말씀 생성기는 31,000절이 넘는 성경 구절 중에서 매일 한 구절을 선택하여 드립니다.',
  musicLink: '창조주의 음악',
  versesLabel: '구절',
  booksLabel: '권',
  readingShortcuts: '읽기 바로가기',
  createdWithLove:
    '하나님의 말씀을 전하기 위해 사랑으로 만들었습니다',

  loading: '불러오는 중...',
  error: '불러오는 동안 오류가 발생했습니다',
};

// Yoruba
const yoTranslations = {
  ...enTranslations,
  home: 'Ile',
  reading: 'Kíkà',
  search: 'Ṣàwárí',
  settings: 'Àwọn àtúnṣe',
  about: 'Nípa',
  notes: 'Àwọn àkọsílẹ̀',
  principles: 'Ẹ̀kọ́',

  randomVerse: 'Ẹsẹ̀ àyẹrandà',
  newVerse: 'Ẹsẹ̀ tuntun',
  copyVerse: 'Ṣedá ẹsẹ̀',
  verseCopied: 'A ti ṣe ẹda ẹsẹ̀!',
  godSpeaks: 'Ọlọ́run ń bá ọ sọ̀rọ̀',
  openJeremiah: 'Ṣí Jeremia 23:29',

  selectBook: 'Yan ìwé kan',
  selectChapter: 'Yan ìpín kan',
  chapter: 'Ìpín',
  oldTestament: 'Majẹmu Lailai',
  newTestament: 'Majẹmu Titun',
  prevChapter: 'Ìpín tẹ́lẹ̀',
  nextChapter: 'Ìpín tó kàn',
  copyLabel: 'Ṣedá',
  shareLabel: 'Pín',
  cancel: 'Fagilé',
  close: 'Pa mọ́',
  newRandom: 'Ẹsẹ̀ àyẹrandà tuntun',
  swipeLabel: 'Yí sí apá kan',

  searchTitle: 'Ṣàwárí Bííbélì',
  searchPlaceholder: 'Kọ ohun tí o fẹ́ wá',
  searchResults: 'Àbájáde',
  searchNoResults: 'Ko sí ẹsẹ̀ tí a rí.',
  searchClear: 'Pa àwárí rẹ̀ rẹ́',

  appearance: 'Àwò àti irisi',
  lightMode: 'Ìpo ìmólè',
  darkMode: 'Ìpo òkùnkùn',
  fontSize: 'Ìwọn lẹ́tà',
  language: 'Èdè',
  updates: 'Àtúnṣe',
  checkUpdatesButton: 'Ṣàyẹ̀wò àtúnṣe',

  aboutDescription:
    'The Word ń ràn ọ́ lọ́wọ́ láti ṣàwári Ọ̀rọ̀ Ọlọ́run nípasẹ̀ ẹsẹ̀ àyẹrandà àti kíkà Bííbélì tán.',
  randomFeature: 'Àwọn iṣẹ́ àyẹrandà',
  randomFeatureDesc:
    'Ẹrọ àyẹrandà wa ń yan láti inú ẹsẹ̀ Bííbélì tó ju 31,000 lọ láti fún ọ ní ìmísí lojoojúmọ́.',
  musicLink: 'Orin Olùdá',
  versesLabel: 'Àwọn ẹsẹ̀',
  booksLabel: 'Àwọn ìwé',
  readingShortcuts: 'Ọ̀nà kíkà kíákíá',
  createdWithLove:
    'A ṣe é pẹ̀lú ìfẹ́ láti tàn Ọ̀rọ̀ Ọlọ́run ká',

  loading: 'Ń gbé wọlé...',
  error: 'Àṣìṣe nígbà títẹ̀wọlé',
};

/**
 * Dictionnaire global par langue.
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
  tr: trTranslations,
  ja: jaTranslations,
  ko: koTranslations,
  yo: yoTranslations,
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

