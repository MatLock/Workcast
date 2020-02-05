const request = require('supertest');
const app = require('../../src/server');
const dbHandler = require('../common/Handler');

const APP_TOKEN = 'TOKEN123';

beforeAll(async () => {
  await dbHandler.connect();
});

afterAll(async () => await app.close());
afterEach(async () => await dbHandler.clearDatabase());

describe('User Controller', () => {
  it('Should create a new user', async () => {
    const res = await request(app)
      .post('/workcast/user/create')
      .set('auth_token',APP_TOKEN)
      .send({
        name: 'test',
        avatar: 'http://google.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
});