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
  aboutIntro: `제가 The Word를 만든 이유

처음에 저는 아주 간단한 한 가지 이유로 이 앱을 만들었습니다. “읽기” 페이지의 1 / 2 / 3 탭 덕분에, 여러 성경 책을 동시에 읽으면서도 하루하루 흐름을 놓치지 않기 위해서입니다.

시간이 지나면서 저는 다른 기능들도 추가했습니다. 하지만 의도는 늘 같았습니다. 하나님의 말씀을 읽고, 묵상하고, 기억하고, 삶에서 실천하도록 돕기 위해서입니다.

여러분을 위한 저의 기도

저의 기도는 여러분이 하나님의 말씀으로 인해 마음이 움직이고, 하나님께서 여러분을 사랑하신다는 것과 그 아들 예수 그리스도의 사랑을 깨닫으며, 또한 우리가 하나님과 화목하게 되고 그분의 사랑 안에서 그분과 동행하도록 예수님께서 치르신 대가를 이해하게 되는 것입니다.

하나님의 사랑과 믿으라는 부르심은 요한복음에서 특히 분명하게 드러납니다 (예: 요한 3:16).

하나님께 응답하라는 분명한 부르심과 왕국에 들어가는 열쇠는 사도행전에서 분명하게 나타납니다 (예: 사도행전 2:38; 사도행전 4:12).

성경: 하나님께서 우리에게 말씀하십니다

성경 전체가 하나님의 감동으로 된 말씀이라는 사실을 결코 잊어서는 안 됩니다. 하나님께서 우리에게 말씀하시는 것이며, 우리는 그분을 경외하고 순종해야 합니다.

디모데후서 3:16-17  “모든 성경은 하나님의 감동으로 된 것으로…”
잠언 9:10  “여호와를 경외하는 것이 지혜의 근본이요…”
요한복음 13:34-35  “서로 사랑하라… 내가 너희를 사랑한 것 같이…”

때가 짧습니다: 하나님의 부르심에 응답하십시오

저는 때가 짧다고 믿으며, 하나님께서 모든 사람이 그분의 부르심에 응답하기를 간절히 원하신다고 믿습니다. 회개하고, 믿고, 죄 사함을 받기 위해 침례(세례)를 받는 것입니다. 이것은 엄청난 기회입니다. 하나님과 영원히 함께하는 것입니다. 지체하지 맙시다. 하나님께서는 정하신 날에 공의를 이루실 것이며, 예수님은 우리에게 자주 깨어 준비하라고 말씀하셨습니다.

고린도전서 7:29  “때가 단축하여진지라…”
사도행전 17:30-31  하나님께서 모든 사람에게 회개를 명하셨으니… “한 날을 정하사…”
사도행전 2:38  “회개하여… 죄 사함을 받으라…”
마가복음 1:15  “회개하고 복음을 믿으라.”
마태복음 24:42-44  “깨어 있으라… 준비하라…”
누가복음 12:35-40  “너희 허리를 동이고 등불을 켜라…”

안타깝게도 많은 사람이 성경에서 멀어졌습니다. 성경은 어떤 때가 오면 사람들이 자기 귀를 즐겁게 할 말을 찾아 “많은 선생”을 두게 될 것이라고 경고합니다.

그러므로 우리는 말씀 안에 거하고, 하나님께 순종하며, 복음에 합당하게 행하고, 또한 우리 주변 사람들을 설득하려고 힘써야 합니다.

디모데후서 4:3-4  “많은 선생을 두고…”
요한복음 8:31-32  “너희가 내 말에 거하면…”
골로새서 1:23  “믿음에 거하여… 흔들리지 말고…”
빌립보서 1:27  “복음에 합당하게 생활하라…”
고린도후서 5:20  “우리는 그리스도의 사신이라…”

그리고 때로 “교회”는 아주 겸손하게 시작될 수 있습니다. 두 사람이 함께 하나님을 찾는 것입니다.

마태복음 18:20  “두세 사람이 내 이름으로 모인 곳에는…”

문은 좁습니다: 겸손히 하나님과 동행하십시오

예수님은 문이 좁고 멸망으로 인도하는 길은 넓다고 말씀하셨습니다. 우리의 죄가 하나님에게서 멀어지게 하지 않도록 합시다. 어린아이 같은 마음으로, 단순하고 위선 없이, 그러나 분별력과 신중함을 가지고 겸손히 말씀에 순종합시다.

마태복음 7:13-14  “좁은 문으로 들어가라…”
히브리서 12:1-2  “모든 무거운 것과 죄를 벗어 버리고…”
마태복음 18:3  “어린아이들과 같이 되지 아니하면…”
마태복음 10:16  “비둘기 같이 순결하고 뱀 같이 지혜로우라…”

기도하고, 인내하며, 포기하지 마십시오

하나님께서 말씀과 성령으로 여러분을 인도하시도록 기도하십시오. 간절히 구하십시오. 낙심하지 마십시오. 포기하지 마십시오. 의인이 고난을 겪더라도 하나님은 신실하시며 구원하십니다.

누가복음 18:1  “항상 기도하고 낙심하지 말아야 할 것…”
야고보서 1:5  “지혜가 부족하거든… 하나님께 구하라…”
시편 34:19  “의인은 많은 환난을 당하나 여호와께서 그 모든 환난에서 건지시는도다.”`,
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
    "사용되는 모든 성경 번역은 퍼블릭 도메인입니다. 일부는 어휘와 문법이 부분적으로 현대화되었지만, 원본 사본에 엄격히 충실합니다. Android 앱을 원하시면 이메일로 요청해 주시면 링크를 보내 드리겠습니다(테스트 버전).",

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
