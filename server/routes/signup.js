import { Router } from 'express';

import { Signup } from '../controllers/user.js';

const router = Router()

router.post('/', Signup)

export default router;  