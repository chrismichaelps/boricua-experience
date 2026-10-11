---
type: module
fidelity: Active
tags: [module, vendor]
---

# Public.Marked

## Purpose
Pinned upstream Markdown lexer, served locally without a runtime CDN dependency.

## Interface
`public/assets/js/vendor/marked-18.1.0.js` exports `marked`. MIT license retained in `marked-LICENSE.md`. npm registry artifact18.1.0; SHA256054d73b676031dc8e60e247ef228044fbeebe10af14bac1a6e53852f80f826e5.

## Algorithm
Use only `marked.lexer` withGFM; [[src/Public/AssistantMarkdown]] owns safe DOM construction.

## Negative Logic
Never send lexer HTML output toinnerHTML. Do not hand-edit vendored code.

## Edge Cases
Library load failure leaves the launcher unavailable; normal app navigation remains functional.

## Depth
External dependency boundary.

## Grill Log
Resolved: official npm package is pinned and license preserved. The local allowlist renderer handles untrusted tokens independently.

## Referenced by
[[src/_MOC]] · [[src/Public/AssistantMarkdown]]
