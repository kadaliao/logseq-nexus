import type { ConnectionStatus } from '../state/connection.js';
import { createInitialStatus, transitionStatus } from '../state/connection.js';
import { createHelloRequest, handleHelloAck } from './handshake.js';
import type { Capability } from '../protocol/messages.js';

export interface WebSocketLike {
  send(data: string): void;
  close(): void;
  addEventListener(type: 'open' | 'close' | 'error' | 'message', listener: (event: any) => void): void;
}

export interface RuntimeConnection {
  socket: WebSocketLike;
  status: ConnectionStatus;
  send: (payload: string) => void;
  close: () => void;
}

interface JsonRpcRequest {
  id: number;
  method: string;
  params: any;
}

interface JsonRpcResponse {
  id: number;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}

export interface ConnectionConfig {
  authToken: string;
  logseqVersion: string;
  pluginVersion: string;
  capabilities: Capability[];
}

export function connectRuntime(
  socketFactory: () => WebSocketLike,
  config: ConnectionConfig,
  onStatusChange: (status: ConnectionStatus) => void,
): RuntimeConnection {
  const socket = socketFactory();
  let status = createInitialStatus();
  let messageIdCounter = 0;
  let pendingRequests = new Map<number, (response: JsonRpcResponse) => void>();

  onStatusChange(status);

  console.log('[logseq-nexus] Connecting to runtime server...');

  socket.addEventListener('open', () => {
    console.log('[logseq-nexus] WebSocket opened, initiating handshake...');
    status = transitionStatus(status, 'connecting');
    onStatusChange(status);

    // Send hello handshake
    const helloRequest = createHelloRequest(
      config.logseqVersion,
      config.pluginVersion,
      config.capabilities
    );

    const messageId = ++messageIdCounter;
    const jsonRpcRequest: JsonRpcRequest = {
      id: messageId,
      method: 'hello',
      params: {
        auth_token: config.authToken,
        logseq_version: helloRequest.logseqVersion,
        plugin_version: helloRequest.pluginVersion,
        api_capabilities: helloRequest.apiCapabilities.map(cap => ({
          capability_id: cap.capabilityId,
          version: cap.version,
          status: cap.status,
          description: cap.description,
        })),
      },
    };

    pendingRequests.set(messageId, (response: JsonRpcResponse) => {
      if (response.error) {
        console.error('[logseq-nexus] Handshake failed:', response.error);
        status = transitionStatus(status, 'error', {
          error: `Handshake failed: ${response.error.message}`,
          recoverySteps: ['Check auth token', 'Verify runtime version'],
        });
        onStatusChange(status);
        return;
      }

      if (!response.result) {
        console.error('[logseq-nexus] Handshake response missing result');
        status = transitionStatus(status, 'error', {
          error: 'Invalid handshake response',
          recoverySteps: ['Restart runtime', 'Check logs'],
        });
        onStatusChange(status);
        return;
      }

      // Convert snake_case to camelCase
      const helloAck = {
        serverVersion: response.result.server_version,
        enabledCapabilities: (response.result.enabled_capabilities || []).map((cap: any) => ({
          capabilityId: cap.capability_id,
          version: cap.version,
          status: cap.status,
          description: cap.description,
        })),
      };

      const result = handleHelloAck(status, helloAck);
      status = result.status;
      onStatusChange(status);

      console.log('[logseq-nexus] Handshake successful, connection ready');
      console.log('[logseq-nexus] Server version:', helloAck.serverVersion);
      console.log('[logseq-nexus] Enabled capabilities:', result.enabledCapabilities.length);
    });

    console.log('[logseq-nexus] Sending hello request:', jsonRpcRequest);
    socket.send(JSON.stringify(jsonRpcRequest));
  });

  socket.addEventListener('message', (event: any) => {
    try {
      const data = typeof event.data === 'string' ? event.data : event.data.toString();
      const message = JSON.parse(data) as JsonRpcResponse;

      console.log('[logseq-nexus] Received message:', message);

      if (message.id !== undefined && pendingRequests.has(message.id)) {
        const handler = pendingRequests.get(message.id);
        pendingRequests.delete(message.id);
        handler!(message);
      }
    } catch (err) {
      console.error('[logseq-nexus] Failed to parse message:', err);
    }
  });

  socket.addEventListener('close', () => {
    console.log('[logseq-nexus] Connection closed');
    status = transitionStatus(status, 'error', {
      error: 'Connection closed',
      recoverySteps: ['Restart runtime', 'Verify auth token'],
    });
    onStatusChange(status);
  });

  socket.addEventListener('error', (event: any) => {
    console.error('[logseq-nexus] Connection error:', event);
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
    close: () => socket.close(),
  };
}
