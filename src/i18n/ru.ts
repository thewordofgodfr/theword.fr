// src/i18n/ru.ts
import type { TranslationDict } from './types';

const ru: TranslationDict = {
  // Navigation
  home: 'Главная',
  reading: 'Чтение',
  search: 'Поиск',
  settings: 'Настройки',
  about: 'О приложении',
  notes: 'Заметки',
  principles: 'Принципы',

  // Home page
  randomVerse: 'Случайный стих',
  newVerse: 'Новый стих',
  copyVerse: 'Копировать стих',
  verseCopied: 'Стих скопирован!',
  godSpeaks: 'Бог говорит вам',
  openJeremiah: 'Открыть Иеремию 23:29',
  jeremiah23Quote:
    '«Не подобно ли слово Мое огню, говорит Господь, и как молот, разбивающий скалу?» Иеремия 23:29',

  // Reading page
  selectBook: 'Выберите книгу',
  selectChapter: 'Выберите главу',
  chapter: 'Глава',
  oldTestament: 'Ветхий Завет',
  newTestament: 'Новый Завет',

  // Reading – compléments
  chooseBook: 'Выбрать книгу',
  chooseChapter: 'Выбрать главу',
  prevChapter: 'Предыдущая глава',
  nextChapter: 'Следующая глава',
  verseWord: 'стих',
  versesSelectedSuffix: 'выбранные стихи',
  toNotes: 'К заметкам',
  toPrinciples: 'К принципам',
  copyLabel: 'Копировать',
  shareLabel: 'Поделиться',
  cancel: 'Отмена',
  close: 'Закрыть',
  notesModalTitle: 'Добавить в список (Заметки)',
  notesNoList: 'Пока нет ни одного списка. Создайте его ниже.',
  notesNewListOptional: 'Новый список (необязательно)',
  principlesModalTitle: 'Добавить в исследование (Принципы)',
  principlesNoList: 'Пока нет ни одного исследования. Создайте его ниже.',
  principlesNewListOptional: 'Новое исследование (необязательно)',
  selectionCopied: 'Выделение скопировано',
  textReadyToShare: 'Текст готов к отправке (скопирован)',
  addedToList: 'Добавлено в список',
  newRandom: 'Новый случайный',
  swipeLabel: 'Смахните',
  searchSlotLabel: 'Поиск',
  searchSlotEmpty: 'Поиск (пусто)',
  memorySlotLabel: 'Ячейка',
  emptySlotSuffix: '(пусто)',
  untitledList: '(без названия)',

  // Petit libellé court pour “Copié”
  copiedShort: 'Скопировано',

  // *** Search page ***
  searchTitle: 'Библейский поиск',
  searchPlaceholder: 'Введите запрос',
  searchMinChars: 'Введите как минимум 2 символа.',
  searchSearching: 'Поиск…',
  searchResults: 'Результаты',
  searchExpandAll: 'Открыть всё',
  searchCollapseAll: 'Свернуть всё',
  searchNoResults: 'Стихи не найдены.',
  searchClear: 'Очистить',
  searchOpenInReading: 'Открыть в Чтении',

  // Bloc Notes (page Notes)
  notesPage: {
    create: 'Создать список',
    placeholder: 'Название списка…',
    empty: 'Пока нет ни одного списка.',
    items: 'элементов',
    backAll: '← Все списки',
    addTextBlock: 'Добавить текстовый блок',
    editTextBlock: 'Изменить блок',
    deleteItem: 'Удалить',
    moveUp: 'Переместить вверх',
    moveDown: 'Переместить вниз',
    open: 'Открыть',
    confirmDeleteItem: 'Удалить этот элемент?',
    newTextPlaceholder: 'Ваш текст…',

    // Partage / import via code
    shareCode: 'Код',
    importCode: 'Импортировать код',
    importPrompt: 'Вставьте сюда код общего доступа TheWord:',
    importError: 'Недействительный код.',
    importSuccess: 'Список успешно импортирован ✅',
    shareCodeCopied: 'Код скопирован в буфер обмена ✅',

    // Import direct depuis un texte
    importTextButton: 'Текст → Список',
    importTextTitlePlaceholder: 'Название нового списка',
    importTextDefaultTitle: 'Импорт текста',
    importTextBodyPlaceholder: 'Вставьте сюда ваш текст…',
    importTextNoBody: 'Пожалуйста, вставьте текст для импорта.',
    importTextNoBlock:
      'Не найдено ни одного блока (оставьте пустые строки, если хотите разделить текст на блоки).',
    importTextSplitLabel:
      'Разделить на блоки (отделены как минимум одной пустой строкой)',
    importTextInfo: 'Каждый блок станет отдельным элементом списка.',
    importTextCreate: 'Создать список',

    duplicateTitle: 'Список с таким названием уже существует.',
    confirmDeleteList: 'Удалить этот список?',
    emptyList: 'Список пуст.',

    importFromTextTitle: 'Импортировать из текста',
    documentContent: 'Содержание документа',
    renameList: 'Переименовать',
  },

  // Bloc Principes (page Principes)
  principlesPage: {
    create: 'Создать исследование',
    placeholder: 'Название исследования…',
    empty: 'Пока нет ни одного исследования.',
    items: 'элементов',
    backAll: '← Все исследования',
    addTextBlock: 'Добавить текстовый блок',
    editTextBlock: 'Изменить блок',
    deleteItem: 'Удалить',
    moveUp: 'Переместить вверх',
    moveDown: 'Переместить вниз',
    open: 'Открыть',
    openReading: 'Открыть чтение',
    confirmDeleteItem: 'Удалить этот элемент?',
    newTextPlaceholder: 'Ваш текст…',

    // Partage / import via code
    shareCode: 'Код',
    importCode: 'Импортировать код',
    importPrompt:
      'Вставьте сюда код общего доступа TheWord (заметка или исследование):',
    importError: 'Недействительный код.',
    importSuccess: 'Исследование успешно импортировано ✅',
    shareCodeCopied: 'Код скопирован в буфер обмена ✅',

    // Import direct depuis un texte
    importTextButton: 'Текст → Исследование',
    importTextTitlePlaceholder: 'Название нового исследования',
    importTextDefaultTitle: 'Импорт текста',
    importTextBodyPlaceholder: 'Вставьте сюда ваш текст…',
    importTextNoBody: 'Пожалуйста, вставьте текст для импорта.',
    importTextNoBlock:
      'Не найдено ни одного блока (оставьте пустые строки, если хотите разделить текст на блоки).',
    importTextSplitLabel:
      'Разделить на блоки (отделены как минимум одной пустой строкой)',
    importTextInfo: 'Каждый блок станет отдельным элементом исследования.',
    importTextCreate: 'Создать исследование',

    duplicateTitle: 'Исследование с таким названием уже существует.',
    confirmDeleteList: 'Удалить это исследование?',
    emptyList: 'Исследование пусто.',

    importFromTextTitle: 'Импортировать из текста',
    documentContent: 'Содержание документа',
    renameList: 'Переименовать',
    share: 'Поделиться',
    copy: 'Копировать',
    deleteList: 'Удалить',

    // Titres pour le partage natif
    shareStudyTitle: 'Исследование',
    shareItemTitle: 'Стих',
  },

  // Settings page
  appearance: 'Оформление',
  lightMode: 'Светлая тема',
  darkMode: 'Тёмная тема',
  fontSize: 'Размер шрифта',
  language: 'Язык',
  french: 'Французский',
  english: 'Английский',
  fontSizeXLLabel: 'Режим для слабовидящих (XL)',
  fontSizePreview: 'Пример выбранного размера шрифта.',
  updates: 'Обновления',
  updatesDescription:
    'Проверяет, доступна ли новая версия приложения, и применяет её.',
  applyUpdate: 'Применить обновление',
  checkUpdatesButton: 'Проверить обновления',
  updatesChecking: 'Проверка…',
  updatesUpToDate: 'Приложение обновлено.',
  updatesReady: 'Новая версия готова. Нажмите «Применить обновление».',
  updatesUnavailable:
    'Автоматическое обновление недоступно (Service Worker не найден).',
  updatesError: 'Ошибка при проверке. Повторите попытку.',

  // About page
  aboutTitle: '',
  aboutDescription:
    'The Word помогает вам открывать Слово Божье через случайные стихи и последовательное чтение всей Библии.',
  aboutIntro:
    'TheWord: офлайн-чтение Библии, мгновенный поиск, тематические заметки, возможность делиться в один жест. Также используйте TheWord в интернете: www.theword.fr',
  bibleVersions: 'Переводы Библии',
  frenchVersion:
    'Французский: Louis Segond 1910 (LSG) – редакция 2025 – общественное достояние',
  englishVersion:
    'Английский: King James Version (KJV) – общественное достояние',
  frenchVersionDetails:
    'Версия Библии на французском языке, переведённая Луи Сегоном в 1910 году и обновлённая в 2025 году (обновлённая лексика и грамматика, верность рукописям).',
  englishVersionDetails:
    'Классический английский перевод (KJV), опубликованный в 1611 году, пересмотренный в 1769 году и слегка обновлённый в 2025 году.',
  otherLanguagesNote:
    'Другие языки (немецкий, португальский и др.) находятся в разработке. Пока нет перевода, интерфейс отображается на английском.',
  randomFeature: 'Функция «Случайный стих»',
  randomFeatureDesc:
    'Наш генератор случайных стихов выбирает из более чем 31 000 библейских стихов, чтобы ежедневно вдохновлять вас.',
  musicLink: 'Музыка Творца',
  versesLabel: 'Стихи',
  booksLabel: 'Книги',
  readingShortcuts: 'Быстрые переходы для чтения',
  notesIntro:
    'Организуйте избранные отрывки и личные мысли в тематические списки.',
  notesPoint1: 'Добавляйте стихи или произвольные текстовые блоки.',
  notesPoint2:
    'Нажмите на элемент, чтобы открыть меню (Открыть в Чтении, Переместить вверх/вниз, Удалить…).',
  notesPoint3: 'Переименовывайте списки, копируйте и делитесь.',
  createdWithLove: 'Создано с любовью, чтобы распространять Слово Божье',
  versionsFootnote:
    'Все используемые переводы Библии находятся в общественном достоянии. Некоторые из них частично модернизированы (лексика, грамматика), при этом строго сохраняя верность оригинальным рукописям.',

  // Quick slots / raccourcis lecture (About + Reading)
  quickSlotsIntro:
    'Эти 4 кнопки, расположенные справа от выбора Книга/Глава, позволяют мгновенно возвращаться к часто читаемым местам и параллельно следить за несколькими книгами: используйте 1/2/3 для трёх ячеек, а лупу — чтобы вернуться к последнему месту (случайный стих или результат поиска).',
  quickSlotsIllustrationLabel: 'Иллюстрация быстрых переходов',
  quickSlotLastPassageTooltip: 'Последний отрывок',
  quickSlot1ActiveTooltip: 'Быстрый переход 1 (активен)',
  quickSlot2Tooltip: 'Быстрый переход 2',
  quickSlot3Tooltip: 'Быстрый переход 3',

  // Common
  loading: 'Загрузка...',
  error: 'Ошибка при загрузке',
};

export default ru;
