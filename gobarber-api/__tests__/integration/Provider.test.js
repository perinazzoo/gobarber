import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';

import truncate from '../util/truncate';

describe('Provider', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    mongoose.connections.map(conn => conn.close());
  });

  it('should be able to list all registered providers', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinholol@gmail.com',
        password: 'abc123',
        provider: true,
      });

    await request(app)
      .post('/users')
      .send({
        name: 'Rodrigo Piana',
        email: 'rodrigopiana@mentiroso.com',
        password: '123123',
        provider: true,
      });

    const { body: user } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .get('/providers')
      .set({ Authorization: `Bearer ${user.token}` })
      .send();

    expect(
      response.body.every(el => {
        return el.id;
      })
    ).toBe(true);
  });
});
