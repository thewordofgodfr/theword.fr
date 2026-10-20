// Device-local reminder state. Only new verse/text records count, not edits or navigation.
export const BACKUP_REMINDER_KEY = 'twog:backup:reminder:v1';
export const BACKUP_REMINDER_DAYS = 7;
export const BACKUP_REMINDER_ADDITIONS = 20;
const WEEK_MS = BACKUP_REMINDER_DAYS * 24 * 60 * 60 * 1000;
const CONTENT_KEYS = ['twog:collections:v1', 'twog:principles:v1'] as const;
type Counts = Record<string, number>;
type ReminderState = { version: 1; cycleStartedAt: number; pending: Counts };

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
function listCounts(key: string, raw: unknown): Counts {
  const counts: Counts = {};
  if (!CONTENT_KEYS.some(value => value === key)) return counts;
  try {
    const lists: unknown = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!Array.isArray(lists)) return counts;
    for (const list of lists) {
      if (isRecord(list) && typeof list.id === 'string' && Array.isArray(list.items)) {
        counts[key + ':' + list.id] = list.items.length;
      }
    }
  } catch { /* Invalid existing content is never modified by the reminder. */ }
  return counts;
}
export function backupContentSnapshot(notes: unknown, studies: unknown): Counts {
  return { ...listCounts(CONTENT_KEYS[0], notes), ...listCounts(CONTENT_KEYS[1], studies) };
}
function currentCounts(): Counts {
  return backupContentSnapshot(localStorage.getItem(CONTENT_KEYS[0]), localStorage.getItem(CONTENT_KEYS[1]));
}
function readState(now: number): ReminderState {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(BACKUP_REMINDER_KEY) || 'null');
    if (isRecord(value) && value.version === 1 && typeof value.cycleStartedAt === 'number'
      && Number.isFinite(value.cycleStartedAt) && value.cycleStartedAt >= 0 && isRecord(value.pending)) {
      const pending: Counts = {};
      for (const [key, count] of Object.entries(value.pending)) {
        if (CONTENT_KEYS.some(prefix => key.startsWith(prefix + ':'))
          && typeof count === 'number' && Number.isSafeInteger(count) && count > 0) pending[key] = count;
      }
      return { version: 1, cycleStartedAt: Math.min(value.cycleStartedAt, now), pending };
    }
  } catch { /* Missing/corrupt metadata starts a quiet cycle. */ }
  return { version: 1, cycleStartedAt: now, pending: {} };
}
function writeState(state: ReminderState): boolean {
  try {
    const raw = JSON.stringify(state);
    if (localStorage.getItem(BACKUP_REMINDER_KEY) !== raw) localStorage.setItem(BACKUP_REMINDER_KEY, raw);
    return true;
  } catch {
    // Reminder storage must never block saving Notes/Studies or exporting a backup.
    return false;
  }
}

// Called only after a successful content write, using its actual before/after values.
export function trackBackupAdditions(key: string, before: unknown, after: unknown, now = Date.now()): void {
  try {
    const previous = listCounts(key, before);
    const next = listCounts(key, after);
    const state = readState(now);
    for (const id of new Set([...Object.keys(previous), ...Object.keys(next)])) {
      const delta = (next[id] || 0) - (previous[id] || 0);
      const pending = Math.min(next[id] || 0, Math.max(0, (state.pending[id] || 0) + delta));
      if (pending) state.pending[id] = pending;
      else delete state.pending[id];
    }
    writeState(state);
  } catch { /* Best effort metadata; never interrupt the content write. */ }
}

// Claim once per cycle. The countdown and addition counter restart when it is displayed.
export function claimBackupReminder(now = Date.now()): boolean {
  try {
    const state = readState(now);
    const counts = currentCounts();
    for (const key of Object.keys(state.pending)) {
      const remaining = Math.min(state.pending[key], counts[key] || 0);
      if (remaining) state.pending[key] = remaining;
      else delete state.pending[key];
    }
    const total = Object.values(state.pending).reduce((sum, count) => sum + count, 0);
    if (total > 0 && (total >= BACKUP_REMINDER_ADDITIONS || now - state.cycleStartedAt >= WEEK_MS)) {
      return writeState({ version: 1, cycleStartedAt: now, pending: {} });
    }
    writeState(state);
  } catch { /* No reminder if storage is unavailable. */ }
  return false;
}

// A completed export/restoration starts a cycle too. Retain additions made after
// the exported snapshot while the user was choosing a destination.
export function markBackupContentSaved(saved: Counts, now = Date.now()): void {
  try {
    const state = readState(now);
    const counts = currentCounts();
    const pending: Counts = {};
    for (const [key, count] of Object.entries(state.pending)) {
      const remaining = Math.min(count, Math.max(0, (counts[key] || 0) - (saved[key] || 0)));
      if (remaining) pending[key] = remaining;
    }
    writeState({ version: 1, cycleStartedAt: now, pending });
  } catch { /* Never fail an otherwise successful backup for reminder metadata. */ }
}
