// src/i18n/ar.ts
import type { TranslationDict } from './types';

const ar: TranslationDict = {
  // Navigation
  home: "الصفحة الرئيسية",
  reading: "القراءة",
  search: "البحث",
  settings: "الإعدادات",
  about: "حول التطبيق",
  notes: "ملاحظات",
  principles: "دراسات",

  // Home page
  randomVerse: "آية عشوائية",
  newVerse: "آية جديدة",
  copyVerse: "نسخ الآية",
  verseCopied: "تم نسخ الآية!",
  godSpeaks: "الله يتكلم معك",
  openJeremiah: "افتح إرميا 23:29",
  jeremiah23Quote:
    "«أَلَيْسَ كَلاَمِي كَنَارٍ، يَقُولُ الرَّبُّ، وَكَمِطْرَقَةٍ تُحَطِّمُ الصَّخْرَ؟» إرميا 23:29",

  // Reading page
  selectBook: "اختر سفراً",
  selectChapter: "اختر إصحاحاً",
  chapter: "إصحاح",
  oldTestament: "العهد القديم",
  newTestament: "العهد الجديد",

  // Reading – extras
  chooseBook: "اختر سفراً",
  chooseChapter: "اختر إصحاحاً",
  prevChapter: "الإصحاح السابق",
  nextChapter: "الإصحاح التالي",
  verseWord: "آية",
  versesSelectedSuffix:
    "آية/آيات محددة",
  toNotes: "إلى الملاحظات",
  toPrinciples: "إلى الدراسات",
  copyLabel: "نسخ",
  shareLabel: "مشاركة",
  cancel: "إلغاء",
  close: "إغلاق",
  notesModalTitle:
    "إضافة إلى قائمة (ملاحظات)",
  notesNoList:
    "لا توجد قوائم بعد. أنشئ قائمة في الأسفل.",
  notesNewListOptional:
    "قائمة جديدة (اختياري)",
  principlesModalTitle:
    "إضافة إلى دراسة (دراسات)",
  principlesNoList:
    "لا توجد دراسات بعد. أنشئ دراسة في الأسفل.",
  principlesNewListOptional:
    "دراسة جديدة (اختياري)",
  selectionCopied: "تم نسخ التحديد",
  textReadyToShare:
    "النص جاهز للمشاركة (تم نسخه)",
  addedToList: "تمت الإضافة إلى القائمة",
  newRandom: "آية عشوائية جديدة",
  swipeLabel: "اسحب",
  searchSlotLabel: "بحث",
  searchSlotEmpty: "بحث (فارغ)",
  memorySlotLabel: "موضع",
  emptySlotSuffix: "(فارغ)",
  untitledList: "(بلا عنوان)",

  // Short label “Copied”
  copiedShort: "تم النسخ",

  // Search page
  searchTitle: "بحث في الكتاب المقدس",
  searchPlaceholder:
    "اكتب ما تريد البحث عنه",
  searchMinChars:
    "اكتب حرفين على الأقل.",
  searchSearching: "جارٍ البحث…",
  searchResults: "النتائج",
  searchExpandAll: "فتح الكل",
  searchCollapseAll: "طيّ الكل",
  searchNoResults:
    "لم يتم العثور على آيات.",
  searchClear: "مسح",
  searchOpenInReading:
    "افتح في صفحة القراءة",

  // Notes page
  notesPage: {
    create: "إنشاء قائمة",
    placeholder: "عنوان القائمة…",
    empty: "لا توجد قوائم بعد.",
    items: "عناصر",
    backAll: "← كل القوائم",
    addTextBlock: "إضافة فقرة نصية",
    editTextBlock: "تعديل الفقرة",
    deleteItem: "حذف",
    moveUp: "تحريك لأعلى",
    moveDown: "تحريك لأسفل",
    open: "فتح",
    confirmDeleteItem:
      "هل تريد حذف هذا العنصر؟",
    newTextPlaceholder: "نصّك هنا…",

    shareCode: "رمز",
    importCode: "استيراد رمز",
    importPrompt:
      "ألصق هنا رمز المشاركة من TheWord:",
    importError: "رمز غير صالح.",
    importSuccess:
      "تم استيراد القائمة بنجاح ✅",
    shareCodeCopied:
      "تم نسخ الرمز إلى الحافظة ✅",

    importTextButton: "نص → قائمة",
    importTextTitlePlaceholder:
      "عنوان القائمة الجديدة",
    importTextDefaultTitle:
      "استيراد نص",
    importTextBodyPlaceholder:
      "ألصق نصك هنا…",
    importTextNoBody:
      "يرجى لصق نص لاستيراده.",
    importTextNoBlock:
      "لم يتم العثور على فقرات (اترك أسطراً فارغة إذا أردت تقسيم النص إلى فقرات).",
    importTextSplitLabel:
      "تقسيم إلى فقرات (مفصولة بسطر فارغ على الأقل)",
    importTextInfo:
      "كل فقرة ستصبح عنصراً في القائمة.",
    importTextCreate: "إنشاء قائمة",

    duplicateTitle:
      "هناك بالفعل قائمة تحمل العنوان نفسه.",
    confirmDeleteList:
      "هل تريد حذف هذه القائمة؟",
    emptyList: "قائمة فارغة.",

    importFromTextTitle:
      "استيراد من نص",
    documentContent: "محتوى المستند",
    renameList: "إعادة تسمية",
  },

  // Principles page
  principlesPage: {
    create: "إنشاء دراسة",
    placeholder: "عنوان الدراسة…",
    empty: "لا توجد دراسات بعد.",
    items: "عناصر",
    backAll: "← كل الدراسات",
    addTextBlock: "إضافة فقرة نصية",
    editTextBlock: "تعديل الفقرة",
    deleteItem: "حذف",
    moveUp: "تحريك لأعلى",
    moveDown: "تحريك لأسفل",
    open: "فتح",
    openReading: "افتح صفحة القراءة",
    confirmDeleteItem:
      "هل تريد حذف هذا العنصر؟",
    newTextPlaceholder: "نصّك هنا…",

    shareCode: "رمز",
    importCode: "استيراد رمز",
    importPrompt:
      "ألصق هنا رمز المشاركة من TheWord (ملاحظة أو دراسة):",
    importError: "رمز غير صالح.",
    importSuccess:
      "تم استيراد الدراسة بنجاح ✅",
    shareCodeCopied:
      "تم نسخ الرمز إلى الحافظة ✅",

    importTextButton: "نص → دراسة",
    importTextTitlePlaceholder:
      "عنوان الدراسة الجديدة",
    importTextDefaultTitle:
      "استيراد نص",
    importTextBodyPlaceholder:
      "ألصق نصك هنا…",
    importTextNoBody:
      "يرجى لصق نص لاستيراده.",
    importTextNoBlock:
      "لم يتم العثور على فقرات (اترك أسطراً فارغة إذا أردت تقسيم النص إلى فقرات).",
    importTextSplitLabel:
      "تقسيم إلى فقرات (مفصولة بسطر فارغ على الأقل)",
    importTextInfo:
      "كل فقرة ستصبح عنصراً في الدراسة.",
    importTextCreate: "إنشاء دراسة",

    duplicateTitle:
      "هناك بالفعل دراسة تحمل العنوان نفسه.",
    confirmDeleteList:
      "هل تريد حذف هذه الدراسة؟",
    emptyList: "دراسة فارغة.",

    importFromTextTitle:
      "استيراد من نص",
    documentContent: "محتوى المستند",
    renameList: "إعادة تسمية",
    share: "مشاركة",
    copy: "نسخ",
    deleteList: "حذف",

    shareStudyTitle: "دراسة",
    shareItemTitle: "آية",
  },

  // Settings
  appearance: "المظهر",
  lightMode: "الوضع الفاتح",
  darkMode: "الوضع الداكن",
  fontSize: "حجم الخط",
  language: "اللغة",
  french: "الفرنسية",
  english: "الإنجليزية",
  fontSizeXLLabel:
    "وضع ضعاف البصر (XL)",
  fontSizePreview:
    "معاينة لحجم الخط المحدد.",
  updates: "التحديثات",
  updatesDescription:
    "تحقق مما إذا كان هناك إصدار جديد وطبّقه.",
  applyUpdate: "تطبيق التحديث",
  checkUpdatesButton:
    "التحقق من التحديثات",
  updatesChecking: "جارٍ التحقق…",
  updatesUpToDate:
    "تطبيقك مُحدَّث.",
  updatesReady:
    "هناك إصدار جديد جاهز. اضغط «تطبيق التحديث».",
  updatesUnavailable:
    "التحديث التلقائي غير متاح (لم يتم العثور على Service Worker).",
  updatesError:
    "حدث خطأ أثناء التحقق. حاول مرة أخرى.",

  // About
  aboutTitle: "",
  aboutDescription:
    "يساعدك The Word على اكتشاف كلمة الله من خلال آيات عشوائية وقراءة كاملة للكتاب المقدس.",
  aboutIntro:
    "TheWord: قراءة الكتاب المقدس دون اتصال، بحث فوري، ملاحظات موضوعية، ومشاركة بلمسة واحدة. يمكنك أيضاً استخدام TheWord على الويب: www.theword.fr",
  bibleVersions: "ترجمات الكتاب المقدس",
  frenchVersion:
    "الفرنسية: Louis Segond 1910 (LSG) – مراجعة 2025 – ضمن الملكية العامة",
  englishVersion:
    "الإنجليزية: King James Version (KJV) – ضمن الملكية العامة",
  frenchVersionDetails:
    "ترجمة مرجعية للكتاب المقدس بالفرنسية، ترجمها Louis Segond عام 1910 وتم تحديثها عام 2025 (تحديث المفردات والقواعد مع الأمانة للمخطوطات).",
  englishVersionDetails:
    "ترجمة إنجليزية كلاسيكية (KJV)، نُشرت عام 1611، ونقِّحت عام 1769، مع تحديث محدود عام 2025.",
  otherLanguagesNote:
    "تُحضَّر لغات أخرى (الألمانية، البرتغالية، وغيرها). في الوقت الحالي، تُعرَض الواجهة بالإنجليزية إذا لم تكن الترجمة متوفرة بعد.",
  randomFeature: "ميزة الآية العشوائية",
  randomFeatureDesc:
    "مولِّد الآيات العشوائية لدينا يختار من أكثر من 31,000 آية كتابية ليمنحك إلهاماً يومياً.",
  musicLink: "موسيقى الخالق",
  versesLabel: "آيات",
  booksLabel: "أسفار",
  readingShortcuts: "اختصارات القراءة",
  notesIntro:
    "نظّم المقاطع المفضلة لديك وأفكارك في قوائم موضوعية.",
  notesPoint1:
    "أضف آيات أو فقرات نصية حرة.",
  notesPoint2:
    "اضغط على عنصر لفتح القائمة (افتح في صفحة القراءة، تحريك لأعلى/لأسفل، حذف…).",
  notesPoint3:
    "أعد تسمية القوائم، وانسخها وشاركها.",
  createdWithLove:
    "صُنِع بمحبة لنشر كلمة الله",
  versionsFootnote:
    "كل ترجمات الكتاب المقدس المستخدمة ضمن الملكية العامة. تم تحديث بعضها جزئياً (مفردات وقواعد) مع المحافظة على الأمانة الكاملة للمخطوطات الأصلية.",

  // Quick slots
  quickSlotsIntro:
    "هذه الأزرار الأربعة، الموجودة على يمين مُحدِّد السفر/الإصحاح، تسمح لك بالعودة فوراً إلى القراءات المتكررة لتتابع عدة أسفار في آن واحد: استخدم 1/2/3 لثلاثة مواضع، والعدسة للعودة إلى آخر مقطع (آية عشوائية أو نتيجة بحث).",
  quickSlotsIllustrationLabel:
    "توضيح للاختصارات",
  quickSlotLastPassageTooltip:
    "آخر مقطع",
  quickSlot1ActiveTooltip:
    "اختصار 1 (مفعّل)",
  quickSlot2Tooltip: "اختصار 2",
  quickSlot3Tooltip: "اختصار 3",

  // Common
  loading: "جارٍ التحميل...",
  error: "حدث خطأ أثناء التحميل",
};

export default ar;
