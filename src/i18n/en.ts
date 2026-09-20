// src/i18n/en.ts
import type { TranslationDict } from './types';

const en: TranslationDict = {
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
  showInOtherLangs: 'Other languages',
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

  // Studies block (Principes page)
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
    "Instantly search for words or phrases throughout the Bible, open the results in Reading, and copy or share a verse with a single tap.",
  aboutIntro: `Why The Word?

I created The Word so that I could read several books of the Bible in parallel without losing track of my progress. Over time, other features were added, always with the same purpose: to help everyone read, meditate on, remember, and put God’s Word into practice.

My desire

In a world where so many voices seek to influence us, my desire is simple: to encourage everyone to return directly to the Bible, with a sincere heart, and seek the truth within it.

My prayer is that this application will help you discover the love of God, know Jesus Christ, and understand what he has done to reconcile us to God.

Read his Word. Examine it carefully. Ask God to guide you, then answer his call with faith, repentance, and obedience.

“If you remain in my word, you are truly my disciples; you will know the truth, and the truth will set you free.”

John 8:31-32`,
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
    'About the texts: the included Bibles are used in accordance with their respective licenses. Only the Louis Segond 1910 was modernized in 2025 (grammar and vocabulary), with strict respect for the original manuscripts.',

  // Quick slots
  quickSlotsIntro:
    'These 4 buttons let you instantly return to your frequent readings so you can read several books in parallel: use 1/2/3 for 3 separate slots, and the magnifying glass to return to the last passage (random verse or search result).',
  quickSlotsIllustrationLabel: 'Shortcuts illustration',
  quickSlotLastPassageTooltip: 'Last passage',
  quickSlot1ActiveTooltip: 'Shortcut 1 (active)',
  quickSlot2Tooltip: 'Shortcut 2',
  quickSlot3Tooltip: 'Shortcut 3',

    // Notes + Studies help (shared user guide)
notesHelpTitle: 'Notes & Studies — User Guide',

notesHelpIntro:
'The Notes and Studies pages allow you to save and organize verses in themed lists, then supplement them with your own text blocks. You can gather passages, add your thoughts, and build structured Bible studies. Your Notes and Studies are stored locally on your device and remain accessible without an account.',

notesHelp1Title: '1. Create and manage your lists',

notesHelp1Body:
'The main page displays all your Notes lists or Studies. You can create a list, give it a title, rename it, or delete it. Tap a list to open its contents. The “All lists” or “All studies” button returns you to the main view. When you open Notes or Studies again, the application automatically reopens the last list you used and moves near its final item so you can easily continue your work.',

notesHelp2Title: '2. Add verses from the Bible',

notesHelp2Body:
'From the Reading page, select one or more verses, then use the Notes or Studies button. The verses are added to the lists you choose, together with their references and text. You can select several lists and save the same verse in different places.',

notesHelp3Title: '3. Add text blocks',

notesHelp3Body:
'In addition to verses, you can add your own text blocks: comments, reflections, questions, prayers, sermon points, or other content. The “Add text block” button is available at the top and bottom of an open list. The + button beside an item also allows you to insert a block at that exact position. Each text block can later be edited, moved, or deleted.',

notesHelp4Title: '4. Use and reorganize items',

notesHelp4Body:
'Open an item’s menu to display its available actions. A verse can be opened directly on the Reading page, copied, or shared. A text block can be copied, shared, or edited. The “Move up” and “Move down” arrows allow you to change the order of verses and text blocks. Each item can also be deleted individually.',

notesHelp5Title: '5. Copy or share an entire list',

notesHelp5Body:
'In the menu of a Notes list or Study, the “Copy” and “Share” buttons allow you to retrieve all its contents: the title, Bible references, verse texts, and personal text blocks. You can then paste the content into a message or document, or send it using a compatible application installed on your device.',

notesHelp6Title: '6. Share or transfer with a The Word code',

notesHelp6Body:
'The “Code” button copies a compact code containing the title and all the contents of the list. Another person using The Word can select “Import a code” to recreate the list on their device. The same system also allows you to transfer content between Notes and Studies: copy the code on one page, then import it on the other.',

notesHelp7Title: '7. Import a text document',

notesHelp7Body:
'The “Import from text” option allows you to paste the contents of a document, an email, a sermon, or a study plan. You can keep the document in a single block or ask the application to divide it automatically into several blocks separated by blank lines. A new Notes list or Study is then created with the title you choose.',

notesHelp8Title: '8. Local storage and backups',

notesHelp8Body:
'Your Notes and Studies are stored locally on your device and are not automatically synchronized with an account or server. If you uninstall the application, reset its data, or clear your browser data, their contents may be permanently deleted. To preserve an important list, use the Copy, Share, or The Word code functions.',

notesHelp9Title: '9. Some ideas for using them',

notesHelp9Body:
'You can use Notes to save verses to memorize, record your daily thoughts, prepare a sermon, or keep a prayer list. Use Studies to build more complete Bible studies: explore a theme or book, prepare a home group, create a teaching plan, or develop a series of messages.',

notesHelp10Title: '10. Combine Notes and Studies',

notesHelp10Body:
'Notes and Studies can be used together. For example, quickly collect verses, thoughts, and prayers in Notes, then transfer the items you want to explore more deeply into Studies using a The Word code. You can then reorganize, expand, and share them.',
  // Common
  loading: 'Loading...',
  error: 'Error loading content',
};

export default en;

