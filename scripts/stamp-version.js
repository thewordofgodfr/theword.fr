// scripts/stamp-version.js
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const args = new Set(process.argv.slice(2));

const pkgPath = path.join(ROOT, "package.json");
const swCandidates = [path.join(ROOT, "sw-v7.js"), path.join(ROOT, "public", "sw-v7.js")];
const publicDir = path.join(ROOT, "public");
const versionJsonPath = path.join(publicDir, "version.json");

function readText(p) {
  return readFileSync(p, "utf8");
}
function writeText(p, s) {
  writeFileSync(p, s, "utf8");
}

function findSwPath() {
  for (const p of swCandidates) if (existsSync(p)) return p;
  return null;
}

function getCacheVersionFromSw(text) {
  // matches: const CACHE_VERSION = 'v12';
  const m = text.match(/const\s+CACHE_VERSION\s*=\s*['"]v(\d+)['"]\s*;/);
  return m ? Number(m[1]) : null;
}

function bumpCacheVersionInSw(text) {
  return text.replace(
    /(const\s+CACHE_VERSION\s*=\s*['"]v)(\d+)(['"]\s*;)/,
    (_all, a, num, c) => a + (Number(num) + 1) + c
  );
}

function stampVersionJson({ appVersion, swCacheVersion }) {
  const data = {
    appVersion,
    swCacheVersion: swCacheVersion != null ? `v${swCacheVersion}` : null,
    builtAt: new Date().toISOString(),
    ciCommit: process.env.GITHUB_SHA ? String(process.env.GITHUB_SHA).slice(0, 7) : null
  };
  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
  writeText(versionJsonPath, JSON.stringify(data, null, 2));
  console.log(`Wrote ${versionJsonPath}:`, data);
}

(function main() {
  // read package.json to expose appVersion in version.json
  const pkg = JSON.parse(readText(pkgPath));
  let appVersion = pkg.version || "0.0.0";

  // handle SW bump if requested
  const swPath = findSwPath();
  let swCacheVersion = null;

  if (swPath && existsSync(swPath)) {
    let swText = readText(swPath);
    const current = getCacheVersionFromSw(swText);
    swCacheVersion = current;

    if (args.has("--bump-sw")) {
      if (current != null) {
        swText = bumpCacheVersionInSw(swText);
        writeText(swPath, swText);
        const after = getCacheVersionFromSw(swText);
        swCacheVersion = after;
        console.log(`Service Worker CACHE_VERSION bumped: v${current} -> v${after} (${path.basename(swPath)})`);
      } else {
        console.warn("CACHE_VERSION not found in Service Worker; no bump applied.");
      }
    }
  } else {
    console.warn("Service Worker not found (looked in repo root or public/). Skipping bump.");
  }

  // Always (re)write version.json for the app
  stampVersionJson({ appVersion, swCacheVersion });
})();
