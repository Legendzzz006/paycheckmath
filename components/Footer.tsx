import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 sm:mt-24">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Calculators</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Salary Calculator</Link></li>
              <li><Link href="/salary-to-hourly" className="text-gray-600 hover:text-blue-600 transition-colors">Salary to Hourly</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/disclaimer" className="text-gray-600 hover:text-blue-600 transition-colors">Disclaimer</Link></li>
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
