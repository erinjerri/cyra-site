import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="tb-page tb-not-found" id="main-content">
      <div className="tb-shell tb-not-found-inner">
        <p className="tb-eyebrow">404</p>
        <h1>This cycle doesn&apos;t exist yet.</h1>
        <p>The page you&apos;re looking for isn&apos;t built, or isn&apos;t published yet.</p>
        <div className="tb-actions tb-actions-center">
          <Link className="tb-button" href="/">
            Back to TimeBite
          </Link>
          <Link className="tb-button tb-button-secondary" href="/#beta">
            Join the beta
          </Link>
        </div>
      </div>
    </main>
  )
}
