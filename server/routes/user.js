import { Router } from "express";

import { DeleteUser, GetUser, GetUsers, GetUserUsingID, GetUserUsingSearch, Login, Logout, SendOTP, Signup, UpdateBookmark, UpdateFollow, UpdatePassword, UpdateUser } from "../controllers/user.js";
import JWTVERIFY from "../middlewares/jwt.js";

const router = Router()

// User Routes
router.get('/', GetUser)
router.get('/:id', JWTVERIFY, GetUserUsingID)
router.get('/usersearch/:search', JWTVERIFY, GetUserUsingSearch)
router.get('/users/all', JWTVERIFY, GetUsers)

// User Delete
router.delete('/:id', JWTVERIFY, DeleteUser)

// User Update
router.put('/', JWTVERIFY, UpdateUser)
router.put('/:id', JWTVERIFY, UpdatePassword)
router.put('/updatefollow/:id', JWTVERIFY, UpdateFollow)
router.put('/bookmark/:id', JWTVERIFY, UpdateBookmark)

// User Authentication
router.post('/auth/signup', Signup)
router.post('/auth/login/', Login)
router.get('/auth/logout', Logout)
router.post('/auth/otp', SendOTP)

export default router;