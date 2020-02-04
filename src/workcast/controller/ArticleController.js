const articleService = require('../service/ArticleService');

const createArticle = async (req,res) =>{
  try{
    let art = await articleService.createArticle(req.body,req.user);
    onResponse(201,art,res);
  }catch (e) {
    onError(500,e.message,res);
  }
};

const deleteArticle = async (req,res) =>{
  try{
    await articleService.deleteArticle(req.article);
    onResponse(204,null,res);
  }catch (e) {
    onError(500,e.message,res);
  }
};

const updateArticle = async (req,res) =>{
  try {
    let article = await articleService.updateArticle(req.body,req.article);
    onResponse(200,article,res);
  }catch (e) {
    onError(500,error.message,res);
  }
};

const getArticlesByTag = async (req,res) =>{
  try{
    let articles = await articleService.getArticlesByTag(req.query.tags.split(','));
    onResponse(200,articles,res);
  }catch(e){
    onError(500,error.message,res);
  }
};

const getArticle = async (req,res) =>{
  res.json(req.article);
};

const onError = (status,error,res) =>{
  res.status(status);
  res.json({message:error});
};

const onResponse = (status,obj,res) =>{
  res.status(status);
  if(obj){
    res.json(obj);
  }else{
    res.send();
  }
};

module.exports = {
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
  getArticlesByTag
};
