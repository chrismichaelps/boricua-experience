---
type: handoff
tags: [handoff, release]
---

# Visitor release0.10.0

Recovered Claude session: Reliable phone map and no skeleton flash. Its latest instruction authorizes merging, applying migrations in production and deploying, then continuing visitor features. Baseline577ed82 on feature/visitor-conditions. Existing0.9.0 PRs105/106 await reconciliation even though production already serves0.9.0.

## Roles and evidence
Implementation: root. Independent review: review_homepage; visitor defects and free-provider concurrency guards cleared after corrections. Full pinned0.1.3 suite passes18 suites649 assertions plus browser harnesses. Development and production have matching23 visitor/provider functions and ACLs; intentional budget settings10/4 and40/16. Guard tests rolled back in both;8 concurrent development reservations admitted1 into1 remaining slot, then the fixture was removed. Production95 publications retained and no seed rows were introduced.

Codex browser390x844 and1280x900 checks cover map zoom/list refresh, translated titles, map expansion/list sheet, plans and independently scrolling forecast card. A physical device GPS test is not implied by viewport simulation. Model availability remains bounded by the shared free allowance; no quota reset for testing.

## Release corrections
Natural-height grid tracks keep weather readable in the trip sheet. Missing rain remains unknown. Multiday continuous spans cannot supply daily hours and are excluded from timed planning, while still discoverable. Database translations survive every public title projection. Chat retries and translation jobs share atomic actual-request reservations.

## Exact next action
Browser checks and independent review are complete, including compact weather173px, six sky scenarios, stopped-animation preference and desktop launcher separation. Full formatting gate now passes after whitespace-only baseline normalization. Commit reviewed guards, merge the visitor PR through dev, then release0.10.0 through main and verify a staged production build before promotion. Private SQL and screenshots remain ignored; secrets never staged.

## Referenced by
[[handoffs/_MOC]] · [[src/Database/ProviderBudget]] · [[architecture/DELIVERY]]
