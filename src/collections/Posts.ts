import type { CollectionConfig } from 'payload'

/**
 * Blog posts.
 *
 * Deliberately leaner than the erinjerri-portf Posts collection: no Medium or
 * Paragraph sync, no crosspost review workflow, no populated-authors hook.
 * Those exist there because that site syncs from three platforms. This one
 * publishes here and points at Substack, so `substackUrl` is the only
 * syndication field.
 *
 * The "Read this on Substack" call to action at the end of a post is NOT a
 * field an editor types. It renders automatically from `substackUrl`, falling
 * back to the site-wide Substack link in site-settings — see PostSubstackCta.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  access: {
    // Drafts stay private; only published posts are readable by the site.
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    description: 'Written posts. Shown at /blog, newest first.',
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Lowercase and hyphenated. The URL becomes /blog/<slug>.' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description:
          'One or two sentences shown on the blog index and used as the SEO description when none is set.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover image',
      admin: {
        description:
          'Shown on the card and at the top of the post. Landscape, 1600×900 or larger. Uploaded through Media, so it goes to R2.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          admin: { width: '50%' },
          options: [
            { label: 'Intentional living', value: 'intentional-living' },
            { label: 'Planning & productivity', value: 'planning' },
            { label: 'Building TimeBite', value: 'building' },
            { label: 'Career', value: 'career' },
            { label: 'Notes', value: 'notes' },
          ],
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
            description: 'Controls ordering on the index. Leave blank and it fills in on publish.',
          },
        },
      ],
    },
    {
      name: 'readingMinutes',
      type: 'number',
      label: 'Reading time (minutes)',
      admin: {
        position: 'sidebar',
        description: 'Optional. Shown beside the date. Leave blank to hide it.',
      },
    },
    {
      name: 'substackUrl',
      type: 'text',
      label: 'Substack URL',
      admin: {
        position: 'sidebar',
        description:
          'Link to this post on Substack. When set, the end of the post shows "Read this on Substack" automatically — you never type that line yourself. Leave blank to fall back to the site-wide Substack link.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: { position: 'sidebar', description: 'Pins this post to the top of the index.' },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Publishing without a date would sort the post to the bottom forever.
        if (data?._status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  timestamps: true,
}
