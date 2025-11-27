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
  principles: "研读",

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
  chooseChapter: "选择一章",
  prevChapter: "上一章",
  nextChapter: "下一章",
  verseWord: "节",
  versesSelectedSuffix: "节已选",
  toNotes: "前往笔记",
  toPrinciples: "前往研读",
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
  aboutIntro:
    "TheWord：离线读经、即时搜索、主题笔记、一键分享。也可以在网页上使用 TheWord：www.theword.fr",
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
    "所有使用的圣经版本都属于公有领域。其中一些在词汇和语法上略作现代化，但仍完全忠于原始手稿。",

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
