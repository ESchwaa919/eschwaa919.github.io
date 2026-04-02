# SEO Reviewer Agent — Design Spec

**Author:** The AI Expert Engineering
**Date:** April 2, 2026
**Status:** Draft — awaiting review

---

## The Problem

theaiexpert.ai is a consulting business's primary lead generation channel. Organic search visibility directly impacts revenue. But SEO health degrades silently:

1. A new pillar page ships without a sitemap entry (6 pages missing right now)
2. A route change breaks a canonical URL and nobody notices for weeks
3. Heading hierarchy gets mangled in a redesign (h1 → h3 → h2)
4. Structured data JSON-LD has a typo that invalidates the schema
5. An image ships without alt text, a meta description gets truncated

These are invisible bugs. The build passes. The site looks fine. But Google sees a degraded page. By the time it shows up in Search Console, rankings have already dropped.

The SEO Reviewer Agent audits every page after content, meta, or routing changes — catching regressions before they reach production crawlers.

---

## 1. Triggers

| Trigger | When | What It Checks |
|---|---|---|
| **Post-deploy** (primary) | After push to main, once GitHub Pages deploy completes | All indexed pages. Full audit suite. |
| **Post-PR** (pre-merge) | On demand before merging a PR that touches content/meta/routing | Only pages affected by changed files. Targeted checks. |
| **On-demand** | `/seo-review` or `/seo-review page:/about` | Specific page or full suite. |
| **Scheduled** (future) | Weekly cron | Full site audit to catch drift (external link rot, sitemap staleness). |

**Deploy detection:** After `git push`, the agent checks `https://theaiexpert.ai` for the new commit's changes. GitHub Pages deploys in ~2-3 minutes. The agent polls the live site (check for a known new element or meta tag) every 15s for max 5 minutes.

### PR-to-Page Mapping Algorithm

When triggered post-PR, the agent runs `git diff --name-only main...HEAD` and maps changed files to affected pages:

```
STEP 1: Classify changed files
  src/pages/{PageName}.tsx         → DIRECT page match
  src/components/SEOHead.tsx       → ALL pages (meta tags are global)
  src/components/StructuredData.tsx→ ALL pages (JSON-LD is global)
  src/components/Navigation.tsx    → ALL pages (nav links affect internal linking)
  src/components/Footer.tsx        → ALL pages (footer links affect internal linking)
  src/App.tsx                      → ALL pages (routing changes)
  public/sitemap.xml               → SITEMAP check only (no page content)
  public/robots.txt                → ROBOTS check only
  index.html                       → ALL pages (base meta tags)
  src/index.css                    → Skip (no SEO impact)
  src/components/ui/               → Skip (UI primitives, no SEO content)
  src/hooks/                       → Skip (no SEO content)
  src/constants/                   → Skip (unless pillarPages.ts)
  src/constants/pillarPages.ts     → ALL pillar pages (nav/linking config)

STEP 2: Resolve page paths from file paths
  src/pages/Index.tsx              → /
  src/pages/About.tsx              → /about
  src/pages/Services.tsx           → /services
  src/pages/Process.tsx            → /process
  src/pages/Pricing.tsx            → /pricing
  src/pages/Resources.tsx          → /resources
  src/pages/Contact.tsx            → /contact
  src/pages/Courses.tsx            → /courses
  src/pages/FractionalCAIO.tsx     → /fractional-caio
  src/pages/AILiteracy.tsx         → /ai-literacy
  src/pages/AIStrategy.tsx         → /ai-strategy
  src/pages/AIGovernance.tsx       → /ai-governance
  src/pages/AIImplementation.tsx   → /ai-implementation
  src/pages/UseCases.tsx           → /use-cases
  src/pages/AutoMLR.tsx            → /automlr
  src/pages/AILMS.tsx              → /ailms
  src/pages/AIAssessment.tsx       → /ai-assessment
  src/pages/ROICalculator.tsx      → /roi-calculator
  src/pages/PromptFluency.tsx      → /promptfluency
  src/pages/AILearning.tsx         → /ai-learning
  src/pages/Privacy.tsx            → /privacy
  src/pages/Terms.tsx              → /terms

STEP 3: Deduplicate and cap
  - Merge to unique page set
  - If > 8 unique pages, escalate to full suite
  - If 0 pages matched (non-SEO changes only), skip audit entirely
```

### Diff-Scoped Execution

| Change Type | Check Scope |
|---|---|
| Page component changed | Full SEO audit for that page (meta, headings, structured data, images, links) |
| SEOHead/StructuredData changed | Meta tag + JSON-LD checks on all pages |
| Navigation/Footer changed | Internal link audit on all pages |
| App.tsx (routing) changed | Canonical URL + sitemap coverage for all routes |
| sitemap.xml changed | Sitemap-only validation (all routes covered, no stale entries) |

