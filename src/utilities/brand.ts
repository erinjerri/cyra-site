/**
 * The canonical positioning strings.
 *
 * These were duplicated verbatim across seven files — the SEO plugin, the
 * OpenGraph defaults, the OG image, JSON-LD, the site-settings defaults and two
 * metadata helpers. Repositioning the product meant editing all seven and
 * hoping none were missed, which is exactly how a site ends up describing a
 * macOS planner as an iPhone notes app in its search results.
 *
 * Editors override these per-site in /admin via the `site-settings` global;
 * these are the fallbacks behind those fields.
 */

export const PRODUCT_NAME = 'TimeBite'
export const ORGANIZATION_NAME = 'Creating Your Reality'

export const PRODUCT_TAGLINE = 'turn your goals into a system that learns how you work'

export const PRODUCT_DESCRIPTION =
  'TimeBite turns your goals into milestones, actions and scheduled time on macOS — then tracks what actually happened, so you can adjust what comes next.'

export const ORGANIZATION_DESCRIPTION =
  'Creating Your Reality is the philosophy and framework behind TimeBite: what kind of life you are trying to build.'

export const OG_TITLE = 'TimeBite — turn your goals into a system that learns how you work.'

/** Platforms in the order they exist for us. macOS is first, and stays first. */
export const SUPPORTED_PLATFORMS = 'macOS'

/**
 * The beta CTA wording. The destination deliberately does NOT live here — it
 * is a Payload field (`site-settings` → Beta call to action, or the button on
 * an individual block), so it can be repointed from /admin without a deploy.
 * This constant is only the fallback label used when nothing is set yet.
 */
export const BETA_CTA_LABEL = 'Join the TimeBite Beta'
