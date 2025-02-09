import { fetchAndTransformContent } from '../services/contentService.js';
import { logger } from '../utils/logger.js';

export async function getContent(req, res, next) {
  try {
    const { language, type, page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 150;

    const result = await fetchAndTransformContent({
      language,
      type,
      page: pageNumber,
      limit: itemsPerPage
    });
    res.json(result);
  } catch (error) {
    logger.error('Error in getContent:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch content'
      }
    });
  }
}

export async function getContentById(req, res, next) {
  try {
    const { id } = req.params;

    // Fetch all content and find the specific item
    const allContent = await fetchAndTransformContent({
      limit: 1000,
      page: 1
    });

    const contentItem = allContent.items.find((item) => item.id === id);

    if (!contentItem) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Content not found'
        }
      });
    }

    const response = {
      success: true,
      item: contentItem
    };

    res.json(response);
  } catch (error) {
    logger.error('Error in getContentById:', error);
    next(error);
  }
}
