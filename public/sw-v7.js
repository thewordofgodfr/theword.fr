// sw-v7.js — prod: https + cache propre + MAJ immédiate
// ✅ 3 caches : APP (shell+assets) / DATA_CORE (langue user + fr/en/el/he) / DATA_EXTRA (autres langues)
// ✅ Offline-first réel : navigation = cache-first (zéro écran blanc)
// ✅ Timeout réseau pour éviter les fetch "pending" quand le réseau tombe
// ✅ Runtime cache data en CORE/EXTRA selon langue

const CACHE_VERSION = 'v404'; // ← bump obligatoire
const CACHE_APP = `twog-app-${CACHE_VERSION}`;
const CACHE_DATA_CORE = `twog-data-core-${CACHE_VERSION}`;
const CACHE_DATA_EXTRA = `twog-data-extra-${CACHE_VERSION}`;

const APP_SHELL = ['/', '/index.html', '/favicon.ico', '/logo192.png', '/logo512.png', '/site.webmanifest'];

const BIBLES_INDEX_URL = '/data/bible/bibles-index.json';

// CORE fixe (toujours)
const FIXED_CORE_LANGS = ['fr', 'en', 'el', 'he'];

// EXTRA : on limite pour éviter de remplir le stockage Android
const EXTRA_MAX_LANGS = 4; // ← ajuste si tu veux (2-6 recommandé Android)
const PRECACHE_CHUNK = 15;

const ORIGIN = self.location.origin;

// Timeouts (important pour éviter écran blanc sur réseau instable)
const NAV_FETCH_TIMEOUT_MS = 2500;     // navigation/doc
const SMALL_FETCH_TIMEOUT_MS = 2500;   // json, index, version, etc.

const toHttps = (u) => (typeof u === 'string' && u.startsWith('http://')) ? ('https://' + u.slice(7)) : u;

const normalizeUrl = (u) => {
  if (typeof u !== 'string') return u;
  u = toHttps(u);
  try {
    const abs = new URL(u, ORIGIN);
    if (abs.hostname.endsWith('theword.fr') || abs.hostname.endsWith('thewordofgod.fr')) {
      return abs.pathname + abs.search;
    }
    return abs.href;
  } catch { return u; }
};

const isStaticAsset = (url) =>
  url.pathname.startsWith('/assets/') ||
  /\.(js|css|png|jpe?g|svg|webp|woff2?|ttf|eot)$/.test(url.pathname);

const isBibleJson = (url) =>
  url.pathname.startsWith('/data/bible/') &&
  /\.(json|jsonl)$/.test(url.pathname);

