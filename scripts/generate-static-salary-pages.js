const fs = require('fs');
const path = require('path');

const popularSalaries = [
  30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
  80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000,
  160000, 170000, 180000, 190000, 200000, 250000, 300000
];

const appDir = path.join(__dirname, '../app');

console.log('Creating static salary page directories...');

// Remove the dynamic route folder if it exists
const dynamicRoutePath = path.join(appDir, '[salary]-a-year-is-how-much-an-hour');
if (fs.existsSync(dynamicRoutePath)) {
  fs.rmSync(dynamicRoutePath, { recursive: true, force: true });
  console.log('Removed dynamic route folder');
}

// Create individual folders for each salary
popularSalaries.forEach(salary => {
  const folderName = `${salary}-a-year-is-how-much-an-hour`;
  const folderPath = path.join(appDir, folderName);
  
  // Create directory
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  
  // Create page.tsx
  const pageContent = `import type { Metadata } from 'next';
import Calculator from '@/components/Calculator';
import SalaryBreakdownTable from '@/components/SalaryBreakdownTable';
import FAQ from '@/components/FAQ';
import InternalLinks from '@/components/InternalLinks';
import RelatedCalculators from '@/components/RelatedCalculators';
import ErrorBoundary from '@/components/ErrorBoundary';
import Footer from '@/components/Footer';
import { generateSalaryPageContent } from '@/lib/salaryData';
import Link from 'next/link';

const SALARY = ${salary};

export const metadata: Metadata = {
  title: '$${salary.toLocaleString()} a Year is How Much an Hour? | PaycheckMath',
  description: 'Convert $${salary.toLocaleString()} annual salary to hourly, monthly, weekly, and daily pay. See your exact take-home pay breakdown.',
  alternates: {
    canonical: 'https://paycheckmath.com/${salary}-a-year-is-how-much-an-hour',
  },
  openGraph: {
    title: '$${salary.toLocaleString()} a Year is How Much an Hour?',
    description: 'Convert $${salary.toLocaleString()} annual salary to hourly, monthly, weekly, and daily pay.',
    type: 'website',
    url: 'https://paycheckmath.com/${salary}-a-year-is-how-much-an-hour',
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
            Complete Pay Breakdown for \${SALARY.toLocaleString()}/Year
          </h2>
          <SalaryBreakdownTable salary={SALARY} />
        </section>

        <section className="mb-16">
          <div className="prose prose-lg max-w-none text-gray-700">
            <div dangerouslySetInnerHTML={{ __html: content.content.replace(/\\\\n/g, '<br />') }} />
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
          <RelatedCalculators currentPage="/${salary}-a-year-is-how-much-an-hour/" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
`;
  
  const pagePath = path.join(folderPath, 'page.tsx');
  fs.writeFileSync(pagePath, pageContent);
  
  console.log(`Created: ${folderName}/page.tsx`);
});

console.log(`\nGenerated ${popularSalaries.length} static salary pages successfully!`);
console.log('\nRun "npm run build" to build the site with all pages.');
