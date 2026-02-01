# PaycheckMath.com - US Salary Calculator

A production-ready, SEO-optimized salary calculator website built with Next.js. Converts annual salaries to hourly, daily, weekly, and monthly pay.

## 🚀 Features

- **Fast & Lightweight**: Static site generation for optimal performance
- **SEO-Optimized**: 27 programmatic salary pages with proper meta tags and structured data
- **Mobile-First Design**: Clean, editorial-style UI that works on all devices
- **Accessible**: ARIA labels and semantic HTML throughout
- **Scalable Architecture**: Easy to add new calculators and features
- **Zero Cost Hosting**: Optimized for Cloudflare Pages (free tier)

## 📊 Pages Generated

- Homepage with interactive calculator
- 27 salary-specific pages ($30k - $300k)
- Salary to Hourly converter
- About, Contact, Disclaimer pages
- Sitemap and robots.txt

## 🛠 Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Static Site Generation (SSG)

## 🏗 Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

This generates a static export in the `/out` directory, ready for deployment.

### Generate Salary Pages

If you need to regenerate the salary pages:

```bash
node scripts/generate-salary-pages.js
```

## 📁 Project Structure

```
/app
  /page.tsx                                    # Homepage
  /salary-to-hourly/page.tsx                   # Salary to hourly converter
  /[salary]-a-year-is-how-much-an-hour/page.tsx # Dynamic fallback
  /30000-a-year-is-how-much-an-hour/page.tsx  # Static salary pages (x27)
  /about/page.tsx                              # About page
  /contact/page.tsx                            # Contact page
  /disclaimer/page.tsx                         # Disclaimer page
  /layout.tsx                                  # Root layout
  /globals.css                                 # Global styles
  /sitemap.ts                                  # Sitemap generation

/components
  /Calculator.tsx                              # Main salary calculator
  /SalaryBreakdownTable.tsx                    # Pay breakdown table
  /FAQ.tsx                                     # FAQ component
  /InternalLinks.tsx                           # Internal linking component
  /Header.tsx                                  # Site header
  /Footer.tsx                                  # Site footer

/lib
  /salaryCalculations.ts                       # Calculation logic
  /salaryData.ts                               # Salary data and content generation

/scripts
  /generate-salary-pages.js                    # Script to generate static pages

/public
  /_headers                                    # Cloudflare headers config
  /robots.txt                                  # SEO robots file
```

## 🌐 Deployment

### Cloudflare Pages (Recommended)

1. Push code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Navigate to **Pages** → **Create a project**
4. Connect your GitHub repository
5. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
6. Click **Save and Deploy**

See [CLOUDFLARE-DEPLOYMENT.md](./CLOUDFLARE-DEPLOYMENT.md) for detailed instructions.

### Other Static Hosts

The site exports to static HTML and can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

Simply upload the contents of the `/out` directory after running `npm run build`.

## 🎯 SEO Features

- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions for all pages
- Open Graph tags
- Structured data (FAQ schema)
- Internal linking strategy
- Fast page loads
- Mobile-responsive
- Sitemap.xml
- Robots.txt

## 📈 Performance

Expected scores:
- Performance: 95-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 95-100

## 💰 Monetization Ready

Layout prepared for:
- Google AdSense blocks
- Affiliate sections
- Sponsored content

Ad placement areas:
- Below calculator
- After breakdown table
- End of content
- Sidebar (desktop)

## 🔄 Adding More Salary Pages

1. Edit `lib/salaryData.ts` and add salaries to the `popularSalaries` array
2. Run `node scripts/generate-salary-pages.js`
3. Build and deploy

## 🚀 Future Enhancements

- Tax calculations by state
- Overtime calculator
- Bi-weekly paycheck calculator
- Inflation adjustment tool
- Cost of living comparisons
- Retirement savings calculator

## 📱 Mobile Testing

See [MOBILE-TESTING.md](./MOBILE-TESTING.md) for instructions on testing the site on your phone.

## 📄 License

All rights reserved.

## 🆘 Support

For issues or questions, see [CLOUDFLARE-DEPLOYMENT.md](./CLOUDFLARE-DEPLOYMENT.md) troubleshooting section.
