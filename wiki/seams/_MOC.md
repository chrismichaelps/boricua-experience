---
type: moc
tags: [moc, seams]
---

# Seams

| Seam | Capacity | Drift | Adapters |
| --- | --- | --- | --- |
| [[seams/DatabaseApi]] | CRITICAL | 0 HEALTHY | HTTPS function API (production); the httpclient stub (test) |
| [[seams/IdentityProvider]] | CRITICAL | 0 HEALTHY | Supabase Auth (production); stub (test) |
| [[seams/Platform]] | CRITICAL | 0 HEALTHY | Lambda runtime (production); local socket (development) |
| [[seams/SearchConsole]] | EXPLORATORY | 0 HEALTHY | Verified production Domain property and generated sitemap |
| [[seams/MapTiles]] | EXPLORATORY | 0 HEALTHY | OpenStreetMap raster tiles |

## Referenced by

[[00-INDEX]]
