---
type: architecture
tags: [architecture, security]
---

# Security

| Threat | Control | Where |
| --- | --- | --- |
| Reading another account's data | Database functions authorize from the verified token; tables are unreachable directly | [[grammar/database-api]] |
| Stolen or edited session cookie | Tokens sealed with an authenticated cipher under a server key; `HttpOnly`, `Secure`, `SameSite=Lax` | [[src/Services/Auth/Sealer]] |
| Cross-site request forgery | State changes require `POST`, a same-origin `Origin` or `Referer`, and a per-session form token | [[src/Web/Guard]] |
| Script injection | Pages are values; request and database text is escaped; a strict content security policy | [[src/Web/Respond]] |
| OAuth code interception | PKCE with S256; the verifier lives only in a sealed cookie | [[src/Services/Auth/Pkce]] |
| Location exposure | Exact positions only to their owner or, by choice, to approved co-participants during the event window | [[subsystems/Location]] |
| Abuse | Database throttles (events per hour, position writes) and validation before every call | [[src/Validation/_MOC]] |
| Secrets in logs | Settings hold secrets as `Secret.Secret`; logs never carry tokens, query strings, or bodies | [[src/App/Logging]] |
| Minors | 18+ age gate at sign-up and onboarding; members cannot act until onboarded | [[subsystems/Identity]] |

## Referenced by

[[architecture/_MOC]]
