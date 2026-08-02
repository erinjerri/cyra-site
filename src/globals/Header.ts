import type { GlobalConfig } from 'payload'

import { ctaFields, navLinkFields } from '@/blocks/TimeBite/shared'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'logoText', type: 'text', defaultValue: 'TimeBite' },
    { name: 'logoTag', type: 'text', defaultValue: 'by Creating Your Reality' },
    { name: 'navLinks', type: 'array', fields: navLinkFields },
    { name: 'cta', type: 'group', fields: ctaFields },
  ],
}
