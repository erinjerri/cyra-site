# Roadmap

## Product (Creating Your Reality ecosystem)

TimeBite is the flagship product and the only thing this site sells right now. CYR is the philosophy behind
it, not a competing product — the site's job is to market TimeBite and hint at what's next, not sell the
ecosystem directly. Sequencing, as reflected in the `roadmapBlock` on the homepage:

- **Now:** TimeBite private iOS beta.
- **Coming Soon:** Studio (vision board, journaling, Ikigai, future-self work) — the deeper reflection
  counterpart to TimeBite's daily loop. Physical Paper Planner — an analog extension of the same framework.
- **Future:** Apple Watch (ambient, glanceable extension of TimeBite), Vision Pro (spatial cycles for deeper
  review), and eventually AI coaching that spans the ecosystem once there's enough behavioral data across
  products to make it more than a chatbot.

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
