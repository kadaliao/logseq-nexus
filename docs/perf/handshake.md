# Handshake Performance Validation

## Targets
- Ready state within 5 seconds when runtime is available.
- Capability list within 2 seconds after connection.
- Recovery to Ready or error within 10 seconds after transient disconnect.

## Measurement Plan
- Use local timing logs in the plugin status panel to capture timestamps.
- Record start and end time for each transition.
- Compare results against targets and log deviations.
