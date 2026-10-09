---
type: architecture
tags: [architecture, performance]
---

# Performance

Target: a million accounts, tens of thousands of upcoming events, peaks of thousands of requests per
minute.

- **Listings** read partial indexes holding only published public events, ordered by
  `(starts_at, id)` — per category and per municipality too — and page by keyset, so page 100 costs
  what page 1 costs.
- **Nearby** uses a GiST index on the blurred location with distance-ordered scans.
- **Text** uses a weighted, accent-folded `tsvector` with a GIN index and a trigram index on the
  title for misspellings.
- **Joins** in listings are primary-key lookups into two small reference tables and profiles.
- **Counters** (approved, pending, saved, likes) are maintained by triggers so cards never count.
- **Recommendations** read a rankings table refreshed every 10 minutes by a scheduled job.
- **Live location** writes one row per account in place (fill factor 70 for in-place updates),
  refuses writes closer than 10 seconds, and samples history into monthly partitions dropped after
  30 days.
- **HTTP**: anonymous pages carry `s-maxage` with `stale-while-revalidate` so the CDN answers most
  guest traffic; the function keeps pooled keep-alive connections to the database API between
  invocations; reference data is cached per instance for 10 minutes.
- **Browser**: one stylesheet, deferred module scripts, fonts preloaded, images lazy, the service
  worker serving the shell and assets from cache.

## Referenced by

[[architecture/_MOC]]
