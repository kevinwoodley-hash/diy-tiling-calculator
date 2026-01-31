# DIY Tiling Calculator App

A comprehensive React-based web application designed for DIY homeowners to plan and execute tiling projects with confidence.

## 🎯 Features

### 📐 Material Calculator
- Calculate tiles needed for walls or floors
- Automatic wastage calculation (default 10%, adjustable)
- Adhesive bags estimation (based on wall/floor coverage)
- Grout quantity calculation
- Tile spacers needed
- Complete cost breakdown with estimates
- Save projects to browser storage

### 🗺️ UK Tile Store Finder
Find your nearest showroom from major UK chains:
- **Topps Tiles** - UK's largest tile retailer
- **Tile Giant** - Competitive prices, large range
- **CTD Tiles** - Trade and retail tiles
- **Tile Mountain** - Online specialist with showrooms
- **Walls and Floors** - Designer tiles at great prices
- **Victorian Plumbing** - Bathroom tiles and accessories

Each store has direct links to:
- Store locator (find nearest branch)
- Main website (browse online)

### 📸 Photo Documentation
- Upload multiple photos from your device
- Take photos directly with your device camera
- View photos in full-screen gallery
- Delete unwanted photos
- Automatic date stamping
- Store photos locally in browser

### 📚 Complete Installation Guides

**Wall Tiling Guide (7 Steps):**
1. Planning & Preparation
2. Surface Preparation
3. Setting Out Your Tiles
4. Applying Adhesive & Tiles
5. Cutting Tiles
6. Grouting
7. Finishing Touches

**Floor Tiling Guide (7 Steps):**
1. Planning & Preparation
2. Floor Preparation
3. Setting Out Your Tiles
4. Applying Adhesive & Tiles
5. Cutting Floor Tiles
6. Grouting Floor Tiles
7. Finishing & Expansion Joints

Each step includes:
- Detailed instructions
- Pro tips
- Common mistakes to avoid
- Safety information

## 🚀 Getting Started

### Option 1: Open Locally
1. Download all files to a folder
2. Open `index.html` in a modern web browser
3. Start calculating and planning your project!

### Option 2: Deploy to Hosting
Upload these files to any web hosting service:
- **Netlify**: Drag & drop the folder
- **Vercel**: Import from GitHub
- **GitHub Pages**: Push to a repository
- **Any web host**: Upload via FTP

## 📁 File Structure

```
diy-tiling-app/
├── index.html              # Main HTML file (open this)
├── diy-tiling-app.jsx      # React component
└── README.md               # This file
```

## 💻 Technical Details

### Built With
- React 18 (via CDN)
- Lucide React Icons
- Vanilla JavaScript
- CSS-in-JS styling
- LocalStorage for persistence

### Browser Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Camera access for photo feature (optional)
- LocalStorage enabled for saving projects

### No Installation Required
- No Node.js needed
- No build process
- No dependencies to install
- Just open and use!

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessible**: Clear labels and semantic HTML
- **Professional Aesthetics**: Blue gradient theme with orange accents
- **Smooth Animations**: Polished user experience
- **Print-Friendly**: Calculator results can be printed

## 📱 Mobile Features

- Touch-friendly interface
- Camera integration for photos
- Responsive layout adapts to screen size
- Swipe-friendly tabs and sections

## 💾 Data Storage

All data is stored locally in your browser:
- Projects saved to LocalStorage
- Photos stored as base64 in browser
- No server required
- No data sent to external servers
- Clear data by clearing browser storage

## 🔧 Usage Tips

### For Best Results:
1. **Measure carefully** - Accuracy is key for material calculations
2. **Add 10-15% wastage** - For cuts, breakage, and future repairs
3. **Visit showrooms** - See tiles in person before buying
4. **Order samples** - Test tiles in your lighting
5. **Document everything** - Take photos at every stage
6. **Read the guides** - Follow step-by-step instructions carefully

### Cost Estimates:
The calculator provides approximate costs based on:
- Tiles: £2.50 average per tile
- Adhesive: £15 per 20kg bag
- Grout: £8 per kg
- Spacers: £3 per 100 pack

**Note:** Actual prices vary significantly by brand, quality, and retailer.

## 🛠️ Customization

To customize the app:

1. **Change Colors**: Edit the gradient colors in the inline styles
2. **Adjust Costs**: Modify the cost estimates in the `calculateMaterials` function
3. **Add Stores**: Add new tile retailers to the `tileStoreChains` array
4. **Modify Guides**: Edit the `installationGuides` object to add/change steps

## 🌐 Deployment Guide

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd diy-tiling-app
vercel
```

### Deploy to Netlify
1. Drag and drop the folder to netlify.com/drop
2. Your app is live instantly!

### Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main

# Enable GitHub Pages in repository settings
```

## 📋 Checklist for Your Tiling Project

Before you start:
- [ ] Calculate materials using the app
- [ ] Visit local tile showrooms
- [ ] Order tile samples
- [ ] Read complete installation guide
- [ ] Gather all tools and materials
- [ ] Prepare your surface properly
- [ ] Plan your tile layout (dry run)
- [ ] Take "before" photos

During installation:
- [ ] Follow guide step-by-step
- [ ] Check level constantly
- [ ] Take progress photos
- [ ] Clean as you go
- [ ] Allow proper curing time

After completion:
- [ ] Take "after" photos
- [ ] Save project details
- [ ] Keep spare tiles for repairs
- [ ] Note products used for future reference

## 🤝 Support

For tiling advice and techniques:
- Visit manufacturer websites
- Watch YouTube tutorials
- Consult tile store experts
- Join DIY forums and communities

## 📄 License

Free to use for personal DIY projects.

## 🙏 Acknowledgments

Created to help DIY enthusiasts achieve professional-quality tile installations.

---

**Happy Tiling! 🏠✨**
