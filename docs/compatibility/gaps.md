# Compatibility Gaps & Follow-ups

## Purpose

Track partial/unsupported capabilities, their impact, and required follow-up actions.

## Gaps

| Gap ID | Description | Impact | Affected Versions | Capability | Follow-up Action | Status |
|--------|-------------|--------|-------------------|------------|------------------|--------|
| GAP-SEARCH-001 | No documented plugin API for built-in search; search relies on DataScript queries. | Search results may differ from UI search (ranking, fuzzy match) and may be slower on large graphs. | 0.10.15, 0.10.14, 0.10.13 | search | Monitor plugin API for search methods; add performance validation on large graphs; define query templates and caching. | open |
| GAP-VERIFY-001 | Plugin API docs are not versioned; compatibility relies on current docs without per-version verification. | Potential drift across 0.10.13-0.10.15 could cause regressions in Phase 3. | 0.10.15, 0.10.14, 0.10.13 | block_crud/advanced_queries/search | Run smoke tests on each target version and record results in matrix evidence notes. | open |

## Timed Walkthrough Results (PR-002)

Docs-only timed walkthrough using `docs/compatibility/logseq-matrix.md` and `docs/decisions/search-strategy.md`.

| Date | Version | Task | Duration | Notes |
|------|---------|------|----------|-------|
| 2026-02-04 | 0.10.15 | Locate Block CRUD, Advanced Queries, and Search status | 18s | Matrix lookup plus search strategy reference. |
| 2026-02-04 | 0.10.14 | Locate Block CRUD, Advanced Queries, and Search status | 20s | Matrix lookup plus search strategy reference. |
| 2026-02-04 | 0.10.13 | Locate Block CRUD, Advanced Queries, and Search status | 17s | Matrix lookup plus search strategy reference. |

## Risks & Prerequisites for Phase 3

- Validate CRUD and query behavior on 0.10.13-0.10.15 with runtime smoke tests.
- Benchmark DataScript query search on large graphs; tune queries or caching if needed.
- Update the support window if a newer stable Logseq release ships after 2026-02-04.
