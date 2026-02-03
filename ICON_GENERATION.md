# Icon Generation Guide

## Required Icons

The following icon files need to be created and placed in the `/public` directory:

### 1. icon-192.png
- **Size**: 192x192 pixels
- **Format**: PNG
- **Purpose**: PWA icon, Android home screen
- **Location**: `/public/icon-192.png`

### 2. icon-512.png
- **Size**: 512x512 pixels
- **Format**: PNG
- **Purpose**: PWA icon, high-resolution displays
- **Location**: `/public/icon-512.png`

### 3. logo-1200x627.png
- **Size**: 1200x627 pixels
- **Format**: PNG
- **Purpose**: JSON-LD structured data, social media previews
- **Location**: `/public/logo-1200x627.png`

## Generation Methods

### Option 1: Using favicon.svg (Recommended)

If you have design software (Figma, Sketch, Illustrator):
1. Open `app/favicon.svg`
2. Export as PNG at the required sizes
3. Save to `/public` directory

### Option 2: Using Online Tools

1. **Favicon.io** (https://favicon.io/)
   - Upload your SVG
   - Generate all sizes
   - Download and place in `/public`

2. **RealFaviconGenerator** (https://realfavicongenerator.net/)
   - Upload your SVG
   - Configure settings
   - Download package

### Option 3: Using ImageMagick (Command Line)

```bash
# Install ImageMagick first
# Then run these commands from the project root:

# Convert SVG to 192x192 PNG
magick convert -background none -resize 192x192 app/favicon.svg public/icon-192.png

# Convert SVG to 512x512 PNG
magick convert -background none -resize 512x512 app/favicon.svg public/icon-512.png

# Convert SVG to 1200x627 PNG (with padding)
magick convert -background none -resize 600x600 app/favicon.svg -gravity center -extent 1200x627 public/logo-1200x627.png
```

### Option 4: Using Node.js Sharp Library

```javascript
// install: npm install sharp
const sharp = require('sharp');
const fs = require('fs');

// Read SVG
const svgBuffer = fs.readFileSync('./app/favicon.svg');

// Generate 192x192
sharp(svgBuffer)
  .resize(192, 192)
  .png()
  .toFile('./public/icon-192.png');

// Generate 512x512
sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile('./public/icon-512.png');

// Generate 1200x627 (centered with padding)
sharp(svgBuffer)
  .resize(600, 600)
  .extend({
    top: 13,
    bottom: 14,
    left: 300,
    right: 300,
    background: { r: 255, g: 255, b: 255, alpha: 0 }
  })
  .png()
  .toFile('./public/logo-1200x627.png');
```

## Design Guidelines

### icon-192.png & icon-512.png
- Should be square
- Clear, recognizable at small sizes
- Transparent or solid background
- High contrast
- Simple, bold design

### logo-1200x627.png
- Landscape orientation (1.91:1 ratio)
- Can include text/branding
- Should work well in social media previews
- Consider adding background color
- Ensure text is readable at small sizes

## Verification

After generating icons, verify:
1. Files exist in `/public` directory
2. Correct dimensions (use `file` command or image viewer)
3. Transparent backgrounds where appropriate
4. File sizes are reasonable (<100KB each)
5. Icons look good at actual display sizes

## Current Status

- ✅ favicon.ico exists in `/app`
- ✅ favicon.svg exists in `/app`
- ⏳ icon-192.png needs to be created
- ⏳ icon-512.png needs to be created
- ⏳ logo-1200x627.png needs to be created

## Quick Temporary Solution

If you need placeholder icons immediately, you can:
1. Copy `app/favicon.ico` to `public/icon-192.png` (temporary)
2. Copy `app/favicon.ico` to `public/icon-512.png` (temporary)
3. Copy `public/og-image.svg` to `public/logo-1200x627.png` (temporary)

Then replace with proper PNG files when ready.
