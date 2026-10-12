---
type: module
fidelity: Active
tags: [module, test, menus]
---
# Menu contract regression suite

## Purpose
Pure typed-contract tests in test/Domain/MenuTest.pudu and its menu-board JSON fixture.

## Algorithm
Decode published menu projections; compare unknown, free and paid prices and availability/allergen states. Encode an editable document and check server-owned keys are absent. Reject malformed projections.

## Negative Logic
No live network calls, real restaurant facts, credentials or production data.

## Grill Log
Resolved: fictional fixtures live only in the test directory. Database rollback/race tests independently cover authorization, limits and revisions; pure tests protect nullable wire semantics and write shape.

## Referenced by
[[src/_MOC]] · [[src/Domain/Menu]] · [[handoffs/product-strategy]]
