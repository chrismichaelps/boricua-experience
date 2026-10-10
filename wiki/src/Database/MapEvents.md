---
type: module
fidelity: Active
tags: [module, mobile, performance]
---

# MapEvents

## Purpose

Public read RPC with empty search_path, explicit anon/authenticated execution grants and revoked PUBLIC execution. Restrict every row to upcoming published public activities using existing public coordinate policy (exact for open activities, blurred for approval-gated activities). Filter exact viewport with existing GiST broad phase plus exact coordinate predicates, optionally text/category/town/date/price. KNN ordering and LIMIT 61 occur before card/profile joins and JSON; return at most 60 rows and a limited flag, never count the entire catalogue. Existing functions/tables/RLS remain unchanged.

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

## Referenced by

[[src/_MOC]] · [[handoffs/homepage-refresh]]
