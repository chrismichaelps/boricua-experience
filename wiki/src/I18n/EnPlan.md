---
type: module
path: "@root/src/I18n/EnPlan.pudu"
fidelity: Active
tags: [module, i18n, plans]
---
# EnPlan
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

## Grounded chat plans · #103 · Resolved Grill Log
Provider control tags are quarantined across chunk boundaries and retried within the existing budget, never displayed or executed as prose. Structured allowlisted calls remain authoritative. Public quick traits, places, itineraries and route results use typed database reads. Public map cards show supplied anchors and road geometry, explicitly label estimated travel and missing paths, and release maps on close/reset. No model coordinates, arbitrary SQL, fake data or paid fallback. Town routing is service-only, catalog-bounded, cached by directed town pair and transactionally locked; no per-user position is sent or stored. Every changed schema is verified in both environments.

## Compact forecast and desktop map · #107
Resolved Grill Log: plan.weather_hourly labels the optional forecast disclosure; ES/EN keys remain identical.

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.
