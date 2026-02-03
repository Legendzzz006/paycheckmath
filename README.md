# PaycheckMath.com

A modern salary calculator web application built with Next.js 15, featuring multiple calculator tools for US salary conversions and pay calculations.

## Features

- **Salary Calculator** - Convert annual salary to hourly, daily, weekly, and monthly pay
- **Salary to Hourly** - Quick salary to hourly wage conversion
- **Overtime Calculator** - Calculate overtime pay with custom rates
- **Bi-Weekly Paycheck** - Calculate bi-weekly paychecks
- **Take-Home Pay** - Estimate net pay after taxes
- **Monthly Income** - Calculate monthly income from any pay period
- **Part-Time Income** - Calculate income from multiple part-time jobs
- **Salary Comparison** - Compare salary vs hourly job offers
- **Raise Calculator** - Calculate new salary after raises

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Static Site Generation (SSG)
- Deployed on Cloudflare Pages

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Utility functions and calculations
├── public/                 # Static assets
└── next.config.ts          # Next.js configuration
```

## Deployment

This project is configured for static export and optimized for Cloudflare Pages deployment.

```bash
npm run build
```

The build output will be in the `out/` directory.

## License

All rights reserved © 2026 PaycheckMath.com
