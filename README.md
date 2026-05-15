# Luna Bistro Restaurant Website

A premium fictional restaurant and cafe website concept built for a Fiverr portfolio. Luna Bistro presents a polished dining brand with a strong hero, seasonal menu, gallery, opening hours, location, testimonials, and reservation form UI.

## Features

- Modern responsive restaurant/cafe landing page
- Hero section with CTAs for menu and reservations
- About, featured menu, gallery, opening hours, location, reviews, contact/reservation, and footer sections
- Reusable React components and local image handling
- Styled fallback placeholders for missing future images
- SEO title and meta description
- Accessible headings, labels, links, buttons, and image alt text

## Tech Stack

- React
- Vite
- Tailwind CSS
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build is generated in `dist`.

## Reservation Email Setup

The reservation form sends requests to `shanehealy2005@gmail.com` through FormSubmit.

The first test submission may send a confirmation email. Confirm it once, then future reservation requests will be delivered to the inbox. The form uses a standard browser POST so it does not depend on client-side `fetch`.

## Cloudflare Pages

Use these deployment settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

## Portfolio Note

This is a fictional concept project created as a professional restaurant/cafe website example for a Fiverr portfolio.

## Images

Local images live in `public/images`. Existing repository images were copied there and renamed with clean public paths. If you add future images, place them in `public/images` and reference them as `/images/image-name.jpg`.
