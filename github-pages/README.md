# GitHub Pages Robotics Portfolio

A clean, modern robotics portfolio website optimized for GitHub Pages deployment with MonkeyType yellow theme.

## 🚀 Quick Deploy to GitHub Pages

### Option 1: Create `username.github.io` Repository (Recommended)

1. **Create repository on GitHub:**
   - Repository name: `yourusername.github.io` (replace with your GitHub username)
   - Make it public
   - Don't initialize with README

2. **Upload these files:**
   ```
   yourusername.github.io/
   ├── index.html      ✅
   ├── styles.css      ✅
   ├── script.js       ✅
   └── README.md       ✅
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / root
   - Save

4. **Access your site:**
   - URL: `https://yourusername.github.io`
   - Usually live within 5-10 minutes

### Option 2: Project Repository

1. **Create repository:**
   - Name: `robotics-portfolio` (or any name)
   - Make it public

2. **Upload files to root directory**

3. **Enable GitHub Pages:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / root

4. **Access your site:**
   - URL: `https://yourusername.github.io/robotics-portfolio`

## 📁 File Structure

```
├── index.html          # Main HTML file
├── styles.css          # All styles with MonkeyType theme
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🎨 Features Included

### ✅ Design & Theme
- Dark theme with MonkeyType yellow (#e2b714) accents
- Responsive design for all devices
- Smooth animations and transitions
- Circuit board pattern background
- Floating particles animation

### ✅ Sections
- **Hero Section**: Typewriter effect with terminal-style branding
- **About Section**: Professional background with stats
- **Projects Section**: 6 robotics projects with tech stacks
- **Skills Section**: Animated progress bars and expertise areas
- **Blog Section**: Ready for Bear Blog integration
- **Contact Section**: Working contact form with validation

### ✅ Interactive Features
- Smooth scrolling navigation
- Mobile-responsive hamburger menu
- Animated skill progress bars
- Contact form with validation
- Scroll-to-top button
- Custom cursor effect (desktop)
- Intersection Observer animations

## 🛠️ Customization Guide

### Personal Information
1. **Update Hero Section** (line 48 in index.html):
   ```html
   <span class="typewriter" data-text="Your_Name"></span>
   ```

2. **Contact Information** (lines 418-445):
   ```html
   <div class="contact-value">your@email.com</div>
   <div class="contact-value">+1 (555) 123-4567</div>
   <div class="contact-value">Your City, State</div>
   ```

3. **Social Links** (lines 471-487):
   ```html
   <a href="https://github.com/yourusername" class="social-icon">
   <a href="https://linkedin.com/in/yourusername" class="social-icon">
   <a href="https://twitter.com/yourusername" class="social-icon">
   ```

### Projects Section
Replace the placeholder projects (lines 152-350) with your actual projects:
```html
<div class="project-card">
    <div class="project-image">
        <img src="your-project-image.jpg" alt="Your Project">
        <div class="project-icon">🤖</div>
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Your project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
        <div class="project-links">
            <a href="your-demo-link" class="project-link">Live Demo</a>
            <a href="your-github-link" class="project-link">Code</a>
        </div>
    </div>
</div>
```

### Skills Section
Update your technical skills (lines 374-424):
```html
<div class="skill-item">
    <div class="skill-header">
        <span>Your Skill</span>
        <span>90%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" data-width="90"></div>
    </div>
</div>
```

### Colors
To change the yellow accent color, edit the CSS variables in styles.css (lines 8-18):
```css
:root {
    --primary: #e2b714;        /* Main yellow color */
    --primary-light: #f4c430;  /* Lighter yellow */
    --primary-dark: #b8940f;   /* Darker yellow */
}
```

## 🔗 Bear Blog Integration

To connect with your Bear Blog:

1. **Get your blog's RSS feed URL**
2. **Replace blog content** in index.html (lines 440-500)
3. **Optional**: Add JavaScript to fetch real posts:

```javascript
// Add to script.js
async function fetchBlogPosts() {
    try {
        // Use a CORS proxy for RSS feeds
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=YOUR_BEAR_BLOG_RSS_URL');
        const data = await response.json();
        
        const blogGrid = document.querySelector('.blog-grid');
        blogGrid.innerHTML = '';
        
        data.items.slice(0, 3).forEach(post => {
            const blogCard = createBlogCard(post);
            blogGrid.appendChild(blogCard);
        });
    } catch (error) {
        console.log('Using fallback blog posts');
    }
}

function createBlogCard(post) {
    // Create blog card HTML
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.innerHTML = `
        <div class="blog-header">
            <div class="blog-category">
                <span class="category-icon">📝</span>
                <span class="category-name">Blog</span>
            </div>
        </div>
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <div class="blog-footer">
            <span class="blog-date">${new Date(post.pubDate).toLocaleDateString()}</span>
            <a href="${post.link}" class="blog-link">Read More →</a>
        </div>
    `;
    return article;
}

// Call when page loads
document.addEventListener('DOMContentLoaded', fetchBlogPosts);
```

## 📱 Testing Locally

1. **Open index.html** in your browser
2. **Test on mobile** using browser dev tools
3. **Check all links** and animations
4. **Verify form submission** (currently shows success message)

## 🔧 Advanced Features

### Add Google Analytics
```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Add Custom Domain
1. In repository settings → Pages
2. Custom domain: `yourname.dev`
3. Add CNAME record in your DNS:
   ```
   CNAME @ yourusername.github.io
   ```

### Enable HTTPS
GitHub Pages automatically provides SSL certificates for .github.io domains and custom domains.

## 🚀 Performance

- Optimized images (WebP recommended)
- Minified CSS and JavaScript
- Lazy loading for images
- Efficient animations using CSS transforms
- Mobile-first responsive design

## 📞 Support

If you need help customizing:
1. Check the inline comments in the code
2. Test changes locally before deploying
3. Use browser developer tools for debugging

## 🎯 What's Next

1. **Upload to GitHub** and enable Pages
2. **Customize with your information**
3. **Add your real projects and content**
4. **Connect your Bear Blog**
5. **Add Google Analytics** (optional)
6. **Set up custom domain** (optional)

Your robotics portfolio will be live at `https://yourusername.github.io` within minutes!