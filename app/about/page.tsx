import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About PaycheckMath | Free Salary & Wage Calculators',
  description: 'Learn about PaycheckMath and our mission to provide accurate, free salary and wage conversion tools for US workers.',
  alternates: {
    canonical: '/about',
  },
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
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our goal is to empower workers across the United States with the tools and knowledge
            they need to understand their true earning potential. We've built a comprehensive suite
            of calculators that go beyond simple conversions, helping you plan for raises, compare
            job offers, and understand your take-home pay.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Why We Built This
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Many workers struggle to compare salaries across different pay structures. A job
            offering $75,000 per year might sound great, but how does it compare to a position
            paying $38 per hour? What about benefits, overtime potential, or part-time work?
            Our tools make these comparisons simple and transparent.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We created PaycheckMath because we saw a need for straightforward, honest salary
            calculators that don't require sign-ups, don't sell your data, and don't hide behind
            paywalls. Just clean, accurate calculations when you need them.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            What Makes Us Different
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Unlike other salary calculators, we offer a complete suite of tools:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>9 Specialized Calculators:</strong> From basic salary conversions to advanced comparison tools</li>
            <li><strong>No Registration Required:</strong> Use all our tools instantly without creating an account</li>
            <li><strong>Mobile-Optimized:</strong> Calculate on any device, anywhere</li>
            <li><strong>Real-Time Results:</strong> See your calculations update as you type</li>
            <li><strong>Educational Content:</strong> Learn about salary structures, not just numbers</li>
            <li><strong>Completely Free:</strong> All features available to everyone at no cost</li>
          </ul>

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
            <Link href="/contact/" className="text-blue-600 hover:text-blue-800 underline">
              contact page
            </Link>{' '}
            to get in touch.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
