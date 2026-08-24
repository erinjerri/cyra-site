import 'dotenv/config'

import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { aboutPage } from '../endpoints/seed/about-page'
import { footerData, headerData } from '../endpoints/seed/header-footer'
import { plannerPage } from '../endpoints/seed/planner-page'
import { postsSeed } from '../endpoints/seed/posts'
import { pricingPage } from '../endpoints/seed/pricing-page'
import { productsSeed } from '../endpoints/seed/products'
import { shopPage } from '../endpoints/seed/shop-page'
import { siteSettingsData } from '../endpoints/seed/site-settings'
import { timeBiteHome } from '../endpoints/seed/timebite-home'

type SeedPage = { slug: string } & Record<string, unknown>
type SeedProduct = { slug: string } & Record<string, unknown>
type SeedPost = { slug: string } & Record<string, unknown>

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

/**
 * Products are matched on slug, so re-seeding updates an existing planner
 * rather than creating a second one. Anything an editor has changed in /admin
 * is overwritten — this is a content baseline, not a merge.
 */
async function upsertProduct(payload: Payload, data: SeedProduct) {
  const existing = await payload.find({
    collection: 'products',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })

  const doc = existing.docs[0]

  if (doc) {
    await payload.update({ collection: 'products', id: doc.id, data: data as never })
    console.log(`Updated product: ${data.slug}`)
    return
  }

  await payload.create({ collection: 'products', data: data as never })
  console.log(`Created product: ${data.slug}`)
}

/** Posts match on slug, so re-seeding updates rather than duplicating. */
async function upsertPost(payload: Payload, data: SeedPost) {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })

  const doc = existing.docs[0]

  if (doc) {
    await payload.update({ collection: 'posts', id: doc.id, data: data as never })
    console.log(`Updated post: ${data.slug}`)
    return
  }

  await payload.create({ collection: 'posts', data: data as never })
  console.log(`Created post: ${data.slug}`)
}

async function run() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({ slug: 'header', data: headerData as never })
  console.log('Updated global: header')

  await payload.updateGlobal({ slug: 'footer', data: footerData as never })
  console.log('Updated global: footer')

  await payload.updateGlobal({ slug: 'site-settings', data: siteSettingsData as never })
  console.log('Updated global: site-settings')

  for (const product of productsSeed) {
    await upsertProduct(payload, product as SeedProduct)
  }

  for (const post of postsSeed) {
    await upsertPost(payload, post as SeedPost)
  }

  await upsertPage(payload, timeBiteHome as SeedPage)
  await upsertPage(payload, aboutPage as SeedPage)
  await upsertPage(payload, shopPage as SeedPage)
  await upsertPage(payload, pricingPage as SeedPage)

  /*
   * The planner page relates to the planner product, and a relationship needs
   * the document's id — which only exists once the products above have been
   * written. Resolved by slug rather than hard-coded, so a database that was
   * seeded before this page existed still links up correctly.
   *
   * With no planner found the page still seeds; the campaign simply falls back
   * to its own copy and reports the product as a concept.
   */
  const planner = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'planner' } },
    limit: 1,
    depth: 0,
  })

  await upsertPage(payload, plannerPage(planner.docs[0]?.id as string | undefined) as SeedPage)

  console.log('Seed complete.')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
