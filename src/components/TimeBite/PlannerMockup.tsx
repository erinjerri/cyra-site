import type { BlockImage, CoverConcept } from './types'

/**
 * A conceptual planner cover, drawn in CSS.
 *
 * The same decision as `LayoutSketch`: while no book has been printed, an
 * empty slot draws an obvious concept rather than a photorealistic render. A
 * render would depict a manufactured object that does not exist, which on a
 * page with a price beside it is a claim rather than a placeholder — hence the
 * "Concept" flag, which is part of the drawing and not decoration.
 *
 * The two colourways are deliberately NOT theme tokens. This depicts a
 * physical object: a black book is black on a white page too. Only the frame
 * around it follows the theme.
 *
 * The foil is flat colour. A metallic finish is a gradient, and design.md §10
 * rules gradients out — so the metal is described in the caption and drawn as
 * the flat brand gold or a flat silver.
 */

const COVER_LABELS: Record<CoverConcept, string> = {
  'black-gold': 'Concept cover A: a black planner with the Creating Your Reality wordmark in metallic gold.',
  'midnight-silver':
    'Concept cover B: a midnight blue planner with the Creating Your Reality wordmark in metallic silver.',
}

export function PlannerMockup({
  cover = 'black-gold',
  image,
  alt,
  flag = 'Concept',
  subtitle = 'Annual Planner',
  className,
}: {
  cover?: CoverConcept
  /** A real photograph, once one exists. Replaces the drawing entirely. */
  image?: BlockImage
  alt?: string
  /** The corner marker. Pass an empty string once the book is real. */
  flag?: string
  subtitle?: string
  className?: string
}) {
  const upload = image && typeof image === 'object' ? image : null
  const src = upload?.url

  const classes = ['tb-planner-mock', `tb-planner-mock-${cover}`, className].filter(Boolean).join(' ')

  if (src) {
    return (
      <figure className={classes}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={alt || upload?.alt || ''} loading="lazy" src={src} />
      </figure>
    )
  }

  return (
    <div aria-label={alt || COVER_LABELS[cover]} className={classes} role="img">
      <span aria-hidden="true" className="tb-planner-mock-spine" />
      <div aria-hidden="true" className="tb-planner-mock-face">
        <span className="tb-planner-mock-rule" />
        <p className="tb-planner-mock-brand">
          Creating
          <br />
          Your
          <br />
          Reality
        </p>
        {subtitle ? <p className="tb-planner-mock-sub">{subtitle}</p> : null}
        <span className="tb-planner-mock-rule" />
      </div>
      {flag ? (
        <span aria-hidden="true" className="tb-planner-mock-flag">
          {flag}
        </span>
      ) : null}
    </div>
  )
}
