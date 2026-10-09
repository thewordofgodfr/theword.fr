import { SUPPORTED_LANGUAGES } from '../types/bible';

const MAX_BACKUP_SIZE = 10 * 1024 * 1024;
const SCROLL_PREFIX = 'twog:reading:scroll:';
const KEYS = {
  notes: 'twog:collections:v1', studies: 'twog:principles:v1',
  readingSlots: 'twog:reading:slots:v1', lastActiveSlot: 'twog:qs:lastActive',
  lastTappedSlot: 'twog:qs:lastTapped', settings: 'bibleApp_settings',
  language: 'bibleApp_language', lastNotesList: 'theword:lastNotesListId',
  lastStudyList: 'twog:lastPrincipleId',
} as const;
type StoredValue = string | null;
type BackupData = Record<keyof typeof KEYS, StoredValue> & { scrollPositions?: Record<string, string> };
type BackupFile = { application: 'TheWord'; backupVersion: 1; createdAt: string; data: BackupData };
type Item = Record<string, unknown> & { bookId: string; chapter: number; verse: number };
type List = Record<string, unknown> & { id: string; title: string; items: Item[]; updatedAt: number | string };
export type BackupSummary = { notes: number; studies: number; readingSlots: number };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function invalid(): never { throw new Error('invalid-backup'); }
function array(raw: StoredValue): unknown[] {
  if (raw === null) return [];
  const value: unknown = JSON.parse(raw);
  return Array.isArray(value) ? value : invalid();
}
function validDate(value: unknown): boolean {
  return (typeof value === 'number' && Number.isFinite(value) && value >= 0)
    || (typeof value === 'string' && Number.isFinite(Date.parse(value)));
}
function positive(value: unknown): boolean {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}
function language(value: unknown): boolean {
  return typeof value === 'string' && SUPPORTED_LANGUAGES.some(code => code === value);
}
function lists(raw: StoredValue): List[] {
  const value = array(raw);
  const ids = new Set<string>();
  for (const list of value) {
    if (!isRecord(list) || typeof list.id !== 'string' || !list.id.trim()
      || ids.has(list.id) || typeof list.title !== 'string' || !Array.isArray(list.items)
      || !validDate(list.updatedAt) || !validDate(list.createdAt)) invalid();
    ids.add(list.id);
    for (const item of list.items) {
      if (!isRecord(item) || typeof item.bookId !== 'string' || !item.bookId
        || (item.text !== undefined && typeof item.text !== 'string')
        || (item.translation !== undefined && !language(item.translation))
        || (item.bookName !== undefined && typeof item.bookName !== 'string')) invalid();
      if (item.bookId === '__TEXT__') {
        if (typeof item.text !== 'string' || item.chapter !== 0 || item.verse !== 0) invalid();
      } else if (!positive(item.chapter) || !positive(item.verse)) invalid();
    }
  }
  return value as List[];
}
function slots(raw: StoredValue): unknown[] {
  const value = array(raw);
  if (value.length > 4) invalid();
  for (const slot of value) {
    if (slot === null) continue;
    if (!isRecord(slot) || typeof slot.book !== 'string' || !slot.book
      || !positive(slot.chapter) || (slot.verse !== undefined && !positive(slot.verse))
      || !validDate(slot.updatedAt)) invalid();
  }
  return value;
}
function settings(raw: StoredValue): Record<string, unknown> {
  if (raw === null) return {};
  const value: unknown = JSON.parse(raw);
  if (!isRecord(value)) invalid();
  if (value.language !== undefined && !language(value.language)) invalid();
  if (value.fontSize !== undefined && (typeof value.fontSize !== 'number'
    || !Number.isFinite(value.fontSize) || value.fontSize < 18 || value.fontSize > 42)) invalid();
  if (value.theme !== undefined && value.theme !== 'light' && value.theme !== 'dark') invalid();
  if (value.lastReadingPosition !== undefined) {
    const pos = value.lastReadingPosition;
    if (!isRecord(pos) || typeof pos.book !== 'string' || !pos.book || !positive(pos.chapter)
      || (pos.timestamp !== undefined && !validDate(pos.timestamp))) invalid();
  }
  // Only documented preferences are restored; arbitrary object fields are ignored.
  return Object.fromEntries(['language', 'fontSize', 'theme', 'lastReadingPosition']
    .filter(key => value[key] !== undefined).map(key => [key, value[key]]));
}
function validate(value: unknown): BackupFile {
  if (!isRecord(value) || value.application !== 'TheWord' || value.backupVersion !== 1
    || typeof value.createdAt !== 'string' || !validDate(value.createdAt) || !isRecord(value.data)) invalid();
  const raw = value.data;
  for (const key of Object.keys(KEYS)) {
    if (!(key in raw) || (raw[key] !== null && typeof raw[key] !== 'string')) invalid();
  }
  const data = raw as BackupData;
  lists(data.notes); lists(data.studies); slots(data.readingSlots); settings(data.settings);
  if (data.language !== null && !language(data.language)) invalid();
  for (const key of ['lastActiveSlot', 'lastTappedSlot'] as const) {
    if (data[key] !== null && !/^[0-3]$/.test(data[key])) invalid();
  }
  for (const key of ['lastNotesList', 'lastStudyList'] as const) {
    if (data[key] !== null && !data[key].trim()) invalid();
  }
  if (data.scrollPositions !== undefined) {
    if (!isRecord(data.scrollPositions)) invalid();
    for (const [key, y] of Object.entries(data.scrollPositions)) {
      if (!key.startsWith(SCROLL_PREFIX) || typeof y !== 'string' || !y.trim()
        || !Number.isFinite(Number(y)) || Number(y) < 0) invalid();
    }
  }
  return { application: 'TheWord', backupVersion: 1, createdAt: value.createdAt, data };
}
function summary(data: BackupData): BackupSummary {
  return { notes: lists(data.notes).length, studies: lists(data.studies).length,
    readingSlots: slots(data.readingSlots).slice(1, 4).filter(Boolean).length };
}
function getScrollPositions(): Record<string, string> {
  const positions: Record<string, string> = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key?.startsWith(SCROLL_PREFIX)) {
      const value = sessionStorage.getItem(key);
      if (value !== null) positions[key] = value;
    }
  }
  return positions;
}
export function createBackup(): { file: File; summary: BackupSummary } {
  const data = Object.fromEntries(Object.entries(KEYS)
    .map(([name, key]) => [name, localStorage.getItem(key)])) as unknown as BackupData;
  data.scrollPositions = getScrollPositions();
  const payload = validate({ application: 'TheWord', backupVersion: 1,
    createdAt: new Date().toISOString(), data });
  const file = new File([JSON.stringify(payload, null, 2)],
    `TheWord-sauvegarde-${payload.createdAt.slice(0, 10)}.json`, { type: 'application/json' });
  if (file.size > MAX_BACKUP_SIZE) throw new Error('backup-too-large');
  return { file, summary: summary(data) };
}
export async function shareOrDownloadBackup(file: File): Promise<boolean> {
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ title: 'The Word', files: [file] });
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return false;
    }
  }
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url; link.download = file.name;
  document.body.appendChild(link);
  link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}
