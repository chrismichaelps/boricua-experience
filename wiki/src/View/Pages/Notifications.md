---
type: module
path: "@root/src/View/Pages/Notifications.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Notifications

> /** @View.Pages.Notifications.Inbox — what happened to the member's requests and events */

## Purpose

Notifications with kind icons, decision notes, and mark-all-read.

## Interface

### Signatures

```pudu
export fn render(frame, notes) -> Html.Html
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

## Inbox redesign Grill Log

- **Q:** How does a row read?
  **A:** A short headline (“You're in”, “Ana wants to join”, “Coming up · Today · 7:30 PM”) over the activity title, the organizer's note as a message bubble, and a compact relative time (`5 min`, `3 h`, `Yesterday`, a weekday, a date) with an unread dot. A join request leads with the requester's initials; other kinds lead with a tinted squircle icon. Rows group into Today, This week, and Earlier. Resolved.
