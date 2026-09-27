const request = require('supertest');
const app = require('./index');

describe('Restaurant API', () => {
  test('GET /api/health returns ok', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('POST /api/restaurants validates input', async () => {
    const response = await request(app).post('/api/restaurants').send({
      name: 'A',
      food_type: 'Invalid',
      halal: 'yes',
      buffet: true,
      new_shop: false,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test('POST /api/auth/demo-login creates a session user', async () => {
    const response = await request(app).post('/api/auth/demo-login').send({
      name: 'Demo User',
      email: 'demo@example.com',
    });

    expect(response.status).toBe(200);
    expect(response.body.user).toMatchObject({ email: 'demo@example.com' });
  });

  test('GET /api/auth/providers returns configured social providers', async () => {
    const response = await request(app).get('/api/auth/providers');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.providers)).toBe(true);
    expect(response.body.providers.some((provider) => provider.id === 'google')).toBe(true);
  });

  test('POST /api/auth/google creates a session user', async () => {
    const response = await request(app).post('/api/auth/google').send({
      name: 'Google User',
      email: 'google@example.com',
    });

    expect(response.status).toBe(200);
    expect(response.body.user).toMatchObject({ email: 'google@example.com' });
  });

  test('GET /api/prayer-times returns prayer schedule for a public city', async () => {
    const response = await request(app).get('/api/prayer-times?city=Singapore');

    expect(response.status).toBe(200);
    expect(response.body.city).toBe('Singapore');
    expect(Array.isArray(response.body.prayers)).toBe(true);
    expect(response.body.prayers.some((prayer) => prayer.name === 'Fajr')).toBe(true);
  });

  test('GET /api/favorites works for public visitors without login', async () => {
    const response = await request(app).get('/api/favorites');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.favorites)).toBe(true);
  });

  test('POST /api/subscriptions accepts public visitors without login', async () => {
    const response = await request(app).post('/api/subscriptions').send({
      email: 'public@example.com',
      preferences: ['offers'],
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toMatch(/success/i);
  });
});