function getLangFromBiblePath(pathname) {
  const m = pathname.match(/^\/data\/bible\/([^/]+)\//);
  return m ? m[1] : null;
}

/* -------------------------------------------------- */
/* Fetch with timeout (évite les requêtes "pending") */
async function fetchWithTimeout(request, timeoutMs) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(request, { cache: 'no-store', signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

/* -------------------------------------------------- */
/* IndexedDB (mini) pour stocker la langue core utilisateur */
const IDB_NAME = 'twog-sw';
const IDB_STORE = 'kv';
const IDB_KEY_USER_LANG = 'userCoreLang';

function idbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(key) {
  try {
    const db = await idbOpen();
    return await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const st = tx.objectStore(IDB_STORE);
      const r = st.get(key);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function idbSet(key, val) {
  try {
    const db = await idbOpen();
    await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const st = tx.objectStore(IDB_STORE);
      st.put(val, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(true);
    });
  } catch {}
}

/* -------------------------------------------------- */
/* Messages */
self.addEventListener('message', (e) => {
  const data = e.data || {};
  if (data.type === 'SKIP_WAITING') self.skipWaiting();

  if (data.type === 'SET_CORE_LANG' && typeof data.lang === 'string') {
    const lang = data.lang.trim();
    e.waitUntil((async () => {
      const current = await idbGet(IDB_KEY_USER_LANG);
      if (!current && lang) await idbSet(IDB_KEY_USER_LANG, lang);
    })());
  }

  if (data.type === 'CLEAR_ALL') {
    e.waitUntil((async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      self.registration.unregister();
      const clients = await self.clients.matchAll({ includeUncontrolled: true });
      clients.forEach(c => c.navigate('/'));
    })());
  }

  if (data.type === 'PURGE_EXTRA') {
    e.waitUntil((async () => {
      await caches.delete(CACHE_DATA_EXTRA);
    })());
  }
});

/* -------------------------------------------------- */
/* App shell helper */
async function getAppShellFromCache(cache) {
  return (await cache.match('/', { ignoreSearch: true })) ||
         (await cache.match('/index.html', { ignoreSearch: true }));
}

/* -------------------------------------------------- */
/* Precache assets Vite depuis index.html */
async function precacheAppShellAssets(cache) {
  try {
    const res = await fetch('/index.html', { cache: 'no-store' });
    if (!res?.ok) return;

    await cache.put('/index.html', res.clone());
    const html = await res.text();

    const urls = new Set();
    const rx = /<(?:script|link)\b[^>]+?(?:src|href)=["']([^"']+)["']/gi;

    let m;
    while ((m = rx.exec(html)) !== null) {
      try {
        const abs = new URL(m[1], ORIGIN);
        if (abs.origin === ORIGIN) urls.add(abs.pathname + abs.search);
      } catch {}
    }

    const toCache = [...urls].filter(u =>
      u.startsWith('/assets/') || /\.(js|css|woff2?|ttf|eot|svg|png|jpe?g|webp)$/.test(u)
    );

    await Promise.all(toCache.map(async (u) => {
      try {
        const r = await fetch(u, { cache: 'no-store' });
        if (r && (r.ok || r.type === 'opaque')) await cache.put(u, r.clone());
      } catch {}
    }));
  } catch {}
}

/* -------------------------------------------------- */
/* Lire bibles-index et obtenir URL(s) pour une liste de langues */
async function getBibleUrlsForLangs(langs) {
  try {
    // Petite requête, mais réseau instable => timeout => pas bloquant
    const res = await fetchWithTimeout(BIBLES_INDEX_URL, SMALL_FETCH_TIMEOUT_MS);
    if (!res.ok) return [];
    const idx = await res.json();

    const urls = [];
    for (const lang of langs) {
      const arr = idx[lang];
      if (Array.isArray(arr)) urls.push(...arr.map(normalizeUrl));
    }
    return urls;
  } catch {
    return [];
  }
}

/* -------------------------------------------------- */
/* Precache CORE (fixes + userCoreLang si connu) */
async function precacheCoreBibles(cacheCore) {
  const userLang = await idbGet(IDB_KEY_USER_LANG);
  const coreLangs = new Set(FIXED_CORE_LANGS);
  if (typeof userLang === 'string' && userLang) coreLangs.add(userLang);

  const urls = await getBibleUrlsForLangs([...coreLangs]);

  for (let i = 0; i < urls.length; i += PRECACHE_CHUNK) {
    await Promise.all(urls.slice(i, i + PRECACHE_CHUNK).map(async (u) => {
      try {
        const r = await fetch(u, { cache: 'no-store' });
        if (r && (r.ok || r.type === 'opaque')) await cacheCore.put(u, r.clone());
      } catch {}
    }));
  }
}

/* -------------------------------------------------- */
/* EXTRA: maintenir une limite de langues en cache */
async function enforceExtraLimit(cacheExtra) {
  try {
    const keys = await cacheExtra.keys();
    const langs = new Set();

    for (const req of keys) {
      const u = new URL(req.url);
      if (isBibleJson(u)) {
        const lang = getLangFromBiblePath(u.pathname);
        if (lang) langs.add(lang);
      }
    }

    if (langs.size > EXTRA_MAX_LANGS) {
      await caches.delete(CACHE_DATA_EXTRA);
    }
  } catch {}
}

/* -------------------------------------------------- */
/* Install */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cacheApp = await caches.open(CACHE_APP);
    const cacheCore = await caches.open(CACHE_DATA_CORE);

    await cacheApp.addAll(APP_SHELL);
    await precacheAppShellAssets(cacheApp);
    await precacheCoreBibles(cacheCore);

    await self.skipWaiting();
  })());
});

/* -------------------------------------------------- */
/* Activate */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const keep = new Set([CACHE_APP, CACHE_DATA_CORE, CACHE_DATA_EXTRA]);
    await Promise.all(keys.filter(k => !keep.has(k)).map(k => caches.delete(k)));

    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
    await self.clients.claim();
  })());
});

