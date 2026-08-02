import type { Field } from 'payload'

export const ctaFields: Field[] = [
  { name: 'label', type: 'text' },
  { name: 'url', type: 'text' },
]

export const headingFields: Field[] = [
  { name: 'eyebrow', type: 'text' },
  { name: 'headline', type: 'text', required: true },
  { name: 'body', type: 'textarea' },
]

export const sectionFields: Field[] = [
  ...headingFields,
  {
    name: 'cta',
    type: 'group',
    fields: ctaFields,
  },
]

export const itemFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'body', type: 'textarea' },
  { name: 'eyebrow', type: 'text' },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'assetUrl',
    type: 'text',
    admin: {
      description: 'Optional public Cloudflare R2 asset URL fallback.',
    },
  },
]

export const navLinkFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'url', type: 'text', required: true },
]

export const footerLinkFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'url', type: 'text' },
  {
    name: 'comingSoon',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Renders as a disabled label instead of a link when no page exists yet.',
    },
  },
]
