---
type: module
path: "@root/src/../supabase (private migration)"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Database
depth_status: MEDIUM
tags: [module, database]
---

# Database.Reviews

> /** Private migration `reviews`: reviews, review reports, rating counters, and moderation */

## Purpose

Reviews of places with exact counters and moderation.

## Interface

### Signatures

```pudu
app.reviews, app.review_reports
public.place_reviews, save_review, delete_review, respond_review, report_review, admin_review_reports, admin_resolve_review; admin_overview adds places, reviews_7d, review_reports_open
```

### Linkage

- **Requires:** [[src/Database/Places]].
- **Consumed by:** [[src/Api/Reviews]].

## Algorithm

One review per member and place. Refused: the owner's own place, accounts younger than a day, more than five new reviews a day, ratings outside 1–5, text outside 20–2,000, future visits, removed reviews. A trigger recounts the place's rating from published reviews on every change; three open reports hold a review until an administrator keeps or removes it.

## Negative Logic (Prohibited Paths)

- ❌ Callers never write counters; held reviews never count toward the average.

## Referenced by

[[src/_MOC]]

## Place discovery Grill Log · #132
Resolved: place_reviews adds highlights: latest six published reviews by created_at desc,id, independent of p_after, using the same visibility gate and private.review_item projection. Existing summary/page/mine/permissions are unchanged. Apply the additive function replacement to both projects and verify hashes, ACLs and hidden-place refusal.

## Hidden orphan guard · #132
Resolved: rollback testing exposed a pre-existing NULL-owner comparison: guests could read reviews of an unowned hidden place. Require a non-null viewer for hidden access, matching place_detail. Owned hidden places remain owner-only; removed/missing places still refuse. Follow-up migration preserves the additive projection and ACLs.

## Companions and filters Grill Log · #151
Resolved: `app.reviews.companions` is an optional closed set (solo, couple, family, friends, business), checked in the table and in `save_review` (new optional `p_companions`; the four-argument signature is dropped and grants re-applied). `place_reviews` gains optional `p_rating` and `p_companions` that narrow only the listed page; summary, breakdown and highlights stay whole, and a `companions` object counts published reviews per type so the page offers only filters that find something. A partial `(place_id, rating, created_at desc, id)` index serves star filters. Unknown values fail as `invalid_rating` / `invalid_companions`.
