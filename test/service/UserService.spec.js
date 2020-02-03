const dbHandler = require('../common/Handler');
const userService = require('../../src/workast/service/UserService');

beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('User',() =>{

  let user = {name:'username', avatar:'http://google.com'};

  it('can be created correctly',async() =>{
    expect(async () => await userService.createUser(user)).not.toThrow();
  });

  it('can be obtained', async () => {
    user.name = "newUsername";
    let userCreated = await userService.createUser(user);
    let u = await userService.getUser(userCreated._id)
    expect(u._id).not.toBeNull();
  });

});