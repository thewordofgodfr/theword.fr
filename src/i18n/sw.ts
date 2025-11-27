// src/i18n/sw.ts
import type { TranslationDict } from './types';

const sw: TranslationDict = {
  // Navigation
  home: "Mwanzo",
  reading: "Usomaji",
  search: "Utafutaji",
  settings: "Mipangilio",
  about: "Kuhusu",
  notes: "Dondoo",
  principles: "Masomo",

  // Home page
  randomVerse: "Aya ya nasibu",
  newVerse: "Aya mpya",
  copyVerse: "Nakili aya",
  verseCopied: "Aya imenakiliwa!",
  godSpeaks: "Mungu anazungumza nawe",
  openJeremiah: "Fungua Yeremia 23:29",
  jeremiah23Quote:
    "“Je, neno langu si kama moto? asema Bwana, na kama nyundo iivunjayo mwamba?” Yeremia 23:29",

  // Reading page
  selectBook: "Chagua kitabu",
  selectChapter: "Chagua sura",
  chapter: "Sura",
  oldTestament: "Agano la Kale",
  newTestament: "Agano Jipya",

  // Reading – extras
  chooseBook: "Chagua kitabu",
  chooseChapter: "Chagua sura",
  prevChapter: "Sura iliyotangulia",
  nextChapter: "Sura inayofuata",
  verseWord: "aya",
  versesSelectedSuffix:
    "aya zilizochaguliwa",
  toNotes: "Kwenda Dondoo",
  toPrinciples: "Kwenda Masomo",
  copyLabel: "Nakili",
  shareLabel: "Shiriki",
  cancel: "Ghairi",
  close: "Funga",
  notesModalTitle:
    "Ongeza kwenye orodha (Dondoo)",
  notesNoList:
    "Bado hakuna orodha. Unda moja hapa chini.",
  notesNewListOptional:
    "Orodha mpya (hiari)",
  principlesModalTitle:
    "Ongeza kwenye somo (Masomo)",
  principlesNoList:
    "Bado hakuna somo. Unda moja hapa chini.",
  principlesNewListOptional:
    "Somo jipya (hiari)",
  selectionCopied:
    "Uteuzi umenakiliwa",
  textReadyToShare:
    "Maandishi yako tayari kushirikiwa (yamenakiliwa)",
  addedToList: "Imeongezwa kwenye orodha",
  newRandom: "Aya ya nasibu mpya",
  swipeLabel: "Telezesha",
  searchSlotLabel: "Tafuta",
  searchSlotEmpty: "Tafuta (tupu)",
  memorySlotLabel: "Slot",
  emptySlotSuffix: "(tupu)",
  untitledList: "(bila kichwa)",

  // Short label “Copied”
  copiedShort: "Imenakiliwa",

  // Search page
  searchTitle: "Utafutaji wa Biblia",
  searchPlaceholder:
    "Andika utafutaji wako",
  searchMinChars:
    "Andika angalau herufi 2.",
  searchSearching: "Inatafuta…",
  searchResults: "Matokeo",
  searchExpandAll: "Fungua yote",
  searchCollapseAll: "Funga yote",
  searchNoResults:
    "Hakuna aya zilizopatikana.",
  searchClear: "Futa",
  searchOpenInReading:
    "Fungua katika Usomaji",

  // Notes page
  notesPage: {
    create: "Unda orodha",
    placeholder: "Kichwa cha orodha…",
    empty: "Bado hakuna orodha.",
    items: "vipengee",
    backAll: "← Orodha zote",
    addTextBlock:
      "Ongeza kifungu cha maandishi",
    editTextBlock: "Hariri kifungu",
    deleteItem: "Futa",
    moveUp: "Hamisha juu",
    moveDown: "Hamisha chini",
    open: "Fungua",
    confirmDeleteItem:
      "Ungependa kufuta kipengee hiki?",
    newTextPlaceholder:
      "Andika maandishi yako…",

    shareCode: "Msimbo",
    importCode: "Ingiza msimbo",
    importPrompt:
      "Bandika hapa msimbo wa kushirikiana wa TheWord:",
    importError: "Msimbo si sahihi.",
    importSuccess:
      "Orodha imeingizwa kwa mafanikio ✅",
    shareCodeCopied:
      "Msimbo umenakiliwa kwenye ubao wa kunakili ✅",

    importTextButton: "Maandishi → Orodha",
    importTextTitlePlaceholder:
      "Kichwa cha orodha mpya",
    importTextDefaultTitle:
      "Ingiza maandishi",
    importTextBodyPlaceholder:
      "Bandika maandishi yako hapa…",
    importTextNoBody:
      "Tafadhali bandika maandishi ya kuingizwa.",
    importTextNoBlock:
      "Hakuna vifungu vilivyopatikana (acha mistari tupu ukitaka kugawanya katika vifungu).",
    importTextSplitLabel:
      "Gawanya katika vifungu (vimetenganishwa angalau na mstari mmoja tupu)",
    importTextInfo:
      "Kila kifungu kitakuwa kipengee katika orodha.",
    importTextCreate: "Unda orodha",

    duplicateTitle:
      "Tayari kuna orodha yenye kichwa hicho.",
    confirmDeleteList:
      "Ungependa kufuta orodha hii?",
    emptyList: "Orodha tupu.",

    importFromTextTitle:
      "Ingiza kutoka kwa maandishi",
    documentContent:
      "Yaliyomo kwenye hati",
    renameList: "Badili kichwa",
  },

  // Principles page
  principlesPage: {
    create: "Unda somo",
    placeholder: "Kichwa cha somo…",
    empty: "Bado hakuna somo.",
    items: "vipengee",
    backAll: "← Masomo yote",
    addTextBlock:
      "Ongeza kifungu cha maandishi",
    editTextBlock: "Hariri kifungu",
    deleteItem: "Futa",
    moveUp: "Hamisha juu",
    moveDown: "Hamisha chini",
    open: "Fungua",
    openReading: "Fungua Usomaji",
    confirmDeleteItem:
      "Ungependa kufuta kipengee hiki?",
    newTextPlaceholder:
      "Andika maandishi yako…",

    shareCode: "Msimbo",
    importCode: "Ingiza msimbo",
    importPrompt:
      "Bandika hapa msimbo wa kushirikiana wa TheWord (dondoo au somo):",
    importError: "Msimbo si sahihi.",
    importSuccess:
      "Somo limeingizwa kwa mafanikio ✅",
    shareCodeCopied:
      "Msimbo umenakiliwa kwenye ubao wa kunakili ✅",

    importTextButton: "Maandishi → Somo",
    importTextTitlePlaceholder:
      "Kichwa cha somo jipya",
    importTextDefaultTitle:
      "Ingiza maandishi",
    importTextBodyPlaceholder:
      "Bandika maandishi yako hapa…",
    importTextNoBody:
      "Tafadhali bandika maandishi ya kuingizwa.",
    importTextNoBlock:
      "Hakuna vifungu vilivyopatikana (acha mistari tupu ukitaka kugawanya katika vifungu).",
    importTextSplitLabel:
      "Gawanya katika vifungu (vimetenganishwa angalau na mstari mmoja tupu)",
    importTextInfo:
      "Kila kifungu kitakuwa kipengee katika somo.",
    importTextCreate: "Unda somo",

    duplicateTitle:
      "Tayari kuna somo lenye kichwa hicho.",
    confirmDeleteList:
      "Ungependa kufuta somo hili?",
    emptyList: "Somo tupu.",

    importFromTextTitle:
      "Ingiza kutoka kwa maandishi",
    documentContent:
      "Yaliyomo kwenye hati",
    renameList: "Badili kichwa",
    share: "Shiriki",
    copy: "Nakili",
    deleteList: "Futa",

    shareStudyTitle: "Somo",
    shareItemTitle: "Aya",
  },

  // Settings
  appearance: "Mwonekano",
  lightMode: "Hali ya mwanga",
  darkMode: "Hali ya giza",
  fontSize: "Ukubwa wa herufi",
  language: "Lugha",
  french: "Kifaransa",
  english: "Kiingereza",
  fontSizeXLLabel:
    "Hali ya herufi kubwa (XL)",
  fontSizePreview:
    "Muonekano wa ukubwa wa herufi uliyochagua.",
  updates: "Sasisho",
  updatesDescription:
    "Kagua kama kuna toleo jipya na ulitumie.",
  applyUpdate: "Tumia sasisho",
  checkUpdatesButton:
    "Kagua sasisho",
  updatesChecking: "Inakagua…",
  updatesUpToDate:
    "Programu yako iko katika toleo la hivi karibuni.",
  updatesReady:
    "Toleo jipya liko tayari. Gonga “Tumia sasisho”.",
  updatesUnavailable:
    "Sasisho la kiotomatiki halipatikani (Service Worker haijapatikana).",
  updatesError:
    "Hitilafu imetokea wakati wa kukagua. Jaribu tena.",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word hukusaidia kugundua Neno la Mungu kupitia aya za nasibu na usomaji kamili wa Biblia.",
  aboutIntro:
    "TheWord: usomaji wa Biblia bila mtandao, utafutaji wa haraka, dondoo za mada, kushiriki kwa kubofya mara moja. Unaweza pia kutumia TheWord kwenye wavuti: www.theword.fr",
  bibleVersions: "Toleo za Biblia",
  frenchVersion:
    "Kifaransa: Louis Segond 1910 (LSG) – Marekebisho 2025 – Eneo la umma",
  englishVersion:
    "Kiingereza: King James Version (KJV) – Eneo la umma",
  frenchVersionDetails:
    "Tafsiri ya marejeo ya Biblia kwa Kifaransa, iliyotafsiriwa na Louis Segond mwaka 1910 na kurekebishwa mwaka 2025 (kusasishwa kwa msamiati na sarufi, ikiwa mwaminifu kwa maandiko asili).",
  englishVersionDetails:
    "Toleo la kale la Biblia kwa Kiingereza (KJV), lililochapishwa 1611, likarekebishwa 1769 na kusasishwa kidogo 2025.",
  otherLanguagesNote:
    "Lugha nyingine (Kijerumani, Kireno, nk.) ziko katika maandalizi. Kwa sasa, kiolesura hutumia Kiingereza pale ambapo tafsiri haijapatikana bado.",
  randomFeature: "Kipengele cha nasibu",
  randomFeatureDesc:
    "Kizalishaji chetu cha aya za nasibu huchagua kutoka kwenye zaidi ya aya 31,000 za Biblia ili kukupa msukumo wa kila siku.",
  musicLink: "Muziki wa Muumba",
  versesLabel: "Aya",
  booksLabel: "Vitabu",
  readingShortcuts:
    "Njia za mkato za usomaji",
  notesIntro:
    "Panga vifungu unavyovipenda na mawazo yako katika orodha za mada.",
  notesPoint1:
    "Ongeza aya au vifungu vya maandishi ya bure.",
  notesPoint2:
    "Gonga kipengee ili kufungua menyu (Fungua katika Usomaji, hamisha juu/chini, futa…).",
  notesPoint3:
    "Badili majina ya orodha, nakili na ushiriki.",
  createdWithLove:
    "Imetengenezwa kwa upendo ili kueneza Neno la Mungu",
  versionsFootnote:
    "Toleo zote za Biblia zinazotumika ziko katika eneo la umma. Baadhi zimesasishwa kidogo (msamiati, sarufi) huku zikiendelea kuwa waaminifu kabisa kwa maandiko asili.",

  // Quick slots
  quickSlotsIntro:
    "Vitufe hivi 4, vilivyo upande wa kulia wa kiteua Kitabu/Sura, vinakuruhusu kurudi mara moja kwenye usomaji unaourudia mara nyingi ili usome vitabu kadhaa kwa wakati mmoja: tumia 1/2/3 kwa sehemu tatu, na kioo cha kukuza kurudi kwenye sehemu ya mwisho (aya ya nasibu au matokeo ya utafutaji).",
  quickSlotsIllustrationLabel:
    "Mchoro wa njia za mkato",
  quickSlotLastPassageTooltip:
    "Sehemu ya mwisho",
  quickSlot1ActiveTooltip:
    "Njia ya mkato 1 (inayotumika)",
  quickSlot2Tooltip:
    "Njia ya mkato 2",
  quickSlot3Tooltip:
    "Njia ya mkato 3",

  // Common
  loading: "Inapakia...",
  error:
    "Hitilafu imetokea wakati wa kupakia",
};

export default sw;
