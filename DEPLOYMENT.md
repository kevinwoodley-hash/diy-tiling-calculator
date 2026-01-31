# Deployment Guide - DIY Tiling Calculator

Quick guide to deploy your tiling app to the web.

## 🚀 Fastest Options

### Option 1: Netlify (Easiest - No Code Required)
1. Go to https://app.netlify.com/drop
2. Drag and drop your entire folder
3. Done! You get a live URL instantly
4. Optional: Connect to GitHub for automatic updates

**Advantages:**
- No command line needed
- Instant deployment
- Free SSL certificate
- Custom domain support (free)
- Automatic builds from GitHub

### Option 2: Vercel (Developer Friendly)

**Via Web Interface:**
1. Go to https://vercel.com
2. Click "Import Project"
3. Upload your files or connect GitHub
4. Click "Deploy"

**Via Command Line:**
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to your folder
cd diy-tiling-app

# Deploy
vercel

# Follow prompts, get instant URL
```

**Advantages:**
- Excellent performance
- Built-in analytics
- Automatic HTTPS
- Custom domains (free)
- Preview deployments

### Option 3: GitHub Pages (Free Forever)

1. Create a GitHub repository
2. Push your files:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Click "Pages" in sidebar
   - Select "main" branch
   - Click "Save"
   - Your site will be live at: `https://username.github.io/repository-name`

**Advantages:**
- Completely free
- Direct GitHub integration
- Version control built-in
- No credit card needed

## 🌐 Testing Locally First

Before deploying, test locally:

```bash
# Option 1: Simple HTTP Server (Python)
python -m http.server 8000
# Then open: http://localhost:8000

# Option 2: Using Node.js
npx serve .
# Then open: http://localhost:3000

# Option 3: Just double-click index.html
# Opens in your browser directly
```

## 📝 Pre-Deployment Checklist

- [ ] All files in same folder (index.html, diy-tiling-app.jsx)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile device
- [ ] Camera feature works (if using HTTPS)
- [ ] All links to tile stores work
- [ ] Calculator produces correct results
- [ ] Photos upload and display correctly

## 🔒 HTTPS Requirement

**Important:** The camera feature requires HTTPS to work. All these deployment options provide free HTTPS:
- Netlify: ✅ Automatic HTTPS
- Vercel: ✅ Automatic HTTPS  
- GitHub Pages: ✅ Automatic HTTPS

Local testing with `file://` won't work for camera - use a local server or deploy.

## 🎯 Custom Domain Setup

### Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records at your registrar
4. HTTPS automatic

### Vercel:
1. Project Settings → Domains
2. Add your domain
3. Update DNS records
4. HTTPS automatic

### GitHub Pages:
1. Add CNAME file with your domain
2. Update DNS to point to GitHub
3. Enable HTTPS in settings

## 💡 Tips for Success

1. **Keep it Simple:** The app works standalone, no build process needed
2. **Update Costs:** Edit the cost estimates to match current UK prices
3. **Add Your Branding:** Customize colors and add your business name
4. **Test Everything:** Click every button before sharing
5. **Mobile First:** Most DIYers will use this on phones/tablets

## 🔄 Updating Your App

**Netlify:**
- Drag & drop new files to update
- Or connect GitHub for automatic updates

**Vercel:**
```bash
vercel --prod
```

**GitHub Pages:**
```bash
git add .
git commit -m "Update"
git push
# Automatically deploys
```

## 📊 Analytics (Optional)

Add Google Analytics by inserting before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🆘 Troubleshooting

**Camera not working:**
- Ensure site is HTTPS (not HTTP)
- Check browser permissions
- Test on different browser

**Photos not saving:**
- Check localStorage isn't disabled
- Test in incognito mode
- Clear browser cache

**Tiles not calculating:**
- Check all inputs are numbers
- Ensure no fields are empty
- Check browser console for errors

**Store links not working:**
- Verify internet connection
- Check links haven't changed
- Test in different browser

## 📱 Progressive Web App (Advanced)

To make it installable as an app, add these files:

**manifest.json:**
```json
{
  "name": "DIY Tiling Calculator",
  "short_name": "Tiling Calc",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#1e3c72",
  "theme_color": "#fca311",
  "description": "Complete tiling calculator and guide",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

Link in index.html:
```html
<link rel="manifest" href="manifest.json">
```

## 🎓 Learning Resources

- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Guide](https://pages.github.com)

---

**Need help?** Most platforms have excellent documentation and community support!
