import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/TimeBite/Footer'
import { Header } from '@/components/TimeBite/Header'
import { PostSubstackCta } from '@/components/TimeBite/PostSubstackCta'
import { getFooter, getHeader } from '@/utilities/getGlobals'
import { getPostBySlug } from '@/utilities/getPosts'
import { generateMeta } from '@/utilities/generateMeta'

export const dynamic = 'force-dynamic'

const CATEGORY_LABELS: Record<string, string> = {
  'intentional-living': 'Intentional living',
  planning: 'Planning & productivity',
  building: 'Building TimeBite',
  career: 'Career',
  notes: 'Notes',
}

function formatDate(value?: string | null) {
  if (!value) return null
  // Fixed locale + UTC so server and client render the same string.
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  return await generateMeta({
    doc: {
      title: post.title,
      slug: `blog/${post.slug}`,
      meta: {
        title: post.meta?.title,
        description: post.meta?.description || post.excerpt,
        image: post.meta?.image ?? post.heroImage,
      },
    },
  })
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, header, footer] = await Promise.all([getPostBySlug(slug), getHeader(), getFooter()])

  if (!post) notFound()

  const cover = typeof post.heroImage === 'object' && post.heroImage ? post.heroImage : null
  const date = formatDate(post.publishedAt)
  const category = post.category ? CATEGORY_LABELS[post.category] || post.category : null

  return (
    <>
      <a className="tb-skip-link" href="#main-content">
        Skip to content
      </a>
      <Header data={header} />

      <main className="tb-page" id="main-content">
        <article className="tb-post">
          <header className="tb-section tb-post-head">
            <div className="tb-shell tb-post-shell">
              <Link className="tb-post-back" href="/blog">
                ← All writing
              </Link>
              {category ? <p className="tb-eyebrow">{category}</p> : null}
              <h1>{post.title}</h1>
              {post.excerpt ? <p className="tb-post-excerpt">{post.excerpt}</p> : null}
              <p className="tb-post-meta">
                {date}
                {post.readingMinutes ? ` · ${post.readingMinutes} min read` : null}
              </p>
            </div>
          </header>

          {cover?.url ? (
            <div className="tb-shell tb-post-cover">
              <figure className="tb-media">
                <div className="tb-media-stage" style={{ aspectRatio: '16 / 9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={cover.alt || ''} src={cover.url} />
                </div>
              </figure>
            </div>
          ) : null}

          <div className="tb-shell tb-post-shell tb-post-body">
            <RichText data={post.content} />
          </div>

          <div className="tb-shell tb-post-shell">
            {/* Rendered automatically from the post's substackUrl, or the
                site-wide Substack link. Never typed per post. */}
            <PostSubstackCta substackUrl={post.substackUrl} title={post.title} />
          </div>
        </article>
      </main>

      <Footer data={footer} />
    </>
  )
}
