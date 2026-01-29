# Logseq Skill (MCP + Plugin) Specification

This document defines a spec-driven plan to build a Logseq "Skill" for AI use. The Skill consists of:
- A documented capability contract (SKILL.md-style documentation).
- An executable runtime (Rust MCP server + Logseq plugin) that exposes full Logseq capabilities
  (including block CRUD and DataScript queries) over a stable, private RPC protocol.

Terminology
- Skill: a documented interface plus a runnable service that an AI agent can call reliably.
- MCP runtime: the executable service that implements the Skill interface.
- Plugin: the Logseq-side capability provider.

## Goals
- Provide a Skill that lets an AI agent manage a Logseq graph end-to-end.
- Cover all capabilities exposed by Logseq HTTP API today, plus missing features such as block CRUD and DataScript queries.
- Keep the external Skill/MCP interface stable while Logseq internals evolve.
- Support latest Logseq releases with graceful capability detection and downgrade.
- Make the Skill self-describing with a clear tool contract, examples, and error model.

## Non-goals (Initial Phase)
- Remote multi-user access beyond local machine.
- Full UI automation (clicking UI elements).
- Direct database access outside Logseq APIs.

## Architecture Overview

Skill Documentation (SKILL.md)
  - Human-readable description of tools, inputs/outputs, errors, and examples
  - Versioned contract aligned with MCP tool surface

Logseq Plugin (JS/TS)
  - Calls logseq.Editor.* and logseq.DB.* APIs
  - Implements a stable RPC surface
  - Connects to local Rust MCP server via WebSocket
  - Includes a bootstrapper to install/start the MCP server locally

Rust MCP Server
  - Exposes MCP tools to AI clients (Skill runtime)
  - Forwards tool calls to plugin over RPC
  - Handles auth, retries, timeouts, and capability gating

## Transport and Protocol

### Transport
- WebSocket over localhost (127.0.0.1).
- TLS not required for loopback. Use auth token.

### RPC Protocol (JSON-RPC 2.0 style)
Request
- id: string
- method: string
- params: object

Response
- id: string
- result: object | null
- error: { code: string, message: string, data?: any }

Notifications (no id)
- method: string
- params: object

### Handshake
1) Plugin connects to MCP WS endpoint with token.
2) Plugin sends "hello" with:
   - logseq_version
   - plugin_version
   - api_capabilities (list)
3) MCP replies "hello_ack" with:
   - server_version
   - enabled_capabilities

### Keepalive
- Ping every 20s, pong within 10s.
- Reconnect with backoff (1s, 2s, 5s, 10s).

## Security
- MCP server binds only to 127.0.0.1.
- Shared auth token stored in a local file (0600) and passed to plugin config.
- Optional: rotate token on MCP startup and notify plugin via config UI.
- Bootstrapper verifies binary integrity (hash/signature) before execution.
- Only allow downloads from trusted release sources.

## Capability Model
- Plugin detects availability of Logseq APIs on startup.
- Plugin reports capabilities to MCP server.
- MCP tools are enabled or disabled accordingly.
- MCP returns a clear error if a tool is unavailable.

Capability keys (initial)
- pages.list
- pages.read
- pages.create
- pages.update
- pages.delete
- search.basic
- blocks.read
- blocks.create
- blocks.update
- blocks.delete
- blocks.move
- datascript.query

## MCP Tool Surface (Initial)

### Core Page Operations (HTTP API parity)
1) list_pages
   - include_journals: bool

2) get_page_content
   - page_name: string
   - format: "text" | "json"
   - include_properties: bool
   - include_blocks: bool
   - block_depth: int

3) create_page
   - title: string
   - content: string (optional)
   - properties: object (optional)
   - create_first_block: bool (optional)

4) update_page
   - page_name: string
   - content_append: string (optional)
   - properties: object (optional)

5) delete_page
   - page_name: string
   - force: bool (optional)

6) search
   - query: string
   - limit: int
   - include_blocks: bool
   - include_pages: bool
   - include_files: bool

### Block CRUD (Missing in HTTP API)
7) get_block
   - block_uuid: string
   - include_children: bool
   - depth: int

8) create_block
   - parent_block_uuid: string (optional)
   - page_name: string (optional)
   - content: string
   - position: "before" | "after" | "first" | "last" (optional)
   - sibling_block_uuid: string (optional)
   - properties: object (optional)

9) update_block
   - block_uuid: string
   - content: string (optional)
   - properties: object (optional)
   - replace_content: bool (optional)

10) delete_block
    - block_uuid: string
    - recursive: bool (optional)

11) move_block
    - block_uuid: string
    - target_parent_uuid: string (optional)
    - target_page_name: string (optional)
    - position: "before" | "after" | "first" | "last" (optional)
    - sibling_block_uuid: string (optional)

### DataScript
12) datascript_query
    - query: string
    - inputs: array (optional)
    - limit: int (optional)
    - timeout_ms: int (optional)

### System
13) ping
14) get_capabilities

## Plugin Implementation Notes
- Prefer logseq.Editor and logseq.DB APIs.
- Provide internal wrappers so MCP does not depend on Logseq API names.
- For text formatting, return both raw JSON and a readable text form when requested.
- Implement block CRUD using available Editor APIs; if a method is missing, mark the capability as unavailable.

