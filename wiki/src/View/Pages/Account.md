---
type: module
path: "@root/src/View/Pages/Account.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Account

> /** @View.Pages.Account.Settings — profile, preferences, location, security, and data rights */

## Purpose

Profile form, preferences with switches and visibility choices, location history deletion, password change, export, pause, delete, and sign-out.

## Interface

### Signatures

```pudu
export fn render(frame, me, catalog, email, usesPassword, problem) -> Html.Html
```

### Linkage

- **Requires:** `Std.Html.Build`, [[src/View/Frame]], [[src/I18n/Translate]], Domain types.
- **Consumed by:** Web handlers and other views.

### Photo editor

The header photo carries a camera badge labelling a hidden file input; `avatarUpload.js` crops to a 320 px square, encodes WebP (JPEG where unsupported), posts JSON with the form token, and swaps the photo into the editor and the app bar. A remove link appears when there is a photo. Without scripts the initials remain.

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
