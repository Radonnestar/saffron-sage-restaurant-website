import { motion } from 'motion/react'

/* An original, simplified neighbourhood map drawn on a 600 x 460 canvas. */

const blocks = [
  [30, 30, 110, 70], [170, 30, 90, 70], [30, 130, 110, 80], [180, 130, 80, 60],
  [320, 30, 100, 80], [450, 30, 120, 70], [330, 150, 90, 60], [450, 130, 120, 80],
  [30, 250, 90, 80], [150, 250, 110, 70], [30, 360, 130, 70], [190, 350, 90, 80],
  [330, 360, 100, 70], [460, 360, 110, 70], [460, 250, 110, 80],
]

const trees = [
  [340, 280], [358, 298], [382, 276], [404, 300], [426, 280], [350, 318], [376, 322], [412, 320],
]

export default function MapArt() {
  return (
    <svg
      viewBox="0 0 600 460"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Illustrated map showing Saffron & Sage on Spice Lane in Old Town"
    >
      <rect width="600" height="460" fill="#e8eee0" />

      {blocks.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill={i % 3 ? '#f4eddc' : '#efe5cf'} />
      ))}

      {/* river */}
      <path d="M-20 330 C120 300 210 360 320 336 S520 270 640 300" fill="none" stroke="#bfdce6" strokeWidth="42" strokeLinecap="round" />
      <path d="M-20 330 C120 300 210 360 320 336 S520 270 640 300" fill="none" stroke="#d8edf3" strokeWidth="26" strokeLinecap="round" />

      {/* park */}
      <rect x="310" y="236" width="150" height="96" rx="16" fill="#cfe0c4" />
      {trees.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="11" fill="#7da077" />
          <circle cx={x - 3} cy={y - 3} r="5" fill="#9bbd93" />
        </g>
      ))}

      {/* roads */}
      <g stroke="#ffffff" strokeLinecap="round" fill="none">
        <path d="M0 114 H600" strokeWidth="18" />
        <path d="M0 226 H600" strokeWidth="14" />
        <path d="M0 340 H190" strokeWidth="14" />
        <path d="M150 0 V460" strokeWidth="16" />
        <path d="M296 0 V460" strokeWidth="20" />
        <path d="M436 0 V230" strokeWidth="14" />
        <path d="M0 460 L180 330" strokeWidth="12" />
      </g>
      <g stroke="#e3d9c0" strokeWidth="2" strokeDasharray="10 12" fill="none">
        <path d="M0 114 H600" />
        <path d="M296 0 V460" />
      </g>

      {/* bridge */}
      <rect x="284" y="322" width="24" height="38" rx="4" fill="#ffffff" stroke="#e3d9c0" strokeWidth="2" />

      {/* street names */}
      <g fontSize="12" fontWeight="600" fill="#7a8a76" letterSpacing="1.5">
        <text x="460" y="119">GARDEN ROAD</text>
        <text x="40" y="231">SPICE LANE</text>
        <text x="300" y="52" transform="rotate(90 300 52)">OLD TOWN SQUARE</text>
        <text x="322" y="254" fontSize="10" letterSpacing="2">HERB PARK</text>
        <text x="60" y="318" fontSize="10" fill="#6f9bb0" letterSpacing="2">RIVER</text>
      </g>

      {/* landmark: market dome */}
      <g transform="translate(86 172)">
        <path d="M-20 14 A20 20 0 0 1 20 14Z" fill="#d9794a" />
        <rect x="-20" y="14" width="40" height="10" fill="#c8683c" />
        <circle cy="-8" r="3" fill="#c8683c" />
      </g>

      {/* the restaurant */}
      <g transform="translate(296 232)">
        <motion.circle
          r="20"
          fill="#e0a82e"
          initial={{ scale: 0.6, opacity: 0.5 }}
          animate={{ scale: [0.6, 2.4], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.g animate={{ y: [0, -9, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M0 0 C-22 -26 -24 -50 0 -58 C24 -50 22 -26 0 0Z" fill="#2f4a37" stroke="#1f3326" strokeWidth="2" />
          <circle cy="-36" r="11" fill="#faf6ee" />
          <path d="M0 -44 C5 -38 5 -34 0 -28 C-5 -34 -5 -38 0 -44Z" fill="#e0a82e" />
        </motion.g>
      </g>
    </svg>
  )
}