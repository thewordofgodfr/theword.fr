import { test, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

async function bundled(path) {
  const result = await build({ entryPoints: [path], bundle: true, write: false,
    platform: 'node', format: 'esm', logLevel: 'silent' });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}
const reminder = await bundled('src/utils/backupReminder.ts');
const backup = await bundled('src/utils/backupUtils.ts');
const collections = await bundled('src/services/collectionsService.ts');
const NOTES = 'twog:collections:v1';
const STUDIES = 'twog:principles:v1';
const WEEK = 7 * 24 * 60 * 60 * 1000;
const realNow = Date.now;
let now = 0;

class MemoryStorage {
  values = new Map(); failAt = null;
  get length() { return this.values.size; }
  key(i) { return [...this.values.keys()][i] ?? null; }
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) {
    if (key === this.failAt) throw new Error('quota');
    this.values.set(key, String(value));
  }
  removeItem(key) { this.values.delete(key); }
}
const item = index => ({ bookId: 'John', chapter: 3, verse: index + 1, text: 'Verse ' + index });
const list = (id, count) => ({ id, title: id, createdAt: 1, updatedAt: 1,
  items: Array.from({ length: count }, (_, i) => item(i)) });
const getState = () => JSON.parse(localStorage.getItem(reminder.BACKUP_REMINDER_KEY));
function writeContent(key, lists) {
  const before = localStorage.getItem(key);
  const after = JSON.stringify(lists);
  localStorage.setItem(key, after);
  reminder.trackBackupAdditions(key, before, after);
}
function prepareShare(action = async () => {}) {
  navigator.canShare = () => true;
  navigator.share = action;
}
beforeEach(() => {
  now = 0;
  Date.now = () => now;
  globalThis.localStorage = new MemoryStorage();
  globalThis.sessionStorage = new MemoryStorage();
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {} });
  delete globalThis.window;
});
after(() => { Date.now = realNow; });

test('opening Home never prompts without new records, including existing content and empty lists', () => {
  localStorage.setItem(NOTES, JSON.stringify([list('old', 25)]));
  assert.equal(reminder.claimBackupReminder(), false);
  now = 100 * WEEK;
  assert.equal(reminder.claimBackupReminder(), false);
  writeContent(STUDIES, [list('empty', 0)]);
  assert.equal(reminder.claimBackupReminder(), false);
});

test('20 new records trigger once and start a new cycle at display', () => {
  reminder.claimBackupReminder();
  writeContent(NOTES, [list('notes', 19)]);
  assert.equal(reminder.claimBackupReminder(), false);
  writeContent(NOTES, [list('notes', 20)]);
  assert.equal(reminder.claimBackupReminder(), true);
  assert.equal(reminder.claimBackupReminder(), false);
  assert.deepEqual(getState().pending, {});
  now = WEEK;
  assert.equal(reminder.claimBackupReminder(), false);
  writeContent(NOTES, [list('notes', 21)]);
  assert.equal(reminder.claimBackupReminder(), true);
});

test('seven days requires new records and restarts after the previous display', () => {
  reminder.claimBackupReminder();
  writeContent(NOTES, [list('notes', 1)]);
  now = WEEK - 1;
  assert.equal(reminder.claimBackupReminder(), false);
  now = WEEK;
  assert.equal(reminder.claimBackupReminder(), true);
  writeContent(NOTES, [list('notes', 2)]);
  now = 2 * WEEK - 1;
  assert.equal(reminder.claimBackupReminder(), false);
  now = 2 * WEEK;
  assert.equal(reminder.claimBackupReminder(), true);
  now = 3 * WEEK;
  assert.equal(reminder.claimBackupReminder(), false);
});

test('twenty additional records starts another cycle even before another seven days', () => {
  writeContent(NOTES, [list('notes', 20)]);
  assert.equal(reminder.claimBackupReminder(), true);
  writeContent(NOTES, [list('notes', 39)]);
  assert.equal(reminder.claimBackupReminder(), false);
  writeContent(NOTES, [list('notes', 40)]);
  assert.equal(reminder.claimBackupReminder(), true);
});

test('Notes and Studies additions are combined, including bulk imports and duplicate blocks', () => {
  writeContent(NOTES, [list('notes', 12)]);
  const study = list('study', 8);
  study.items = Array(8).fill({ bookId: '__TEXT__', chapter: 0, verse: 0, text: 'Repeated block' });
  writeContent(STUDIES, [study]);
  assert.equal(reminder.claimBackupReminder(), true);
});

test('renaming, editing, reordering and navigating do not advance the addition counter', () => {
  localStorage.setItem(NOTES, JSON.stringify([list('old', 20)]));
  reminder.claimBackupReminder();
  const updated = { ...list('old', 20), title: 'Renamed', updatedAt: 5 };
  updated.items.reverse();
  updated.items[0].text = 'Edited existing text';
  writeContent(NOTES, [updated]);
  now = WEEK;
  assert.equal(reminder.claimBackupReminder(), false);
});

