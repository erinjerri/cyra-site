# Roadmap

## Product (Creating Your Reality ecosystem)

TimeBite is the flagship product and the only thing this site sells right now. CYR is the philosophy behind
it, not a competing product — the site's job is to market TimeBite and hint at what's next, not sell the
ecosystem directly.

TimeBite is **macOS-first**. The homepage no longer carries a `roadmapBlock`; sequencing is expressed through
the status badges on the platform cards and the agents section, so the roadmap and the marketing claims
cannot drift apart. Current state:

- **Available now:** TimeBite on macOS — goals, milestones, actions, Eisenhower planning, Kanban, calendar
  and time blocking, habit tracking, daily-to-annual review. Private beta.
- **In development:** progress dashboards and charts, the long-range Gantt-style goal view, the iPhone app,
  and the Goal Agent.
- **Planned:** iPad, Apple Watch, Career Agent, Fitness Agent, the physical paper planner.
- **Exploring:** Vision Pro, and a Finance Agent scoped to savings/budget goal tracking and education — not
  investment advice, and not securities recommendations.

The `roadmapBlock` remains registered in `src/blocks/TimeBite/config.ts` and can be added back to any page in
`/admin` if a standalone roadmap teaser is wanted again.

## Engineering, near-term

Roughly in priority order, none of it blocking the current launch:

1. **Media storage adapter** (`@payloadcms/storage-s3` against R2) — see `docs/DeploymentChecklist.md`. Needed
   before any real image upload survives a redeploy.
2. **Real testimonials.** `testimonialsBlock` schema exists; wire it into the homepage once there are actual
   beta users willing to be quoted.
3. **Stub pages as they're written** — Manifesto, Blog, About, Speaking, Press, Contact. Each is currently a
   disabled "coming soon" footer label; flip `comingSoon` off on the relevant Footer link once the page exists
   under `/[slug]`, no code change required.
4. **Per-page OG image variants.** Currently one static branded `opengraph-image.tsx` covers the whole site as
   a default (overridable per-page via the SEO plugin's image field once an editor uploads one). A dedicated
   `[slug]/opengraph-image.tsx` generating per-page images is a future nice-to-have, not a launch blocker.
5. **Site search / forms** (`plugin-search`, `plugin-form-builder`) — already installed, wire only if an
   actual search or dynamic-form requirement shows up.
