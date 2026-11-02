import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Leaf, Menu, X } from 'lucide-react'

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit us', href: '#visit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 20)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-cream/90 shadow-sm shadow-sage-900/5 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-xl font-bold text-sage-800 md:text-2xl"
        >
          <Leaf size={22} className="text-saffron-500" />
          <span>
            Saffron <span className="text-saffron-500 italic">&amp;</span> Sage
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium tracking-wide text-ink/80 transition hover:text-saffron-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reserve"
          className="hidden rounded-full bg-sage-800 px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-saffron-500 hover:text-ink md:inline-flex"
        >
          Reserve a table
        </a>

        <button
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="rounded-full p-2 text-sage-800 md:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pt-2 pb-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-lg font-medium text-ink hover:bg-sage-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="#reserve"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-sage-800 py-3 text-center font-medium text-cream"
                >
                  Reserve a table
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}