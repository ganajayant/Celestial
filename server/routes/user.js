import { Router } from "express";

import { GetUser, GetUserUsingID, GetUserUsingSearch, UpdatePassword, UpdateUser } from "../controllers/user.js";

const router = Router()

router.get('/', GetUser)
router.put('/:id', UpdatePassword)
router.get('/:id', GetUserUsingID)
router.post('/:search', GetUserUsingSearch)
router.put('/', UpdateUser)

export default router;