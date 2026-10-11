---
type: module
fidelity: Active
tags: [module, assistant]
---

# Public.AssistantStyles

## Purpose
Restrained rounded composer and responsive conversation dialog.

## Interface
assistant.css classeslauncher/dialog/head/thread/form/compose-actions/status/sources/table. Loaded through Layout sharedassetversion.

## Algorithm
Desktop and tablet widths≥700 use a centered dialog with860px maximum width; phones≤699 use a full-width bottom sheet with safeareas and dynamicvisualviewportheight. Threadscrolls independently, tables/codeoverflow, textwraps. Controls≥44px; neutralink send/stopbutton, thinfocusring. Launcher on mapmovesabovecontrols.

## Negative Logic
No invisible content beforeenhancement or header-whiteicons in dialog.

## Edge Cases
Phonekeyboard,390/713/1440 widths, reducedmotion, longtitles and Markdown tables.

## Depth
Bounded subsystem boundary.

## Grill Log
Resolved: Headerwhiteiconstyle scopedtoappbar; assistantcontrols remainvisible on white. Motiontransition is optional and settles without retaining transforms.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]

Dialog redesign: desktop centered width860max, generous welcome with cotorra and compact intent buttons. Phone full-sheet retained. Composer has rounded large textarea with separate voice/action strip and44px circular arrow/stop. Result cards include actual stored cover imagery; animated thinking dots respect reducedmotion.
