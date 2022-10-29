import { Router } from "express";

import { News } from "../controllers/news.js";

const router = Router()
router.get('/', News)

export default router;