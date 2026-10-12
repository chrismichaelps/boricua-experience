---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
---
# SubmitFeedback

## Purpose
Capture accepted native form submission after bubbling; show a busy indicator on the actual submitter and preserve named value. Prevent duplicate accepted submissions with aria-disabled rather than disabling successful controls. AJAX handlers retain their lifecycle and existing aria-busy states. Google navigation and button links gain feedback only for ordinary same-tab navigation. pageshow resets BFCache state; canceled and invalid forms never remain busy.

## Interface
Exported initialization plus pure local helpers where needed.

## Algorithm
Delegated document lifecycle with idempotent initialization and explicit completion/restoration.

## Negative Logic
No secrets, hidden requests, tracking, fake strength guarantees, disabled successful form controls or authentication bypass.

## Edge Cases
No JavaScript, invalid/canceled submit, duplicate clicks, BFCache return, modified clicks, keyboard navigation, reduced motion and both locales.

## Grill Log
Resolved: Capture accepted native form submission after bubbling; show a busy indicator on the actual submitter and preserve named value. Prevent duplicate accepted submissions with aria-disabled rather than disabling successful controls. AJAX handlers retain their lifecycle and existing aria-busy states. Google navigation and button links gain feedback only for ordinary same-tab navigation. pageshow resets BFCache state; canceled and invalid forms never remain busy.

## Referenced by
[[src/Public/BrowserMain]] · [[handoffs/homepage-refresh]]

Accepted AJAX submissions are recognized only while the existing feature’s nearest owner has aria-busy=true. A scoped MutationObserver watches that owner and clears only the clicked control when the owner finishes; pageshow disconnects observers and restores native busy controls. Rejected/canceled forms with no busy owner get no loader. Resolved.

## Script-owned submit ordering Grill Log · #76
Resolved: the navigation-or-script decision runs in a bubbling submit listener, after the form's own listeners. A capture-phase microtask is not final: on a real click browsers drain microtasks between listeners, so the old check ran before the save toggle called preventDefault, marked the form as navigating, and the toggle then refused to send because the form looked busy. Capture keeps only the double-submit guard. The harness now drains microtasks between capture, the form listener and bubbling. Rejected: setTimeout deferral (still racy against slow listeners and visible as a flash).
