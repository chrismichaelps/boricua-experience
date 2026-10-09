---
type: module
path: "@root/src/Services/Discovery.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: DEEP
tags: [module, services, deep]
---

# Services.Discovery

> /** @Services.Discovery.Feed — the home feed, search, suggestions, and the map */

## Purpose

The home rails read in parallel (recommended, next, this weekend, free this week), search with date windows in Puerto Rico time, typeahead suggestions, and map pins.

## Interface

### Signatures

```pudu
export type Home = { recommended, soon, weekend, free: Array[Event.Card] }
export fn bounds(window: &Search.When, now: &StdTime.Instant) -> (Str, Str)
export fn argumentsFor(filters: &Search.Filters, limit: Int, now: &StdTime.Instant) -> EventsApi.SearchArgs
export fn search(runtime, filters, token) -> Result[Event.Page, Problem.Problem]
export fn home(runtime, lat, lng, token) -> Result[Home, Problem.Problem]
export fn suggest(runtime, query: Str) -> Result[Array[Event.Card], Problem.Problem]
export fn pins(runtime, lat, lng, radiusM) -> Result[Array[Event.Card], Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Events]], [[src/Domain/Search]], [[src/Utils/Time]], `Std.Concurrent`.
- **Consumed by:** [[src/App/Handlers/Discover]].

## Algorithm

1. Windows: today, tomorrow, the weekend (Saturday through Sunday, from today when it is the weekend), seven days, a month; a window already begun starts twelve hours ago so running events stay listed.
2. `near` without a position falls back to `soon`; `relevant` without text falls back to `soon`.
3. Home runs four reads in parallel threads, each storing into its own cell.

## Negative Logic (Prohibited Paths)

- ❌ No ranking in the server: the database ranks.

## Edge Cases

- Measured: four rails in about 300 ms warm from a laptop.

## Depth

DEEP: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Parallel or sequential rails?
  **A:** Parallel: latency is the slowest call, not the sum.
- **Q:** Personalize rails other than recommendations?
  **A:** Not yet: they are shared and CDN-cacheable for guests.

## Referenced by

[[src/_MOC]]
