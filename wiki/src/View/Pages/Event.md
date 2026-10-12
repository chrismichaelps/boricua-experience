---
type: module
path: "@root/src/View/Pages/Event.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Event

> /** @View.Pages.Event.Detail — one event: what, when, where, who hosts, who goes, and how to join */

## Purpose

The event page: cover with share and save, heading, reactions, description, facts, place (revealed or locked), organizer, attendees, live arrivals, report, and the join panel for every state.

## Interface

### Signatures

```pudu
export fn render(frame, detail, problem) -> Html.Html
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

Resolved formatter maintenance: normalize indentation in the recurring-date list without changing tokens, rendering or behavior. The whole-tree formatter gate otherwise rejects the existing baseline.

- **Q:** Templates or values?
  **A:** Values: a page is an `Html` tree, so escaping cannot be forgotten and pages are testable with fixtures.

## Referenced by

[[src/_MOC]]

## Expiry

Only a public, published event that has not ended is indexable; ended and cancelled pages render for people with the link and carry `noindex`. See [[decisions/ADR-0009-event-expiry]].

## Curated publication Grill Log · #42
Resolved: Curated detail uses official-source booking, hides local attendance/live participation, names the publisher as curator and never claims native seats or approval. Ended/cancelled states precede source links; missing/unsafe links show a translated unavailable message.

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Reaction audiences Grill Log · #76
Resolved: guests see the like count as a sign-in link that returns to the activity; members can like or mark not interested; the organizer and everyone on a cancelled activity see only the count. Likes are social proof from other people and feed popularity, so self-likes are excluded. The database enforces the same rule ([[decisions/ADR-0005-reactions]]).
