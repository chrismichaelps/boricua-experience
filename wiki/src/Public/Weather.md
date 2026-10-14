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
