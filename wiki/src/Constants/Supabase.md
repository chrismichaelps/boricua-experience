---
type: module
path: "@root/src/Constants/Supabase.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Constants
depth_status: SHALLOW
tags: [module, constants]
---

# Constants.Supabase

> /** @Constants.Supabase.Contract — database functions and identity endpoints */

## Purpose

The name of every database function the server calls, the identity endpoints, header names, the named client, and its timeouts.

## Interface

One `Str` per function of [[grammar/database-api]]; `RPC_PATH`, `AUTH_PATH`, `AUTH_*`; `API_KEY_HEADER`; `CLIENT_NAME`; `CALL_TIMEOUT_MILLIS` (8 s), `ATTEMPT_TIMEOUT_MILLIS` (4 s).

### Linkage

- **Requires:** nothing.
- **Consumed by:** modules of every higher layer that use these values.

## Algorithm

None: compile-time values only.

## Negative Logic (Prohibited Paths)

- ❌ No value computed from the environment or the clock.
- ❌ No literal of these values anywhere else in the source.

## Depth

SHALLOW by design: a table of names. Deletion test: the values scatter as literals.

## Grill Log

- **Q:** Timeouts? **A:** 4 s per attempt, 8 s per call including one retry of idempotent reads, under the platform's own limit. _Rejected:_ the client default of 100 s.

## Referenced by

[[src/_MOC]]

## Menu contract Grill Log
Resolved: PLACE_MENU and SAVE_PLACE_MENU name the bounded owner-authorized menu functions applied identically to both environments. No table access or secrets are introduced.

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Add MAP_EVENTS for the dedicated spatial RPC. Resolved.

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** FEATURED_DESTINATIONS names the bounded public read-only content RPC. Resolved.

## Activity covers Grill Log · #82
Resolved: integrate all-category organizer covers with existing upload presentation and guarded mediator routes. Removal binds the route event; confirmation is server-only after reserved-file verification. Preserve existing place/menu behavior and shared limits.

## Verification cleanup Grill Log
Resolved: storage inspection transport errors propagate without discarding records or files. Invalid content cleanup atomically discards only a still-pending reservation; a file is removed only after successful discard, so overlapping confirmation cannot destroy ready media.

## Email suppression Grill Log · #89
Resolved: DIGEST_ALLOWED names the service-only revision-aware consent check; no browser credentials or direct profile table access.

## Renewal
`ACCEPT_TERMS = "accept_terms"` — records the current Terms and Privacy versions for an onboarded account and appends `renewal` rows to the consent ledger for each document whose version changed.
