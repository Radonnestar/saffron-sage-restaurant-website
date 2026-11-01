import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { ArrowRight, Clock, Leaf, MapPin } from 'lucide-react'
import HeroPlate from './HeroPlate'

const facts = [
  { icon: Clock, text: 'Open daily, 12pm to 11pm' },
  { icon: Leaf, text: 'Locally sourced, seasonal' },
  { icon: MapPin, text: 'Old Town, Dhaka' },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-saffron-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-[360px] w-[360px] rounded-full bg-sage-200/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.3em] text-saffron-600 uppercase"
          >
            <span className="h-px w-10 bg-saffron-500" />
            Modern Mediterranean
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-5xl leading-[1.05] font-bold text-sage-800 sm:text-6xl lg:text-7xl"
          >
            Seasonal food,{' '}
            <span className="text-saffron-500 italic">slow cooked</span> with love
          </motion.h1>

          <motion.p variants={item} className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink/70 lg:mx-0">
            Saffron &amp; Sage is a neighbourhood kitchen where fire, fresh herbs and honest
            ingredients meet. Come hungry, stay for the whole evening.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <motion.a
              href="#reserve"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full bg-sage-800 px-8 py-3.5 font-medium text-cream shadow-lg shadow-sage-900/20 transition-colors hover:bg-sage-600"
            >
              Reserve a table
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-sage-800/30 px-8 py-3.5 font-medium text-sage-800 transition-colors hover:border-saffron-500 hover:bg-saffron-300/20"
            >
              View the menu
            </motion.a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-12 flex flex-col items-center gap-3 text-sm text-ink/70 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 lg:justify-start"
          >
            {facts.map((fact) => (
              <li key={fact.text} className="flex items-center gap-2">
                <fact.icon size={17} className="text-saffron-600" />
                {fact.text}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="mx-auto aspect-square w-full max-w-md lg:max-w-none"
        >
          <HeroPlate />
        </motion.div>
      </div>
    </section>
  )
}