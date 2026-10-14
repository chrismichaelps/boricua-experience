---
type: module
path: "@root/src/I18n/Format.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: MEDIUM
tags: [module, i18n, medium]
---

# I18n.Format

> /** @I18n.Format.Values — prices, counts, and distances written for a reader */

## Purpose

Price (free or dollars), going counts, seats left, distance, and category names.

## Interface

### Signatures

```pudu
export fn price, going, seats, distance, categoryName
```

### Linkage

- **Requires:** [[src/I18n/Translate]], [[src/Domain/Event]], [[src/Utils/Money]], [[src/Utils/Geo]].
- **Consumed by:** event cards and pages.

## Algorithm

Small compositions of translations with formatted values.

## Negative Logic (Prohibited Paths)

- ❌ No currency other than dollars.

## Edge Cases

- No capacity shows nothing for seats.

## Depth

MEDIUM.

## Grill Log

- **Q:** Show remaining seats always?
  **A:** Only when a capacity exists.

## Referenced by

[[src/_MOC]]

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Release formatter normalization · #107
Resolved Grill Log: pinned0.1.3 formatter normalizes existing whitespace/import order only; behavior and contracts remain unchanged. Full tests and formatter gate verify the release.
