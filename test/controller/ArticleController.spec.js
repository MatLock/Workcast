const request = require('supertest');
const app = require('../../src/server');
const dbHandler = require('../common/Handler');

const APP_TOKEN = '5CD4ED173E1C95FE763B753A297D5';

beforeAll(async () => {
  await dbHandler.connect();
});
let user;

beforeEach(async () =>{
  let u = {name: 'test', avatar: 'http://google.com'};
  let res = await request(app)
    .post('/workcast/user/create')
    .set('auth_token',APP_TOKEN)
    .send(u);
  user = res.body;
});

afterAll(async () => await app.close());
afterEach(async () => await dbHandler.clearDatabase());

const createArticle = async (title) =>{
  let article = {title:title,text:'customText',tags:['tag1']};
  let articleRequest = await request(app)
    .post(`/workcast/user/${user._id}/article/create`)
    .set('auth_token',APP_TOKEN)
    .send(article);
  return articleRequest;
};

const obtainArticle = async (id) =>{
  let articleRequest = await request(app)
    .get(`/workcast/user/${user._id}/article/${id}`)
    .set('auth_token',APP_TOKEN)
    .send();
  return articleRequest;
};

describe('Article Controller', () => {
  it('Should create a new Article', async () => {

    let articleRequest = await createArticle('title');

    expect(articleRequest.statusCode).toEqual(201);
    expect(articleRequest.body).toHaveProperty('_id');
  });

  it('Can be obtained by Id', async () => {
    let art = await createArticle('newTitle');
    let articleRequest = await obtainArticle(art.body._id);

    expect(articleRequest.statusCode).toEqual(200);
    expect(articleRequest.body._id).toBe(art.body._id);
  });

  it('Can be obtained by tags',async () =>{
    let art = await createArticle('newTitle');
    let req = await request(app)
      .get(`/workcast/article/all?tags=tag1`)
      .set('auth_token',APP_TOKEN)
      .send();

    expect(req.statusCode).toEqual(200);
    expect(req.body[0]._id).toBe(art.body._id);
  });

  it('Can be deleted', async () =>{
    let art = await createArticle('newTitle2');
    let req = await request(app)
      .delete(`/workcast/user/${user._id}/article/${art.body._id}`)
      .set('auth_token',APP_TOKEN)
      .send();

    expect(req.statusCode).toEqual(204);
  });


});