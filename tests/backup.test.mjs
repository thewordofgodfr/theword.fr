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
  delete globalThis.window;
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
  assert.equal(backup.file.name, 'TheWord-sauvegarde.json');
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

test('recent searches export by supported language and restore to a new device', async () => {
  put('twog:search:recent:fr', ['amour', 'foi ']);
  put('twog:search:recent:en', ['love']);
  put('twog:search:recent:other', ['do not export']);
  const backup = api.createBackup().file;
  const saved = JSON.parse(await backup.text());
  assert.deepEqual(saved.data.recentSearches, { fr: ['amour', 'foi '], en: ['love'] });
  assert.ok(Number.isFinite(Date.parse(saved.createdAt)));
  assert.equal(backup.name, api.createBackup().file.name);
  globalThis.localStorage = new MemoryStorage();
  globalThis.sessionStorage = new MemoryStorage();
  await api.restoreBackupByMerging(backup);
  assert.deepEqual(get('twog:search:recent:fr'), ['amour', 'foi ']);
  assert.deepEqual(get('twog:search:recent:en'), ['love']);
  assert.equal(localStorage.getItem('twog:search:recent:other'), null);
});

test('restoring recent searches preserves local entries, deduplicates and stays capped and idempotent', async () => {
  put('twog:search:recent:fr', ['amour', 'bapteme', 'esperance']);
  const backup = api.createBackup().file;
  put('twog:search:recent:fr', ['paix', 'AMOUR', 'salut', 'verite', 'joie', 'pardon']);
  await api.restoreBackupByMerging(backup);
  const expected = ['paix', 'AMOUR', 'salut', 'verite', 'joie', 'pardon', 'bapteme', 'esperance'];
  assert.deepEqual(get('twog:search:recent:fr'), expected);
  await api.restoreBackupByMerging(backup);
  assert.deepEqual(get('twog:search:recent:fr'), expected);
});

test('old backup without recent searches leaves the local history intact', async () => {
  const saved = await payload();
  delete saved.data.recentSearches;
  put('twog:search:recent:fr', ['paix']);
  await api.restoreBackupByMerging(file(saved));
  assert.deepEqual(get('twog:search:recent:fr'), ['paix']);
});

test('invalid search history rejects the entire backup before writes', async () => {
  const original = await payload();
  for (const recentSearches of [
    [], { unknown: ['amour'] }, { fr: 'amour' }, { fr: ['a'] },
    { fr: [42] }, { fr: Array(9).fill('amour') },
  ]) {
    const saved = { ...original, data: { ...original.data, recentSearches } };
    const before = new Map(localStorage.values);
    await assert.rejects(api.restoreBackupByMerging(file(saved)));
    assert.deepEqual(localStorage.values, before);
  }
});

test('a late history write failure rolls back notes, settings and earlier language histories', async () => {
  put(keys.notes, [list('backup', 2)]);
  put('twog:search:recent:fr', ['amour']);
  put('twog:search:recent:en', ['love']);
  const backup = api.createBackup().file;
  put(keys.notes, [list('local', 3)]);
  put('twog:search:recent:fr', ['paix']);
  put('twog:search:recent:en', ['peace']);
  const before = new Map(localStorage.values);
  localStorage.failAt = 'twog:search:recent:en';
  await assert.rejects(api.restoreBackupByMerging(backup));
  assert.deepEqual(localStorage.values, before);
});

test('recent-search helpers preserve exact queries, sanitize corruption and persist individual removals', async () => {
  const recentBundle = await build({ entryPoints: ['src/utils/recentSearches.ts'], bundle: true,
    write: false, platform: 'node', format: 'esm', logLevel: 'silent' });
  const recent = await import(`data:text/javascript;base64,${Buffer.from(recentBundle.outputFiles[0].text).toString('base64')}`);
  assert.deepEqual(recent.addRecentSearch(['AMOUR', 'paix'], 'amour'), ['amour', 'paix']);
  assert.deepEqual(recent.addRecentSearch(['foi'], 'foi '), ['foi ', 'foi']);
  recent.saveRecentSearches('fr', ['amour', 'paix']);
  recent.saveRecentSearches('fr', recent.readRecentSearches('fr').filter(query => query !== 'amour'));
  assert.deepEqual(recent.readRecentSearches('fr'), ['paix']);
  recent.saveRecentSearches('fr', []);
  assert.deepEqual(recent.readRecentSearches('fr'), []);
  localStorage.setItem('fr', '{');
  assert.deepEqual(recent.readRecentSearches('fr'), []);
});

