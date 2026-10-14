---
type: module
fidelity: Active
tags: [module, test, achievements]
---
# Achievement regression tests
## Purpose and interface
`test/View/AchievementsTest.pudu` checks board decoding, secret/seasonal handling, edition years, category/unlocked filters, public tile/detail markup, localized dates, capped progress and bounded safe signals.
## Fixtures and edge cases
The existing JSON board is test-only. Secret locked titles remain absent. Seasonal unlocks keep past editions while reporting current edition progress. Invalid signal names and oversized keys are excluded; request batches cap20 signals.
## Resolved Grill Log
Only pinned formatter normalization is applied for the release gate. Expected behavior, assertion count and fixture meanings do not change. Full suite verifies output and failure boundaries.
## Referenced by
[[src/_MOC]] · [[src/View/Pages/Achievements]] · [[src/Database/Achievements]]
