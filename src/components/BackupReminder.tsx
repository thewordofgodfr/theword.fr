import { useCallback, useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { claimBackupReminder } from '../utils/backupReminder';
import { createBackup, shareOrDownloadBackup } from '../utils/backupUtils';

const DISPLAY_MS = 20_000;

export default function BackupReminder() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const visibleRef = useRef(false);
  const busyRef = useRef(false);
  const dismissTimer = useRef<number | undefined>(undefined);

  const dismiss = useCallback(() => {
    window.clearTimeout(dismissTimer.current);
    visibleRef.current = false;
    setVisible(false);
    setFailed(false);
  }, []);

  const scheduleDismiss = useCallback(() => {
    window.clearTimeout(dismissTimer.current);
    dismissTimer.current = window.setTimeout(() => {
      if (!busyRef.current) dismiss();
    }, DISPLAY_MS);
  }, [dismiss]);

  useEffect(() => {
    const check = () => {
      if (document.visibilityState === 'hidden' || visibleRef.current || busyRef.current) return;
      if (claimBackupReminder()) {
        visibleRef.current = true;
        setVisible(true);
        scheduleDismiss();
      }
    };
    const checkVisible = () => { if (document.visibilityState === 'visible') check(); };
    const checkStorage = (event: StorageEvent) => {
      if (!event.key || event.key.startsWith('twog:')) check();
    };
    if (visibleRef.current) scheduleDismiss();
    check();
    const interval = window.setInterval(check, 60_000);
    window.addEventListener('focus', check);
    window.addEventListener('storage', checkStorage);
    document.addEventListener('visibilitychange', checkVisible);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(dismissTimer.current);
      window.removeEventListener('focus', check);
      window.removeEventListener('storage', checkStorage);
      document.removeEventListener('visibilitychange', checkVisible);
    };
  }, [scheduleDismiss]);

  const save = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setFailed(false);
    window.clearTimeout(dismissTimer.current);
    try {
      const { file } = createBackup();
      await shareOrDownloadBackup(file);
      // Cancellation dismisses this reminder too; displaying it already began a new cycle.
      dismiss();
    } catch {
      setFailed(true);
      scheduleDismiss();
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  if (!visible) return null;
  return (
    <aside className="backup-reminder" role="status" aria-live="polite" aria-labelledby="backup-reminder-title">
      <h2 id="backup-reminder-title"><Download size={19} aria-hidden="true" />{t('backupReminderTitle')}</h2>
      <p>{t('backupReminderMessage')}</p>
      {failed && <p className="backup-reminder-error" role="alert">{t('backupError')}</p>}
      <div className="backup-reminder-actions">
        <button type="button" className="backup-reminder-save" disabled={busy} onClick={save}>
          {busy ? t('backupWorking') : t('backupReminderSave')}
        </button>
        <button type="button" className="backup-reminder-later" disabled={busy} onClick={dismiss}>
          {t('backupReminderLater')}
        </button>
      </div>
    </aside>
  );
}
