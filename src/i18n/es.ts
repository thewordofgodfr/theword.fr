// src/i18n/es.ts
import type { TranslationDict } from './types';

const es: TranslationDict = {
  // Navigation
  home: 'Inicio',
  reading: 'Lectura',
  search: 'Buscar',
  settings: 'Ajustes',
  about: 'Acerca de',
  notes: 'Notas',
  principles: 'Estudios',

  // Home page
  randomVerse: 'Versículo aleatorio',
  newVerse: 'Nuevo versículo',
  copyVerse: 'Copiar versículo',
  verseCopied: '¡Versículo copiado!',
  godSpeaks: 'Dios te habla',
  openJeremiah: 'Abrir Jeremías 23:29',
  jeremiah23Quote:
    '«¿No es mi palabra como fuego, dice Jehová, y como martillo que quebranta la piedra?» Jeremías 23:29',

  // Reading page
  selectBook: 'Selecciona un libro',
  selectChapter: 'Selecciona un capítulo',
  chapter: 'Capítulo',
  oldTestament: 'Antiguo Testamento',
  newTestament: 'Nuevo Testamento',

  // Reading – extras
  chooseBook: 'Elegir un libro',
  showInOtherLangs: 'Otros idiomas',
  chooseChapter: 'Elegir un capítulo',
  prevChapter: 'Capítulo anterior',
  nextChapter: 'Capítulo siguiente',
  verseWord: 'versículo',
  versesSelectedSuffix: 'versículo(s) seleccionado(s)',
  toNotes: 'Ir a Notas',
  toPrinciples: 'Ir a Estudios',
  copyLabel: 'Copiar',
  shareLabel: 'Compartir',
  cancel: 'Cancelar',
  close: 'Cerrar',
  notesModalTitle: 'Añadir a una lista (Notas)',
  notesNoList: 'Todavía no hay listas. Crea una abajo.',
  notesNewListOptional: 'Nueva lista (opcional)',
  principlesModalTitle: 'Añadir a un estudio (Estudios)',
  principlesNoList: 'Todavía no hay estudios. Crea uno abajo.',
  principlesNewListOptional: 'Nuevo estudio (opcional)',
  selectionCopied: 'Selección copiada',
  textReadyToShare: 'Texto listo para compartir (copiado)',
  addedToList: 'Añadido a la lista',
  newRandom: 'Nuevo aleatorio',
  swipeLabel: 'Desliza',
  searchSlotLabel: 'Buscar',
  searchSlotEmpty: 'Buscar (vacío)',
  memorySlotLabel: 'Memoria',
  emptySlotSuffix: '(vacío)',
  untitledList: '(sin título)',

  // Short label “Copied”
  copiedShort: 'Copiado',

  // *** Search page ***
  searchTitle: 'Búsqueda bíblica',
  searchPlaceholder: 'Escribe tu búsqueda',
  searchMinChars: 'Escribe al menos 2 caracteres.',
  searchSearching: 'Buscando…',
  searchResults: 'Resultados',
  searchExpandAll: 'Abrir todo',
  searchCollapseAll: 'Cerrar todo',
  searchNoResults: 'No se encontraron versículos.',
  searchClear: 'Borrar',
  searchOpenInReading: 'Abrir en Lectura',

  // Bloc Notes (page Notes)
  notesPage: {
    create: 'Crear lista',
    placeholder: 'Título de la lista…',
    empty: 'Todavía no hay listas.',
    items: 'elementos',
    backAll: '← Todas las listas',
    addTextBlock: 'Añadir bloque de texto',
    editTextBlock: 'Editar bloque',
    deleteItem: 'Eliminar',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    open: 'Abrir',
    confirmDeleteItem: '¿Eliminar este elemento?',
    newTextPlaceholder: 'Tu texto…',

    // Compartir / importar por código
    shareCode: 'Código',
    importCode: 'Importar código',
    importPrompt: 'Pega aquí el código de compartición de TheWord:',
    importError: 'Código no válido.',
    importSuccess: 'Lista importada correctamente ✅',
    shareCodeCopied: 'Código copiado al portapapeles ✅',

    // Importar directamente desde un texto
    importTextButton: 'Texto → Lista',
    importTextTitlePlaceholder: 'Título de la nueva lista',
    importTextDefaultTitle: 'Importar texto',
    importTextBodyPlaceholder: 'Pega aquí tu texto…',
    importTextNoBody: 'Por favor, pega el texto a importar.',
    importTextNoBlock:
      'No se ha detectado ningún bloque (recuerda dejar líneas vacías si quieres separar en bloques).',
    importTextSplitLabel:
      'Dividir en bloques (separados por al menos una línea vacía)',
    importTextInfo: 'Cada bloque se convertirá en un elemento de la lista.',
    importTextCreate: 'Crear lista',

    duplicateTitle: 'Ya existe un título idéntico.',
    confirmDeleteList: '¿Eliminar esta lista?',
    emptyList: 'Lista vacía.',

    importFromTextTitle: 'Importar desde un texto',
    documentContent: 'Contenido del documento',
    renameList: 'Renombrar',
  },

  // Bloc Principes (page Principes)
  principlesPage: {
    create: 'Crear estudio',
    placeholder: 'Título del estudio…',
    empty: 'Todavía no hay estudios.',
    items: 'elementos',
    backAll: '← Todos los estudios',
    addTextBlock: 'Añadir bloque de texto',
    editTextBlock: 'Editar bloque',
    deleteItem: 'Eliminar',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    open: 'Abrir',
    openReading: 'Abrir Lectura',
    confirmDeleteItem: '¿Eliminar este elemento?',
    newTextPlaceholder: 'Tu texto…',

    // Compartir / importar por código
    shareCode: 'Código',
    importCode: 'Importar código',
    importPrompt:
      'Pega aquí el código de compartición de TheWord (nota o estudio):',
    importError: 'Código no válido.',
    importSuccess: 'Estudio importado correctamente ✅',
    shareCodeCopied: 'Código copiado al portapapeles ✅',

    // Importar directamente desde un texto
    importTextButton: 'Texto → Estudio',
    importTextTitlePlaceholder: 'Título del nuevo estudio',
    importTextDefaultTitle: 'Importar texto',
    importTextBodyPlaceholder: 'Pega aquí tu texto…',
    importTextNoBody: 'Por favor, pega el texto a importar.',
    importTextNoBlock:
      'No se ha detectado ningún bloque (recuerda dejar líneas vacías si quieres separar en bloques).',
    importTextSplitLabel:
      'Dividir en bloques (separados por al menos una línea vacía)',
    importTextInfo: 'Cada bloque se convertirá en un elemento del estudio.',
    importTextCreate: 'Crear estudio',

    duplicateTitle: 'Ya existe un estudio con el mismo título.',
    confirmDeleteList: '¿Eliminar este estudio?',
    emptyList: 'Estudio vacío.',

    importFromTextTitle: 'Importar desde un texto',
    documentContent: 'Contenido del documento',
    renameList: 'Renombrar',
    share: 'Compartir',
    copy: 'Copiar',
    deleteList: 'Eliminar',

    // Títulos para compartir nativo
    shareStudyTitle: 'Estudio',
    shareItemTitle: 'Versículo',
  },

  // Settings page
  appearance: 'Apariencia',
  lightMode: 'Modo claro',
  darkMode: 'Modo oscuro',
  fontSize: 'Tamaño de letra',
  language: 'Idioma',
  french: 'Francés',
  english: 'Inglés',
  fontSizeXLLabel: 'Modo para baja visión (XL)',
  fontSizePreview: 'Vista previa del tamaño de letra seleccionado.',
  updates: 'Actualizaciones',
  updatesDescription:
    'Comprueba si hay una nueva versión disponible y aplícala.',
  applyUpdate: 'Aplicar actualización',
  checkUpdatesButton: 'Buscar actualizaciones',
  updatesChecking: 'Comprobando…',
  updatesUpToDate: 'Tu aplicación está actualizada.',
  updatesReady:
    'Nueva versión lista. Pulsa «Aplicar actualización».',
  updatesUnavailable:
    'Actualización automática no disponible (no se ha detectado Service Worker).',
  updatesError: 'Error al comprobar. Inténtalo de nuevo.',

  // About page
  aboutTitle: '',
  aboutDescription:
    'Busca al instante palabras o expresiones en toda la Biblia, abre los resultados en Lectura y copia o comparte un versículo con un solo toque.',
  aboutIntro: `¿Por qué The Word?

Creé The Word para poder leer varios libros de la Biblia en paralelo sin perder el hilo de mi lectura. Con el tiempo se añadieron otras funciones, siempre con el mismo propósito: ayudar a cada persona a leer, meditar, recordar y poner en práctica la Palabra de Dios.

Mi deseo

En un mundo donde tantas voces intentan influir en nosotros, mi deseo es sencillo: animar a cada persona a volver directamente a la Biblia, con un corazón sincero, para buscar en ella la verdad.

Mi oración es que esta aplicación te ayude a descubrir el amor de Dios, a conocer a Jesucristo y a comprender lo que hizo para reconciliarnos con Dios.

Lee su Palabra. Examínala atentamente. Pide a Dios que te guíe y responde después a su llamado con fe, arrepentimiento y obediencia.

«Si permanecéis en mi palabra, seréis verdaderamente mis discípulos; conoceréis la verdad, y la verdad os hará libres».

Juan 8:31-32`,

  bibleVersions: 'Versiones de la Biblia',
  frenchVersion:
    'Francés: Louis Segond 1910 (LSG) – Revisión 2025 – Dominio público',
  englishVersion:
    'Inglés: King James Version (KJV) – Dominio público',
  frenchVersionDetails:
    'Versión de referencia en francés, traducida por Louis Segond en 1910 y revisada en 2025 (modernización del vocabulario y la gramática, fiel a los manuscritos).',
  englishVersionDetails:
    'Versión clásica en inglés (KJV), publicada en 1611, revisada en 1769 y ligeramente actualizada en 2025.',
  otherLanguagesNote:
    'Otros idiomas (alemán, portugués, etc.) están en preparación. Mientras tanto, la interfaz usa el inglés si la traducción aún no está disponible.',
  randomFeature: 'Función aleatoria',
  randomFeatureDesc:
    'Nuestro generador de versículos aleatorios selecciona entre más de 31.000 versículos bíblicos para ofrecerte inspiración diaria.',
  musicLink: 'Música del Creador',
  versesLabel: 'Versículos',
  booksLabel: 'Libros',
  readingShortcuts: 'Atajos de lectura',
  notesIntro:
    'Organiza tus pasajes favoritos y tus pensamientos en listas temáticas.',
  notesPoint1: 'Añade versículos o bloques de texto libre.',
  notesPoint2:
    'Toca un elemento para mostrar el menú (Abrir en Lectura, Subir/Bajar, Eliminar…).',
  notesPoint3: 'Renombra tus listas, copia y comparte.',
  createdWithLove:
    'Creado con amor para difundir la Palabra de Dios',
  versionsFootnote:
    'Acerca de los textos: las Biblias integradas se utilizan de acuerdo con sus respectivas licencias. Únicamente la Louis Segond 1910 fue modernizada en 2025 (gramática y vocabulario), respetando estrictamente los manuscritos originales.',

  // Quick slots / reading shortcuts
  quickSlotsIntro:
    'Estos 4 botones permiten volver instantáneamente a tus lecturas frecuentes para leer varios libros en paralelo: usa 1/2/3 para 3 posiciones distintas y la lupa para volver al último pasaje (versículo aleatorio o resultado de búsqueda).',
  quickSlotsIllustrationLabel: 'Ilustración de los atajos',
  quickSlotLastPassageTooltip: 'Último pasaje',
  quickSlot1ActiveTooltip: 'Atajo 1 (activo)',
  quickSlot2Tooltip: 'Atajo 2',
  quickSlot3Tooltip: 'Atajo 3',

    // Ayuda de Notas + Estudios (guía común)
  notesHelpTitle: 'Notas y Estudios — Guía de uso',

  notesHelpIntro:
    'Las páginas Notas y Estudios permiten guardar y organizar versículos en listas temáticas y completarlos con tus propios bloques de texto. Puedes reunir pasajes, añadir tus reflexiones y crear estudios bíblicos estructurados. Tus Notas y Estudios se guardan localmente en tu dispositivo y permanecen accesibles sin necesidad de una cuenta.',

  notesHelp1Title: '1. Crear y gestionar tus listas',

  notesHelp1Body:
    'La página principal muestra todas tus listas de Notas o todos tus Estudios. Puedes crear una lista, darle un título, cambiarle el nombre o eliminarla. Toca una lista para abrir su contenido. El botón «Todas las listas» o «Todos los estudios» permite volver a la vista general. Cuando vuelves a abrir Notas o Estudios, la aplicación abre automáticamente la última lista utilizada y se sitúa cerca de su último elemento para que puedas continuar fácilmente tu trabajo.',

  notesHelp2Title: '2. Añadir versículos desde la Biblia',

  notesHelp2Body:
    'Desde la página Lectura, selecciona uno o varios versículos y utiliza el botón Notas o Estudios. Los versículos se añaden a las listas que elijas, junto con sus referencias y su texto. Puedes seleccionar varias listas y guardar el mismo versículo en distintos lugares.',

  notesHelp3Title: '3. Añadir bloques de texto',

  notesHelp3Body:
    'Además de los versículos, puedes añadir tus propios bloques de texto: comentarios, reflexiones, preguntas, oraciones, puntos de predicación u otros contenidos. El botón «Añadir un bloque de texto» está disponible en la parte superior e inferior de una lista abierta. El botón + situado junto a un elemento también permite insertar un bloque en ese lugar exacto. Después, cada bloque de texto puede modificarse, desplazarse o eliminarse.',

  notesHelp4Title: '4. Utilizar y reorganizar los elementos',

  notesHelp4Body:
    'Abre el menú de un elemento para ver las acciones disponibles. Un versículo puede abrirse directamente en la página Lectura, copiarse o compartirse. Un bloque de texto puede copiarse, compartirse o modificarse. Las flechas «Subir» y «Bajar» permiten cambiar el orden de los versículos y de los bloques de texto. También puedes eliminar cada elemento por separado.',

  notesHelp5Title: '5. Copiar o compartir una lista completa',

  notesHelp5Body:
    'En el menú de una lista de Notas o de un Estudio, los botones «Copiar» y «Compartir» permiten recuperar todo su contenido: título, referencias bíblicas, textos de los versículos y bloques de texto personales. Después puedes pegar el contenido en un mensaje o documento, o enviarlo mediante una aplicación compatible instalada en tu dispositivo.',

  notesHelp6Title: '6. Compartir o transferir con un código de The Word',

  notesHelp6Body:
    'El botón «Código» copia un código compacto que contiene el título y todo el contenido de la lista. Otra persona que utilice The Word puede seleccionar «Importar un código» para recrear la lista en su dispositivo. El mismo sistema también permite transferir contenido entre Notas y Estudios: copia el código en una página e impórtalo en la otra.',

  notesHelp7Title: '7. Importar un documento de texto',

  notesHelp7Body:
    'La opción «Importar desde un texto» permite pegar el contenido de un documento, un correo electrónico, una predicación o un plan de estudio. Puedes conservar el documento en un solo bloque o pedir a la aplicación que lo divida automáticamente en varios bloques separados por líneas vacías. Se creará una nueva lista de Notas o un nuevo Estudio con el título que elijas.',

  notesHelp8Title: '8. Almacenamiento local y copias de seguridad',

  notesHelp8Body:
    'Tus Notas y Estudios se guardan localmente en tu dispositivo y no se sincronizan automáticamente con una cuenta o un servidor. Si desinstalas la aplicación, restableces sus datos o borras los datos del navegador, su contenido puede eliminarse definitivamente. Para conservar una lista importante, utiliza las funciones Copiar, Compartir o Código de The Word.',

  notesHelp9Title: '9. Algunas ideas de uso',

  notesHelp9Body:
    'Puedes utilizar Notas para guardar versículos que quieras memorizar, escribir tus reflexiones diarias, preparar una predicación o mantener una lista de oración. Utiliza Estudios para crear recorridos bíblicos más completos: estudiar un tema o un libro, preparar un grupo en casa, crear un plan de enseñanza o desarrollar una serie de mensajes.',

  notesHelp10Title: '10. Combinar Notas y Estudios',

  notesHelp10Body:
    'Notas y Estudios pueden utilizarse conjuntamente. Por ejemplo, reúne rápidamente versículos, pensamientos y oraciones en Notas y transfiere después a Estudios los elementos que quieras profundizar mediante un código de The Word. A continuación podrás reorganizarlos, ampliarlos y compartirlos.',
  // Common
  loading: 'Cargando...',
  error: 'Error al cargar',
};

export default es;
