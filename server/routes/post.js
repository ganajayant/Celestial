import { Router } from "express";

import { DeletePost, PostComment, PostData, PostId, PostIdByPostId, PostLike, PostsByList, PostUpload } from "../controllers/post.js";
import JWTVERIFY from "../middlewares/jwt.js";

const router = Router()

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Upload a post with an image and caption
 *     tags: [Posts]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image to upload for the post
 *       - in: formData
 *         name: caption
 *         type: string
 *         description: The caption for the post
 *       - in: formData
 *         name: userid
 *         type: string
 *         description: The user ID associated with the post
 *       - in: header
 *         name: auth-token
 *         required: true
 *         description: JSON Web Token (JWT) for authentication.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The post was successfully uploaded
 *       '401':
 *         description: There was an error saving the post to the database
 *       '400':
 *         description: The token provided is invalid
 *       '500':
 *         description: Internal server error.
 */
router.post('/', JWTVERIFY, PostUpload)

/**
 * @swagger         
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         Userid:
 *           type: string
 *           description: The ID of the user who created the post.
 *         ImageURL:
 *           type: string
 *           description: The URL of the image associated with the post.
 *         Caption:
 *           type: string
 *           description: The caption of the post.
 *         Likes:
 *           type: array
 *           description: The array of user IDs who liked the post.
 *           items:
 *             type: string
 *         Comments:
 *           type: array
 *           description: The array of comments associated with the post.
 *           items:
 *             type: object
 *             properties:
 *               Userid:
 *                 type: string
 *                 description: The ID of the user who created the comment.
 *               Comment:
 *                 type: string
 *                 description: The content of the comment.
 *       required:
 *         - Userid
 *         - ImageURL
 *         - Caption
 * 
 * /post/{id}:
 *   post:
 *     summary: Retrieve a single post by post ID.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID to retrieve.
 *       - in: header
 *         name: auth-token
 *         required: true
 *         description: JSON Web Token (JWT) for authentication.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid JWT provided in Authorization header.
 *       '401':
 *         description: Access denied
 *       '404':
 *         description: Post not found.
 *       '500':
 *         description: Internal server error.
 */
router.post('/:id', JWTVERIFY, PostIdByPostId)


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         Userid:
 *           type: string
 *           description: The ID of the user who created the post.
 *         ImageURL:
 *           type: string
 *           description: The URL of the image associated with the post.
 *         Caption:
 *           type: string
 *           description: The caption of the post.
 *         Likes:
 *           type: array
 *           description: The array of user IDs who liked the post.
 *           items:
 *             type: string
 *         Comments:
 *           type: array
 *           description: The array of comments associated with the post.
 *           items:
 *             type: object
 *             properties:
 *               Userid:
 *                 type: string
 *                 description: The ID of the user who created the comment.
 *               Comment:
 *                 type: string
 *                 description: The content of the comment.
 *       required:
 *         - Userid
 *         - ImageURL
 *         - Caption 
 * 
 * /post:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     description: Retrieve a list of all posts from the database
 *     parameters:
 *       - in: header
 *         name: auth-token
 *         required: true
 *         description: JSON Web Token (JWT) for authentication.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '401':
 *         description: Access denied
 *       '400':
 *         description: Invalid Token
 */
