---
type: module
path: "@root/src/View/Components/Form.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Components.Form

> /** @View.Components.Form.Fields — labelled inputs with their errors */

## Purpose

Labelled inputs, text areas, selects, checkboxes, switches, the hidden form token, and the problem banner, wired with `aria-invalid` and `aria-describedby`.

## Interface

### Signatures

```pudu
export type Field
export fn field, token, input, area, select, checkbox, toggle, problemBanner
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

## Resolved feedback Grill Log · #45
Password inputs retain native names/autocomplete and render hidden progressive visibility buttons with localized labels. A local meter enhances new passwords; errors remain server-rendered. Resolved.

## Unified form controls Grill Log · #88
Resolved: enhance canonical native selects through the shared dialog, retaining disabled options, validation, reset and category change events. Add single-date calendar mode with past-date and declared min/max support; date-time edits preserve the existing clock value. Birth dates permit historical year/month navigation; month-only reviews and opening-hour clocks keep native semantics with shared neutral styling. Checkboxes/radios/switches retain names and keyboard/disabled behavior. No new database contract or date inference.
