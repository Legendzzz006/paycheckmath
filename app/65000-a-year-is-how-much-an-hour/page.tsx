import type { Metadata } from 'next';
import Calculator from '@/components/Calculator';
import SalaryBreakdownTable from '@/components/SalaryBreakdownTable';
import FAQ from '@/components/FAQ';
import InternalLinks from '@/components/InternalLinks';
import RelatedCalculators from '@/components/RelatedCalculators';
import ErrorBoundary from '@/components/ErrorBoundary';
import Footer from '@/components/Footer';
import { generateSalaryPageContent } from '@/lib/salaryData';
import Link from 'next/link';

const SALARY = 65000;

export const metadata: Metadata = {
  title: '$65,000 a Year is How Much an Hour? | PaycheckMath',
  description: 'Convert $65,000 annual salary to hourly, monthly, weekly, and daily pay. See your exact take-home pay breakdown.',
  alternates: {
    canonical: 'https://paycheckmath.com/65000-a-year-is-how-much-an-hour',
  },
  openGraph: {
    title: '$65,000 a Year is How Much an Hour?',
    description: 'Convert $65,000 annual salary to hourly, monthly, weekly, and daily pay.',
    type: 'website',
    url: 'https://paycheckmath.com/65000-a-year-is-how-much-an-hour',
  },
};

export default function SalaryPage() {
  const content = generateSalaryPageContent(SALARY);
  const hourly = Math.round((SALARY / 2080) * 100) / 100;

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">$</span>
            </div>
            PaycheckMath.com
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {content.h1}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            {content.intro}
          </p>
        </div>

        <div className="mb-12">
          <ErrorBoundary>
            <Calculator initialSalary={SALARY} />
          </ErrorBoundary>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Complete Pay Breakdown for ${SALARY.toLocaleString()}/Year
          </h2>
          <SalaryBreakdownTable salary={SALARY} />
        </section>

        <section className="mb-16">
          <div className="prose prose-lg max-w-none text-gray-700">
            <div dangerouslySetInnerHTML={{ __html: content.content.replace(/\\n/g, '<br />') }} />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <FAQ faqs={content.faqs} />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Other Salary Conversions
          </h2>
          <InternalLinks currentSalary={SALARY} limit={20} />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <RelatedCalculators currentPage="/65000-a-year-is-how-much-an-hour/" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
