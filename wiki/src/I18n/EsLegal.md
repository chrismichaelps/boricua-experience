---
type: module
path: "@root/src/I18n/EsLegal.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.EsLegal

> /** @I18n.EsLegal.Catalog — Spanish text of the policies and the about page */

## Purpose

Spanish terms, privacy policy, cookie policy, and about page, section by section.

## Interface

### Signatures

```pudu
export const MESSAGES: Map[Str, Str]
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/I18n/Translate]].

## Algorithm

Const map; paragraphs separated by blank lines.

## Negative Logic (Prohibited Paths)

- ❌ Not legal advice: review by counsel before launch.

## Edge Cases

- Paragraph breaks are `\n\n`.

## Depth

SHALLOW.

## Grill Log

- **Q:** Why separate from the interface catalogue?
  **A:** Size and audience: policies change on a different schedule and are read by different reviewers.

## Referenced by

[[src/_MOC]]

## Rewrite

Sections now match [[src/View/Pages/Legal]]: terms (16), privacy (13), cookies (6), each with a summary; texts are prose, not lists.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.

## Shared field focus and policy labels Grill Log · #39
Resolved: search segments own one neutral2px inset focus indication; nested inputs/triggers do not add rings. Standard/picker fields use stronger neutral borders and a single focus stroke, with visible keyboard focus retained. Policy pages display effective dates without version numbers; internal agreement/version checks remain unchanged. Asset graph43 advances together.
