import type { Cta } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

/**
 * The single place a CTA becomes an anchor.
 *
 * Label, destination, new-tab behaviour and the analytics event name all come
 * from Payload — no component on this site contains a URL. That is what makes
 * the beta CTA repointable from /admin: change it in the CMS and every button
 * that reads that field follows, with no deploy.
 *
 * `newTab` is honoured explicitly rather than inferred from "does it start with
 * http", because an editor may well want an external link to open in place.
 * Any new tab gets rel="noopener noreferrer" — never optional.
 */
export function CtaLink({
  cta,
  variant = 'primary',
  compact,
  className,
}: {
  cta?: Cta
  variant?: 'primary' | 'secondary'
  compact?: boolean
  className?: string
}) {
  if (!cta?.label) return null

  const newTab = Boolean(cta.newTab)

  return (
    <a
      className={cx(
        'tb-button',
        variant === 'secondary' && 'tb-button-secondary',
        compact && 'tb-button-compact',
        className,
      )}
      data-analytics-event={cta.analyticsId || undefined}
      href={cta.url || '#'}
      rel={newTab ? 'noopener noreferrer' : undefined}
      target={newTab ? '_blank' : undefined}
    >
      {cta.label}
    </a>
  )
}
