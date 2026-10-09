---
type: grammar
language: Pudu
version: "0.1.3"
tags: [grammar]
aliases: [Grammar — Pudu]
---

# Grammar — Pudu

Pinned to the 0.1.3 release archive (compiler and standard library together) and the musl Lambda
runtime of the same release. Where this page and the compiler disagree, the compiler wins and this
page is corrected in the same change.

## SDK Discovery Map

| Need | Module | Entry points |
| --- | --- | --- |
| Pages | `Std.Html`, `Std.Html.Build` | `Html`, `text`, `trusted`; `H.div().class(..).says(..).holding([..])`, `document` |
| Routing | `Std.Http.Server.Route` | `Request`, `get`, `post`, `routing`, `withFallback`, `dispatch`, `param`, `queryParam`, `header`, `fieldsOf` |
| Replies | `Std.Http.Server.Reply` | `page`, `html`, `json`, `jsonValue`, `text`, `empty`, `tooManyRequests` |
| Socket server | `Std.Http.Server` | `start`, `server`, `withLimits`, `using`, `run`, `stop` |
| Platform | `Std.Http.Server.Lambda` | `serveEnvironment`, `fromEnvironment`, `failedToStart`, `explain` |
| HTTP vocabulary | `Std.Http` | `Request`, `Response`, `Status`, `status`, `header`, `methodFrom` |
| JSON | `Std.Json` | `Json`, `decode`, `encode`, `field`, `asText`; `derives Json.Encode, Json.Decode`, `@json("wire")` |
| Sealing | `Std.Crypto` | `seal`, `open`, `newNonce`, `sha256Hex`, `bytesMatch` |
| Bytes | `Std.Bytes` | `encodeBase64Url`, `decodeBase64Url`, `decodeHex`, `toText` |
| Randomness | `Std.Random` | `secureBytes` |
| Time | `Std.Time` | `currentInstant`, `fromRfc3339`, `toRfc3339`, `toDate`, `toTimeOfDay`, `atUtc` |
| URLs | `Std.Url` | `encodeComponent`, `decodeComponent`, `parseQuery`, `renderQuery` |
| Shared state | `Std.Sync` | `cell`, `get`, `set`, `mutex`, `withLock` |
| Tests | `Std.Test` | `suite`, `equals`, `that`, `run` |

| Package | Used for |
| --- | --- |
| `pudu-lang-environment` | `.env` and process variables bound into [[src/Config/Settings]] |
| `pudu-lang-validator` | every form and command checked before it is sent ([[src/Validation/_MOC]]) |
| `pudu-lang-httpclient` | the database API and identity provider clients ([[src/Api/Supabase/Gateway]]) |
| `pudu-lang-resilience` | timeouts, retries, and the circuit breaker around those clients |
| `pudu-lang-mediator` | every page and action is a message ([[src/App/Messages]]) |
| `pudu-lang-log` | structured request and failure events ([[src/App/Logging]]) |

## Imports / Namespaces

- One module per file; the module name is its path under `src/`.
- Imports are absolute and aliased; a package root is imported under a short name.
- The standard library resolves from the release archive; packages from `deps/` after
  `pudu install --locked`.

## Architectural Laws

- **Layer law:** a module imports only from its own layer or the layers below it
  ([[architecture/_MOC#Layers]]). `Constants` and `Utils` import nothing of the application.
- **Magic values** (paths, cookie names, limits, codes, cache policies) live in `Constants/` and are
  referenced by name.
- **Failures are values:** every service answers `Result[T, Problem]` ([[src/Domain/Problem]]).
- **No secret in a page, a log, or an error.** Settings holding secrets are `Secret.Secret`.
- **Text that came from a request or the database is `says`, never `raw`.**

## Syntax Rules / Naming

- Types, traits, modules, and variants `PascalCase`; values `camelCase`; constants `UPPER_SNAKE_CASE`.
- Every file header and exported type carries `/** @Namespace.Entity.Role — intent */`.
- Every `fn` and `const` carries a short `///` comment stating what it answers or holds, in the
  neutral voice of reference documentation. Rationale goes to the mirrored page's Grill Log.

## Prohibited Patterns

- A brace inside a string literal is interpolation; a literal brace is `\{` or `\}`.
- `Result` and `Option` have no methods; use `Result.map`, `Option.unwrapOr`, and so on.
- A tuple is indexed with `[n]`, not `.n`.
- A binding named like an import of the module shadows it (`W2001`).
- A match arm that only rebuilds its failure is reported (`W3003`); use `?`.
- `items[i]` and `items.get(i)` both answer the element and stop the program when `i` is out of
  range; test the length first, or take the first element with `Option.fromArray`.
- `&-1` lexes as the wrapping-subtraction operator; borrow a negative literal as `&(-1)`.
- A `Map` built inside a function is rebuilt on every call; a lookup table is a module `const`.

## Senior Definition Needed

(none open)

## Referenced by

[[00-INDEX]] · [[grammar/_MOC]] · [[architecture/_MOC]]
