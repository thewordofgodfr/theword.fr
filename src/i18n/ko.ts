// src/i18n/ko.ts
import type { TranslationDict } from './types';

const ko: TranslationDict = {
  // Navigation
  home: "홈",
  reading: "성경 읽기",
  search: "검색",
  settings: "설정",
  about: "정보",
  notes: "노트",
  principles: "성경공부",

  // Home page
  randomVerse: "무작위 구절",
  newVerse: "새 구절",
  copyVerse: "구절 복사",
  verseCopied: "구절이 복사되었습니다!",
  godSpeaks: "하나님이 당신에게 말씀하십니다",
  openJeremiah: "예레미야 23:29 열기",
  jeremiah23Quote:
    "“여호와의 말씀이니라, 내 말이 불 같지 아니하냐, 바위를 쳐서 부수는 망치 같지 아니하냐?” (예레미야 23:29)",

  // Reading page
  selectBook: "책 선택",
  selectChapter: "장 선택",
  chapter: "장",
  oldTestament: "구약",
  newTestament: "신약",

  // Reading – extras
  chooseBook: "책을 선택하세요",
  showInOtherLangs: '다른 언어',
  chooseChapter: "장을 선택하세요",
  prevChapter: "이전 장",
  nextChapter: "다음 장",
  verseWord: "절",
  versesSelectedSuffix: "개 절 선택됨",
  toNotes: "노트로 보내기",
  toPrinciples: "성경공부로",
  copyLabel: "복사",
  shareLabel: "공유",
  cancel: "취소",
  close: "닫기",
  notesModalTitle: "목록에 추가 (노트)",
  notesNoList: "아직 목록이 없습니다. 아래에서 새로 만드세요.",
  notesNewListOptional: "새 목록 (선택 사항)",
  principlesModalTitle: "연구에 추가 (연구)",
  principlesNoList: "아직 연구가 없습니다. 아래에서 새로 만드세요.",
  principlesNewListOptional: "새 연구 (선택 사항)",
  selectionCopied: "선택한 내용이 복사되었습니다",
  textReadyToShare: "공유할 텍스트가 준비되었습니다 (복사 완료)",
  addedToList: "목록에 추가되었습니다",
  newRandom: "새 무작위",
  swipeLabel: "옆으로 밀기",
  searchSlotLabel: "검색",
  searchSlotEmpty: "검색 (비어 있음)",
  memorySlotLabel: "슬롯",
  emptySlotSuffix: "(비어 있음)",
  untitledList: "(제목 없음)",

  // Short label “Copied”
  copiedShort: "복사됨",

  // Search page
  searchTitle: "성경 검색",
  searchPlaceholder: "검색어를 입력하세요",
  searchMinChars: "검색하려면 최소 두 글자를 입력하세요.",
  searchSearching: "검색 중…",
  searchResults: "결과",
  searchExpandAll: "모두 펼치기",
  searchCollapseAll: "모두 접기",
  searchNoResults: "구절을 찾을 수 없습니다.",
  searchClear: "지우기",
  searchOpenInReading: "읽기에서 열기",

  // Notes page
  notesPage: {
    create: "목록 만들기",
    placeholder: "목록 제목…",
    empty: "아직 목록이 없습니다.",
    items: "개 항목",
    backAll: "← 모든 목록",
    addTextBlock: "텍스트 블록 추가",
    editTextBlock: "블록 편집",
    deleteItem: "삭제",
    moveUp: "위로 이동",
    moveDown: "아래로 이동",
    open: "열기",
    confirmDeleteItem: "이 항목을 삭제하시겠습니까?",
    newTextPlaceholder: "텍스트를 입력하세요…",

    // Share / import via code
    shareCode: "코드",
    importCode: "코드 가져오기",
    importPrompt: "여기에 TheWord 공유 코드를 붙여넣으세요:",
    importError: "잘못된 코드입니다.",
    importSuccess: "목록을 성공적으로 가져왔습니다 ✅",
    shareCodeCopied: "코드를 클립보드에 복사했습니다 ✅",

    // Direct import from text
    importTextButton: "텍스트 → 목록",
    importTextTitlePlaceholder: "새 목록 제목",
    importTextDefaultTitle: "텍스트 가져오기",
    importTextBodyPlaceholder: "여기에 텍스트를 붙여넣으세요…",
    importTextNoBody: "가져올 텍스트를 붙여넣어 주세요.",
    importTextNoBlock:
      "블록이 감지되지 않았습니다 (블록으로 나누려면 빈 줄을 남겨 두세요).",
    importTextSplitLabel:
      "블록으로 나누기 (최소 한 줄의 빈 줄로 구분)",
    importTextInfo: "각 블록은 목록의 한 항목이 됩니다.",
    importTextCreate: "목록 만들기",

    duplicateTitle: "같은 제목의 목록이 이미 존재합니다.",
    confirmDeleteList: "이 목록을 삭제하시겠습니까?",
    emptyList: "비어 있는 목록입니다.",

    importFromTextTitle: "텍스트에서 가져오기",
    documentContent: "문서 내용",
    renameList: "이름 바꾸기"
  },

  // Principles page
  principlesPage: {
    create: "연구 만들기",
    placeholder: "연구 제목…",
    empty: "아직 연구가 없습니다.",
    items: "개 항목",
    backAll: "← 모든 연구",
    addTextBlock: "텍스트 블록 추가",
    editTextBlock: "블록 편집",
    deleteItem: "삭제",
    moveUp: "위로 이동",
    moveDown: "아래로 이동",
    open: "열기",
    openReading: "읽기 열기",
    confirmDeleteItem: "이 항목을 삭제하시겠습니까?",
    newTextPlaceholder: "텍스트를 입력하세요…",

    shareCode: "코드",
    importCode: "코드 가져오기",
    importPrompt: "여기에 TheWord 공유 코드(노트 또는 연구)를 붙여넣으세요:",
    importError: "잘못된 코드입니다.",
    importSuccess: "연구를 성공적으로 가져왔습니다 ✅",
    shareCodeCopied: "코드를 클립보드에 복사했습니다 ✅",

    importTextButton: "텍스트 → 연구",
    importTextTitlePlaceholder: "새 연구 제목",
    importTextDefaultTitle: "텍스트 가져오기",
    importTextBodyPlaceholder: "여기에 텍스트를 붙여넣으세요…",
    importTextNoBody: "가져올 텍스트를 붙여넣어 주세요.",
    importTextNoBlock:
      "블록이 감지되지 않았습니다 (블록으로 나누려면 빈 줄을 남겨 두세요).",
    importTextSplitLabel:
      "블록으로 나누기 (최소 한 줄의 빈 줄로 구분)",
    importTextInfo: "각 블록은 연구의 한 항목이 됩니다.",
    importTextCreate: "연구 만들기",

    duplicateTitle: "같은 제목의 연구가 이미 존재합니다.",
    confirmDeleteList: "이 연구를 삭제하시겠습니까?",
    emptyList: "비어 있는 연구입니다.",

    importFromTextTitle: "텍스트에서 가져오기",
    documentContent: "문서 내용",
    renameList: "이름 바꾸기",
    share: "공유",
    copy: "복사",
    deleteList: "삭제",

    shareStudyTitle: "연구",
    shareItemTitle: "구절"
  },

  // Settings page
  appearance: "모양",
  lightMode: "라이트 모드",
  darkMode: "다크 모드",
  fontSize: "글자 크기",
  language: "언어",
  french: "프랑스어",
  english: "영어",
  fontSizeXLLabel: "저시력 모드 (XL)",
  fontSizePreview: "선택한 글자 크기의 미리 보기입니다.",
  updates: "업데이트",
  updatesDescription:
    "새 버전이 있는지 확인하고 적용합니다.",
  applyUpdate: "업데이트 적용",
  checkUpdatesButton: "업데이트 확인",
  updatesChecking: "확인 중…",
  updatesUpToDate: "앱이 최신 버전입니다.",
  updatesReady:
    "새 버전이 준비되었습니다. \"업데이트 적용\"을 눌러 주세요.",
  updatesUnavailable:
    "자동 업데이트를 사용할 수 없습니다 (Service Worker를 찾을 수 없음).",
  updatesError: "확인 중 오류가 발생했습니다. 다시 시도해 주세요.",

  // About page
  aboutTitle: "",
  aboutDescription:
    "The Word는 무작위 구절과 성경 전체 읽기를 통해 하나님의 말씀을 발견하도록 도와줍니다.",
  aboutIntro:
    "TheWord: 오프라인 성경 읽기, 즉시 검색, 주제별 노트, 한 번에 공유. 웹에서도 TheWord를 사용할 수 있습니다: www.theword.fr",
  bibleVersions: "성경 번역들",
  frenchVersion:
    "프랑스어: Louis Segond 1910 (LSG) – 2025 개정 – 퍼블릭 도메인",
  englishVersion:
    "영어: King James Version (KJV) – 퍼블릭 도메인",
  frenchVersionDetails:
    "프랑스어 성경의 표준 번역으로, 1910년 Louis Segond가 번역했으며 2025년에 어휘와 문법이 현대화되었습니다 (원문 사본에 충실).",
  englishVersionDetails:
    "고전적인 영어 번역(KJV)으로 1611년에 출판되고 1769년에 개정되었으며 2025년에 일부 현대화되었습니다.",
  otherLanguagesNote:
    "다른 언어(독일어, 포르투갈어 등)가 준비 중입니다. 번역이 아직 준비되지 않은 경우 인터페이스는 영어로 표시됩니다.",
  randomFeature: "무작위 기능",
  randomFeatureDesc:
    "무작위 구절 생성기는 31,000개가 넘는 성경 구절 중에서 선택하여 매일 영감을 드립니다.",
  musicLink: "창조주의 음악",
  versesLabel: "구절",
  booksLabel: "책",
  readingShortcuts: "읽기 바로가기",
  notesIntro:
    "좋아하는 구절과 생각을 주제별 목록으로 정리하세요.",
  notesPoint1: "구절이나 자유 텍스트 블록을 추가하세요.",
  notesPoint2:
    "항목을 탭하면 메뉴가 열립니다 (읽기에서 열기, 위/아래로 이동, 삭제 등).",
  notesPoint3: "목록 이름을 바꾸고 복사하거나 공유할 수 있습니다.",
  createdWithLove:
    "하나님의 말씀을 전하기 위해 사랑으로 만들었습니다",
  versionsFootnote:
    "사용되는 모든 성경 번역은 퍼블릭 도메인입니다. 일부는 어휘와 문법이 부분적으로 현대화되었지만, 원본 사본에 엄격히 충실합니다.",

  // Quick slots
  quickSlotsIntro:
    "책/장 선택기 오른쪽에 있는 네 개의 버튼은 자주 읽는 본문으로 즉시 돌아가 여러 책을 병행해서 읽을 수 있게 해 줍니다. 1/2/3은 세 개의 위치에, 돋보기는 마지막 본문(무작위 구절 또는 검색 결과)에 사용하세요.",
  quickSlotsIllustrationLabel: "바로가기 예시",
  quickSlotLastPassageTooltip: "마지막 본문",
  quickSlot1ActiveTooltip: "바로가기 1 (활성)",
  quickSlot2Tooltip: "바로가기 2",
  quickSlot3Tooltip: "바로가기 3",

  // Common
  loading: "로딩 중...",
  error: "로딩 중 오류가 발생했습니다"
};

export default ko;
