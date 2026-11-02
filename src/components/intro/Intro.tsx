import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import './intro.css'

const base = import.meta.env.BASE_URL
const img = (name: string) => `${base}intro/${name}.png`

type Cam = { x: number; y: number; z: number } // where the camera looks (0 to 1 across the painting) and how far it is zoomed in

type Scene = {
  id: string
  src: string
  at: number // second at which this scene starts
  wipe: string // the CSS class that reveals it
  caption: string
  from: Cam
  to: Cam
}

const scenes: Scene[] = [
  {
    id: 'chop',
    src: img('chop'),
    at: 0,
    wipe: '',
    caption: 'Chopped fresh, every morning',
    from: { x: 0.42, y: 0.55, z: 1.0 },
    to: { x: 0.52, y: 0.58, z: 1.16 },
  },
  {
    id: 'stir',
    src: img('stir'),
    at: 2.2,
    wipe: 'wipe-diag',
    caption: 'Slow-simmered with real saffron',
    from: { x: 0.4, y: 0.55, z: 1.02 },
    to: { x: 0.52, y: 0.6, z: 1.16 },
  },
  {
    id: 'wine',
    src: img('wine'),
    at: 4.3,
    wipe: 'wipe-iris',
    caption: 'Poured with care',
    from: { x: 0.52, y: 0.42, z: 1.02 },
    to: { x: 0.66, y: 0.55, z: 1.18 },
  },
  {
    id: 'order',
    src: img('order'),
    at: 6.4,
    wipe: 'wipe-up',
    caption: 'Your order, taken to heart',
    from: { x: 0.38, y: 0.56, z: 1.04 },
    to: { x: 0.64, y: 0.52, z: 1.16 },
  },
  {
    id: 'serve',
    src: img('serve'),
    at: 8.4,
    wipe: 'wipe-low',
    caption: 'Served at its very best',
    from: { x: 0.5, y: 0.52, z: 1.22 },
    to: { x: 0.5, y: 0.5, z: 1.0 },
  },
]

/* A tiny four-pointed sparkle. */
function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" className="sparkle-svg">
      <path d="M12 0 C12.6 7.4 16.6 11.4 24 12 C16.6 12.6 12.6 16.6 12 24 C11.4 16.6 7.4 12.6 0 12 C7.4 11.4 11.4 7.4 12 0Z" fill="#fff0bf" />
    </svg>
  )
}

/* A few quiet specks of light around the title. Their places come from a fixed formula, so they are the same on every visit. */
const halo = Array.from({ length: 9 }, (_, i) => {
  const angle = i * 2.399963 // the "golden angle", which spreads points evenly
  const ring = 0.45 + ((i * 7) % 10) / 18
  return {
    left: 50 + Math.cos(angle) * ring * 40,
    top: 50 + Math.sin(angle) * ring * 30,
    size: 8 + ((i * 5) % 4) * 3,
    delay: 1.4 + ((i * 3) % 9) * 0.45,
  }
})

const MOUNT_AT = 9.2 // the website is built quietly behind the intro, so nothing heavy happens during the dissolve
const REVEAL_AT = 10.6 // the darkness starts to dissolve
const END_AT = 12.8 // the intro is over

