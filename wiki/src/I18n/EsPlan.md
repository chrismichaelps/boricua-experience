---
type: module
path: "@root/src/I18n/EsPlan.pudu"
fidelity: Active
tags: [module, i18n, plans]
---
# EsPlan
## Purpose and interface
MESSAGES supplies localized plans, interest, quick filters and optional organizer age/access declarations. Shared translator composes the plan dictionary with existing catalogues.
## Algorithm
Static interface labels only; publication data stays database-backed.
## Negative logic and edge cases
Unknown facts never become claims; translate confirmation/unknown/error semantics in both languages.
## Grill Log
Resolved: quick chip labels and organizer facts have ES/EN parity and are included in the generated message-key fixture.
## Referenced by
[[src/_MOC]] · [[src/I18n/Translate]]
