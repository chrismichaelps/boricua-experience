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
- **Next stop** shows the distance and a drive estimate (at the chosen route's own pace), "almost there"
  near it, and, once the trip is under way, a note when the visitor is far from the route.
- **Ways to the next stop**: the fastest road route and, where they exist, another route that really
  differs, a route without expressways and, for close stops, walking ([[src/Database/Plans]]). The
  chosen one is drawn in blue and the others in grey; tapping either chooses. "Directions" hands the
  next stop to the phone's own maps app, by car or on foot.
- **Arrival**: a stop counts as reached within 450 m of its public point (public points are snapped to a
  grid of about 550 m); "I'm here" and "Skip stop" cover poor reception. For a signed-in member the
  position is sent once per stop so the server can confirm it, and is never stored; confirmed stops and
  completed trips feed the trip achievements ([[src/Database/Achievements]]). Unconfirmed arrivals are
  retried every 30 seconds while the visitor stays at the stop.
- Progress and route choices are kept in the browser for the day, so a reload resumes the trip.
- Map tools (3D and compass; turn arrows only with a pointer) sit in one narrow column, and the camera
  keeps that edge clear so the route is never drawn under them. On phones the tab bar steps aside.

## Referenced by

[[src/View/Pages/Plan]] · [[src/Domain/Plan]] · [[src/_MOC]]
