import type { Metadata } from 'next';
import OvertimeCalculator from '@/components/OvertimeCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedCalculators from '@/components/RelatedCalculators';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Overtime Pay Calculator | Calculate Time and a Half',
  description: 'Free overtime calculator to calculate your overtime pay. Supports time and a half, double time, and custom overtime rates. See your total earnings instantly.',
  alternates: {
    canonical: '/overtime-calculator',
  },
  openGraph: {
    title: 'Overtime Pay Calculator | Calculate Time and a Half',
    description: 'Free overtime calculator to calculate your overtime pay. Supports time and a half, double time, and custom overtime rates. See your total earnings instantly.',
    type: 'website',
  },
};

export default function OvertimeCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Overtime Pay Calculator
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Calculate your overtime pay with our free overtime calculator. Whether you work time and a half (1.5x) or double time (2x), see exactly how much you'll earn including regular and overtime hours.
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <OvertimeCalculator />
        </div>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <RelatedCalculators currentPage="/overtime-calculator/" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