---

## 2. Tools

### Chrome MCP (Page Inspection)

| Tool | Purpose |
|---|---|
| `mcp__claude-in-chrome__tabs_create_mcp` | Open fresh tab for each page |
| `mcp__claude-in-chrome__navigate` | Navigate to each page URL |
| `mcp__claude-in-chrome__read_page` | Read rendered DOM for heading hierarchy, image alt text, link structure |
| `mcp__claude-in-chrome__javascript_tool` | Extract meta tags, JSON-LD, canonical URLs, Open Graph tags from `<head>` |
| `mcp__claude-in-chrome__read_console_messages` | Check for JS errors that block rendering (crawlers see empty page) |
| `mcp__claude-in-chrome__computer` (screenshot) | Capture above-the-fold for visual confirmation of rendered content |

### CLI Tools (Static Analysis)

| Tool | Purpose |
|---|---|
| `Grep` | Search codebase for SEOHead usage, missing canonical props, alt text patterns |
| `Read` | Read sitemap.xml, robots.txt, index.html, App.tsx routes |
| `Bash` | Run Lighthouse CLI for performance/SEO scores (`npx lighthouse --output=json`) |
| `WebFetch` | Validate live canonical URLs resolve correctly, check for redirect chains |

**No external dependencies beyond Lighthouse** (ships with Chrome/npm).

---

## 3. Inputs

### Page Registry

The agent maintains a registry of all indexable pages with their expected SEO properties:

```
CORE PAGES (high priority — revenue-driving):
  /                    -- Homepage. Organization + Person JSON-LD. H1: brand statement.
  /services            -- Service page. Service JSON-LD array. H1: services overview.
  /pricing             -- Pricing page. No noindex. H1: pricing/engagement.
  /about               -- About page. Person JSON-LD. H1: about Erik.
  /contact             -- Contact page. ContactPoint JSON-LD. H1: contact.
  /courses             -- Courses page. H1: courses/training.

PILLAR PAGES (SEO/GEO — long-tail organic):
  /fractional-caio     -- Service JSON-LD + FAQ JSON-LD. H1: fractional CAIO.
  /ai-literacy         -- Service JSON-LD + FAQ JSON-LD. H1: AI literacy.
  /ai-strategy         -- Service JSON-LD + FAQ JSON-LD. H1: AI strategy.
  /ai-governance       -- Service JSON-LD + FAQ JSON-LD. H1: AI governance.
  /ai-implementation   -- Service JSON-LD + FAQ JSON-LD. H1: AI implementation.
  /use-cases           -- FAQ JSON-LD. H1: use cases.

PRODUCT PAGES (lead generation):
  /automlr             -- Product JSON-LD + FAQ JSON-LD. H1: AutoMLR.
  /ailms               -- Product JSON-LD + FAQ JSON-LD. H1: AILMS.

TOOL PAGES (engagement + lead capture):
  /ai-assessment       -- H1: AI assessment. Interactive tool.
  /roi-calculator      -- H1: ROI calculator. Interactive tool.
  /promptfluency       -- H1: Prompt Fluency. Lead magnet.
  /ai-learning         -- H1: AI learning. Lead magnet.

UTILITY PAGES (low SEO priority):
  /process             -- H1: process/methodology.
  /resources           -- H1: resources.
  /privacy             -- noindex acceptable. Legal page.
  /terms               -- noindex acceptable. Legal page.
```

### SEO Invariants (Global Rules)

```
ALL INDEXABLE PAGES:
  - Exactly one <h1> tag
  - Heading hierarchy is sequential (no h1 → h3 skipping h2)
  - <title> tag present and ≤ 60 characters
  - <meta name="description"> present and 120-160 characters
  - Canonical URL present and matches the page's own URL
  - Open Graph tags: og:title, og:description, og:image, og:url all present
  - Twitter Card tags: twitter:card, twitter:title, twitter:description present
  - No duplicate meta descriptions across pages
  - No duplicate title tags across pages
  - Page appears in sitemap.xml
  - All images have non-empty alt attributes
  - No broken internal links (href to routes that don't exist in App.tsx)
  - No console errors on load (JS errors can block rendering for crawlers)

PAGES WITH STRUCTURED DATA:
  - JSON-LD is valid JSON (parseable)
  - @context is "https://schema.org"
  - @type matches expected type for the page (Service, Product, FAQPage, etc.)
  - Required fields present per schema.org spec for that @type
  - No duplicate JSON-LD blocks with the same @type on one page

SITEMAP:
  - Every route in App.tsx (except redirects, NotFound, noindex pages) has a sitemap entry
  - No sitemap entries point to routes that don't exist
  - lastmod dates are not stale (> 6 months triggers WARN)
  - All URLs use https://theaiexpert.ai (not http, not www)

ROBOTS.TXT:
  - Sitemap directive present and URL is correct
  - No accidental Disallow on indexable pages
  - PDFs and /downloads/ blocked (intentional — lead capture flow)
```

