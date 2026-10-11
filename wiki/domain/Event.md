---
type: domain
tags: [domain]
aliases: [Activity, Evento]
---

# Event

- **Definition:** an activity published by an [[domain/Organizer]] (or curated from a public source)
  with a category, municipality, venue, start and end, visibility, join policy, optional capacity,
  and price.
- **Visibility:** `public` (listed and searchable), `unlisted` (reachable by link only), `private`
  (by link only, always approval, location revealed only to approved attendees).
- **Join policy:** `open` approves every request while seats remain; `approval` waits for the
  organizer.
- **Status:** `published` or `cancelled`. A cancelled event stays readable and accepts no requests.
- **Location:** exact for the organizer and approved attendees; listings carry a point blurred to
  about 550 m unless the event is open and public.
- **Canonical name:** Event (Spanish UI: *actividad* / *evento*). **Not:** listing, post.

## Referenced by

[[domain/_MOC]] · [[domain/Card]] · [[subsystems/Publishing]] · [[src/Domain/Event]]

## Lifecycle

`draft` → `published` → `ended` (by [[decisions/ADR-0009-event-expiry]]) or `cancelled` (by the organizer). `ended` and `cancelled` are final.

## Curated publications · #42
Curated events are editorial publications owned by an administrator, not native bookings or claims that the curator is the producer. Only confirmed schedule/price records are imported; no invented capacity or copied images.
