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

  // Quick slots
  quickSlotsIntro:
    'These 4 buttons, aligned to the right of the Book/Chapter selector, let you jump back to frequent readings to follow several books in parallel: use 1/2/3 for three locations, and the magnifier to resume the last passage (random verse or search).',
  quickSlotsIllustrationLabel: 'Shortcuts illustration',
  quickSlotLastPassageTooltip: 'Last passage',
  quickSlot1ActiveTooltip: 'Shortcut 1 (active)',
  quickSlot2Tooltip: 'Shortcut 2',
  quickSlot3Tooltip: 'Shortcut 3',

  // Notes + Studies help (shared how-to)
  notesHelpTitle: 'Notes & Studies — how it works',
  notesHelpIntro:
    'The Notes and Studies pages let you keep verses, thoughts, meditations and Bible outlines neatly organised. Everything is stored locally on your device, 100% offline, with no account and no internet connection. Use Notes mainly for personal lists (sermons you hear, prayers, thoughts, themes, etc.) and Studies to build structured Bible studies that you can later teach or share with others.',
  notesHelp1Title: '1. Notes and Studies lists',
  notesHelp1Body:
    'Each card represents either a Notes list (for example: “Sunday sermon”, “Prayers for family”, etc.) or a Study (for example: “Study on faith”, “Youth Bible course”, etc.). The orange “Create list” button on the Notes page and the green “Create study” button on the Studies page let you add new sets. The line under the title shows the number of items and the last modification date.',
  notesHelp2Title: '2. Open and go back to lists / studies',
  notesHelp2Body:
    'Tap a card to open its content. The “All lists” or “All studies” button at the top returns to the global view. When you come back from the Reading page, the app automatically reopens the last Notes list or Study you used and scrolls to the end so you can continue working easily.',
  notesHelp3Title: '3. Add verses from the Bible',
  notesHelp3Body:
    'From the Reading page (and from Search), you can add verses either to your Notes or to your Studies using the dedicated buttons. The selected verses are saved in the list(s) or study(ies) you choose, with the reference and verse text. This lets you, for example, prepare a structured Bible plan in Studies while keeping more personal applications in Notes.',
  notesHelp4Title: '4. Free text blocks',
  notesHelp4Body:
    'In addition to verses, you can add free text blocks (reports, detailed outlines, ideas, prayers, summaries, questions, etc.). The “Add text block” button (at the top and bottom of an open list or study) shows a large editor area. The text is stored as a full item that you can later edit, move or delete.',
  notesHelp5Title: '5. Reorder items',
  notesHelp5Body:
    'By tapping an item (verse or text block) you open its action menu. The “Move up” and “Move down” arrows let you change the order of items in the list or study, so you can shape the structure of your Bible study, sermon or meditation time.',
  notesHelp6Title: '6. Copy and share a whole list or study',
  notesHelp6Body:
    'In an open Notes list or Study, the “Share” and “Copy” buttons let you export the entire content: title, references, texts and note blocks. You can then paste it into a message, a document or another tool, even while staying offline – for example, to send your study to someone.',
  notesHelp7Title: '7. Share with a TheWord code',
  notesHelp7Body:
    'The “Code” button generates a compact code you can send to someone. In their The Word app, they can use the import-by-code option to recreate exactly the same Notes list or Study (title + content) on their device.',
  notesHelp8Title: '8. Import from a text document',
  notesHelp8Body:
    'The “Import from text” button lets you paste a complete document (Word notes, email, sermon outline, study plan, etc.). The app splits the text into blocks (separated by blank lines) and automatically creates a list or study made of text blocks. Very handy to turn an existing document into Notes or a Study inside The Word.',
  notesHelp9Title: '9. Local storage and privacy',
  notesHelp9Body:
    'All your Notes and Studies are stored only on your device. The Word does not sync anything to a server and does not collect any personal data. If you delete the app or clear browsing data, your Notes lists and Studies will be deleted as well.',
  notesHelp10Title: '10. Ideas for using Notes & Studies',
  notesHelp10Body:
    'You can use Notes to prepare sermons, follow a personal study plan, keep a prayer list, write down what God reminds you of during the day, or store verses to memorise. Use Studies to build full Bible courses (by theme, by book, for a home group, youth group, sermon series, etc.) that you can then teach or share easily.',

  // Common
  loading: 'Loading...',
  error: 'Error loading content',
};

export default en;

