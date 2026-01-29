export type ConnectionState = 'connecting' | 'ready' | 'error';

export interface ConnectionStatus {
  state: ConnectionState;
  lastError?: string;
  recoverySteps?: string[];
  lastStateChangeAt: string;
}

export function createInitialStatus(): ConnectionStatus {
  return {
    state: 'connecting',
    lastStateChangeAt: new Date().toISOString(),
  };
}

export function transitionStatus(
  status: ConnectionStatus,
  nextState: ConnectionState,
  details?: { error?: string; recoverySteps?: string[] },
): ConnectionStatus {
  return {
    state: nextState,
    lastError: details?.error,
    recoverySteps: details?.recoverySteps,
    lastStateChangeAt: new Date().toISOString(),
  };
}
