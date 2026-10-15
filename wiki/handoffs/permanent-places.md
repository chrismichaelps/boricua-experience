---
type: handoff
tags: [handoff, places, map]
---
# Permanent place discovery

Issue #120. Architect → Implementer: own shopping catalogue/profile and bounded map RPC, typed place-map adapter and mediator, discovery/map rendering, category pin icons and focused regressions. Preserve concurrent work and existing location behavior. Independent review follows before applying migrations or release. Production data belongs to the business administrator and remains in ignored source-reviewed CSV; no franchise ownership or verified badge is inferred.

Exact next action: finish coordinate/boundary validation and review the additive catalogue/spatial migration.

## Verification
Independent source/wiki review is clear after fixing nearby origins, mixed-kind identity and cached dependency versions. Development rollback tests pass61→60 limit/limited, hidden/removed omission, invalid bounds/origin/radius, off-island reads, category facts and anonymous/member access. Both projects have identical map_places function hash2284c9189f0f3c3e55126daa7ebf646f and ACLs. Production import verified112published places under the business administrator and no seed users/events; private CSV remains ignored. Full suite18/18,654assertions and all browser harnesses pass. Codex browser1280px confirms44px shopping pin, selection/card link and no overflow;390px follows the pin card to the correct place detail without overflow. Whole-tree formatter has an existing unrelated import-order warning in Services/Plans.pudu; this task leaves that baseline untouched.

Exact next action: publish the reviewed app build and verify the actual production branch pins.
