import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import SectionHeading from './SectionHeading'
import MapArt from './MapArt'
import { getDhakaNow, hours } from '../lib/hours'

const details = [
  { icon: MapPin, label: 'Address', value: '14 Spice Lane, Old Town, Dhaka' },
  { icon: Phone, label: 'Phone', value: '+880 1700 000000' },
  { icon: Mail, label: 'Email', value: 'hello@saffronandsage.example' },
]

export default function Visit() {
  const [now, setNow] = useState(getDhakaNow)

  useEffect(() => {
    const timer = setInterval(() => setNow(getDhakaNow()), 60_000)
    return () => clearInterval(timer)
  }, [])

  const today = hours[now.dayIndex]
  const isOpen = now.minutes >= today.open && now.minutes < today.close

  return (
    <section id="visit" className="scroll-mt-20 overflow-x-clip bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Visit us"
          title="Come hungry, stay a while"
          description="Walk-ins are always welcome, but a reservation guarantees your table."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="rounded-3xl bg-white p-8 shadow-sm md:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-3 font-display text-2xl font-bold text-sage-800">
                <Clock size={24} className="text-saffron-600" />
                Opening hours
              </h3>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
                  isOpen ? 'bg-sage-200 text-sage-800' : 'bg-red-100 text-red-800'
                }`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  {isOpen && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-600 opacity-60" />
                  )}
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-sage-600' : 'bg-red-500'}`}
                  />
                </span>
                {isOpen ? 'Open now' : 'Closed now'}
              </span>
            </div>

            <ul className="mt-6 divide-y divide-sage-800/10">
              {hours.map((entry, index) => {
                const isToday = index === now.dayIndex
                return (
                  <li
                    key={entry.day}
                    className={`flex items-center justify-between py-3 ${
                      isToday ? '-mx-3 rounded-xl bg-saffron-300/25 px-3 font-semibold text-sage-800' : 'text-ink/75'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {entry.day}
                      {isToday && (
                        <span className="rounded-full bg-saffron-500 px-2 py-0.5 text-[10px] font-bold tracking-wider text-ink uppercase">
                          Today
                        </span>
                      )}
                    </span>
                    <span>{entry.label}</span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-5 text-sm text-ink/55">Kitchen closes 30 minutes before closing time. Times are Dhaka time.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-3xl border border-sage-800/10 shadow-sm">
              <MapArt />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Old+Town+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-sage-800 px-5 py-2.5 text-sm font-medium text-cream shadow-lg transition-colors hover:bg-saffron-500 hover:text-ink"
              >
                <Navigation size={16} />
                Get directions
              </a>
            </div>

            <ul className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-1">
              {details.map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-50 text-sage-600">
                    <item.icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-ink/50 uppercase">{item.label}</p>
                    <p className="font-medium text-sage-800">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}