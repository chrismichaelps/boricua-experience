---
type: module
fidelity: Active
tags: [module, discovery, browser]
---

# Listing

## Purpose and interface
`public/assets/js/features/listing.js` owns progressive filters, load-more and search-result arrival. Native GET submissions remain authoritative. `searchArrival()` records a short-lived same-origin listing path after an uncancelled search action, consumes it on the next page, and scrolls to the results heading.

## Resolved Grill Log
- Scroll only after an explicit search/filter action; direct entry and history restoration retain their normal position. Store only a path and timestamp, never query text or coordinates. Consume the marker once, expire after 15 seconds, and tolerate blocked storage.
- Modified clicks, external links, map links and cancelled submits do not arm scrolling. Reduced motion uses immediate scrolling. Both empty and populated results have the same heading anchor, clear of the sticky header.
- Load more keeps its existing position; it does not trigger arrival scrolling.

## Referenced by
[[src/_MOC]] · [[src/Public/BrowserMain]] · [[src/View/Pages/Search]]

## Complete place pagination Grill Log · #124
Resolved: place listings return a bounded24-item Results page and retain its next cursor. Activity and place cursors remain separate query parameters; progressive links request only their own source, no-script links render a full page. Filters and explicit sort are preserved. Activity-only constraints return an empty place page. Failure to read places is reported rather than silently presented as completeness. Database pages use deterministic score/count/name/id keysets bound to normalized filters and sort, without an offset ceiling. Canonicalize McDonald/Macdonald/apostrophe-s variants and use indexed full-text prefixes for plain partial queries; map uses the same normalization. Never infer missing branches or municipality facts. Invalid or wrong-scope cursors fail before reads. Matching indexes support name/category/town, ranked and spatial/text paths. No table/API grant expansion or private data in source.

## Consistent card copy Grill Log · #124
Resolved: standard rail/search cards keep a shared13rem copy track, matching cover proportions and title/metadata alignment. Long text remains present in a native vertical scroll area rather than clipped; page scroll can chain at its boundaries. The focusable card link supports Arrow/Page keys for overflow without extra nested tab stops; directional keys are intercepted only when the body can scroll that direction. A single delegated listener covers initial and asynchronously inserted cards. Horizontal activity rows keep their distinct128px copy/media tracks on wide screens. Map cards remain compact and unaffected. Place article uses card-venue rather than the paragraph-only card-place class to avoid inherited flex/ellipsis rules.

Resolved dynamic-card refinement #124: one delegated keyboard listener covers initial cards and later load-more/nearby-rail insertions. Busy-lock test proves one page append on repeated activation; overflow tests preserve native scrolling at boundaries and include a card inserted after listener setup. No per-card initialization or nested tab stops.

## Pagination feedback ordering · #124
Resolved: the production browser exposed click-capture microtasks running before the target load-more listener. Shared navigation feedback now decides in the bubbling phase and never owns a canceled/script-handled click. Pagination uses its own closure lock rather than interpreting another component's aria-busy flag. Test actual shared feedback plus actual loadMore with a microtask checkpoint between capture and target, then completion/repeat activation. Asset revision84 refreshes both changed modules and entry; no database change.
