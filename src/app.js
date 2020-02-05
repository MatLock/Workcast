const bodyParser = require('body-parser');
const express = require('express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose');

const userMiddleware = require('./workcast/middlewares/UserMiddleware');
const articleMiddleware = require('./workcast/middlewares/ArticleMiddleware');
const onVerifyAppToken = require('./workcast/middlewares/AppAuthMiddleware');
const userController = require('./workcast/controller/UserController');
const articleController = require('./workcast/controller/ArticleController');

const app = express();

const options = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:true
};

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["./src/*.js","./src/workcast/controller/*js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

mongoose.connect(process.env.MONGO || 'mongodb://localhost:27017/workcast',options)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

const unless = (path, middleware) =>{
  return (req, res, next) => {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

// CONFIG
app.set('port',process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/workcast/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//MIDDLEWARES
app.param('user',userMiddleware);
app.param('article',articleMiddleware);
app.use(unless('/workcast/api-docs',onVerifyAppToken));

// ROUTES
app.post('/workcast/user/create',userController.createUser);
app.post('/workcast/user/:user/article/create',articleController.createArticle);
app.get('/workcast/user/:user/article/:article',articleController.getArticle);
app.delete('/workcast/user/:user/article/:article',articleController.deleteArticle);
app.patch('/workcast/user/:user/article/:article',articleController.updateArticle);
app.get('/workcast/article/all',articleController.getArticlesByTag);

module.exports = app;