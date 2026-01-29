export type CapabilityStatus = 'enabled' | 'disabled';

export interface Capability {
  capabilityId: string;
  version: string;
  status: CapabilityStatus;
  description?: string;
}

export interface HelloRequest {
  logseqVersion: string;
  pluginVersion: string;
  apiCapabilities: Capability[];
}

export interface HelloAck {
  serverVersion: string;
  enabledCapabilities: Capability[];
}

export interface CapabilityRequest {
  sessionId?: string;
}

export interface CapabilityResponse {
  capabilities: Capability[];
}