/* -------------------------------------------------- */
/* Fetch */
self.addEventListener('fetch', (event) => {
  try {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);

    // ✅ NAVIGATION (documents) — OFFLINE-FIRST (zéro écran blanc)
    if (req.mode === 'navigate' || req.destination === 'document') {
      event.respondWith((async () => {
        const cacheApp = await caches.open(CACHE_APP);

        // 1) Répondre immédiatement depuis le cache (si dispo)
        const shell = await getAppShellFromCache(cacheApp);
        if (shell) {
          // 2) Tenter une MAJ réseau en arrière-plan (sans bloquer)
          event.waitUntil((async () => {
            try {
              const preload = await event.preloadResponse;
              const res = preload || await fetchWithTimeout(req, NAV_FETCH_TIMEOUT_MS);
              if (res && res.ok) {
                // On met à jour index.html si c'est lui
                if (req.url.endsWith('/') || req.url.endsWith('/index.html')) {
                  await cacheApp.put('/index.html', res.clone());
                }
              }
            } catch {}
          })());
          return shell;
        }

        // 3) Si pas de shell en cache (1er chargement)
        try {
          const preload = await event.preloadResponse;
          const res = preload || await fetchWithTimeout(req, NAV_FETCH_TIMEOUT_MS);
          return res;
        } catch {
          return new Response('', { status: 204 }); // silencieux
        }
      })());
      return;
    }

    const href = normalizeUrl(url.href);
    const normReq = (href === url.href)
      ? req
      : new Request(href, { headers: req.headers, credentials: req.credentials, cache: 'no-store' });

    // ASSETS → cache-first dans CACHE_APP
    if (isStaticAsset(url)) {
      event.respondWith((async () => {
        const cacheApp = await caches.open(CACHE_APP);
        const cached = await cacheApp.match(normReq);
        if (cached) return cached;

        try {
          const res = await fetchWithTimeout(normReq, SMALL_FETCH_TIMEOUT_MS);
          if (res && (res.ok || res.type === 'opaque')) cacheApp.put(normReq, res.clone());
          return res;
        } catch {
          return new Response('', { status: 204 });
        }
      })());
      return;
    }

    // BIBLES → cache-first + refresh en arrière-plan (silencieux)
    if (isBibleJson(url)) {
      event.respondWith((async () => {
        const lang = getLangFromBiblePath(url.pathname) || '';
        const userLang = (await idbGet(IDB_KEY_USER_LANG)) || '';
        const isCoreLang = FIXED_CORE_LANGS.includes(lang) || (userLang && lang === userLang);

        const cache = await caches.open(isCoreLang ? CACHE_DATA_CORE : CACHE_DATA_EXTRA);
        const cached = await cache.match(normReq);

        if (cached) {
          // refresh silencieux
          event.waitUntil((async () => {
            try {
              const res = await fetchWithTimeout(normReq, SMALL_FETCH_TIMEOUT_MS);
              if (res && (res.ok || res.type === 'opaque')) {
                await cache.put(normReq, res.clone());
                if (!isCoreLang) {
                  const cacheExtra = await caches.open(CACHE_DATA_EXTRA);
                  await enforceExtraLimit(cacheExtra);
                }
              }
            } catch {}
          })());
          return cached;
        }

        // si pas en cache : tenter réseau mais ne jamais bloquer longtemps
        try {
          const res = await fetchWithTimeout(normReq, SMALL_FETCH_TIMEOUT_MS);
          if (res && (res.ok || res.type === 'opaque')) {
            await cache.put(normReq, res.clone());
            if (!isCoreLang) {
              const cacheExtra = await caches.open(CACHE_DATA_EXTRA);
              await enforceExtraLimit(cacheExtra);
            }
          }
          return res;
        } catch {
          return new Response('', { status: 204 });
        }
      })());
      return;
    }

    // DEFAULT → cache-match simple puis réseau court (silencieux)
    event.respondWith((async () => {
      // On tente d'abord cache APP (pour éviter blocage)
      const cacheApp = await caches.open(CACHE_APP);
      const cached = await cacheApp.match(normReq);
      if (cached) return cached;

      try {
        return await fetchWithTimeout(normReq, SMALL_FETCH_TIMEOUT_MS);
      } catch {
        // si même origine : au moins renvoyer le shell si présent
        if (url.origin === ORIGIN) {
          const shell = await getAppShellFromCache(cacheApp);
          if (shell) return shell;
        }
        return new Response('', { status: 204 });
      }
    })());
  } catch {
    event.respondWith((async () => new Response('', { status: 204 }))());
  }
});
