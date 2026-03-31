# Animation System Overhaul — Design Spec

**Author:** Claude (AI Expert Website Sprint)
**Date:** 2026-03-31
**Status:** Implementing (Codex review items addressed)
**Linear:** Pending (MCP reconnection)

---

## Problem Statement

The website's scroll-reveal animation system has caused recurring UX bugs — **this is the 3rd time we've patched it**:

1. **Patch 1:** Sections stuck at `opacity: 0`, invisible to users
2. **Patch 2:** Slow fade-ins (`duration-1000`, `translate-y-12`) creating blank sections during scroll
3. **Patch 3:** Lowered threshold, added rootMargin pre-trigger, reduced duration to 300ms

The underlying issue is **architectural**: each of 22 files independently configures animation behavior with no centralized control, no fallback for failed observers, and no way to disable animations globally.

### Critical Correction

**Framer Motion is NOT installed.** Despite being referenced in bug reports, the actual animation system is:
- A custom `useScrollReveal` hook (`src/hooks/useScrollReveal.ts`) using the browser's IntersectionObserver API
- CSS transitions via Tailwind classes (`transition-all duration-300`)
- Conditional class toggling (`opacity-0 translate-y-4` → `opacity-100 translate-y-0`)

There is **zero Framer Motion code** in the codebase. `framer-motion` is not in `package.json`.

---

## Current Architecture

### Hook: `useScrollReveal`
- Creates one `IntersectionObserver` per call
- Returns `{ ref, isVisible }` — a ref to attach and a boolean to toggle classes
- Defaults: `threshold: 0.05`, `rootMargin: '50px'`, `triggerOnce: true`

### Hook: `useStaggeredReveal`
- Creates one `IntersectionObserver` for a container
- Fires `setTimeout` per child item (60ms stagger)
- Returns `{ containerRef, visibleItems: boolean[] }`
- Known issue: `setTimeout` handles not cleaned up on unmount

### Usage Pattern (every component)
```tsx
const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

<div ref={ref} className={`transition-all duration-300 ${
  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
}`}>
```

### Scale of the Problem

| Metric | Count |
|--------|-------|
| Files using `useScrollReveal` | **22** |
| Total `useScrollReveal` calls | **82** |
| Total `useStaggeredReveal` calls | **6** |
| IntersectionObservers on homepage alone | **~15** |
| Files with hardcoded threshold overrides | **18** (override the hook defaults) |

---

## Component Inventory

### Homepage Components (Index.tsx)

| Component | useScrollReveal | useStaggeredReveal | Notes |
|-----------|----------------|-------------------|-------|
| HeroSection | 0 | 0 | Uses useState + setTimeout instead |
| TrustBar | 1 | 0 | |
| ProcessOverview | 1 | 1 (3 items) | |
| WhyWorkWithErik | 2 | 1 (4 items) | |
| ClientStories | 1 | 1 (4 items) | |
| ContentChannels | 1 | 1 (3 items) | |
| LeadMagnet | 1 | 0 | |
| CourseTestimonials | 0 | 0 | Uses Embla carousel instead |
| FinalCTA | 1 | 0 | |
| **Homepage total** | **8** | **4** | **~15 observers** |

### Page Components

| Page | useScrollReveal calls | Notes |
|------|----------------------|-------|
| About.tsx | 6 | hero, journey, vision, philosophy, differentiator, thoughtLeadership |
| Process.tsx | 6 | hero, why, map, paths, different, cta |
| Services.tsx | 5 | hero, core, products, models, cta |
| Pricing.tsx | 5 | hero, models, addons, stats, cta |
| Resources.tsx | 6 | hero, tools, insights, downloads, media, cta |
| Contact.tsx | 3 | hero, form, calendly |
| AILiteracy.tsx | 8 | hero + 7 sections |
| AIStrategy.tsx | 8 | hero + 7 sections |
| AIGovernance.tsx | 7 | hero + 6 sections |
| AIImplementation.tsx | 8 | hero + 7 sections |
| FractionalCAIO.tsx | 7 | hero + 6 sections |
| UseCases.tsx | 7 | hero + 6 sections |
| AIAssessment.tsx | 3 | hero, features, results |
| ROICalculator.tsx | 4 | hero, stats, form, results |
| PromptFluency.tsx | 3 | hero, why, crisp |
| **Pages total** | **86** | |

### Shared Component (TrustSignals.tsx)
- 2 useScrollReveal + 1 useStaggeredReveal
- Note: removed from homepage but still exists as a component

---

## Options

### Option A: Fix Current System Properly (CSS + IntersectionObserver)

**Approach:** Keep the existing pattern but fix the architectural problems.

**Changes:**
1. **Centralized config** — Move all animation constants to `src/constants/animations.ts`:
   ```ts
   export const REVEAL_CONFIG = { threshold: 0.05, rootMargin: '50px' };
   export const REVEAL_CLASSES = {
     hidden: 'opacity-0 translate-y-4',
     visible: 'opacity-100 translate-y-0',
     transition: 'transition-all duration-300',
   };
   ```
