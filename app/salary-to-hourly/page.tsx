import type { Metadata } from 'next';
import Calculator from '@/components/Calculator';
import InternalLinks from '@/components/InternalLinks';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator | Convert Annual Salary to Hourly Wage',
  description: 'Convert your annual salary to an hourly wage instantly. Free calculator shows your hourly rate based on standard 40-hour work weeks or custom hours.',
  keywords: 'salary to hourly, annual to hourly, salary converter, hourly wage calculator',
};

export default function SalaryToHourlyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-xl font-bold text-gray-900">
            PayCalculator.us
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Salary to Hourly Calculator
        </h1>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Convert any annual salary to its equivalent hourly wage. Whether you're comparing job 
          offers, negotiating pay, or simply curious about your hourly rate, this calculator 
          provides accurate conversions based on your work schedule.
        </p>

        <div className="mb-12">
          <Calculator />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How to Convert Salary to Hourly
          </h2>
          <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
            <p>
              The basic formula to convert an annual salary to an hourly wage is straightforward: 
              divide your annual salary by the number of hours you work in a year. For a standard 
              full-time position, this is typically 2,080 hours (40 hours per week × 52 weeks).
            </p>
            <p>
              <strong>Formula:</strong> Hourly Rate = Annual Salary ÷ 2,080
            </p>
            <p>
              For example, if you earn $60,000 per year: $60,000 ÷ 2,080 = $28.85 per hour
            </p>
            <p>
              However, this calculation assumes you work every single week of the year. If you 
              receive paid vacation, holidays, or sick time, your effective hourly rate is actually 
              higher because you're being paid for hours you don't work.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Convert Salary to Hourly?
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">Comparing Job Offers</h3>
              <p>
                When one job offers an hourly rate and another offers a salary, converting both 
                to the same format makes comparison easier and more accurate.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">Understanding Your Worth</h3>
              <p>
                Knowing your hourly rate helps you understand the true value of your time and 
                can inform decisions about overtime, side projects, or freelance work.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">Budgeting and Planning</h3>
              <p>
                Breaking down your salary to an hourly rate can make budgeting more tangible 
                and help you make informed spending decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Common Salary Conversions
          </h2>
          <p className="text-gray-700 mb-6">
            See how popular US salaries convert to hourly wages:
          </p>
          <InternalLinks limit={20} />
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Factors to Consider
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Overtime eligibility:</strong> Salaried employees may not receive overtime pay, while hourly workers typically do</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Benefits package:</strong> Health insurance, retirement matching, and other benefits add significant value beyond base pay</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Work-life balance:</strong> A higher hourly rate means less if it requires significantly more hours</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Job security:</strong> Salaried positions often come with more stability than hourly roles</span>
            </li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Calculators</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/" className="text-gray-600 hover:text-gray-900">Salary Calculator</Link></li>
                <li><Link href="/salary-to-hourly" className="text-gray-600 hover:text-gray-900">Salary to Hourly</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Resources</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Legal</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/disclaimer" className="text-gray-600 hover:text-gray-900">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-sm text-gray-600 text-center pt-6 border-t border-gray-200">
            © {new Date().getFullYear()} PayCalculator.us. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
