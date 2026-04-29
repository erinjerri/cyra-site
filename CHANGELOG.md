# Changelog

## Unreleased

- Added a TimeBite by CYRA dark-mode landing page adapted from the static mockup into reusable React sections.
- Added PayloadCMS block schemas for Hero, Authority Strip, Problem Agitation, How It Works, Feature Tabs, Product Screens, AI Architecture, Beta Signup, Founder Credibility, and FAQ.
- Added editable CTA, media, Cloudflare R2 asset URL fallback, and repeatable item fields across TimeBite blocks.
- Added sample TimeBite seed content for the pre-launch beta landing page.
- Added a beta signup component that uses `NEXT_PUBLIC_SUBSTACK_EMBED_URL` when present and falls back to an internal email capture placeholder.
- Kept MongoDB and Payload secrets environment-driven; no secret values are committed.
