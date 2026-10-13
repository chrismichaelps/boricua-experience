---
type: module
fidelity: Active
tags: [module, presentation]
---

# ExperienceStyles

## Purpose

Shared typography, auth composition, fields and signed-in page surfaces in experience.css.

## Interface

Versioned stylesheet loaded after existing styles by Layout.

## Algorithm

Auth has a photographic aside on desktop and a concise mobile form. Email/password comes first; curved monochrome brand has transparent cutouts and contrast on each background. Touch targets stay 44px.

## Negative Logic

No secret data, persistent animation loops, hidden unenhanced content or new remote runtime dependencies.

## Edge Cases

Reduced motion, interrupted transitions, unsupported enhancement, keyboard focus, narrow screens, no scripts and returning cached clients.

## Depth

MEDIUM: progressive presentation; vendor is an external library boundary.

## Grill Log

- **Q:** What keeps this change bounded?
  **A:** Auth has a photographic aside on desktop and a concise mobile form. Email/password comes first; curved monochrome brand has transparent cutouts and contrast on each background. Touch targets stay 44px.

## Referenced by

[[src/_MOC]] · [[subsystems/Presentation]] · [[handoffs/homepage-refresh]]

- **Q:** How does the map sheet remain useful?
  **A:** Compact horizontal cards keep image, price and event metadata together. Blue selected markers match the app. A labeled sheet button works with touch and keyboard; controls and attribution remain reachable.

Desktop map canvas begins at 392px beside the list, preserving its full viewport for the island and price markers.

Auth grid explicitly stretches items: inherited place-items:center otherwise collapses the absolutely positioned story photo to zero width. Desktop screenshot verifies the photo and form side by side.

Expanded mobile sheet switches the strip to vertical rows so max-height grows to the intended 76% and its expansion control corresponds to visible layout.

Blue count circles declutter overview maps and retain keyboard focus rings without modifying MapLibre positioning transforms.

## Resolved follow-up Grill Log

- **Q:** What contract fixes the reported gap?
  **A:** At widths below 1000px, the real photo fills the rounded auth container, with a readable white form panel inside it. The decorative desktop story copy is hidden on mobile, but its image remains rendered behind the form. Header is the sole brand mark. Registration grows naturally and scrolls without clipping consent controls. Resolved.

- **Q:** Why were zoom buttons opening a card? **A:** The mobile sheet physically covered the MapLibre control coordinates. Move controls above the reserved sheet area, keep a fixed sheet footprint for empty/results states, and provide 44px zoom buttons. Resolved.

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Keep native touch scrolling and safe-area spacing, avoid visual hover feedback on coarse-pointer phones, increase sheet handle to 44px, and preserve clear pressed/focus states without replacing native controls. Resolved.

## Parrot/privacy continuation
Use original cotorra puertorriqueña SVG assets and optional Motion privacy disclosure without changing native checkbox submission. Grill: local assets and progressive enhancement preserve behavior; resolved.

## Assistant integration Grill Log
- **Q:** What changes here? **A:** Integrate the bounded assistant contract while preserving existing routes, source escaping, session guards and optional reduced-motion enhancement. Server credentials remain secret; browser cache graph advances together. Resolved.

## Activity grid Grill Log
Resolved: activity cover and text occupy explicitly constrained grid tracks with min-width0. Cover width is100%, a fixed128px height on wide rows and image remains inside overflow-hidden media. Compact rows use one column through1039px, two thereafter; long titles/labels wrap and flags stack below price within narrow covers.

## Cover containment regression
Resolved: activity grids explicitly constrain link width, image max-width and the desktop media track. Direct children receive explicit grid positions on wide rows; mobile uses one zero-minimum track. Browser measurements at phone, tablet and desktop widths must show no cover/text intersection or horizontal overflow.

## Location controls Grill Log
Resolved: compact expandable purpose help and live status fit narrow map viewports without covering the whole map.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.

## Shared field focus and policy labels Grill Log · #39
Resolved: search segments own one neutral2px inset focus indication; nested inputs/triggers do not add rings. Standard/picker fields use stronger neutral borders and a single focus stroke, with visible keyboard focus retained. Policy pages display effective dates without version numbers; internal agreement/version checks remain unchanged. Asset graph43 advances together.

## Resolved feedback Grill Log · #45
Password visibility targets44px; guidance meter neutral/ocean palette. Busy submitters preserve labels, show inline spinner and reduced-motion static state; no layout shift. Resolved.

## Compact map sheet Grill Log · #88
Resolved: desktop sheet begins16px below map top instead of84px; explicit auto-sized handle/filter/count/notice tracks and one minmax scrolling list track eliminate expanding heading gaps. Phone retains swipe/two snap states. Desktop date/category use paired44px bordered controls with free/list actions below; phone uses one horizontally scrolling44px control row. All controls use consistent14px corners. Preserve cards and map viewport reservation; verify scaled desktop and narrow phone.

Track refinement: explicit child grid-row placement keeps the scrolling list in the final minmax track even when the desktop handle or empty limit notice is hidden. Hidden rows collapse without assigning spare height to count/filters. Resolved.

Short-phone refinement: mobile filters use one horizontally scrollable44px row instead of stacking; a shared bounded sheet footprint reserves at least260px where space allows and leaves112px of map. Zoom controls use the same footprint for collapsed/expanded states. Desktop retains paired controls. Verify short phone and keyboard/no-script fallback. Resolved.

## Discovery surfaces Grill Log · #88
Resolved: Map expansion uses an8px inset rounded container like the home hero. Hide only the existing sheet in expanded mode; restore previous state on close/Escape, keep zoom controls clear. Three-dot loader reflects real map/data work and respects reduced motion.
