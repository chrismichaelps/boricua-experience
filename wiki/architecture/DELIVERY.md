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

## Referenced by

[[architecture/_MOC]]

## Environments

Development and production data are separate; see [[decisions/ADR-0008-separate-environments]]. After any production migration run `scripts/check-production-data.sh`.

Every reviewed application schema migration must be applied to both development and production before promotion. Compare application function definitions, permissions and RLS after applying it; repeat the production seed-data check. Development-only test fixtures remain isolated.
