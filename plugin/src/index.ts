import { connectRuntime, type ConnectionConfig } from './runtime/connection.js';
import type { ConnectionStatus } from './state/connection.js';
import type { Capability } from './protocol/messages.js';

/**
 * Plugin configuration
 */
interface PluginConfig {
  runtimeUrl?: string;
  authToken?: string;
  logseqVersion?: string;
  pluginVersion?: string;
}

/**
 * Plugin state
 */
interface PluginState {
  connectionStatus: ConnectionStatus;
  enabledCapabilities: Capability[];
}

/**
 * Logseq API interface
 */
interface LogseqAPI {
  ready: (callback: () => void) => void;
}

/**
 * Global type declarations
 */
declare global {
  const logseq: LogseqAPI | undefined;
}

let pluginState: PluginState = {
  connectionStatus: {
    state: 'connecting',
    lastStateChangeAt: new Date().toISOString(),
  },
  enabledCapabilities: [],
};

/**
 * Initialize the Logseq Nexus plugin
 */
export function initializePlugin(config: PluginConfig = {}): void {
  console.log('[logseq-nexus] Initializing plugin...');

  // Configuration with defaults
  const runtimeUrl = config.runtimeUrl || 'ws://127.0.0.1:8765';
  const authToken = config.authToken || 'dev-token';
  const logseqVersion = config.logseqVersion || '0.10.0';
  const pluginVersion = config.pluginVersion || '0.1.0';

  // Define available capabilities
  const capabilities: Capability[] = [
    {
      capabilityId: 'log',
      version: '1.0.0',
      status: 'enabled',
      description: 'Logging capability',
    },
  ];

  // Connection configuration
  const connectionConfig: ConnectionConfig = {
    authToken,
    logseqVersion,
    pluginVersion,
    capabilities,
  };

  // Status change handler
  const onStatusChange = (status: ConnectionStatus) => {
    pluginState.connectionStatus = status;
    console.log('[logseq-nexus] Connection status changed:', status.state);

    if (status.lastError) {
      console.error('[logseq-nexus] Error:', status.lastError);
      if (status.recoverySteps) {
        console.log('[logseq-nexus] Recovery steps:', status.recoverySteps);
      }
    }
  };

  // Create WebSocket connection
  try {
    const connection = connectRuntime(
      () => new WebSocket(runtimeUrl),
      connectionConfig,
      onStatusChange
    );

    console.log('[logseq-nexus] Connection initiated to:', runtimeUrl);

    // Store connection reference for potential cleanup
    (globalThis as any).__logseqNexusConnection = connection;
  } catch (err) {
    console.error('[logseq-nexus] Failed to initialize connection:', err);
    pluginState.connectionStatus = {
      state: 'error',
      lastError: err instanceof Error ? err.message : 'Unknown error',
      recoverySteps: ['Check runtime URL', 'Verify WebSocket support'],
      lastStateChangeAt: new Date().toISOString(),
    };
  }
}

/**
 * Get current plugin state
 */
export function getPluginState(): PluginState {
  return pluginState;
}

/**
 * Cleanup plugin resources
 */
export function cleanupPlugin(): void {
  console.log('[logseq-nexus] Cleaning up plugin...');
  const connection = (globalThis as any).__logseqNexusConnection;
  if (connection) {
    connection.close();
    delete (globalThis as any).__logseqNexusConnection;
  }
}

// Auto-initialize if in Logseq environment
if (typeof logseq !== 'undefined') {
  console.log('[logseq-nexus] Detected Logseq environment');

  // Hook into Logseq lifecycle
  logseq.ready(() => {
    console.log('[logseq-nexus] Logseq ready, initializing plugin...');
    initializePlugin();
  });
} else {
  console.log('[logseq-nexus] Not in Logseq environment (standalone mode)');
}

