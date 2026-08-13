import { BetaSignup } from './BetaSignup'
import { PricingSection } from './PricingSection'
import { TimeLoop } from './TimeLoop'
import type {
  FAQBlockType,
  PricingBlockType,
  ShowcaseRow,
  TestimonialsBlockType,
  TimeBiteBlock,
  TimeBiteItem,
} from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

const statusLabel: Record<string, string> = {
  available: 'Available now',
  'in-development': 'In development',
  planned: 'Planned',
}

type HeaderContent = { eyebrow?: string; headline?: string; body?: string }

function SectionHeader({ block, align = 'center' }: { block: HeaderContent; align?: 'center' | 'left' }) {
  return (
    <div className={cx('tb-section-header', align === 'left' && 'tb-section-header-left')}>
      {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
      {block.headline ? <h2>{block.headline}</h2> : null}
      {block.body ? <p>{block.body}</p> : null}
    </div>
  )
}

function Button({ cta, variant = 'primary' }: { cta?: { label?: string; url?: string }; variant?: 'primary' | 'secondary' }) {
  if (!cta?.label) return null

  return (
    <a className={cx('tb-button', variant === 'secondary' && 'tb-button-secondary')} href={cta.url || '#'}>
      {cta.label}
    </a>
  )
}

function Card({ item, index }: { item: TimeBiteItem; index?: number }) {
  return (
    <article className="tb-card">
      {typeof index === 'number' ? <span className="tb-card-index">{String(index + 1).padStart(2, '0')}</span> : null}
      {item.eyebrow ? <p className="tb-card-eyebrow">{item.eyebrow}</p> : null}
      {item.title ? <h3>{item.title}</h3> : null}
      {item.body ? <p>{item.body}</p> : null}
    </article>
  )
}

function Hero({ block }: { block: TimeBiteBlock }) {
  return (
    <section className="tb-hero">
      <div className="tb-shell tb-hero-copy">
        {block.eyebrow ? <p className="tb-eyebrow tb-hero-eyebrow">{block.eyebrow}</p> : null}
        <h1>{block.headline}</h1>
        {block.body ? <p className="tb-hero-body">{block.body}</p> : null}
        <div className="tb-actions tb-actions-center">
          <Button cta={block.cta} />
          <Button cta={block.secondaryCta} variant="secondary" />
        </div>
      </div>
    </section>
  )
}

function Quote({ block }: { block: TimeBiteBlock }) {
  return (
    <section className="tb-section tb-quote">
      <div className="tb-shell tb-quote-inner">
        {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
        {block.statement ? <p className="tb-quote-statement">{block.statement}</p> : null}
        {block.emphasis ? <p className="tb-quote-emphasis">{block.emphasis}</p> : null}
        {block.attribution ? <p className="tb-quote-attribution">{block.attribution}</p> : null}
      </div>
    </section>
  )
}

function Timeline({ block }: { block: TimeBiteBlock }) {
  const steps = block.steps || []
  const image = resolveImage(block)

  return (
    <section className="tb-section" id="how-it-works">
      <div className="tb-shell">
        <SectionHeader block={block} />
        <div className="tb-loop-layout">
          <div className="tb-loop-media">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image.src} alt={image.alt} loading="lazy" />
            ) : (
              <TimeLoop />
            )}
          </div>
          <ol className="tb-timeline">
            {steps.map((step, index) => (
              <li className="tb-timeline-step" key={index}>
                <span className="tb-timeline-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  {step.title ? <h3>{step.title}</h3> : null}
                  {step.body ? <p>{step.body}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function About({ block }: { block: TimeBiteBlock }) {
  const parts = block.wordParts || []

  return (
    <section className="tb-section tb-about" id="about">
      <div className="tb-shell tb-about-inner">
        <SectionHeader block={block} />
        {parts.length ? (
          <dl className="tb-word-parts">
            {parts.map((part, index) => (
              <div className="tb-word-part" key={index}>
                <dt>{part.part}</dt>
                {part.meaning ? <dd>{part.meaning}</dd> : null}
              </div>
            ))}
          </dl>
        ) : null}
        {block.closingStatement ? <p className="tb-about-closing">{block.closingStatement}</p> : null}
      </div>
    </section>
  )
}

function FrameworkSection({ block }: { block: TimeBiteBlock }) {
  const pillars = block.pillars || []

  return (
    <section className="tb-section tb-framework">
      <div className="tb-shell tb-framework-inner">
        <SectionHeader block={block} align="left" />
        <div className="tb-framework-content">
          <ul className="tb-pillars">
            {pillars.map((pillar, index) => (
              <li key={index}>{pillar.label}</li>
            ))}
          </ul>
          {block.closingStatement ? <p className="tb-framework-closing">{block.closingStatement}</p> : null}
          <div className="tb-actions">
            <Button cta={block.cta} />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureGrid({ block }: { block: TimeBiteBlock }) {
  const items = block.items || []

  return (
    <section className="tb-section" id="features">
      <div className="tb-shell tb-section-layout">
        <SectionHeader block={block} />
        <div className="tb-grid tb-feature-grid">
          {items.map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformCards({ block }: { block: TimeBiteBlock }) {
  const platforms = block.platforms || []

  return (
    <section className="tb-section tb-platforms" id="platforms">
      <div className="tb-shell tb-section-layout">
        <SectionHeader block={block} />
        <div className="tb-grid tb-platform-grid">
          {platforms.map((platform, index) => (
            <article
              className={cx('tb-card', platform.status === 'available' && 'tb-platform-card-available')}
              key={index}
            >
              {platform.status ? <p className="tb-platform-status">{statusLabel[platform.status] || platform.status}</p> : null}
              {platform.title ? <h3>{platform.title}</h3> : null}
              {platform.body ? <p>{platform.body}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

type ImageSource = Pick<ShowcaseRow, 'image' | 'assetUrl' | 'imageAlt'>

function resolveImage(source: ImageSource): { src: string; alt: string } | null {
  const upload = source.image && typeof source.image === 'object' ? source.image : null
  const src = upload?.url || source.assetUrl

  if (!src) return null

  return { src, alt: source.imageAlt || upload?.alt || '' }
}

function Showcase({ block }: { block: TimeBiteBlock }) {
  const rows = block.rows || []

  if (rows.length === 0) return null

  return (
    <section className="tb-section tb-showcase">
      <div className="tb-shell">
        <SectionHeader block={block} />
        <div className="tb-showcase-rows">
          {rows.map((row, index) => {
            const image = resolveImage(row)

            return (
              <div
                className={cx(
                  'tb-showcase-row',
                  !image && 'tb-showcase-row-text-only',
                  Boolean(image) && index % 2 === 1 && 'tb-showcase-row-reverse',
                )}
                key={index}
              >
                <div className="tb-showcase-copy">
                  {row.title ? <h3>{row.title}</h3> : null}
                  {row.body ? <p>{row.body}</p> : null}
                </div>
                {image ? (
                  <figure className="tb-showcase-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  </figure>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Roadmap({ block }: { block: TimeBiteBlock }) {
  const highlights = block.highlights || []

  return (
    <section className="tb-section tb-roadmap" id="roadmap">
      <div className="tb-shell tb-roadmap-inner">
        <SectionHeader block={block} />
        {highlights.length ? (
          <ul className="tb-roadmap-highlights">
            {highlights.map((item, index) => (
              <li key={index}>{item.label}</li>
            ))}
          </ul>
        ) : null}
        {block.cta?.url ? (
          <div className="tb-actions tb-actions-center">
            <Button cta={block.cta} variant="secondary" />
          </div>
        ) : null}
      </div>
    </section>
  )
}

function Newsletter({ block }: { block: TimeBiteBlock }) {
  return (
    <section className="tb-section tb-beta" id="beta">
      <div className="tb-shell tb-beta-grid">
        <SectionHeader block={block} align="left" />
        <BetaSignup cta={block.cta} secondaryCta={block.secondaryCta} note={block.formNote} />
      </div>
    </section>
  )
}

function FAQ({ block }: { block: FAQBlockType }) {
  return (
    <section className="tb-section tb-faq" id="faq">
      <div className="tb-shell">
        <SectionHeader block={block} />
        <div className="tb-faq-list">
          {block.items?.map((item, index) => (
            <details key={index}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner({ block }: { block: TimeBiteBlock }) {
  return (
    <section className="tb-section tb-cta-banner">
      <div className="tb-shell tb-cta-banner-inner">
        <SectionHeader block={block} />
        <div className="tb-actions tb-actions-center">
          <Button cta={block.cta} />
          <Button cta={block.secondaryCta} variant="secondary" />
        </div>
      </div>
    </section>
  )
}

function Testimonials({ block }: { block: TestimonialsBlockType }) {
  const items = block.items || []

  if (items.length === 0) return null

  return (
    <section className="tb-section tb-testimonials">
      <div className="tb-shell tb-section-layout">
        <SectionHeader block={block} />
        <div className="tb-grid">
          {items.map((item, index) => (
            <article className="tb-card" key={index}>
              <span className="tb-card-signal" aria-hidden="true" />
              {item.quote ? <p>&ldquo;{item.quote}&rdquo;</p> : null}
              <p className="tb-testimonial-byline">
                {item.author}
                {item.role || item.company ? `, ${[item.role, item.company].filter(Boolean).join(' at ')}` : null}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function RenderTimeBiteBlocks({ blocks }: { blocks: TimeBiteBlock[] }) {
  return (
    <main className="tb-page" id="main-content">
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'heroBlock':
            return <Hero block={block} key={index} />
          case 'quoteBlock':
            return <Quote block={block} key={index} />
          case 'timelineBlock':
            return <Timeline block={block} key={index} />
          case 'aboutBlock':
            return <About block={block} key={index} />
          case 'frameworkSectionBlock':
            return <FrameworkSection block={block} key={index} />
          case 'featureGridBlock':
            return <FeatureGrid block={block} key={index} />
          case 'showcaseBlock':
            return <Showcase block={block} key={index} />
          case 'platformCardsBlock':
            return <PlatformCards block={block} key={index} />
          case 'roadmapBlock':
            return <Roadmap block={block} key={index} />
          case 'pricingBlock':
            return <PricingSection block={block as PricingBlockType} key={index} />
          case 'newsletterBlock':
            return <Newsletter block={block} key={index} />
          case 'faqBlock':
            return <FAQ block={block as FAQBlockType} key={index} />
          case 'ctaBlock':
            return <CtaBanner block={block} key={index} />
          case 'testimonialsBlock':
            return <Testimonials block={block as TestimonialsBlockType} key={index} />
          default:
            return null
        }
      })}
    </main>
  )
}
