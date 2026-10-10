---
type: moc
tags: [moc, architecture]
aliases: [Architecture]
maturity: EXPLORING
---

# Architecture

## Shape

A request arrives from the hosting platform ([[src/Function]]) or a local socket
([[src/Main]]) as a `Route.Request`. [[src/Web/Router]] matches it, [[src/Web/Context]] resolves
the visitor (locale, sealed session, consent) and refreshes an expiring session, and a handler in
`Web/Handlers` turns the request into a typed message sent through the mediator
([[src/App/Assembly]]). Every message passes the same pipeline — logging, validation, and the
fault boundary — before its handler in [[src/App/Handlers/Discover]] calls a service. Services compose calls
to the database API and the identity provider (`Api/`), and answer `Result[T, Problem]`. The Web
handler renders the outcome through `View/` and [[src/Web/Respond]] adds cookies, security
headers, and cache policy.

## Layers

Dependencies point down the table only. A module may import from its own row or any row above it.

| # | Layer | Folder | Holds | Imports beyond std |
| --- | --- | --- | --- | --- |
| 0 | Constants | `Constants/` | paths, cookie names, limits, codes, cache policies, versions | — |
| 1 | Utils | `Utils/` | pure helpers: text, time, money, geo, cookies, forms, base64url claims | Constants |
| 2 | Domain | `Domain/` | records and sums of the business, their JSON decoding, `Problem` | Constants, Utils |
| 3 | I18n | `I18n/` | Spanish and English tables and lookup | Domain, Constants |
| 3 | Config | `Config/` | settings bound from the environment and validated | environment, validator, Constants |
| 3 | Validation | `Validation/` | validators for every form and command | validator, Domain, Constants, Utils |
| 4 | Api | `Api/` | HTTPS clients: the database functions, identity, administration | httpclient, resilience, log, Domain, Config, Constants, Utils |
| 5 | Services | `Services/` | use cases: sessions, discovery, events, joins, location, account, privacy | Api, Validation, Domain, Config, Constants, Utils |
| 6 | App | `App/` | messages, handlers, the mediator and its behaviors, logging | mediator, log, Services and below |
| 6 | View | `View/` | layout, components, pages, SEO; pure rendering of Domain values | I18n, Domain, Constants, Utils |
| 7 | Web | `Web/` | router, context, handlers, responses, platform adapter | App, View, and below |
| 8 | Entry | `Main`, `Function` | process start for a socket or the platform | Web, App, Config |

`View/` never calls a service: it renders values it is given, so every page is testable with
fixtures. `Api/` never decides business rules: it moves typed values over HTTPS and maps failures
to `Problem`.

## Pages

- [[architecture/LANGUAGE]] — the vocabulary every page uses.
- [[architecture/SECURITY]] — threat model and the controls in each layer.
- [[architecture/PERFORMANCE]] — the scale target and where the cost is paid.
- [[architecture/DELIVERY]] — branches, checks, and the deployment chain.

## Governance dashboard

| Measure | State |
| --- | --- |
| Maturity | EXPLORING (first release, one team) |
| Depth distribution | most services and the gateway DEEP; components MEDIUM by nature |
| Seam health | all seams HEALTHY ([[seams/_MOC]]) |
| Highest chain | Web → App → Services → Api → database: depth 4, coupling loose |

## Referenced by

[[00-INDEX]] · [[grammar/pudu]]
