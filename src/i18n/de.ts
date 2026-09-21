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
    "Durchsuchen Sie sofort die gesamte Bibel nach Wörtern oder Ausdrücken, öffnen Sie die Ergebnisse unter „Lesen“ und kopieren oder teilen Sie einen Vers mit nur einer Berührung.",
  aboutIntro: `Warum The Word?

Ich habe The Word entwickelt, um mehrere Bücher der Bibel parallel lesen zu können, ohne den Faden meiner Lektüre zu verlieren. Mit der Zeit kamen weitere Funktionen hinzu, doch das Ziel blieb immer dasselbe: jedem dabei zu helfen, Gottes Wort zu lesen, darüber nachzudenken, es im Gedächtnis zu bewahren und danach zu leben.

Mein Wunsch

In einer Welt, in der so viele Stimmen versuchen, uns zu beeinflussen, ist mein Wunsch einfach: jeden dazu zu ermutigen, mit aufrichtigem Herzen unmittelbar zur Bibel zurückzukehren und darin nach der Wahrheit zu suchen.

Ich bete darum, dass diese Anwendung Ihnen hilft, Gottes Liebe zu entdecken, Jesus Christus kennenzulernen und zu verstehen, was er getan hat, um uns mit Gott zu versöhnen.

Lesen Sie sein Wort. Prüfen Sie es aufmerksam. Bitten Sie Gott, Sie zu führen, und antworten Sie dann auf seinen Ruf mit Glauben, Umkehr und Gehorsam.

„Wenn ihr in meinem Wort bleibt, seid ihr wirklich meine Jünger; ihr werdet die Wahrheit erkennen, und die Wahrheit wird euch frei machen.“

Johannes 8,31–32`,
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
    "Zu den Texten: Die integrierten Bibelausgaben werden gemäß ihren jeweiligen Lizenzen verwendet. Ausschließlich die Louis Segond 1910 wurde 2025 sprachlich modernisiert (Grammatik und Wortschatz), unter strikter Wahrung der ursprünglichen Manuskripte.",

  // Quick slots
  quickSlotsIntro:
    "Mit diesen 4 Schaltflächen können Sie sofort zu Ihren häufig gelesenen Stellen zurückkehren und mehrere Bücher parallel lesen: Verwenden Sie 1/2/3 für 3 verschiedene Speicherplätze und die Lupe, um zum letzten Abschnitt zurückzukehren (Zufallsvers oder Suchergebnis).",
  quickSlotsIllustrationLabel:
    "Abbildung der Schnellzugriffe",
  quickSlotLastPassageTooltip: "Letzter Abschnitt",
  quickSlot1ActiveTooltip: "Schnellzugriff 1 (aktiv)",
  quickSlot2Tooltip: "Schnellzugriff 2",
  quickSlot3Tooltip: "Schnellzugriff 3",
notesHelpTitle: 'Notizen & Studien — Bedienungsanleitung',

notesHelpIntro:
'Auf den Seiten „Notizen“ und „Studien“ können Sie Verse in thematischen Listen speichern und ordnen und sie durch eigene Textblöcke ergänzen. So können Sie Bibelstellen sammeln, Gedanken hinzufügen und strukturierte Bibelstudien erstellen. Ihre Notizen und Studien werden lokal auf Ihrem Gerät gespeichert und bleiben ohne Benutzerkonto verfügbar.',

notesHelp1Title: '1. Listen erstellen und verwalten',

notesHelp1Body:
'Die Hauptseite zeigt alle Notizlisten oder Studien. Sie können eine Liste erstellen, benennen, umbenennen oder löschen. Tippen Sie auf eine Liste, um ihren Inhalt zu öffnen. Mit „Alle Listen“ oder „Alle Studien“ kehren Sie zur Gesamtansicht zurück. Wenn Sie Notizen oder Studien erneut öffnen, wird automatisch die zuletzt verwendete Liste geöffnet und nahezu bis zu ihrem letzten Element gescrollt.',

notesHelp2Title: '2. Verse aus der Bibel hinzufügen',

