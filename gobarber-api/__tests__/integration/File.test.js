import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('File', () => {
  afterAll(() => {
    mongoose.connections.map(conn => conn.close());
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should upload test image', async () => {
    await request(app)
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
        email: 'mucaquinholol@gmail.com',
        password: 'abc123',
      });

    const filePath = `${__dirname}/../testfiles/twitch.jpg`;

    const response = await request(app)
      .post('/files')
      .set({ Authorization: `Bearer ${body.token}` })
      .attach('file', filePath);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('path');
  });
});
