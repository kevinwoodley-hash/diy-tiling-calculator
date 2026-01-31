# Quick Deployment Guide

## GitHub Pages Deployment (Easiest Method)

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon (top right) → "New repository"
3. Name it: `diy-tiling-calculator`
4. Set to **Public**
5. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface (Simplest)**

1. On your new repository page, click "uploading an existing file"
2. Drag and drop ALL these files:
   - `index.html`
   - `README.md`
   - `LICENSE`
   - `.gitignore`
3. Add commit message: "Initial commit"
4. Click "Commit changes"

**Option B: Using Git Command Line**

```bash
# Navigate to your project folder
cd path/to/your/files

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit"

# Add remote repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/diy-tiling-calculator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. In your repository, click **Settings** (top menu)
2. Scroll down to **Pages** (left sidebar)
3. Under "Source":
   - Select branch: **main**
   - Select folder: **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 4: Access Your Live Site

Your site will be available at:
```
https://YOUR-USERNAME.github.io/diy-tiling-calculator/
```

🎉 **That's it! Your calculator is now live!**

---

## Alternative Hosting Options

### Vercel (Fast & Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"
6. Done! You'll get a URL like: `diy-tiling-calculator.vercel.app`

### Netlify (Also Free)

1. Go to [netlify.com](https://netlify.com)
2. Drag the entire project folder onto the Netlify Drop zone
3. Done! You'll get a random URL (you can customize it)

### Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Deploy!

---

## Testing Locally First

Before deploying, test it on your computer:

1. Double-click `index.html` to open in browser
2. Test all features
3. Make sure calculations work
4. Check it looks good on mobile (resize browser)

---

## Troubleshooting

### "404 Not Found" on GitHub Pages
- Make sure the file is named `index.html` (not `diy-tiling-calculator.html`)
- Wait a few minutes for GitHub to build the site
- Check Settings → Pages shows a green checkmark

### CSS/Styles Not Loading
- This shouldn't happen as everything is in one HTML file
- If it does, clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Calculator Not Working
- Open browser console (F12) to check for errors
- Make sure you uploaded the complete `index.html` file
- Try a different browser

---

## Updating Your Live Site

After deployment, to make changes:

1. Edit your files locally
2. Test changes by opening `index.html`
3. Upload changes to GitHub:

**Via Web Interface:**
- Click the file on GitHub
- Click the pencil icon (Edit)
- Make changes
- Commit changes

**Via Git:**
```bash
git add .
git commit -m "Updated feature X"
git push
```

GitHub Pages will automatically rebuild (takes 1-2 minutes)

---

## Custom Domain (Optional)

Want `mycalculator.com` instead of `username.github.io`?

### With GitHub Pages:
1. Buy a domain (Namecheap, Google Domains, etc.)
2. In repository Settings → Pages
3. Enter your custom domain
4. Follow DNS setup instructions

### With Vercel/Netlify:
- They make this super easy through their dashboards
- Usually just one click + DNS setup

---

## Need Help?

- 📧 Open an issue on GitHub
- 💬 Ask in the repository discussions
- 📖 Check GitHub Pages documentation

---

**Pro Tip:** Bookmark your live site URL and share it with friends who are doing DIY tiling projects!
