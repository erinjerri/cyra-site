import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    // Local-disk fallback, used only when R2 is not configured. When
    // USE_R2_STORAGE=true the s3 adapter takes over and this is ignored.
    // See src/plugins/storage.ts and docs/MediaStorage.md.
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    { name: 'alt', type: 'text' },
    {
      name: 'r2Url',
      type: 'text',
      admin: {
        description:
          'Legacy field. Not read by anything — the storage adapter now generates public URLs automatically. Safe to leave blank; kept only so existing values are not dropped.',
      },
    },
  ],
}
