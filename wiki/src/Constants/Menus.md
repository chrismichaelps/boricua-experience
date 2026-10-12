---
type: module
path: "@root/src/Constants/Menus.pudu"
fidelity: Active
layer: Constants
tags: [module, menus]
---
# Constants.Menus
## Purpose
Menu API contract bounds and permitted publication, language and declaration values.
## Algorithm
Static constants match the reviewed database function:3menus,12sections,100dishes,80-character headings,120-character dish names,500-character descriptions,100-character price notes,100000-byte JSON and USD100000 cap. Dietary/allergen values are protocol enums, not fabricated business records.
## Grill Log
Resolved: one named contract prevents limits scattering across nested editor parsing, validation and views. New values require a matching database change before UI acceptance.
## Referenced by
[[src/_MOC]] · [[src/Validation/MenuForm]] · [[src/Database/Menus]]
