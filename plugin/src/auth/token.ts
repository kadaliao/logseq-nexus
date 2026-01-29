export class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenError';
  }
}

export function loadTokenFromEnv(): string {
  const token = process.env.LOGSEQ_MCP_TOKEN;
  if (!token) {
    throw new TokenError('token not found');
  }
  return token;
}

export function validateToken(provided: string, expected: string): void {
  if (provided !== expected) {
    throw new TokenError('token mismatch');
  }
}
