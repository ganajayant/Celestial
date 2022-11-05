import { Router } from "express";

import { PostData, PostId, PostIdByPostId, PostLike, PostsByList, PostUpload } from "../controllers/post.js";

const router = Router()

router.post('/', PostUpload)
router.post('/:id', PostIdByPostId)
router.get('/', PostData)
router.get('/:id', PostId)
router.post('/posts/list', PostsByList)
router.put('/like/:id', PostLike)
export default router;