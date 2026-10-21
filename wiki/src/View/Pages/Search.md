---
type: module
path: "@root/src/View/Pages/Search.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Search

> /** @View.Pages.Search.Results — filtered listings, with category and town landing pages */

## Purpose

Results with the pill, chips, filter bar, grid, and load-more; landing pages for a category or town with breadcrumbs; JSON card fragments for load-more.

## Interface

### Signatures

```pudu
export type Landing = Open | ForCategory(Catalog.Category) | ForTown(Catalog.Municipality)
export fn queryOf, placeQueryOf, cards, placeCards, render, renderResults
```

### Linkage

- **Requires:** `Std.Html.Build`, [[src/View/Frame]], [[src/I18n/Translate]], Domain types.
- **Consumed by:** Web handlers and other views.

## Algorithm

Builds `Html` values with the trait chain; text from requests or the database goes through `says`, never `raw`.

## Negative Logic (Prohibited Paths)

- ❌ No service calls: a view renders what it is given.
- ❌ No inline scripts; behaviour attaches by `data-feature`.

## Edge Cases

- Every interactive control has a visible label or `aria-label`; touch targets are at least 44 px.

## Depth

MEDIUM.

## Grill Log

- **Q:** How do map results stay consistent with the listing?
  **A:** The pins message carries Search.Filters. The service passes the same validated text, category, municipality, date and free-only arguments to search_events with the map limit. Nearby refreshes preserve these filters; category/town map links explicitly encode their landing filter.


- **Q:** Templates or values?
  **A:** Values: a page is an `Html` tree, so escaping cannot be forgotten and pages are testable with fixtures.

## Referenced by

[[src/_MOC]]

## Discovery photo and footer Grill Log
Resolved: open search uses the first database-ordered featured scene, a local responsive real photograph and unchanged named filters. Category/town landing behavior stays intact. Empty scene catalogs render usable search without a broken image. Footer has current-year copyright, quiet grouped links and phone touch targets; eligibility policy is unchanged. Photograph source, CC BY2.0 attribution, resizing and crop are recorded in public credits and THIRD_PARTY_NOTICES.

## Full-width search Grill Log · #36
Resolved: explicit app-search body class on the open search route gives its shell8px viewport insets like home. Hero fills shell; remaining search rails retain1200px reading measure. Category/town pages keep their standard shells. Responsive hero image advertises100vw. Cache graph advances atomically to42; no filter/navigation changes.

## Date-range calendar Grill Log · #88
Resolved: add validated Dates(start,end) encoded YYYY-MM-DD..YYYY-MM-DD; reject malformed, impossible, reversed and over366-day spans. Inclusive end converts to following Puerto Rico midnight in existing from/to database arguments, without changing expiration or inventing availability. Preserve presets and canonical when URL across map/list/saved searches. Exact-date dialog uses semantic day buttons, roving keyboard focus, localized two-month desktop/one-month phone calendar, draft selection and explicit apply/clear. Escape cancels draft; existing select fallback remains functional. No Airbnb assets, popups or booking semantics.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.

## Search arrival resolved contract
Explicit discovery actions scroll to the results heading through the progressive listing module; direct entry/history retain their position, cancelled actions are ignored and reduced motion is respected. The entry and changed listing module use asset version71. Resolved.

## Complete place pagination Grill Log · #124
Resolved: place listings return a bounded24-item Results page and retain its next cursor. Activity and place cursors remain separate query parameters; progressive links request only their own source, no-script links render a full page. Filters and explicit sort are preserved. Activity-only constraints return an empty place page. Failure to read places is reported rather than silently presented as completeness. Database pages use deterministic score/count/name/id keysets bound to normalized filters and sort, without an offset ceiling. Canonicalize McDonald/Macdonald/apostrophe-s variants and use indexed full-text prefixes for plain partial queries; map uses the same normalization. Never infer missing branches or municipality facts. Invalid or wrong-scope cursors fail before reads. Matching indexes support name/category/town, ranked and spatial/text paths. No table/API grant expansion or private data in source.

## Visitor discovery Grill Log · #148 — resolved
Activities precede permanent places. The default first place page numbers its quality-ranked cards only when there are at least two; continuations remain unnumbered. Town landings optionally show their fresh guide on the initial activity/place page; read failure omits it, and canonical filters/cursors are preserved. Guide category links target that town's category results.

## Town guides · #178
A town guide whose town is a featured destination opens with that destination's photograph, like the open search. Its head title is "Qué hacer en <town>, Puerto Rico" (the H1 stays "Qué hacer en <town>"). Structured data: the breadcrumb, an `ItemList` of the listed activities and places in page order (indexable pages only), and a `TouristDestination` at the town's centre inside Puerto Rico. Category chips on a town guide (or a town-filtered search) open `/search?category=…&pueblo=…`, so a category never drops the town.

## Town voices and questions · #178
`town_guide` also answers `review_count`, `review_average` and `reviews` (the six newest published reviews of the town's published places; private migration `20261020051000_town_reviews`). The guide shows them as "Lo que dice la gente de <town>" with the town average, reusing the place page's review rail, each card linking to its place. `TownGuidePanel.questions` builds up to three questions answered only from the guide's data (driest months by NOAA normals, the drive or ferry from the airport, the top categories with counts); they render as expandable answers in the guide and as `FAQPage` structured data on indexable town pages. A question without data is left out.
