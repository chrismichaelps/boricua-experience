---
type: module
path: "@root/src/Constants/App.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Constants
depth_status: SHALLOW
tags: [module, constants]
---

# Constants.App

> /** @Constants.App.Identity — names, versions, and fixed facts */

## Purpose

Product names, policy versions, the theme colour, Puerto Rico's UTC offset, the minimum age, the asset version, and the island's bounding box and map centre.

## Interface

`SITE_NAME`, `SHORT_NAME`, `TERMS_VERSION`, `PRIVACY_VERSION`, `COOKIE_POLICY_VERSION`, `THEME_COLOR`, `PUERTO_RICO_OFFSET_MINUTES` (-240), `MINIMUM_AGE` (18), `ASSET_VERSION`, `PRIVACY_EMAIL`, `BOUNDS_*`, `MAP_CENTER_*`.

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

- **Q:** Handle daylight saving? **A:** No: Puerto Rico observes Atlantic Standard Time all year, so a fixed offset is exact. _Rejected:_ a time-zone database (no Pudu support, no benefit).
- **Q:** Where does a policy version change? **A:** Here; members accepting an older version are asked again on onboarding. _Rejected:_ date-derived versions.

## Referenced by

[[src/_MOC]]
