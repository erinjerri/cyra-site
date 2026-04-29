import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Pages, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'timebite-local-dev-secret',
  sharp,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1/timebite-cyra-site',
  }),
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
})
