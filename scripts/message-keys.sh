#!/usr/bin/env bash
# Writes every message key the source names, plus the families built at run time, to the fixture
# the translation test reads.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/test/Fixtures/message-keys.txt"
{
  grep -rhoE '"(achievements|build|digest|assistant|nav|footer|home|search|when|sort|date|event|visibility|status|report|publish|manage|map|location|activity|notifications|notification|profile|account|auth|cookies|admin|error|form|flash|problem|legal|about|place|review|plan|interest|quick|town)\.[a-z0-9_.]+"' "$root/src/View" "$root/src/Web" "$root/src/I18n/Dates.pudu" "$root/src/I18n/Format.pudu" "$root/src/Validation" "$root/src/Constants/Codes.pudu" "$root/src/App/Pipeline.pudu" | tr -d '"'
  sed -nE 's/.*\("((assistant|menu|media|calendar)\.[a-z0-9_.-]+)",.*/\1/p' "$root/src/I18n/Es.pudu" "$root/src/I18n/EsMenu.pudu" "$root/src/I18n/EsPlan.pudu"
  for family in admin.channel.home admin.channel.search admin.channel.map admin.channel.town admin.channel.category admin.channel.profile admin.channel.event admin.channel.assistant admin.channel.activity admin.channel.notifications admin.channel.share admin.channel.external admin.channel.direct admin.channel.other achievements.rarity.common achievements.rarity.rare achievements.rarity.epic achievements.rarity.legendary status.pending status.approved status.rejected status.withdrawn status.waitlisted \
    when.anytime when.today when.tomorrow when.weekend when.week when.month \
    sort.soon sort.near sort.relevant sort.top publish.kind_place publish.kind_activity review.reason_spam review.reason_fake review.reason_offensive review.reason_conflict review.reason_other \
    publish.cover_mar publish.cover_atardecer publish.cover_bosque publish.cover_montana publish.cover_ciudad publish.cover_noche publish.cover_fiesta \
    review.with_solo review.with_couple review.with_family review.with_friends review.with_business review.went_solo review.went_couple review.went_family review.went_friends review.went_business \
    report.spam report.scam report.unsafe report.minors report.offensive report.other \
    notification.request_received notification.request_approved notification.request_rejected \
    notification.event_reminder notification.event_changed notification.event_cancelled notification.waitlist_promoted notification.event_held; do echo "$family"; done
  for family in quick.today quick.weekend quick.free quick.family quick.night quick.outdoor quick.indoor quick.accessible quick.near; do echo "$family"; done
  for family in plan.when.today plan.when.tomorrow plan.when.weekend plan.style.mixed plan.style.free plan.style.family plan.style.adventure plan.style.culture plan.mode.local plan.mode.visitor; do echo "$family"; done
  for counted in interest.going interest.interested digest.unread achievements.showcase_count admin.open_reports event.waitlist_ahead event.going event.more_dates place.reviews event.spots_left event.going_title event.more_people event.manage_requests \
    profile.events_hosted profile.guests_hosted profile.upcoming profile.likes; do echo "$counted.one"; echo "$counted.other"; done
  for section in service eligibility account publishing joining minors conduct safety content moderation disclaimers liability indemnity changes law contact; do echo "legal.terms.$section.title"; echo "legal.terms.$section.body"; done
  for section in scope collect use visibility location providers retention rights deletion security minors transfers changes; do echo "legal.privacy.$section.title"; echo "legal.privacy.$section.body"; done
  for section in what necessary storage optional third choices; do echo "legal.cookies.$section.title"; echo "legal.cookies.$section.body"; done
  for region in metro norte este centro sur oeste islas; do echo "region.$region"; done
  for section in mission how safety privacy; do echo "about.$section.title"; echo "about.$section.body"; done
  for section in commitment standard tools compatibility limitations feedback; do echo "legal.accessibility.$section.title"; echo "legal.accessibility.$section.body"; done
  for doc in legal.terms legal.privacy legal.cookies legal.accessibility about; do echo "$doc.title"; echo "$doc.description"; echo "$doc.intro"; done
  for doc in legal.terms legal.privacy legal.cookies legal.accessibility; do echo "$doc.summary"; done
} | grep -vE '^(interest\.going|interest\.interested|plan\.ics|plan\.mode\.|plan\.style\.|plan\.when\.|legal\.terms|legal\.privacy|legal\.cookies|legal\.accessibility|digest\.unread|achievements\.showcase_count|achievements\.rarity\.|admin\.channel\.|admin\.open_reports|event\.waitlist_ahead|event\.going|event\.more_dates|place\.reviews|publish\.kind_|publish\.cover_$|review\.reason_|review\.with_|review\.went_|event\.spots_left|event\.going_title|event\.more_people|event\.manage_requests|profile\.events_hosted|profile\.guests_hosted|profile\.upcoming|profile\.likes)$' | sort -u > "$out"
echo "$(wc -l < "$out" | tr -d ' ') keys written to $out"
