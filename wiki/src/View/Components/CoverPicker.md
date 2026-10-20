---
type: module
path: "@root/src/View/Components/CoverPicker.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
depth_status: SHALLOW
tags: [module, covers]
---

# View.Components.CoverPicker

## Purpose

Radio tiles on the activity and place forms: the category default and seven themes, each previewing its artwork. The service sets the chosen theme after publishing through `public.set_cover_theme`, which never replaces an uploaded photograph.

## Interface

```pudu
export fn picker(frame, chosen, fallback, errors) -> H.Node
```

### Linkage

- **Consumed by:** [[src/View/Pages/EventForm]], [[src/View/Pages/PlaceForm]].

## Negative Logic (Prohibited Paths)

- ❌ A theme never replaces an uploaded photograph; an empty choice returns to the category default.

## Referenced by

[[src/_MOC]]

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.
