import type { ReactElement } from 'react'
import { BetaSignup } from './BetaSignup'
import type { FAQBlock, PricingTier, TimeBiteBlock, TimeBiteItem } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

/* ── SVG icon system ── */
function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="2.5 8 6 11.5 12.5 4" />
    </svg>
  )
}

function IconCycle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="18" r="13" />
      <path d="M18 5v4M18 27v4M5 18h4M27 18h4" strokeWidth="2" />
      <circle cx="18" cy="18" r="5" fill="currentColor" opacity="0.2" />
    </svg>
  )
}

function IconMatrix({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <rect x="4" y="10" width="14" height="4" rx="1" />
      <rect x="4" y="17" width="22" height="4" rx="1" />
      <rect x="4" y="24" width="10" height="4" rx="1" />
    </svg>
  )
}

function IconAgent({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="6" width="10" height="10" rx="2" />
      <rect x="20" y="6" width="10" height="10" rx="2" />
      <rect x="6" y="20" width="10" height="10" rx="2" />
      <rect x="20" y="20" width="10" height="10" rx="2" />
    </svg>
  )
}

function IconIntent({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="8" y1="12" x2="28" y2="12" />
      <line x1="8" y1="18" x2="22" y2="18" />
      <line x1="8" y1="24" x2="26" y2="24" />
      <circle cx="28" cy="24" r="4" strokeWidth="1.5" />
    </svg>
  )
}

const CARD_ICONS: Record<number, (p: { className: string }) => ReactElement> = {
  0: IconCycle,
  1: IconMatrix,
  2: IconAgent,
  3: IconIntent,
}

