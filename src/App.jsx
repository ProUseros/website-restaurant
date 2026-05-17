import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js'
import CalendarCheck from 'lucide-react/dist/esm/icons/calendar-check.js'
import Clock3 from 'lucide-react/dist/esm/icons/clock-3.js'
import Coffee from 'lucide-react/dist/esm/icons/coffee.js'
import Facebook from 'lucide-react/dist/esm/icons/facebook.js'
import Instagram from 'lucide-react/dist/esm/icons/instagram.js'
import Leaf from 'lucide-react/dist/esm/icons/leaf.js'
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

const heroStats = [
  {
    icon: Clock3,
    value: '07:30',
    label: 'Morning service starts',
  },
  {
    icon: Utensils,
    value: '6 courses',
    label: 'Rotating dinner tasting',
  },
  {
    icon: Leaf,
    value: 'Local',
    label: 'Farmers and roasters',
  },
]

function ButtonLink({ href, children, variant = 'primary' }) {
  const styles =
    variant === 'primary'
      ? 'bg-olive text-pearl hover:bg-moss'
      : 'border border-olive/35 bg-linen text-olive hover:border-olive hover:bg-cream'

  return (
    <a
      href={href}
      className={`inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm px-5 py-3 text-sm font-semibold transition sm:w-auto ${styles}`}
    >
      {children}
    </a>
  )
}

