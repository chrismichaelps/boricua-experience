---
type: module
fidelity: Active
tags: [module, media]
---
# Validation.Media
## Purpose
Checks a declared upload (kind, type, size, label) and compares the stored file's leading bytes with its declared type.
## Algorithm
`request` refuses with `media.*` keys on the `file` field; `signatureMatches` reuses the photo signatures and adds `%PDF-`.
## Negative Logic
No trust in the browser's declared content type: verification reads the stored bytes.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]
