import { BETA_CTA_LABEL } from '@/utilities/brand'
import { getSiteSettings } from '@/utilities/getSiteSettings'

import { CtaLink } from './CtaLink'
import type { Cta } from './types'

type Props = {
  cta?: Cta
  secondaryCta?: Cta
  note?: string
}

/**
 * The beta section.
 *
 * Two ways in, in priority order: an email form when a signup endpoint is
 * configured, and the beta link itself — which points wherever Payload says,
 * today Substack. No URL is written here. The block's own button wins; when it
 * is blank, the site-wide "Beta call to action" in site-settings fills in, so
 * an editor can change the destination once and have every beta button follow.
 */
export async function BetaSignup({ cta, secondaryCta, note }: Props) {
  const settings = await getSiteSettings()

  // Read structurally rather than through the generated global type: this file
  // has to compile both before and after `payload generate:types` picks up the
  // new betaCta group.
  const fallback = ((settings as unknown as { betaCta?: Cta | null })?.betaCta || {}) as Cta

  const betaCta: Cta = {
    label: cta?.label || fallback.label || settings?.betaButtonLabel || BETA_CTA_LABEL,
    url: cta?.url || fallback.url,
    newTab: cta?.newTab ?? fallback.newTab,
    analyticsId: cta?.analyticsId || fallback.analyticsId,
  }

  const substackCta: Cta | undefined = secondaryCta?.label
    ? { ...secondaryCta, label: secondaryCta.label || settings?.substackButtonLabel || undefined }
    : undefined

  // The email form only appears when there is somewhere for it to post. A form
  // that submits to '#' looks like it worked and silently loses the address.
  const signupEndpoint = process.env.NEXT_PUBLIC_BETA_SIGNUP_URL

  return (
    <div className="tb-signup">
      {signupEndpoint ? (
        <form className="tb-signup-form" action={signupEndpoint} method="post">
          <label className="sr-only" htmlFor="timebite-email">
            Email
          </label>
          <input id="timebite-email" name="email" type="email" placeholder="you@example.com" required />
          <button data-analytics-event={betaCta.analyticsId || undefined} type="submit">
            {betaCta.label}
          </button>
          {note ? <p>{note}</p> : null}
        </form>
      ) : (
        <div className="tb-signup-form">
          <CtaLink cta={betaCta} />
          {note ? <p>{note}</p> : null}
        </div>
      )}

      {substackCta ? <CtaLink className="tb-substack-link" cta={substackCta} variant="secondary" /> : null}
    </div>
  )
}
