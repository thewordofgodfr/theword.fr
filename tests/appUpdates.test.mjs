import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
const compiled = await build({ entryPoints:['src/services/appUpdates.ts'],bundle:true,platform:'node',format:'esm',write:false });
const {checkForAppUpdate} = await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));
class Worker extends EventTarget {
  constructor(state) { super(); this.state = state; }
  change(state) { this.state = state; this.dispatchEvent(new Event('statechange')); }
}
class Registration extends EventTarget {
  installing = null; waiting = null;
  update = async () => {};
  found(worker) { this.installing = worker; this.dispatchEvent(new Event('updatefound')); }
}
test('no update is reported only after a successful browser check', async () => {
  const r = new Registration(); let complete;
  r.update = () => new Promise(resolve => complete = resolve);
  let settled = false;
  const result = checkForAppUpdate(r,()=>{}).then(x=>{settled=true;return x;});
  await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal(settled,false); complete();
  assert.equal((await result).status,'upToDate');
});
test('a download longer than the old 800 ms timer never reports up to date', async () => {
  const r = new Registration(); const w = new Worker('installing'); const progress=[];
  r.update = async () => r.found(w);
  let settled = false;
  const result = checkForAppUpdate(r,s=>progress.push(s)).then(x=>{settled=true;return x;});
  await new Promise(resolve=>setTimeout(resolve,850));
  assert.equal(settled,false); assert.ok(progress.includes('downloading'));
  w.change('installed'); assert.equal((await result).status,'ready');
});
test('already waiting update is offered without another download', async () => {
  const r = new Registration(); r.waiting = new Worker('installed');
  r.update = async () => { throw Error('Should not check again'); };
  assert.equal((await checkForAppUpdate(r,()=>{})).worker,r.waiting);
});
test('an installation already running is monitored', async () => {
  const r = new Registration();r.installing=new Worker('installing');
  const result=checkForAppUpdate(r,()=>{});r.installing.change('activated');
  assert.equal((await result).status,'ready');
});
test('failed installation and failed network checks never report up to date', async () => {
  const r=new Registration();const w=new Worker('installing');
  r.update=async()=>{r.found(w);w.change('redundant');};
  assert.equal((await checkForAppUpdate(r,()=>{})).status,'error');
  const failed=new Registration();failed.update=async()=>{throw Error('offline');};
  assert.equal((await checkForAppUpdate(failed,()=>{})).status,'error');
});
test('timeout and unmount release listeners and never report success', async () => {
  const r=new Registration();r.update=()=>new Promise(()=>{});
  assert.equal((await checkForAppUpdate(r,()=>{},undefined,10)).status,'error');
  const abort=new AbortController();const progress=[];
  const result=checkForAppUpdate(r,s=>progress.push(s),abort.signal);
  abort.abort();assert.equal((await result).status,'idle');
  r.found(new Worker('installing'));assert.deepEqual(progress,[]);
});
test('all 18 languages explain automatic updates, downloads and offline checks', async () => {
  for(const lang of ['fr','en','de','it','es','pt','ru','hi','zh','ar','id','sw','ko','ja','yo','he','el','tr']) {
    const result=await build({entryPoints:[`src/i18n/${lang}.ts`],bundle:true,platform:'node',format:'esm',write:false,logLevel:'silent'});
    const dict=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
    const values=Object.values(dict).find(v=>v && typeof v === 'object' && v.updatesDescription);
    for(const key of ['updatesDescription','updatesDownloading','updatesOffline','updatesUpToDate']) assert.equal(typeof values?.[key],'string',`${lang}: ${key}`);
  }
});
