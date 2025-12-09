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

export default yo;
