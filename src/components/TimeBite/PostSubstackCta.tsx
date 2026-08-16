import { getSiteSettings } from '@/utilities/getSiteSettings'

import type { Cta } from './types'

/**
 * The "Read this on Substack" block at the end of every post.
 *
 * This is the whole point of the component: nobody types this line. It renders
 * from the post's own `substackUrl` when there is one, and otherwise from the
 * site-wide Substack link in site-settings. Add a post, and the footer is
 * already correct.
 *
 * Renders nothing when neither is set, rather than a dead button.
 */
export async function PostSubstackCta({
  substackUrl,
  title,
}: {
  substackUrl?: string | null
  title?: string | null
}) {
  const settings = await getSiteSettings()
  const fallback = (settings as unknown as { betaCta?: Cta })?.betaCta

  // A post-specific link wins; the site-wide Substack link is the safety net.
  const href = substackUrl?.trim() || fallback?.url || undefined

  if (!href) return null

  const isPostSpecific = Boolean(substackUrl?.trim())

  return (
    <aside className="tb-post-substack">
      <p className="tb-post-substack-lead">
        {isPostSpecific
          ? 'This post also lives on Substack, where the conversation happens in the comments.'
          : 'More writing like this lands on Substack first.'}
      </p>
      <a
        className="tb-button"
        data-analytics-event={isPostSpecific ? 'post_read_on_substack' : 'post_follow_substack'}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {isPostSpecific ? 'Read this on Substack' : 'Follow on Substack'}
      </a>
      {title ? <span className="sr-only">{` — ${title}`}</span> : null}
    </aside>
  )
}
