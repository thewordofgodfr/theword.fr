import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const bundle = await build({ entryPoints: ['src/utils/backupUtils.ts'], bundle: true,
  write: false, platform: 'node', format: 'esm', logLevel: 'silent' });
const api = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
class MemoryStorage {
  values = new Map(); failAt = null;
  get length() { return this.values.size; }
  key(i) { return [...this.values.keys()][i] ?? null; }
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) {
    if (key === this.failAt) { this.failAt = null; throw new Error('quota'); }
    this.values.set(key, String(value));
  }
  removeItem(key) { this.values.delete(key); }
}
const keys = { notes: 'twog:collections:v1', studies: 'twog:principles:v1',
  slots: 'twog:reading:slots:v1', settings: 'bibleApp_settings' };
const text = value => ({ bookId: '__TEXT__', chapter: 0, verse: 0, text: value, kind: 'text' });
const verse = { bookId: 'John', chapter: 3, verse: 16, text: 'A verse', translation: 'en' };
const list = (id, updatedAt, items = [verse]) => ({ id, title: id, createdAt: 1, updatedAt, items });
const slot = book => ({ book, chapter: 2, updatedAt: 5 });
const put = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const get = key => JSON.parse(localStorage.getItem(key));
const file = payload => new File([JSON.stringify(payload)], 'backup.json', { type: 'application/json' });
async function payload() { return JSON.parse(await api.createBackup().file.text()); }
beforeEach(() => {
  globalThis.localStorage = new MemoryStorage();
  globalThis.sessionStorage = new MemoryStorage();
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {} });
});

test('complete export/restore and fresh page readers preserve notes, studies, slots, preferences, scroll and pointers', async () => {
  put(keys.notes, [list('notes', 2, [verse, text('Prayer')])]);
  put(keys.studies, [list('study', '2026-10-09T12:00:00Z', [text('Study')])]);
  put(keys.slots, [slot('John'), slot('Genesis'), slot('Romans'), slot('Luke')]);
  put(keys.settings, { language: 'fr', fontSize: 27, theme: 'dark', lastReadingPosition: { book: 'Romans', chapter: 2, timestamp: 5 } });
  localStorage.setItem('bibleApp_language', 'fr');
  for (const [key, value] of Object.entries({ 'twog:qs:lastActive': '3', 'twog:qs:lastTapped': '3', 'theword:lastNotesListId': 'notes', 'twog:lastPrincipleId': 'study' })) localStorage.setItem(key, value);
  sessionStorage.setItem('twog:reading:scroll:fr:Romans:2', '532');
  localStorage.setItem('unrelated-cache', 'do not export');
  const backup = api.createBackup();
  assert.match(backup.file.name, /^TheWord-sauvegarde-\d{4}-\d{2}-\d{2}\.json$/);
  assert.deepEqual(backup.summary, { notes: 1, studies: 1, readingSlots: 3 });
  assert.equal((await backup.file.text()).includes('unrelated-cache'), false);
  const before = new Map(localStorage.values);
  globalThis.localStorage = new MemoryStorage(); globalThis.sessionStorage = new MemoryStorage();
  await api.restoreBackupByMerging(backup.file);
  for (const [key, value] of before) if (key !== 'unrelated-cache') assert.equal(localStorage.getItem(key), value);
  assert.equal(sessionStorage.getItem('twog:reading:scroll:fr:Romans:2'), '532');
  // Reopening pages reads the same stored data; repeating restore adds no duplicates.
  await api.restoreBackupByMerging(backup.file);
  assert.equal(get(keys.notes).length, 1); assert.equal(get(keys.notes)[0].items.length, 2);
});

test('latest list metadata wins; local-only lists and items survive without duplication', async () => {
  put(keys.notes, [list('same', '2026-10-09T12:00:00Z', [verse, text('Imported')]), list('new', 2)]);
  const backup = api.createBackup().file;
  put(keys.notes, [list('same', 2, [verse, text('Local only')]), list('local', 3)]);
  await api.restoreBackupByMerging(backup);
  const result = get(keys.notes);
  assert.equal(result.length, 3);
  assert.deepEqual(result.find(x => x.id === 'same').items.map(x => x.text), ['A verse', 'Imported', 'Local only']);
  await api.restoreBackupByMerging(backup);
  assert.equal(get(keys.notes).find(x => x.id === 'same').items.length, 3);
});

