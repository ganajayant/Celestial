import { Router } from "express";

import { GetUser, GetUserUsingID, GetUserUsingSearch, UpdateUser } from "../controllers/user.js";

const router = Router()

router.get('/', GetUser)
router.get('/:id', GetUserUsingID)
router.post('/:search', GetUserUsingSearch)
router.put('/', UpdateUser)

export default router;