# Cinematic Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild theaiexpert.ai as a cinematic five-act story destination per `docs/superpowers/specs/2026-07-06-cinematic-rebuild-design.md`.

**Architecture:** Token-level restyle (Evolved Cyber-Luxe) flows through every page via shadcn CSS variables; a new `src/components/story/` component family implements the homepage acts; touched pages (About, Process, Services, Pricing, Resources, Contact, Courses, Navigation, Footer) get the new chrome; untouched pages inherit via tokens + redefined legacy utilities.

**Tech Stack:** React 18, Vite, Tailwind, shadcn/ui, existing useScrollReveal hooks. No new dependencies.

**Canonical visual reference:** `docs/design/art-direction.html` (§07 token sheet).

## Global Constraints

- Content integrity: every headline, claim, number, testimonial, CTA, download from the audit inventory keeps a home. Re-voice, never delete.
- Emerald is earned: ≤2 accent uses per section. No neon text-shadows.
- Motion vocabulary only: reveal rise, rule draw, hover lift, scroll-cue pulse. Everything else retired.
- `overflow-x: clip` not `hidden` where sticky/fixed descendants exist.
- IntersectionObserver reveal threshold stays ≤0.05 (viewport-tall sections must fire).
- Routes, schemas, EmailJS, Calendly, lead-gating, Luma, microsites untouched.
- Verification is: `npm run build` + `npm run lint` + real Chrome walkthrough (desktop ~1500px and narrow ~390px) — no test suite exists in this repo.

---

### Task 1: Design tokens, fonts, legacy-utility remap

**Files:**
- Modify: `index.html` (font links: drop Rajdhani; add Archivo variable with wdth axis + IBM Plex Mono; keep Inter)
- Modify: `src/index.css` (`:root` tokens per art-direction §07; redefine legacy utilities as quiet equivalents; add story utility classes)
- Modify: `tailwind.config.ts` (fontFamily heading→Archivo, add mono→IBM Plex Mono; add `line`, `moss`, `surface` color aliases)

**Interfaces (produced, used by all later tasks):**
- CSS classes: `.title-display` (clamp XL, wdth 118/wght 640), `.title-scene` (LG), `.title-card` (MD), `.kicker`, `.lede`, `.scene-rule`, `.btn-cinema`, `.btn-cinema-ghost`, `.card-surface`, `.horizon-glow`
- Legacy classes redefined quiet (glow-*, text-gradient*, glass-card*, card-enhanced, btn-shimmer, cyber-line, section-glow keep working, no neon)
- Tailwind `font-heading` = Archivo, `font-mono` = IBM Plex Mono

- [ ] Fonts swapped in index.html; tokens replaced in index.css; legacy utilities redefined; tailwind config updated
- [ ] `npm run build && npm run lint` pass
- [ ] Chrome: homepage + /fractional-caio + /automlr render readable (no invisible text-secondary, no broken layouts)
- [ ] Global sweep: replace `text-secondary`/`glow-pink`/secondary-accent usages in TSX with primary/ash equivalents where they'd be unreadable on the new tokens
- [ ] Commit

### Task 2: Story primitives

**Files:**
- Create: `src/components/story/SceneMarker.tsx` — mono slate + draw-in rule; props `{ label: string; className?: string }`; uses useScrollReveal
- Create: `src/components/story/index.ts` (barrel)

**Interfaces:** `<SceneMarker label="Act I — The Stakes" />`

- [ ] Component built per art-direction §03; reduced-motion static
- [ ] Build passes; commit (verified visually within Task 3)

### Task 3: Homepage acts + new Index

