---
type: module
path: "@root/src/I18n/EnLegal.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.EnLegal

> /** @I18n.EnLegal.Catalog — English text of the policies and the about page */

## Purpose

English counterpart of [[src/I18n/EsLegal]].

## Interface

### Signatures

```pudu
export const MESSAGES: Map[Str, Str]
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/I18n/Translate]].

## Algorithm

Const map.

## Negative Logic (Prohibited Paths)

- ❌ Not legal advice.

## Edge Cases

- Parity is tested.

## Depth

SHALLOW.

## Grill Log

- **Q:** Translate legal text literally?
  **A:** Meaning first, kept parallel section by section.

## Referenced by

[[src/_MOC]]

## Rewrite

Sections now match [[src/View/Pages/Legal]]: terms (16), privacy (13), cookies (6), each with a summary; texts are prose, not lists.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.
