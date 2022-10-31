import { Router } from "express";

import { PostData, PostId, PostIdByPostId, PostUpload } from "../controllers/post.js";

const router = Router()

router.post('/', PostUpload)
router.post('/:id', PostIdByPostId)
router.get('/', PostData)
router.get('/:id', PostId)

export default router;