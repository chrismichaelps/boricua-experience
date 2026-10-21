---
type: module
fidelity: Active
grammar: "[[grammar/pudu]]"
tags: [module, identity]
---

# Google

> `src/Api/Google.pudu` — Google sign-in run on the site's own address. Issue #177.

## Purpose
With the identity provider's own Google flow, Google redirects to the provider's project address, so the consent screen reads "continue to <project>.supabase.co" and shows the provider instead of the site. A custom provider domain is a paid add-on; this module keeps everything free by running the Google step here and handing Google's ID token to the provider.

## Interface
```pudu
export fn create(clientId: Str, clientSecret: Str) -> Result[Option[Google], Str]
export fn authorizeUrl(google: &Google, redirectUri: Str, challenge: Str, nonceHash: Str) -> Str
export fn exchange(google: &Google, code: Str, verifier: Str, redirectUri: Str) -> Result[Str, Problem.Problem]
```
`Api.Supabase.Identity.idTokenGrant(gateway, "google", idToken, nonce)` turns the ID token into the provider's session tokens.

## Algorithm
1. `Accounts.startProvider("google")` with `runtime.google` set makes a flow with purpose `google`, sends the visitor to Google with the PKCE S256 challenge, `redirect_uri = <site>/auth/google/callback`, scopes `openid email profile` and `nonce = sha256Hex(raw)`, where `raw = challenge("nonce:" + verifier)`.
2. `/auth/google/callback` shares the sign-in callback handler; `Accounts.finish` sees the purpose, exchanges the code with Google (verifier, client secret, same redirect), then calls the provider's `grant_type=id_token` with the raw nonce. The provider verifies the token signature, audience and nonce hash.
3. Without `BORICUA_GOOGLE_CLIENT_ID` and `BORICUA_GOOGLE_CLIENT_SECRET` nothing changes: the provider's own authorize address is used.

## Negative Logic
- ❌ No state parameter: PKCE binds the code to the sealed flow cookie's verifier (RFC 9700 accepts PKCE as the CSRF defence).
- ❌ The client secret never reaches the browser; only the token request carries it.
- ❌ No paid custom domain.

## Setup (owner)
1. Google Cloud console → the OAuth client the provider already uses for Google → Authorized redirect URIs: add `https://boricuaexperience.com/auth/google/callback` (and `http://localhost:8080/auth/google/callback` for development).
2. OAuth consent screen / Branding: app name "Boricua Experience", the cotorra logo (`public/assets/brand/icon-192.png` scaled to 120 px), home page, privacy and terms URLs, authorized domain `boricuaexperience.com`; submit branding verification so Google shows the name and logo.
3. Vercel → project env: `BORICUA_GOOGLE_CLIENT_ID`, `BORICUA_GOOGLE_CLIENT_SECRET` (same client as the provider's Google settings, so the ID token's audience is accepted). Redeploy.

## Referenced by
[[src/Services/Runtime]] · [[src/View/Pages/Auth]] · test `test/Services/GoogleSignInTest.pudu`


## Production verification · #181
Runtime setup is complete in production with a separately approved additional credential on the existing client; the original provider secret remains enabled. Direct authorization, own-domain callback, PKCE, unchanged nonce validation and a real owner sign-in passed. See [[handoffs/production-auth-notifications]]. Credential values remain private.
