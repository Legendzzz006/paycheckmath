import type { Metadata } from 'next';
import Calculator from '@/components/Calculator';
import InternalLinks from '@/components/InternalLinks';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Salary & Pay Calculators for the US | Convert Annual Salary to Hourly',
  description: 'Free salary calculator to convert annual salary to hourly, monthly, weekly, and daily pay. Calculate your exact take-home pay with our accurate US salary tools.',
  keywords: 'salary calculator, hourly wage calculator, annual salary to hourly, pay calculator, wage converter',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">$</span>
            </div>
            PayCalculator.us
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Salary & Pay Calculators for the US
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calculate your hourly, daily, weekly, and monthly pay from your annual salary. 
            Our free salary calculator helps you understand your true earning potential and 
            compare job offers with confidence.
          </p>
        </div>

        <div className="mb-12">
          <Calculator />
        </div>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Popular Salary Conversions
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
            Quickly find out how much common US salaries are worth per hour:
          </p>
          <InternalLinks limit={24} />
        </section>

        <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Use This Calculator
          </h2>
          <div className="text-gray-700 space-y-4 leading-relaxed">
            <p>
              Enter your annual salary to instantly see your hourly wage, daily pay, weekly income, 
              and monthly earnings. The calculator uses standard US work hours (40 hours per week, 
              52 weeks per year) but you can adjust these values to match your specific situation.
            </p>
            <p>
              If you have paid time off, enter the number of weeks to get a more accurate hourly 
              rate calculation. The state selector is available for future tax calculation features.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Your Salary
          </h2>
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
            <p>
              When evaluating a job offer or comparing salaries, it's essential to understand how 
              your annual compensation translates to different pay periods. A salary that seems 
              high annually might be less impressive when broken down to an hourly rate, especially 
              if the position requires long hours or extensive overtime.
            </p>
            <p>
              The standard calculation assumes 2,080 working hours per year (40 hours × 52 weeks). 
              However, most employees don't actually work every single week due to holidays, 
              vacation time, and sick days. This is why understanding your effective hourly rate 
              after accounting for paid time off is valuable.
            </p>
            <p>
              Remember that the figures shown are gross pay before taxes and deductions. Your 
              actual take-home pay will be lower after federal income tax, state income tax, 
              Social Security, Medicare, and any other deductions like health insurance or 
              retirement contributions.
            </p>
          </div>
        </section>

        <section className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-8 mb-16">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Important Disclaimer
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This calculator provides estimates based on the information you enter. Actual take-home 
                pay will vary based on federal and state taxes, deductions, and other factors. This tool 
                is for informational purposes only and should not be considered financial or tax advice. 
                Consult with a qualified professional for personalized guidance.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-24">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Calculators</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Salary Calculator</Link></li>
                <li><Link href="/salary-to-hourly" className="text-gray-600 hover:text-blue-600 transition-colors">Salary to Hourly</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/disclaimer" className="text-gray-600 hover:text-blue-600 transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-sm text-gray-500 text-center pt-8 border-t border-gray-200">
            © {new Date().getFullYear()} PayCalculator.us. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
