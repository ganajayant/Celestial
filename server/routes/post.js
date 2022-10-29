import { Router } from "express";

import { PostData, PostId, PostUpload } from "../controllers/post.js";

const router = Router()

router.post('/', PostUpload)
router.get('/', PostData)
router.get('/:id', PostId)

export default router;