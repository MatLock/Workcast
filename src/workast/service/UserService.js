const userModel = require('../model/User');

const createUser = async (user) =>{
  let newUser = await userModel.create(user);
  return newUser;
};

const getUser = async (id) =>{
  let user = await userModel.findOne({_id:id});
  return user;
};

module.exports = {
  createUser,
  getUser
};


