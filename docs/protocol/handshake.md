# Plugin-Runtime Handshake Protocol

## Overview
This document defines the local handshake between the Logseq plugin and the
Rust runtime. The connection is localhost-only and requires a local auth token.

## Messages

### Hello (plugin → runtime)
- Includes Logseq version, plugin version, and available capabilities.
- Auth token is required for the request.

### Hello Ack (runtime → plugin)
- Includes runtime version and enabled capabilities.
- Indicates readiness for subsequent capability refresh calls.

## Capability Uniqueness
Capabilities are uniquely identified by (capability ID + version). Any duplicates
in a request must be deduplicated by this rule.

## Error Codes
- INVALID_INPUT
- UNAUTHORIZED
- INTERNAL

## Status Surface
The plugin exposes a status panel with connection state and recovery steps.
