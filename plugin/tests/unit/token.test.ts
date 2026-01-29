import { describe, expect, it } from 'vitest';
import { loadTokenFromEnv, TokenError, validateToken } from '../../src/auth/token.js';

describe('token handling', () => {
  it('loads token from env', () => {
    process.env.LOGSEQ_MCP_TOKEN = 'abc';
    expect(loadTokenFromEnv()).toBe('abc');
  });

  it('rejects mismatched token', () => {
    expect(() => validateToken('bad', 'good')).toThrow(TokenError);
  });
});
