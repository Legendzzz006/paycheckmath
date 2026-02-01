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
    default: 'Salary & Pay Calculators for the US | PaycheckMath',
    template: '%s | PaycheckMath',
  },
  description: 'Free salary calculator to convert annual salary to hourly, monthly, weekly, and daily pay. Calculate your exact take-home pay with our accurate US salary tools.',
  keywords: 'salary calculator, hourly wage calculator, annual salary to hourly, pay calculator, wage converter, salary to hourly',
  authors: [{ name: 'PaycheckMath' }],
  creator: 'PaycheckMath',
  publisher: 'PaycheckMath',
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
    title: 'Salary & Pay Calculators for the US',
    description: 'Free salary calculator to convert annual salary to hourly, monthly, weekly, and daily pay.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary & Pay Calculators for the US',
    description: 'Free salary calculator to convert annual salary to hourly, monthly, weekly, and daily pay.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
