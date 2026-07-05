# LynxDock Community - Category Structure & Special Features

Companion to COMMUNITY_PLATFORM_PLAN.md. Covers Phase 2 (categories) and
Phase 3 (LynxDock-specific experiences). Designed for Discourse.

---

## Category design principles

- **Few top-level categories, tags for the rest.** Too many categories fragment
  a young community. Start lean; split later if a tag gets busy.
- **Every category ships with a pinned "start here" post** that states purpose,
  rules, and (where relevant) a template.
- **Voting only where prioritization matters** (Feature Requests) - enabled via
  the official `discourse-topic-voting` plugin. Elsewhere it adds noise.
- **Templates** (via category "Topic Template") for anything we need to triage:
  bugs, feature requests, operations, theme/plugin submissions.

Trust-level note: new users are TL0/TL1; posting in Announcements and
Development Updates is restricted to staff. Everything else is open to members.

---

## Categories

### 1. Announcements  (read-mostly)
- **Purpose:** official news - releases, security notices, community updates.
- **Who posts:** staff only. Members can reply.
- **Example posts:** "LynxDock 0.2 is live", "Security advisory: update now".
- **Tags:** `release`, `security`, `community`.
- **Voting:** no. **Template:** no.
- **Pinned starter:** "Welcome to LynxDock - start here" (links to Bug Reports,
  Feature Requests, Roadmap, Docs).
- **Moderation:** locked to staff; replies lightly moderated.

### 2. Development Updates  (dev blog home)
- **Purpose:** the public dev blog - weekly "what shipped / broke / changed /
  next" posts. (See Phase 3 - Developer Blog.)
- **Who posts:** staff. Members reply.
- **Tags:** `devlog`, `weekly`, `mission-control`, `studio`, `bootstrap`.
- **Voting:** no. **Template:** yes (dev-log template).
- **Pinned starter:** "How we build in the open".

### 3. Bug Reports
- **Purpose:** front door for problems. Triaged, then confirmed bugs are routed
  to GitHub Issues (the canonical tracker).
- **Example posts:** "Server setup wizard crashes on save (Win 11)".
- **Tags:** `mission-control`, `calls`, `self-hosting`, `studio`, `bootstrap`,
  `needs-triage`, `confirmed`, `on-github`.
- **Voting:** no (use "same here" replies + a `me-too` count via reactions).
- **Template:** **yes** - see Bug Report template below.
- **Moderation:** mods add `confirmed` / link the GitHub issue / close as dupe.

### 4. Feature Requests
- **Purpose:** propose and prioritize ideas; connects to the public roadmap.
- **Voting:** **YES** (topic-voting plugin). This is the one place votes matter.
- **Tags:** roadmap statuses - `proposed`, `accepted`, `planned`,
  `in-development`, `testing`, `released` - plus area tags.
- **Template:** yes - see Feature Request template.
- **Pinned starter:** "How feature requests become roadmap items".

### 5. Squadron Operations  (flagship community feature)
- **Purpose:** share mission plans, briefings, objectives, maps, and
  after-action reports. Powers the Operation Library (Phase 3).
- **Example posts:** "OP: Dawn Blade - 40-pilot escort (briefing + AAR)".
- **Tags:** game tags (`star-citizen`, `arma`, `dcs`, `foxhole`, `squad`,
  `elite-dangerous`, `eve`), plus `briefing`, `aar`, `template`, `package`.
- **Voting:** no; use reactions + a "featured" mod tag.
- **Template:** yes - Operation template.

### 6. Mission Control
- **Purpose:** discuss using Mission Control - command trees, wings, objectives,
  orders, ready checks; tips and setups.
- **Tags:** `command-tree`, `wings`, `objectives`, `ready-checks`, `how-to`.
- **Voting:** no. **Template:** no.

### 7. Self-Hosting
- **Purpose:** running your own LynxDock server - setup, networking, relays,
  troubleshooting.
- **Tags:** `guided-setup`, `network`, `turn-relay`, `storage`, `troubleshooting`.
- **Voting:** no. **Template:** optional (environment-details template).

