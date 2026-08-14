import type { Cta } from './types'

type Props = {
  cta?: Cta
  secondaryCta?: Cta
  note?: string
}

export function BetaSignup({ cta, secondaryCta, note }: Props) {
  const substackUrl = secondaryCta?.url || process.env.NEXT_PUBLIC_SUBSTACK_EMBED_URL
  const substackLabel = secondaryCta?.label || 'Join Substack'

  return (
    <div className="tb-signup">
      <form className="tb-signup-form" action={process.env.NEXT_PUBLIC_BETA_SIGNUP_URL || '#'} method="post">
        <label className="sr-only" htmlFor="timebite-email">
          Email
        </label>
        <input id="timebite-email" name="email" type="email" placeholder="you@example.com" required />
        <button type="submit">{cta?.label || 'Join Beta'}</button>
        {note ? <p>{note}</p> : null}
      </form>
      {substackUrl ? (
        <a className="tb-button tb-button-secondary tb-substack-link" href={substackUrl} target="_blank" rel="noreferrer">
          {substackLabel}
        </a>
      ) : null}
    </div>
  )
}
