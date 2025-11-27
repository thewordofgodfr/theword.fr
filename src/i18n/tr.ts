// src/i18n/tr.ts
import type { TranslationDict } from './types';

const tr: TranslationDict = {
  // Navigation
  home: "Ana sayfa",
  reading: "Okuma",
  search: "Arama",
  settings: "Ayarlar",
  about: "Hakkında",
  notes: "Notlar",
  principles: "Çalışmalar",

  // Home page
  randomVerse: "Rastgele ayet",
  newVerse: "Yeni ayet",
  copyVerse: "Ayeti kopyala",
  verseCopied: "Ayet kopyalandı!",
  godSpeaks: "Tanrı sana konuşuyor",
  openJeremiah: "Yeremya 23:29'u aç",
  jeremiah23Quote:
    "«RAB diyor ki: Sözüm ateş gibi değil mi, kayayı parçalayan çekiç gibi değil mi?» Yeremya 23:29",

  // Reading page
  selectBook: "Kitap seç",
  selectChapter: "Bölüm seç",
  chapter: "Bölüm",
  oldTestament: "Eski Antlaşma",
  newTestament: "Yeni Antlaşma",

  // Reading – extras
  chooseBook: "Bir kitap seç",
  chooseChapter: "Bir bölüm seç",
  prevChapter: "Önceki bölüm",
  nextChapter: "Sonraki bölüm",
  verseWord: "ayet",
  versesSelectedSuffix: "seçili ayet(ler)",
  toNotes: "Notlara gönder",
  toPrinciples: "Çalışmalara gönder",
  copyLabel: "Kopyala",
  shareLabel: "Paylaş",
  cancel: "İptal",
  close: "Kapat",
  notesModalTitle: "Listeye ekle (Notlar)",
  notesNoList: "Henüz liste yok. Aşağıdan bir tane oluştur.",
  notesNewListOptional: "Yeni liste (isteğe bağlı)",
  principlesModalTitle: "Çalışmaya ekle (Çalışmalar)",
  principlesNoList: "Henüz çalışma yok. Aşağıdan bir tane oluştur.",
  principlesNewListOptional: "Yeni çalışma (isteğe bağlı)",
  selectionCopied: "Seçim kopyalandı",
  textReadyToShare: "Metin paylaşmaya hazır (kopyalandı)",
  addedToList: "Listeye eklendi",
  newRandom: "Yeni rastgele",
  swipeLabel: "Kaydır",
  searchSlotLabel: "Ara",
  searchSlotEmpty: "Ara (boş)",
  memorySlotLabel: "Kısayol",
  emptySlotSuffix: "(boş)",
  untitledList: "(başlıksız)",

  // Petit libellé court pour “Copié”
  copiedShort: "Kopyalandı",

  // *** Search page ***
  searchTitle: "Kutsal Kitap arama",
  searchPlaceholder: "Aramak istediğinizi yazın",
  searchMinChars: "Arama için en az 2 karakter yazın.",
  searchSearching: "Aranıyor…",
  searchResults: "Sonuçlar",
  searchExpandAll: "Tümünü aç",
  searchCollapseAll: "Tümünü kapat",
  searchNoResults: "Hiç ayet bulunamadı.",
  searchClear: "Temizle",
  searchOpenInReading: "Okuma bölümünde aç",

  // Bloc Notes (page Notes)
  notesPage: {
    create: "Liste oluştur",
    placeholder: "Liste başlığı…",
    empty: "Henüz liste yok.",
    items: "öğe",
    backAll: "← Tüm listeler",
    addTextBlock: "Metin bloğu ekle",
    editTextBlock: "Bloğu düzenle",
    deleteItem: "Sil",
    moveUp: "Yukarı taşı",
    moveDown: "Aşağı taşı",
    open: "Aç",
    confirmDeleteItem: "Bu öğe silinsin mi?",
    newTextPlaceholder: "Metniniz…",

    // Partage / import via code
    shareCode: "Kod",
    importCode: "Kodu içe aktar",
    importPrompt: "TheWord paylaşım kodunu buraya yapıştırın:",
    importError: "Geçersiz kod.",
    importSuccess: "Liste başarıyla içe aktarıldı ✅",
    shareCodeCopied: "Kod panoya kopyalandı ✅",

    // Import direct depuis un texte
    importTextButton: "Metin → Liste",
    importTextTitlePlaceholder: "Yeni listenin başlığı",
    importTextDefaultTitle: "Metin içe aktarma",
    importTextBodyPlaceholder: "Metninizi buraya yapıştırın…",
    importTextNoBody: "Lütfen içe aktarılacak bir metin yapıştırın.",
    importTextNoBlock:
      "Hiç blok algılanmadı (metni bloklara ayırmak için aralara boş satırlar bırakın).",
    importTextSplitLabel:
      "Bloklara ayır (en az bir boş satırla ayrılmış)",
    importTextInfo:
      "Her blok listede bir öğe olur.",
    importTextCreate: "Liste oluştur",

    duplicateTitle: "Aynı başlığa sahip bir liste zaten var.",
    confirmDeleteList: "Bu liste silinsin mi?",
    emptyList: "Boş liste.",

    importFromTextTitle: "Metinden içe aktar",
    documentContent: "Belge içeriği",
    renameList: "Yeniden adlandır",
  },

  // Bloc Principes (page Principes)
  principlesPage: {
    create: "Çalışma oluştur",
    placeholder: "Çalışmanın başlığı…",
    empty: "Henüz çalışma yok.",
    items: "öğe",
    backAll: "← Tüm çalışmalar",
    addTextBlock: "Metin bloğu ekle",
    editTextBlock: "Bloğu düzenle",
    deleteItem: "Sil",
    moveUp: "Yukarı taşı",
    moveDown: "Aşağı taşı",
    open: "Aç",
    openReading: "Okumayı aç",
    confirmDeleteItem: "Bu öğe silinsin mi?",
    newTextPlaceholder: "Metniniz…",

    // Partage / import via code
    shareCode: "Kod",
    importCode: "Kodu içe aktar",
    importPrompt:
      "TheWord paylaşım kodunu (not veya çalışma) buraya yapıştırın:",
    importError: "Geçersiz kod.",
    importSuccess: "Çalışma başarıyla içe aktarıldı ✅",
    shareCodeCopied: "Kod panoya kopyalandı ✅",

    // Import direct depuis un texte
    importTextButton: "Metin → Çalışma",
    importTextTitlePlaceholder: "Yeni çalışmanın başlığı",
    importTextDefaultTitle: "Metin içe aktarma",
    importTextBodyPlaceholder: "Metninizi buraya yapıştırın…",
    importTextNoBody:
      "Lütfen içe aktarılacak bir metin yapıştırın.",
    importTextNoBlock:
      "Hiç blok algılanmadı (metni bloklara ayırmak için aralara boş satırlar bırakın).",
    importTextSplitLabel:
      "Bloklara ayır (en az bir boş satırla ayrılmış)",
    importTextInfo:
      "Her blok çalışmada bir öğe olur.",
    importTextCreate: "Çalışma oluştur",

    duplicateTitle:
      "Aynı başlığa sahip bir çalışma zaten var.",
    confirmDeleteList: "Bu çalışma silinsin mi?",
    emptyList: "Boş çalışma.",

    importFromTextTitle: "Metinden içe aktar",
    documentContent: "Belge içeriği",
    renameList: "Yeniden adlandır",
    share: "Paylaş",
    copy: "Kopyala",
    deleteList: "Sil",

    // Titres pour le partage natif
    shareStudyTitle: "Çalışma",
    shareItemTitle: "Ayet",
  },

  // Settings page
  appearance: "Görünüm",
  lightMode: "Aydınlık mod",
  darkMode: "Karanlık mod",
  fontSize: "Yazı tipi boyutu",
  language: "Dil",
  french: "Fransızca",
  english: "İngilizce",
  fontSizeXLLabel: "Az gören modu (XL)",
  fontSizePreview: "Seçilen yazı tipi boyutunun önizlemesi.",
  updates: "Güncellemeler",
  updatesDescription:
    "Yeni bir sürüm olup olmadığını kontrol edin ve uygulayın.",
  applyUpdate: "Güncellemeyi uygula",
  checkUpdatesButton: "Güncellemeleri denetle",
  updatesChecking: "Denetleniyor…",
  updatesUpToDate: "Uygulamanız güncel.",
  updatesReady:
    "Yeni sürüm hazır. \"Güncellemeyi uygula\"ya tıklayın.",
  updatesUnavailable:
    "Otomatik güncelleme kullanılamıyor (Service Worker bulunamadı).",
  updatesError:
    "Denetlerken bir hata oluştu. Lütfen tekrar deneyin.",

  // About / versions
  aboutTitle: "",
  aboutDescription:
    "The Word, rastgele ayetler ve bütün Kutsal Kitap okumaları aracılığıyla Tanrı'nın sözünü keşfetmene yardım eder.",
  aboutIntro:
    "TheWord: çevrimdışı Kutsal Kitap okuma, anında arama, tematik notlar, tek dokunuşla paylaşma. TheWord'ü web'de de kullanabilirsin: www.theword.fr",
  bibleVersions: "Kutsal Kitap çevirileri",
  frenchVersion:
    "Fransızca: Louis Segond 1910 (LSG) – 2025 gözden geçirilmiş – Kamu malı",
  englishVersion: "İngilizce: King James Version (KJV) – Kamu malı",
  frenchVersionDetails:
    "Fransızca Kutsal Kitap için başvuru çevirisi; 1910'da Louis Segond tarafından çevrildi ve 2025'te söz varlığı ile dilbilgisi modernleştirildi (el yazmalarına sadık kalınarak).",
  englishVersionDetails:
    "Klasik İngilizce çeviri (KJV); 1611'de yayımlandı, 1769'da gözden geçirildi ve 2025'te sınırlı bir güncelleme aldı.",
  otherLanguagesNote:
    "Diğer diller (Almanca, Portekizce vb.) hazırlanmaktadır. O zamana kadar, çeviri olmayan yerlerde arayüz İngilizceye döner.",
  randomFeature: "Rastgele özellik",
  randomFeatureDesc:
    "Rastgele ayet üretecimiz, her gün ilham vermek için 31.000'den fazla Kutsal Kitap ayetinden seçim yapar.",
  musicLink: "Yaratıcının Müziği",
  versesLabel: "Ayetler",
  booksLabel: "Kitaplar",
  readingShortcuts: "Okuma kısayolları",
  notesIntro:
    "Sevdiğin bölümleri ve düşüncelerini tematik listelere düzenle.",
  notesPoint1: "Ayetler veya serbest metin blokları ekle.",
  notesPoint2:
    "Bir öğeye dokunarak menüyü aç (Okumada aç, yukarı/aşağı taşı, sil vb.).",
  notesPoint3: "Listeleri yeniden adlandır, kopyala ve paylaş.",
  createdWithLove:
    "Tanrı'nın Sözünü yaymak için sevgiyle oluşturuldu",
  versionsFootnote:
    "Kullanılan tüm Kutsal Kitap çevirileri kamu malıdır. Bazıları (söz varlığı ve dilbilgisi açısından) kısmen modernleştirilmiştir; ancak özgün el yazmalarına kesinlikle sadıktır.",

  // Quick slots / raccourcis lecture
  quickSlotsIntro:
    "Kitap/Bölüm seçicisinin sağındaki bu 4 düğme, sık okunan yerlere anında dönmene ve birden çok kitabı paralel olarak takip etmene yardım eder: üç konum için 1/2/3'ü ve son bölüme (rastgele ayet veya arama sonucu) dönmek için büyüteci kullan.",
  quickSlotsIllustrationLabel: "Kısayolların görseli",
  quickSlotLastPassageTooltip: "Son bölüm",
  quickSlot1ActiveTooltip: "Kısayol 1 (etkin)",
  quickSlot2Tooltip: "Kısayol 2",
  quickSlot3Tooltip: "Kısayol 3",

  // Common
  loading: "Yükleniyor...",
  error: "Yüklenirken bir hata oluştu",
};

export default tr;

