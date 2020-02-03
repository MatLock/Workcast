const bodyParser = require('body-parser');
const express = require('express');
const userMiddleware = require('./workast/middlewares/UserMiddleware');
const articleMiddleware = require('./workast/middlewares/ArticleMiddleware');
const userController = require('../src/workast/controller/UserController');
const articleController = require('../src/workast/controller/ArticleController');
const mongoose = require('mongoose');

const APP_KEY = process.env.APP_KEY;

const app = express();

mongoose.connect('mongodb://localhost:27017/workcast',{ useNewUrlParser: true,useUnifiedTopology: true,'useFindAndModify':true})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// CONFIG
app.set('port',process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//MIDDLEWARES
app.param('user',userMiddleware);
app.param('article',articleMiddleware);

// ROUTES
app.post('/workcast/user/create',userController.createUser);
app.post('/workcast/user/:user/article/create',articleController.createArticle);
app.get('/workcast/user/:user/article/:article',articleController.getArticle);
app.delete('/workcast/user/:user/article/:article',articleController.deleteArticle);
app.patch('/workcast/user/:user/article/:article',articleController.updateArticle);
app.get('/workcast/article/all',articleController.getArticlesByTag);

module.exports = app;