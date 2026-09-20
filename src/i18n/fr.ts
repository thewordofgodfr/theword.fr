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
  showInOtherLangs: 'Autres langues',
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
    'Recherchez instantanément des mots ou expressions dans toute la Bible, ouvrez les résultats en Lecture, et copiez/partagez un verset en un geste.',
  aboutIntro: `Pourquoi The Word ?

J’ai créé The Word pour pouvoir lire plusieurs livres de la Bible en parallèle, sans perdre le fil de ma lecture. Au fil du temps, d’autres fonctions ont été ajoutées, toujours dans le même but : aider chacun à lire, méditer, retenir et mettre en pratique la Parole de Dieu.

Mon désir

Dans un monde où tant de voix cherchent à nous influencer, mon désir est simple : encourager chacun à revenir directement à la Bible, avec un cœur sincère, pour y chercher la vérité.

Ma prière est que cette application vous aide à découvrir l’amour de Dieu, à connaître Jésus-Christ et à comprendre ce qu’il a accompli afin de nous réconcilier avec Dieu.

Lisez sa Parole. Examinez-la avec attention. Demandez à Dieu de vous guider, puis répondez à son appel avec foi, repentance et obéissance.

« Si vous demeurez dans ma parole, vous êtes vraiment mes disciples ; vous connaîtrez la vérité, et la vérité vous rendra libres. »

Jean 8:31-32`,
  bibleVersions: 'Versions de la Bible',
  frenchVersion:
    'Français : Louis Segond 1910 (LSG) — modernisation 2025 (vocabulaire/orthographe)',
  englishVersion: 'Anglais : King James Version (KJV)',
  frenchVersionDetails:
    'Modernisation 2025 (vocabulaire, orthographe, grammaire) pour une lecture plus fluide, sans changer le sens, et conforme aux manuscrits originaux.',
  englishVersionDetails:
    'Version classique en anglais (KJV), largement utilisée pour l’étude et la lecture.',
  otherLanguagesNote:
    'Plusieurs langues sont disponibles dans l’application (dont grec et hébreu). Vous pouvez afficher un verset dans les autres langues via le bouton « Autres langues » sur la page Lecture.',
  randomFeature: 'Fonctionnalité Aléatoire',
  randomFeatureDesc:
    'Un verset est tiré au hasard parmi plus de 31 000 versets, pour encourager une lecture régulière et une méditation quotidienne.',
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
    'À propos des textes : les Bibles intégrées sont utilisées selon leurs licences respectives. Seule la Louis Segond 1910 a été modernisée en 2025 (grammaire et vocabulaire), dans le strict respect des manuscrits originaux .',

  // Quick slots
  quickSlotsIntro:
    'Ces 4 boutons permettent de revenir instantanément sur vos lectures fréquentes pour lire plusieurs livres en parallèle : utilisez 1/2/3 pour 3 emplacements distincts, et la loupe pour reprendre le dernier passage (verset aléatoire ou recherche).',
  quickSlotsIllustrationLabel: 'Illustration des raccourcis',
  quickSlotLastPassageTooltip: 'Dernier passage',
  quickSlot1ActiveTooltip: 'Raccourci 1 (actif)',
  quickSlot2Tooltip: 'Raccourci 2',
  quickSlot3Tooltip: 'Raccourci 3',

  // Aide Notes + Études (mode d’emploi commun)
notesHelpTitle: 'Notes & Études — mode d’emploi',

notesHelpIntro:
'Les pages Notes et Études vous permettent de conserver et d’organiser des versets dans des listes thématiques, puis de les compléter avec vos propres blocs de texte. Vous pouvez ainsi rassembler des passages, ajouter vos réflexions et construire des études bibliques structurées. Vos Notes et Études sont enregistrées localement sur votre appareil et restent accessibles sans compte.',

notesHelp1Title: '1. Créer et gérer vos listes',

notesHelp1Body:
'La page d’accueil regroupe toutes vos listes de Notes ou toutes vos Études. Vous pouvez créer une liste, lui donner un titre, la renommer ou la supprimer. Touchez une liste pour ouvrir son contenu. Le bouton « Toutes les listes » ou « Toutes les études » permet de revenir à la vue globale. Lorsque vous ouvrez de nouveau Notes ou Études, l’application réaffiche automatiquement la dernière liste utilisée et se place près de son dernier élément afin que vous puissiez poursuivre facilement votre travail.',

