# All detail galleries · #195

Role: Architect → Implementer. Owns shared viewer extraction, event/menu wiring, non-review context, image framing and targeted regressions. Preserve other work.

## All listing details · #195 — resolved Grill Log
Reuse the same native viewer on place details, real activity-cover images and menu-header images across every category. Place reviews remain published, bounded and place-level. Other routes pass truthful existing context without inventing reviews or querying private facts. Preserve activity back/share/save controls, cover framing, modifier/no-script image links and default category artwork; illustrations never become gallery photos. Keep dialogs outside clipped event-cover styling. Shared canonical image links initialize both single event images and full albums; context links close before navigation. No schema or data mutation.

Validation: 22/22 suites, 781 assertions and all browser/timezone harnesses pass. Independent runtime/privacy review cleared the shared context and modal lifecycle; wiki interface corrections applied. Browser checks cover actual activity cover at 1280px and 391px, contained image/no overflow, close/focus/scroll restoration and context return; private menu-header fixture exercises seven existing photos and phone thumbnail selection. No database changes.

Role: Implementer → Release engineer. Next action: merge reviewed feature to dev and promote release0.16.1, then verify real production details.

Live0.16.1 mobile check found the inline schedule touching its return action. Follow-up wraps the schedule in a paragraph, preserving data and semantics. Revalidate live before completion.
