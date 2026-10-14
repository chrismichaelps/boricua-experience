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
