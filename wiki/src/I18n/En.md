---
type: module
path: "@root/src/I18n/En.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.En

> /** @I18n.En.Catalog — English text of every message key */

## Purpose

The English catalogue.

## Interface

### Signatures

```pudu
export const MESSAGES: Map[Str, Str]
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/I18n/Translate]].

## Algorithm

A const map folded at compile time.

## Negative Logic (Prohibited Paths)

- ❌ No markup in values.

## Edge Cases

- Missing keys fall back to Spanish.

## Depth

SHALLOW.

## Grill Log

- **Q:** How is motion added without making basic flows fragile?
  **A:** Local pinned Motion 14.1.0 loads through an optional feature. Page/card entry, button feedback and picker transitions respect reduced motion and settle on page hide. No CSS hides content before enhancement. Picker exit has a bounded fallback and never delays filter submission. Authentication retains email/password contracts; curved cotorra and official Google assets remain local.

- **Q:** How do the app-style search controls preserve filtering?
  **A:** Native named selects remain the submission source and no-script fallback. Progressive picker dialogs expose a searchable municipality list and existing date windows with translated labels, keyboard dismissal and focus restoration. Pill submission retains category, free, sort and coordinates. Version 7 refreshes entry/styles; unchanged carousel modules keep their version 3 imports.

- **Q:** How does the lower homepage use the reference without copying its content?
  **A:** Spacious activity cards, local destination tiles and a collapsible full municipality directory preserve discovery routes. The footer has Boricua discovery, towns, participation and legal links; no invented social accounts or copied third-party product copy. Real destination photography is credited in both locales. Mobile search gives the date enough width.

- **Q:** How is the hero carousel integrated?
  **A:** [[src/View/Components/Hero]] owns the fixed search surface and four scene controls. [[src/Public/Carousel]] rotates local images and captions. New controls have Spanish/English labels; asset version 3 refreshes cached scripts and styles.


- **Q:** Complete parity with Spanish?
  **A:** Yes; a test compares the key sets.

## Referenced by

[[src/_MOC]]

- **Q:** What footer copy changes?
  **A:** Expand the island activity/community description, replace the obsolete imagery statement with photography credits, and name the map sheet toggle. Spanish parity is required.

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.

## Assistant integration Grill Log
- **Q:** What changes here? **A:** Integrate the bounded assistant contract while preserving existing routes, source escaping, session guards and optional reduced-motion enhancement. Server credentials remain secret; browser cache graph advances together. Resolved.

Readout has translated Stop audio and playback-error states; pressed state follows actual speech lifecycle. Resolved.

## Explicit location lifecycle Grill Log
Resolved: nearby lookup stays private; initial acquisition uses the bounded accurate/balanced fallback. Fresh readings alone enable the sharing badge. No storage restores sharing; hiding or leaving stops it. Epochs reject stale callbacks and serialized writes prevent a late update undoing stop. Map controls expose purpose/status in both languages; the map omits the assistant.
