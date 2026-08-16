import type { Footer as FooterData } from '@/payload-types'
import { ORGANIZATION_NAME } from '@/utilities/brand'
import { getSiteSettings } from '@/utilities/getSiteSettings'

import { SOCIAL_LABELS, SocialIcon, type SocialPlatform } from './SocialIcon'

type Column = NonNullable<FooterData['columns']>[number]

function FooterColumn({ column }: { column: Column }) {
  if (!column?.title) return null

  return (
    <div
      className="tb-footer-column"
      style={{ '--tb-footer-accent': `var(--tb-${column.accent || 'blue'})` } as React.CSSProperties}
    >
      <h3>{column.title}</h3>
      <ul>
        {(column.links || []).map((link, linkIndex) => (
          <li key={linkIndex}>
            {link.comingSoon || !link.url ? (
              <span className="tb-footer-link-disabled">{link.label}</span>
            ) : (
              <a href={link.url}>{link.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function Footer({ data }: { data: FooterData | null }) {
  const settings = await getSiteSettings()
  const organizationName = settings?.organizationName || ORGANIZATION_NAME

  const columns = data?.columns || []
  const connect = data?.connect
  const socials = (connect?.links || []).filter((link) => link.platform)
  const legalLinks = data?.legalLinks || []

  return (
    <footer className="tb-footer">
      <div className="tb-shell tb-footer-inner">
        <div className="tb-footer-brand">
          <span className="tb-logo-mark">{organizationName}</span>
          {data?.brandStatement ? <p>{data.brandStatement}</p> : null}
        </div>
        <div className="tb-footer-columns">
          {columns.map((column, index) => (
            <FooterColumn column={column} key={index} />
          ))}
        </div>
      </div>

      {socials.length > 0 ? (
        <div className="tb-shell tb-footer-connect">
          {connect?.title ? <p className="tb-footer-connect-title">{connect.title}</p> : null}
          <ul className="tb-social-row">
            {socials.map((link, index) => {
              const platform = link.platform as SocialPlatform
              const label = SOCIAL_LABELS[platform] || platform

              return (
                <li key={index}>
                  {link.url ? (
                    <a
                      aria-label={label}
                      className="tb-social-link"
                      data-analytics-event={`social_${platform}`}
                      href={link.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  ) : (
                    // No URL yet: shown, dimmed, and not focusable — a link to
                    // nowhere is worse than a placeholder that admits it.
                    <span aria-label={`${label} — coming soon`} className="tb-social-link is-empty" role="img">
                      <SocialIcon platform={platform} />
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      <div className="tb-shell tb-footer-legal">
        <p>{data?.legalNote || `© ${new Date().getFullYear()} ${organizationName}. All rights reserved.`}</p>
        {legalLinks.length > 0 ? (
          <ul className="tb-footer-legal-links">
            {legalLinks.map((link, index) => (
              <li key={index}>
                {link.comingSoon || !link.url ? (
                  <span className="tb-footer-link-disabled">{link.label}</span>
                ) : (
                  <a href={link.url}>{link.label}</a>
                )}
              </li>
            ))}
          </ul>
        ) : null}
        {data?.colophon ? <p className="tb-footer-colophon">{data.colophon}</p> : null}
      </div>
    </footer>
  )
}
