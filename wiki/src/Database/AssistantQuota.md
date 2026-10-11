---
type: module
fidelity: Active
layer: Database
tags: [module, assistant]
---

# Database.AssistantQuota

## Purpose
Atomic service-only member request quota.

## Interface
The bounded Database assistant contract, consumed by its adjacent application layer.

## Algorithm
RLS-enabled quota table without client privileges. Service-only RPC verifies active onboarded member; transaction lock serializes limits. Two requests/minute and ten/day; old windows replace counters without growing history.

## Negative Logic
No secrets in responses or logs; no arbitrary SQL; no paid model fallback.

## Edge Cases
Invalid input, unavailable provider/database, request quota, interrupted navigation, empty results, reduced motion and unsupported voice.

## Depth
Bounded subsystem responsibility.

## Grill Log
- **Q:** What is the resolved contract? **A:** RLS-enabled quota table without client privileges. Service-only RPC verifies active onboarded member; transaction lock serializes limits. Two requests/minute and ten/day; old windows replace counters without growing history. Resolved.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]

## Shared quota clock Grill Log
Resolved: global project2/minute7/day, member2/minute10/day, at most3 provider calls per reservation. Windows derive `clock_timestamp()` after acquiring the global transaction lock so old transactions cannot reset counters backwards across a minute/day boundary. Counters overwrite windows and member rows cascade on account deletion. Guests have no execution grant.
