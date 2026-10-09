#!/usr/bin/env bash
# Writes every message key the source names, plus the families built at run time, to the fixture
# the translation test reads.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/test/Fixtures/message-keys.txt"
{
  grep -rhoE '"(nav|footer|home|search|when|sort|date|event|visibility|status|report|publish|manage|map|location|activity|notifications|notification|profile|account|auth|cookies|admin|error|form|flash|problem|legal|about)\.[a-z0-9_.]+"' "$root/src/View" "$root/src/Web" "$root/src/I18n/Dates.pudu" "$root/src/I18n/Format.pudu" "$root/src/Validation" "$root/src/Constants/Codes.pudu" "$root/src/App/Pipeline.pudu" | tr -d '"'
  for family in status.pending status.approved status.rejected status.withdrawn \
    when.anytime when.today when.tomorrow when.weekend when.week when.month \
    sort.soon sort.near sort.relevant \
    report.spam report.scam report.unsafe report.minors report.offensive report.other \
    notification.request_received notification.request_approved notification.request_rejected \
    notification.event_reminder notification.event_changed notification.event_cancelled; do echo "$family"; done
  for counted in event.going event.spots_left event.going_title event.more_people event.manage_requests \
    profile.events_hosted profile.guests_hosted profile.upcoming profile.likes; do echo "$counted.one"; echo "$counted.other"; done
  for section in eligibility accounts events joining conduct safety minors content liability termination changes contact; do echo "legal.terms.$section.title"; echo "legal.terms.$section.body"; done
  for section in collect use location sharing retention rights deletion cookies security minors contact; do echo "legal.privacy.$section.title"; echo "legal.privacy.$section.body"; done
  for section in what necessary analytics marketing choices; do echo "legal.cookies.$section.title"; echo "legal.cookies.$section.body"; done
  for section in mission how safety privacy; do echo "about.$section.title"; echo "about.$section.body"; done
  for doc in legal.terms legal.privacy legal.cookies about; do echo "$doc.title"; echo "$doc.description"; echo "$doc.intro"; done
} | grep -vE '^(legal\.terms|legal\.privacy|legal\.cookies|event\.going|event\.spots_left|event\.going_title|event\.more_people|event\.manage_requests|profile\.events_hosted|profile\.guests_hosted|profile\.upcoming|profile\.likes)$' | sort -u > "$out"
echo "$(wc -l < "$out" | tr -d ' ') keys written to $out"
