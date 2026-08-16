import Link from 'next/link'

import type { Post } from '@/payload-types'

const CATEGORY_LABELS: Record<string, string> = {
  'intentional-living': 'Intentional living',
  planning: 'Planning & productivity',
  building: 'Building TimeBite',
  career: 'Career',
  notes: 'Notes',
}

/** Which section chip colour a category borrows, so the blog uses the same palette. */
const CATEGORY_CHIP: Record<string, string> = {
  'intentional-living': 'var(--tb-chip-lavender)',
  planning: 'var(--tb-chip-blue)',
  building: 'var(--tb-chip-teal)',
  career: 'var(--tb-chip-gold)',
  notes: 'var(--tb-chip-pink)',
}

function formatDate(value?: string | null) {
  if (!value) return null
  // Fixed locale and UTC: the server and the browser must format identically or
  // React reports a hydration mismatch on every card.
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export function PostCard({ post }: { post: Post }) {
  const cover = typeof post.heroImage === 'object' && post.heroImage ? post.heroImage : null
  const date = formatDate(post.publishedAt)
  const category = post.category ? CATEGORY_LABELS[post.category] || post.category : null

  return (
    <article className="tb-post-card">
      <Link className="tb-post-card-link" href={`/blog/${post.slug}`}>
        <div className="tb-post-card-media">
          {cover?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={cover.alt || ''} loading="lazy" src={cover.url} />
          ) : (
            // No cover yet: a flat block in the category colour rather than a
            // grey rectangle or a stock photo.
            <div
              aria-hidden="true"
              className="tb-post-card-placeholder"
              style={{ background: CATEGORY_CHIP[post.category || 'notes'] || 'var(--tb-chip-blue)' }}
            />
          )}
        </div>

        <div className="tb-post-card-body">
          {category ? (
            <span
              className="tb-post-card-chip"
              style={{ background: CATEGORY_CHIP[post.category || 'notes'] }}
            >
              {category}
            </span>
          ) : null}

          <h2>{post.title}</h2>
          {post.excerpt ? <p>{post.excerpt}</p> : null}

          <p className="tb-post-card-meta">
            {date}
            {post.readingMinutes ? ` · ${post.readingMinutes} min read` : null}
          </p>
        </div>
      </Link>
    </article>
  )
}
