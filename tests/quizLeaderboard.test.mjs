import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
const load=async file=>{const b=await build({entryPoints:[file],bundle:true,write:false,platform:'node',format:'esm',logLevel:'silent'});return import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64'))};
const player=await load('src/services/quizPlayer.ts'),api=await load('src/services/quizLeaderboard.ts'),backup=await load('src/utils/backupUtils.ts');
class Storage {values=new Map();get length(){return this.values.size}key(i){return [...this.values.keys()][i]??null}getItem(k){return this.values.get(k)??null}setItem(k,v){this.values.set(k,String(v))}removeItem(k){this.values.delete(k)}}
const identity=()=>({version:1,token:'a'.repeat(64),code:'TW-ABCD2345',consentVersion:player.QUIZ_CONSENT_VERSION,pending:{}});
beforeEach(()=>{globalThis.localStorage=new Storage();globalThis.sessionStorage=new Storage();Object.defineProperty(globalThis,'navigator',{configurable:true,value:{}})});
test('offline outbox keeps the best result across errors, reset and reload',()=>{
 player.savePlayer(identity());player.queueScore('fr',{solved:90,attempts:100});player.queueScore('fr',{solved:90,attempts:110});player.queueScore('fr',{solved:0,attempts:0});player.queueScore('en',{solved:4,attempts:5});
 assert.deepEqual(player.readPlayer().pending,{fr:{solved:90,attempts:100},en:{solved:4,attempts:5}});
 assert.equal(player.rankingPoints({solved:51,attempts:85}),30.6);
});
test('identity and offline scores survive backup; existing device identity is preserved',async()=>{
 player.savePlayer(identity());player.queueScore('fr',{solved:90,attempts:100});const file=backup.createBackup().file;
 localStorage=new Storage();await backup.restoreBackupByMerging(file);assert.equal(player.readPlayer().token,identity().token);assert.equal(player.readPlayer().pending.fr.solved,90);
 player.savePlayer({...identity(),token:'b'.repeat(64),code:'TW-BCDE2345'});await backup.restoreBackupByMerging(file);assert.equal(player.readPlayer().token,'b'.repeat(64));
 const payload=JSON.parse(await file.text());payload.data.quizPlayer.token='bad';await assert.rejects(backup.restoreBackupByMerging(new File([JSON.stringify(payload)],'bad.json')));
});
test('registration retries reuse a saved secret, and updates queued during sync are uploaded',async()=>{
 let first;globalThis.fetch=async(url,options)=>{first=options.headers.Authorization;throw Error('offline')};
 await assert.rejects(api.joinRanking('fr'));assert.ok(player.readPlayer());
 const posts=[];let added=false;
 globalThis.fetch=async(url,options)=>{
 assert.equal(options.headers.Authorization,first);
 if(url.endsWith('/v1/players') || url.endsWith('/v1/player'))return Response.json({code:'TW-ABCD2345',consentVersion:player.QUIZ_CONSENT_VERSION});
 if(url.endsWith('/v1/scores')){posts.push(JSON.parse(options.body));if(!added){added=true;player.queueScore('fr',{solved:91,attempts:101})}return Response.json({ok:true})}
 throw Error('unexpected URL');
 };
 await api.joinRanking('fr');player.queueScore('fr',{solved:90,attempts:100});await api.syncScores();assert.equal(posts.length,2);assert.equal(posts[1].solved,91);assert.deepEqual(player.readPlayer().pending,{});
});
test('failed uploads retain outbox and a later retry sends the same result',async()=>{
 player.savePlayer(identity());player.queueScore('fr',{solved:5,attempts:6});
 globalThis.fetch=async url=>url.endsWith('/v1/player')?Response.json({code:'TW-ABCD2345',consentVersion:player.QUIZ_CONSENT_VERSION}):new Response('',{status:503});
 await assert.rejects(api.syncScores());assert.equal(player.readPlayer().pending.fr.solved,5);
 globalThis.fetch=async url=>Response.json(url.endsWith('/v1/player')?{code:'TW-ABCD2345',consentVersion:player.QUIZ_CONSENT_VERSION}:{ok:true});await api.syncScores();assert.deepEqual(player.readPlayer().pending,{});
});
test('leaderboard labels cover every supported language',async()=>{
 for(const lang of ['fr','en','de','it','es','pt','ru','hi','zh','ar','id','sw','tr','ja','ko','yo','he','el']){
 const s=await readFile(`src/i18n/${lang}.ts`,'utf8');for(const key of ['ranking','rankingTop','rankingMine','rankingIntro','rankingFormula','rankingLeaveConfirm','rankingAdult','rankingConsent','rankingRetention','rankingPrivacy'])assert.ok(s.includes(`"${key}":`),`${lang}: ${key}`);
 }
});

test('legacy identity never publishes without explicit consent; deleted server profiles are not recreated',async()=>{
 player.savePlayer({...identity(),consentVersion:undefined});let calls=0;
 globalThis.fetch=async()=>{calls++;return new Response('',{status:401})};
 player.queueScore('fr',{solved:5,attempts:6});await api.syncScores();assert.equal(calls,0);
 await assert.rejects(api.ensurePlayer());assert.equal(calls,0);
 player.savePlayer(identity());await assert.rejects(api.ensurePlayer());assert.equal(calls,1);
 assert.equal(player.hasQuizConsent(player.readPlayer()),false);await api.syncScores();assert.equal(calls,1);
 await api.leaveRanking();assert.equal(player.readPlayer(),null);
});
