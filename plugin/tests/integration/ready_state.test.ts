import { describe, expect, it } from 'vitest';
import { connectRuntime } from '../../src/runtime/connection.js';
import { createHelloRequest, handleHelloAck } from '../../src/runtime/handshake.js';
import type { Capability } from '../../src/protocol/messages.js';
import { createInitialStatus } from '../../src/state/connection.js';

class FakeSocket {
  private listeners: Record<string, Array<(event: any) => void>> = {};

  addEventListener(type: string, listener: (event: any) => void) {
    this.listeners[type] = this.listeners[type] ?? [];
    this.listeners[type].push(listener);
  }

  send() {}

  close() {
    this.emit('close');
  }

  emit(type: string, payload?: any) {
    (this.listeners[type] ?? []).forEach((listener) => listener(payload));
  }
}

describe('ready state flow', () => {
  it('transitions to ready after hello ack', () => {
    const socket = new FakeSocket();
    let latestStatus = createInitialStatus();
    const caps: Capability[] = [
      { capabilityId: 'pages.list', version: '1', status: 'enabled' },
    ];

    connectRuntime(() => socket, {
      authToken: 'test-token',
      logseqVersion: '0.10',
      pluginVersion: '0.1.0',
      capabilities: caps,
    }, (status) => {
      latestStatus = status;
    });

    socket.emit('open');

    const hello = createHelloRequest('0.10', '0.1.0', caps);
    const ack = {
      serverVersion: '0.1.0',
      enabledCapabilities: hello.apiCapabilities,
    };
    const result = handleHelloAck(latestStatus, ack);

    expect(result.status.state).toBe('ready');
    expect(result.enabledCapabilities).toHaveLength(1);
  });
});
