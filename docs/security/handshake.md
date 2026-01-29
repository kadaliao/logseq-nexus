# Handshake Security Review

## Threats
- Unauthorized local processes attempting to call the runtime.
- Token leakage via logs or error messages.

## Controls
- Require a local auth token for all requests.
- Redact token values in logs and error outputs.
- Limit runtime to localhost-only bindings.

## Follow-ups
- Review token rotation strategy during bootstrapper phase.
