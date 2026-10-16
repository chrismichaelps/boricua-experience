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

## Unified form controls Grill Log · #88
Resolved: enhance canonical native selects through the shared dialog, retaining disabled options, validation, reset and category change events. Add single-date calendar mode with past-date and declared min/max support; date-time edits preserve the existing clock value. Birth dates permit historical year/month navigation; month-only reviews and opening-hour clocks keep native semantics with shared neutral styling. Checkboxes/radios/switches retain names and keyboard/disabled behavior. No new database contract or date inference.

## Radios and auth on small screens
Radios outside region chips are drawn as ink rings with a filled centre when checked, matching the checkbox style. Below 1000px the sign-in and sign-up pages are a plain full-width sheet: no photo behind the form and no floating card; the photo panel appears only beside the form on wide screens.

## Phone map
Below 700px the sheet is a rounded native-style panel (46% default, full height raised, eased height change) of full-width 4:3 photo cards with 28px gaps; filters are compact chips and the list link is hidden; map buttons are icon circles with visually hidden text; map overlays hide while the list is raised; the dark Map pill floats above the tab bar.

## Visitor release browser correction · #107
Resolved: trip panel implicit rows use max-content so a forecast card cannot collapse into a strip under the mobile sheet height limit. The panel keeps independent scrolling and map framing; hourly rows remain readable on desktop. CSS/asset revision76. Real390px/1280px checks required.

## Compact forecast and desktop map · #107
Compact weather: two-column temperature/condition header, smaller44px temperature, and native44px hourly disclosure closed initially. Daily range stays in the header; official alerts and relevant heat/rain advice are never hidden by disclosure. Animate only layers relevant to the active sky; clear-night stars cannot bleed into other skies. Reduced motion disables every scene animation. Resolved Grill Log: independent sheet scrolling preserves actions and natural-height content; details is keyboard operable on desktop/phone.

Resolved final asset contract · #107: compact forecast/disclosure and desktop map accessibility use entry/styles/worker77; changed Weather77 and Trip77 share one import identity. No private test scenario enters the build.


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; no third-party brand artwork or hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

## Expanded map interaction Grill Log · #124
Resolved: expanded pin activation keeps the map expanded and reveals only the selected existing card in a compact bottom panel; no hover popup. Empty-canvas click clears it. Reapply the selected item after bounded viewport redraw; omit previews no longer in the visible batch. Resize never refits or restarts geolocation. Control containers have no pointer hit area outside actual controls; canvas owns pan/pinch, including touches started on marker buttons. Circular rotation controls retain44px square geometry with no flex stretching. Preserve keyboard controls and reduced motion.

## Circular discovery joystick refinement · #124
Resolved user steering: the rotation group is one96px circular pad on desktop and phones. Two semantic left/right buttons occupy its side halves; a centered44px circular north button stays above them. The outer circle clips the halves and retains visible inset focus. Actions and compass bearing remain unchanged; no overlapping transparent rectangle extends outside the pad. This supersedes the horizontal pill/three44px row contract for the discovery map only.

## Compact joystick refinement · #124
Resolved user sizing: discovery rotation is one44px circular compass, equal to the map buttons. Hide the former side buttons only on discovery; pointer drag rotates continuously, tap resets north, Left/Right keys step rotation and Home resets. Capture one primary pointer, ignore secondary pointers, cancel safely, suppress a drag's synthetic reset click and detach location-follow on explicit rotation. Existing trip controls remain unchanged. Localized label explains drag and north action. This supersedes the96px pad.

## Consistent card copy Grill Log · #124
Resolved: standard rail/search cards keep a shared13rem copy track, matching cover proportions and title/metadata alignment. Long text remains present in a native vertical scroll area rather than clipped; page scroll can chain at its boundaries. The focusable card link supports Arrow/Page keys for overflow without extra nested tab stops; directional keys are intercepted only when the body can scroll that direction. A single delegated listener covers initial and asynchronously inserted cards. Horizontal activity rows keep their distinct128px copy/media tracks on wide screens. Map cards remain compact and unaffected. Place article uses card-venue rather than the paragraph-only card-place class to avoid inherited flex/ellipsis rules.

## Compact discovery cards · #136
Resolved: replace the fixed13rem internally scrolling copy area in discovery rails/grids with natural-height text. Use smaller photo/copy proportions,16px titles and compact gaps; preserve full titles, metadata, no-review/unknown-price truth and stretched rows. Desktop fits four cards at wide widths, tablets three/two and phones two grid columns with single-row horizontal rails. Map and organizer activity layouts retain their specialized geometry. No nested card scrolling or hidden title text.
