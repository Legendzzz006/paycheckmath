import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About PaycheckMath | Free Salary & Wage Calculators',
  description: 'Learn about PaycheckMath and our mission to provide accurate, free salary and wage conversion tools for US workers.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">$</span>
            </div>
            PaycheckMath.com
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          About PaycheckMath
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            PaycheckMath is a free resource designed to help US workers understand their 
            compensation by converting annual salaries to hourly, daily, weekly, and monthly pay.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We believe that understanding your compensation is fundamental to making informed 
            career decisions. Whether you're comparing job offers, negotiating salary, or simply 
            curious about your hourly rate, our calculators provide quick, accurate answers.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Why We Built This
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Many workers struggle to compare salaries across different pay structures. A job 
            offering $75,000 per year might sound great, but how does it compare to a position 
            paying $38 per hour? Our tools make these comparisons simple and transparent.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Accuracy and Transparency
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            All calculations are based on standard US work hours and clearly explained formulas. 
            We use 2,080 hours per year as the baseline (40 hours per week × 52 weeks), but our 
            calculators allow you to adjust these values to match your specific situation.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Free and Accessible
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            PaycheckMath is completely free to use with no registration required. We believe 
            financial tools should be accessible to everyone, and we're committed to keeping our 
            calculators free and ad-light.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Have questions, suggestions, or feedback? We'd love to hear from you. Visit our{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              contact page
            </Link>{' '}
            to get in touch.
          </p>
        </div>
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
            © {new Date().getFullYear()} PaycheckMath.com. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
