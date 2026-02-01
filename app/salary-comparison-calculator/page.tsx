import type { Metadata } from 'next';
import ComparisonCalculator from '@/components/ComparisonCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Salary Calculator</h3>
              <p className="text-sm text-gray-600">Convert annual salary to hourly</p>
            </Link>
            <Link
              href="/take-home-pay-calculator/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Take-Home Pay</h3>
              <p className="text-sm text-gray-600">Calculate net pay after taxes</p>
            </Link>
            <Link
              href="/raise-calculator/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Raise Calculator</h3>
              <p className="text-sm text-gray-600">Calculate salary increase</p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
