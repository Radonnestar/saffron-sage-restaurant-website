import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, Check, Clock, Hourglass, Minus, PhoneCall, Plus, ShieldCheck, Users } from 'lucide-react'
import { getDhakaNow, hours } from '../lib/hours'

type Values = {
  name: string
  email: string
  phone: string
  date: string
  time: string // minutes after midnight, or '' when nothing is chosen
  guests: number
  occasion: string
  notes: string
}

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'date' | 'time', string>>

const emptyForm: Values = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  occasion: '',
  notes: '',
}

const occasions = ['Birthday', 'Anniversary', 'Date night', 'Business dinner', 'Family gathering']

const perks = [
  { icon: ShieldCheck, text: 'Free cancellation up to 2 hours before your booking' },
  { icon: Hourglass, text: 'We hold your table for 15 minutes after your time' },
  { icon: PhoneCall, text: 'Parties of 11 or more? Call us on +880 1700 000000' },
]

function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60) % 24
  const m = minutes % 60
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

// Every half hour from opening until one hour before closing.
function slotsFor(date: string, today: string, nowMinutes: number) {
  if (!date) return []
  const { open, close } = hours[new Date(`${date}T12:00:00`).getDay()]
  const slots: number[] = []
  for (let m = open; m <= close - 60; m += 30) {
    if (date === today && m < nowMinutes + 60) continue
    slots.push(m)
  }
  return slots
}

