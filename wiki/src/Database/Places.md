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
