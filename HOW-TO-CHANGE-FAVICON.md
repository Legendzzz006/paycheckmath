# How to Change the Favicon

## Quick Method (Recommended)

### Option 1: Replace favicon.ico
1. Create or download your favicon image (should be square, ideally 32x32 or 64x64 pixels)
2. Convert it to `.ico` format using a tool like:
   - https://favicon.io/
   - https://www.favicon-generator.org/
   - https://realfavicongenerator.net/
3. Replace the file at: `salary-calculator/app/favicon.ico`

### Option 2: Use PNG/SVG (Modern Approach)
Next.js also supports these formats in the `app` directory:
- `icon.png` or `icon.jpg` (32x32 or larger)
- `icon.svg` (vector, scales perfectly)
- `apple-icon.png` (for Apple devices)

Just place any of these files in the `app` folder and Next.js will automatically use them.

---

## Step-by-Step Guide

### Method 1: Using Favicon.io (Easiest)

1. **Go to https://favicon.io/**

2. **Choose your method**:
   - **Text to Favicon**: Create from text (e.g., "$" or "PM")
   - **Image to Favicon**: Upload your logo
   - **Emoji to Favicon**: Use an emoji (💰 or 💵)

3. **Customize**:
   - For text: Choose font, size, colors
   - Background color: #2563eb (blue) or #ffffff (white)
   - Text color: #ffffff (white) or #2563eb (blue)

4. **Download**:
   - Click "Download"
   - Extract the ZIP file

5. **Replace**:
   - Copy `favicon.ico` from the downloaded files
   - Replace `salary-calculator/app/favicon.ico`

### Method 2: Create Custom SVG Favicon

Create a file `salary-calculator/app/icon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#2563eb"/>
  <text x="50" y="70" font-size="60" font-weight="bold" 
        text-anchor="middle" fill="white" font-family="Arial">$</text>
</svg>
```

This creates a blue rounded square with a white dollar sign.

### Method 3: Use PNG Icon

1. Create or get a square PNG image (recommended: 512x512px)
2. Save it as `salary-calculator/app/icon.png`
3. Next.js will automatically generate all required sizes

---

## Recommended Favicon Ideas for PaycheckMath

### Option A: Dollar Sign ($)
- Simple, recognizable
- Represents money/salary
- Works well at small sizes

### Option B: Calculator Icon
- Represents the tool
- More descriptive
- Slightly more complex

### Option C: "PM" Initials
- PaycheckMath branding
- Clean and professional
- Easy to recognize

### Option D: Money Emoji
- 💰 Money bag
- 💵 Dollar bill
- 💳 Credit card

---

## Quick Create with Emoji (Fastest!)

1. Go to https://favicon.io/emoji-favicons/
2. Search for "money" or "dollar"
3. Choose: 💰 (money bag) or 💵 (dollar)
4. Click "Download"
5. Replace `app/favicon.ico` with the downloaded file

---

## Current Favicon Location

```
salary-calculator/
└── app/
    └── favicon.ico  ← Replace this file
```

---

## After Changing

1. **Delete browser cache** or hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. **Rebuild** if using development server:
   ```bash
   npm run dev
   ```
3. **Check** in browser tab - you should see the new icon

---

## Multiple Icon Sizes (Advanced)

For best results across all devices, create these files in `app/`:

```
app/
├── favicon.ico          # 32x32 (required)
├── icon.png            # 512x512 (recommended)
├── apple-icon.png      # 180x180 (for iOS)
└── icon.svg            # Vector (optional, best quality)
```

Next.js will automatically:
- Generate all required sizes
- Add proper meta tags
- Optimize for different devices

---

## Testing Your Favicon

After changing, test on:
- Chrome/Edge (Windows)
- Safari (Mac/iOS)
- Firefox
- Mobile browsers

Clear cache if you don't see changes immediately!

---

## Recommended Tools

1. **Favicon.io** - https://favicon.io/
   - Free, easy to use
   - Multiple creation methods
   - Generates all sizes

2. **RealFaviconGenerator** - https://realfavicongenerator.net/
   - Most comprehensive
   - Tests on all platforms
   - Generates complete package

3. **Canva** - https://www.canva.com/
   - Design custom icon
   - Export as PNG
   - Convert to ICO

---

## Quick Command to Replace

If you have your new favicon ready:

**Windows (Command Prompt)**:
```cmd
copy /Y "C:\path\to\your\new-favicon.ico" "app\favicon.ico"
```

**Windows (PowerShell)**:
```powershell
Copy-Item "C:\path\to\your\new-favicon.ico" "app\favicon.ico" -Force
```

---

## Need Help?

If you want me to create a custom favicon for you, just tell me:
1. What design you want (dollar sign, calculator, initials, etc.)
2. What colors (blue #2563eb is your brand color)
3. What format (SVG, PNG, or ICO)

I can generate the code for you!
