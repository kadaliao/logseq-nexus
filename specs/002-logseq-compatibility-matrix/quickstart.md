# Quickstart: Logseq Compatibility Matrix (Phase 2)

## Purpose

This phase produces discovery artifacts that let maintainers determine Logseq capability support by version and choose a search strategy with documented fallback rules.

## Artifacts (this spec)

- `/Volumes/Data-External/workspace/logseq-nexus/specs/002-logseq-compatibility-matrix/research.md`
- `/Volumes/Data-External/workspace/logseq-nexus/specs/002-logseq-compatibility-matrix/data-model.md`
- `/Volumes/Data-External/workspace/logseq-nexus/specs/002-logseq-compatibility-matrix/contracts/compatibility-api.yaml`
- `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- `/Volumes/Data-External/workspace/logseq-nexus/docs/decisions/search-strategy.md`
- `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/gaps.md`

## How to Use

1. **Confirm supported versions**
   - See Decision 1 in `research.md` for the current supported set.

2. **Populate the compatibility matrix**
   - Use `data-model.md` to structure the matrix: one entry per version × capability area.
   - Apply status labels (Supported / Partial / Unsupported) with evidence notes.
   - Record the matrix in `docs/compatibility/logseq-matrix.md`.

3. **Document the search strategy**
   - Follow the SearchStrategyDecision model and Decision 4 in `research.md`.
   - Record primary method, fallback rules, and rationale for each supported version.
   - Use `docs/decisions/search-strategy.md` for the decision record.

4. **Capture gaps and follow-ups**
   - For any Partial/Unsupported entry, add a Gap item with impact and next steps.
   - Track gaps in `docs/compatibility/gaps.md`.

## Validation (Performance Requirement PR-002)

- Run a timed walkthrough for at least three target versions.
- Goal: determine compatibility status within **60 seconds** per version.
- Record the timing and any friction in the gaps log.
- Results recorded in `docs/compatibility/gaps.md` on 2026-02-04 (docs-only walkthrough); all timings under 60 seconds.

## Status Labels

- **Supported**: capability is available and documented via supported APIs.
- **Partial**: capability is available with limitations or workarounds.
- **Unsupported**: capability is not available via supported APIs.
- **Out of Scope**: version not in the supported set for Phase 2.
