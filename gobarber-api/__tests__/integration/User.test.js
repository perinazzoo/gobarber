import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../../src/app/models/User';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await mongoose.connections.map(conn => conn.close());
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    expect(response.status).toBe(409);
  });

  it('should encrypt user password after register', async () => {
    const user = await User.create({
      name: 'Bruno Henrique',
      email: 'bruno@henrique.com',
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not be able to register with missing data', async () => {
    const responseWithoutName = await request(app)
      .post('/users')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const responseWithoutEmail = await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        password: '123456',
      });

    const responseWithoutPass = await request(app)
      .post('/users')
      .send({
        email: 'bruno@henrique.com',
        name: 'Bruno Henrique',
      });

    expect(responseWithoutEmail.status).toBe(400);
    expect(responseWithoutName.status).toBe(400);
    expect(responseWithoutPass.status).toBe(400);
  });

  it('should not be able to register with wrong data', async () => {
    const responseWithNumberPass = await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: 123456,
      });

    expect(responseWithNumberPass.status).toBe(400);

    const responseWithShortPass = await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '1234',
      });

    expect(responseWithShortPass.status).toBe(400);
  });

  it('should be able to update the name', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .put('/users')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        name: 'Gabigol',
      });

    expect(response.body.name).toBe('Gabigol');
  });

  it('should be able to update the email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .put('/users')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        email: 'brunohenrique@gmail.com',
      });

    expect(response.body.email).toBe('brunohenrique@gmail.com');
  });

  it('should not be able to update email if email already registered on database', async () => {
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
        name: 'Bruno Henrique',
        email: 'brunohenrique@gmail.com',
        password: '123456',
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .put('/users')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        email: 'brunohenrique@gmail.com',
      });

    expect(response.status).toBe(409);
  });

  it('should be able to update password', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .put('/users')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        oldPassword: '123456',
        password: 'abc123',
        confirmPassword: 'abc123',
      });

    const user = await User.findByPk(response.body.id);

    const compareHash = await bcrypt.compare('abc123', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not be able to update password if password and confirmPassword does not match', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .put('/users')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        oldPassword: '123456',
        password: 'abc123',
        confirmPassword: 'abb123',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to update password if current password does not match', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .put('/users')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        oldPassword: '123123',
        password: 'abc123',
        confirmPassword: 'abc123',
      });

    expect(response.status).toBe(401);
  });
});
