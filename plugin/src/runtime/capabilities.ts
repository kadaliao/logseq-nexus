import type { Capability, CapabilityRequest, CapabilityResponse } from '../protocol/messages.js';

export function dedupeCapabilities(capabilities: Capability[]): Capability[] {
  const seen = new Set<string>();
  const result: Capability[] = [];
  for (const cap of capabilities) {
    const key = `${cap.capabilityId}:${cap.version}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(cap);
  }
  return result;
}

export function createCapabilityRequest(sessionId?: string): CapabilityRequest {
  return { sessionId };
}

export function handleCapabilityResponse(response: CapabilityResponse): Capability[] {
  return dedupeCapabilities(response.capabilities);
}
