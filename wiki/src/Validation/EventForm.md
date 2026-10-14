---
type: module
path: "@root/src/Validation/EventForm.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Validation
depth_status: DEEP
tags: [module, validation, deep]
---

# Validation.EventForm

> /** @Validation.EventForm.Publishing — an organizer's draft checked and converted */

## Purpose

Checks every publishing field and converts the draft into database values: coordinates, UTC timestamps, capacity, and cents.

## Interface

### Signatures

```pudu
export fn check(draft: &Draft.Draft) -> Result[Draft.Ready, Problem.Problem]
```

### Linkage

- **Requires:** [[src/Validation/Check]], [[src/Domain/Draft]], [[src/Utils/Geo]], [[src/Utils/Money]], [[src/Utils/Time]], [[src/Constants/Limits]].
- **Consumed by:** [[src/Services/Events]].

## Algorithm

Lengths from [[src/Constants/Limits]]; the pin must parse and lie in Puerto Rico; start and end parse as Puerto Rico time, end after start, at most 14 days; private implies approval; capacity empty or 1–100000; price empty or a valid amount.

## Negative Logic (Prohibited Paths)

- ❌ No check that the start is in the future: the database refuses events starting over an hour ago, and an organizer may fix a running event.

## Edge Cases

- Empty capacity is unlimited; empty price is unknown.

## Depth

DEEP.

## Grill Log

- **Q:** Validate again in the database?
  **A:** Yes: the database is the authority; this layer answers in the visitor's language before a round trip.

## Referenced by

[[src/_MOC]]

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.
