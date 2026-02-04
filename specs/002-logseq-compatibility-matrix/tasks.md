---

description: "Task list for Logseq Compatibility Matrix (Phase 2)"
---

# Tasks: Logseq Compatibility Matrix (Phase 2)

**Input**: Design documents from `/Volumes/Data-External/workspace/logseq-nexus/specs/002-logseq-compatibility-matrix/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not requested in the feature specification; validation uses documented independent tests and timed walkthroughs.

**Organization**: Tasks are grouped by user story to enable independent implementation and review of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish documentation locations and baseline templates

- [X] T001 Create documentation directories at `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/` and `/Volumes/Data-External/workspace/logseq-nexus/docs/decisions/`
- [X] T002 Create compatibility matrix skeleton with table headers and legend in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T003 [P] Create search strategy decision template in `/Volumes/Data-External/workspace/logseq-nexus/docs/decisions/search-strategy.md`
- [X] T004 [P] Create gaps log template aligned to Gap entity fields in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/gaps.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define shared assumptions and shared structures used by all stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Define supported versions (0.10.15, 0.10.14, 0.10.13) and scope policy in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T006 Define capability areas and status label definitions (Supported/Partial/Unsupported/Out of Scope) in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T007 Add evidence note format and source types in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T008 Align schema fields and status labels with artifacts in `/Volumes/Data-External/workspace/logseq-nexus/specs/002-logseq-compatibility-matrix/contracts/compatibility-api.yaml`
- [X] T009 Update artifact references in `/Volumes/Data-External/workspace/logseq-nexus/specs/002-logseq-compatibility-matrix/quickstart.md` to include new docs paths

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Determine Version Compatibility (Priority: P1) 🎯 MVP

**Goal**: Deliver a complete compatibility matrix across supported versions and capability areas.

**Independent Test**: Given any supported version, the matrix shows a clear status for each capability area with notes.

### Implementation for User Story 1

- [X] T010 [US1] Populate version rows and capability columns in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T011 [US1] Document block CRUD status + evidence notes for each supported version in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T012 [US1] Document advanced query status + evidence notes for each supported version in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T013 [US1] Document search status + evidence notes for each supported version in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T014 [US1] Add out-of-scope handling notes and examples in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T015 [US1] Add evidence source links/notes (plugin API docs + release references) in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`

**Checkpoint**: User Story 1 is fully documented and independently reviewable

---

## Phase 4: User Story 2 - Choose Search Strategy (Priority: P2)

**Goal**: Provide a decision document for search behavior with explicit fallback rules across versions.

**Independent Test**: The decision document specifies a primary search method and fallback conditions that cover all supported versions.

### Implementation for User Story 2

- [X] T016 [P] [US2] Draft primary search method and rationale in `/Volumes/Data-External/workspace/logseq-nexus/docs/decisions/search-strategy.md`
- [X] T017 [P] [US2] Add search-strategy link placeholder and decision-log section in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T018 [US2] Define fallback rules and version coverage in `/Volumes/Data-External/workspace/logseq-nexus/docs/decisions/search-strategy.md`
- [X] T019 [US2] Add decision log entry and research references in `/Volumes/Data-External/workspace/logseq-nexus/docs/decisions/search-strategy.md`
- [X] T020 [US2] Replace matrix placeholder with final link to decision section in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`

**Checkpoint**: User Story 2 is independently reviewable and linked from the matrix

---

## Phase 5: User Story 3 - Surface Compatibility Gaps (Priority: P3)

**Goal**: Summarize gaps, risks, and follow-up actions for partial/unsupported capabilities.

**Independent Test**: Using only the matrix and decision artifacts, a reviewer can list all known gaps and required follow-ups.

### Implementation for User Story 3

- [X] T021 [P] [US3] Add gap-reference column and placeholder IDs in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T022 [P] [US3] Add gaps list structure with placeholder IDs in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/gaps.md`
- [X] T023 [US3] Populate gaps list with impact and follow-up actions in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/gaps.md`
- [X] T024 [US3] Replace matrix placeholders with final gap IDs in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T025 [US3] Summarize Phase 3 prerequisites and risks in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/gaps.md`

**Checkpoint**: Gaps and follow-ups are documented and traceable from the matrix

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and consistency checks across all artifacts

- [X] T026 Record PR-002 timed walkthrough results for three target versions in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/gaps.md`
- [X] T027 Validate status label consistency across matrix and decision doc; record checklist note in `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`
- [X] T028 Update quickstart validation notes in `/Volumes/Data-External/workspace/logseq-nexus/specs/002-logseq-compatibility-matrix/quickstart.md`

---

## Dependencies & Execution Order

### Dependency Graph

```
Phase 1 (Setup) -> Phase 2 (Foundational) -> {US1, US2, US3} -> Polish
```

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational; no dependencies on other stories
- **User Story 2 (P2)**: Starts after Foundational; independent of US1/US3
- **User Story 3 (P3)**: Starts after Foundational; independent of US1/US2

---

## Parallel Execution Examples

### User Story 1

No safe parallel tasks — all edits target `/Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md`.

### User Story 2

```
Task: "Draft primary search method and rationale in /Volumes/Data-External/workspace/logseq-nexus/docs/decisions/search-strategy.md"
Task: "Add search-strategy link placeholder and decision-log section in /Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md"
```

### User Story 3

```
Task: "Add gap-reference column and placeholder IDs in /Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/logseq-matrix.md"
Task: "Add gaps list structure with placeholder IDs in /Volumes/Data-External/workspace/logseq-nexus/docs/compatibility/gaps.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Independent test for US1

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Deliver US1 → validate independently
3. Deliver US2 → validate independently
4. Deliver US3 → validate independently
5. Final polish/validation
