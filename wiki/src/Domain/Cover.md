---
type: module
path: "@root/src/Domain/Cover.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
depth_status: SHALLOW
tags: [module, covers]
---

# Domain.Cover

## Purpose

The background a card shows when no photograph was uploaded: the theme list, its artwork path, reading a stored cover back as a theme, and versioning local artwork (production serves /assets as immutable).

## Interface

```pudu
export const THEMES
export fn valid, path, themeOf, served
```

### Linkage

- **Consumed by:** [[src/Domain/Draft]], [[src/Domain/Place]], [[src/Services/Events]], [[src/Services/Places]], [[src/View/Components/CoverPicker]], [[src/View/Components/EventCard]], [[src/View/Components/PlaceCard]], [[src/View/Seo]].

## Negative Logic (Prohibited Paths)

- ❌ A theme never replaces an uploaded photograph; an empty choice returns to the category default.

## Referenced by

[[src/_MOC]]

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.
