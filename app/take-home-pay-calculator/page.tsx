import type { Metadata } from 'next';
import TakeHomeCalculator from '@/components/TakeHomeCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Take-Home Pay Calculator | Calculate Net Pay After Taxes',
  description: 'Calculate your take-home pay after federal taxes, state taxes, FICA, and other deductions. See your net pay and understand where your money goes.',
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Salary Calculator</h3>
              <p className="text-sm text-gray-600">Convert annual salary to hourly, daily, weekly, and monthly pay</p>
            </Link>
            <Link
              href="/salary-to-hourly/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Salary to Hourly</h3>
              <p className="text-sm text-gray-600">Convert any annual salary to its hourly equivalent</p>
            </Link>
            <Link
              href="/overtime-calculator/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Overtime Calculator</h3>
              <p className="text-sm text-gray-600">Calculate overtime pay with time and a half or double time</p>
            </Link>
            <Link
              href="/biweekly-paycheck-calculator/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Bi-Weekly Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your bi-weekly paycheck amount</p>
            </Link>
            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
