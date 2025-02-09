# TRT International News API

Express.js backend service that aggregates and transforms content from various TRT international platforms into a unified API format.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.x.x

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the server**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 📚 API Documentation

### Endpoints

#### Content Endpoints

1. **GET /api/content**

   - Retrieves content with pagination and filtering
   - Query Parameters:
     - `language` (string, enum): Language code [fra, ara, bos, sqi, mkd, rus, deu]
     - `type` (string, enum): Content type [article, video]
     - `page` (integer): Page number (default: 1)
     - `limit` (integer): Items per page (default: 9, max: 150)
   - Response: `ContentResponse`

2. **GET /api/content/:id**
   - Retrieves a specific content item by ID
   - Parameters:
     - `id` (string): Content ID
   - Response: Single `ContentItem`

### Data Models

#### ContentItem

```typescript
{
  id: string;
  type: 'article' | 'video';
  title: string;
  description?: string;
  path: string;
  published_date: string;
  authors: Author[];
}
```

#### Author

```typescript
{
  firstname: string;
  lastname: string;
  image?: string;
}
```

#### ContentResponse

```typescript
{
  success: boolean;
  items: ContentItem[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
```

## 🔧 Development

### Scripts

```bash
# Start development server
npm run dev

# Run tests
npm test

# Start production server
npm start
```

### Error Handling

The API uses a centralized error handling middleware that:

- Logs errors appropriately
- Sends standardized error responses
- Handles different types of errors (validation, not found, etc.)

### Middleware

1. **validateQueryParams**

   - Validates and sanitizes query parameters
   - Ensures proper types and ranges

2. **errorHandler**

   - Centralizes error handling
   - Standardizes error responses

3. **rateLimiter (express-rate-limit)**
   - Prevents abuse
   - Configurable limits

## 🔐 Security

### Implemented Measures

1. **CORS**

   - Configurable origins
   - Proper headers

2. **Rate Limiting**

   - Window-based limiting
   - Configurable thresholds

3. **Headers Security**

   - Helmet.js implementation
   - XSS protection
   - Content Security Policy

4. **Input Validation**
   - Query parameter validation
   - Data sanitization

## 📈 Performance

### Monitoring

- Winston logging
- Error tracking

## 🔄 Content Transformation

The API transforms content from various TRT platforms into a unified format:

1. **Standardization**

   - Consistent field names
   - Normalized data types
   - Unified date formats

## 🤝 Contributing

1. Follow the code style guidelines
2. Write tests for new features
3. Update documentation
4. Create detailed pull requests
