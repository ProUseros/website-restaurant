export default function SectionHeading({ eyebrow, title, children, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-olive/80">{eyebrow}</p>
      <div className={`mt-4 h-px w-14 bg-tan ${align === 'center' ? 'mx-auto' : ''}`} aria-hidden="true" />
      <h2 className="mt-5 font-display text-3xl leading-[1.08] text-ink sm:text-5xl">{title}</h2>
      {children ? <p className="mt-4 text-base leading-7 text-smoke sm:mt-5 sm:text-lg sm:leading-8">{children}</p> : null}
    </div>
  )
}
