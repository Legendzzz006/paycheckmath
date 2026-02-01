import type { Metadata } from 'next';
import RaiseCalculator from '@/components/RaiseCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Salary Calculator</h3>
              <p className="text-sm text-gray-600">Convert annual salary to all pay periods</p>
            </Link>
            <Link
              href="/salary-comparison-calculator"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Salary Comparison</h3>
              <p className="text-sm text-gray-600">Compare two job offers</p>
            </Link>
            <Link
              href="/take-home-pay-calculator"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Take-Home Pay</h3>
              <p className="text-sm text-gray-600">Calculate net pay after taxes</p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
