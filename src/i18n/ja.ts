// src/i18n/ja.ts
import type { TranslationDict } from './types';

const ja: TranslationDict = {
  // Navigation
  home: "ホーム",
  reading: "聖書を読む",
  search: "検索",
  settings: "設定",
  about: "このアプリについて",
  notes: "ノート",
  principles: "聖書研究",

  // Home page
  randomVerse: "ランダムな聖句",
  newVerse: "新しい聖句",
  copyVerse: "聖句をコピー",
  verseCopied: "聖句をコピーしました！",
  godSpeaks: "神様があなたに語っておられます",
  openJeremiah: "エレミヤ 23:29 を開く",
  jeremiah23Quote:
    "「わたしのことばは火のようではないか──主の御告げ──岩を砕く槌のようではないか。」（エレミヤ 23:29）",

  // Reading page
  selectBook: "書を選ぶ",
  selectChapter: "章を選ぶ",
  chapter: "章",
  oldTestament: "旧約聖書",
  newTestament: "新約聖書",

  // Reading – extras
  chooseBook: "書を選択してください",
  showInOtherLangs: '他の言語',
  chooseChapter: "章を選択してください",
  prevChapter: "前の章",
  nextChapter: "次の章",
  verseWord: "節",
  versesSelectedSuffix: "節が選択されています",
  toNotes: "ノートへ",
  toPrinciples: "聖書研究へ",
  copyLabel: "コピー",
  shareLabel: "共有",
  cancel: "キャンセル",
  close: "閉じる",
  notesModalTitle: "リストに追加（ノート）",
  notesNoList: "まだリストがありません。下で作成してください。",
  notesNewListOptional: "新しいリスト（任意）",
  principlesModalTitle: "学びに追加（学び）",
  principlesNoList: "まだ学びがありません。下で作成してください。",
  principlesNewListOptional: "新しい学び（任意）",
  selectionCopied: "選択範囲をコピーしました",
  textReadyToShare:
    "共有するためのテキストが準備できました（コピー済み）",
  addedToList: "リストに追加しました",
  newRandom: "新しいランダム",
  swipeLabel: "スワイプ",
  searchSlotLabel: "検索",
  searchSlotEmpty: "検索（空）",
  memorySlotLabel: "スロット",
  emptySlotSuffix: "（空）",
  untitledList: "（タイトルなし）",

  // Short label “Copied”
  copiedShort: "コピーしました",

  // Search page
  searchTitle: "聖書検索",
  searchPlaceholder: "検索語を入力してください",
  searchMinChars:
    "検索するには 2 文字以上入力してください。",
  searchSearching: "検索中…",
  searchResults: "結果",
  searchExpandAll: "すべて展開",
  searchCollapseAll: "すべて折りたたむ",
  searchNoResults:
    "該当する聖句は見つかりませんでした。",
  searchClear: "クリア",
  searchOpenInReading: "「読む」で開く",

  // Notes page
  notesPage: {
    create: "リストを作成",
    placeholder: "リストのタイトル…",
    empty: "まだリストがありません。",
    items: "件",
    backAll: "← すべてのリスト",
    addTextBlock: "テキストブロックを追加",
    editTextBlock: "ブロックを編集",
    deleteItem: "削除",
    moveUp: "上へ移動",
    moveDown: "下へ移動",
    open: "開く",
    confirmDeleteItem:
      "この項目を削除しますか？",
    newTextPlaceholder: "テキストを入力してください…",

    shareCode: "コード",
    importCode: "コードをインポート",
    importPrompt:
      "ここに TheWord の共有コードを貼り付けてください:",
    importError: "無効なコードです。",
    importSuccess: "リストをインポートしました ✅",
    shareCodeCopied:
      "コードをクリップボードにコピーしました ✅",

    importTextButton: "テキスト → リスト",
    importTextTitlePlaceholder:
      "新しいリストのタイトル",
    importTextDefaultTitle: "テキストのインポート",
    importTextBodyPlaceholder:
      "ここにテキストを貼り付けてください…",
    importTextNoBody:
      "インポートするテキストを貼り付けてください。",
    importTextNoBlock:
      "ブロックが検出されませんでした（ブロックに分ける場合は空行を入れてください）。",
    importTextSplitLabel:
      "ブロックに分割（1 行以上の空行で区切る）",
    importTextInfo:
      "各ブロックがリストの 1 項目になります。",
    importTextCreate: "リストを作成",

    duplicateTitle:
      "同じタイトルのリストがすでに存在します。",
    confirmDeleteList:
      "このリストを削除しますか？",
    emptyList: "空のリストです。",

    importFromTextTitle:
      "テキストからインポート",
    documentContent: "文書の内容",
    renameList: "名前を変更"
  },

  // Principles page
  principlesPage: {
    create: "学びを作成",
    placeholder: "学びのタイトル…",
    empty: "まだ学びがありません。",
    items: "件",
    backAll: "← すべての学び",
    addTextBlock: "テキストブロックを追加",
    editTextBlock: "ブロックを編集",
    deleteItem: "削除",
    moveUp: "上へ移動",
    moveDown: "下へ移動",
    open: "開く",
    openReading: "読む画面を開く",
    confirmDeleteItem:
      "この項目を削除しますか？",
    newTextPlaceholder: "テキストを入力してください…",

    shareCode: "コード",
    importCode: "コードをインポート",
    importPrompt:
      "ここに TheWord の共有コード（ノートまたは学び）を貼り付けてください:",
    importError: "無効なコードです。",
    importSuccess: "学びをインポートしました ✅",
    shareCodeCopied:
      "コードをクリップボードにコピーしました ✅",

    importTextButton: "テキスト → 学び",
    importTextTitlePlaceholder:
      "新しい学びのタイトル",
    importTextDefaultTitle: "テキストのインポート",
    importTextBodyPlaceholder:
      "ここにテキストを貼り付けてください…",
    importTextNoBody:
      "インポートするテキストを貼り付けてください。",
    importTextNoBlock:
      "ブロックが検出されませんでした（ブロックに分ける場合は空行を入れてください）。",
    importTextSplitLabel:
      "ブロックに分割（1 行以上の空行で区切る）",
    importTextInfo:
      "各ブロックが学びの 1 項目になります。",
    importTextCreate: "学びを作成",

    duplicateTitle:
      "同じタイトルの学びがすでに存在します。",
    confirmDeleteList:
      "この学びを削除しますか？",
    emptyList: "空の学びです。",

    importFromTextTitle:
      "テキストからインポート",
    documentContent: "文書の内容",
    renameList: "名前を変更",
    share: "共有",
    copy: "コピー",
    deleteList: "削除",

    shareStudyTitle: "学び",
    shareItemTitle: "聖句"
  },

  // Settings page
  appearance: "外観",
  lightMode: "ライトモード",
  darkMode: "ダークモード",
  fontSize: "文字サイズ",
  language: "言語",
  french: "フランス語",
  english: "英語",
  fontSizeXLLabel: "大きな文字モード (XL)",
  fontSizePreview:
    "選択した文字サイズのプレビュー。",
  updates: "アップデート",
  updatesDescription:
    "新しいバージョンがあるか確認して適用します。",
  applyUpdate: "アップデートを適用",
  checkUpdatesButton: "アップデートを確認",
  updatesChecking: "確認中…",
  updatesUpToDate: "アプリは最新です。",
  updatesReady:
    "新しいバージョンの準備ができました。「アップデートを適用」をタップしてください。",
  updatesUnavailable:
    "自動アップデートを利用できません（Service Worker が検出されません）。",
  updatesError:
    "確認中にエラーが発生しました。もう一度お試しください。",

  // About page
  aboutTitle: "",
  aboutDescription:
    "The Word は、ランダムな聖句と聖書通読を通して、神のことばを発見するのを助けるアプリです。",
  aboutIntro:
    "TheWord: オフラインで聖書を読み、すぐに検索し、テーマ別ノートを作り、ワンタップで共有できます。ウェブ版 TheWord もあります: www.theword.fr",
  bibleVersions: "聖書の翻訳",
  frenchVersion:
    "フランス語: Louis Segond 1910 (LSG) – 2025 改訂 – パブリックドメイン",
  englishVersion:
    "英語: King James Version (KJV) – パブリックドメイン",
  frenchVersionDetails:
    "フランス語聖書の代表的な翻訳で、Louis Segond により 1910 年に翻訳され、2025 年に語彙と文法が現代風に更新されました（原典写本に忠実）。",
  englishVersionDetails:
    "古典的な英語訳 (KJV) で、1611 年に刊行され、1769 年に改訂され、2025 年に軽い更新が加えられています。",
  otherLanguagesNote:
    "他の言語（ドイツ語、ポルトガル語など）も準備中です。それまでは、翻訳がない部分は英語で表示されます。",
  randomFeature: "ランダム機能",
  randomFeatureDesc:
    "ランダム聖句ジェネレーターが、3万1千節以上の聖句から 1 節を選び、毎日あなたに励ましを与えます。",
  musicLink: "創造主の音楽",
  versesLabel: "聖句",
  booksLabel: "書",
  readingShortcuts: "読書ショートカット",
  notesIntro:
    "お気に入りの聖句や思いを書き留め、テーマ別のリストに整理できます。",
  notesPoint1:
    "聖句や自由なテキストブロックを追加します。",
  notesPoint2:
    "項目をタップしてメニューを開きます（読む画面で開く／上へ移動／下へ移動／削除など）。",
  notesPoint3:
    "リストの名前を変更したり、コピー・共有したりできます。",
  createdWithLove:
    "神のことばを広めるために、愛を込めて作られました",
  versionsFootnote:
    "使用しているすべての聖書訳はパブリックドメインです。一部は語彙や文法が部分的に現代化されていますが、原典写本に厳密に忠実です。",

  // Quick slots
  quickSlotsIntro:
    "書／章セレクターの右側に並ぶ 4 つのボタンで、よく読む箇所にすぐ戻り、複数の書を並行して読むことができます。1/2/3 は 3 つの場所の保存に、虫眼鏡は最後に読んだ箇所（ランダム聖句または検索結果）に戻るために使います。",
  quickSlotsIllustrationLabel:
    "ショートカットのイラスト",
  quickSlotLastPassageTooltip: "最後の箇所",
  quickSlot1ActiveTooltip:
    "ショートカット 1（使用中）",
  quickSlot2Tooltip: "ショートカット 2",
  quickSlot3Tooltip: "ショートカット 3",

  // Common
  loading: "読み込み中...",
  error: "読み込み中にエラーが発生しました"
};

export default ja;
