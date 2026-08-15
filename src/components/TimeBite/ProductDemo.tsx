import { MediaFrame } from './MediaFrame'
import { resolveMedia } from './media'
import type { TimeBiteBlock } from './types'

/**
 * The 45–60 second walkthrough.
 *
 * Wider than the reading column and centred, because the point of the section
 * is the interface rather than the words around it. The transcript sits in a
 * closed `<details>` — present for anyone who needs it, silent for everyone
 * else, and no JavaScript involved either way.
 */
export function ProductDemo({ block }: { block: TimeBiteBlock }) {
  const media = resolveMedia(block)

  return (
    <section className="tb-section tb-demo" id="demo">
      <div className="tb-shell">
        <div className="tb-section-header">
          {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
          {block.headline ? <h2>{block.headline}</h2> : null}
          {block.body ? <p>{block.body}</p> : null}
        </div>

        <div className="tb-demo-stage">
          <MediaFrame source={block} ratio="16 / 10" title={block.headline} />
        </div>

        {block.duration || block.transcript ? (
          <div className="tb-demo-meta">
            {block.duration ? <p className="tb-demo-duration">{block.duration}</p> : null}
            {block.transcript ? (
              <details className="tb-demo-transcript">
                <summary>Read what the demo shows</summary>
                <p>{block.transcript}</p>
              </details>
            ) : null}
          </div>
        ) : null}

        {media.empty ? (
          <p className="tb-demo-pending">The recorded walkthrough is being cut. The tour below covers the same ground.</p>
        ) : null}
      </div>
    </section>
  )
}
