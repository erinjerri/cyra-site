import type { Field } from 'payload'

export const ctaFields: Field[] = [
  { name: 'label', type: 'text' },
  { name: 'url', type: 'text' },
]

export const sectionFields: Field[] = [
  { name: 'eyebrow', type: 'text' },
  { name: 'headline', type: 'text', required: true },
  { name: 'body', type: 'textarea' },
  {
    name: 'cta',
    type: 'group',
    fields: ctaFields,
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: false,
  },
  {
    name: 'assetUrl',
    type: 'text',
    admin: {
      description: 'Optional public Cloudflare R2 asset URL fallback.',
    },
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
