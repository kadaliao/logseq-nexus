# Feature Specification: Plugin Connection and Capabilities

**Feature Branch**: `001-plugin-capability-handshake`  
**Created**: 2026-01-28  
**Status**: Draft  
**Input**: User description: "Enable plugin to establish a reliable connection and report capabilities to the Skill runtime"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automatic Ready State (Priority: P1)

As a user running Logseq locally, I want the plugin to reach a Ready state
automatically so I can use the Skill without manual setup steps.

**Why this priority**: Without a reliable connection, no other capability is usable.

**Independent Test**: Start Logseq with the plugin installed and confirm the
Skill becomes Ready without manual intervention.

**Acceptance Scenarios**:

1. **Given** Logseq is running with the plugin installed, **When** the user opens
   Logseq, **Then** the plugin reaches Ready state within the defined budget.
2. **Given** the runtime is temporarily unavailable, **When** it becomes
   available, **Then** the plugin connects and shows Ready without a restart.

---

### User Story 2 - Capability Awareness (Priority: P2)

As an AI agent or user, I need an accurate list of available capabilities so I
know which actions are supported in the current environment.

**Why this priority**: Capability mismatches cause failures and confusion.

**Independent Test**: Query capabilities and verify they match the current
environment and permissions.

**Acceptance Scenarios**:

1. **Given** a connected session, **When** capabilities are requested, **Then**
   the returned list reflects what is currently available.

---

### User Story 3 - Status Visibility and Recovery (Priority: P3)

As a user, I want a visible in-plugin status panel with recovery guidance when the connection fails so I can understand what to do next.
so I can understand what to do next.

**Why this priority**: Clear feedback reduces support burden and user frustration.

**Independent Test**: Simulate a disconnect and verify the UI or status surface
shows a clear, actionable message.

**Acceptance Scenarios**:

1. **Given** an active session, **When** the connection drops, **Then** the user
   sees a clear status and recovery guidance.

### Edge Cases

- Logseq starts before the runtime is available.
- The runtime becomes available after a delay.
- Capabilities change during a session (enable/disable).
- Connection drops and reconnect attempts fail repeatedly.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST establish a local connection between the plugin and
  runtime when both are available.
- **FR-002**: System MUST expose a user-visible connection state: connecting,
  ready, or error.
- **FR-003**: System MUST provide an accurate, up-to-date capability list to
  the runtime on request and on initial connection.
- **FR-004**: System MUST allow capability refresh without restarting Logseq.
- **FR-005**: System MUST provide actionable error information when connection
  or capability reporting fails.
- **FR-006**: System MUST avoid presenting capabilities that are not currently
- **FR-007**: Connection MUST require a local authorization token before accepting requests.
- **FR-008**: Capability list MUST treat uniqueness as (capability ID + version).
- **FR-009**: Connection status MUST be visible in an in-plugin panel with recovery steps.
  supported in the environment.

### UX Consistency Requirements

- **UX-001**: User-visible status messages MUST use consistent wording and
  severity labels across sessions.
- **UX-002**: Any user-visible behavior change MUST update documentation and
  examples in the Skill docs.
- **UX-003**: Errors and statuses MUST map to the same identifiers used in
  the public contract.

### Performance Requirements

- **PR-001**: Users see Ready state within 5 seconds of opening Logseq when the
  runtime is available.
- **PR-002**: Capability list is available within 2 seconds after connection.
- **PR-003**: After a transient disconnect, users see either Ready or an error
  state within 10 seconds.

### Key Entities *(include if feature involves data)*

- **Connection Session**: Current state and timestamps for the plugin-runtime
  connection.
- **Capability List**: Set of available actions uniquely identified by ID and version.
- **Status Event**: User-visible status update with message and severity.

## Clarifications

### Session 2026-01-28


- Q: Authentication for plugin-runtime connection? -> A: Require a local authorization token
- Q: Capability uniqueness rule? -> A: Unique by capability ID and version
- Q: Status surface for connection issues? -> A: In-plugin status panel with recovery steps
- Q: Availability target for Phase 1? -> A: No availability target for Phase 1; define in later phases
## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of sessions reach Ready state within 5 seconds under normal
  local conditions.
- **SC-002**: Capability list accuracy is 100% in documented test cases.
- **SC-003**: 90% of users complete initial setup without manual recovery steps.
- **SC-004**: Connection failure messages are rated clear or very clear by at
  least 80% of test users.
- **SC-005**: Recovery from transient disconnect succeeds without restart in
- **SC-006**: Phase 1 does not set an availability target; define in later phases.
  at least 90% of attempts.

## Assumptions

- Availability targets are deferred until later phases.

- The plugin and runtime share a local authorization token.

- The user runs Logseq and the runtime on the same machine.
- The plugin is installed and enabled before testing.
- The user has permissions required for available capabilities.

## Dependencies

- Logseq is running locally.
- The runtime service is installed and can be started.

## Out of Scope

- Remote access from other machines.
- Multi-user concurrent sessions.
- UI automation of the Logseq interface.
