// src/i18n/yo.ts
import type { TranslationDict } from './types';

const yo: TranslationDict = {
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
  showInOtherLangs: 'Awọn ede miiran',
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
    "Ṣàwárí àwọn ọ̀rọ̀ tàbí gbólóhùn lẹ́sẹ̀kẹsẹ̀ nínú gbogbo Bíbélì, ṣí àbájáde náà ní abala Kíkà, kí o sì da ẹsẹ kan kọ tàbí pín in pẹ̀lú ìfọwọ́kan kan ṣoṣo.",
  aboutIntro: `Kí nìdí The Word?

Mo dá The Word sílẹ̀ kí n lè máa ka ọ̀pọ̀ ìwé inú Bíbélì lẹ́gbẹ̀ẹ́ ara wọn láì pàdánù ibi tí mo dé. Bí àkókò ti ń lọ, a fi àwọn iṣẹ́ míì kún un, ṣùgbọ́n ète náà kò yí padà: láti ran gbogbo ènìyàn lọ́wọ́ láti ka Ọ̀rọ̀ Ọlọ́run, ronú lé e, rántí rẹ̀, kí wọ́n sì fi í sílò.

Ìfẹ́ ọkàn mi

Nínú ayé tí ọ̀pọ̀ ohùn ti ń gbìyànjú láti ní ipa lórí wa, ìfẹ́ ọkàn mi rọrùn: láti gba gbogbo ènìyàn níyànjú láti fi ọkàn òtítọ́ padà tààrà sí Bíbélì, kí wọ́n sì wá òtítọ́ nínú rẹ̀.

Àdúrà mi ni pé kí ètò yìí ràn yín lọ́wọ́ láti mọ ìfẹ́ Ọlọ́run, láti mọ Jésù Kristi àti láti lóye ohun tí ó ṣe láti mú wa padà bá Ọlọ́run.

Ẹ ka Ọ̀rọ̀ rẹ̀. Ẹ ṣàyẹ̀wò rẹ̀ dáadáa. Ẹ bẹ Ọlọ́run pé kí ó tọ́ yín sọ́nà, lẹ́yìn náà kí ẹ dáhùn sí ìpè rẹ̀ pẹ̀lú ìgbàgbọ́, ìrònúpìwàdà àti ìgbọràn.

“Bí ẹ bá dúró nínú ọ̀rọ̀ mi, ọmọ-ẹ̀yìn mi ni yín nítòótọ́; ẹ ó mọ òtítọ́, òtítọ́ náà yóò sì sọ yín di òmìnira.”

Jòhánù 8:31-32`,
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
    "Nípa àwọn ọ̀rọ̀ inú Bíbélì: a ń lo àwọn ẹ̀dà Bíbélì tí ó wà nínú ètò yìí ní ìbámu pẹ̀lú ìwé-àṣẹ ọ̀kọ̀ọ̀kan wọn. Louis Segond 1910 nìkan ni a mú bá èdè òde òní mu ní ọdún 2025 nípa gírámà àti àwọn ọ̀rọ̀, láì yà kúrò ní ìtumọ̀ àwọn ìwé àfọwọ́kọ ìpilẹ̀ṣẹ̀.",

  // Quick slots
  quickSlotsIntro:
    "Àwọn bọ́tìnì mẹ́rin yìí jẹ́ kí o lè padà lẹ́sẹ̀kẹsẹ̀ sí àwọn ibi tí o máa ń kà lọ́pọ̀ ìgbà, kí o sì lè ka ọ̀pọ̀ ìwé ní àkókò kan: lo 1/2/3 fún ibi ìpamọ́ mẹ́ta ọ̀tọ̀ọ̀tọ̀, kí o sì lo gíláàsì ìwádìí láti padà sí apá tí o kà kẹ́yìn (ẹsẹ̀ àìròtẹ́lẹ̀ tàbí àbájáde ìwádìí).",
  quickSlotsIllustrationLabel:
    "Àpẹẹrẹ àwọn ọ̀nà kíákíá",
  quickSlotLastPassageTooltip:
    "Apá tí o gbà gbẹ́yìn",
  quickSlot1ActiveTooltip:
    "Ọ̀nà kíákíá 1 (nṣiṣẹ́)",
  quickSlot2Tooltip: "Ọ̀nà kíákíá 2",
  quickSlot3Tooltip: "Ọ̀nà kíákíá 3",
notesHelpTitle: 'Àwọn Àkọsílẹ̀ àti Ìkẹ́kọ̀ọ́ — Ìtọ́sọ́nà lílò',

notesHelpIntro:
'Àwọn ojúewé Àkọsílẹ̀ àti Ìkẹ́kọ̀ọ́ ń jẹ́ kí o tọ́jú àti ṣètò àwọn ẹsẹ Bíbélì sínú àkójọ gẹ́gẹ́ bí kókó, kí o sì fi àwọn ìwé tirẹ̀ kún wọn. O lè kó àwọn ẹsẹ jọ, fi èrò rẹ kún un, kí o sì dá ìkẹ́kọ̀ọ́ Bíbélì tí a ṣètò sílẹ̀. Gbogbo rẹ̀ ni a fi pamọ́ sínú ẹ̀rọ rẹ láì nílò àkọọ́lẹ̀.',

notesHelp1Title: '1. Ṣẹ̀dá àti ṣàkóso àwọn àkójọ rẹ',

notesHelp1Body:
'Ojúewé àkọ́kọ́ ń fi gbogbo àkójọ Àkọsílẹ̀ tàbí Ìkẹ́kọ̀ọ́ hàn. O lè ṣẹ̀dá àkójọ, fún un ní àkọlé, tún orúkọ rẹ ṣe tàbí pa á rẹ́. Fọwọ́ kan àkójọ láti ṣí i. Bọ́tìnì “Gbogbo àkójọ” tàbí “Gbogbo ìkẹ́kọ̀ọ́” yóò dá ọ padà sí ojú gbogbo. Nígbà tí o bá tún ṣí ojúewé náà, ètò yóò ṣí àkójọ tí o lò kẹ́yìn, yóò sì lọ sí ẹ̀gbẹ́ ohun tó kẹ́yìn.',

notesHelp2Title: '2. Fi àwọn ẹsẹ Bíbélì kún un',

notesHelp2Body:
'Lórí ojúewé Kíkà, yan ẹsẹ kan tàbí púpọ̀, lẹ́yìn náà lo bọ́tìnì Àkọsílẹ̀ tàbí Ìkẹ́kọ̀ọ́. A ó fi àwọn ẹsẹ náà, ìtọ́kasí àti ọ̀rọ̀ wọn sínú àwọn àkójọ tí o yàn. O lè yan ọ̀pọ̀ àkójọ, kí o sì tọ́jú ẹsẹ kan náà sí ibi ọ̀tọ̀ọ̀tọ̀.',

notesHelp3Title: '3. Fi àwọn ìpín ọ̀rọ̀ kún un',

notesHelp3Body:
'Yàtọ̀ sí àwọn ẹsẹ, o lè fi àlàyé, èrò, ìbéèrè, àdúrà, kókó ìwàásù tàbí ohun mìíràn kún un. Bọ́tìnì “Fi ìpín ọ̀rọ̀ kún un” wà lókè àti ìsàlẹ̀ àkójọ tí a ṣí. Bọ́tìnì + lẹ́gbẹ̀ẹ́ ohun kan yóò fi ìpín sí ibẹ̀ gan-an. O lè ṣàtúnṣe, gbe tàbí pa ìpín kọ̀ọ̀kan rẹ́.',

notesHelp4Title: '4. Lo àti tún àwọn ohun ṣètò',

notesHelp4Body:
'Ṣí àkojọ aṣayan ohun kan láti rí àwọn iṣẹ́ tó wà. O lè ṣí ẹsẹ kan ní Kíkà, da a kọ tàbí pín in. O lè da ìpín ọ̀rọ̀ kọ, pín in tàbí ṣàtúnṣe rẹ. Ọfà òkè àti ìsàlẹ̀ ń yí bí àwọn ohun ṣe tẹ̀ lé ara wọn padà. O tún lè pa ohun kọ̀ọ̀kan rẹ́.',

notesHelp5Title: '5. Da gbogbo àkójọ kọ tàbí pín in',

notesHelp5Body:
'Nínú àkojọ aṣayan Àkọsílẹ̀ tàbí Ìkẹ́kọ̀ọ́, “Dà kọ” àti “Pín” ń gba gbogbo àkóónú: àkọlé, ìtọ́kasí Bíbélì, ọ̀rọ̀ àwọn ẹsẹ àti àwọn ìpín tirẹ̀. O lè lẹ̀ ẹ́ sínú ìfiránṣẹ́ tàbí ìwé, tàbí fi ránṣẹ́ pẹ̀lú ètò míì tó bá a ṣiṣẹ́.',

notesHelp6Title: '6. Pín tàbí gbe lọ pẹ̀lú kóòdù The Word',

notesHelp6Body:
'Bọ́tìnì “Kóòdù” ń da kóòdù kékeré tó ní àkọlé àti gbogbo àkóónú àkójọ kọ. Ẹlòmíràn tó ń lo The Word lè yan “Gbé kóòdù wọlé” láti dá àkójọ náà sílẹ̀ lórí ẹ̀rọ rẹ. O tún lè gbe àkóónú láàárín Àkọsílẹ̀ àti Ìkẹ́kọ̀ọ́ nípa dídà kóòdù kọ ní ojúewé kan àti gbígbé e wọlé ní èkejì.',

notesHelp7Title: '7. Gbé ìwé ọ̀rọ̀ wọlé',

notesHelp7Body:
'“Gbé wọlé láti inú ọ̀rọ̀” ń jẹ́ kí o lẹ àkóónú ìwé, ímeèlì, ìwàásù tàbí ètò ìkẹ́kọ̀ọ́. O lè pa á mọ́ gẹ́gẹ́ bí ìpín kan tàbí jẹ́ kí ètò pín in sí ọ̀pọ̀ ìpín níbi àwọn ìlà òfìfo. A ó ṣẹ̀dá Àkọsílẹ̀ tàbí Ìkẹ́kọ̀ọ́ tuntun pẹ̀lú àkọlé tí o yàn.',

notesHelp8Title: '8. Ìfipamọ́ inú ẹ̀rọ àti àdàkọ ààbò',

notesHelp8Body:
'Àwọn Àkọsílẹ̀ àti Ìkẹ́kọ̀ọ́ wà nínú ẹ̀rọ rẹ, wọn kì í sì í ṣiṣẹ́pọ̀ fúnra wọn pẹ̀lú àkọọ́lẹ̀ tàbí olupin. Bí o bá yọ ètò náà, tún dátà rẹ̀ ṣe tàbí pa dátà aṣàwákiri rẹ́, àkóónú lè sọnù pátápátá. Lo Dà kọ, Pín tàbí kóòdù The Word láti dáàbò bo àkójọ pàtàkì.',

notesHelp9Title: '9. Àwọn èrò fún lílò wọn',

notesHelp9Body:
'Lo Àkọsílẹ̀ fún àwọn ẹsẹ tí o fẹ́ há sórí, èrò ojoojúmọ́, ìmúrasílẹ̀ ìwàásù tàbí àkójọ àdúrà. Lo Ìkẹ́kọ̀ọ́ fún ṣíṣàyẹ̀wò kókó tàbí ìwé Bíbélì, ẹgbẹ́ ilé, ètò ìkọ́ni tàbí ọ̀wọ́ ìfiránṣẹ́.',

notesHelp10Title: '10. Darapọ̀ Àkọsílẹ̀ àti Ìkẹ́kọ̀ọ́',

notesHelp10Body:
'O lè lo Àkọsílẹ̀ àti Ìkẹ́kọ̀ọ́ pọ̀. Kó àwọn ẹsẹ, èrò àti àdúrà jọ sínú Àkọsílẹ̀, lẹ́yìn náà gbe ohun tí o fẹ́ jinlẹ̀ sí Ìkẹ́kọ̀ọ́ pẹ̀lú kóòdù The Word. O lè tún wọn ṣètò, fi kún wọn, kí o sì pín wọn.',
  // Common
  loading: "Ṣíṣí…",
  error: "Àsìse nígbà títẹ̀jáde"
};

export default yo;
