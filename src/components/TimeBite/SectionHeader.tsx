const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

export type HeaderContent = { eyebrow?: string; headline?: string; body?: string }

/**
 * Eyebrow chip, heading, standfirst — the opening of every section on the site.
 *
 * Extracted from RenderTimeBiteBlocks so the commerce sections open the same
 * way the rest of the page does. The eyebrow gets no colour here on purpose:
 * `--tb-section-chip` paints it from the section's own id, and setting `color`
 * anywhere below that rule is what makes chip text invisible (design.md §10).
 */
export function SectionHeader({ block, align = 'center' }: { block: HeaderContent; align?: 'center' | 'left' }) {
  return (
    <div className={cx('tb-section-header', align === 'left' && 'tb-section-header-left')}>
      {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
      {block.headline ? <h2>{block.headline}</h2> : null}
      {block.body ? <p>{block.body}</p> : null}
    </div>
  )
}
