---
type: module
fidelity: Active
tags: [module, browser, i18n]
---

# Public.BrowserMessages

## Purpose
Localized ES/EN browser interaction feedback in public/assets/js/constants/messages.js.

## Interface
message(key) selects the current document language and falls back to Spanish.

## Algorithm
Stable UI keys map to localized descriptions, including separate location lookup, approximate fix, denial, unsupported device, timeout and map failure states.

## Negative Logic
Contains interface copy only; no business records or credentials.

## Edge Cases
An unavailable OS location fix explains retry/manual selection without promising hardware availability.

## Depth
Single browser translation boundary.

## Grill Log
Resolved: location failures need distinct actionable inline copy rather than a generic toast; both languages expose equivalent recovery.

## Referenced by
[[src/_MOC]] · [[src/Public/EventMaps]]

## Map recovery Grill Log
Resolved: bilingual private/live status and actionable device-location failure guidance. No fabricated position.

## Unknown event facts Grill Log · #51
Resolved: nullable prices/end retain explicit unknown state; known free/paid and dates regressions stay covered. No1970 null-date coercion. Unknown schedule24-hour discovery cutoff is separate from actual end. Boundary, malformed input, bilingual output and provider projections need focused tests.

## Unknown temporal facts Grill Log · #51
Resolved: end=null never coerces to1970; schedule shows start plus localized unknown-end text. Browser and provider never claim ongoing without known end. Provider instruction preserves unknown price/end and keeps source cutoff separate.

## Asset graph46 · #51
Resolved: first-party import identities and worker cache advance together to46 for nullable schedule/price rendering. Public code changes are limited to LocalTime, BrowserMessages, AssistantStream and Explorer; other browser modules only change dependency identities. No private data enters precache.
