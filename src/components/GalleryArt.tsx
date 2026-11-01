import type { ReactNode } from 'react'

/* Six original scene illustrations for the gallery, each drawn on a 400 x 300 canvas. */

function DiningRoom() {
  return (
    <>
      <rect width="400" height="300" fill="#efdcb8" />
      <path d="M130 215 V92 a70 70 0 0 1 140 0 V215Z" fill="#bfe0d0" stroke="#8a6a3f" strokeWidth="6" />
      <circle cx="232" cy="96" r="18" fill="#fde68a" />
      <path d="M136 215 V160 C170 140 200 168 264 146 V215Z" fill="#6f9a76" />
      <path d="M136 215 V186 C180 170 220 192 264 176 V215Z" fill="#4a6b4f" />
      <path d="M200 22 V215 M130 120 H270" stroke="#8a6a3f" strokeWidth="4" />

      <rect y="215" width="400" height="85" fill="#a9754a" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path key={i} d={`M${i * 60 - 20} 215 L${i * 80 - 70} 300`} stroke="#8d5f3a" strokeWidth="2" />
      ))}

      {[70, 200, 330].map((x, i) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <circle cy={70 + i * 4} r="46" fill="#fde68a" opacity="0.3" />
          <path d={`M0 0 V${52 + i * 4}`} stroke="#5a4630" strokeWidth="2.5" />
          <path d={`M-26 ${72 + i * 4} a26 22 0 0 1 52 0Z`} fill="#f2cf7a" stroke="#c58f17" strokeWidth="2.5" />
          <ellipse cy={72 + i * 4} rx="12" ry="4" fill="#fffbe6" />
        </g>
      ))}

      <g fill="#6b4a2b">
        <rect x="42" y="168" width="12" height="104" rx="5" />
        <rect x="42" y="168" width="54" height="10" rx="5" />
        <rect x="42" y="226" width="54" height="10" rx="5" />
        <rect x="346" y="168" width="12" height="104" rx="5" />
        <rect x="304" y="168" width="54" height="10" rx="5" />
        <rect x="304" y="226" width="54" height="10" rx="5" />
      </g>

      <rect x="100" y="238" width="10" height="52" fill="#6b4a2b" />
      <rect x="290" y="238" width="10" height="52" fill="#6b4a2b" />
      <path d="M92 226 H308 V252 Q200 268 92 252Z" fill="#ffffff" stroke="#e8dfca" strokeWidth="3" />
      <ellipse cx="200" cy="226" rx="116" ry="10" fill="#fffdf6" stroke="#e8dfca" strokeWidth="2" />
      <ellipse cx="150" cy="226" rx="26" ry="6" fill="#f3ecdd" stroke="#e0d6bd" />
      <ellipse cx="250" cy="226" rx="26" ry="6" fill="#f3ecdd" stroke="#e0d6bd" />
      <g>
        <rect x="193" y="196" width="14" height="30" rx="3" fill="#faf2dc" stroke="#d6c9a6" />
        <path d="M200 176 C194 186 196 192 200 194 C204 192 206 186 200 176Z" fill="#f59e0b" />
        <circle cx="200" cy="186" r="22" fill="#fde68a" opacity="0.3" />
      </g>
      <g transform="translate(330 215)">
        <path d="M-14 0 H14 L10 28 H-10Z" fill="#c8683c" />
        <path d="M0 0 C-22 -10 -26 -34 -8 -42 C0 -30 4 -16 0 0Z M0 0 C22 -10 28 -34 10 -44 C2 -32 -4 -16 0 0Z" fill="#4a6b4f" />
      </g>
    </>
  )
}

function WoodOven() {
  return (
    <>
      <rect width="400" height="300" fill="#3b2a24" />
      {Array.from({ length: 10 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <rect key={`${r}-${c}`} x={c * 50 - (r % 2 ? 25 : 0)} y={r * 32} width="46" height="28" rx="3" fill={(r + c) % 3 ? '#5a3d31' : '#6a4a3a'} />
        )),
      )}
      <ellipse cx="200" cy="170" rx="150" ry="140" fill="#000" opacity="0.18" />
      <path d="M112 290 V168 a88 88 0 0 1 176 0 V290Z" fill="#c98b5a" />
      <path d="M126 290 V170 a74 74 0 0 1 148 0 V290Z" fill="#120b09" />
      <circle cx="200" cy="230" r="90" fill="#f97316" opacity="0.28" />
      <path d="M150 290 C140 240 170 230 168 196 C186 214 190 232 196 218 C204 190 214 176 226 150 C232 190 262 214 250 290Z" fill="#f97316" />
      <path d="M170 290 C164 258 184 248 184 224 C198 238 204 252 208 238 C214 224 222 216 228 200 C236 232 250 250 240 290Z" fill="#fbbf24" />
      <path d="M190 290 C188 270 198 262 200 248 C208 258 214 270 212 290Z" fill="#fff7d6" />
      <rect x="150" y="280" width="100" height="14" rx="7" fill="#5a3b24" />
      <rect x="164" y="268" width="80" height="14" rx="7" fill="#7a5233" />
      <path d="M338 54 L282 196" stroke="#a9754a" strokeWidth="9" strokeLinecap="round" />
      <circle cx="270" cy="222" r="38" fill="#c9965a" />
      <circle cx="270" cy="222" r="32" fill="#f5d9a0" />
      <circle cx="270" cy="222" r="26" fill="#d9442f" />
      {[[258, 214], [280, 218], [268, 236], [284, 234], [256, 230]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#fff6dc" />
      ))}
      <path d="M262 206 C270 198 284 200 286 208 C276 214 266 214 262 206Z" fill="#4f7a4f" />
    </>
  )
}

