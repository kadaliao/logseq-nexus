# Research: Plugin Connection and Capabilities

## Decision 1: Language Stack
- **Decision**: TypeScript for the Logseq plugin; Rust for the runtime and supporting services.
- **Rationale**: Logseq plugin ecosystem is JS/TS-based; user preference is Rust for non-plugin code.
- **Alternatives considered**: JavaScript plugin; other runtime languages.

## Decision 2: Transport and Message Model
- **Decision**: Localhost WebSocket connection using JSON-RPC-style messages for hello and capability refresh.
- **Rationale**: Supports bidirectional flow, matches existing PRD guidance, and is compatible with
  Logseq plugin environment.
- **Alternatives considered**: REST over HTTP; gRPC; raw WebSocket without structured envelope.

## Decision 3: Authentication
- **Decision**: Require a local authorization token for all plugin-runtime requests.
- **Rationale**: Lightweight security for localhost-only services with minimal UX cost.
- **Alternatives considered**: No authentication; OS-specific secret stores.

## Decision 4: Capability Identity Rule
- **Decision**: Capability uniqueness is defined by (capability ID + version).
- **Rationale**: Prevents duplicates while allowing versioned capabilities to coexist.
- **Alternatives considered**: ID-only uniqueness; allow duplicates and rely on order.

## Decision 5: Dependency Baseline
- **Decision**: Rust runtime uses tokio + tokio-tungstenite for WS and serde_json for JSON-RPC;
  plugin uses native WebSocket API and a minimal typed message schema.
- **Rationale**: These are common, stable primitives and keep the surface minimal.
- **Alternatives considered**: axum WebSocket server; third-party JSON-RPC libraries.

## Decision 6: Contract Representation
- **Decision**: Publish an OpenAPI 3.1 contract that documents message schemas and auth headers,
  even if transport is WebSocket.
- **Rationale**: Keeps a testable, machine-readable contract for validation and documentation.
- **Alternatives considered**: JSON-RPC schema only; prose-only contract.

## Decision 7: Testing Approach
- **Decision**: Unit tests in Rust (cargo test) and TS (vitest), plus local integration tests
  with a running Logseq instance.
- **Rationale**: Ensures deterministic tests while validating the full handshake path.
- **Alternatives considered**: No plugin unit tests; end-to-end only.
