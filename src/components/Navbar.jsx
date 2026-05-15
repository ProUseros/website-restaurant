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

  const navTone = isScrolled
    ? 'border-ink/10 bg-pearl/95 text-ink shadow-lift'
    : 'border-white/20 bg-ink/85 text-pearl shadow-soft'
  const brandMarkTone = isScrolled
    ? 'border-copper/40 bg-ink text-gold'
    : 'border-gold/50 bg-pearl text-ink'
  const brandMetaTone = isScrolled ? 'text-ink/60' : 'text-pearl/70'
  const linkTone = isScrolled ? 'text-ink/70 hover:text-copper' : 'text-pearl/80 hover:text-gold'
  const actionTone = isScrolled
    ? 'border-copper bg-copper text-white hover:bg-ink'
    : 'border-gold/70 bg-gold text-ink hover:bg-pearl'
  const menuButtonTone = isScrolled ? 'border-ink/15 text-ink' : 'border-white/20 text-pearl'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-md border px-4 py-3 backdrop-blur-xl transition duration-300 md:px-6 ${navTone}`}
      >
        <a href="#home" className="flex items-center gap-3" onClick={closeMenu}>
          <span className={`grid h-10 w-10 place-items-center rounded-sm border text-base font-bold ${brandMarkTone}`}>
            LB
          </span>
          <span>
            <span className="block font-display text-xl leading-none">Luna Bistro</span>
            <span className={`block text-xs ${brandMetaTone}`}>Cafe & Supper Club</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={`text-sm font-medium transition ${linkTone}`}>
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#reservation"
          className={`hidden items-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition md:flex ${actionTone}`}
        >
          <CalendarCheck size={17} aria-hidden="true" />
          Book a Table
        </a>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-sm border transition lg:hidden ${menuButtonTone}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="mx-auto mt-2 max-w-7xl border border-ink/10 bg-pearl p-3 shadow-lift lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-sm font-medium text-ink transition hover:bg-shell"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  )
}