export default function Intro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [ready, setReady] = useState(false)
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [skipped, setSkipped] = useState(false)

  // The page behind the intro should not scroll.
  // The strip where a scrollbar would be is painted dark, so it blends with the intro.
  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = 'hidden'
    root.style.backgroundColor = '#14110f'
    return () => {
      root.style.overflow = ''
      root.style.backgroundColor = ''
      root.style.transition = ''
    }
  }, [])

  // While the intro dissolves, that strip fades back to the page colour at the same pace.
  useEffect(() => {
    if (!exiting) return
    const root = document.documentElement
    root.style.transition = 'background-color 1.8s ease'
    root.style.backgroundColor = ''
  }, [exiting])

  // Wait until all five paintings are downloaded, so no scene ever appears half loaded.
  useEffect(() => {
    let cancelled = false
    const giveUp = setTimeout(() => !cancelled && setReady(true), 6000)
    Promise.all(
      scenes.map((s) => {
        const image = new Image()
        image.src = s.src
        return image.decode().catch(() => undefined)
      }),
    ).then(() => {
      if (!cancelled) {
        clearTimeout(giveUp)
        setReady(true)
      }
    })
    return () => {
      cancelled = true
      clearTimeout(giveUp)
    }
  }, [])

  // The timeline: switch scene at the right second, build the site quietly, lift the curtain, then finish.
  useEffect(() => {
    if (!ready || skipped) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onReveal()
      onDone()
      return
    }
    const timers = scenes.slice(1).map((s, i) => setTimeout(() => setIndex(i + 1), s.at * 1000))
    timers.push(setTimeout(onReveal, MOUNT_AT * 1000))
    timers.push(setTimeout(() => setExiting(true), REVEAL_AT * 1000))
    timers.push(setTimeout(onDone, END_AT * 1000))
    return () => timers.forEach(clearTimeout)
  }, [ready, skipped, onReveal, onDone])

  useEffect(() => {
    if (!skipped) return
    const timer = setTimeout(onDone, 700)
    return () => clearTimeout(timer)
  }, [skipped, onDone])

  function skip() {
    setSkipped(true)
    setExiting(true)
    onReveal()
  }

  const last = scenes.length - 1

  return (
    <div className={`intro-wrap ${exiting ? (skipped ? 'is-skipped' : 'is-exiting') : ''}`} role="presentation">
      <div className="intro-root">
      {!ready && <span className="intro-loading" />}

      {ready &&
        scenes.map((s, i) => {
          if (i !== index && i !== index - 1) return null
          const length = (i === last ? REVEAL_AT + 2 : scenes[i + 1].at + 0.9) - s.at
          const cam = {
            '--fx1': s.from.x, '--fy1': s.from.y, '--z1': s.from.z,
            '--fx2': s.to.x, '--fy2': s.to.y, '--z2': s.to.z,
            '--dur': `${length}s`,
          } as CSSProperties
          return (
            <div key={s.id} className={`intro-layer ${s.wipe}`}>
              <div className="scene-cam" style={cam}>
                <img className="scene-img" src={s.src} alt="" />
              </div>
              {i > 0 && <span className="leak" />}
              <span className="caption-shade" />
              <p className="caption absolute bottom-10 left-6 text-cream md:bottom-14 md:left-14">
                <span className="block text-xs tracking-[0.4em] text-saffron-300">{`0${i + 1} / 0${scenes.length}`}</span>
                <span className="mt-2 block font-display text-2xl italic md:text-4xl">{s.caption}</span>
              </p>
            </div>
          )
        })}

      {ready && (
        <>
          <div className="vignette" />
          <div className="grain" />
        </>
      )}

      {ready && index === last && (
        <div className="title-shade">
          <span className="halo" />
          {halo.map((h, i) => (
            <span key={i} className="halo-star" style={{ left: `${h.left}%`, top: `${h.top}%`, width: h.size, height: h.size, animationDelay: `${h.delay}s` }}>
              <Sparkle />
            </span>
          ))}
          <div className="title-in relative text-center text-cream" style={{ animationDelay: '0.8s' }}>
            <h1 className="font-display text-4xl font-bold sm:text-6xl md:text-8xl">
              Saffron <span className="text-saffron-300 italic">&amp;</span> Sage
            </h1>
            <p className="mt-4 text-sm tracking-[0.5em] text-saffron-300 uppercase md:text-base">Dinner is served</p>
          </div>
        </div>
      )}

      {ready && (
        <>
          <div className="progress-track">
            <div className="progress" />
          </div>
          <button type="button" onClick={skip} className="intro-skip">
            Skip
          </button>
        </>
      )}
      </div>

    </div>
  )
}