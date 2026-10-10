---
type: module
path: "@root/src/Constants/Cookies.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Constants
depth_status: SHALLOW
tags: [module, constants]
---

# Constants.Cookies

> /** @Constants.Cookies.Names — cookie names and lifetimes */

## Purpose

The session, sign-in flow, language, consent, visitor, and flash cookie names and their lifetimes.

## Interface

`SESSION`, `FLOW`, `LOCALE`, `CONSENT`, `VISITOR`, `FLASH`; `SESSION_MAX_AGE` (30 days), `FLOW_MAX_AGE` (10 minutes), `PREFERENCE_MAX_AGE` (1 year), `FLASH_MAX_AGE`.

### Linkage

- **Requires:** nothing.
- **Consumed by:** modules of every higher layer that use these values.

## Algorithm

None: compile-time values only.

## Negative Logic (Prohibited Paths)

- ❌ No value computed from the environment or the clock.
- ❌ No literal of these values anywhere else in the source.

## Depth

SHALLOW by design: a table of names. Deletion test: the values scatter as literals.

## Grill Log

- **Q:** Are language and consent strictly necessary? **A:** Yes: they remember a choice the visitor made and carry no tracking. The visitor id exists only to attribute consent rows. _Rejected:_ asking consent for the consent cookie.

## Referenced by

[[src/_MOC]]

## Age gate

See [[src/Validation/Account]] for the age gate contract this module takes part in.
