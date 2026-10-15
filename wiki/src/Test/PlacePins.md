---
type: module
fidelity: Active
tags: [module, test, map]
---
# Permanent place pin tests

## Purpose and interface
node scripts/place-pins-test.mjs; real markers module with a minimal DOM/MapLibre boundary.

## Resolved Grill Log · #120
Verify category icon, safe generic fallback, branch label, exact coordinates and selection callback without camera changes. Existing price-marker behavior remains intact. Explorer regression checks place links and absence of fabricated time. Database rollback tests cover61→60 limit, hidden/removed exclusion, invalid coordinates/radius, off-island reads and guest/member grants. Stub tests are not browser/device evidence.

## Referenced by
[[src/Public/Markers]] · [[src/_MOC]]

Reviewed refinement #120: place search preserves anchored nearby coordinates/radius. Camera refresh intentionally removes nearby-origin restrictions and queries its new bounded viewport; dates/category/text/traits remain intact. Anonymous map projection never includes hidden/removed rows. Cross-kind selection identity is distinct.

## Business identity refinement Grill Log · #120
Resolved user refinement: a nullable map_icon_url comes from the database public place projection and holds official business artwork for identification. A missing or failed image falls back once to the category icon. Keep the circular44px button, accessible branch/category label, map positioning and selection contract. No category/brand slug guessing in browser logic. Branded marks do not establish verified ownership or affiliation; provenance remains recorded.
