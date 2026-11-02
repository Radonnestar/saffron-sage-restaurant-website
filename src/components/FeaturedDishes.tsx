import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { Flame, Leaf, Wheat } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeading from './SectionHeading'
import DishArt from './DishArt'

type Dish = {
  id: string
  name: string
  description: string
  price: string
  background: string
  tag: { icon: LucideIcon; label: string }
}

const dishes: Dish[] = [
  {
    id: 'burrata',
    name: 'Burrata & Heirloom Tomatoes',
    description: 'Creamy burrata, sun-ripened tomatoes, basil oil and a pinch of flaky sea salt.',
    price: '$14',
    background: 'bg-sage-200/60',
    tag: { icon: Leaf, label: 'Vegetarian' },
  },
  {
    id: 'salmon',
    name: 'Herb-Crusted Salmon',
    description: 'Pan-roasted with a sage crust, pea purée, charred asparagus and lemon.',
    price: '$26',
    background: 'bg-saffron-300/35',
    tag: { icon: Flame, label: "Chef's pick" },
  },
  {
    id: 'pannacotta',
    name: 'Saffron Honey Panna Cotta',
    description: 'Silky vanilla cream, saffron-honey glaze, fresh berries and crushed pistachio.',
    price: '$11',
    background: 'bg-paper',
    tag: { icon: Wheat, label: 'Gluten free' },
  },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function FeaturedDishes() {
  return (
    <section id="featured" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Signature dishes"
          title="Plates our guests keep coming back for"
          description="Three favourites from the kitchen, made fresh every day from what is in season."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {dishes.map((dish) => (
            <motion.article
              key={dish.id}
              variants={card}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-3xl border border-sage-800/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-sage-900/10"
            >
              <div className={`relative h-56 overflow-hidden ${dish.background}`}>
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                  <DishArt id={dish.id} />
                </div>
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1 text-xs font-medium text-sage-800 shadow-sm">
                  <dish.tag.icon size={14} className="text-saffron-700" />
                  {dish.tag.label}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl leading-snug font-bold text-sage-800">{dish.name}</h3>
                  <p className="font-display text-2xl font-bold text-saffron-700">{dish.price}</p>
                </div>
                <p className="mt-3 leading-relaxed text-ink/70">{dish.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}