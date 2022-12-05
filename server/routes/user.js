import { Router } from "express";

import { DeleteUser, GetUser, GetUsers, GetUserUsingID, GetUserUsingSearch, Login, Logout, Signup, UpdateBookmark, UpdateFollow, UpdatePassword, UpdateUser } from "../controllers/user.js";

const router = Router()

// User Routes
router.get('/', GetUser)
router.get('/:id', GetUserUsingID)
router.post('/:search', GetUserUsingSearch)
router.get('/users/all', GetUsers)
router.delete('/:id', DeleteUser)

// User Update
router.put('/', UpdateUser)
router.put('/:id', UpdatePassword)
router.put('/updatefollow/:id', UpdateFollow)
router.put('/bookmark/:id', UpdateBookmark)

// User Authentication
router.post('/auth/signup', Signup)
router.post('/auth/login/', Login)
router.get('/auth/logout', Logout)

export default router;