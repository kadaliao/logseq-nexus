---

description: "Task list template for feature implementation"
---

# Tasks: Plugin Connection and Capabilities

**Input**: Design documents from `/Volumes/Data-External/workspace/logseq-nexus/specs/001-plugin-capability-handshake/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are REQUIRED for production changes unless explicitly waived in the feature specification with rationale.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Multi-project**: `plugin/` for Logseq TS plugin, `mcp-server/` for Rust runtime
- Paths shown below assume this structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `plugin/` and `mcp-server/` directories per implementation plan
- [x] T002 Initialize TypeScript plugin project in `plugin/` with build config
- [x] T003 Initialize Rust crate in `mcp-server/` with workspace config
- [x] T004 [P] Configure formatting/linting for `plugin/` (e.g., ESLint/Prettier)
- [x] T005 [P] Configure formatting/linting for `mcp-server/` (rustfmt/clippy)
- [x] T006 [P] Add shared protocol schema doc in `docs/protocol/handshake.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Implement shared JSON-RPC message types in `plugin/src/protocol/messages.ts`
- [x] T008 Implement shared JSON-RPC message types in `mcp-server/src/protocol/messages.rs`
- [x] T009 Implement local auth token loading in `plugin/src/auth/token.ts`
- [x] T010 Implement local auth token validation in `mcp-server/src/auth/token.rs`
- [x] T011 [P] Add unit tests for auth token handling in `plugin/tests/unit/token.test.ts`
- [x] T012 [P] Add unit tests for auth token handling in `mcp-server/tests/unit/token_test.rs`
- [x] T013 Create connection state model in `plugin/src/state/connection.ts`
- [x] T014 Create capability data model in `mcp-server/src/state/capabilities.rs`
- [x] T015 [P] Add shared error codes mapping in `plugin/src/protocol/errors.ts`
- [x] T016 [P] Add shared error codes mapping in `mcp-server/src/protocol/errors.rs`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Automatic Ready State (Priority: P1) 🎯 MVP

**Goal**: Plugin reaches Ready automatically with authenticated handshake

**Independent Test**: Start Logseq + runtime locally and confirm Ready within 5 seconds

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T017 [P] [US1] Contract test for hello handshake in `mcp-server/tests/contract/hello_handshake_test.rs`
- [x] T018 [P] [US1] Integration test for Ready state in `plugin/tests/integration/ready_state.test.ts`

### Implementation for User Story 1

- [x] T019 [P] [US1] Implement plugin WS connection bootstrap in `plugin/src/runtime/connection.ts`
- [x] T020 [P] [US1] Implement runtime WS server acceptor in `mcp-server/src/runtime/server.rs`
- [x] T021 [US1] Implement hello request/ack flow in `plugin/src/runtime/handshake.ts`
- [x] T022 [US1] Implement hello request/ack handling in `mcp-server/src/runtime/handshake.rs`
- [x] T023 [US1] Wire Ready state transition in `plugin/src/state/connection.ts`

**Checkpoint**: User Story 1 fully functional and testable independently

---

## Phase 4: User Story 2 - Capability Awareness (Priority: P2)

**Goal**: Accurate capability list reported and refreshable

**Independent Test**: Request capabilities and confirm list matches current environment

### Tests for User Story 2 ⚠️

- [x] T024 [P] [US2] Contract test for capability refresh in `mcp-server/tests/contract/capability_refresh_test.rs`
- [x] T025 [P] [US2] Unit test for capability uniqueness in `mcp-server/tests/unit/capability_list_test.rs`

### Implementation for User Story 2

- [x] T026 [P] [US2] Implement capability detection in `plugin/src/runtime/capabilities.ts`
- [x] T027 [P] [US2] Implement capability refresh endpoint in `mcp-server/src/runtime/capabilities.rs`
- [x] T028 [US2] Enforce (ID + version) uniqueness in `mcp-server/src/state/capabilities.rs`
- [x] T029 [US2] Implement plugin-side capability refresh request in `plugin/src/runtime/capabilities.ts`

**Checkpoint**: User Story 2 independently functional

---

## Phase 5: User Story 3 - Status Visibility and Recovery (Priority: P3)

**Goal**: In-plugin status panel shows connection state and recovery steps

**Independent Test**: Simulate disconnect and verify recovery guidance appears

### Tests for User Story 3 ⚠️

- [x] T030 [P] [US3] UI/unit test for status panel states in `plugin/tests/unit/status_panel.test.ts`
- [x] T031 [P] [US3] Integration test for disconnect recovery messaging in `plugin/tests/integration/recovery_flow.test.ts`

### Implementation for User Story 3

- [x] T032 [P] [US3] Build status panel UI in `plugin/src/ui/status_panel.tsx`
- [x] T033 [US3] Bind connection state to UI in `plugin/src/ui/status_panel.tsx`
- [x] T034 [US3] Populate recovery steps in `plugin/src/state/connection.ts`

**Checkpoint**: All user stories independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T035 [P] Documentation updates in `docs/` (handshake, auth, capability rules)
- [x] T036 Code cleanup and refactoring in `plugin/src/` and `mcp-server/src/`
- [x] T037 Performance measurement to validate Ready/capability/recovery budgets in `docs/perf/handshake.md`
- [x] T038 [P] Additional unit tests (if needed) in `plugin/tests/unit/` and `mcp-server/tests/unit/`
- [x] T039 Security hardening review in `docs/security/handshake.md`
- [x] T040 Run quickstart validation in `specs/001-plugin-capability-handshake/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Contract test for hello handshake in mcp-server/tests/contract/hello_handshake_test.rs"
Task: "Integration test for Ready state in plugin/tests/integration/ready_state.test.ts"

# Launch WS connection tasks together:
Task: "Implement plugin WS connection bootstrap in plugin/src/runtime/connection.ts"
Task: "Implement runtime WS server acceptor in mcp-server/src/runtime/server.rs"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
