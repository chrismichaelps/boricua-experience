---
type: module
fidelity: Active
tags: [module, database, search]
---
# QuickTraits
## Purpose and interface
Private migration20261014110000_quick_traits adds optional p_traits to search_events/map_events; existing omitted-argument callers remain compatible. Allowed family/night/outdoor/accessible combine with AND and retain existing audience, expiration, limits and grants.
## Organizer facts
Additive overloads of create_event/update_event require p_facts; wrappers validate explicit minimum age0–21 and confirmed step-free boolean, call unchanged legacy authorization/rate-limit functions and persist facts within one transaction under organizer ownership. Legacy overloads continue preserving fields. event_detail adds these fields after its existing audience guard.
## Negative logic
Unknown age never proves family suitability; unknown access never qualifies. No direct table grants, no altered auth/RLS, no production records changed by schema application. Migration remains ignored.
## Grill Log
Resolved: match development/production function definitions and ACLs; use rollback tests for malformed facts, create/edit roundtrip and non-owner refusal. Default-free new overload avoids PostgREST ambiguity; caller sends all existing named arguments plus p_facts.
## Referenced by
[[src/_MOC]] · [[src/Api/Events]] · [[src/Domain/Draft]]

## Series selection review
Resolved: trait-aware leads_series overload compares earlier occurrences satisfying the same trait intersection. Search/map bind the traits parameter to the existing bounded query; an earlier daytime or unstated-age occurrence cannot hide a matching later one. Null/empty traits keep existing series behavior.
