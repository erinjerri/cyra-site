import 'dotenv/config'

import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { footerData, headerData } from '../endpoints/seed/header-footer'
import { philosophyPage } from '../endpoints/seed/philosophy-page'
import { timeBiteHome } from '../endpoints/seed/timebite-home'

type SeedPage = { slug: string } & Record<string, unknown>

async function upsertPage(payload: Payload, data: SeedPage) {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })

  const doc = existing.docs[0]

  if (doc) {
    await payload.update({ collection: 'pages', id: doc.id, data: data as never })
    console.log(`Updated page: ${data.slug}`)
    return
  }

  await payload.create({ collection: 'pages', data: data as never })
  console.log(`Created page: ${data.slug}`)
}

async function run() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({ slug: 'header', data: headerData as never })
  console.log('Updated global: header')

  await payload.updateGlobal({ slug: 'footer', data: footerData as never })
  console.log('Updated global: footer')

  await upsertPage(payload, timeBiteHome as SeedPage)
  await upsertPage(payload, philosophyPage as SeedPage)

  console.log('Seed complete.')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
