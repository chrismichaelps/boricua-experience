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

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; no third-party brand artwork or hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

Reviewed refinement #120: place search preserves anchored nearby coordinates/radius. Camera refresh intentionally removes nearby-origin restrictions and queries its new bounded viewport; dates/category/text/traits remain intact. Anonymous map projection never includes hidden/removed rows. Cross-kind selection identity is distinct.
