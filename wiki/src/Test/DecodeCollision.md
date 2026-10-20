# Decode collision regression

Source: test/Domain/DecodeCollisionTest.pudu.

## Purpose and interface
The executable test suite decodes an achievements Board and forum Topics in one build. Both fixture projections must retain their own fields and generated JSON decoder identity.

## Algorithm and failure contract
Decode both recorded gateway payloads through Wire, assert the achievements count and first badge alongside the forum topic identity, then report assertion failures through the standard test runner. Malformed or cross-wired decoders fail the suite rather than presenting empty results. No network or database writes.

## Grill Log — resolved
Different domain records must not share an accidentally colliding generated decoder. Preserve explicit Topics naming and both fixtures in one compiled suite. The completion change only normalizes existing match indentation with the pinned formatter; no assertion changes.

## Referenced by
[[src/_MOC]] · [[handoffs/visitor-guide-completion]]
