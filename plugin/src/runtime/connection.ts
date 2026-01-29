import type { ConnectionStatus } from '../state/connection.js';
import { createInitialStatus, transitionStatus } from '../state/connection.js';

export interface WebSocketLike {
  send(data: string): void;
  close(): void;
  addEventListener(type: 'open' | 'close' | 'error' | 'message', listener: (event: any) => void): void;
}

export interface RuntimeConnection {
  socket: WebSocketLike;
  status: ConnectionStatus;
  send: (payload: string) => void;
}

export function connectRuntime(
  socketFactory: () => WebSocketLike,
  onStatusChange: (status: ConnectionStatus) => void,
): RuntimeConnection {
  const socket = socketFactory();
  let status = createInitialStatus();
  onStatusChange(status);

  socket.addEventListener('open', () => {
    status = transitionStatus(status, 'connecting');
    onStatusChange(status);
  });

  socket.addEventListener('close', () => {
    status = transitionStatus(status, 'error', {
      error: 'Connection closed',
      recoverySteps: ['Restart runtime', 'Verify auth token'],
    });
    onStatusChange(status);
  });

  socket.addEventListener('error', () => {
    status = transitionStatus(status, 'error', {
      error: 'Connection error',
      recoverySteps: ['Check runtime status', 'Retry connection'],
    });
    onStatusChange(status);
  });

  return {
    socket,
    status,
    send: (payload: string) => socket.send(payload),
  };
}
