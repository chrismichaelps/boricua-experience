---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0003 — Sealed session cookie

## Decision

Access token, refresh token, account id, email, provider, and expiry are encoded as JSON and sealed
with the standard library's authenticated cipher (`Std.Crypto.seal`, 32-byte key, 12-byte nonce) under `BORICUA_SESSION_KEY`, with a fresh nonce per
write. The cookie is `HttpOnly; Secure; SameSite=Lax; Path=/` and lasts 30 days. Forms carry a
token derived from the session (HMAC of the account id and refresh token) checked on every post.

## Rationale

Scripts cannot read tokens; a tampered cookie fails to open and is treated as signed out; no session
table to scale. Token validity is still decided by the database on every call.

## Alternatives

Server-side session table — rejected: a write per sign-in and a read per request for no added safety.

## Referenced by

[[decisions/_MOC]] · [[src/Services/Auth/Sealer]]
