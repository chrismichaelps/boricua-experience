---
type: grammar
language: CSS
tags: [grammar]
---

# Grammar — Styles

One stylesheet built from tokens; light theme first, dark through `prefers-color-scheme`.

## Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--color-ocean` | `#1878ec` | search submission, links, selected accents, promotional tiles |
| `--color-white` | `#ffffff` | primary surfaces |
| `--color-cloud` | `#f6f6f6` | muted cards and footer regions |
| `--color-mist` | `#ededed` | secondary bands |
| `--color-divider` | `#d9d9d9` | 1px borders and field separators |
| `--color-ink` | `#111111` | headings and values |
| `--color-graphite` | `#606060` | secondary text (contrast 6.3:1 on white) |
| `--color-placeholder` | `#767676` | placeholders (raised from the reference grey to meet 4.5:1) |

Type: Nunito Sans 400/600/700/800 — 14/20 links, 16/24 body and navigation, 20/28 section
headings, 24/32 card headings, 32/40 app headings. Spacing on a 4 px base. Radii: cards 16, images
32, pills and buttons fully round, compact controls 12, inputs 0 inside the shared search pill.

## Laws

- No drop shadows on cards or promotional tiles; separation is tone, 1px dividers, and radius.
- The ocean blue is never a page background.
- Touch targets at least 44 px; focus is a visible 2 px ocean ring.
- Motion respects `prefers-reduced-motion`.

## Referenced by

[[grammar/_MOC]] · [[subsystems/Presentation]]
