# Database Migration Reviewer Agent — Design Spec

**Author:** Claude (Orchestrator Design Session)
**Date:** 2026-04-02
**Status:** Approved — 2026-04-02
**Approach:** Hookify rule (tripwire) + dedicated skill (deep audit)

---

## Problem Statement

The CHECK constraint incident was the worst bug in the project's history. The root cause: a database migration changed constraints, but the code paths writing to the affected columns were not audited. The TS enum and the DB CHECK constraint diverged, and writes broke in production.

The existing CLAUDE.md rules attempt to prevent this:

- All enum-like string columns MUST have a TypeScript enum AND a DB CHECK constraint
- Never use raw column names — import from `columns.ts`
- After any migration, run `generate-schema.js` and commit updated `columns.ts`
- FK constraints: use UNION validation when tables have multiple ID sources

These rules are documentation. Nothing enforces them. A developer (human or AI) can write a migration, skip the enum sync, push, and deploy. The rules only work if someone remembers to follow them.

This agent makes the rules enforceable.

---

## Scope

### In Scope

- **LexForge** (Azure SQL) — primary target, where the CHECK constraint incident occurred
- **TruthAndTone** — Render Postgres, Prisma-managed schema
- **Agency** — Render Postgres, shared instance

### Out of Scope

- This website (eschwaa919.github.io) — no database
- Schema design decisions — the agent audits migrations, it doesn't design them
- Data migration / backfill execution — the agent verifies a backfill plan exists, it doesn't run it

---

## Architecture

Two components working together:

```
Developer writes migration
        │
        ▼
┌─────────────────────────┐
│  Hookify Rule           │  Triggers on: migration file staged for commit
│  (migration-guard)      │  Action: WARN — "Run /review-migration before committing"
│                         │  Blocks: nothing (warning only)
└─────────┬───────────────┘
          │ developer runs /review-migration
          ▼
┌─────────────────────────┐
│  Skill                  │  Reads: migration SQL + all related code changes
│  (/review-migration)    │  Produces: structured audit report
│                         │  Verdict: PASS / FAIL with specific findings
└─────────────────────────┘
```

### Why Not a Hard Gate?

A hard-blocking pre-commit hook would be the safest option, but:

1. Hookify rules run pattern matching, not multi-file semantic analysis. A rule complex enough to do a real audit would be fragile and slow.
2. Blocking commits on a slow agent analysis creates friction that developers will bypass (`--no-verify`).
3. The real value is in the audit quality, not the gate mechanism. A high-quality warning that's easy to run beats a low-quality block that people skip.

The hookify rule ensures you can't *forget*. The skill ensures the review is *thorough*.

---

## Component 1: Hookify Rule — `migration-guard`

### Trigger

Fires when any file matching migration patterns is staged for commit:

**File patterns:**
- `**/migrations/**/*.sql`
- `**/migrations/**/*.ts`
- `**/prisma/migrations/**/*`
- `**/*.migration.ts`
- `**/schema.prisma` (Prisma schema changes)

### Action

**Type:** Warning (non-blocking)

**Message:**
```
Migration file detected. Run /review-migration before committing.
Checklist:
  - [ ] All write paths audited for affected columns
  - [ ] TS enums match DB CHECK constraints
  - [ ] FK references validated
  - [ ] Rollback plan documented
  - [ ] columns.ts regenerated (if applicable)
```

### Why Warning, Not Block

- Keeps the feedback loop fast (< 1s)
- Developers can commit WIP migrations on feature branches without friction
- The real enforcement happens at PR review time (see Integration section)

---

## Component 2: Skill — `/review-migration`

### Invocation

```
/review-migration                    # auto-detect migration files in current diff
/review-migration path/to/file.sql  # review a specific migration file
```

### Input Discovery

When invoked without arguments, the skill:

1. Runs `git diff --cached --name-only` and `git diff HEAD --name-only` to find changed files
2. Filters for migration file patterns (same as hookify rule)
3. If no migrations found, checks `git log -1 --name-only` (just-committed migration)
4. If still nothing, asks the user to specify a file

### Audit Pipeline

The skill runs 6 sequential checks. Each produces a finding: PASS, WARN, or FAIL.

#### Check 1: Schema Change Inventory

**What:** Parse the migration SQL/Prisma schema and produce a structured list of every change.

**Output:**
```
Tables modified: [list]
Columns added: [table.column → type]
Columns altered: [table.column → old type → new type]
Columns dropped: [table.column]
Constraints added: [CHECK, FK, UNIQUE — with definitions]
Constraints dropped: [list]
Indexes added/dropped: [list]
```

**How:** For raw SQL migrations, parse `CREATE TABLE`, `ALTER TABLE`, `ADD COLUMN`, `ADD CONSTRAINT`, `DROP` statements. For Prisma, diff the schema file against the previous version (`git show HEAD:prisma/schema.prisma`).

#### Check 2: Write Path Audit

**What:** For every column that was added, altered, or had a constraint change, find ALL code paths that write to it.

