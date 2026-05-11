export default function SectionHeading({ eyebrow, title, children, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="text-sm font-semibold text-copper">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">{title}</h2>
      {children ? <p className="mt-5 text-base leading-8 text-ink/70 sm:text-lg">{children}</p> : null}
    </div>
  )
}
