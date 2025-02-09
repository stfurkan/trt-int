import fetch from 'node-fetch';
import config from '../config/config.js';
import { logger } from '../utils/logger.js';

const transformContent = (data, langCode) => {
  try {
    logger.info(`Transforming content for ${langCode}:`, {
      dataKeys: Object.keys(data),
      hasItems: !!data.items,
      hasArticles: !!data.articles,
      hasContent: !!data.content
    });

    let items = [];

    // TODO: Ask if there is more section
    // All possible content sections across all languages
    const contentSections = [
      'latest',
      'news',
      'featured',
      'headline',
      'mustRead',
      'opinion',
      'breakingNews',
      'explainers',
      'homepage_editors_pick',
      'issues',
      'mustSee',
      'socialVideos',
      'debats',
      'infographie',
      'lesvideoslespluspopulaires',
      'societe',
      'sport',
      'beliebteVideos',
      'featuredVideos'
    ];

    // Add items from each section if it exists
    contentSections.forEach((section) => {
      if (data[section]) {
        if (section === 'breakingNews' && data[section].content) {
          // Handle nested content in breakingNews
          items = [...items, ...data[section].content];
        } else if (Array.isArray(data[section])) {
          items = [...items, ...data[section]];
        }
      }
    });

    // Legacy support for other response structures
    if (data.items) {
      items = [...items, ...data.items];
    }
    if (data.articles) {
      items = [...items, ...data.articles];
    }
    if (data.content) {
      items = [...items, ...data.content];
    }

    // Remove duplicates based on id, path, or title
    items = items.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            (t.id && t.id === item.id) ||
            (t.path && t.path === item.path) ||
            (t.title && t.title === item.title)
        )
    );

    logger.info(`Found ${items.length} items for ${langCode}`);

    // Log author data for debugging
    items.forEach((item, index) => {
      if (item.authors && item.authors.length > 0) {
        logger.info(
          `Authors for item ${index} (${langCode}):`,
          JSON.stringify(item.authors)
        );
      }
    });

    const transformed = items.map((item) => ({
      id:
        item.id ||
        item._id ||
        item.path?.split('-').pop() ||
        String(Math.random()),
      type: determineContentType(item),
      title: item.title || '',
      description: item.description || item.summary || '',
      path: item.path || item.url || item.mainImageUrl || '',
      published_date:
        item.published_date ||
        item.publishedDate ||
        item.date ||
        new Date().toISOString(),
      authors: (item.authors || []).map((author) => {
        // Handle German format where full name is in userName
        if (author.userName && !author.firstName && !author.firstname) {
          const nameParts = author.userName.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          return {
            firstname: firstName,
            lastname: lastName,
            image: author.image || author.avatar || author.mainImage || ''
          };
        }

        // Handle other formats
        return {
          firstname:
            author.firstName || author.firstname || author.first_name || '',
          lastname:
            author.lastName || author.lastname || author.last_name || '',
          image: author.image || author.avatar || author.mainImage || ''
        };
      })
    }));

    logger.info(`Transformed ${transformed.length} items for ${langCode}`);
    return transformed;
  } catch (error) {
    logger.error(`Error transforming content for ${langCode}:`, error);
    return [];
  }
};

// Helper function to determine content type
const determineContentType = (item) => {
  // If type is explicitly set, use it
  if (item.type) {
    return item.type;
  }

  // Check for video indicators
  if (
    item.video_url ||
    item.videoUrl ||
    item.isVideo ||
    item.is_video ||
    item.media_type === 'video' ||
    item.mediaType === 'video' ||
    item.format === 'video' ||
    (item.path && /video|watch/i.test(item.path))
  ) {
    return 'video';
  }

  // Check for infographic indicators
  if (
    item.format === 'infographic' ||
    item.type === 'infographie' ||
    (item.path && /infographic|infographie/i.test(item.path))
  ) {
    return 'infographic';
  }

  // Default to article
  return 'article';
};

export async function fetchAndTransformContent({
  language,
  type,
  page = 1,
  limit = 150
}) {
  try {
    const apis = language ? { [language]: config.apis[language] } : config.apis;
    const ITEMS_PER_PAGE = Math.min(limit, 150); // Cap at 150 items max

    logger.info(
      `Fetching content for APIs with limit ${ITEMS_PER_PAGE}:`,
      Object.keys(apis)
    );

    const apiPromises = Object.entries(apis).map(async ([langCode, url]) => {
      try {
        logger.info(`Fetching content from ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${langCode} content: ${response.statusText}`
          );
        }

        const data = await response.json();
        logger.info(`Successfully fetched data for ${langCode}`);
        return transformContent(data, langCode);
      } catch (error) {
        logger.error(`Error fetching ${langCode} content:`, error);
        return [];
      }
    });

    const results = await Promise.allSettled(apiPromises);
    let allContent = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value)
      .flat()
      .filter(Boolean);

    logger.info(`Total items fetched before filtering: ${allContent.length}`);

    // Apply type filter if specified
    if (type) {
      allContent = allContent.filter((item) => item.type === type);
      logger.info(`Items after type filter: ${allContent.length}`);
    }

    // Sort by published date (newest first)
    allContent.sort(
      (a, b) => new Date(b.published_date) - new Date(a.published_date)
    );

    // Calculate pagination
    const totalItems = allContent.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const paginatedContent = allContent.slice(startIndex, endIndex);
    logger.info(
      `Returning ${paginatedContent.length} items for page ${currentPage} (limit: ${ITEMS_PER_PAGE})`
    );

    return {
      success: true,
      items: paginatedContent,
      total: totalItems,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      total_pages: totalPages
    };
  } catch (error) {
    logger.error('Error in fetchAndTransformContent:', error);
    throw error;
  }
}
