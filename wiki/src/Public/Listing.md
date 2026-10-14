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
