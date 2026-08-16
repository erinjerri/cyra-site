'use client'

import { useState } from 'react'

import { StatusBadge } from './StatusBadge'
import type { DualLoopBlockType } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

/**
 * Two loops behind a tab bar: TimeBite's execution stages and the Creating
 * Your Reality side.
 *
 * The tab shape is deliberately the macOS app's — Now / Plan / Track /
 * Dashboard for TimeBite, Discover for CYR — so the site and the product teach
 * the same structure. It is a real tablist with arrow-key support rather than
 * styled buttons, because a keyboard user meeting a tab bar expects arrows to
 * move between tabs.
 */
export function DualLoop({ block }: { block: DualLoopBlockType }) {
  const tabs = block.tabs || []
  const [active, setActive] = useState(0)

  if (tabs.length === 0) return null

  const current = tabs[active]

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const next = (active + delta + tabs.length) % tabs.length
    setActive(next)
    document.getElementById(`tb-loop-tab-${next}`)?.focus()
  }

  return (
    <section className="tb-section tb-dual-loop" id="how-it-works">
      <div className="tb-shell">
        <div className="tb-section-header">
          {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
          {block.headline ? <h2>{block.headline}</h2> : null}
          {block.body ? <p>{block.body}</p> : null}
        </div>

        <div className="tb-loop-tabs" onKeyDown={onKeyDown} role="tablist" aria-label="Product loops">
          {tabs.map((tab, index) => (
            <button
              aria-controls={`tb-loop-panel-${index}`}
              aria-selected={index === active}
              className={cx('tb-loop-tab', index === active && 'is-active')}
              id={`tb-loop-tab-${index}`}
              key={index}
              onClick={() => setActive(index)}
              role="tab"
              style={{ '--tb-tab-accent': `var(--tb-chip-${tab.accent || 'blue'})` } as React.CSSProperties}
              tabIndex={index === active ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          aria-labelledby={`tb-loop-tab-${active}`}
          className="tb-loop-panel"
          id={`tb-loop-panel-${active}`}
          role="tabpanel"
          style={{ '--tb-tab-accent': `var(--tb-chip-${current.accent || 'blue'})` } as React.CSSProperties}
        >
          {current.tagline ? <p className="tb-loop-tagline">{current.tagline}</p> : null}

          <ol className="tb-loop-stages">
            {(current.steps || []).map((step, index) => (
              <li className="tb-loop-stage" key={index}>
                <span aria-hidden="true" className="tb-loop-stage-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="tb-loop-stage-body">
                  <h3>{step.title}</h3>
                  {step.body ? <p>{step.body}</p> : null}
                  {step.status ? <StatusBadge size="sm" status={step.status} /> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
