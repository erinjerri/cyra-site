import type { AnnouncementBlockType } from './types'

/**
 * One line above the storefront, stating the launch order.
 *
 * Deliberately not a promotional device: no countdown, no "limited", no
 * inventory count. It answers a question a visitor genuinely has — which of
 * these two things can I get, and when — and the answer is content, so it
 * changes in /admin the day the answer does.
 *
 * Not a `<section>`: it carries no heading and belongs to the page rather than
 * to a part of it, so it sets its own accent inline instead of taking one from
 * a section id.
 */
export function AnnouncementStrip({ block }: { block: AnnouncementBlockType }) {
  if (block.enabled === false || !block.message) return null

  return (
    <aside
      className="tb-announce"
      style={{ '--tb-announce-accent': `var(--tb-chip-${block.accent || 'teal'})` } as React.CSSProperties}
    >
      <div className="tb-shell tb-announce-inner">
        <p>{block.message}</p>
        {block.cta?.label ? (
          <a
            className="tb-announce-link"
            data-analytics-event={block.cta.analyticsId || undefined}
            href={block.cta.url || '#'}
            rel={block.cta.newTab ? 'noopener noreferrer' : undefined}
            target={block.cta.newTab ? '_blank' : undefined}
          >
            {block.cta.label}
          </a>
        ) : null}
      </div>
    </aside>
  )
}
