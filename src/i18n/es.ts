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
    'The Word te permite descubrir la Palabra de Dios mediante versículos aleatorios y la lectura completa de la Biblia.',
  aboutIntro:
    'TheWord: lectura de la Biblia sin conexión, búsqueda instantánea, notas temáticas, compartir con un gesto. También puedes usar TheWord en la web: www.theword.fr',
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
    'Todas las versiones bíblicas utilizadas son de dominio público. Algunas han sido parcialmente modernizadas (vocabulario, gramática) manteniéndose estrictamente fieles a los manuscritos originales.',

  // Quick slots / reading shortcuts
  quickSlotsIntro:
    'Estos 4 botones, alineados a la derecha del selector Libro/Capítulo, permiten volver al instante a tus lecturas frecuentes para seguir varios libros en paralelo: usa 1/2/3 para tres posiciones distintas y la lupa para retomar el último pasaje (versículo aleatorio o búsqueda).',
  quickSlotsIllustrationLabel: 'Ilustración de los atajos',
  quickSlotLastPassageTooltip: 'Último pasaje',
  quickSlot1ActiveTooltip: 'Atajo 1 (activo)',
  quickSlot2Tooltip: 'Atajo 2',
  quickSlot3Tooltip: 'Atajo 3',

  // Common
  loading: 'Cargando...',
  error: 'Error al cargar',
};

export default es;
