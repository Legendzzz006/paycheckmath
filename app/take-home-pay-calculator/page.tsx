import type { Metadata } from 'next';
import TakeHomeCalculator from '@/components/TakeHomeCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedCalculators from '@/components/RelatedCalculators';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Take-Home Pay Calculator | Calculate Net Pay After Taxes',
  description: 'Calculate your take-home pay after federal taxes, state taxes, FICA, and other deductions. See your net pay and understand where your money goes.',
  alternates: {
    canonical: '/take-home-pay-calculator',
  },
  openGraph: {
    title: 'Take-Home Pay Calculator | Calculate Net Pay After Taxes',
    description: 'Calculate your take-home pay after federal taxes, state taxes, FICA, and other deductions. See your net pay and understand where your money goes.',
    type: 'website',
  },
};

export default function TakeHomeCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Take-Home Pay Calculator
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Calculate your actual take-home pay after all deductions. Enter your gross pay and tax rates to see your net pay and understand how much you actually keep from your paycheck.
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <TakeHomeCalculator />
        </div>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <RelatedCalculators currentPage="/take-home-pay-calculator/" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
