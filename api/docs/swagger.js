import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Unified Content API for TRT multilingual content',
    version: '1.0.0',
    description:
      'A unified API for accessing multilingual content from various TRT platforms'
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server'
    }
  ],
  tags: [
    {
      name: 'Content',
      description: 'Content operations'
    }
  ],
  components: {
    schemas: {
      Author: {
        type: 'object',
        properties: {
          firstname: {
            type: 'string',
            description: 'First name of the author'
          },
          lastname: {
            type: 'string',
            description: 'Last name of the author'
          },
          image: {
            type: 'string',
            description: "URL of the author's image"
          }
        }
      },
      ContentItem: {
        type: 'object',
        required: ['id', 'type', 'title', 'published_date'],
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier'
          },
          type: {
            type: 'string',
            enum: ['article', 'video'],
            description: 'Content type'
          },
          title: {
            type: 'string',
            description: 'Content title'
          },
          description: {
            type: 'string',
            description: 'Content description'
          },
          path: {
            type: 'string',
            description: 'Content path/URL'
          },
          published_date: {
            type: 'string',
            format: 'date-time',
            description: 'Publication date'
          },
          authors: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Author'
            }
          }
        }
      },
      ContentResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Success status of the request'
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ContentItem'
            }
          },
          total: {
            type: 'integer',
            description: 'Total number of items'
          },
          page: {
            type: 'integer',
            description: 'Current page number'
          },
          limit: {
            type: 'integer',
            description: 'Items per page (max 150)'
          },
          total_pages: {
            type: 'integer',
            description: 'Total number of pages'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            default: false,
            description: 'Success status'
          },
          error: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Error message'
              }
            }
          }
        }
      }
    },
    parameters: {
      languageParam: {
        in: 'query',
        name: 'language',
        schema: {
          type: 'string',
          enum: ['fra', 'ara', 'bos', 'sqi', 'mkd', 'rus', 'deu'],
          description:
            'ISO 639-2 language codes: fra (French), ara (Arabic), bos (Bosnian), sqi (Albanian), mkd (Macedonian), rus (Russian), deu (German)'
        }
      },
      typeParam: {
        in: 'query',
        name: 'type',
        schema: {
          type: 'string',
          enum: ['article', 'video']
        },
        description: 'Content type filter'
      },
      pageParam: {
        in: 'query',
        name: 'page',
        schema: {
          type: 'integer',
          default: 1,
          minimum: 1
        },
        description: 'Page number'
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

export const swaggerSpec = swaggerJsdoc(options);
