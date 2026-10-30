import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { openStore, createApp, points, TOTALS, CONSENT_VERSION, retentionCutoff } from './server.mjs';
const consent = { version: CONSENT_VERSION, accepted: true, adult: true, language: 'fr' };
const token = () => randomBytes(32).toString('hex');
test('weighted score rewards progress and accuracy', () => {
 assert.equal(points(90,100),81); assert.equal(points(2,2),2); assert.equal(points(51,85),30.6);
 assert.ok(points(90,100)>points(80,100)); assert.equal(points(0,0),0);
});
test('identity retries, code collisions, persistence and best-run ranking', () => {
 const dir=mkdtempSync(join(tmpdir(),'tw-quiz-'));const file=join(dir,'quiz.db');
 let calls=0;let s=openStore(file,()=>++calls<=2?'TW-AAAAAAAA':'TW-BBBBBBBB');
 try {
 const t=token(), a=s.register(t,consent);assert.equal(s.register(t,consent).code,a.code);
 const b=s.register(token(),consent);assert.notEqual(a.code,b.code);assert.equal(calls,3);
 s.submit(a.code,{lang:'fr',solved:90,attempts:100});s.submit(b.code,{lang:'fr',solved:2,attempts:2,points:999999});
 assert.equal(s.board('fr',a.code,'me',0).myRank,1);
 s.submit(a.code,{lang:'fr',solved:0,attempts:0});s.submit(a.code,{lang:'fr',solved:90,attempts:150});
 assert.equal(s.board('fr',a.code,'me',0).rows[0].points,81);
 assert.equal(s.board('en',a.code,'me',0).total,0);
 s.close();s=openStore(file);assert.equal(s.get(t).code,a.code);assert.equal(s.board('fr',a.code,'me',0).total,2);
 s.remove(a.code);assert.equal(s.get(t),undefined);assert.equal(s.board('fr',null,'me',0).total,1);
 } finally {s.close();rmSync(dir,{recursive:true});}
});
test('pagination finds my rank beyond the first page and orders ties consistently',()=>{
 const s=openStore(':memory:');try{
 let last;for(let i=0;i<63;i++){const p=s.register(token(),consent);s.submit(p.code,{lang:'fr',solved:100-i,attempts:100});last=p;}
 const b=s.board('fr',last.code,'me',0);assert.equal(b.myRank,63);assert.equal(b.page,2);assert.equal(b.rows.at(-1).code,last.code);
 assert.equal(s.board('fr',last.code,'top',0).rows[0].rank,1);
 assert.equal(s.board('fr',last.code,'top',99999).page,2);
 }finally{s.close();}
});
test('API authentication, score bounds, CORS, private fields and deletion',async()=>{
 const s=openStore(':memory:');const app=createApp(s,{rateLimit:false});await new Promise(r=>app.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+app.address().port;const t=token();
 const call=(path,method='GET',body,auth=t,origin='https://theword.fr')=>fetch(base+path,{method,headers:{Origin:origin,...(auth?{Authorization:'Bearer '+auth}:{}),'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});
 try{
 assert.equal((await call('/v1/scores','POST',{lang:'fr',solved:1,attempts:1})).status,401);
 const p=await (await call('/v1/players','POST',consent)).json();assert.match(p.code,/^TW-[A-Z2-9]{8}$/);
 for(const body of [{lang:'xx',solved:1,attempts:1},{lang:'fr',solved:2,attempts:1},{lang:'fr',solved:-1,attempts:1},{lang:'fr',solved:TOTALS.fr+1,attempts:99999},{lang:'fr',solved:1.5,attempts:2}])assert.equal((await call('/v1/scores','POST',body)).status,400);
 assert.equal((await call('/v1/scores','POST',{lang:'fr',solved:90,attempts:100})).status,200);
 const r=await call('/v1/leaderboard?lang=fr&view=me');assert.equal(r.headers.get('access-control-allow-origin'),'https://theword.fr');
 const body=await r.text();assert.ok(!body.includes(t));assert.ok(!body.includes('token_hash'));assert.equal(JSON.parse(body).myCode,p.code);
 assert.equal((await call('/v1/scores','POST',{},p.code)).status,401);
 assert.equal((await call('/v1/leaderboard','GET',undefined,t,'https://evil.test')).status,403);
 assert.equal((await call('/v1/leaderboard?page=-1')).status,400);
 assert.equal((await call('/v1/player','DELETE')).status,200);assert.equal(s.get(t),undefined);
 }finally{await new Promise(r=>app.close(r));s.close();}
});

test('consent required, timestamp stable, calendar retention and cascade deletion',()=>{
 let now=new Date('2024-02-29T12:00:00.000Z');const s=openStore(':memory:',undefined,()=>now);
 try {
 const t=token();for(const c of [undefined,{}, {...consent,adult:false},{...consent,accepted:false},{...consent,version:'old'}])assert.throws(()=>s.register(t,c),/consent-required/);
 const p=s.register(t,consent);s.submit(p.code,{lang:'fr',solved:5,attempts:6});
 const original=s.db.prepare('SELECT * FROM player_consents').get();assert.equal(original.accepted_at,now.toISOString());assert.equal(original.language,'fr');
 now=new Date('2024-03-01T12:00:00.000Z');s.register(t,consent);assert.equal(s.db.prepare('SELECT accepted_at FROM player_consents').get().accepted_at,original.accepted_at);
 now=new Date('2026-03-01T12:00:00.000Z');assert.equal(s.get(t),undefined);assert.equal(s.board('fr',null,'top',0).total,0);
 assert.equal(s.purge(),1);for(const table of ['players','scores','player_consents'])assert.equal(s.db.prepare('SELECT COUNT(*) AS n FROM '+table).get().n,0);
 assert.equal(retentionCutoff(new Date('2024-02-29T12:00:00Z')),'2022-02-28T12:00:00.000Z');
 }finally{s.close();}
});
test('legacy profiles stay private until consent and can still be removed',async()=>{
 const s=openStore(':memory:');const t=token();const p=s.register(t,consent);s.submit(p.code,{lang:'fr',solved:2,attempts:2});s.db.exec('DELETE FROM player_consents');
 const app=createApp(s,{rateLimit:false});await new Promise(r=>app.listen(0,'127.0.0.1',r));
 const url='http://127.0.0.1:'+app.address().port;const headers={Authorization:'Bearer '+t,'Content-Type':'application/json'};
 try{
 assert.equal(s.board('fr',null,'top',0).total,0);
 assert.equal((await fetch(url+'/v1/players',{method:'POST',headers,body:'{}'})).status,428);
 assert.equal((await fetch(url+'/v1/scores',{method:'POST',headers,body:JSON.stringify({lang:'fr',solved:2,attempts:2})})).status,428);
 assert.equal(s.register(t,consent).code,p.code);assert.equal(s.board('fr',null,'top',0).total,1);
 s.db.exec('DELETE FROM player_consents');assert.equal((await fetch(url+'/v1/player',{method:'DELETE',headers})).status,200);
 }finally{await new Promise(r=>app.close(r));s.close();}
});
