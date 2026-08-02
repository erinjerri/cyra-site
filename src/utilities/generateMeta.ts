import type { Metadata } from 'next'

import { getURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

const DEFAULT_DESCRIPTION =
  'TimeBite is the AI-powered personal operating system for intentional living, built on the Creating Your Reality framework.'

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

function fallbackTitle(doc?: MetaDoc | null): string {
  if (!doc?.title) return 'TimeBite'
  return doc.title === 'TimeBite' ? doc.title : `${doc.title} | TimeBite`
}

export function generateMeta({ doc }: { doc?: MetaDoc | null }): Metadata {
  const title = doc?.meta?.title || fallbackTitle(doc)
  const description = doc?.meta?.description || DEFAULT_DESCRIPTION
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
