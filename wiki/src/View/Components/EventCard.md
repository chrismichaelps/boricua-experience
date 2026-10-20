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

## Curated publication Grill Log · #42
Resolved: Curated cards label official-source publication instead of local attendance and omit seat availability and approval flags.

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Consistent card copy Grill Log · #124
Resolved: standard rail/search cards keep a shared13rem copy track, matching cover proportions and title/metadata alignment. Long text remains present in a native vertical scroll area rather than clipped; page scroll can chain at its boundaries. The focusable card link supports Arrow/Page keys for overflow without extra nested tab stops; directional keys are intercepted only when the body can scroll that direction. A single delegated listener covers initial and asynchronously inserted cards. Horizontal activity rows keep their distinct128px copy/media tracks on wide screens. Map cards remain compact and unaffected. Place article uses card-venue rather than the paragraph-only card-place class to avoid inherited flex/ellipsis rules.

## Compact discovery supersession · #136
Resolved: discovery grids and rails now use smaller photos and natural-height fully visible copy, superseding #124’s13rem internally scrolling track. Delegated keyboard overflow support remains available for specialized organizer contexts; map cards keep their existing composition. See [[handoffs/community-forum]].


## Unknown admission placement · #171 — resolved Grill Log
Unknown admission remains explicit bilingual text but belongs in ordinary card metadata, not an image overlay that wraps over narrow map thumbnails. Only actual known amounts, including explicit zero/free, use the compact photo badge. Preserve category/photo images, source attribution, dates, navigation and accessibility text. Shared server-rendered markup covers initial and refreshed map cards as well as rails/grids/organizer lists; no CSS or database contract changes. Rendered regressions distinguish None from Some(0) and positive amounts.
