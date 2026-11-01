import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import SectionHeading from './SectionHeading'
import GalleryArt from './GalleryArt'

type Shot = {
  id: string
  title: string
  caption: string
}

const shots: Shot[] = [
  { id: 'dining', title: 'The dining room', caption: 'Warm light, wooden floors and a window onto the garden.' },
  { id: 'oven', title: 'The wood-fired oven', caption: 'Everything from flatbread to lamb is touched by real flame.' },
  { id: 'spritz', title: 'Sage & Lemon Spritz', caption: 'Our house cooler, made with sage syrup and fresh mint.' },
  { id: 'herbs', title: 'Our herb shelf', caption: 'Sage, basil and rosemary picked minutes before service.' },
  { id: 'bread', title: 'Fresh from the oven', caption: 'Bread baked every afternoon and served warm.' },
  { id: 'terrace', title: 'Evenings on the terrace', caption: 'String lights, long dinners and a view of the sunset.' },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const tile: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % shots.length))
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + shots.length) % shots.length))
    }
    window.addEventListener('keydown', onKey)

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  const current = open === null ? null : shots[open]

  return (
    <section id="gallery" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Gallery"
          title="A look inside Saffron & Sage"
          description="From the first bake of the day to the last candle of the night."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {shots.map((shot, index) => (
            <motion.button
              key={shot.id}
              variants={tile}
              onClick={() => setOpen(index)}
              aria-label={`Enlarge: ${shot.title}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl text-left shadow-sm"
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <GalleryArt id={shot.id} />
              </div>
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-sage-900/90 to-sage-900/0 p-5 pt-14 transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                <p className="font-display text-xl font-bold text-cream">{shot.title}</p>
              </div>
              <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-sage-800 opacity-0 shadow transition group-hover:opacity-100">
                <ZoomIn size={18} />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-sage-900/92 p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setOpen((open - 1 + shots.length) % shots.length)
              }}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 md:left-8"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setOpen((open + 1) % shots.length)
              }}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 md:right-8"
            >
              <ChevronRight size={24} />
            </button>

            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <GalleryArt id={current.id} />
              </div>
              <figcaption className="mt-5 text-center text-cream">
                <p className="font-display text-2xl font-bold">{current.title}</p>
                <p className="mt-1 text-cream/70">{current.caption}</p>
                <p className="mt-3 text-sm text-cream/50">
                  {open + 1} / {shots.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}