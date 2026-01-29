import { describe, expect, it } from 'vitest';
import { dedupeCapabilities } from '../../src/runtime/capabilities.js';
import type { Capability } from '../../src/protocol/messages.js';

describe('capability dedupe', () => {
  it('deduplicates by id and version', () => {
    const caps: Capability[] = [
      { capabilityId: 'pages.list', version: '1', status: 'enabled' },
      { capabilityId: 'pages.list', version: '1', status: 'enabled' },
      { capabilityId: 'pages.list', version: '2', status: 'enabled' },
    ];
    expect(dedupeCapabilities(caps)).toHaveLength(2);
  });
});
