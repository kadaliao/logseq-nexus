# Post-001 Development Phases (Phase 1) (Draft)

Source: `docs/prd.md` (Development Plan) with `001-plugin-capability-handshake`
already extracted as the first feature spec.

Purpose: Provide a staged roadmap for remaining work so future specs can be
generated with speckit.

---

## Phase 2: Discovery and Compatibility

Focus: Validate Logseq API coverage and version differences.

Scope:
- Verify block CRUD and DataScript APIs across supported Logseq versions.
- Decide search API strategy (logseq.search vs DataScript fallback).
- Define a compatibility matrix by Logseq version.

Outputs (suggested):
- `docs/compatibility/logseq-matrix.md`
- `docs/decisions/search-strategy.md`

Spec candidates:
- `002-logseq-compatibility-matrix`

Dependencies: None.

---

## Phase 3: Plugin Bootstrapper and Distribution

Focus: Install and launch the MCP server from the plugin.

Scope:
- Detect OS/arch, download the correct server binary, verify integrity.
- Install to user-writable directory and start with restart/backoff.
- Expose status/logs and "copy MCP config" UI.
- Define release artifact naming and update flow.

Spec candidates:
- `003-plugin-bootstrapper`
- `004-release-distribution`

Dependencies:
- `001-plugin-capability-handshake` (for connection status surface and token flow).

---

## Phase 4: MCP Server Core (Tool Routing and Gating)

Focus: Implement the MCP runtime core and RPC routing to the plugin.

Scope:
- Tool registry and MCP method definitions.
- RPC client to plugin; map tool calls to plugin methods.
- Capability gating and error mapping (CAPABILITY_MISSING, etc).
- Timeout/retry policy for tool calls.

Spec candidates:
- `005-mcp-server-core`

Dependencies:
- `001-plugin-capability-handshake`

---

## Phase 5: Core Page Operations (HTTP API Parity)

Focus: Page-level tools and search parity.

Scope:
- list_pages, get_page_content, create_page, update_page, delete_page, search.
- Request/response shape parity with PRD tool surface.
- Tests for request mapping and output normalization.

Spec candidates:
- `006-core-page-ops`

Dependencies:
- Phase 2 (MCP server core)

---

## Phase 6: Block CRUD

Focus: Block-level operations not covered by Logseq HTTP API.

Scope:
- get_block, create_block, update_block, delete_block, move_block.
- Tests for block placement, properties, and edge cases.

Spec candidates:
- `007-block-crud`

Dependencies:
- Phase 2 (MCP server core)

---

## Phase 7: DataScript Queries

Focus: DataScript query capability with limits and timeouts.

Scope:
- datascript_query tool with inputs, limit, and timeout handling.
- Query error mapping and result normalization.
- Tests for query format and result shape.

Spec candidates:
- `008-datascript-query`

Dependencies:
- Phase 2 (MCP server core)

---

## Phase 8: Hardening and Observability

Focus: Production readiness across all capabilities.

Scope:
- Reconnect logic and retry/backoff policies.
- Structured logging and diagnostics surfaces.
- API version reporting and compatibility checks.
- Performance budgets validation (Ready, capability refresh, recovery).

Spec candidates:
- `009-runtime-hardening`

Dependencies:
- Phases 2-5 (at least the tools in scope)

---

## Cross-Cutting: Skill Documentation and Contract

Focus: Keep SKILL.md and examples in sync with tool surface.

Scope:
- Document all tools, inputs/outputs, and error model.
- Capability gating guidance and versioning rules.
- Examples updated per phase completion.

Spec candidates:
- `010-skill-docs-contract`

Dependencies:
- Update after each phase that adds tools or behavior changes.
