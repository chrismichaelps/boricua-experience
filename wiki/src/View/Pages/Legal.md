---
type: module
path: "@root/src/View/Pages/Legal.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Legal

> /** @View.Pages.Legal.Policies — terms, privacy, cookies, and about */

## Purpose

Policy pages built from section keys, with the version line and a cookie-choice reset on the cookie page.

## Interface

### Signatures

```pudu
export type Document = Terms | Privacy | Cookies | About
export fn render(frame, document) -> Html.Html
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

## Policy document Grill Log

- **Q:** How do the policies read now?
  **A:** As documents. Each has a version and effective date, an “In short” summary, a contents list (sticky beside the text on desktop) linking to numbered sections, and prose paragraphs in a 680 px reading measure. No contact address is published; contact runs through reports and account settings. Resolved.
- **Q:** How are the texts kept in sync with the product?
  **A:** Every claim names a feature that exists: neutral age screen, address reveal on approval, attendee-list opt-out, live location audience and 30-day history, “Near me” positions not stored, providers (Supabase, Vercel, Google, OpenFreeMap), each cookie by name, data export and deletion. The minors sections follow adult-only community platforms: accounts 18+, family activities only with a guardian who holds the account, no collection of minors' data, “Involves minors” reports reviewed first, deletion within 30 days, and immediately for under 13. Puerto Rico's age of majority (21) is addressed in eligibility. Resolved.

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** Cookie reset POST carries the session token and expires consent before returning to the policy page. Resolved.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.
