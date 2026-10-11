---
type: module
fidelity: Active
tags: [module, assistant]
---

# Constants.Assistant

## Purpose
Pudu input and public-query bounds.

## Interface
BODY_MAX24000, MESSAGE_MAX1200, HISTORY_MAX6, RESULTS6; QUOTA names the service-only reserve_assistant_request RPC.

## Algorithm
Shared by Domain, Services and Web bridge. Node independently owns provider-attempt/deadline/output bounds.

## Negative Logic
No business records or provider credentials.

## Edge Cases
Oversized input and forged roles.

## Depth
Bounded subsystem boundary.

## Grill Log
Resolved: Remove superseded buffered-transport constants; there is one owner for each runtime boundary.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]
