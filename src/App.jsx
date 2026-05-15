import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js'
import CalendarCheck from 'lucide-react/dist/esm/icons/calendar-check.js'
import Clock3 from 'lucide-react/dist/esm/icons/clock-3.js'
import Facebook from 'lucide-react/dist/esm/icons/facebook.js'
import Instagram from 'lucide-react/dist/esm/icons/instagram.js'
import Mail from 'lucide-react/dist/esm/icons/mail.js'
import MapPin from 'lucide-react/dist/esm/icons/map-pin.js'
import Phone from 'lucide-react/dist/esm/icons/phone.js'
import Send from 'lucide-react/dist/esm/icons/send.js'
import Star from 'lucide-react/dist/esm/icons/star.js'
import Utensils from 'lucide-react/dist/esm/icons/utensils.js'
import { useState } from 'react'
import Navbar from './components/Navbar'
import SectionHeading from './components/SectionHeading'
import SmartImage from './components/SmartImage'
import { featuredMenu, galleryItems, navLinks, openingHours, reviews } from './data'

const WEB3FORMS_ACCESS_KEY = 'a4615f98-73fb-43c2-9dba-20ba6e8c57cf'
const RESERVATION_EMAIL = 'shanehealy2005@gmail.com'
const RESERVATION_ENDPOINT = 'https://api.web3forms.com/submit'

function MenuCard({ item, index }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-ink/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="aspect-[4/3] overflow-hidden bg-ink">
        <SmartImage
          src={item.image}
          alt={item.alt}
          label={`Signature ${index + 1}`}
          className="transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-5">
          <h3 className="font-display text-2xl leading-tight text-ink">{item.name}</h3>
          <p className="shrink-0 text-lg font-bold text-copper">{item.price}</p>
        </div>
        <p className="mt-4 text-sm leading-7 text-ink/68">{item.description}</p>
      </div>
    </article>
  )
}

