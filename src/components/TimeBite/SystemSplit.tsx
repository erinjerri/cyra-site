import { SectionHeader } from './SectionHeader'
import { StatusBadge } from './StatusBadge'
import type { SystemColumn, SystemSplitBlockType } from './types'

function Column({ column }: { column?: SystemColumn }) {
  if (!column) return null

  return (
    <div
      className="tb-system-column"
      style={{ '--tb-system-accent': `var(--tb-chip-${column.accent || 'blue'})` } as React.CSSProperties}
    >
      <p className="tb-system-label">{column.label}</p>
      {column.tagline ? <p className="tb-system-tagline">{column.tagline}</p> : null}
      <ul>
        {(column.items || []).map((item, index) => (
          <li key={index}>
            <span>{item.text}</span>
            {item.status && item.status !== 'available' ? <StatusBadge size="sm" status={item.status} /> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Digital for execution, physical for perspective — with the join in the middle.
 *
 * Two columns and a centre, rather than two cards side by side. The centre is
 * doing the work: without it the section reads as a comparison, and a
 * comparison invites a visitor to pick one. The flow line underneath states
 * the order information actually moves in, so the connection is specific
 * rather than asserted.
 *
 * The paper column carries no status badges on purpose. A printed page has no
 * build status, and tagging one "available" would be a category error.
 */
export function SystemSplit({ block }: { block: SystemSplitBlockType }) {
  const columns = block.columns || []

  if (columns.length === 0) return null

  const steps = (block.flow || '')
    .split('→')
    .map((step) => step.trim())
    .filter(Boolean)

  return (
    <section className="tb-section tb-system" id="system">
      <div className="tb-shell">
        <SectionHeader block={block} />

        <div className="tb-system-split">
          <Column column={columns[0]} />

          {/* Rendered between the two sides rather than after them: the centre
              is visually in the middle, and a screen reader that met it last
              would hear the two halves as a comparison instead of as a join. */}
          {block.center?.label ? (
            <div className="tb-system-center">
              <span aria-hidden="true" className="tb-system-center-rule" />
              <p className="tb-system-center-label">{block.center.label}</p>
              {block.center.body ? <p className="tb-system-center-body">{block.center.body}</p> : null}
            </div>
          ) : null}

          <Column column={columns[1]} />
        </div>

        {steps.length > 0 ? (
          <ol className="tb-system-flow">
            {steps.map((step, index) => (
              <li key={index}>
                <span className="tb-system-flow-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="tb-system-flow-label">{step}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  )
}