2. **Remove per-component config overrides** — All 18 files with `{ threshold: 0.1 }` or `{ threshold: 0.2 }` should use the default
3. **CSS-only fallback** — Add `[data-no-js] .reveal { opacity: 1; transform: none; }` so content is visible if JS fails
4. **Fix setTimeout leak** in `useStaggeredReveal` — store timer IDs in a ref, clear on unmount
5. **Reduce observer count** — Consider a single shared observer via a context provider (optional, not critical)

**Pros:**
- Zero new dependencies
- Minimal code change (config extraction + cleanup)
- Current system works after our patches — this just prevents regression
- Smallest bundle impact (no new library)

**Cons:**
- Still requires manual `ref` + className wiring in every component
- No built-in animation orchestration (enter/exit/layout)
- If we ever want more sophisticated animations, we'll revisit

**Effort:** ~2-3 hours. Config extraction + update 22 files to use shared config + fix setTimeout leak.

---

### Option B: Replace with Framer Motion `whileInView`

**Approach:** Install `framer-motion`, replace all scroll reveal patterns with `<motion.div whileInView>`.

**Changes:**
1. `npm install framer-motion` (~30KB gzipped)
2. Replace `useScrollReveal` pattern with:
   ```tsx
   <motion.div
     initial={{ opacity: 0, y: 16 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, margin: '50px' }}
     transition={{ duration: 0.3 }}
   >
   ```
3. Replace `useStaggeredReveal` with Framer Motion's `staggerChildren`:
   ```tsx
   <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
     {items.map(item => <motion.div variants={item} key={...} />)}
   </motion.div>
   ```
4. Delete `useScrollReveal.ts` hook entirely

**Pros:**
- Battle-tested library used by millions of sites
- Built-in `whileInView` handles all IntersectionObserver edge cases
- `viewport.once` and `viewport.margin` work reliably
- Stagger animations are declarative, no manual `setTimeout`
- Opens door to exit animations, layout animations, shared layout
- `AnimatePresence` for route transitions later
- Built-in reduced-motion support (`useReducedMotion`)

**Cons:**
- Adds ~30KB gzipped to bundle (current: 400KB gzipped — 7.5% increase)
- Requires touching all 22 files to swap the pattern
- New dependency to maintain
- Learning curve for team members unfamiliar with Framer Motion
- Overkill if we only need scroll reveals

**Effort:** ~4-5 hours. Install, update 22 files, delete hook, test all pages.

---

## Recommendation: Option A — Fix Current System

**Rationale:**

1. **The current system works.** After 3 patches, the IntersectionObserver + CSS transitions approach is functional. The remaining issues are organizational (scattered config, no fallback), not fundamental.

2. **Bundle size matters.** The site already flags a Vite chunk size warning at 400KB gzipped. Adding 30KB for scroll reveals that already work is hard to justify.

3. **Effort-to-value ratio.** Option A fixes the root causes (centralized config, fallback, timeout leak) in ~2-3 hours with zero new dependencies. Option B requires the same file-touching effort plus a new dependency.

4. **The animations are simple.** We're doing `opacity: 0→1` and `translateY: 4px→0`. This is exactly what CSS transitions are designed for. Framer Motion's power (spring physics, layout animations, exit animations, gesture handling) is unused overhead for this use case.

5. **Prevention over cure.** The recurring patches happened because config was scattered. Centralizing it prevents future regressions regardless of which animation library powers the transitions.

**When to reconsider Option B:** If we add route transition animations, shared layout animations between pages, or complex interactive animations (drag, spring, gesture). At that point, Framer Motion's features justify the bundle cost.

---

## Implementation Plan (Option A)

### Phase 1: Centralize Config
- [ ] Create `src/constants/animations.ts` with `REVEAL_CONFIG` and `REVEAL_CLASSES`
- [ ] Update `useScrollReveal.ts` to import defaults from the constant
- [ ] Add CSS-only fallback for no-JS / failed observer scenarios

### Phase 2: Clean Up Components (22 files)
- [ ] Remove all per-component threshold/rootMargin overrides
- [ ] Replace inline animation class strings with `REVEAL_CLASSES` references
- [ ] Fix `useStaggeredReveal` setTimeout leak

### Phase 3: Verify
- [ ] Test all 15 pages in Chrome, Safari, Firefox
- [ ] Test with JS disabled (content should be visible)
- [ ] Test `prefers-reduced-motion` (skip animations)
- [ ] Verify no blank sections on fast scroll
- [ ] Build passes, no bundle size increase

---

## Files to Modify

**New files:**
- `src/constants/animations.ts`

