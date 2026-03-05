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
  aboutIntro: `Pourquoi j’ai créé The Word

Au départ, j’ai créé cette application pour une chose très simple : lire plusieurs livres de la Bible en même temps, sans perdre le fil d’un jour à l’autre, grâce aux onglets 1 / 2 / 3 de la page Lecture.

Avec le temps, j’ai ajouté d’autres fonctions, toujours avec la même intention : aider à lire, méditer, retenir, et mettre en pratique la Parole de Dieu.

Ma prière pour vous

Ma prière, c’est que vous puissiez être touché par la Parole de Dieu, que vous compreniez l’amour que Dieu a pour vous, et l’amour de Jésus-Christ son Fils, ainsi que le prix qu’il a payé pour que nous soyons réconciliés avec Dieu et que nous marchions avec Lui dans son amour.

L’amour de Dieu et l’appel à croire sont particulièrement visibles dans l’Évangile de Jean (ex : Jean 3:16).

La clé de l’entrée dans le Royaume, et l’appel clair à répondre à Dieu, apparaissent clairement dans le livre des Actes (ex : Actes 2:38 ; Actes 4:12).

La Bible : Dieu nous parle

Il ne faut jamais oublier que toute la Bible est inspirée de Dieu : c’est Dieu qui nous parle, et nous devons le craindre et lui obéir.

2 Timothée 3:16-17  “Toute Écriture est inspirée de Dieu…”
Proverbes 9:10  “La crainte de l’Éternel est le commencement de la sagesse…”
Jean 13:34-35  “Aimez-vous les uns les autres, comme je vous ai aimés…”

Le temps est court : répondre à l’appel de Dieu

Je crois que le temps est court et que Dieu désire ardemment que chaque personne réponde à son appel : se repentir, croire, et être baptisé pour le pardon des péchés. C’est une opportunité immense : être avec Dieu éternellement. Ne tardons pas, car Dieu accomplira sa justice au jour qu’il a fixé, et Jésus nous a souvent appelés à veiller et à nous tenir prêts.

1 Corinthiens 7:29  “Le temps est court…”
Actes 17:30-31  Dieu appelle tous les hommes à la repentance… “il a fixé un jour…”
Actes 2:38  “Repentez-vous, et que chacun de vous soit baptisé… pour le pardon de vos péchés…”
Marc 1:15  “Repentez-vous, et croyez à la bonne nouvelle.”
Matthieu 24:42-44  “Veillez donc… tenez-vous prêts…”
Luc 12:35-40  “Que vos reins soient ceints, et vos lampes allumées…”

Malheureusement, beaucoup se sont éloignés des Écritures. La Bible avertit qu’un temps viendra où certains chercheront des messages qui leur plaisent et se donneront “une foule de maîtres”.

C’est pourquoi nous sommes appelés à demeurer dans la Parole, à obéir à Dieu, et à marcher d’une manière digne de l’Évangile, en cherchant aussi à convaincre ceux qui nous entourent.

2 Timothée 4:3-4  “ils se donneront une foule de docteurs…”
Jean 8:31-32  “Si vous demeurez dans ma parole…”
Colossiens 1:23  “demeurez fondés et inébranlables…”
Philippiens 1:27  “conduisez-vous d’une manière digne de l’Évangile…”
2 Corinthiens 5:20  “Nous faisons donc les fonctions d’ambassadeurs…”

Et parfois, une “église” peut simplement commencer humblement : deux personnes qui cherchent Dieu ensemble.

Matthieu 18:20  “Là où deux ou trois sont assemblés en mon nom…”

La porte est étroite : marcher humblement avec Dieu

Jésus a dit que la porte est étroite, et que le chemin qui mène à la perdition est large. Ne laissons pas nos péchés nous détourner de Dieu. Obéissons avec humilité à sa Parole, avec un cœur d’enfant : simple, sans hypocrisie, mais aussi lucide et prudent.

Matthieu 7:13-14  “Entrez par la porte étroite…”
Hébreux 12:1-2  “rejetons tout fardeau et le péché…”
Matthieu 18:3  “si vous ne devenez comme les petits enfants…”
Matthieu 10:16  “simples comme les colombes et prudents comme les serpents…”

Prier, persévérer, ne pas abandonner

Priez Dieu pour qu’il vous guide par sa Parole et par son Saint-Esprit. Suppliez. Ne vous découragez pas. N’abandonnez pas. Même si le juste traverse des souffrances, Dieu reste fidèle et délivre.

Luc 18:1  “il faut toujours prier, et ne point se relâcher”
Jacques 1:5  “Si quelqu’un manque de sagesse, qu’il la demande à Dieu…”
Psaume 34:20  “Le malheur atteint souvent le juste; mais l’Éternel l’en délivre toujours.”`,
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
    'Ces 4 boutons, alignés à droite du sélecteur Livre/Chapitre, permettent de revenir instantanément sur vos lectures fréquentes pour lire plusieurs livres en parallèle : utilisez 1/2/3 pour 3 emplacements distincts, et la loupe pour reprendre le dernier passage (verset aléatoire ou recherche).',
  quickSlotsIllustrationLabel: 'Illustration des raccourcis',
  quickSlotLastPassageTooltip: 'Dernier passage',
  quickSlot1ActiveTooltip: 'Raccourci 1 (actif)',
  quickSlot2Tooltip: 'Raccourci 2',
  quickSlot3Tooltip: 'Raccourci 3',

  // Aide Notes + Études (mode d'emploi commun)
  notesHelpTitle: 'Notes & Études — mode d’emploi',
  notesHelpIntro:
    'Les pages Notes et Études vous permettent de mémoriser vos versets, de créer des listes par thème et de construire de vraies études en combinant versets et blocs de texte. Tout est stocké localement sur votre appareil, 100 % hors ligne, sans compte et sans connexion internet.',
  notesHelp1Title: '1. Page d’accueil de Notes et d’Études',
  notesHelp1Body:
    'Regroupe vos listes de Notes ou d’Études. Touchez une liste pour ouvrir son contenu. Le bouton « Toutes les listes » ou « Toutes les études » en haut permet de revenir à la vue globale. Quand vous revenez depuis la page Lecture, l’application réouvre automatiquement la dernière liste de Notes ou la dernière Étude utilisée et se place à la fin pour continuer facilement votre travail.',
  notesHelp2Title: '2. Ajouter des versets depuis la Bible',
  notesHelp2Body:
    'Depuis la page Lecture, vous pouvez ajouter des versets soit dans vos Notes, soit dans vos Études, en utilisant les boutons dédiés. Les versets choisis sont enregistrés dans la ou les listes/études que vous sélectionnez, avec la référence et le texte du verset. Vous pouvez mémoriser le même verset dans plusieurs listes différentes.',
  notesHelp3Title: '3. Blocs de texte libres',
  notesHelp3Body:
    'En plus des versets, vous pouvez ajouter des blocs de texte libre (commentaires, idées personnelles, questions, points de prédication, etc.). Le bouton « Ajouter un bloc texte » (en haut et en bas d’une liste ou d’une étude ouverte) affiche une grande zone d’édition. Le texte est enregistré comme un élément à part entière que vous pouvez ensuite modifier, déplacer ou supprimer.',
  notesHelp4Title: '4. Réorganiser les éléments',
  notesHelp4Body:
    'En appuyant sur un élément (verset ou bloc de texte), vous ouvrez son menu d’actions. Les flèches « Monter » et « Descendre » permettent de changer l’ordre des éléments dans la liste ou l’étude, pour adapter la structure à votre étude biblique, votre prédication ou votre temps de méditation.',
  notesHelp5Title: '5. Copier et partager une liste entière',
  notesHelp5Body:
    'Dans une liste de Notes ou une Étude ouverte, les boutons « Partager » et « Copier » permettent de récupérer tout le contenu : titre, références, textes et blocs de notes. Vous pouvez ensuite coller ce contenu dans un message, un document et un autre outil, ou par exemple l’envoyer à quelqu’un par SMS, WhatsApp ou autre application de messagerie.',
  notesHelp6Title: '6. Partage par code The Word',
  notesHelp6Body:
    'Le bouton « Code » génère un code compact que vous pouvez envoyer à quelqu’un qui possède aussi l’application The Word. Dans son application, cette personne peut utiliser l’option d’import par code pour recréer exactement la même liste de Notes ou la même Étude (titre + contenu) sur son appareil. Le bouton « Code » permet aussi de transformer une Note en Étude : on peut ainsi transférer tout le contenu d’une liste de Notes vers Études.',
  notesHelp7Title: '7. Importer à partir d’un texte',
  notesHelp7Body:
    'Le bouton « Importer depuis un texte » permet de coller un document complet (notes Word, e-mail, prédication, plan d’étude, etc.). L’application découpe le texte en blocs (séparés par des lignes vides) et crée automatiquement une liste ou une étude composée de ces blocs de texte. C’est très pratique pour transformer rapidement un document existant en Notes ou en Étude dans The Word.',
  notesHelp8Title: '8. Gestion locale et confidentialité',
  notesHelp8Body:
    'Toutes vos Notes et Études sont enregistrées uniquement sur votre appareil. The Word ne synchronise rien sur un serveur et ne collecte aucune donnée personnelle. Si vous supprimez l’application ou effacez les données de navigation, les listes de Notes et les Études seront également effacées.',
  notesHelp9Title: '9. Idées d’utilisation',
  notesHelp9Body:
    'Vous pouvez utiliser les Notes pour préparer des prédications, suivre un plan d’étude personnel, garder une liste de prières, noter ce que Dieu vous rappelle pendant la journée ou conserver des versets à apprendre par cœur. Utilisez les Études pour construire des parcours bibliques complets (par thèmes, par livres, pour un groupe de maison, une série de messages, etc.) que vous pourrez ensuite enseigner ou partager facilement.',
  notesHelp10Title: '10. Notes & Études ensemble',
  notesHelp10Body:
    'N’hésitez pas à combiner Notes et Études : par exemple, gardez vos pensées quotidiennes et vos prières dans Notes, et réservez les Études pour les plans que vous souhaitez retravailler, enseigner ou partager avec un groupe.',

  // Common
  loading: 'Chargement...',
  error: 'Erreur lors du chargement',
};

export default fr;

