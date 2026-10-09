---
type: module
path: "@root/src/Utils/Money.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Utils
depth_status: MEDIUM
tags: [module, utils, medium]
---

# Utils.Money

> /** @Utils.Money.Dollars — prices written and read in US dollars */

## Purpose

Writes prices from cents and reads price fields into cents.

## Interface

### Signatures

```pudu
export fn dollars(cents: Int) -> Str
export fn parseCents(text: Str) -> Option[Int]
```

### Linkage

- **Requires:** `Std.Text`, `Std.Option`.
- **Consumed by:** [[src/I18n/Format]], [[src/Validation/EventForm]].

## Algorithm

`dollars` writes whole dollars with thousands grouped and cents only when present. `parseCents` strips `$` and commas, accepts up to two decimals, and treats an empty field as free.

## Negative Logic (Prohibited Paths)

- ❌ No floating point: amounts are integers of cents throughout.

## Edge Cases

- `1.005` and negative amounts are refused.

## Depth

MEDIUM.

## Grill Log

- **Q:** Store prices as decimals?
  **A:** Integers of cents end to end, matching the database column. _Rejected:_ `Decimal` on the wire (more parsing for no gain).

## Referenced by

[[src/_MOC]]
