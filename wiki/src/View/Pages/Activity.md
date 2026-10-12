---
type: module
path: "@root/src/View/Pages/Activity.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Activity

> /** @View.Pages.Activity.Mine — requests, saved events, and organized events */

## Purpose

Three sections with in-page tabs and statuses.

## Interface

### Signatures

```pudu
export fn render(frame, activity) -> Html.Html
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

## Expired organizer control Grill Log
Resolved: ended/canceled organizer cards retain their detail link but replace the pending-request action with the existing translated final-state message. No activity record is deleted.

## Curated boundary Grill Log · #42
Resolved: Upcoming curated publications show the official-source label instead of pending-request management; ended/canceled labels and native pending-request links remain unchanged.

## Nullable schedule rendering Grill Log · #51
Resolved: refreshed sheet data-ends normalizes null to empty; LocalTime treats malformed ends as unknown. Organizing activity final-state text uses archived when actual end unknown, retaining cancellation precedence. Test actual date renderer with null-end sheet data and bilingual archived output.