function PlaceholderMap() {
  return (
    <div className="map-panel relative min-h-[22rem] overflow-hidden rounded-lg border border-ink/10 bg-shell shadow-soft">
      <div className="absolute left-[12%] top-0 h-full w-5 rotate-12 bg-white/75" />
      <div className="absolute left-[45%] top-0 h-full w-4 -rotate-6 bg-white/65" />
      <div className="absolute left-0 top-[28%] h-5 w-full rotate-3 bg-white/70" />
      <div className="absolute left-0 top-[62%] h-4 w-full -rotate-2 bg-white/60" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,35,31,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(23,35,31,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center gap-3 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-lg bg-ink text-gold shadow-lift">
          <MapPin size={30} aria-hidden="true" />
        </span>
        <span className="rounded-md bg-pearl/95 px-4 py-2 text-sm font-semibold text-ink shadow-soft">
          Luna Bistro
        </span>
      </div>
    </div>
  )
}

function ReservationForm() {
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', 'New Luna Bistro reservation request')
    formData.append('from_name', 'Luna Bistro Website')

    setStatus('sending')
    setStatusMessage('')

    try {
      const response = await fetch(RESERVATION_ENDPOINT, {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send the reservation request.')
      }

      form.reset()
      setStatus('sent')
      setStatusMessage(`Thank you. Your reservation request has been emailed to ${RESERVATION_EMAIL}.`)
    } catch (error) {
      setStatus('error')
      setStatusMessage(error.message || 'Something went wrong. Please try again.')
    }
  }

  const isSending = status === 'sending'
  const statusTone =
    status === 'error'
      ? 'border-copper/30 bg-copper/10 text-copper'
      : 'border-moss/25 bg-moss/10 text-moss'

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="form-field">
          <span>Name</span>
          <input type="text" name="name" placeholder="Your name" required />
        </label>
        <label className="form-field">
          <span>Email</span>
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="form-field">
          <span>Date</span>
          <input type="date" name="date" required />
        </label>
        <label className="form-field">
          <span>Guests</span>
          <input type="number" name="guests" min="1" max="12" placeholder="2" required />
        </label>
      </div>
      <label className="form-field">
        <span>Message</span>
        <textarea name="message" rows="5" placeholder="Tell us about the occasion or timing." />
      </label>
      <button
        type="submit"
        disabled={isSending}
        className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-copper px-6 py-4 text-sm font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        <Send size={18} aria-hidden="true" />
        {isSending ? 'Sending Request...' : 'Send Reservation Request'}
      </button>
      {statusMessage ? (
        <p className={`rounded-md border px-4 py-3 text-sm font-medium ${statusTone}`}>{statusMessage}</p>
      ) : null}
    </form>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-pearl font-body text-ink">
      <Navbar />

      <main>
        <section id="home" className="relative isolate min-h-[92vh] overflow-hidden bg-ink">
          <SmartImage
            src="/images/hero-restaurant.avif"
            alt="Coffee and brunch table setting at Luna Bistro"
            priority
            className="absolute inset-0 -z-20"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/92 via-ink/68 to-moss/55" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-pearl to-transparent" />

          <div className="mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
            <div className="max-w-4xl text-pearl">
              <p className="mb-5 inline-flex rounded-md border border-gold/40 bg-ink/45 px-4 py-2 text-sm font-semibold text-gold backdrop-blur">
                Seasonal dining, specialty coffee, and moonlit suppers
              </p>
              <h1 className="font-display text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
                Luna Bistro brings cafe warmth to a polished evening table.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/82 sm:text-xl">
                Slow mornings, expressive plates, intimate interiors, and the kind of quiet hospitality
                that makes guests stay longer.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center gap-3 rounded-md bg-gold px-6 py-4 text-sm font-bold text-ink transition hover:bg-pearl"
                >
                  <Utensils size={18} aria-hidden="true" />
                  View Menu
                </a>
                <a
                  href="#reservation"
                  className="inline-flex items-center justify-center gap-3 rounded-md border border-pearl/55 bg-pearl/10 px-6 py-4 text-sm font-bold text-pearl backdrop-blur transition hover:bg-pearl hover:text-ink"
                >
                  <CalendarCheck size={18} aria-hidden="true" />
                  Book a Table
                </a>
              </div>
              <div className="mt-12 grid max-w-3xl gap-4 text-sm text-pearl/78 sm:grid-cols-3">
                <div className="border-l border-gold/55 pl-4">
                  <strong className="block text-xl text-pearl">07:30</strong>
                  Morning service starts
                </div>
                <div className="border-l border-gold/55 pl-4">
                  <strong className="block text-xl text-pearl">6 courses</strong>
                  Rotating dinner tasting
                </div>
                <div className="border-l border-gold/55 pl-4">
                  <strong className="block text-xl text-pearl">Local</strong>
                  Farmers and roasters
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-pearl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-lift">
                <SmartImage
                  src="/images/restaurant-interior.png"
                  alt="Warm interior dining room at Luna Bistro"
                  className="h-full w-full"
                />
              </div>
              <div className="absolute -bottom-6 right-5 max-w-[15rem] rounded-lg bg-ink p-5 text-pearl shadow-lift sm:right-8">
                <p className="font-display text-3xl">Cafe by day.</p>
                <p className="mt-1 text-sm text-pearl/74">Supper club by night.</p>
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Our Story" title="A neighborhood table with a moonlit point of view.">
                Luna Bistro was imagined as a place where the first espresso of the day and the last
                candlelit toast both feel equally considered. The menu balances familiar comfort with
                refined seasonal details, shaped by local produce, house-made pastries, and a dinner
                service that feels intimate without being formal.
              </SectionHeading>
              <div className="mt-9 grid gap-5 sm:grid-cols-3">
                {['Seasonal plates', 'Small-batch coffee', 'Private dinners'].map((item) => (
                  <div key={item} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                    <p className="text-sm font-bold text-ink">{item}</p>
                    <p className="mt-3 h-1 w-12 bg-copper" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="bg-linen-texture px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading eyebrow="Featured Menu" title="Seasonal plates with cafe soul.">
                A focused selection of brunch favorites, dinner plates, coffee rituals, and house-made
                sweets prepared with seasonal ingredients.
              </SectionHeading>
              <a
                href="#reservation"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-ink px-5 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-pearl"
              >
                Reserve tonight
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredMenu.map((item, index) => (
                <MenuCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-ink px-4 py-20 text-pearl sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-gold">Gallery</p>
              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                Warm light, close tables, and dishes that photograph beautifully.
              </h2>
            </div>
            <div className="mt-12 grid auto-rows-[16rem] gap-4 md:grid-cols-4">
              {galleryItems.map((item, index) => (
                <figure
                  key={`${item.label}-${index}`}
                  className={`group relative overflow-hidden rounded-lg border border-white/10 bg-pearl/8 ${
                    index === 0 || index === 1 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <SmartImage
                    src={item.image}
                    alt={item.alt}
                    label={item.label}
                    className="h-full w-full transition duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/88 to-transparent p-5 text-sm font-semibold text-pearl">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="hours" className="bg-pearl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading eyebrow="Opening Hours" title="Open for slow mornings and candlelit nights.">
              Luna Bistro shifts from espresso, pastry, and lunch into an intimate evening service on
              select nights each week.
            </SectionHeading>
            <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
              <div className="mb-6 flex items-center gap-3 text-copper">
                <Clock3 size={22} aria-hidden="true" />
                <p className="font-bold text-ink">Weekly Schedule</p>
              </div>
              <div className="divide-y divide-ink/10">
                {openingHours.map((item) => (
                  <div key={item.day} className="flex items-center justify-between gap-4 py-4">
                    <p className="font-semibold text-ink">{item.day}</p>
                    <p className="text-right text-sm text-ink/68">{item.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="bg-shell px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Location" title="Find us where the city slows down.">
                Tucked into a calm corner of the old district, Luna Bistro is easy to reach for breakfast
                meetings, weekend brunch, and intimate evening reservations.
              </SectionHeading>
              <div className="mt-8 space-y-5 text-ink/72">
                <p className="flex gap-3">
                  <MapPin className="mt-1 shrink-0 text-copper" size={20} aria-hidden="true" />
                  128 Crescent Lane, Old Town District, New York, NY 10012
                </p>
                <p className="flex gap-3">
                  <Phone className="mt-1 shrink-0 text-copper" size={20} aria-hidden="true" />
                  (555) 014-7820
                </p>
                <p className="flex gap-3">
                  <Mail className="mt-1 shrink-0 text-copper" size={20} aria-hidden="true" />
                  reservations@lunabistro.example
                </p>
              </div>
            </div>
            <PlaceholderMap />
          </div>
        </section>

        <section className="bg-pearl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Guest Notes" title="A few kind words from regulars." align="center">
              Guests come for the coffee, linger for the seasonal plates, and return for the feeling of
              being known by name.
            </SectionHeading>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {reviews.map((review) => (
                <article key={review.name} className="rounded-lg border border-ink/10 bg-white p-7 shadow-soft">
                  <div className="mb-5 flex gap-1 text-gold" aria-label="Five star review">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={17} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-base leading-8 text-ink/76">"{review.quote}"</blockquote>
                  <p className="mt-6 font-display text-2xl text-ink">{review.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reservation" className="bg-ink px-4 py-20 text-pearl sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-gold">Reservations</p>
              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                Save a table for coffee, dinner, or something in between.
              </h2>
              <p className="mt-5 text-base leading-8 text-pearl/72">
                Share your preferred date, party size, and any special notes. Our host team will confirm
                availability as soon as possible.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-pearl p-6 text-ink shadow-lift sm:p-8">
              <ReservationForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#101815] px-4 py-14 text-pearl sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <p className="font-display text-3xl">Luna Bistro</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-pearl/65">
              Specialty coffee, seasonal plates, and candlelit dinners in the heart of the old district.
            </p>
          </div>
          <div>
            <p className="font-bold text-gold">Navigate</p>
            <div className="mt-4 grid gap-3 text-sm">
              {navLinks.slice(0, 5).map((link) => (
                <a key={link.href} href={link.href} className="text-pearl/68 transition hover:text-gold">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-gold">Social</p>
            <div className="mt-4 flex gap-3">
              <a
                href="#home"
                aria-label="Instagram placeholder"
                className="grid h-11 w-11 place-items-center rounded-md border border-white/12 text-pearl/74 transition hover:border-gold hover:text-gold"
              >
                <Instagram size={19} aria-hidden="true" />
              </a>
              <a
                href="#home"
                aria-label="Facebook placeholder"
                className="grid h-11 w-11 place-items-center rounded-md border border-white/12 text-pearl/74 transition hover:border-gold hover:text-gold"
              >
                <Facebook size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <p className="font-bold text-gold">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-pearl/68">
              <p>128 Crescent Lane</p>
              <p>(555) 014-7820</p>
              <p>reservations@lunabistro.example</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-pearl/50">
          Copyright 2026 Luna Bistro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
