---
type: module
fidelity: Active
tags: [module, browser, test]
---
# Account menu regression harness

## Purpose
Exercise accountMenu with event-boundary doubles, ensuring phone scroll lock always follows native disclosure state.

## Interface
`node scripts/account-menu-test.mjs` (included in scripts/test.sh).

## Algorithm
Open/dismiss repeatedly; verify close button, document Escape, outside tap, orientation changes, pagehide and pageshow. Explicit dismissal restores summary focus.

## Negative Logic
No network mutations, fake hardware claims or implementation-only string assertions.

## Edge Cases
Coalesced native toggle, focus outside details, phone/desktop transition, cached-page restoration.

## Grill Log
- **Q:** Which failure matters? **A:** A closed disclosure must never retain the phone scroll lock, even before its asynchronous toggle event fires. Resolved.

## Referenced by
[[src/Public/AccountMenu]] · [[src/_MOC]] · [[handoffs/homepage-refresh]]
