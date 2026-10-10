---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0009 — Events expire at their end

## Decision

An event's own end time is its expiry. Every read that lists, maps, searches, ranks, or suggests
events already requires `ends_at >= now()`, so an event disappears the moment it ends. A pg_cron job,
`private.expire_events`, runs every five minutes and marks due `published` events `ended` with
`ended_at`, in batches of 5,000 locked with `skip locked`; pending requests on those events become
`withdrawn`. Rows are never deleted.

An ended event is final: a trigger refuses any change to its status, content, schedule, place, or
visibility (`event_ended`). Its page stays reachable by link for organizer and attendees, shows
“This activity has ended”, and is `noindex`; the sitemap and saved lists only read published rows.

## Rationale

Filtering by time alone hides events but leaves them `published` forever, so the partial listing
indexes, which hold only published rows, would grow without bound and every query would skip past
history. Marking the state keeps those indexes the size of what is live. Keeping the row preserves the
attendee history, reports, and the organizer's record.

## Referenced by

[[decisions/_MOC]] · [[domain/Event]]
