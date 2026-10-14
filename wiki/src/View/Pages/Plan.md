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