### 8. Studio
- **Purpose:** LynxDock Studio discussion - knowledge graph, AI assistance.
- **Tags:** `graph`, `ai`, `workflow`. **Voting:** no.

### 9. Themes / Skins  (powers Theme Gallery, Phase 3)
- **Purpose:** publish and discover LynxDock skins, icon packs, profile themes,
  and Mission Control visual packs.
- **Tags:** `skin`, `icon-pack`, `mission-control-pack`, `profile`, `dark`,
  `light`, `wip`.
- **Voting:** no; sort by reactions/most-downloaded. **Template:** yes (theme).

### 10. Plugins  (powers Plugin Directory, Phase 3)
- **Purpose:** publish plugins, scripts, integrations, automation tools.
- **Tags:** `integration`, `automation`, `bot`, `script`, `api`, `wip`.
- **Voting:** no. **Template:** yes (plugin submission).

### 11. Documentation
- **Purpose:** community-driven docs, corrections, and how-tos; feedback on
  official docs.
- **Tags:** `how-to`, `correction`, `translation`. **Voting:** no.

### 12. Showcase
- **Purpose:** show off communities, servers, setups, and things built with
  LynxDock. Social proof.
- **Tags:** `community`, `server`, `setup`, `screenshot`. **Voting:** no.

### 13. General Discussion
- **Purpose:** everything else - introductions, off-topic (lightly), meta.
- **Tags:** `intro`, `meta`, `off-topic`. **Voting:** no.

---

## Templates (Discourse category "Topic Templates")

### Bug Report template
```
**What happened**
(clear description of the bug)

**Steps to reproduce**
1.
2.
3.

**Expected vs actual**

**Environment**
- LynxDock version:
- OS:
- Self-hosted or Quick Call:

**Logs / screenshots**
```

### Feature Request template
```
**The problem**
(what are you trying to do that's hard today?)

**Proposed solution**

**Who benefits**
(which communities / use cases)

**Alternatives considered**
```

### Squadron Operation template
```
**Operation name**
**Game / setting**
**Size** (pilots / wings)

**Briefing**
(objective, intent, timeline)

**Assignments** (wings & roles)

**Map / assets**
(attach images or links)

**Downloadable package** (optional)
(config, waypoints, roster)

**After-action report** (add later)
(what happened, lessons learned)
```

### Theme submission template
```
**Theme name**
**Type** (skin / icon pack / Mission Control pack / profile)
**Preview** (screenshots - required)
**Download / install**
**Compatibility** (LynxDock version)
**License**
```

### Plugin submission template
```
**Plugin name**
**What it does**
**Type** (integration / automation / bot / script)
**Install / usage**
**Source** (repo link)
**Compatibility** & **License**
```

---

## Phase 3 - Special LynxDock experiences

These are built on top of categories using tags, templates, and (later) light
theme components. No custom app is needed to launch.

### 1. Operation Library
- **Home:** Squadron Operations category.
- **How:** the Operation template + tags (`briefing`, `aar`, `package`, game
  tags). A pinned index topic links "featured operations." Downloadable packages
  are file uploads (raise the allowed size/types for TL2+).
- **Later upgrade:** a theme component that renders operations as a filterable
  grid by game/size.

### 2. Theme Gallery
- **Home:** Themes / Skins category.
- **How:** theme template (screenshot required) + reaction-based sorting. Pinned
  "How to submit a theme" and "How to install a theme" posts.
- **Later:** gallery theme component with cover images.

### 3. Plugin Directory
- **Home:** Plugins category.
- **How:** plugin template + `verified` mod tag for reviewed plugins + a safety
  note (install third-party plugins at your own risk).

### 4. Public Roadmap
- **How:** Feature Requests category with voting + status tags: `proposed` ->
  `accepted` -> `planned` -> `in-development` -> `testing` -> `released`.
- A pinned "Roadmap board" topic groups current items by status; the main site's
  `/roadmap` links here. Optionally use the `discourse-roadmap` style board view.

### 5. Developer Blog
- **Home:** Development Updates category.
- **Cadence:** weekly. **Template:** "Shipped / Broke / Changed / Next".
- Cross-posted or linked from the main site's `/blog` and `/features` so the
  marketing site and community share one dev narrative.
