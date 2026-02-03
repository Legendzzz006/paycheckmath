import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Calculator from '@/components/Calculator';
import SalaryBreakdownTable from '@/components/SalaryBreakdownTable';
import FAQ from '@/components/FAQ';
import InternalLinks from '@/components/InternalLinks';
import Footer from '@/components/Footer';
import { generateSalaryPageContent, popularSalaries } from '@/lib/salaryData';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ salary: string }>;
}

export async function generateStaticParams() {
  return popularSalaries.map((salary) => ({
    salary: salary.toString(),
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { salary: salaryParam } = await params;
  const salary = parseInt(salaryParam);
  
  if (isNaN(salary) || salary < 1000 || salary > 1000000) {
    return {
      title: 'Salary Not Found',
    };
  }

  const content = generateSalaryPageContent(salary);
  const canonical = `https://paycheckmath.com/${salary}-a-year-is-how-much-an-hour`;
  
  return {
    title: content.title,
    description: content.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      type: 'website',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.metaDescription,
    },
  };
}

export default async function SalaryPage({ params }: PageProps) {
  const { salary: salaryParam } = await params;
  const salary = parseInt(salaryParam);
  
  if (isNaN(salary) || salary < 1000 || salary > 1000000) {
    notFound();
  }

  const content = generateSalaryPageContent(salary);
  const hourly = Math.round((salary / 2080) * 100) / 100;
  const monthly = Math.round((salary / 12) * 100) / 100;
  const weekly = Math.round((salary / 52) * 100) / 100;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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

        <main className="max-w-5xl mx-auto px-4 py-16">
          <div className="mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {content.h1}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {content.intro}
            </p>
          </div>

          <div className="mb-12">
            <Calculator initialSalary={salary} />
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Pay Breakdown for ${salary.toLocaleString()}/Year
            </h2>
            <SalaryBreakdownTable salary={salary} />
          </section>

          <article className="prose prose-lg max-w-none mb-16 space-y-6 text-gray-700 leading-relaxed">
            {content.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              } else if (paragraph.trim()) {
                return (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </article>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <FAQ faqs={content.faqs} />
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Compare Other Salaries
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              See how other annual salaries convert to hourly wages:
            </p>
            <InternalLinks currentSalary={salary} limit={20} />
          </section>

          <aside className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Disclaimer
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The calculations on this page are based on standard work hours and do not account 
                  for taxes, deductions, or other factors that affect take-home pay. This information 
                  is provided for educational purposes only and should not be considered financial 
                  advice. Consult with a qualified professional for personalized guidance regarding 
                  your specific situation.
                </p>
              </div>
            </div>
          </aside>
        </main>

        <Footer />
      </div>
    </>
  );
}
