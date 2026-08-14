import type { Field, GlobalConfig } from 'payload'

import { footerLinkFields } from '@/blocks/TimeBite/shared'

const linkGroupFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'links', type: 'array', fields: footerLinkFields },
]

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'brandStatement', type: 'textarea' },
    { name: 'explore', type: 'group', fields: linkGroupFields },
    { name: 'product', type: 'group', fields: linkGroupFields },
    { name: 'comingSoon', type: 'group', fields: linkGroupFields },
    { name: 'learn', type: 'group', fields: linkGroupFields },
    { name: 'company', type: 'group', fields: linkGroupFields },
    { name: 'social', type: 'group', fields: linkGroupFields },
    {
      name: 'legalNote',
      type: 'text',
      admin: {
        description: 'e.g. "© Creating Your Reality. All rights reserved."',
      },
    },
  ],
}
