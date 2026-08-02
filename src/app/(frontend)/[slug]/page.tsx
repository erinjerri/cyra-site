import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { FrontendShell } from '@/components/TimeBite/FrontendShell'
import type { TimeBiteBlock } from '@/components/TimeBite/types'
import { generateMeta } from '@/utilities/generateMeta'
import { getPageBySlug } from '@/utilities/getPage'

// Pages are edited live in Payload; render on every request so content
// changes show up immediately and unpublished/missing slugs correctly 404
// instead of serving a stale statically-cached 200.
export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  return generateMeta({ doc: page })
}

export default async function Page({ params }: Args) {
  const { slug } = await params

  if (slug === 'home') notFound()

  const page = await getPageBySlug(slug)

  if (!page) notFound()

  return <FrontendShell blocks={(page.layout || []) as unknown as TimeBiteBlock[]} />
}
