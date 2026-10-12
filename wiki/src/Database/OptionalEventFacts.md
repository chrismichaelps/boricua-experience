---
type: module
fidelity: Active
tags: [module, database]
---
# Database.OptionalEventFacts
## Purpose
Private migration admitting unknown price/end while keeping scheduled discovery finite.
## Interface
app.events.price_cents and ends_at nullable; starts_at required finite. discovery_until generated stored, indexed for published expiry. Existing RPC signatures/ACL/RLS remain unchanged. Card adds discovery_until.
## Algorithm
Known end authoritative. Otherwise exactly24 elapsed hours after start, calculated in UTC to remain immutable/indexable. All expiry/search/map/recommendation/count/join/live-window comparisons use cutoff. Free-only filter compares actual price0 and excludes null. Native writes preserve null. Finite dates and known after-start≤14days remain enforced. Expiry job marks ended internally; UI says archived when actual end unknown.
## Negative Logic
Never substitute0/free, invent an end, publish undated events, grant tables, modify quotas or use category-specific guessed durations.
## Edge Cases
Late-night/overnight/multi-day known end, explicitfree, unknown price, missing/malformed/infinite start/end, null-aware change notices, no-expiry gaps at cutoff, recurrence separate occurrences. Missing start remains blocked; if only date is known, time must be verified before publication. Long-running places require a separate catalog model.
## Grill Log
Resolved: a visibility cutoff is policy, not factual duration.24hours protects late-night discovery without keeping indefinite stale entries; actual late continuation requires verified end/update. Index cutoff for batch expiry; source evidence stays in private CSV. Apply reviewed migration to both projects and verify schema/function/permissions parity before releasing unknown entries.
## Referenced by
[[src/_MOC]] · [[seams/DatabaseApi]] · [[handoffs/homepage-refresh]]

Pending decisions also check status/cutoff under the event lock, closing the pre-job approval race. Preserve authorization and existing capacity guards.

Resolved review: decision reads lock event first, then re-read/lock request to prevent stale pending state from concurrent decisions; test duplicate decisions. No request→event lock inversion.

## Verification
Development rollback matrix passes null-native writes, free exclusion/inclusion, exactcutoff/search/map/admin, generated recomputation, missing/infinite/reversed/>14day rejection, cutoffjoin/decision, expiry and pendingwithdrawal. Real competing approve/reject calls preservefirstdecision and returnalready_decided tosecond; privatefixture removed. Both migrations applied to development/production;17 affected functions/ACL, nullable/generated fields and RLS match; no production seed rows.
