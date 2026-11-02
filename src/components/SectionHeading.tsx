import { motion } from 'motion/react'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.3em] text-saffron-700 uppercase">
        <span className="h-px w-8 bg-saffron-500" />
        {eyebrow}
        <span className="h-px w-8 bg-saffron-500" />
      </p>
      <h2 className="mt-4 font-display text-4xl leading-tight font-bold text-sage-800 md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-ink/70">{description}</p>}
    </motion.div>
  )
}