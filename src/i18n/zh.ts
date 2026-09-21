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
    "即时搜索整本圣经中的单词或短语，在“阅读”页面打开搜索结果，并可一键复制或分享经文。",
  aboutIntro: `为什么选择 The Word？

我创建 The Word，是为了能够同时阅读多卷圣经，并且不会忘记自己的阅读进度。随着时间推移，我又加入了其他功能，但目的始终不变：帮助每个人阅读、默想、牢记并实践上帝的话语。

我的心愿

在这个有许多声音试图影响我们的世界里，我的心愿很简单：鼓励每个人怀着真诚的心直接回到圣经，在其中寻求真理。

我祷告这个应用能够帮助你发现上帝的爱、认识耶稣基督，并明白他为使我们与上帝和好所成就的一切。

请阅读他的话语，认真查考，求上帝引导你，然后以信心、悔改和顺服回应他的呼召。

“你们若常常遵守我的道，就真是我的门徒；你们必认识真理，真理也必使你们自由。”

约翰福音 8:31-32`,
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
    "关于经文：应用中收录的各个圣经版本均按照各自的许可协议使用。只有 Louis Segond 1910 在严格尊重原始手稿的前提下，于2025年对语法和词汇进行了现代化调整。",

  // Quick slots
  quickSlotsIntro:
    "这 4 个按钮可让您立即返回经常阅读的位置，并同时阅读多卷书：使用 1/2/3 保存 3 个不同的位置，使用放大镜返回上一次打开的经文（随机经文或搜索结果）。",
  quickSlotsIllustrationLabel:
    "快捷方式示意图",
  quickSlotLastPassageTooltip:
    "上一次经文",
  quickSlot1ActiveTooltip:
    "快捷 1（当前）",
  quickSlot2Tooltip: "快捷 2",
  quickSlot3Tooltip: "快捷 3",
notesHelpTitle: '笔记与研读 — 使用指南',

notesHelpIntro:
'“笔记”和“研读”页面可让你按主题列表保存、整理经文，并添加自己的文本块。你可以汇集经文、记录想法并创建结构清晰的圣经研读。笔记和研读内容保存在你的设备本地，无需账户即可使用。',

notesHelp1Title: '1. 创建和管理列表',

notesHelp1Body:
'主页会显示所有笔记列表或研读。你可以创建列表、设置标题、重命名或删除列表。点击列表即可打开其内容。“所有列表”或“所有研读”按钮可返回总览。再次打开笔记或研读时，应用会自动打开上次使用的列表，并移动到最后一个项目附近，方便继续编辑。',

notesHelp2Title: '2. 从圣经添加经文',

notesHelp2Body:
'在“阅读”页面选择一节或多节经文，然后点击“笔记”或“研读”。经文及其出处和正文会添加到你选择的列表中。你可以同时选择多个列表，将同一节经文保存在不同位置。',

notesHelp3Title: '3. 添加文本块',

notesHelp3Body:
'除了经文，你还可以添加评论、思考、问题、祷告、讲道要点或其他内容。打开列表后，其顶部和底部都有“添加文本块”按钮。项目旁边的 + 按钮还可在该位置插入文本块。每个文本块都可以编辑、移动或删除。',

notesHelp4Title: '4. 使用和重新排列项目',

notesHelp4Body:
'打开项目菜单即可查看可用操作。经文可以直接在“阅读”页面打开、复制或分享。文本块可以复制、分享或编辑。使用向上和向下箭头可调整经文和文本块的顺序。每个项目也可以单独删除。',

notesHelp5Title: '5. 复制或分享整个列表',

notesHelp5Body:
'在笔记列表或研读的菜单中，“复制”和“分享”按钮可获取全部内容，包括标题、圣经出处、经文正文和个人文本块。然后你可以将内容粘贴到消息或文档中，或使用设备上兼容的应用发送。',

notesHelp6Title: '6. 使用 The Word 代码分享或转移',

notesHelp6Body:
'“代码”按钮会复制一段包含列表标题和全部内容的简短代码。其他 The Word 用户可以选择“导入代码”，在自己的设备上重新创建该列表。你也可以在一个页面复制代码，再在另一个页面导入，从而在笔记与研读之间转移内容。',

notesHelp7Title: '7. 导入文本文档',

notesHelp7Body:
'“从文本导入”可让你粘贴文档、电子邮件、讲道或研读计划的内容。你可以将文档保留为单个文本块，也可以让应用按照空行自动分成多个文本块。应用随后会使用你选择的标题创建新的笔记列表或研读。',

notesHelp8Title: '8. 本地存储与备份',

notesHelp8Body:
'笔记和研读保存在设备本地，不会自动与账户或服务器同步。如果卸载应用、重置应用数据或清除浏览器数据，内容可能会被永久删除。请使用复制、分享或 The Word 代码保存重要列表。',

notesHelp9Title: '9. 使用建议',

notesHelp9Body:
'你可以使用笔记保存需要背诵的经文、记录每日思考、准备讲道或建立祷告清单。使用研读可以更完整地研究某个主题或书卷，也可用于家庭小组、教学计划或系列信息。',

notesHelp10Title: '10. 结合使用笔记与研读',

notesHelp10Body:
'笔记和研读可以配合使用。例如，先在笔记中快速收集经文、想法和祷告，再通过 The Word 代码将需要深入研究的项目转移到研读。之后可以重新排列、扩充并分享这些内容。',
  // Common
  loading: "加载中...",
  error: "加载时出错",
};

export default zh;
