import request from 'supertest';
import mongoose from 'mongoose';
import { addHours } from 'date-fns';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Appoitment', () => {
  afterAll(async () => {
    await mongoose.connections.map(conn => conn.close());
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create an appointment', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to crate an appointment with itself', async () => {
    const user = await request(app)
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
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: user.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    expect(response.status).toBe(403);
  });

  it('should not be able to create an appointment with a user that is not a provider', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    expect(response.status).toBe(403);
  });

  it('should not be able to create an appoitment to past dates', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-01-01T15:00:00-03:00',
      });

    expect(response.status).toBe(403);
  });

  it('should not be able to create an appointment that is not available', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    const response = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    expect(response.status).toBe(403);
  });

  it('should not be able to create an appointment with missing data', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const responseWithoutProviderId = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        date: '2020-12-12T15:00:00-03:00',
      });

    const responseWithoutDate = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
      });

    expect(responseWithoutDate.status).toBe(400);
    expect(responseWithoutProviderId.status).toBe(400);
  });

  it('should not be able to create an appointment with invalid data', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const responseWithWrongId = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: String(provider.id),
        date: '2020-12-12T15:00:00-03:00',
      });

    const responseWithWrongDate = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.id,
        date: 'Dia 10 de março de 2020',
      });

    expect(responseWithWrongId.status).toBe(400);
    expect(responseWithWrongDate.status).toBe(400);
  });

  it('should be able to cancel an appointment', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body: appointment } = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    const response = await request(app)
      .delete(`/appointments/${appointment.id}`)
      .set({ Authorization: `Bearer ${body.token}` })
      .send();

    expect(response.body.cancelled_at).toBeTruthy();
    expect(response.status).toBe(200);
  });

  it('should not be able to cancel an appointment that does not exists', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body: appointment } = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    const response = await request(app)
      .delete(`/appointments/${appointment.id + 1}`)
      .set({ Authorization: `Bearer ${body.token}` })
      .send();

    expect(response.status).toBe(404);
  });

  it('should not be able to cancel an appointment that has not been created by itself', async () => {
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
        name: 'Rodrigo Piana',
        email: 'rodrigo@piana.com',
        password: '123123',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body: user1 } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body: user2 } = await request(app)
      .post('/sessions')
      .send({
        email: 'rodrigo@piana.com',
        password: '123123',
      });

    const { body: appointment } = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${user1.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    const response = await request(app)
      .delete(`/appointments/${appointment.id}`)
      .set({ Authorization: `Bearer ${user2.token}` })
      .send();

    expect(response.status).toBe(401);
  });

  it('should not be able to cancel an appointment that has already been cancelled', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body: appointment } = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    await request(app)
      .delete(`/appointments/${appointment.id}`)
      .set({ Authorization: `Bearer ${body.token}` })
      .send();

    const response = await request(app)
      .delete(`/appointments/${appointment.id}`)
      .set({ Authorization: `Bearer ${body.token}` })
      .send();

    expect(response.status).toBe(403);
  });

  it('should not be able to cancel an appointment that lasts less than 2 hours', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const { body: appointment } = await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: addHours(new Date(), 1),
      });

    const response = await request(app)
      .delete(`/appointments/${appointment.id}`)
      .set({ Authorization: `Bearer ${body.token}` })
      .send();

    expect(response.status).toBe(403);
  });

  it('should return a list of all appointments', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Henrique',
        email: 'bruno@henrique.com',
        password: '123456',
      });

    const provider = await request(app)
      .post('/users')
      .send({
        name: 'Danyel Sena',
        email: 'mucaquinho@gmail.com',
        password: 'abc123',
        provider: true,
      });

    const { body } = await request(app)
      .post('/sessions')
      .send({
        email: 'bruno@henrique.com',
        password: '123456',
      });

    await request(app)
      .post('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send({
        provider_id: provider.body.id,
        date: '2020-12-12T15:00:00-03:00',
      });

    const response = await request(app)
      .get('/appointments')
      .set({ Authorization: `Bearer ${body.token}` })
      .send();

    expect(response.status).toBe(200);
    expect(
      response.body.every(el => {
        return el.id;
      })
    ).toBe(true);
  });
});
