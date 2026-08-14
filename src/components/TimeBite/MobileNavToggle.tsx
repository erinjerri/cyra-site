'use client'

import { useState } from 'react'

type NavLink = { label?: string | null; url?: string | null }
type Cta = { label?: string | null; url?: string | null } | null | undefined

export function MobileNavToggle({ navLinks, cta }: { navLinks: NavLink[]; cta?: Cta }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="tb-mobile-nav">
      <button
        type="button"
        className="tb-mobile-nav-toggle"
        aria-expanded={open}
        aria-controls="tb-mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">Toggle menu</span>
        <span aria-hidden="true" className={open ? 'tb-burger tb-burger-open' : 'tb-burger'} />
      </button>
      {open ? (
        <div className="tb-mobile-nav-panel" id="tb-mobile-nav-panel">
          {navLinks.map((link, index) => (
            <a href={link.url || '#'} key={index} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          {cta?.label ? (
            <a className="tb-button" href={cta.url || '#'} onClick={() => setOpen(false)}>
              {cta.label}
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
