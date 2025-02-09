# TRT International News Frontend

Next.js 15 frontend application for the TRT International News Platform, providing a modern and responsive user interface for accessing multilingual news content.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.x.x

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🎨 Features

### Multilingual Support

- Dynamic language routing (`/news/[lang]`)
- RTL support for Arabic
- Language-specific formatting
- Language switcher component

### Content Display

- Responsive article cards
- Author information display
- Publication date formatting
- Dynamic pagination
- Loading states
- Error handling

## 🔧 Development

### Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Next.js App Router
- **Components**: Shadcn/ui

### Component Structure

#### Page Components

1. **News Page** (`app/news/[lang]/page.tsx`)

   - Server-side rendering
   - Pagination handling
   - Language-specific metadata
   - Error boundaries

#### Reusable Components

1. **ArticleCard** (`components/article-card.tsx`)

   - Title and description
   - Author information
   - Publication date
   - Type indicator
   - Hover effects

2. **LanguageSelector** (`components/ui/language-selector.tsx`)
   - Language switching
   - Current language display
   - RTL support

### Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🤝 Contributing

1. Follow the code style guidelines
2. Write tests for new features
3. Update documentation
4. Create detailed pull requests
