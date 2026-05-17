import { useEffect, useState } from 'react'
import CalendarCheck from 'lucide-react/dist/esm/icons/calendar-check.js'
import Menu from 'lucide-react/dist/esm/icons/menu.js'
import X from 'lucide-react/dist/esm/icons/x.js'
import { navLinks } from '../data'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navTone = isScrolled ? 'bg-linen/96 shadow-soft' : 'bg-linen'
  const borderTone = isScrolled ? 'border-olive/10' : 'border-olive/8'

  return (
    <header className={`sticky top-0 z-50 border-b ${borderTone} ${navTone} transition duration-300`}>
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8"
      >
        <a href="#home" className="flex items-center gap-3" onClick={closeMenu}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-olive text-base font-bold text-pearl shadow-soft sm:h-12 sm:w-12 sm:text-lg">
            LB
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xl leading-none text-ink sm:text-2xl">Luna Bistro</span>
            <span className="block text-sm text-smoke">Cafe & Supper Club</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-ink/82 transition hover:text-olive">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#reservation"
          className="hidden min-h-12 items-center gap-2 rounded-sm bg-olive px-5 py-3 text-sm font-semibold text-pearl transition hover:bg-moss md:flex"
        >
          <CalendarCheck size={17} aria-hidden="true" />
          Book a Table
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-olive/15 text-olive transition hover:bg-cream lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="mx-auto max-w-7xl border-t border-olive/10 bg-linen px-4 py-3 shadow-soft lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-sm px-3 py-3 text-sm font-medium text-ink transition hover:bg-cream"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservation"
            className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-sm bg-olive px-4 py-3 text-sm font-semibold text-pearl"
            onClick={closeMenu}
          >
            <CalendarCheck size={17} aria-hidden="true" />
            Book a Table
          </a>
        </div>
      ) : null}
    </header>
  )
}
