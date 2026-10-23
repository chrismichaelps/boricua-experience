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
- **HTTP**: HTML remains private because language, consent, flash and session state affect its body. Cookie-neutral API/reference responses declare their own bounded public cache policies. The function pools database API connections and caches reference data per instance for10minutes. An explicit Meta ExternalAgent robots exclusion and narrow Free edge deny address excessive crawling without sharing personalized HTML.
- **Browser**: one stylesheet, deferred module scripts, fonts preloaded, images lazy, the service
  worker serving the shell and assets from cache.

## Referenced by

[[architecture/_MOC]]
