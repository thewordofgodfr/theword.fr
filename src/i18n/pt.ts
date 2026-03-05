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
    "The Word permite que você descubra a Palavra de Deus por meio de versículos aleatórios e da leitura completa da Bíblia.",
  aboutIntro: `Por que criei o The Word

No início, criei este aplicativo por uma coisa muito simples: ler vários livros da Bíblia ao mesmo tempo, sem perder o fio de um dia para o outro, graças às abas 1 / 2 / 3 da página Leitura.

Com o tempo, adicionei outras funções, sempre com a mesma intenção: ajudar a ler, meditar, memorizar e colocar em prática a Palavra de Deus.

Minha oração por vocês

Minha oração é que vocês sejam tocados pela Palavra de Deus, que compreendam o amor que Deus tem por vocês e o amor de Jesus Cristo, seu Filho, bem como o preço que Ele pagou para que fôssemos reconciliados com Deus e caminhássemos com Ele em seu amor.

O amor de Deus e o chamado para crer são particularmente visíveis no Evangelho de João (ex.: João 3:16).

A chave de entrada no Reino e o chamado claro para responder a Deus aparecem claramente no livro de Atos (ex.: Atos 2:38; Atos 4:12).

A Bíblia: Deus fala conosco

Nunca devemos esquecer que toda a Bíblia é inspirada por Deus: é Deus quem fala conosco, e devemos temê-lo e obedecer-lhe.

2 Timóteo 3:16-17  “Toda a Escritura é inspirada por Deus…”
Provérbios 9:10  “O temor do SENHOR é o princípio da sabedoria…”
João 13:34-35  “Amai-vos uns aos outros, como eu vos amei…”

O tempo é curto: responder ao chamado de Deus

Creio que o tempo é curto e que Deus deseja ardentemente que cada pessoa responda ao seu chamado: arrepender-se, crer e ser batizada para o perdão dos pecados. É uma oportunidade imensa: estar com Deus eternamente. Não demoremos, pois Deus cumprirá sua justiça no dia que determinou, e Jesus frequentemente nos chamou a vigiar e a estar prontos.

1 Coríntios 7:29  “O tempo é curto…”
Atos 17:30-31  Deus chama todos os homens ao arrependimento… “fixou um dia…”
Atos 2:38  “Arrependei-vos, e cada um de vós seja batizado… para perdão dos vossos pecados…”
Marcos 1:15  “Arrependei-vos e crede no evangelho.”
Mateus 24:42-44  “Vigiai… estai preparados…”
Lucas 12:35-40  “Estejam cingidos os vossos lombos e acesas as vossas lâmpadas…”

Infelizmente, muitos se afastaram das Escrituras. A Bíblia adverte que virá um tempo em que alguns procurarão mensagens que lhes agradem e juntarão “uma multidão de mestres”.

Por isso somos chamados a permanecer na Palavra, a obedecer a Deus e a viver de maneira digna do Evangelho, procurando também convencer aqueles ao nosso redor.

2 Timóteo 4:3-4  “ajuntarão para si mestres…”
João 8:31-32  “Se permanecerdes na minha palavra…”
Colossenses 1:23  “permanecei firmes e inabaláveis…”
Filipenses 1:27  “comportai-vos de modo digno do evangelho…”
2 Coríntios 5:20  “somos embaixadores…”

E, às vezes, uma “igreja” pode começar humildemente: duas pessoas buscando a Deus juntas.

Mateus 18:20  “Onde estiverem dois ou três reunidos em meu nome…”

A porta é estreita: caminhar humildemente com Deus

Jesus disse que a porta é estreita e que o caminho que leva à perdição é largo. Não deixemos que nossos pecados nos afastem de Deus. Obedeçamos humildemente à sua Palavra, com um coração de criança: simples, sem hipocrisia, mas também lúcido e prudente.

Mateus 7:13-14  “Entrai pela porta estreita…”
Hebreus 12:1-2  “deixemos todo peso e o pecado…”
Mateus 18:3  “se não vos tornardes como crianças…”
Mateus 10:16  “simples como as pombas e prudentes como as serpentes…”

Orar, perseverar, não desistir

Orem a Deus para que Ele os guie por sua Palavra e por seu Espírito Santo. Supliquem. Não desanimem. Não desistam. Mesmo que o justo passe por sofrimentos, Deus permanece fiel e livra.

Lucas 18:1  “é necessário orar sempre e nunca desanimar”
Tiago 1:5  “Se alguém tem falta de sabedoria, peça-a a Deus…”
Salmo 34:19  “Muitas são as aflições do justo, mas o SENHOR o livra de todas.”`,
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
    "Todas as versões bíblicas usadas são de domínio público. Algumas foram parcialmente modernizadas (vocabulário, gramática), mantendo total fidelidade aos manuscritos originais.  Se você deseja o aplicativo Android, envie-me um pedido por e-mail e eu lhe enviarei um link (aplicativo em versão de teste).",

  // Quick slots
  quickSlotsIntro:
    "Esses 4 botões, alinhados à direita do seletor Livro/Capítulo, permitem voltar imediatamente às leituras frequentes para acompanhar vários livros em paralelo: use 1/2/3 para três posições e a lupa para retomar a última passagem (verso aleatório ou pesquisa).",
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