## Rust MCP Server Implementation Notes
- Use async runtime (tokio) and a WS client/server (tungstenite or axum).
- Maintain a single active plugin connection with reconnect support.
- Map MCP tool calls to RPC requests with timeouts and retries.
- Return clean, user-facing errors for missing capability or Logseq errors.

## Error Handling
- Map Logseq errors to MCP error messages with context.
- Provide error codes: CAPABILITY_MISSING, NOT_FOUND, INVALID_INPUT, TIMEOUT, INTERNAL.

## Data Model
- Page identified by page name (original name from Logseq).
- Block identified by UUID string.
- Use explicit parameters to disambiguate page vs block.

## Bootstrapper (Plugin-embedded Installer/Launcher)

Goal: minimize user steps to "install plugin -> configure MCP".

### Responsibilities
- Detect OS/arch and download the correct MCP server binary from a trusted release URL.
- Verify integrity via SHA256 (or signature) before execution.
- Install binary to a user-writable directory, e.g. `~/.local/share/logseq-mcp/`.
- Start the server and keep it alive (restart on crash with backoff).
- Surface status and logs in the plugin UI.
- Provide a one-click copy of MCP client configuration.

### User Flow
1) User installs Logseq plugin.
2) Plugin checks for MCP server binary; downloads if missing.
3) Plugin starts server and reports status.
4) Plugin shows ready-to-copy MCP config snippet (stdio invocation).

### Distribution Strategy
- Publish Rust server binaries per OS/arch (macOS, Windows, Linux) via GitHub Releases.
- Plugin uses a pinned version by default; optional "update" button for newer versions.
- Fallback: manual download URL shown if auto-download fails.

### Failure Handling
- If download fails, show clear recovery steps and retry option.
- If server fails to start, display logs and suggest manual run.

## Development Plan (Spec-driven)

Phase 0: Discovery
- Verify current Logseq plugin APIs for block CRUD and DataScript query.
- Define a compatibility matrix by Logseq version.

Phase 1: RPC Bridge (Plugin)
- Create plugin skeleton.
- Implement WS client and handshake.
- Implement capabilities reporting.
- Implement bootstrapper download/install/start flow.

Phase 2: MCP Server (Rust)
- Implement MCP tool definitions.
- Implement RPC client and tool routing.
- Add capability gating.

Phase 3: Core Page Ops
- Implement list/read/create/update/delete/search with parity.
- Add tests for request and response mapping.

Phase 4: Block CRUD
- Implement get/create/update/delete/move.
- Add block-level tests.

Phase 5: DataScript
- Implement query with limits and timeout.
- Add tests for query format and results.

Phase 6: Hardening
- Add retry logic and reconnect behavior.
- Add structured logging and diagnostics.
- Add API version reporting.

## Test Strategy
- Unit tests for RPC encoding and tool mapping.
- Integration tests against a running Logseq instance (optional, gated by env).
- Test fixtures: create pages and blocks, query, then cleanup.

## Open Questions
- Preferred WS port and token management flow.
- Logseq API differences across recent versions.
- Search implementation: use logseq.search if available or fallback to DataScript.

## Skill Documentation Requirements
The Skill documentation is the contract AI agents rely on. It must be kept in sync with the MCP tool surface.

Required sections for SKILL.md
- Purpose: what the Skill does and its limitations.
- Setup: prerequisites (Logseq running, plugin installed, MCP server running).
- Tools: list each MCP tool with inputs, outputs, and examples.
- Error model: error codes and expected recovery behavior.
- Capability gating: how to detect and handle unavailable tools.
- Versioning: how to interpret Skill versions vs. MCP server versions.

Example tool entry (format sketch)
- tool: create_page
  - input: { title, content?, properties?, create_first_block? }
  - output: { page_name, success, warnings? }
  - errors: INVALID_INPUT, CAPABILITY_MISSING, INTERNAL

## Skill Runtime Contract
The MCP runtime is the executable backend that implements the Skill. The documentation must reflect:
- Exact tool names and parameters.
- Deterministic error codes.
- Stable response shapes (additive changes only).

## Versioning Strategy
- Skill version: semantic version for the documented contract (SKILL.md).
- MCP server version: implementation version; must advertise compatible Skill version.
- Plugin version: implementation version; must advertise compatible Skill version.

Compatibility rules
- Minor version bump: backward-compatible additions only.
- Major version bump: breaking changes to tool names, inputs, or outputs.

## Suggested References (Reading Order)
1) Logseq plugin docs: https://plugins-doc.logseq.com/
2) Logseq queries (advanced): https://docs.logseq.com/#/page/Advanced%20Queries
3) DataScript docs: https://github.com/tonsky/datascript
4) MCP spec: https://modelcontextprotocol.io/docs
5) MCP spec (GitHub): https://github.com/modelcontextprotocol/spec
6) JSON-RPC 2.0: https://www.jsonrpc.org/specification
7) Tokio (Rust async): https://tokio.rs/
8) Axum (Rust web/WS): https://docs.rs/axum/latest/axum/
9) tokio-tungstenite (WS): https://docs.rs/tokio-tungstenite/latest/tokio_tungstenite/
10) GitHub Releases: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
