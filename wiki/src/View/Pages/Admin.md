---
type: module
path: "@root/src/View/Pages/Admin.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Admin

> /** @View.Pages.Admin.Dashboard — platform counts and the moderation queue */

## Purpose

Metric tiles and open reports with dismiss and act.

## Interface

### Signatures

```pudu
export fn render(frame, dashboard) -> Html.Html
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

## Formatting baseline Grill Log · #88
Resolved: pinned0.1.3 formatting only; preserve imports, literals, control flow, authorization and output. Validate the token-preserving diff independently before commit.
