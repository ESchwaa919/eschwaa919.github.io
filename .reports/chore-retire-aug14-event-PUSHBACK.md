PUSHBACK: The brief's done-criterion "`npm run lint` passes" cannot be met because lint already fails on `main`, so I used "no new findings versus the `main` baseline" instead.

## What
The brief says: "`npm run build` and `npm run lint` pass." On the unmodified tree (`ce0ec18`, `main`):
- `npm run lint` exits **1** with 4 errors and 17 warnings.
- `npx tsc -p tsconfig.app.json --noEmit` exits **2** with 4 errors (AILMS, AutoMLR, PromptFluency, Resources).

## Why I did not "fix" it
Every one of those findings sits in code this task does not touch (`ui/command.tsx`, `ui/textarea.tsx`, `tailwind.config.ts`, a stray tracked file `src/pages/.!2306!Pricing.tsx` that fails to parse, and four `FormEvent` signature mismatches). Fixing them would be unrelated change in an event-retirement PR (principle 3, surgical).

## What I did instead
Captured both outputs before editing, re-ran both after, and diffed them: **lint findings identical to baseline; tsc errors identical to baseline.** Build (`npm run build`) does pass, exit 0.

## Decision owed
Whether to open a separate cleanup for the pre-existing lint/tsc failures. Disposition of this pushback (accept / override, naming the decider) is the lane's to record before merge.
