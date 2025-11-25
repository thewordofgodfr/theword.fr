// src/hooks/useTranslation.ts
import { useApp } from '../contexts/AppContext';
import type { Language } from '../types/bible';

// =========================================================================
// 1. Définition des Dictionnaires de Traduction (16 Langues)
// =========================================================================

/**
 * Dictionnaire de référence FR (Base)
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
	updatesUpToDate: 'Votre application est à jour.',
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
} as const;

// Anglais (English)
const enTranslations: typeof frTranslations = {
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
	toPrinciples: 'To Studies',
	copyLabel: 'Copy',
	shareLabel: 'Share',
	cancel: 'Cancel',
	close: 'Close',
	notesModalTitle: 'Add to a list (Notes)',
	notesNoList: 'No list yet. Create one below.',
	notesNewListOptional: 'New list (optional)',
	principlesModalTitle: 'Add to a study (Studies)',
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
	frenchVersion:
		'French: Louis Segond 1910 (LSG) - Refresh 2025 - Public Domain',
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

// Espagnol (Spanish)
const esTranslations: typeof frTranslations = {
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
	englishVersion:
		'Inglés: King James Version (KJV) – Dominio público',
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
		'Todas las versiones bíblicas utilizadas son de dominio público. Algunas han sido parcialmente modernizadas (vocabulario, gramática) manteniéndose estrictamente fieles a los manuscrits originaux.',

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

// Russe (Russian)
const ruTranslations: typeof frTranslations = {
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
		importTextInfo: 'Каждый блок станет элементом в списке.',
		importTextCreate: 'Создать список',

		duplicateTitle: 'Список с таким же названием уже существует.',
		confirmDeleteList: 'Удалить этот список?',
		emptyList: 'Пустой список.',

		importFromTextTitle: 'Импортировать из текста',
		documentContent: 'Содержимое документа',
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
		importTextInfo: 'Каждый блок станет элементом в исследовании.',
		importTextCreate: 'Создать исследование',

		duplicateTitle: 'Исследование с таким же названием уже существует.',
		confirmDeleteList: 'Удалить это исследование?',
		emptyList: 'Пустой список.',

		importFromTextTitle: 'Импортировать из текста',
		documentContent: 'Содержимое документа',
		renameList: 'Переименовать',
		share: 'Поделиться',
		copy: 'Копировать',
		deleteList: 'Удалить',

		// Titres pour le partage natif
		shareStudyTitle: 'Исследование',
		shareItemTitle: 'Стих',
	},

	// Settings page
	appearance: 'Внешний вид',
	lightMode: 'Светлый режим',
	darkMode: 'Темный режим',
	fontSize: 'Размер шрифта',
	language: 'Язык',
	french: 'Французский',
	english: 'Английский',
	fontSizeXLLabel: 'Режим слабовидящих (XL)',
	fontSizePreview: 'Предварительный просмотр выбранного размера шрифта.',
	updates: 'Обновления',
	updatesDescription:
		'Проверьте, доступна ли новая версия приложения, и примените ее.',
	applyUpdate: 'Применить обновление',
	checkUpdatesButton: 'Проверить обновления',
	updatesChecking: 'Проверка…',
	updatesUpToDate: 'Ваше приложение обновлено.',
	updatesReady:
		'Новая версия готова. Нажмите «Применить обновление».',
	updatesUnavailable:
		'Автоматическое обновление недоступно (Service Worker не обнаружен).',
	updatesError: 'Ошибка при проверке. Попробуйте еще раз.',

	// About / versions
	aboutTitle: '',
	aboutDescription:
		'The Word позволяет вам открывать для себя Слово Божье с помощью случайных стихов и полного чтения Библии.',
	aboutIntro:
		'TheWord: автономное чтение Библии, мгновенный поиск, тематические заметки, обмен одним касанием. Вы также можете использовать TheWord в Интернете: www.theword.fr',
	bibleVersions: 'Версии Библии',
	frenchVersion:
		'Французский: Louis Segond 1910 (LSG) - Пересмотр 2025 - Свободное от авторских прав',
	englishVersion:
		'Английский: King James Version (KJV) - Свободное от авторских прав',
	frenchVersionDetails:
		'Эталонная версия Библии на французском языке, переведенная Луи Сегоном в 1910 году и пересмотренная в 2025 году (модернизация лексики/грамматики, верность рукописям).',
	englishVersionDetails:
		'Классическая английская версия (KJV), опубликованная в 1611 году, пересмотренная в 1769 году и с ограниченной модернизацией в 2025 году.',
	otherLanguagesNote:
		'Другие языки (немецкий, испанский, португальский, хинди, китайский, арабский и т. д.) постепенно добавляются. Если перевод интерфейса отсутствует, приложение по умолчанию использует английский.',
	randomFeature: 'Случайная функция',
	randomFeatureDesc:
		'Наш генератор случайных стихов выбирает из более чем 31 000 библейских стихов, чтобы предложить вам ежедневное вдохновение.',
	musicLink: 'Музыка Создателя',
	versesLabel: 'Стихи',
	booksLabel: 'Книги',
	readingShortcuts: 'Ярлыки для чтения',
	notesIntro:
		'Организуйте свои любимые отрывки и мысли в тематические списки.',
	notesPoint1: 'Добавляйте стихи или блоки свободного текста.',
	notesPoint2:
		'Коснитесь элемента, чтобы открыть его меню (Открыть в Чтении, Переместить вверх/вниз, Удалить…).',
	notesPoint3: 'Переименовывайте списки, копируйте/делитесь.',
	createdWithLove: 'Создано с любовью для распространения Слова Божьего',
	versionsFootnote:
		'Все используемые версии Библии находятся в общественном достоянии. Некоторые из них были частично модернизированы (лексика, грамматика), оставаясь при этом строго верными оригинальным рукописям.',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'Эти 4 кнопки, расположенные справа от селектора Книга/Глава, позволяют мгновенно возвращаться к часто читаемым местам, чтобы читать несколько книг параллельно: используйте 1/2/3 для трех разных ячеек и лупу для возобновления последнего отрывка (случайный стих или поиск).',
	quickSlotsIllustrationLabel: 'Иллюстрация ярлыков',
	quickSlotLastPassageTooltip: 'Последний отрывок',
	quickSlot1ActiveTooltip: 'Ярлык 1 (активен)',
	quickSlot2Tooltip: 'Ярлык 2',
	quickSlot3Tooltip: 'Ярлык 3',

	// Common
	loading: 'Загрузка...',
	error: 'Ошибка при загрузке',
};

// =========================================================================
// NOUVELLES LANGUES (Traductions basées sur l'anglais/français)
// =========================================================================

// Portugais (Portuguese) - pt
const ptTranslations: typeof frTranslations = {
	// Navigation
	home: 'Início',
	reading: 'Leitura',
	search: 'Pesquisar',
	settings: 'Configurações',
	about: 'Sobre',
	notes: 'Notas',
	principles: 'Estudos',

	// Home page
	randomVerse: 'Versículo Aleatório',
	newVerse: 'Novo Versículo',
	copyVerse: 'Copiar Versículo',
	verseCopied: 'Versículo copiado!',
	godSpeaks: 'Deus fala com você',
	openJeremiah: 'Abrir Jeremias 23:29',
	jeremiah23Quote:
		'«Não é a minha palavra como fogo, diz o Senhor, e como um martelo que esmiúça a rocha?» Jeremias 23:29',

	// Reading page
	selectBook: 'Selecionar um livro',
	selectChapter: 'Selecionar um capítulo',
	chapter: 'Capítulo',
	oldTestament: 'Antigo Testamento',
	newTestament: 'Novo Testamento',

	// Reading – extras
	chooseBook: 'Escolher um livro',
	chooseChapter: 'Escolher um capítulo',
	prevChapter: 'Capítulo anterior',
	nextChapter: 'Próximo capítulo',
	verseWord: 'versículo',
	versesSelectedSuffix: 'versículo(s) selecionado(s)',
	toNotes: 'Para Notas',
	toPrinciples: 'Para Estudos',
	copyLabel: 'Copiar',
	shareLabel: 'Partilhar',
	cancel: 'Cancelar',
	close: 'Fechar',
	notesModalTitle: 'Adicionar a uma lista (Notas)',
	notesNoList: 'Nenhuma lista ainda. Crie uma abaixo.',
	notesNewListOptional: 'Nova lista (opcional)',
	principlesModalTitle: 'Adicionar a um estudo (Estudos)',
	principlesNoList: 'Nenhum estudo ainda. Crie um abaixo.',
	principlesNewListOptional: 'Novo estudo (opcional)',
	selectionCopied: 'Seleção copiada',
	textReadyToShare: 'Texto pronto para partilhar (copiado)',
	addedToList: 'Adicionado à lista',
	newRandom: 'Novo aleatório',
	swipeLabel: 'Deslize',
	searchSlotLabel: 'Pesquisa',
	searchSlotEmpty: 'Pesquisa (vazio)',
	memorySlotLabel: 'Memória',
	emptySlotSuffix: '(vazio)',
	untitledList: '(sem título)',

	// Short label “Copied”
	copiedShort: 'Copiado',

	// *** Search page ***
	searchTitle: 'Pesquisa bíblica',
	searchPlaceholder: 'Digite sua pesquisa',
	searchMinChars: 'Digite pelo menos 2 caracteres.',
	searchSearching: 'Pesquisando…',
	searchResults: 'Resultados',
	searchExpandAll: 'Expandir tudo',
	searchCollapseAll: 'Recolher tudo',
	searchNoResults: 'Nenhum versículo encontrado.',
	searchClear: 'Limpar',
	searchOpenInReading: 'Abrir em Leitura',

	// Bloc Notes (page Notes)
	notesPage: {
		create: 'Criar lista',
		placeholder: 'Título da lista…',
		empty: 'Nenhuma lista ainda.',
		items: 'elementos',
		backAll: '← Todas as listas',
		addTextBlock: 'Adicionar bloco de texto',
		editTextBlock: 'Editar bloco',
		deleteItem: 'Excluir',
		moveUp: 'Mover para cima',
		moveDown: 'Mover para baixo',
		open: 'Abrir',
		confirmDeleteItem: 'Excluir este item?',
		newTextPlaceholder: 'Seu texto…',

		// Partilhar / importar via código
		shareCode: 'Código',
		importCode: 'Importar código',
		importPrompt: 'Cole o código de partilha TheWord aqui:',
		importError: 'Código inválido.',
		importSuccess: 'Lista importada com sucesso ✅',
		shareCodeCopied: 'Código copiado para a área de transferência ✅',

		// Importação direta de texto
		importTextButton: 'Texto → Lista',
		importTextTitlePlaceholder: 'Título da nova lista',
		importTextDefaultTitle: 'Importação de texto',
		importTextBodyPlaceholder: 'Cole seu texto aqui…',
		importTextNoBody: 'Por favor, cole algum texto para importar.',
		importTextNoBlock:
			'Nenhum bloco detectado (adicione linhas vazias se quiser dividir em blocos).',
		importTextSplitLabel:
			'Dividir em blocos (separados por pelo menos uma linha vazia)',
		importTextInfo: 'Cada bloco se tornará um item na lista.',
		importTextCreate: 'Criar lista',

		duplicateTitle: 'Já existe uma lista com o mesmo título.',
		confirmDeleteList: 'Excluir esta lista?',
		emptyList: 'Lista vazia.',

		importFromTextTitle: 'Importar de texto',
		documentContent: 'Conteúdo do documento',
		renameList: 'Renomear',
	},

	// Bloc Principes (page Principes)
	principlesPage: {
		create: 'Criar estudo',
		placeholder: 'Título do estudo…',
		empty: 'Nenhum estudo ainda.',
		items: 'elementos',
		backAll: '← Todos os estudos',
		addTextBlock: 'Adicionar bloco de texto',
		editTextBlock: 'Editar bloco',
		deleteItem: 'Excluir',
		moveUp: 'Mover para cima',
		moveDown: 'Mover para baixo',
		open: 'Abrir',
		openReading: 'Abrir Leitura',
		confirmDeleteItem: 'Excluir este item?',
		newTextPlaceholder: 'Seu texto…',

		// Partilhar / importar via código
		shareCode: 'Código',
		importCode: 'Importar código',
		importPrompt: 'Cole o código de partilha TheWord (nota ou estudo) aqui:',
		importError: 'Código inválido.',
		importSuccess: 'Estudo importado com sucesso ✅',
		shareCodeCopied: 'Código copiado para a área de transferência ✅',

		// Importação direta de texto
		importTextButton: 'Texto → Estudo',
		importTextTitlePlaceholder: 'Título do novo estudo',
		importTextDefaultTitle: 'Importação de texto',
		importTextBodyPlaceholder: 'Cole seu texto aqui…',
		importTextNoBody: 'Por favor, cole algum texto para importar.',
		importTextNoBlock:
			'Nenhum bloco detectado (adicione linhas vazias se quiser dividir em blocos).',
		importTextSplitLabel:
			'Dividir em blocos (separados por pelo menos uma linha vazia)',
		importTextInfo: 'Cada bloco se tornará um item no estudo.',
		importTextCreate: 'Criar estudo',

		duplicateTitle: 'Já existe um estudo com o mesmo título.',
		confirmDeleteList: 'Excluir este estudo?',
		emptyList: 'Estudo vazio.',

		importFromTextTitle: 'Importar de texto',
		documentContent: 'Conteúdo do documento',
		renameList: 'Renomear',
		share: 'Partilhar',
		copy: 'Copiar',
		deleteList: 'Excluir',

		// Títulos para partilha nativa
		shareStudyTitle: 'Estudo',
		shareItemTitle: 'Versículo',
	},

	// Settings page
	appearance: 'Aparência',
	lightMode: 'Modo Claro',
	darkMode: 'Modo Escuro',
	fontSize: 'Tamanho da Fonte',
	language: 'Idioma',
	french: 'Francês',
	english: 'Inglês',
	fontSizeXLLabel: 'Modo Baixa Visão (XL)',
	fontSizePreview: 'Pré-visualização do tamanho da fonte selecionada.',
	updates: 'Atualizações',
	updatesDescription:
		'Verifique se há uma nova versão disponível e aplique-a.',
	applyUpdate: 'Aplicar atualização',
	checkUpdatesButton: 'Verificar atualizações',
	updatesChecking: 'Verificando…',
	updatesUpToDate: 'Seu aplicativo está atualizado.',
	updatesReady:
		'Nova versão pronta. Clique em «Aplicar atualização».',
	updatesUnavailable:
		'Atualização automática indisponível (Service Worker não detectado).',
	updatesError: 'Erro ao verificar. Tente novamente.',

	// About / versions
	aboutTitle: '',
	aboutDescription:
		'The Word permite descobrir a palavra de Deus através de versículos aleatórios e leitura completa da Bíblia.',
	aboutIntro:
		'TheWord: Leitura da Bíblia offline, pesquisa instantânea, notas temáticas, partilha com um toque. Encontre TheWord também na web: www.theword.fr',
	bibleVersions: 'Versões da Bíblia',
	frenchVersion:
		'Francês: Louis Segond 1910 (LSG) - Revisão 2025 - Domínio Público',
	englishVersion: 'Inglês: King James Version (KJV) - Domínio Público',
	frenchVersionDetails:
		'Versão de referência em francês, traduzida por Louis Segond em 1910 e revista em 2025 (modernização do vocabulário/gramática, fidelidade aos manuscritos).',
	englishVersionDetails:
		'Versão clássica em inglês (KJV), publicada em 1611, revista em 1769 e modernização limitada em 2025.',
	otherLanguagesNote:
		'Outras línguas (Alemão, Espanhol, Hindi, Chinês, Árabe, etc.) estão sendo adicionadas progressivamente. Se faltar uma tradução de interface, o aplicativo utiliza o inglês por padrão.',
	randomFeature: 'Funcionalidade Aleatória',
	randomFeatureDesc:
		'Nosso gerador de versículos aleatórios seleciona entre mais de 31.000 versículos bíblicos para oferecer uma inspiração diária.',
	musicLink: 'Música do Criador',
	versesLabel: 'Versículos',
	booksLabel: 'Livros',
	readingShortcuts: 'Atalhos de leitura',
	notesIntro:
		'Organize suas passagens favoritas e pensamentos pessoais em listas temáticas.',
	notesPoint1: 'Adicione versículos ou blocos de texto livre.',
	notesPoint2:
		'Toque num item para abrir o menu (Abrir em Leitura, Mover para cima/baixo, Excluir…).',
	notesPoint3: 'Renomeie suas listas, copie/partilhe.',
	createdWithLove: 'Criado com amor para espalhar a Palavra de Deus',
	versionsFootnote:
		'Todas as versões bíblicas utilizadas são de domínio público. Algumas foram parcialmente modernizadas (vocabulário, gramática), permanecendo estritamente fiéis aos manuscritos originais.',

	// Quick slots / atalhos de leitura (About + Reading)
	quickSlotsIntro:
		'Estes 4 botões, alinhados à direita do seletor Livro/Capítulo, permitem retornar instantaneamente às suas leituras frequentes para seguir vários livros em paralelo: use 1/2/3 para 3 locais distintos e a lupa para retomar a última passagem (versículo aleatório ou pesquisa).',
	quickSlotsIllustrationLabel: 'Ilustração dos atalhos',
	quickSlotLastPassageTooltip: 'Última passagem',
	quickSlot1ActiveTooltip: 'Atalho 1 (ativo)',
	quickSlot2Tooltip: 'Atalho 2',
	quickSlot3Tooltip: 'Atalho 3',

	// Common
	loading: 'Carregando...',
	error: 'Erro ao carregar',
};

// Allemand (German) - de
const deTranslations: typeof frTranslations = {
	// Navigation
	home: 'Startseite',
	reading: 'Lesen',
	search: 'Suche',
	settings: 'Einstellungen',
	about: 'Über',
	notes: 'Notizen',
	principles: 'Prinzipien',

	// Home page
	randomVerse: 'Zufälliger Vers',
	newVerse: 'Neuer Vers',
	copyVerse: 'Vers kopieren',
	verseCopied: 'Vers kopiert!',
	godSpeaks: 'Gott spricht zu Ihnen',
	openJeremiah: 'Öffne Jeremia 23,29',
	jeremiah23Quote:
		'„Ist mein Wort nicht wie ein Feuer, spricht der HERR, und wie ein Hammer, der Felsen zerschlägt?“ Jeremia 23,29',

	// Reading page
	selectBook: 'Wählen Sie ein Buch',
	selectChapter: 'Wählen Sie ein Kapitel',
	chapter: 'Kapitel',
	oldTestament: 'Altes Testament',
	newTestament: 'Neues Testament',

	// Reading – extras
	chooseBook: 'Wählen Sie ein Buch',
	chooseChapter: 'Wählen Sie ein Kapitel',
	prevChapter: 'Vorheriges Kapitel',
	nextChapter: 'Nächstes Kapitel',
	verseWord: 'Vers',
	versesSelectedSuffix: 'Vers(e) ausgewählt',
	toNotes: 'Zu Notizen',
	toPrinciples: 'Zu Prinzipien',
	copyLabel: 'Kopieren',
	shareLabel: 'Teilen',
	cancel: 'Abbrechen',
	close: 'Schließen',
	notesModalTitle: 'Zu einer Liste hinzufügen (Notizen)',
	notesNoList: 'Noch keine Listen. Erstellen Sie eine unten.',
	notesNewListOptional: 'Neue Liste (optional)',
	principlesModalTitle: 'Zu einer Studie hinzufügen (Prinzipien)',
	principlesNoList: 'Noch keine Studien. Erstellen Sie eine unten.',
	principlesNewListOptional: 'Neue Studie (optional)',
	selectionCopied: 'Auswahl kopiert',
	textReadyToShare: 'Text bereit zum Teilen (kopiert)',
	addedToList: 'Zur Liste hinzugefügt',
	newRandom: 'Neuer Zufälliger',
	swipeLabel: 'Wischen',
	searchSlotLabel: 'Suche',
	searchSlotEmpty: 'Suche (leer)',
	memorySlotLabel: 'Speicher',
	emptySlotSuffix: '(leer)',
	untitledList: '(unbenannt)',

	// Short label “Copied”
	copiedShort: 'Kopiert',

	// *** Search page ***
	searchTitle: 'Bibelsuche',
	searchPlaceholder: 'Geben Sie Ihre Suche ein',
	searchMinChars: 'Geben Sie mindestens 2 Zeichen ein.',
	searchSearching: 'Suche läuft…',
	searchResults: 'Ergebnisse',
	searchExpandAll: 'Alle öffnen',
	searchCollapseAll: 'Alle schließen',
	searchNoResults: 'Keine Verse gefunden.',
	searchClear: 'Löschen',
	searchOpenInReading: 'Im Lesen öffnen',

	// Bloc Notes (page Notes)
	notesPage: {
		create: 'Liste erstellen',
		placeholder: 'Listentitel…',
		empty: 'Noch keine Listen.',
		items: 'Elemente',
		backAll: '← Alle Listen',
		addTextBlock: 'Textblock hinzufügen',
		editTextBlock: 'Block bearbeiten',
		deleteItem: 'Löschen',
		moveUp: 'Nach oben',
		moveDown: 'Nach unten',
		open: 'Öffnen',
		confirmDeleteItem: 'Dieses Element löschen?',
		newTextPlaceholder: 'Ihr Text…',

		// Teilen / Import per Code
		shareCode: 'Code',
		importCode: 'Code importieren',
		importPrompt: 'Fügen Sie den TheWord-Freigabecode hier ein:',
		importError: 'Ungültiger Code.',
		importSuccess: 'Liste erfolgreich importiert ✅',
		shareCodeCopied: 'Code in die Zwischenablage kopiert ✅',

		// Direkter Import aus Text
		importTextButton: 'Text → Liste',
		importTextTitlePlaceholder: 'Titel der neuen Liste',
		importTextDefaultTitle: 'Textimport',
		importTextBodyPlaceholder: 'Fügen Sie Ihren Text hier ein…',
		importTextNoBody: 'Bitte fügen Sie Text zum Importieren ein.',
		importTextNoBlock:
			'Kein Block erkannt (lassen Sie Leerzeilen, wenn Sie in Blöcke aufteilen möchten).',
		importTextSplitLabel:
			'In Blöcke aufteilen (durch mindestens eine Leerzeile getrennt)',
		importTextInfo: 'Jeder Block wird zu einem Element in der Liste.',
		importTextCreate: 'Liste erstellen',

		duplicateTitle: 'Ein identischer Titel existiert bereits.',
		confirmDeleteList: 'Diese Liste löschen?',
		emptyList: 'Leere Liste.',

		importFromTextTitle: 'Aus Text importieren',
		documentContent: 'Dokumentinhalt',
		renameList: 'Umbenennen',
	},

	// Bloc Principes (page Principes)
	principlesPage: {
		create: 'Studie erstellen',
		placeholder: 'Studientitel…',
		empty: 'Noch keine Studien.',
		items: 'Elemente',
		backAll: '← Alle Studien',
		addTextBlock: 'Textblock hinzufügen',
		editTextBlock: 'Block bearbeiten',
		deleteItem: 'Löschen',
		moveUp: 'Nach oben',
		moveDown: 'Nach unten',
		open: 'Öffnen',
		openReading: 'Lesen öffnen',
		confirmDeleteItem: 'Dieses Element löschen?',
		newTextPlaceholder: 'Ihr Text…',

		// Teilen / Import per Code
		shareCode: 'Code',
		importCode: 'Code importieren',
		importPrompt: 'Fügen Sie den TheWord-Freigabecode (Notiz oder Studie) hier ein:',
		importError: 'Ungültiger Code.',
		importSuccess: 'Studie erfolgreich importiert ✅',
		shareCodeCopied: 'Code in die Zwischenablage kopiert ✅',

		// Direkter Import aus Text
		importTextButton: 'Text → Studie',
		importTextTitlePlaceholder: 'Titel der neuen Studie',
		importTextDefaultTitle: 'Textimport',
		importTextBodyPlaceholder: 'Fügen Sie Ihren Text hier ein…',
		importTextNoBody: 'Bitte fügen Sie Text zum Importieren ein.',
		importTextNoBlock:
			'Kein Block erkannt (lassen Sie Leerzeilen, wenn Sie in Blöcke aufteilen möchten).',
		importTextSplitLabel:
			'In Blöcke aufteilen (durch mindestens eine Leerzeile getrennt)',
		importTextInfo: 'Jeder Block wird zu einem Element in der Studie.',
		importTextCreate: 'Studie erstellen',

		duplicateTitle: 'Eine Studie mit demselben Titel existiert bereits.',
		confirmDeleteList: 'Diese Studie löschen?',
		emptyList: 'Leere Studie.',

		importFromTextTitle: 'Aus Text importieren',
		documentContent: 'Dokumentinhalt',
		renameList: 'Umbenennen',
		share: 'Teilen',
		copy: 'Kopieren',
		deleteList: 'Löschen',

		// Titel für das native Teilen
		shareStudyTitle: 'Studie',
		shareItemTitle: 'Vers',
	},

	// Settings page
	appearance: 'Erscheinungsbild',
	lightMode: 'Heller Modus',
	darkMode: 'Dunkler Modus',
	fontSize: 'Schriftgröße',
	language: 'Sprache',
	french: 'Französisch',
	english: 'Englisch',
	fontSizeXLLabel: 'Modus für Sehbehinderte (XL)',
	fontSizePreview: 'Vorschau der ausgewählten Schriftgröße.',
	updates: 'Updates',
	updatesDescription:
		'Überprüfen Sie, ob eine neue Version der App verfügbar ist und wenden Sie sie an.',
	applyUpdate: 'Update anwenden',
	checkUpdatesButton: 'Nach Updates suchen',
	updatesChecking: 'Prüfen…',
	updatesUpToDate: 'Ihre App ist aktuell.',
	updatesReady:
		'Neue Version bereit. Klicken Sie auf „Update anwenden“.',
	updatesUnavailable:
		'Automatische Aktualisierung nicht verfügbar (Service Worker nicht erkannt).',
	updatesError: 'Fehler beim Prüfen. Versuchen Sie es erneut.',

	// About / versions
	aboutTitle: '',
	aboutDescription:
		'The Word ermöglicht es Ihnen, Gottes Wort durch zufällige Verse und die vollständige Bibellesung zu entdecken.',
	aboutIntro:
		'TheWord: Offline-Bibellesen, Sofortsuche, thematische Notizen, Teilen mit einem Fingertipp. Finden Sie TheWord auch im Web: www.theword.fr',
	bibleVersions: 'Bibelversionen',
	frenchVersion:
		'Französisch: Louis Segond 1910 (LSG) - Revision 2025 - Gemeinfrei',
	englishVersion: 'Englisch: King James Version (KJV) - Gemeinfrei',
	frenchVersionDetails:
		'Referenzversion der Bibel in Französisch, übersetzt von Louis Segond im Jahr 1910 und überarbeitet im Jahr 2025 (Modernisierung von Vokabular/Grammatik, treu zu den Manuskripten).',
	englishVersionDetails:
		'Klassische englische Version (KJV), veröffentlicht 1611, überarbeitet 1769 und begrenzte Modernisierung 2025.',
	otherLanguagesNote:
		'Weitere Sprachen (Spanisch, Portugiesisch, Hindi, Chinesisch, Arabisch usw.) werden schrittweise hinzugefügt. Fehlt eine Benutzeroberfläche-Übersetzung, verwendet die Anwendung standardmäßig Englisch.',
	randomFeature: 'Zufallsfunktion',
	randomFeatureDesc:
		'Unser Zufallsvers-Generator wählt aus über 31.000 Bibelversen, um Ihnen tägliche Inspiration zu bieten.',
	musicLink: 'Musik des Schöpfers',
	versesLabel: 'Verse',
	booksLabel: 'Bücher',
	readingShortcuts: 'Lese-Shortcuts',
	notesIntro:
		'Organisieren Sie Ihre Lieblingspassagen und Gedanken in thematischen Listen.',
	notesPoint1: 'Fügen Sie Verse oder Freitextblöcke hinzu.',
	notesPoint2:
		'Tippen Sie auf ein Element, um das Menü anzuzeigen (Im Lesen öffnen, Nach oben/unten verschieben, Löschen…).',
	notesPoint3: 'Benennen Sie Ihre Listen um, kopieren/teilen Sie sie.',
	createdWithLove: 'Mit Liebe erstellt, um Gottes Wort zu verbreiten',
	versionsFootnote:
		'Alle verwendeten Bibelversionen sind gemeinfrei. Einige wurden teilweise modernisiert (Vokabular, Grammatik), bleiben aber den Originalmanuskripten streng treu.',

	// Quick slots / Lese-Shortcuts (About + Reading)
	quickSlotsIntro:
		'Diese 4 Schaltflächen, rechts neben dem Buch/Kapitel-Wähler, ermöglichen es Ihnen, sofort zu Ihren häufigen Lesungen zurückzukehren, um mehrere Bücher parallel zu lesen: Verwenden Sie 1/2/3 für 3 verschiedene Speicherplätze und die Lupe, um die letzte Passage (zufälliger Vers oder Suche) fortzusetzen.',
	quickSlotsIllustrationLabel: 'Illustration der Shortcuts',
	quickSlotLastPassageTooltip: 'Letzte Passage',
	quickSlot1ActiveTooltip: 'Shortcut 1 (aktiv)',
	quickSlot2Tooltip: 'Shortcut 2',
	quickSlot3Tooltip: 'Shortcut 3',

	// Common
	loading: 'Laden…',
	error: 'Fehler beim Laden',
};

// Hindi - hi
const hiTranslations: typeof frTranslations = {
	// Navigation
	home: 'होम',
	reading: 'पठन',
	search: 'खोज',
	settings: 'सेटिंग्स',
	about: 'के बारे में',
	notes: 'नोट्स',
	principles: 'सिद्धांत',

	// Home page
	randomVerse: 'यादृच्छिक पद',
	newVerse: 'नया पद',
	copyVerse: 'पद कॉपी करें',
	verseCopied: 'पद कॉपी हो गया!',
	godSpeaks: 'परमेश्वर आपसे बात करता है',
	openJeremiah: 'यिर्मयाह 23:29 खोलें',
	jeremiah23Quote:
		'«क्या मेरा वचन आग के समान नहीं है, यहोवा की वाणी है, और हथौड़े के समान जो चट्टान को तोड़ डालता है?» यिर्मयाह 23:29',

	// Reading page
	selectBook: 'एक पुस्तक चुनें',
	selectChapter: 'एक अध्याय चुनें',
	chapter: 'अध्याय',
	oldTestament: 'पुराना नियम',
	newTestament: 'नया नियम',

	// Reading – extras
	chooseBook: 'एक पुस्तक चुनें',
	chooseChapter: 'एक अध्याय चुनें',
	prevChapter: 'पिछला अध्याय',
	nextChapter: 'अगला अध्याय',
	verseWord: 'पद',
	versesSelectedSuffix: 'पद चुने गए',
	toNotes: 'नोट्स पर जाएं',
	toPrinciples: 'सिद्धांतों पर जाएं',
	copyLabel: 'कॉपी करें',
	shareLabel: 'साझा करें',
	cancel: 'रद्द करें',
	close: 'बंद करें',
	notesModalTitle: 'एक सूची में जोड़ें (नोट्स)',
	notesNoList: 'अभी कोई सूची नहीं है। नीचे एक बनाएं।',
	notesNewListOptional: 'नई सूची (वैकल्पिक)',
	principlesModalTitle: 'एक अध्ययन में जोड़ें (सिद्धांत)',
	principlesNoList: 'अभी कोई अध्ययन नहीं है। नीचे एक बनाएं।',
	principlesNewListOptional: 'नया अध्ययन (वैकल्पिक)',
	selectionCopied: 'चयन कॉपी किया गया',
	textReadyToShare: 'साझा करने के लिए पाठ तैयार (कॉपी किया गया)',
	addedToList: 'सूची में जोड़ा गया',
	newRandom: 'नया यादृच्छिक',
	swipeLabel: 'स्वाइप करें',
	searchSlotLabel: 'खोज',
	searchSlotEmpty: 'खोज (खाली)',
	memorySlotLabel: 'स्लॉट',
	emptySlotSuffix: '(खाली)',
	untitledList: '(शीर्षक रहित)',

	// Short label “Copied”
	copiedShort: 'कॉपी किया गया',

	// *** Search page ***
	searchTitle: 'बाइबिल खोज',
	searchPlaceholder: 'अपनी खोज टाइप करें',
	searchMinChars: 'खोजने के लिए कम से कम 2 वर्ण टाइप करें।',
	searchSearching: 'खोज रहा है…',
	searchResults: 'परिणाम',
	searchExpandAll: 'सभी का विस्तार करें',
	searchCollapseAll: 'सभी को संकुचित करें',
	searchNoResults: 'कोई पद नहीं मिला।',
	searchClear: 'साफ़ करें',
	searchOpenInReading: 'पठन में खोलें',

	// Notes page block
	notesPage: {
		create: 'सूची बनाएं',
		placeholder: 'सूची शीर्षक…',
		empty: 'अभी कोई सूची नहीं है।',
		items: 'आइटम',
		backAll: '← सभी सूचियाँ',
		addTextBlock: 'टेक्स्ट ब्लॉक जोड़ें',
		editTextBlock: 'ब्लॉक संपादित करें',
		deleteItem: 'हटाएँ',
		moveUp: 'ऊपर ले जाएं',
		moveDown: 'नीचे ले जाएं',
		open: 'खोलें',
		confirmDeleteItem: 'इस आइटम को हटाएँ?',
		newTextPlaceholder: 'आपका पाठ…',

		// साझा/कोड द्वारा आयात
		shareCode: 'कोड',
		importCode: 'कोड आयात करें',
		importPrompt: 'TheWord शेयर कोड यहाँ पेस्ट करें:',
		importError: 'अमान्य कोड।',
		importSuccess: 'सूची सफलतापूर्वक आयात की गई ✅',
		shareCodeCopied: 'कोड क्लिपबोर्ड पर कॉपी किया गया ✅',

		// पाठ से सीधा आयात
		importTextButton: 'पाठ → सूची',
		importTextTitlePlaceholder: 'नई सूची का शीर्षक',
		importTextDefaultTitle: 'पाठ आयात',
		importTextBodyPlaceholder: 'अपना पाठ यहाँ पेस्ट करें…',
		importTextNoBody: 'कृपया आयात करने के लिए कुछ पाठ पेस्ट करें।',
		importTextNoBlock:
			'कोई ब्लॉक नहीं मिला (यदि आप ब्लॉकों में विभाजित करना चाहते हैं तो रिक्त लाइनें जोड़ें)।',
		importTextSplitLabel:
			'ब्लॉकों में विभाजित करें (कम से कम एक खाली लाइन द्वारा अलग किए गए)',
		importTextInfo: 'प्रत्येक ब्लॉक सूची में एक आइटम बन जाएगा।',
		importTextCreate: 'सूची बनाएं',

		duplicateTitle: 'समान शीर्षक वाली एक सूची पहले से मौजूद है।',
		confirmDeleteList: 'इस सूची को हटाएँ?',
		emptyList: 'खाली सूची।',

		importFromTextTitle: 'पाठ से आयात करें',
		documentContent: 'दस्तावेज़ सामग्री',
		renameList: 'नाम बदलें',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: 'अध्ययन बनाएं',
		placeholder: 'अध्ययन शीर्षक…',
		empty: 'अभी कोई अध्ययन नहीं है।',
		items: 'आइटम',
		backAll: '← सभी अध्ययन',
		addTextBlock: 'टेक्स्ट ब्लॉक जोड़ें',
		editTextBlock: 'ब्लॉक संपादित करें',
		deleteItem: 'हटाएँ',
		moveUp: 'ऊपर ले जाएं',
		moveDown: 'नीचे ले जाएं',
		open: 'खोलें',
		openReading: 'पठन खोलें',
		confirmDeleteItem: 'इस आइटम को हटाएँ?',
		newTextPlaceholder: 'आपका पाठ…',

		// साझा/कोड द्वारा आयात
		shareCode: 'कोड',
		importCode: 'कोड आयात करें',
		importPrompt: 'TheWord शेयर कोड (नोट या अध्ययन) यहाँ पेस्ट करें:',
		importError: 'अमान्य कोड।',
		importSuccess: 'अध्ययन सफलतापूर्वक आयात किया गया ✅',
		shareCodeCopied: 'कोड क्लिपबोर्ड पर कॉपी किया गया ✅',

		// पाठ से सीधा आयात
		importTextButton: 'पाठ → अध्ययन',
		importTextTitlePlaceholder: 'नए अध्ययन का शीर्षक',
		importTextDefaultTitle: 'पाठ आयात',
		importTextBodyPlaceholder: 'अपना पाठ यहाँ पेस्ट करें…',
		importTextNoBody: 'कृपया आयात करने के लिए कुछ पाठ पेस्ट करें।',
		importTextNoBlock:
			'कोई ब्लॉक नहीं मिला (यदि आप ब्लॉकों में विभाजित करना चाहते हैं तो रिक्त लाइनें जोड़ें)।',
		importTextSplitLabel:
			'ब्लॉकों में विभाजित करें (कम से कम एक खाली लाइन द्वारा अलग किए गए)',
		importTextInfo: 'प्रत्येक ब्लॉक अध्ययन में एक आइटम बन जाएगा।',
		importTextCreate: 'अध्ययन बनाएं',

		duplicateTitle: 'समान शीर्षक वाला एक अध्ययन पहले से मौजूद है।',
		confirmDeleteList: 'इस अध्ययन को हटाएँ?',
		emptyList: 'खाली अध्ययन।',

		importFromTextTitle: 'पाठ से आयात करें',
		documentContent: 'दस्तावेज़ सामग्री',
		renameList: 'नाम बदलें',
		share: 'साझा करें',
		copy: 'कॉपी करें',
		deleteList: 'हटाएँ',

		// देशी साझाकरण के लिए शीर्षक
		shareStudyTitle: 'अध्ययन',
		shareItemTitle: 'पद',
	},

	// Settings page
	appearance: 'स्वरूप',
	lightMode: 'लाइट मोड',
	darkMode: 'डार्क मोड',
	fontSize: 'फ़ॉन्ट आकार',
	language: 'भाषा',
	french: 'फ्रेंच',
	english: 'अंग्रेज़ी',
	fontSizeXLLabel: 'कम दृष्टि मोड (XL)',
	fontSizePreview: 'चुने गए फ़ॉन्ट आकार का पूर्वावलोकन।',
	updates: 'अपडेट',
	updatesDescription:
		'जाँच करें कि क्या कोई नया संस्करण उपलब्ध है और इसे लागू करें।',
	applyUpdate: 'अपडेट लागू करें',
	checkUpdatesButton: 'अपडेट के लिए जाँच करें',
	updatesChecking: 'जाँच रहा है…',
	updatesUpToDate: 'आपका ऐप अप टू डेट है।',
	updatesReady: 'नया संस्करण तैयार है। “अपडेट लागू करें” पर क्लिक करें।',
	updatesUnavailable:
		'स्वचालित अपडेट अनुपलब्ध (कोई सेवा कार्यकर्ता नहीं)।',
	updatesError: 'जाँच करते समय त्रुटि। कृपया पुन: प्रयास करें।',

	// About page
	aboutTitle: '',
	aboutDescription:
		'The Word आपको यादृच्छिक पदों और पूर्ण बाइबिल पठन के माध्यम से परमेश्वर के वचन को खोजने की अनुमति देता है।',
	aboutIntro:
		'TheWord: ऑफ़लाइन बाइबिल पठन, तुरंत खोज, विषयगत नोट्स, एक टैप साझाकरण। आप वेब पर भी TheWord का उपयोग कर सकते हैं: www.theword.fr',
	bibleVersions: 'बाइबिल संस्करण',
	frenchVersion:
		'फ्रेंच: लुई सेगोंड 1910 (LSG) - रिफ्रेश 2025 - सार्वजनिक डोमेन',
	englishVersion: 'अंग्रेज़ी: किंग जेम्स वर्जन (KJV) - सार्वजनिक डोमेन',
	frenchVersionDetails:
		'संदर्भ फ्रेंच बाइबिल, 1910 में लुई सेगोंड द्वारा अनुवादित और 2025 में ताज़ा किया गया (आधुनिक शब्दावली/व्याकरण, पांडुलिपियों के प्रति वफादार)।',
	englishVersionDetails:
		'क्लासिक अंग्रेजी संस्करण (KJV), 1611 में प्रकाशित, 1769 में संशोधित, सीमित 2025 ताज़ा के साथ।',
	otherLanguagesNote:
		'अधिक भाषाएँ (जर्मन, स्पेनिश, पुर्तगाली, चीनी, अरबी, आदि) धीरे-धीरे जोड़ी जा रही हैं। जब कोई इंटरफ़ेस अनुवाद अनुपलब्ध होता है, तो ऐप अंग्रेजी पर वापस आ जाता है।',
	randomFeature: 'यादृच्छिक सुविधा',
	randomFeatureDesc:
		'हमारा यादृच्छिक पद जनरेटर आपको दैनिक प्रेरणा प्रदान करने के लिए 31,000 से अधिक बाइबिल पदों में से चयन करता है।',
	musicLink: 'सृष्टिकर्ता का संगीत',
	versesLabel: 'पद',
	booksLabel: 'पुस्तकें',
	readingShortcuts: 'पठन शॉर्टकट',
	notesIntro:
		'पसंदीदा अंशों और व्यक्तिगत विचारों को विषयगत सूचियों में व्यवस्थित करें।',
	notesPoint1: 'पद या मुक्त-पाठ ब्लॉक जोड़ें।',
	notesPoint2:
		'इसका मेनू खोलने के लिए एक आइटम टैप करें (पठन में खोलें, ऊपर/नीचे ले जाएं, हटाएँ…)।',
	notesPoint3: 'सूचियों का नाम बदलें, कॉपी करें/साझा करें।',
	createdWithLove: 'परमेश्वर के वचन को फैलाने के लिए प्रेम से बनाया गया',
	versionsFootnote:
		'उपयोग किए गए सभी बाइबिल संस्करण सार्वजनिक डोमेन में हैं। कुछ को आंशिक रूप से आधुनिक बनाया गया है (शब्दावली, व्याकरण) जबकि मूल पांडुलिपियों के प्रति सख्ती से वफादार रहे हैं।',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'पुस्तक/अध्याय चयनकर्ता के दाईं ओर संरेखित ये 4 बटन, आपको समानांतर में कई पुस्तकों का अनुसरण करने के लिए अपने बार-बार पढ़ने पर तुरंत वापस जाने देते हैं: तीन स्थानों के लिए 1/2/3 का उपयोग करें, और अंतिम मार्ग (यादृच्छिक पद या खोज) को फिर से शुरू करने के लिए आवर्धक काँच का उपयोग करें।',
	quickSlotsIllustrationLabel: 'शॉर्टकट चित्रण',
	quickSlotLastPassageTooltip: 'अंतिम मार्ग',
	quickSlot1ActiveTooltip: 'शॉर्टकट 1 (सक्रिय)',
	quickSlot2Tooltip: 'शॉर्टकट 2',
	quickSlot3Tooltip: 'शॉर्टकट 3',

	// Common
	loading: 'लोड हो रहा है…',
	error: 'सामग्री लोड करने में त्रुटि',
};

// Chinois (Simplified Chinese) - zh
const zhTranslations: typeof frTranslations = {
	// Navigation
	home: '首页',
	reading: '阅读',
	search: '搜索',
	settings: '设置',
	about: '关于',
	notes: '笔记',
	principles: '原则',

	// Home page
	randomVerse: '随机经文',
	newVerse: '新经文',
	copyVerse: '复制经文',
	verseCopied: '经文已复制!',
	godSpeaks: '上帝与您交谈',
	openJeremiah: '打开耶利米书 23:29',
	jeremiah23Quote:
		'“耶和华说：我的话岂不像火，又像打碎磐石的大锤吗？” 耶利米书 23:29',

	// Reading page
	selectBook: '选择一卷书',
	selectChapter: '选择一章',
	chapter: '章',
	oldTestament: '旧约',
	newTestament: '新约',

	// Reading – extras
	chooseBook: '选择一卷书',
	chooseChapter: '选择一章',
	prevChapter: '上一章',
	nextChapter: '下一章',
	verseWord: '节',
	versesSelectedSuffix: '节经文已选择',
	toNotes: '到笔记',
	toPrinciples: '到原则',
	copyLabel: '复制',
	shareLabel: '分享',
	cancel: '取消',
	close: '关闭',
	notesModalTitle: '添加到列表 (笔记)',
	notesNoList: '暂无列表。在下方创建一个。',
	notesNewListOptional: '新列表 (可选)',
	principlesModalTitle: '添加到学习 (原则)',
	principlesNoList: '暂无学习。在下方创建一个。',
	principlesNewListOptional: '新学习 (可选)',
	selectionCopied: '选择已复制',
	textReadyToShare: '文字准备分享 (已复制)',
	addedToList: '已添加到列表',
	newRandom: '新随机',
	swipeLabel: '滑动',
	searchSlotLabel: '搜索',
	searchSlotEmpty: '搜索 (空)',
	memorySlotLabel: '槽位',
	emptySlotSuffix: '(空)',
	untitledList: '(无标题)',

	// Short label “Copied”
	copiedShort: '已复制',

	// *** Search page ***
	searchTitle: '圣经搜索',
	searchPlaceholder: '输入您的搜索内容',
	searchMinChars: '输入至少 2 个字符进行搜索。',
	searchSearching: '正在搜索…',
	searchResults: '结果',
	searchExpandAll: '全部展开',
	searchCollapseAll: '全部收起',
	searchNoResults: '未找到经文。',
	searchClear: '清除',
	searchOpenInReading: '在阅读中打开',

	// Notes page block
	notesPage: {
		create: '创建列表',
		placeholder: '列表标题…',
		empty: '暂无列表。',
		items: '项目',
		backAll: '← 所有列表',
		addTextBlock: '添加文本块',
		editTextBlock: '编辑块',
		deleteItem: '删除',
		moveUp: '上移',
		moveDown: '下移',
		open: '打开',
		confirmDeleteItem: '删除此项目？',
		newTextPlaceholder: '您的文本…',

		// 分享/通过代码导入
		shareCode: '代码',
		importCode: '导入代码',
		importPrompt: '在此处粘贴 TheWord 分享代码：',
		importError: '无效代码。',
		importSuccess: '列表导入成功 ✅',
		shareCodeCopied: '代码已复制到剪贴板 ✅',

		// 从文本直接导入
		importTextButton: '文本 → 列表',
		importTextTitlePlaceholder: '新列表标题',
		importTextDefaultTitle: '文本导入',
		importTextBodyPlaceholder: '在此处粘贴您的文本…',
		importTextNoBody: '请粘贴一些要导入的文本。',
		importTextNoBlock:
			'未检测到块（如果要分成块，请添加空行）。',
		importTextSplitLabel:
			'分成块（至少由一个空行分隔）',
		importTextInfo: '每个块将成为列表中的一个项目。',
		importTextCreate: '创建列表',

		duplicateTitle: '已存在同名列表。',
		confirmDeleteList: '删除此列表？',
		emptyList: '空列表。',

		importFromTextTitle: '从文本导入',
		documentContent: '文档内容',
		renameList: '重命名',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: '创建学习',
		placeholder: '学习标题…',
		empty: '暂无学习。',
		items: '项目',
		backAll: '← 所有学习',
		addTextBlock: '添加文本块',
		editTextBlock: '编辑块',
		deleteItem: '删除',
		moveUp: '上移',
		moveDown: '下移',
		open: '打开',
		openReading: '打开阅读',
		confirmDeleteItem: '删除此项目？',
		newTextPlaceholder: '您的文本…',

		// 分享/通过代码导入
		shareCode: '代码',
		importCode: '导入代码',
		importPrompt: '在此处粘贴 TheWord 分享代码 (笔记或学习)：',
		importError: '无效代码。',
		importSuccess: '学习导入成功 ✅',
		shareCodeCopied: '代码已复制到剪贴板 ✅',

		// 从文本直接导入
		importTextButton: '文本 → 学习',
		importTextTitlePlaceholder: '新学习标题',
		importTextDefaultTitle: '文本导入',
		importTextBodyPlaceholder: '在此处粘贴您的文本…',
		importTextNoBody: '请粘贴一些要导入的文本。',
		importTextNoBlock:
			'未检测到块（如果要分成块，请添加空行）。',
		importTextSplitLabel:
			'分成块（至少由一个空行分隔）',
		importTextInfo: '每个块将成为学习中的一个项目。',
		importTextCreate: '创建学习',

		duplicateTitle: '已存在同名学习。',
		confirmDeleteList: '删除此学习？',
		emptyList: '空学习。',

		importFromTextTitle: '从文本导入',
		documentContent: '文档内容',
		renameList: '重命名',
		share: '分享',
		copy: '复制',
		deleteList: '删除',

		// 原生分享的标题
		shareStudyTitle: '学习',
		shareItemTitle: '经文',
	},

	// Settings page
	appearance: '外观',
	lightMode: '浅色模式',
	darkMode: '深色模式',
	fontSize: '字体大小',
	language: '语言',
	french: '法语',
	english: '英语',
	fontSizeXLLabel: '低视力模式 (XL)',
	fontSizePreview: '所选字体大小预览。',
	updates: '更新',
	updatesDescription:
		'检查是否有新版本可用并应用。',
	applyUpdate: '应用更新',
	checkUpdatesButton: '检查更新',
	updatesChecking: '正在检查…',
	updatesUpToDate: '您的应用是最新的。',
	updatesReady: '新版本已准备就绪。点击“应用更新”。',
	updatesUnavailable:
		'自动更新不可用（未检测到 Service Worker）。',
	updatesError: '检查时出错。请重试。',

	// About page
	aboutTitle: '',
	aboutDescription:
		'The Word 允许您通过随机经文和完整的圣经阅读来发现上帝的话语。',
	aboutIntro:
		'TheWord：离线阅读圣经、即时搜索、主题笔记、一键分享。您也可以在网页上使用 TheWord：www.theword.fr',
	bibleVersions: '圣经版本',
	frenchVersion:
		'法语：Louis Segond 1910 (LSG) - 2025 更新 - 公有领域',
	englishVersion: '英语：King James Version (KJV) - 公有领域',
	frenchVersionDetails:
		'法语圣经的参考版本，由 Louis Segond 于 1910 年翻译，并于 2025 年更新（词汇/语法现代化，忠实于手稿）。',
	englishVersionDetails:
		'经典英语版本 (KJV)，1611 年出版，1769 年修订，2025 年有限更新。',
	otherLanguagesNote:
		'更多语言（德语、西班牙语、葡萄牙语、印地语、阿拉伯语等）正在逐步添加中。如果缺少界面翻译，应用默认使用英语。',
	randomFeature: '随机功能',
	randomFeatureDesc:
		'我们的随机经文生成器从 31,000 多节圣经经文中选择，为您提供每日灵感。',
	musicLink: '创造者的音乐',
	versesLabel: '经文',
	booksLabel: '书卷',
	readingShortcuts: '阅读快捷方式',
	notesIntro:
		'将您最喜欢的段落和个人想法组织到主题列表中。',
	notesPoint1: '添加经文或自由文本块。',
	notesPoint2:
		'点击一个项目以打开其菜单（在阅读中打开、上移/下移、删除…）。',
	notesPoint3: '重命名列表、复制/分享。',
	createdWithLove: '用心创造，传播上帝的话语',
	versionsFootnote:
		'所有使用的圣经版本均属公有领域。其中一些已部分现代化（词汇、语法），同时仍严格忠实于原始手稿。',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'这 4 个按钮位于书卷/章节选择器右侧，可让您立即返回常读经文，以便并行阅读多卷书：使用 1/2/3 用于 3 个不同的位置，使用放大镜图标恢复上次经文（随机经文或搜索）。',
	quickSlotsIllustrationLabel: '快捷方式插图',
	quickSlotLastPassageTooltip: '上次经文',
	quickSlot1ActiveTooltip: '快捷方式 1 (活动)',
	quickSlot2Tooltip: '快捷方式 2',
	quickSlot3Tooltip: '快捷方式 3',

	// Common
	loading: '正在加载…',
	error: '加载内容时出错',
};

// Arabe (Arabic) - ar
const arTranslations: typeof frTranslations = {
	// Navigation (Note: Arabic is Right-to-Left, but strings are written left-to-right here)
	home: 'الرئيسية',
	reading: 'القراءة',
	search: 'البحث',
	settings: 'الإعدادات',
	about: 'حول',
	notes: 'الملاحظات',
	principles: 'المبادئ',

	// Home page
	randomVerse: 'آية عشوائية',
	newVerse: 'آية جديدة',
	copyVerse: 'نسخ الآية',
	verseCopied: 'تم نسخ الآية!',
	godSpeaks: 'الله يتحدث إليك',
	openJeremiah: 'افتح إرميا 23:29',
	jeremiah23Quote:
		'«أَلَيْسَتْ كَلِمَتِي هَكَذَا كَالنَّارِ، يَقُولُ الرَّبُّ، وَكَمِطْرَقَةٍ تُحَطِّمُ الصَّخْرَ؟» إرميا 23:29',

	// Reading page
	selectBook: 'اختر كتابًا',
	selectChapter: 'اختر فصلاً',
	chapter: 'الفصل',
	oldTestament: 'العهد القديم',
	newTestament: 'العهد الجديد',

	// Reading – extras
	chooseBook: 'اختر كتابًا',
	chooseChapter: 'اختر فصلاً',
	prevChapter: 'الفصل السابق',
	nextChapter: 'الفصل التالي',
	verseWord: 'آية',
	versesSelectedSuffix: 'آية/آيات محددة',
	toNotes: 'إلى الملاحظات',
	toPrinciples: 'إلى المبادئ',
	copyLabel: 'نسخ',
	shareLabel: 'مشاركة',
	cancel: 'إلغاء',
	close: 'إغلاق',
	notesModalTitle: 'إضافة إلى قائمة (ملاحظات)',
	notesNoList: 'لا توجد قائمة بعد. أنشئ واحدة أدناه.',
	notesNewListOptional: 'قائمة جديدة (اختياري)',
	principlesModalTitle: 'إضافة إلى دراسة (مبادئ)',
	principlesNoList: 'لا توجد دراسة بعد. أنشئ واحدة أدناه.',
	principlesNewListOptional: 'دراسة جديدة (اختياري)',
	selectionCopied: 'تم نسخ التحديد',
	textReadyToShare: 'النص جاهز للمشاركة (تم نسخه)',
	addedToList: 'تمت الإضافة إلى القائمة',
	newRandom: 'عشوائي جديد',
	swipeLabel: 'اسحب',
	searchSlotLabel: 'بحث',
	searchSlotEmpty: 'بحث (فارغ)',
	memorySlotLabel: 'فتحة',
	emptySlotSuffix: '(فارغ)',
	untitledList: '(بدون عنوان)',

	// Short label “Copied”
	copiedShort: 'تم النسخ',

	// *** Search page ***
	searchTitle: 'البحث في الكتاب المقدس',
	searchPlaceholder: 'اكتب بحثك',
	searchMinChars: 'اكتب حرفين على الأقل للبحث.',
	searchSearching: 'جارٍ البحث…',
	searchResults: 'النتائج',
	searchExpandAll: 'توسيع الكل',
	searchCollapseAll: 'طي الكل',
	searchNoResults: 'لم يتم العثور على آيات.',
	searchClear: 'مسح',
	searchOpenInReading: 'افتح في القراءة',

	// Notes page block
	notesPage: {
		create: 'إنشاء قائمة',
		placeholder: 'عنوان القائمة…',
		empty: 'لا توجد قوائم بعد.',
		items: 'عناصر',
		backAll: '← جميع القوائم',
		addTextBlock: 'إضافة كتلة نصية',
		editTextBlock: 'تحرير الكتلة',
		deleteItem: 'حذف',
		moveUp: 'نقل لأعلى',
		moveDown: 'نقل لأسفل',
		open: 'فتح',
		confirmDeleteItem: 'حذف هذا العنصر؟',
		newTextPlaceholder: 'نصك…',

		// مشاركة / استيراد عبر رمز
		shareCode: 'رمز',
		importCode: 'استيراد رمز',
		importPrompt: 'الصق رمز مشاركة TheWord هنا:',
		importError: 'رمز غير صالح.',
		importSuccess: 'تم استيراد القائمة بنجاح ✅',
		shareCodeCopied: 'تم نسخ الرمز إلى الحافظة ✅',

		// استيراد مباشر من النص
		importTextButton: 'نص ← قائمة',
		importTextTitlePlaceholder: 'عنوان القائمة الجديدة',
		importTextDefaultTitle: 'استيراد نص',
		importTextBodyPlaceholder: 'الصق نصك هنا…',
		importTextNoBody: 'الرجاء لصق بعض النص للاستيراد.',
		importTextNoBlock:
			'لم يتم الكشف عن كتلة (أضف أسطرًا فارغة إذا كنت تريد التقسيم إلى كتل).',
		importTextSplitLabel:
			'التقسيم إلى كتل (مفصولة بسطر فارغ واحد على الأقل)',
		importTextInfo: 'ستصبح كل كتلة عنصرًا في القائمة.',
		importTextCreate: 'إنشاء قائمة',

		duplicateTitle: 'قائمة بنفس العنوان موجودة بالفعل.',
		confirmDeleteList: 'حذف هذه القائمة؟',
		emptyList: 'قائمة فارغة.',

		importFromTextTitle: 'استيراد من النص',
		documentContent: 'محتوى المستند',
		renameList: 'إعادة تسمية',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: 'إنشاء دراسة',
		placeholder: 'عنوان الدراسة…',
		empty: 'لا توجد دراسات بعد.',
		items: 'عناصر',
		backAll: '← جميع الدراسات',
		addTextBlock: 'إضافة كتلة نصية',
		editTextBlock: 'تحرير الكتلة',
		deleteItem: 'حذف',
		moveUp: 'نقل لأعلى',
		moveDown: 'نقل لأسفل',
		open: 'فتح',
		openReading: 'افتح القراءة',
		confirmDeleteItem: 'حذف هذا العنصر؟',
		newTextPlaceholder: 'نصك…',

		// مشاركة / استيراد عبر رمز
		shareCode: 'رمز',
		importCode: 'استيراد رمز',
		importPrompt: 'الصق رمز مشاركة TheWord (ملاحظة أو دراسة) هنا:',
		importError: 'رمز غير صالح.',
		importSuccess: 'تم استيراد الدراسة بنجاح ✅',
		shareCodeCopied: 'تم نسخ الرمز إلى الحافظة ✅',

		// استيراد مباشر من النص
		importTextButton: 'نص ← دراسة',
		importTextTitlePlaceholder: 'عنوان الدراسة الجديدة',
		importTextDefaultTitle: 'استيراد نص',
		importTextBodyPlaceholder: 'الصق نصك هنا…',
		importTextNoBody: 'الرجاء لصق بعض النص للاستيراد.',
		importTextNoBlock:
			'لم يتم الكشف عن كتلة (أضف أسطرًا فارغة إذا كنت تريد التقسيم إلى كتل).',
		importTextSplitLabel:
			'التقسيم إلى كتل (مفصولة بسطر فارغ واحد على الأقل)',
		importTextInfo: 'ستصبح كل كتلة عنصرًا في الدراسة.',
		importTextCreate: 'إنشاء دراسة',

		duplicateTitle: 'دراسة بنفس العنوان موجودة بالفعل.',
		confirmDeleteList: 'حذف هذه الدراسة؟',
		emptyList: 'دراسة فارغة.',

		importFromTextTitle: 'استيراد من النص',
		documentContent: 'محتوى المستند',
		renameList: 'إعادة تسمية',
		share: 'مشاركة',
		copy: 'نسخ',
		deleteList: 'حذف',

		// عناوين للمشاركة الأصلية
		shareStudyTitle: 'دراسة',
		shareItemTitle: 'آية',
	},

	// Settings page
	appearance: 'المظهر',
	lightMode: 'الوضع الفاتح',
	darkMode: 'الوضع الداكن',
	fontSize: 'حجم الخط',
	language: 'اللغة',
	french: 'الفرنسية',
	english: 'الإنجليزية',
	fontSizeXLLabel: 'وضع ضعف البصر (XL)',
	fontSizePreview: 'معاينة حجم الخط المحدد.',
	updates: 'التحديثات',
	updatesDescription: 'تحقق مما إذا كان هناك إصدار جديد متاح وقم بتطبيقه.',
	applyUpdate: 'تطبيق التحديث',
	checkUpdatesButton: 'التحقق من التحديثات',
	updatesChecking: 'جارٍ التحقق…',
	updatesUpToDate: 'تطبيقك محدث.',
	updatesReady:
		'الإصدار الجديد جاهز. انقر على «تطبيق التحديث».',
	updatesUnavailable:
		'التحديث التلقائي غير متاح (لم يتم الكشف عن عامل الخدمة).',
	updatesError: 'خطأ أثناء التحقق. الرجاء المحاولة مرة أخرى.',

	// About page
	aboutTitle: '',
	aboutDescription:
		'يسمح لك The Word باكتشاف كلمة الله من خلال آيات عشوائية وقراءة الكتاب المقدس كاملة.',
	aboutIntro:
		'TheWord: قراءة الكتاب المقدس دون اتصال، بحث فوري، ملاحظات موضوعية، مشاركة بنقرة واحدة. يمكنك أيضًا استخدام TheWord على الويب: www.theword.fr',
	bibleVersions: 'إصدارات الكتاب المقدس',
	frenchVersion:
		'الفرنسية: Louis Segond 1910 (LSG) - تحديث 2025 - ملكية عامة',
	englishVersion: 'الإنجليزية: King James Version (KJV) - ملكية عامة',
	frenchVersionDetails:
		'الإصدار المرجعي للكتاب المقدس بالفرنسية، ترجمه لويس سيغوند عام 1910 وتم تحديثه عام 2025 (تحديث المفردات/القواعد، وفية للمخطوطات).',
	englishVersionDetails:
		'الإصدار الإنجليزي الكلاسيكي (KJV)، نُشر عام 1611، وتمت مراجعته عام 1769، وتحديث محدود في 2025.',
	otherLanguagesNote:
		'تتم إضافة المزيد من اللغات (الألمانية، الإسبانية، البرتغالية، الهندية، الصينية، إلخ) تدريجيًا. عندما تكون ترجمة الواجهة مفقودة، يعود التطبيق إلى اللغة الإنجليزية افتراضيًا.',
	randomFeature: 'ميزة عشوائية',
	randomFeatureDesc:
		'يختار مولد الآيات العشوائي لدينا من بين أكثر من 31,000 آية كتابية ليوفر لك إلهامًا يوميًا.',
	musicLink: 'موسيقى الخالق',
	versesLabel: 'آيات',
	booksLabel: 'كتب',
	readingShortcuts: 'اختصارات القراءة',
	notesIntro:
		'نظّم مقاطعك المفضلة وأفكارك الشخصية في قوائم موضوعية.',
	notesPoint1: 'أضف آيات أو كتل نصية حرة.',
	notesPoint2:
		'انقر فوق عنصر لفتح قائمته (افتح في القراءة، نقل لأعلى/لأسفل، حذف…).',
	notesPoint3: 'أعد تسمية القوائم، وانسخ/شارك.',
	createdWithLove: 'صنع بحب لنشر كلمة الله',
	versionsFootnote:
		'جميع إصدارات الكتاب المقدس المستخدمة هي ملكية عامة. تم تحديث بعضها جزئيًا (المفردات، القواعد) مع بقائها وفية للمخطوطات الأصلية.',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'تتيح لك هذه الأزرار الأربعة، المحاذية ليمين محدد الكتاب/الفصل، العودة فورًا إلى قراءاتك المتكررة لمتابعة عدة كتب بالتوازي: استخدم 1/2/3 لثلاثة مواقع متميزة، والمكبر لاستئناف المقطع الأخير (آية عشوائية أو بحث).',
	quickSlotsIllustrationLabel: 'توضيح للاختصارات',
	quickSlotLastPassageTooltip: 'المقطع الأخير',
	quickSlot1ActiveTooltip: 'الاختصار 1 (نشط)',
	quickSlot2Tooltip: 'الاختصار 2',
	quickSlot3Tooltip: 'الاختصار 3',

	// Common
	loading: 'جارٍ التحميل…',
	error: 'خطأ في تحميل المحتوى',
};

// Swahili - sw
const swTranslations: typeof frTranslations = {
	// Navigation
	home: 'Nyumbani',
	reading: 'Kusoma',
	search: 'Tafuta',
	settings: 'Mipangilio',
	about: 'Kuhusu',
	notes: 'Vidokezo',
	principles: 'Kanuni',

	// Home page
	randomVerse: 'Aya ya Nasibu',
	newVerse: 'Aya Mpya',
	copyVerse: 'Nakili Aya',
	verseCopied: 'Aya imenakiliwa!',
	godSpeaks: 'Mungu anazungumza nawe',
	openJeremiah: 'Fungua Yeremia 23:29',
	jeremiah23Quote:
		'“Je, neno langu si kama moto? asema Bwana; na kama nyundo ipasuliayo jabali vipande vipande?” Yeremia 23:29',

	// Reading page
	selectBook: 'Chagua kitabu',
	selectChapter: 'Chagua sura',
	chapter: 'Sura',
	oldTestament: 'Agano la Kale',
	newTestament: 'Agano Jipya',

	// Reading – extras
	chooseBook: 'Chagua kitabu',
	chooseChapter: 'Chagua sura',
	prevChapter: 'Sura Iliyopita',
	nextChapter: 'Sura Ifuatayo',
	verseWord: 'aya',
	versesSelectedSuffix: 'aya zilizochaguliwa',
	toNotes: 'Kwa Vidokezo',
	toPrinciples: 'Kwa Kanuni',
	copyLabel: 'Nakili',
	shareLabel: 'Shiriki',
	cancel: 'Ghairi',
	close: 'Funga',
	notesModalTitle: 'Ongeza kwenye orodha (Vidokezo)',
	notesNoList: 'Bado hakuna orodha. Unda moja hapa chini.',
	notesNewListOptional: 'Orodha mpya (si lazima)',
	principlesModalTitle: 'Ongeza kwenye utafiti (Kanuni)',
	principlesNoList: 'Bado hakuna utafiti. Unda moja hapa chini.',
	principlesNewListOptional: 'Utafiti mpya (si lazima)',
	selectionCopied: 'Uchaguzi umenakiliwa',
	textReadyToShare: 'Nakala tayari kushiriki (imenakiliwa)',
	addedToList: 'Imeongezwa kwenye orodha',
	newRandom: 'Mpya ya nasibu',
	swipeLabel: 'Telezesha',
	searchSlotLabel: 'Tafuta',
	searchSlotEmpty: 'Tafuta (tupu)',
	memorySlotLabel: 'Slot',
	emptySlotSuffix: '(tupu)',
	untitledList: '(bila kichwa)',

	// Short label “Copied”
	copiedShort: 'Imenakiliwa',

	// *** Search page ***
	searchTitle: 'Utafutaji wa Biblia',
	searchPlaceholder: 'Andika utafutaji wako',
	searchMinChars: 'Andika angalau herufi 2 kutafuta.',
	searchSearching: 'Inatafuta…',
	searchResults: 'Matokeo',
	searchExpandAll: 'Fungua zote',
	searchCollapseAll: 'Funga zote',
	searchNoResults: 'Hakuna aya zilizopatikana.',
	searchClear: 'Futa',
	searchOpenInReading: 'Fungua katika Kusoma',

	// Notes page block
	notesPage: {
		create: 'Unda orodha',
		placeholder: 'Kichwa cha orodha…',
		empty: 'Bado hakuna orodha.',
		items: 'vitu',
		backAll: '← Orodha zote',
		addTextBlock: 'Ongeza kizuizi cha maandishi',
		editTextBlock: 'Hariri kizuizi',
		deleteItem: 'Futa',
		moveUp: 'Sogeza juu',
		moveDown: 'Sogeza chini',
		open: 'Fungua',
		confirmDeleteItem: 'Futa kitu hiki?',
		newTextPlaceholder: 'Nakala yako…',

		// Shiriki / ingiza kupitia msimbo
		shareCode: 'Msimbo',
		importCode: 'Ingiza msimbo',
		importPrompt: 'Bandika msimbo wa kushiriki wa TheWord hapa:',
		importError: 'Msimbo batili.',
		importSuccess: 'Orodha imeingizwa kwa mafanikio ✅',
		shareCodeCopied: 'Msimbo umenakiliwa kwenye clipboard ✅',

		// Ingizo la moja kwa moja kutoka kwa maandishi
		importTextButton: 'Nakala → Orodha',
		importTextTitlePlaceholder: 'Kichwa cha orodha mpya',
		importTextDefaultTitle: 'Ingizo la maandishi',
		importTextBodyPlaceholder: 'Bandika nakala yako hapa…',
		importTextNoBody: 'Tafadhali bandika maandishi ya kuingiza.',
		importTextNoBlock:
			'Hakuna kizuizi kilichogunduliwa (ongeza mistari tupu ikiwa unataka kugawanya katika vizuizi).',
		importTextSplitLabel:
			'Gawanya katika vizuizi (vilivyotenganishwa na angalau mstari mmoja tupu)',
		importTextInfo: 'Kila kizuizi kitakuwa kitu kwenye orodha.',
		importTextCreate: 'Unda orodha',

		duplicateTitle: 'Orodha yenye kichwa hicho hicho tayari ipo.',
		confirmDeleteList: 'Futa orodha hii?',
		emptyList: 'Orodha tupu.',

		importFromTextTitle: 'Ingiza kutoka kwa maandishi',
		documentContent: 'Yaliyomo kwenye hati',
		renameList: 'Badilisha jina',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: 'Unda utafiti',
		placeholder: 'Kichwa cha utafiti…',
		empty: 'Bado hakuna utafiti.',
		items: 'vitu',
		backAll: '← Tafiti zote',
		addTextBlock: 'Ongeza kizuizi cha maandishi',
		editTextBlock: 'Hariri kizuizi',
		deleteItem: 'Futa',
		moveUp: 'Sogeza juu',
		moveDown: 'Sogeza chini',
		open: 'Fungua',
		openReading: 'Fungua Kusoma',
		confirmDeleteItem: 'Futa kitu hiki?',
		newTextPlaceholder: 'Nakala yako…',

		// Shiriki / ingiza kupitia msimbo
		shareCode: 'Msimbo',
		importCode: 'Ingiza msimbo',
		importPrompt: 'Bandika msimbo wa kushiriki wa TheWord (kidokezo au utafiti) hapa:',
		importError: 'Msimbo batili.',
		importSuccess: 'Utafiti umeingizwa kwa mafanikio ✅',
		shareCodeCopied: 'Msimbo umenakiliwa kwenye clipboard ✅',

		// Ingizo la moja kwa moja kutoka kwa maandishi
		importTextButton: 'Nakala → Utafiti',
		importTextTitlePlaceholder: 'Kichwa cha utafiti mpya',
		importTextDefaultTitle: 'Ingizo la maandishi',
		importTextBodyPlaceholder: 'Bandika nakala yako hapa…',
		importTextNoBody: 'Tafadhali bandika maandishi ya kuingiza.',
		importTextNoBlock:
			'Hakuna kizuizi kilichogunduliwa (ongeza mistari tupu ikiwa unataka kugawanya katika vizuizi).',
		importTextSplitLabel:
			'Gawanya katika vizuizi (vilivyotenganishwa na angalau mstari mmoja tupu)',
		importTextInfo: 'Kila kizuizi kitakuwa kitu kwenye utafiti.',
		importTextCreate: 'Unda utafiti',

		duplicateTitle: 'Utafiti wenye kichwa hicho hicho tayari upo.',
		confirmDeleteList: 'Futa utafiti huu?',
		emptyList: 'Utafiti tupu.',

		importFromTextTitle: 'Ingiza kutoka kwa maandishi',
		documentContent: 'Yaliyomo kwenye hati',
		renameList: 'Badilisha jina',
		share: 'Shiriki',
		copy: 'Nakili',
		deleteList: 'Futa',

		// Vyeo vya kushiriki asili
		shareStudyTitle: 'Utafiti',
		shareItemTitle: 'Aya',
	},

	// Settings page
	appearance: 'Mwonekano',
	lightMode: 'Hali ya Mwangaza',
	darkMode: 'Hali ya Giza',
	fontSize: 'Ukubwa wa Fonti',
	language: 'Lugha',
	french: 'Kifaransa',
	english: 'Kiingereza',
	fontSizeXLLabel: 'Hali ya Kuona Chini (XL)',
	fontSizePreview: 'Onyesho la kukagua ukubwa wa fonti iliyochaguliwa.',
	updates: 'Sasisho',
	updatesDescription:
		'Angalia kama toleo jipya linapatikana na uliweke.',
	applyUpdate: 'Weka sasisho',
	checkUpdatesButton: 'Angalia sasisho',
	updatesChecking: 'Inaangalia…',
	updatesUpToDate: 'Programu yako imesasishwa.',
	updatesReady:
		'Toleo jipya liko tayari. Bofya "Weka sasisho".',
	updatesUnavailable:
		'Sasisho otomatiki halipatikani (Hakuna Service Worker).',
	updatesError: 'Hitilafu wakati wa kuangalia. Tafadhali jaribu tena.',

	// About page
	aboutTitle: '',
	aboutDescription:
		'The Word hukuruhusu kugundua neno la Mungu kupitia aya za nasibu na usomaji kamili wa Biblia.',
	aboutIntro:
		'TheWord: Kusoma Biblia nje ya mtandao, utafutaji wa papo hapo, vidokezo vya mada, kushiriki kwa kugusa mara moja. Unaweza pia kutumia TheWord kwenye wavuti: www.theword.fr',
	bibleVersions: 'Matoleo ya Biblia',
	frenchVersion:
		'Kifaransa: Louis Segond 1910 (LSG) - Refresh 2025 - Miliki ya Umma',
	englishVersion: 'Kiingereza: King James Version (KJV) - Miliki ya Umma',
	frenchVersionDetails:
		'Toleo la rejea la Biblia ya Kifaransa, iliyotafsiriwa na Louis Segond mnamo 1910 na kuburudishwa mnamo 2025 (msamiati/sarufi ya kisasa, mwaminifu kwa hati za kale).',
	englishVersionDetails:
		'Toleo la Kiingereza la zamani (KJV), lililochapishwa mnamo 1611, lililorekebishwa mnamo 1769, na kuburudishwa kidogo mnamo 2025.',
	otherLanguagesNote:
		'Lugha zaidi (Kijerumani, Kihispania, Kireno, Kihindi, Kichina, Kiarabu, n.k.) zinaongezwa hatua kwa hatua. Wakati tafsiri ya kiolesura inakosekana, programu inarejea kwa Kiingereza kama chaguo-msingi.',
	randomFeature: 'Kipengele cha Nasibu',
	randomFeatureDesc:
		'Jenereta yetu ya aya za nasibu huchagua kutoka zaidi ya aya 31,000 za Biblia ili kukupa msukumo wa kila siku.',
	musicLink: 'Muziki wa Muumba',
	versesLabel: 'Aya',
	booksLabel: 'Vitabu',
	readingShortcuts: 'Njia za mkato za kusoma',
	notesIntro:
		'Panga vifungu unavyopenda na mawazo ya kibinafsi katika orodha za mada.',
	notesPoint1: 'Ongeza aya au vizuizi vya maandishi huru.',
	notesPoint2:
		'Gusa kitu kufungua menyu yake (Fungua katika Kusoma, Sogeza juu/chini, Futa…).',
	notesPoint3: 'Badilisha majina ya orodha, nakili/shiriki.',
	createdWithLove: 'Imeundwa kwa upendo kueneza Neno la Mungu',
	versionsFootnote:
		'Matoleo yote ya Biblia yaliyotumiwa ni ya miliki ya umma. Baadhi yamefanywa ya kisasa (msamiati, sarufi) huku yakibaki mwaminifu kwa hati za asili.',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'Vifungo hivi 4, vilivyolingana kulia kwa kiteuzi cha Kitabu/Sura, hukuruhusu kurudi mara moja kwenye usomaji wako wa mara kwa mara ili kufuata vitabu kadhaa kwa sambamba: tumia 1/2/3 kwa maeneo matatu tofauti, na kikuza kuendelea na kifungu cha mwisho (aya ya nasibu au utafutaji).',
	quickSlotsIllustrationLabel: 'Mchoro wa njia za mkato',
	quickSlotLastPassageTooltip: 'Kifungu cha mwisho',
	quickSlot1ActiveTooltip: 'Njia ya mkato 1 (amilifu)',
	quickSlot2Tooltip: 'Njia ya mkato 2',
	quickSlot3Tooltip: 'Njia ya mkato 3',

	// Common
	loading: 'Inapakia…',
	error: 'Hitilafu wakati wa kupakia maudhui',
};

// Italien (Italian) - it
const itTranslations: typeof frTranslations = {
	// Navigation
	home: 'Home',
	reading: 'Lettura',
	search: 'Ricerca',
	settings: 'Impostazioni',
	about: 'Informazioni',
	notes: 'Note',
	principles: 'Principi',

	// Home page
	randomVerse: 'Versetto Casuale',
	newVerse: 'Nuovo Versetto',
	copyVerse: 'Copia Versetto',
	verseCopied: 'Versetto copiato!',
	godSpeaks: 'Dio ti parla',
	openJeremiah: 'Apri Geremia 23:29',
	jeremiah23Quote:
		'«La mia parola non è come un fuoco, dice l’Eterno, e come un martello che spacca la roccia?» Geremia 23:29',

	// Reading page
	selectBook: 'Seleziona un libro',
	selectChapter: 'Seleziona un capitolo',
	chapter: 'Capitolo',
	oldTestament: 'Antico Testamento',
	newTestament: 'Nuovo Testamento',

	// Reading – extras
	chooseBook: 'Scegli un libro',
	chooseChapter: 'Scegli un capitolo',
	prevChapter: 'Capitolo precedente',
	nextChapter: 'Capitolo successivo',
	verseWord: 'versetto',
	versesSelectedSuffix: 'versetto/i selezionato/i',
	toNotes: 'Alle Note',
	toPrinciples: 'Ai Principi',
	copyLabel: 'Copia',
	shareLabel: 'Condividi',
	cancel: 'Annulla',
	close: 'Chiudi',
	notesModalTitle: 'Aggiungi a una lista (Note)',
	notesNoList: 'Nessuna lista ancora. Creane una qui sotto.',
	notesNewListOptional: 'Nuova lista (opzionale)',
	principlesModalTitle: 'Aggiungi a uno studio (Principi)',
	principlesNoList: 'Nessuno studio ancora. Creane uno qui sotto.',
	principlesNewListOptional: 'Nuovo studio (opzionale)',
	selectionCopied: 'Selezione copiata',
	textReadyToShare: 'Testo pronto per la condivisione (copiato)',
	addedToList: 'Aggiunto alla lista',
	newRandom: 'Nuovo casuale',
	swipeLabel: 'Scorri',
	searchSlotLabel: 'Ricerca',
	searchSlotEmpty: 'Ricerca (vuota)',
	memorySlotLabel: 'Slot',
	emptySlotSuffix: '(vuoto)',
	untitledList: '(senza titolo)',

	// Short label “Copied”
	copiedShort: 'Copiato',

	// *** Search page ***
	searchTitle: 'Ricerca biblica',
	searchPlaceholder: 'Digita la tua ricerca',
	searchMinChars: 'Digita almeno 2 caratteri per la ricerca.',
	searchSearching: 'Ricerca in corso…',
	searchResults: 'Risultati',
	searchExpandAll: 'Espandi tutto',
	searchCollapseAll: 'Riduci tutto',
	searchNoResults: 'Nessun versetto trovato.',
	searchClear: 'Cancella',
	searchOpenInReading: 'Apri in Lettura',

	// Notes page block
	notesPage: {
		create: 'Crea lista',
		placeholder: 'Titolo lista…',
		empty: 'Nessuna lista ancora.',
		items: 'elementi',
		backAll: '← Tutte le liste',
		addTextBlock: 'Aggiungi blocco di testo',
		editTextBlock: 'Modifica blocco',
		deleteItem: 'Elimina',
		moveUp: 'Sposta su',
		moveDown: 'Sposta giù',
		open: 'Apri',
		confirmDeleteItem: 'Eliminare questo elemento?',
		newTextPlaceholder: 'Il tuo testo…',

		// Condividi / importa tramite codice
		shareCode: 'Codice',
		importCode: 'Importa codice',
		importPrompt: 'Incolla qui il codice di condivisione TheWord:',
		importError: 'Codice non valido.',
		importSuccess: 'Lista importata con successo ✅',
		shareCodeCopied: 'Codice copiato negli appunti ✅',

		// Importazione diretta da testo
		importTextButton: 'Testo → Lista',
		importTextTitlePlaceholder: 'Titolo nuova lista',
		importTextDefaultTitle: 'Importazione testo',
		importTextBodyPlaceholder: 'Incolla qui il tuo testo…',
		importTextNoBody: 'Per favore, incolla un testo da importare.',
		importTextNoBlock:
			'Nessun blocco rilevato (aggiungi righe vuote se vuoi dividere in blocchi).',
		importTextSplitLabel:
			'Dividi in blocchi (separati da almeno una riga vuota)',
		importTextInfo: 'Ogni blocco diventerà un elemento nella lista.',
		importTextCreate: 'Crea lista',

		duplicateTitle: 'Esiste già una lista con lo stesso titolo.',
		confirmDeleteList: 'Eliminare questa lista?',
		emptyList: 'Lista vuota.',

		importFromTextTitle: 'Importa da testo',
		documentContent: 'Contenuto del documento',
		renameList: 'Rinomina',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: 'Crea studio',
		placeholder: 'Titolo studio…',
		empty: 'Nessuno studio ancora.',
		items: 'elementi',
		backAll: '← Tutti gli studi',
		addTextBlock: 'Aggiungi blocco di testo',
		editTextBlock: 'Modifica blocco',
		deleteItem: 'Elimina',
		moveUp: 'Sposta su',
		moveDown: 'Sposta giù',
		open: 'Apri',
		openReading: 'Apri Lettura',
		confirmDeleteItem: 'Eliminare questo elemento?',
		newTextPlaceholder: 'Il tuo testo…',

		// Condividi / importa tramite codice
		shareCode: 'Codice',
		importCode: 'Importa codice',
		importPrompt: 'Incolla qui il codice di condivisione TheWord (nota o studio):',
		importError: 'Codice non valido.',
		importSuccess: 'Studio importato con successo ✅',
		shareCodeCopied: 'Codice copiato negli appunti ✅',

		// Importazione diretta da testo
		importTextButton: 'Testo → Studio',
		importTextTitlePlaceholder: 'Titolo nuovo studio',
		importTextDefaultTitle: 'Importazione testo',
		importTextBodyPlaceholder: 'Incolla qui il tuo testo…',
		importTextNoBody: 'Per favore, incolla un testo da importare.',
		importTextNoBlock:
			'Nessun blocco rilevato (aggiungi righe vuote se vuoi dividere in blocchi).',
		importTextSplitLabel:
			'Dividi in blocchi (separati da almeno una riga vuota)',
		importTextInfo: 'Ogni blocco diventerà un elemento nello studio.',
		importTextCreate: 'Crea studio',

		duplicateTitle: 'Esiste già uno studio con lo stesso titolo.',
		confirmDeleteList: 'Eliminare questo studio?',
		emptyList: 'Studio vuoto.',

		importFromTextTitle: 'Importa da testo',
		documentContent: 'Contenuto del documento',
		renameList: 'Rinomina',
		share: 'Condividi',
		copy: 'Copia',
		deleteList: 'Elimina',

		// Titoli per la condivisione nativa
		shareStudyTitle: 'Studio',
		shareItemTitle: 'Versetto',
	},

	// Settings page
	appearance: 'Aspetto',
	lightMode: 'Modalità Chiara',
	darkMode: 'Modalità Scura',
	fontSize: 'Dimensione Carattere',
	language: 'Lingua',
	french: 'Francese',
	english: 'Inglese',
	fontSizeXLLabel: 'Modalità Ipovedenti (XL)',
	fontSizePreview: 'Anteprima della dimensione del carattere selezionata.',
	updates: 'Aggiornamenti',
	updatesDescription:
		'Controlla se è disponibile una nuova versione dell’app e applicala.',
	applyUpdate: 'Applica aggiornamento',
	checkUpdatesButton: 'Verifica aggiornamenti',
	updatesChecking: 'Verifica in corso…',
	updatesUpToDate: 'La tua app è aggiornata.',
	updatesReady:
		'Nuova versione pronta. Clicca su “Applica aggiornamento”.',
	updatesUnavailable:
		'Aggiornamento automatico non disponibile (Service Worker non rilevato).',
	updatesError: 'Errore durante la verifica. Riprova.',

	// About page
	aboutTitle: '',
	aboutDescription:
		'The Word ti permette di scoprire la parola di Dio attraverso versetti casuali e la lettura completa della Bibbia.',
	aboutIntro:
		'TheWord: Lettura Bibbia offline, ricerca istantanea, note tematiche, condivisione one-tap. Puoi anche usare TheWord sul web: www.theword.fr',
	bibleVersions: 'Versioni della Bibbia',
	frenchVersion:
		'Francese: Louis Segond 1910 (LSG) - Refresh 2025 - Pubblico Dominio',
	englishVersion: 'Inglese: King James Version (KJV) - Pubblico Dominio',
	frenchVersionDetails:
		'Versione di riferimento della Bibbia in francese, tradotta da Louis Segond nel 1910 e aggiornata nel 2025 (modernizzazione del vocabolario/grammatica, fedele ai manoscritti).',
	englishVersionDetails:
		'Versione classica in inglese (KJV), pubblicata nel 1611, rivista nel 1769 e aggiornamento limitato nel 2025.',
	otherLanguagesNote:
		'Altre lingue (Tedesco, Spagnolo, Portoghese, Hindi, Cinese, Arabo, ecc.) vengono aggiunte progressivamente. Se manca una traduzione dell’interfaccia, l’app torna all’inglese per impostazione predefinita.',
	randomFeature: 'Funzionalità Casuale',
	randomFeatureDesc:
		'Il nostro generatore di versetti casuali seleziona tra oltre 31.000 versetti biblici per offrirti ispirazione quotidiana.',
	musicLink: 'Musica del Creatore',
	versesLabel: 'Versetto',
	booksLabel: 'Libri',
	readingShortcuts: 'Scorciatoie di lettura',
	notesIntro:
		'Organizza i tuoi passaggi preferiti e i pensieri personali in liste tematiche.',
	notesPoint1: 'Aggiungi versetti o blocchi di testo libero.',
	notesPoint2:
		'Tocca un elemento per aprire il suo menu (Apri in Lettura, Sposta su/giù, Elimina…).',
	notesPoint3: 'Rinomina le tue liste, copia/condividi.',
	createdWithLove: 'Creato con amore per diffondere la Parola di Dio',
	versionsFootnote:
		'Tutte le versioni bibliche utilizzate sono di pubblico dominio. Alcune sono state parzialmente modernizzate (vocabolario, grammatica) pur rimanendo strettamente fedeli ai manoscritti originali.',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'Questi 4 pulsanti, allineati a destra del selettore Libro/Capitolo, ti consentono di tornare istantaneamente alle tue letture frequenti per seguire più libri in parallelo: usa 1/2/3 per 3 posizioni distinte e la lente d’ingrandimento per riprendere l’ultimo passaggio (versetto casuale o ricerca).',
	quickSlotsIllustrationLabel: 'Illustrazione delle scorciatoie',
	quickSlotLastPassageTooltip: 'Ultimo passaggio',
	quickSlot1ActiveTooltip: 'Scorciatoia 1 (attiva)',
	quickSlot2Tooltip: 'Scorciatoia 2',
	quickSlot3Tooltip: 'Scorciatoia 3',

	// Common
	loading: 'Caricamento…',
	error: 'Errore durante il caricamento del contenuto',
};

// Indonésien (Indonesian) - id
const idTranslations: typeof frTranslations = {
	// Navigation
	home: 'Beranda',
	reading: 'Membaca',
	search: 'Cari',
	settings: 'Pengaturan',
	about: 'Tentang',
	notes: 'Catatan',
	principles: 'Prinsip',

	// Home page
	randomVerse: 'Ayat Acak',
	newVerse: 'Ayat Baru',
	copyVerse: 'Salin Ayat',
	verseCopied: 'Ayat disalin!',
	godSpeaks: 'Tuhan berbicara kepada Anda',
	openJeremiah: 'Buka Yeremia 23:29',
	jeremiah23Quote:
		'“Bukankah firman-Ku seperti api, demikianlah firman TUHAN, dan seperti palu yang memecahkan bukit batu?” Yeremia 23:29',

	// Reading page
	selectBook: 'Pilih kitab',
	selectChapter: 'Pilih pasal',
	chapter: 'Pasal',
	oldTestament: 'Perjanjian Lama',
	newTestament: 'Perjanjian Baru',

	// Reading – extras
	chooseBook: 'Pilih kitab',
	chooseChapter: 'Pilih pasal',
	prevChapter: 'Pasal Sebelumnya',
	nextChapter: 'Pasal Berikutnya',
	verseWord: 'ayat',
	versesSelectedSuffix: 'ayat terpilih',
	toNotes: 'Ke Catatan',
	toPrinciples: 'Ke Prinsip',
	copyLabel: 'Salin',
	shareLabel: 'Bagikan',
	cancel: 'Batal',
	close: 'Tutup',
	notesModalTitle: 'Tambahkan ke daftar (Catatan)',
	notesNoList: 'Belum ada daftar. Buat satu di bawah.',
	notesNewListOptional: 'Daftar baru (opsional)',
	principlesModalTitle: 'Tambahkan ke studi (Prinsip)',
	principlesNoList: 'Belum ada studi. Buat satu di bawah.',
	principlesNewListOptional: 'Studi baru (opsional)',
	selectionCopied: 'Pilihan disalin',
	textReadyToShare: 'Teks siap dibagikan (disalin)',
	addedToList: 'Ditambahkan ke daftar',
	newRandom: 'Acak baru',
	swipeLabel: 'Geser',
	searchSlotLabel: 'Cari',
	searchSlotEmpty: 'Cari (kosong)',
	memorySlotLabel: 'Slot',
	emptySlotSuffix: '(kosong)',
	untitledList: '(tanpa judul)',

	// Short label “Copied”
	copiedShort: 'Disalin',

	// *** Search page ***
	searchTitle: 'Pencarian Alkitab',
	searchPlaceholder: 'Ketik pencarian Anda',
	searchMinChars: 'Ketik setidaknya 2 karakter untuk mencari.',
	searchSearching: 'Mencari…',
	searchResults: 'Hasil',
	searchExpandAll: 'Perluas semua',
	searchCollapseAll: 'Ciutkan semua',
	searchNoResults: 'Tidak ada ayat yang ditemukan.',
	searchClear: 'Bersihkan',
	searchOpenInReading: 'Buka di Membaca',

	// Notes page block
	notesPage: {
		create: 'Buat daftar',
		placeholder: 'Judul daftar…',
		empty: 'Belum ada daftar.',
		items: 'item',
		backAll: '← Semua daftar',
		addTextBlock: 'Tambahkan blok teks',
		editTextBlock: 'Edit blok',
		deleteItem: 'Hapus',
		moveUp: 'Pindah ke atas',
		moveDown: 'Pindah ke bawah',
		open: 'Buka',
		confirmDeleteItem: 'Hapus item ini?',
		newTextPlaceholder: 'Teks Anda…',

		// Bagikan / impor melalui kode
		shareCode: 'Kode',
		importCode: 'Impor kode',
		importPrompt: 'Tempel kode berbagi TheWord di sini:',
		importError: 'Kode tidak valid.',
		importSuccess: 'Daftar berhasil diimpor ✅',
		shareCodeCopied: 'Kode disalin ke papan klip ✅',

		// Impor langsung dari teks
		importTextButton: 'Teks → Daftar',
		importTextTitlePlaceholder: 'Judul daftar baru',
		importTextDefaultTitle: 'Impor teks',
		importTextBodyPlaceholder: 'Tempel teks Anda di sini…',
		importTextNoBody: 'Harap tempel beberapa teks untuk diimpor.',
		importTextNoBlock:
			'Tidak ada blok yang terdeteksi (tambahkan baris kosong jika Anda ingin membagi menjadi blok).',
		importTextSplitLabel:
			'Bagi menjadi blok (dipisahkan oleh setidaknya satu baris kosong)',
		importTextInfo: 'Setiap blok akan menjadi item dalam daftar.',
		importTextCreate: 'Buat daftar',

		duplicateTitle: 'Daftar dengan judul yang sama sudah ada.',
		confirmDeleteList: 'Hapus daftar ini?',
		emptyList: 'Daftar kosong.',

		importFromTextTitle: 'Impor dari teks',
		documentContent: 'Konten dokumen',
		renameList: 'Ganti nama',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: 'Buat studi',
		placeholder: 'Judul studi…',
		empty: 'Belum ada studi.',
		items: 'item',
		backAll: '← Semua studi',
		addTextBlock: 'Tambahkan blok teks',
		editTextBlock: 'Edit blok',
		deleteItem: 'Hapus',
		moveUp: 'Pindah ke atas',
		moveDown: 'Pindah ke bawah',
		open: 'Buka',
		openReading: 'Buka Membaca',
		confirmDeleteItem: 'Hapus item ini?',
		newTextPlaceholder: 'Teks Anda…',

		// Bagikan / impor melalui kode
		shareCode: 'Kode',
		importCode: 'Impor kode',
		importPrompt: 'Tempel kode berbagi TheWord (catatan atau studi) di sini:',
		importError: 'Kode tidak valid.',
		importSuccess: 'Studi berhasil diimpor ✅',
		shareCodeCopied: 'Kode disalin ke papan klip ✅',

		// Impor langsung dari teks
		importTextButton: 'Teks → Studi',
		importTextTitlePlaceholder: 'Judul studi baru',
		importTextDefaultTitle: 'Impor teks',
		importTextBodyPlaceholder: 'Tempel teks Anda di sini…',
		importTextNoBody: 'Harap tempel beberapa teks untuk diimpor.',
		importTextNoBlock:
			'Tidak ada blok yang terdeteksi (tambahkan baris kosong jika Anda membagi menjadi blok).',
		importTextSplitLabel:
			'Bagi menjadi blok (dipisahkan oleh setidaknya satu baris kosong)',
		importTextInfo: 'Setiap blok akan menjadi item dalam studi.',
		importTextCreate: 'Buat studi',

		duplicateTitle: 'Studi dengan judul yang sama sudah ada.',
		confirmDeleteList: 'Hapus studi ini?',
		emptyList: 'Studi kosong.',

		importFromTextTitle: 'Impor dari teks',
		documentContent: 'Konten dokumen',
		renameList: 'Ganti nama',
		share: 'Bagikan',
		copy: 'Salin',
		deleteList: 'Hapus',

		// Judul untuk berbagi native
		shareStudyTitle: 'Studi',
		shareItemTitle: 'Ayat',
	},

	// Settings page
	appearance: 'Penampilan',
	lightMode: 'Mode Terang',
	darkMode: 'Mode Gelap',
	fontSize: 'Ukuran Font',
	language: 'Bahasa',
	french: 'Prancis',
	english: 'Inggris',
	fontSizeXLLabel: 'Mode Penglihatan Rendah (XL)',
	fontSizePreview: 'Pratinjau ukuran font yang dipilih.',
	updates: 'Pembaruan',
	updatesDescription:
		'Periksa apakah ada versi baru yang tersedia dan terapkan.',
	applyUpdate: 'Terapkan pembaruan',
	checkUpdatesButton: 'Periksa pembaruan',
	updatesChecking: 'Memeriksa…',
	updatesUpToDate: 'Aplikasi Anda sudah diperbarui.',
	updatesReady:
		'Versi baru siap. Klik “Terapkan pembaruan”.',
	updatesUnavailable:
		'Pembaruan otomatis tidak tersedia (Tidak ada Service Worker).',
	updatesError: 'Kesalahan saat memeriksa. Silakan coba lagi.',

	// About page
	aboutTitle: '',
	aboutDescription:
		'The Word memungkinkan Anda menemukan firman Tuhan melalui ayat-ayat acak dan pembacaan Alkitab lengkap.',
	aboutIntro:
		'TheWord: Pembacaan Alkitab offline, pencarian instan, catatan tematik, berbagi satu ketukan. Anda juga dapat menggunakan TheWord di web: www.theword.fr',
	bibleVersions: 'Versi Alkitab',
	frenchVersion:
		'Prancis: Louis Segond 1910 (LSG) - Penyegaran 2025 - Domain Publik',
	englishVersion: 'Inggris: King James Version (KJV) - Domain Publik',
	frenchVersionDetails:
		'Versi referensi Alkitab Prancis, diterjemahkan oleh Louis Segond pada tahun 1910 dan disegarkan pada tahun 2025 (kosakata/tata bahasa yang dimodernisasi, setia pada manuskrip).',
	englishVersionDetails:
		'Versi klasik Inggris (KJV), diterbitkan pada tahun 1611, direvisi pada tahun 1769, dengan penyegaran terbatas 2025.',
	otherLanguagesNote:
		'Lebih banyak bahasa (Jerman, Spanyol, Portugis, Hindi, Cina, Arab, dll.) sedang ditambahkan secara bertahap. Ketika terjemahan antarmuka hilang, aplikasi kembali ke bahasa Inggris secara default.',
	randomFeature: 'Fitur Acak',
	randomFeatureDesc:
		'Generator ayat acak kami memilih dari lebih dari 31.000 ayat Alkitab untuk memberi Anda inspirasi harian.',
	musicLink: 'Musik Sang Pencipta',
	versesLabel: 'Ayat',
	booksLabel: 'Kitab',
	readingShortcuts: 'Jalan pintas membaca',
	notesIntro:
		'Atur bagian favorit dan pemikiran pribadi Anda ke dalam daftar tematik.',
	notesPoint1: 'Tambahkan ayat atau blok teks bebas.',
	notesPoint2:
		'Ketuk item untuk membuka menunya (Buka di Membaca, Pindah ke atas/bawah, Hapus…).',
	notesPoint3: 'Ganti nama daftar, salin/bagikan.',
	createdWithLove: 'Dibuat dengan cinta untuk menyebarkan Firman Tuhan',
	versionsFootnote:
		'Semua versi Alkitab yang digunakan berada dalam domain publik. Beberapa telah dimodernisasi sebagian (kosakata, tata bahasa) sambil tetap setia pada manuskrip asli.',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'Ke-4 tombol ini, sejajar di sebelah kanan pemilih Kitab/Pasal, memungkinkan Anda untuk langsung kembali ke bacaan yang sering Anda baca untuk mengikuti beberapa kitab secara paralel: gunakan 1/2/3 untuk 3 lokasi berbeda, dan kaca pembesar untuk melanjutkan bagian terakhir (ayat acak atau pencarian).',
	quickSlotsIllustrationLabel: 'Ilustrasi jalan pintas',
	quickSlotLastPassageTooltip: 'Bagian terakhir',
	quickSlot1ActiveTooltip: 'Jalan pintas 1 (aktif)',
	quickSlot2Tooltip: 'Jalan pintas 2',
	quickSlot3Tooltip: 'Jalan pintas 3',

	// Common
	loading: 'Memuat…',
	error: 'Kesalahan memuat konten',
};

// Turc (Turkish) - tr
const trTranslations: typeof frTranslations = {
	// Navigation
	home: 'Ana Sayfa',
	reading: 'Okuma',
	search: 'Arama',
	settings: 'Ayarlar',
	about: 'Hakkında',
	notes: 'Notlar',
	principles: 'İlkeler',

	// Home page
	randomVerse: 'Rastgele Ayet',
	newVerse: 'Yeni Ayet',
	copyVerse: 'Ayeti Kopyala',
	verseCopied: 'Ayet kopyalandı!',
	godSpeaks: 'Tanrı sizinle konuşur',
	openJeremiah: 'Yeremya 23:29’u aç',
	jeremiah23Quote:
		'“RAB diyor ki, sözüm ateş gibi değil midir? Ve kayayı parçalayan bir çekiç gibi değil midir?” Yeremya 23:29',

	// Reading page
	selectBook: 'Bir kitap seçin',
	selectChapter: 'Bir bölüm seçin',
	chapter: 'Bölüm',
	oldTestament: 'Eski Antlaşma',
	newTestament: 'Yeni Antlaşma',

	// Reading – extras
	chooseBook: 'Bir kitap seçin',
	chooseChapter: 'Bir bölüm seçin',
	prevChapter: 'Önceki Bölüm',
	nextChapter: 'Sonraki Bölüm',
	verseWord: 'ayet',
	versesSelectedSuffix: 'ayet seçildi',
	toNotes: 'Notlara Git',
	toPrinciples: 'İlkelere Git',
	copyLabel: 'Kopyala',
	shareLabel: 'Paylaş',
	cancel: 'İptal',
	close: 'Kapat',
	notesModalTitle: 'Bir listeye ekle (Notlar)',
	notesNoList: 'Henüz liste yok. Aşağıda bir tane oluşturun.',
	notesNewListOptional: 'Yeni liste (isteğe bağlı)',
	principlesModalTitle: 'Bir çalışmaya ekle (İlkeler)',
	principlesNoList: 'Henüz çalışma yok. Aşağıda bir tane oluşturun.',
	principlesNewListOptional: 'Yeni çalışma (isteğe bağlı)',
	selectionCopied: 'Seçim kopyalandı',
	textReadyToShare: 'Paylaşılmaya hazır metin (kopyalandı)',
	addedToList: 'Listeye eklendi',
	newRandom: 'Yeni rastgele',
	swipeLabel: 'Kaydırın',
	searchSlotLabel: 'Arama',
	searchSlotEmpty: 'Arama (boş)',
	memorySlotLabel: 'Slot',
	emptySlotSuffix: '(boş)',
	untitledList: '(başlıksız)',

	// Short label “Copied”
	copiedShort: 'Kopyalandı',

	// *** Search page ***
	searchTitle: 'İncil Araması',
	searchPlaceholder: 'Aramanızı yazın',
	searchMinChars: 'Aramak için en az 2 karakter yazın.',
	searchSearching: 'Aranıyor…',
	searchResults: 'Sonuçlar',
	searchExpandAll: 'Tümünü Genişlet',
	searchCollapseAll: 'Tümünü Daralt',
	searchNoResults: 'Ayet bulunamadı.',
	searchClear: 'Temizle',
	searchOpenInReading: 'Okuma\'da Aç',

	// Notes page block
	notesPage: {
		create: 'Liste Oluştur',
		placeholder: 'Liste başlığı…',
		empty: 'Henüz liste yok.',
		items: 'öğe',
		backAll: '← Tüm listeler',
		addTextBlock: 'Metin bloğu ekle',
		editTextBlock: 'Bloğu düzenle',
		deleteItem: 'Sil',
		moveUp: 'Yukarı Taşı',
		moveDown: 'Aşağı Taşı',
		open: 'Aç',
		confirmDeleteItem: 'Bu öğeyi sil?',
		newTextPlaceholder: 'Metniniz…',

		// Paylaş / kod ile içe aktar
		shareCode: 'Kod',
		importCode: 'Kod İçe Aktar',
		importPrompt: 'TheWord paylaşım kodunu buraya yapıştırın:',
		importError: 'Geçersiz kod.',
		importSuccess: 'Liste başarıyla içe aktarıldı ✅',
		shareCodeCopied: 'Kod panoya kopyalandı ✅',

		// Metinden doğrudan içe aktarma
		importTextButton: 'Metin → Liste',
		importTextTitlePlaceholder: 'Yeni liste başlığı',
		importTextDefaultTitle: 'Metin içe aktarma',
		importTextBodyPlaceholder: 'Metninizi buraya yapıştırın…',
		importTextNoBody: 'Lütfen içe aktarmak için bir metin yapıştırın.',
		importTextNoBlock:
			'Blok algılanmadı (bloklara ayırmak istiyorsanız boş satırlar ekleyin).',
		importTextSplitLabel:
			'Bloklara ayır (en az bir boş satırla ayrılmış)',
		importTextInfo: 'Her blok listede bir öğe olacaktır.',
		importTextCreate: 'Liste Oluştur',

		duplicateTitle: 'Aynı başlıklı bir liste zaten var.',
		confirmDeleteList: 'Bu listeyi sil?',
		emptyList: 'Boş liste.',

		importFromTextTitle: 'Metinden içe aktar',
		documentContent: 'Belge içeriği',
		renameList: 'Yeniden adlandır',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: 'Çalışma Oluştur',
		placeholder: 'Çalışma başlığı…',
		empty: 'Henüz çalışma yok.',
		items: 'öğe',
		backAll: '← Tüm çalışmalar',
		addTextBlock: 'Metin bloğu ekle',
		editTextBlock: 'Bloğu düzenle',
		deleteItem: 'Sil',
		moveUp: 'Yukarı Taşı',
		moveDown: 'Aşağı Taşı',
		open: 'Aç',
		openReading: 'Okuma\'yı Aç',
		confirmDeleteItem: 'Bu öğeyi sil?',
		newTextPlaceholder: 'Metniniz…',

		// Paylaş / kod ile içe aktar
		shareCode: 'Kod',
		importCode: 'Kod İçe Aktar',
		importPrompt: 'TheWord paylaşım kodunu (not veya çalışma) buraya yapıştırın:',
		importError: 'Geçersiz kod.',
		importSuccess: 'Çalışma başarıyla içe aktarıldı ✅',
		shareCodeCopied: 'Kod panoya kopyalandı ✅',

		// Metinden doğrudan içe aktarma
		importTextButton: 'Metin → Çalışma',
		importTextTitlePlaceholder: 'Yeni çalışma başlığı',
		importTextDefaultTitle: 'Metin içe aktarma',
		importTextBodyPlaceholder: 'Metninizi buraya yapıştırın…',
		importTextNoBody: 'Lütfen içe aktarmak için bir metin yapıştırın.',
		importTextNoBlock:
			'Blok algılanmadı (bloklara ayırmak istiyorsanız boş satırlar ekleyin).',
		importTextSplitLabel:
			'Bloklara ayır (en az bir boş satırla ayrılmış)',
		importTextInfo: 'Her blok çalışmada bir öğe olacaktır.',
		importTextCreate: 'Çalışma Oluştur',

		duplicateTitle: 'Aynı başlıklı bir çalışma zaten var.',
		confirmDeleteList: 'Bu çalışmayı sil?',
		emptyList: 'Boş çalışma.',

		importFromTextTitle: 'Metinden içe aktar',
		documentContent: 'Belge içeriği',
		renameList: 'Yeniden adlandır',
		share: 'Paylaş',
		copy: 'Kopyala',
		deleteList: 'Sil',

		// Yerel paylaşım için başlıklar
		shareStudyTitle: 'Çalışma',
		shareItemTitle: 'Ayet',
	},

	// Settings page
	appearance: 'Görünüm',
	lightMode: 'Aydınlık Mod',
	darkMode: 'Karanlık Mod',
	fontSize: 'Yazı Tipi Boyutu',
	language: 'Dil',
	french: 'Fransızca',
	english: 'İngilizce',
	fontSizeXLLabel: 'Az Gören Modu (XL)',
	fontSizePreview: 'Seçilen yazı tipi boyutunun önizlemesi.',
	updates: 'Güncellemeler',
	updatesDescription:
		'Yeni bir sürümün mevcut olup olmadığını kontrol edin ve uygulayın.',
	applyUpdate: 'Güncellemeyi Uygula',
	checkUpdatesButton: 'Güncellemeleri Kontrol Et',
	updatesChecking: 'Kontrol ediliyor…',
	updatesUpToDate: 'Uygulamanız güncel.',
	updatesReady:
		'Yeni sürüm hazır. “Güncellemeyi Uygula”ya tıklayın.',
	updatesUnavailable:
		'Otomatik güncelleme mevcut değil (Service Worker algılanmadı).',
	updatesError: 'Kontrol sırasında hata oluştu. Lütfen tekrar deneyin.',

	// About page
	aboutTitle: '',
	aboutDescription:
		'The Word, rastgele ayetler ve tam İncil okuması aracılığıyla Tanrı sözünü keşfetmenizi sağlar.',
	aboutIntro:
		'TheWord: Çevrimdışı İncil okuma, anlık arama, tematik notlar, tek dokunuşla paylaşım. TheWord\'ü web\'de de bulabilirsiniz: www.theword.fr',
	bibleVersions: 'İncil Versiyonları',
	frenchVersion:
		'Fransızca: Louis Segond 1910 (LSG) - Yenileme 2025 - Kamu Malı',
	englishVersion: 'İngilizce: King James Version (KJV) - Kamu Malı',
	frenchVersionDetails:
		'Fransızca İncil\'in referans versiyonu, 1910\'da Louis Segond tarafından çevrildi ve 2025\'te yenilendi (modernleştirilmiş kelime dağarcığı/dilbilgisi, el yazmalarına sadık).',
	englishVersionDetails:
		'Klasik İngilizce versiyonu (KJV), 1611\'de yayınlandı, 1769\'da revize edildi ve 2025\'te sınırlı yenileme yapıldı.',
	otherLanguagesNote:
		'Daha fazla dil (Almanca, İspanyolca, Portekizce, Hintçe, Çince, Arapça vb.) aşamalı olarak eklenmektedir. Bir arayüz çevirisi eksik olduğunda, uygulama varsayılan olarak İngilizceye döner.',
	randomFeature: 'Rastgele Özellik',
	randomFeatureDesc:
		'Rastgele ayet oluşturucumuz, size günlük ilham sağlamak için 31.000\'den fazla İncil ayeti arasından seçim yapar.',
	musicLink: 'Yaratıcının Müziği',
	versesLabel: 'Ayetler',
	booksLabel: 'Kitaplar',
	readingShortcuts: 'Okuma kısayolları',
	notesIntro:
		'Favori pasajlarınızı ve kişisel düşüncelerinizi tematik listelerde düzenleyin.',
	notesPoint1: 'Ayetler veya serbest metin blokları ekleyin.',
	notesPoint2:
		'Menüsünü açmak için bir öğeye dokunun (Okuma\'da Aç, Yukarı/Aşağı Taşı, Sil…).',
	notesPoint3: 'Listelerinizi yeniden adlandırın, kopyalayın/paylaşın.',
	createdWithLove: 'Tanrı Sözünü yaymak için sevgiyle yaratıldı',
	versionsFootnote:
		'Kullanılan tüm İncil versiyonları kamu malıdır. Bazıları kısmen modernize edilmiş (kelime dağarcığı, dilbilgisi) olsa da, orijinal el yazmalarına kesinlikle sadık kalmıştır.',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'Kitap/Bölüm seçicinin sağında hizalanmış bu 4 düğme, birkaç kitabı paralel olarak takip etmek için sık okumalarınıza anında geri dönmenizi sağlar: 3 farklı konum için 1/2/3\'ü kullanın ve son pasajı (rastgele ayet veya arama) sürdürmek için büyüteci kullanın.',
	quickSlotsIllustrationLabel: 'Kısayolların çizimi',
	quickSlotLastPassageTooltip: 'Son pasaj',
	quickSlot1ActiveTooltip: 'Kısayol 1 (aktif)',
	quickSlot2Tooltip: 'Kısayol 2',
	quickSlot3Tooltip: 'Kısayol 3',

	// Common
	loading: 'Yükleniyor…',
	error: 'İçerik yüklenirken hata oluştu',
};

// Japonais (Japanese) - ja
const jaTranslations: typeof frTranslations = {
	// Navigation
	home: 'ホーム',
	reading: '読む',
	search: '検索',
	settings: '設定',
	about: 'について',
	notes: 'ノート',
	principles: '原則',

	// Home page
	randomVerse: 'ランダムな聖句',
	newVerse: '新しい聖句',
	copyVerse: '聖句をコピー',
	verseCopied: '聖句がコピーされました!',
	godSpeaks: '神はあなたに語りかけます',
	openJeremiah: 'エレミヤ書 23:29 を開く',
	jeremiah23Quote:
		'“主の言葉ではないか。わたしの言葉は火のようではないか。岩を打ち砕く槌のようではないか。” エレミヤ書 23:29',

	// Reading page
	selectBook: '書物を選ぶ',
	selectChapter: '章を選ぶ',
	chapter: '章',
	oldTestament: '旧約聖書',
	newTestament: '新約聖書',

	// Reading – extras
	chooseBook: '書物を選ぶ',
	chooseChapter: '章を選ぶ',
	prevChapter: '前の章',
	nextChapter: '次の章',
	verseWord: '節',
	versesSelectedSuffix: '節が選択されました',
	toNotes: 'ノートへ',
	toPrinciples: '原則へ',
	copyLabel: 'コピー',
	shareLabel: '共有',
	cancel: 'キャンセル',
	close: '閉じる',
	notesModalTitle: 'リストに追加 (ノート)',
	notesNoList: 'まだリストがありません。下に作成してください。',
	notesNewListOptional: '新しいリスト (オプション)',
	principlesModalTitle: 'スタディに追加 (原則)',
	principlesNoList: 'まだスタディがありません。下に作成してください。',
	principlesNewListOptional: '新しいスタディ (オプション)',
	selectionCopied: '選択をコピーしました',
	textReadyToShare: '共有準備完了のテキスト (コピー済み)',
	addedToList: 'リストに追加されました',
	newRandom: '新しいランダム',
	swipeLabel: 'スワイプ',
	searchSlotLabel: '検索',
	searchSlotEmpty: '検索 (空)',
	memorySlotLabel: 'スロット',
	emptySlotSuffix: '(空)',
	untitledList: '(無題)',

	// Short label “Copied”
	copiedShort: 'コピー済み',

	// *** Search page ***
	searchTitle: '聖書検索',
	searchPlaceholder: '検索内容を入力',
	searchMinChars: '検索するには、少なくとも2文字を入力してください。',
	searchSearching: '検索中…',
	searchResults: '結果',
	searchExpandAll: 'すべて展開',
	searchCollapseAll: 'すべて折りたたむ',
	searchNoResults: '聖句は見つかりませんでした。',
	searchClear: 'クリア',
	searchOpenInReading: '読むで開く',

	// Notes page block
	notesPage: {
		create: 'リストを作成',
		placeholder: 'リストのタイトル…',
		empty: 'まだリストがありません。',
		items: '項目',
		backAll: '← すべてのリスト',
		addTextBlock: 'テキストブロックを追加',
		editTextBlock: 'ブロックを編集',
		deleteItem: '削除',
		moveUp: '上に移動',
		moveDown: '下に移動',
		open: '開く',
		confirmDeleteItem: 'この項目を削除しますか？',
		newTextPlaceholder: 'あなたのテキスト…',

		// 共有/コードによるインポート
		shareCode: 'コード',
		importCode: 'コードをインポート',
		importPrompt: 'TheWord 共有コードをここに貼り付けてください:',
		importError: '無効なコード。',
		importSuccess: 'リストが正常にインポートされました ✅',
		shareCodeCopied: 'コードがクリップボードにコピーされました ✅',

		// テキストからの直接インポート
		importTextButton: 'テキスト → リスト',
		importTextTitlePlaceholder: '新しいリストのタイトル',
		importTextDefaultTitle: 'テキストインポート',
		importTextBodyPlaceholder: 'あなたのテキストをここに貼り付けてください…',
		importTextNoBody: 'インポートするテキストを貼り付けてください。',
		importTextNoBlock:
			'ブロックが検出されませんでした (ブロックに分割したい場合は空行を追加してください)。',
		importTextSplitLabel:
			'ブロックに分割 (少なくとも1つの空行で区切る)',
		importTextInfo: '各ブロックはリスト内の項目になります。',
		importTextCreate: 'リストを作成',

		duplicateTitle: '同じタイトルのリストが既に存在します。',
		confirmDeleteList: 'このリストを削除しますか？',
		emptyList: '空のリスト。',

		importFromTextTitle: 'テキストからインポート',
		documentContent: 'ドキュメントの内容',
		renameList: '名前を変更',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: 'スタディを作成',
		placeholder: 'スタディのタイトル…',
		empty: 'まだスタディがありません。',
		items: '項目',
		backAll: '← すべてのスタディ',
		addTextBlock: 'テキストブロックを追加',
		editTextBlock: 'ブロックを編集',
		deleteItem: '削除',
		moveUp: '上に移動',
		moveDown: '下に移動',
		open: '開く',
		openReading: '読むを開く',
		confirmDeleteItem: 'この項目を削除しますか？',
		newTextPlaceholder: 'あなたのテキスト…',

		// 共有/コードによるインポート
		shareCode: 'コード',
		importCode: 'コードをインポート',
		importPrompt: 'TheWord 共有コード (ノートまたはスタディ) をここに貼り付けてください:',
		importError: '無効なコード。',
		importSuccess: 'スタディが正常にインポートされました ✅',
		shareCodeCopied: 'コードがクリップボードにコピーされました ✅',

		// テキストからの直接インポート
		importTextButton: 'テキスト → スタディ',
		importTextTitlePlaceholder: '新しいスタディのタイトル',
		importTextDefaultTitle: 'テキストインポート',
		importTextBodyPlaceholder: 'あなたのテキストをここに貼り付けてください…',
		importTextNoBody: 'インポートするテキストを貼り付けてください。',
		importTextNoBlock:
			'ブロックが検出されませんでした (ブロックに分割したい場合は空行を追加してください)。',
		importTextSplitLabel:
			'ブロックに分割 (少なくとも1つの空行で区切る)',
		importTextInfo: '各ブロックはスタディ内の項目になります。',
		importTextCreate: 'スタディを作成',

		duplicateTitle: '同じタイトルのスタディが既に存在します。',
		confirmDeleteList: 'このスタディを削除しますか？',
		emptyList: '空のスタディ。',

		importFromTextTitle: 'テキストからインポート',
		documentContent: 'ドキュメントの内容',
		renameList: '名前を変更',
		share: '共有',
		copy: 'コピー',
		deleteList: '削除',

		// ネイティブ共有のタイトル
		shareStudyTitle: 'スタディ',
		shareItemTitle: '聖句',
	},

	// Settings page
	appearance: '外観',
	lightMode: 'ライトモード',
	darkMode: 'ダークモード',
	fontSize: 'フォントサイズ',
	language: '言語',
	french: 'フランス語',
	english: '英語',
	fontSizeXLLabel: 'ロービジョンモード (XL)',
	fontSizePreview: '選択したフォントサイズのプレビュー。',
	updates: '更新',
	updatesDescription:
		'新しいバージョンが利用可能かどうかを確認し、適用します。',
	applyUpdate: '更新を適用',
	checkUpdatesButton: '更新を確認',
	updatesChecking: '確認中…',
	updatesUpToDate: 'アプリは最新です。',
	updatesReady: '新しいバージョンが準備できました。「更新を適用」をクリックしてください。',
	updatesUnavailable:
		'自動更新は利用できません (Service Workerが検出されませんでした)。',
	updatesError: '確認中にエラーが発生しました。もう一度お試しください。',

	// About page
	aboutTitle: '',
	aboutDescription:
		'The Word は、ランダムな聖句と完全な聖書朗読を通じて、神の言葉を発見することができます。',
	aboutIntro:
		'TheWord：オフライン聖書朗読、インスタント検索、テーマ別ノート、ワンタップ共有。Webでも TheWord をご利用いただけます: www.theword.fr',
	bibleVersions: '聖書バージョン',
	frenchVersion:
		'フランス語: Louis Segond 1910 (LSG) - 2025年リフレッシュ - パブリックドメイン',
	englishVersion: '英語: King James Version (KJV) - パブリックドメイン',
	frenchVersionDetails:
		'フランス語聖書の参照バージョンで、1910年に Louis Segond によって翻訳され、2025年にリフレッシュされました (語彙/文法の現代化、写本に忠実)。',
	englishVersionDetails:
		'古典的な英語版 (KJV)、1611年に出版、1769年に改訂され、2025年に限定的なリフレッシュが行われました。',
	otherLanguagesNote:
		'その他の言語 (ドイツ語、スペイン語、ポルトガル語、ヒンディー語、中国語、アラビア語など) は順次追加されています。インターフェースの翻訳がない場合、アプリはデフォルトで英語を使用します。',
	randomFeature: 'ランダム機能',
	randomFeatureDesc:
		'当社のランダム聖句ジェネレーターは、31,000を超える聖書箇所から選択し、日々のインスピレーションを提供します。',
	musicLink: '創造主の音楽',
	versesLabel: '聖句',
	booksLabel: '書物',
	readingShortcuts: '読書のショートカット',
	notesIntro:
		'お気に入りの箇所や個人的な考えをテーマ別のリストに整理します。',
	notesPoint1: '聖句または自由なテキストブロックを追加します。',
	notesPoint2:
		'項目をタップしてメニューを開きます (読むで開く、上/下に移動、削除…)。',
	notesPoint3: 'リストの名前を変更したり、コピー/共有したりできます。',
	createdWithLove: '神の言葉を広めるために愛を込めて作成されました',
	versionsFootnote:
		'使用されているすべての聖書バージョンはパブリックドメインです。一部は部分的に現代化されていますが (語彙、文法)、元の写本に厳密に忠実であり続けています。',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'書物/章セレクターの右側に並んだこれら4つのボタンを使用すると、頻繁に読む箇所にすぐに戻り、複数の書物を並行して追うことができます。1/2/3 を使用して3つの異なる位置を設定し、虫眼鏡アイコンを使用して最後の箇所 (ランダムな聖句または検索) を再開します。',
	quickSlotsIllustrationLabel: 'ショートカットの図',
	quickSlotLastPassageTooltip: '最後の箇所',
	quickSlot1ActiveTooltip: 'ショートカット 1 (アクティブ)',
	quickSlot2Tooltip: 'ショートカット 2',
	quickSlot3Tooltip: 'ショートカット 3',

	// Common
	loading: '読み込み中…',
	error: 'コンテンツの読み込みエラー',
};

// Coréen (Korean) - ko
const koTranslations: typeof frTranslations = {
	// Navigation
	home: '홈',
	reading: '읽기',
	search: '검색',
	settings: '설정',
	about: '소개',
	notes: '노트',
	principles: '원칙',

	// Home page
	randomVerse: '랜덤 구절',
	newVerse: '새 구절',
	copyVerse: '구절 복사',
	verseCopied: '구절이 복사되었습니다!',
	godSpeaks: '하나님이 당신에게 말씀하십니다',
	openJeremiah: '예레미야 23:29 열기',
	jeremiah23Quote:
		'“나 여호와가 말하노라 내 말이 불 같지 아니하냐 바위를 쳐서 부스러뜨리는 방망이 같지 아니하냐” 예레미야 23:29',

	// Reading page
	selectBook: '책을 선택하세요',
	selectChapter: '장을 선택하세요',
	chapter: '장',
	oldTestament: '구약성서',
	newTestament: '신약성서',

	// Reading – extras
	chooseBook: '책을 선택하세요',
	chooseChapter: '장을 선택하세요',
	prevChapter: '이전 장',
	nextChapter: '다음 장',
	verseWord: '절',
	versesSelectedSuffix: '절 선택됨',
	toNotes: '노트로',
	toPrinciples: '원칙으로',
	copyLabel: '복사',
	shareLabel: '공유',
	cancel: '취소',
	close: '닫기',
	notesModalTitle: '목록에 추가 (노트)',
	notesNoList: '아직 목록이 없습니다. 아래에 하나를 만드세요.',
	notesNewListOptional: '새 목록 (선택 사항)',
	principlesModalTitle: '연구에 추가 (원칙)',
	principlesNoList: '아직 연구가 없습니다. 아래에 하나를 만드세요.',
	principlesNewListOptional: '새 연구 (선택 사항)',
	selectionCopied: '선택 복사됨',
	textReadyToShare: '공유 준비 완료 텍스트 (복사됨)',
	addedToList: '목록에 추가됨',
	newRandom: '새 랜덤',
	swipeLabel: '스와이프',
	searchSlotLabel: '검색',
	searchSlotEmpty: '검색 (비어 있음)',
	memorySlotLabel: '슬롯',
	emptySlotSuffix: '(비어 있음)',
	untitledList: '(제목 없음)',

	// Short label “Copied”
	copiedShort: '복사됨',

	// *** Search page ***
	searchTitle: '성경 검색',
	searchPlaceholder: '검색 내용을 입력하세요',
	searchMinChars: '검색하려면 최소 2자를 입력하세요.',
	searchSearching: '검색 중…',
	searchResults: '결과',
	searchExpandAll: '모두 확장',
	searchCollapseAll: '모두 접기',
	searchNoResults: '구절을 찾을 수 없습니다.',
	searchClear: '지우기',
	searchOpenInReading: '읽기에서 열기',

	// Notes page block
	notesPage: {
		create: '목록 만들기',
		placeholder: '목록 제목…',
		empty: '아직 목록이 없습니다.',
		items: '항목',
		backAll: '← 모든 목록',
		addTextBlock: '텍스트 블록 추가',
		editTextBlock: '블록 편집',
		deleteItem: '삭제',
		moveUp: '위로 이동',
		moveDown: '아래로 이동',
		open: '열기',
		confirmDeleteItem: '이 항목을 삭제하시겠습니까?',
		newTextPlaceholder: '당신의 텍스트…',

		// 공유/코드 가져오기
		shareCode: '코드',
		importCode: '코드 가져오기',
		importPrompt: 'TheWord 공유 코드를 여기에 붙여넣으세요:',
		importError: '유효하지 않은 코드입니다.',
		importSuccess: '목록이 성공적으로 가져와졌습니다 ✅',
		shareCodeCopied: '코드가 클립보드에 복사되었습니다 ✅',

		// 텍스트에서 직접 가져오기
		importTextButton: '텍스트 → 목록',
		importTextTitlePlaceholder: '새 목록 제목',
		importTextDefaultTitle: '텍스트 가져오기',
		importTextBodyPlaceholder: '여기에 텍스트를 붙여넣으세요…',
		importTextNoBody: '가져올 텍스트를 붙여넣으십시오.',
		importTextNoBlock:
			'블록이 감지되지 않았습니다 (블록으로 나누려면 빈 줄을 추가하세요).',
		importTextSplitLabel:
			'블록으로 나누기 (최소한 하나의 빈 줄로 구분됨)',
		importTextInfo: '각 블록은 목록의 항목이 됩니다.',
		importTextCreate: '목록 만들기',

		duplicateTitle: '동일한 제목의 목록이 이미 존재합니다.',
		confirmDeleteList: '이 목록을 삭제하시겠습니까?',
		emptyList: '빈 목록입니다.',

		importFromTextTitle: '텍스트에서 가져오기',
		documentContent: '문서 내용',
		renameList: '이름 변경',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: '연구 만들기',
		placeholder: '연구 제목…',
		empty: '아직 연구가 없습니다.',
		items: '항목',
		backAll: '← 모든 연구',
		addTextBlock: '텍스트 블록 추가',
		editTextBlock: '블록 편집',
		deleteItem: '삭제',
		moveUp: '위로 이동',
		moveDown: '아래로 이동',
		open: '열기',
		openReading: '읽기 열기',
		confirmDeleteItem: '이 항목을 삭제하시겠습니까?',
		newTextPlaceholder: '당신의 텍스트…',

		// 공유/코드 가져오기
		shareCode: '코드',
		importCode: '코드 가져오기',
		importPrompt: 'TheWord 공유 코드 (노트 또는 연구)를 여기에 붙여넣으세요:',
		importError: '유효하지 않은 코드입니다.',
		importSuccess: '연구가 성공적으로 가져와졌습니다 ✅',
		shareCodeCopied: '코드가 클립보드에 복사되었습니다 ✅',

		// 텍스트에서 직접 가져오기
		importTextButton: '텍스트 → 연구',
		importTextTitlePlaceholder: '새 연구 제목',
		importTextDefaultTitle: '텍스트 가져오기',
		importTextBodyPlaceholder: '여기에 텍스트를 붙여넣으세요…',
		importTextNoBody: '가져올 텍스트를 붙여넣으십시오.',
		importTextNoBlock:
			'블록이 감지되지 않았습니다 (블록으로 나누려면 빈 줄을 추가하세요).',
		importTextSplitLabel:
			'블록으로 나누기 (최소한 하나의 빈 줄로 구분됨)',
		importTextInfo: '각 블록은 연구의 항목이 됩니다.',
		importTextCreate: '연구 만들기',

		duplicateTitle: '동일한 제목의 연구가 이미 존재합니다.',
		confirmDeleteList: '이 연구를 삭제하시겠습니까?',
		emptyList: '빈 연구입니다.',

		importFromTextTitle: '텍스트에서 가져오기',
		documentContent: '문서 내용',
		renameList: '이름 변경',
		share: '공유',
		copy: '복사',
		deleteList: '삭제',

		// 네이티브 공유 제목
		shareStudyTitle: '연구',
		shareItemTitle: '구절',
	},

	// Settings page
	appearance: '외관',
	lightMode: '밝은 모드',
	darkMode: '어두운 모드',
	fontSize: '글꼴 크기',
	language: '언어',
	french: '프랑스어',
	english: '영어',
	fontSizeXLLabel: '저시력 모드 (XL)',
	fontSizePreview: '선택한 글꼴 크기 미리보기.',
	updates: '업데이트',
	updatesDescription:
		'새 버전이 있는지 확인하고 적용합니다.',
	applyUpdate: '업데이트 적용',
	checkUpdatesButton: '업데이트 확인',
	updatesChecking: '확인 중…',
	updatesUpToDate: '앱이 최신 상태입니다.',
	updatesReady:
		'새 버전 준비 완료. “업데이트 적용”을 클릭하세요.',
	updatesUnavailable:
		'자동 업데이트를 사용할 수 없습니다 (서비스 워커가 감지되지 않았습니다).',
	updatesError: '확인 중 오류가 발생했습니다. 다시 시도하십시오.',

	// About page
	aboutTitle: '',
	aboutDescription:
		'The Word는 랜덤 구절과 전체 성경 읽기를 통해 하나님의 말씀을 발견할 수 있도록 합니다.',
	aboutIntro:
		'TheWord: 오프라인 성경 읽기, 즉시 검색, 주제별 노트, 원터치 공유. 웹에서도 TheWord를 사용할 수 있습니다: www.theword.fr',
	bibleVersions: '성경 버전',
	frenchVersion:
		'프랑스어: Louis Segond 1910 (LSG) - 2025 새로고침 - 공용 도메인',
	englishVersion: '영어: King James Version (KJV) - 공용 도메인',
	frenchVersionDetails:
		'프랑스어 성경의 참조 버전으로, 1910년 Louis Segond가 번역하고 2025년 새로고침되었습니다 (현대화된 어휘/문법, 원고에 충실).',
	englishVersionDetails:
		'고전적인 영어 버전 (KJV), 1611년 출판, 1769년 개정, 2025년 제한적인 새로고침.',
	otherLanguagesNote:
		'더 많은 언어 (독일어, 스페인어, 포르투갈어, 힌디어, 중국어, 아랍어 등)가 점진적으로 추가되고 있습니다. 인터페이스 번역이 누락된 경우 앱은 기본적으로 영어를 사용합니다.',
	randomFeature: '랜덤 기능',
	randomFeatureDesc:
		'우리의 랜덤 구절 생성기는 31,000개가 넘는 성경 구절 중에서 선택하여 매일 영감을 제공합니다.',
	musicLink: '창조주의 음악',
	versesLabel: '구절',
	booksLabel: '책',
	readingShortcuts: '읽기 단축키',
	notesIntro:
		'좋아하는 구절과 개인적인 생각을 주제별 목록으로 정리하세요.',
	notesPoint1: '구절 또는 자유 텍스트 블록을 추가합니다.',
	notesPoint2:
		'항목을 탭하여 메뉴를 엽니다 (읽기에서 열기, 위/아래로 이동, 삭제…).',
	notesPoint3: '목록 이름 변경, 복사/공유.',
	createdWithLove: '하나님의 말씀을 전파하기 위해 사랑으로 만들어졌습니다',
	versionsFootnote:
		'사용된 모든 성경 버전은 공용 도메인에 있습니다. 일부는 부분적으로 현대화되었지만 (어휘, 문법) 원본 원고에 엄격하게 충실합니다.',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'책/장 선택기 오른쪽에 정렬된 이 4개의 버튼을 사용하면 여러 책을 병렬로 따라가기 위해 자주 읽는 곳으로 즉시 돌아갈 수 있습니다. 3개의 개별 위치에 대해 1/2/3을 사용하고, 돋보기를 사용하여 마지막 구절 (랜덤 구절 또는 검색)을 다시 시작합니다.',
	quickSlotsIllustrationLabel: '단축키 그림',
	quickSlotLastPassageTooltip: '마지막 구절',
	quickSlot1ActiveTooltip: '단축키 1 (활성)',
	quickSlot2Tooltip: '단축키 2',
	quickSlot3Tooltip: '단축키 3',

	// Common
	loading: '로딩 중…',
	error: '콘텐츠 로딩 오류',
};

// Yoruba - yo
const yoTranslations: typeof frTranslations = {
	// Navigation
	home: 'Ile',
	reading: 'Kika',
	search: 'Wadi',
	settings: 'Eto',
	about: 'Nipa',
	notes: 'Akiyesi',
	principles: 'Ilana',

	// Home page
	randomVerse: 'Ese Àdàkọrọ',
	newVerse: 'Ese Titun',
	copyVerse: 'Ṣe Àdàkọ Ese',
	verseCopied: 'Ese ti ṣe àdàkọ!',
	godSpeaks: 'Ọlọrun n sọ fun ọ',
	openJeremiah: 'Ṣi Jeremaya 23:29',
	jeremiah23Quote:
		'“Kò ha dabi iná bi, li Oluwa wi; ati bi òòlù ti n fọ òkúta wẹ́wẹ́?” Jeremaya 23:29',

	// Reading page
	selectBook: 'Yan iwe kan',
	selectChapter: 'Yan ori kan',
	chapter: 'Ori',
	oldTestament: 'Majẹmu Laelae',
	newTestament: 'Majẹmu Titun',

	// Reading – extras
	chooseBook: 'Yan iwe kan',
	chooseChapter: 'Yan ori kan',
	prevChapter: 'Ori Ti Tẹlẹ',
	nextChapter: 'Ori Ti O Tẹle',
	verseWord: 'ese',
	versesSelectedSuffix: 'ese ti a yan',
	toNotes: 'Si Akiyesi',
	toPrinciples: 'Si Ilana',
	copyLabel: 'Ṣe Àdàkọ',
	shareLabel: 'Pín',
	cancel: 'Fagilé',
	close: 'Tii',
	notesModalTitle: 'Fi kun atokọ (Akiyesi)',
	notesNoList: 'Ko si atokọ sibẹsibẹ. Ṣẹda ọkan ni isalẹ.',
	notesNewListOptional: 'Atokọ titun (iyan)',
	principlesModalTitle: 'Fi kun iwadi (Ilana)',
	principlesNoList: 'Ko si iwadi sibẹsibẹ. Ṣẹda ọkan ni isalẹ.',
	principlesNewListOptional: 'Iwadi titun (iyan)',
	selectionCopied: 'A ti ṣe àdàkọ yiyan',
	textReadyToShare: 'Ọrọ ti ṣetan lati pin (ti ṣe àdàkọ)',
	addedToList: 'Ti fi kun atokọ',
	newRandom: 'Àdàkọrọ titun',
	swipeLabel: 'Ra',
	searchSlotLabel: 'Wadi',
	searchSlotEmpty: 'Wadi (òfo)',
	memorySlotLabel: 'Ipo',
	emptySlotSuffix: '(òfo)',
	untitledList: '(lai si akọle)',

	// Short label “Copied”
	copiedShort: 'Ti ṣe Àdàkọ',

	// *** Search page ***
	searchTitle: 'Iwadi Bibeli',
	searchPlaceholder: 'Tẹ iwadi rẹ sii',
	searchMinChars: 'Tẹ o kere ju lẹta 2 lati wadi.',
	searchSearching: 'N wadi…',
	searchResults: 'Awọn abajade',
	searchExpandAll: 'Fa gbogbo rẹ siwaju',
	searchCollapseAll: 'Fagile gbogbo rẹ',
	searchNoResults: 'Ko si ese ti a ri.',
	searchClear: 'Nù kuro',
	searchOpenInReading: 'Ṣi ni Kika',

	// Notes page block
	notesPage: {
		create: 'Ṣẹda atokọ',
		placeholder: 'Akọle atokọ…',
		empty: 'Ko si atokọ sibẹsibẹ.',
		items: 'awọn ohun èlò',
		backAll: '← Gbogbo awọn atokọ',
		addTextBlock: 'Fi àkọsílẹ̀ ọrọ kun',
		editTextBlock: 'Ṣatunkọ àkọsílẹ̀',
		deleteItem: 'Paarẹ',
		moveUp: 'Gbe soke',
		moveDown: 'Gbe silẹ',
		open: 'Ṣi',
		confirmDeleteItem: 'Paarẹ ohun èlò yii?',
		newTextPlaceholder: 'Ọrọ rẹ…',

		// Pin / gbe wọle nipasẹ koodu
		shareCode: 'Koodu',
		importCode: 'Gbe koodu wọle',
		importPrompt: 'Lẹ koodu pinpin TheWord si ibi:',
		importError: 'Koodu ti ko tọ.',
		importSuccess: 'A ti gbe atokọ wọle ni aṣeyọri ✅',
		shareCodeCopied: 'A ti ṣe àdàkọ koodu si apo-ìkópa ✅',

		// Gbe wọle taara lati ọrọ
		importTextButton: 'Ọrọ → Atokọ',
		importTextTitlePlaceholder: 'Akọle atokọ titun',
		importTextDefaultTitle: 'Gbe ọrọ wọle',
		importTextBodyPlaceholder: 'Lẹ ọrọ rẹ si ibi…',
		importTextNoBody: 'Jọwọ lẹ ọrọ kan lati gbe wọle.',
		importTextNoBlock:
			'Ko si àkọsílẹ̀ ti a ri (fi awọn ila òfo kun ti o ba fẹ pin si awọn àkọsílẹ̀).',
		importTextSplitLabel:
			'Pin si awọn àkọsílẹ̀ (ti o ya sọtọ nipasẹ o kere ju ila òfo kan)',
		importTextInfo: 'Gbogbo àkọsílẹ̀ yoo di ohun èlò ninu atokọ naa.',
		importTextCreate: 'Ṣẹda atokọ',

		duplicateTitle: 'Atokọ kan pẹlu akọle kanna wa tẹlẹ.',
		confirmDeleteList: 'Paarẹ atokọ yii?',
		emptyList: 'Atokọ òfo.',

		importFromTextTitle: 'Gbe wọle lati ọrọ',
		documentContent: 'Awọn akoonu iwe',
		renameList: 'Tun lorukọ',
	},

	// Principles block (Principes page)
	principlesPage: {
		create: 'Ṣẹda iwadi',
		placeholder: 'Akọle iwadi…',
		empty: 'Ko si iwadi sibẹsibẹ.',
		items: 'awọn ohun èlò',
		backAll: '← Gbogbo awọn iwadi',
		addTextBlock: 'Fi àkọsílẹ̀ ọrọ kun',
		editTextBlock: 'Ṣatunkọ àkọsílẹ̀',
		deleteItem: 'Paarẹ',
		moveUp: 'Gbe soke',
		moveDown: 'Gbe silẹ',
		open: 'Ṣi',
		openReading: 'Ṣi Kika',
		confirmDeleteItem: 'Paarẹ ohun èlò yii?',
		newTextPlaceholder: 'Ọrọ rẹ…',

		// Pin / gbe wọle nipasẹ koodu
		shareCode: 'Koodu',
		importCode: 'Gbe koodu wọle',
		importPrompt: 'Lẹ koodu pinpin TheWord (akiyesi tabi iwadi) si ibi:',
		importError: 'Koodu ti ko tọ.',
		importSuccess: 'A ti gbe iwadi wọle ni aṣeyọri ✅',
		shareCodeCopied: 'A ti ṣe àdàkọ koodu si apo-ìkópa ✅',

		// Gbe wọle taara lati ọrọ
		importTextButton: 'Ọrọ → Iwadi',
		importTextTitlePlaceholder: 'Akọle iwadi titun',
		importTextDefaultTitle: 'Gbe ọrọ wọle',
		importTextBodyPlaceholder: 'Lẹ ọrọ rẹ si ibi…',
		importTextNoBody: 'Jọwọ lẹ ọrọ kan lati gbe wọle.',
		importTextNoBlock:
			'Ko si àkọsílẹ̀ ti a ri (fi awọn ila òfo kun ti o ba pin si awọn àkọsílẹ̀).',
		importTextSplitLabel:
			'Pin si awọn àkọsílẹ̀ (ti o ya sọtọ nipasẹ o kere ju ila òfo kan)',
		importTextInfo: 'Gbogbo àkọsílẹ̀ yoo di ohun èlò ninu iwadi naa.',
		importTextCreate: 'Ṣẹda iwadi',

		duplicateTitle: 'Iwadi kan pẹlu akọle kanna wa tẹlẹ.',
		confirmDeleteList: 'Paarẹ iwadi yii?',
		emptyList: 'Iwadi òfo.',

		importFromTextTitle: 'Gbe wọle lati ọrọ',
		documentContent: 'Awọn akoonu iwe',
		renameList: 'Tun lorukọ',
		share: 'Pín',
		copy: 'Ṣe Àdàkọ',
		deleteList: 'Paarẹ',

		// Awọn akọle fun pinpin abinibi
		shareStudyTitle: 'Iwadi',
		shareItemTitle: 'Ese',
	},

	// Settings page
	appearance: 'Irisi',
	lightMode: 'Ipo Imọlẹ',
	darkMode: 'Ipo Dudu',
	fontSize: 'Iwọn Fonti',
	language: 'Ede',
	french: 'Faranse',
	english: 'Gẹẹsi',
	fontSizeXLLabel: 'Ipo Iran Kekere (XL)',
	fontSizePreview: 'Aworan ti iwọn fonti ti a yan.',
	updates: 'Awọn imudojuiwọn',
	updatesDescription:
		'Ṣayẹwo boya ẹya tuntun kan wa ti o si fi sii.',
	applyUpdate: 'Fi imudojuiwọn sii',
	checkUpdatesButton: 'Ṣayẹwo fun awọn imudojuiwọn',
	updatesChecking: 'N ṣayẹwo…',
	updatesUpToDate: 'App rẹ ti wa ni imudojuiwọn.',
	updatesReady:
		'Ẹya tuntun ti ṣetan. Tẹ "Fi imudojuiwọn sii".',
	updatesUnavailable:
		'Imudojuiwọn laifọwọyi ko si (Ko si Oṣiṣẹ Iṣẹ).',
	updatesError: 'Aṣiṣe lakoko ṣayẹwo. Jọwọ gbiyanju lẹẹkansi.',

	// About page
	aboutTitle: '',
	aboutDescription:
		'The Word gba ọ laaye lati ṣe iwari ọrọ Ọlọrun nipasẹ awọn ese àdàkọrọ ati kika Bibeli ni kikun.',
	aboutIntro:
		'TheWord: Kika Bibeli aisinipo, wiwa lesekese, awọn akọsilẹ akori, pinpin ni titẹ kan. O tun le lo TheWord lori ayelujara: www.theword.fr',
	bibleVersions: 'Awọn Ẹya Bibeli',
	frenchVersion:
		'Faranse: Louis Segond 1910 (LSG) - Isọdọtun 2025 - Ohun-ini Gbangba',
	englishVersion: 'Gẹẹsi: King James Version (KJV) - Ohun-ini Gbangba',
	frenchVersionDetails:
		'Ẹya itọkasi ti Bibeli Faranse, ti Louis Segond tumọ ni ọdun 1910 ati ti a tunṣe ni 2025 (imudarasi imọ-ọrọ / girama, jẹ olotitọ si awọn iwe afọwọkọ).',
	englishVersionDetails:
		'Ẹya Gẹẹsi Ayebaye (KJV), ti a tẹjade ni 1611, ti a tunṣe ni 1769, pẹlu isọdọtun to lopin ni 2025.',
	otherLanguagesNote:
		'Awọn ede miiran (Jẹmánì, Spani, Pọtugali, Hindi, Ṣaina, Larubawa, ati bẹbẹ lọ) n fi kun diẹ diẹ. Nigbati itumọ atọkun ba nsọnu, app naa pada si Gẹẹsi gẹgẹbi aiyipada.',
	randomFeature: 'Ẹya Àdàkọrọ',
	randomFeatureDesc:
		'Ẹrọ ipilẹṣẹ ese àdàkọrọ wa yan lati inu awọn ese Bibeli to ju 31,000 lọ lati fun ọ ni imisi lojoojumọ.',
	musicLink: 'Orin Oludasile',
	versesLabel: 'Ese',
	booksLabel: 'Awọn Iwe',
	readingShortcuts: 'Awọn ọna abayọ kika',
	notesIntro:
		'Ṣeto awọn apakan ayanfẹ rẹ ati awọn ero ti ara ẹni sinu awọn atokọ akori.',
	notesPoint1: 'Fi awọn ese tabi awọn àkọsílẹ̀ ọrọ ọfẹ kun.',
	notesPoint2:
		'Tẹ ohun èlò lati ṣiṣi akojọ aṣayan rẹ (Ṣi ni Kika, Gbe soke/silẹ, Paarẹ…).',
	notesPoint3: 'Tun lorukọ awọn atokọ rẹ, ṣe àdàkọ/pin.',
	createdWithLove: 'Ti a da pẹlu ifẹ lati tan Ọrọ Ọlọrun ka',
	versionsFootnote:
		'Gbogbo awọn ẹya Bibeli ti a lo wa ni ohun-ini gbangba. Diẹ ninu wọn ti ni imudarasi ni apakan (imọ-ọrọ, girama) lakoko ti o duro ni olotitọ si awọn iwe afọwọkọ atilẹba.',

	// Quick slots / reading shortcuts (About + Reading)
	quickSlotsIntro:
		'Awọn bọtini 4 wọnyi, ti o wa ni ẹgbẹ ọtun ti oluyẹwo Iwe/Ori, gba ọ laaye lati pada lesekese si awọn kika loorekoore rẹ lati tẹle awọn iwe pupọ ni afiwe: lo 1/2/3 fun awọn ipo 3 ti o yato, ati gilasi gbigbooro lati tun bẹrẹ apakan ti o kẹhin (ese àdàkọrọ tabi wiwa).',
	quickSlotsIllustrationLabel: 'Aworan ti awọn ọna abayọ',
	quickSlotLastPassageTooltip: 'Apakan ti o kẹhin',
	quickSlot1ActiveTooltip: 'Ọna abayọ 1 (nṣiṣe lọwọ)',
	quickSlot2Tooltip: 'Ọna abayọ 2',
	quickSlot3Tooltip: 'Ọna abayọ 3',

	// Common
	loading: 'N gbe wọle…',
	error: 'Aṣiṣe gbigbe akoonu wọle',
};

/**
 * Mappage de toutes les traductions par clé de langue.
 */
