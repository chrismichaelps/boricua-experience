---
type: module
fidelity: Active
tags: [module, menus, presentation]
---
# MenuStyles
## Purpose
Responsive dedicated menu reader in public/assets/css/menu.css.
## Algorithm
Use existing brand colors, typography and rounded photo container. Compact dish rows separate description/labels from a non-shrinking price. Section navigation scrolls horizontally on phones; anchors account for the application header.
## Negative Logic
No fabricated imagery, gradients for empty food cards, narrow tap targets or unrelated palette.
## Grill Log
Resolved: this stylesheet is loaded through the versioned shell. No new motion dependency; browser carousel/upload integration follows later. Preserve visible keyboard focus and mobile overflow protection.
Resolved review: menu grids allow shrinking below their content width and headings wrap unbroken owner-provided names. Section chips scroll inside their own navigation rather than widening the document.
## Referenced by
[[src/_MOC]] · [[src/View/Layout]] · [[src/View/Pages/Menu]]
