import { CtaLink } from './CtaLink'
import { SectionHeader } from './SectionHeader'
import type { PlannerInterestBlockType } from './types'

/**
 * Interest capture for the planner. Not a checkout, and careful not to look
 * like one.
 *
 * Same rule as `BetaSignup`, for the same reason: the form only renders when
 * there is somewhere for it to post. A form submitting to '#' looks to the
 * person filling it in exactly like one that worked, and quietly loses the
 * address — which is worse than showing no form at all. With no endpoint set,
 * this falls back to the CMS-managed button.
 *
 * The endpoint is content (`formAction`) with an env fallback, so pointing it
 * at a Payload form-builder submission URL is a change in /admin rather than a
 * deploy — the same seam the beta signup uses.
 *
 * A plain server-rendered form on purpose: no client JavaScript, so it submits
 * for everyone, and there is no state worth hydrating for four fields.
 */
export function PlannerInterestForm({ block }: { block: PlannerInterestBlockType }) {
  const endpoint = block.formAction || process.env.NEXT_PUBLIC_PLANNER_INTEREST_URL
  const interestOptions = block.interestOptions || []
  const coverOptions = block.coverOptions || []

  return (
    <section className="tb-section tb-planner-interest" id="planner-interest">
      <div className="tb-shell tb-beta-grid">
        <SectionHeader align="left" block={block} />

        <div className="tb-signup">
          {endpoint ? (
            <form action={endpoint} className="tb-signup-form tb-interest-form" method="post">
              <div className="tb-interest-field">
                <label htmlFor="planner-email">Email</label>
                <input
                  autoComplete="email"
                  id="planner-email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>

              <div className="tb-interest-field">
                <label htmlFor="planner-first-name">First name (optional)</label>
                <input autoComplete="given-name" id="planner-first-name" name="firstName" type="text" />
              </div>

              {interestOptions.length ? (
                <div className="tb-interest-field">
                  <label htmlFor="planner-interest">{block.interestLabel || 'I am interested in'}</label>
                  <select defaultValue={interestOptions[0]?.value} id="planner-interest" name="interest">
                    {interestOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {coverOptions.length ? (
                <div className="tb-interest-field">
                  <label htmlFor="planner-cover">{block.coverLabel || 'Preferred cover (optional)'}</label>
                  <select defaultValue="" id="planner-cover" name="cover">
                    <option value="">No preference</option>
                    {coverOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <button data-analytics-event={block.cta?.analyticsId || 'planner-interest'} type="submit">
                {block.submitLabel || 'Join the planner list'}
              </button>

              {block.formNote ? <p>{block.formNote}</p> : null}
            </form>
          ) : (
            <div className="tb-signup-form">
              <CtaLink cta={block.cta} />
              {block.formNote ? <p>{block.formNote}</p> : null}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
