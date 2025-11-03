// scripts/stamp-version.js
// Génère public/version.json + (optionnel) bump CACHE_VERSION dans sw-v7.js
// Usage: node scripts/stamp-version.js --bump-sw

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const VERSION_JSON = path.join(PUBLIC_DIR, 'version.json');

// 1) Lire version package.json (si présent)
let pkgVersion = '0.0.0';
try {
  const pkg = require(path.join(ROOT, 'package.json'));
  pkgVersion = pkg.version || '0.0.0';
} catch {}

// 2) Récup git short SHA
let shortSha = '';
try {
  shortSha = cp.execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
    .toString().trim();
} catch { shortSha = 'local'; }

// 3) Timestamp ISO
const builtAt = new Date().toISOString();

// 4) Version finale (éventuellement enrichie du numéro de run CI)
const runNumber = process.env.GITHUB_RUN_NUMBER;
const version = runNumber ? `${pkgVersion}+${runNumber}` : pkgVersion;

// 5) Lecture/maj sw-v7.js
const SW_CANDIDATES = [
  path.join(ROOT, 'sw-v7.js'),
  path.join(PUBLIC_DIR, 'sw-v7.js'),
];
let swPath = SW_CANDIDATES.find(p => fs.existsSync(p)) || null;

const RX_CACHE_VERSION = /const\s+CACHE_VERSION\s*=\s*['"]([^'"]+)['"]\s*;/;

let swCache = null;
const shouldBump = process.argv.includes('--bump-sw');

if (swPath) {
  let text = fs.readFileSync(swPath, 'utf8');
  const m = text.match(RX_CACHE_VERSION);

  if (m) {
    const prev = m[1];
    if (shouldBump) {
      // Tag lisible : vYYYYMMDDHHmm-<sha> ou fallback
      const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 12);
      const next = `v${stamp}-${shortSha}`;
      text = text.replace(RX_CACHE_VERSION, `const CACHE_VERSION = '${next}';`);
      fs.writeFileSync(swPath, text, 'utf8');
      swCache = next;
      console.log(`[stamp-version] CACHE_VERSION: ${prev} -> ${next} in ${path.relative(ROOT, swPath)}`);
    } else {
      swCache = prev;
      console.log(`[stamp-version] CACHE_VERSION (unchanged): ${prev}`);
    }
  } else {
    console.warn(`[stamp-version] WARN: CACHE_VERSION not found in ${path.relative(ROOT, swPath)}`);
  }
} else {
  console.warn('[stamp-version] WARN: sw-v7.js not found (root/public)');
}

// 6) Écrire public/version.json
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const payload = {
  version,
  commit: shortSha,
  builtAt,
  ...(swCache ? { swCache } : {})
};

fs.writeFileSync(VERSION_JSON, JSON.stringify(payload, null, 2), 'utf8');
console.log(`[stamp-version] Wrote ${path.relative(ROOT, VERSION_JSON)}:\n`, payload);
