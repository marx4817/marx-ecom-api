import express from "express";

import { 
    createUserprofil,
    deleteProfil,
    getProfilUserById,
    myProfile,
    updateUserProfil
} from "../controllers/profil.js";
import { isAuthenticated } from "../middleware/authenticate.js";
import multerProfil from "../middleware/multer_config.js";

const profilRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Profile:
 *          type: object
 *          required:
 *              - id
 *              - user_id
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *              user_id:
 *                  type: string
 *                  format: uuid
 *              last_name:
 *                  type: string
 *              first_name:
 *                  type: string
 *              address:
 *                  type: string
 *              country:
 *                  type: string
 *              birth:
 *                  type: date
 *              image:
 *                  type: file
 */

/**
 * @swagger
 * tags:
 *  name: Profile
 *  description: Profile endpoint
 */

/**
 * @swagger
 * /api/profile/create:
 *  post:
 *      tags: [Profile]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Profile'
 *      responses:
 *          201:
 *              description: created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profilRouter.post("/create", isAuthenticated, multerProfil, createUserprofil)

/**
 * @swagger
 * /api/profile/update/{id}:
 *  put:
 *      tags: [Profile]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *                  format: uuid
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Profile'
 *      responses:
 *          200:
 *              description: update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profilRouter.put("/update/:id", isAuthenticated, multerProfil, updateUserProfil)

/**
 * @swagger
 * /api/profile/{id}:
 *  get:
 *      tags: [Profile]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *                  format: uuid
 *      responses:
 *          200:
 *              description: update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profilRouter.get('/:id', getProfilUserById)

/**
 * @swagger
 * /api/profile/delete/{id}:
 *  delete:
 *      tags: [Profile]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *                  format: uuid
 *      responses:
 *          200:
 *              description: 
 */
profilRouter.delete('/delete/:id', deleteProfil);



/**
 * @swagger
 * /api/profile/user/me:
 *  get:
 *      tags: [Profile]
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */


profilRouter.get("/user/me", isAuthenticated, myProfile)

export default profilRouter;