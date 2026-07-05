# LynxDock Community - Rollout Roadmap

How the community platform itself gets built and grows. Separate from the
product roadmap.

## Status model (also used for Feature Requests)

`Proposed` -> `Accepted` -> `Planned` -> `In Development` -> `Testing` ->
`Released`

## Phase 0 - Plan (this document set)  [Released]
- Architecture, categories, moderation, branding, launch checklist written.
- Decision: self-hosted Discourse at community.lynxdock.app.

## Phase 1 - Stand up the forum  [Planned]
- VPS + Discourse install + email + backups.
- Categories, templates, voting, roadmap tags, pinned starter posts.
- LynxDock branding applied.
- Reserve subdomains in Cloudflare.

## Phase 2 - Website integration  [Planned]
- lynxdock.app nav + footer + homepage point to Community.
- Homepage sections: Join the community, Share missions, Vote on features,
  Follow development, Build plugins, Download themes.
- (Implemented in the website repo - needs its own approval + build.)

## Phase 3 - Seed & soft launch  [Proposed]
- Seed real content: 2-3 operations, 1-2 themes, first dev log, roadmap board.
- Invite early users; gather first feedback; announce publicly.

## Phase 4 - Special experiences mature  [Proposed]
- Operation Library gallery view (theme component).
- Theme Gallery + Plugin Directory with cover images and `verified` review flow.
- Roadmap board view tightly linked to the main site's /roadmap.

## Phase 5 - Status & docs subdomains  [Proposed]
- status.lynxdock.app live with monitors.
- Evaluate splitting docs to docs.lynxdock.app and a developer portal at
  developer.lynxdock.app.

## Phase 6 - SSO  [Proposed - deferred]
- When LynxDock has user accounts, make LynxDock the identity provider and
  Discourse an SSO client via DiscourseConnect. No data migration.

## Success criteria (from the brief)
- Clear public community strategy: yes (this plan).
- Users know where to report bugs / request features: Bug Reports + Feature
  Requests categories with templates + voting.
- Users can share Squadron operations and themes/plugins: dedicated categories +
  templates powering the Operation Library, Theme Gallery, Plugin Directory.
- Website points clearly to the community: Phase 2 integration.
- Practical for a solo founder, minimal complexity, no custom forum rewrite: yes.
