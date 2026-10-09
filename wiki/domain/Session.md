---
type: domain
tags: [domain]
---

# Session

- **Definition:** the identity provider's access and refresh tokens for a member, with the account
  id, email, provider, and expiry, sealed into one cookie.
- Refreshed when fewer than 60 seconds of the access token remain; a refresh that fails ends the
  session.

## Referenced by

[[domain/_MOC]] · [[subsystems/Identity]] · [[src/Domain/Session]]
