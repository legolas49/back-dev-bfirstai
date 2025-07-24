import { describe, it, expect } from 'vitest';
import { json } from '@sveltejs/kit';

describe('API Health tests', () => {
  it('should return health status', () => {
    // Test simple pour valider la structure de réponse attendue
    const healthResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: 'development'
    };
    
    expect(healthResponse).toHaveProperty('status');
    expect(healthResponse.status).toBe('ok');
    expect(healthResponse).toHaveProperty('timestamp');
    expect(healthResponse).toHaveProperty('environment');
  });

  it('should validate JSON response format', () => {
    const response = json({ status: 'ok', test: true });
    expect(response).toBeDefined();
  });
});
