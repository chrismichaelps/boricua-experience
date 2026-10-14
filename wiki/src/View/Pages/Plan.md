---
type: module
fidelity: Active
tags: [module, view, plans]
---

# Plan page

`src/View/Pages/Plan.pudu` with `public/assets/js/features/plan.js`. The choices (location button or
town, when, style, stops, local or visitor) fold under a one-line summary once plans are shown so the
plans come first on phones. Each plan shows numbered stops with arrive–leave times, the drive before
each, a map with the road route (dashed where only an estimate exists), and WhatsApp, share and calendar
actions. Any choice rebuilds the plans at once with the old ones dimmed while the next page loads; maps
draw as they scroll into view. Every plan map has a 3D switch: it tilts the whole route without
zooming into its middle, and the compass (turn arrows with a pointer) turns the camera; the tools sit in
a narrow column the route is framed to avoid. "Start trip" opens the plan as a live trip
([[src/View/Pages/Trip]]). The home page invites to plans right under the search chips with a plain card
like the chips around it.

## Referenced by

[[src/Domain/Plan]]

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.

## Regression evidence · #107
`test/View/PlanTest.pudu` now has40 assertions, including English titles in map, plan, trip and assistant projections. Original titles remain the fallback when translation is absent. Resolved Grill Log: no model-generated coordinates or daily hours are introduced by presentation.
