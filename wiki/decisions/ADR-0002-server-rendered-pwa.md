---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0002 — Server-rendered progressive web app

## Decision

Pudu renders every page as HTML; forms post to the server; small ES modules enhance pages
(service worker, live location, map, toggles, suggestions). The app shell is installable, has a
bottom tab bar on phones, and an offline page.

## Rationale

Fast first paint on slow networks, every page indexable, accessible by default, and one language for
the logic. The native feel comes from the shell, transitions, and offline assets rather than from a
client framework.

## Alternatives

A single-page client — rejected: a second implementation of every view, slower first paint, and
search visibility dependent on rendering.

## Referenced by

[[decisions/_MOC]]
