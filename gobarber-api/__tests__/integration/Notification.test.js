import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import truncate from '../util/truncate';

import Notification from '../../src/app/schemas/Notification';

describe('Notification', () => {
  afterAll(() => {
    mongoose.connections.map(conn => conn.close());
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a notification', async () => {
    const { body: user } = await request(app)
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

    const notification = await Notification.create({
      content: `Novo agendamento de ${user.name} para o dia 30 de dezembro  10 horas`,
      user: provider.id,
    });

    expect(notification).toHaveProperty('_id');
  });

  it('should be able to list all notifications from a specific provider', async () => {
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
      .get('/notifications')
      .set({ Authorization: `Bearer ${providerLogin.token}` })
      .send();

    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.every(item => item._id)).toBe(true);
    expect(response.status).toBe(200);
  });

  it('should be able to turn a notification as read', async () => {
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

    const notification = await Notification.create({
      content:
        'Novo agendamento de Bruno Henrique para 30 de dezembro às 10 horas',
      user: provider.id,
    });

    const response = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .put(`/notifications/${notification._id}`)
      .set({ Authorization: `Bearer ${providerLogin.token}` })
      .send();

    expect(response.status).toBe(200);
    expect(response.body.read).toBe(true);
  });
});
