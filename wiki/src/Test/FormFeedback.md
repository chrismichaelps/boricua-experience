---
type: module
fidelity: Active
---
# FormFeedback

## Purpose
Regression harness for accepted/canceled native submission, named submitter preservation, duplicate clicks, AJAX completion and BFCache restoration.

## Interface
scripts/form-feedback-test.mjs runs under Node as part of scripts/test.sh.

## Algorithm
Exercise delegated events with independent form/control fixtures and flush microtasks; observe busy ownership and named values before and after completion.

## Negative Logic
No real accounts, network requests, passwords, provider mocks claiming delivery, or persistent data changes.

## Edge Cases
Canceled submit, hidden automatic-filter submitter, named consent submitter, duplicate native submit, asynchronous completion and pageshow.

## Grill Log
Resolved: assertions protect user-visible state and successful form values rather than assuming disabled controls can submit. Actual password controls and narrow/wide layouts are checked separately in the browser.

## Referenced by
[[src/Public/SubmitFeedback]] · [[src/Public/Passwords]] · [[src/_MOC]]

## Pagination feedback ordering · #124
Resolved: the production browser exposed click-capture microtasks running before the target load-more listener. Shared navigation feedback now decides in the bubbling phase and never owns a canceled/script-handled click. Pagination uses its own closure lock rather than interpreting another component's aria-busy flag. Test actual shared feedback plus actual loadMore with a microtask checkpoint between capture and target, then completion/repeat activation. Asset revision84 refreshes both changed modules and entry; no database change.
