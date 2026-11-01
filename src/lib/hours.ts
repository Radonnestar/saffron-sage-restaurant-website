export type Hours = {
  day: string
  open: number // minutes after midnight
  close: number // minutes after midnight (1440 = midnight)
  label: string
}

// Index 0 = Sunday, to match JavaScript's getDay().
export const hours: Hours[] = [
  { day: 'Sunday', open: 11 * 60, close: 22 * 60, label: '11:00 am – 10:00 pm' },
  { day: 'Monday', open: 12 * 60, close: 23 * 60, label: '12:00 pm – 11:00 pm' },
  { day: 'Tuesday', open: 12 * 60, close: 23 * 60, label: '12:00 pm – 11:00 pm' },
  { day: 'Wednesday', open: 12 * 60, close: 23 * 60, label: '12:00 pm – 11:00 pm' },
  { day: 'Thursday', open: 12 * 60, close: 23 * 60, label: '12:00 pm – 11:00 pm' },
  { day: 'Friday', open: 12 * 60, close: 24 * 60, label: '12:00 pm – 12:00 am' },
  { day: 'Saturday', open: 12 * 60, close: 24 * 60, label: '12:00 pm – 12:00 am' },
]

const weekdays = hours.map((entry) => entry.day)

// The restaurant is in Dhaka, so we read the time there, whatever the visitor's own timezone is.
export function getDhakaNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date())

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '0'
  return {
    dayIndex: weekdays.indexOf(get('weekday')),
    minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')),
    date: `${get('year')}-${get('month')}-${get('day')}`, // for example 2026-11-02
  }
}