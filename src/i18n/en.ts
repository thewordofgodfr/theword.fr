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
    "The Word allows you to discover God's word through random verses and complete Bible reading.",
  aboutIntro: `Why I created The Word

At first, I created this app for one very simple reason: to read several books of the Bible at the same time, without losing track from one day to the next, thanks to tabs 1 / 2 / 3 on the Reading page.

Over time, I added other features, always with the same goal: to help you read, meditate, remember, and put into practice the Word of God.

My prayer for you

My prayer is that you would be touched by the Word of God, that you would understand the love God has for you, and the love of Jesus Christ, His Son, as well as the price He paid so that we might be reconciled to God and walk with Him in His love.

God’s love and the call to believe are especially visible in the Gospel of John (e.g., John 3:16).

The key to entering the Kingdom, and the clear call to respond to God, appear clearly in the book of Acts (e.g., Acts 2:38; Acts 4:12).

The Bible: God speaks to us

We must never forget that the whole Bible is inspired by God: it is God speaking to us, and we must fear Him and obey Him.

2 Timothy 3:16–17  “All Scripture is inspired by God…”
Proverbs 9:10  “The fear of the LORD is the beginning of wisdom…”
John 13:34–35  “Love one another, as I have loved you…”

Time is short: respond to God’s call

I believe time is short, and that God deeply desires each person to respond to His call: to repent, believe, and be baptized for the forgiveness of sins. This is an immense opportunity: to be with God forever. Let us not delay, for God will carry out His justice on the day He has appointed, and Jesus often called us to watch and be ready.

1 Corinthians 7:29  “The time is short…”
Acts 17:30–31  God calls all people to repentance… “He has appointed a day…”
Acts 2:38  “Repent, and let each of you be baptized… for the forgiveness of your sins…”
Mark 1:15  “Repent, and believe the good news.”
Matthew 24:42–44  “Therefore keep watch… be ready…”
Luke 12:35–40  “Let your waist be girded and your lamps burning…”

Sadly, many have turned away from the Scriptures. The Bible warns that a time will come when some will look for messages that please them and will gather “a great number of teachers” around them.

That is why we are called to remain in the Word, to obey God, and to live in a manner worthy of the Gospel—also seeking to persuade those around us.

2 Timothy 4:3–4  “they will gather around them a great number of teachers…”
John 8:31–32  “If you remain in my word…”
Colossians 1:23  “continue in the faith, established and firm…”
Philippians 1:27  “conduct yourselves in a manner worthy of the gospel…”
2 Corinthians 5:20  “We are therefore ambassadors…”

And sometimes, a “church” can begin very humbly: two people seeking God together.

Matthew 18:20  “Where two or three are gathered in my name…”

The gate is narrow: walk humbly with God

Jesus said the gate is narrow, and the road that leads to destruction is broad. Let us not allow our sins to turn us away from God. Let us obey His Word with humility, with a childlike heart: simple, without hypocrisy, but also clear-minded and wise.

Matthew 7:13–14  “Enter through the narrow gate…”
Hebrews 12:1–2  “let us throw off every weight and the sin…”
Matthew 18:3  “unless you become like little children…”
Matthew 10:16  “as innocent as doves and as wise as serpents…”

Pray, persevere, do not give up

Pray to God that He would guide you by His Word and by His Holy Spirit. Ask earnestly. Do not be discouraged. Do not give up. Even if the righteous goes through suffering, God remains faithful and delivers.

Luke 18:1  “they should always pray and not give up”
James 1:5  “If any of you lacks wisdom, let him ask God…”
Psalm 34:19  “Many are the afflictions of the righteous, but the LORD delivers him out of them all.”`,
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
    'All Bible versions used are in the public domain. Some have been partially modernized (vocabulary, grammar) while remaining strictly faithful to the original manuscripts. If you would like the Android app, please send me a request by email and I will send you a link (test version).',

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
    'The Notes and Studies pages let you memorise verses, create themed lists and build real studies by combining verses and text blocks. Everything is stored locally on your device, 100% offline, with no account and no internet connection.',
  notesHelp1Title: '1. Notes & Studies home page',
  notesHelp1Body:
    'Groups all your Notes and Studies lists. Tap a list to open its content. The “All lists” or “All studies” button at the top returns to the global view. When you come back from the Reading page, the app automatically reopens the last Notes list or Study you used and scrolls to the end so you can continue working easily.',
  notesHelp2Title: '2. Add verses from the Bible',
  notesHelp2Body:
    'From the Reading page, you can add verses either to your Notes or to your Studies using the dedicated buttons. The selected verses are saved in the list(s) or study(ies) you choose, with the reference and verse text. You can memorise the same verse in several different lists.',
  notesHelp3Title: '3. Free text blocks',
  notesHelp3Body:
    'In addition to verses, you can add free text blocks (comments, personal ideas, questions, sermon points, etc.). The “Add text block” button (at the top and bottom of an open list or study) opens a large editor area. The text is stored as a full item that you can then edit, move or delete.',
  notesHelp4Title: '4. Reorder items',
  notesHelp4Body:
    'By tapping an item (verse or text block), you open its action menu. The “Move up” and “Move down” arrows let you change the order of items in the list or study, so you can adapt the structure to your Bible study, sermon or meditation time.',
  notesHelp5Title: '5. Copy and share a whole list',
  notesHelp5Body:
    'In an open Notes list or Study, the “Share” and “Copy” buttons let you retrieve all the content: title, references, texts and note blocks. You can then paste this content into a message, a document or another tool, or for example send it to someone by SMS, WhatsApp or another messaging app.',
  notesHelp6Title: '6. Share with a The Word code',
  notesHelp6Body:
    'The “Code” button generates a compact code you can send to someone who also has the The Word app. In their app, they can use the import-by-code option to recreate exactly the same Notes list or Study (title and content) on their device. The “Code” button also lets you turn a Note into a Study, so you can transfer the entire content of a Notes list into Studies.',
  notesHelp7Title: '7. Import from a text',
  notesHelp7Body:
    'The “Import from text” button lets you paste a complete document (Word notes, email, sermon, study plan, etc.). The app splits the text into blocks (separated by blank lines) and automatically creates a list or study made up of those text blocks. This is very handy to quickly turn an existing document into Notes or a Study inside The Word.',
  notesHelp8Title: '8. Local storage and privacy',
  notesHelp8Body:
    'All your Notes and Studies are stored only on your device. The Word does not sync anything to a server and does not collect any personal data. If you delete the app or clear browsing data, your Notes lists and Studies will be deleted as well.',
  notesHelp9Title: '9. Ideas for use',
  notesHelp9Body:
    'You can use Notes to prepare sermons, follow a personal study plan, keep a prayer list, write down what God reminds you of during the day or store verses to memorise. Use Studies to build complete Bible courses (by theme, by book, for a home group, sermon series, etc.) that you can then teach or share easily.',
  notesHelp10Title: '10. Notes & Studies together',
  notesHelp10Body:
    'Do not hesitate to combine Notes and Studies: for example, keep your daily thoughts and prayers in Notes, and reserve Studies for plans you want to rework, teach or share with a group.',

  // Common
  loading: 'Loading...',
  error: 'Error loading content',
};

export default en;