---

## 4. Outputs

### SEO Audit Report

Written to `docs/seo-audit-{YYYY-MM-DD}-{trigger}.md`:

```markdown
# SEO Audit Report -- {date}

**Trigger:** post-deploy | pr-review | on-demand
**Commit:** {sha} ({message})
**Pages audited:** 22/22 indexable
**Lighthouse SEO score:** 97/100

## Results

| Page | Status | Issues | Notes |
|------|--------|--------|-------|
| / (Homepage) | PASS | 0 | -- |
| /services | PASS | 0 | -- |
| /fractional-caio | FAIL | 2 | Missing from sitemap, canonical URL wrong |
| /ai-literacy | WARN | 1 | Meta description 172 chars (over 160 limit) |
| /automlr | PASS | 0 | -- |
| ... | ... | ... | ... |

## Cross-Page Checks

| Check | Status | Notes |
|-------|--------|-------|
| Sitemap coverage | FAIL | 6 pillar pages missing |
| Duplicate titles | PASS | All unique |
| Duplicate descriptions | PASS | All unique |
| robots.txt | PASS | Correctly configured |
| Lighthouse SEO | PASS | 97/100 |

## Issues

### FAIL: /fractional-caio -- Missing from sitemap
- **Severity:** High
- **Impact:** Page won't be discovered by crawlers via sitemap
- **Fix:** Add <url> entry to public/sitemap.xml

### FAIL: Sitemap coverage -- 6 pillar pages missing
- **Severity:** High
- **Pages:** /fractional-caio, /ai-literacy, /ai-strategy,
            /ai-governance, /ai-implementation, /use-cases
- **Impact:** Pillar pages designed for organic search are invisible to sitemap crawlers
- **Fix:** Add all 6 URLs to public/sitemap.xml

### WARN: /ai-literacy -- Meta description too long
- **Severity:** Low
- **Current:** 172 characters
- **Limit:** 160 characters (Google truncates beyond this)
- **Fix:** Trim description in AILiteracy.tsx SEOHead props

## Lighthouse Summary
  Performance: 74 | Accessibility: 92 | Best Practices: 95 | SEO: 97
```

### Verdict Logic

- **Any FAIL -> overall FAIL.** SEO regression that must be fixed before deploy.
- **Only WARN + PASS -> overall WARN.** Non-critical issues to address.
- **All PASS -> overall PASS.** SEO health confirmed.

### Where Results Go

- Report markdown written to `docs/`
- If triggered post-deploy: summary posted to the conversation
- If triggered post-PR: findings added as PR comment via `gh pr comment`
- FAIL on a pillar page: escalate immediately (these pages are the SEO strategy)

---

## 5. Integration into PR Workflow

```
Branch work complete
        |
        v
   /simplify ---------- Code quality review
        |
        v
   npm run build ------ Type check + bundle
        |
        v
   /seo-review -------- Audit affected pages  <-- NEW
        |                (meta, headings, sitemap, JSON-LD)
        |
        +-- PASS ----> Create/update PR
        |
        +-- WARN ----> Note issues in PR description, proceed
        |
        +-- FAIL ----> Fix issues, re-run
```

**For post-deploy (main branch):**

```
git push origin main
        |
        v
   GitHub Pages deploys (2-3 min)
        |
        v
   /seo-review -------- Full site audit  <-- NEW
        |
        +-- PASS ----> Done
        |
        +-- WARN ----> Log issues, create follow-up task
        |
        +-- FAIL ----> Alert Erik, fix immediately
```

---

## 6. Implementation

**A Claude Code skill (`/seo-review`) that dispatches a subagent.**

The skill defines the protocol. The subagent has Chrome MCP access for live page inspection and CLI tools for static analysis.

### Skill Definition

File: `.claude/skills/seo-review/SKILL.md`

```
/seo-review                          -- Full site audit (all indexable pages)
/seo-review page:/about              -- Single page audit
/seo-review --static-only            -- Skip Chrome, analyze source code only
/seo-review --lighthouse             -- Include full Lighthouse run
/seo-review --post-deploy            -- Wait for deploy, then run full suite
```

### Subagent Design

The `/seo-review` skill spawns a subagent with `subagent_type: "general-purpose"` and a structured prompt including:

1. The page registry (URLs + expected SEO properties)
2. The SEO invariants (global rules)
3. Which pages to check (all, or diff-scoped set)
4. Whether to run Lighthouse

The subagent runs two phases:

**Phase 1: Static Analysis (no browser needed)**