test('restoring an exact backup preserves repeated blocks and verses in Notes and Studies', async () => {
  for (const key of [keys.notes, keys.studies]) {
    const original = [list('repeated', 5, [text('Repeat'), verse, text('Repeat'), verse])];
    put(key, original);
    const backup = api.createBackup().file;
    await api.restoreBackupByMerging(backup);
    assert.deepEqual(get(key), original);
    await api.restoreBackupByMerging(backup);
    assert.deepEqual(get(key), original);
  }
});

test('merge preserves the larger occurrence count from either version and remains idempotent', async () => {
  for (const key of [keys.notes, keys.studies]) {
    for (const importedWins of [false, true]) {
      for (const newerHasMore of [false, true]) {
        globalThis.localStorage = new MemoryStorage();
        const newerItems = newerHasMore
          ? [text('Repeat'), verse, text('Repeat'), verse, text('New only')]
          : [text('Repeat'), verse, text('New only')];
        const olderItems = newerHasMore
          ? [text('Repeat'), verse, text('Old only')]
          : [text('Repeat'), verse, text('Repeat'), verse, text('Old only')];
        const newer = list('same', 10, newerItems);
        const older = list('same', 2, olderItems);
        put(key, [importedWins ? newer : older]);
        const backup = api.createBackup().file;
        put(key, [importedWins ? older : newer]);
        await api.restoreBackupByMerging(backup);
        const result = get(key)[0];
        assert.equal(result.updatedAt, 10);
        assert.deepEqual(result.items.slice(0, newerItems.length), newerItems);
        assert.equal(result.items.filter(item => item.text === 'Repeat').length, 2);
        assert.equal(result.items.filter(item => item.bookId === 'John').length, 2);
        assert.equal(result.items.filter(item => item.text === 'New only').length, 1);
        assert.equal(result.items.filter(item => item.text === 'Old only').length, 1);
        await api.restoreBackupByMerging(backup);
        assert.deepEqual(get(key)[0], result);
      }
    }
  }
});

test('null backup slots keep local slots and saved slots restore 1–3', async () => {
  put(keys.slots, [null, slot('Genesis'), null, slot('Luke')]);
  const backup = api.createBackup().file;
  put(keys.slots, [slot('John'), slot('Romans'), slot('Acts'), null]);
  await api.restoreBackupByMerging(backup);
  assert.deepEqual(get(keys.slots).map(x => x?.book ?? null), ['John', 'Genesis', 'Acts', 'Luke']);
});

test('reject invalid files before any write, including malformed items, preferences and oversized files', async () => {
  const original = await payload();
  const cases = [
    { ...original, application: 'Other' }, { ...original, backupVersion: 2 },
    { ...original, data: { ...original.data, notes: '{}' } },
    { ...original, data: { ...original.data, notes: JSON.stringify([{ id: 'bad', items: [] }]) } },
    { ...original, data: { ...original.data, settings: '{"language":"invalid"}' } },
    { ...original, data: { ...original.data, settings: '{"fontSize":999}' } },
    { ...original, data: { ...original.data, readingSlots: '[{"book":"Luke","chapter":-1}]' } },
    { ...original, data: { ...original.data, scrollPositions: { 'other:key': '1' } } },
  ];
  for (const value of cases) {
    await assert.rejects(api.inspectBackup(file(value)));
    await assert.rejects(api.restoreBackupByMerging(file(value)));
    assert.equal(localStorage.length, 0);
  }
  await assert.rejects(api.inspectBackup(new File([' '.repeat(10 * 1024 * 1024 + 1)], 'huge.json')));
});

