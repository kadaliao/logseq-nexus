# Search Strategy Decision

## Summary

Primary search uses DataScript queries via the Logseq DB API to search block content and page names across supported versions. This is the only documented, supported API surface for search-like behavior in Phase 2.

## Primary Method

- Method: DataScript query-based search using `logseq.DB.datascriptQuery` or `logseq.DB.q`.
- Scope: search `:block/content` and `:block/name` (page titles).
- Rationale: DB APIs are documented and available across supported versions; avoids undocumented UI search behavior.

## Fallback Rules

1. If DataScript query fails or returns errors, prompt for index rebuild and retry; if still failing, fall back to page-title-only search using `logseq.Editor.getAllPages`.
2. If graph size or performance issues occur, limit to page-title-only search and surface a warning that full-text search is unavailable.
3. If a documented search API becomes available in the Logseq plugin API, prefer it and update this decision in the log.

## Version Coverage

- Supported versions: 0.10.15, 0.10.14, 0.10.13.
- Out-of-scope versions: 0.10.12 and earlier; nightly/pre-release builds.

## Decision Log

- 2026-02-04: Primary DataScript query search selected; fallback rules defined for errors/performance and future documented search API.

## References

- `specs/002-logseq-compatibility-matrix/research.md` (Decision 4)
- https://logseq.github.io/plugins/interfaces/IDBProxy.html
- https://logseq.github.io/plugins/interfaces/IEditorProxy.html
