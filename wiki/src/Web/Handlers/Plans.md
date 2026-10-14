---
type: module
fidelity: Active
tags: [module, web, plans]
---
# Plans handlers
## Purpose and interface
`src/Web/Handlers/Plans.pudu` registers plans, shared-plan calendar, public route/route-options/weather, trip page and signed arrival routes. Public pages use catalog-validated town coordinates or bounded location query; remembered mode is a preference cookie.
## Algorithm
Plans build typed requests through the mediator. Shared slugs are bounded before fetching. Calendar returns private ICS; route/weather responses use explicit public shared-cache contracts. Trip with no stops is missing. Arrival is a member action and validates its body before database confirmation; positions are not retained.
## Failure and edge cases
Invalid/missing town shows choices; missing shared plans return404. Dependency errors normalize through Respond.problem. No arbitrary SQL or browser-supplied category catalogs.
## Resolved Grill Log
This release's edit is pinned formatter whitespace/import order only. Existing auth/cache/same-origin boundaries are preserved; full tests and source check validate them. Browser trip and plan flows remain exercised.
## Referenced by
[[src/_MOC]] · [[src/View/Pages/Plan]] · [[src/View/Pages/Trip]] · [[src/Database/Plans]]
