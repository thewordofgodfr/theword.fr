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
  showInOtherLangs: 'Lugha nyingine',
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
    "Tafuta mara moja maneno au vifungu katika Biblia nzima, fungua matokeo katika sehemu ya Kusoma, kisha nakili au shiriki mstari kwa mguso mmoja.",
  aboutIntro: `Kwa nini The Word?

Niliunda The Word ili niweze kusoma vitabu kadhaa vya Biblia kwa wakati mmoja bila kupoteza nilipofikia. Baada ya muda, vipengele vingine viliongezwa, lakini kusudi lilibaki lilelile: kumsaidia kila mtu kusoma, kutafakari, kukumbuka na kutenda Neno la Mungu.

Tamaa yangu

Katika ulimwengu ambamo sauti nyingi sana zinajaribu kutushawishi, tamaa yangu ni rahisi: kumhimiza kila mtu arudi moja kwa moja katika Biblia kwa moyo wa kweli na kutafuta ukweli ndani yake.

Ombi langu ni kwamba programu hii ikusaidie kugundua upendo wa Mungu, kumjua Yesu Kristo na kuelewa kile alichofanya ili kutupatanisha na Mungu.

Soma Neno lake. Lichunguze kwa makini. Mwombe Mungu akuongoze, kisha uitikie wito wake kwa imani, toba na utii.

“Mkidumu katika neno langu, mmekuwa wanafunzi wangu kweli; mtaujua ukweli, na ukweli utawaweka huru.”

Yohana 8:31-32`,
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
    "Kuhusu maandiko: Biblia zilizojumuishwa zinatumika kwa mujibu wa leseni zao husika. Ni Louis Segond 1910 pekee iliyosasishwa mwaka 2025 katika sarufi na msamiati, huku maandishi ya awali yakiheshimiwa kikamilifu.",

  // Quick slots
  quickSlotsIntro:
    "Vitufe hivi 4 vinakuwezesha kurudi mara moja kwenye sehemu unazosoma mara kwa mara na kusoma vitabu kadhaa kwa wakati mmoja: tumia 1/2/3 kwa nafasi 3 tofauti, na kioo cha kukuza kurudi kwenye kifungu cha mwisho (mstari wa nasibu au matokeo ya utafutaji).",
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
notesHelpTitle: 'Maelezo na Masomo — Mwongozo wa matumizi',

notesHelpIntro:
'Kurasa za Maelezo na Masomo hukuwezesha kuhifadhi na kupanga mistari katika orodha za mada, kisha kuongeza maandishi yako mwenyewe. Unaweza kukusanya vifungu, kuongeza mawazo na kujenga masomo ya Biblia yaliyopangwa. Maelezo na Masomo huhifadhiwa kwenye kifaa chako na yanapatikana bila akaunti.',

notesHelp1Title: '1. Unda na usimamie orodha zako',

notesHelp1Body:
'Ukurasa mkuu unaonyesha orodha zote za Maelezo au Masomo. Unaweza kuunda orodha, kuipa kichwa, kubadili jina au kuifuta. Gusa orodha ili kufungua yaliyomo. Kitufe cha “Orodha zote” au “Masomo yote” hurudisha kwenye mwonekano mkuu. Ukifungua ukurasa tena, programu hufungua orodha ya mwisho uliyotumia na kusogea karibu na kipengele chake cha mwisho.',

notesHelp2Title: '2. Ongeza mistari kutoka Biblia',

notesHelp2Body:
'Kwenye ukurasa wa Kusoma, chagua mstari mmoja au zaidi, kisha utumie kitufe cha Maelezo au Masomo. Mistari huongezwa kwenye orodha ulizochagua pamoja na marejeo na maandishi yake. Unaweza kuchagua orodha kadhaa na kuhifadhi mstari uleule katika sehemu tofauti.',

notesHelp3Title: '3. Ongeza vipande vya maandishi',

notesHelp3Body:
'Mbali na mistari, unaweza kuongeza maoni, tafakari, maswali, sala, hoja za mahubiri au maudhui mengine. Kitufe cha “Ongeza kipande cha maandishi” kinapatikana juu na chini ya orodha iliyofunguliwa. Kitufe cha + karibu na kipengele huingiza maandishi katika nafasi hiyo. Kila kipande kinaweza kuhaririwa, kuhamishwa au kufutwa.',

notesHelp4Title: '4. Tumia na kupanga upya vipengele',

notesHelp4Body:
'Fungua menyu ya kipengele ili kuona vitendo vinavyopatikana. Mstari unaweza kufunguliwa katika Kusoma, kunakiliwa au kushirikiwa. Kipande cha maandishi kinaweza kunakiliwa, kushirikiwa au kuhaririwa. Mishale ya juu na chini hubadili mpangilio, na kila kipengele kinaweza kufutwa kivyake.',

notesHelp5Title: '5. Nakili au shiriki orodha nzima',

notesHelp5Body:
'Katika menyu ya orodha ya Maelezo au Somo, vitufe vya “Nakili” na “Shiriki” huchukua maudhui yote: kichwa, marejeo ya Biblia, maandishi ya mistari na vipande binafsi. Unaweza kuyabandika kwenye ujumbe au hati, au kuyatuma kupitia programu inayofaa kwenye kifaa.',

notesHelp6Title: '6. Shiriki au hamisha kwa msimbo wa The Word',

notesHelp6Body:
'Kitufe cha “Msimbo” hunakili msimbo mfupi wenye kichwa na maudhui yote ya orodha. Mtumiaji mwingine wa The Word anaweza kuchagua “Leta msimbo” ili kuunda orodha hiyo kwenye kifaa chake. Pia unaweza kuhamisha maudhui kati ya Maelezo na Masomo kwa kunakili msimbo katika ukurasa mmoja na kuuleta katika mwingine.',

notesHelp7Title: '7. Leta hati ya maandishi',

notesHelp7Body:
'Chaguo la “Leta kutoka maandishi” hukuruhusu kubandika hati, barua pepe, mahubiri au mpango wa somo. Unaweza kuiweka katika kipande kimoja au kuigawa kiotomatiki katika vipande vinavyotenganishwa na mistari mitupu. Orodha mpya au Somo jipya huundwa kwa kichwa unachochagua.',

notesHelp8Title: '8. Hifadhi ya kifaa na nakala rudufu',

notesHelp8Body:
'Maelezo na Masomo huhifadhiwa kwenye kifaa chako na hayalandanishwi kiotomatiki na akaunti au seva. Ukiondoa programu, kuweka upya data yake au kufuta data ya kivinjari, maudhui yanaweza kupotea kabisa. Tumia Nakili, Shiriki au msimbo wa The Word kuhifadhi orodha muhimu.',

notesHelp9Title: '9. Mawazo ya matumizi',

notesHelp9Body:
'Tumia Maelezo kuhifadhi mistari ya kukariri, mawazo ya kila siku, maandalizi ya mahubiri au orodha ya sala. Tumia Masomo kuchunguza mada au kitabu, kuandaa kikundi cha nyumbani, mpango wa kufundisha au mfululizo wa ujumbe.',

notesHelp10Title: '10. Unganisha Maelezo na Masomo',

notesHelp10Body:
'Maelezo na Masomo yanaweza kutumiwa pamoja. Kusanya mistari, mawazo na sala katika Maelezo, kisha hamishia katika Masomo mambo unayotaka kuchunguza zaidi kwa kutumia msimbo wa The Word. Baadaye unaweza kuyapanga, kuyapanua na kuyashiriki.',
  // Common
  loading: "Inapakia...",
  error:
    "Hitilafu imetokea wakati wa kupakia",
};

export default sw;
