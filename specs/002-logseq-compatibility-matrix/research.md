# Phase 0 Research: Logseq Compatibility Matrix

Date: 2026-02-04

## Decision 1: Supported Logseq versions for Phase 2

- Decision: Support Logseq 0.10.15 (latest stable) plus 0.10.14 and 0.10.13 as the prior two minor releases.
- Rationale: Aligns with the spec assumption (latest stable + previous two minors) and current public release cadence.
- Alternatives considered:
  - Include nightly builds: rejected due to instability and verification cost.
  - Include older minors (<=0.10.12): rejected to keep Phase 2 scope bounded.

## Decision 2: Block CRUD capability assessment approach

- Decision: Use Logseq plugin API `logseq.Editor` block operations (get/insert/update/remove/move) as the evidence basis for block CRUD support.
- Rationale: The Editor API explicitly exposes block CRUD primitives and is the supported integration surface for plugins.
- Alternatives considered:
  - Direct DB access: rejected as unsupported and risks data corruption.
  - UI automation: rejected due to fragility and non-determinism.

## Decision 3: Advanced query capability assessment approach

- Decision: Use `logseq.DB.datascriptQuery` and `logseq.DB.q` as the basis for advanced query support.
- Rationale: The DB API exposes DataScript query entry points suitable for advanced querying across versions.
- Alternatives considered:
  - File-based parsing: rejected due to format variability and poor performance.

## Decision 4: Search strategy (primary + fallback)

- Decision: Primary search method is DataScript query-based search across blocks/pages; fallback is built-in search only if a stable, supported search API is exposed in the plugin API in a future release.
- Rationale: The plugin API does not currently provide a documented method to invoke built-in search; DataScript provides a supported, queryable alternative.
- Alternatives considered:
  - Internal store access (undocumented): rejected due to instability across versions.
  - UI-driven search automation: rejected due to fragility.

## Decision 5: Status labels and evidence notes

- Decision: Standard status labels are **Supported**, **Partial**, and **Unsupported**. Out-of-scope versions are labeled **Out of Scope**. Every matrix entry includes an evidence note (doc-based in Phase 2).
- Rationale: Aligns with spec FR-005 and UX consistency requirements for human-readable, consistent labels.
- Alternatives considered:
  - More granular labels (e.g., “Experimental”): rejected to keep the matrix concise for Phase 2.

## Sources

- Logseq releases (latest stable + prior minors)
- Logseq plugin API docs (Editor, DB, and App APIs)

