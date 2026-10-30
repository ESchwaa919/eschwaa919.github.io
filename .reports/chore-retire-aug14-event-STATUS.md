Issue: none given

# STATUS — `chore/retire-aug14-event`: retire the past "Ship an App in a Day, Fri Aug 14" event

**Terminal state: DONE — PR open, codex gate PASS, nothing blocked.**
**PR:** PR 18 (https://github.com/ESchwaa919/eschwaa919.github.io/pull/18), base `main`, not merged.
**Gated head:** `3dbc970be15ea4b0fff8c9dff79db6ea30359270`. The STATUS/PUSHBACK commit that follows it adds only `.reports/` files (checked with `git diff --stat 3dbc970..HEAD -- src public`, empty). The PR's own head SHA is the final one.
**Lane lead:** no session named for a website lane exists in `ListAgents` (peers: Brukinsa, Marketing, Invero, Lead Wrangler, CyberAgent, HaiSaoi, Bellwether). The hand-off message went to `Rune Marketing` as the most plausible owner of the theaiexpert.ai site, with a request to forward; that is a guess, and delivery is unconfirmed. This file and the PR are the delivery.

## Acceptance predicate (from `.reports/chore-retire-aug14-event-ACCEPTANCE.md`) — PASSED
| # | Predicate | Result |
|---|-----------|--------|
| 1 | `rune-ci-local .` | **All N/A** ("no Python project", "no web/ directory", "NOT a pass and is NOT evidence"). A statement about the tool, not the diff. Verdict file `/var/folders/sc/w847_rr15s77s1kgthj7shb80000gn/T/rune-ci-local.sw1CZN2c95/verdict.md`. Repo's own gates used instead (rows 2-6). |
| 2 | lint and `tsc -p tsconfig.app.json --noEmit` add no new findings | **PASS vs baseline.** Both already fail on `main` (lint exit 1: 4 errors/17 warnings; tsc exit 2: 4 errors); outputs diffed identical before/after. See Pushback. Bare `tsc --noEmit` on the solution-root `tsconfig.json` compiles nothing and was not used. |
| 3 | `npm run build` | **PASS**, exit 0, `Pre-render complete: 22 rendered, 0 failed` |
| 4 | `grep -rEn "5xyia8en\|Aug 14\|2026-08-14" dist/` | **PASS**: no output, exit 1 (unmodified tree: 23 files hit). `luma.`, `Dismiss banner`, `courseBanner` also absent. |
| 5 | oracle `node .reports/chore-retire-aug14-event-verify.mjs http://localhost:4391` | **PASS**: `RESULT: PASS (23 routes x 2 viewports)` |
| 6 | red first: same oracle on unmodified source | **FAILED as required**: `RESULT: FAIL (320 failures over 23 routes x 2 viewports)` (unmodified source built from `git archive ff558f8` into a scratch dir) |
| 7 | codex gate | **PASS**, round 1. Command `~/.claude/bin/agent-review --base origin/main`, header `head: 3dbc970be15ea4b0fff8c9dff79db6ea30359270`, range `origin/main..3dbc970`. Files: verdict `/var/folders/sc/w847_rr15s77s1kgthj7shb80000gn/T/agent-review.XXXXXXXX.C82a2PYbI1/verdict.md`, `final-verdict` content `PASS`. Last substantive lines of the verdict: `The diff is clean: no high-confidence issues found across the five review principles. Browser verification was not rerun during this review.` then `VERDICT: PASS` (the file's literal last line is the tool's `<<AGENT-REVIEW-DONE>>` marker). One gate round, no findings, so no round-3 flag. |

**Dependencies:** option (1), the `node_modules` symlink to the main checkout was already in place (gitignored, not committed). No install of any kind was run.

**LOCAL ORACLE labelling (rule 5b):** no GitHub Actions workflow runs on this PR. `.github/workflows/deploy.yml` triggers only on push to `main` and `workflow_dispatch`, so there is no Actions run to cite. Rows 2-6 are local evidence (my laptop's headless Chromium and build), not CI-gated.
**Netlify checks on the PR are NOT evidence (found after `gh pr ready`):** a legacy Netlify integration (`amazing-kringle-04b967`, no `netlify.toml` in the repo) attaches `deploy-preview` = pass plus three neutral/skipped checks ("No redirect rules processed", "No header rules processed", "All files already uploaded"). I fetched `https://deploy-preview-18--amazing-kringle-04b967.netlify.app`: `/` returns the repo's raw source `index.html` (~4KB, no bundle) and `/courses/`, `/about/`, `/process/sdlc/` return 404. It publishes the repo root, not this build, so its "pass" says nothing about the change. The real deploy is GitHub Pages on push to `main`.
**Post-ready push (rule 8g):** this paragraph was corrected after the PR was marked ready. The commit changes only `.reports/chore-retire-aug14-event-STATUS.md`; `src/` and `public/` are identical to the gated head `3dbc970`, so no new gate round is needed.

**Guards re-run at the final head (rule 8d):** the repo has no local-only guards beyond the above. After the STATUS commit I re-ran `npm run build`, the three-string `dist/` grep, `grep -rn 5xyia8en src public` and the oracle against the rebuilt `dist/`: results in the PR's final comment (SHA-stamped), because a SHA cannot be written into the commit that contains it.

## Pushback
See `.reports/chore-retire-aug14-event-PUSHBACK.md`. In short: the brief's done-criterion "lint passes" cannot be met because lint already fails on `main`; I held myself to "no new findings versus the main baseline". Disposition owed from the lane (accept/override, naming the decider).

## Where the brief was wrong or incomplete (rule 0)
- "`npm run lint` passes": false on `main` (above).
- Consumers it did not list: `src/pages/Index.tsx` and `src/components/SdlcSectionNav.tsx` both carried a `|| 124` fallback and "collapses on scroll" comments for `--chrome-h`; the `/courses` hero card said "See calendar below". All three are changed.
- "The worktree has no node_modules": a symlink already existed.
- Not wrong: `CourseBanner` was hardcoded, not config-driven, and only `App.tsx` imported it, so no BLOCKED was needed.

## Verified
- **Layout/DOM, headless Chromium (NOT the user's Chrome), `vite preview` on a fresh full `npm run build` incl. prerender:** every route derived from `App.tsx` (23) at 1440px and 390px, at scroll-top and after scrolling 600px: no banner/Aug 14/luma text in the DOM, `--chrome-h` and `main` padding-top both `80px`, first content top equals nav bottom (80px), no stray fixed bar under the nav, no Luma link or iframe, no Event JSON-LD; on `/courses` the Course JSON-LD, h1 and a testimonial remain, and every rendered "Ask about the next date" link goes to `/contact`. 46/46 ok.
- The oracle can fail: 320 failures on the unmodified source, including every `/courses` check.
- `dist/` contains none of the stale strings after the build; 23 prerendered files contained them before.
- Lint and `tsc -p tsconfig.app.json` findings unchanged from the `main` baseline.
- Screenshots of `/` and `/courses` at 1440px reviewed by eye: hero directly under the nav; "Date: On request" card and "Ask about the next date" section render.
- Out-of-scope observations (not fixed): prod `https://theaiexpert.ai/ai-assessment` returns a `<meta http-equiv="refresh">` stub pointing at its own URL (read via `curl` only); stray tracked file `src/pages/.!2306!Pricing.tsx` breaks lint parsing; `createEventSchema` is now unused.

## Unverified — reviewer please decide
- **Real Chrome.** No Chrome claim was in the brief (rule 8i), so I did not touch the shared Chrome MCP; the layout evidence is headless Chromium. No `CHROME-DONE` line is owed.
- **What the Luma calendar currently lists.** Its public API returned HTTP 429 on the one read-only call I made, so I could not check whether a future event exists that the removed embed would have shown.
- **Content judgement, not a bug:** `/courses` still states "The Mandeville Hotel", "9:00 AM - 5:00 PM" and "Central London" as present-tense fact. Left because the brief says keep the course description, but they are the Aug 14 details.
- Any hosted build of this branch: the only hosted preview (Netlify) serves un-built source, so none exists.
- Production GitHub Pages behaviour after deploy (clean-URL resolution of `/courses`, caching of the old banner bundle for returning visitors; the localStorage key `courseBannerDismissed-aug14` is now inert).
- Residual risk: LOW
- If the gap hides a bug, the symptom would be: a stray gap or overlap under the nav on some route in real Chrome, or a stale cached banner for returning visitors for a short time after deploy.

## Owed
A diff read and a merge from the lane (every worker PR gets the codex gate, a diff read, and a merge; the gate has passed). Disposition of the PUSHBACK. Optionally: a real-Chrome look at `/` and `/courses` after deploy.
