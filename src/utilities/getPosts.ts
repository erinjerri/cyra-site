import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Published posts for the blog index, featured first then newest.
 *
 * Access control on the collection already hides drafts from anonymous reads,
 * but the `_status` filter is repeated here so the intent survives if that
 * access rule is ever loosened.
 */
export async function getPublishedPosts(limit = 50) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: ['-featured', '-publishedAt'],
    limit,
    depth: 1,
  })

  return result.docs
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })

  return result.docs[0] || null
}
