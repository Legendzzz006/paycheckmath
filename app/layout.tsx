import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://paycheckmath.com'),
  title: {
    default: 'PaycheckMath - Free Salary & Pay Calculators for the US',
    template: '%s | PaycheckMath',
  },
  description: 'Calculate your hourly, weekly, monthly, and yearly pay instantly. Free salary calculators for overtime, take-home pay, raises, and more. Accurate US wage conversion tools.',
  keywords: 'salary calculator, hourly wage calculator, annual salary to hourly, pay calculator, wage converter, salary to hourly, overtime calculator, paycheck calculator',
  authors: [{ name: 'PaycheckMath' }],
  creator: 'PaycheckMath',
  publisher: 'PaycheckMath',
  applicationName: 'PaycheckMath',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
    other: [],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://paycheckmath.com',
    siteName: 'PaycheckMath',
    title: 'PaycheckMath - Free Salary & Pay Calculators',
    description: 'Calculate your hourly, weekly, monthly, and yearly pay instantly. Free salary calculators for overtime, take-home pay, raises, and more.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'PaycheckMath - Salary & Pay Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaycheckMath - Free Salary & Pay Calculators',
    description: 'Calculate your hourly, weekly, monthly, and yearly pay instantly. Free salary calculators for the US.',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PaycheckMath',
    alternateName: 'Paycheck Math',
    url: 'https://paycheckmath.com',
    description: 'Free salary and pay calculators for the US. Convert annual salary to hourly, calculate overtime, take-home pay, and more.',
    publisher: {
      '@type': 'Organization',
      name: 'PaycheckMath',
      url: 'https://paycheckmath.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://paycheckmath.com/favicon.svg',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://paycheckmath.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PaycheckMath',
    url: 'https://paycheckmath.com',
    logo: 'https://paycheckmath.com/favicon.svg',
    sameAs: [
      'https://paycheckmath.com',
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SWX479KPBR"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SWX479KPBR');
            `,
          }}
        />
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
