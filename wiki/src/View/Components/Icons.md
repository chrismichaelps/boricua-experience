---
type: module
path: "@root/src/View/Components/Icons.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Components.Icons

> /** @View.Components.Icons.Set — line icons drawn on a 24-pixel grid */

## Purpose

Pinned Lucide 0.468.0 line icons as inline SVG, hidden from assistive software; a const table of path data.

## Interface

### Signatures

```pudu
export fn icon(name) -> H.Node
export fn sized(name, size) -> H.Node
export fn has(name) -> Bool
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

## Provenance and Grill
ISC licensed Lucide static geometry, circle/rect/line converted exactly into path primitives for existing renderer. 24px grid, rounded joins, 2px strokes; existing names remain mapped. No model-generated icon geometry. Resolved.

## Streaming contract Grill Log
- **Q:** Where does streaming run? **A:** Node supplies a narrow SSE adapter and calls a body-HMAC protected Pudu bridge for authenticated preparation/tools. Pudu still checks origin, CSRF, active/onboarded member and atomic quota. Only the adapter reads provider credentials; the browser receives public sources and text. Permission policy permits microphone on this origin for explicit editable dictation. Deployment budget120s, adapter total deadline90s and browser95s; cancellation reaches every upstream fetch. Resolved.

## Curated publication Grill Log · #42
Resolved: Add the pinned Lucide crown geometry to the existing 24px rounded line-icon registry.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; no third-party brand artwork or hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.
