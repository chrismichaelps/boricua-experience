---
type: architecture
tags: [architecture, delivery]
---

# Delivery

- Work starts from an issue on a `feature/<issue>-<slug>` branch from `dev`; pull requests target
  `dev`; `main` receives releases only.
- Commits: `type(scope): imperative summary refs #<issue>`.
- Checks before a pull request: `pudu check` on every source file, `pudu fmt --check src test`,
  `pudu test test`, and a local run of `scripts/dev.sh` through the main flows.
- Deployment: `scripts/build-vercel.sh` compiles [[src/Function]] onto the release's musl Lambda
  runtime, writes the Build Output directory (static assets, routes, the function), and
  `vercel deploy --prebuilt` publishes it. Secrets are project environment variables, never files.
- `BORICUA_SITE_URL` is baked into the function at build time and must be the canonical public
  https origin: the same-origin guard compares every post with it. The build refuses any other
  value, so a shell that loaded the development `.env` cannot ship `http://localhost`.

## HTML under assets
Static HTML documents under `/assets/` (photography credits) are served `max-age=0, must-revalidate` instead of immutable: their address is linked with the asset version, but a visitor who cached an unversioned copy would otherwise never see new styles.

## Referenced by

[[architecture/_MOC]]

## Environments

Development and production data are separate; see [[decisions/ADR-0008-separate-environments]]. After any production migration run `scripts/check-production-data.sh`.

Every reviewed application schema migration must be applied to both development and production before promotion. Compare application function definitions, permissions and RLS after applying it; repeat the production seed-data check. Development-only test fixtures remain isolated.
