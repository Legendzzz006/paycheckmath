import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 sm:mt-24">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Basic Tools</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Salary Calculator</Link></li>
              <li><Link href="/salary-to-hourly/" className="text-gray-600 hover:text-blue-600 transition-colors">Salary to Hourly</Link></li>
              <li><Link href="/overtime-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Overtime Calculator</Link></li>
              <li><Link href="/biweekly-paycheck-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Bi-Weekly Paycheck</Link></li>
              <li><Link href="/take-home-pay-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Take-Home Pay</Link></li>
              <li><Link href="/monthly-income-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Monthly Income</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Career Tools</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/compare/" className="text-gray-600 hover:text-blue-600 transition-colors">Compare Job Offers</Link></li>
              <li><Link href="/negotiation-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Negotiation Calculator</Link></li>
              <li><Link href="/raise-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Raise Calculator</Link></li>
              <li><Link href="/salary-timeline/" className="text-gray-600 hover:text-blue-600 transition-colors">Salary Timeline</Link></li>
              <li><Link href="/salary-history/" className="text-gray-600 hover:text-blue-600 transition-colors">Salary History</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Location & Work</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/cost-of-living-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Cost of Living</Link></li>
              <li><Link href="/freelance-rate-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Freelance Rate</Link></li>
              <li><Link href="/part-time-salary-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Part-Time Income</Link></li>
              <li><Link href="/salary-comparison-calculator/" className="text-gray-600 hover:text-blue-600 transition-colors">Salary Comparison</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/about/" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link href="/contact/" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/privacy-policy/" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service/" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer/" className="text-gray-600 hover:text-blue-600 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 text-center pt-6 sm:pt-8 border-t border-gray-200">
          © {new Date().getFullYear()} PaycheckMath.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
