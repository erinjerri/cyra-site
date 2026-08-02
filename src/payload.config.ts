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

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Pages, Media, Users],
  globals: [Header, Footer],
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
        'TimeBite is the AI-powered personal operating system for intentional living, built on the Creating Your Reality framework.',
      generateURL: ({ doc }: { doc: { slug?: string } }) =>
        `${getURL()}${doc?.slug && doc.slug !== 'home' ? `/${doc.slug}` : ''}`,
    }),
    redirectsPlugin({
      collections: ['pages'],
    }),
  ],
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
})
