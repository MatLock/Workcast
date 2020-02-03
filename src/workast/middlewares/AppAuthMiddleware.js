const APP_TOKEN = process.env.APP_TOKEN || '5CD4ED173E1C95FE763B753A297D5';

const onVerifyAppToken = (req,res,next) =>{
  let token = req.headers.auth_token;
  if(!token || APP_TOKEN !== token){
    res.status(401);
    res.send({message:'AUTH TOKEN missing or invalid'});
  }else{
    next();
  }
};

module.exports = onVerifyAppToken;
