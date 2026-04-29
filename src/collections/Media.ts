import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    { name: 'alt', type: 'text' },
    {
      name: 'r2Url',
      type: 'text',
      admin: {
        description: 'Public Cloudflare R2 URL when media is served externally.',
      },
    },
  ],
}
