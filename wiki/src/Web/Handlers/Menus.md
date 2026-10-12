---
type: module
path: "@root/src/Web/Handlers/Menus.pudu"
fidelity: Active
layer: Web
tags: [module, menus]
---
# Web.Handlers.Menus
## Purpose
Dedicated server-rendered menu page at /lugar/:slug/menu.
## Interface
routes(app) registers a public GET using the normal visitor/session shell.
## Algorithm
Resolve the parent place via mediator, then its viewer-authorized menu board. Refuse unsupported categories without existing owner menus. Render dependency failures accurately rather than claiming an empty menu.
## Negative Logic
No direct API/service calls, write actions or bypass of hidden/paused parent visibility.
## Grill Log
Resolved: reader uses the same database visibility contract as its parent, the existing page wrapper seals refreshed sessions and applies private caching. Owner-only draft/archived content carries a visible status and noindex; public published menus may be indexed.
## Referenced by
[[src/_MOC]] · [[src/Web/Router]] · [[src/View/Pages/Menu]]