/* ── Shared components ── */
function SectionHeader({ block, align = 'left' }: { block: TimeBiteBlock; align?: 'center' | 'left' }) {
  return (
    <div className={cx('tb-section-header', align === 'center' && 'text-center')}>
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
  const IconComp = typeof index === 'number' ? CARD_ICONS[index % 4] : undefined

  return (
    <article className="tb-card">
      {IconComp ? <IconComp className="tb-card-icon" /> : null}
      {item.eyebrow ? <p className="tb-card-eyebrow">{item.eyebrow}</p> : null}
      {item.title ? <h3>{item.title}</h3> : null}
      {item.body ? <p>{item.body}</p> : null}
    </article>
  )
}

/* ── Nav ── */
function Nav() {
  return (
    <nav className="tb-nav" aria-label="Primary">
      <div className="tb-shell tb-nav-inner">
        <span className="tb-nav-brand">TimeBite / CYRA</span>
        <div className="tb-nav-right">
          <a className="tb-nav-link" href="#features">Product</a>
          <a className="tb-nav-link" href="#pricing">Pricing</a>
          <a className="tb-nav-link" href="#beta">Beta</a>
        </div>
      </div>
    </nav>
  )
}

/* ── Cycle Matrix panel (hero right) ── */
type MatrixRow = { label: string; time: string; pct: number; variant?: string }

const MATRIX_ROWS: MatrixRow[] = [
  { label: 'App',    time: '3h 20m', pct: 34 },
  { label: 'Income', time: '2h 10m', pct: 22, variant: 'alt' },
  { label: 'Brand',  time: '1h 40m', pct: 17 },
  { label: 'Health', time: '1h 05m', pct: 11, variant: 'alt' },
  { label: 'Admin',  time: '0h 50m', pct: 9,  variant: 'alt2' },
  { label: 'Life',   time: '0h 35m', pct: 6,  variant: 'alt2' },
]

function CycleMatrixPanel() {
  return (
    <div className="tb-matrix-panel" aria-label="Cycle Matrix preview">
      <div className="tb-matrix-header">
        <span>Cycle Matrix</span>
        <span>Week 16 / 2025</span>
      </div>
      <div className="tb-matrix-rows" role="list">
        {MATRIX_ROWS.map((row) => (
          <div className="tb-matrix-row" key={row.label} role="listitem">
            <span className="tb-matrix-label">{row.label}</span>
            <div className="tb-matrix-bar-track">
              <div
                className={cx('tb-matrix-bar', row.variant && `tb-matrix-bar-${row.variant}`)}
                style={{ width: `${row.pct * 2.5}%` }}
              />
            </div>
            <span className="tb-matrix-time">{row.time}</span>
            <span className="tb-matrix-pct">{row.pct}%</span>
          </div>
        ))}
      </div>
      <div className="tb-matrix-footer">
        <span>Intent vs Actual</span>
        <strong>72% aligned</strong>
      </div>
    </div>
  )
}

/* ── Hero ── */
function Hero({ block }: { block: TimeBiteBlock }) {
  return (
    <section className="tb-hero">
      <div className="tb-shell">
        <span className="tb-crumb">TimeBite / CYRA</span>
        <div className="tb-hero-grid">
          <div className="tb-hero-copy">
            {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
            <h1>
              {block.headline ? (
                block.headline.replace('Engineer your focus.', '').trim()
                  ? (
                    <>
                      <em>Engineer your focus.</em>
                      {' '}
                      {block.headline.replace('Engineer your focus.', '').trim()}
                    </>
                  )
                  : block.headline
              ) : null}
            </h1>
            {block.body ? <p className="tb-hero-body">{block.body}</p> : null}
            <div className="tb-actions">
              <Button cta={block.cta} />
              <Button cta={block.secondaryCta} variant="secondary" />
            </div>
          </div>
          <CycleMatrixPanel />
        </div>
        {block.stats?.length ? (
          <div className="tb-stat-strip" role="list">
            {block.stats.map((item, i) => (
              <div className="tb-stat" key={i} role="listitem">
                <h3>{item.title}</h3>
                {item.body ? <p>{item.body}</p> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ── Generic 2-col section ── */
function ItemSection({ block, itemKey = 'items', variant }: { block: TimeBiteBlock; itemKey?: 'items' | 'steps' | 'tabs' | 'screens'; variant?: string }) {
  const items = block[itemKey] || []

  if (itemKey === 'screens') {
    return (
      <section className={cx('tb-section', variant)} id="features">
        <div className="tb-shell">
          <div className="tb-section-layout" style={{ marginBottom: '48px' }}>
            <SectionHeader block={block} />
          </div>
          <div className="tb-screens-grid">
            {items.map((item, i) => (
              <div className="tb-screen-card" key={i}>
                <div className="tb-screen-mock" aria-hidden="true">
                  <div className="tb-screen-mock-line" />
                  <div className="tb-screen-mock-line" />
                  <div className="tb-screen-mock-line" />
                  <div className="tb-screen-mock-line" />
                </div>
                <h3>{item.title}</h3>
                {item.body ? <p>{item.body}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cx('tb-section', variant)} id={variant?.includes('authority') ? 'features' : undefined}>
      <div className={cx('tb-shell', 'tb-section-layout')}>
        <SectionHeader block={block} />
        <div className={cx('tb-grid', itemKey === 'steps' && 'tb-steps')}>
          {items.map((item, i) => (
            itemKey === 'steps'
              ? (
                <article className="tb-card" key={i}>
                  <span className="tb-step-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  {item.body ? <p>{item.body}</p> : null}
                </article>
              )
              : <Card item={item} index={i} key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pricing ── */
function Pricing({ block }: { block: TimeBiteBlock }) {
  const tiers = block.tiers || []

  return (
    <section className="tb-section tb-pricing" id="pricing">
      <div className="tb-shell">
        <div style={{ maxWidth: '560px' }}>
          <SectionHeader block={block} />
        </div>
        <div className="tb-pricing-grid" role="list">
          {tiers.map((tier: PricingTier, i) => (
            <div className={cx('tb-plan', tier.featured && 'tb-plan-featured')} key={i} role="listitem">
              {tier.badge ? <span className="tb-plan-badge">{tier.badge}</span> : null}
              <p className="tb-plan-name">{tier.name}</p>
              <div className="tb-plan-price">
                {tier.price === 'Free' ? (
                  tier.price
                ) : tier.price === 'Custom' ? (
                  tier.price
                ) : (
                  <><sup>$</sup>{tier.price}</>
                )}
              </div>
              <p className="tb-plan-cadence">{tier.cadence}</p>
              <div className="tb-plan-divider" />
              <ul className="tb-plan-features">
                {tier.features.map((f, fi) => (
                  <li className="tb-plan-feature" key={fi}>
                    <IconCheck className="tb-plan-feature-check" />
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <a
                className={cx('tb-plan-cta', tier.featured && 'tb-plan-cta-featured')}
                href={tier.cta?.url || '#beta'}
              >
                {tier.cta?.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Beta signup ── */
function Beta({ block }: { block: TimeBiteBlock }) {
  return (
    <section className="tb-section tb-beta" id="beta">
      <div className="tb-shell tb-beta-grid">
        <SectionHeader block={block} />
        <BetaSignup cta={block.cta} note={block.formNote} />
      </div>
    </section>
  )
}

/* ── FAQ ── */
function FAQ({ block }: { block: FAQBlock }) {
  return (
    <section className="tb-section tb-faq">
      <div className="tb-shell">
        <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
          <SectionHeader block={block} />
        </div>
        <div className="tb-faq-list">
          {block.items?.map((item, i) => (
            <details key={i}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="tb-footer">
      <div className="tb-shell">
        <div className="tb-footer-top">
          <div className="tb-footer-brand-col">
            <span className="tb-footer-brand">TimeBite / CYRA</span>
            <p className="tb-footer-tagline">Engineer your focus.<br />See where your time actually goes.</p>
          </div>
          <nav className="tb-footer-nav" aria-label="Footer">
            <div className="tb-footer-col">
              <p className="tb-footer-col-heading">CYRA</p>
              <a href="https://cyra.ai">About</a>
              <a href="mailto:hello@cyra.ai">Contact</a>
              <a href="#beta">Careers</a>
            </div>
            <div className="tb-footer-col">
              <p className="tb-footer-col-heading">Product</p>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#beta">Beta access</a>
              <a href="#beta">How it works</a>
            </div>
            <div className="tb-footer-col">
              <p className="tb-footer-col-heading">Platforms</p>
              <a href="#beta">iOS</a>
              <a href="#beta">visionOS</a>
              <a href="#beta">watchOS</a>
              <a href="#beta">macOS</a>
              <a href="#beta">Meta AI Glasses</a>
            </div>
            <div className="tb-footer-col">
              <p className="tb-footer-col-heading">Legal</p>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </nav>
        </div>
        <div className="tb-footer-bottom">
          <span>TimeBite by CYRA. Private beta.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

/* ── Root renderer ── */
export function RenderTimeBiteBlocks({ blocks }: { blocks: TimeBiteBlock[] }) {
  return (
    <>
      <Nav />
      <main className="tb-page">
        {blocks.map((block, i) => {
          switch (block.blockType) {
            case 'heroBlock':
              return <Hero block={block} key={i} />
            case 'authorityStripBlock':
              return <ItemSection block={block} variant="tb-authority" key={i} />
            case 'problemAgitationBlock':
              return <ItemSection block={block} variant="tb-problem" key={i} />
            case 'howItWorksBlock':
              return <ItemSection block={block} itemKey="steps" key={i} />
            case 'featureTabsBlock':
              return <ItemSection block={block} itemKey="tabs" variant="tb-feature-tabs" key={i} />
            case 'productScreensBlock':
              return <ItemSection block={block} itemKey="screens" variant="tb-screens" key={i} />
            case 'aiArchitectureBlock':
              return <ItemSection block={block} variant="tb-ai" key={i} />
            case 'pricingBlock':
              return <Pricing block={block} key={i} />
            case 'betaSignupBlock':
              return <Beta block={block} key={i} />
            case 'founderCredibilityBlock':
              return <ItemSection block={block} variant="tb-founder" key={i} />
            case 'faqBlock':
              return <FAQ block={block as FAQBlock} key={i} />
            default:
              return null
          }
        })}
      </main>
      <Footer />
    </>
  )
}
