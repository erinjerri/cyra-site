/**
 * Placeholder graphic for "How it works" — a time loop echoing the half-day
 * rings in the app. Swap it out by uploading a real app screenshot to the
 * Timeline block's `image` field in /admin; this only renders when none is set.
 *
 * Inline SVG rather than an asset so it stays crisp, themeable, and weightless.
 */

const SIZE = 320
const CENTER = SIZE / 2

const OUTER_R = 124
const OUTER_C = 2 * Math.PI * OUTER_R
const SEGMENTS = 5
const SLOT = OUTER_C / SEGMENTS
const DASH = SLOT - 20 // 20px gap between segments

const INNER_R = 94
const INNER_C = 2 * Math.PI * INNER_R

// One segment per stage of the loop: Plan, Focus, Track, Reflect, Improve.
const SEGMENT_COLORS = ['var(--tb-gold)', 'var(--tb-blue)', 'var(--tb-lavender)', 'var(--tb-green)', '#e8bcc8']

export function TimeLoop() {
  return (
    <svg
      className="tb-loop-svg"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="A continuous loop divided into five segments: plan, focus, track, reflect, and improve."
    >
      {/* clock ticks */}
      <g opacity="0.35">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const r1 = OUTER_R + 18
          const r2 = OUTER_R + 25

          return (
            <line
              key={i}
              x1={CENTER + Math.cos(angle) * r1}
              y1={CENTER + Math.sin(angle) * r1}
              x2={CENTER + Math.cos(angle) * r2}
              y2={CENTER + Math.sin(angle) * r2}
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          )
        })}
      </g>

      {/* planned track */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={OUTER_R}
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
        opacity="0.08"
      />

      {/* the five segments of the loop */}
      <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
        {SEGMENT_COLORS.map((color, i) => (
          <circle
            key={i}
            cx={CENTER}
            cy={CENTER}
            r={OUTER_R}
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${DASH} ${OUTER_C - DASH}`}
            strokeDashoffset={-(i * SLOT)}
          />
        ))}

        {/* completed-so-far arc, echoing the planned/completed pairing in the app */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_R}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.22"
          strokeDasharray={`${INNER_C * 0.42} ${INNER_C}`}
        />
      </g>

      <circle cx={CENTER} cy={CENTER} r="3" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
