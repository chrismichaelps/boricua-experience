# Card admission label · #171

Role: Architect → Implementer. Owns View/Components/EventCard, focused presentation regressions and matching mirrors. Preserve other work.

## Resolved Grill Log
The unknown-price sentence wraps into a large photo badge on map thumbnails. Move it to ordinary metadata; known prices and explicit free amounts retain image badges. Do not change the wording, price meaning, database, or broad card styling. Shared renderer covers every listing surface and map refreshes.

Next action: implement, independently review, run focused/full checks, then release and verify actual production map cards in both languages and viewport sizes.

## Referenced by
[[handoffs/_MOC]] · [[src/View/Components/EventCard]] · [[src/Test/Presentation]]

## Review and validation
Independent reviewer found no blocker: initial and refreshed map cards share the renderer; unknown text stays visible while known/free overlays are unchanged. Full21 suites/756 assertions and every JavaScript/timezone harness pass. Pinned formatting/source checks pass. Local phone map has no overflow but no unknown-price rows, so the actual visual regression check uses the production dataset after deployment.
