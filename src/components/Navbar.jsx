import { useState } from 'react'
import { CalendarCheck, Menu, X } from 'lucide-react'
import { navLinks } from '../data'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between border border-white/20 bg-ink/88 px-4 py-3 text-pearl shadow-soft backdrop-blur md:px-6"
      >
        <a href="#home" className="flex items-center gap-3" onClick={closeMenu}>
          <span className="grid h-10 w-10 place-items-center border border-gold/50 bg-pearl text-base font-bold text-ink">
            LB
          </span>
          <span>
            <span className="block font-display text-xl leading-none">Luna Bistro</span>
            <span className="block text-xs text-pearl/70">Cafe & Supper Club</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-pearl/78 transition hover:text-gold">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#reservation"
          className="hidden items-center gap-2 border border-gold/70 bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-pearl md:flex"
        >
          <CalendarCheck size={17} aria-hidden="true" />
          Book a Table
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-pearl lg:hidden"
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
