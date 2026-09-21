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
notesHelpTitle: 'Notas e Estudos — Guia de utilização',

notesHelpIntro:
'As páginas Notas e Estudos permitem guardar e organizar versículos em listas temáticas e completá-los com blocos de texto pessoais. Pode reunir passagens, acrescentar reflexões e criar estudos bíblicos estruturados. As Notas e os Estudos são guardados localmente no dispositivo e permanecem acessíveis sem uma conta.',

notesHelp1Title: '1. Criar e gerir as suas listas',

notesHelp1Body:
'A página principal apresenta todas as listas de Notas ou Estudos. Pode criar uma lista, atribuir-lhe um título, mudar o nome ou eliminá-la. Toque numa lista para abrir o conteúdo. O botão «Todas as listas» ou «Todos os estudos» regressa à vista geral. Quando volta a abrir a página, a aplicação abre automaticamente a última lista utilizada e posiciona-se perto do último elemento.',

notesHelp2Title: '2. Adicionar versículos da Bíblia',

notesHelp2Body:
'Na página Leitura, selecione um ou vários versículos e utilize o botão Notas ou Estudos. Os versículos são adicionados às listas escolhidas com a referência e o texto. Pode selecionar várias listas e guardar o mesmo versículo em locais diferentes.',

notesHelp3Title: '3. Adicionar blocos de texto',

notesHelp3Body:
'Além dos versículos, pode adicionar comentários, reflexões, perguntas, orações, pontos de pregação ou outros conteúdos. O botão «Adicionar bloco de texto» está disponível no início e no fim de uma lista aberta. O botão + junto de um elemento também permite inserir um bloco nessa posição exata. Cada bloco pode ser editado, movido ou eliminado.',

notesHelp4Title: '4. Utilizar e reorganizar os elementos',

notesHelp4Body:
'Abra o menu de um elemento para ver as ações disponíveis. Um versículo pode ser aberto diretamente em Leitura, copiado ou partilhado. Um bloco de texto pode ser copiado, partilhado ou editado. As setas para cima e para baixo alteram a ordem dos elementos. Cada elemento também pode ser eliminado individualmente.',

notesHelp5Title: '5. Copiar ou partilhar uma lista completa',

notesHelp5Body:
'No menu de uma lista de Notas ou de um Estudo, os botões «Copiar» e «Partilhar» permitem obter todo o conteúdo: título, referências bíblicas, textos dos versículos e blocos pessoais. Pode depois colá-lo numa mensagem ou documento, ou enviá-lo através de uma aplicação compatível.',

notesHelp6Title: '6. Partilhar ou transferir com um código The Word',

notesHelp6Body:
'O botão «Código» copia um código compacto com o título e todo o conteúdo da lista. Outro utilizador do The Word pode selecionar «Importar um código» para recriar a lista no seu dispositivo. Também pode transferir conteúdos entre Notas e Estudos copiando o código numa página e importando-o na outra.',

notesHelp7Title: '7. Importar um documento de texto',

notesHelp7Body:
'A opção «Importar de texto» permite colar o conteúdo de um documento, e-mail, pregação ou plano de estudo. Pode mantê-lo num único bloco ou dividi-lo automaticamente em vários blocos separados por linhas vazias. É criada uma nova lista ou Estudo com o título escolhido.',

notesHelp8Title: '8. Armazenamento local e cópias de segurança',

notesHelp8Body:
'As Notas e os Estudos são guardados localmente no dispositivo e não são sincronizados automaticamente com uma conta ou servidor. Se desinstalar a aplicação, repuser os dados ou apagar os dados do navegador, o conteúdo poderá ser eliminado definitivamente. Utilize Copiar, Partilhar ou um código The Word para guardar listas importantes.',

notesHelp9Title: '9. Algumas ideias de utilização',

notesHelp9Body:
'Utilize Notas para guardar versículos a memorizar, reflexões diárias, preparações de pregações ou listas de oração. Utilize Estudos para explorar um tema ou livro, preparar um grupo em casa, um plano de ensino ou uma série de mensagens.',

notesHelp10Title: '10. Combinar Notas e Estudos',

notesHelp10Body:
'Notas e Estudos podem ser utilizados em conjunto. Reúna rapidamente versículos, pensamentos e orações em Notas e transfira para Estudos aquilo que deseja aprofundar através de um código The Word. Depois poderá reorganizar, desenvolver e partilhar o conteúdo.',
  // Common
  loading: "Carregando...",
  error: "Erro ao carregar",
};

export default pt;
