import { Router } from "express";

import { DeletePost, PostComment, PostData, PostId, PostIdByPostId, PostLike, PostsByList, PostUpload } from "../controllers/post.js";

const router = Router()

router.post('/', PostUpload)
router.post('/:id', PostIdByPostId)
router.get('/', PostData)
router.get('/:id', PostId)
router.post('/posts/list', PostsByList)
router.put('/like/:id', PostLike)
router.put('/comment/:id', PostComment)
router.delete('/:id', DeletePost)

export default router;