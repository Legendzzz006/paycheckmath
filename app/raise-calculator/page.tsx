import type { Metadata } from 'next';
import RaiseCalculator from '@/components/RaiseCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedCalculators from '@/components/RelatedCalculators';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Raise Calculator | Calculate Salary Increase | PaycheckMath.com',
  description: 'Calculate your new salary after a raise. See how a percentage or dollar increase affects your annual, monthly, and hourly pay.',
  openGraph: {
    title: 'Raise Calculator | Calculate Salary Increase | PaycheckMath.com',
    description: 'Calculate your new salary after a raise. See how a percentage or dollar increase affects your annual, monthly, and hourly pay.',
    type: 'website',
  },
};

export default function RaiseCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Raise Calculator | Calculate Salary Increase
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Calculate your new salary after a raise. See how a percentage or dollar increase affects your annual, monthly, and hourly pay.
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <RaiseCalculator />
        </div>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <RelatedCalculators currentPage="/raise-calculator/" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
