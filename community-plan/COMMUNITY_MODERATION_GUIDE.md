# LynxDock Community - Moderation Guide

Companion to the platform plan. Keep it light: a small, healthy, well-signposted
community beats heavy rules nobody reads.

## Roles

- **Admin** (founder): full control, billing, backups, plugins, settings.
- **Moderator** (1-2 trusted volunteers as it grows): triage bugs, tag/route,
  edit/close/merge topics, handle flags, welcome newcomers.
- **Trust levels** (Discourse, automatic):
  - TL0 new -> TL1 basic -> TL2 member -> TL3 regular -> TL4 leader.
  - Higher TLs unlock larger uploads, editing wikis, and fewer rate limits.
  - Use TL3 as informal "community regular" with light extra privileges.

## Code of conduct (short version, pin it)

1. Be respectful. Attack ideas, not people.
2. No harassment, hate, or NSFW content.
3. Stay on topic; use the right category and template.
4. No piracy, cheats/exploits that harm others, or malware in Plugins/Themes.
5. Third-party plugins/themes are community content - install at your own risk.
6. English primary for now (translations welcome in Documentation).
7. Founder's call is final on scope, roadmap, and enforcement.

## Enforcement ladder

1. Gentle nudge / edit / move the topic.
2. Formal warning (Discourse "official warning" PM).
3. Temporary silence (24h-7d) for repeat/spam.
4. Suspension.
5. Permanent ban (spam rings, malware, harassment) - no ladder required for
   clearly bad-faith actors.

## Spam & safety controls (enable at setup)

- Require email verification; enable social login (GitHub/Google).
- `discourse-akismet` or built-in anti-spam; new-user rate limits (defaults are
  good).
- Restrict Announcements + Development Updates posting to staff.
- Watched words for the worst slurs (auto-flag/block).
- Malware policy for Plugins/Themes: links to source required; a `verified` tag
  only after the founder/mod reviews.

## Daily/weekly rhythm (solo-founder friendly)

- **Daily (5 min):** clear the flag queue, answer new Bug Reports with a triage
  label, welcome intros.
- **Weekly:** post the dev log; route confirmed bugs to GitHub; feature 1
  operation/theme; re-tag Feature Requests to roadmap statuses.
- **Monthly:** review trust-level promotions and consider adding a mod.

## Bug triage flow

`needs-triage` -> reproduce -> `confirmed` + open/link GitHub issue (`on-github`)
-> close community topic when fixed, linking the release note. Duplicates get
merged, not deleted.
