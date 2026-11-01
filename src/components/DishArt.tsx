import type { ReactNode } from 'react'

/* Original top-down illustrations of three signature dishes, drawn on a 400 x 240 canvas. */

function Plate({ children }: { children: ReactNode }) {
  return (
    <>
      <ellipse cx="200" cy="222" rx="118" ry="9" fill="#1f3326" opacity="0.12" />
      <circle cx="200" cy="120" r="108" fill="#ffffff" stroke="#e8dfca" strokeWidth="3" />
      <circle cx="200" cy="120" r="88" fill="#f9f4e7" stroke="#ece3cf" strokeWidth="2" />
      {children}
    </>
  )
}

function Basil({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C8 -13 28 -13 38 0 C28 13 8 13 0 0Z" fill="#4f7a4f" />
      <path d="M2 0 H34" stroke="#bcd6b4" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  )
}

function Burrata() {
  const slices = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2
    return { x: 200 + Math.cos(a) * 64, y: 120 + Math.sin(a) * 64, r: i % 2 ? 17 : 19 }
  })
  return (
    <Plate>
      {slices.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r} fill="#d9442f" />
          <circle cx={s.x} cy={s.y} r={s.r - 4} fill="#ef7a63" />
          {[0, 1, 2].map((k) => (
            <ellipse
              key={k}
              cx={s.x + Math.cos(k * 2.1 + i) * 6}
              cy={s.y + Math.sin(k * 2.1 + i) * 6}
              rx="2.4"
              ry="1.5"
              fill="#fde68a"
              transform={`rotate(${k * 60} ${s.x} ${s.y})`}
            />
          ))}
        </g>
      ))}
      <circle cx="200" cy="124" r="40" fill="#e9e2cf" />
      <circle cx="200" cy="120" r="40" fill="#fffdf6" />
      <ellipse cx="188" cy="106" rx="16" ry="9" fill="#fff" opacity="0.9" transform="rotate(-25 188 106)" />
      <path d="M186 132 Q200 142 214 132" fill="none" stroke="#efe6cd" strokeWidth="3" strokeLinecap="round" />
      <Basil x={196} y={112} rot={-50} />
      <Basil x={198} y={116} rot={30} s={0.85} />
      <Basil x={198} y={118} rot={120} s={0.75} />
      {[
        [150, 70], [250, 62], [276, 150], [140, 160], [214, 180], [176, 64],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#f2cf7a" opacity="0.7" />
      ))}
    </Plate>
  )
}

function Salmon() {
  return (
    <Plate>
      <ellipse cx="206" cy="128" rx="74" ry="46" fill="#a8c686" transform="rotate(-8 206 128)" />
      <ellipse cx="206" cy="128" rx="60" ry="34" fill="#bcd69b" transform="rotate(-8 206 128)" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`rotate(-14 200 120) translate(0 ${i * 7})`}>
          <rect x="150" y="150" width="86" height="6" rx="3" fill="#4f7a4f" />
          <ellipse cx="238" cy="153" rx="7" ry="4" fill="#3d6a40" />
        </g>
      ))}
      <g transform="rotate(-14 190 112)">
        <rect x="132" y="86" width="116" height="52" rx="22" fill="#f08a6c" />
        <rect x="132" y="86" width="116" height="52" rx="22" fill="none" stroke="#d6674a" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${150 + i * 17} 92 Q${156 + i * 17} 112 ${150 + i * 17} 132`} fill="none" stroke="#f9b8a2" strokeWidth="3" strokeLinecap="round" />
        ))}
        {Array.from({ length: 22 }, (_, i) => (
          <circle key={i} cx={142 + ((i * 37) % 98)} cy={94 + ((i * 23) % 36)} r="2" fill="#6a8f4e" opacity="0.8" />
        ))}
      </g>
      <g transform="translate(278 168)">
        <circle r="22" fill="#f6d84a" stroke="#d6b21f" strokeWidth="3" />
        <circle r="17" fill="#fff3b0" />
        <path d="M0 0 V-16 M0 0 L14 -8 M0 0 L14 8 M0 0 L0 16 M0 0 L-14 8 M0 0 L-14 -8" stroke="#f6d84a" strokeWidth="2" />
      </g>
      <Basil x={150} y={74} rot={-30} s={0.8} />
    </Plate>
  )
}

function PannaCotta() {
  return (
    <Plate>
      <path
        d="M200 120 m-84 0 a84 84 0 1 0 168 0 a84 84 0 1 0 -168 0"
        fill="none"
        stroke="#e0a82e"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />
      <circle cx="200" cy="124" r="52" fill="#e9dcb8" />
      <circle cx="200" cy="118" r="52" fill="#fff6dc" />
      <ellipse cx="184" cy="100" rx="20" ry="10" fill="#fff" opacity="0.85" transform="rotate(-25 184 100)" />
      <path d="M160 126 Q200 150 240 126" fill="none" stroke="#e9b53a" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
      <path d="M170 138 Q175 156 172 164 M200 146 Q204 166 200 174 M230 138 Q226 156 230 162" fill="none" stroke="#e9b53a" strokeWidth="4" strokeLinecap="round" />
      {[
        [182, 92], [204, 84], [222, 98], [196, 106], [214, 114],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" fill="#c2203a" />
          {[[-4, -3], [3, -4], [0, 2], [-3, 4], [5, 3]].map(([dx, dy], k) => (
            <circle key={k} cx={x + dx} cy={y + dy} r="2.6" fill="#e5546a" />
          ))}
        </g>
      ))}
      {[
        [258, 94], [140, 150], [262, 158], [150, 84], [236, 70], [168, 172], [248, 176],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" fill="#8fb36a" />
      ))}
      <Basil x={196} y={78} rot={-110} s={0.65} />
      <Basil x={208} y={80} rot={-60} s={0.6} />
    </Plate>
  )
}

const art: Record<string, () => ReactNode> = {
  burrata: Burrata,
  salmon: Salmon,
  pannacotta: PannaCotta,
}

export default function DishArt({ id }: { id: string }) {
  const Drawing = art[id]
  if (!Drawing) return null

  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Drawing />
    </svg>
  )
}