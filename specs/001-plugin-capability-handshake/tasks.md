---

description: "Task list template for feature implementation"
---

# Tasks: Plugin Connection and Capabilities

**Input**: Design documents from `/Volumes/Data-External/workspace/logseq-nexus/specs/001-plugin-capability-handshake/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are REQUIRED for production changes unless explicitly waived in the feature specification with rationale.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Phase 1 Scope**: This task list covers Setup, Foundational, and User Story 1 only.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1)
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

## Dependencies & Execution Order
### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS User Story 1
- **User Story 1 (Phase 3)**: Starts after Foundational completes

### Within User Story 1

- Tests MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Verify tests fail before implementing
