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
/**
 * @swagger
 *  components:
 *    schemas:
 *      Message:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *        example:
 *          message: error
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - avatar
 *        properties:
 *          name:
 *            type: string
 *            description: username, needs to be unique
 *          avatar:
 *            type: string
 *            format: url
 *            description: url for the avatar of the user
 *        example:
 *           name: username
 *           avatar: http://my-avatar.com
 *      UserResponse:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          avatar:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *            pattern: 'yyyy-MM-dd HH:mm:SS'
 *          updatedAt:
 *            type: string
 *            pattern: 'yyyy-MM-dd HH:mm:SS'
 *        example:
 *          createdAt: 2020-02-06T00:22:26.360Z
 *          updatedAt: 2020-02-06T00:22:26.360Z
 *          name: username
 *          avatar: http://my-avatar.com
 *          _id: abc123def
 *
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User model
 */

/**
 * @swagger
 * path:
 *  /workcast/user/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      parameters:
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
 *                $ref: '#/components/schemas/UserResponse'
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Message'
 *        "401":
 *          description: Unauthorized
 */