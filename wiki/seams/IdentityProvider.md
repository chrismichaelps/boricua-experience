---
type: seam
capacity: CRITICAL
lifecycle: CRITICAL
drift_score: 0
drift_status: HEALTHY
production_adapters: 1
tags: [seam, critical]
---

# IdentityProvider (seam)

Email and password, Google with PKCE, refresh, recovery, password change, sign-out, and
administrative deletion, through [[src/Api/Supabase/Identity]] and [[src/Api/Supabase/Identity]]. The
server never sees a Google credential.

## Referenced by

[[seams/_MOC]] · [[subsystems/Identity]]
