# Deployment Guide

## GitHub Setup

1. **Create a new repository on GitHub**
   - Go to GitHub and create a new repository
   - Don't initialize with README (we have one)

2. **Initialize Git and push**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Robotics portfolio website"
   git branch -M main
   git remote add origin https://github.com/yourusername/robotics-portfolio.git
   git push -u origin main
   ```

## Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and configure:
# - Framework: Other
# - Build command: npm run build
# - Output directory: dist
# - Install command: npm install
```

**Environment Variables in Vercel:**
- Add `DATABASE_URL` in Vercel dashboard
- Add `NODE_ENV=production`

### 2. Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Configure:
# - Build command: npm run build
# - Publish directory: dist
```

### 3. Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway login
railway init
railway up
```

### 4. Render
1. Connect your GitHub repository
2. Configure:
   - Build command: `npm run build`
   - Start command: `npm start`
   - Environment: Add `DATABASE_URL`

## Database Setup

### Neon Database (Recommended)
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string
4. Add to your environment variables

### Supabase
1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Add to your environment variables

### Local PostgreSQL
```bash
# Install PostgreSQL
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql

# Create database
createdb robotics_portfolio

# Connection string
DATABASE_URL="postgresql://username:password@localhost:5432/robotics_portfolio"
```

## Bear Blog Integration

To connect with your Bear Blog:

1. **Get your Bear Blog RSS feed URL**
   - Usually: `https://yourblog.bearblog.dev/feed/`

2. **Update the blog section**
   - Replace mock data in `server/storage.ts`
   - Add RSS parsing logic in `server/routes.ts`

3. **Example RSS integration:**
   ```typescript
   // In server/routes.ts
   import Parser from 'rss-parser';
   
   app.get("/api/blog/posts", async (req, res) => {
     try {
       const parser = new Parser();
       const feed = await parser.parseURL('https://yourblog.bearblog.dev/feed/');
       
       const posts = feed.items.map(item => ({
         id: item.guid,
         title: item.title,
         excerpt: item.contentSnippet?.substring(0, 150) + '...',
         date: new Date(item.pubDate).toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'short',
           day: 'numeric'
         }),
         category: item.categories?.[0] || 'Blog',
         link: item.link
       }));
       
       res.json(posts);
     } catch (error) {
       res.status(500).json({ error: 'Failed to fetch blog posts' });
     }
   });
   ```

## Custom Domain Setup

### Vercel
1. Add domain in Vercel dashboard
2. Configure DNS records as shown
3. Wait for SSL certificate

### Netlify
1. Add domain in Netlify dashboard
2. Update nameservers or add DNS records
3. Enable HTTPS

## Performance Optimizations

### Before Deployment
1. **Optimize images**
   - Use WebP format when possible
   - Compress images
   - Use appropriate sizes

2. **Bundle analysis**
   ```bash
   npm run build
   npx vite-bundle-analyzer dist
   ```

3. **Environment variables**
   - Never commit secrets to GitHub
   - Use platform-specific environment variable systems

### After Deployment
1. **Monitor performance**
   - Use Lighthouse for performance audits
   - Monitor Core Web Vitals
   - Check mobile performance

2. **SEO optimization**
   - Add meta tags
   - Create sitemap
   - Set up analytics

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (use Node 18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Database connection fails**
   - Verify connection string format
   - Check database credentials
   - Ensure database server is accessible

3. **Images not loading**
   - Check image paths and URLs
   - Verify image permissions
   - Use absolute URLs for external images

### Debug Commands
```bash
# Check build locally
npm run build
npm start

# Check for TypeScript errors
npm run check

# View build output
ls -la dist/
```