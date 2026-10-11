---
type: module
path: "@root/src/View/Components/EventCard.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Components.EventCard

> /** @View.Components.EventCard.Listing — an event as a card and cards as rails and grids */

## Purpose

The event card (cover, price, policy flag, time line, title, place, going, likes, seats, distance), sideways rails, and grids.

## Interface

### Signatures

```pudu
export fn coverOf, card, rail, grid
```

### Linkage

- **Requires:** `Std.Html.Build`, [[src/View/Frame]], [[src/I18n/Translate]], Domain types.
- **Consumed by:** Web handlers and other views.

## Algorithm

Builds `Html` values with the trait chain; text from requests or the database goes through `says`, never `raw`.

## Negative Logic (Prohibited Paths)

- ❌ No service calls: a view renders what it is given.
- ❌ No inline scripts; behaviour attaches by `data-feature`.

## Edge Cases

- Every interactive control has a visible label or `aria-label`; touch targets are at least 44 px.

## Depth

MEDIUM.

## Grill Log

- **Q:** Templates or values?
  **A:** Values: a page is an `Html` tree, so escaping cannot be forgotten and pages are testable with fixtures.

## Referenced by

[[src/_MOC]]

## Ended activity Grill Log
Resolved: `Event.hasEnded(event, frame.nowMillis)` replaces seat availability with a translated ended flag immediately at the deadline, including before cron persists status. Canceled state takes priority; expired approval badges and availability claims are suppressed.

Canceled cards also suppress remaining-seat claims. Resolved: capacity is a live participation affordance, not valid for a final activity.
