# Card admission label · #171

Role: Architect → Implementer. Owns View/Components/EventCard, focused presentation regressions and matching mirrors. Preserve other work.

## Resolved Grill Log
The unknown-price sentence wraps into a large photo badge on map thumbnails. Move it to ordinary metadata; known prices and explicit free amounts retain image badges. Do not change the wording, price meaning, database, or broad card styling. Shared renderer covers every listing surface and map refreshes.

Status: completed. Release 0.14.2 is live on production; map cards verified in both languages.

## Referenced by
[[handoffs/_MOC]] · [[src/View/Components/EventCard]] · [[src/Test/Presentation]]

## Review and validation
Independent reviewer found no blocker: initial and refreshed map cards share the renderer; unknown text stays visible while known/free overlays are unchanged. Full21 suites/756 assertions and every JavaScript/timezone harness pass. Pinned formatting/source checks pass. Local phone map has no overflow but no unknown-price rows, so the actual visual regression check uses the production dataset after deployment.

Release verification: production build edb421507d17 matches tagged main b8e5675. Map ?pueblo=carolina in ES/EN returned 26 cards, three unknown-admission notes in card details and no thumbnail overlays; function/static/local fingerprints match the tested artifact.


## Reopened dynamic-renderer gap · #183
Role: Architect → Implementer. Owns Map pin projection, Explorer sheet renderer, regression harness and cache revision. The earlier claim that refreshed cards share the server renderer was incorrect: Explorer builds fresh DOM after viewport queries. Fix that independent path with nullable price metadata and verify pan/zoom redraws. Independent review remains required.

Independent review #183: no blockers. Explorer and worker harnesses pass; full22 suites/773 assertions and all JavaScript/timezone harnesses pass. Codex browser desktop initial enhancement and zoom retain the unknown-admission note in card details. No schema migration needed.
