export type UpdateStatus = 'idle' | 'checking' | 'downloading' | 'ready' | 'upToDate' | 'offline' | 'unavailable' | 'error';
export type UpdateResult = { status: UpdateStatus; worker?: ServiceWorker };

/** Observe the actual installation, including one that started before the check. */
export function checkForAppUpdate(
  registration: ServiceWorkerRegistration,
  onProgress: (status: UpdateStatus) => void,
  signal?: AbortSignal,
  timeoutMs = 90000,
): Promise<UpdateResult> {
  return new Promise((resolve) => {
    let done = false;
    let checked = false;
    let observed: ServiceWorker | null = null;
    const finish = (status: UpdateStatus, worker?: ServiceWorker) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      registration.removeEventListener('updatefound', inspect);
      observed?.removeEventListener('statechange', inspect);
      signal?.removeEventListener('abort', cancel);
      resolve({ status, worker });
    };
    const cancel = () => finish('idle');
    const inspect = () => {
      if (done) return;
      const worker = registration.installing || registration.waiting || observed;
      if (worker && worker !== observed) {
        observed?.removeEventListener('statechange', inspect);
        observed = worker;
        worker.addEventListener('statechange', inspect);
      }
      if (worker) {
        if (worker.state === 'redundant') return finish('error');
        if (worker.state === 'installed' || worker.state === 'activated') return finish('ready', worker);
        onProgress('downloading');
      } else if (checked) {
        finish('upToDate');
      }
    };
    const timer = setTimeout(() => finish('error'), timeoutMs);
    if (signal?.aborted) return cancel();
    signal?.addEventListener('abort', cancel, { once: true });
    registration.addEventListener('updatefound', inspect);
    inspect();
    if (done) return;
    // update() resolves after the browser's check, not after the installation.
    registration.update().then(() => {
      checked = true;
      inspect();
    }).catch(() => finish('error'));
  });
}
