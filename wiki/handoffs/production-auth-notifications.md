# Production authentication and notifications · #181

2026-10-20 · recovered Claude session: Web app UI improvements and TripAdvisor analysis.

## Role and ownership
Architect → Infrastructure Engineer: production Google runtime configuration and bounded notification verification only. Preserve0.15.0 application behavior, existing provider credentials, independent environments and free plans. Independent Forensic Reviewer examined the rollback verification SQL before execution. No application source or schema migration was needed.

## Resolved Grill Log
Never copy a provider configuration fingerprint as a reusable secret: the management response holds a SHA-256-shaped placeholder, and Google does not reveal the original credential. The owner explicitly approved one additional secret on the existing production client, with sensitive Vercel production storage and matching ignored local production settings. Keep the original secret enabled for the provider flow. No credential, authorization code, cookie, private SQL or production publication dataset enters Git.

## Google result
The second credential was created in the existing verified client; callback origins and identity scopes were preserved. The secret is a sensitive production runtime variable; local production settings remain ignored and0600. Temporary credential/export artifacts were removed after configuration. The original provider credential and development client were not changed. Email confirmation remains disabled and Google nonce verification stays enabled.

The identical tested0.15.0 artifact was staged at `https://boricua-experience-nyvuum5l5.vercel.app`, then promoted. Staged and public starts go directly to Google's authorization endpoint, with `https://boricuaexperience.com/auth/google/callback`, S256 PKCE and only OpenID/email/profile scopes. Nine focused GoogleSignInTest assertions pass. A real existing owner sign-in completed in Chrome, returned to `/notifications`, displayed the welcome state and updated its existing authentication record. The signed-in inbox renders normally; no duplicate account was created.

Function, static and local fingerprints remain `sha256:d8577efa0d29f01c7923804d65c4e1eca05399c5e9cff2b296034b05c2a2f900`, version0.15.0, main `5da15e1d54f8c1713fa21bc6c4d93c8c97cbc3ac`. Runtime-secret configuration intentionally does not change the source build identity.

## In-app notification finding
The production reminder schedule is enabled every15 minutes and its recent runs succeeded. The five request/change/reminder/inbox/read functions match development exactly; production triggers and owner preferences are enabled. Production had no participation requests or notifications, while development contains seeded activity. Browsing, saving or marking interest does not generate an inbox item under the present contract. No fake historical notices or new notification semantics were introduced.

An independently reviewed production SQL audit exercised the actual public request/decision APIs, notification triggers and reader, reminder idempotency, recipient isolation, read cutoff, later unread notices, event changes, preference suppression and cancellation. Every assertion passed. An exception subtransaction rolled back test events, requests, notes, preferences, audit/achievement writes and local JWT claims. No test rows survive; identity sequence values can advance during rollback tests. A separate query confirmed zero remaining test rows and unchanged preferences. No email or push messages were sent.

## Status
Completed. The production inbox may correctly remain empty until eligible real participation occurs. Optional weekly email summaries and browser/device push are separate features and were not enabled by this task. Private screenshots/logs remain ignored; the signed-in inbox was left available for owner inspection.

## Referenced by
[[handoffs/_MOC]] · [[src/Api/Google]] · [[src/Database/NotificationDigest]] · [[domain/Notification]]
