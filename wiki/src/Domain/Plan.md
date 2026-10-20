---
type: module
fidelity: Active
tags: [module, domain, plans]
---

# Plan

## Purpose

Ready-made outings near a visitor: two or three plans of nearby activities chained by real road time,
in a catalog-defined style, for today, tomorrow or the weekend, ranked for a
local or a visitor.

## Interface

`src/Domain/Plan.pudu` (types, wire names, shared-link slugs), `src/Api/Plans.pudu`,
`src/Services/Plans.pudu`, `src/Web/Handlers/Plans.pudu`, [[src/View/Pages/Plan]].

## Algorithm

See [[src/Database/Plans]]. The page asks once per choice; a shared link (`/plan?e=slug,…`) rebuilds the
same plan from its activities in order, and `/plan/calendar.ics?e=…` downloads it as one calendar.

## Negative Logic

The visitor's position is never stored: it travels only in the page address and the one database call.
A shared link carries activity slugs, never a position.

## Edge Cases

No position or town: the page invites one. Nothing fits: the page says so and offers to explore.
Malformed slugs are dropped; at most six stops.

## Referenced by

[[src/_MOC]] · [[src/Database/Plans]]

## Dynamic styles Grill Log · #148 — resolved
Request.style is a string validated by `styleFrom(name, known)` against the current catalog slugs; unknown names fall back to `MIXED = "mixed"`. The old Style enum/STYLES/styleName interface is removed. Wire style values pass unchanged through Api.Plans. Catalog fallback is separate from the database's active-style validation.
