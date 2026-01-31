# DIY Tiling Calculator

A simple, user-friendly web application to help homeowners calculate exactly what materials they need for their tiling projects.

## Features

- 📏 **Easy Measurements** - Simple width × height inputs for any area
- 🏠 **Multiple Rooms** - Calculate materials for entire projects
- ➖ **Subtract Areas** - Exclude windows, doors, and non-tiled sections
- 🧮 **Smart Calculations** - Automatic material calculations including:
  - Tiles (with wastage)
  - Adhesive
  - Grout
  - Primer
  - Waterproof tanking (for wet areas)
  - Backer board (for wet areas on plasterboard)
  - Stone sealer (for natural stone tiles)
- 🛒 **Shopping List** - Get exact quantities for your DIY store visit
- 💡 **Helpful Tips** - Installation advice and tool recommendations

## Demo

Visit the live calculator: [Your GitHub Pages URL will go here]

## Screenshots

![Calculator Interface](screenshot.png)

## How to Use

1. Enter your tile dimensions
2. Select your tile type (ceramic, porcelain, or natural stone)
3. Choose your substrate type (plasterboard, concrete, etc.)
4. Check "wet area" if tiling a shower or bath
5. Add measurements for each wall or area
6. Click "Calculate Materials Needed"
7. Get your complete shopping list!

## Technology Stack

- React 18
- Tailwind CSS
- Pure JavaScript (no build process needed)
- Single HTML file - simple to deploy anywhere

## Installation & Deployment

### Option 1: GitHub Pages (Recommended)

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/diy-tiling-calculator.git
   cd diy-tiling-calculator
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings"
   - Scroll to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: `https://YOUR-USERNAME.github.io/diy-tiling-calculator/`

3. **That's it!** Just open `index.html` in the browser

### Option 2: Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** - your site will be live in seconds!

### Option 3: Netlify

1. **Drag and drop** the project folder to [netlify.com/drop](https://app.netlify.com/drop)
2. **Done!** Your site is live

### Option 4: Run Locally

Simply open `index.html` in any modern web browser. No server required!

```bash
# Or use Python's built-in server
python -m http.server 8000

# Or use Node's http-server
npx http-server
```

Then visit `http://localhost:8000`

## File Structure

```
diy-tiling-calculator/
├── index.html          # Main application file (standalone)
├── README.md           # This file
├── LICENSE             # MIT License
└── screenshot.png      # Optional screenshot
```

## Customization

The calculator is built as a single HTML file for simplicity. To customize:

1. Open `index.html` in your code editor
2. Find the `<script type="text/babel">` section
3. Modify the React component as needed
4. Adjust Tailwind classes for styling changes

### Key Calculation Parameters

- **Adhesive coverage**: 3-4 m² per 20kg bag (adjusts based on substrate)
- **Grout coverage**: 1-2 kg per m² (adjusts based on gap size)
- **Primer**: ~150ml per m²
- **Tanking**: ~300ml per m² (2 coats)
- **Backer board**: 2.88 m² per sheet (1200×2400mm)
- **Sealer**: ~100ml per m²

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer (not supported)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Save/load projects to browser storage
- [ ] Print shopping list functionality
- [ ] Cost estimation feature
- [ ] Imperial units (feet/inches) option
- [ ] Mobile app version
- [ ] Multi-language support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built for DIY enthusiasts and homeowners
- Material calculations based on UK industry standards
- Inspired by professional tiling estimators

## Support

If you find this tool helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs via GitHub Issues
- 💡 Suggesting features
- 📢 Sharing with fellow DIYers

## Disclaimer

All calculations are estimates based on typical conditions. Always:
- Check manufacturer specifications for your specific materials
- Buy extra materials for breakages and cuts
- Consult a professional tiler for complex projects
- Follow proper health and safety guidelines

---

Made with ❤️ for the DIY community
