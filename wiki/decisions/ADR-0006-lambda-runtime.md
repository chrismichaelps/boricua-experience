---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0006 — Lambda runtime

## Decision

The production function is [[src/Function]] built with `pudu build --runtime` onto the release's
`pudu-musl-lambda-x86_64`, carried with its musl loader and libraries, under the `provided.al2023`
runtime. Static assets are served by the CDN; everything else routes to the function.

## Referenced by

[[decisions/_MOC]] · [[seams/Platform]]
