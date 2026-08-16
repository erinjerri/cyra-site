import type { GlobalConfig } from 'payload'

import { footerLinkFields } from '@/blocks/TimeBite/shared'

/**
 * The footer.
 *
 * Columns are an array rather than six fixed groups (`explore`, `product`,
 * `comingSoon`…). Those names were baked into the schema, so renaming a column
 * or adding one meant a code change and a migration. An array lets the whole
 * footer be restructured in /admin.
 */
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'brandStatement', type: 'textarea' },
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      admin: { description: 'Drag to reorder. Each column gets its own accent colour in order.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'accent',
          type: 'select',
          defaultValue: 'blue',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Teal', value: 'teal' },
            { label: 'Gold', value: 'gold' },
            { label: 'Green', value: 'green' },
            { label: 'Pink', value: 'pink' },
            { label: 'Lavender', value: 'lavender' },
          ],
        },
        { name: 'links', type: 'array', fields: footerLinkFields },
      ],
    },
    {
      name: 'connect',
      type: 'group',
      label: 'Connect row',
      admin: { description: 'Social icons centred above the legal line.' },
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Connect' },
        {
          name: 'links',
          type: 'array',
          labels: { singular: 'Social link', plural: 'Social links' },
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              admin: { description: 'Picks the icon. Only these have artwork.' },
              options: [
                { label: 'GitHub', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Substack', value: 'substack' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'X', value: 'x' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'Pinterest', value: 'pinterest' },
                { label: 'Discord', value: 'discord' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              admin: { description: 'Leave blank and the icon renders dimmed and unclickable.' },
            },
          ],
        },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal links',
      labels: { singular: 'Legal link', plural: 'Legal links' },
      fields: footerLinkFields,
    },
    {
      name: 'legalNote',
      type: 'text',
      admin: {
        description: 'e.g. "© Creating Your Reality. All rights reserved."',
      },
    },
    {
      name: 'colophon',
      type: 'text',
      admin: { description: 'Small credit line, e.g. "Made with Payload CMS".' },
    },
  ],
}
