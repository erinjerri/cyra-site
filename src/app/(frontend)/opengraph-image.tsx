import { ImageResponse } from 'next/og'

export const alt = 'TimeBite — goals, powered by actions.'
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
          backgroundColor: '#0b0b0f',
          color: '#f5efe7',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 8,
            color: '#eacb8a',
            textTransform: 'uppercase',
          }}
        >
          TimeBite
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 300, marginTop: 34, lineHeight: 1.14 }}>
          Goals, powered by
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 300, lineHeight: 1.14, color: '#8fd0dc' }}>
          actions.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            marginTop: 30,
            lineHeight: 1.5,
            color: '#b7b0a5',
            maxWidth: 780,
          }}
        >
          Turn a big goal into a sustainable loop of small, repeated actions.
        </div>
      </div>
    ),
    { ...size },
  )
}