const translations: { [key in Language]: typeof frTranslations } = {
	fr: frTranslations,
	en: enTranslations,
	es: esTranslations,
	ru: ruTranslations,
	pt: ptTranslations,
	de: deTranslations,
	hi: hiTranslations,
	zh: zhTranslations,
	ar: arTranslations,
	sw: swTranslations,
	it: itTranslations,
	id: idTranslations,
	tr: trTranslations,
	ja: jaTranslations,
	ko: koTranslations,
	yo: yoTranslations,
};

// =========================================================================
// 2. Hook useTranslation
// =========================================================================

/**
 * Hook personnalisé pour la gestion des traductions.
 * Retourne la fonction de traduction 't' et le dictionnaire de la langue courante.
 * L'anglais est utilisé comme fallback si la traduction n'existe pas.
 */
export const useTranslation = () => {
	const { settings } = useApp();
	const currentLang = settings.language;

	// Utilise la traduction de la langue courante, ou l'anglais comme fallback
	const currentTranslations = translations[currentLang] || enTranslations;

	const t = (key: keyof typeof frTranslations): string => {
		// Vérifie d'abord dans la langue courante
		if (currentTranslations[key] !== undefined) {
			return currentTranslations[key];
		}

		// Fallback à l'anglais si la clé est manquante (ne devrait pas arriver
		// si tous les dictionnaires sont à jour)
		console.warn(
			`Missing translation key "${key}" for language "${currentLang}". Falling back to English.`,
		);
		return enTranslations[key] || `??${key}??`;
	};

	return { t, translations: currentTranslations };
};

export type TranslationKey = keyof typeof frTranslations;
