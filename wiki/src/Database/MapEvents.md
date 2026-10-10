---
type: module
fidelity: Active
tags: [module, mobile, performance]
---

# MapEvents

## Purpose

Public read RPC with empty search_path, explicit anon/authenticated execution grants and revoked PUBLIC execution. Restrict every row to upcoming published public activities using existing public coordinate policy (exact for open activities, blurred for approval-gated activities). Filter exact viewport with existing GiST broad phase plus exact coordinate predicates, optionally text/category/town/date/price. KNN ordering by distance alone (no tie-break column, so the GiST index supplies the order and the scan stops after 61 rows) and LIMIT 61 occur before card/profile joins and JSON; a category filter uses the `(category_id, approx_location)` GiST index; return at most 60 rows and a limited flag, never count the entire catalogue. Existing functions/tables/RLS remain unchanged.

## Interface

Owned bounded implementation under the corresponding browser/database/test module.

## Algorithm

Public read RPC with empty search_path, explicit anon/authenticated execution grants and revoked PUBLIC execution. Restrict every row to upcoming published public activities using existing public coordinate policy (exact for open activities, blurred for approval-gated activities). Filter exact viewport with existing GiST broad phase plus exact coordinate predicates, optionally text/category/town/date/price. KNN ordering and LIMIT 61 occur before card/profile joins and JSON; return at most 60 rows and a limited flag, never count the entire catalogue. Existing functions/tables/RLS remain unchanged.

## Negative Logic

No hidden database mutations, personal data exposure, credential logging, browser permission bypass or hardware support claims.

## Edge Cases

Empty data, invalid bounds, dense regions, trusted interaction, interrupted gestures, cached pages and reduced motion.

## Depth

MEDIUM: bounded boundary adaptation.

## Grill Log

- **Q:** What keeps this feature safe and bounded? **A:** Public read RPC with empty search_path, explicit anon/authenticated execution grants and revoked PUBLIC execution. Restrict every row to upcoming published public activities using existing public coordinate policy (exact for open activities, blurred for approval-gated activities). Filter exact viewport with existing GiST broad phase plus exact coordinate predicates, optionally text/category/town/date/price. KNN ordering and LIMIT 61 occur before card/profile joins and JSON; return at most 60 rows and a limited flag, never count the entire catalogue. Existing functions/tables/RLS remain unchanged. Resolved.
- **Q:** Why no `id` tie-break inside the nearest-first scan? **A:** An extra sort key the index cannot supply forces every row in the rectangle to be read and sorted. Measured on 500,000 events (45% in the San Juan metro area): whole-island view 85 ms and 10,508 blocks with the tie-break, 0.2 ms and 67 blocks without; a street view 3.4 ms down to 0.2 ms. The outer aggregate still orders the returned page by distance then id. Resolved.
- **Q:** Is a second spatial index worth its writes? **A:** Category is the commonest map filter; with `(category_id, approx_location)` a filtered metro view drops from about 26 ms to about 10 ms, for an index about a third larger than the plain one. Resolved.

## Referenced by

[[src/_MOC]] · [[handoffs/homepage-refresh]]
