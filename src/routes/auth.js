import express from "express";
import { 
    registerUser,
    loginUser,
    refreshToken,
    verifyEmail,
    verifyPassword,
} from "../controllers/auth.js";
import { isAuthenticated } from "../utils/utils.js";

const authRouter = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
*       User:
*           type: object
*           required:
*               - email
*               - password
*           properties:
*               id:
*                   type: string
*                   format: uuid
*               email:
*                   type: string
*               password: 
*                   type: string
*               role:
*                   type: string
*                   default: client
*               date_joined:
*                   type: date
*                   default: now()
*               last_login:
*                   type: date
*/

/**
 * @swagger
 * tags:
 *     name: Auth
 *     description: Auth endpoint manager
*/

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user: 
 *                                  type: object
 *                                  properties:
 *                                      user_id:
 *                                          type: string
 *                                          format: uuid
 *                                      email:
 *                                          type: string
 *                                      last_login:
 *                                          type: string
 *                              access-token:
 *                                  type: string
 *                              refresh_token:
 *                                  type: string
 */
authRouter.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user: 
 *                                  type: object
 *                                  properties:
 *                                      user_id:
 *                                          type: string
 *                                          format: uuid
 *                                      email:
 *                                          type: string
 *                                      last_login:
 *                                          type: string
 *                              access-token:
 *                                  type: string
 *                              refresh_token:
 *                                  type: string    
 */
authRouter.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *  delete:
 *      tags: [Auth]
 * 
 */
authRouter.delete("/logout", ()=>{})

/**
 * @swagger
 * /api/auth/token/refresh:
 *  post:
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: 
 *                          - user_id
 *                          - refresh_token
 *                      properties:
 *                          user_id:
 *                              type: string
 *                          refresh_token:
 *                              type: string
 *      responses: 
 *          201:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              access_token:
 *                                  type: string
 */
authRouter.post("/token/refresh", refreshToken);

/**
 * @swagger
 * /api/auth/email/verify:
 *  post:
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                      properties:
 *                          email:
 *                              type: string
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email_exists:
 *                                  type: boolean
 */
authRouter.post("/email/verify", verifyEmail);

/**
 * @swagger
 * /api/auth/password/verify:
 *  post:
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - password
 *                      properties:
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              password_valid:
 *                                  type: boolean
 */
authRouter.post("/password/verify", isAuthenticated, verifyPassword);

export default authRouter;