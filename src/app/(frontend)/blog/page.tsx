import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@/components/TimeBite/Footer'
import { Header } from '@/components/TimeBite/Header'
import { PostCard } from '@/components/TimeBite/PostCard'
import { getFooter, getHeader } from '@/utilities/getGlobals'
import { getPublishedPosts } from '@/utilities/getPosts'
import { generateMeta } from '@/utilities/generateMeta'

// Live from Payload on every request, matching the other routes.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return await generateMeta({
    doc: {
      title: 'Blog',
      slug: 'blog',
      meta: {
        description:
          'Writing on intentional living, planning, and building TimeBite — from Creating Your Reality.',
      },
    },
  })
}

export default async function BlogIndexPage() {
  const [header, footer, posts] = await Promise.all([getHeader(), getFooter(), getPublishedPosts()])

  return (
    <>
      <a className="tb-skip-link" href="#main-content">
        Skip to content
      </a>
      <Header data={header} />

      <main className="tb-page" id="main-content">
        <section className="tb-section tb-blog-head" id="blog">
          <div className="tb-shell">
            <div className="tb-section-header">
              <p className="tb-eyebrow">Writing</p>
              <h1>Notes on building a life on purpose.</h1>
              <p>
                Intentional living, planning that survives a real week, and what it actually takes to
                build TimeBite.
              </p>
            </div>
          </div>
        </section>

        <section className="tb-section tb-blog-list">
          <div className="tb-shell">
            {posts.length === 0 ? (
              <p className="tb-blog-empty">
                Nothing published yet. The first posts are being written — follow along on Substack in
                the meantime.
              </p>
            ) : (
              <ol className="tb-post-grid">
                {posts.map((post) => (
                  <li key={post.id}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        <section className="tb-section tb-cta-banner">
          <div className="tb-shell tb-cta-banner-inner">
            <div className="tb-section-header">
              <h2>The product these notes are about.</h2>
              <p>TimeBite turns the ideas here into a system you can actually run.</p>
            </div>
            <div className="tb-actions tb-actions-center">
              <Link className="tb-button" href="/">
                See TimeBite
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer data={footer} />
    </>
  )
}
