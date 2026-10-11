---
type: module
path: "@root/src/View/Components/People.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Components.People

> /** @View.Components.People.Faces — the organizer card and who is going */

## Purpose

Organizer card with tenure and hosting record; attendee list honouring [[decisions/ADR-0007-attendee-visibility]].

## Interface

### Signatures

```pudu
export fn organizer(frame, host, curated) -> H.Node
export fn attendees(frame, going, signInHref) -> H.Node
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

## Curated publication Grill Log · #42
Resolved: The existing curated argument selects Published by rather than Hosted by and suppresses hosting statistics for curated records.
