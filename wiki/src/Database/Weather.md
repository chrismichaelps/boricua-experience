---
type: module
fidelity: Active
layer: Database
tags: [module, database, weather, plans, trips]
---

# Database.Weather

## Purpose
The forecast and official alerts where activities happen, free and with a cost that does not grow with
visitors: about 78 forecast requests an hour and one alerts request every ten minutes for the whole island.

## Sources
The National Weather Service (public domain, no key): the hourly forecast of each town's 2.5 km grid
cell (office SJU, cells resolved once from town centers and kept as data) and the active alerts for
Puerto Rico, matched to towns by their county codes.

## Algorithm
Private migrations `20261014200000_town_weather` and `20261014200100_weather_alerts`. A job every five
minutes reads the answers that arrived, then asks for what is due.
- A town is asked again only when its forecast has expired (the service's Expires header); towns without
  activities in the next two days only every three hours.
- Each request carries the issue time already held (If-Modified-Since): an unchanged forecast answers 304
  with no body.
- A forecast whose next 48 hours did not change is not written (a fingerprint is compared).
- Failures back off (45 minutes after "too many requests" or "unavailable", growing waits otherwise); one
  malformed answer never blocks the others; raw answers are deleted once read.
- "Feels like" is the service's heat index from temperature and humidity.
- `island_weather()` answers one document: the next 48 hours per town as [°F, feels like °F, rain %, sky]
  and the alerts in force with their towns. Forecasts older than six hours are left out. The app serves it
  at `/api/weather` cached 15 minutes at the edge, so a million visitors cost what one does.

## Presentation
[[src/Public/Weather]]. Activity cards say whether the activity is outdoors, so warnings only reach the
plans the weather can spoil; the assistant reads the same document for the activities it recommends.

## Referenced by
[[src/_MOC]] · [[src/View/Pages/Trip]] · [[src/Database/Plans]]

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.
