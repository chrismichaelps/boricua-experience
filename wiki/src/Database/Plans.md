---
type: module
fidelity: Active
tags: [module, database, plans, routing]
---

# Plans (database)

## Purpose

Plans near a visitor in about 100–200 ms, with road travel between activities.

## Road network

Private migrations `20261014100000_road_graph` and `20261014100100_travel_legs`. The island's drivable
roads (about 225,000 segments split at junctions, travel seconds both ways from road class and posted
speed, one-way streets respected) are loaded from open map data by the private road-graph build. Each
upcoming public activity is tied to the junction nearest its listed position (blurred where approval
reveals the exact place). A job every 20 minutes runs one shortest-path pass over the part of the
network the pending pairs span and keeps, for every pair of activity junctions within 35 km, the road
time, distance and a simplified drawing of the route. Precomputing keeps the shortest-path work out of
page requests: loading the network costs seconds, a stored leg costs microseconds.

The first leg, from wherever the visitor stands, is estimated from the island's learned driving pace
(seconds per straight-line metre and the detour ratio, averaged over the stored legs).

## Plan building (`plan_outings`)

1. Up to 60 upcoming public activities within 30 km that fit the style and the window, nearest first,
   each scored for closeness, popularity (saves, attendees, likes, going and interested marks), the
   visitor's mode (local: free and community first; visitor: culture, beaches, outdoors, curated
   first) and, for "surprise me", a seeded random lift.
2. Each of the best eight reachable activities starts a chain. The next stop must be reachable by road
   after the current one ends (short activities are attended whole; long ones such as fairs are visited
   for up to two and a half hours), within half an hour of a short activity's start, with at most an
   hour and a half of waiting; it is chosen by score minus drive and wait, with a bonus for a new kind.
3. The same set of stops in another order is one plan; fuller plans first, then the best scored; three.

`plan_of` rebuilds a shared plan from its slugs; `plan_route` returns the stored route drawings per leg.

## Interest marks

Migration `20261014100200_activity_facts_interest`: `app.event_interest` (interested or going, one per
member and activity) with counts kept on the activity by trigger; `set_interest`. Activity facts
`duration_minutes`, `min_age`, `accessible`, `outdoor` with derived `is_outdoor`, `is_night`, `is_family`.

## Referenced by

[[src/Domain/Plan]] · [[CHANGELOG]]

## Grounded chat plans · #103 · Resolved Grill Log
Provider control tags are quarantined across chunk boundaries and retried within the existing budget, never displayed or executed as prose. Structured allowlisted calls remain authoritative. Public quick traits, places, itineraries and route results use typed database reads. Public map cards show supplied anchors and road geometry, explicitly label estimated travel and missing paths, and release maps on close/reset. No model coordinates, arbitrary SQL, fake data or paid fallback. Town routing is service-only, catalog-bounded, cached by directed town pair and transactionally locked; no per-user position is sent or stored. Every changed schema is verified in both environments.

## Trips and ways to a stop

Private migrations `20261014180100_trip_achievements` and `20261014180200_route_options`.

`record_trip_arrival` confirms a trip stop for a signed-in member: within 500 m of the activity's
public point or 400 m of its exact place, from two hours before it starts to two hours after it ends.
The position is compared and discarded. Reaching every stop of a plan within the same day's trip
completes it. At most 40 arrivals a day per member are considered.

`plan_route_options` answers, per leg, the fastest road route and, when they exist, another route that
shares less than 70% of its length with the fastest and takes at most 40% longer (routed again with
the fastest route's roads made 80% costlier), a route without expressways when the fastest uses them
(at most 80% longer), and walking for stops under 2 km apart. Options are worked out once per pair of
road junctions, on the part of the network around them (about half a second), and kept; a short lock
per pair and a ceiling of 40 pairs a minute across the site keep a crowd from routing at once, and the
answer is cached for five minutes at the edge. Options follow their legs in the nightly clean-up. No
public transport is offered: there is no timetable data to plan it honestly.

`approach_options(lat, lng, slug)` (private migration `20261014233000_approach_routes`) answers the same
choices from the junction nearest a rounded position to an activity: routed once per junction pair on the
part of the network around it (about 0.4–2.6 s, then about 80 ms), kept two days, at most 10 new routings
a minute across the site ("busy" beyond), never across water and never beyond 60 km.

## Plan styles as data Grill Log · #153
Resolved: styles are rows in `app.plan_styles` (categories, free_only, family, outdoor, names, icon, sort_order, active) instead of a CASE in `private.fits_style` and a fixed list in `plan_outings`. An activity fits when every set flag holds and, if the style names categories or outdoor, it is in one of them or outdoors; an unknown slug keeps everything, while `plan_outings` refuses any slug that is not an active row. The migration rewrites only the style check of the live `plan_outings` definition (`pg_get_functiondef` + replace, asserted) so the rest of its body cannot drift. `public.plan_styles()` is readable by anon; the catalog cache loads it, and the app falls back to the original five when it cannot. The planner remains rule-based: no model chooses stops.
