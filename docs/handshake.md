# Handshake Behavior Notes

## Auth Token
- The plugin and runtime share a local authorization token.
- Token is required for all handshake and capability refresh calls.

## Capability Rules
- Capabilities are unique by (capability ID + version).
- Disabled capabilities are excluded from enabled lists.

## Status Panel
- The plugin displays a status panel with recovery guidance when errors occur.
