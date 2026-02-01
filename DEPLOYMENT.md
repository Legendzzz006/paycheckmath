# Deployment Guide

## Quick Deploy to Vercel

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect Next.js and deploy

No configuration needed - the project is ready to deploy as-is.

## Environment Variables

None required for basic functionality.

## Custom Domain

After deployment:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., paycheckmath.com)
4. Follow DNS configuration instructions

## Build Command

```bash
npm run build
```

## Output

Static export in `/out` directory (configured in `next.config.ts`)

## Performance

- All pages are pre-rendered at build time (SSG)
- No server-side rendering
- Optimal Core Web Vitals
- Fast page loads

## Monitoring

After deployment, monitor:
- Core Web Vitals in Vercel Analytics
- Google Search Console for SEO performance
- Page load times

## Updates

To update the site:
1. Make changes locally
2. Test with `npm run dev`
3. Build with `npm run build`
4. Push to GitHub
5. Vercel auto-deploys

## Alternative Hosting

This static site can also be deployed to:
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages

Simply upload the contents of the `/out` directory after running `npm run build`.
