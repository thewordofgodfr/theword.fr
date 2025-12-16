import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root')!;

/* =========================================================
   Option A — DARK ONLY STRICT
   Appliquer le thème sombre AVANT React (anti flash blanc)
   ========================================================= */
try {
  const root = document.documentElement;
  root.style.colorScheme = 'dark';

  document.body.style.backgroundColor = '#0f172a';
  document.body.style.color = '#ffffff';

  const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (meta) meta.content = '#0f172a';
} catch {
  /* ignore */
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/* =========================================================
   Langue cœur → Service Worker
   ========================================================= */
function getCurrentLangFromLocalStorage(): string | null {
  try {
    const raw = localStorage.getItem('bibleApp_settings');
    if (!raw) return null;
    const obj = JSON.parse(raw);
    const lang = obj?.language ?? obj?.lang ?? null;
    return typeof lang === 'string' ? lang : null;
  } catch {
    return null;
  }
}

async function sendCoreLangToSW() {
  try {
    const lang = getCurrentLangFromLocalStorage();
    if (!lang) return;

    // Si un controller existe déjà
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SET_CORE_LANG', lang });
      return;
    }

    // Sinon attendre le SW prêt
    const reg = await navigator.serviceWorker.ready;
    if (reg?.active) {
      reg.active.postMessage({ type: 'SET_CORE_LANG', lang });
    }
  } catch {
    /* ignore */
  }
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
            reg.active?.scriptURL ||
            reg.waiting?.scriptURL ||
            reg.installing?.scriptURL ||
            '';
          if (!scriptURL.endsWith('/sw-v7.js')) {
            await reg.unregister();
          }
        })
      );

      // 2) Enregistrer le nouveau SW
      const reg = await navigator.serviceWorker.register('/sw-v7.js', { scope: '/' });

      // Vérifier immédiatement les mises à jour
      reg.update();

      // Promouvoir un SW en attente
      if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });

      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        nw?.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });

      // Envoyer la langue au SW dès que possible
      await sendCoreLangToSW();

      // Rechargement automatique après prise de contrôle
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        sendCoreLangToSW();
        window.location.reload();
      });
    } catch (err) {
      console.error('[SW] registration error:', err);
    }
  });
}

