import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Calculator from '@/components/Calculator';
import SalaryBreakdownTable from '@/components/SalaryBreakdownTable';
import FAQ from '@/components/FAQ';
import InternalLinks from '@/components/InternalLinks';
import RelatedCalculators from '@/components/RelatedCalculators';
import ErrorBoundary from '@/components/ErrorBoundary';
import Footer from '@/components/Footer';
import { generateSalaryPageContent } from '@/lib/salaryData';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ salary: string }>;
}

// Valid salary amounts for static generation
const VALID_SALARIES = [
  30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
  80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000,
  160000, 170000, 180000, 190000, 200000, 250000, 300000
];

export async function generateStaticParams() {
  return VALID_SALARIES.map((salary) => ({
    salary: `${salary}-a-year-is-how-much-an-hour`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { salary: salaryParam } = await params;
  const salary = parseSalaryFromSlug(salaryParam);
  
  if (!salary) {
    return {
      title: 'Salary Not Found | PaycheckMath',
    };
  }

  return {
    title: `$${salary.toLocaleString()} a Year is How Much an Hour? | PaycheckMath`,
    description: `Convert $${salary.toLocaleString()} annual salary to hourly, monthly, weekly, and daily pay. See your exact take-home pay breakdown.`,
    alternates: {
      canonical: `https://paycheckmath.com/${salaryParam}`,
    },
    openGraph: {
      title: `$${salary.toLocaleString()} a Year is How Much an Hour?`,
      description: `Convert $${salary.toLocaleString()} annual salary to hourly, monthly, weekly, and daily pay.`,
      type: 'website',
      url: `https://paycheckmath.com/${salaryParam}`,
    },
  };
}

function parseSalaryFromSlug(slug: string): number | null {
  const match = slug.match(/^(\d+)-a-year-is-how-much-an-hour$/);
  if (!match) return null;
  
  const salary = parseInt(match[1], 10);
  return VALID_SALARIES.includes(salary) ? salary : null;
}

export default async function SalaryPage({ params }: PageProps) {
  const { salary: salaryParam } = await params;
  const salary = parseSalaryFromSlug(salaryParam);

  if (!salary) {
    notFound();
  }

  const content = generateSalaryPageContent(salary);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">$</span>
            </div>
            PaycheckMath.com
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
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
            <Calculator initialSalary={salary} />
          </ErrorBoundary>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Complete Pay Breakdown for ${salary.toLocaleString()}/Year
          </h2>
          <SalaryBreakdownTable salary={salary} />
        </section>

        <section className="mb-16">
          <div className="prose prose-lg max-w-none text-gray-700">
            {content.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-12">{paragraph.replace('## ', '')}</h2>;
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-8">{paragraph.replace('### ', '')}</h3>;
              } else if (paragraph.trim().startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.trim().startsWith('- '));
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2 mb-6">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                );
              } else if (paragraph.trim()) {
                return <p key={index} className="mb-6 leading-relaxed">{paragraph}</p>;
              }
              return null;
            })}
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
          <InternalLinks currentSalary={salary} limit={20} />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <RelatedCalculators currentPage={`/${salaryParam}/`} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
