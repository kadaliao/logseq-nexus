import type { ConnectionStatus } from '../state/connection.js';

export function renderStatusPanel(status: ConnectionStatus): string {
  const heading = `Status: ${status.state.toUpperCase()}`;
  const error = status.lastError ? `Error: ${status.lastError}` : '';
  const steps = status.recoverySteps?.length
    ? `Recovery: ${status.recoverySteps.join(' | ')}`
    : '';
  return [heading, error, steps].filter(Boolean).join('\n');
}
