import { describe, expect, it } from 'vitest';
import { connectRuntime } from '../../src/runtime/connection.js';
import { renderStatusPanel } from '../../src/ui/status_panel.js';

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

describe('recovery flow', () => {
  it('shows recovery steps after disconnect', () => {
    const socket = new FakeSocket();
    let latestStatus: any;

    connectRuntime(() => socket, {
      authToken: 'test-token',
      logseqVersion: '0.10',
      pluginVersion: '0.1.0',
      capabilities: [],
    }, (status) => {
      latestStatus = status;
    });

    socket.close();
    const output = renderStatusPanel(latestStatus);
    expect(output).toContain('Recovery');
  });
});
