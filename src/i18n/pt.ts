// src/i18n/pt.ts
import type { TranslationDict } from './types';

const pt: TranslationDict = {
  // Navigation
  home: "Início",
  reading: "Leitura",
  search: "Pesquisa",
  settings: "Configurações",
  about: "Sobre",
  notes: "Notas",
  principles: "Estudos",

  // Home page
  randomVerse: "Verso aleatório",
  newVerse: "Novo verso",
  copyVerse: "Copiar verso",
  verseCopied: "Verso copiado!",
  godSpeaks: "Deus fala com você",
  openJeremiah: "Abrir Jeremias 23:29",
  jeremiah23Quote:
    "«Não é a minha palavra como fogo, diz o SENHOR, e como um martelo que despedaça a rocha?» Jeremias 23:29",

  // Reading page
  selectBook: "Selecione um livro",
  selectChapter: "Selecione um capítulo",
  chapter: "Capítulo",
  oldTestament: "Antigo Testamento",
  newTestament: "Novo Testamento",

  // Reading – extras
  chooseBook: "Escolher um livro",
  showInOtherLangs: 'Outros idiomas',
  chooseChapter: "Escolher um capítulo",
  prevChapter: "Capítulo anterior",
  nextChapter: "Próximo capítulo",
  verseWord: "verso",
  versesSelectedSuffix: "verso(s) selecionado(s)",
  toNotes: "Ir para Notas",
  toPrinciples: "Ir para Estudos",
  copyLabel: "Copiar",
  shareLabel: "Compartilhar",
  cancel: "Cancelar",
  close: "Fechar",
  notesModalTitle: "Adicionar a uma lista (Notas)",
  notesNoList:
    "Nenhuma lista ainda. Crie uma abaixo.",
  notesNewListOptional: "Nova lista (opcional)",
  principlesModalTitle:
    "Adicionar a um estudo (Estudos)",
  principlesNoList:
    "Nenhum estudo ainda. Crie um abaixo.",
  principlesNewListOptional: "Novo estudo (opcional)",
  selectionCopied: "Seleção copiada",
  textReadyToShare:
    "Texto pronto para compartilhar (copiado)",
  addedToList: "Adicionado à lista",
  newRandom: "Novo aleatório",
  swipeLabel: "Deslize",
  searchSlotLabel: "Pesquisa",
  searchSlotEmpty: "Pesquisa (vazia)",
  memorySlotLabel: "Memória",
  emptySlotSuffix: "(vazio)",
  untitledList: "(sem título)",

  // Short label “Copied”
  copiedShort: "Copiado",

  // Search page
  searchTitle: "Pesquisa bíblica",
  searchPlaceholder: "Digite sua pesquisa",
  searchMinChars:
    "Digite pelo menos 2 caracteres.",
  searchSearching: "Pesquisando…",
  searchResults: "Resultados",
  searchExpandAll: "Abrir tudo",
  searchCollapseAll: "Fechar tudo",
  searchNoResults:
    "Nenhum versículo encontrado.",
  searchClear: "Limpar",
  searchOpenInReading: "Abrir em Leitura",

  // Notes page
  notesPage: {
    create: "Criar lista",
    placeholder: "Título da lista…",
    empty: "Nenhuma lista ainda.",
    items: "itens",
    backAll: "← Todas as listas",
    addTextBlock: "Adicionar bloco de texto",
    editTextBlock: "Editar bloco",
    deleteItem: "Excluir",
    moveUp: "Mover para cima",
    moveDown: "Mover para baixo",
    open: "Abrir",
    confirmDeleteItem: "Excluir este item?",
    newTextPlaceholder: "Seu texto…",

    shareCode: "Código",
    importCode: "Importar código",
    importPrompt:
      "Cole aqui o código de compartilhamento do TheWord:",
    importError: "Código inválido.",
    importSuccess:
      "Lista importada com sucesso ✅",
    shareCodeCopied:
      "Código copiado para a área de transferência ✅",

    importTextButton: "Texto → Lista",
    importTextTitlePlaceholder:
      "Título da nova lista",
    importTextDefaultTitle: "Importar texto",
    importTextBodyPlaceholder:
      "Cole aqui o seu texto…",
    importTextNoBody:
      "Por favor, cole um texto para importar.",
    importTextNoBlock:
      "Nenhum bloco detectado (deixe linhas vazias se quiser dividir em blocos).",
    importTextSplitLabel:
      "Dividir em blocos (separados por pelo menos uma linha vazia)",
    importTextInfo:
      "Cada bloco se tornará um item da lista.",
    importTextCreate: "Criar lista",

    duplicateTitle:
      "Já existe uma lista com o mesmo título.",
    confirmDeleteList: "Excluir esta lista?",
    emptyList: "Lista vazia.",

    importFromTextTitle: "Importar de texto",
    documentContent: "Conteúdo do documento",
    renameList: "Renomear",
  },

  // Principles page
  principlesPage: {
    create: "Criar estudo",
    placeholder: "Título do estudo…",
    empty: "Nenhum estudo ainda.",
    items: "itens",
    backAll: "← Todos os estudos",
    addTextBlock: "Adicionar bloco de texto",
    editTextBlock: "Editar bloco",
    deleteItem: "Excluir",
    moveUp: "Mover para cima",
    moveDown: "Mover para baixo",
    open: "Abrir",
    openReading: "Abrir Leitura",
    confirmDeleteItem: "Excluir este item?",
    newTextPlaceholder: "Seu texto…",

    shareCode: "Código",
    importCode: "Importar código",
    importPrompt:
      "Cole aqui o código de compartilhamento do TheWord (nota ou estudo):",
    importError: "Código inválido.",
    importSuccess:
      "Estudo importado com sucesso ✅",
    shareCodeCopied:
      "Código copiado para a área de transferência ✅",

    importTextButton: "Texto → Estudo",
    importTextTitlePlaceholder:
      "Título do novo estudo",
    importTextDefaultTitle: "Importar texto",
    importTextBodyPlaceholder:
      "Cole aqui o seu texto…",
    importTextNoBody:
      "Por favor, cole um texto para importar.",
    importTextNoBlock:
      "Nenhum bloco detectado (deixe linhas vazias se quiser dividir em blocos).",
    importTextSplitLabel:
      "Dividir em blocos (separados por pelo menos uma linha vazia)",
    importTextInfo:
      "Cada bloco se tornará um item do estudo.",
    importTextCreate: "Criar estudo",

    duplicateTitle:
      "Já existe um estudo com o mesmo título.",
    confirmDeleteList:
      "Excluir este estudo?",
    emptyList: "Estudo vazio.",

    importFromTextTitle: "Importar de texto",
    documentContent: "Conteúdo do documento",
    renameList: "Renomear",
    share: "Compartilhar",
    copy: "Copiar",
    deleteList: "Excluir",

    shareStudyTitle: "Estudo",
    shareItemTitle: "Verso",
  },

  // Settings
  appearance: "Aparência",
  lightMode: "Modo claro",
  darkMode: "Modo escuro",
  fontSize: "Tamanho da fonte",
  language: "Idioma",
  french: "Francês",
  english: "Inglês",
  fontSizeXLLabel:
    "Modo para baixa visão (XL)",
  fontSizePreview:
    "Pré-visualização do tamanho de fonte selecionado.",
  updates: "Atualizações",
  updatesDescription:
    "Verifique se há uma nova versão disponível e aplique-a.",
  applyUpdate: "Aplicar atualização",
  checkUpdatesButton:
    "Verificar atualizações",
  updatesChecking: "Verificando…",
  updatesUpToDate:
    "Seu aplicativo está atualizado.",
  updatesReady:
    "Nova versão pronta. Clique em «Aplicar atualização».",
  updatesUnavailable:
    "Atualização automática indisponível (Service Worker não detectado).",
  updatesError:
    "Erro ao verificar. Tente novamente.",

  // About
  aboutTitle: "",
  aboutDescription:
    "Pesquise instantaneamente palavras ou expressões em toda a Bíblia, abra os resultados na secção Leitura e copie ou partilhe um versículo com um único toque.",
  aboutIntro: `Por que The Word?

Criei o The Word para poder ler vários livros da Bíblia em paralelo sem perder o fio da leitura. Com o tempo, outras funções foram acrescentadas, sempre com o mesmo objetivo: ajudar cada pessoa a ler, meditar, guardar e colocar em prática a Palavra de Deus.

O meu desejo

Num mundo em que tantas vozes procuram influenciar-nos, o meu desejo é simples: encorajar cada pessoa a voltar diretamente à Bíblia, com um coração sincero, para nela procurar a verdade.

A minha oração é que esta aplicação ajude você a descobrir o amor de Deus, a conhecer Jesus Cristo e a compreender o que ele fez para nos reconciliar com Deus.

Leia a sua Palavra. Examine-a com atenção. Peça a Deus que guie você e depois responda ao seu chamado com fé, arrependimento e obediência.

“Se vocês permanecerem na minha palavra, serão verdadeiramente meus discípulos; conhecerão a verdade, e a verdade os libertará.”

João 8:31-32`,
  bibleVersions: "Versões da Bíblia",
  frenchVersion:
    "Francês: Louis Segond 1910 (LSG) – Revisão 2025 – Domínio público",
  englishVersion:
    "Inglês: King James Version (KJV) – Domínio público",
  frenchVersionDetails:
    "Versão de referência em francês, traduzida por Louis Segond em 1910 e revisada em 2025 (modernização de vocabulário e gramática, fiel aos manuscritos).",
  englishVersionDetails:
    "Versão clássica em inglês (KJV), publicada em 1611, revisada em 1769 e levemente atualizada em 2025.",
  otherLanguagesNote:
    "Outros idiomas (alemão, português etc.) estão em preparação. Enquanto isso, a interface usa o inglês se a tradução ainda não estiver disponível.",
  randomFeature: "Função aleatória",
  randomFeatureDesc:
    "Nosso gerador de versículos aleatórios escolhe entre mais de 31.000 versículos bíblicos para trazer inspiração diária.",
  musicLink: "Música do Criador",
  versesLabel: "Versos",
  booksLabel: "Livros",
  readingShortcuts: "Atalhos de leitura",
  notesIntro:
    "Organize seus trechos favoritos e pensamentos em listas temáticas.",
  notesPoint1:
    "Adicione versículos ou blocos de texto livre.",
  notesPoint2:
    "Toque em um item para abrir o menu (Abrir em Leitura, Mover para cima/baixo, Excluir…).",
  notesPoint3:
    "Renomeie as listas, copie e compartilhe.",
  createdWithLove:
    "Criado com amor para espalhar a Palavra de Deus",
  versionsFootnote:
    "Sobre os textos: as Bíblias integradas são utilizadas de acordo com as respetivas licenças. Apenas a Louis Segond 1910 foi modernizada em 2025 (gramática e vocabulário), respeitando rigorosamente os manuscritos originais.",

  // Quick slots
  quickSlotsIntro:
    "Estes 4 botões permitem voltar instantaneamente às suas leituras frequentes para ler vários livros em paralelo: use 1/2/3 para 3 posições distintas e a lupa para voltar à última passagem (versículo aleatório ou resultado de pesquisa).",
  quickSlotsIllustrationLabel:
    "Ilustração dos atalhos",
  quickSlotLastPassageTooltip:
    "Última passagem",
  quickSlot1ActiveTooltip:
    "Atalho 1 (ativo)",
  quickSlot2Tooltip: "Atalho 2",
  quickSlot3Tooltip: "Atalho 3",

  // Common
  loading: "Carregando...",
  error: "Erro ao carregar",
};

export default pt;
