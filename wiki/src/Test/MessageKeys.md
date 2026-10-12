---
type: module
fidelity: Active
tags: [module, test, i18n]
---
# MessageKeys
## Purpose
scripts/message-keys.sh writes the message-key fixture consumed by bilingual translation tests.
## Algorithm
Scan statically named interface keys and include the complete menu/assistant catalog families used dynamically. Exclude incomplete family prefixes while retaining actual declared keys, including hyphenated menu tags.
## Negative Logic
No silent removal of missing interface keys or generated user content.
## Grill Log
Resolved: menu dietary, allergen and status keys are built dynamically in views, so enumerate their actual Spanish catalog keys and verify English parity through the existing test. Regeneration is deterministic and fixture-only.
## Referenced by
[[src/_MOC]] · [[src/Test/Presentation]]
