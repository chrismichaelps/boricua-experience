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
export fn picker(frame, chosen, fallback) -> H.Node
```

### Linkage

- **Consumed by:** [[src/View/Pages/EventForm]], [[src/View/Pages/PlaceForm]].

## Negative Logic (Prohibited Paths)

- ❌ A theme never replaces an uploaded photograph; an empty choice returns to the category default.

## Referenced by

[[src/_MOC]]
