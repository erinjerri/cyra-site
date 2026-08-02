import { ImageResponse } from 'next/og'

export const alt = 'TimeBite — the AI-powered personal operating system for intentional living'
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
        <div style={{ display: 'flex', fontSize: 66, fontWeight: 300, marginTop: 32, lineHeight: 1.15 }}>
          The AI-powered personal
        </div>
        <div style={{ display: 'flex', fontSize: 66, fontWeight: 300, lineHeight: 1.15, color: '#a9d6e5' }}>
          operating system for
        </div>
        <div style={{ display: 'flex', fontSize: 66, fontWeight: 300, lineHeight: 1.15 }}>
          intentional living.
        </div>
      </div>
    ),
    { ...size },
  )
}
