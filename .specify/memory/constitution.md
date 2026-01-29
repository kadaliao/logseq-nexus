<!--
Sync Impact Report
Version change: N/A (template) -> 1.0.0
Modified principles: placeholder -> I. Code Quality Is Non-Negotiable; placeholder ->
II. Testing Is Mandatory; placeholder -> III. Consistent User Experience & Contract;
placeholder -> IV. Performance Budgets & Regression Prevention
Added sections: Quality, Testing, UX, and Performance Standards; Development Workflow & Review
Removed sections: Principle 5 placeholder section
Templates requiring updates:
- .specify/templates/plan-template.md ✅ updated
- .specify/templates/spec-template.md ✅ updated
- .specify/templates/tasks-template.md ✅ updated
Follow-up TODOs: None
-->
# Logseq Nexus Constitution

## Core Principles

### I. Code Quality Is Non-Negotiable
- Production code MUST pass formatting and linting with zero warnings.
- Public interfaces (MCP tools, plugin RPC, config) MUST be documented in SKILL.md or
  relevant specs and kept in sync with implementation.
- Changes MUST reduce or avoid duplication; refactor when a change would introduce
  parallel logic or unclear ownership.
Rationale: The Skill is a long-lived contract; maintainability and clarity prevent
silent failures and regressions.

### II. Testing Is Mandatory
- Every behavior change MUST include tests that prove the new behavior and guard
  against regressions.
- Bug fixes MUST include a regression test that fails before the fix and passes after.
- Contract or protocol changes MUST include integration or contract tests that exercise
  the end-to-end path.
- Tests MUST be deterministic and runnable locally and in CI.
Rationale: The Skill interacts with external systems and automation; tests are the
primary safety net.

### III. Consistent User Experience & Contract
- Tool names, parameters, error codes, and response shapes MUST remain consistent and
  predictable across releases.
- Any user-visible change MUST update documentation, examples, and versioning notes.
- Breaking changes require a major version bump and a migration path.
Rationale: Users and AI agents rely on stable contracts to automate safely.

### IV. Performance Budgets & Regression Prevention
- Each feature MUST declare performance budgets (latency, throughput, memory, startup)
  in the spec or plan.
- Changes affecting performance MUST include measurements or benchmarks tied to those
  budgets.
- Regressions beyond agreed budgets MUST be fixed or explicitly waived with rationale.
Rationale: The Skill is expected to run locally and remain responsive under real use.

## Quality, Testing, UX, and Performance Standards

- Definition of Done includes: lint/format clean, required tests passing, docs updated,
  and performance budgets validated.
- User-visible outputs (errors, logs, responses) MUST use consistent wording and
  machine-readable structures where applicable.
- Performance budgets are established in plan.md and validated in tasks.md or CI.

## Development Workflow & Review

- Every feature MUST have a spec and plan before implementation begins.
- Code review MUST confirm compliance with the Core Principles and the spec.
- CI MUST run linting and all required tests before merge.
- Exceptions require written rationale in the spec or plan and explicit approval.

## Governance

- This constitution supersedes other guidance; conflicts must be resolved in favor of it.
- Amendments require a documented rationale, impact analysis, and version bump.
- Versioning follows semantic versioning: MAJOR for breaking changes, MINOR for new
  principles or material expansions, PATCH for clarifications.
- Compliance review is required for every plan, spec, and PR.
- Runtime development guidance lives in SPEC.md and must remain consistent with this
  constitution.

**Version**: 1.0.0 | **Ratified**: 2026-01-28 | **Last Amended**: 2026-01-28
