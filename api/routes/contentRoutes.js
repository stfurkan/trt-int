import express from 'express';
import { validateQueryParams } from '../middleware/validateQueryParams.js';
import {
  getContent,
  getContentById
} from '../controllers/contentController.js';

export const router = express.Router();

/**
 * @swagger
 * /api/content:
 *   get:
 *     summary: Get content with pagination and filtering
 *     description: Retrieves content items with optional language filtering and pagination
 *     tags: [Content]
 *     parameters:
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *           enum: [fra, ara, bos, sqi, mkd, rus, deu]
 *         description: Language code (fra - French, ara - Arabic, bos - Bosnian, sqi - Albanian, mkd - Macedonian, rus - Russian, deu - German)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [article, video, infographic]
 *         description: Content type filter
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 150
 *           default: 9
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ContentItem'
 *                 total:
 *                   type: integer
 *                   description: Total number of items
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Items per page
 *                 total_pages:
 *                   type: integer
 *                   description: Total number of pages
 *       400:
 *         description: Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/content', validateQueryParams, getContent);

/**
 * @swagger
 * /api/content/{id}:
 *   get:
 *     summary: Get content by ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Content ID
 *     responses:
 *       200:
 *         description: Successfully retrieved content item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 item:
 *                   $ref: '#/components/schemas/ContentItem'
 *       404:
 *         description: Content not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/content/:id', getContentById);
