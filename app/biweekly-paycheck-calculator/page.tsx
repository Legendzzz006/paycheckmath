import type { Metadata } from 'next';
import BiweeklyCalculator from '@/components/BiweeklyCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedCalculators from '@/components/RelatedCalculators';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bi-Weekly Paycheck Calculator | Convert Salary to Bi-Weekly Pay',
  description: 'Calculate your bi-weekly paycheck from annual salary or hourly rate. See your pay every two weeks, monthly equivalent, and annual total.',
  alternates: { canonical: 'https://paycheckmath.com/biweekly-paycheck-calculator/' },
  openGraph: {
    title: 'Bi-Weekly Paycheck Calculator | Convert Salary to Bi-Weekly Pay',
    description: 'Calculate your bi-weekly paycheck from annual salary or hourly rate. See your pay every two weeks, monthly equivalent, and annual total.',
    type: 'website',
    images: ['/logo-1200x627.png'],
  },
};

export default function BiweeklyCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Bi-Weekly Paycheck Calculator
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Convert your annual salary or hourly rate to bi-weekly pay. Perfect for understanding your paycheck when you're paid every two weeks (26 pay periods per year).
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <BiweeklyCalculator />
        </div>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <RelatedCalculators currentPage="/biweekly-paycheck-calculator/" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