notesHelp2Body:
'Wählen Sie auf der Seite „Lesen“ einen oder mehrere Verse aus und verwenden Sie anschließend die Schaltfläche „Notizen“ oder „Studien“. Die Verse werden mit Bibelstelle und Text in den gewählten Listen gespeichert. Derselbe Vers kann in mehreren Listen abgelegt werden.',

notesHelp3Title: '3. Textblöcke hinzufügen',

notesHelp3Body:
'Zusätzlich zu Versen können Sie eigene Textblöcke mit Kommentaren, Gedanken, Fragen, Gebeten, Predigtpunkten oder anderen Inhalten hinzufügen. „Textblock hinzufügen“ ist oben und unten in einer geöffneten Liste verfügbar. Über die Schaltfläche + neben einem Element können Sie einen Block genau an dieser Stelle einfügen. Textblöcke können bearbeitet, verschoben oder gelöscht werden.',

notesHelp4Title: '4. Elemente verwenden und neu ordnen',

notesHelp4Body:
'Öffnen Sie das Menü eines Elements, um die verfügbaren Aktionen anzuzeigen. Ein Vers kann direkt unter „Lesen“ geöffnet, kopiert oder geteilt werden. Ein Textblock kann kopiert, geteilt oder bearbeitet werden. Mit „Nach oben“ und „Nach unten“ ändern Sie die Reihenfolge. Jedes Element kann einzeln gelöscht werden.',

notesHelp5Title: '5. Eine vollständige Liste kopieren oder teilen',

notesHelp5Body:
'Im Menü einer Notizliste oder Studie können Sie mit „Kopieren“ und „Teilen“ den gesamten Inhalt übernehmen: Titel, Bibelstellen, Verstexte und persönliche Textblöcke. Anschließend können Sie ihn in eine Nachricht oder ein Dokument einfügen oder über eine kompatible App versenden.',

notesHelp6Title: '6. Mit einem The-Word-Code teilen oder übertragen',

notesHelp6Body:
'Die Schaltfläche „Code“ kopiert einen kompakten Code mit dem Titel und dem gesamten Inhalt der Liste. Eine andere Person mit The Word kann über „Code importieren“ dieselbe Liste auf ihrem Gerät wiederherstellen. Inhalte können damit auch zwischen Notizen und Studien übertragen werden: Kopieren Sie den Code auf einer Seite und importieren Sie ihn auf der anderen.',

notesHelp7Title: '7. Ein Textdokument importieren',

notesHelp7Body:
'Mit „Aus Text importieren“ können Sie den Inhalt eines Dokuments, einer E-Mail, einer Predigt oder eines Studienplans einfügen. Sie können alles in einem Block behalten oder automatisch anhand leerer Zeilen in mehrere Blöcke aufteilen lassen. Anschließend wird eine neue Notizliste oder Studie mit dem gewählten Titel erstellt.',

notesHelp8Title: '8. Lokale Speicherung und Sicherungen',

notesHelp8Body:
'Ihre Notizen und Studien werden lokal auf Ihrem Gerät gespeichert und nicht automatisch mit einem Konto oder Server synchronisiert. Beim Deinstallieren der App, Zurücksetzen ihrer Daten oder Löschen der Browserdaten können die Inhalte dauerhaft verloren gehen. Sichern Sie wichtige Listen durch Kopieren, Teilen oder einen The-Word-Code.',

notesHelp9Title: '9. Verwendungsmöglichkeiten',

notesHelp9Body:
'Verwenden Sie Notizen für Verse zum Auswendiglernen, tägliche Gedanken, Predigtvorbereitungen oder Gebetslisten. Studien eignen sich für ausführlichere Bibelarbeiten über ein Thema oder Buch, Hauskreise, Unterrichtspläne oder Predigtreihen.',

notesHelp10Title: '10. Notizen und Studien kombinieren',

notesHelp10Body:
'Notizen und Studien können gemeinsam verwendet werden. Sammeln Sie beispielsweise Verse, Gedanken und Gebete zunächst in Notizen und übertragen Sie Inhalte, die Sie vertiefen möchten, mit einem The-Word-Code in Studien. Dort können Sie sie neu ordnen, erweitern und teilen.',
  // Common
  loading: "Laden...",
  error: "Fehler beim Laden",
};

export default de;
