---
type: module
path: "@root/src/Constants/Codes.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Constants
depth_status: SHALLOW
tags: [module, constants]
---

# Constants.Codes

> /** @Constants.Codes.Problems — failure codes and their message keys */

## Purpose

Every failure code the database API or the server raises, and the translation key shown for it.

## Menu save Grill Log
Resolved: menu_changed has a named server constant and a conflict message that preserves the user's draft rather than overwriting newer content. Menu invalid/empty/unsupported/limit codes map to bilingual actionable messages. No database error body is exposed.

## Interface

`MESSAGES: Map[Str, Str]` code → key; one `Str` per code the server raises itself.

### Linkage

- **Requires:** nothing.
- **Consumed by:** modules of every higher layer that use these values.

## Algorithm

None: compile-time values only.

## Negative Logic (Prohibited Paths)

- ❌ No value computed from the environment or the clock.
- ❌ No literal of these values anywhere else in the source.

## Depth

SHALLOW by design: a table of names. Deletion test: the values scatter as literals.

## Grill Log

- **Q:** Show the database's message text? **A:** Never: it may change and is not translated. Codes are stable; keys are translated. Unknown codes show a generic message.

## Referenced by

[[src/_MOC]]

## Curated publication Grill Log · #42
Resolved: external_booking is a stable refusal mapped to the bilingual official-source explanation.
