# PaycheckMath.com - Salary Calculator

A comprehensive salary calculator web application built with Next.js 16, featuring 588+ pages of salary conversion tools, state-specific calculators, and career planning resources.

## Features

- **27 Salary Conversion Pages**: Popular salary amounts ($30k-$300k) with hourly breakdowns
- **500 State-Specific Pages**: Salary calculations for all 50 US states
- **36 Profession Pages**: Industry-specific salary data and calculators
- **8 Career Planning Tools**: Job comparison, negotiation, cost of living, salary history, freelance rates, and more
- **15+ Calculators**: Overtime, bi-weekly, take-home pay, raises, and specialized tools

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages (Static Export)
- **Analytics**: Google Analytics

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
```

This generates a static export in the `out/` directory with 588 pre-rendered pages.

### Generate Salary Pages

To regenerate the 27 static salary pages:

```bash
npm run generate-pages
```

## Project Structure

```
salary-calculator/
├── app/                    # Next.js app directory
│   ├── [salary pages]/    # 27 static salary conversion pages
│   ├── salary-in/         # 500 state-specific pages
│   ├── salary/            # 36 profession pages
│   └── [calculators]/     # Various calculator pages
├── components/            # React components
├── lib/                   # Utility functions and data
├── public/               # Static assets
└── scripts/              # Build scripts
```

## Deployment

The site is configured for Cloudflare Pages deployment:

1. Push to GitHub
2. Cloudflare Pages automatically builds and deploys
3. Build command: `npm run build`
4. Output directory: `out`

## License

All rights reserved.

## Contact

Visit [PaycheckMath.com](https://paycheckmath.com) for more information.