**Modified files (27):**
- `src/hooks/useScrollReveal.ts`
- `src/components/HeroSection.tsx` (uses own isLoaded pattern, not useScrollReveal)
- `src/components/TrustBar.tsx`
- `src/components/ProcessOverview.tsx`
- `src/components/WhyWorkWithErik.tsx`
- `src/components/ClientStories.tsx`
- `src/components/ContentChannels.tsx`
- `src/components/LeadMagnet.tsx`
- `src/components/FinalCTA.tsx`
- `src/components/TrustSignals.tsx`
- `src/components/CourseTestimonials.tsx` (no scroll reveal — carousel only)
- `src/pages/About.tsx`
- `src/pages/Process.tsx`
- `src/pages/Services.tsx`
- `src/pages/Pricing.tsx`
- `src/pages/Resources.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Courses.tsx` (no scroll reveal)
- `src/pages/AILiteracy.tsx`
- `src/pages/AIStrategy.tsx`
- `src/pages/AIGovernance.tsx`
- `src/pages/AIImplementation.tsx`
- `src/pages/FractionalCAIO.tsx`
- `src/pages/UseCases.tsx`
- `src/pages/AIAssessment.tsx`
- `src/pages/ROICalculator.tsx`
- `src/pages/PromptFluency.tsx`
- `src/pages/AILearning.tsx`
- `src/pages/AutoMLR.tsx`
- `src/pages/AILMS.tsx`
- `src/index.css` (add reduced-motion + clean up unused .reveal classes)

---

## Codex Review Addendum (2026-03-31)

### 1. Complete Component Inventory Reconciliation

All files using animation patterns, categorized by mechanism:

**useScrollReveal hook (96 call sites across 25 files):**
Components (9): TrustBar, ProcessOverview, WhyWorkWithErik, ClientStories, ContentChannels, LeadMagnet, FinalCTA, TrustSignals (not on homepage), Courses (not on homepage)
Pages (16): About, Process, Services, Pricing, Resources, Contact, AILiteracy, AIStrategy, AIGovernance, AIImplementation, FractionalCAIO, UseCases, AIAssessment, ROICalculator, PromptFluency, AILearning, AutoMLR, AILMS

**useStaggeredReveal hook (5 call sites across 5 files):**
ProcessOverview (3 items), WhyWorkWithErik (4), ClientStories (4), ContentChannels (3), TrustSignals (4)

**Custom isLoaded pattern (NOT useScrollReveal):**
HeroSection — uses `useState(false)` + `setTimeout(100ms)` to trigger entrance animation on mount. Uses `duration-700` with staggered CSS `delay-*` classes. This is intentionally different: it's a page-load animation, not a scroll reveal.

**No animation hooks:**
CourseTestimonials — uses Embla carousel autoplay, no scroll reveal
Courses — no scroll reveal
NotFound, Privacy, Terms — static pages, no animation

### 2. Non-Default Threshold Documentation

**Current overrides (all in homepage components):**

| File | Threshold | Reason | Decision |
|------|-----------|--------|----------|
| TrustBar | 0.2 | Small section (logos bar) — wanted more visible before trigger | **Remove.** rootMargin 50px handles this now |
| ProcessOverview header | 0.2 | Section header text | **Remove.** Same reason |
| WhyWorkWithErik header | 0.2 | Section header text | **Remove.** |
| WhyWorkWithErik diff | 0.2 | "What Makes This Different" card | **Remove.** |
| ClientStories header | 0.2 | Section header text | **Remove.** |
| ContentChannels header | 0.2 | Section header text | **Remove.** |
| LeadMagnet | 0.2 | Email capture section | **Remove.** |
| FinalCTA | 0.2 | Bottom CTA | **Remove.** |
| TrustSignals header | 0.2 | Section header | **Remove.** |
| TrustSignals stats | 0.3 | Compact stats bar | **Remove.** |

**Dead `delay` config (ignored by hook):**
- AIAssessment: `{ threshold: 0.1, delay: 200 }` — `delay` not in hook interface
- Contact: `{ threshold: 0.1, delay: 200 }`, `{ threshold: 0.1, delay: 300 }` — dead
- ROICalculator: `{ threshold: 0.1, delay: 100 }`, `{ threshold: 0.1, delay: 200 }` — dead

All per-component overrides will be removed. The hook defaults (`threshold: 0.05, rootMargin: '50px'`) are correct for all use cases now that rootMargin pre-triggering is in place.

### 3. Reduced-Motion Handling

Add to `useScrollReveal.ts`:
```ts
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  setIsVisible(true); // Skip animation, show immediately
  return;
}
```

Add to `src/index.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. Framer Motion Clarification

**Framer Motion is NOT installed.** There are zero files that import it. `framer-motion` does not appear in `package.json`. The animation system has always been CSS transitions + IntersectionObserver via the custom `useScrollReveal` hook.

The recurring bug reports referencing "Framer Motion" were a misnomer — the actual issues were:
1. IntersectionObserver threshold too high → elements not triggering
2. CSS transition duration too long → blank sections during scroll
3. No rootMargin → no pre-triggering before viewport entry

**There is nothing to remove.** No imports, no package, no code.
