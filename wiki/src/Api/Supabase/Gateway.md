---
type: module
path: "@root/src/Api/Supabase/Gateway.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: DEEP
tags: [module, api, deep]
---

# Api.Supabase.Gateway

> /** @Api.Supabase.Gateway.Critical — database functions called over HTTPS */

## Purpose

The single client every database and identity call goes through: pooled keep-alive TLS connections to the project, a resilience pipeline chosen per call, and failure translation into `Problem`. Adapter of [[seams/DatabaseApi]].

## Interface

### Signatures

```pudu
export type Gateway = { http: Client.Client, base: Str, anonKey: Str, serviceKey: Str }
export type Mode = Read | Write
export fn create(settings: &Settings.Settings) -> Result[Gateway, Str]
export fn over(send: Handler.Send, base: Str, anonKey: Str) -> Gateway
export fn call(gateway: &Gateway, function: Str, arguments: &Array[(Str, Json.Json)], token: Option[Str], mode: Mode) -> Result[Json.Json, Problem.Problem]
export fn query[T: Json.Decode](gateway: &Gateway, function: Str, arguments: &Array[(Str, Json.Json)], token: Option[Str], mode: Mode) -> Result[T, Problem.Problem]
export fn sent(http: &Client.Client, request: Request.Request) -> Result[Response.Response, Problem.Problem]
export fn textAt(document: &Json.Json, name: Str) -> Option[Str]
export fn text, textOrNull, whole, fraction, truth  // JSON argument builders
```

### Linkage

- **Requires:** `pudu-lang-httpclient`, `pudu-lang-resilience`, [[src/Config/Settings]], [[src/Constants/Supabase]], [[src/Domain/Problem]], [[src/Utils/Wire]].
- **Consumed by:** every `Api/` module.

## Algorithm

1. `create` builds one named client: base address, pooled transport (connections renewed every 2 minutes, at most 32), decompression, no redirects, and a handler choosing a pipeline per request.
2. Reads (marked by a request option) run under a total timeout, one jittered retry of transient outcomes, a circuit breaker, and a per-attempt timeout; writes run under the breaker and a total timeout only.
3. `call` posts the named arguments as one JSON object to `rest/v1/rpc/<function>` with the project key and the member's token (or the project key for a guest).
4. A non-2xx answer becomes a `Problem` from `error_code`, `error`, or `message` and the status; a transport failure becomes `Unavailable`.

## Negative Logic (Prohibited Paths)

- ❌ Never retries a write.
- ❌ No logging of arguments or tokens.

## Edge Cases

- 204 answers decode as `null`.
- An answer that does not decode is `Unavailable` naming the function.

## Depth

DEEP: two calls hide transport, pooling, resilience, authentication headers, and failure mapping.

## Grill Log

- **Q:** Retry writes?
  **A:** Never: a timed-out write may have committed; repeating `request_join` or `create_event` could duplicate. _Rejected:_ idempotency keys (not supported by the function API).
- **Q:** Where are tokens checked?
  **A:** By the database on every call; the gateway forwards them untouched.
- **Q:** One client per request?
  **A:** One per process: the pool and the breaker only help when they outlive a request.

## Referenced by

[[src/_MOC]]
