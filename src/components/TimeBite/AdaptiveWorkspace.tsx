'use client'

import { useMemo, useState } from 'react'

import { LayoutSketch } from './LayoutSketch'
import { StatusBadge } from './StatusBadge'
import type { WorkspaceBlockType, WorkspaceModule } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

/**
 * Lets a visitor actually assemble a workspace rather than read that they
 * could. Switching a module on and watching the canvas rearrange is the
 * fastest way to understand a product whose whole claim is that it bends to
 * you.
 *
 * The agent suggestion underneath is the other half of the argument: it asks,
 * it offers a first-class "Not now", and nothing lands in the workspace that
 * the person did not put there. That asymmetry is the product position, so it
 * is built into the interaction rather than asserted in the copy.
 */
export function AdaptiveWorkspace({ block }: { block: WorkspaceBlockType }) {
  const modules = useMemo(() => block.modules || [], [block.modules])
  const suggestion = block.suggestion

  const [enabled, setEnabled] = useState<string[]>(() =>
    modules.filter((module) => module.defaultOn && module.name).map((module) => module.name as string),
  )
  const [suggestionState, setSuggestionState] = useState<'open' | 'accepted' | 'dismissed'>('open')

  const toggle = (name: string) => {
    setEnabled((current) => (current.includes(name) ? current.filter((item) => item !== name) : [...current, name]))
  }

  const suggestedName = suggestion?.moduleName

  /**
   * A suggested widget is usually something narrower than a standing module —
   * "Launch Progress" rather than "Progress" — so accepting it synthesises a
   * tile rather than requiring the suggestion to name a module that already
   * exists in the picker.
   */
  const activeModules: WorkspaceModule[] = modules.filter((module) => module.name && enabled.includes(module.name))

  if (suggestionState === 'accepted' && suggestedName && !modules.some((module) => module.name === suggestedName)) {
    activeModules.push({ name: suggestedName, sketch: suggestion?.sketch, status: 'in-development' })
  }

  return (
    <section className="tb-section tb-workspace" id="workspace">
      <div className="tb-shell">
        <div className="tb-section-header">
          {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
          {block.headline ? <h2>{block.headline}</h2> : null}
          {block.body ? <p>{block.body}</p> : null}
        </div>

        <div className="tb-workspace-layout">
          {/* Components and goal areas are listed separately: one is a TimeBite
              surface, the other is a Creating Your Reality life domain, and
              mixing them implies they are the same kind of thing. */}
          <div className="tb-workspace-picker">
            {(
              [
                { kind: 'component', label: 'TimeBite components', id: 'tb-workspace-components' },
                { kind: 'goal-area', label: 'Goal areas', id: 'tb-workspace-goal-areas' },
              ] as const
            ).map((group) => {
              const groupModules = modules.filter((module) =>
                group.kind === 'component' ? module.kind !== 'goal-area' : module.kind === 'goal-area',
              )

              if (groupModules.length === 0) return null

              return (
                <div className="tb-module-group" key={group.kind}>
                  <p className="tb-workspace-picker-label" id={group.id}>
                    {group.label}
                  </p>
                  <ul className="tb-module-list" aria-labelledby={group.id}>
                    {groupModules.map((module, index) => (
                      <li key={index}>
                        <ModuleToggle
                          module={module}
                          on={Boolean(module.name && enabled.includes(module.name))}
                          onToggle={() => module.name && toggle(module.name)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="tb-workspace-canvas">
            <div className="tb-media tb-media-mac">
              <div className="tb-media-chrome" aria-hidden="true">
                <span className="tb-media-dot" />
                <span className="tb-media-dot" />
                <span className="tb-media-dot" />
                <span className="tb-media-title">Your workspace</span>
              </div>
              <div className="tb-workspace-tiles">
                {activeModules.length === 0 ? (
                  <p className="tb-workspace-empty">
                    Nothing switched on. Pick the parts of your life you actually want to look at.
                  </p>
                ) : (
                  activeModules.map((module, index) => (
                    <article
                      className={cx('tb-workspace-tile', module.name === suggestedName && 'tb-workspace-tile-new')}
                      key={index}
                    >
                      <div className="tb-workspace-tile-head">
                        <h3>{module.name}</h3>
                        {module.status && module.status !== 'available' ? (
                          <StatusBadge size="sm" status={module.status} />
                        ) : null}
                      </div>
                      <LayoutSketch kind={module.sketch} />
                    </article>
                  ))
                )}
              </div>
            </div>
            <p aria-live="polite" className="sr-only">
              {activeModules.length} module{activeModules.length === 1 ? '' : 's'} in your workspace.
            </p>
          </div>
        </div>

        {suggestion?.prompt ? (
          <div className="tb-suggestion" role="group" aria-label="Example agent suggestion">
            {suggestionState === 'open' ? (
              <>
                <div className="tb-suggestion-copy">
                  {suggestion.source ? <p className="tb-suggestion-source">{suggestion.source}</p> : null}
                  <p className="tb-suggestion-prompt">{suggestion.prompt}</p>
                </div>
                <div className="tb-suggestion-actions">
                  <button
                    className="tb-button tb-button-compact"
                    onClick={() => {
                      if (suggestedName) {
                        setEnabled((current) =>
                          current.includes(suggestedName) ? current : [...current, suggestedName],
                        )
                      }
                      setSuggestionState('accepted')
                    }}
                    type="button"
                  >
                    {suggestion.acceptLabel || 'Add'}
                  </button>
                  <button
                    className="tb-button tb-button-compact tb-button-secondary"
                    onClick={() => setSuggestionState('dismissed')}
                    type="button"
                  >
                    {suggestion.dismissLabel || 'Not now'}
                  </button>
                </div>
              </>
            ) : (
              <div className="tb-suggestion-resolved">
                <p>
                  {suggestionState === 'accepted'
                    ? `Added${suggestedName ? ` — ${suggestedName} is in your workspace.` : '.'}`
                    : suggestion.dismissedNote || 'Not now. It will stay out of the way.'}
                </p>
                <button className="tb-text-button" onClick={() => setSuggestionState('open')} type="button">
                  Show the suggestion again
                </button>
              </div>
            )}
          </div>
        ) : null}

        {block.footnote ? <p className="tb-workspace-footnote">{block.footnote}</p> : null}
      </div>
    </section>
  )
}

function ModuleToggle({
  module,
  on,
  onToggle,
}: {
  module: WorkspaceModule
  on: boolean
  onToggle: () => void
}) {
  return (
    <button
      aria-checked={on}
      className={cx('tb-module', on && 'tb-module-on')}
      onClick={onToggle}
      role="switch"
      type="button"
    >
      <span className="tb-module-name">{module.name}</span>
      {module.description ? <span className="tb-module-description">{module.description}</span> : null}
      {module.status && module.status !== 'available' ? <StatusBadge size="sm" status={module.status} /> : null}
    </button>
  )
}
