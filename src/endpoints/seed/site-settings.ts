import { BETA_CTA_LABEL } from '../../utilities/brand'

/**
 * Site-wide defaults.
 *
 * `betaCta` is the single source of truth for where the beta button points.
 * Blocks that leave their own button blank fall back to this, so changing the
 * destination is one edit in /admin — no deploy, and no component to hunt
 * through for a hard-coded Substack URL.
 */
export const siteSettingsData = {
  betaCta: {
    label: BETA_CTA_LABEL,
    url: 'https://erinjerri.substack.com/',
    newTab: true,
    analyticsId: 'join_beta',
  },
  betaButtonLabel: BETA_CTA_LABEL,
  substackButtonLabel: 'Follow on Substack',
}
