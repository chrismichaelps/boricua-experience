---
type: module
fidelity: Active
tags: [module, test, location]
---

# Location lifecycle tests

## Purpose

Execute the real live.js code with browser-boundary stubs to assert the watcher stops on sharing-off and page-hide, including a guest local watch.

## Interface

`node scripts/location-test.mjs`.

## Algorithm

An isolated VM supplies synthetic navigator, document, storage, transport and DOM. Calls exported lifecycle functions and dispatches visibility events.

## Negative Logic

No real geolocation or database writes; this does not prove permission prompts or hardware behavior.

## Edge Cases

Duplicate starts, guest page hide, sharing off, sharing pause/resume.

## Depth

MEDIUM: observes clearWatch at the browser boundary.

## Grill Log

- **Q:** Why a browser stub? **A:** Real coordinates are unnecessary for proving stop behavior; the production module runs against the same navigator method surface.

## Referenced by

[[src/_MOC]] · [[src/Public/Live]]

## Resolved follow-up Grill Log

- **Q:** What contract fixes the reported gap?
  **A:** Extend the real-module harness to exercise fresh readings, permission denial, timeout, unsupported API, status notifications and absence of sends during local locate. Resolved.

## Publishing recovery Grill Log
Resolved: Publishing regression tests exercise first-fix success, CoreLocation failure recovery, denial without retry, bounded timeout, unsupported API, invalid fix and stale callbacks after cancel.
