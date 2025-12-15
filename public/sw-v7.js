// sw-v7.js — prod: https + cache propre + MAJ immédiate
// App-shell solide + precache assets Vite
// Precache Bible LIMITÉ (fr, en, el, he, es, it, de, pt)
// Runtime cache pour le reste (offline safe Android)

const CACHE_VERSION = 'v345'; // ← bump obligatoire
const CACHE_NAME = `twog-${CACHE_VERSION}`;

const APP_SHELL = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/site.webmanifest',
];

const BIBLES_INDEX_URL = '/data/bible/bibles-index.json';

// ⚠️ NE PAS mettre true sur Android
const PRECACHE_FULL_BIBLE = false;

// Langues précachées (marge OK)
const PRECACHE_LANGS = ['fr', 'en', 'el', 'he', 'es', 'it', 'de', 'pt'];

const PRECACHE_CHUNK = 15;
const ORIGIN = self.location.origin;

/* -------------------------------------------------- */
/* Utils */
const toHttps = (u) =>
  typeof u === 'string' && u.startsWith('http://')
    ? 'https://' + u.slice(7)
    : u;

const normalizeUrl = (u) => {
  if (typeof u !== 'string') return u;
  u = toHttps(u);
  try {
    const abs = new URL(u, ORIGIN);
    if (
      abs.hostname.endsWith('theword.fr') ||
      abs.hostname.endsWith('thewordofgod.fr')
    ) {
      return abs.pathname + abs.search;
    }
    return abs.href;
  } catch {
    return u;
  }
};

/* -------------------------------------------------- */
/* Messages */
self.addEventListener('message', (e) => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();

  if (e.data?.type === 'CLEAR_ALL') {
    e.waitUntil(
      (async () => {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        await self.registration.unregister();
        const clients = await self.clients.matchAll({
          includeUncontrolled: true,
        });
        clients.forEach((c) => c.navigate('/'));
      })()
    );
  }
});

/* -------------------------------------------------- */
/* App shell helpers */
async function getAppShellFromCache(cache) {
  return (
    (await cache.match('/', { ignoreSearch: true })) ||
    (await cache.match('/index.html', { ignoreSearch: true }))
  );
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
    const rx =
      /<(?:script|link)\b[^>]+?(?:src|href)=["']([^"']+)["']/gi;

    let m;
    while ((m = rx.exec(html)) !== null) {
      try {
        const abs = new URL(m[1], ORIGIN);
        if (abs.origin === ORIGIN) urls.add(abs.pathname + abs.search);
      } catch {}
    }

    const toCache = [...urls].filter(
      (u) =>
        u.startsWith('/assets/') ||
        /\.(js|css|woff2?|ttf|eot|svg|png|jpe?g|webp)$/.test(u)
    );

    await Promise.all(
      toCache.map(async (u) => {
        try {
          const r = await fetch(u, { cache: 'no-store' });
          if (r && (r.ok || r.type === 'opaque')) {
            await cache.put(u, r.clone());
          }
        } catch {}
      })
    );
  } catch {}
}

/* -------------------------------------------------- */
/* Precache Bible limité (langues choisies) */
async function precacheSelectedLangs(cache) {
  try {
    const res = await fetch(BIBLES_INDEX_URL, { cache: 'no-store' });
    if (!res.ok) return;

    const idx = await res.json();
    const urls = [];

    for (const lang of PRECACHE_LANGS) {
      const arr = idx[lang];
      if (Array.isArray(arr)) {
        urls.push(...arr.map(normalizeUrl));
      }
    }

    for (let i = 0; i < urls.length; i += PRECACHE_CHUNK) {
      await Promise.all(
        urls.slice(i, i + PRECACHE_CHUNK).map(async (u) => {
          try {
            const r = await fetch(u, { cache: 'no-store' });
            if (r && (r.ok || r.type === 'opaque')) {
              await cache.put(u, r.clone());
            }
          } catch {}
        })
      );
    }
  } catch {}
}

/* -------------------------------------------------- */
/* Install */
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(APP_SHELL);
      await precacheAppShellAssets(cache);

      if (PRECACHE_FULL_BIBLE) {
        // ⚠️ déconseillé Android
      } else {
        await precacheSelectedLangs(cache);
      }

      await self.skipWaiting();
    })()
  );
});

/* -------------------------------------------------- */
/* Activate */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
      await self.clients.claim();
    })()
  );
});

/* -------------------------------------------------- */
/* Helpers fetch */
const isStaticAsset = (url) =>
  url.pathname.startsWith('/assets/') ||
  /\.(js|css|png|jpe?g|svg|webp|woff2?|ttf|eot)$/.test(url.pathname);

const isBibleJson = (url) =>
  url.pathname.startsWith('/data/bible/') &&
  /\.(json|jsonl)$/.test(url.pathname);

/* -------------------------------------------------- */
/* Fetch */
self.addEventListener('fetch', (event) => {
  try {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // NAVIGATION
    if (req.mode === 'navigate' || req.destination === 'document') {
      event.respondWith(
        (async () => {
          try {
            const preload = await event.preloadResponse;
            if (preload) return preload;
            return await fetch(req);
          } catch {
            const cache = await caches.open(CACHE_NAME);
            return (
              (await getAppShellFromCache(cache)) ||
              new Response('Offline', { status: 503 })
            );
          }
        })()
      );
      return;
    }

    const href = normalizeUrl(url.href);
    const normReq =
      href === url.href
        ? req
        : new Request(href, {
            headers: req.headers,
            credentials: req.credentials,
            cache: 'no-store',
          });

    // Bible JSON → stale-while-revalidate
    if (isBibleJson(url)) {
      event.respondWith(
        (async () => {
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match(normReq);
          const net = fetch(normReq, { cache: 'no-store' })
            .then((res) => {
              if (res && (res.ok || res.type === 'opaque')) {
                cache.put(normReq, res.clone());
              }
              return res;
            })
            .catch(() => null);
          return cached || (await net) || new Response('Offline', { status: 503 });
        })()
      );
      return;
    }

    // Assets statiques → cache-first
    if (isStaticAsset(url)) {
      event.respondWith(
        (async () => {
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match(normReq);
          if (cached) return cached;
          try {
            const res = await fetch(normReq, { cache: 'no-store' });
            if (res && (res.ok || res.type === 'opaque')) {
              cache.put(normReq, res.clone());
            }
            return res;
          } catch {
            return new Response('Offline asset', { status: 503 });
          }
        })()
      );
      return;
    }

    // Default
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        try {
          const res = await fetch(normReq, { cache: 'no-store' });
          if (res && (res.ok || res.type === 'opaque')) {
            cache.put(normReq, res.clone());
          }
          return res;
        } catch {
          return (
            (await cache.match(normReq)) ||
            (url.origin === ORIGIN
              ? await getAppShellFromCache(cache)
              : new Response('Offline', { status: 503 }))
          );
        }
      })()
    );
  } catch {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        return (
          (await getAppShellFromCache(cache)) ||
          new Response('Offline', { status: 503 })
        );
      })()
    );
  }
});

