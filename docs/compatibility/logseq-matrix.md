# Logseq Compatibility Matrix

## Purpose

Track Logseq version compatibility for block CRUD, advanced queries, and search.

## Supported Versions and Scope Policy

- Policy: latest stable release plus the previous two minor releases as of 2026-02-04.
- Supported versions: 0.10.15, 0.10.14, 0.10.13.
- Out-of-scope versions are listed separately and are not included as matrix entries.

## Capability Areas

- `block_crud` (Block CRUD): create, view, edit, and delete blocks.
- `advanced_queries` (Advanced Queries): DataScript queries via Logseq DB APIs.
- `search` (Search): user-facing search capability across blocks/pages.

## Status Labels

- **Supported**: capability is available via documented plugin APIs with no known limitations.
- **Partial**: capability is available but limited, inconsistent, or requires workarounds.
- **Unsupported**: capability is not available via supported APIs.
- **Out of Scope**: version is not in the supported set for this phase (listed separately).

## Matrix

| Logseq Version | Block CRUD | Advanced Queries | Search | Gap IDs | Evidence Notes |
|---------------|------------|------------------|--------|---------|----------------|
| 0.10.15 (2025-12-01) | Supported | Supported | Partial | GAP-SEARCH-001 | E-EDITOR, E-DB, E-REL-1015 |
| 0.10.14 (2025-09-18) | Supported | Supported | Partial | GAP-SEARCH-001 | E-EDITOR, E-DB, E-REL-1014 |
| 0.10.13 (2025-08-07) | Supported | Supported | Partial | GAP-SEARCH-001 | E-EDITOR, E-DB, E-REL-1013 |

## Search Strategy

- Decision document: `docs/decisions/search-strategy.md`

## Decision Log

- 2026-02-04: Documented primary search method (DataScript query) and fallback rules in `docs/decisions/search-strategy.md`.

## Out-of-Scope Versions

- 0.10.12 and earlier (older than support window as of 2026-02-04)
- Nightly/pre-release builds (not covered in Phase 2)

## Evidence Notes

- **E-EDITOR**: Source type: `doc`. Detail: `logseq.Editor` provides `getBlock`, `insertBlock`, `updateBlock`, `removeBlock` for block CRUD. Link: https://logseq.github.io/plugins/interfaces/IEditorProxy.html. Last verified: 2026-02-04.
- **E-DB**: Source type: `doc`. Detail: `logseq.DB` provides `datascriptQuery` and `q` for DataScript queries. Link: https://logseq.github.io/plugins/interfaces/IDBProxy.html. Last verified: 2026-02-04.
- **E-REL-1015**: Source type: `doc`. Detail: Logseq 0.10.15 release listing shows release date 2025-12-01. Link: https://github.com/logseq/logseq/releases. Last verified: 2026-02-04.
- **E-REL-1014**: Source type: `doc`. Detail: Logseq 0.10.14 release listing shows release date 2025-09-18. Link: https://github.com/logseq/logseq/releases. Last verified: 2026-02-04.
- **E-REL-1013**: Source type: `doc`. Detail: Logseq 0.10.13 release listing shows release date 2025-08-07. Link: https://github.com/logseq/logseq/releases. Last verified: 2026-02-04.

## Evidence Notes Format

- Source type: `doc` | `test` | `observation`
- Detail: short summary of the evidence
- Link: optional URL or citation
- Last verified: ISO date (YYYY-MM-DD)

## Validation

- 2026-02-04: Status label consistency check completed across the matrix, search strategy decision, and gaps log.
