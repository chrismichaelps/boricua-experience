---
type: module
fidelity: Active
tags: [module, test]
---

# ServiceWorker

## Purpose

Runs the worker in an isolated JavaScript harness with synthetic requests to prove anonymous precaching, no personalized navigation storage, offline fallback and cache cleanup.

## Interface

Run with `pudu test test` and `node scripts/service-worker-test.mjs`.

## Algorithm

Use in-memory fixtures and deterministic assertions. No database mutations or secrets.

## Negative Logic

Never treat a passing mock as proof of OAuth, publishing or location permissions on a real device.

## Edge Cases

Failed homepage, translated controls, quotes in user input, worker upgrades while signed in, offline requests.

## Depth

MEDIUM: checks public output and cache effects.

## Grill Log

- **Q:** Why add tests to a style refresh?
  **A:** The document section and offline caching changed behaviour; regressions could hide navigation or retain member data. Test outcomes across boundaries.

## Referenced by

[[src/_MOC]] · [[handoffs/homepage-refresh]]

## Brand upgrade validation
Use the declared runtime/cache asset version rather than stale fixture versions. Grill: output and old-cache cleanup assertions still verify the same public boundary; resolved.
