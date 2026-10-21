---
type: module
fidelity: Active
tags: [module, view, plans, trips]
---

# Trip page

`/plan/viaje?e=…`, opened with "Start trip" on any plan, on a shared plan or on a plan the assistant
drew. The page and its script follow the plan live.

- **Start** asks for the location once and follows the visitor: their position is a dot with a heading
  arrow while moving, the map recenters on them, and in 3D the camera turns with the direction of
  travel so the road ahead points up. Moving the map by hand stops following until "follow" is tapped.
  The screen is kept awake during the trip where the browser allows it.
- **Next stop** shows the road distance and time still ahead and the arrival time, "almost there" near
  it, and, once the trip is under way, a note when the visitor is far from the route.
- **Ways to the next stop**: the fastest road route and, where they exist, another route that really
  differs, a route without expressways and, for close stops, walking ([[src/Database/Plans]]). The
  chosen one is drawn in blue and the others in grey; tapping either chooses. "Directions" hands the
  next stop to the phone's own maps app, by car or on foot.
- **Live figures**: every fix is snapped onto each route's line, as navigation apps do; the distance is
  what is left along the road (plus the way back to it when away from it), and the time is the route's
  own pace blended 60/40 with the pace the visitor is actually driving on it, measured from their own
  fixes (bounded to half and two and a half times the route pace). The chips for every way update the
  same way. All of it runs on the phone: no request per position and nothing stored.
- **From where you are**: once the trip has a position, the way to the next stop starts at the visitor,
  not at the previous stop: the same choices (fastest, another real route, no expressways, walking when
  close) from the road junction nearest the visitor ([[src/Database/Plans]], `approach_options`). It is
  asked when the trip starts, when the next stop changes, and again only after two minutes away from the
  chosen way; the position is rounded to about 110 m and the answer is cached at the edge by it. Under
  load (more than 10 new routings a minute across the site) the trip keeps its straight-line estimate and
  the hand-off to the phone's maps app. Single-stop plans, the most common in production, now show a road
  route and its choices.
- **Arrival**: a stop counts as reached within 450 m of its public point (public points are snapped to a
  grid of about 550 m); "I'm here" and "Skip stop" cover poor reception. For a signed-in member the
  position is sent once per stop so the server can confirm it, and is never stored; confirmed stops and
  completed trips feed the trip achievements ([[src/Database/Achievements]]). Unconfirmed arrivals are
  retried every 30 seconds while the visitor stays at the stop.
- Progress and route choices are kept in the browser for the day, so a reload resumes the trip.
- Map tools (3D, the round drag compass and the full-screen expand, which keeps following the
  visitor while a trip is live) sit in one narrow column, and the camera
  keeps that edge clear so the route is never drawn under them. On phones the tab bar steps aside.

## Referenced by

[[src/View/Pages/Plan]] · [[src/Domain/Plan]] · [[src/_MOC]]

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.