**Files:**
- Create: `src/components/story/ColdOpen.tsx` — "AI isn't coming. / It's already here." + "The only question is whether it's working for you." + From AI-curious to AI-powered (links to 3 pillars) + CTAs (Start AI Assessment → /ai-assessment, ghost: Book a Strategy Call → calendly 30min) + horizon glow + scroll cue
- Create: `src/components/story/StakesAct.tsx` — stat beats: 85% pilots never reach production · 2–3× productivity gap · 60% fail on vendor selection (sources: as cited on /ai-literacy)
- Create: `src/components/story/PurgatoryAct.tsx` — pilot-purgatory narrative (from Process "Why Most AI Initiatives Fail") closing on "We fix this by building capabilities in the right order."
- Create: `src/components/story/PathAct.tsx` — journey map stages 01/02/03 with ProcessOverview's stage copy + features + pillar links + "Explore The Process" CTA
- Create: `src/components/story/GuideAct.tsx` — (a) practice beat: "We don't just advise on AI. We run on it." + SDLC/Rune/adversarial review teaser → /process/sdlc; (b) Erik reveal: small portrait, WhyWorkWithErik's 4 reasons + 4 differentiators + TrustBar content (Microsoft/Comcast/Elsevier logos+roles, 20+/$100M+/Global stats, training clients list) + "Learn More About Erik's Approach" → /about
- Create: `src/components/story/ProofAct.tsx` — ClientStories' 4 case stories + partner ecosystem + ContentChannels' 3 featured items + channel links + CourseTestimonials embed
- Create: `src/components/story/FinaleAct.tsx` — "Your move": LeadMagnet scorecard form (same behavior) + FinalCTA content (headline, pillar chips, Calendly + services CTAs, trust points)
- Modify: `src/pages/Index.tsx` — SEOHead/StructuredData kept; new act stack; title/description refocused to "The AI Expert" (keep keywords incl. Erik Schwartz)

**Content rule:** each act pulls its copy verbatim-or-revoiced from the existing components listed; nothing dropped. Old components remain in repo until Index no longer imports them, then delete HeroSection/TrustBar/ProcessOverview/WhyWorkWithErik/ClientStories/ContentChannels/LeadMagnet/FinalCTA if unused elsewhere (check imports first).

- [ ] Acts built; Index assembled; unused old components deleted after import check
- [ ] Build + lint pass; Chrome desktop + 390px walkthrough of full homepage
- [ ] Commit

### Task 4: Navigation + Footer chrome

**Files:**
- Modify: `src/components/Navigation.tsx` — brand block: "THE AI EXPERT" (Archivo) + mono tagline; mono nav links; quiet active state (primary, no glow); keep structure/links/dropdown
- Modify: `src/components/Footer.tsx` — same brand treatment, hairline dividers; keep all links/contact/socials

- [ ] Build + Chrome check (desktop + mobile menu)
- [ ] Commit

### Task 5: About reframe

**Files:**
- Modify: `src/pages/About.tsx` — new order: (1) practice vision/mission opener, (2) "The person behind the practice" hero (photo + MEET ERIK SCHWARTZ), (3) Journey, (4) Six principles, (5) differentiators, (6) thought leadership. Scene markers as section headers. Fix SEO description Hotwire→Elsevier. All bio content kept.

- [ ] Build + Chrome check
- [ ] Commit

### Task 6: Process re-chrome

**Files:**
- Modify: `src/pages/Process.tsx` — scene-marker chapter structure; fix "purgatoryjust" and "capabilitywithout" text glitches; strengthen SDLC teaser block; all stage detail content kept

- [ ] Build + Chrome check
- [ ] Commit

### Task 7: Services, Pricing, Resources, Contact, Courses chrome pass

**Files:**
- Modify: `src/pages/Services.tsx`, `src/pages/Pricing.tsx`, `src/pages/Resources.tsx`, `src/pages/Contact.tsx`, `src/pages/Courses.tsx` — narrative section headers (scene markers where sequential), new type classes on heroes, retired-class cleanup. All offers/rates/tools/downloads/forms/embeds/testimonials byte-identical in meaning.

- [ ] Build + Chrome check per page
- [ ] Commit

### Task 8: Full verification sweep

- [ ] `npm run build` (incl. SSG prerender step if wired into build) + `npm run lint`
- [ ] Chrome walkthrough every route: / /about /process /process/sdlc /services /pricing /resources /contact /courses /fractional-caio /ai-literacy /ai-strategy /ai-governance /ai-implementation /use-cases /ai-assessment /roi-calculator /promptfluency /ai-learning /automlr /ailms /privacy /terms + a legacy microsite link — desktop ~1500px and ~390px
- [ ] Content-integrity check against audit inventory (spot check: rates, testimonials, media list, download links, Calendly URLs)
- [ ] Fix everything found; commit

### Task 9: Simplify + PR

- [ ] Run /simplify on the diff; apply findings
- [ ] PR with Verified/Unverified sections per CLAUDE.md template
