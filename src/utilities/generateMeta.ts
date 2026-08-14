import type { Metadata } from 'next'

import { getURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getSiteSettings } from './getSiteSettings'

type MetaImage = { url?: string | null } | string | null | undefined

type MetaDoc = {
  title?: string | null
  slug?: string | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: MetaImage
  } | null
}

function resolveImageUrl(image: MetaImage): string | undefined {
  if (!image) return undefined
  if (typeof image === 'string') return image
  return image.url || undefined
}

function fallbackTitle(doc?: MetaDoc | null, brandName = 'TimeBite'): string {
  if (!doc?.title) return brandName
  return doc.title === brandName ? doc.title : `${doc.title} | ${brandName}`
}

export async function generateMeta({ doc }: { doc?: MetaDoc | null }): Promise<Metadata> {
  const settings = await getSiteSettings()
  const brandName = settings?.brandName || 'TimeBite'
  const description =
    doc?.meta?.description ||
    settings?.productDescription ||
    'TimeBite keeps your notes, calendar, goals, and reflections in one shared memory, so the things you care about stop slipping through the week.'
  const title = doc?.meta?.title || fallbackTitle(doc, brandName)
  const path = doc?.slug && doc.slug !== 'home' ? `/${doc.slug}` : '/'
  const url = `${getURL()}${path}`
  const imageUrl = resolveImageUrl(doc?.meta?.image)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: mergeOpenGraph({
      title,
      description,
      url,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    }),
    twitter: {
      card: 'summary_large_image',
      title: title || undefined,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}
