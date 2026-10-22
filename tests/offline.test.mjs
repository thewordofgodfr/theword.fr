import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';

const sw = readFileSync('public/sw-v7.js', 'utf8');
const origin = 'https://www.theword.fr';
const offline = async () => { throw new Error('Network disconnected'); };
function worker(fetcher = offline) {
  const handlers = {}, stores = new Map();
  const key = r => new URL(typeof r === 'string' ? r : r.url, origin).href;
  const caches = {
    keys: async () => [...stores.keys()],
    delete: async name => stores.delete(name),
    open: async name => {
      if (!stores.has(name)) {
        const data = new Map();
        stores.set(name, {
          match: async r => data.get(key(r))?.clone(),
          put: async (r, response) => { data.set(key(r), response.clone()); },
          keys: async () => [...data.keys()].map(u => new Request(u)),
        });
      }
      return stores.get(name);
    },
  };
  let skipped = false, claimed = false;
  const context = vm.createContext({
    URL, Response, AbortController, setTimeout, clearTimeout,
    Request: class extends Request { constructor(r, options) { super(typeof r === 'string' ? new URL(r, origin) : r, options); } },
    caches, fetch: fetcher,
    self: { location: { origin }, addEventListener: (type, fn) => { handlers[type] = fn; },
      skipWaiting: async () => { skipped = true; }, clients: { claim: async () => { claimed = true; } }, registration: {} },
  });
  vm.runInContext(sw, context);
  const evaluate = expression => vm.runInContext(expression, context);
  const cache = kind => caches.open(evaluate(`CACHE_${kind}`));
  return { context, caches, cache, evaluate, get skipped() { return skipped; }, get claimed() { return claimed; },
    async lifecycle(type) { let job; handlers[type]({waitUntil: p => { job = p; }}); await job; },
    async request(path, navigate = false) {
      let response; const jobs = [];
      handlers.fetch({ request: navigate ? {method:'GET',url:origin+path,mode:'navigate'} : new Request(origin+path),
        respondWith: p => { response = p; }, waitUntil: p => jobs.push(p) });
      const result = await response;
      await Promise.all(jobs);
      return result;
    },
  };
}
const oldHtml = '<script type="module" src="/assets/old.js"></script>';
const newHtml = '<script type="module" src="/assets/new.js"></script><link rel="stylesheet" href="/assets/new.css">';

test('interrupted update retains complete old shell; successful retry publishes all assets', async () => {
  const w = worker(async u => u === '/index.html' ? new Response(newHtml) : offline());
  const cache = await w.cache('APP');
  await cache.put('/index.html', new Response(oldHtml));
  await cache.put('/assets/old.js', new Response('old code'));
  w.context.testCache = cache;
  assert.equal(await w.evaluate('updateIndexAndAssets(testCache)'), false);
  assert.equal(await (await w.request('/', true)).text(), oldHtml);
  assert.equal(await (await w.request('/assets/old.js')).text(), 'old code');
  w.context.fetch = async u => new Response(u === '/index.html' ? newHtml : 'new asset');
  assert.equal(await w.evaluate('updateIndexAndAssets(testCache)'), true);
  w.context.fetch = offline;
  assert.equal(await (await w.request('/', true)).text(), newHtml);
  assert.equal(await (await w.request('/assets/new.js')).text(), 'new asset');
  assert.equal(await (await w.request('/assets/new.css')).text(), 'new asset');
});

test('incomplete fresh installation never calls skipWaiting', async () => {
  const w = worker(async u => u === '/index.html' ? new Response(newHtml) : offline());
  await assert.rejects(w.lifecycle('install'), /Incomplete app shell/);
  assert.equal(w.skipped, false);
  assert.equal(await (await w.cache('APP')).match('/index.html'), undefined);
});

test('activation preserves Bibles and previous assets while offline, and leaves unrelated caches alone', async () => {
  const w = worker();
  await (await w.caches.open('twog-data-core-v1')).put('/data/bible/fr/verses.jsonl', new Response('French Bible'));
  await (await w.caches.open('twog-data-extra-v1')).put('/data/bible/es/verses.jsonl', new Response('Spanish Bible'));
  await (await w.caches.open('twog-app-v1')).put('/assets/old.js', new Response('old code'));
  await w.caches.open('another-application');
  await w.lifecycle('activate');
  assert.equal(w.claimed, true);
  assert.equal(await (await w.request('/data/bible/fr/verses.jsonl')).text(), 'French Bible');
  assert.equal(await (await w.request('/data/bible/es/verses.jsonl')).text(), 'Spanish Bible');
  assert.equal(await (await w.request('/assets/old.js')).text(), 'old code');
  assert.ok((await w.caches.keys()).includes('another-application'));
  assert.ok(!(await w.caches.keys()).includes('twog-data-core-v1'));
});

test('cache copy failure keeps the old Bible cache intact', async () => {
  const w = worker();
  await (await w.caches.open('twog-data-core-v1')).put('/data/bible/fr/verses.jsonl', new Response('Bible'));
  (await w.cache('DATA_CORE')).put = async () => { throw new Error('Quota exceeded'); };
  await assert.rejects(w.lifecycle('activate'), /Quota exceeded/);
  assert.ok((await w.caches.keys()).includes('twog-data-core-v1'));
});

test('missing offline Bible returns an error, not a successful empty corpus', async () => {
  const w = worker();
  assert.equal((await w.request('/data/bible/fr/verses.jsonl')).status, 503);
});

test('timeout includes a body transfer interrupted after response headers', async () => {
  const w = worker(async (_u, {signal}) => ({type:'basic',status:200, arrayBuffer: () => new Promise((_resolve,reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')), {once:true});
  })}));
  await assert.rejects(w.evaluate("fetchWithTimeout('/slow', 10)"), /aborted/);
});

const bundled = await build({entryPoints:['src/services/bibleService.ts'],bundle:true,platform:'node',format:'cjs',write:false,logLevel:'silent'});
function service(fetcher) {
  const context = vm.createContext({exports:{}, fetch:fetcher, console:{error(){}}, setTimeout, navigator:{}});
  vm.runInContext(bundled.outputFiles[0].text.replace('module.exports =', 'exports ='), context);
  return {api: context.exports, context};
}
const row = JSON.stringify({id:'GEN.1.1',b:'GEN',c:1,v:1,t:'Au commencement Dieu créa les cieux et la terre.'});
test('concurrent reading, search and random verse share one load; all keep working after network loss', async () => {
  let calls = 0;
  const {api,context} = service(async () => { calls++; return new Response(row); });
  await Promise.all([api.getChapter('Genesis',1,'fr'),api.getRandomVerse('fr'),api.searchInBible('Dieu','fr')]);
  assert.equal(calls,1);
  context.fetch = offline;
  assert.equal((await api.getChapter('Genesis',1,'fr')).verses.length,1);
  assert.equal((await api.searchInBible('Dieu','fr')).length,1);
  assert.equal((await api.getRandomVerse('fr')).book,'Genesis');
});

test('failed and empty loads can be retried after reconnection', async () => {
  for (const initial of [offline, async () => new Response(null,{status:204})]) {
    const {api,context} = service(initial);
    await assert.rejects(api.searchInBible('Dieu','fr'));
    context.fetch = async () => new Response(row);
    assert.equal((await api.searchInBible('Dieu','fr')).length,1);
  }
});
