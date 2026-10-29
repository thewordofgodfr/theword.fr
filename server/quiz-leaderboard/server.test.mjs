import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { openStore, createApp, points, TOTALS } from './server.mjs';
const token = () => randomBytes(32).toString('hex');
test('weighted score rewards progress and accuracy', () => {
 assert.equal(points(90,100),81); assert.equal(points(2,2),2); assert.equal(points(51,85),30.6);
 assert.ok(points(90,100)>points(80,100)); assert.equal(points(0,0),0);
});
test('identity retries, code collisions, persistence and best-run ranking', () => {
 const dir=mkdtempSync(join(tmpdir(),'tw-quiz-'));const file=join(dir,'quiz.db');
 let calls=0;let s=openStore(file,()=>++calls<=2?'TW-AAAAAAAA':'TW-BBBBBBBB');
 try {
 const t=token(), a=s.register(t);assert.equal(s.register(t).code,a.code);
 const b=s.register(token());assert.notEqual(a.code,b.code);assert.equal(calls,3);
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
 let last;for(let i=0;i<63;i++){const p=s.register(token());s.submit(p.code,{lang:'fr',solved:100-i,attempts:100});last=p;}
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
 const p=await (await call('/v1/players','POST')).json();assert.match(p.code,/^TW-[A-Z2-9]{8}$/);
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
