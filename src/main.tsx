import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root')!;

// main.tsx (avant createRoot)
try {
  const raw = localStorage.getItem('bibleApp_settings');
  const theme = raw ? (JSON.parse(raw).theme ?? 'dark') : 'dark';
  document.documentElement.style.colorScheme = theme;
  document.body.style.backgroundColor = theme === 'dark' ? '#111827' : '#ffffff';
  const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (meta) meta.content = theme === 'dark' ? '#111827' : '#ffffff';
} catch {}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);

function getCurrentLangFromLocalStorage(): string | null {
  try {
    const raw = localStorage.getItem('bibleApp_settings');
    if (!raw) return null;
    const obj = JSON.parse(raw);
    const lang = (obj?.language ?? obj?.lang ?? null);
    return typeof lang === 'string' ? lang : null;
  } catch {
    return null;
  }
}

async function sendCoreLangToSW() {
  try {
    const lang = getCurrentLangFromLocalStorage();
    if (!lang) return;

    // attendre qu'un controller existe
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SET_CORE_LANG', lang });
      return;
    }

    // sinon attendre "ready" puis re-tenter
    const reg = await navigator.serviceWorker.ready;
    if (reg?.active) {
      reg.active.postMessage({ type: 'SET_CORE_LANG', lang });
    }
  } catch {}
}

// --- PWA: Service Worker (MAJ immédiate, un seul SW: /sw-v7.js) ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // 1) Désenregistrer tout ancien SW qui n'est pas /sw-v7.js
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        regs.map(async (reg) => {
          const scriptURL =
            reg.active?.scriptURL || reg.waiting?.scriptURL || reg.installing?.scriptURL || '';
          if (!scriptURL.endsWith('/sw-v7.js')) {
            await reg.unregister();
          }
        })
      );

      // 2) Enregistrer le nouveau SW
      const reg = await navigator.serviceWorker.register('/sw-v7.js', { scope: '/' });

      // Vérifier tout de suite s'il y a une nouvelle version
      reg.update();

      // Si un SW est déjà prêt en attente, on le promeut
      if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });

      // Quand une nouvelle version est détectée, on la prend
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        nw?.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });

      // Dès que possible, envoyer la langue core au SW
      await sendCoreLangToSW();

      // Quand le contrôleur change → rechargement automatique
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Après prise de contrôle, renvoyer la langue (au cas où)
        sendCoreLangToSW();
        window.location.reload();
      });
    } catch (err) {
      console.error('[SW] registration error:', err);
    }
  });
}
