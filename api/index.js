import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { router as contentRouter } from './routes/contentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import config from './config/config.js';
import { logger } from './utils/logger.js';

const app = express();

// Security and optimization middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
);
app.use(compression());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(rateLimit(config.rateLimit));

// Swagger UI
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Unified Content API Documentation'
  })
);

// Export Swagger spec as JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/api', contentRouter);

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
