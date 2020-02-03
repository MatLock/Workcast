const userModel = require('../model/User');

const createUser = async (user) =>{
  validate(user);
  let newUser = await userModel.create(user);
  return newUser;
};

const getUser = async (id) =>{
  let user = await userModel.findOne({_id:id});
  return user;
};

const validate = (user) =>{
  if(!user){
    throw new Error('user cannot be null');
  }
  if(!user.name){
    throw new Error('name is required');
  }
  /*if(!user.avatar){
    throw new Error('avatar is required');
  }*/
};

module.exports = {
  createUser,
  getUser
};


