# Current Plan — UI fixes (heroes + tap targets)

Status: COMPLETE (verified). User approved "fix" after UI advice. Implementation delegated to @Software Engineer (general agent) — Coordinator edit permission restricted to docs/** + .opencode/state/**.

## Tasks
1. **PageHero rollout (static pages)** — DONE. `components/PageHero.tsx` created (client component, photo + scrim + white text), `photo` exported from `lib/data.ts`, `.ph-img` CSS appended, 10 static pages swapped. Verified: tsc 0, all 10 pages 200 with `.ph-img`/`.ph-photo`/`.ph-scrim`, 1 H1, white h1, 0 console errors.
2. **PageHero rollout (custom heroes)** — DONE. NewsIndex hero swapped (PageHero made client component), clubs/[id] hero swapped with badges in children. Verified: /news, /clubs/coding (1 badge), /clubs/robotics (2 badges) all pass. news/[slug] keeps 16:9 article-figure as hero image (documented decision).
3. **Tap-target pass** — DONE. `.hs-arrow` 44px, `.bs-toggle` 44px, `.filters .chip` 40px, `.linklike` 44px (12px padding + negative margins), `.btn-sm` 44px, `.toc a` +8px padding, `.crumb-nav a`/`.crumbs a`/`.page-hero .eyebrow a` 36px. Verified at 380x740.
4. **Verify** — DONE. tsc 0 errors; verify_forms.py 28/28 PASS 0 console errors; contrast-check.cjs ALL CHECKS PASSED; hero sweep 13/13 pages.
5. **Media wiring + logo loader** — PENDING user renames (media.assets slot names) / separate approval.

## Decisions
- news/[slug]: article-figure (16:9, priority) already serves as the hero image; header stays flat.
- All PageHero images decorative → alt="" + aria-hidden.
- Hero images: `photo(id, 1600)` or `visitPhoto` per page.
- Subagent model "Software Engineer" misconfigured in env → used `general` agent for implementation.
