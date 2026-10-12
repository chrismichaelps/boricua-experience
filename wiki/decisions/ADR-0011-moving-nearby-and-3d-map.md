---
type: adr
status: ACCEPTED
date: 2026-10-12
tags: [adr, map, performance]
---

# ADR-0011 — Moving "near me" through shared cached areas, and an optional 3D map

## Decision

Nearby activities stay current while a visitor walks, rides the Tren Urbano or drives, without a database read per visitor per movement:

1. **Grid-aligned areas.** The map widens its camera rectangle outward to a grid whose cell depends only on the zoom level ([[src/Public/MapViewport]] `snapArea`). Nearby visitors and small movements produce byte-identical `/api/map` addresses.
2. **Shared edge cache.** When the address names the language it is rendered in (`hl`), the pins answer is the same for every visitor and is marked `public, s-maxage=60, stale-while-revalidate=300` ([[src/Constants/Http]] `CACHE_SHARED_PINS`). Database load then grows with the number of distinct areas being viewed per minute, not with the number of people moving. A response that sets a cookie is always forced private ([[src/Web/Respond]]).
3. **Client economy.** The browser keeps its recent-area cache, cancels superseded requests, asks nothing while the tab is hidden and asks once when it is shown again.
4. **Speed-aware following.** While following, the camera zoom follows ground speed measured between timed readings: street level on foot, wider on a bus or train, widest on a highway, so activities ahead are on screen before they are reached.

The map can show buildings in 3D. A hidden `fill-extrusion` layer over the existing OpenFreeMap building data rises from mapped heights when the visitor turns on **3D**; the camera tilts to 50°. Nothing new is downloaded, no key or host is added, and the choice stays in the browser. Coverage follows OpenStreetMap: dense in San Juan, Ponce and town centres, sparse in rural areas.

## Rejected

- **Realtime subscriptions / websockets.** Activities change rarely; a persistent connection per moving visitor spends connection quota to deliver mostly nothing.
- **Per-visitor radius queries on every reading.** Unique coordinates defeat every cache.
- **Server-side position tracking.** Unneeded for discovery and contrary to [[decisions/ADR-0004-location-privacy]]: positions never leave the device for this feature.
- **Paid 3D or terrain providers.** The free vector tiles already carry building heights; terrain elevation remains a possible later addition.

## Consequences

Pins can be up to a minute old (plus a stale window while refreshing); new or cancelled activities appear within that bound. Cards rendered with relative dates are re-localised in the browser from their instants.
