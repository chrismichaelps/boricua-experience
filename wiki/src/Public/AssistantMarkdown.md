---
type: module
path: "@root/public/assets/js/features/assistantMarkdown.js"
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, assistant]
---

# Public.AssistantMarkdown

## Purpose
Render streaming Markdown safely as DOM nodes using pinned Marked18.1.0 tokens.

## Interface
`renderMarkdown(target, text, links=[])` replaces the target with a fragment. Limit6000characters,16levels; links are supplied verified local `/e/<slug>` paths only.

## Algorithm
Token allowlist: paragraphs, headings boundedh3–h4, bold/emphasis/strike, quotes, lists/tasks, tables, code, breaks and rules. Recursive children use `textContent`/text nodes; raw HTML, images and unknown tokens are plain text. Parser failure produces bounded plain text. No innerHTML evaluation.

## Negative Logic
No model-generated HTML, remote images, JavaScript links or unverified navigation. Disabled task checkboxes cannot submit state.

## Edge Cases
Partial streaming Markdown, malformed input, nested lists, UTF-8, table overflow, long code, excessive nesting.

## Depth
MEDIUM: untrusted output boundary.

## Grill Log
Resolved: lexing comes from upstream Marked; rendering is local and explicit. Tests include malicious HTML/image/link output and allowed local links as well as normal tables/lists.

## Referenced by
[[src/_MOC]] · [[src/Public/Assistant]] · [[src/Public/Marked]]
