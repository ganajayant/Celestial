import { Router } from "express";

import { Login, Logout } from "../controllers/user.js";

const router = Router()

router.post('/', Login)
router.get('/', Logout)

export default router;