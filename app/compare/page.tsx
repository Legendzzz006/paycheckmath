import type { Metadata } from 'next';
import Link from 'next/link';
import ComparePageClient from './ComparePageClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Compare Job Offers - Salary & Benefits Comparison Tool | PaycheckMath',
  description: 'Compare multiple job offers side-by-side including salary, bonuses, equity, PTO, 401k match, and benefits. Share your comparison or save it for later.',
  keywords: 'job offer comparison, salary comparison, compare job offers, total compensation calculator, benefits comparison',
  alternates: {
    canonical: 'https://paycheckmath.com/compare/',
  },
  openGraph: {
    title: 'Compare Job Offers - Total Compensation Calculator',
    description: 'Compare up to 3 job offers including salary, benefits, and total compensation. Make informed career decisions.',
    type: 'website',
    url: 'https://paycheckmath.com/compare',
  },
};

export default function ComparePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Job Offer Comparison Calculator',
    description: 'Compare multiple job offers including salary, bonuses, equity, PTO, and benefits to make informed career decisions.',
    url: 'https://paycheckmath.com/compare',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Compare up to 3 job offers',
      'Total compensation calculation',
      'Benefits valuation',
      'Shareable comparison links',
      'PTO and 401k analysis',
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">$</span>
              </div>
              PaycheckMath.com
            </Link>
          </div>
        </header>

        <ComparePageClient />

        <Footer />
      </div>
    </>
  );
}
