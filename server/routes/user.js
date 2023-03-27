import { Router } from "express";

import { DeleteUser, GetUser, GetUsers, GetUserUsingID, GetUserUsingSearch, Login, Logout, SendOTP, Signup, UpdateBookmark, UpdateFollow, UpdatePassword, UpdateUser } from "../controllers/user.js";
import JWTVERIFY from "../middlewares/jwt.js";

const router = Router()

// User Routes

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user information
 *     description: Retrieve user information based on authentication token
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: User ID
 *                 name:
 *                   type: string
 *                   description: User's name
 *                 username:
 *                   type: string
 *                   description: User's username
 *                 role:
 *                   type: string
 *                   description: User's role
 *                 email:
 *                   type: string
 *                   description: User's email address
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: User's account creation date
 *                 ImageURL:
 *                   type: string
 *                   description: URL of user's profile image
 *                 bio:
 *                   type: string
 *                   description: User's bio or description
 *                 followers:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: User IDs of followers
 *                   description: Array of user IDs of followers
 *                 following:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: User IDs of following users
 *                   description: Array of user IDs of following users
 *                 bookmarks:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: IDs of bookmarked items
 *                   description: Array of bookmarked item IDs
 *       401:
 *         description: Invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/', GetUser)

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user account was created
 *         ImageURL:
 *           type: string
 *           description: The user's profile image URL
 *         bio:
 *           type: string
 *           description: The user's bio
 *         followers:
 *           type: integer
 *           description: The number of users following this user
 *         following:
 *           type: integer
 *           description: The number of users this user is following
 *
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their unique ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *         required: true
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
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid token
 *       '401':
 *         description: Access denied
 *       '404':
 *         description: User not found
 */

router.get('/:id', JWTVERIFY, GetUserUsingID)

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user account was created
 *         ImageURL:
 *           type: string
 *           description: The user's profile image URL
 *         bio:
 *           type: string
 *           description: The user's bio
 *         followers:
 *           type: integer
 *           description: The number of users following this user
 *         following:
 *           type: integer
 *           description: The number of users this user is following
 * 
 * /api/usersearch/{search}:
 *   get:
 *     summary: Search for a user by username
 *     parameters:
 *       - in: path
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: The username to search for
 *       - in: header
 *         name: auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: An authentication token
 *     responses:
 *       '200':
 *         description: A list of matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '401':
 *         description: Access denied, authentication token missing 
 *       '400':
 *         description: Invalid search term or Invalid token
 */
router.get('/usersearch/:search', JWTVERIFY, GetUserUsingSearch)

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user account was created
 *         ImageURL:
 *           type: string
 *           description: The user's profile image URL
 *         bio:
 *           type: string
 *           description: The user's bio
 *         followers:
 *           type: integer
 *           description: The number of users following this user
 *         following:
 *           type: integer
 *           description: The number of users this user is following
 * 
 * /users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get('/users/all', JWTVERIFY, GetUsers)

// User Delete

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user account was created
 *         ImageURL:
 *           type: string
 *           description: The user's profile image URL
 *         bio:
 *           type: string
 *           description: The user's bio
 *         followers:
 *           type: integer
 *           description: The number of users following this user
 *         following:
 *           type: integer
 *           description: The number of users this user is following
 * 
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Delete a user and their associated data (posts, comments, likes, bookmarks, following, and followers)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be deleted
 *         schema:
 *           type: string
 *       - in: header
 *         name: auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: An authentication token
 *     responses:
 *       200:
 *         description: The deleted user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized. User must be logged in to delete a user
 *       404:
 *         description: The requested user was not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', JWTVERIFY, DeleteUser)

// User Update

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update user profile.
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: An authentication token
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *                 description: The user's ID.
 *               bio:
 *                 type: string
 *                 description: The user's biography.
 *               name:
 *                 type: string
 *                 description: The user's name.
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The user's profile image.
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       400:
 *         description: Invalid user or missing required fields.
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.put('/', JWTVERIFY, UpdateUser)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Update user password
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user to update
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             oldpassword:
 *               type: string
 *             newpassword:
 *               type: string
 *         description: The user's old and new password
 *       - in: header
 *         name: auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: An authentication token
 *     responses:
 *       '200':
 *         description: Password Updated Successfully
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */
router.put('/:id', JWTVERIFY, UpdatePassword)

/**
 * @swagger
 * /users/updatefollow/{id}:
 *   put:
 *     summary: Update user's followers/following list.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *       - in: header
 *         name: auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: An authentication token.
 *       - in: body
 *         name: updateFollow
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             follows:
 *               type: boolean
 *             followedBy:
 *               type: string
 *     responses:
 *       200:
 *         description: Follow/Unfollow action performed successfully.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error
 */
router.put('/updatefollow/:id', JWTVERIFY, UpdateFollow)

/**
 * @swagger
 * /bookmark/{id}:
 *   put:
 *     summary: Update bookmark status of a post for a user
 *     tags: [Bookmarks]
 *     description: Update bookmark status of a post for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: header
 *         name: auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: An authentication token
 *       - in: body
 *         name: userid
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userid:
 *               type: string
 *           description: The user ID
 *     responses:
 *       200:
 *         description: Bookmarked/Unbookmarked the post successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: The post or user is not found
 */
router.put('/bookmark/:id', JWTVERIFY, UpdateBookmark)

// User Authentication
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user account was created
 *         ImageURL:
 *           type: string
 *           description: The user's profile image URL
 *         bio:
 *           type: string
 *           description: The user's bio
 *         followers:
 *           type: integer
 *           description: The number of users following this user
 *         following:
 *           type: integer
 *           description: The number of users this user is following
 * /auth/signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               message: User Added Successfully!
 *               user:
 *                 id: 1
 *                 name: John Doe
 *                 username: johndoe
 *                 email: johndoe@example.com
 *                 role: user
 *                 createdAt: '2022-04-01T10:00:00.000Z'
 *                 updatedAt: '2022-04-01T10:00:00.000Z'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid Request Body
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid OTP
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: No user found!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Server Error
 */
router.post('/auth/signup', Signup)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   description: JWT token for the logged in user
 *                 role:
 *                   type: string
 *                   description: Role of the logged in user
 *                   example: user
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Incorrect password or email not found
 *       '404':
 *         description: User not found or other error
 */
router.post('/auth/login/', Login)

/**
 * @swagger
 *
 * /auth/logout:
 *   get:
 *     summary: Logs out the current user by clearing the token cookie
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized request
 */
router.get('/auth/logout', Logout)

/**
 * @swagger
 * /auth/otp:
 *   post:
 *     summary: Send an OTP to the user's email address
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: The user's email address
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: The OTP was sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OTP sent to your mail
 *       '400':
 *         description: The request was invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Invalid request body
 *       '500':
 *         description: An error occurred while sending the OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error sending OTP
 */
router.post('/auth/otp', SendOTP)

export default router;