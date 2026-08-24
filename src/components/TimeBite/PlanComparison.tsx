import { SectionHeader } from './SectionHeader'
import { StatusBadge } from './StatusBadge'
import type { PlanComparisonBlockType } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

/**
 * A short comparison, and a real `<table>`.
 *
 * It stays a table at every width rather than being restyled into cards on
 * small screens: changing `display` on table elements drops the implicit table
 * roles in several browsers, and a screen-reader user loses the column headers
 * that make the grid mean anything. Instead the schema caps this at three
 * columns and `table-layout: fixed` shares the width evenly, so two value
 * columns and a wrapping row label fit inside 375px with nothing to scroll.
 *
 * Values carry the shared status badge, so a row can list a capability that is
 * coming without the word "soon" being typed into the cell — where it would
 * still be sitting a year after the feature shipped.
 */
export function PlanComparison({ block }: { block: PlanComparisonBlockType }) {
  const columns = block.columns || []
  const rows = block.rows || []

  if (columns.length === 0 || rows.length === 0) return null

  return (
    <section className="tb-section tb-compare" id="compare">
      <div className="tb-shell">
        <SectionHeader block={block} />

        <table className="tb-compare-table">
          <thead>
            <tr>
              {/* Empty corner cell: the row labels are row headers, so this
                  column has no heading of its own to announce. */}
              <td />
              {columns.map((column, index) => (
                <th className={cx(column.featured && 'tb-compare-featured')} key={index} scope="col">
                  <span className="tb-compare-column-label">{column.label}</span>
                  {column.note ? <span className="tb-compare-column-note">{column.note}</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th scope="row">{row.label}</th>
                {columns.map((column, colIndex) => {
                  const cell = row.values?.[colIndex]
                  return (
                    <td className={cx(column.featured && 'tb-compare-featured')} key={colIndex}>
                      <span className="tb-compare-value">{cell?.value || '—'}</span>
                      {cell?.status && cell.status !== 'available' ? (
                        <StatusBadge size="sm" status={cell.status} />
                      ) : null}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {block.footnote ? <p className="tb-pricing-footnote">{block.footnote}</p> : null}
      </div>
    </section>
  )
}
