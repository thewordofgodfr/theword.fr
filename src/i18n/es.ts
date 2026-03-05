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
  aboutIntro: `Por qué creé The Word

Al principio, creé esta aplicación por una razón muy simple: leer varios libros de la Biblia al mismo tiempo, sin perder el hilo de un día para otro, gracias a las pestañas 1 / 2 / 3 de la página Lectura.

Con el tiempo, añadí otras funciones, siempre con la misma intención: ayudar a leer, meditar, recordar y poner en práctica la Palabra de Dios.

Mi oración por ti

Mi oración es que la Palabra de Dios te toque, que comprendas el amor que Dios tiene por ti y el amor de Jesucristo, su Hijo, así como el precio que pagó para que fuéramos reconciliados con Dios y caminemos con Él en su amor.

El amor de Dios y el llamado a creer son especialmente visibles en el Evangelio de Juan (ej.: Juan 3:16).

La clave para entrar en el Reino, y el llamado claro a responder a Dios, aparecen claramente en el libro de los Hechos (ej.: Hechos 2:38; Hechos 4:12).

La Biblia: Dios nos habla

Nunca debemos olvidar que toda la Biblia es inspirada por Dios: es Dios quien nos habla, y debemos temerle y obedecerle.

2 Timoteo 3:16-17  “Toda la Escritura es inspirada por Dios…”
Proverbios 9:10  “El temor de Jehová es el principio de la sabiduría…”
Juan 13:34-35  “Amaos los unos a los otros, como yo os he amado…”

El tiempo es corto: responder al llamado de Dios

Creo que el tiempo es corto y que Dios desea ardientemente que cada persona responda a su llamado: arrepentirse, creer y ser bautizado para el perdón de los pecados. Es una oportunidad inmensa: estar con Dios eternamente. No tardemos, porque Dios cumplirá su justicia en el día que ha fijado, y Jesús a menudo nos llamó a velar y a estar preparados.

1 Corintios 7:29  “El tiempo es corto…”
Hechos 17:30-31  Dios llama a todos los hombres al arrepentimiento… “ha fijado un día…”
Hechos 2:38  “Arrepentíos… para perdón de vuestros pecados…”
Marcos 1:15  “Arrepentíos, y creed en el evangelio.”
Mateo 24:42-44  “Velad… estad preparados…”
Lucas 12:35-40  “Estén ceñidos vuestros lomos, y vuestras lámparas encendidas…”

Por desgracia, muchos se han alejado de las Escrituras. La Biblia advierte que vendrá un tiempo en que algunos buscarán mensajes que les agraden y se rodearán de “una multitud de maestros”.

Por eso estamos llamados a permanecer en la Palabra, a obedecer a Dios y a vivir de una manera digna del Evangelio, procurando también convencer a quienes nos rodean.

2 Timoteo 4:3-4  “se amontonarán maestros…”
Juan 8:31-32  “Si permanecéis en mi palabra…”
Colosenses 1:23  “permanezcáis fundados y firmes…”
Filipenses 1:27  “conduceos de una manera digna del evangelio…”
2 Corintios 5:20  “somos embajadores…”

Y a veces, una “iglesia” puede empezar humildemente: dos personas que buscan a Dios juntas.

Mateo 18:20  “Donde están dos o tres congregados en mi nombre…”

La puerta es estrecha: caminar humildemente con Dios

Jesús dijo que la puerta es estrecha y que el camino que lleva a la perdición es ancho. No dejemos que nuestros pecados nos aparten de Dios. Obedezcamos con humildad su Palabra, con un corazón de niño: sencillo, sin hipocresía, pero también lúcido y prudente.

Mateo 7:13-14  “Entrad por la puerta estrecha…”
Hebreos 12:1-2  “dejemos todo peso y el pecado…”
Mateo 18:3  “si no os hacéis como niños…”
Mateo 10:16  “sencillos como palomas y prudentes como serpientes…”

Orar, perseverar, no rendirse

Ruega a Dios que te guíe por su Palabra y por su Espíritu Santo. Suplica. No te desanimes. No te rindas. Aunque el justo pase por sufrimientos, Dios permanece fiel y libra.

Lucas 18:1  “es necesario orar siempre, y no desmayar”
Santiago 1:5  “Si alguno tiene falta de sabiduría, pídala a Dios…”
Salmo 34:19  “Muchas son las aflicciones del justo; pero de todas ellas le librará Jehová.”`,

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
    'Todas las versiones bíblicas utilizadas son de dominio público. Algunas han sido parcialmente modernizadas (vocabulario, gramática) manteniéndose estrictamente fieles a los manuscritos originales. Si deseas la aplicación Android, envíame una solicitud por correo electrónico y te enviaré un enlace (versión de prueba).',

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
