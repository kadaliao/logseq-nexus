# Feature Specification: Logseq Compatibility Matrix (Phase 2)

**Feature Branch**: `002-logseq-compatibility-matrix`  
**Created**: 2026-02-04  
**Status**: Draft  
**Input**: User description: "根据 docs/dev-phases.md 开发第二阶段"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Determine Version Compatibility (Priority: P1)

As a plugin maintainer or contributor, I need a compatibility matrix that shows which Logseq versions support creating, viewing, editing, and deleting blocks; advanced queries; and search so I can plan features and avoid breaking users.

**Why this priority**: All subsequent phases depend on knowing which versions and capabilities are safe to target.

**Independent Test**: Given any supported version, the matrix shows a clear status for each capability area with notes.

**Acceptance Scenarios**:

1. **Given** a supported Logseq version, **When** I view the matrix, **Then** I can see status labels for block operations, advanced queries, and search plus any relevant notes.
2. **Given** a version outside the supported set, **When** I check the matrix, **Then** it is explicitly marked as out of scope or unsupported.

---

### User Story 2 - Choose Search Strategy (Priority: P2)

As a developer, I need a documented decision on the primary search capability and fallback rules so I can implement consistent search behavior across versions.

**Why this priority**: Search behavior is central to user experience and affects multiple future capabilities.

**Independent Test**: The decision document specifies a primary search method and fallback conditions that cover all supported versions.

**Acceptance Scenarios**:

1. **Given** the decision document, **When** I review it, **Then** I can identify the primary search method, fallback conditions, and rationale for each supported-version category.

---

### User Story 3 - Surface Compatibility Gaps (Priority: P3)

As a product lead or QA reviewer, I need known gaps and risks summarized so I can adjust the roadmap and testing plans.

**Why this priority**: Clear gaps and risks prevent late-stage surprises in Phase 3+ planning.

**Independent Test**: Using only the matrix and decision artifacts, a reviewer can list all known gaps and required follow-ups.

**Acceptance Scenarios**:

1. **Given** the artifacts, **When** I compile Phase 3 prerequisites, **Then** all gaps, limitations, and follow-up actions are explicitly listed.

---

### Edge Cases

- A version advertises a capability but behavior is partial or inconsistent.
- Search capability exists but returns different results across versions.
- Documentation conflicts with observed behavior.
- A new Logseq version is released after the matrix is created.
- A stakeholder asks about a version not in the supported set.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST define the supported Logseq version set for this phase and include each version in the compatibility matrix; acceptance: every supported version has a dedicated entry.
- **FR-002**: System MUST assess the ability to create, view, edit, and delete blocks for each supported version and record status as supported/partial/unsupported with evidence notes; acceptance: each version has a status label and note.
- **FR-003**: System MUST assess advanced query capability for each supported version and record status as supported/partial/unsupported with evidence notes; acceptance: each version has a status label and note.
- **FR-004**: System MUST evaluate the built-in search capability versus an advanced-query fallback and document a primary strategy plus fallback rules that cover all supported versions; acceptance: no supported version lacks a defined strategy.
- **FR-005**: System MUST define and use consistent status labels and terminology across the matrix and decision document; acceptance: a spot-check finds no conflicting labels.
- **FR-006**: System MUST document known gaps, limitations, and follow-up actions for any version or capability that is not fully supported; acceptance: gaps are enumerated with impact notes.
- **FR-007**: Users MUST be able to locate the compatibility status for any supported version using the artifacts without external references; acceptance: a reviewer can find the answer within 60 seconds.

### UX Consistency Requirements

- **UX-001**: Capability names, version labels, and status terminology MUST be consistent with existing project documentation.
- **UX-002**: Status labels MUST be human-readable and used consistently in both the matrix and decision document.
- **UX-003**: Any change to compatibility assumptions MUST be recorded in the decision log and referenced from the matrix.

### Performance Requirements

- **PR-001**: A reviewer MUST be able to determine compatibility status for a target version within 60 seconds using the provided artifacts.
- **PR-002**: Measurement plan: run a timed walkthrough for at least three target versions to verify the 60-second lookup goal.

### Key Entities *(include if feature involves data)*

- **Logseq Version**: A version identifier and its support scope.
- **Capability Area**: A user-visible capability (block operations, advanced queries, search) and its status label.
- **Compatibility Matrix Entry**: The intersection of a version and capability with status and notes.
- **Search Strategy Decision**: The primary method, fallback conditions, and rationale for search.
- **Evidence Note**: A concise record of how a status was verified.

### Assumptions

- Supported versions are the latest stable release plus the previous two minor releases at the time of discovery, unless a project support policy states otherwise.
- Verification relies on available Logseq releases and public documentation; no vendor-specific support is required.
- This phase produces discovery artifacts only and does not implement compatibility fixes.
- No upstream phase dependencies are required beyond access to Phase 1 documentation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of supported versions have documented status for block operations, advanced queries, and search in the matrix.
- **SC-002**: A reviewer can identify compatibility for any supported version in 60 seconds or less in a timed walkthrough.
- **SC-003**: A single search strategy with explicit fallback rules is documented and applies to all supported versions with no unresolved questions.
- **SC-004**: At least three stakeholders (dev, QA, product) confirm the artifacts are sufficient to plan Phase 3 without additional discovery.
- **SC-005**: All known gaps and follow-up actions are enumerated, and zero critical unknowns remain for Phase 3 planning.
