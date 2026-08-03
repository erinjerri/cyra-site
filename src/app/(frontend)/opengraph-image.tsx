import { ImageResponse } from 'next/og'

export const alt = 'TimeBite — remember what you meant to do.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          backgroundColor: '#000000',
          color: '#f4f2ee',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 8,
            color: '#ead9ab',
            textTransform: 'uppercase',
          }}
        >
          TimeBite by Creating Your Reality
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 300, marginTop: 34, lineHeight: 1.14 }}>
          Remember what
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 300, lineHeight: 1.14, color: '#a9d6e5' }}>
          you meant to do.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            marginTop: 30,
            lineHeight: 1.5,
            color: '#a2a2a8',
            maxWidth: 780,
          }}
        >
          One shared memory for your notes, calendar, goals, and reflections.
        </div>
      </div>
    ),
    { ...size },
  )
}
