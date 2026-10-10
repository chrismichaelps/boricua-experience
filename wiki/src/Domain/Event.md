---
type: module
path: "@root/src/Domain/Event.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: DEEP
tags: [module, domain, deep]
---

# Domain.Event

> /** @Domain.Event.Projections — events as listings and as a page */

## Purpose

The card (listing projection), the page of cards, and the full detail with organizer, attendees, revealed location, and the viewer's relation.

## Interface

### Signatures

```pudu
export type Card = { id, slug, title, summary, category: CategoryRef, municipality: TownRef, venueName, startsAt, endsAt, priceCents, joinPolicy, visibility, status, capacity: Option[Int], approvedCount, savedCount, likeCount, coverUrl, lat, lng, distanceM, organizerName, pendingCount }
export type Page = { items: Array[Card], next: Option[Str] }
export type Organizer, Attendee, Attendees, Viewer
export type Detail = { card: Card, description, source, sourceUrl, organizer, attendees, region, addressLine, instructions, exactLat, exactLng, locationRevealed, isFull, spotsLeft, viewer, updatedAt }
export fn decodeDetail(json: &Json.Json) -> Result[Detail, Json.DecodeError]
export fn isFree(card: &Card) -> Bool
export fn needsApproval(card: &Card) -> Bool
export fn isCancelled(card: &Card) -> Bool
export fn seatsLeft(card: &Card) -> Option[Int]
```

### Linkage

- **Requires:** `Std.Json`.
- **Consumed by:** [[src/Api/Events]], [[src/Services/Discovery]], [[src/Services/Events]], views.

## Algorithm

Card and detail fields arrive in one object; `decodeDetail` decodes the card and a private wire type from the same JSON and joins them.

## Negative Logic (Prohibited Paths)

- ❌ A card never carries the exact location; only `Detail` does, and only when revealed.

## Edge Cases

- Missing like counts default to 0.

## Depth

DEEP: every listing and event page reads these types; the wire names stay here.

## Grill Log

- **Q:** Nest the card inside the detail on the wire?
  **A:** No: the database merges objects; decoding twice from one object keeps the SQL simple.

## Referenced by

[[src/_MOC]]

## Expiry Grill Log

- **Q:** How does the page know an event is over?
  **A:** `hasEnded(card, nowMillis)` is true when the job marked it `ended`, or when its end time has passed before the job ran. It takes the moment as an argument so views stay testable. Resolved.
