import type { GlobalConfig } from 'payload'

import { ctaFields } from '@/blocks/TimeBite/shared'
import {
  BETA_CTA_LABEL,
  ORGANIZATION_DESCRIPTION,
  ORGANIZATION_NAME,
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME,
  PRODUCT_TAGLINE,
} from '@/utilities/brand'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: PRODUCT_NAME,
    },
    {
      name: 'organizationName',
      type: 'text',
      defaultValue: ORGANIZATION_NAME,
    },
    {
      name: 'siteTagline',
      type: 'text',
      defaultValue: PRODUCT_TAGLINE,
    },
    {
      name: 'brandDescription',
      type: 'textarea',
      defaultValue: ORGANIZATION_DESCRIPTION,
    },
    {
      name: 'productDescription',
      type: 'textarea',
      defaultValue: PRODUCT_DESCRIPTION,
    },
    {
      name: 'openGraphDescription',
      type: 'textarea',
      defaultValue: PRODUCT_DESCRIPTION,
    },
    {
      name: 'headerTag',
      type: 'text',
      defaultValue: 'by Creating Your Reality',
    },
    {
      name: 'footerBrandStatement',
      type: 'textarea',
      defaultValue: 'Creating Your Reality is the philosophy behind TimeBite, and everything we build next.',
    },
    {
      name: 'betaCta',
      type: 'group',
      label: 'Beta call to action',
      admin: {
        description:
          'The site-wide default for the beta button. Blocks that set their own button override this; blocks that leave it blank fall back to here. This is the one place to change where "Join the TimeBite Beta" points.',
      },
      fields: ctaFields,
    },
    {
      name: 'betaButtonLabel',
      type: 'text',
      label: 'Beta button label (legacy)',
      defaultValue: BETA_CTA_LABEL,
      admin: { description: 'Superseded by "Beta call to action" above. Kept so existing values are not dropped.' },
    },
    {
      name: 'substackButtonLabel',
      type: 'text',
      defaultValue: 'Follow on Substack',
    },
    {
      name: 'notFoundCtaLabel',
      type: 'text',
      defaultValue: 'Back to TimeBite',
    },
    {
      name: 'legalNote',
      type: 'text',
      defaultValue: `© ${new Date().getFullYear()} Creating Your Reality. All rights reserved.`,
    },
  ],
}