test('deleted additions or deleted lists no longer cause a reminder', () => {
  writeContent(NOTES, [list('notes', 19)]);
  writeContent(NOTES, [list('notes', 0)]);
  writeContent(STUDIES, [list('study', 19)]);
  writeContent(STUDIES, []);
  now = WEEK;
  assert.equal(reminder.claimBackupReminder(), false);
});

test('a manual successful backup restarts the cycle, while newly added content remains eligible later', async () => {
  writeContent(NOTES, [list('notes', 19)]);
  const file = backup.createBackup().file;
  now = WEEK - 1;
  prepareShare();
  assert.equal(await backup.shareOrDownloadBackup(file), true);
  assert.equal(getState().cycleStartedAt, now);
  assert.deepEqual(getState().pending, {});
  now += WEEK;
  assert.equal(reminder.claimBackupReminder(), false);
  writeContent(NOTES, [list('notes', 20)]);
  assert.equal(reminder.claimBackupReminder(), true);
});

test('additions during the save dialog are not mistakenly marked as backed up', async () => {
  writeContent(NOTES, [list('notes', 5)]);
  const file = backup.createBackup().file;
  prepareShare(async () => writeContent(NOTES, [list('notes', 6)]));
  assert.equal(await backup.shareOrDownloadBackup(file), true);
  assert.equal(Object.values(getState().pending).reduce((a, b) => a + b, 0), 1);
  now = WEEK;
  assert.equal(reminder.claimBackupReminder(), true);
});

test('cancelled backups leave the current cycle and additions unchanged', async () => {
  writeContent(NOTES, [list('notes', 19)]);
  const file = backup.createBackup().file;
  const before = localStorage.getItem(reminder.BACKUP_REMINDER_KEY);
  prepareShare(async () => { throw new DOMException('cancel', 'AbortError'); });
  now = 100;
  assert.equal(await backup.shareOrDownloadBackup(file), false);
  assert.equal(localStorage.getItem(reminder.BACKUP_REMINDER_KEY), before);
});

test('failed file writes leave the current cycle and additions unchanged', async () => {
  writeContent(NOTES, [list('notes', 19)]);
  const file = backup.createBackup().file;
  const before = localStorage.getItem(reminder.BACKUP_REMINDER_KEY);
  globalThis.window = { showSaveFilePicker: async () => ({
    createWritable: async () => ({ write: async () => { throw new Error('full'); }, close: async () => {} }),
  }) };
  await assert.rejects(backup.shareOrDownloadBackup(file), /full/);
  assert.equal(localStorage.getItem(reminder.BACKUP_REMINDER_KEY), before);
});

test('restoration resets backed-up additions but retains local additions absent from the file', async () => {
  writeContent(NOTES, [list('saved', 5)]);
  const file = backup.createBackup().file;
  writeContent(STUDIES, [list('local', 3)]);
  await backup.restoreBackupByMerging(file);
  assert.deepEqual(Object.values(getState().pending), [3]);
  now = WEEK;
  assert.equal(reminder.claimBackupReminder(), true);
});

test('corrupt or unavailable reminder storage never damages Notes or blocks a successful export', async () => {
  localStorage.setItem(reminder.BACKUP_REMINDER_KEY, '{');
  const notes = JSON.stringify([list('notes', 3)]);
  localStorage.setItem(NOTES, notes);
  assert.equal(reminder.claimBackupReminder(), false);
  localStorage.failAt = reminder.BACKUP_REMINDER_KEY;
  reminder.trackBackupAdditions(NOTES, JSON.stringify([list('notes', 2)]), notes);
  assert.equal(localStorage.getItem(NOTES), notes);
  prepareShare();
  assert.equal(await backup.shareOrDownloadBackup(backup.createBackup().file), true);
});

test('the actual Notes service counts successful additions and ignores edits, duplicates and failed writes', () => {
  const created = collections.createList('Notes');
  assert.equal(reminder.claimBackupReminder(), false);
  collections.addVersesToList(created.id, Array.from({ length: 19 }, (_, i) => item(i)));
  collections.renameList(created.id, 'Renamed');
  collections.addVerseToList(created.id, item(0));
  assert.equal(reminder.claimBackupReminder(), false);
  localStorage.failAt = NOTES;
  collections.addVerseToList(created.id, item(19));
  assert.equal(reminder.claimBackupReminder(), false);
  localStorage.failAt = null;
  collections.addVerseToList(created.id, item(19));
  assert.equal(reminder.claimBackupReminder(), true);
});

test('reminder state is local metadata and is never included in backup content', async () => {
  writeContent(NOTES, [list('notes', 3)]);
  const file = backup.createBackup().file;
  assert.equal((await file.text()).includes(reminder.BACKUP_REMINDER_KEY), false);
});
