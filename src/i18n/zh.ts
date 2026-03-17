// src/i18n/zh.ts
import type { TranslationDict } from './types';

const zh: TranslationDict = {
  // Navigation
  home: "首页",
  reading: "阅读",
  search: "搜索",
  settings: "设置",
  about: "关于",
  notes: "笔记",
  principles: "查经",

  // Home page
  randomVerse: "随机经文",
  newVerse: "新的经文",
  copyVerse: "复制经文",
  verseCopied: "经文已复制！",
  godSpeaks: "神在对你说话",
  openJeremiah: "打开耶利米书 23:29",
  jeremiah23Quote:
    "“耶和华说：我的话岂不是像火，又像能打碎磐石的锤子吗？”（耶利米书 23:29）",

  // Reading page
  selectBook: "选择卷书",
  selectChapter: "选择章",
  chapter: "章",
  oldTestament: "旧约",
  newTestament: "新约",

  // Reading – extras
  chooseBook: "选择一本书",
  showInOtherLangs: '其他语言',
  chooseChapter: "选择一章",
  prevChapter: "上一章",
  nextChapter: "下一章",
  verseWord: "节",
  versesSelectedSuffix: "节已选",
  toNotes: "前往笔记",
  toPrinciples: "前往查经",
  copyLabel: "复制",
  shareLabel: "分享",
  cancel: "取消",
  close: "关闭",
  notesModalTitle: "添加到列表（笔记）",
  notesNoList:
    "目前还没有列表。请在下方创建一个。",
  notesNewListOptional:
    "新列表（可选）",
  principlesModalTitle:
    "添加到研读（研读）",
  principlesNoList:
    "目前还没有研读。请在下方创建一个。",
  principlesNewListOptional:
    "新的研读（可选）",
  selectionCopied: "选中内容已复制",
  textReadyToShare:
    "文本已复制，可直接分享",
  addedToList: "已添加到列表",
  newRandom: "新的随机经文",
  swipeLabel: "滑动",
  searchSlotLabel: "搜索",
  searchSlotEmpty: "搜索（空）",
  memorySlotLabel: "快捷位",
  emptySlotSuffix: "（空）",
  untitledList: "（无标题）",

  // Short label “Copied”
  copiedShort: "已复制",

  // Search page
  searchTitle: "圣经搜索",
  searchPlaceholder: "输入要搜索的内容",
  searchMinChars:
    "请至少输入 2 个字符。",
  searchSearching: "正在搜索…",
  searchResults: "结果",
  searchExpandAll: "全部展开",
  searchCollapseAll: "全部收起",
  searchNoResults: "未找到经文。",
  searchClear: "清除",
  searchOpenInReading: "在阅读中打开",

  // Notes page
  notesPage: {
    create: "创建列表",
    placeholder: "列表标题…",
    empty: "目前还没有列表。",
    items: "项",
    backAll: "← 所有列表",
    addTextBlock: "添加文本块",
    editTextBlock: "编辑文本块",
    deleteItem: "删除",
    moveUp: "上移",
    moveDown: "下移",
    open: "打开",
    confirmDeleteItem: "确定删除此项目？",
    newTextPlaceholder: "你的文本…",

    shareCode: "代码",
    importCode: "导入代码",
    importPrompt:
      "在此粘贴 TheWord 分享代码：",
    importError: "无效的代码。",
    importSuccess:
      "列表导入成功 ✅",
    shareCodeCopied:
      "代码已复制到剪贴板 ✅",

    importTextButton: "文本 → 列表",
    importTextTitlePlaceholder:
      "新列表标题",
    importTextDefaultTitle: "文本导入",
    importTextBodyPlaceholder:
      "在此粘贴你的文本…",
    importTextNoBody:
      "请粘贴要导入的文本。",
    importTextNoBlock:
      "未检测到任何文本块（如需分块，请在段落间留空行）。",
    importTextSplitLabel:
      "按块分割（至少一行空行分隔）",
    importTextInfo:
      "每个块都会成为列表中的一个项目。",
    importTextCreate: "创建列表",

    duplicateTitle:
      "已存在同名列表。",
    confirmDeleteList:
      "确定要删除此列表？",
    emptyList: "空列表。",

    importFromTextTitle:
      "从文本导入",
    documentContent: "文档内容",
    renameList: "重命名",
  },

  // Principles page
  principlesPage: {
    create: "创建研读",
    placeholder: "研读标题…",
    empty: "目前还没有研读。",
    items: "项",
    backAll: "← 所有研读",
    addTextBlock: "添加文本块",
    editTextBlock: "编辑文本块",
    deleteItem: "删除",
    moveUp: "上移",
    moveDown: "下移",
    open: "打开",
    openReading: "打开阅读",
    confirmDeleteItem:
      "确定删除此项目？",
    newTextPlaceholder: "你的文本…",

    shareCode: "代码",
    importCode: "导入代码",
    importPrompt:
      "在此粘贴 TheWord 分享代码（笔记或研读）：",
    importError: "无效的代码。",
    importSuccess:
      "研读导入成功 ✅",
    shareCodeCopied:
      "代码已复制到剪贴板 ✅",

    importTextButton: "文本 → 研读",
    importTextTitlePlaceholder:
      "新研读标题",
    importTextDefaultTitle: "文本导入",
    importTextBodyPlaceholder:
      "在此粘贴你的文本…",
    importTextNoBody:
      "请粘贴要导入的文本。",
    importTextNoBlock:
      "未检测到任何文本块（如需分块，请在段落间留空行）。",
    importTextSplitLabel:
      "按块分割（至少一行空行分隔）",
    importTextInfo:
      "每个块都会成为研读中的一个项目。",
    importTextCreate: "创建研读",

    duplicateTitle:
      "已存在同名研读。",
    confirmDeleteList:
      "确定要删除此研读？",
    emptyList: "空研读。",

    importFromTextTitle:
      "从文本导入",
    documentContent: "文档内容",
    renameList: "重命名",
    share: "分享",
    copy: "复制",
    deleteList: "删除",

    shareStudyTitle: "研读",
    shareItemTitle: "经文",
  },

  // Settings
  appearance: "外观",
  lightMode: "浅色模式",
  darkMode: "深色模式",
  fontSize: "字体大小",
  language: "语言",
  french: "法语",
  english: "英语",
  fontSizeXLLabel:
    "大字体模式 (XL)",
  fontSizePreview:
    "所选字体大小的预览。",
  updates: "更新",
  updatesDescription:
    "检查是否有新版本并应用。",
  applyUpdate: "应用更新",
  checkUpdatesButton: "检查更新",
  updatesChecking: "正在检查…",
  updatesUpToDate:
    "你的应用已是最新版本。",
  updatesReady:
    "新版本已准备好。请点击“应用更新”。",
  updatesUnavailable:
    "自动更新不可用（未检测到 Service Worker）。",
  updatesError:
    "检查时发生错误，请重试。",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word 帮助你通过随机经文和完整读经来发现神的话语。",
  aboutIntro: `我为什么创建 The Word

起初，我创建这个应用只有一个很简单的原因：能够同时阅读圣经的多卷书，并且借助“阅读”页面的 1 / 2 / 3 标签，从一天到下一天都不丢失阅读的脉络。

随着时间推移，我加入了其他功能，但始终保持同一个目标：帮助您阅读、默想、记住并实践神的话语。

我为您祷告

我为您祷告的是：愿您被神的话语触动，明白神对您的爱，以及祂的儿子耶稣基督的爱，并且明白祂为使我们与神和好、在祂的爱中与祂同行所付出的代价。

神的爱与呼召人相信，在《约翰福音》中尤其清晰（例如：约翰 3:16）。

进入天国的关键，以及回应神的明确呼召，在《使徒行传》中也非常清楚（例如：使徒行传 2:38；使徒行传 4:12）。

圣经：神对我们说话

我们绝不可忘记：整本圣经都是神所默示的——是神在对我们说话；我们当敬畏祂并顺服祂。

提摩太后书 3:16-17  “圣经都是神所默示的…”
箴言 9:10  “敬畏耶和华是智慧的开端…”
约翰福音 13:34-35  “你们要彼此相爱，像我爱你们一样…”

时候不多：回应神的呼召

我相信时候不多，神切切盼望每个人回应祂的呼召：悔改、相信，并受洗得赦罪。这是极大的机会：与神永远同在。不要迟延，因为神必在祂所定的日子施行公义；耶稣也常常呼召我们要警醒并预备好。

哥林多前书 7:29  “时候不多…”
使徒行传 17:30-31  神吩咐众人都要悔改… “祂已经定了日子…”
使徒行传 2:38  “你们各人要悔改… 叫你们的罪得赦…”
马可福音 1:15  “你们应当悔改，信福音。”
马太福音 24:42-44  “所以你们要警醒… 要预备…”
路加福音 12:35-40  “你们腰里要束上带，灯也要点着…”

遗憾的是，许多人远离了圣经。圣经警告说，将来会有一个时候，有些人只想听自己喜欢的信息，并为自己“增添许多师傅”。

因此，我们蒙召要住在神的话语里，顺服神，行事为人与福音相称，也努力劝服我们周围的人。

提摩太后书 4:3-4  “随从自己的情欲… 增添好些师傅…”
约翰福音 8:31-32  “你们若常常遵守我的道…”
歌罗西书 1:23  “只要你们在所信的道上恒心…”
腓立比书 1:27  “行事为人与基督的福音相称…”
哥林多后书 5:20  “我们作基督的使者…”

有时，“教会”也可以很谦卑地开始：两个人一起寻求神。

马太福音 18:20  “因为无论在哪里，有两三个人奉我的名聚会…”

窄门：谦卑地与神同行

耶稣说门是窄的，通向灭亡的路是宽的。不要让罪使我们远离神。让我们以孩子般的心谦卑顺服祂的话：单纯、不虚伪，同时也清醒谨慎。

马太福音 7:13-14  “你们要进窄门…”
希伯来书 12:1-2  “脱去各样的重担…”
马太福音 18:3  “你们若不回转，变成小孩子…”
马太福音 10:16  “灵巧像蛇，驯良像鸽子…”

祷告、忍耐、不放弃

请祷告求神借着祂的话语和圣灵引导您。恳切祈求。不要灰心。不要放弃。即使义人经历苦难，神仍信实并施行拯救。

路加福音 18:1  “应当常常祷告，不可灰心”
雅各书 1:5  “若有缺少智慧的，应当求那厚赐与众人的神…”
诗篇 34:19  “义人多有苦难，但耶和华救他脱离这一切。”`,
  bibleVersions: "圣经版本",
  frenchVersion:
    "法语：Louis Segond 1910 (LSG) – 2025 修订版 – 公有领域",
  englishVersion:
    "英语：King James Version (KJV) – 公有领域",
  frenchVersionDetails:
    "法语权威译本，由 Louis Segond 于 1910 年翻译，并于 2025 年更新（词汇和语法现代化，忠于原始手稿）。",
  englishVersionDetails:
    "经典英文译本（KJV），1611 年出版，1769 年修订，并在 2025 年略作更新。",
  otherLanguagesNote:
    "更多语言（德语、葡萄牙语等）正在准备中。在没有翻译时，界面会默认使用英语。",
  randomFeature: "随机功能",
  randomFeatureDesc:
    "我们的随机经文生成器从 31,000 多节经文中为你挑选，每天带来新的灵感。",
  musicLink: "创造主的音乐",
  versesLabel: "经文",
  booksLabel: "卷书",
  readingShortcuts: "阅读快捷方式",
  notesIntro:
    "把你喜欢的经文和想法整理在主题列表中。",
  notesPoint1:
    "添加经文或自由文本块。",
  notesPoint2:
    "点击某一项打开菜单（在阅读中打开、上移/下移、删除等）。",
  notesPoint3:
    "重命名列表、复制和分享。",
  createdWithLove:
    "怀着爱心制作，只为传扬神的话语",
  versionsFootnote:
    "所有使用的圣经版本都属于公有领域。其中一些在词汇和语法上略作现代化，但仍完全忠于原始手稿。并严格尊重原始手稿。若您希望获得 Android 应用，请通过电子邮件向我提出请求，我会发送链接（测试版应用）。",

  // Quick slots
  quickSlotsIntro:
    "这 4 个按钮位于卷书/章节选择器右侧，可让你立即回到常读的经文，以便并行阅读多卷书：使用 1/2/3 保存三个位置，用放大镜返回到上一次阅读的位置（随机经文或搜索结果）。",
  quickSlotsIllustrationLabel:
    "快捷方式示意图",
  quickSlotLastPassageTooltip:
    "上一次经文",
  quickSlot1ActiveTooltip:
    "快捷 1（当前）",
  quickSlot2Tooltip: "快捷 2",
  quickSlot3Tooltip: "快捷 3",

  // Common
  loading: "加载中...",
  error: "加载时出错",
};

export default zh;
