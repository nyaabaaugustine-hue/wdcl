# Wiamoase Diaspora Public Library: website

Next.js (App Router, TypeScript) version of the library homepage, in the shadcn/ui zinc style with an Ashanti gold accent.

## Run it

```powershell
cd "C:\Users\TGNE\Desktop\library web"
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node.js 18.18 or newer.

## Structure

```
app/
  layout.tsx      page metadata, Inter font, theme script (no flash)
  page.tsx        composes the sections
  globals.css     all styles (shadcn zinc tokens, light and dark)
components/
  Header.tsx      sticky nav, mobile menu, dark mode toggle   (client)
  Hero.tsx        headline, buttons, stat strip
  Overview.tsx    "I · Overview" and the at-a-glance card
  Facilities.tsx  library, robotics & ICT centre, conference centre
  Clubs.tsx       Coding / Robotics / Reading tabs and schedule table  (client)
  Story.tsx       timeline
  Support.tsx     donate / volunteer / partner call to action
  Visit.tsx       contact details and message form                (client)
  Footer.tsx
  Icon.tsx        inline SVG icons
lib/data.ts       all content: edit text, clubs, times and facts here
```

## Content to confirm before publishing

- Club days, times, venues and programmes in `lib/data.ts` are proposals, not published by the library.
- Opening hours, phone and email are marked "To be confirmed / To be added" in `components/Visit.tsx`.
- Forms (contact, dialogs, newsletter) post to `app/api/contact/route.ts`, which emails the library team through Resend. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. Until they are set, visitors see a friendly "sending isn't switched on yet" message and nothing is sent.
- Verify the ~US$500,000 cost and the April 2022 inauguration date with the library.
