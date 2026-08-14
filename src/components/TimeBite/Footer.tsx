import type { Footer as FooterData } from '@/payload-types'

type LinkGroup = FooterData['explore']

function FooterColumn({ group }: { group?: LinkGroup | null }) {
  if (!group?.title) return null

  return (
    <div className="tb-footer-column">
      <h3>{group.title}</h3>
      <ul>
        {(group.links || []).map((link, index) => (
          <li key={index}>
            {link.comingSoon ? (
              <span className="tb-footer-link-disabled">{link.label}</span>
            ) : (
              <a href={link.url || '#'}>{link.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer({ data }: { data: FooterData | null }) {
  return (
    <footer className="tb-footer">
      <div className="tb-shell tb-footer-inner">
        <div className="tb-footer-brand">
          <span className="tb-logo-mark">Creating Your Reality</span>
          {data?.brandStatement ? <p>{data.brandStatement}</p> : null}
        </div>
        <div className="tb-footer-columns">
          <FooterColumn group={data?.explore} />
          <FooterColumn group={data?.product} />
          <FooterColumn group={data?.comingSoon} />
          <FooterColumn group={data?.learn} />
          <FooterColumn group={data?.company} />
          <FooterColumn group={data?.social} />
        </div>
      </div>
      <div className="tb-shell tb-footer-legal">
        <p>{data?.legalNote || `© ${new Date().getFullYear()} Creating Your Reality. All rights reserved.`}</p>
      </div>
    </footer>
  )
}
