import { ImageResponse } from 'next/og'

import { OG_TITLE } from '@/utilities/brand'

export const alt = OG_TITLE
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
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 300, marginTop: 34, lineHeight: 1.16 }}>
          Turn your goals into a system
        </div>
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 300, lineHeight: 1.16, color: '#a9d6e5' }}>
          that learns how you work.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            marginTop: 30,
            lineHeight: 1.5,
            color: '#a2a2a8',
            maxWidth: 820,
          }}
        >
          Plan your goals. Put them into time. Track what actually moved. macOS.
        </div>
      </div>
    ),
    { ...size },
  )
}
