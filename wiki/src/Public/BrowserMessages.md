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
