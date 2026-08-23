import { SectionHeader } from './SectionHeader'
import type { MethodologyBlockType } from './types'

/**
 * The CYR method, as an editorial band.
 *
 * This is the section that separates the planner from a dated agenda, so it
 * carries the argument rather than a diagram: six stages, each with the label
 * a person would use for it and the method that belongs to it.
 *
 * Identity-based and systems-based habit ideas are general and expressed here
 * in original CYR language. No third-party worksheet, diagram or wording is
 * reproduced, and none should be added later.
 */
export function MethodologyBand({ block }: { block: MethodologyBlockType }) {
  const stages = block.stages || []

  if (stages.length === 0) return null

  return (
    <section className="tb-section tb-methodology" id="methodology">
      <div className="tb-shell">
        <SectionHeader block={block} />

        <ol className="tb-method-stages">
          {stages.map((stage, index) => (
            <li className="tb-method-stage" key={index}>
              <span aria-hidden="true" className="tb-method-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="tb-method-label">{stage.label}</p>
              {stage.title ? <h3>{stage.title}</h3> : null}
              {stage.body ? <p className="tb-method-body">{stage.body}</p> : null}
            </li>
          ))}
        </ol>

        {block.closingStatement ? <p className="tb-method-closing">{block.closingStatement}</p> : null}
      </div>
    </section>
  )
}
