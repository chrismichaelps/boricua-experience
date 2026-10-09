---
type: subsystem
tags: [subsystem]
---

# Identity

Sign-up asks for name, email, password, and three confirmations (18+, terms, privacy), recorded at
creation. Google sign-in uses PKCE and lands new members on onboarding for the same confirmations.
Sessions are sealed cookies refreshed on demand ([[decisions/ADR-0003-sealed-session-cookie]]).
Password recovery and change apply to email accounts only.

## Referenced by

[[subsystems/_MOC]] · [[seams/IdentityProvider]] · [[architecture/SECURITY]]
