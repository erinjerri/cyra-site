import Link from 'next/link'

import type { Header as HeaderData } from '@/payload-types'

import { MobileNavToggle } from './MobileNavToggle'

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
          {data?.cta?.label ? (
            <a className="tb-button tb-button-compact" href={data.cta.url || '#'}>
              {data.cta.label}
            </a>
          ) : null}
          <MobileNavToggle navLinks={navLinks} cta={data?.cta} />
        </div>
      </div>
    </header>
  )
}
