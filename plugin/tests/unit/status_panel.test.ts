import { describe, expect, it } from 'vitest';
import { renderStatusPanel } from '../../src/ui/status_panel.js';
import type { ConnectionStatus } from '../../src/state/connection.js';

const baseStatus: ConnectionStatus = {
  state: 'ready',
  lastStateChangeAt: new Date().toISOString(),
};

describe('status panel', () => {
  it('renders ready state', () => {
    const output = renderStatusPanel(baseStatus);
    expect(output).toContain('READY');
  });

  it('renders recovery steps on error', () => {
    const output = renderStatusPanel({
      ...baseStatus,
      state: 'error',
      lastError: 'Connection error',
      recoverySteps: ['Restart runtime'],
    });
    expect(output).toContain('Recovery');
  });
});