1. Read `public/sitemap.xml` — extract all listed URLs
2. Read `src/App.tsx` — extract all routes
3. Cross-reference: every non-redirect, non-noindex route must appear in sitemap
4. Read `public/robots.txt` — verify sitemap directive, check for accidental blocks
5. Grep all page files for `SEOHead` usage — verify every page has title, description, canonical
6. Grep for `StructuredData` usage — verify expected JSON-LD types per page
7. Grep for `<img` tags without `alt` attributes in affected page components

**Phase 2: Live Page Inspection (Chrome MCP)**

For each page in the audit set:

1. Open tab, navigate to `https://theaiexpert.ai{route}`
2. Extract `<head>` contents via `javascript_tool`:
   ```js
   JSON.stringify({
     title: document.title,
     description: document.querySelector('meta[name="description"]')?.content,
     canonical: document.querySelector('link[rel="canonical"]')?.href,
     ogTitle: document.querySelector('meta[property="og:title"]')?.content,
     ogDesc: document.querySelector('meta[property="og:description"]')?.content,
     ogImage: document.querySelector('meta[property="og:image"]')?.content,
     ogUrl: document.querySelector('meta[property="og:url"]')?.content,
     twitterCard: document.querySelector('meta[name="twitter:card"]')?.content,
     jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent),
     h1s: [...document.querySelectorAll('h1')].map(h => h.textContent),
     headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({ tag: h.tagName, text: h.textContent?.slice(0, 60) })),
     images: [...document.querySelectorAll('img')].map(i => ({ src: i.src?.slice(-50), alt: i.alt })),
     internalLinks: [...document.querySelectorAll('a[href^="/"]')].map(a => a.href),
   })
   ```
3. Validate extracted data against invariants
4. Check for console errors via `read_console_messages`
5. Take above-the-fold screenshot for reference

**Phase 3: Lighthouse (optional, `--lighthouse` flag)**

Run via Bash:
```bash
npx lighthouse https://theaiexpert.ai{route} \
  --output=json --output-path=- \
  --only-categories=seo,performance,accessibility,best-practices \
  --chrome-flags="--headless" 2>/dev/null | \
  node -e "const r=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); \
  console.log(JSON.stringify({seo:r.categories.seo.score*100, \
  perf:r.categories.performance.score*100, \
  a11y:r.categories.accessibility.score*100, \
  bp:r.categories['best-practices'].score*100}))"
```

Only runs on explicit flag because it adds ~15s per page. For routine checks, the invariant-based audit is sufficient.

### Why Both Static + Live?

Static analysis catches issues in source code (missing SEOHead props, missing sitemap entries) before deploy. Live inspection catches runtime issues (React Helmet not rendering, JS errors preventing meta tag injection, redirect chains). Belt and suspenders — same philosophy as the migration reviewer.

---

## 7. Execution Budget

| Scope | Pages | Time |
|---|---|---|
| Quick (single page) | 1 page, static + live | ~30s |
| PR-scoped (typical) | 2-4 affected pages | ~1-2 min |
| Standard (full suite) | 22 indexable pages, static + live | ~5 min |
| Full + Lighthouse | 22 pages + Lighthouse on 6 core pages | ~10 min |

Default is **Standard** for post-deploy, **PR-scoped** for post-PR.

---

## 8. Known Issues to Catch on First Run

The current site has these SEO issues that the agent should flag immediately:

1. **Sitemap missing 6 pillar pages:** `/fractional-caio`, `/ai-literacy`, `/ai-strategy`, `/ai-governance`, `/ai-implementation`, `/use-cases` — added as routes but never added to `public/sitemap.xml`
2. **Sitemap lastmod dates stale:** All entries show `2026-02-05` — nearly 2 months old
3. **Sitemap URL inconsistency:** Product pages use trailing slash (`/automlr/`, `/ailms/`) but React routes don't — potential canonical confusion
4. **Potential duplicate route:** `/promptfluency` and `/prompt-fluency` both exist (one redirects?) — needs verification that canonical is set correctly on the primary

---

## 9. Open Questions

1. **Lighthouse in CI?** Running Lighthouse on every deploy adds ~2 min. Worth it for a marketing site? **Recommendation:** Yes, but only on core pages (/, /services, /pricing, /about, /contact, /courses). Skip tool/pillar pages for speed.
2. **Scheduled weekly audit?** A cron-based full audit catches drift (external link rot, competitor SERP changes). **Recommendation:** Yes, implement as a scheduled agent trigger after v1 is stable.
3. **Search Console integration?** The agent could pull GSC data to correlate audit findings with actual ranking changes. **Recommendation:** Defer to v2. Requires Google API credentials and is not critical for the audit itself.
4. **Auto-fix for sitemap?** When the agent detects a missing sitemap entry, should it add it automatically? **Recommendation:** Yes for sitemap.xml additions (low-risk, deterministic). No for meta tag changes (need human judgment on wording).
