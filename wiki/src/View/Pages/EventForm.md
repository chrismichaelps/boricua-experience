---
type: module
path: "@root/src/View/Pages/EventForm.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.EventForm

> /** @View.Pages.EventForm.Publishing — the form that creates and edits an event */

## Purpose

The publishing form in sections with the map pin picker, choices for visibility and policy, and inline errors.

## Interface

### Signatures

```pudu
export type Mode = Creating | Editing(Str)
export fn render(frame, catalog, mode, draft, problem) -> Html.Html
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

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Start and end pickers
Both date-time fields declare `data-date-min="today"`: new activities cannot start in the past, and an edited one keeps its stored date reachable.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.
