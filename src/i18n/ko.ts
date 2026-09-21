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
    "성경 전체에서 단어나 문구를 즉시 검색하고, 결과를 읽기 화면에서 연 다음, 한 번의 터치로 구절을 복사하거나 공유하세요.",
  aboutIntro: `왜 The Word인가요?

저는 성경의 여러 책을 함께 읽으면서도 어디까지 읽었는지 놓치지 않기 위해 The Word를 만들었습니다. 시간이 지나면서 다른 기능들도 추가되었지만 목적은 언제나 같았습니다. 모든 사람이 하나님의 말씀을 읽고, 묵상하고, 기억하며, 삶에서 실천하도록 돕는 것입니다.

나의 바람

수많은 목소리가 우리에게 영향을 주려 하는 세상에서 저의 바람은 단순합니다. 모든 사람이 진실한 마음으로 성경으로 직접 돌아가 그 안에서 진리를 찾도록 격려하는 것입니다.

이 앱을 통해 여러분이 하나님의 사랑을 발견하고, 예수 그리스도를 알아 가며, 우리를 하나님과 화목하게 하시기 위해 그분이 이루신 일을 이해하게 되기를 기도합니다.

하나님의 말씀을 읽으십시오. 주의 깊게 살펴보십시오. 하나님께 인도해 달라고 구한 뒤, 믿음과 회개와 순종으로 그분의 부르심에 응답하십시오.

“너희가 내 말에 거하면 참으로 내 제자가 되고, 진리를 알게 될 것이며, 진리가 너희를 자유롭게 할 것이다.”

요한복음 8:31-32`,
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
    "본문 안내: 앱에 포함된 각 성경은 해당 라이선스에 따라 사용됩니다. Louis Segond 1910만 원문 사본을 엄격히 존중하는 범위에서 2025년에 문법과 어휘가 현대화되었습니다.",

  // Quick slots
  quickSlotsIntro:
    "이 4개의 버튼을 사용하면 자주 읽는 위치로 즉시 돌아가 여러 성경 책을 동시에 읽을 수 있습니다. 1/2/3은 서로 다른 3개의 저장 위치로 사용하고, 돋보기는 마지막으로 열었던 구절(무작위 구절 또는 검색 결과)로 돌아갈 때 사용합니다.",
  quickSlotsIllustrationLabel: "바로가기 예시",
  quickSlotLastPassageTooltip: "마지막 본문",
  quickSlot1ActiveTooltip: "바로가기 1 (활성)",
  quickSlot2Tooltip: "바로가기 2",
  quickSlot3Tooltip: "바로가기 3",
notesHelpTitle: '노트와 연구 — 사용 안내',

notesHelpIntro:
'노트와 연구 페이지에서는 구절을 주제별 목록에 저장하고 정리한 뒤 자신의 텍스트 블록을 추가할 수 있습니다. 성경 구절을 모으고 생각을 기록하며 체계적인 성경 연구를 만들 수 있습니다. 노트와 연구는 기기에 로컬로 저장되며 계정 없이 사용할 수 있습니다.',

notesHelp1Title: '1. 목록 만들기 및 관리',

notesHelp1Body:
'기본 페이지에는 모든 노트 목록 또는 연구가 표시됩니다. 목록을 만들고 제목을 지정하거나 이름을 변경하고 삭제할 수 있습니다. 목록을 탭하면 내용이 열립니다. “모든 목록” 또는 “모든 연구” 버튼으로 전체 보기로 돌아갑니다. 페이지를 다시 열면 마지막으로 사용한 목록이 자동으로 열리고 마지막 항목 근처로 이동합니다.',

notesHelp2Title: '2. 성경에서 구절 추가',

notesHelp2Body:
'읽기 페이지에서 하나 이상의 구절을 선택한 다음 노트 또는 연구 버튼을 사용하세요. 구절은 참조와 본문을 포함하여 선택한 목록에 추가됩니다. 여러 목록을 선택하여 같은 구절을 서로 다른 곳에 저장할 수 있습니다.',

