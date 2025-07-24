import { describe, it, expect } from 'vitest';

describe('Application tests', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should validate environment', () => {
    expect(process.env.NODE_ENV).toBeDefined();
  });
});
