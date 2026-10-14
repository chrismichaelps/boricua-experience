---
type: module
fidelity: Active
tags: [database, email, privacy]
---
# Database.EmailUnsubscribe

## Contract
Additive private migration email_unsubscribe_guards adds opt-in generation and minimal digest preference columns when absent. No scheduler or opt-in is enabled. A private BEFORE UPDATE trigger increments generation whenever digest preference changes and records the choice in the consent ledger. stop_digest is idempotent and service-only; deleted accounts also return stopped. digest_allowed(user,generation) is service-only and returns true only for current opted-in active onboarded accounts with matching generation. Installed digest_batch adds the claim generation; a baseline mismatch aborts.

## Grill Log
Resolved #89: both environments receive the same suppression contract without promoting the unrelated pending feature migrations. Future digest migration must use IF NOT EXISTS columns, include generation in claims, and preserve stop_digest/trigger. Application rechecks before send and fails closed; no claim that in-flight accepted mail can be recalled or that the batch cap guarantees shared provider capacity.

## Verification
Rollback tests cover default-off, repeated stop, generation invalidation after re-opt-in, account settings, service-only grants and batch exclusion. Controlled HTTP tests must cover scanner GET, no-cookie POST, forged token and repeat requests.

## Referenced by
[[src/_MOC]] · [[src/Services/Digest]] · [[seams/LegalContract]]

## Applied evidence · 2026-10-13
Applied email_unsubscribe_guards to development and production. Definition hashes and ACLs match for stop_digest, digest_allowed and the private consent trigger. Both-environment rollback tests pass: active consent, opt-out, repeated stop, off→on stale generation, paused/missing account, settings opt-out where the eight-argument function is installed, service-only ACLs and digest exclusion where batch is installed. All temporary preference/consent writes rolled back. Production seed guard passes; publication count remains92. Security advisors retain the known restricted-table/definer inventory and auth-plan warnings; no anonymous suppression grants were added.

Actual development HTTP checks pass normal/double/triple leading path GET with canonical form, signed no-cookie cross-origin one-click POST, repeated success, forged404, HTML confirmation, private/no-store and no-referrer. HTTP success used a nonexistent account to avoid durable preference changes or sending mail. Existing-account preference changes were tested transactionally in the databases. Production HTTP deployment and received-message DKIM coverage of both unsubscribe headers remain pending.
