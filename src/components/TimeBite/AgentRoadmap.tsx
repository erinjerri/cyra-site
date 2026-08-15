import { StatusBadge } from './StatusBadge'
import type { AgentsBlockType } from './types'

/**
 * The agent roadmap.
 *
 * Each card leads with the status badge, so nothing here can be mistaken for
 * something you can use today, and describes the agent by what it does for a
 * person — never by what it is made of. The `disclaimer` line exists so a card
 * can state its own boundary in the same breath as its promise; Finance uses
 * it to be explicit that it tracks money goals and does not recommend
 * investments.
 */
export function AgentRoadmap({ block }: { block: AgentsBlockType }) {
  const agents = block.agents || []

  if (agents.length === 0) return null

  return (
    <section className="tb-section tb-agents" id="agents">
      <div className="tb-shell">
        <div className="tb-section-header">
          {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
          {block.headline ? <h2>{block.headline}</h2> : null}
          {block.body ? <p>{block.body}</p> : null}
        </div>

        <div className="tb-grid tb-agent-grid">
          {agents.map((agent, index) => (
            <article className={`tb-card tb-agent tb-agent-${agent.status || 'planned'}`} key={index}>
              <StatusBadge status={agent.status} />
              <h3>{agent.name}</h3>
              {agent.body ? <p>{agent.body}</p> : null}
              {agent.capabilities?.length ? (
                <ul className="tb-agent-capabilities">
                  {agent.capabilities.map((capability, capabilityIndex) => (
                    <li key={capabilityIndex}>{capability.text}</li>
                  ))}
                </ul>
              ) : null}
              {agent.disclaimer ? <p className="tb-agent-disclaimer">{agent.disclaimer}</p> : null}
            </article>
          ))}
        </div>

        {block.footnote ? <p className="tb-agents-footnote">{block.footnote}</p> : null}
      </div>
    </section>
  )
}
