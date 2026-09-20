// src/i18n/hi.ts
import type { TranslationDict } from './types';

const hi: TranslationDict = {
  // Navigation
  home: "मुखपृष्ठ",
  reading: "पाठ",
  search: "खोज",
  settings: "सेटिंग्स",
  about: "के बारे में",
  notes: "नोट्स",
  principles: "अध्ययन",

  // Home page
  randomVerse: "यादृच्छिक पद",
  newVerse: "नया पद",
  copyVerse: "पद कॉपी करें",
  verseCopied: "पद कॉपी हो गया!",
  godSpeaks: "परमेश्वर आप से बात कर रहा है",
  openJeremiah: "यिर्मयाह 23:29 खोलें",
  jeremiah23Quote:
    "“क्या मेरा वचन आग के समान नहीं है? यहोवा की यह वाणी है, और हथौड़े के समान नहीं, जो चट्टान को तोड़ डालता है?” यिर्मयाह 23:29",

  // Reading page
  selectBook: "पुस्तक चुनें",
  selectChapter: "अध्याय चुनें",
  chapter: "अध्याय",
  oldTestament: "पुराना नियम",
  newTestament: "नया नियम",

  // Reading – extras
  chooseBook: "कोई पुस्तक चुनें",
  showInOtherLangs: 'अन्य भाषाएँ',
  chooseChapter: "कोई अध्याय चुनें",
  prevChapter: "पिछला अध्याय",
  nextChapter: "अगला अध्याय",
  verseWord: "पद",
  versesSelectedSuffix: "चुने हुए पद",
  toNotes: "नोट्स पर जाएं",
  toPrinciples: "अध्ययन पर जाएं",
  copyLabel: "कॉपी",
  shareLabel: "साझा करें",
  cancel: "रद्द करें",
  close: "बंद करें",
  notesModalTitle: "सूची में जोड़ें (नोट्स)",
  notesNoList:
    "अभी तक कोई सूची नहीं है। नीचे एक सूची बनाएं।",
  notesNewListOptional:
    "नई सूची (वैकल्पिक)",
  principlesModalTitle:
    "अध्ययन में जोड़ें (अध्ययन)",
  principlesNoList:
    "अभी तक कोई अध्ययन नहीं है। नीचे एक अध्ययन बनाएं।",
  principlesNewListOptional:
    "नया अध्ययन (वैकल्पिक)",
  selectionCopied: "चयन कॉपी हो गया",
  textReadyToShare:
    "साझा करने के लिए पाठ तैयार है (कॉपी हो गया)",
  addedToList: "सूची में जोड़ा गया",
  newRandom: "नया यादृच्छिक",
  swipeLabel: "स्वाइप करें",
  searchSlotLabel: "खोज",
  searchSlotEmpty: "खोज (खाली)",
  memorySlotLabel: "स्लॉट",
  emptySlotSuffix: "(खाली)",
  untitledList: "(शीर्षक रहित)",

  // Short label “Copied”
  copiedShort: "कॉपी हो गया",

  // Search page
  searchTitle: "बाइबल खोज",
  searchPlaceholder: "अपनी खोज लिखें",
  searchMinChars:
    "कम से कम 2 अक्षर लिखें।",
  searchSearching: "खोज की जा रही है…",
  searchResults: "परिणाम",
  searchExpandAll: "सब खोलें",
  searchCollapseAll: "सब बंद करें",
  searchNoResults: "कोई पद नहीं मिला।",
  searchClear: "साफ करें",
  searchOpenInReading: "पाठ में खोलें",

  // Notes page
  notesPage: {
    create: "सूची बनाएं",
    placeholder: "सूची का शीर्षक…",
    empty: "अभी तक कोई सूची नहीं है।",
    items: "तत्व",
    backAll: "← सभी सूचियाँ",
    addTextBlock: "पाठ ब्लॉक जोड़ें",
    editTextBlock: "ब्लॉक संपादित करें",
    deleteItem: "हटाएँ",
    moveUp: "ऊपर ले जाएँ",
    moveDown: "नीचे ले जाएँ",
    open: "खोलें",
    confirmDeleteItem:
      "क्या यह तत्व हटाना है?",
    newTextPlaceholder: "आपका पाठ…",

    shareCode: "कोड",
    importCode: "कोड आयात करें",
    importPrompt:
      "यहाँ TheWord साझा-कोड चिपकाएँ:",
    importError: "अमान्य कोड।",
    importSuccess:
      "सूची सफलतापूर्वक आयात की गई ✅",
    shareCodeCopied:
      "कोड क्लिपबोर्ड में कॉपी हो गया ✅",

    importTextButton: "पाठ → सूची",
    importTextTitlePlaceholder:
      "नई सूची का शीर्षक",
    importTextDefaultTitle: "पाठ आयात",
    importTextBodyPlaceholder:
      "यहाँ अपना पाठ चिपकाएँ…",
    importTextNoBody:
      "कृपया आयात करने के लिए कुछ पाठ चिपकाएँ।",
    importTextNoBlock:
      "कोई ब्लॉक नहीं मिला (यदि आप ब्लॉकों में बाँटना चाहते हैं तो खाली पंक्तियाँ छोड़ें)।",
    importTextSplitLabel:
      "ब्लॉकों में विभाजित करें (कम से कम एक खाली पंक्ति से अलग)",
    importTextInfo:
      "हर ब्लॉक सूची में एक तत्व बन जाएगा।",
    importTextCreate: "सूची बनाएं",

    duplicateTitle:
      "इसी शीर्षक वाली एक सूची पहले से मौजूद है।",
    confirmDeleteList:
      "क्या यह सूची हटानी है?",
    emptyList: "खाली सूची।",

    importFromTextTitle:
      "पाठ से आयात करें",
    documentContent:
      "दस्तावेज़ की सामग्री",
    renameList: "नाम बदलें",
  },

  // Principles page
  principlesPage: {
    create: "अध्ययन बनाएं",
    placeholder: "अध्ययन का शीर्षक…",
    empty: "अभी तक कोई अध्ययन नहीं है।",
    items: "तत्व",
    backAll: "← सभी अध्ययन",
    addTextBlock: "पाठ ब्लॉक जोड़ें",
    editTextBlock: "ब्लॉक संपादित करें",
    deleteItem: "हटाएँ",
    moveUp: "ऊपर ले जाएँ",
    moveDown: "नीचे ले जाएँ",
    open: "खोलें",
    openReading: "पाठ खोलें",
    confirmDeleteItem:
      "क्या यह तत्व हटाना है?",
    newTextPlaceholder: "आपका पाठ…",

    shareCode: "कोड",
    importCode: "कोड आयात करें",
    importPrompt:
      "यहाँ TheWord साझा-कोड (नोट या अध्ययन) चिपकाएँ:",
    importError: "अमान्य कोड।",
    importSuccess:
      "अध्ययन सफलतापूर्वक आयात किया गया ✅",
    shareCodeCopied:
      "कोड क्लिपबोर्ड में कॉपी हो गया ✅",

    importTextButton: "पाठ → अध्ययन",
    importTextTitlePlaceholder:
      "नए अध्ययन का शीर्षक",
    importTextDefaultTitle: "पाठ आयात",
    importTextBodyPlaceholder:
      "यहाँ अपना पाठ चिपकाएँ…",
    importTextNoBody:
      "कृपया आयात करने के लिए कुछ पाठ चिपकाएँ।",
    importTextNoBlock:
      "कोई ब्लॉक नहीं मिला (यदि आप ब्लॉकों में बाँटना चाहते हैं तो खाली पंक्तियाँ छोड़ें)।",
    importTextSplitLabel:
      "ब्लॉकों में विभाजित करें (कम से कम एक खाली पंक्ति से अलग)",
    importTextInfo:
      "हर ब्लॉक अध्ययन में एक तत्व बन जाएगा.",
    importTextCreate: "अध्ययन बनाएं",

    duplicateTitle:
      "इसी शीर्षक वाला एक अध्ययन पहले से मौजूद है.",
    confirmDeleteList:
      "क्या यह अध्ययन हटाना है?",
    emptyList: "खाली अध्ययन।",

    importFromTextTitle:
      "पाठ से आयात करें",
    documentContent:
      "दस्तावेज़ की सामग्री",
    renameList: "नाम बदलें",
    share: "साझा करें",
    copy: "कॉपी करें",
    deleteList: "हटाएँ",

    shareStudyTitle: "अध्ययन",
    shareItemTitle: "पद",
  },

  // Settings
  appearance: "दिखावट",
  lightMode: "हल्का मोड",
  darkMode: "गहरा मोड",
  fontSize: "फ़ॉन्ट आकार",
  language: "भाषा",
  french: "फ़्रेंच",
  english: "अंग्रेज़ी",
  fontSizeXLLabel:
    "कम दृष्टि मोड (XL)",
  fontSizePreview:
    "चुने हुए फ़ॉन्ट आकार का पूर्वावलोकन।",
  updates: "अपडेट्स",
  updatesDescription:
    "देखें कि कोई नया संस्करण उपलब्ध है या नहीं, और उसे लागू करें।",
  applyUpdate: "अपडेट लागू करें",
  checkUpdatesButton:
    "अपडेट्स जाँचें",
  updatesChecking: "जाँच हो रही है…",
  updatesUpToDate:
    "आपका ऐप नवीनतम संस्करण पर है।",
  updatesReady:
    "नया संस्करण तैयार है। «अपडेट लागू करें» पर टैप करें।",
  updatesUnavailable:
    "स्वचालित अपडेट उपलब्ध नहीं (Service Worker नहीं मिला)।",
  updatesError:
    "जाँच के दौरान त्रुटि हुई। कृपया फिर से प्रयास करें।",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word आपको यादृच्छिक पदों और पूरी बाइबल पढ़ने के माध्यम से परमेश्वर का वचन खोजने में मदद करता है।",
  aboutIntro: `The Word क्यों?

मैंने The Word इसलिए बनाया ताकि बाइबल की कई पुस्तकों को साथ-साथ पढ़ सकूँ और अपनी पढ़ाई का क्रम न खोऊँ। समय के साथ इसमें दूसरी सुविधाएँ भी जोड़ी गईं, लेकिन उद्देश्य हमेशा एक ही रहा: हर व्यक्ति को परमेश्वर का वचन पढ़ने, उस पर मनन करने, उसे याद रखने और जीवन में लागू करने में सहायता देना।

मेरी अभिलाषा

ऐसे संसार में, जहाँ अनेक आवाज़ें हमें प्रभावित करने का प्रयास करती हैं, मेरी अभिलाषा सरल है: प्रत्येक व्यक्ति को सच्चे हृदय से सीधे बाइबल की ओर लौटने और उसमें सत्य खोजने के लिए प्रोत्साहित करना।

मेरी प्रार्थना है कि यह ऐप आपको परमेश्वर के प्रेम को जानने, यीशु मसीह को पहचानने और यह समझने में सहायता करे कि हमें परमेश्वर से मिलाने के लिए उन्होंने क्या किया।

उसका वचन पढ़िए। उसे ध्यान से परखिए। परमेश्वर से मार्गदर्शन माँगिए, फिर विश्वास, पश्चाताप और आज्ञाकारिता के साथ उसकी बुलाहट का उत्तर दीजिए।

“यदि तुम मेरे वचन में बने रहोगे, तो सचमुच मेरे चेले ठहरोगे; तुम सत्य को जानोगे, और सत्य तुम्हें स्वतंत्र करेगा।”

यूहन्ना 8:31-32”`,
  bibleVersions: "बाइबल संस्करण",
  frenchVersion:
    "फ़्रेंच: Louis Segond 1910 (LSG) – संशोधन 2025 – पब्लिक डोमेन",
  englishVersion:
    "अंग्रेज़ी: King James Version (KJV) – पब्लिक डोमेन",
  frenchVersionDetails:
    "फ़्रेंच बाइबल का संदर्भ-अनुवाद, 1910 में Louis Segond द्वारा अनूदित और 2025 में अद्यतन (शब्दावली और व्याकरण का आधुनिकीकरण, पांडुलिपियों के प्रति निष्ठावान)।",
  englishVersionDetails:
    "क्लासिक अंग्रेज़ी संस्करण (KJV), 1611 में प्रकाशित, 1769 में संशोधित और 2025 में थोड़ा अद्यतन।",
  otherLanguagesNote:
    "अन्य भाषाएँ (जर्मन, पुर्तगाली आदि) तैयार की जा रही हैं। इस बीच, जहाँ अनुवाद उपलब्ध नहीं है, वहाँ इंटरफ़ेस अंग्रेज़ी में दिखाया जाता है।",
  randomFeature: "यादृच्छिक फ़ीचर",
  randomFeatureDesc:
    "हमारा यादृच्छिक पद-जनरेटर 31,000 से अधिक बाइबल-पदों में से चुनकर आपको हर दिन प्रेरणा देता है।",
  musicLink: "सृष्टिकर्ता का संगीत",
  versesLabel: "पद",
  booksLabel: "पुस्तकें",
  readingShortcuts: "पाठ शॉर्टकट्स",
  notesIntro:
    "अपनी पसंदीदा आयतों और विचारों को विषयगत सूचियों में व्यवस्थित करें।",
  notesPoint1:
    "पद या स्वतंत्र पाठ-ब्लॉक जोड़ें।",
  notesPoint2:
    "मेनू खोलने के लिए किसी तत्व पर टैप करें (पाठ में खोलें, ऊपर/नीचे ले जाएँ, हटाएँ…).",
  notesPoint3:
    "सूचियों का नाम बदलें, कॉपी करें और साझा करें।",
  createdWithLove:
    "परमेश्वर के वचन को फैलाने के लिए प्रेम के साथ बनाया गया",
  versionsFootnote:
    "सभी प्रयुक्त बाइबल संस्करण पब्लिक डोमेन में हैं। कुछ को (शब्दावली, व्याकरण) आंशिक रूप से आधुनिक बनाया गया है, फिर भी वे मूल पांडुलिपियों के प्रति पूर्ण निष्ठा रखते हैं।, मूल पांडुलिपियों के कठोर सम्मान के साथ। यदि आप Android ऐप चाहते हैं, कृपया मुझे ई-मेल द्वारा अनुरोध भेजें और मैं आपको एक लिंक भेज दूँगा (टेस्ट संस्करण)।",

  // Quick slots
  quickSlotsIntro:
    "ये 4 बटन आपको अपनी बार-बार पढ़ी जाने वाली जगहों पर तुरंत लौटने और कई पुस्तकों को साथ-साथ पढ़ने की सुविधा देते हैं: 3 अलग-अलग स्थानों के लिए 1/2/3 का उपयोग करें, और अंतिम अंश पर लौटने के लिए आवर्धक काँच का उपयोग करें (यादृच्छिक पद या खोज परिणाम)।",
  quickSlotsIllustrationLabel:
    "शॉर्टकट्स की रूपरेखा",
  quickSlotLastPassageTooltip:
    "अंतिम खंड",
  quickSlot1ActiveTooltip:
    "शॉर्टकट 1 (सक्रिय)",
  quickSlot2Tooltip: "शॉर्टकट 2",
  quickSlot3Tooltip: "शॉर्टकट 3",

  // Common
  loading: "लोड हो रहा है...",
  error: "लोड करते समय त्रुटि हुई",
};

export default hi;
