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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Article:
 *        type: object
 *        required:
 *          - title
 *          - text
 *        properties:
 *          title:
 *            type: string
 *            description: title, needs to be unique
 *          text:
 *            type: string
 *            description: content of the article
 *          tags:
 *            type: array
 *            items:
 *              type: string
 *        example:
 *           title: myTitle
 *           text: content
 *           tags: [tag1,tag2]
 *      ArticleResponse:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          userId:
 *            type: string
 *          createdAt:
 *            type: string
 *            pattern: 'yyyy-MM-dd HH:mm:SS'
 *          updatedAt:
 *            type: string
 *            pattern: 'yyyy-MM-dd HH:mm:SS'
 *          title:
 *            type: string
 *          text:
 *            type: string
 *          tags:
 *            type: array
 *            items:
 *              type: string
 *        example:
 *           name: myTitle
 *           avatar: content
 *           tags: [tag1,tag2]
 *           _id: 123abcdef
 *           createdAt: 2020-02-06T00:22:26.360Z
 *           updatedAt: 2020-02-06T00:22:26.360Z
 *
 */

/**
 * @swagger
 * path:
 *  /workcast/article/all:
 *    get:
 *      summary: Obtains all the articles from all users for a given tag
 *      parameters:
 *        - name: auth_token
 *          in: header
 *          description: auth token
 *          required: true
 *        - name: tags
 *          in: query
 *          schema:
 *            type: string
 *            format: string
 *          description: comma separated tags
 *          required: true
 *          example:
 *            tag1,tag2
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArticleResponse'
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Message'
 *        "401":
 *          description: Unauthorized
 *
 *  /workcast/user/{user}/article:
 *    post:
 *      summary: Create a new Article for a given user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Article'
 *      parameters:
 *        - name: user
 *          in: path
 *          description: user id
 *          required: true
 *        - name: auth_token
 *          in: header
 *          description: App token needed to invoke APIS
 *          required: true
 *          example:
 *            5CD4ED173E1C95FE763B753A297D5
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArticleResponse'
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Message'
 *        "401":
 *          description: Unauthorized
 *  /workcast/user/{user}/article/{article}:
 *    get:
 *      summary: endpoint to obtain an article for a given user
 *      parameters:
 *        - name: article
 *          in: path
 *          description: article id
 *          required: true
 *        - name: user
 *          in: path
 *          description: user id
 *          required: true
 *        - name: auth_token
 *          in: header
 *          description: App token needed to invoke APIS
 *          required: true
 *          example:
 *            5CD4ED173E1C95FE763B753A297D5
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArticleResponse'
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Message'
 *        "401":
 *          description: Unauthorized
 *    delete:
 *      summary: endpoint to delete an article for a given user
 *      parameters:
 *        - name: article
 *          in: path
 *          description: article id
 *          required: true
 *        - name: user
 *          in: path
 *          description: user id
 *          required: true
 *        - name: auth_token
 *          in: header
 *          description: App token needed to invoke APIS
 *          required: true
 *          example:
 *            5CD4ED173E1C95FE763B753A297D5
 *      responses:
 *        "204":
 *          description: No Content
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Message'
 *        "401":
 *          description: Unauthorized
 *    patch:
 *      summary: Update an Article for a given user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Article'
 *      parameters:
 *        - name: user
 *          in: path
 *          description: user id
 *          required: true
 *        - name: auth_token
 *          in: header
 *          description: App token needed to invoke APIS
 *          required: true
 *          example:
 *            5CD4ED173E1C95FE763B753A297D5
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArticleResponse'
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Message'
 *        "401":
 *          description: Unauthorized
 *
 */