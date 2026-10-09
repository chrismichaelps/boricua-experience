---
type: moc
tags: [moc]
aliases: [Index, Home]
---

# Boricua Experience

A progressive web app for discovering, joining, and creating activities across Puerto Rico:
search, lists, and recommendations first, the map as a secondary tool. The server is written in
Pudu and renders every page; the database is PostgreSQL with PostGIS behind an HTTPS function API.

## Maps of content

- [[architecture/_MOC]] — layers, dependency direction, request flow, security, performance.
- [[grammar/_MOC]] — the syntax anchors: Pudu, the database API, browser scripts, and styles.
- [[domain/_MOC]] — events, join requests, organizers, attendees, reactions, sessions, consent.
- [[seams/_MOC]] — the database API, the identity provider, the hosting platform, map tiles.
- [[subsystems/_MOC]] — discovery, participation, publishing, identity, location, privacy, presentation.
- [[decisions/_MOC]] — architecture decision records.
- [[src/_MOC]] — one page per source file, mirroring `src/`.
- [[handoffs/_MOC]] — continuity pages for work in flight.
- [[CHANGELOG]] — the ledger of logic deltas.

## Private inputs

Product, design, and governance inputs kept outside version control are distilled here; their text
is never copied into the repository. The database migrations and seed live in a private folder;
this vault records the function contract the server depends on, not the SQL.

## Referenced by

(root)