test('supported save picker suggests the fixed filename and writes the selected file', async () => {
  const backup = api.createBackup().file;
  const calls = [];
  globalThis.window = { showSaveFilePicker: async options => {
    assert.equal(options.suggestedName, 'TheWord-sauvegarde.json');
    return { createWritable: async () => ({
      write: async data => calls.push(data),
      close: async () => calls.push('closed'),
    }) };
  } };
  assert.equal(await api.shareOrDownloadBackup(backup), true);
  assert.deepEqual(calls, [backup, 'closed']);
});

test('cancelling the save picker does not download or share another copy', async () => {
  const backup = api.createBackup().file;
  navigator.canShare = () => true;
  navigator.share = async () => assert.fail('must not share after cancellation');
  globalThis.window = { showSaveFilePicker: async () => {
    throw new DOMException('cancelled', 'AbortError');
  } };
  assert.equal(await api.shareOrDownloadBackup(backup), false);
});

test('a selected file write failure is reported rather than reporting a successful backup', async () => {
  const backup = api.createBackup().file;
  globalThis.window = { showSaveFilePicker: async () => ({
    createWritable: async () => ({ write: async () => { throw new Error('disk full'); }, close: async () => {} }),
  }) };
  await assert.rejects(api.shareOrDownloadBackup(backup), /disk full/);
});

test('Android bypasses the exposed save picker and uses native file sharing', async () => {
  const backup = api.createBackup().file;
  navigator.userAgent = 'Mozilla/5.0 (Linux; Android 16; SM-S918B) SamsungBrowser/29.0';
  globalThis.window = { showSaveFilePicker: async () => assert.fail('Android picker must not open') };
  let shared;
  navigator.canShare = () => true;
  navigator.share = async data => { shared = data; };
  assert.equal(await api.shareOrDownloadBackup(backup), true);
  assert.equal(shared.files[0], backup);
  assert.equal(shared.files[0].name, 'TheWord-sauvegarde.json');
});

test('Android downloads when native sharing is unsupported or its capability check throws', async () => {
  for (const check of [() => false, () => { throw new TypeError('unsupported files'); }]) {
    navigator.userAgent = 'Mozilla/5.0 (Linux; Android 16) Chrome/140.0';
    navigator.share = async () => assert.fail('unsupported share must not open');
    navigator.canShare = check;
    globalThis.window = { showSaveFilePicker: async () => assert.fail('Android picker must not open') };
    let clicked = false;
    const link = { click() { clicked = true; }, remove() {} };
    globalThis.document = { body: { appendChild() {} }, createElement: () => link };
    assert.equal(await api.shareOrDownloadBackup(api.createBackup().file), true);
    assert.equal(link.download, 'TheWord-sauvegarde.json');
    assert.ok(clicked);
  }
});

test('Android falls back to downloading after a rejected native file share', async () => {
  navigator.userAgent = 'Mozilla/5.0 (Linux; Android 16) Chrome/140.0';
  navigator.canShare = () => true;
  navigator.share = async () => { throw new DOMException('unsupported', 'NotAllowedError'); };
  let clicked = false;
  const link = { click() { clicked = true; }, remove() {} };
  globalThis.document = { body: { appendChild() {} }, createElement: () => link };
  assert.equal(await api.shareOrDownloadBackup(api.createBackup().file), true);
  assert.ok(clicked);
});

test('cancelling Android sharing never downloads an unwanted copy', async () => {
  navigator.userAgent = 'Mozilla/5.0 (Linux; Android 16) Chrome/140.0';
  navigator.canShare = () => true;
  navigator.share = async () => { throw new DOMException('cancelled', 'AbortError'); };
  globalThis.document = { createElement() { assert.fail('must not download after cancellation'); } };
  assert.equal(await api.shareOrDownloadBackup(api.createBackup().file), false);
});
