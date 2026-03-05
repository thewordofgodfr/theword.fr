// src/i18n/de.ts
import type { TranslationDict } from './types';

const de: TranslationDict = {
  // Navigation
  home: "Startseite",
  reading: "Lesen",
  search: "Suche",
  settings: "Einstellungen",
  about: "Info",
  notes: "Notizen",
  principles: "Studien",

  // Home page
  randomVerse: "Zufälliger Vers",
  newVerse: "Neuer Vers",
  copyVerse: "Vers kopieren",
  verseCopied: "Vers kopiert!",
  godSpeaks: "Gott spricht zu dir",
  openJeremiah: "Jeremia 23,29 öffnen",
  jeremiah23Quote:
    "„Ist mein Wort nicht wie ein Feuer, spricht der HERR, und wie ein Hammer, der Felsen zerschmettert?“ Jeremia 23,29",

  // Reading page
  selectBook: "Buch wählen",
  showInOtherLangs: 'Andere Sprachen',
  selectChapter: "Kapitel wählen",
  chapter: "Kapitel",
  oldTestament: "Altes Testament",
  newTestament: "Neues Testament",

  // Reading – extras
  chooseBook: "Buch auswählen",
  chooseChapter: "Kapitel auswählen",
  prevChapter: "Vorheriges Kapitel",
  nextChapter: "Nächstes Kapitel",
  verseWord: "Vers",
  versesSelectedSuffix: "ausgewählte Verse",
  toNotes: "Zu den Notizen",
  toPrinciples: "Zu den Studien",
  copyLabel: "Kopieren",
  shareLabel: "Teilen",
  cancel: "Abbrechen",
  close: "Schließen",
  notesModalTitle: "Zur Liste hinzufügen (Notizen)",
  notesNoList: "Noch keine Listen. Lege unten eine an.",
  notesNewListOptional: "Neue Liste (optional)",
  principlesModalTitle: "Zu einer Studie hinzufügen (Studien)",
  principlesNoList: "Noch keine Studien. Lege unten eine an.",
  principlesNewListOptional: "Neue Studie (optional)",
  selectionCopied: "Auswahl kopiert",
  textReadyToShare: "Text zum Teilen bereit (kopiert)",
  addedToList: "Zur Liste hinzugefügt",
  newRandom: "Neuer Zufallsvers",
  swipeLabel: "Wischen",
  searchSlotLabel: "Suche",
  searchSlotEmpty: "Suche (leer)",
  memorySlotLabel: "Speicher",
  emptySlotSuffix: "(leer)",
  untitledList: "(ohne Titel)",

  // Short label “Copied”
  copiedShort: "Kopiert",

  // Search page
  searchTitle: "Bibel-Suche",
  searchPlaceholder: "Suchbegriff eingeben",
  searchMinChars: "Gib mindestens 2 Zeichen ein.",
  searchSearching: "Suche läuft…",
  searchResults: "Ergebnisse",
  searchExpandAll: "Alle öffnen",
  searchCollapseAll: "Alle schließen",
  searchNoResults: "Keine Verse gefunden.",
  searchClear: "Löschen",
  searchOpenInReading: "In „Lesen“ öffnen",

  // Notes page
  notesPage: {
    create: "Liste erstellen",
    placeholder: "Listentitel…",
    empty: "Noch keine Listen.",
    items: "Elemente",
    backAll: "← Alle Listen",
    addTextBlock: "Textblock hinzufügen",
    editTextBlock: "Block bearbeiten",
    deleteItem: "Löschen",
    moveUp: "Nach oben",
    moveDown: "Nach unten",
    open: "Öffnen",
    confirmDeleteItem: "Dieses Element löschen?",
    newTextPlaceholder: "Dein Text…",

    shareCode: "Code",
    importCode: "Code importieren",
    importPrompt: "Füge hier den TheWord-Freigabecode ein:",
    importError: "Ungültiger Code.",
    importSuccess: "Liste erfolgreich importiert ✅",
    shareCodeCopied: "Code in die Zwischenablage kopiert ✅",

    importTextButton: "Text → Liste",
    importTextTitlePlaceholder: "Titel der neuen Liste",
    importTextDefaultTitle: "Textimport",
    importTextBodyPlaceholder: "Füge deinen Text hier ein…",
    importTextNoBody: "Bitte füge einen zu importierenden Text ein.",
    importTextNoBlock:
      "Kein Block erkannt (lasse Leerzeilen, wenn du in Blöcke aufteilen möchtest).",
    importTextSplitLabel:
      "In Blöcke aufteilen (getrennt durch mindestens eine Leerzeile)",
    importTextInfo: "Jeder Block wird zu einem Element der Liste.",
    importTextCreate: "Liste erstellen",

    duplicateTitle:
      "Es existiert bereits eine Liste mit demselben Titel.",
    confirmDeleteList: "Diese Liste löschen?",
    emptyList: "Leere Liste.",

    importFromTextTitle: "Aus Text importieren",
    documentContent: "Dokumentinhalt",
    renameList: "Umbenennen",
  },

  // Principles page
  principlesPage: {
    create: "Studie erstellen",
    placeholder: "Titel der Studie…",
    empty: "Noch keine Studien.",
    items: "Elemente",
    backAll: "← Alle Studien",
    addTextBlock: "Textblock hinzufügen",
    editTextBlock: "Block bearbeiten",
    deleteItem: "Löschen",
    moveUp: "Nach oben",
    moveDown: "Nach unten",
    open: "Öffnen",
    openReading: "Lesen öffnen",
    confirmDeleteItem: "Dieses Element löschen?",
    newTextPlaceholder: "Dein Text…",

    shareCode: "Code",
    importCode: "Code importieren",
    importPrompt:
      "Füge hier den TheWord-Freigabecode (Notiz oder Studie) ein:",
    importError: "Ungültiger Code.",
    importSuccess: "Studie erfolgreich importiert ✅",
    shareCodeCopied: "Code in die Zwischenablage kopiert ✅",

    importTextButton: "Text → Studie",
    importTextTitlePlaceholder: "Titel der neuen Studie",
    importTextDefaultTitle: "Textimport",
    importTextBodyPlaceholder: "Füge deinen Text hier ein…",
    importTextNoBody: "Bitte füge einen zu importierenden Text ein.",
    importTextNoBlock:
      "Kein Block erkannt (lasse Leerzeilen, wenn du in Blöcke aufteilen möchtest).",
    importTextSplitLabel:
      "In Blöcke aufteilen (getrennt durch mindestens eine Leerzeile)",
    importTextInfo: "Jeder Block wird zu einem Element der Studie.",
    importTextCreate: "Studie erstellen",

    duplicateTitle:
      "Eine Studie mit demselben Titel existiert bereits.",
    confirmDeleteList: "Diese Studie löschen?",
    emptyList: "Leere Studie.",

    importFromTextTitle: "Aus Text importieren",
    documentContent: "Dokumentinhalt",
    renameList: "Umbenennen",
    share: "Teilen",
    copy: "Kopieren",
    deleteList: "Löschen",

    shareStudyTitle: "Studie",
    shareItemTitle: "Vers",
  },

  // Settings
  appearance: "Darstellung",
  lightMode: "Helles Design",
  darkMode: "Dunkles Design",
  fontSize: "Schriftgröße",
  language: "Sprache",
  french: "Französisch",
  english: "Englisch",
  fontSizeXLLabel: "Modus für Sehschwache (XL)",
  fontSizePreview:
    "Vorschau der gewählten Schriftgröße.",
  updates: "Updates",
  updatesDescription:
    "Prüfen, ob eine neue Version verfügbar ist, und sie anwenden.",
  applyUpdate: "Update anwenden",
  checkUpdatesButton: "Nach Updates suchen",
  updatesChecking: "Es wird geprüft…",
  updatesUpToDate:
    "Deine App ist auf dem neuesten Stand.",
  updatesReady:
    "Neue Version bereit. Klicke auf „Update anwenden“.",
  updatesUnavailable:
    "Automatisches Update nicht verfügbar (kein Service Worker gefunden).",
  updatesError:
    "Fehler bei der Prüfung. Bitte versuche es erneut.",

  // About
  aboutTitle: "",
  aboutDescription:
    "The Word hilft dir, Gottes Wort durch Zufallsverse und vollständiges Bibellesen zu entdecken.",
  aboutIntro: `Warum ich The Word erstellt habe

Am Anfang habe ich diese App aus einem ganz einfachen Grund erstellt: mehrere Bücher der Bibel gleichzeitig zu lesen, ohne von einem Tag zum nächsten den Faden zu verlieren – dank der Tabs 1 / 2 / 3 auf der Seite „Lesen“.

Mit der Zeit habe ich weitere Funktionen hinzugefügt, immer mit derselben Absicht: beim Lesen, Nachsinnen, Behalten und Umsetzen des Wortes Gottes zu helfen.

Mein Gebet für dich

Mein Gebet ist, dass dich das Wort Gottes berührt, dass du die Liebe Gottes zu dir und die Liebe Jesu Christi, seines Sohnes, verstehst – ebenso den Preis, den er bezahlt hat, damit wir mit Gott versöhnt werden und in seiner Liebe mit ihm gehen.

Gottes Liebe und der Ruf zum Glauben sind besonders im Evangelium nach Johannes sichtbar (z. B. Johannes 3:16).

Der Schlüssel zum Eintritt in das Reich und der klare Ruf, auf Gott zu antworten, werden besonders deutlich im Buch der Apostelgeschichte (z. B. Apostelgeschichte 2:38; Apostelgeschichte 4:12).

Die Bibel: Gott spricht zu uns

Wir dürfen nie vergessen, dass die ganze Bibel von Gott inspiriert ist: Gott spricht zu uns, und wir sollen ihn fürchten und ihm gehorchen.

2 Timotheus 3:16-17  “Alle Schrift ist von Gott eingegeben…”
Sprüche 9:10  “Die Furcht des HERRN ist der Anfang der Weisheit…”
Johannes 13:34-35  “Liebt einander, wie ich euch geliebt habe…”

Die Zeit ist kurz: Antworte auf Gottes Ruf

Ich glaube, dass die Zeit kurz ist und dass Gott von Herzen wünscht, dass jeder Mensch auf seinen Ruf antwortet: umkehren, glauben und sich zur Vergebung der Sünden taufen lassen. Das ist eine enorme Gelegenheit: für immer bei Gott zu sein. Lasst uns nicht zögern, denn Gott wird seine Gerechtigkeit an dem Tag vollziehen, den er festgesetzt hat, und Jesus hat uns oft aufgerufen, wachsam und bereit zu sein.

1 Korinther 7:29  “Die Zeit ist kurz…”
Apostelgeschichte 17:30-31  Gott ruft alle Menschen zur Umkehr… “Er hat einen Tag festgesetzt…”
Apostelgeschichte 2:38  “Tut Buße… zur Vergebung eurer Sünden…”
Markus 1:15  “Tut Buße und glaubt an das Evangelium.”
Matthäus 24:42-44  “Wacht… seid bereit…”
Lukas 12:35-40  “Eure Lenden seien umgürtet und eure Lampen brennend…”

Leider haben sich viele von der Schrift entfernt. Die Bibel warnt, dass eine Zeit kommen wird, in der manche Botschaften suchen, die ihnen gefallen, und sich “eine Menge Lehrer” anschaffen.

Darum sind wir aufgerufen, im Wort zu bleiben, Gott zu gehorchen und würdig des Evangeliums zu leben – und auch die Menschen um uns herum zu überzeugen.

2 Timotheus 4:3-4  “sie werden sich eine Menge Lehrer aufhäufen…”
Johannes 8:31-32  “Wenn ihr in meinem Wort bleibt…”
Kolosser 1:23  “bleibt gegründet und standhaft…”
Philipper 1:27  “lebt würdig des Evangeliums…”
2 Korinther 5:20  “Wir sind Botschafter…”

Und manchmal kann eine “Gemeinde” ganz bescheiden beginnen: zwei Menschen, die gemeinsam Gott suchen.

Matthäus 18:20  “Wo zwei oder drei in meinem Namen versammelt sind…”

Die Pforte ist eng: Demütig mit Gott gehen

Jesus sagte, dass die Pforte eng ist und der Weg ins Verderben breit. Lassen wir nicht zu, dass unsere Sünden uns von Gott wegziehen. Gehorchen wir seinem Wort in Demut, mit einem kindlichen Herzen: schlicht, ohne Heuchelei, aber auch klar und umsichtig.

Matthäus 7:13-14  “Geht ein durch die enge Pforte…”
Hebräer 12:1-2  “legt jede Last und die Sünde ab…”
Matthäus 18:3  “wenn ihr nicht werdet wie die Kinder…”
Matthäus 10:16  “ohne Falsch wie die Tauben und klug wie die Schlangen…”

Beten, ausharren, nicht aufgeben

Bete zu Gott, dass er dich durch sein Wort und durch seinen Heiligen Geist führt. Bitte inständig. Lass dich nicht entmutigen. Gib nicht auf. Auch wenn der Gerechte durch Leiden geht, bleibt Gott treu und rettet.

Lukas 18:1  “man soll allezeit beten und nicht nachlassen”
Jakobus 1:5  “Wenn es jemandem an Weisheit mangelt, bitte er Gott…”
Psalm 34:19  “Viele Leiden hat der Gerechte; aber aus allen rettet ihn der HERR.”`,
  bibleVersions: "Bibelübersetzungen",
  frenchVersion:
    "Französisch: Louis Segond 1910 (LSG) – Überarbeitung 2025 – gemeinfrei",
  englishVersion:
    "Englisch: King James Version (KJV) – gemeinfrei",
  frenchVersionDetails:
    "Referenzbibel auf Französisch, 1910 von Louis Segond übersetzt und 2025 überarbeitet (modernisierte Sprache, treu den Handschriften).",
  englishVersionDetails:
    "Klassische englische Bibel (KJV), 1611 veröffentlicht, 1769 revidiert, mit einer leichten Aktualisierung 2025.",
  otherLanguagesNote:
    "Weitere Sprachen (Deutsch, Portugiesisch usw.) sind in Vorbereitung. Wenn keine Übersetzung vorliegt, verwendet die Oberfläche Englisch.",
  randomFeature: "Zufallsfunktion",
  randomFeatureDesc:
    "Unser Zufallsgenerator wählt aus über 31.000 Bibelversen, um dir tägliche Inspiration zu schenken.",
  musicLink: "Musik des Schöpfers",
  versesLabel: "Verse",
  booksLabel: "Bücher",
  readingShortcuts: "Lese-Schnellzugriffe",
  notesIntro:
    "Organisiere deine Lieblingsstellen und Gedanken in thematischen Listen.",
  notesPoint1: "Füge Verse oder freie Textblöcke hinzu.",
  notesPoint2:
    "Tippe auf ein Element, um das Menü zu öffnen (In „Lesen“ öffnen, Nach oben/unten, Löschen…).",
  notesPoint3: "Listen umbenennen, kopieren/teilen.",
  createdWithLove:
    "Mit Liebe erstellt, um Gottes Wort zu verbreiten",
  versionsFootnote:
    "Alle verwendeten Bibelübersetzungen sind gemeinfrei. Einige wurden sprachlich leicht modernisiert, bleiben aber streng den ursprünglichen Handschriften treu. Wenn du die Android-App möchtest, sende mir bitte eine Anfrage per E-Mail, und ich schicke dir einen Link (Testversion).",

  // Quick slots
  quickSlotsIntro:
    "Diese 4 Schaltflächen rechts vom Buch/Kapitel-Wähler lassen dich schnell zu häufigen Lesungen zurückkehren, um mehrere Bücher parallel zu verfolgen: Nutze 1/2/3 für drei Speicherplätze und die Lupe, um zur letzten Stelle zurückzukehren (Zufallsvers oder Suchergebnis).",
  quickSlotsIllustrationLabel:
    "Abbildung der Schnellzugriffe",
  quickSlotLastPassageTooltip: "Letzter Abschnitt",
  quickSlot1ActiveTooltip: "Schnellzugriff 1 (aktiv)",
  quickSlot2Tooltip: "Schnellzugriff 2",
  quickSlot3Tooltip: "Schnellzugriff 3",

  // Common
  loading: "Laden...",
  error: "Fehler beim Laden",
};

export default de;
