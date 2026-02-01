const fs = require('fs');
const path = require('path');

const calculators = [
  {
    slug: 'overtime-calculator',
    title: 'Overtime Pay Calculator | Calculate Time and a Half',
    description: 'Free overtime calculator to calculate your overtime pay. Supports time and a half, double time, and custom overtime rates. See your total earnings instantly.',
    h1: 'Overtime Pay Calculator',
    component: 'OvertimeCalculator',
    intro: 'Calculate your overtime pay with our free overtime calculator. Whether you work time and a half (1.5x) or double time (2x), see exactly how much you\'ll earn including regular and overtime hours.',
  },
  {
    slug: 'biweekly-paycheck-calculator',
    title: 'Bi-Weekly Paycheck Calculator | Convert Salary to Bi-Weekly Pay',
    description: 'Calculate your bi-weekly paycheck from annual salary or hourly rate. See your pay every two weeks, monthly equivalent, and annual total.',
    h1: 'Bi-Weekly Paycheck Calculator',
    component: 'BiweeklyCalculator',
    intro: 'Convert your annual salary or hourly rate to bi-weekly pay. Perfect for understanding your paycheck when you\'re paid every two weeks (26 pay periods per year).',
  },
  {
    slug: 'take-home-pay-calculator',
    title: 'Take-Home Pay Calculator | Calculate Net Pay After Taxes',
    description: 'Calculate your take-home pay after federal taxes, state taxes, FICA, and other deductions. See your net pay and understand where your money goes.',
    h1: 'Take-Home Pay Calculator',
    component: 'TakeHomeCalculator',
    intro: 'Calculate your actual take-home pay after all deductions. Enter your gross pay and tax rates to see your net pay and understand how much you actually keep from your paycheck.',
  },
];

const template = (calc) => `import type { Metadata } from 'next';
import ${calc.component} from '@/components/${calc.component}';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${calc.title}',
  description: '${calc.description}',
  openGraph: {
    title: '${calc.title}',
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
            ${calc.h1}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            ${calc.intro}
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
            <Link
              href="/"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Salary Calculator</h3>
              <p className="text-sm text-gray-600">Convert annual salary to hourly, daily, weekly, and monthly pay</p>
            </Link>
            <Link
              href="/salary-to-hourly"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Salary to Hourly</h3>
              <p className="text-sm text-gray-600">Convert any annual salary to its hourly equivalent</p>
            </Link>
            ${calc.slug !== 'overtime-calculator' ? `<Link
              href="/overtime-calculator"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Overtime Calculator</h3>
              <p className="text-sm text-gray-600">Calculate overtime pay with time and a half or double time</p>
            </Link>` : ''}
            ${calc.slug !== 'biweekly-paycheck-calculator' ? `<Link
              href="/biweekly-paycheck-calculator"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Bi-Weekly Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your bi-weekly paycheck amount</p>
            </Link>` : ''}
            ${calc.slug !== 'take-home-pay-calculator' ? `<Link
              href="/take-home-pay-calculator"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">Take-Home Pay</h3>
              <p className="text-sm text-gray-600">Calculate net pay after taxes and deductions</p>
            </Link>` : ''}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
`;

const appDir = path.join(__dirname, '..', 'app');

calculators.forEach(calc => {
  const dirPath = path.join(appDir, calc.slug);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const filePath = path.join(dirPath, 'page.tsx');
  fs.writeFileSync(filePath, template(calc));
  
  console.log(`✓ Created ${calc.slug}/page.tsx`);
});

console.log(`\n✅ Generated ${calculators.length} calculator pages!`);
