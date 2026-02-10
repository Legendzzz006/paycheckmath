import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

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
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [],
  },
  alternates: {
    canonical: '/',
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
        url: 'https://paycheckmath.com/logo-1200x627.png',
        width: 1200,
        height: 627,
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
    logo: {
      '@type': 'ImageObject',
      url: 'https://paycheckmath.com/logo-1200x627.png',
      width: 1200,
      height: 627,
    },
    sameAs: [
      'https://paycheckmath.com',
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Essential Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b5cff" />
        <meta name="google-adsense-account" content="ca-pub-8628108609340604" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8628108609340604" crossOrigin="anonymous"></script>
        
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
        {/* Google Analytics - Loaded after interactive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-SWX479KPBR'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-SWX479KPBR'}');
          `}
        </Script>
        
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
