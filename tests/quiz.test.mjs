import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
const bundle = await build({ entryPoints: ['src/services/quizService.ts'], bundle: true, write: false, platform: 'node', format: 'esm' });
const api = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const rows = Array.from({length: 25}, (_, i) => ({ id: `GEN.1.${i+1}`, b: 'GEN', c: 1, v: i+1, t: `Verse ${i+1}` }));
const pending = (p, q) => ({ ...p, pending: q });
test('four unique choices, exactly one valid answer, identical texts excluded', () => {
  const corpus = [...rows, {...rows[0], id:'GEN.2.1', c:2}, {...rows[0], id:'GEN.2.2', c:2, v:2, t:'VERSE 1!'}];
  const q = api.nextQuestion(corpus, api.emptyProgress(), () => 0);
  assert.equal(q.id, 'GEN.1.1'); assert.equal(q.options.length, 4); assert.equal(new Set(q.options).size, 4);
  assert.equal(q.options.filter(id => api.normalizeQuizText(corpus.find(r => r.id === id).t) === 'verse1').length, 1);
});
test('failed question is delayed, successes never repeat and level max is reachable', () => {
  let p = api.emptyProgress();
  const first = api.nextQuestion(rows, p, () => 0);
  p = api.answerQuestion(pending(p, first), first, first.options.find(id => id !== first.id));
  assert.equal(p.attempts, 1); assert.equal(api.solvedCount(p), 0);
  assert.notEqual(api.nextQuestion(rows, p, () => 0).id, first.id);
  const seen = new Set();
  for (let i=0; i<rows.length; i++) {
    const q = api.nextQuestion(rows, p);
    assert.ok(!seen.has(q.id)); seen.add(q.id);
    p = api.answerQuestion(pending(p,q),q,q.id);
  }
  assert.equal(api.solvedCount(p),25); assert.equal(p.attempts,26);
  assert.equal(api.nextQuestion(rows,p),null);
  assert.equal(api.isSolved(p, first.id),true);
});
test('reload resumes question; stale and double answers cannot increment attempts', () => {
  const q = api.nextQuestion(rows,api.emptyProgress());
  const p = pending(api.emptyProgress(),q);
  assert.deepEqual(api.nextQuestion([...rows].reverse(), JSON.parse(JSON.stringify(p))),q);
  const after = api.answerQuestion(p,q,q.id);
  assert.throws(()=>api.answerQuestion(after,q,q.id));
  assert.throws(()=>api.answerQuestion(p,q,'GEN.999.1'));
});
test('stable reference bitmaps survive reordered corpus and keep languages independent', () => {
  const q=api.nextQuestion(rows,api.emptyProgress());
  const p=api.answerQuestion(pending(api.emptyProgress(),q),q,q.id);
  const store = api.validateQuiz(JSON.parse(JSON.stringify({version:1,languages:{fr:p}})));
  assert.ok(api.isSolved(store.languages.fr,q.id)); assert.equal(store.languages.en,undefined);
  assert.notEqual(api.nextQuestion([...rows].reverse(),store.languages.fr).id,q.id);
  assert.deepEqual(api.mergeQuiz(store,store),store);
});
test('full French corpus progress remains compact and entire 18-language UI is present', async () => {
  const corpus = (await readFile('public/data/bible/fr/verses.jsonl','utf8')).trim().split(/\r?\n/).map(JSON.parse);
  let p=api.emptyProgress();
  // Build chapter bitmaps directly to check actual final persisted size without an O(n²) simulation.
  const chapters={};
  for(const row of corpus) {
    const chapter=`${row.b}.${row.c}`; const bytes=chapters[chapter]??=[]; const bit=row.v-1;
    while(bytes.length<=bit>>3)bytes.push(0);
    bytes[bit>>3]|=1<<(bit&7);
  }
  p.solved=Object.fromEntries(Object.entries(chapters).map(([key,bytes])=>[key,Buffer.from(bytes).toString('base64')]));
  p.attempts=corpus.length;
  assert.equal(api.solvedCount(p),corpus.length);
  assert.ok(JSON.stringify(p).length<40000);
  assert.equal(api.nextQuestion(corpus,p),null);
  for(const lang of ['fr','en','de','it','es','pt','ru','hi','zh','ar','id','sw','tr','ja','ko','yo','he','el']) {
    const text=await readFile(`src/i18n/${lang}.ts`,'utf8');
    for(const key of ['title','rules','level','attempts','question','correct','wrong','next','complete','share','email','copied','saved','error','retry']) assert.ok(text.includes(`"${key}":`),lang+': '+key);
  }
  console.log(`French corpus: ${corpus.length} verses; completed progress: ${JSON.stringify(p).length} bytes`);
});
test('invalid progress cannot be silently restored', () => {
  for(const p of [{...api.emptyProgress(),attempts:-1},{...api.emptyProgress(),pending:{}},{...api.emptyProgress(),solved:{'GEN.1':'!!!'}},{...api.emptyProgress(),solved:{'GEN.1':'AQ=='}}]) {
    assert.throws(()=>api.validateQuiz({version:1,languages:{fr:p}}));
  }
});
