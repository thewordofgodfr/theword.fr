// src/pages/Notes.tsx

import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';

import {
  getAllLists,
  createList,
  renameList,
  deleteList,
  getListById,
  setListItems,
} from '../services/collectionsService';

import type {
  VerseList,
  VerseRef,
} from '../types/collections';

import {
  List as ListIcon,
  Edit3,
  Trash2,
  Share2,
  Plus,
  Copy,
  ArrowUp,
  ArrowDown,
  Type as TextIcon,
  Edit2 as EditTextIcon,
  HelpCircle,
  MoreVertical,
  X,
  BookOpen,
} from 'lucide-react';

import {
  encodeSharedList,
  decodeSharedList,
} from '../services/shareCodec';

const TEXT_SENTINEL = '__TEXT__';

const LAST_LIST_STORAGE_KEY =
  'theword:lastNotesListId';

type AnyItem = VerseRef & {
  kind?: 'text' | 'verse';
};

function splitIntoBlocks(
  raw: string
): string[] {
  return raw
    .split(/\n\s*\n+/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);
}

function buildPlainListText(
  list: VerseList
): string {
  const lines: string[] = [];

  const title =
    (list.title || '').trim();

  if (title) {
    lines.push(title);
  }

  lines.push('');

  for (
    const itRaw of list.items as AnyItem[]
  ) {
    const it =
      itRaw || ({} as AnyItem);

    const isText =
      it.bookId === TEXT_SENTINEL;

    if (isText) {
      const body =
        (it.text || '')
          .toString()
          .trim();

      if (body) {
        lines.push(body);
      }

      lines.push('');
      continue;
    }

    const ref =
      `${
        (it.bookName ??
          it.bookId) ||
        ''
      } ${it.chapter}:${it.verse}`.trim();

    if (ref) {
      lines.push(ref);
    }

    if (
      it.text &&
      String(it.text).trim()
    ) {
      lines.push(
        String(it.text).trim()
      );
    }

    lines.push('');
  }

  while (
    lines.length &&
    lines[lines.length - 1] === ''
  ) {
    lines.pop();
  }

  lines.push('');

  return lines.join('\n');
}

function buildItemPlainText(
  it: AnyItem
): string {
  const isText =
    it.bookId === TEXT_SENTINEL;

  if (isText) {
    return String(
      it.text ?? ''
    ).trim();
  }

  const ref =
    `${
      (it.bookName ??
        it.bookId) ||
      ''
    } ${it.chapter}:${it.verse}`.trim();

  const body =
    String(
      it.text ?? ''
    ).trim();

  return body
    ? `${ref}\n${body}`
    : ref;
}

