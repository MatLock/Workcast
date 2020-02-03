const userService = require('../service/UserService');

userMiddleware = async (req,res,next,id) => {
  let user = await userService.getUser(id);
  if(!user){
    res.status(404);
    res.json({message:`User with id: ${id} not found`});
  }
  req.user = user;
  next();
};

module.exports = userMiddleware;