**How:**
1. Extract affected column names from Check 1
2. Grep the entire codebase for writes to those columns:
   - Raw SQL: `INSERT INTO table`, `UPDATE table SET column`
   - ORM/query builder: `.insert(`, `.update(`, `.create(`, `.upsert(`
   - Prisma: `prisma.table.create(`, `prisma.table.update(`
   - `columns.ts` references: `Cols.Table.column` in write contexts
3. For each write path found, verify the value being written is compatible with the new constraint/type

**Output:**
```
Column: allegations.status
  Constraint: CHECK (status IN ('open', 'investigating', 'resolved', 'dismissed'))
  Write paths found: 4
    ✓ api/src/routes/allegations.ts:142 — uses AllegationStatus enum
    ✓ api/src/routes/allegations.ts:198 — uses AllegationStatus enum
    ✗ api/src/services/import.ts:67 — hardcoded string "active" (NOT in CHECK constraint)
    ✓ api/src/services/bulk.ts:34 — uses AllegationStatus enum
  VERDICT: FAIL — 1 write path uses value not in CHECK constraint
```

**This is the core check.** This is what would have caught the CHECK constraint incident.

#### Check 3: Enum Coverage

**What:** For every CHECK constraint on a string column, verify there is a matching TypeScript enum, and every value in the CHECK appears in the enum (and vice versa).

**How:**
1. Extract CHECK constraint values from migration SQL
2. Find the corresponding TypeScript enum (grep for `enum TableColumn` or `type TableColumn =`)
3. Compare value sets bidirectionally

**Output:**
```
Column: allegations.status
  DB CHECK values: ['open', 'investigating', 'resolved', 'dismissed']
  TS enum values:  ['open', 'investigating', 'resolved']
  VERDICT: FAIL — DB allows 'dismissed' but TS enum does not include it
```

**Also checks the inverse:** If a TS enum was updated but the CHECK constraint was not (or no CHECK exists), that's a FAIL.

#### Check 4: FK Safety

**What:** For every FK constraint added or modified, verify:
- The referenced table/column exists
- The referenced column has a compatible type
- If the table has multiple ID sources (the CLAUDE.md "UNION validation" rule), the FK uses a UNION approach or is documented as intentionally single-source

**How:**
1. Parse FK definitions from migration SQL
2. Check referenced tables exist in the schema
3. If the referencing table is known to have multiple ID sources (check for UNION patterns or comments), flag single-source FKs as WARN

**Output:**
```
FK: findings.allegation_id → allegations.id
  Referenced table exists: ✓
  Type compatible: ✓
  Multiple ID sources: allegations has ConsolidatedAllegations — WARN: verify UNION validation
```

#### Check 5: Rollback Plan

**What:** Verify a rollback strategy exists for the migration.

**How:**
1. Check if a corresponding `down` migration file exists (for frameworks that support it)
2. For Prisma: check if `prisma migrate` can generate a rollback
3. For raw SQL: check if the migration file or a companion file contains rollback SQL (`DROP COLUMN`, `ALTER TABLE ... DROP CONSTRAINT`, etc.)
4. For destructive operations (DROP COLUMN, DROP TABLE, type narrowing), verify data preservation strategy

**Output:**
```
Migration: 20260402_add_status_check.sql
  Rollback file: NOT FOUND
  Destructive operations: ALTER COLUMN (type change)
  VERDICT: FAIL — no rollback strategy for destructive type change
```

**Acceptable rollback strategies:**
- Companion rollback SQL file
- Documented manual rollback steps in migration comments
- For additive-only migrations (ADD COLUMN, ADD INDEX): rollback is "drop the thing" — auto-PASS

#### Check 6: Post-Migration Checklist

**What:** Verify the CLAUDE.md post-migration requirements are met.

**Checks:**
- `columns.ts` regenerated? (For LexForge: check if `api/src/schema/columns.ts` was modified in the same diff)
- New enum columns have both TS enum AND CHECK constraint?
- Boolean columns use BIT type, not nvarchar?
- No raw column name strings in new code? (All references via `Cols.Table.column`)

**Output:**
```
  columns.ts updated: ✓ (modified in this diff)
  New enum columns with CHECK + TS enum: ✓
  Boolean columns use BIT: ✓
  No raw column strings: ✗ — api/src/routes/new-endpoint.ts:45 uses "status" instead of Cols.Allegations.status
  VERDICT: WARN — 1 raw column string found
```

---

## Audit Report Format

The skill produces a structured report:

```
═══════════════════════════════════════════
  DATABASE MIGRATION REVIEW
  Migration: 20260402_add_status_check.sql
  Reviewed: 2026-04-02T14:30:00Z
═══════════════════════════════════════════

SUMMARY: 2 FAIL, 1 WARN, 3 PASS

  ✗ FAIL  Write Path Audit — 1 write path uses value not in CHECK constraint
  ✗ FAIL  Rollback Plan — no rollback for destructive type change
  ⚠ WARN  FK Safety — verify UNION validation for multi-source table
  ✓ PASS  Schema Change Inventory
  ✓ PASS  Enum Coverage
  ✓ PASS  Post-Migration Checklist

═══════════════════════════════════════════

DETAILS:
[each check's full output as shown above]

REQUIRED ACTIONS:
  1. Fix api/src/services/import.ts:67 — replace hardcoded "active" with AllegationStatus enum value
  2. Add rollback SQL for the type change in allegations.status
```

