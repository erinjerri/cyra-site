import { AdaptiveWorkspace } from './AdaptiveWorkspace'
import { AgentRoadmap } from './AgentRoadmap'
import { BetaSignup } from './BetaSignup'
import { CtaLink } from './CtaLink'
import { DualLoop } from './DualLoop'
import { MediaFrame } from './MediaFrame'
import { PricingSection } from './PricingSection'
import { ProductDemo } from './ProductDemo'
import { ProductGrid } from './ProductGrid'
import { ProductShowcase } from './ProductShowcase'
import { ScaleStory } from './ScaleStory'
import { StatusBadge } from './StatusBadge'
import { TimeLoop } from './TimeLoop'
import { resolveMedia } from './media'
import type {
  AgentsBlockType,
  DualLoopBlockType,
  FAQBlockType,
  PricingBlockType,
  ProductGridBlockType,
  TestimonialsBlockType,
  TimeBiteBlock,
  TimeBiteItem,
  WorkspaceBlockType,
} from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

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

// Buttons render through CtaLink so new-tab behaviour and analytics ids stay
// CMS-controlled. Nothing in this file contains a URL.
const Button = CtaLink

function Card({ item, index }: { item: TimeBiteItem; index?: number }) {
  return (
    <article className="tb-card">
      {typeof index === 'number' ? <span className="tb-card-index">{String(index + 1).padStart(2, '0')}</span> : null}
      {item.eyebrow ? <p className="tb-card-eyebrow">{item.eyebrow}</p> : null}
      {item.title ? <h3>{item.title}</h3> : null}
      {item.body ? <p>{item.body}</p> : null}
      {item.status ? <StatusBadge size="sm" status={item.status} /> : null}
    </article>
  )
}

/**
 * Copy is centred and narrow; the product shot underneath runs the full width
 * of the shell. On a 13" MacBook that is roughly 1120px of screenshot, which
 * is the difference between reading the interface and squinting at it.
 */
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
        {block.availabilityNote ? <p className="tb-hero-availability">{block.availabilityNote}</p> : null}
      </div>
      <div className="tb-shell tb-hero-media">
        <ProductShowcase desktop={block} phone={block.phone} />
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
  const media = resolveMedia(block)

  return (
    <section className="tb-section" id="how-it-works">
      <div className="tb-shell">
        <SectionHeader block={block} />
        <div className="tb-loop-layout">
          <div className="tb-loop-media">
            {media.poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media.poster} alt={media.alt} loading="lazy" />
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
  const items = (block.items || []).filter((item) => item.enabled !== false)

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
              <StatusBadge status={platform.status} />
              {platform.title ? <h3>{platform.title}</h3> : null}
              {platform.body ? <p>{platform.body}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * The alternating tour. Rows flip sides so the eye keeps moving down the page
 * rather than settling into a column, and every row gets media — a screenshot,
 * a clip, or the schematic — because a tour of an interface that shows no
 * interface is just a list.
 */
function Showcase({ block }: { block: TimeBiteBlock }) {
  const rows = block.rows || []

  if (rows.length === 0) return null

  return (
    <section className="tb-section tb-showcase" id="tour">
      <div className="tb-shell">
        <SectionHeader block={block} />
        <ol className="tb-showcase-rows">
          {rows.map((row, index) => (
            <li className={cx('tb-showcase-row', index % 2 === 1 && 'tb-showcase-row-reverse')} key={index}>
              <div className="tb-showcase-copy">
                {block.numbered ? (
                  <span className="tb-showcase-index">{String(index + 1).padStart(2, '0')}</span>
                ) : null}
                {row.title ? <h3>{row.title}</h3> : null}
                {row.body ? <p>{row.body}</p> : null}
                {row.status ? <StatusBadge size="sm" status={row.status} /> : null}
              </div>
              <MediaFrame className="tb-showcase-media" source={row} title={row.title} />
            </li>
          ))}
        </ol>
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
          case 'dualLoopBlock':
            return <DualLoop block={block as DualLoopBlockType} key={index} />
          case 'productDemoBlock':
            return <ProductDemo block={block} key={index} />
          case 'scaleStoryBlock':
            return <ScaleStory block={block} key={index} />
          case 'workspaceBlock':
            return <AdaptiveWorkspace block={block as WorkspaceBlockType} key={index} />
          case 'agentsBlock':
            return <AgentRoadmap block={block as AgentsBlockType} key={index} />
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
          case 'productGridBlock':
            return <ProductGrid block={block as ProductGridBlockType} key={index} />
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
