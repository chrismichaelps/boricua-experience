---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, search]
---

# Suggest

> `public/assets/js/features/suggest.js` — the search box's suggestions.

Typed queries of two characters or more ask `/api/suggest` for matching activities.

## Nearby and starter suggestions · #178
Focusing the empty "Qué" box opens a list before anything is typed: **Cerca de mí / Nearby** first, then the towns opened on this device (`bx-recent-towns`, newest first, at most four, named from the search's own town picker) or, without any, the featured destinations' towns (`data-popular`, region names translated). Choosing Nearby asks for the position, rounds it to two decimals (about a kilometre) and opens `/cerca?lat=&lng=`, which redirects to the nearest town guide (`Catalog.nearestTown`, within 25 km of a town centre), to the search when the position is off the islands, or to the map without a position. A refused or failed location keeps the list open with a plain message. Test: `scripts/suggest-test.mjs`, DomainTest nearest-town checks.
