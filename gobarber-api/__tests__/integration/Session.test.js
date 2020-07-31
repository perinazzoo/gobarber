import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Session', () => {
  afterAll(async () => {
    mongoose.connections.map(conn => conn.close());
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create and account then login', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to create a session with not registered email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@gmail.com',
        password: '123456',
      });

    expect(response.status).toBe(404);
  });

  it('should not be able to create a session with wrong password', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: 'abc123',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to send wrong data to the session route', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const responseEmail = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
      });

    const responsePassword = await request(app)
      .post('/sessions')
      .send({
        password: '123456',
      });

    expect(responseEmail.status).toBe(400);
    expect(responsePassword.status).toBe(400);
  });
});
