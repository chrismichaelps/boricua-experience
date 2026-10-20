---
type: module
path: "@root/src/View/Pages/PlaceForm.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view]
---

# View.Pages.PlaceForm

> /** @View.Pages.PlaceForm.Publishing — choosing what to publish, and the form of a place adapted to its category */

## Purpose

The publishing chooser and the place form.

## Interface

### Signatures

```pudu
export type Mode = Creating | Editing(Str)
export fn chooser, render
```

### Linkage

- **Requires:** [[src/View/Components/Facts]].
- **Consumed by:** [[src/Web/Handlers/Places]].

## Algorithm

The chooser lists every category with only the kinds it takes, its default first. The form shows the profile's facts for the selected category and a week of two opening ranges per day.

## Negative Logic (Prohibited Paths)

- ❌ Only categories that take places are offered in the place form.

## Referenced by

[[src/_MOC]]

## Hours pickers
Each opening-hours time input declares `data-form-time` (placeholder) and `data-picker-close`, so FormDates turns it into a 30-minute picker; empty still means closed.

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.
