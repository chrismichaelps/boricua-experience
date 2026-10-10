---
type: module
path: "@root/src/Constants/Routes.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Constants
depth_status: SHALLOW
tags: [module, constants]
---

# Constants.Routes

> /** @Constants.Routes.Paths — every address the server answers */

## Purpose

Every page, action, JSON endpoint, and reference document path, and the prefixes used to build links.

## Interface

One `Str` constant per address; patterns use `:name` slots read by `Route.param`; `*_PREFIX` values build links.

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

- **Q:** English or Spanish paths? **A:** Short English paths with Spanish only where the word is the product (`/pueblo/`). Language is a cookie, not a path, so one URL serves both and canonical links stay single. _Rejected:_ duplicate `/es/` and `/en/` trees (double crawl budget for one audience).
- **Q:** Separate JSON routes for every toggle? **A:** No: forms post to the page routes and answer JSON when the request asks for it; only location and suggestions have dedicated JSON routes.

## Referenced by

[[src/_MOC]]

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Add API_MAP for the viewport read endpoint. Resolved.
