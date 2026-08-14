import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { FrontendShell } from '@/components/TimeBite/FrontendShell'
import type { TimeBiteBlock } from '@/components/TimeBite/types'
import { generateMeta } from '@/utilities/generateMeta'
import { getPageBySlug } from '@/utilities/getPage'

// Rendered live from Payload; see the matching note in [slug]/page.tsx.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home')
  return await generateMeta({ doc: page })
}

export default async function Page() {
  const page = await getPageBySlug('home')

  if (!page) notFound()

  return <FrontendShell blocks={(page.layout || []) as unknown as TimeBiteBlock[]} />
}
