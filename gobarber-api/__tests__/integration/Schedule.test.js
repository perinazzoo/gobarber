import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Schedule', () => {
  afterAll(() => {
    mongoose.connections.map(conn => conn.close());
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should return a list of all appointments', async () => {
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

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body: providerLogin } = await request(app)
      .post('/sessions')
      .send({
        email: 'mucaquinholol@gmail.com',
        password: 'abc123',
      });

    await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    const response = await request(app)
      .get('/schedule')
      .set({ Authorization: `Bearer ${providerLogin.token}` })
      .send();

    expect(response.status).toBe(200);
    expect(response.body.every(item => item.id)).toBe(true);
  });
});
