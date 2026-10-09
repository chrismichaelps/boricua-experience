---
type: subsystem
tags: [subsystem]
---

# Location

Off by default. A tap starts the browser's position watch; the page shows a "live" indicator and a
moving marker, refreshes nearby events as the member moves, and posts the position at most every
15 seconds and only after 25 m of movement. Turning it off, hiding the page, or signing out stops
the watch and clears the live row. See [[domain/LivePosition]] and
[[decisions/ADR-0004-location-privacy]].

## Referenced by

[[subsystems/_MOC]] · [[grammar/browser]] · [[seams/MapTiles]]
