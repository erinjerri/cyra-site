'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'tb-theme'

/**
 * Light/dark toggle.
 *
 * Three states exist underneath, even though the button only shows two: an
 * explicit `light`, an explicit `dark`, and no stored choice at all — in which
 * case the OS preference decides and the CSS `prefers-color-scheme` block
 * handles it. Pressing the button always writes an explicit choice, because
 * someone who reaches for a toggle has stopped wanting the system default.
 *
 * The applied theme is set on <html> by the inline script in the layout before
 * first paint. This component only reads that back and flips it, so there is no
 * flash of the wrong theme and no hydration mismatch — the button renders its
 * label only after mount, when it can know what the real state is.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const explicit = root.getAttribute('data-theme') as Theme | null
    if (explicit) {
      setTheme(explicit)
      return
    }
    setTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private browsing or blocked storage — the choice just will not persist.
    }
    setTheme(next)
  }

  return (
    <button
      aria-label={theme ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : 'Switch colour theme'}
      className="tb-theme-toggle"
      onClick={toggle}
      type="button"
    >
      {/* aria-hidden: the accessible name is on the button itself. */}
      <span aria-hidden="true" className="tb-theme-toggle-icon">
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="10" cy="10" r="3.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const r = (deg * Math.PI) / 180
        return (
          <line
            key={deg}
            x1={10 + Math.cos(r) * 6}
            y1={10 + Math.sin(r) * 6}
            x2={10 + Math.cos(r) * 7.8}
            y2={10 + Math.sin(r) * 7.8}
          />
        )
      })}
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M16 12.2A6.8 6.8 0 0 1 7.8 4a6.9 6.9 0 1 0 8.2 8.2Z" />
    </svg>
  )
}