notesHelp3Title: '3. 텍스트 블록 추가',

notesHelp3Body:
'구절 외에도 의견, 묵상, 질문, 기도, 설교 요점 또는 기타 내용을 추가할 수 있습니다. “텍스트 블록 추가” 버튼은 열린 목록의 위와 아래에 있습니다. 항목 옆의 + 버튼을 사용하면 해당 위치에 블록을 삽입할 수 있습니다. 각 블록은 수정, 이동 또는 삭제할 수 있습니다.',

notesHelp4Title: '4. 항목 사용 및 재정렬',

notesHelp4Body:
'항목 메뉴를 열어 사용할 수 있는 작업을 확인하세요. 구절은 읽기 페이지에서 열거나 복사 또는 공유할 수 있습니다. 텍스트 블록은 복사, 공유 또는 수정할 수 있습니다. 위아래 화살표로 구절과 블록의 순서를 바꿀 수 있으며 각 항목을 개별적으로 삭제할 수도 있습니다.',

notesHelp5Title: '5. 전체 목록 복사 또는 공유',

notesHelp5Body:
'노트 목록이나 연구의 메뉴에서 “복사”와 “공유”를 사용하면 제목, 성경 참조, 구절 본문, 개인 텍스트 블록을 포함한 전체 내용을 가져올 수 있습니다. 메시지나 문서에 붙여 넣거나 기기에 설치된 호환 앱으로 보낼 수 있습니다.',

notesHelp6Title: '6. The Word 코드로 공유 또는 전송',

notesHelp6Body:
'“코드” 버튼은 목록 제목과 전체 내용이 담긴 간단한 코드를 복사합니다. 다른 The Word 사용자는 “코드 가져오기”를 선택하여 자신의 기기에 같은 목록을 만들 수 있습니다. 한 페이지에서 코드를 복사하고 다른 페이지에서 가져오면 노트와 연구 사이에서도 내용을 옮길 수 있습니다.',

notesHelp7Title: '7. 텍스트 문서 가져오기',

notesHelp7Body:
'“텍스트에서 가져오기”를 사용하면 문서, 이메일, 설교 또는 연구 계획을 붙여 넣을 수 있습니다. 문서를 하나의 블록으로 유지하거나 빈 줄을 기준으로 여러 블록으로 자동 분할할 수 있습니다. 선택한 제목으로 새 노트 목록 또는 연구가 만들어집니다.',

notesHelp8Title: '8. 로컬 저장 및 백업',

notesHelp8Body:
'노트와 연구는 기기에 로컬로 저장되며 계정이나 서버와 자동으로 동기화되지 않습니다. 앱을 제거하거나 데이터를 초기화하거나 브라우저 데이터를 삭제하면 내용이 영구적으로 사라질 수 있습니다. 중요한 목록은 복사, 공유 또는 The Word 코드를 사용해 보관하세요.',

notesHelp9Title: '9. 활용 아이디어',

notesHelp9Body:
'노트는 암송할 구절, 매일의 생각, 설교 준비 또는 기도 목록에 사용할 수 있습니다. 연구는 주제나 성경의 한 책을 깊이 살펴보거나 가정 모임, 교육 계획 또는 메시지 시리즈를 준비하는 데 사용할 수 있습니다.',

notesHelp10Title: '10. 노트와 연구 함께 사용하기',

notesHelp10Body:
'노트와 연구를 함께 사용할 수 있습니다. 노트에 구절, 생각, 기도를 빠르게 모은 뒤 더 깊이 살펴볼 항목을 The Word 코드로 연구에 옮기세요. 이후 순서를 바꾸고 내용을 확장하며 공유할 수 있습니다.',
  // Common
  loading: "로딩 중...",
  error: "로딩 중 오류가 발생했습니다"
};

export default ko;
