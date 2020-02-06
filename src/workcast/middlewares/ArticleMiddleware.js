const articleService = require('../service/ArticleService');

articleMiddleware = async (req,res,next,value) => {
  let article = await articleService.getArticleById(value,req.user._id);
  if(!article){
    res.status(404);
    res.json({message:`Article with id: ${value} not found`});
  }
  req.article = article;
  next();
};

module.exports = articleMiddleware;