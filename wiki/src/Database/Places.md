---
type: module
path: "@root/src/../supabase (private migration)"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Database
depth_status: MEDIUM
tags: [module, database]
---

# Database.Places

> /** Private migration `places`: places, category profiles, and their validation */

## Purpose

Permanent places and per-category fact profiles (ADR-0010).

## Interface

### Signatures

```pudu
app.places, app.category_fields, categories.kinds/default_kind
public.search_places, place_detail, create_place, update_place, set_place_status, my_places; list_categories adds kinds and fields
```

### Linkage

- **Requires:** [[decisions/ADR-0010-category-profiles-and-places]].
- **Consumed by:** [[src/Api/Places]], [[src/Api/Catalog]].

## Algorithm

`private.check_details` refuses unknown keys, misfit values and missing required facts; `private.check_hours` refuses malformed hours. Creating refuses a same-named place within 150 m (`place_exists`) and more than five places per member per day. Hidden places are visible only to their owner; removal is reserved for moderation.

## Negative Logic (Prohibited Paths)

- ❌ Anonymous callers cannot execute write functions; private helpers are not executable by API roles.

## Referenced by

[[src/_MOC]]


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; the initial category-only decision is superseded below; no hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

Reviewed refinement #120: place search preserves anchored nearby coordinates/radius. Camera refresh intentionally removes nearby-origin restrictions and queries its new bounded viewport; dates/category/text/traits remain intact. Anonymous map projection never includes hidden/removed rows. Cross-kind selection identity is distinct.

## Business identity refinement Grill Log · #120
Resolved user refinement: a nullable map_icon_url comes from the database public place projection and holds official business artwork for identification. A missing or failed image falls back once to the category icon. Keep the circular44px button, accessible branch/category label, map positioning and selection contract. No category/brand slug guessing in browser logic. Branded marks do not establish verified ownership or affiliation; provenance remains recorded.

## Map distance origin Grill Log · #120
Resolved: camera-center distance orders a viewport internally, but is never presented as distance from a visitor. Return distance_m only for an explicit search origin; otherwise null. Use geodesic distance for the public origin distance. Keep viewport ordering and limits intact.

## Complete place pagination Grill Log · #124
Resolved: place listings return a bounded24-item Results page and retain its next cursor. Activity and place cursors remain separate query parameters; progressive links request only their own source, no-script links render a full page. Filters and explicit sort are preserved. Activity-only constraints return an empty place page. Failure to read places is reported rather than silently presented as completeness. Database pages use deterministic score/count/name/id keysets bound to normalized filters and sort, without an offset ceiling. Canonicalize McDonald/Macdonald/apostrophe-s variants and use indexed full-text prefixes for plain partial queries; map uses the same normalization. Never infer missing branches or municipality facts. Invalid or wrong-scope cursors fail before reads. Matching indexes support name/category/town, ranked and spatial/text paths. No table/API grant expansion or private data in source.

Performance refinement #124: force custom query plans for the whitelisted sort branches so repeated calls cannot regress to a generic CASE sort. Name continuations use an explicit(name,id) seek predicate; rating retains its indexed score/count/name/id tuple. Nearby distance remains exact geodesic and the spatial radius narrows candidates. No extra public function or permission. Resolved.

## Quality ranking Grill Log · #149
Resolved: listings default to a `best` order instead of the alphabet. `private.place_quality` is a damped rating (prior 3.8 over three reviews) plus small completeness signals (cover, verified, saves on a log scale, a real description, hours, website), minus 0.9 for a chain branch (business artwork and a "Brand · Branch" name). Ownership is not a signal: imported branches belong to the admin account. Scores are rounded to six decimals so the JSON page cursor reproduces them exactly; the rating order gets the same rounding, which fixes places being skipped between pages when averages are repeating decimals. Name, rating, near and relevant orders keep their behaviour. No new grant; the helper is private.
