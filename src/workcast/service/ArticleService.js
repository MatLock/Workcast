const articleModel = require('../model/Article');

const createArticle = (article,user) =>{
  article.userId = user._id;
  validate(article);
  return articleModel.create(article);
};

const deleteArticle = async (article) =>{
  validate(article);
  let articleFound = await articleModel.findOneAndRemove({_id:article._id});
  if(!articleFound){
    throw new Error('Article not found');
  }
};

const updateArticle = (newArticle,oldArticle) =>{
  newArticle.userId = oldArticle.userId;
  validate(newArticle);
  return articleModel.findOneAndUpdate({_id: oldArticle._id}, newArticle, {new: true});
};

const getArticleById = (id,userId) =>{
  return articleModel.findOne({_id: id,userId:userId});
};

const getArticlesByTag = (list) =>{
  return articleModel.find({tags:{"$in":list}});
};

const validate = (article) =>{
  if(!article){
    throw new Error('Article cannot be null');
  }
  if(!article.title || !article.text || !article.userId){
    throw new Error('Article tittle, text and userId are mandatory');
  }
};

module.exports = {
  createArticle,
  getArticleById,
  getArticlesByTag,
  updateArticle,
  deleteArticle
};