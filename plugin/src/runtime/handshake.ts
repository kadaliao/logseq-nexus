import type { Capability, HelloAck, HelloRequest } from '../protocol/messages.js';
import { transitionStatus } from '../state/connection.js';
import type { ConnectionStatus } from '../state/connection.js';

export function createHelloRequest(
  logseqVersion: string,
  pluginVersion: string,
  capabilities: Capability[],
): HelloRequest {
  return {
    logseqVersion,
    pluginVersion,
    apiCapabilities: capabilities,
  };
}

export function handleHelloAck(
  status: ConnectionStatus,
  ack: HelloAck,
): { status: ConnectionStatus; enabledCapabilities: Capability[] } {
  const nextStatus = transitionStatus(status, 'ready');
  return {
    status: nextStatus,
    enabledCapabilities: ack.enabledCapabilities,
  };
}
