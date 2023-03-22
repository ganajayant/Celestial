import { Router } from "express";

import { DeletePost, PostComment, PostData, PostId, PostIdByPostId, PostLike, PostsByList, PostUpload } from "../controllers/post.js";
import JWTVERIFY from "../middlewares/jwt.js";

const router = Router()

router.post('/', JWTVERIFY, PostUpload)
router.post('/:id', JWTVERIFY, PostIdByPostId)
router.get('/', JWTVERIFY, PostData)
router.get('/:id', JWTVERIFY, PostId)
router.post('/posts/list', JWTVERIFY, PostsByList)
router.put('/like/:id', JWTVERIFY, PostLike)
router.put('/comment/:id', JWTVERIFY, PostComment)
router.delete('/:id', JWTVERIFY, DeletePost)

export default router;