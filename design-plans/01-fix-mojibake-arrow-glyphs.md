# Fix garbled arrow glyphs in header submenus and footer external links

Written against: d068af3

## Evidence chain

- Surface: Every route (shared chrome) — desktop nav dropdowns (`components/Header.tsx:140`, `.submenu`) and footer external links (`components/Footer.tsx:66`, `a[target="_blank"]`)
- Problem: The rendered arrow glyphs are mojibake. Submenu links show `â†'` instead of `→` on hover; footer external links show ` â†—` instead of ` ↗`. Byte-level proof: `app/globals.css:339` contains `303 242 342 200 240 342 200 231` (double-encoded U+2192) and `:487` contains `303 242 342 200 240 342 200 224` (double-encoded U+2197).
- Design evidence: The same file already encodes the identical external-link arrow correctly as a CSS escape — `app/globals.css:569`: `.source-box a[target="_blank"]::after{content:" \2197";…}`. The intended glyphs are unambiguous: `→` (submenu hover arrow) and `↗` (external-link marker).
- Owner: `app/globals.css` (single stylesheet imported by `app/layout.tsx` for all routes)
- Scope and affected surfaces: `app/globals.css` lines 339 and 487 (rendered); lines 7, 718–719 contain the same encoding damage inside comments (not rendered, normalized in the same pass to prevent future copy-paste propagation)
- Uncertainty: None. The mojibake byte sequences decode deterministically to `→` and `↗`, and line 569 establishes the escaped-literal convention.

## Design decision

Replace the two double-encoded `content` string literals with ASCII CSS escape sequences (`"\2192"` and `" \2197"`), matching the existing exemplar at line 569. Escapes are encoding-proof: they render identically regardless of how the file is saved or read, which is the root cause here. The damaged comment bytes are restored to their intended characters (`·` and `—`) so the file is uniformly valid UTF-8.

## Reuse

- `\2197` escape convention — Exemplar: `app/globals.css:569` (`.source-box a[target="_blank"]::after`)
- No new primitives, tokens, or components.

## Changes

1. `app/globals.css:339` (`.submenu a::after`)
   - Change: `content:"â†'"` → `content:"\2192"`
   - Preserve: `font-size:13px`, `color:hsl(var(--brand-ink))`, `opacity:0`, transition, and the `:hover::after{opacity:1}` reveal at line 341
   - Verify: Hovering any desktop nav dropdown item (viewport ≥1081px) shows a gold `→` after the label
2. `app/globals.css:487` (`footer a[target="_blank"]::after`)
   - Change: `content:" â†—"` → `content:" \2197"` (keep the leading space inside the string)
   - Preserve: `font-size:11px`, `opacity:.75`
   - Verify: The footer Facebook link shows a small ` ↗` suffix
3. `app/globals.css:7`, `:718–719` (comments only)
   - Change: Restore `Â·` → `·` (line 7) and `â€”` → `—` (lines 718–719)
   - Preserve: Comment wording exactly as-is
   - Verify: `grep -c 'â€\|Â·\|â†' app/globals.css` returns 0

## Scope

- Inherit: All routes (stylesheet is global via `app/layout.tsx`)
- Verify: `.source-box a[target="_blank"]::after` (line 569) must remain untouched — it is already correct
- Exclude: All `.tsx`/`.ts` sources (verified clean: `grep -rn "â€|Â·|â†" app components lib` matches nothing outside `globals.css`); no component, token, or markup changes

## Validation

- Product: Load any page; open a nav dropdown and inspect the footer — arrows render as `→` / `↗`, no mojibake anywhere
- Interface: Light and dark themes; desktop (>1080px, where `nav.main` is visible) for submenus; any viewport for footer
- System: Both arrows now use the same escape convention as line 569 — no parallel pattern remains
- Repository: `npm run build` → succeeds; `node contrast-check.cjs` → `ALL CHECKS PASSED` (unaffected, run as regression guard); `grep -c 'â€\|Â·\|â†' app/globals.css` → `0`

## Stop conditions

- Stop if the file on disk no longer contains the cited byte sequences at lines 339/487 (someone fixed or moved them) — re-audit before editing.

## Design documentation

- After acceptance and validation: none. No documented decision changes; the fix restores conformance to the existing convention.
