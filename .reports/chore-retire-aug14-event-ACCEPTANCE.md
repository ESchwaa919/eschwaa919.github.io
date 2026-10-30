Issue: none given

# Acceptance — retire the past "Ship an App in a Day, Fri Aug 14" event (`chore/retire-aug14-event`)

## Grounding gate (rule 0g)

**1. Does it exist?** Yes: the event is live on `main` (`ce0ec18`). Searched with
`grep -rniE "5xyia8en|aug(ust)? 14|2026-08-14|CourseBanner|44px|luma\." .` (excluding
`node_modules`, `.git`, `dist`), then a wider technique-level grep for `--chrome-h`, `top-20`,
`banner`, `upcoming|register|workshop|calendly`, over `src/ public/ scripts/ docs/ *.md index.html`.

**2. Did we start it?** No prior retirement. History: PR #8 (Jul 7 / Aug 12 Luma embed), #13/#14
(banner dead-band + `--chrome-h` collapse), #16 (Aug 14 banner + /courses, luma `5xyia8en`),
#17 (testimonials, which are about the course and stay). `gh pr list --state all` shows no open PR.

**3. How done is it?** 0%. Consumers found (the brief's list, extended):

| # | File | What |
|---|------|------|
| 1 | `src/App.tsx` | imports + renders `<CourseBanner />` on every route |
| 2 | `src/components/CourseBanner.tsx` | the banner; hardcoded "Fri, Aug 14", localStorage key `courseBannerDismissed-aug14`; sets `--chrome-h` 124/80 at runtime. Only App.tsx imports it. Not data-driven, so no BLOCKED. |
| 3 | `src/index.css:53-56` | `--chrome-h: 124px` + "80px nav + 44px course banner" comment. Also consumed by `.slide` (`scroll-margin-top`, desktop `min-height`) and `main { pt-[var(--chrome-h)] }` in App.tsx |
| 4 | `src/components/SdlcSectionNav.tsx` | `|| 124` fallback + comment about the collapse (**not in the brief**) |
| 5 | `src/pages/Index.tsx` | `|| 124` fallback + "animates 124→80" comment (**not in the brief**) |
| 6 | `src/pages/Courses.tsx` | `createEventSchema` JSON-LD (2026-08-14, GBP 600), 2 luma `5xyia8en` links, "UPCOMING DATES" block + Luma calendar iframe, hero card "Multiple dates / See calendar below" (**stale once the calendar goes**, not in the brief) |
| 7 | `public/llms.txt`, `public/sitemap.xml` | course mentioned, **no dated event text** → no change |

`src/components/StructuredData.tsx::createEventSchema` becomes unused after this; it is a generic
helper and is left in place (mentioned, not deleted). "Book a call" in the nav is
`<Link to="/contact">`, so that is the CTA target.

**Searched and not covered:** the Luma calendar's live contents (the rate-limited public API returned
a 429, so I could not confirm whether it lists any future event); `dist/` of other branches.

## Acceptance predicate (rule 7)

Done iff **all** hold on the final head:

1. `~/.claude/bin/rune-ci-local .` result is recorded. This repo has no `web/` or Python layout, so an
   all-N/A result is a statement about the tool, not a pass or a fail (brief rule 2).
2. `npm run lint` exits 0 with no new errors vs `main`, and `npx tsc -p tsconfig.app.json --noEmit`
   exits 0. The root `tsconfig.json` is a solution file (`"files": []`), so `tsc --noEmit` there
   compiles nothing (rule 2b).
3. `npm run build` exits 0 (this runs `prerender.js` over every route).
4. `grep -rEn "5xyia8en|Aug 14|2026-08-14" dist/` prints nothing (exit 1).
5. With `dist/` served by `vite preview`, `node .reports/chore-retire-aug14-event-verify.mjs <url>`
   ends with `RESULT: PASS`. It derives its route list from `App.tsx` and, for every route at
   1440px and 390px, at scroll-top and after scrolling: no banner text in the DOM, `--chrome-h` is
   80px, `main` padding-top is 80px, the first content block's top equals the nav bottom, no stray
   fixed bar under the nav, no Luma link or iframe, no Event JSON-LD; and on `/courses` the CTA
   "Ask about the next date" links to `/contact`.
6. Red first: the same script run on the **unmodified** tree must FAIL (otherwise it is a mirror).
7. Codex gate over the final diff via `~/.claude/bin/agent-review --base origin/main`.

**Oracles that are not me:** the build and `vite preview`, headless Chromium measuring real layout,
`rune-ci-local`, and the codex gate. **Not an oracle available to me:** the shared Chrome MCP (no
claim in the brief, rule 8i), so a real-Chrome visual check is listed as UNVERIFIED in the STATUS.
