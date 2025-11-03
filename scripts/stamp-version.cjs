// scripts/stamp-version.cjs
// Génère public/version.json avec version = "YYYY.MM.N"
// et (optionnellement) incrémente CACHE_VERSION ('vN') dans sw-v7.js si --bump-sw
// Pas de hash commit, pas d'heure.

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const publicDir = path.join(ROOT, 'public');
const versionJsonPath = path.join(publicDir, 'version.json');

// Localise le SW : racine ou public/
const swCandidates = [
  path.join(ROOT, 'sw-v7.js'),
  path.join(ROOT, 'public', 'sw-v7.js'),
];

function readText(p) {
  return fs.readFileSync(p, 'utf8');
}
function writeText(p, s) {
  fs.writeFileSync(p, s, 'utf8');
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function findSwPath() {
  for (const p of swCandidates) if (fs.existsSync(p)) return p;
  return null;
}

function bumpServiceWorkerIfFlag(swPath, doBump) {
  const rx = /const\s+CACHE_VERSION\s*=\s*['"]v(\d+)['"]\s*;/;
  if (!swPath || !fs.existsSync(swPath)) {
    return { swCache: 'v0', index: 0, changed: false };
  }
  let code = readText(swPath);
  const m = code.match(rx);
  if (!m) return { swCache: 'v0', index: 0, changed: false };

  let n = parseInt(m[1], 10) || 0;
  if (doBump) n += 1;

  const nextLine = `const CACHE_VERSION = 'v${n}';`;
  code = code.replace(rx, nextLine);
  if (doBump) writeText(swPath, code);

  return { swCache: `v${n}`, index: n, changed: !!doBump };
}

function buildVersionString(swIndex) {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  // Version = Année.Mois.Index (ex: 2025.11.14)
  return `${yyyy}.${mm}.${swIndex}`;
}

function writeVersionJson({ version, swCache }) {
  const builtAt = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (sans heure)
  const data = {
    version,     // ex: "2025.11.14"
    builtAt,     // ex: "2025-11-03"
    swCache,     // ex: "v14"
  };
  ensureDir(publicDir);
  writeText(versionJsonPath, JSON.stringify(data, null, 2));
  console.log('version.json ->', data);
}

(function main() {
  const args = process.argv.slice(2);
  const doBumpSW = args.includes('--bump-sw');

  const swPath = findSwPath();
  const { swCache, index } = bumpServiceWorkerIfFlag(swPath, doBumpSW);

  const version = buildVersionString(index);
  writeVersionJson({ version, swCache });

  // Petit rappel console :
  if (doBumpSW) {
    console.log(`SW bump OK → ${swCache} ; version = ${version}`);
  } else {
    console.log(`SW inchangé → ${swCache} ; version = ${version}`);
  }
})();
