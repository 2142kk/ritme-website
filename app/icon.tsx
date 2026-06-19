import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: '#0d0d0d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '-0.5px',
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