function validate(values: Values, min: string, max: string, slots: number[]): Errors {
  const errors: Errors = {}

  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Please enter a valid email address.'
  if (values.phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a phone number we can reach.'

  if (!values.date) errors.date = 'Please choose a date.'
  else if (values.date < min || values.date > max) errors.date = 'Please choose a date within the next 60 days.'

  if (values.time === '') errors.time = 'Please choose a time.'
  else if (!slots.includes(Number(values.time))) errors.time = 'That time is not available. Please pick another.'

  return errors
}

function makeReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return `SS-${code}`
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink/35 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-300/50 ${
    hasError ? 'border-red-400' : 'border-sage-800/15'
  }`
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  optional?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-sage-800">
        {label}
        {optional && <span className="font-normal text-ink/45"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

type Confirmation = { reference: string; values: Values }

export default function Reserve() {
  const [bounds] = useState(getDhakaNow)
  const [values, setValues] = useState<Values>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)

  const minDate = bounds.date
  const maxDate = addDays(bounds.date, 60)
  const slots = slotsFor(values.date, bounds.date, bounds.minutes)
  const errors = submitted ? validate(values, minDate, maxDate, slots) : {}

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    // A new date has different time slots, so the chosen time is cleared.
    setValues({ ...values, [name]: value, ...(name === 'date' ? { time: '' } : {}) })
  }

  function changeGuests(change: number) {
    setValues({ ...values, guests: Math.min(10, Math.max(1, values.guests + change)) })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)

    if (Object.keys(validate(values, minDate, maxDate, slots)).length === 0) {
      setConfirmation({ reference: makeReference(), values })
    }
  }

  function reset() {
    setValues(emptyForm)
    setSubmitted(false)
    setConfirmation(null)
  }

  return (
    <section id="reserve" className="relative scroll-mt-20 overflow-hidden bg-sage-900 py-20 md:py-28">
      <div className="pointer-events-none absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-saffron-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-40 h-[480px] w-[480px] rounded-full bg-sage-400/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-4 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-cream lg:col-span-2 lg:pt-6"
        >
          <p className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.3em] text-saffron-300 uppercase">
            <span className="h-px w-8 bg-saffron-300" />
            Reservations
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-bold md:text-5xl">
            Save your table <span className="text-saffron-300 italic">tonight</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/75">
            Tell us when you are coming and how many of you there will be. We will have the candles lit.
          </p>

          <ul className="mt-9 space-y-5">
            {perks.map((perk) => (
              <li key={perk.text} className="flex items-start gap-4 text-cream/85">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-saffron-300">
                  <perk.icon size={19} />
                </span>
                <span className="pt-2">{perk.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="rounded-3xl bg-cream p-6 shadow-2xl md:p-10 lg:col-span-3"
        >
          <AnimatePresence mode="wait">
            {confirmation ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="py-6 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage-200">
                  <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="#2f4a37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <motion.path
                      d="M5 12.5 L10 17.5 L19 7.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold text-sage-800">You are all set, {confirmation.values.name.split(' ')[0]}!</h3>
                <p className="mt-2 text-ink/70">
                  Your table is reserved. A confirmation would be sent to {confirmation.values.email}.
                </p>

                <dl className="mx-auto mt-8 max-w-sm divide-y divide-sage-800/10 rounded-2xl bg-white text-left shadow-sm">
                  {[
                    ['Date', formatDate(confirmation.values.date)],
                    ['Time', formatTime(Number(confirmation.values.time))],
                    ['Guests', `${confirmation.values.guests} ${confirmation.values.guests === 1 ? 'person' : 'people'}`],
                    ['Reference', confirmation.reference],
                  ].map(([term, detail]) => (
                    <div key={term} className="flex items-center justify-between px-5 py-3.5">
                      <dt className="text-sm text-ink/55">{term}</dt>
                      <dd className="font-semibold text-sage-800">{detail}</dd>
                    </div>
                  ))}
                </dl>

                <button
                  onClick={reset}
                  className="mt-8 rounded-full border border-sage-800/25 px-7 py-3 text-sm font-medium text-sage-800 transition-colors hover:bg-sage-800/5"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="name" error={errors.name}>
                    <input id="name" name="name" value={values.name} onChange={handleChange} placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={inputClass(!!errors.name)} />
                  </Field>
                  <Field label="Email" htmlFor="email" error={errors.email}>
                    <input id="email" name="email" type="email" value={values.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={inputClass(!!errors.email)} />
                  </Field>
                  <Field label="Phone" htmlFor="phone" error={errors.phone}>
                    <input id="phone" name="phone" type="tel" value={values.phone} onChange={handleChange} placeholder="+880 1700 000000" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} className={inputClass(!!errors.phone)} />
                  </Field>
                  <Field label="Occasion" htmlFor="occasion" optional>
                    <select id="occasion" name="occasion" value={values.occasion} onChange={handleChange} className={inputClass(false)}>
                      <option value="">Just dinner</option>
                      {occasions.map((occasion) => (
                        <option key={occasion} value={occasion}>
                          {occasion}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Date" htmlFor="date" error={errors.date}>
                    <div className="relative">
                      <input id="date" name="date" type="date" min={minDate} max={maxDate} value={values.date} onChange={handleChange} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'date-error' : undefined} className={`${inputClass(!!errors.date)} pr-11`} />
                      <CalendarDays size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink/40" />
                    </div>
                  </Field>

                  <div>
                    <span className="mb-2 block text-sm font-medium text-sage-800">Guests</span>
                    <div className="flex items-center justify-between rounded-xl border border-sage-800/15 bg-white px-2 py-1.5">
                      <button type="button" onClick={() => changeGuests(-1)} disabled={values.guests <= 1} aria-label="Fewer guests" className="flex h-10 w-10 items-center justify-center rounded-lg text-sage-800 transition-colors hover:bg-sage-50 disabled:opacity-30">
                        <Minus size={18} />
                      </button>
                      <span className="flex items-center gap-2 font-semibold text-sage-800" aria-live="polite">
                        <Users size={18} className="text-saffron-600" />
                        {values.guests} {values.guests === 1 ? 'guest' : 'guests'}
                      </span>
                      <button type="button" onClick={() => changeGuests(1)} disabled={values.guests >= 10} aria-label="More guests" className="flex h-10 w-10 items-center justify-center rounded-lg text-sage-800 transition-colors hover:bg-sage-50 disabled:opacity-30">
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-sage-800">
                    <Clock size={16} className="text-saffron-600" />
                    Time
                  </span>
                  {!values.date ? (
                    <p className="rounded-xl bg-sage-50 px-4 py-3 text-sm text-ink/60">Choose a date to see the times we have available.</p>
                  ) : slots.length === 0 ? (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">We are fully booked for the rest of today. Please choose another date.</p>
                  ) : (
                    <div role="radiogroup" aria-label="Reservation time" className="flex flex-wrap gap-2">
                      {slots.map((slot) => {
                        const selected = values.time === String(slot)
                        return (
                          <button
                            key={slot}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setValues({ ...values, time: String(slot) })}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              selected
                                ? 'border-sage-800 bg-sage-800 text-cream'
                                : 'border-sage-800/20 bg-white text-sage-800 hover:border-saffron-500 hover:bg-saffron-300/20'
                            }`}
                          >
                            {formatTime(slot)}
                          </button>
                        )
                      })}
                    </div>
                  )}
                  {errors.time && <p className="mt-2 text-sm text-red-600">{errors.time}</p>}
                </div>

                <Field label="Anything we should know?" htmlFor="notes" optional>
                  <textarea id="notes" name="notes" rows={3} value={values.notes} onChange={handleChange} placeholder="Allergies, a high chair, a window seat..." className={inputClass(false)} />
                </Field>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-sage-800 py-4 font-medium text-cream shadow-lg shadow-sage-900/20 transition-colors hover:bg-sage-600"
                >
                  <Check size={18} />
                  Confirm reservation
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}