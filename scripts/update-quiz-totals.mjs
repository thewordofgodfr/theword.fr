// Run from repository root after any Bible corpus change.
import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
const result = await build({ entryPoints: ['src/services/bibleService.ts'], bundle: true, write: false, platform: 'node', format: 'esm' });
const { getQuizVerses } = await import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'));
globalThis.fetch = async url => new Response(await readFile('public' + url, 'utf8'));
const totals = {};
for (const language of ['fr','en','de','it','es','pt','ru','hi','zh','ar','id','sw','tr','ja','ko','yo','he','el']) totals[language] = (await getQuizVerses(language)).length;
await writeFile('server/quiz-leaderboard/corpus-totals.json', JSON.stringify(totals, null, 2) + '\n');
console.log(totals);
