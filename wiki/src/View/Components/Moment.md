---
type: module
path: "@root/src/View/Components/Moment.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: SHALLOW
tags: [module, view, time]
---

# View.Components.Moment

> /** @View.Components.Moment.Time — dates and times as `<time>` elements the browser rewrites in the reader's zone */

## Purpose

Wraps the server's Puerto Rico date text in a `<time datetime>` element that carries the instant and a style name (`when`, `schedule`, `day`), so [[src/Public/LocalTime]] can re-render it in the reader's own zone.

## Interface

### Signatures

```pudu
export fn when(frame: &Frame.Frame, startsAt: Str, endsAt: Str, now: &StdTime.Instant) -> H.Node
export fn schedule(frame: &Frame.Frame, startsAt: Str, endsAt: Str) -> H.Node
export fn day(frame: &Frame.Frame, at: Str) -> H.Node
```

### Linkage

- **Requires:** `Std.Html.Build`, [[src/I18n/Dates]], [[src/Utils/Time]], [[src/View/Frame]].
- **Consumed by:** [[src/View/Components/EventCard]], [[src/View/Pages/Event]].

## Algorithm

The element's text is the Puerto Rico rendering from [[src/I18n/Dates]]; `datetime` holds the start instant and `data-ends` the end. Without scripts, or for readers in Puerto Rico's zone, the text stands unchanged.

## Negative Logic (Prohibited Paths)

- ❌ No time zone guessing on the server: the reader's zone is known only to the browser.
- ❌ No empty `<time>`: an unparseable instant renders nothing.

## Edge Cases

Readers in Puerto Rico, readers whose date differs from Puerto Rico's, events crossing midnight, unreadable timestamps, pages without scripts.

## Grill Log

- **Q:** Why keep the server text at all? **A:** It is the no-script fallback, the text crawlers index, and exactly right for most readers, who are in Puerto Rico. Resolved.
- **Q:** Why not send the zone in a cookie? **A:** The first page would still be wrong, and the CDN would need a cache key per zone. Resolved.

## Referenced by

[[src/_MOC]] · [[src/Public/LocalTime]]
