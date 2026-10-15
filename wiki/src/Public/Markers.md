---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, map]
---

# Map markers

## Purpose

Accessible price, participant and local-position markers plus accuracy geometry.

## Interface

public/assets/js/features/markers.js exports priceMarker, meMarker, personMarker and accuracyCircle.

## Algorithm

Create custom marker elements and attach MapLibre markers. Set the activity/price accessible label after addTo because MapLibre replaces it with a generic label. Selection is delegated to the explorer.

## Negative Logic

No public participant disclosure or automatic geolocation. Do not animate the marker transform: MapLibre owns positioning.

## Edge Cases

Keyboard activation, long activity names, same-price markers, empty initials and reduced motion.

## Depth

MEDIUM: browser map-library boundary.

## Grill Log

- **Q:** Why restore the marker label after addTo?
  **A:** The verified browser rendered every activity as “Map marker”; applying the title and price after MapLibre addTo retains meaningful keyboard/screen-reader identification.

## Referenced by

[[src/_MOC]] · [[src/Public/Explorer]]

Count markers use a blue 44px circle and translated accessible count label, restored by explorer after MapLibre addTo.


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; the initial category-only decision is superseded below; no hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

Reviewed refinement #120: place search preserves anchored nearby coordinates/radius. Camera refresh intentionally removes nearby-origin restrictions and queries its new bounded viewport; dates/category/text/traits remain intact. Anonymous map projection never includes hidden/removed rows. Cross-kind selection identity is distinct.

## Business identity refinement Grill Log · #120
Resolved user refinement: a nullable map_icon_url comes from the database public place projection and holds official business artwork for identification. A missing or failed image falls back once to the category icon. Keep the circular44px button, accessible branch/category label, map positioning and selection contract. No category/brand slug guessing in browser logic. Branded marks do not establish verified ownership or affiliation; provenance remains recorded.

Business artwork revision82 supersedes the unreleased81 category-only pin change. Official logo assets live under /assets/listings/, while record-to-logo references remain database data. Cached changed imports advance together; no new live-location module identity. Resolved.
