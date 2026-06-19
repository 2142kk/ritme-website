import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#0d0d0d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-3px',
            fontFamily: 'sans-serif',
          }}
        >
          rL
        </span>
      </div>
    ),
    { ...size }
  )
}
