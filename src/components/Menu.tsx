import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Variants } from 'motion/react'
import SectionHeading from './SectionHeading'

const categories = ['Starters', 'Mains', 'Desserts', 'Drinks'] as const

type Category = (typeof categories)[number]
type Tag = 'V' | 'VG' | 'GF' | 'S'

type MenuItem = {
  name: string
  description: string
  price: string
  tags?: Tag[]
}

const tagInfo: Record<Tag, { label: string; className: string }> = {
  V: { label: 'Vegetarian', className: 'bg-sage-200 text-sage-800' },
  VG: { label: 'Vegan', className: 'bg-sage-400 text-white' },
  GF: { label: 'Gluten free', className: 'bg-saffron-300 text-ink' },
  S: { label: 'Spicy', className: 'bg-red-200 text-red-800' },
}

const menu: Record<Category, MenuItem[]> = {
  Starters: [
    { name: 'Burrata & Heirloom Tomatoes', description: 'Basil oil, flaky sea salt, grilled sourdough.', price: '$14', tags: ['V'] },
    { name: 'Charred Octopus', description: 'Smoked paprika, crushed potatoes, lemon aioli.', price: '$17', tags: ['GF'] },
    { name: 'Whipped Feta & Honey', description: 'Warm flatbread, thyme, toasted pistachio.', price: '$11', tags: ['V'] },
    { name: 'Roasted Red Lentil Soup', description: 'Cumin, preserved lemon, olive oil.', price: '$9', tags: ['VG', 'GF'] },
    { name: 'Crispy Calamari', description: 'Chilli salt, harissa mayo, fresh lime.', price: '$13', tags: ['S'] },
    { name: 'Wild Mushroom Arancini', description: 'Saffron risotto, parmesan, truffle cream.', price: '$12', tags: ['V'] },
  ],
  Mains: [
    { name: 'Herb-Crusted Salmon', description: 'Sage crust, pea purée, charred asparagus.', price: '$26', tags: ['GF'] },
    { name: 'Saffron Seafood Rice', description: 'Prawns, mussels, squid and slow-cooked saffron broth.', price: '$29', tags: ['GF'] },
    { name: 'Slow-Braised Lamb Shoulder', description: 'Pomegranate glaze, herbed couscous, yoghurt.', price: '$32' },
    { name: 'Roasted Cauliflower Steak', description: 'Tahini, golden raisins, za\u2019atar, pine nuts.', price: '$21', tags: ['VG', 'GF'] },
    { name: 'Chargrilled Chicken Thighs', description: 'Lemon and oregano marinade, grilled peppers.', price: '$23', tags: ['GF'] },
    { name: 'Fresh Pappardelle', description: 'Slow tomato ragù, basil, aged pecorino.', price: '$20', tags: ['V'] },
  ],
  Desserts: [
    { name: 'Saffron Honey Panna Cotta', description: 'Vanilla cream, berries, crushed pistachio.', price: '$11', tags: ['GF'] },
    { name: 'Olive Oil Cake', description: 'Orange blossom syrup, whipped mascarpone.', price: '$10', tags: ['V'] },
    { name: 'Dark Chocolate Torte', description: 'Sea salt, espresso cream, hazelnut.', price: '$12', tags: ['V', 'GF'] },
    { name: 'Baklava Ice Cream Sandwich', description: 'Pistachio gelato between crisp filo layers.', price: '$10', tags: ['V'] },
    { name: 'Poached Pear', description: 'Cardamom syrup, vanilla labneh.', price: '$9', tags: ['V', 'GF'] },
    { name: 'Seasonal Sorbet', description: 'Three scoops, ask your server for today\u2019s flavours.', price: '$8', tags: ['VG', 'GF'] },
  ],
  Drinks: [
    { name: 'Sage & Lemon Spritz', description: 'Sage syrup, lemon, sparkling water, mint.', price: '$8', tags: ['VG'] },
    { name: 'Saffron Old Fashioned', description: 'Bourbon, saffron-honey syrup, orange bitters.', price: '$13' },
    { name: 'Pomegranate Mule', description: 'Vodka, pomegranate, ginger beer, lime.', price: '$12' },
    { name: 'Cardamom Coffee', description: 'Slow-brewed with a hint of cardamom.', price: '$5', tags: ['VG'] },
    { name: 'Fresh Mint Lemonade', description: 'Pressed daily. Sweet, sharp and cold.', price: '$6', tags: ['VG'] },
    { name: 'House Wine by the Glass', description: 'Ask for today\u2019s red, white or rosé.', price: '$9' },
  ],
}

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const row: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export default function Menu() {
  const [active, setActive] = useState<Category>('Starters')

  return (
    <section id="menu" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="The menu"
          title="Cooked over fire, finished with herbs"
          description="Our menu follows the seasons, so a few dishes change every few weeks."
        />

        <div role="tablist" aria-label="Menu categories" className="mt-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                active === category
                  ? 'text-cream'
                  : 'border border-sage-800/20 text-sage-800 hover:bg-sage-800/5'
              }`}
            >
              {active === category && (
                <motion.span
                  layoutId="menu-pill"
                  className="absolute inset-0 rounded-full bg-sage-800"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{category}</span>
            </button>
          ))}
        </div>

        <div className="mt-14 min-h-[560px] md:min-h-[290px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              role="tabpanel"
              variants={list}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid gap-x-16 gap-y-8 md:grid-cols-2"
            >
              {menu[active].map((item) => (
                <motion.li key={item.name} variants={row}>
                  <div className="flex items-end gap-3">
                    <h3 className="font-display text-xl font-bold text-sage-800">{item.name}</h3>
                    <span className="mb-1.5 flex-1 border-b-2 border-dotted border-sage-800/25" />
                    <span className="font-display text-xl font-bold text-saffron-600">{item.price}</span>
                  </div>
                  <div className="mt-1 flex items-start justify-between gap-4">
                    <p className="text-ink/70">{item.description}</p>
                    {item.tags && (
                      <span className="flex shrink-0 gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            title={tagInfo[tag].label}
                            className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${tagInfo[tag].className}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-sage-800/10 pt-8 text-sm text-ink/70">
          {(Object.keys(tagInfo) as Tag[]).map((tag) => (
            <li key={tag} className="flex items-center gap-2">
              <span
                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${tagInfo[tag].className}`}
              >
                {tag}
              </span>
              {tagInfo[tag].label}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-sm text-ink/50">
          Please tell your server about any allergies before ordering.
        </p>
      </div>
    </section>
  )
}