import type { Metadata } from 'next';
import MonthlyCalculator from '@/components/MonthlyCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedCalculators from '@/components/RelatedCalculators';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Monthly Income Calculator | PaycheckMath.com',
  description: 'Calculate your monthly income from annual salary, hourly rate, or weekly pay. Convert between all pay periods instantly.',
  alternates: { canonical: 'https://paycheckmath.com/monthly-income-calculator/' },
  openGraph: {
    title: 'Monthly Income Calculator | PaycheckMath.com',
    description: 'Calculate your monthly income from annual salary, hourly rate, or weekly pay. Convert between all pay periods instantly.',
    type: 'website',
    images: ['/logo-1200x627.png'],
  },
};

export default function MonthlyCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Monthly Income Calculator
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Calculate your monthly income from annual salary, hourly rate, or weekly pay. Convert between all pay periods instantly.
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <MonthlyCalculator />
        </div>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <RelatedCalculators currentPage="/monthly-income-calculator/" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
