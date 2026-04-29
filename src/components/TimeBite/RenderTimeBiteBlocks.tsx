import { BetaSignup } from './BetaSignup'
import type { FAQBlock, TimeBiteBlock, TimeBiteItem } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

function SectionHeader({ block, align = 'center' }: { block: TimeBiteBlock; align?: 'center' | 'left' }) {
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
      <span className="tb-card-signal" aria-hidden="true" />
      {item.eyebrow ? <p className="tb-card-eyebrow">{item.eyebrow}</p> : null}
      {item.title ? <h3>{item.title}</h3> : null}
      {item.body ? <p>{item.body}</p> : null}
    </article>
  )
}

function Hero({ block }: { block: TimeBiteBlock }) {
  return (
    <section className="tb-hero">
      <div className="tb-shell tb-hero-grid">
        <div className="tb-hero-copy">
          {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
          <h1>{block.headline}</h1>
          {block.body ? <p className="tb-hero-body">{block.body}</p> : null}
          <div className="tb-actions">
            <Button cta={block.cta} />
            <Button cta={block.secondaryCta} variant="secondary" />
          </div>
        </div>
        <div className="tb-cycle-panel" aria-label="TimeBite cycle visualization">
          <div className="tb-panel-topline">
            <span>Cycle Matrix</span>
            <span>Intent vs Actual</span>
          </div>
          <div className="tb-orbit tb-orbit-one" />
          <div className="tb-orbit tb-orbit-two" />
          <div className="tb-orbit tb-orbit-three" />
          <div className="tb-cycle-core">
            <span>Daily Intent</span>
            <strong>Action Timer</strong>
            <em>{'Track -> Goals -> Dashboard'}</em>
          </div>
          <div className="tb-ring-readout tb-ring-readout-one">App 31%</div>
          <div className="tb-ring-readout tb-ring-readout-two">Health 14%</div>
          <div className="tb-ring-readout tb-ring-readout-three">Life 22%</div>
        </div>
      </div>
      {block.stats?.length ? (
        <div className="tb-shell tb-stat-row">{block.stats.map((item, index) => <Card item={item} key={index} />)}</div>
      ) : null}
    </section>
  )
}

function ItemSection({ block, itemKey = 'items', variant }: { block: TimeBiteBlock; itemKey?: 'items' | 'steps' | 'tabs' | 'screens'; variant?: string }) {
  const items = block[itemKey] || []

  return (
    <section className={cx('tb-section', variant)}>
      <div className={cx('tb-shell', 'tb-section-layout')}>
        <SectionHeader block={block} />
        <div className={cx('tb-grid', itemKey === 'steps' && 'tb-steps', itemKey === 'tabs' && 'tb-tabs')}>
          {items.map((item, index) => (
            <Card item={item} index={itemKey === 'steps' ? index : undefined} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Beta({ block }: { block: TimeBiteBlock }) {
  return (
    <section className="tb-section tb-beta" id="beta">
      <div className="tb-shell tb-beta-grid">
        <SectionHeader block={block} align="left" />
        <BetaSignup cta={block.cta} note={block.formNote} />
      </div>
    </section>
  )
}

function FAQ({ block }: { block: FAQBlock }) {
  return (
    <section className="tb-section tb-faq">
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

export function RenderTimeBiteBlocks({ blocks }: { blocks: TimeBiteBlock[] }) {
  return (
    <main className="tb-page">
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'heroBlock':
            return <Hero block={block} key={index} />
          case 'authorityStripBlock':
            return <ItemSection block={block} variant="tb-authority" key={index} />
          case 'problemAgitationBlock':
            return <ItemSection block={block} variant="tb-problem" key={index} />
          case 'howItWorksBlock':
            return <ItemSection block={block} itemKey="steps" key={index} />
          case 'featureTabsBlock':
            return <ItemSection block={block} itemKey="tabs" variant="tb-feature-tabs" key={index} />
          case 'productScreensBlock':
            return <ItemSection block={block} itemKey="screens" variant="tb-screens" key={index} />
          case 'aiArchitectureBlock':
            return <ItemSection block={block} variant="tb-ai" key={index} />
          case 'betaSignupBlock':
            return <Beta block={block} key={index} />
          case 'founderCredibilityBlock':
            return <ItemSection block={block} variant="tb-founder" key={index} />
          case 'faqBlock':
            return <FAQ block={block as FAQBlock} key={index} />
          default:
            return null
        }
      })}
    </main>
  )
}
