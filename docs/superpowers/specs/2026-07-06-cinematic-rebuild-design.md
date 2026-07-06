# Cinematic Rebuild — theaiexpert.ai

**Date:** 2026-07-06
**Status:** Approved by Erik (design + art direction confirmed against docs/design/art-direction.html)
**Branch:** feat/cinematic-rebuild

## Goal

Rebuild the site as a cinematic, story-driven destination. Refocus the narrative
from "it's about Erik" to "it's about AI, and The AI Expert is the guide."
Keep all content. Make the site somewhere people want to visit.

## The narrative reframe

The visitor is the protagonist. AI is the force reshaping their world.
The AI Expert (the practice) is the guide who has crossed the territory.
Erik is revealed mid-story as the human behind the practice — a credibility
beat, not the headline. Company voice site-wide; first person only in Erik's
About section and the Rune essay.

## Homepage: five acts

1. **Cold open — "The Shift."** Full-viewport, near-black, huge editorial type.
   "AI isn't coming. It's already here." / "The only question is whether it's
   working for you." Sub-line: From AI-curious to AI-powered. One primary CTA
   (assessment) + ghost CTA (strategy call). Horizon glow, scroll cue. No headshot.
2. **Act I — "The stakes."** Cinematic stat beats from existing content:
   85% of pilots never reach production · 2–3× productivity gap · 60% fail on
   vendor selection.
3. **Act II — "Pilot purgatory."** The villain: everyone experimenting, almost
   no one shipping. From Process "Why Most AI Initiatives Fail".
4. **Act III — "The path."** Literacy → Strategy → Implementation journey map,
   linking to the three pillar pages. Trust bar content (Microsoft · Comcast ·
   Elsevier) folds in here or in Act IV.
5. **Act IV — "The guide."** (a) The practice: "We don't just advise on AI.
   We run on it." — SDLC/Rune/agentic team surfaced from /process/sdlc;
   (b) the human reveal: Erik, 20+ years, Microsoft/Comcast/Elsevier, $100M+,
   hands-on builder. Small confident photo.
6. **Act V — "The proof."** Client stories (25% hotel no-shows, 12-week
   concept-to-production, pharma MLR 90% faster), workshop testimonials,
   AutoMLR/AILMS metrics, content channels.
7. **Finale — "Your move."** Assessment, ROI calculator, book a call, lead magnet.

All content currently rendered by HeroSection, TrustBar, ProcessOverview,
WhyWorkWithErik, ClientStories, ContentChannels, LeadMagnet, CourseTestimonials,
FinalCTA keeps a home in these acts.

## Art direction: Evolved Cyber-Luxe

Canonical reference: **docs/design/art-direction.html** (§07 token sheet is the
CSS source of truth).

- **Palette:** Void hsl(200 25% 4%) · Surface hsl(200 18% 7%) · Moss
  hsl(160 55% 9%) · Signal hsl(155 100% 45%) · Bone hsl(150 8% 93%) · Ash
  hsl(190 10% 58%) · Line hsl(200 12% 16%). Magenta/cyan/purple retired.
  Emerald is earned — max ~2 uses per section.
- **Type:** Archivo (variable; display, uppercase, wdth 110–120, wght 600–680)
  replaces Rajdhani. Inter stays for body. IBM Plex Mono added for eyebrows,
  scene markers, buttons, stat labels, metadata.
- **Signature device:** the scene marker — mono slate + hairline rule that
  draws in on scroll. Only for genuinely sequential content (acts, stages).
- **Motion vocabulary (complete):** reveal (opacity+18px rise, 0.7s,
  cubic-bezier(0.16,1,0.3,1), 80ms stagger) · rule draw (scaleX, 1.2s) ·
  hover lift (cards 3px, buttons 2px, single soft glow) · scroll cue pulse.
  Retired: shimmer, glitch, scan-line, data-stream, floating orbs, pulse-glow,
  border-glow loops, btn-shimmer, hover scale-105.
- **Surfaces:** flat Surface + hairline borders replace card glassmorphism;
  glass blur survives only on the sticky nav. Radius tightens 0.5rem → 0.25rem.
- **The single glow:** hero horizon radial + --glow-signal button hover. No
  neon text-shadows.

## Page scope

- **Index** — full rebuild as five-act experience; new components in
  `src/components/story/`.
- **About** — reframed: opens on the practice's vision, then "the person behind
  the practice." All bio content kept. Fix SEO description (Hotwire → Elsevier).
- **Process** — re-chromed chaptered journey; fix "purgatoryjust" and
  "capabilitywithout" glitches; SDLC teaser strengthened.
- **Services / Pricing / Resources / Contact / Courses** — new chrome +
  narrative section headers; all offers, rates, tools, downloads, forms,
  embeds, testimonials preserved exactly.
- **Pillar pages, SDLC page, products, tools** — inherit evolved tokens and
  restyled shared utilities; structure untouched.
- **Untouched:** routes, schema markup, EmailJS wiring, Calendly links,
  lead-gating, Luma embeds, legacy microsites, sitemap/prerender pipeline.

## Content integrity rule

The content audit inventory (conversation, 2026-07-06) is the checklist: every
headline, claim, number, testimonial, CTA, and download must be traceable to a
home in the new build. Re-sequencing and re-voicing allowed; deletion not.

## Technical approach

- Same stack. No new animation library — extend the existing centralized
  `useScrollReveal` / animation config.
- Legacy utility classes (glow-pink, text-gradient-animate, glass-card, …) are
  redefined to quiet equivalents rather than deleted, so untouched pages
  auto-migrate without breaking.
- Fonts via Google Fonts link in index.html (Archivo variable incl. wdth axis,
  Inter, IBM Plex Mono); drop Rajdhani.
- Known traps (verified in Chrome during art-direction build):
  `overflow-x: hidden` on body breaks `position: sticky` (use `clip`);
  IntersectionObserver threshold must be 0 (not 0.15) or viewport-tall
  sections never reveal.
- Verify: `npm run build` + real Chrome walkthrough (desktop + narrow
  viewport) of every route before PR.

## Out of scope

- Copy rewrites on pillar/product/tool pages beyond chrome inheritance.
- Reconciling the ROI-calculator PDF contact email (eschwaa@gmail.com) — flag,
  don't change, unless trivial while touching the file.
- Newsletter form wiring (currently non-functional; unchanged).
