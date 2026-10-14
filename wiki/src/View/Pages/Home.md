---
type: module
path: "@root/src/View/Pages/Home.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Home

> /** @View.Pages.Home.Front — search first, then rails of what is happening */

## Purpose

Hero frame with the search pill, chips, rails (for you, weekend, soon, free), near-you and create tiles, and the municipality directory.

## Interface

### Signatures

```pudu
export fn render(frame, catalog, home) -> Html.Html
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

- **Q:** How does the lower homepage use the reference without copying its content?
  **A:** Spacious activity cards, local destination tiles and a collapsible full municipality directory preserve discovery routes. The footer has Boricua discovery, towns, participation and legal links; no invented social accounts or copied third-party product copy. All destination photos are real; public credits preserve attribution. Mobile search gives the date enough width.

- **Q:** How is the hero carousel integrated?
  **A:** [[src/View/Components/Hero]] owns the fixed search surface and four scene controls. [[src/Public/Carousel]] rotates local images and captions. New controls have Spanish/English labels; asset version 3 refreshes cached scripts and styles.


- **Q:** How does the reference-inspired refresh preserve behaviour?
  **A:** The full-width coastal hero contains the existing search form and a municipality link. Rails remain constrained to the reading shell.


- **Q:** Templates or values?
  **A:** Values: a page is an `Html` tree, so escaping cannot be forgotten and pages are testable with fixtures.

## Referenced by

[[src/_MOC]]

Real destination assets now use `*-photo.webp`; location and licenses are recorded in [[src/Public/Photographs]]. Generated scene assets are removed.

## Town browser Grill Log

- **Q:** Why replace the collapsible directory?
  **A:** A default disclosure triangle opening onto 78 thin links in columns read as an unfinished list. Seven region tabs over a grid of town rows (name and chevron, 52 px rows, four columns on desktop, three on tablet, two on phone) make every municipality reachable in at most two taps. Resolved.
- **Q:** How does it work before any script runs?
  **A:** Region tabs are native radio inputs inside a fieldset with a hidden legend; `:has(:checked)` reveals the matching panel. Arrow keys move between regions natively. The fieldset overrides its default `min-inline-size` so the tab strip scrolls instead of widening the page. Region order derives from `Domain.Catalog.regions(catalog)`; labels are the run-time `region.*` message family listed in `scripts/message-keys.sh`. Resolved.

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** Destination tiles use Catalog scenes and bilingual captions; region tabs derive from municipalities, first available region selected. Resolved.

## Discovery surfaces Grill Log · #88
Resolved: Render an aria-hidden layout skeleton only for root home; external readiness enhancement enables it while the first hero photo/font is pending, clears without an artificial delay and fails open. Enhance the nearby town/radius form with the same named-select picker as home/search/map.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.
