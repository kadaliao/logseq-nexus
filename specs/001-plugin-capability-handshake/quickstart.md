# Quickstart: Plugin Connection and Capabilities

## Goal
Validate that the Logseq plugin can connect to the local runtime, report
capabilities, and surface status with recovery guidance.

## Prerequisites
- Logseq installed locally with the plugin enabled.
- Runtime service installed and runnable on the same machine.
- Local authorization token available to both plugin and runtime.

## Steps
1. Start Logseq and enable the plugin.
2. Start the runtime service.
3. Confirm the in-plugin status panel shows **Ready** within 5 seconds.
4. Trigger a capability refresh and confirm the list returns within 2 seconds.
5. Stop the runtime service and verify the status panel shows an error with
   recovery steps.
6. Restart the runtime and verify the status returns to **Ready** within 10 seconds.

## Expected Results
- Connection state transitions are visible in the status panel.
- Capability list reflects current availability and uses unique (ID + version).
- Errors include actionable recovery guidance.
