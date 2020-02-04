const dbHandler = require('../common/Handler');
const userService = require('../../src/workcast/service/UserService');
const articleService = require('../../src/workcast/service/ArticleService');

let user = {name:"user",avatar:'http://google.com'};

beforeAll(async () => {
  await dbHandler.connect();
  user = await  userService.createUser(user);
});

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Articles', () => {
  let article = {title:'title',text:'customText',tags:['tag1']};

  it('can be created',() =>{
    expect(async () => await articleService.createArticle(article)).not.toBeNull();
  });

  it('can be obtained by Id', async () =>{
    let art = await articleService.createArticle(article,user);
    let artObtained = await articleService.getArticleById(art._id);
    expect(artObtained._id).toEqual(art._id);
  });

  it("can't be obtained if not exists",async () =>{
    let art =  await articleService.getArticleById('41224d776a326fb40f000001');
    expect(art).toBeNull();
  });

  it('can be updated',async () =>{
    let art = await articleService.createArticle(article,user);
    let artUpdated = await articleService.updateArticle({title:'new',text:'new'},art);
    expect(artUpdated.title).toEqual('new');
    expect(artUpdated.text).toEqual('new');
  });

  it('can be obtained by Tags',async () =>{
    let art = await articleService.createArticle(article,user);
    let articles = await articleService.getArticlesByTag(['tag1']);
    expect(articles).not.toBeNull();
    expect(articles.length).toBe(1);
    expect(articles[0]._id).toEqual(art._id);
  });

  it("can't be obtained if tags does not exists",async () =>{
    let arts = await articleService.getArticlesByTag(['ids']);
    expect(arts).toEqual([]);
  });

  it('can be deleted by Id', async () =>{
    let art = await articleService.createArticle(article,user);
    expect(async () => await articleService.deleteArticle(art)).not.toThrow();
  });
});