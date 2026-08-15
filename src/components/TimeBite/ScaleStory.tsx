import type { CSSProperties } from 'react'

import type { TimeBiteBlock } from './types'

/**
 * ACTION → DAY → WEEK → MONTH → GOAL → YEAR.
 *
 * The rail beside each level widens as the horizon does, so a reader feels the
 * zoom-out before reading a word of it. It is a static bar rather than an
 * animation on purpose: the meaning is the proportion, and a proportion you
 * have to wait for is a proportion you cannot compare.
 */
export function ScaleStory({ block }: { block: TimeBiteBlock }) {
  const levels = block.levels || []

  if (levels.length === 0) return null

  return (
    <section className="tb-section tb-scale-section" id="scale">
      <div className="tb-shell">
        <div className="tb-section-header">
          {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
          {block.headline ? <h2>{block.headline}</h2> : null}
          {block.body ? <p>{block.body}</p> : null}
        </div>

        <ol className="tb-scale">
          {levels.map((level, index) => (
            <li
              className="tb-scale-level"
              key={index}
              style={{ '--tb-scale-fill': `${Math.round((100 * (index + 1)) / levels.length)}%` } as CSSProperties}
            >
              <p className="tb-scale-label">{level.label}</p>
              <div className="tb-scale-body">
                <div className="tb-scale-rail" aria-hidden="true">
                  <span className="tb-scale-fill" />
                </div>
                {level.title ? <h3>{level.title}</h3> : null}
                {level.body ? <p>{level.body}</p> : null}
              </div>
            </li>
          ))}
        </ol>

        {block.closingStatement ? <p className="tb-scale-closing">{block.closingStatement}</p> : null}
      </div>
    </section>
  )
}
