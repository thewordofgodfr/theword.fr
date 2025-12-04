// src/i18n/fr.ts
import type { TranslationDict } from './types';

const fr: TranslationDict = {
  // Navigation
  home: 'Accueil',
  reading: 'Lecture',
  search: 'Recherche',
  settings: 'Paramètres',
  about: 'À propos',
  notes: 'Notes',
  principles: 'Études',

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
  toPrinciples: 'Vers Études',
  copyLabel: 'Copier',
  shareLabel: 'Partager',
  cancel: 'Annuler',
  close: 'Fermer',
  notesModalTitle: 'Ajouter à une liste (Notes)',
  notesNoList: 'Aucune liste pour l’instant. Créez-en une ci-dessous.',
  notesNewListOptional: 'Nouvelle liste (optionnel)',
  principlesModalTitle: 'Ajouter à une étude (Études)',
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

  // Bloc Études (page Études)
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

  // Quick slots
  quickSlotsIntro:
    'Ces 4 boutons, alignés à droite du sélecteur Livre/Chapitre, permettent de revenir instantanément sur vos lectures fréquentes pour lire plusieurs livres en parallèle : utilisez 1/2/3 pour 3 emplacements distincts, et la loupe pour reprendre le dernier passage (verset aléatoire ou recherche).',
  quickSlotsIllustrationLabel: 'Illustration des raccourcis',
  quickSlotLastPassageTooltip: 'Dernier passage',
  quickSlot1ActiveTooltip: 'Raccourci 1 (actif)',
  quickSlot2Tooltip: 'Raccourci 2',
  quickSlot3Tooltip: 'Raccourci 3',

  // Aide Notes (mode d'emploi)
  notesHelpTitle: 'Notes — mode d’emploi',
  notesHelpIntro:
    'La page Notes vous permet de garder vos versets, pensées, méditations et prières organisés par listes. Tout est stocké localement sur votre appareil, 100 % hors ligne, sans compte et sans connexion internet.',
  notesHelp1Title: '1. Listes de notes',
  notesHelp1Body:
    'Chaque carte représente une liste de notes (par exemple : « Prédication du dimanche », « Prières pour la famille », etc.). Le bouton « Créer une liste » (orange) permet d’ajouter une nouvelle liste. La ligne sous le titre indique le nombre d’éléments et la date de dernière modification.',
  notesHelp2Title: '2. Ouvrir et revenir aux listes',
  notesHelp2Body:
    'Touchez une carte pour ouvrir une liste. Le bouton « Toutes les listes » en haut permet de revenir à la vue globale. Quand vous revenez depuis la page Lecture, l’application réouvre automatiquement la dernière liste utilisée et se place à la fin, pour continuer vos notes facilement.',
  notesHelp3Title: '3. Ajouter des versets depuis la Bible',
  notesHelp3Body:
    'Depuis la page Lecture (et la recherche), vous pouvez ajouter des versets à vos notes en utilisant le bouton dédié pour les Notes. Les versets choisis sont enregistrés dans la ou les listes que vous sélectionnez, avec la référence et le texte du verset.',
  notesHelp4Title: '4. Blocs de texte libres',
  notesHelp4Body:
    'En plus des versets, vous pouvez ajouter des blocs de texte (compte-rendus, plans, idées, prières, résumés, etc.). Le bouton « Ajouter un bloc texte » (en haut et en bas de la liste) ouvre une grande zone d’édition. Le texte est enregistré comme un élément à part entière dans la liste, que vous pouvez ensuite modifier, déplacer ou supprimer.',
  notesHelp5Title: '5. Réorganiser les éléments',
  notesHelp5Body:
    'En appuyant sur un élément, vous ouvrez son menu d’actions. Les flèches « Monter » et « Descendre » permettent de changer l’ordre des éléments dans la liste pour adapter la structure à votre étude ou à votre prédication.',
  notesHelp6Title: '6. Copier et partager une liste entière',
  notesHelp6Body:
    'Dans une liste ouverte, les boutons « Partager » et « Copier » permettent de récupérer tout le contenu de la liste : titre, références, textes et blocs de notes. Vous pouvez ensuite coller ce contenu dans un message, un document ou un autre outil, même en restant hors ligne.',
  notesHelp7Title: '7. Partage par code TheWord',
  notesHelp7Body:
    'Le bouton « Code » génère un code compact que vous pouvez envoyer à quelqu’un. Dans son application The Word, cette personne peut utiliser l’option d’import par code pour recréer exactement la même liste (titre + contenu) sur son appareil.',
  notesHelp8Title: '8. Importer à partir d’un texte',
  notesHelp8Body:
    'Le bouton « Importer depuis un texte » permet de coller un document complet (notes Word, mail, prédication, etc.). L’application découpe le texte en blocs (séparés par des lignes vides) et crée automatiquement une liste de blocs de texte. Pratique pour transformer rapidement un document existant en notes dans The Word.',
  notesHelp9Title: '9. Gestion locale et confidentialité',
  notesHelp9Body:
    'Toutes vos notes sont enregistrées uniquement sur votre appareil. The Word ne synchronise rien sur un serveur et ne collecte aucune donnée personnelle. Si vous supprimez l’application ou effacez les données de navigation, les listes de notes seront également effacées.',
  notesHelp10Title: '10. Idées d’utilisation',
  notesHelp10Body:
    'Vous pouvez utiliser les Notes pour : préparer des prédications, suivre un plan d’étude, garder une liste de prières, noter ce que Dieu vous rappelle pendant la journée, ou encore conserver des versets pour les apprendre par cœur. À vous d’adapter les listes à votre manière de méditer la Parole.',

  // Common
  loading: 'Chargement...',
  error: 'Erreur lors du chargement',
};

export default fr;


