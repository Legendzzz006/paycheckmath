import type { Metadata } from 'next';
import PartTimeCalculator from '@/components/PartTimeCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Part-Time Salary Calculator | PaycheckMath.com',
  description: 'Calculate income from part-time work or multiple jobs. See your total earnings from all part-time positions combined.',
  openGraph: {
    title: 'Part-Time Salary Calculator | PaycheckMath.com',
    description: 'Calculate income from part-time work or multiple jobs. See your total earnings from all part-time positions combined.',
    type: 'website',
  },
};

export default function PartTimeCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Part-Time Salary Calculator
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Calculate income from part-time work or multiple jobs. See your total earnings from all part-time positions combined.
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <PartTimeCalculator />
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
              href="/monthly-income-calculator/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Monthly Income</h3>
              <p className="text-sm text-gray-600">Calculate monthly income</p>
            </Link>
            <Link
              href="/overtime-calculator/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Overtime Calculator</h3>
              <p className="text-sm text-gray-600">Calculate overtime pay</p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
