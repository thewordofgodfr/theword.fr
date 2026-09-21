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
    "Cari kata atau frasa secara instan di seluruh Alkitab, buka hasilnya di bagian Bacaan, lalu salin atau bagikan ayat hanya dengan satu ketukan.",
  aboutIntro: `Mengapa The Word?

Saya membuat The Word agar dapat membaca beberapa kitab dalam Alkitab secara bersamaan tanpa kehilangan jejak bacaan. Seiring waktu, berbagai fitur lain ditambahkan, tetapi tujuannya tetap sama: membantu setiap orang membaca, merenungkan, mengingat, dan melakukan Firman Allah.

Kerinduan saya

Di dunia tempat begitu banyak suara berusaha memengaruhi kita, kerinduan saya sederhana: mendorong setiap orang untuk kembali langsung kepada Alkitab dengan hati yang tulus dan mencari kebenaran di dalamnya.

Doa saya adalah agar aplikasi ini menolong Anda menemukan kasih Allah, mengenal Yesus Kristus, dan memahami apa yang telah dilakukan-Nya untuk mendamaikan kita dengan Allah.

Bacalah Firman-Nya. Periksalah dengan saksama. Mintalah Allah membimbing Anda, lalu jawablah panggilan-Nya dengan iman, pertobatan, dan ketaatan.

“Jika kamu tetap dalam firman-Ku, kamu benar-benar murid-Ku; kamu akan mengetahui kebenaran, dan kebenaran itu akan memerdekakan kamu.”

Yohanes 8:31-32`,
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
    "Tentang teks: Alkitab yang disertakan digunakan sesuai dengan lisensinya masing-masing. Hanya Louis Segond 1910 yang dimodernisasi pada tahun 2025 (tata bahasa dan kosakata), dengan tetap menghormati naskah-naskah asli secara ketat.",

  // Quick slots
  quickSlotsIntro:
    "Keempat tombol ini memungkinkan Anda langsung kembali ke bacaan yang sering dibuka untuk membaca beberapa kitab secara paralel: gunakan 1/2/3 untuk 3 tempat yang berbeda, dan kaca pembesar untuk kembali ke bagian terakhir (ayat acak atau hasil pencarian).",
  quickSlotsIllustrationLabel:
    "Ilustrasi jalan pintas",
  quickSlotLastPassageTooltip:
    "Bagian terakhir",
  quickSlot1ActiveTooltip:
    "Jalan pintas 1 (aktif)",
  quickSlot2Tooltip: "Jalan pintas 2",
  quickSlot3Tooltip: "Jalan pintas 3",
notesHelpTitle: 'Catatan & Studi — Panduan Penggunaan',

notesHelpIntro:
'Halaman Catatan dan Studi memungkinkan Anda menyimpan dan mengatur ayat dalam daftar bertema, lalu melengkapinya dengan blok teks sendiri. Anda dapat mengumpulkan bagian Alkitab, menambahkan pemikiran, dan menyusun studi Alkitab yang terstruktur. Catatan dan Studi disimpan secara lokal di perangkat dan dapat digunakan tanpa akun.',

notesHelp1Title: '1. Buat dan kelola daftar',

notesHelp1Body:
'Halaman utama menampilkan semua daftar Catatan atau Studi. Anda dapat membuat daftar, memberinya judul, mengganti namanya, atau menghapusnya. Ketuk daftar untuk membuka isinya. Tombol “Semua daftar” atau “Semua studi” mengembalikan Anda ke tampilan utama. Saat halaman dibuka kembali, aplikasi otomatis membuka daftar terakhir dan berpindah mendekati item terakhirnya.',

notesHelp2Title: '2. Tambahkan ayat dari Alkitab',

notesHelp2Body:
'Dari halaman Bacaan, pilih satu atau beberapa ayat, lalu gunakan tombol Catatan atau Studi. Ayat ditambahkan ke daftar pilihan Anda bersama referensi dan teksnya. Anda dapat memilih beberapa daftar dan menyimpan ayat yang sama di tempat berbeda.',

notesHelp3Title: '3. Tambahkan blok teks',

notesHelp3Body:
'Selain ayat, Anda dapat menambahkan komentar, renungan, pertanyaan, doa, pokok khotbah, atau isi lainnya. Tombol “Tambahkan blok teks” tersedia di bagian atas dan bawah daftar yang terbuka. Tombol + di samping item juga dapat menyisipkan blok tepat di posisi tersebut. Setiap blok dapat diedit, dipindahkan, atau dihapus.',

notesHelp4Title: '4. Gunakan dan atur ulang item',

notesHelp4Body:
'Buka menu item untuk melihat tindakan yang tersedia. Ayat dapat dibuka langsung di halaman Bacaan, disalin, atau dibagikan. Blok teks dapat disalin, dibagikan, atau diedit. Panah naik dan turun mengubah urutan ayat dan blok teks. Setiap item juga dapat dihapus secara terpisah.',

notesHelp5Title: '5. Salin atau bagikan seluruh daftar',

notesHelp5Body:
'Di menu daftar Catatan atau Studi, tombol “Salin” dan “Bagikan” mengambil seluruh isinya: judul, referensi Alkitab, teks ayat, dan blok teks pribadi. Isi tersebut dapat ditempelkan ke pesan atau dokumen, atau dikirim melalui aplikasi kompatibel di perangkat.',

notesHelp6Title: '6. Bagikan atau pindahkan dengan kode The Word',

notesHelp6Body:
'Tombol “Kode” menyalin kode ringkas yang berisi judul dan seluruh isi daftar. Pengguna The Word lain dapat memilih “Impor kode” untuk membuat ulang daftar di perangkatnya. Isi juga dapat dipindahkan antara Catatan dan Studi dengan menyalin kode di satu halaman lalu mengimpornya di halaman lainnya.',

notesHelp7Title: '7. Impor dokumen teks',

notesHelp7Body:
'Pilihan “Impor dari teks” memungkinkan Anda menempelkan isi dokumen, email, khotbah, atau rencana studi. Dokumen dapat disimpan sebagai satu blok atau dibagi otomatis menjadi beberapa blok berdasarkan baris kosong. Daftar Catatan atau Studi baru dibuat dengan judul pilihan Anda.',

notesHelp8Title: '8. Penyimpanan lokal dan cadangan',

notesHelp8Body:
'Catatan dan Studi disimpan secara lokal di perangkat dan tidak otomatis disinkronkan dengan akun atau server. Jika aplikasi dihapus, datanya direset, atau data browser dibersihkan, isinya dapat hilang permanen. Gunakan Salin, Bagikan, atau kode The Word untuk menyimpan daftar penting.',

notesHelp9Title: '9. Beberapa ide penggunaan',

notesHelp9Body:
'Gunakan Catatan untuk menyimpan ayat hafalan, pemikiran harian, persiapan khotbah, atau daftar doa. Gunakan Studi untuk menyusun pembelajaran yang lebih lengkap tentang tema atau kitab, kelompok rumah, rencana pengajaran, atau rangkaian pesan.',

notesHelp10Title: '10. Gabungkan Catatan dan Studi',

notesHelp10Body:
'Catatan dan Studi dapat digunakan bersama. Kumpulkan ayat, pemikiran, dan doa dengan cepat di Catatan, lalu pindahkan hal yang ingin dipelajari lebih dalam ke Studi menggunakan kode The Word. Setelah itu Anda dapat mengatur ulang, mengembangkan, dan membagikannya.',
  // Common
  loading: "Memuat...",
  error: "Terjadi kesalahan saat memuat",
};

export default id;
