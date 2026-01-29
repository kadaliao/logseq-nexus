# Data Model: Plugin Connection and Capabilities

## Entities

### Connection Session
- **Fields**:
  - session_id (string)
  - state (connecting | ready | error)
  - started_at (ISO 8601 timestamp)
  - last_state_change_at (ISO 8601 timestamp)
  - last_error_code (string, optional)
  - last_error_message (string, optional)
- **Relationships**: One session has one Capability List and many Status Events.
- **State Transitions**: connecting → ready; ready → error; error → connecting.

### Capability
- **Fields**:
  - capability_id (string)
  - version (string)
  - status (enabled | disabled)
  - description (string, optional)
- **Validation**: Unique by (capability_id + version).

### Capability List
- **Fields**:
  - session_id (string)
  - capabilities (list of Capability)
  - updated_at (ISO 8601 timestamp)
- **Relationships**: Belongs to one Connection Session.

### Status Event
- **Fields**:
  - event_id (string)
  - session_id (string)
  - severity (info | warning | error)
  - state (connecting | ready | error)
  - message (string)
  - recovery_steps (list of strings, optional)
  - created_at (ISO 8601 timestamp)
- **Relationships**: Belongs to one Connection Session.

### Auth Token
- **Fields**:
  - token_id (string)
  - token_value (string, redacted in logs)
  - issued_at (ISO 8601 timestamp)
  - last_rotated_at (ISO 8601 timestamp, optional)
- **Validation**: Token required for any plugin-runtime request.
