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
Messages in memory≤6; same-originPOST/api/chat includes CSRF. GenuineSSE parser requiresdone and bounds pendingchunks32000; RAF paints safeMarkdown≤6000. Send changes to stop; abort on stop/close/reset/pagehide; captures own95sdeadlinecontroller and stale-response ticket. Close clears busy state/restoresfocus. Enter submits exceptShift/composition. Optional browserdictation edits1200char transcript without autosend; TTS explicitListen. Sources acceptlocal/e/slug only.

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
Resolved: each recognition session owns its callbacks. Closing/resetting detaches the current session before abort, so stale end/error callbacks cannot stop a later recording. Spanish dictation/readout uses es-PR; English uses en-US. Readout buttons toggle stop/resume and clear pressed state on end/error, close, reset or a new request.

Readout owns an utterance identity, so late completion/cancellation callbacks cannot clear or report errors for a later playback on the same button. Starting readout stops dictation to prevent microphone feedback.
