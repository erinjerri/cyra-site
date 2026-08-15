import { LayoutSketch } from './LayoutSketch'
import { resolveMedia } from './media'
import type { MediaContent, SketchKind } from './types'

const SKETCH_LABELS: Record<SketchKind, string> = {
  workspace: 'Schematic of the TimeBite workspace: a module sidebar beside panels of work.',
  goal: 'Schematic of a goal broken into milestones, the first two complete.',
  list: 'Schematic of a list of actions, some checked off.',
  matrix: 'Schematic of an Eisenhower matrix: four quadrants of work by urgency and importance.',
  board: 'Schematic of a Kanban board with three columns of cards.',
  calendar: 'Schematic of a week calendar with actions blocked into specific hours.',
  habits: 'Schematic of a habit grid, filled squares marking the days kept.',
  chart: 'Schematic of a progress chart, actual progress tracking against plan.',
  timeline: 'Schematic of a long-range timeline with goals spanning months.',
}

/**
 * Every screenshot and clip on the page goes through here, so window chrome,
 * aspect ratio, poster behaviour and the empty state stay identical wherever
 * media appears.
 *
 * Three states, in order of preference: a video (with the screenshot as its
 * poster), a screenshot, or the schematic. Video never autoplays and is never
 * muted-into-playing — it waits for a deliberate press, which also means the
 * page never makes noise at someone in an office.
 */
export function MediaFrame({
  source,
  ratio = '16 / 10',
  priority,
  className,
  title,
}: {
  source: MediaContent
  /** CSS aspect-ratio for the stage. Mac captures are 16/10; portrait shots differ. */
  ratio?: string
  priority?: boolean
  className?: string
  title?: string
}) {
  const media = resolveMedia(source)
  const sketchKind = media.sketch || 'workspace'
  const sketchLabel = media.alt || SKETCH_LABELS[sketchKind]

  return (
    <figure
      className={['tb-media', media.frame === 'mac' && 'tb-media-mac', media.empty && 'tb-media-empty', className]
        .filter(Boolean)
        .join(' ')}
    >
      {media.frame === 'mac' ? (
        <div className="tb-media-chrome" aria-hidden="true">
          <span className="tb-media-dot" />
          <span className="tb-media-dot" />
          <span className="tb-media-dot" />
          {title ? <span className="tb-media-title">{title}</span> : null}
        </div>
      ) : null}

      <div className="tb-media-stage" style={{ aspectRatio: ratio }}>
        {media.video ? (
          <video
            className="tb-media-video"
            controls
            preload="metadata"
            playsInline
            poster={media.poster || undefined}
            aria-label={media.alt || title || 'TimeBite product video'}
          >
            <source src={media.video} />
            Your browser cannot play this video.
          </video>
        ) : media.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.poster}
            alt={media.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
          />
        ) : (
          <div className="tb-media-sketch" role="img" aria-label={sketchLabel}>
            <LayoutSketch kind={sketchKind} />
          </div>
        )}
      </div>

      {media.caption ? <figcaption className="tb-media-caption">{media.caption}</figcaption> : null}
    </figure>
  )
}