test('rollback restores all prior storage when a late local/session write fails', async () => {
  put(keys.notes, [list('backup', 2)]); sessionStorage.setItem('twog:reading:scroll:fr:Luke:2', '300');
  const backup = api.createBackup().file;
  put(keys.notes, [list('local', 3)]);
  sessionStorage.setItem('twog:reading:scroll:fr:Luke:2', '50');
  for (const [storage, key] of [[localStorage, keys.settings], [sessionStorage, 'twog:reading:scroll:fr:Luke:2']]) {
    const beforeLocal = new Map(localStorage.values); const beforeSession = new Map(sessionStorage.values);
    storage.failAt = key;
    await assert.rejects(api.restoreBackupByMerging(backup));
    assert.deepEqual(localStorage.values, beforeLocal); assert.deepEqual(sessionStorage.values, beforeSession);
  }
});

test('old v1 files without scroll positions still restore, and separate language preference is applied', async () => {
  const data = await payload(); delete data.data.scrollPositions; data.data.language = 'ja';
  await api.restoreBackupByMerging(file(data));
  assert.equal(get(keys.settings).language, 'ja');
  assert.equal(localStorage.getItem('bibleApp_language'), 'ja');
});

test('native file share reports completion or cancellation without triggering download', async () => {
  const backup = api.createBackup().file;
  let shared;
  navigator.canShare = () => true; navigator.share = async value => { shared = value; };
  assert.equal(await api.shareOrDownloadBackup(backup), true);
  assert.equal(shared.files[0], backup);
  navigator.share = async () => { throw new DOMException('cancelled', 'AbortError'); };
  assert.equal(await api.shareOrDownloadBackup(backup), false);
});

test('unsupported native sharing downloads a JSON file', async () => {
  const backup = api.createBackup().file;
  let clicked = false; let appended = false; let removed = false;
  const link = { click() { clicked = true; }, remove() { removed = true; } };
  globalThis.document = { body: { appendChild() { appended = true; } }, createElement: () => link };
  assert.equal(await api.shareOrDownloadBackup(backup), true);
  assert.equal(link.download, backup.name); assert.ok(clicked && appended && removed);
});

test('Settings shows both active backup buttons above Updates in all 18 languages', async () => {
  const ui = await build({ entryPoints: ['src/pages/Settings.tsx'], bundle: true, write: false,
    platform: 'node', format: 'esm', packages: 'external', logLevel: 'silent',
    plugins: [{ name: 'test-app-context', setup(builder) {
      builder.onResolve({ filter: /contexts\/AppContext$/ }, () => ({ path: 'test-context', namespace: 'fixture' }));
      builder.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({ contents:
        'export function useApp() { return globalThis.__backupTestApp; }', loader: 'js' }));
    } }],
  });
  // Put the bundled test module alongside node_modules so external React resolves normally.
  const { writeFile, unlink } = await import('node:fs/promises');
  const path = new URL('../.backup-settings-check.mjs', import.meta.url);
  await writeFile(path, ui.outputFiles[0].text);
  try {
    const { default: Settings } = await import(path.href);
    for (const code of ['fr','en','de','it','es','pt','ru','hi','zh','ar','id','sw','tr','ja','ko','yo','he','el']) {
      globalThis.__backupTestApp = { state: { settings: { language: code, theme: 'dark', fontSize: 25 } }, updateSettings() {}, dispatch() {} };
      const html = renderToStaticMarkup(React.createElement(Settings));
      assert.ok(!/backupTitle|backupCreate|backupRestore|backupDescription/.test(html), code + ': missing translation');
      assert.match(html, /accept="application\/json,.json"/);
      assert.ok(html.indexOf('accept="application/json,.json"') < html.indexOf('lucide-refresh-ccw'), code + ': backup must precede Updates');
      const buttons = [...html.matchAll(/<button[^>]*>.*?<\/button>/g)].map(m => m[0]);
      const backupButtons = buttons.filter(button => button.includes('disabled:opacity-60'));
      assert.equal(backupButtons.length, 2, code);
      assert.ok(backupButtons.every(button => !/ disabled(?:=| )/.test(button)), code);
    }
  } finally { await unlink(path); delete globalThis.__backupTestApp; }
});