export default function Notes() {
  const {
    state,
    setPage,
  } = useApp();

  const {
    t,
    language,
  } = useTranslation();

  const isDark =
    state.settings.theme === 'dark';

  const [lists, setLists] =
    useState<VerseList[]>([]);

  const [
    expandedId,
    setExpandedId,
  ] = useState<string | null>(
    () => {
      if (
        typeof window ===
        'undefined'
      ) {
        return null;
      }

      try {
        return (
          window.localStorage.getItem(
            LAST_LIST_STORAGE_KEY
          ) || null
        );
      } catch {
        return null;
      }
    }
  );

  /*
   * MENUS D'ACTIONS
   *
   * Auparavant les nombreuses actions
   * étaient affichées simultanément.
   *
   * Maintenant elles apparaissent
   * uniquement à la demande.
   */

  const [
    showMainMenu,
    setShowMainMenu,
  ] = useState(false);

  const [
    openListMenu,
    setOpenListMenu,
  ] = useState<string | null>(
    null
  );

  const [
    openItemMenu,
    setOpenItemMenu,
  ] = useState<{
    listId: string;
    idx: number;
  } | null>(null);

  /*
   * IMPORT DEPUIS UN TEXTE
   */

  const [
    showImportFromText,
    setShowImportFromText,
  ] = useState(false);

  const [
    importTextTitle,
    setImportTextTitle,
  ] = useState('');

  const [
    importTextBody,
    setImportTextBody,
  ] = useState('');

  const [
    importSplitBlocks,
    setImportSplitBlocks,
  ] = useState(true);

  /*
   * ÉDITION D'UN BLOC TEXTE
   */

  const [
    editingTextBlock,
    setEditingTextBlock,
  ] = useState<{
    listId: string;
    idx: number | null;
    initialValue: string;
    insertAt?: number | null;
  } | null>(null);

  const [
    editingTextValue,
    setEditingTextValue,
  ] = useState('');

  const [
    shouldScrollToLast,
    setShouldScrollToLast,
  ] = useState(false);

  /*
   * AIDE
   */

  const [
    showHelp,
    setShowHelp,
  ] = useState(false);

  /*
   * NOTIFICATION
   */

  const [
    toast,
    setToast,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer =
      window.setTimeout(
        () => setToast(null),
        1600
      );

    return () =>
      window.clearTimeout(timer);
  }, [toast]);

  const label = useMemo(
    () => ({
      title:
        t('notes'),

      create:
        t(
          'notesPage.create'
        ),

      placeholder:
        t(
          'notesPage.placeholder'
        ),

      empty:
        t(
          'notesPage.empty'
        ),

      verses:
        t(
          'notesPage.items'
        ),

      copied:
        t('copiedShort'),

      backAll:
        t(
          'notesPage.backAll'
        ),

      addTextBlock:
        t(
          'notesPage.addTextBlock'
        ),

      editTextBlock:
        t(
          'notesPage.editTextBlock'
        ),

      deleteItem:
        t(
          'notesPage.deleteItem'
        ),

      moveUp:
        t(
          'notesPage.moveUp'
        ),

      moveDown:
        t(
          'notesPage.moveDown'
        ),

      open:
        t(
          'notesPage.open'
        ),

      cancel:
        t('cancel'),

      confirmDeleteItem:
        t(
          'notesPage.confirmDeleteItem'
        ),

      newTextPlaceholder:
        t(
          'notesPage.newTextPlaceholder'
        ),

      shareCode:
        t(
          'notesPage.shareCode'
        ),

      importCode:
        t(
          'notesPage.importCode'
        ),

      importPrompt:
        t(
          'notesPage.importPrompt'
        ),

      importError:
        t(
          'notesPage.importError'
        ),

      importSuccess:
        t(
          'notesPage.importSuccess'
        ),

      shareCodeCopied:
        t(
          'notesPage.shareCodeCopied'
        ),

      importTextButton:
        t(
          'notesPage.importTextButton'
        ),

      importTextTitlePlaceholder:
        t(
          'notesPage.importTextTitlePlaceholder'
        ),

      importTextDefaultTitle:
        t(
          'notesPage.importTextDefaultTitle'
        ),

      importTextBodyPlaceholder:
        t(
          'notesPage.importTextBodyPlaceholder'
        ),

      importTextNoBody:
        t(
          'notesPage.importTextNoBody'
        ),

      importTextNoBlock:
        t(
          'notesPage.importTextNoBlock'
        ),

      importTextSplitLabel:
        t(
          'notesPage.importTextSplitLabel'
        ),

      importTextInfo:
        t(
          'notesPage.importTextInfo'
        ),

      importTextCreate:
        t(
          'notesPage.importTextCreate'
        ),

      duplicateTitle:
        t(
          'notesPage.duplicateTitle'
        ),

      confirmDeleteList:
        t(
          'notesPage.confirmDeleteList'
        ),

      emptyList:
        t(
          'notesPage.emptyList'
        ),

      importFromTextTitle:
        t(
          'notesPage.importFromTextTitle'
        ),

      documentContent:
        t(
          'notesPage.documentContent'
        ),

      helpTitle:
        t(
          'notesHelpTitle'
        ),

      helpIntro:
        t(
          'notesHelpIntro'
        ),

      help1Title:
        t(
          'notesHelp1Title'
        ),

      help1Body:
        t(
          'notesHelp1Body'
        ),

      help2Title:
        t(
          'notesHelp2Title'
        ),

      help2Body:
        t(
          'notesHelp2Body'
        ),

      help3Title:
        t(
          'notesHelp3Title'
        ),

      help3Body:
        t(
          'notesHelp3Body'
        ),

      help4Title:
        t(
          'notesHelp4Title'
        ),

      help4Body:
        t(
          'notesHelp4Body'
        ),

      help5Title:
        t(
          'notesHelp5Title'
        ),

      help5Body:
        t(
          'notesHelp5Body'
        ),

      help6Title:
        t(
          'notesHelp6Title'
        ),

      help6Body:
        t(
          'notesHelp6Body'
        ),

      help7Title:
        t(
          'notesHelp7Title'
        ),

      help7Body:
        t(
          'notesHelp7Body'
        ),

      help8Title:
        t(
          'notesHelp8Title'
        ),

      help8Body:
        t(
          'notesHelp8Body'
        ),

      help9Title:
        t(
          'notesHelp9Title'
        ),

      help9Body:
        t(
          'notesHelp9Body'
        ),

      help10Title:
        t(
          'notesHelp10Title'
        ),

      help10Body:
        t(
          'notesHelp10Body'
        ),
    }),
    [t, language]
  );

  /*
   * STYLES COMMUNS
   */

  const secondaryButton =
    isDark
      ? `
        bg-gray-700
        text-white
        border-gray-600
        hover:bg-gray-600
      `
      : `
        bg-gray-100
        text-gray-800
        border-gray-200
        hover:bg-gray-200
      `;

  const menuSurface =
    isDark
      ? `
        bg-gray-800
        border-gray-600
        text-white
      `
      : `
        bg-white
        border-gray-200
        text-gray-900
      `;

  /*
   * RAFRAÎCHISSEMENT
   */

  const refresh = () => {
    const all =
      getAllLists();

    const sorted =
      [...all].sort(
        (a, b) => {
          const ta =
            (a.title || '')
              .trim();

          const tb =
            (b.title || '')
              .trim();

          const cmp =
            ta.localeCompare(
              tb,
              undefined,
              {
                sensitivity:
                  'base',
              }
            );

          if (cmp !== 0) {
            return cmp;
          }

          return String(
            a.id
          ).localeCompare(
            String(b.id)
          );
        }
      );

    setLists(sorted);
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (expandedId) {
      setShouldScrollToLast(
        true
      );
    }
  }, []);

  /*
   * MÉMORISER LA DERNIÈRE LISTE
   */

  useEffect(() => {
    try {
      if (expandedId) {
        window.localStorage.setItem(
          LAST_LIST_STORAGE_KEY,
          expandedId
        );
      } else {
        window.localStorage.removeItem(
          LAST_LIST_STORAGE_KEY
        );
      }
    } catch {
      // Ignore
    }
  }, [expandedId]);

  /*
   * SI LA LISTE MÉMORISÉE
   * N'EXISTE PLUS
   */

  useEffect(() => {
    if (!expandedId) {
      return;
    }

    if (!lists.length) {
      return;
    }

    if (
      !lists.some(
        (list) =>
          list.id === expandedId
      )
    ) {
      setExpandedId(null);
    }
  }, [
    lists,
    expandedId,
  ]);

  /*
   * SCROLL VERS LE DERNIER ÉLÉMENT
   */

  useEffect(() => {
    if (
      !expandedId ||
      !shouldScrollToLast
    ) {
      return;
    }

    const list =
      lists.find(
        (item) =>
          item.id ===
          expandedId
      );

    if (
      !list ||
      !list.items.length
    ) {
      setShouldScrollToLast(
        false
      );

      return;
    }

    const lastIdx =
      list.items.length - 1;

    const element =
      document.getElementById(
        `note-item-${expandedId}-${lastIdx}`
      );

    if (
      element &&
      'scrollIntoView' in element
    ) {
      (
        element as HTMLElement
      ).scrollIntoView({
        block: 'center',
        behavior: 'auto',
      });
    }

    setShouldScrollToLast(
      false
    );
  }, [
    lists,
    expandedId,
    shouldScrollToLast,
  ]);

  /*
   * SYNCHRONISER LE TEXTE
   * DE LA MODALE
   */

  useEffect(() => {
    if (editingTextBlock) {
      setEditingTextValue(
        editingTextBlock.initialValue ??
          ''
      );
    } else {
      setEditingTextValue('');
    }
  }, [editingTextBlock]);

  /*
   * REFERMER LES MENUS
   * LORSQU'ON CHANGE DE LISTE
   */

  useEffect(() => {
    setShowMainMenu(false);
    setOpenListMenu(null);
    setOpenItemMenu(null);
  }, [expandedId]);

  /*
   * LISTES
   */

  const doCreate = () => {
    const title =
      prompt(
        label.placeholder
      ) ?? '';

    const trimmed =
      title.trim();

    if (!trimmed) {
      return;
    }

    const exists =
      getAllLists().find(
        (list) =>
          (list.title || '')
            .trim()
            .toLowerCase() ===
          trimmed.toLowerCase()
      );

    if (exists) {
      alert(
        label.duplicateTitle
      );

      setExpandedId(
        exists.id
      );

      return;
    }

    const created =
      createList(trimmed);

    refresh();

    setExpandedId(
      created.id
    );

    try {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    } catch {
      // Ignore
    }
  };

  const doRename = (
    id: string,
    current: string
  ) => {
    setOpenListMenu(null);

    const title =
      prompt(
        label.placeholder,
        current
      ) ?? '';

    const trimmed =
      title.trim();

    if (!trimmed) {
      return;
    }

    const exists =
      getAllLists().find(
        (list) =>
          list.id !== id &&
          (list.title || '')
            .trim()
            .toLowerCase() ===
            trimmed.toLowerCase()
      );

    if (exists) {
      alert(
        label.duplicateTitle
      );

      return;
    }

    renameList(
      id,
      trimmed
    );

    refresh();
  };

  const doDelete = (
    id: string
  ) => {
    setOpenListMenu(null);

    if (
      !confirm(
        label.confirmDeleteList
      )
    ) {
      return;
    }

    deleteList(id);

    refresh();

    if (
      expandedId === id
    ) {
      setExpandedId(null);
    }
  };

  /*
   * PARTAGE LISTE
   */

  const doShare =
    async (
      id: string
    ) => {
      setOpenListMenu(null);

      const list =
        getListById(id);

      if (!list) {
        return;
      }

      const payload =
`${buildPlainListText(list)}

Découvrir l’application The Word :
https://www.theword.fr/#about`;

      try {
        const nav: any =
          navigator;

        if (nav?.share) {
          await nav.share({
            title:
              list.title ||
              label.title,

            text: payload,
          });
        } else {
          await navigator
            .clipboard
            .writeText(
              payload
            );

          setToast(
            `${t(
              'textReadyToShare'
            )} ✅`
          );
        }
      } catch {
        // Annulation du partage
      }
    };

  const copyListText =
    async (
      id: string
    ) => {
      setOpenListMenu(null);

      const list =
        getListById(id);

      if (!list) {
        return;
      }

      const text =
        buildPlainListText(
          list
        );

      try {
        await navigator
          .clipboard
          .writeText(text);

        setToast(
          `${label.copied} ✅`
        );
      } catch {
        // Ignore
      }
    };

  const doShareCode =
    async (
      id: string
    ) => {
      setOpenListMenu(null);

      const list =
        getListById(id);

      if (!list) {
        return;
      }

      const code =
        encodeSharedList(
          'note',
          list
        );

      try {
        await navigator
          .clipboard
          .writeText(code);

        setToast(
          label.shareCodeCopied
        );
      } catch {
        prompt(
          label.shareCode,
          code
        );
      }
    };

  /*
   * IMPORT CODE
   */

  const doImportFromCode =
    () => {
      setShowMainMenu(false);

      const code =
        prompt(
          label.importPrompt
        ) ?? '';

      const trimmed =
        code.trim();

      if (!trimmed) {
        return;
      }

      const payload =
        decodeSharedList(
          trimmed
        );

      if (!payload) {
        alert(
          label.importError
        );

        return;
      }

      const title =
        payload.title
          ?.trim() ||
        label
          .importTextDefaultTitle;

      const created =
        createList(title);

      setListItems(
        created.id,
        (payload.items ||
          []) as VerseRef[]
      );

      refresh();

      setExpandedId(
        created.id
      );

      setToast(
        label.importSuccess
      );

      try {
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      } catch {
        // Ignore
      }
    };

  /*
   * IMPORT TEXTE
   */

  const openImportFromText =
    () => {
      setShowMainMenu(false);

      setImportTextTitle('');
      setImportTextBody('');
      setImportSplitBlocks(
        true
      );

      setShowImportFromText(
        true
      );
    };

  const handleCreateFromText =
    () => {
      const title =
        (
          importTextTitle ||
          ''
        ).trim() ||
        label
          .importTextDefaultTitle;

      const raw =
        (
          importTextBody ||
          ''
        ).trim();

      if (!raw) {
        alert(
          label.importTextNoBody
        );

        return;
      }

      const blocks =
        importSplitBlocks
          ? splitIntoBlocks(
              raw
            )
          : [raw];

      if (
        blocks.length === 0
      ) {
        alert(
          label.importTextNoBlock
        );

        return;
      }

      const items:
        AnyItem[] =
        blocks.map(
          (text) => ({
            bookId:
              TEXT_SENTINEL,

            bookName: '',

            chapter: 0,

            verse: 0,

            text,

            translation:
              state.settings
                .language,

            kind: 'text',
          })
        );

      const created =
        createList(title);

      setListItems(
        created.id,
        items as VerseRef[]
      );

      refresh();

      setExpandedId(
        created.id
      );

      setShowImportFromText(
        false
      );

      try {
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      } catch {
        // Ignore
      }
    };

  /*
   * COPIE / PARTAGE ITEM
   */

  const copyItemText =
    async (
      item: AnyItem
    ) => {
      const text =
        buildItemPlainText(
          item
        );

      if (!text) {
        return;
      }

      try {
        await navigator
          .clipboard
          .writeText(text);

        setToast(
          `${label.copied} ✅`
        );

        setOpenItemMenu(
          null
        );
      } catch {
        // Ignore
      }
    };

  const shareItem =
    async (
      item: AnyItem
    ) => {
      const payload =
`${buildItemPlainText(item)}

Découvrir l’application The Word :
https://www.theword.fr/#about`;

      try {
        const nav: any =
          navigator;

        if (nav?.share) {
          await nav.share({
            title:
              t(
                'verseWord'
              ),

            text: payload,
          });
        } else {
          await navigator
            .clipboard
            .writeText(
              payload
            );

          setToast(
            `${t(
              'textReadyToShare'
            )} ✅`
          );
        }

        setOpenItemMenu(
          null
        );
      } catch {
        // Annulation
      }
    };

  /*
   * OPÉRATIONS ITEMS
   */

  const updateItems = (
    listId: string,
    updater: (
      items: AnyItem[]
    ) => AnyItem[]
  ) => {
    const list =
      getListById(listId);

    if (!list) {
      return;
    }

    const next =
      updater(
        (
          list.items as
            AnyItem[]
        ) ?? []
      );

    try {
      setListItems(
        listId,
        next as VerseRef[]
      );

      refresh();
    } catch (error) {
      console.error(
        'setListItems error',
        error
      );
    }
  };

  const removeItem = (
    listId: string,
    idx: number
  ) => {
    if (
      !confirm(
        label.confirmDeleteItem
      )
    ) {
      return;
    }

    updateItems(
      listId,
      (items) => {
        const array =
          [...items];

        if (
          idx >= 0 &&
          idx <
            array.length
        ) {
          array.splice(
            idx,
            1
          );
        }

        return array;
      }
    );

    setOpenItemMenu(null);
  };

  const moveItem = (
    listId: string,
    idx: number,
    dir: -1 | 1
  ) => {
    updateItems(
      listId,
      (items) => {
        const array =
          [...items];

        const to =
          Math.max(
            0,
            Math.min(
              array.length -
                1,
              idx + dir
            )
          );

        if (to === idx) {
          return array;
        }

        const [moved] =
          array.splice(
            idx,
            1
          );

        array.splice(
          to,
          0,
          moved
        );

        return array;
      }
    );

    setOpenItemMenu(
      (previous) => {
        if (!previous) {
          return null;
        }

        if (
          previous.listId !==
          listId
        ) {
          return previous;
        }

        return {
          listId,

          idx:
            Math.max(
              0,
              previous.idx +
                dir
            ),
        };
      }
    );
  };

  /*
   * BLOC TEXTE
   */

  const addTextBlock = (
    listId: string
  ) => {
    setOpenListMenu(null);

    setEditingTextBlock({
      listId,

      idx: null,

      initialValue: '',

      insertAt: null,
    });
  };

  const insertTextBlockAt =
    (
      listId: string,
      insertAt: number
    ) => {
      setOpenItemMenu(null);

      setEditingTextBlock({
        listId,

        idx: null,

        initialValue: '',

        insertAt,
      });
    };

  const editTextBlock = (
    listId: string,
    idx: number,
    currentText: string
  ) => {
    setOpenItemMenu(null);

    setEditingTextBlock({
      listId,

      idx,

      initialValue:
        currentText || '',
    });
  };

  const handleSaveTextBlock =
    () => {
      if (
        !editingTextBlock
      ) {
        return;
      }

      const raw =
        editingTextValue;

      if (!raw.trim()) {
        setEditingTextBlock(
          null
        );

        return;
      }

      if (
        editingTextBlock.idx ===
        null
      ) {
        updateItems(
          editingTextBlock
            .listId,

          (items) => {
            const array =
              [...items];

            const newItem:
              AnyItem = {
              bookId:
                TEXT_SENTINEL,

              bookName: '',

              chapter: 0,

              verse: 0,

              text: raw,

              translation:
                state.settings
                  .language,

              kind: 'text',
            };

            const insertAt =
              typeof editingTextBlock
                .insertAt ===
              'number'
                ? Math.max(
                    0,
                    Math.min(
                      array.length,
                      editingTextBlock
                        .insertAt
                    )
                  )
                : null;

            if (
              insertAt === null
            ) {
              array.push(
                newItem
              );
            } else {
              array.splice(
                insertAt,
                0,
                newItem
              );
            }

            return array;
          }
        );
      } else {
        const idx =
          editingTextBlock.idx;

        updateItems(
          editingTextBlock
            .listId,

          (items) => {
            const array =
              [...items];

            if (
              idx < 0 ||
              idx >=
                array.length
            ) {
              return array;
            }

            const previous =
              (
                array[idx] ||
                {}
              ) as AnyItem;

            array[idx] = {
              ...previous,
              text: raw,
            };

            return array;
          }
        );
      }

      setEditingTextBlock(
        null
      );
    };

  /*
   * OUVERTURE D'UN VERSET
   */

  const openInReading = (
    item: AnyItem
  ) => {
    if (
      item.bookId ===
      TEXT_SENTINEL
    ) {
      return;
    }

    const url =
      new URL(
        window.location.href
      );

    url.searchParams.set(
      'b',
      item.bookId
    );

    url.searchParams.set(
      'c',
      String(item.chapter)
    );

    url.searchParams.set(
      'v',
      String(item.verse)
    );

    window.history.replaceState(
      {},
      '',
      url.toString()
    );

    setOpenItemMenu(null);

    setPage('reading');
  };

  /*
   * LISTES À AFFICHER
   */

  const shownLists =
    expandedId
      ? lists.filter(
          (list) =>
            list.id ===
            expandedId
        )
      : lists;

  const formatDate = (
    date:
      | string
      | number
      | Date
  ) =>
    new Date(
      date
    ).toLocaleDateString(
      undefined,
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
    );

  return (
    <div
      className={`
        min-h-[100svh]

        ${
          isDark
            ? 'bg-gray-900'
            : 'bg-gray-50'
        }
      `}
    >
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">

        {/* ==================================================
            EN-TÊTE
        ================================================== */}

        <div className="mb-6">
          <div className="flex items-center justify-between gap-3">
            <h1
              className={`
                text-2xl
                md:text-3xl
                font-bold
                flex
                items-center
                gap-2

                ${
                  isDark
                    ? 'text-white'
                    : 'text-gray-800'
                }
              `}
            >
              <ListIcon className="w-6 h-6" />

              {label.title}
            </h1>

            <button
              type="button"
              aria-label="Aide sur la page Notes"
              title="Aide / Mode d'emploi"
              onClick={() =>
                setShowHelp(true)
              }
              className={`
                inline-flex
                items-center
                justify-center
                rounded-full
                p-2.5
                border
                transition-colors

                ${
                  isDark
                    ? `
                      border-gray-600
                      text-gray-200
                      hover:bg-gray-800
                      hover:border-blue-500
                    `
                    : `
                      border-gray-300
                      text-gray-600
                      hover:bg-gray-100
                      hover:border-blue-500
                    `
                }
              `}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {/* ================================================
              PAGE PRINCIPALE :
              CRÉER + MENU IMPORT
          ================================================= */}

          {!expandedId && (
            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                onClick={doCreate}
                className="
                  flex-1
                  sm:flex-none
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-blue-700
                  text-white
                  font-semibold
                  text-sm
                  shadow-sm
                  hover:bg-blue-600
                  active:scale-[0.98]
                  transition
                "
              >
                <Plus size={18} />

                {label.create}
              </button>

              <div className="relative">
                <button
                  type="button"
                  aria-label="Options d'importation"
                  title="Autres options"
                  aria-expanded={
                    showMainMenu
                  }
                  onClick={() =>
                    setShowMainMenu(
                      (value) =>
                        !value
                    )
                  }
                  className={`
                    h-11
                    w-11
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    transition-colors

                    ${secondaryButton}
                  `}
                >
                  <MoreVertical
                    size={20}
                  />
                </button>

                {showMainMenu && (
                  <div
                    className={`
                      absolute
                      right-0
                      top-12
                      z-30
                      w-64
                      rounded-xl
                      border
                      shadow-xl
                      overflow-hidden

                      ${menuSurface}
                    `}
                  >
                    <button
                      type="button"
                      onClick={
                        openImportFromText
                      }
                      className={`
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-left
                        text-sm
                        transition-colors

                        ${
                          isDark
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-100'
                        }
                      `}
                    >
                      <TextIcon
                        size={18}
                      />

                      {
                        label.importTextButton
                      }
                    </button>

                    <button
                      type="button"
                      onClick={
                        doImportFromCode
                      }
                      className={`
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-left
                        text-sm
                        transition-colors

                        ${
                          isDark
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-100'
                        }
                      `}
                    >
                      <Copy
                        size={18}
                      />

                      {
                        label.importCode
                      }
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ==================================================
            BARRE D'OUTILS D'UNE LISTE OUVERTE
        ================================================== */}

        {expandedId && (
          <div
            className={`
              mb-4
              flex
              items-center
              gap-2
              p-2
              rounded-xl
              border

              ${
                isDark
                  ? `
                    bg-gray-800/60
                    border-gray-700
                  `
                  : `
                    bg-white
                    border-gray-200
                  `
              }
            `}
          >
            <button
              type="button"
              onClick={() =>
                setExpandedId(null)
              }
              className={`
                px-3
                py-2
                rounded-lg
                text-sm
                font-medium
                border
                transition-colors

                ${secondaryButton}
              `}
            >
              {label.backAll}
            </button>

            <button
              type="button"
              onClick={() =>
                expandedId &&
                addTextBlock(
                  expandedId
                )
              }
              className="
                flex-1
                sm:flex-none
                inline-flex
                items-center
                justify-center
                gap-2
                px-3
                py-2
                rounded-lg
                bg-blue-700
                text-white
                hover:bg-blue-600
                text-sm
                font-medium
                transition-colors
              "
            >
              <TextIcon
                size={16}
              />

              {label.addTextBlock}
            </button>
          </div>
        )}

        {/* ==================================================
            LISTES
        ================================================== */}

        {shownLists.length ===
        0 ? (
          <div
            className={`
              text-center
              py-16

              ${
                isDark
                  ? 'text-white/80'
                  : 'text-gray-600'
              }
            `}
          >
            {label.empty}
          </div>
        ) : (
          <div className="space-y-4">
            {shownLists.map(
              (list) => {
                const isOpen =
                  expandedId ===
                  list.id;

                const listMenuOpen =
                  openListMenu ===
                  list.id;

                return (
                  <div
                    key={list.id}
                    className={`
                      rounded-xl
                      border
                      shadow-sm
                      transition-colors

                      ${
                        isDark
                          ? `
                            bg-gray-800
                            border-gray-700
                            text-white
                          `
                          : `
                            bg-white
                            border-gray-200
                            text-gray-800
                          `
                      }
                    `}
                  >
                    {/* ========================================
                        EN-TÊTE DE LA LISTE
                    ======================================== */}

                    <div className="relative flex items-start gap-3 p-4">
                      <button
                        type="button"
                        onClick={
                          !isOpen
                            ? () => {
                                setOpenItemMenu(
                                  null
                                );

                                setExpandedId(
                                  list.id
                                );

                                try {
                                  window.scrollTo(
                                    {
                                      top: 0,
                                      behavior:
                                        'auto',
                                    }
                                  );
                                } catch {
                                  // Ignore
                                }
                              }
                            : undefined
                        }
                        className={`
                          flex-1
                          min-w-0
                          text-left

                          ${
                            !isOpen
                              ? 'cursor-pointer'
                              : 'cursor-default'
                          }
                        `}
                      >
                        <div className="text-xl font-semibold leading-snug whitespace-normal break-words">
                          {list.title}
                        </div>

                        <div
                          className={`
                            mt-1
                            text-xs

                            ${
                              isDark
                                ? 'text-white/60'
                                : 'text-gray-500'
                            }
                          `}
                        >
                          {
                            list
                              .items
                              .length
                          }{' '}
                          {
                            label.verses
                          }{' '}
                          •{' '}
                          {formatDate(
                            list.updatedAt
                          )}
                        </div>
                      </button>

                      {/* Actions de liste uniquement quand ouverte */}

                      {isOpen && (
                        <div className="relative shrink-0">
                          <button
                            type="button"
                            aria-label="Actions de la liste"
                            title="Actions"
                            aria-expanded={
                              listMenuOpen
                            }
                            onClick={() =>
                              setOpenListMenu(
                                listMenuOpen
                                  ? null
                                  : list.id
                              )
                            }
                            className={`
                              h-10
                              w-10
                              inline-flex
                              items-center
                              justify-center
                              rounded-lg
                              border
                              transition-colors

                              ${secondaryButton}
                            `}
                          >
                            <MoreVertical
                              size={20}
                            />
                          </button>

                          {listMenuOpen && (
                            <div
                              className={`
                                absolute
                                right-0
                                top-11
                                z-30
                                w-60
                                rounded-xl
                                border
                                shadow-xl
                                overflow-hidden

                                ${menuSurface}
                              `}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  doRename(
                                    list.id,
                                    list.title
                                  )
                                }
                                className={`
                                  w-full
                                  flex
                                  items-center
                                  gap-3
                                  px-4
                                  py-3
                                  text-left
                                  text-sm

                                  ${
                                    isDark
                                      ? 'hover:bg-gray-700'
                                      : 'hover:bg-gray-100'
                                  }
                                `}
                              >
                                <Edit3
                                  size={
                                    17
                                  }
                                />

                                {t(
                                  'notesPage.renameList'
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  doShare(
                                    list.id
                                  )
                                }
                                className={`
                                  w-full
                                  flex
                                  items-center
                                  gap-3
                                  px-4
                                  py-3
                                  text-left
                                  text-sm

                                  ${
                                    isDark
                                      ? 'hover:bg-gray-700'
                                      : 'hover:bg-gray-100'
                                  }
                                `}
                              >
                                <Share2
                                  size={
                                    17
                                  }
                                />

                                {t(
                                  'shareLabel'
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  copyListText(
                                    list.id
                                  )
                                }
                                className={`
                                  w-full
                                  flex
                                  items-center
                                  gap-3
                                  px-4
                                  py-3
                                  text-left
                                  text-sm

                                  ${
                                    isDark
                                      ? 'hover:bg-gray-700'
                                      : 'hover:bg-gray-100'
                                  }
                                `}
                              >
                                <Copy
                                  size={
                                    17
                                  }
                                />

                                {t(
                                  'copyLabel'
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  doShareCode(
                                    list.id
                                  )
                                }
                                className={`
                                  w-full
                                  flex
                                  items-center
                                  gap-3
                                  px-4
                                  py-3
                                  text-left
                                  text-sm

                                  ${
                                    isDark
                                      ? 'hover:bg-gray-700'
                                      : 'hover:bg-gray-100'
                                  }
                                `}
                              >
                                <Copy
                                  size={
                                    17
                                  }
                                />

                                {
                                  label.shareCode
                                }
                              </button>

                              <div
                                className={`
                                  border-t

                                  ${
                                    isDark
                                      ? 'border-gray-700'
                                      : 'border-gray-200'
                                  }
                                `}
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  doDelete(
                                    list.id
                                  )
                                }
                                className="
                                  w-full
                                  flex
                                  items-center
                                  gap-3
                                  px-4
                                  py-3
                                  text-left
                                  text-sm
                                  text-red-500
                                  hover:bg-red-500/10
                                "
                              >
                                <Trash2
                                  size={
                                    17
                                  }
                                />

                                {
                                  label.deleteItem
                                }
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* ========================================
                        CONTENU
                    ======================================== */}

                    {isOpen && (
                      <div
                        className={`
                          px-4
                          pb-4
                          border-t

                          ${
                            isDark
                              ? 'border-gray-700'
                              : 'border-gray-200'
                          }
                        `}
                      >
                        {list.items
                          .length ===
                        0 ? (
                          <div
                            className={`
                              py-6
                              text-sm
                              text-center

                              ${
                                isDark
                                  ? 'text-white/60'
                                  : 'text-gray-500'
                              }
                            `}
                          >
                            {
                              label.emptyList
                            }
                          </div>
                        ) : (
                          <ul className="pt-4 space-y-3">
                            {(
                              list.items as AnyItem[]
                            ).map(
                              (
                                item,
                                idx
                              ) => {
                                const isText =
                                  item.bookId ===
                                  TEXT_SENTINEL;

                                const menuOpen =
                                  openItemMenu
                                    ?.listId ===
                                    list.id &&
                                  openItemMenu
                                    ?.idx ===
                                    idx;

                                const itemBackground =
                                  isText
                                    ? isDark
                                      ? 'bg-gray-700/60 border-gray-600'
                                      : 'bg-blue-50 border-blue-100'
                                    : isDark
                                    ? 'bg-gray-900/50 border-gray-700'
                                    : 'bg-gray-50 border-gray-200';

                                return (
                                  <li
                                    key={
                                      idx
                                    }
                                    id={`note-item-${list.id}-${idx}`}
                                    className={`
                                      rounded-xl
                                      border
                                      overflow-hidden
                                      transition-colors

                                      ${itemBackground}
                                    `}
                                  >
                                    <div className="flex items-start gap-2 p-3">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setOpenItemMenu(
                                            menuOpen
                                              ? null
                                              : {
                                                  listId:
                                                    list.id,

                                                  idx,
                                                }
                                          )
                                        }
                                        className="flex-1 min-w-0 text-left"
                                      >
                                        {!isText && (
                                          <div
                                            className={`
                                              font-semibold
                                              mb-1

                                              ${
                                                isDark
                                                  ? 'text-blue-300'
                                                  : 'text-blue-700'
                                              }
                                            `}
                                          >
                                            {(
                                              item.bookName ??
                                              item.bookId
                                            ) ||
                                              ''}{' '}
                                            {
                                              item.chapter
                                            }
                                            :
                                            {
                                              item.verse
                                            }
                                          </div>
                                        )}

                                        {item.text ? (
                                          <div
                                            style={{
                                              fontSize:
                                                `${state.settings.fontSize}px`,

                                              lineHeight:
                                                '1.55',
                                            }}
                                            className={`
                                              whitespace-pre-wrap

                                              ${
                                                isDark
                                                  ? 'text-white'
                                                  : 'text-gray-800'
                                              }

                                              ${
                                                isText
                                                  ? 'font-serif'
                                                  : ''
                                              }
                                            `}
                                          >
                                            {
                                              item.text
                                            }
                                          </div>
                                        ) : null}
                                      </button>

                                      <button
                                        type="button"
                                        aria-label="Actions"
                                        title="Actions"
                                        onClick={() =>
                                          setOpenItemMenu(
                                            menuOpen
                                              ? null
                                              : {
                                                  listId:
                                                    list.id,

                                                  idx,
                                                }
                                          )
                                        }
                                        className={`
                                          shrink-0
                                          h-9
                                          w-9
                                          inline-flex
                                          items-center
                                          justify-center
                                          rounded-lg
                                          transition-colors

                                          ${
                                            isDark
                                              ? 'text-gray-300 hover:bg-gray-700'
                                              : 'text-gray-500 hover:bg-gray-200'
                                          }
                                        `}
                                      >
                                        <MoreVertical
                                          size={
                                            18
                                          }
                                        />
                                      </button>
                                    </div>

                                    {/* ================================
                                        MENU ITEM
                                    ================================ */}

                                    {menuOpen && (
                                      <div
                                        className={`
                                          border-t
                                          p-3

                                          ${
                                            isDark
                                              ? `
                                                bg-gray-800
                                                border-gray-700
                                              `
                                              : `
                                                bg-white
                                                border-gray-200
                                              `
                                          }
                                        `}
                                      >
                                        <div className="flex items-center justify-between mb-3">
                                          <span
                                            className={`
                                              text-xs
                                              font-semibold
                                              uppercase
                                              tracking-wide

                                              ${
                                                isDark
                                                  ? 'text-gray-400'
                                                  : 'text-gray-500'
                                              }
                                            `}
                                          >
                                            Actions
                                          </span>

                                          <button
                                            type="button"
                                            aria-label="Fermer"
                                            onClick={() =>
                                              setOpenItemMenu(
                                                null
                                              )
                                            }
                                            className={`
                                              h-8
                                              w-8
                                              rounded-full
                                              inline-flex
                                              items-center
                                              justify-center

                                              ${
                                                isDark
                                                  ? 'hover:bg-gray-700'
                                                  : 'hover:bg-gray-100'
                                              }
                                            `}
                                          >
                                            <X
                                              size={
                                                17
                                              }
                                            />
                                          </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                          {!isText && (
                                            <>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  openInReading(
                                                    item
                                                  )
                                                }
                                                className="
                                                  inline-flex
                                                  items-center
                                                  justify-center
                                                  gap-2
                                                  px-3
                                                  py-2.5
                                                  rounded-lg
                                                  bg-blue-700
                                                  text-white
                                                  text-sm
                                                  hover:bg-blue-600
                                                "
                                              >
                                                <BookOpen
                                                  size={
                                                    16
                                                  }
                                                />

                                                {
                                                  label.open
                                                }
                                              </button>

                                              <button
                                                type="button"
                                                onClick={() =>
                                                  copyItemText(
                                                    item
                                                  )
                                                }
                                                className={`
                                                  inline-flex
                                                  items-center
                                                  justify-center
                                                  gap-2
                                                  px-3
                                                  py-2.5
                                                  rounded-lg
                                                  border
                                                  text-sm

                                                  ${secondaryButton}
                                                `}
                                              >
                                                <Copy
                                                  size={
                                                    16
                                                  }
                                                />

                                                {t(
                                                  'copyLabel'
                                                )}
                                              </button>

                                              <button
                                                type="button"
                                                onClick={() =>
                                                  shareItem(
                                                    item
                                                  )
                                                }
                                                className={`
                                                  col-span-2
                                                  inline-flex
                                                  items-center
                                                  justify-center
                                                  gap-2
                                                  px-3
                                                  py-2.5
                                                  rounded-lg
                                                  border
                                                  text-sm

                                                  ${secondaryButton}
                                                `}
                                              >
                                                <Share2
                                                  size={
                                                    16
                                                  }
                                                />

                                                {t(
                                                  'shareLabel'
                                                )}
                                              </button>
                                            </>
                                          )}

                                          {isText && (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                editTextBlock(
                                                  list.id,
                                                  idx,
                                                  String(
                                                    item.text ||
                                                      ''
                                                  )
                                                )
                                              }
                                              className="
                                                col-span-2
                                                inline-flex
                                                items-center
                                                justify-center
                                                gap-2
                                                px-3
                                                py-2.5
                                                rounded-lg
                                                bg-blue-700
                                                text-white
                                                text-sm
                                                hover:bg-blue-600
                                              "
                                            >
                                              <EditTextIcon
                                                size={
                                                  16
                                                }
                                              />

                                              {
                                                label.editTextBlock
                                              }
                                            </button>
                                          )}
                                        </div>

                                        <div
                                          className={`
                                            my-3
                                            border-t

                                            ${
                                              isDark
                                                ? 'border-gray-700'
                                                : 'border-gray-200'
                                            }
                                          `}
                                        />

                                        <div className="flex items-center gap-2">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              moveItem(
                                                list.id,
                                                idx,
                                                -1
                                              )
                                            }
                                            disabled={
                                              idx ===
                                              0
                                            }
                                            title={
                                              label.moveUp
                                            }
                                            className={`
                                              h-10
                                              w-10
                                              inline-flex
                                              items-center
                                              justify-center
                                              rounded-lg
                                              border

                                              ${secondaryButton}

                                              disabled:opacity-30
                                              disabled:cursor-not-allowed
                                            `}
                                          >
                                            <ArrowUp
                                              size={
                                                17
                                              }
                                            />
                                          </button>

                                          <button
                                            type="button"
                                            onClick={() =>
                                              moveItem(
                                                list.id,
                                                idx,
                                                1
                                              )
                                            }
                                            disabled={
                                              idx ===
                                              list
                                                .items
                                                .length -
                                                1
                                            }
                                            title={
                                              label.moveDown
                                            }
                                            className={`
                                              h-10
                                              w-10
                                              inline-flex
                                              items-center
                                              justify-center
                                              rounded-lg
                                              border

                                              ${secondaryButton}

                                              disabled:opacity-30
                                              disabled:cursor-not-allowed
                                            `}
                                          >
                                            <ArrowDown
                                              size={
                                                17
                                              }
                                            />
                                          </button>

                                          <button
                                            type="button"
                                            onClick={() =>
                                              insertTextBlockAt(
                                                list.id,
                                                idx +
                                                  1
                                              )
                                            }
                                            title={
                                              label.addTextBlock
                                            }
                                            className={`
                                              h-10
                                              w-10
                                              inline-flex
                                              items-center
                                              justify-center
                                              rounded-lg
                                              border

                                              ${secondaryButton}
                                            `}
                                          >
                                            <TextIcon
                                              size={
                                                17
                                              }
                                            />
                                          </button>

                                          <div className="flex-1" />

                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeItem(
                                                list.id,
                                                idx
                                              )
                                            }
                                            title={
                                              label.deleteItem
                                            }
                                            className="
                                              h-10
                                              w-10
                                              inline-flex
                                              items-center
                                              justify-center
                                              rounded-lg
                                              border
                                              border-red-500/40
                                              text-red-500
                                              hover:bg-red-500/10
                                            "
                                          >
                                            <Trash2
                                              size={
                                                17
                                              }
                                            />
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        )}

                        {/* Ajouter un texte en bas */}

                        {list.items
                          .length >
                          0 && (
                          <div className="mt-5 flex justify-center">
                            <button
                              type="button"
                              onClick={() =>
                                addTextBlock(
                                  list.id
                                )
                              }
                              className={`
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                px-4
                                py-2
                                rounded-lg
                                border
                                text-sm
                                transition-colors

                                ${secondaryButton}
                              `}
                            >
                              <Plus
                                size={
                                  16
                                }
                              />

                              {
                                label.addTextBlock
                              }
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* ====================================================
          MODALE : IMPORT DE TEXTE
      ==================================================== */}

      {showImportFromText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Fermer"
            className="absolute inset-0 bg-black/60"
            onClick={() =>
              setShowImportFromText(
                false
              )
            }
          />

          <div
            className={`
              relative
              w-full
              max-w-lg
              rounded-2xl
              p-5
              shadow-2xl

              ${
                isDark
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-900'
              }
            `}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold">
                {
                  label.importFromTextTitle
                }
              </h2>

              <button
                type="button"
                aria-label="Fermer"
                onClick={() =>
                  setShowImportFromText(
                    false
                  )
                }
                className={`
                  h-9
                  w-9
                  rounded-full
                  flex
                  items-center
                  justify-center

                  ${
                    isDark
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }
                `}
              >
                <X size={19} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1.5">
                {
                  label.importTextTitlePlaceholder
                }
              </label>

              <input
                type="text"
                value={
                  importTextTitle
                }
                onChange={(event) =>
                  setImportTextTitle(
                    event.target
                      .value
                  )
                }
                placeholder={
                  label.importTextTitlePlaceholder
                }
                className={`
                  w-full
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  border
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:border-blue-500

                  ${
                    isDark
                      ? `
                        bg-gray-800
                        border-gray-600
                        text-white
                      `
                      : `
                        bg-gray-50
                        border-gray-300
                        text-gray-900
                      `
                  }
                `}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1.5">
                {
                  label.documentContent
                }
              </label>

              <textarea
                value={
                  importTextBody
                }
                onChange={(event) =>
                  setImportTextBody(
                    event.target
                      .value
                  )
                }
                placeholder={
                  label.importTextBodyPlaceholder
                }
                className={`
                  w-full
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  min-h-[180px]
                  border
                  resize-vertical
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:border-blue-500

                  ${
                    isDark
                      ? `
                        bg-gray-800
                        border-gray-600
                        text-white
                      `
                      : `
                        bg-gray-50
                        border-gray-300
                        text-gray-900
                      `
                  }
                `}
              />

              <div className="mt-1.5 text-xs opacity-70">
                {
                  label.importTextInfo
                }
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm mb-5">
              <input
                type="checkbox"
                checked={
                  importSplitBlocks
                }
                onChange={(event) =>
                  setImportSplitBlocks(
                    event.target
                      .checked
                  )
                }
                className="mt-0.5"
              />

              <span>
                {
                  label.importTextSplitLabel
                }
              </span>
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setShowImportFromText(
                    false
                  )
                }
                className={`
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  border

                  ${secondaryButton}
                `}
              >
                {label.cancel}
              </button>

              <button
                type="button"
                onClick={
                  handleCreateFromText
                }
                className="
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  bg-blue-700
                  text-white
                  hover:bg-blue-600
                "
              >
                {
                  label.importTextCreate
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          MODALE : BLOC TEXTE
      ==================================================== */}

      {editingTextBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Fermer"
            className="absolute inset-0 bg-black/60"
            onClick={() =>
              setEditingTextBlock(
                null
              )
            }
          />

          <div
            className={`
              relative
              w-full
              max-w-lg
              rounded-2xl
              p-5
              shadow-2xl

              ${
                isDark
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-900'
              }
            `}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-semibold">
                {editingTextBlock.idx ===
                null
                  ? label.addTextBlock
                  : label.editTextBlock}
              </h2>

              <button
                type="button"
                aria-label="Fermer"
                onClick={() =>
                  setEditingTextBlock(
                    null
                  )
                }
                className={`
                  h-9
                  w-9
                  rounded-full
                  flex
                  items-center
                  justify-center

                  ${
                    isDark
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }
                `}
              >
                <X size={19} />
              </button>
            </div>

            <textarea
              value={
                editingTextValue
              }
              onChange={(event) =>
                setEditingTextValue(
                  event.target
                    .value
                )
              }
              placeholder={
                label.newTextPlaceholder
              }
              className={`
                w-full
                rounded-lg
                px-3
                py-2
                min-h-[230px]
                border
                resize-vertical
                outline-none
                focus:ring-2
                focus:ring-blue-500/20
                focus:border-blue-500

                ${
                  isDark
                    ? `
                      bg-gray-800
                      border-gray-600
                      text-white
                    `
                    : `
                      bg-gray-50
                      border-gray-300
                      text-gray-900
                    `
                }
              `}
              style={{
                fontSize:
                  `${state.settings.fontSize}px`,

                lineHeight: '1.6',
              }}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() =>
                  setEditingTextBlock(
                    null
                  )
                }
                className={`
                  px-4
                  py-2
                  rounded-lg
                  border

                  ${secondaryButton}
                `}
              >
                {label.cancel}
              </button>

              <button
                type="button"
                onClick={
                  handleSaveTextBlock
                }
                className="
                  px-5
                  py-2
                  rounded-lg
                  bg-blue-700
                  text-white
                  font-medium
                  hover:bg-blue-600
                "
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          MODALE : AIDE
      ==================================================== */}

      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Fermer"
            className="absolute inset-0 bg-black/60"
            onClick={() =>
              setShowHelp(false)
            }
          />

          <div
            className={`
              relative
              w-full
              max-w-lg
              rounded-2xl
              p-5
              max-h-[90vh]
              overflow-y-auto
              shadow-2xl

              ${
                isDark
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-900'
              }
            `}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h2 className="text-xl font-semibold">
                {label.helpTitle}
              </h2>

              <button
                type="button"
                aria-label="Fermer"
                onClick={() =>
                  setShowHelp(false)
                }
                className={`
                  shrink-0
                  h-9
                  w-9
                  rounded-full
                  flex
                  items-center
                  justify-center

                  ${
                    isDark
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }
                `}
              >
                <X size={19} />
              </button>
            </div>

            <div
              className="space-y-5 leading-relaxed text-left"
              style={{
                fontSize:
                  `${Math.min(
                    state.settings
                      .fontSize,
                    22
                  )}px`,

                lineHeight: 1.6,
              }}
            >
              <p>
                {label.helpIntro}
              </p>

              {[
                [
                  label.help1Title,
                  label.help1Body,
                ],

                [
                  label.help2Title,
                  label.help2Body,
                ],

                [
                  label.help3Title,
                  label.help3Body,
                ],

                [
                  label.help4Title,
                  label.help4Body,
                ],

                [
                  label.help5Title,
                  label.help5Body,
                ],

                [
                  label.help6Title,
                  label.help6Body,
                ],

                [
                  label.help7Title,
                  label.help7Body,
                ],

                [
                  label.help8Title,
                  label.help8Body,
                ],

                [
                  label.help9Title,
                  label.help9Body,
                ],

                [
                  label.help10Title,
                  label.help10Body,
                ],
              ].map(
                (
                  [
                    title,
                    body,
                  ],
                  index
                ) => (
                  <section
                    key={index}
                  >
                    <h3 className="font-semibold mb-1">
                      {title}
                    </h3>

                    <p
                      className={
                        isDark
                          ? 'text-white/80'
                          : 'text-gray-700'
                      }
                    >
                      {body}
                    </p>
                  </section>
                )
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowHelp(false)
                }
                className="
                  px-5
                  py-2
                  rounded-lg
                  bg-blue-700
                  text-white
                  font-medium
                  hover:bg-blue-600
                "
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          TOAST
      ==================================================== */}

      {toast && (
        <div
          role="status"
          className="
            fixed
            left-1/2
            bottom-6
            z-[70]
            -translate-x-1/2
            max-w-[90vw]
            px-4
            py-2.5
            rounded-xl
            bg-gray-950
            text-white
            text-sm
            shadow-xl
            border
            border-gray-700
            text-center
          "
        >
          {toast}
        </div>
      )}
    </div>
  );
}
