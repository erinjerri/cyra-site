import Link from 'next/link'

import type { Header as HeaderData } from '@/payload-types'

import { CtaLink } from './CtaLink'
import { MobileNavToggle } from './MobileNavToggle'
import { ThemeToggle } from './ThemeToggle'

export function Header({ data }: { data: HeaderData | null }) {
  const navLinks = data?.navLinks || []

  return (
    <header className="tb-header">
      <div className="tb-shell tb-header-inner">
        <Link className="tb-logo" href="/">
          <span className="tb-logo-mark">{data?.logoText || 'TimeBite'}</span>
          {data?.logoTag ? <span className="tb-logo-tag">{data.logoTag}</span> : null}
        </Link>
        <nav className="tb-nav" aria-label="Primary">
          {navLinks.map((link, index) => (
            <a href={link.url || '#'} key={index}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="tb-header-actions">
          <ThemeToggle />
          <CtaLink compact cta={data?.cta ?? undefined} />
          <MobileNavToggle navLinks={navLinks} cta={data?.cta} />
        </div>
      </div>
    </header>
  )
}
