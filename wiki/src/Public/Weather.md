---
type: module
fidelity: Active
tags: [module, weather]
---

# Weather (page script)

One island document per page ([[src/Database/Weather]]) fills every weather slot.
- **Card** (activity page, the trip's next stop): a weather-app card with the sky moving behind a large
  temperature — drifting clouds, falling rain, lightning flashes, a sun glow by day and stars by night —
  the day's high and low, the hours around the activity, heat and official alerts. The scene is a few
  layers moved with transforms and opacity, and rests under reduced motion.
- **Line** (plan stops, trip stops): sky, temperature, feels like and rain chance when they matter.
- **Heat**: the weather service's heat index levels. Caution (80°F+) is most afternoons on the island and
  is not shown; extreme caution (90°F+) warns outdoor activities, danger (103°F+) and extreme danger
  (125°F+) warn everyone, each with what to do.
- **Alerts**: heat, floods (rivers and swimming holes), rip currents and surf (unguarded beaches), storms
  and hurricanes, named in the reader's language with advice and until when.

## Referenced by
[[src/_MOC]] · [[src/Database/Weather]]

## Visitor release browser correction · #107
Resolved: trip panel implicit rows use max-content so a forecast card cannot collapse into a strip under the mobile sheet height limit. The panel keeps independent scrolling and map framing; hourly rows remain readable on desktop. CSS/asset revision76. Real390px/1280px checks required.

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.

## Compact forecast and desktop map · #107
Compact card: main conditions and warnings stay visible; hours use native details/summary with bilingual label and closed initial state. Rebuilding a stop resets its optional forecast disclosure, while no forecast clears the slot. Resolved Grill Log: unknown rain is still an em dash, forecast facts stay database-backed, and only relevant sky layers animate.

Resolved refresh invariant: identical cached forecast document and unchanged town/time/outdoor/name do not rebuild the card. Preserve disclosure state, focus and animation phase across unrelated map updates; a different stop or forecast refresh rebuilds it. WeakMap state releases detached slots.
