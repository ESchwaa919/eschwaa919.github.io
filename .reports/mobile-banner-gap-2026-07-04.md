# Mobile banner gap — fix report (2026-07-04)

## Summary

On mobile, a dead ~44px band appeared at the top of the page once the course
banner faded on scroll (most visible on `/process/sdlc`, where the "on this
page" section nav floats detached below the main nav). Root cause: the banner
already fades/dismisses, but the space it reserved was hardcoded and never
collapsed. Fixed by driving the reserved height from a shared `--chrome-h` CSS
variable that the banner updates in step with its own visibility.

## Root cause

The top chrome is two stacked fixed elements:

- `Navigation` — `fixed top-0`, height `h-20` (80px)
- `CourseBanner` — `fixed top-20` (starts at 80px), ~44px tall, `z-40`

`origin/main` already fades/slides the banner away on scroll
(`scrolledPast = window.scrollY > 120`, `opacity-0 -translate-y-full`) and lets
the user dismiss it. But the space it occupied was reserved with hardcoded
constants that never reacted to that state:

- `App.tsx` — `<main className="pt-[124px]">` (80 nav + 44 banner)
- `SdlcSectionNav.tsx` — `fixed top-[124px]`

So once the banner was hidden or dismissed, nothing filled the 80→124px slot:

- `/process/sdlc`: the section nav ("Lifecycle | The Team | …") sat pinned at
  124px while the main nav ended at 80px, leaving a 44px strip of page content
  bleeding through between the two fixed bars — the reported dead band.
- Any page, banner dismissed: `main` still reserved 124px under an 80px nav,
  leaving a 44px empty band at the very top.

## Fix (surgical, 4 files)

Introduce a single shared source of truth, `--chrome-h`:

- `src/index.css` — `:root { --chrome-h: 124px }` (default = nav + banner).
- `src/components/CourseBanner.tsx` — one effect sets `--chrome-h` to `80px`
  when the banner is hidden (`!isVisible || scrolledPast`) or `124px` when
  present. Runs on `[isVisible, scrolledPast]` — a couple of writes per session,
  not per scroll event.
- `src/App.tsx` — `pt-[var(--chrome-h)]` + `transition-[padding] duration-300`.
- `src/components/SdlcSectionNav.tsx` — `top-[var(--chrome-h)]` +
  `transition-[opacity,top]`.

The `:root` default means SSR/SSG-prerendered HTML and the first paint before
hydration resolve to 124px (banner-present), so there is no layout shift on
load. Reduced motion is honoured by the existing global rule in `index.css`
(`@media (prefers-reduced-motion: reduce)` snaps all transitions to ~0ms).

No changes to nav height, banner height/copy, thresholds, or the section nav's
scrollspy/jump logic. `HEADER_OFFSET` (jump-target offset) left untouched.

## Verified

- **Behaviour, genuine mobile emulation (Puppeteer `headless: shell`, viewport
  390×844 and 360×844 @2x, `isMobile`), against the production `npm run build`
  + `vite preview` (SSG-prerendered) build.** Measured `--chrome-h`, nav bottom,
  banner opacity, section-nav top, and `main` padding-top at each state:

  | State | `--chrome-h` | banner | section-nav top | main pad-top | Result |
  |---|---|---|---|---|---|
  | Load (top) | 124px | opacity 1, at 80 | 124 (hidden) | 124px | banner present, content clears chrome, no overlap |
  | Scrolled 600 | 80px | opacity 0 (slid up) | **80** (flush, visible) | 80px | **gap closed** — section nav flush under nav |
  | Scroll back to top | 124px | opacity 1 | 124 | 124px | banner returns cleanly |
  | Dismissed (X) at top | 80px | unmounted | 80 | 80px | no dead band; content flush at 80 |

  Identical at 390 and 360. `scrollY` stays 600 through the collapse (content
  slides up smoothly — the intended "content moves up to close the gap"), no
  scroll re-anchoring jump observed.
- **No overlap on load:** first content element's document top == padding-top
  (124px) at the top on `/`, `/process`, `/process/sdlc` — content sits exactly
  below the banner, not under it.
- **No desktop regression:** same measurement pass at 1280×900 on
  `/process/sdlc` shows identical top(124px)→scrolled(80px) behaviour.
- **Reduced motion:** re-ran the 390 pass with `prefers-reduced-motion: reduce`
  emulated — end states identical (transitions snap via the global CSS rule).
- **Before/after screenshots** (390 mobile) captured in
  `.reports/mobile-banner-gap/`: `before-390-scrolled.png` shows the content
  strip bleeding between nav and section nav; `after-390-scrolled.png` shows the
  section nav flush under the nav.
- **Build green:** `npm run build` — 23 routes prerendered, 0 failed.
- **Types green:** `npx tsc --noEmit` — exit 0.
- **Lint:** the 4 pre-existing repo lint errors (`tailwind.config.ts`
  require-import, `ROICalculator.tsx` dep) are unchanged; `eslint` on the 4
  changed files is clean (exit 0).
- **/simplify** run (4 cleanup agents): applied the one in-scope finding
  (centralise the `--chrome-h` default into `:root`, drop the inline `,124px`
  fallbacks); other findings were no-ops.

## Unverified — reviewer please decide

- **Real iOS Safari (the environment in the bug report).** Verified in
  Chromium-family mobile emulation and the MCP Chrome browser, not on a physical
  iPhone. Safari's fixed-element compositing and momentum scrolling differ.
  Residual risk: LOW. If the gap hides a bug, symptom would be: the section nav
  briefly overlaps the banner (or a 1–2px seam shows) during the fade on iOS.
- **The 300ms `transition-[padding]` on `<main>` animates a layout property
  across the whole page subtree** when the banner toggles. It fires only on the
  infrequent banner show/hide (not per scroll frame) and reads as the intended
  smooth rise, but on a low-end device the one-shot reflow could feel slightly
  heavy. Residual risk: LOW. If it hides a problem, symptom would be: a brief
  jank as content slides up when crossing the 120px scroll threshold. (Dropping
  the transition would make it snap instantly at zero cost, but loses the
  requested smooth motion.)
- **Programmatic-scroll quirk not exercised:** the page's `overflow-x:hidden`
  nested-scroller setup means `window.scrollTo` did not move the page in the MCP
  automation context (real wheel/touch scroll does, and `window.scrollY` updates
  correctly, which is what the banner/section-nav listeners use). Verified via
  real wheel events and Puppeteer's user-gesture scroll. Residual risk: LOW.
