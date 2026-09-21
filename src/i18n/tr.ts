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
  showInOtherLangs: 'Diğer diller',
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
    "Kutsal Kitap’ın tamamında kelime veya ifadeleri anında arayın, sonuçları Okuma bölümünde açın ve bir ayeti tek dokunuşla kopyalayın veya paylaşın.",
  aboutIntro: `Neden The Word?

The Word’ü, Kutsal Kitap’ın birden fazla bölümünü eş zamanlı okuyabilmek ve kaldığım yeri kaybetmemek için oluşturdum. Zamanla başka özellikler de eklendi, ancak amaç hep aynı kaldı: herkesin Tanrı’nın Sözü’nü okumasına, üzerinde düşünmesine, onu hatırlamasına ve yaşamında uygulamasına yardımcı olmak.

Arzum

Pek çok sesin bizi etkilemeye çalıştığı bir dünyada arzum basit: herkesi içten bir yürekle doğrudan Kutsal Kitap’a dönmeye ve gerçeği onda aramaya teşvik etmek.

Bu uygulamanın Tanrı’nın sevgisini keşfetmenize, İsa Mesih’i tanımanıza ve bizi Tanrı’yla barıştırmak için yaptıklarını anlamanıza yardımcı olması için dua ediyorum.

O’nun Sözü’nü okuyun. Dikkatle inceleyin. Tanrı’dan size yol göstermesini isteyin ve sonra O’nun çağrısına iman, tövbe ve itaatle karşılık verin.

“Eğer benim sözüme bağlı kalırsanız, gerçekten öğrencilerim olursunuz; gerçeği bileceksiniz ve gerçek sizi özgür kılacak.”

Yuhanna 8:31-32`,
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
    "Metinler hakkında: Uygulamaya dâhil edilen Kutsal Kitap çevirileri kendi lisanslarına uygun olarak kullanılmaktadır. Yalnızca Louis Segond 1910, özgün el yazmalarına titizlikle bağlı kalınarak 2025 yılında dil bilgisi ve kelime dağarcığı bakımından güncellenmiştir.",

  // Quick slots / raccourcis lecture
  quickSlotsIntro:
    "Bu 4 düğme, sık okuduğunuz bölümlere anında dönmenizi ve birden fazla kitabı paralel olarak okumanızı sağlar: 3 ayrı konum için 1/2/3’ü, son bölüme dönmek için ise büyüteci kullanın (rastgele ayet veya arama sonucu).",
  quickSlotsIllustrationLabel: "Kısayolların görseli",
  quickSlotLastPassageTooltip: "Son bölüm",
  quickSlot1ActiveTooltip: "Kısayol 1 (etkin)",
  quickSlot2Tooltip: "Kısayol 2",
  quickSlot3Tooltip: "Kısayol 3",
notesHelpTitle: 'Notlar ve Çalışmalar — Kullanım Kılavuzu',

notesHelpIntro:
'Notlar ve Çalışmalar sayfaları, ayetleri konu listelerinde saklayıp düzenlemenize ve kendi metin bloklarınızla tamamlamanıza olanak tanır. Bölümleri toplayabilir, düşüncelerinizi ekleyebilir ve düzenli Kutsal Kitap çalışmaları hazırlayabilirsiniz. Veriler cihazınızda yerel olarak saklanır ve hesap olmadan kullanılabilir.',

notesHelp1Title: '1. Listelerinizi oluşturun ve yönetin',

notesHelp1Body:
'Ana sayfa bütün Not listelerinizi veya Çalışmalarınızı gösterir. Bir liste oluşturabilir, başlık verebilir, yeniden adlandırabilir veya silebilirsiniz. İçeriğini açmak için listeye dokunun. “Tüm listeler” veya “Tüm çalışmalar” genel görünüme döndürür. Sayfayı yeniden açtığınızda uygulama son kullandığınız listeyi açar ve son öğesinin yakınına gider.',

notesHelp2Title: '2. Kutsal Kitap’tan ayet ekleyin',

