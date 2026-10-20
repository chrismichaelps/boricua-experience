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

## Age gate

See [[src/Validation/Account]] for the age gate contract this module takes part in.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.

## Resolved feedback Grill Log · #45
Signup renders required confirmation and is noindex; reset retains confirmation. Visibility and local strength guidance enhance signup/reset without changing consent or authentication. Resolved.

## Renewal page
`renewal(frame, returnTo, problem)` — the Terms summary, the two acceptance checkboxes linking both documents, "Accept and continue", and a sign-out link. The birth date fields declare `data-date-age` with `App.MINIMUM_AGE` so the calendar never offers an under-age date.

## Guest intent Grill Log · #148 — resolved
Sign-in/sign-up leads name a validated Resume intent (interested/going/like/join/review) found inside the return path. Hidden return fields retain the path verbatim; Google and cross-auth links URL-encode the whole path, preserving its query and fragment. Existing validation, consent and provider authentication remain authoritative. No action executes automatically after authentication.