function timestamp(list: List): number {
  return typeof list.updatedAt === 'number' ? list.updatedAt : Date.parse(list.updatedAt);
}
function itemKey(item: Item): string {
  return item.bookId === '__TEXT__'
    ? JSON.stringify(['text', item.text])
    : JSON.stringify([item.bookId, item.chapter, item.verse, item.translation ?? '']);
}
function mergeLists(current: StoredValue, imported: StoredValue): string {
  const merged = new Map(lists(current).map(list => [list.id, list]));
  for (const list of lists(imported)) {
    const existing = merged.get(list.id);
    if (!existing) { merged.set(list.id, list); continue; }
    const [newer, older] = timestamp(list) > timestamp(existing) ? [list, existing] : [existing, list];
    // Keep the latest title/order/content while retaining items absent from that version.
    const items = new Map(newer.items.map(item => [itemKey(item), item]));
    for (const item of older.items) if (!items.has(itemKey(item))) items.set(itemKey(item), item);
    merged.set(list.id, { ...newer, items: [...items.values()] });
  }
  return JSON.stringify([...merged.values()]);
}
async function readBackup(file: File): Promise<BackupFile> {
  if (file.size > MAX_BACKUP_SIZE) throw new Error('backup-too-large');
  return validate(JSON.parse(await file.text()));
}
export async function inspectBackup(file: File): Promise<BackupSummary> {
  return summary((await readBackup(file)).data);
}
export async function restoreBackupByMerging(file: File): Promise<BackupSummary> {
  const { data } = await readBackup(file);
  // Calculate and validate every change before the first write.
  const changes: Array<{ storage: Storage; key: string; value: string }> = [];
  const add = (key: string, value: string) => changes.push({ storage: localStorage, key, value });
  add(KEYS.notes, mergeLists(localStorage.getItem(KEYS.notes), data.notes));
  add(KEYS.studies, mergeLists(localStorage.getItem(KEYS.studies), data.studies));
  const currentSlots = slots(localStorage.getItem(KEYS.readingSlots));
  const importedSlots = slots(data.readingSlots);
  add(KEYS.readingSlots, JSON.stringify([0, 1, 2, 3]
    .map(i => importedSlots[i] ?? currentSlots[i] ?? null)));
  const currentSettings = settings(localStorage.getItem(KEYS.settings));
  const importedSettings = settings(data.settings);
  const restoredLanguage = importedSettings.language ?? data.language ?? currentSettings.language;
  const mergedSettings = { ...currentSettings, ...importedSettings,
    ...(restoredLanguage ? { language: restoredLanguage } : {}), theme: 'dark' };
  add(KEYS.settings, JSON.stringify(mergedSettings));
  if (typeof restoredLanguage === 'string') add(KEYS.language, restoredLanguage);
  for (const name of ['lastActiveSlot', 'lastTappedSlot', 'lastNotesList', 'lastStudyList'] as const) {
    if (data[name] !== null) add(KEYS[name], data[name]);
  }
  for (const [key, value] of Object.entries(data.scrollPositions ?? {})) {
    changes.push({ storage: sessionStorage, key, value });
  }
  const before = changes.map(change => ({ ...change, previous: change.storage.getItem(change.key) }));
  const applied: typeof before = [];
  try {
    for (const change of before) {
      applied.push(change);
      change.storage.setItem(change.key, change.value);
    }
  } catch (error) {
    // Restore in reverse order and attempt every rollback, even if one storage is unavailable.
    let rollbackFailed = false;
    for (const change of applied.reverse()) {
      try {
        if (change.previous === null) change.storage.removeItem(change.key);
        else change.storage.setItem(change.key, change.previous);
      } catch { rollbackFailed = true; }
    }
    if (rollbackFailed) throw new Error('backup-rollback-failed');
    throw error;
  }
  return summary(data);
}
