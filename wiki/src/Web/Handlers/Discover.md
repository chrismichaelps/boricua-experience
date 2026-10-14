---
type: module
path: "@root/src/Web/Handlers/Discover.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: MEDIUM
tags: [module, web, medium]
---

# Web.Handlers.Discover

> /** @Web.Handlers.Discover.Routes — home, search, landing pages, the map, and suggestions */

## Purpose

Routes for home, search, landing pages, the map, and suggestions: `/`, `/search`, `/c/:slug`, `/pueblo/:slug`, `/map`, `/api/suggest`, `/api/nearby`.

## Interface

### Signatures

```pudu
export fn routes(app: &Assembly.App) -> Array[Route.Route]
```

### Linkage

- **Requires:** [[src/Web/Serve]], [[src/Web/Context]], [[src/Web/Respond]], [[src/App/Messages]], and the pages it renders.
- **Consumed by:** [[src/Web/Router]].

## Algorithm

Read the request, send one message through the mediator, render the outcome or answer the problem.

## Negative Logic (Prohibited Paths)

- ❌ No direct API or service calls: everything goes through the mediator.
- ❌ No unguarded state change.

## Edge Cases

- Search reads `q`, `when`, `category`, `pueblo`, `free`, `sort`, `lat`, `lng`, `after`; a text query sorts by relevance unless a sort is given; load-more asks the same address for JSON.

## Depth

MEDIUM.

## Grill Log

- **Q:** How do map results stay consistent with the listing?
  **A:** The pins message carries Search.Filters. The service passes the same validated text, category, municipality, date and free-only arguments to search_events with the map limit. Nearby refreshes preserve these filters; category/town map links explicitly encode their landing filter.


- **Q:** Post-redirect-get?
  **A:** Yes for every successful form, with a one-time flash message; refused forms re-render in place.

## Referenced by

[[src/_MOC]]

## Resolved follow-up Grill Log

- **Q:** What contract fixes the reported gap?
  **A:** The nearby read endpoint accepts an optional positive radius in meters bounded by RADIUS_MAX_M. Omission retains 15km. Coordinates must still be in the existing Puerto Rico bounds. Same search filters and the existing map limit remain in force. Resolved.

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Add read-only /api/map with four numeric ordered world bounds and an early empty response outside Puerto Rico. The initial map request uses island bounds and existing filters, never unbounded search. Nearby radius endpoint remains compatible. Resolved.

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.

## Moving nearby and 3D Grill Log · #78
Resolved: the viewport answer is shared only when its `hl` parameter equals the rendered language; otherwise the default private policy applies.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.