function Spritz() {
  return (
    <>
      <rect width="400" height="300" fill="#8aa583" />
      {[[60, 60, 30], [340, 80, 40], [90, 240, 24], [330, 250, 34], [310, 160, 18], [48, 150, 16]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity="0.14" />
      ))}
      <ellipse cx="200" cy="268" rx="96" ry="10" fill="#1f3326" opacity="0.2" />
      <path d="M140 66 H260 L249 252 a9 9 0 0 1 -9 8 H160 a9 9 0 0 1 -9 -8Z" fill="#fff" opacity="0.28" stroke="#fff" strokeOpacity="0.85" strokeWidth="3" strokeLinejoin="round" />
      <path d="M144 112 H256 L249 252 a9 9 0 0 1 -9 8 H160 a9 9 0 0 1 -9 -8Z" fill="#dcee9c" opacity="0.9" />
      <path d="M144 112 H256" stroke="#fff" strokeWidth="2" opacity="0.8" />
      <g fill="#fff" opacity="0.6" stroke="#fff" strokeOpacity="0.9" strokeWidth="2">
        <rect x="156" y="150" width="38" height="38" rx="7" transform="rotate(-12 175 169)" />
        <rect x="204" y="136" width="36" height="36" rx="7" transform="rotate(14 222 154)" />
        <rect x="178" y="196" width="40" height="36" rx="7" transform="rotate(8 198 214)" />
      </g>
      <path d="M176 36 L204 214" stroke="#e0a82e" strokeWidth="9" strokeLinecap="round" />
      <path d="M181 62 L186 70 M184 90 L189 98 M188 118 L193 126" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <g transform="translate(236 92)">
        <circle r="36" fill="#f6d84a" stroke="#d6b21f" strokeWidth="3" />
        <circle r="29" fill="#fff3b0" />
        <path d="M0 0 V-27 M0 0 L23 -14 M0 0 L23 14 M0 0 L0 27 M0 0 L-23 14 M0 0 L-23 -14" stroke="#f6d84a" strokeWidth="2.5" />
      </g>
      {[[150, 70, -40], [168, 58, 20], [160, 82, -110]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M0 0 C6 -11 24 -11 32 0 C24 11 6 11 0 0Z" fill={i === 1 ? '#3d6a40' : '#4f7a4f'} />
          <path d="M2 0 H28" stroke="#bcd6b4" strokeWidth="1.3" />
        </g>
      ))}
      {[[256, 150], [262, 190], [150, 200], [254, 226]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q-4 7 0 10 q4 -3 0 -10Z`} fill="#fff" opacity="0.75" />
      ))}
    </>
  )
}

function HerbGarden() {
  const pots = [
    { x: 80, name: 'Sage' },
    { x: 200, name: 'Basil' },
    { x: 320, name: 'Rosemary' },
  ]
  return (
    <>
      <rect width="400" height="300" fill="#f3ecdd" />
      <rect x="40" y="26" width="320" height="170" rx="10" fill="#cfe3ea" stroke="#8a6a3f" strokeWidth="7" />
      <path d="M200 26 V196 M40 111 H360" stroke="#8a6a3f" strokeWidth="5" />
      <circle cx="316" cy="64" r="20" fill="#fde68a" />
      <rect x="18" y="238" width="364" height="18" rx="5" fill="#8a6a3f" />
      <rect x="18" y="254" width="364" height="6" fill="#6d5230" />

      {pots.map((p, i) => (
        <g key={p.name} transform={`translate(${p.x} 238)`}>
          <path d="M-38 0 L-30 -56 H30 L38 0Z" fill="#c8683c" />
          <rect x="-36" y="-64" width="72" height="14" rx="5" fill="#d9794a" />
          <ellipse cy="-62" rx="30" ry="5" fill="#5a3b24" />
          {i === 0 &&
            [-24, -12, 0, 12, 24].map((dx, k) => (
              <g key={k}>
                <ellipse cx={dx * 1.2} cy={-96 - (k % 2) * 14} rx="11" ry="22" fill={k % 2 ? '#8fa88a' : '#a3b99d'} transform={`rotate(${dx * 1.6} ${dx * 1.2} -70)`} />
                <path d={`M${dx * 1.2} -70 V${-112 - (k % 2) * 14}`} stroke="#6f866b" strokeWidth="1.5" transform={`rotate(${dx * 1.6} ${dx * 1.2} -70)`} />
              </g>
            ))}
          {i === 1 &&
            [-26, -10, 8, 24].map((dx, k) => (
              <ellipse key={k} cx={dx} cy={-90 - (k % 2) * 16} rx="16" ry="12" fill={k % 2 ? '#3f8a47' : '#56a65b'} transform={`rotate(${dx * 1.2} ${dx} -80)`} />
            ))}
          {i === 2 &&
            [-24, -14, -4, 6, 16, 26].map((dx, k) => (
              <path key={k} d={`M${dx} -64 L${dx * 1.9} ${-120 + (k % 3) * 8}`} stroke={k % 2 ? '#4b6a4a' : '#5f7f56'} strokeWidth="5" strokeLinecap="round" />
            ))}
          <rect x="-27" y="-32" width="54" height="18" rx="3" fill="#fffaf0" stroke="#e0d3b6" />
          <text y="-19" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#4a3a28">{p.name}</text>
        </g>
      ))}

      <g transform="translate(372 244)">
        <path d="M-20 0 V-26 Q-20 -34 -12 -34 H8 Q16 -34 16 -26 V0Z" fill="#6f9a76" />
        <path d="M16 -20 L34 -34" stroke="#6f9a76" strokeWidth="5" strokeLinecap="round" />
        <path d="M-20 -22 Q-34 -22 -30 -8" fill="none" stroke="#6f9a76" strokeWidth="5" strokeLinecap="round" />
      </g>
    </>
  )
}

function Bread() {
  return (
    <>
      <defs>
        <pattern id="ga-gingham" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#fffaf0" />
          <rect width="12" height="24" fill="#c2203a" opacity="0.28" />
          <rect width="24" height="12" fill="#c2203a" opacity="0.28" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="#f3e6c8" />
      <path d="M0 214 H400 V300 H0Z" fill="#c99a63" />
      <path d="M40 150 L360 150 L330 276 L70 276Z" fill="url(#ga-gingham)" stroke="#e0d3b6" strokeWidth="2" />

      <ellipse cx="200" cy="252" rx="140" ry="22" fill="#1f3326" opacity="0.15" />
      <path d="M62 190 H338 L316 262 Q200 292 84 262Z" fill="#b98550" stroke="#8d5f3a" strokeWidth="3" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${86 + i * 28} 196 L${94 + i * 26} 266`} stroke="#d4a870" strokeWidth="3" />
      ))}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${70 + i * 8} ${208 + i * 16} Q200 ${222 + i * 18} ${330 - i * 8} ${208 + i * 16}`} fill="none" stroke="#8d5f3a" strokeWidth="2.5" />
      ))}

      <ellipse cx="130" cy="158" rx="68" ry="38" fill="#d99a55" />
      <ellipse cx="130" cy="150" rx="62" ry="30" fill="#e8b36b" />
      {[-24, 0, 24].map((dx, i) => (
        <path key={i} d={`M${112 + dx} 134 Q${122 + dx} 150 ${112 + dx} 166`} fill="none" stroke="#fff1d0" strokeWidth="5" strokeLinecap="round" />
      ))}
      <ellipse cx="268" cy="152" rx="74" ry="42" fill="#d99a55" />
      <ellipse cx="268" cy="144" rx="68" ry="34" fill="#eab96f" />
      <path d="M236 128 Q248 148 236 164 M264 124 Q276 146 264 168 M292 128 Q304 148 292 164" fill="none" stroke="#fff1d0" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="200" cy="176" rx="46" ry="26" fill="#d08a48" />
      <ellipse cx="200" cy="170" rx="42" ry="22" fill="#e5ad63" />
      <path d="M176 164 L224 178 M180 178 L220 162" stroke="#fff1d0" strokeWidth="4.5" strokeLinecap="round" />
      {[[100, 140], [160, 130], [300, 128], [340, 156], [220, 140]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#fff6dc" opacity="0.8" />
      ))}

      <g transform="translate(346 120)">
        <path d="M0 160 C-4 100 -4 50 0 0" fill="none" stroke="#c9a14a" strokeWidth="3" strokeLinecap="round" />
        {[10, 28, 46, 64].map((y, i) => (
          <g key={i}>
            <ellipse cx="-9" cy={y} rx="4" ry="9" fill="#e0b556" transform={`rotate(-26 -9 ${y})`} />
            <ellipse cx="9" cy={y + 6} rx="4" ry="9" fill="#e0b556" transform={`rotate(26 9 ${y + 6})`} />
          </g>
        ))}
      </g>
    </>
  )
}

function Terrace() {
  return (
    <>
      <defs>
        <linearGradient id="ga-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2a5c" />
          <stop offset="0.5" stopColor="#c2587a" />
          <stop offset="1" stopColor="#f5a55a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ga-dusk)" />
      <circle cx="300" cy="190" r="34" fill="#fde68a" opacity="0.95" />
      <circle cx="300" cy="190" r="60" fill="#fde68a" opacity="0.2" />
      <path d="M0 210 C60 180 90 200 140 186 C200 168 240 206 300 196 C340 188 370 196 400 190 V300 H0Z" fill="#4a2f5c" />
      <path d="M0 236 C80 220 140 240 220 228 C300 216 350 236 400 226 V300 H0Z" fill="#2f1f45" />
      {[[40, 190, 30], [70, 196, 26], [110, 188, 34], [350, 192, 28]].map(([x, y, w], i) => (
        <g key={i} fill="#3a2650">
          <rect x={x} y={y - 24} width={w} height={34} />
          <rect x={x + 4} y={y - 18} width="5" height="6" fill="#fde68a" />
        </g>
      ))}

      <path d="M-10 36 Q100 96 200 52 T410 44" fill="none" stroke="#2a1b3d" strokeWidth="2.5" />
      {[24, 70, 116, 160, 206, 252, 298, 344, 388].map((x, i) => {
        const y = 36 + Math.sin(((x + 10) / 420) * Math.PI * 2.6) * 22 + 40 * Math.sin((x / 420) * Math.PI) * 0.6
        return (
          <g key={i}>
            <circle cx={x} cy={y + 8} r="16" fill="#fde68a" opacity="0.28" />
            <circle cx={x} cy={y + 8} r="5" fill="#fff4b8" />
          </g>
        )
      })}

      <rect x="0" y="232" width="400" height="8" fill="#1d1230" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={i * 30 + 8} y="212" width="7" height="22" rx="3" fill="#1d1230" />
      ))}

      <rect x="116" y="252" width="168" height="10" rx="4" fill="#5a3b24" />
      <rect x="130" y="262" width="8" height="38" fill="#4a2f1c" />
      <rect x="262" y="262" width="8" height="38" fill="#4a2f1c" />
      <g>
        <rect x="190" y="228" width="14" height="24" rx="3" fill="#faf2dc" />
        <path d="M197 212 C191 220 193 226 197 228 C201 226 203 220 197 212Z" fill="#f59e0b" />
        <circle cx="197" cy="220" r="20" fill="#fde68a" opacity="0.28" />
      </g>
      {[150, 244].map((x) => (
        <g key={x}>
          <path d={`M${x - 11} 214 H${x + 11} Q${x + 12} 232 ${x} 236 Q${x - 12} 232 ${x - 11} 214Z`} fill="#fff" opacity="0.4" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.5" />
          <path d={`M${x - 10} 224 H${x + 10} Q${x + 10} 232 ${x} 235 Q${x - 10} 232 ${x - 10} 224Z`} fill="#9d174d" opacity="0.8" />
          <path d={`M${x} 236 V250 M${x - 8} 251 H${x + 8}`} stroke="#fff" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <g transform="translate(46 300)">
        <path d="M-18 0 L-14 -40 H14 L18 0Z" fill="#7a4a30" />
        <path d="M0 -40 C-30 -52 -34 -90 -12 -100 C-2 -80 4 -60 0 -40Z M0 -40 C30 -52 36 -88 14 -102 C4 -82 -4 -60 0 -40Z M0 -40 C-4 -70 0 -90 0 -110 C8 -90 10 -60 0 -40Z" fill="#3e6a45" />
      </g>
    </>
  )
}

const scenes: Record<string, () => ReactNode> = {
  dining: DiningRoom,
  oven: WoodOven,
  spritz: Spritz,
  herbs: HerbGarden,
  bread: Bread,
  terrace: Terrace,
}

export default function GalleryArt({ id }: { id: string }) {
  const Scene = scenes[id]
  if (!Scene) return null

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Scene />
    </svg>
  )
}