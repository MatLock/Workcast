const userService = require('../service/UserService');

const createUser = async (req,res) =>{
  try{
    let newUser = await userService.createUser(req.body);
    res.status(201);
    res.json(newUser);
  }catch (error) {
    res.status(400);
    res.json({message:error.message});
  }
};

module.exports ={
  createUser
};
