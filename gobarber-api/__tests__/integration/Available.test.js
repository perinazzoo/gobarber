import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Available', () => {
  afterAll(() => {
    mongoose.connections.map(conn => conn.close());
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should be able to list all available times for a given date', async () => {
    const date = Date.now();

    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body: provider } = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinholol@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body: user } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .get(`/providers/${provider.id}/available`)
      .set({ Authorization: `Bearer ${user.token}` })
      .query({ date })
      .send();

    expect(
      response.body.every(el => {
        return el.time;
      })
    ).toBe(true);
  });

  it('should not be able to list all appointments without a date query', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body: provider } = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinholol@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body: user } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .get(`/providers/${provider.id}/available`)
      .set({ Authorization: `Bearer ${user.token}` })
      .send();

    expect(response.status).toBe(400);
  });
});
