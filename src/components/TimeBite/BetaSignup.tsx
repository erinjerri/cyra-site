import type { Cta } from './types'

type Props = {
  cta?: Cta
  note?: string
}

export function BetaSignup({ cta, note }: Props) {
  const substackUrl = process.env.NEXT_PUBLIC_SUBSTACK_EMBED_URL

  if (substackUrl) {
    return (
      <iframe
        className="tb-signup-frame"
        src={substackUrl}
        title="TimeBite beta signup"
        loading="lazy"
      />
    )
  }

  return (
    <form className="tb-signup-form" action={process.env.NEXT_PUBLIC_BETA_SIGNUP_URL || '#'} method="post">
      <label className="sr-only" htmlFor="timebite-email">
        Email
      </label>
      <input id="timebite-email" name="email" type="email" placeholder="you@example.com" required />
      <button type="submit">{cta?.label || 'Get early access'}</button>
      {note ? <p>{note}</p> : null}
    </form>
  )
}