notesHelp2Title: '2. Ajouter des versets depuis la Bible',

notesHelp2Body:
'Depuis la page Lecture, sélectionnez un ou plusieurs versets, puis utilisez le bouton Notes ou Études. Les versets sont ajoutés aux listes que vous choisissez avec leur référence et leur texte. Vous pouvez sélectionner plusieurs listes et conserver le même verset à différents endroits.',

notesHelp3Title: '3. Ajouter des blocs de texte',

notesHelp3Body:
'En plus des versets, vous pouvez ajouter vos propres blocs de texte : commentaires, réflexions, questions, prières, points de prédication ou autres contenus. Le bouton « Ajouter un bloc texte » est disponible en haut et en bas d’une liste ouverte. Le bouton + placé près d’un élément permet également d’insérer un bloc à cet endroit précis. Chaque bloc de texte peut ensuite être modifié, déplacé ou supprimé.',

notesHelp4Title: '4. Utiliser et réorganiser les éléments',

notesHelp4Body:
'Touchez le menu d’un élément pour afficher ses actions. Un verset peut être ouvert directement dans la page Lecture, copié ou partagé. Un bloc de texte peut être copié, partagé ou modifié. Les flèches « Monter » et « Descendre » permettent de changer l’ordre des versets et des blocs. Chaque élément peut également être supprimé individuellement.',

notesHelp5Title: '5. Copier ou partager une liste entière',

notesHelp5Body:
'Dans le menu d’une liste de Notes ou d’une Étude, les boutons « Copier » et « Partager » permettent de récupérer tout son contenu : titre, références bibliques, textes des versets et blocs personnels. Vous pouvez ensuite le coller dans un message ou un document, ou l’envoyer avec une application compatible présente sur votre appareil.',

notesHelp6Title: '6. Partager ou transférer avec un code The Word',

notesHelp6Body:
'Le bouton « Code » copie un code compact contenant le titre et tout le contenu de la liste. Une autre personne utilisant The Word peut choisir « Importer un code » pour recréer cette liste sur son appareil. Le même système permet aussi de transférer du contenu entre Notes et Études : copiez le code dans une page, puis importez-le dans l’autre.',

notesHelp7Title: '7. Importer un document texte',

notesHelp7Body:
'L’option « Importer depuis un texte » permet de coller le contenu d’un document, d’un e-mail, d’une prédication ou d’un plan d’étude. Vous pouvez conserver le document dans un seul bloc ou demander à l’application de le découper automatiquement en plusieurs blocs séparés par les lignes vides. Une nouvelle liste ou Étude est alors créée avec le titre choisi.',

notesHelp8Title: '8. Stockage local et sauvegarde',

notesHelp8Body:
'Vos Notes et Études sont enregistrées localement sur votre appareil et ne sont pas automatiquement synchronisées avec un compte ou un serveur. Si vous désinstallez l’application, réinitialisez ses données ou effacez les données du navigateur, leur contenu peut être définitivement supprimé. Pour conserver une liste importante, utilisez les fonctions Copier, Partager ou Code The Word.',

notesHelp9Title: '9. Quelques idées d’utilisation',

notesHelp9Body:
'Vous pouvez utiliser Notes pour conserver des versets à apprendre, écrire vos réflexions quotidiennes, préparer une prédication ou tenir une liste de prières. Utilisez Études pour construire des parcours bibliques plus complets : étude d’un thème ou d’un livre, préparation d’un groupe de maison, plan d’enseignement ou série de messages.',

notesHelp10Title: '10. Combiner Notes et Études',

notesHelp10Body:
'Notes et Études peuvent être utilisées ensemble. Par exemple, rassemblez rapidement vos versets, pensées et prières dans Notes, puis transférez les éléments que vous souhaitez approfondir vers Études à l’aide d’un code The Word. Vous pourrez ensuite les réorganiser, les compléter et les partager.',
  // Common
  loading: 'Chargement...',
  error: 'Erreur lors du chargement',
};

export default fr;

