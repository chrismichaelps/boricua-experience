---
type: seam
capacity: CRITICAL
lifecycle: CRITICAL
drift_score: 0
drift_status: HEALTHY
production_adapters: 1
tags: [seam, critical]
---

# Platform (seam)

The same router answers both adapters: [[src/Function]] reads platform invocations through
[[src/Web/Platform]]; [[src/Main]] serves a socket for development. Nothing below `Web/` knows
which one is running.

## Referenced by

[[seams/_MOC]] · [[decisions/ADR-0006-lambda-runtime]]