function HeroInfoStrip() {
  return (
    <div className="border-y border-olive/10 bg-linen">
      <div className="mx-auto grid max-w-7xl gap-0 px-4 py-5 sm:px-6 md:grid-cols-3 lg:px-8">
        {heroStats.map((item, index) => {
          const Icon = item.icon

          return (
            <div
              key={item.value}
              className={`flex items-center gap-4 py-4 md:px-8 md:py-6 ${
                index === 0 ? 'md:pl-0' : 'border-t border-olive/10 md:border-l md:border-t-0'
              }`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-olive/25 text-olive">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span>
                <strong className="block text-lg text-olive">{item.value}</strong>
                <span className="text-sm text-smoke">{item.label}</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MenuCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-sm border border-olive/10 bg-linen transition duration-300 hover:border-olive/20 hover:shadow-soft">
      <div className="aspect-[4/3] overflow-hidden bg-cream">
        <SmartImage
          src={item.image}
          alt={item.alt}
          label={item.name}
          className="transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight text-ink">{item.name}</h3>
          <p className="shrink-0 text-base font-semibold text-olive">{item.price}</p>
        </div>
        <p className="mt-3 text-sm leading-7 text-smoke">{item.description}</p>
      </div>
    </article>
  )
}

function PlaceholderMap() {
  return (
    <div className="map-panel relative min-h-[20rem] overflow-hidden rounded-sm border border-olive/10 bg-cream sm:min-h-[24rem]">
      <div className="absolute left-[12%] top-0 h-full w-5 rotate-12 bg-linen/80" />
      <div className="absolute left-[45%] top-0 h-full w-4 -rotate-6 bg-linen/70" />
      <div className="absolute left-0 top-[28%] h-5 w-full rotate-3 bg-linen/75" />
      <div className="absolute left-0 top-[62%] h-4 w-full -rotate-2 bg-linen/65" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(63,75,43,0.055)_1px,transparent_1px),linear-gradient(0deg,rgba(63,75,43,0.055)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center gap-3 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-olive text-pearl shadow-soft">
          <MapPin size={30} aria-hidden="true" />
        </span>
        <span className="rounded-sm border border-olive/10 bg-linen/95 px-4 py-2 text-sm font-semibold text-olive shadow-soft">
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
      ? 'border-clay/25 bg-clay/10 text-clay'
      : 'border-olive/20 bg-olive/8 text-olive'

  return (
    <form className="grid gap-4 sm:gap-5" onSubmit={handleSubmit}>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <label className="form-field">
          <span>Name</span>
          <input type="text" name="name" placeholder="Your name" required />
        </label>
        <label className="form-field">
          <span>Email</span>
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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
        className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm bg-olive px-5 py-3 text-sm font-semibold text-pearl transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-6"
      >
        <Send size={18} aria-hidden="true" />
        {isSending ? 'Sending Request...' : 'Send Reservation Request'}
      </button>
      {statusMessage ? (
        <p className={`rounded-sm border px-4 py-3 text-sm font-medium leading-6 ${statusTone}`}>{statusMessage}</p>
      ) : null}
    </form>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-pearl font-body text-ink">
      <Navbar />

      <main>
        <section id="home" className="bg-pearl">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-12">
            <div className="order-1 max-w-2xl lg:order-none">
              <p className="text-xs font-semibold uppercase leading-6 tracking-[0.28em] text-olive/82">
                Seasonal dining, specialty coffee, and moonlit suppers
              </p>
              <div className="mt-8 h-px w-16 bg-tan" aria-hidden="true" />
              <h1 className="mt-8 font-display text-5xl leading-[1.04] text-ink sm:text-6xl xl:text-7xl">
                Warm plates.
                <br />
                Polished evenings.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-smoke sm:text-lg">
                Slow mornings, expressive plates, intimate interiors, and the kind of quiet hospitality
                that makes guests stay longer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#menu">
                  <Utensils size={18} aria-hidden="true" />
                  View Menu
                </ButtonLink>
                <ButtonLink href="#reservation" variant="secondary">
                  <CalendarCheck size={18} aria-hidden="true" />
                  Book a Table
                </ButtonLink>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-smoke">
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} className="text-olive" aria-hidden="true" />
                  Open daily
                </span>
                <span className="inline-flex items-center gap-2">
                  <Leaf size={16} className="text-olive" aria-hidden="true" />
                  Seasonal menu
                </span>
                <span className="inline-flex items-center gap-2">
                  <Coffee size={16} className="text-olive" aria-hidden="true" />
                  Cafe & supper club
                </span>
              </div>
            </div>

            <div className="order-2 overflow-hidden rounded-sm border border-olive/10 bg-cream shadow-soft lg:h-[34rem] xl:h-[36rem]">
              <SmartImage
                src="/images/hero-restaurant.avif"
                alt="Coffee and brunch table setting at Luna Bistro"
                priority
                className="aspect-[4/3] h-full min-h-[19rem] sm:min-h-[25rem] lg:aspect-auto lg:min-h-0"
              />
            </div>
          </div>
          <HeroInfoStrip />
        </section>

        <section id="about" className="bg-linen px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm border border-olive/10 bg-cream">
                <SmartImage
                  src="/images/restaurant-interior.png"
                  alt="Warm interior dining room at Luna Bistro"
                  className="h-full w-full"
                />
              </div>
              <div className="absolute -bottom-6 right-4 max-w-[13rem] rounded-sm border border-olive/10 bg-linen p-4 text-olive shadow-soft sm:right-8 sm:max-w-[15rem] sm:p-5">
                <p className="font-display text-2xl sm:text-3xl">Cafe by day.</p>
                <p className="mt-1 text-sm text-smoke">Supper club by night.</p>
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Our Story" title="A neighborhood table with a moonlit point of view.">
                Luna Bistro was imagined as a place where the first espresso of the day and the last
                candlelit toast both feel equally considered. The menu balances familiar comfort with
                refined seasonal details, shaped by local produce, house-made pastries, and a dinner
                service that feels intimate without being formal.
              </SectionHeading>
              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                {['Seasonal plates', 'Small-batch coffee', 'Private dinners'].map((item) => (
                  <div key={item} className="rounded-sm border border-olive/10 bg-pearl p-5">
                    <p className="text-sm font-semibold text-olive">{item}</p>
                    <p className="mt-3 h-px w-12 bg-tan" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading eyebrow="Featured Menu" title="Seasonal plates with cafe soul.">
                A focused selection of brunch favorites, dinner plates, coffee rituals, and house-made
                sweets prepared with seasonal ingredients.
              </SectionHeading>
              <a
                href="#reservation"
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm border border-olive/30 px-5 py-3 text-sm font-semibold text-olive transition hover:border-olive hover:bg-linen sm:w-auto"
              >
                Reserve tonight
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 xl:grid-cols-3">
              {featuredMenu.map((item) => (
                <MenuCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-pearl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Gallery" title="Warm light, close tables, and dishes that photograph beautifully.">
              A glimpse of the room, the coffee counter, and the plates that shape service from morning
              through evening.
            </SectionHeading>
            <div className="mt-10 grid auto-rows-[13rem] gap-3 sm:mt-12 sm:auto-rows-[16rem] sm:gap-4 md:grid-cols-4">
              {galleryItems.map((item, index) => (
                <figure
                  key={`${item.label}-${index}`}
                  className={`group relative overflow-hidden rounded-sm border border-olive/10 bg-cream ${
                    index === 0 || index === 1 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <SmartImage
                    src={item.image}
                    alt={item.alt}
                    label={item.label}
                    className="h-full w-full transition duration-500 group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/65 to-transparent p-5 text-sm font-semibold text-pearl">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="hours" className="bg-linen px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading eyebrow="Opening Hours" title="Open for slow mornings and candlelit nights.">
              Luna Bistro shifts from espresso, pastry, and lunch into an intimate evening service on
              select nights each week.
            </SectionHeading>
            <div className="rounded-sm border border-olive/10 bg-pearl p-5 sm:p-8">
              <div className="mb-6 flex items-center gap-3 text-olive">
                <Clock3 size={22} aria-hidden="true" />
                <p className="font-semibold text-ink">Weekly Schedule</p>
              </div>
              <div className="divide-y divide-olive/10">
                {openingHours.map((item) => (
                  <div key={item.day} className="flex items-center justify-between gap-4 py-3.5 sm:py-4">
                    <p className="font-semibold text-ink">{item.day}</p>
                    <p className="text-right text-sm text-smoke">{item.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Location" title="Find us where the city slows down.">
                Tucked into a calm corner of the old district, Luna Bistro is easy to reach for breakfast
                meetings, weekend brunch, and intimate evening reservations.
              </SectionHeading>
              <div className="mt-8 space-y-5 text-smoke">
                <p className="flex gap-3">
                  <MapPin className="mt-1 shrink-0 text-olive" size={20} aria-hidden="true" />
                  128 Crescent Lane, Old Town District, New York, NY 10012
                </p>
                <p className="flex gap-3">
                  <Phone className="mt-1 shrink-0 text-olive" size={20} aria-hidden="true" />
                  (555) 014-7820
                </p>
                <p className="flex gap-3">
                  <Mail className="mt-1 shrink-0 text-olive" size={20} aria-hidden="true" />
                  reservations@lunabistro.example
                </p>
              </div>
            </div>
            <PlaceholderMap />
          </div>
        </section>

        <section className="bg-pearl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Guest Notes" title="A few kind words from regulars." align="center">
              Guests come for the coffee, linger for the seasonal plates, and return for the feeling of
              being known by name.
            </SectionHeading>
            <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
              {reviews.map((review) => (
                <article key={review.name} className="rounded-sm border border-olive/10 bg-linen p-6 sm:p-7">
                  <div className="mb-5 flex gap-1 text-tan" aria-label="Five star review">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={17} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-base leading-8 text-smoke">"{review.quote}"</blockquote>
                  <p className="mt-6 font-display text-2xl text-ink">{review.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reservation" className="bg-linen px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Reservations" title="Save a table for coffee, dinner, or something in between.">
                Share your preferred date, party size, and any special notes. Our host team will confirm
                availability as soon as possible.
              </SectionHeading>
            </div>
            <div className="rounded-sm border border-olive/10 bg-pearl p-4 shadow-soft sm:p-8">
              <ReservationForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-olive/10 bg-olive px-4 py-12 text-pearl sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:gap-10">
          <div>
            <p className="font-display text-3xl">Luna Bistro</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-pearl/72">
              Specialty coffee, seasonal plates, and candlelit dinners in the heart of the old district.
            </p>
          </div>
          <div>
            <p className="font-semibold text-tan">Navigate</p>
            <div className="mt-4 grid gap-3 text-sm">
              {navLinks.slice(0, 5).map((link) => (
                <a key={link.href} href={link.href} className="text-pearl/72 transition hover:text-tan">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-tan">Social</p>
            <div className="mt-4 flex gap-3">
              <a
                href="#home"
                aria-label="Instagram placeholder"
                className="grid h-11 w-11 place-items-center rounded-sm border border-pearl/15 text-pearl/74 transition hover:border-tan hover:text-tan"
              >
                <Instagram size={19} aria-hidden="true" />
              </a>
              <a
                href="#home"
                aria-label="Facebook placeholder"
                className="grid h-11 w-11 place-items-center rounded-sm border border-pearl/15 text-pearl/74 transition hover:border-tan hover:text-tan"
              >
                <Facebook size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-tan">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-pearl/72">
              <p>128 Crescent Lane</p>
              <p>(555) 014-7820</p>
              <p>reservations@lunabistro.example</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-pearl/10 pt-6 text-sm text-pearl/55">
          Copyright 2026 Luna Bistro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
