import { motion } from 'motion/react'

/* An original illustration of a saffron rice dish on a plate, drawn on a 480 x 480 canvas. */

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

const rand = seeded(7)
const grainColors = ['#f5c84a', '#e0a82e', '#fde68a', '#d9962a']
const grains = Array.from({ length: 190 }, () => {
  const angle = rand() * Math.PI * 2
  const dist = Math.sqrt(rand()) * 104
  return {
    x: 240 + Math.cos(angle) * dist,
    y: 240 + Math.sin(angle) * dist * 0.92,
    rot: rand() * 180,
    fill: grainColors[Math.floor(rand() * grainColors.length)],
  }
})

function Leaf({ x, y, rot, scale = 1, dark = false }: { x: number; y: number; rot: number; scale?: number; dark?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      <path d="M0 0 C12 -18 40 -18 56 0 C40 18 12 18 0 0Z" fill={dark ? '#3d5c42' : '#5f8660'} />
      <path d="M2 0 H52" stroke={dark ? '#a9c4a3' : '#cfe0c9'} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 0 L26 -8 M30 0 L40 -7 M16 0 L26 8 M30 0 L40 7" stroke={dark ? '#a9c4a3' : '#cfe0c9'} strokeWidth="1.2" strokeLinecap="round" />
    </g>
  )
}

function Tomato({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="17" fill="#d9442f" />
      <circle r="17" fill="none" stroke="#a7301f" strokeWidth="2" />
      <ellipse cx="-6" cy="-7" rx="5" ry="3" fill="#fff" opacity="0.55" transform="rotate(-30 -6 -7)" />
      <path d="M-7 -15 L0 -9 L7 -15 L2 -11 L0 -19 L-2 -11Z" fill="#4a6b4f" />
    </g>
  )
}

export default function HeroPlate() {
  return (
    <svg viewBox="0 0 480 480" className="block h-full w-full" role="img" aria-label="A plate of saffron rice with roasted tomatoes, sage and lemon">
      {/* soft backdrop shapes */}
      <path
        d="M70 250 C60 130 160 50 260 60 C380 72 440 150 424 270 C410 380 320 438 220 424 C130 412 78 350 70 250Z"
        fill="#e4ecdf"
      />
      <circle cx="404" cy="96" r="22" fill="#f2cf7a" opacity="0.7" />
      <circle cx="70" cy="404" r="14" fill="#f2cf7a" opacity="0.6" />

      {/* plate */}
      <ellipse cx="240" cy="418" rx="150" ry="14" fill="#1f3326" opacity="0.12" />
      <circle cx="240" cy="240" r="190" fill="#ffffff" stroke="#e8dfca" strokeWidth="3" />
      <circle cx="240" cy="240" r="160" fill="#f9f4e7" stroke="#ece3cf" strokeWidth="2" />
      <circle cx="240" cy="240" r="176" fill="none" stroke="#2f4a37" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />

      {/* saffron rice mound */}
      <circle cx="240" cy="244" r="122" fill="#e9b53a" />
      <circle cx="240" cy="238" r="118" fill="#f1c552" />
      {grains.map((g, i) => (
        <ellipse key={i} cx={g.x} cy={g.y} rx="6.5" ry="2.4" fill={g.fill} transform={`rotate(${g.rot} ${g.x} ${g.y})`} />
      ))}

      {/* toppings */}
      <Tomato x={196} y={206} />
      <Tomato x={284} y={224} />
      <Tomato x={238} y={290} />
      <Leaf x={218} y={252} rot={-40} scale={0.9} />
      <Leaf x={252} y={186} rot={-120} scale={0.85} dark />
      <Leaf x={300} y={270} rot={30} scale={0.8} />
      <Leaf x={168} y={262} rot={150} scale={0.75} dark />

      {/* saffron threads */}
      <g fill="none" stroke="#c2410c" strokeWidth="2.4" strokeLinecap="round">
        <path d="M226 160 q10 14 4 30" />
        <path d="M236 156 q-4 18 8 30" />
        <path d="M248 160 q10 10 6 26" />
        <path d="M310 232 q-14 6 -28 -2" />
        <path d="M312 244 q-16 2 -26 -8" />
        <path d="M176 238 q14 -2 24 8" />
      </g>

      {/* lemon wedge */}
      <g transform="translate(364 332) rotate(-24)">
        <path d="M-40 0 A40 40 0 0 1 40 0Z" fill="#f6d84a" stroke="#d6b21f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M-32 -2 A32 32 0 0 1 32 -2Z" fill="#fff3b0" />
        <path d="M0 -2 V-32 M-17 -2 L-24 -26 M17 -2 L24 -26" stroke="#f6d84a" strokeWidth="2" />
      </g>

      {/* cutlery */}
      <g fill="#cfd6d1" stroke="#aab4ad" strokeWidth="2" strokeLinejoin="round">
        <rect x="30" y="170" width="10" height="150" rx="5" />
        <path d="M24 170 h22 v34 a11 11 0 0 1 -22 0z" />
        <path d="M452 170 C440 200 440 240 450 270 V320 a5 5 0 0 1 -10 0 V270 C430 240 432 200 444 170Z" />
      </g>

      {/* floating herbs */}
      <motion.g animate={{ y: [0, -9, 0], rotate: [0, 4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <Leaf x={386} y={60} rot={-35} scale={1.05} />
      </motion.g>
      <motion.g animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}>
        <Leaf x={36} y={92} rot={25} scale={0.95} dark />
      </motion.g>
      <motion.g animate={{ y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>
        <Leaf x={64} y={440} rot={-20} scale={0.8} />
      </motion.g>

      {/* steam */}
      <g fill="none" stroke="#2f4a37" strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round">
        <motion.path
          d="M200 120 q-14 -20 0 -36 q14 -16 0 -34"
          initial={{ pathLength: 0.3, opacity: 0 }}
          animate={{ pathLength: [0.3, 1, 0.3], opacity: [0, 1, 0], y: [8, -10, 8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M244 112 q-14 -20 0 -36 q14 -16 0 -34"
          initial={{ pathLength: 0.3, opacity: 0 }}
          animate={{ pathLength: [0.3, 1, 0.3], opacity: [0, 1, 0], y: [8, -10, 8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
        <motion.path
          d="M288 120 q-14 -20 0 -36 q14 -16 0 -34"
          initial={{ pathLength: 0.3, opacity: 0 }}
          animate={{ pathLength: [0.3, 1, 0.3], opacity: [0, 1, 0], y: [8, -10, 8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
        />
      </g>
    </svg>
  )
}