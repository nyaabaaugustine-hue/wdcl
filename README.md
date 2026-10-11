# Wiamoase Diaspora Public Library: website

Next.js (App Router, TypeScript) website for the Wiamoase Diaspora Public Library in Agona Wiamoase, Ghana. A warm editorial design in green, gold and clay, with light and dark themes.

## Run it

```powershell
cd library-web
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run this to catch errors before deploying)
npm start        # serve the production build
```

Requires Node.js 18.18 or newer.

## Structure

```
app/
  layout.tsx          metadata, fonts, theme script, loads the two stylesheets below
  globals.css         base design: tokens (light and dark), components, layout
  redesign.css        warm editorial layer and animations on top of globals.css
                      (undo it by deleting its import line in layout.tsx)
  page.tsx            home page, composed from sections
  about/ books/ clubs/ contact/ donate/ faq/ gallery/ hire/ join/ news/
  partners/ privacy/ programs/ sponsors/ visit/ volunteer/ accessibility/
  api/contact/route.ts   one endpoint that emails every form (see below)
components/
  Header, Footer, FloatingSocial, DialogHost   site chrome and the Join / Volunteer / Visit dialogs
  Hero, HeroBackdrop, StatsBand, OurStory, FacilitiesCards, ClubsCards,
  DigitalLibrary, HappeningNow, Support, Visit   home page sections
  AuthorityNetwork    Ghana Library Authority facts and services (About page)
  PageHero, Photo, Icon, Reveal, NewsletterForm, ...   shared pieces
lib/
  data.ts             main content: nav, clubs, facilities, facts, topics
  news.ts voices.ts media.ts   news stories, sample voices, photo helpers
  digitalLibrary.ts   Ghana Library app details (links, steps, features)
  authority.ts        Ghana Library Authority facts and service list
  submitForm.ts       browser helper that posts a form to /api/contact
```

Some components (BookStream, HeroSlider, Testimonials, GalleryStrip, PageHero2, Clubs, Facilities, Overview, Story) are older or currently hidden versions kept so the homepage can be switched back (see the undo switch at the top of `app/page.tsx`).

## Forms

Every form (contact, the three dialogs, the footer newsletter) posts to `app/api/contact/route.ts`, which checks the details, blocks bots and emails the library team through [Resend](https://resend.com).

1. Copy `.env.example` to `.env.local`.
2. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (a sender on a domain verified in Resend).
3. Restart `npm run dev` and submit each form once to confirm the email arrives.

Until those are set, visitors see a friendly "sending isn't switched on yet" message and nothing is sent.

## Digital library

`/books` and the home page section point readers to the free Ghana Library app run by the Ghana Library Authority. The Google Play button is a search link; replace `playStoreUrl` in `lib/digitalLibrary.ts` with the direct listing once confirmed.

## Content to confirm before publishing

- Club days, times, venues and programmes in `lib/data.ts` are proposals, not published by the library.
- Opening hours, phone and email are marked "Coming soon" in `components/Visit.tsx`.
- Testimonials in `lib/voices.ts` are samples. Replace them with real voices.
- The Ghana Library Authority figures in `lib/authority.ts` (such as the number of libraries) can change. Check them against the Authority's website.
- Verify the ~US$500,000 cost and the April 2022 inauguration date with the library.
- Many photos still have generic captions and alt text. Describe them properly.
