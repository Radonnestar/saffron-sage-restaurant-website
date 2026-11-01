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
    at: 2.4,
    wipe: 'wipe-diag',
    caption: 'Slow-simmered with real saffron',
    from: { x: 0.4, y: 0.55, z: 1.02 },
    to: { x: 0.52, y: 0.6, z: 1.16 },
  },
  {
    id: 'wine',
    src: img('wine'),
    at: 4.6,
    wipe: 'wipe-iris',
    caption: 'Poured with care',
    from: { x: 0.52, y: 0.42, z: 1.02 },
    to: { x: 0.66, y: 0.55, z: 1.18 },
  },
  {
    id: 'order',
    src: img('order'),
    at: 6.9,
    wipe: 'wipe-up',
    caption: 'Your order, taken to heart',
    from: { x: 0.38, y: 0.56, z: 1.04 },
    to: { x: 0.64, y: 0.52, z: 1.16 },
  },
  {
    id: 'serve',
    src: img('serve'),
    at: 9.1,
    wipe: 'wipe-low',
    caption: 'Served at its very best',
    from: { x: 0.5, y: 0.52, z: 1.22 },
    to: { x: 0.5, y: 0.5, z: 1.0 },
  },
]

const REVEAL_AT = 11.3 // the curtain starts to lift
const END_AT = 12 // the intro is over

export default function Intro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [ready, setReady] = useState(false)
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [skipped, setSkipped] = useState(false)

  // The page behind the intro should not scroll.
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

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

  // The timeline: switch scene at the right second, lift the curtain, then finish.
  useEffect(() => {
    if (!ready || skipped) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onReveal()
      onDone()
      return
    }
    const timers = scenes.slice(1).map((s, i) => setTimeout(() => setIndex(i + 1), s.at * 1000))
    timers.push(
      setTimeout(() => {
        setExiting(true)
        onReveal()
      }, REVEAL_AT * 1000),
    )
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
    <div className={`intro-root ${exiting ? 'is-exiting' : ''}`} role="presentation">
      {!ready && <span className="intro-loading" />}

      {ready &&
        scenes.map((s, i) => {
          if (i !== index && i !== index - 1) return null
          const length = (i === last ? END_AT : scenes[i + 1].at) - s.at + 0.9
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
          <div className="title-in text-center text-cream" style={{ animationDelay: '1s' }}>
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
  )
}