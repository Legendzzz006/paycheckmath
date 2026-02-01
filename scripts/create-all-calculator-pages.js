const fs = require('fs');
const path = require('path');

const calculators = [
  // Tier 2
  {
    slug: 'monthly-income-calculator',
    title: 'Monthly Income Calculator',
    description: 'Calculate your monthly income from annual salary, hourly rate, or weekly pay. Convert between all pay periods instantly.',
    component: 'MonthlyCalculator',
    tier: 2,
  },
  {
    slug: 'part-time-salary-calculator',
    title: 'Part-Time Salary Calculator',
    description: 'Calculate income from part-time work or multiple jobs. See your total earnings from all part-time positions combined.',
    component: 'PartTimeCalculator',
    tier: 2,
  },
  {
    slug: 'salary-comparison-calculator',
    title: 'Salary vs Hourly Comparison Calculator',
    description: 'Compare salary and hourly job offers side by side. Factor in benefits to see which position pays more.',
    component: 'ComparisonCalculator',
    tier: 2,
  },
  // Tier 3
  {
    slug: 'raise-calculator',
    title: 'Raise Calculator | Calculate Salary Increase',
    description: 'Calculate your new salary after a raise. See how a percentage or dollar increase affects your annual, monthly, and hourly pay.',
    component: 'RaiseCalculator',
    tier: 3,
  },
];

const relatedCalculators = {
  'monthly-income-calculator': [
    { href: '/', title: 'Salary Calculator', desc: 'Convert annual salary to all pay periods' },
    { href: '/biweekly-paycheck-calculator', title: 'Bi-Weekly Calculator', desc: 'Calculate bi-weekly paycheck' },
    { href: '/take-home-pay-calculator', title: 'Take-Home Pay', desc: 'Calculate net pay after taxes' },
  ],
  'part-time-salary-calculator': [
    { href: '/', title: 'Salary Calculator', desc: 'Convert annual salary to hourly' },
    { href: '/monthly-income-calculator', title: 'Monthly Income', desc: 'Calculate monthly income' },
    { href: '/overtime-calculator', title: 'Overtime Calculator', desc: 'Calculate overtime pay' },
  ],
  'salary-comparison-calculator': [
    { href: '/', title: 'Salary Calculator', desc: 'Convert annual salary to hourly' },
    { href: '/take-home-pay-calculator', title: 'Take-Home Pay', desc: 'Calculate net pay after taxes' },
    { href: '/raise-calculator', title: 'Raise Calculator', desc: 'Calculate salary increase' },
  ],
  'raise-calculator': [
    { href: '/', title: 'Salary Calculator', desc: 'Convert annual salary to all pay periods' },
    { href: '/salary-comparison-calculator', title: 'Salary Comparison', desc: 'Compare two job offers' },
    { href: '/take-home-pay-calculator', title: 'Take-Home Pay', desc: 'Calculate net pay after taxes' },
  ],
};

function createPageContent(calc) {
  const related = relatedCalculators[calc.slug] || [];
  
  return `import type { Metadata } from 'next';
import ${calc.component} from '@/components/${calc.component}';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${calc.title} | PaycheckMath.com',
  description: '${calc.description}',
  openGraph: {
    title: '${calc.title} | PaycheckMath.com',
    description: '${calc.description}',
    type: 'website',
  },
};

export default function ${calc.component}Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            ${calc.title}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            ${calc.description}
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <${calc.component} />
        </div>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
${related.map(r => `            <Link
              href="${r.href}"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">${r.title}</h3>
              <p className="text-sm text-gray-600">${r.desc}</p>
            </Link>`).join('\n')}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
`;
}

// Create directories and files
calculators.forEach(calc => {
  const dirPath = path.join(__dirname, '..', 'app', calc.slug);
  const filePath = path.join(dirPath, 'page.tsx');

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${calc.slug}/`);
  }

  // Create page file
  fs.writeFileSync(filePath, createPageContent(calc));
  console.log(`✅ Created page: ${calc.slug}/page.tsx`);
});

console.log('\n🎉 All calculator pages created successfully!');
console.log('\nTier 2 Calculators:');
calculators.filter(c => c.tier === 2).forEach(c => {
  console.log(`  - /${c.slug}`);
});
console.log('\nTier 3 Calculators:');
calculators.filter(c => c.tier === 3).forEach(c => {
  console.log(`  - /${c.slug}`);
});
