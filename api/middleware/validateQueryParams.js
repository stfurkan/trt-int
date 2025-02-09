import config from '../config/config.js';

export const validateQueryParams = (req, res, next) => {
  const { language, limit, offset, page } = req.query;

  // Validate language (if provided)
  if (language && !config.apis[language]) {
    return res.status(400).json({
      success: false,
      error: {
        message: `Invalid language code. Available languages: ${Object.keys(
          config.apis
        ).join(', ')}`
      }
    });
  }

  // Validate limit (if provided)
  let limitNum = 150; // Default limit
  if (limit) {
    limitNum = parseInt(limit);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 150) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Limit must be a number between 1 and 150'
        }
      });
    }
    req.query.limit = limitNum;
  }

  // Validate page (if provided) and convert to offset
  if (page) {
    const pageNum = parseInt(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Page must be a positive number'
        }
      });
    }
    // Convert page to offset
    req.query.offset = (pageNum - 1) * limitNum;
  }
  // Validate offset (if provided and page not provided)
  else if (offset) {
    const offsetNum = parseInt(offset);
    if (isNaN(offsetNum) || offsetNum < 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Offset must be a non-negative number'
        }
      });
    }
    req.query.offset = offsetNum;
  }

  // TODO: Validate type

  next();
};
