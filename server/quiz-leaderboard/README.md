# TheWord quiz leaderboard

A small independent Railway service; TheWord's offline Bible still runs on GitHub Pages.
Node 24 built-in HTTP + SQLite, no npm runtime dependencies. Single replica; persistent `/data` volume required on Railway. Do not run multiple replicas against this SQLite database.

## Ranking contract

- Separate leaderboard per Bible language. `corpus-totals.json` matches `getQuizVerses` (known books, usable verses, unique references).
- Points = `solved² / attempts` = solved verses × success ratio. No rounding until display. 90/100 → 81 points; 2/2 → 2; 51/85 → 30.6.
- Best observed result per language and player is retained. Resetting the local game cannot reduce or remove a record. Ties: more solved verses, fewer attempts, then code (stable order).
- Pagination: 25 rows. `view=me` returns the page containing the authenticated player. UI highlights and scrolls to the player; top and my-position buttons reload the appropriate page.

## Identity and synchronization

Joining is optional, with a brief explanation before first participation. A private 256-bit secret is generated on the device and saved **before** registration. Server stores only SHA-256. Public code `TW-XXXXXXXX` is assigned by the server with cryptographic randomness and a database UNIQUE constraint; collisions retry atomically. Repeating registration with the same secret returns the same code. No real names or email addresses.

The secret travels only in the Authorization header over HTTPS, never in a URL or public ranking payload. Every score write and removal authenticates it. Body limits, bounded integer validation, CORS allowlist and volatile request limits protect basic operation. IP hashes for limits are memory-only, never part of the score database.

Local `twog:quiz:player:v1` stores the identity and a best-score outbox per language. A later wrong answer, local reset or offline reload cannot overwrite a queued better score. Retries are idempotent and updates arriving during a sync are drained before it finishes. Quiz mount, answer changes, window focus and the online event trigger syncing for participants. Failure never blocks local play. The server computes points; clients cannot supply point totals.

The existing offline quiz and imported backups remain supported. Therefore results are **self-reported**, with bounds checks, not a cryptographically verified competitive anti-cheat system. A determined person can alter local progress. No monetary prizes are supported or implied.

TheWord backups include the player's secret and outbox. Treat backup files as private. Restore on a new device recovers the same player; restore on a device already registered preserves that device's identity. The UI's "Remove my score" deletes all of that player's server scores and identity, and removes the local registration while keeping the quiz itself.

## Deployment / operations

- Railway project: TheWord (`a693509a-3f62-47fa-b069-d4de802046f4`).
- Service: quiz-leaderboard (`2b4fb630-aad0-429b-beaf-8ffe2a92b5d8`).
- Environment: production (`bd7ed044-bd35-4410-96b5-88ab6cb5a8a0`).
- Source: `thewordofgodfr/theword.fr`, root `/server/quiz-leaderboard`, Dockerfile in that directory.
- `PORT=8080`, public domain target 8080, healthcheck `/health`.
- Volume: quiz-scores mounted at `/data`, region Europe. DB `/data/quiz.sqlite`, WAL with full synchronization. Never replace with an ephemeral path. A volume survives redeploys; it is not an off-site backup. Use SQLite's backup API or Railway volume snapshots for disaster recovery, not a live copy of just the .sqlite file while WAL is active.
- API: `https://quiz-leaderboard-production-a676.up.railway.app`.
- `/health` exposes only health/version. `/v1/leaderboard?lang=fr` is read-only and public. No public administrative endpoint.
- No paid plan upgrade or optional paid feature was enabled. Service/volume usage is metered under the existing Railway plan.

Local: `DB_PATH=/tmp/quiz.sqlite PORT=3000 node server/quiz-leaderboard/server.mjs`.
Tests: `node --test tests/quizLeaderboard.test.mjs server/quiz-leaderboard/server.test.mjs`.

When Bible content changes, regenerate totals through `getQuizVerses`, then deploy the API and UI together. Any future ranking formula change requires an explicit database migration/recalculation; do not silently compare old-formula points with new ones.

## Consent and retention

POST /v1/players requires JSON `{ "version": "2026-10-29.1", "accepted": true, "adult": true, "language": "fr" }`. Only call after both unchecked boxes are selected. The immutable translated notice is archived in consent-2026-10-29.1.json. Changing the substantive notice requires a new version on client and server and fresh consent. Proof records server timestamp, version, language and adult self-declaration; no birth date is collected.

GET /v1/player checks existing consent and refreshes activity; it never registers a missing profile. Legacy profiles are hidden until consent and remain deletable. A restored backup cannot silently register a deleted or expired profile.

Retention: 24 calendar months after last authenticated profile activity or score synchronization. Expired profiles are hidden immediately, purged at startup and hourly, with scores and consent proof deleted by cascade. Local progress and user-owned exported backups are independent. No external database backups are configured by this change; any future backup policy must bound retention and preserve deletions during recovery.

The operator must verify the Railway DPA/account agreement and applicable transfer guarantees. An EU database region alone is not an assurance that all processing stays in the EU.
