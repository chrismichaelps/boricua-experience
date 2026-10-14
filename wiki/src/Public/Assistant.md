---
type: module
fidelity: Active
tags: [module, assistant]
---

# Public.Assistant

## Purpose
Mobile and desktop browser conversation lifecycle.

## Interface
assistant(root); consumeChat(stream,receive). Initialized lazily by main. Guest dialog offers sign-in; native dialog traps focus and Escape.

## Algorithm
Messages in memory≤6; same-originPOST/api/chat includes CSRF. GenuineSSE parser requiresdone and bounds pendingchunks32000; RAF paints safeMarkdown≤6000. Send changes to stop; abort on stop/close/reset/pagehide; captures own95sdeadlinecontroller and stale-response ticket. Close clears busy state/restoresfocus. Enter submits exceptShift/composition. Optional browserdictation edits1200char transcript without autosend; No reply readout. Sources acceptlocal/e/slug only.

## Negative Logic
No providerkeys, stored conversations, ambientrecording, rawHTML or guessedsource navigation.

## Edge Cases
Missingvoice API, deniedvoice, streaminginterruptions, failedimports, keyboard/visualViewportresize, tabletbottomnav.

## Depth
Bounded subsystem boundary.

## Grill Log
Resolved: Stop retains partial visible output but excludes canceled turns fromhistory. Home message launcher becomesvisible only after successful initialization; unrelated features survive failure.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]

## Database image suggestions Grill Log
Resolved: public source projections supply image URLs from event covers/category fallback. Browser accepts only same-origin covers/images or HTTPS public Supabase-storage URLs; model Markdown images remain inert. A per-turn result grid replaces itself on source updates and renders image,title,town,category without unsafeHTML. Quick prompts populate editable input and never auto-send. Stop click prevents native validation and aborts even when required input is emptied. Close/reset cancel and null queued paint handle.

Welcome prompt clicks delegate from the persistent thread, so replacing the welcome during reset never creates inert cloned buttons. Lifecycle regression verifies restored prompt fills the composer.

## Voice lifecycle Grill Log
Resolved: each recognition session owns its callbacks. Closing/resetting detaches the current session before abort, so stale end/error callbacks cannot stop a later recording. Spanish dictation uses es-PR; English uses en-US.


## Home-only assistant Grill Log · #86
Resolved: Remove synthesized reply playback; dictation remains explicit and bounded. Opening captures the page position and body offsets, then applies a dedicated fixed-body scroll lock for mobile and desktop. Every dismissal, external dialog close and pagehide releases only this lock, restores offsets/position and cancels in-flight work. Late close events must not unlock a newly reopened dialog.

## Grounded chat plans · #103 · Resolved Grill Log
Provider control tags are quarantined across chunk boundaries and retried within the existing budget, never displayed or executed as prose. Structured allowlisted calls remain authoritative. Public quick traits, places, itineraries and route results use typed database reads. Public map cards show supplied anchors and road geometry, explicitly label estimated travel and missing paths, and release maps on close/reset. No model coordinates, arbitrary SQL, fake data or paid fallback. Town routing is service-only, catalog-bounded, cached by directed town pair and transactionally locked; no per-user position is sent or stored. Every changed schema is verified in both environments.