### Verdict Logic

- **Any FAIL → overall FAIL.** Migration should not be deployed until resolved.
- **Only WARN + PASS → overall WARN.** Migration can proceed but findings should be reviewed.
- **All PASS → overall PASS.** Migration is safe to deploy.

---

## DB Platform Handling

The agent must handle different migration patterns per project:

| Project | DB | Migration Format | Schema Management | Column Typing |
|---------|-----|-----------------|-------------------|---------------|
| LexForge | Azure SQL | Raw SQL files | `columns.ts` via codegen | `Cols.Table.column` |
| TruthAndTone | Render Postgres | Prisma migrations | `schema.prisma` | Prisma client types |
| Agency | Render Postgres | Raw SQL or Prisma | Varies | Varies |

The skill auto-detects the project type from:
1. Presence of `prisma/schema.prisma` → Prisma mode
2. Presence of `api/src/schema/columns.ts` → LexForge mode
3. Fallback: raw SQL analysis mode

---

## Integration Points

### 1. Developer Workflow (Local)

```
Developer writes migration
  → hookify rule warns on commit
  → developer runs /review-migration
  → fixes issues
  → commits with clean audit
```

### 2. PR Review (CI)

Future enhancement: run the skill as part of PR review. When a PR contains migration files, the code-reviewer agent should automatically invoke the migration review checks. This ensures migrations can't merge without audit even if the developer skipped the local review.

**Not in v1** — requires the code-reviewer agent to be migration-aware.

### 3. Pre-Deploy Gate (Future)

The strongest enforcement: a CI/CD step that runs the migration reviewer and blocks deployment on FAIL. This is the ideal end state but requires:
- CI integration (GitHub Actions or Azure DevOps)
- The skill running headlessly (no interactive prompts)
- Clear exit codes (0 for PASS, 1 for FAIL)

**Not in v1** — but the skill's output format is designed to support this.

---

## Implementation Components

### Files to Create

1. **Hookify rule:** `~/.claude/hooks/migration-guard.md` (or via `/hookify:configure`)
   - Pattern: migration file globs
   - Action: warning with checklist

2. **Skill definition:** `skills/review-migration/SKILL.md`
   - Trigger: `/review-migration` command
   - Entry point: launches the migration reviewer agent

3. **Agent definition:** `agents/migration-reviewer.md`
   - The specialized agent that performs the 6-check audit
   - Tools: Glob, Grep, Read, Bash (for git operations)
   - No write tools — this agent is read-only by design

### Agent Capabilities Required

The migration reviewer agent needs:
- **Glob** — find migration files, schema files, columns.ts
- **Grep** — search all write paths, find enum definitions, locate CHECK constraints
- **Read** — read migration SQL, TypeScript files, Prisma schema
- **Bash** — git diff, git show (for comparing schema versions)

It does NOT need Edit, Write, or any destructive tools. It is an auditor, not a fixer.

---

## Edge Cases

### Migration with no code changes
A migration that only adds an index or changes a default value may have no associated code changes. The write path audit should detect this and auto-PASS (no write paths to verify).

### Multiple migrations in one PR
The skill should handle multiple migration files. Each gets its own audit section in the report. Shared findings (e.g., columns.ts not regenerated) are reported once.

### Prisma migrations (auto-generated SQL)
Prisma generates SQL from schema changes. The agent should audit the schema.prisma diff (what the developer wrote) AND the generated SQL (what will actually run). Divergence between intent and execution is a finding.

### Backfill migrations
Migrations that backfill data (UPDATE existing rows) need special attention:
- Is the backfill idempotent? (Can it run twice safely?)
- Does it handle NULL values?
- Is there a row count estimate? (Will it lock the table?)
- Is it wrapped in a transaction?

The agent flags data-modifying statements and checks for these patterns.

---

## Success Criteria

The agent is successful if:

1. **No migration ships without audit.** The hookify rule ensures developers are reminded; the skill ensures the review is thorough.
2. **The CHECK constraint incident cannot recur.** Specifically: any migration that adds/modifies a CHECK constraint triggers a write-path audit that catches hardcoded strings not in the constraint.
3. **Enum divergence is caught before deploy.** TS enum values and DB CHECK constraint values are verified bidirectionally.
4. **Rollback plans exist for destructive changes.** No column drops, type changes, or constraint removals ship without documented rollback.
5. **The audit takes < 60 seconds.** Fast enough that developers actually run it.

---

## What This Agent Does NOT Do

- **Fix issues.** It reports findings. The developer (or another agent) fixes them.
- **Block commits.** It warns. The developer decides. (Future: CI can hard-block.)
- **Design schemas.** It audits migrations against existing code, not architectural decisions.
- **Run migrations.** It reviews them. Execution is a separate concern.
- **Replace manual review.** It augments it. Complex migrations still need human judgment.
