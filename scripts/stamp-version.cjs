// scripts/stamp-version.cjs
// Produit public/version.json avec: { "version": "YYYY.MM.N" } uniquement.
// Option --bump-sw : incrémente CACHE_VERSION dans sw-v7.js pour forcer l’update PWA.

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const publicDir = path.join(ROOT, 'public');
const versionJsonPath = path.join(publicDir, 'version.json');

// Emplacements possibles du SW
const swCandidates = [
  path.join(ROOT, 'sw-v7.js'),
  path.join(ROOT, 'public', 'sw-v7.js'),
];

function readText(p) { return fs.readFileSync(p, 'utf8'); }
function writeText(p, s) { fs.writeFileSync(p, s, 'utf8'); }
function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }
function findSwPath() { for (const p of swCandidates) if (fs.existsSync(p)) return p; return null; }

function bumpServiceWorkerIfFlag(swPath, doBump) {
  const rx = /const\s+CACHE_VERSION\s*=\s*['"]v(\d+)['"]\s*;/;
  if (!swPath || !fs.existsSync(swPath)) return { index: 0, changed: false };
  let code = readText(swPath);
  const m = code.match(rx);
  if (!m) return { index: 0, changed: false };
  let n = parseInt(m[1], 10) || 0;
  if (doBump) n += 1;
  code = code.replace(rx, `const CACHE_VERSION = 'v${n}';`);
  if (doBump) writeText(swPath, code);
  return { index: n, changed: !!doBump };
}

function buildVersionString(swIndex) {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  // YYYY.MM.N  (N = index SW/built)
  return `${yyyy}.${mm}.${swIndex}`;
}

function writeVersionJson({ version }) {
  ensureDir(publicDir);
  writeText(versionJsonPath, JSON.stringify({ version }, null, 2));
  console.log('version.json ->', { version });
}

(function main() {
  const args = process.argv.slice(2);
  const doBumpSW = args.includes('--bump-sw');

  const swPath = findSwPath();
  const { index } = bumpServiceWorkerIfFlag(swPath, doBumpSW);

  const version = buildVersionString(index);
  writeVersionJson({ version });

  console.log(`${doBumpSW ? 'SW bump OK' : 'SW inchangé'} → version = ${version}`);
})();
