import { Router } from "express";

import { News } from "../controllers/news.js";

const router = Router()

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get latest news from NASA
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Latest news from NASA
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *          description: Internal server error
 *          content:
 *              properties:
 *                  message:
 *                  type: string
 *                  description: Error message
 * 
 */
router.get('/', News)

export default router;