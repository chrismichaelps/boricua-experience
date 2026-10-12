---
type: module
path: "@root/src/Domain/Draft.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: MEDIUM
tags: [module, domain, medium]
---

# Domain.Draft

> /** @Domain.Draft.EventForm — an event as an organizer writes it */

## Purpose

The publishing form's raw values, the validated values sent to the database, and the published result.

## Interface

### Signatures

```pudu
export type Draft = { title, summary, description, instructions, category, municipality, venueName, addressLine, lat, lng, startsAt, endsAt, visibility, joinPolicy, capacity, price } (all Str)
export type Ready = { ... lat: Float64, lng: Float64, startsAt required UTC timestamp, endsAt optional UTC timestamp, capacity: Option[Int], priceCents: Option[Int] }
export type Published = { id: Str, slug: Str }
export fn blank() -> Draft
export fn fromDetail(detail: &Event.Detail) -> Draft
export const VISIBILITIES, JOIN_POLICIES: Array[Str]
```

### Linkage

- **Requires:** [[src/Domain/Event]], [[src/Utils/Time]].
- **Consumed by:** [[src/Validation/EventForm]], [[src/Services/Events]], [[src/View/Pages/EventForm]].

## Algorithm

`fromDetail` fills the edit form from an event, converting timestamps to `datetime-local` values and cents to a price.

## Negative Logic (Prohibited Paths)

- ❌ `Ready` is produced only by validation.

## Edge Cases

- An edit form of an event without revealed coordinates falls back to the card's point.

## Depth

MEDIUM: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Keep raw strings in the draft?
  **A:** Yes: a refused form re-renders exactly what was typed.

## Referenced by

[[src/_MOC]]

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.
