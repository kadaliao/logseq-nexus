# Implementation Plan: Plugin Connection and Capabilities

**Branch**: `001-plugin-capability-handshake` | **Date**: 2026-01-28 | **Spec**: /Volumes/Data-External/workspace/logseq-nexus/specs/001-plugin-capability-handshake/spec.md
**Input**: Feature specification from `/Volumes/Data-External/workspace/logseq-nexus/specs/001-plugin-capability-handshake/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command or
`.specify/scripts/bash/setup-plan.sh`.

## Summary

Implement a reliable local plugin-to-runtime handshake that reports capabilities,
requires a local auth token, and surfaces a clear in-plugin status panel with
recovery guidance. The plugin is written in TypeScript for the Logseq environment,
while the runtime and supporting services are written in Rust. The design uses a
stable JSON-RPC message model over localhost WebSocket and enforces capability
uniqueness by (capability ID + version).

## Technical Context

**Language/Version**: TypeScript 5.x (Logseq plugin) + Rust stable (MSRV 1.75+)  
**Primary Dependencies**: Logseq plugin API; native WebSocket; JSON-RPC message schema;
Rust: tokio, tokio-tungstenite (or equivalent WS stack), serde_json  
**Storage**: N/A (ephemeral local state only)  
**Testing**: TypeScript unit tests (vitest); Rust unit tests (cargo test); local
integration tests with running Logseq  
**Target Platform**: Desktop (macOS/Windows/Linux) running Logseq locally  
**Project Type**: Multi-project (Logseq plugin + Rust runtime)  
**Performance Goals**: Ready <= 5s; capability list <= 2s after connection; recover
<= 10s after transient disconnect  
**Constraints**: Localhost-only; token-authenticated connection; capability uniqueness
by (ID + version); user-visible status panel with recovery steps  
**Scale/Scope**: Single-user, single Logseq instance; one active runtime session

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Code quality: lint/format configured; interface docs updated; no duplicate logic planned
- Testing: required unit/integration tests listed; regression tests for bugs specified
- UX consistency: contract changes called out; versioning/doc updates planned
- Performance: budgets defined; measurement or benchmark plan included

**Status**: PASS (no violations anticipated; gates enforced in tasks/CI)

## Project Structure

### Documentation (this feature)

```text
/Volumes/Data-External/workspace/logseq-nexus/specs/001-plugin-capability-handshake/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
/Volumes/Data-External/workspace/logseq-nexus/
├── plugin/
│   ├── src/
│   └── tests/
└── mcp-server/
    ├── src/
    └── tests/
```

**Structure Decision**: Two top-level projects: `plugin/` for the Logseq TS plugin
and `mcp-server/` for the Rust runtime.

## Phase 0: Research

Output: /Volumes/Data-External/workspace/logseq-nexus/specs/001-plugin-capability-handshake/research.md

- Confirm language/tooling choices for TypeScript plugin and Rust runtime.
- Select WS + JSON-RPC stack and minimal schema approach.
- Define auth token handling and capability identity rule.
- Align contract representation with OpenAPI for validation and documentation.

## Phase 1: Design & Contracts

Output:
- /Volumes/Data-External/workspace/logseq-nexus/specs/001-plugin-capability-handshake/data-model.md
- /Volumes/Data-External/workspace/logseq-nexus/specs/001-plugin-capability-handshake/contracts/openapi.yaml
- /Volumes/Data-External/workspace/logseq-nexus/specs/001-plugin-capability-handshake/quickstart.md

Design steps:
- Model connection session, capability list, status events, and token linkage.
- Define contract schemas for handshake and capability refresh.
- Draft quickstart flows for local validation and recovery behavior.

Agent context update:
- Run `/Volumes/Data-External/workspace/logseq-nexus/.specify/scripts/bash/update-agent-context.sh codex`

## Phase 2: Planning Ready

- Re-check Constitution gates after design artifacts are produced.
- Prepare tasks in `/speckit.tasks` based on contracts and data model.

**Post-Design Constitution Check**: PASS (design artifacts align with code quality,
testing, UX consistency, and performance budget requirements)
