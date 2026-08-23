import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { FrontendShell } from '@/components/TimeBite/FrontendShell'
import type { TimeBiteBlock } from '@/components/TimeBite/types'
import { generateMeta } from '@/utilities/generateMeta'
import { getPageBySlug } from '@/utilities/getPage'

/*
 * Product pages beneath the shop, e.g. /shop/planner.
 *
 * The Payload page's slug is the full path — `shop/planner` — rather than just
 * `planner`. That keeps one slug per URL: `getPageBySlug` finds it unchanged,
 * `sitemap.ts` already emits `${url}/${slug}` and gets the right address with
 * no special case, and the SEO plugin's canonical URL comes out correct.
 *
 * `/shop` itself is not handled here — a single-segment path still falls
 * through to the `[slug]` route, where it is an ordinary page.
 */
export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(`shop/${slug}`)
  return await generateMeta({ doc: page })
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  const page = await getPageBySlug(`shop/${slug}`)

  if (!page) notFound()

  // Same reasoning as the top-level [slug] route: these pages are a stack of
  // blocks whose headings all start at h2, so the page title supplies the one
  // h1 every page needs, visually hidden.
  return <FrontendShell blocks={(page.layout || []) as unknown as TimeBiteBlock[]} pageTitle={page.title} />
}
