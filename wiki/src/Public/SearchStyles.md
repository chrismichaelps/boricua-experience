---
type: module
fidelity: Active
grammar: "[[grammar/styles]]"
tags: [module, presentation, search]
---

# SearchStyles

## Purpose

Search segments, option panels, query suggestions and responsive bottom sheets in public/assets/css/search.css.

## Interface

Loaded after home.css by [[src/View/Layout]], anonymously precached at asset version 7.

## Algorithm

Rounded white search pill with muted labels, separated segments and soft focus/hover highlights. Desktop has three columns from 700px; phone fields stack to preserve complete values. Dialog top-layer styles provide large option buttons, selected indicators and filtered lists.

## Negative Logic

Do not hide selects until JavaScript has successfully enhanced them. No clipped mobile values or controls beneath the fixed tab bar.

## Edge Cases

Keyboard focus, 320px screens, safe area, long municipality/date labels, reduced motion, missing JavaScript.

## Depth

MEDIUM: shared presentation boundary.

## Grill Log

- **Q:** How is progressive fallback visible?
  **A:** Only .picker-native enhanced selects are visually hidden; remaining native selects retain improved pill styling.
- **Q:** How does mobile resemble an app?
  **A:** Full-width segmented fields open an accessible bottom sheet, with a close control, search and large choices above the device safe area.

## Referenced by

[[src/_MOC]] · [[subsystems/Presentation]] · [[src/Public/SearchPickers]]

Independent review resolutions: Enter inside municipality search selects the first visible choice and never implicitly submits the surrounding form; empty results remain open. Default Soon is omitted to preserve server relevance for text searches. Keyboard-visible focus restores the segment outline.

Browser verification: first Escape closes the dialog even from a search input. Positioned field wrappers contain hidden select/label boxes so they cannot widen the mobile document.

## Discovery photo and footer Grill Log
Resolved: open search uses the first database-ordered featured scene, a local responsive real photograph and unchanged named filters. Category/town landing behavior stays intact. Empty scene catalogs render usable search without a broken image. Footer has current-year copyright, quiet grouped links and phone touch targets; eligibility policy is unchanged. Photograph source, CC BY2.0 attribution, resizing and crop are recorded in public credits and THIRD_PARTY_NOTICES.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.

## Full-width search Grill Log · #36
Resolved: explicit app-search body class on the open search route gives its shell8px viewport insets like home. Hero fills shell; remaining search rails retain1200px reading measure. Category/town pages keep their standard shells. Responsive hero image advertises100vw. Cache graph advances atomically to42; no filter/navigation changes.

## Shared field focus and policy labels Grill Log · #39
Resolved: search segments own one neutral2px inset focus indication; nested inputs/triggers do not add rings. Standard/picker fields use stronger neutral borders and a single focus stroke, with visible keyboard focus retained. Policy pages display effective dates without version numbers; internal agreement/version checks remain unchanged. Asset graph43 advances together.

## Date-range calendar Grill Log · #88
Resolved: add validated Dates(start,end) encoded YYYY-MM-DD..YYYY-MM-DD; reject malformed, impossible, reversed and over366-day spans. Inclusive end converts to following Puerto Rico midnight in existing from/to database arguments, without changing expiration or inventing availability. Preserve presets and canonical when URL across map/list/saved searches. Exact-date dialog uses semantic day buttons, roving keyboard focus, localized two-month desktop/one-month phone calendar, draft selection and explicit apply/clear. Escape cancels draft; existing select fallback remains functional. No Airbnb assets, popups or booking semantics.

## Discovery surfaces Grill Log · #88
Resolved: Use shared neutral option surfaces, selected borders and restrained pill focus across home/search/map and nearby selectors. Preserve labels/native submission, keyboard focus and44px controls.
