---
type: module
path: "@root/src/Services/Auth/Sealer.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: DEEP
tags: [module, services, deep]
---

# Services.Auth.Sealer

> /** @Services.Auth.Sealer.Cookies — values sealed into cookies and opened again */

## Purpose

Seals sessions and sign-in flows into cookie values with the standard library's authenticated cipher, bound to their purpose; opens them only when genuine. See [[decisions/ADR-0003-sealed-session-cookie]].

## Interface

### Signatures

```pudu
export fn sealSession(key: &Bytes, session: &Session.Session) -> Option[Str]
export fn openSession(key: &Bytes, value: Str) -> Option[Session.Session]
export fn sealFlow(key: &Bytes, flow: &Session.Flow) -> Option[Str]
export fn openFlow(key: &Bytes, value: Str) -> Option[Session.Flow]
```

### Linkage

- **Requires:** `Std.Crypto`, `Std.Random`, `Std.Bytes`, [[src/Domain/Session]], [[src/Utils/Wire]].
- **Consumed by:** [[src/Web/Context]], [[src/Web/Respond]].

## Algorithm

Value = base64url(nonce ‖ ciphertext), with a fresh 12-byte nonce per seal and the purpose (`boricua.session.v1` or `boricua.flow.v1`) as associated data.

## Negative Logic (Prohibited Paths)

- ❌ Never reuses a nonce.
- ❌ Never tells why a value failed to open.

## Edge Cases

- A value from an older key or another purpose opens to nothing: the visitor is a guest.

## Depth

DEEP: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Version the format?
  **A:** The purpose string carries `v1`; a new format gets a new purpose and old cookies simply stop opening.

## Referenced by

[[src/_MOC]]
