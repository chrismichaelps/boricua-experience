---
type: module
path: "@root/src/View/Layout.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Layout

> /** @View.Layout.Shell — the document every page is rendered inside */

## Purpose

The document shell: head tags (icons, manifest, font preload, stylesheet, module script, CSRF meta), app bar with language switch and account, main, footer, mobile tab bar, cookie banner, toast, and live badge.

## Interface

### Signatures

```pudu
export type Section = Explore | MapView | Create | Activity | Me | Elsewhere
export fn page(frame, meta, section, content) -> Html.Html
export fn canAct(member) -> Bool
```

### Linkage

- **Requires:** `Std.Html.Build`, [[src/View/Frame]], [[src/View/Components/Footer]], [[src/I18n/Translate]], Domain types.
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

- **Q:** How do the app-style search controls preserve filtering?
  **A:** Native named selects remain the submission source and no-script fallback. Progressive picker dialogs expose a searchable municipality list and existing date windows with translated labels, keyboard dismissal and focus restoration. Pill submission retains category, free, sort and coordinates. Version 7 refreshes entry/styles; unchanged carousel modules keep their version 3 imports.

- **Q:** How does the lower homepage use the reference without copying its content?
  **A:** Spacious activity cards, local destination tiles and a collapsible full municipality directory preserve discovery routes. The footer has Boricua discovery, towns, participation and legal links; no invented social accounts or copied third-party product copy. Generated destination imagery is disclosed in both locales. Mobile search gives the date enough width.

- **Q:** How does the reference-inspired refresh preserve behaviour?
  **A:** Only the root Explore page gets app-home; root failure pages retain the standard header; results share Explore without inheriting the hero header. The brand uses a local cursive font and cotorra silhouette.


- **Q:** Templates or values?
  **A:** Values: a page is an `Html` tree, so escaping cannot be forgotten and pages are testable with fixtures.

## Referenced by

[[src/_MOC]]

## Parrot/privacy continuation
Use original cotorra puertorriqueña SVG assets and optional Motion privacy disclosure without changing native checkbox submission. Grill: local assets and progressive enhancement preserve behavior; resolved.

## Brand refresh contract
Original compact parrot replaces the former mascot. Brand asset URLs use shared version20; changed entry/styles/Motion refresh together while unchanged map imports retain their single version19 identity. Grill: named links and native search semantics are preserved; resolved.

## Inbox badge

The bell's count sits on its shoulder as a 16 px pill with a white ring; it is hidden on the inbox itself, which marks everything shown as read.

## Account menu Grill Log

- **Q:** What does the avatar do?
  **A:** It opens the account menu instead of loading the account page; see [[src/Public/AccountMenu]]. Members get a header linking to their public profile, then notifications (with count), activities, create, account and settings, language (current value), sign out, and the policy links. Guests get sign in and create account first. Resolved.

## Colored identity Grill Log
- **Q:** Which menu identity is shown? **A:** The mobile sheet reuses the same versioned green/red parrot and wordmark as the main header and footer. Resolved.

## Assistant integration Grill Log
- **Q:** What changes here? **A:** Integrate the bounded assistant contract while preserving existing routes, source escaping, session guards and optional reduced-motion enhancement. Server credentials remain secret; browser cache graph advances together. Resolved.

## Bilingual action Grill Log
Resolved: both header and menu language POST forms include Form.token(frame), matching existing authenticated CSRF guards. Guests keep an empty token; no guard is relaxed.

## Explicit location lifecycle Grill Log
Resolved: nearby lookup stays private; initial acquisition uses the bounded accurate/balanced fallback. Fresh readings alone enable the sharing badge. No storage restores sharing; hiding or leaving stops it. Epochs reject stale callbacks and serialized writes prevent a late update undoing stop. Map controls expose purpose/status in both languages; the map omits the assistant.

## Full-width search Grill Log · #36
Resolved: explicit app-search body class on the open search route gives its shell8px viewport insets like home. Hero fills shell; remaining search rails retain1200px reading measure. Category/town pages keep their standard shells. Responsive hero image advertises100vw. Cache graph advances atomically to42; no filter/navigation changes.

## Resolved feedback Grill Log · #45
Existing script initializes optional password/submit feedback; document semantics and source metadata remain server-rendered. Resolved.

## Menu reader Grill Log · #69
Resolved: Load versioned menu.css after existing styles; no script or private cache change.

## Home-only assistant Grill Log · #86
Resolved: Render the assistant only when frame.path is the root homepage and section is Explore. Exclude search, category/town, account, auth, map, publishing, detail and root error shells at server rendering, rather than hiding their launcher with CSS.
