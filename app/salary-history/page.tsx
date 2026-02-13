import type { Metadata } from 'next';
import Link from 'next/link';
import SalaryHistoryTracker from '@/components/SalaryHistoryTracker';
import RelatedCalculators from '@/components/RelatedCalculators';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Salary History Tracker - Track Your Career Growth | PaycheckMath',
  description: 'Track your salary history over time, visualize career growth, calculate lifetime earnings, and export your data. Free salary tracking tool with no account required.',
  keywords: 'salary history tracker, career growth tracker, salary progression, lifetime earnings calculator, salary tracking',
  alternates: {
    canonical: 'https://paycheckmath.com/salary-history',
  },
  openGraph: {
    title: 'Salary History Tracker - Track Your Career Growth',
    description: 'Track your salary over time and visualize your career progression with our free salary history tracker.',
    type: 'website',
    url: 'https://paycheckmath.com/salary-history',
  },
};

export default function SalaryHistoryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Salary History Tracker',
    description: 'Track your salary history, visualize career growth, and calculate lifetime earnings.',
    url: 'https://paycheckmath.com/salary-history',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Track salary changes over time',
      'Visualize career growth',
      'Calculate lifetime earnings',
      'Export to CSV',
      'No account required',
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://paycheckmath.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Salary History',
        item: 'https://paycheckmath.com/salary-history',
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Salary History Tracker
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mb-6">
              Track your salary journey, visualize your career growth, and calculate your lifetime earnings.
              All data is stored locally in your browser - no account required, completely private.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4 max-w-3xl">
              <p className="text-blue-900 font-semibold">
                🔒 Your data stays on your device. We don't store or transmit any of your salary information.
              </p>
            </div>
          </div>

          {/* Tracker */}
          <div className="mb-16">
            <ErrorBoundary>
              <SalaryHistoryTracker />
            </ErrorBoundary>
          </div>

          {/* Educational Content */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Track Your Salary History?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📈 Visualize Your Growth</h3>
                <p className="text-gray-700">
                  See your career progression at a glance. Track how your salary has increased over time and
                  identify patterns in your career growth.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">💰 Calculate Lifetime Earnings</h3>
                <p className="text-gray-700">
                  Understand your total career earnings. This helps with retirement planning, financial goal
                  setting, and appreciating your career achievements.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 Negotiate Better</h3>
                <p className="text-gray-700">
                  Having a clear record of your salary history helps you negotiate raises and new job offers.
                  Know your worth and track your market value over time.
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📊 Make Informed Decisions</h3>
                <p className="text-gray-700">
                  Use your salary data to make better career decisions. Identify when you've had the biggest
                  jumps and what led to them.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Use the Salary Tracker
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Adding Entries</h3>
              <p>
                Click "Add Salary Entry" and fill in the details: date, salary, job title, company, and optional
                notes. Add an entry whenever you get a raise, change jobs, or receive a promotion. The more data
                you track, the more insights you'll gain.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Understanding Statistics</h3>
              <p>
                The tracker automatically calculates key metrics:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Total Earnings:</strong> Sum of all salaries weighted by time in each role</li>
                <li><strong>Total Growth:</strong> Difference between your first and current salary</li>
                <li><strong>Average Yearly Growth:</strong> Your average annual salary increase percentage</li>
                <li><strong>Highest Salary:</strong> Your peak earnings to date</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900">Exporting Your Data</h3>
              <p>
                Export your salary history to CSV for backup or analysis in spreadsheet software. You can also
                import previously exported data to restore your history or transfer it to another device.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Privacy & Security</h3>
              <p>
                All data is stored locally in your browser using localStorage. We never see, store, or transmit
                your salary information. Your data stays on your device and is completely private. However,
                clearing your browser data will delete your history, so export regularly as a backup.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Career Growth Benchmarks
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Typical Annual Raises</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 mb-1">2-3%</div>
                      <div className="text-sm text-gray-700">Cost of living adjustment</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600 mb-1">5-7%</div>
                      <div className="text-sm text-gray-700">Merit-based raise</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600 mb-1">10-20%</div>
                      <div className="text-sm text-gray-700">Promotion or job change</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Career Milestones</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Years 0-2:</strong> Entry-level, expect 3-5% annual raises</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Years 3-5:</strong> Mid-level, potential for 10-15% jumps with promotions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Years 5-10:</strong> Senior level, 15-25% increases with job changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Years 10+:</strong> Leadership roles, compensation often includes equity and bonuses</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4">
                  <p className="text-blue-900 font-semibold">
                    💡 Pro Tip: The biggest salary jumps typically come from changing companies, not internal
                    promotions. If your growth has stagnated, it might be time to explore external opportunities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Is my salary data secure?
                </h3>
                <p className="text-gray-700">
                  Yes! All data is stored locally in your browser using localStorage. We never see, collect, or
                  transmit your salary information. Your data never leaves your device.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What happens if I clear my browser data?
                </h3>
                <p className="text-gray-700">
                  Clearing your browser data will delete your salary history. We recommend exporting your data
                  to CSV regularly as a backup. You can then import it back if needed.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Can I access my data on multiple devices?
                </h3>
                <p className="text-gray-700">
                  Since data is stored locally, each device has its own separate history. To sync across devices,
                  export your data from one device and import it on another.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  How often should I update my salary history?
                </h3>
                <p className="text-gray-700">
                  Add an entry whenever your salary changes - raises, promotions, job changes, or bonuses.
                  Even if your salary stays the same, you might add an entry annually to track your tenure.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <RelatedCalculators currentPage="/salary-history/" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
