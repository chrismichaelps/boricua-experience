---
type: module
path: "@root/src/View/Pages/Auth.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Auth

> /** @View.Pages.Auth.Identity — signing in, signing up, recovering, and onboarding */

## Purpose

Sign-in, sign-up with the three confirmations, check-your-email, recovery, new password, and welcome pages.

## Interface

### Signatures

```pudu
export type Typed
export fn signIn, signUp, checkEmail, recover, reset, welcome
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

- **Q:** How is motion added without making basic flows fragile?
  **A:** Local pinned Motion 14.1.0 loads through an optional feature. Page/card entry, button feedback and picker transitions respect reduced motion and settle on page hide. No CSS hides content before enhancement. Picker exit has a bounded fallback and never delays filter submission. Authentication retains email/password contracts; curved cotorra and official Google assets remain local.

- **Q:** Templates or values?
  **A:** Values: a page is an `Html` tree, so escaping cannot be forgotten and pages are testable with fixtures.

## Referenced by

[[src/_MOC]]

Real destination assets now use `*-photo.webp`; location and licenses are recorded in [[src/Public/Photographs]]. Generated scene assets are removed.

## Resolved follow-up Grill Log

- **Q:** What contract fixes the reported gap?
  **A:** Remove duplicate auth-brand markup from the shared identity form shell; retain global header brand, all field names, return target and consent requirements. Mobile photo is the surrounding container; desktop stays two columns. Resolved.
