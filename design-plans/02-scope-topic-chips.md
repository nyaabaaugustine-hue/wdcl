# Resolve the `.chip` class collision between news filter chips and contact topic chips

Written against: d068af3

## Evidence chain

- Surface: Homepage contact section (`components/Visit.tsx:219`), Join/Volunteer/Visit dialogs (`components/DialogHost.tsx:185`), and the news index filter bar (`components/NewsIndex.tsx:125–150`)
- Problem: Two different components share the class `.chip` and their CSS rules leak into each other:
  1. Topic chips (`<label class="chip">` wrapping `<input>` + `<span>`) inherit the news-filter base `.chip` box — `padding:7px 14px; border:1px solid hsl(var(--border)); background:hsl(var(--card))` (`app/globals.css:149`) — *around* the inner span's own pill (`border:1px solid hsl(var(--input)); padding:0 14px; min-height:34px` at `:948`). Result: a double pill outline on the homepage contact form and in every dialog.
  2. The news count badge `<span class="chip-n">` (`NewsIndex.tsx:130`) is matched by the bare descendant selector `.chip span` (`:948`) and renders as a bordered 34px-tall pill, contradicting its own definition `.chip-n{font-size:11px;…;opacity:.7}` (`:152`).
- Design evidence: `.chip` at `:149–153` is a complete button-chip primitive (hover, `.on` active state, `.chip-n` count); the "Visit section upgrade" block at `:946–951` restyles `.chip` as a radio-pill *label* whose visible pill is the inner `span`. Both cannot hold for one class name; each block contradicts the other on the same property set (border, padding, background) for the affected consumers.
- Owner: `app/globals.css` — the Visit-upgrade block (`:943–951`) is the later, narrower-intent owner and must be scoped
- Scope and affected surfaces: `app/globals.css` lines 946–951 only. Consumers: `components/Visit.tsx` (homepage + `/contact` reuse), `components/DialogHost.tsx` (all routes), `components/NewsIndex.tsx` (`/news`)
- Uncertainty: None. Both topic-chip consumers already wrap their chips in `.topic-chips` (`Visit.tsx:217`, `DialogHost.tsx:183`), so the container scope exists and requires no markup change.

## Design decision

Scope every rule in the Visit-upgrade chip block under the existing `.topic-chips` container, and neutralize the inherited base-chip box on the label (`padding:0; border:0; background:none`). The visible pill becomes solely the inner `span`, as `:948` intends, eliminating the double border; `.chip-n` on `/news` stops matching `.chip span` and renders per its own `:152` definition. The base `.chip` button primitive (`:149–153`) is untouched, so news filter chips keep their identity, hover, and `.on` states. `.topic-chips .chip` (0,2,0) outranks `.chip` (0,1,0), so scoping is order-independent. Text color behavior is preserved: the label keeps inheriting `color:hsl(var(--muted-foreground))` and the hover color from the base rule, which the span inherits.

## Reuse

- `.topic-chips` container class — already rendered by both topic-chip consumers (`components/Visit.tsx:217`, `components/DialogHost.tsx:183`)
- Base `.chip` button primitive (`app/globals.css:149–153`) — Exemplar: `components/NewsIndex.tsx:125` filter chips
- No new primitives, tokens, or components.

## Changes

1. `app/globals.css:946`
   - Change: `.chip{position:relative;display:inline-flex}` → `.topic-chips .chip{position:relative;display:inline-flex;padding:0;border:0;background:none}`
   - Preserve: `position:relative` (anchors the visually hidden `input` at `inset:0`) and `display:inline-flex`
   - Verify: Topic chips in the homepage contact form show exactly one pill border (the span's)
2. `app/globals.css:947–951`
   - Change: prefix each selector with `.topic-chips `:
     - `.chip input` → `.topic-chips .chip input`
     - `.chip span` → `.topic-chips .chip span`
     - `.chip:hover span` → `.topic-chips .chip:hover span`
     - `.chip input:checked+span` → `.topic-chips .chip input:checked+span`
     - `.chip input:focus-visible+span` → `.topic-chips .chip input:focus-visible+span`
   - Preserve: every declaration in those rules unchanged (pill geometry, checked gold tint `hsl(var(--brand)/.13)`/`--brand-ink`, focus ring)
   - Verify: On `/news`, filter-chip count badges render as subtle 11px text (`.chip-n`), not bordered pills; topic-chip selection and keyboard focus still show the gold checked state and ring

## Scope

- Inherit: `Visit.tsx` topic radios (homepage, `/contact`), `DialogHost.tsx` topic radios (Join/Volunteer/Visit dialogs on all routes)
- Verify: `NewsIndex.tsx` filter chips (base `.chip`, `.chip.on`, `.chip-clear`, `.chip-n`) — must be visually unchanged apart from the `.chip-n` fix; dark mode (same tokens re-pointed)
- Exclude: Base `.chip` rules at `:149–153`; all markup (no `.tsx` changes); `.topic-field`/`.topic-chips` layout rules at `:943–945`

## Validation

- Product: Open the homepage contact form — each topic chip shows a single pill outline; selecting one tints it gold; the same holds inside the Join/Volunteer/Visit dialogs
- Interface: `/news` filter bar at desktop and mobile widths — chips keep their solid `.on` state and the count sits inline as small dim text; light and dark themes; keyboard tab through topic chips shows the focus ring on the span
- System: After the change, `grep -n "^\.chip\|[^-]\.chip[ {:]" app/globals.css` matches only the `:149–153` primitive and its `.chip-n` — no unscoped topic-chip rules remain, and no parallel chip pattern is introduced
- Repository: `npm run build` → succeeds; `node contrast-check.cjs` → `ALL CHECKS PASSED` ("chip resting text" rows unaffected)

## Stop conditions

- Stop if any topic-chip consumer renders `label.chip` outside a `.topic-chips` container (would leave it unstyled) — current audit found none; re-grep `className="chip"` before editing.
- Stop if `.chip span` styling was meanwhile intended for news chips too (no evidence; `.chip-n` contradicts it).

## Design documentation

- After acceptance and validation: none required. Optionally note in `README.md` structure section that `.chip` is the filter-chip primitive and topic radios are scoped under `.topic-chips` — only if the maintainer accepts doc changes.
