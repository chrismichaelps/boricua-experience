---
type: module
fidelity: Active
---
# Http

## Purpose
JSON transport forwards AbortSignal while retaining the explicit GET method; aborted camera requests can never block later requests.

## Interface
Existing browser transport/feature exports remain compatible.

## Algorithm
JSON transport forwards AbortSignal while retaining the explicit GET method; aborted camera requests can never block later requests.

## Negative Logic
No hidden writes or permission bypass; failures remain retryable.

## Edge Cases
Aborted requests, duplicate submissions, missing vibration support and cached pages.

## Grill Log
- Q: Does enhancement block core actions? A: Controls restore in finally and feedback is optional. Resolved.

## Referenced by
[[src/_MOC]] · [[handoffs/homepage-refresh]]