notesHelp2Body:
'Okuma sayfasında bir veya birkaç ayet seçin, ardından Notlar veya Çalışmalar düğmesini kullanın. Ayetler, referansları ve metinleriyle seçtiğiniz listelere eklenir. Birden fazla liste seçebilir ve aynı ayeti farklı yerlerde saklayabilirsiniz.',

notesHelp3Title: '3. Metin blokları ekleyin',

notesHelp3Body:
'Ayetlerin yanında yorumlar, düşünceler, sorular, dualar, vaaz noktaları veya başka içerikler ekleyebilirsiniz. “Metin bloğu ekle” düğmesi açık listenin üstünde ve altında bulunur. Bir öğenin yanındaki + düğmesi de tam o konuma blok ekler. Her blok düzenlenebilir, taşınabilir veya silinebilir.',

notesHelp4Title: '4. Öğeleri kullanın ve yeniden sıralayın',

notesHelp4Body:
'Mevcut işlemleri görmek için öğenin menüsünü açın. Bir ayet Okuma sayfasında açılabilir, kopyalanabilir veya paylaşılabilir. Metin bloğu kopyalanabilir, paylaşılabilir veya düzenlenebilir. Yukarı ve aşağı okları sıralamayı değiştirir. Her öğe ayrı ayrı silinebilir.',

notesHelp5Title: '5. Listenin tamamını kopyalayın veya paylaşın',

notesHelp5Body:
'Bir Not listesi veya Çalışmanın menüsündeki “Kopyala” ve “Paylaş” düğmeleri başlık, Kutsal Kitap referansları, ayet metinleri ve kişisel metin blokları dâhil tüm içeriği alır. İçeriği bir mesaja veya belgeye yapıştırabilir ya da uyumlu bir uygulamayla gönderebilirsiniz.',

notesHelp6Title: '6. The Word koduyla paylaşın veya aktarın',

notesHelp6Body:
'“Kod” düğmesi listenin başlığını ve tüm içeriğini taşıyan kısa bir kodu kopyalar. Başka bir The Word kullanıcısı “Kod içe aktar” seçeneğiyle listeyi kendi cihazında yeniden oluşturabilir. Kodu bir sayfada kopyalayıp diğerinde içe aktararak Notlar ve Çalışmalar arasında içerik de aktarabilirsiniz.',

notesHelp7Title: '7. Metin belgesi içe aktarın',

notesHelp7Body:
'“Metinden içe aktar” seçeneği bir belge, e-posta, vaaz veya çalışma planını yapıştırmanızı sağlar. Belgeyi tek blok hâlinde tutabilir veya boş satırlara göre otomatik olarak birkaç bloğa bölebilirsiniz. Seçtiğiniz başlıkla yeni bir Not listesi veya Çalışma oluşturulur.',

notesHelp8Title: '8. Yerel depolama ve yedekleme',

notesHelp8Body:
'Notlar ve Çalışmalar cihazınızda yerel olarak saklanır ve bir hesap ya da sunucuyla otomatik eşitlenmez. Uygulamayı kaldırır, verilerini sıfırlar veya tarayıcı verilerini silerseniz içerikler kalıcı olarak kaybolabilir. Önemli listeler için Kopyala, Paylaş veya The Word kodunu kullanın.',

notesHelp9Title: '9. Bazı kullanım fikirleri',

notesHelp9Body:
'Notları ezberlenecek ayetler, günlük düşünceler, vaaz hazırlığı veya dua listeleri için kullanın. Çalışmaları bir konuyu veya kitabı incelemek, ev grubu, eğitim planı ya da mesaj dizisi hazırlamak için kullanın.',

notesHelp10Title: '10. Notları ve Çalışmaları birlikte kullanın',

notesHelp10Body:
'Notlar ve Çalışmalar birlikte kullanılabilir. Ayetleri, düşünceleri ve duaları önce Notlarda toplayın, daha derin incelemek istediklerinizi The Word koduyla Çalışmalara aktarın. Ardından yeniden sıralayabilir, geliştirebilir ve paylaşabilirsiniz.',
  // Common
  loading: "Yükleniyor...",
  error: "Yüklenirken bir hata oluştu",
};

export default tr;

