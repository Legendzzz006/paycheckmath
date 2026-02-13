import type { Metadata } from 'next';
import ComparisonCalculator from '@/components/ComparisonCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedCalculators from '@/components/RelatedCalculators';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Salary vs Hourly Comparison Calculator | PaycheckMath.com',
  description: 'Compare salary and hourly job offers side by side. Factor in benefits to see which position pays more.',
  openGraph: {
    title: 'Salary vs Hourly Comparison Calculator | PaycheckMath.com',
    description: 'Compare salary and hourly job offers side by side. Factor in benefits to see which position pays more.',
    type: 'website',
  },
};

export default function ComparisonCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Salary vs Hourly Comparison Calculator
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Compare salary and hourly job offers side by side. Factor in benefits to see which position pays more.
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <ComparisonCalculator />
        </div>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <RelatedCalculators currentPage="/salary-comparison-calculator/" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
