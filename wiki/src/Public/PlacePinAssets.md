---
type: module
fidelity: Active
tags: [module, map, presentation]
---
# Place pin assets

## Purpose
Restaurant/shopping and generic place icon assets plus shopping category fallback cover.

## Interface
/assets/icons/{food,shopping,pin}.svg and /assets/covers/compras.svg; /assets/listings/mcdonalds.png and /assets/listings/walmart.png are official business identification marks.

## Resolved Grill Log · #120
Geometry comes from pinned ISC Lucide0.468.0, matching the existing icon registry; category defaults remain decorative and never imply a photograph of a business. Unknown categories use a location pin, not a restaurant icon. Labels carry the actual branch/category; no third-party brand artwork. Assets contain no scripts or remote resources.

## Referenced by
[[src/Public/Markers]] · [[src/_MOC]]

## Business identity refinement Grill Log · #120
Resolved user refinement: a nullable map_icon_url comes from the database public place projection and holds official business artwork for identification. A missing or failed image falls back once to the category icon. Keep the circular44px button, accessible branch/category label, map positioning and selection contract. No category/brand slug guessing in browser logic. Branded marks do not establish verified ownership or affiliation; provenance remains recorded.

Business artwork revision82 supersedes the unreleased81 category-only pin change. Official logo assets live under /assets/listings/, while record-to-logo references remain database data. Cached changed imports advance together; no new live-location module identity. Resolved.

The earlier category-only artwork policy is superseded by the explicit user refinement: prefer a database business mark and retain category icons as fallback.

Official Burger King, Starbucks and Burlington marks are also available as /assets/listings/{burgerking,starbucks,burlington}.png for source-reviewed database records. Burger King/Burlington site ICO resources are decoded to PNG without changing their geometry or colors; Starbucks uses its official PR logo PNG.
