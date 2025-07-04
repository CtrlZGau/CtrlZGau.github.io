# Robotics Portfolio Website

A modern, responsive robotics-themed portfolio website built with React, TypeScript, and Express.js. Features cinematic animations, MonkeyType yellow accents, and Bear Blog integration.

## 🚀 Features

- **Dark Theme**: Sleek black background with MonkeyType yellow (#e2b714) accents
- **Cinematic Hero Section**: Typewriter effect with animated circuit patterns and floating particles
- **Interactive Navigation**: Smooth scrolling with responsive mobile menu
- **Project Showcase**: Detailed robotics projects with technologies and demo links
- **Skills Section**: Animated progress bars and expertise areas
- **Blog Integration**: Ready for Bear Blog RSS feed integration
- **Contact Form**: Validated form with real-time feedback
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** + **shadcn/ui** for components
- **TanStack Query** for data fetching
- **React Hook Form** + **Zod** for form validation
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** (with Neon Database support)
- **Zod** for validation

### Build Tools
- **Vite** for development and building
- **esbuild** for production builds
- **TypeScript** for type safety

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd robotics-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Add your database URL and other secrets:
```env
DATABASE_URL="your_postgresql_connection_string"
# Add other environment variables as needed
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Set to "production" for production builds

### Database Setup

The application uses PostgreSQL with Drizzle ORM. To set up the database:

1. Create a PostgreSQL database (recommended: Neon Database)
2. Add the connection string to your `.env` file
3. Run database migrations:
```bash
npm run db:push
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema changes

## 🎨 Customization

### Colors
The primary color scheme uses MonkeyType yellow (#e2b714). To customize:
- Edit `client/src/index.css` for CSS variables
- Update `client/src/lib/constants.ts` for JavaScript constants

### Content
- Update personal information in component files
- Add your projects in `client/src/components/projects-section.tsx`
- Modify skills in `client/src/components/skills-section.tsx`
- Update contact information in `client/src/components/contact-section.tsx`

### Blog Integration
To connect with Bear Blog:
1. Update the blog section component with your Bear Blog RSS feed
2. Configure the API endpoint in `server/routes.ts`

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/        # shadcn/ui components
│   │   │   └── *.tsx      # Custom components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configuration
│   │   └── pages/         # Page components
│   └── index.html         # HTML template
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── vite.ts           # Vite middleware
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema
└── package.json          # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔧 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all environment variables are set
3. Verify database connection
4. Check that all dependencies are installed

For additional help, please open an issue in the repository.