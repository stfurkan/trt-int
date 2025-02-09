# TRT International News Platform

A modern, multilingual news aggregation platform that unifies content from various TRT (Turkish Radio and Television Corporation) international platforms into a single, seamless experience.

## 🌟 Features

- **Multilingual Support**: Supports 7 languages:

  - French (TRT Français)
  - Arabic (TRT Arabi)
  - Bosnian (TRT Balkan)
  - Albanian (TRT Balkan)
  - Macedonian (TRT Balkan)
  - Russian (TRT Russian)
  - German (TRT Deutsch)

- **Modern Architecture**:

  - Next.js 15 frontend with server-side rendering
  - Express.js backend API
  - RESTful API design with Swagger documentation
  - TypeScript support for enhanced type safety

- **User Experience**:
  - Responsive design for all devices
  - Fast page loads with SSR
  - RTL support for Arabic content
  - Elegant UI with Tailwind CSS

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone [this-repository-url]
   cd trt-int
   ```

2. **Install dependencies**

   ```bash
   # Install API dependencies
   cd api
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # In frontend folder
   cp .env.example .env.local
   ```

4. **Start development servers**

   ```bash
   # Start API server (from api directory)
   npm run dev

   # Start frontend server (from frontend directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs

## 📚 Documentation

- [API Documentation](./api/README.md)
- [Frontend Documentation](./frontend/README.md)

## 🔧 Development

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.x.x
- Git

## 🔐 Security

- CORS protection
- Rate limiting
- Helmet.js security headers
- Input validation
- Error handling

## 🌐 Deployment

The application can be deployed as two separate services:

1. **API Deployment**

   - Can be deployed to any Node.js hosting platform

2. **Frontend Deployment**
   - Vercel/Netlify deployment supported out of the box
   - Environment variables required for API connection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
