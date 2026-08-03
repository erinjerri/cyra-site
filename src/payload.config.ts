import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { getURL } from './utilities/getURL'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { SiteSettings } from './globals/SiteSettings'
import { storagePlugins } from './plugins/storage'

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Pages, Media, Users],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'timebite-local-dev-secret',
  sharp,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1/timebite-cyra-site',
  }),
  plugins: [
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: { doc: { title?: string } }) =>
        doc?.title && doc.title !== 'TimeBite' ? `${doc.title} | TimeBite` : 'TimeBite',
      generateDescription: () =>
        'TimeBite keeps your notes, calendar, goals, and reflections in one shared memory, so the things you care about stop slipping through the week.',
      generateURL: ({ doc }: { doc: { slug?: string } }) =>
        `${getURL()}${doc?.slug && doc.slug !== 'home' ? `/${doc.slug}` : ''}`,
    }),
    redirectsPlugin({
      collections: ['pages'],
    }),
    // Empty unless USE_R2_STORAGE=true and R2 credentials are present.
    ...storagePlugins,
  ],
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
})