router.get('/', JWTVERIFY, PostData)

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         Userid:
 *           type: string
 *           description: The ID of the user who created the post.
 *         ImageURL:
 *           type: string
 *           description: The URL of the image associated with the post.
 *         Caption:
 *           type: string
 *           description: The caption of the post.
 *         Likes:
 *           type: array
 *           description: The array of user IDs who liked the post.
 *           items:
 *             type: string
 *         Comments:
 *           type: array
 *           description: The array of comments associated with the post.
 *           items:
 *             type: object
 *             properties:
 *               Userid:
 *                 type: string
 *                 description: The ID of the user who created the comment.
 *               Comment:
 *                 type: string
 *                 description: The content of the comment.
 *       required:
 *         - Userid
 *         - ImageURL
 *         - Caption
 * 
 * /post/{id}:
 *   get:
 *     summary: Retrieve all posts by user ID.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to filter posts by.
 *       - in: header
 *         name: auth-token
 *         required: true
 *         description: JSON Web Token (JWT) for authentication.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of posts filtered by user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid JWT provided in Authorization header.
 *       '401':
 *         description: Access denied
 *       '404':
 *         description: No posts found for user ID.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', JWTVERIFY, PostId)


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         Userid:
 *           type: string
 *           description: The ID of the user who created the post.
 *         ImageURL:
 *           type: string
 *           description: The URL of the image associated with the post.
 *         Caption:
 *           type: string
 *           description: The caption of the post.
 *         Likes:
 *           type: array
 *           description: The array of user IDs who liked the post.
 *           items:
 *             type: string
 *         Comments:
 *           type: array
 *           description: The array of comments associated with the post.
 *           items:
 *             type: object
 *             properties:
 *               Userid:
 *                 type: string
 *                 description: The ID of the user who created the comment.
 *               Comment:
 *                 type: string
 *                 description: The content of the comment.
 *       required:
 *         - Userid
 *         - ImageURL
 *         - Caption
 * 
 * tags:
 *   name: Posts
 *   description: API for managing posts
 *
 * /post/list:
 *   post:
 *     summary: Get a list of posts by user ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               list:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               list: ["123", "456"]
 *     responses:
 *       '200':
 *         description: A list of posts that match the user IDs in the request body
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '401':
 *         description: Access denied
 *       '400':
 *         description: Invalid token
 */
router.post('/posts/list', JWTVERIFY, PostsByList)

/**
 * @swagger
 * /post/like/{id}:
 *   put:
 *     summary: Update the likes of a post.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to update.
 *         schema:
 *           type: string
 *       - in: header
 *         name: auth-token
 *         required: true
 *         description: JSON Web Token (JWT) for authentication.
 *         schema:
 *           type: string
 *       - in: body
 *         name: like
 *         required: true
 *         description: Specify whether to like or unlike the post.
 *         schema:
 *           type: object
 *           properties:
 *             liked:
 *               type: boolean
 *             userid:
 *               type: string
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 Userid:
 *                   type: string
 *                 Likes:
 *                   type: array
 *                   items:
 *                     type: string
 *       '400':
 *         description: Invalid token or request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '401':
 *         description: Access denied due to missing token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/like/:id', JWTVERIFY, PostLike)

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         Userid:
 *           type: string
 *           description: The ID of the user who created the post.
 *         ImageURL:
 *           type: string
 *           description: The URL of the image associated with the post.
 *         Caption:
 *           type: string
 *           description: The caption of the post.
 *         Likes:
 *           type: array
 *           description: The array of user IDs who liked the post.
 *           items:
 *             type: string
 *         Comments:
 *           type: array
 *           description: The array of comments associated with the post.
 *           items:
 *             type: object
 *             properties:
 *               Userid:
 *                 type: string
 *                 description: The ID of the user who created the comment.
 *               Comment:
 *                 type: string
 *                 description: The content of the comment.
 *       required:
 *         - Userid
 *         - ImageURL
 *         - Caption
 * 
 * /post/comment/{id}:
 *   put:
 *     summary: Add a comment to a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to add the comment to
 *         schema:
 *           type: string
 *       - in: header
 *         name: auth-token
 *         required: true
 *         description: JSON Web Token (JWT) for authentication.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               commenteduser:
 *                 type: string
 *             required:
 *               - comment
 *               - commenteduser
 *     responses:
 *       '200':
 *         description: The updated post object with the new comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid token
 *       '401':
 *         description: Authentication failed. JWT token not provided. Access denied.
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
router.put('/comment/:id', JWTVERIFY, PostComment)

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Deletes a post.
 *     description: Deletes a post by the given ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to delete.
 *         schema:
 *           type: string
 *       - in: header
 *         name: auth-token
 *         required: true
 *         description: JSON Web Token (JWT) for authentication.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post deleted successfully.
 *       '401':
 *         description: Access denied.
 *       '400':
 *         description: Invalid token.
 *       '404':
 *         description: Post not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/:id', JWTVERIFY, DeletePost)

export default router;