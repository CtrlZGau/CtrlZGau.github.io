# Robotics Portfolio Web Application

## Overview

This is a full-stack web application for a robotics engineer's portfolio. The project is built with a modern tech stack featuring React with TypeScript on the frontend, Express.js on the backend, and PostgreSQL with Drizzle ORM for data management. The application showcases robotics projects, technical skills, blog posts, and provides a contact form for potential clients or collaborators.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with a custom dark theme optimized for robotics/tech aesthetics
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions and interactive elements

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Build Tool**: Vite for development and esbuild for production builds
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions
- **Development**: Hot module replacement with Vite middleware

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe database schema with Zod validation
- **Migrations**: Drizzle Kit for schema management
- **Fallback**: In-memory storage implementation for development/testing

## Key Components

### Database Schema
- **contacts**: Stores contact form submissions with name, email, subject, and message
- **blog_posts**: Manages blog content with title, excerpt, content, category, and external links
- **users**: User authentication system (prepared for future expansion)

### API Endpoints
- `POST /api/contact`: Handle contact form submissions with validation
- `GET /api/blog/posts`: Retrieve blog posts with proper formatting

### Frontend Sections
1. **Hero Section**: Animated introduction with typewriter effect and circuit board patterns
2. **About Section**: Professional background and expertise areas
3. **Projects Section**: Showcase of robotics projects with technologies used
4. **Skills Section**: Technical competencies with animated progress bars
5. **Blog Section**: Latest articles and research posts
6. **Contact Section**: Interactive contact form with real-time validation

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests, validate data, and interact with database
3. **Database Operations**: Drizzle ORM manages PostgreSQL operations with type safety
4. **Response Handling**: Structured JSON responses with proper error handling
5. **UI Updates**: React components update based on server responses and loading states

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: drizzle-orm and drizzle-zod for type-safe database operations
- **UI**: @radix-ui/* components for accessible UI primitives
- **State**: @tanstack/react-query for server state management
- **Forms**: @hookform/resolvers and react-hook-form for form handling
- **Validation**: zod for schema validation
- **Styling**: tailwindcss, class-variance-authority, and clsx for styling
- **Animation**: framer-motion for animations
- **Routing**: wouter for client-side routing

### Development Dependencies
- **Build**: vite, esbuild, and @vitejs/plugin-react
- **TypeScript**: Full TypeScript support with strict configuration
- **Development**: @replit/vite-plugin-runtime-error-modal for error handling

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Static Assets**: Vite handles asset optimization and bundling

### Environment Configuration
- **Development**: Hot module replacement with Vite middleware
- **Production**: Static file serving with Express
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Scripts
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run check`: TypeScript type checking
- `npm run db:push`: Database schema updates

## Changelog

```
Changelog:
- July 04, 2025. Initial setup with robotics portfolio website
- July 04, 2025. Added Bear Blog integration with API endpoints
- July 04, 2025. Fixed Progress component React warning
- July 04, 2025. Added comprehensive deployment documentation
- July 04, 2025. Project ready for GitHub deployment
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```