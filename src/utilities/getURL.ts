/**
 * The canonical site URL: canonical tags, JSON-LD, OpenGraph, and the sitemap
 * all read this. `NEXT_PUBLIC_SERVER_URL` is the explicit override and wins on
 * every platform — set it to `https://creatingyourreality.co` once that domain
 * is live, and everything below stops mattering.
 *
 * Without it, fall back to whatever the deploy platform tells us the URL is.
 * Netlify sets `URL` to the production domain and `DEPLOY_PRIME_URL` to the
 * URL of the specific deploy (a branch or PR preview gets its own). Using
 * `CONTEXT` to pick between them means a preview deploy's canonical tags and
 * OG image point at the preview, not at production — which matters, because a
 * preview claiming to be the production URL is exactly the kind of thing that
 * gets a stale/wrong link shared.
 */
export function getURL(): string {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.CONTEXT === 'production' && process.env.URL) {
    return process.env.URL
  }

  if (process.env.DEPLOY_PRIME_URL) {
    return process.env.DEPLOY_PRIME_URL
  }

  if (process.env.URL) {
    return process.env.URL
  }

  return 'http://localhost:3000'
}
