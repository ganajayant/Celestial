import { Router } from "express";

import { GetUser, GetUserUsingID, GetUserUsingSearch, Login, Logout, Signup, UpdateFollow, UpdatePassword, UpdateUser } from "../controllers/user.js";

const router = Router()

// User Routes
router.get('/', GetUser)
router.get('/:id', GetUserUsingID)
router.post('/:search', GetUserUsingSearch)

// User Update
router.put('/', UpdateUser)
router.put('/:id', UpdatePassword)
router.put('/updatefollow/:id', UpdateFollow)

// User Authentication
router.post('/auth/signup', Signup)
router.post('/auth/login/', Login)
router.get('/auth/logout', Logout)

export default router;