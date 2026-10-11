---
type: handoff
tags: [handoff, assistant]
---

# Live assistant

2026-10-10 · issue #5 · feature/5-live-assistant.

Architect → Implementer: own the assistant modules listed in [[src/_MOC]], their mirrors, environment binding, mediator/discovery registration, layout integration, browser motion and tests. Preserve all unrelated work. Independent review required before release.

Resolved contract: free router, server credentials, bounded public database tools, active-member quota, editable browser voice dictation, optional spoken replies, no stored conversations. Current free router was verified with a $0-cap key at reported cost0. Dev/prod keys are separate and private.

Implementer → Reviewer: bounded tools/realSSE, Markdown and nativecomposer implemented. Independent review found clock rollover and close-state gaps; both fixed. Development quota guards and past/exact/future expiration tested withrollback; no retainedfixtures. Fullgate7/7,169assertions andallbrowserharnesses pass. Desktopcards measured160pxcover/18pxgap, nooverlap. Mobilestop/close/reopen verified. Physicalvoice/haptics and high-loadprovider capacity remain unverified.

Reviewer → Release engineer: independent review complete, including reset delegation and sanitized telemetry. Full gate and mobile/desktop live conversation passed. Production quota migration applied; production seed count0. Protected deployment built.

Exact next action: verify staging guards, merge release0.2.0 and promote the verified deployment.

## Referenced by
[[handoffs/_MOC]]
