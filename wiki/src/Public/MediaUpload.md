---
type: module
fidelity: Active
tags: [module, media]
---
# MediaUpload
## Purpose
Re-encodes photographs to at most 1600 px WebP (dropping metadata), declares the upload, PUTs the file to the signed address with no overwrite, and asks the server to verify.
## Algorithm
Specific refusal messages come from the server code or field key; oversize files are refused before any request.
## Negative Logic
No file goes to the site function; no upsert.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]
