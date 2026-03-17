// src/i18n/id.ts
import type { TranslationDict } from './types';

const id: TranslationDict = {
  // Navigation
  home: "Beranda",
  reading: "Bacaan",
  search: "Pencarian",
  settings: "Pengaturan",
  about: "Tentang",
  notes: "Catatan",
  principles: "Studi",

  // Home page
  randomVerse: "Ayat acak",
  newVerse: "Ayat baru",
  copyVerse: "Salin ayat",
  verseCopied: "Ayat disalin!",
  godSpeaks: "Tuhan berbicara kepadamu",
  openJeremiah: "Buka Yeremia 23:29",
  jeremiah23Quote:
    "“Bukankah firman-Ku seperti api, demikianlah firman TUHAN, dan seperti palu yang menghancurkan bukit batu?” Yeremia 23:29",

  // Reading page
  selectBook: "Pilih kitab",
  selectChapter: "Pilih pasal",
  chapter: "Pasal",
  oldTestament: "Perjanjian Lama",
  newTestament: "Perjanjian Baru",

  // Reading – extras
  chooseBook: "Pilih suatu kitab",
  showInOtherLangs: 'Bahasa lain',
  chooseChapter: "Pilih suatu pasal",
  prevChapter: "Pasal sebelumnya",
  nextChapter: "Pasal berikutnya",
  verseWord: "ayat",
  versesSelectedSuffix: "ayat terpilih",
  toNotes: "Ke Catatan",
  toPrinciples: "Ke Studi",
  copyLabel: "Salin",
  shareLabel: "Bagikan",
  cancel: "Batal",
  close: "Tutup",
  notesModalTitle:
    "Tambahkan ke daftar (Catatan)",
  notesNoList:
    "Belum ada daftar. Buat satu di bawah.",
  notesNewListOptional:
    "Daftar baru (opsional)",
  principlesModalTitle:
    "Tambahkan ke studi (Studi)",
  principlesNoList:
    "Belum ada studi. Buat satu di bawah.",
  principlesNewListOptional:
    "Studi baru (opsional)",
  selectionCopied: "Pilihan disalin",
  textReadyToShare:
    "Teks siap dibagikan (disalin)",
  addedToList: "Ditambahkan ke daftar",
  newRandom: "Ayat acak baru",
  swipeLabel: "Geser",
  searchSlotLabel: "Cari",
  searchSlotEmpty: "Cari (kosong)",
  memorySlotLabel: "Slot",
  emptySlotSuffix: "(kosong)",
  untitledList: "(tanpa judul)",

  // Short label “Copied”
  copiedShort: "Disalin",

  // Search page
  searchTitle: "Pencarian Alkitab",
  searchPlaceholder:
    "Ketik pencarian Anda",
  searchMinChars:
    "Ketik minimal 2 karakter.",
  searchSearching: "Mencari…",
  searchResults: "Hasil",
  searchExpandAll: "Buka semua",
  searchCollapseAll: "Tutup semua",
  searchNoResults:
    "Tidak ada ayat yang ditemukan.",
  searchClear: "Hapus",
  searchOpenInReading:
    "Buka di Bacaan",

  // Notes page
  notesPage: {
    create: "Buat daftar",
    placeholder: "Judul daftar…",
    empty: "Belum ada daftar.",
    items: "item",
    backAll: "← Semua daftar",
    addTextBlock: "Tambah blok teks",
    editTextBlock: "Edit blok",
    deleteItem: "Hapus",
    moveUp: "Pindah ke atas",
    moveDown: "Pindah ke bawah",
    open: "Buka",
    confirmDeleteItem:
      "Hapus item ini?",
    newTextPlaceholder: "Teks Anda…",

    shareCode: "Kode",
    importCode: "Impor kode",
    importPrompt:
      "Tempel kode berbagi TheWord di sini:",
    importError: "Kode tidak valid.",
    importSuccess:
      "Daftar berhasil diimpor ✅",
    shareCodeCopied:
      "Kode disalin ke papan klip ✅",

    importTextButton: "Teks → Daftar",
    importTextTitlePlaceholder:
      "Judul daftar baru",
    importTextDefaultTitle:
      "Impor teks",
    importTextBodyPlaceholder:
      "Tempel teks Anda di sini…",
    importTextNoBody:
      "Silakan tempel teks untuk diimpor.",
    importTextNoBlock:
      "Tidak ada blok yang terdeteksi (berilah baris kosong jika ingin memecah menjadi blok).",
    importTextSplitLabel:
      "Bagi menjadi blok (dipisahkan sedikitnya satu baris kosong)",
    importTextInfo:
      "Setiap blok akan menjadi satu item dalam daftar.",
    importTextCreate: "Buat daftar",

    duplicateTitle:
      "Sudah ada daftar dengan judul yang sama.",
    confirmDeleteList:
      "Hapus daftar ini?",
    emptyList: "Daftar kosong.",

    importFromTextTitle:
      "Impor dari teks",
    documentContent: "Isi dokumen",
    renameList: "Ganti nama",
  },

  // Principles page
  principlesPage: {
    create: "Buat studi",
    placeholder: "Judul studi…",
    empty: "Belum ada studi.",
    items: "item",
    backAll: "← Semua studi",
    addTextBlock: "Tambah blok teks",
    editTextBlock: "Edit blok",
    deleteItem: "Hapus",
    moveUp: "Pindah ke atas",
    moveDown: "Pindah ke bawah",
    open: "Buka",
    openReading: "Buka Bacaan",
    confirmDeleteItem:
      "Hapus item ini?",
    newTextPlaceholder: "Teks Anda…",

    shareCode: "Kode",
    importCode: "Impor kode",
    importPrompt:
      "Tempel kode berbagi TheWord (catatan atau studi) di sini:",
    importError: "Kode tidak valid.",
    importSuccess:
      "Studi berhasil diimpor ✅",
    shareCodeCopied:
      "Kode disalin ke papan klip ✅",

    importTextButton: "Teks → Studi",
    importTextTitlePlaceholder:
      "Judul studi baru",
    importTextDefaultTitle:
      "Impor teks",
    importTextBodyPlaceholder:
      "Tempel teks Anda di sini…",
    importTextNoBody:
      "Silakan tempel teks untuk diimpor.",
    importTextNoBlock:
      "Tidak ada blok yang terdeteksi (berilah baris kosong jika ingin memecah menjadi blok).",
    importTextSplitLabel:
      "Bagi menjadi blok (dipisahkan sedikitnya satu baris kosong)",
    importTextInfo:
      "Setiap blok akan menjadi satu item dalam studi.",
    importTextCreate: "Buat studi",

    duplicateTitle:
      "Sudah ada studi dengan judul yang sama.",
    confirmDeleteList:
      "Hapus studi ini?",
    emptyList: "Studi kosong.",

    importFromTextTitle:
      "Impor dari teks",
    documentContent: "Isi dokumen",
    renameList: "Ganti nama",
    share: "Bagikan",
    copy: "Salin",
    deleteList: "Hapus",

    shareStudyTitle: "Studi",
    shareItemTitle: "Ayat",
  },

  // Settings
  appearance: "Tampilan",
  lightMode: "Mode terang",
  darkMode: "Mode gelap",
  fontSize: "Ukuran huruf",
  language: "Bahasa",
  french: "Prancis",
  english: "Inggris",
  fontSizeXLLabel:
    "Mode huruf besar (XL)",
  fontSizePreview:
    "Pratinjau ukuran huruf yang dipilih.",
  updates: "Pembaruan",
  updatesDescription:
    "Periksa apakah ada versi baru dan terapkan.",
  applyUpdate: "Terapkan pembaruan",
  checkUpdatesButton:
    "Periksa pembaruan",
  updatesChecking: "Sedang memeriksa…",
  updatesUpToDate:
    "Aplikasi Anda sudah versi terbaru.",
  updatesReady:
    "Versi baru siap. Ketuk “Terapkan pembaruan”.",
  updatesUnavailable:
    "Pembaruan otomatis tidak tersedia (Service Worker tidak terdeteksi).",
  updatesError:
    "Terjadi kesalahan saat memeriksa. Silakan coba lagi.",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word membantu Anda menemukan firman Tuhan melalui ayat acak dan pembacaan Alkitab secara lengkap.",
  aboutIntro: `Mengapa saya membuat The Word

Pada awalnya, saya membuat aplikasi ini untuk satu alasan yang sangat sederhana: membaca beberapa kitab Alkitab sekaligus, tanpa kehilangan alur dari hari ke hari, berkat tab 1 / 2 / 3 pada halaman Membaca.

Seiring waktu, saya menambahkan fitur-fitur lain, selalu dengan tujuan yang sama: membantu membaca, merenungkan, mengingat, dan mempraktikkan Firman Allah.

Doa saya untuk Anda

Doa saya adalah agar Anda disentuh oleh Firman Allah, agar Anda memahami kasih Allah bagi Anda, dan kasih Yesus Kristus, Putra-Nya, serta harga yang Ia bayar supaya kita diperdamaikan dengan Allah dan berjalan bersama-Nya dalam kasih-Nya.

Kasih Allah dan panggilan untuk percaya terlihat sangat jelas dalam Injil Yohanes (mis.: Yohanes 3:16).

Kunci untuk masuk ke dalam Kerajaan dan panggilan yang jelas untuk menanggapi Allah tampak jelas dalam kitab Kisah Para Rasul (mis.: Kisah Para Rasul 2:38; Kisah Para Rasul 4:12).

Alkitab: Allah berbicara kepada kita

Kita tidak boleh lupa bahwa seluruh Alkitab diilhamkan oleh Allah: Allah yang berbicara kepada kita, dan kita harus takut akan Dia dan taat kepada-Nya.

2 Timotius 3:16-17  “Segala tulisan yang diilhamkan Allah…”
Amsal 9:10  “Permulaan hikmat adalah takut akan TUHAN…”
Yohanes 13:34-35  “Kasihilah seorang akan yang lain, seperti Aku telah mengasihi kamu…”

Waktu singkat: menanggapi panggilan Allah

Saya percaya bahwa waktu singkat dan Allah sangat menghendaki setiap orang menanggapi panggilan-Nya: bertobat, percaya, dan dibaptis untuk pengampunan dosa. Ini adalah kesempatan yang sangat besar: bersama Allah untuk selama-lamanya. Jangan menunda, sebab Allah akan melaksanakan keadilan-Nya pada hari yang telah Ia tetapkan, dan Yesus sering memanggil kita untuk berjaga-jaga dan siap sedia.

1 Korintus 7:29  “Waktu telah singkat…”
Kisah Para Rasul 17:30-31  Allah memerintahkan semua orang untuk bertobat… “Ia telah menetapkan suatu hari…”
Kisah Para Rasul 2:38  “Bertobatlah… untuk pengampunan dosamu…”
Markus 1:15  “Bertobatlah dan percayalah kepada Injil.”
Matius 24:42-44  “Berjaga-jagalah… bersiaplah…”
Lukas 12:35-40  “Ikatlah pinggangmu dan nyalakanlah pelitamu…”

Sayangnya, banyak orang menjauh dari Kitab Suci. Alkitab memperingatkan bahwa akan datang suatu waktu ketika sebagian orang mencari pesan yang menyenangkan telinga mereka dan mengumpulkan “banyak guru” bagi diri mereka sendiri.

Karena itu kita dipanggil untuk tinggal dalam Firman, taat kepada Allah, dan hidup dengan cara yang layak bagi Injil—serta juga berusaha meyakinkan orang-orang di sekitar kita.

2 Timotius 4:3-4  “mereka akan mengumpulkan guru-guru…”
Yohanes 8:31-32  “Jika kamu tetap dalam firman-Ku…”
Kolose 1:23  “tetap teguh dan tidak bergoncang…”
Filipi 1:27  “hiduplah berpadanan dengan Injil…”
2 Korintus 5:20  “kami ini utusan-utusan…”

Dan kadang-kadang, sebuah “gereja” dapat dimulai dengan sangat sederhana: dua orang yang mencari Allah bersama-sama.

Matius 18:20  “Di mana dua atau tiga orang berkumpul dalam nama-Ku…”

Pintu itu sempit: berjalan dengan rendah hati bersama Allah

Yesus berkata bahwa pintu itu sempit dan jalan yang menuju kebinasaan itu lebar. Jangan biarkan dosa-dosa kita menjauhkan kita dari Allah. Mari taat dengan rendah hati kepada Firman-Nya, dengan hati seperti anak kecil: sederhana, tanpa kemunafikan, namun juga sadar dan bijaksana.

Matius 7:13-14  “Masuklah melalui pintu yang sempit…”
Ibrani 12:1-2  “menanggalkan setiap beban dan dosa…”
Matius 18:3  “jika kamu tidak menjadi seperti anak kecil…”
Matius 10:16  “tulus seperti merpati dan cerdik seperti ular…”

Berdoa, bertekun, jangan menyerah

Berdoalah kepada Allah agar Ia menuntun Anda melalui Firman-Nya dan Roh Kudus-Nya. Mohonlah dengan sungguh-sungguh. Jangan putus asa. Jangan menyerah. Sekalipun orang benar melewati penderitaan, Allah tetap setia dan membebaskan.

Lukas 18:1  “harus selalu berdoa dan jangan jemu-jemu”
Yakobus 1:5  “Jika di antara kamu ada yang kekurangan hikmat, hendaklah ia memintanya kepada Allah…”
Mazmur 34:19  “Kemalangan orang benar banyak, tetapi TUHAN melepaskan dia dari semuanya itu.”`,
  bibleVersions: "Versi Alkitab",
  frenchVersion:
    "Prancis: Louis Segond 1910 (LSG) – Revisi 2025 – Domain publik",
  englishVersion:
    "Inggris: King James Version (KJV) – Domain publik",
  frenchVersionDetails:
    "Versi acuan Alkitab dalam bahasa Prancis, diterjemahkan oleh Louis Segond pada 1910 dan diperbarui tahun 2025 (modernisasi kosakata dan tata bahasa, tetap setia pada naskah asli).",
  englishVersionDetails:
    "Versi klasik bahasa Inggris (KJV), diterbitkan tahun 1611, direvisi tahun 1769 dan sedikit diperbarui tahun 2025.",
  otherLanguagesNote:
    "Bahasa lain (Jerman, Portugis, dan lain-lain) sedang dipersiapkan. Sementara itu, antarmuka memakai bahasa Inggris bila terjemahan belum tersedia.",
  randomFeature: "Fitur acak",
  randomFeatureDesc:
    "Generator ayat acak kami memilih dari lebih dari 31.000 ayat Alkitab untuk memberi Anda inspirasi setiap hari.",
  musicLink: "Musik Sang Pencipta",
  versesLabel: "Ayat",
  booksLabel: "Kitab",
  readingShortcuts:
    "Jalan pintas bacaan",
  notesIntro:
    "Atur bagian favorit dan pikiran Anda dalam daftar-daftar tematik.",
  notesPoint1:
    "Tambahkan ayat atau blok teks bebas.",
  notesPoint2:
    "Ketuk sebuah item untuk membuka menu (Buka di Bacaan, Pindah ke atas/bawah, Hapus…).",
  notesPoint3:
    "Ganti nama daftar, salin dan bagikan.",
  createdWithLove:
    "Dibuat dengan kasih untuk menyebarkan Firman Tuhan",
  versionsFootnote:
    "Semua versi Alkitab yang digunakan berada di domain publik. Beberapa telah dimodernisasi sebagian (kosakata, tata bahasa) tetapi tetap sangat setia pada naskah aslinya. Jika Anda menginginkan aplikasi Android, silakan kirim permintaan melalui email dan saya akan mengirimkan tautan (versi uji coba).",

  // Quick slots
  quickSlotsIntro:
    "Keempat tombol di sebelah kanan pemilih Kitab/Pasal ini memudahkan Anda kembali ke bacaan yang sering, sehingga dapat mengikuti beberapa kitab secara paralel: gunakan 1/2/3 untuk tiga lokasi, dan kaca pembesar untuk kembali ke bagian terakhir (ayat acak atau hasil pencarian).",
  quickSlotsIllustrationLabel:
    "Ilustrasi jalan pintas",
  quickSlotLastPassageTooltip:
    "Bagian terakhir",
  quickSlot1ActiveTooltip:
    "Jalan pintas 1 (aktif)",
  quickSlot2Tooltip: "Jalan pintas 2",
  quickSlot3Tooltip: "Jalan pintas 3",

  // Common
  loading: "Memuat...",
  error: "Terjadi kesalahan saat memuat",
};

export default id;
