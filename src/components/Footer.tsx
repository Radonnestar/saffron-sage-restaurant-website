import { ArrowUp, Leaf, MapPin, Phone, Mail } from 'lucide-react'

const year = new Date().getFullYear()

const links = [
  { label: 'Featured dishes', href: '#featured' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit us', href: '#visit' },
  { label: 'Reserve a table', href: '#reserve' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-3">
        <div>
          <a href="#top" className="inline-flex items-center gap-2 font-display text-2xl font-bold text-cream">
            <Leaf size={22} className="text-saffron-500" />
            Saffron <span className="text-saffron-500">&amp;</span> Sage
          </a>
          <p className="mt-4 max-w-xs leading-relaxed">
            Seasonal, locally sourced cooking in the heart of Old Town, Dhaka. Come hungry, stay a while.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-medium tracking-[0.25em] text-saffron-300 uppercase">Explore</h3>
          <ul className="mt-5 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-saffron-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-medium tracking-[0.25em] text-saffron-300 uppercase">Find us</h3>
          <ul className="mt-5 space-y-3">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-saffron-500" />
              14 Spice Lane, Old Town, Dhaka
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-saffron-500" />
              +880 1700 000000
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-saffron-500" />
              hello@saffronandsage.example
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row">
          <p>&copy; {year} Saffron &amp; Sage. A fictional restaurant, made as a portfolio project.</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition-colors hover:border-saffron-300 hover:text-saffron-300"
          >
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}