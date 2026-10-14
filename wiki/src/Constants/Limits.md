---
type: module
path: "@root/src/Constants/Limits.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Constants
depth_status: SHALLOW
tags: [module, constants]
---

# Constants.Limits

> /** @Constants.Limits.Bounds — sizes, counts, and windows */

## Purpose

Field lengths matching the database checks, page sizes, radii, token refresh margin, cache lifetime, and body size.

## Interface

Integer constants grouped by event fields, account fields, listings, location, sessions, and transport.

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

- **Q:** Duplicate the database limits here? **A:** Yes: validation answers in the visitor's language before a round trip; the database stays the final authority.

## Referenced by

[[src/_MOC]]

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.
