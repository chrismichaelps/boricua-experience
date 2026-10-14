---
type: module
fidelity: Active
tags: [module, domain, plans]
---

# Plan

## Purpose

Ready-made outings near a visitor: two or three plans of nearby activities chained by real road time,
in a style (mixed, free, family, adventure, culture), for today, tomorrow or the weekend, ranked for a
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
