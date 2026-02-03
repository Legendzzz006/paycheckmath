import type { Metadata } from 'next';
import Calculator from '@/components/Calculator';
import SalaryBreakdownTable from '@/components/SalaryBreakdownTable';
import FAQ from '@/components/FAQ';
import InternalLinks from '@/components/InternalLinks';
import { generateSalaryPageContent } from '@/lib/salaryData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const salary = 100000;
const content = generateSalaryPageContent(salary);

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  alternates: {
    canonical: 'https://paycheckmath.com/100000-a-year-is-how-much-an-hour',
  },
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
    url: 'https://paycheckmath.com/100000-a-year-is-how-much-an-hour',
  },
  twitter: {
    card: 'summary_large_image',
    title: content.title,
    description: content.metaDescription,
  },
};

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

export default function SalaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {content.h1}
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {content.intro}
            </p>
          </div>

          <div className="mb-12 sm:mb-16">
            <Calculator initialSalary={salary} />
          </div>

          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Complete Pay Breakdown for $1,00,000/Year
            </h2>
            <SalaryBreakdownTable salary={salary} />
          </section>

          <article className="prose prose-lg max-w-none mb-12 sm:mb-16 space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            {content.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-4 sm:mb-6">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              } else if (paragraph.trim()) {
                return (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </article>

          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              Frequently Asked Questions
            </h2>
            <FAQ faqs={content.faqs} />
          </section>

          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Compare Other Salaries
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
              See how other annual salaries convert to hourly wages:
            </p>
            <InternalLinks currentSalary={salary} limit={20} />
          </section>

          <aside className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6 sm:p-8">
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Disclaimer
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
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
