import type { Metadata } from 'next';
import Link from 'next/link';
import SalaryTimelineCalculator from '@/components/SalaryTimelineCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Salary Increase Timeline Calculator - Project Future Earnings | PaycheckMath',
  description: 'Calculate your future salary with annual raises over time. See the compound effect of raises and compare against inflation. Plan your career growth.',
  keywords: 'salary timeline calculator, future salary calculator, raise calculator, salary projection, compound raises, inflation calculator',
  alternates: {
    canonical: '/salary-timeline',
  },
  openGraph: {
    title: 'Salary Timeline Calculator - Project Your Future Earnings',
    description: 'See how annual raises compound over time and compare your salary growth against inflation.',
    type: 'website',
    url: 'https://paycheckmath.com/salary-timeline',
  },
};

export default function SalaryTimelinePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Salary Timeline Calculator',
    description: 'Project your future salary with annual raises and see the impact of inflation on your earnings.',
    url: 'https://paycheckmath.com/salary-timeline',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Future salary projection',
      'Compound raise calculation',
      'Inflation adjustment',
      'Scenario comparison',
      'Year-by-year breakdown',
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
        name: 'Salary Timeline',
        item: 'https://paycheckmath.com/salary-timeline',
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
              Salary Increase Timeline Calculator
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mb-6">
              Project your future salary with annual raises and see how they compound over time. Compare your
              growth against inflation and understand the real value of your earnings.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4 max-w-3xl">
              <p className="text-blue-900 font-semibold">
                💡 A 3% annual raise on a $75,000 salary grows to $100,793 in 10 years. But with 2.5% inflation,
                the real value is only $78,500 - barely above where you started!
              </p>
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-16">
            <ErrorBoundary>
              <SalaryTimelineCalculator />
            </ErrorBoundary>
          </div>

          {/* Educational Content */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Salary Growth
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">The Power of Compound Raises</h3>
              <p>
                Annual raises compound over time, meaning each raise is calculated on your new, higher salary.
                A 3% raise on $75,000 is $2,250, but a 3% raise on $100,000 is $3,000. This compounding effect
                means small differences in raise percentages lead to large differences over time.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">The Inflation Problem</h3>
              <p>
                Inflation erodes the purchasing power of your salary. If you get a 3% raise but inflation is 3%,
                you haven't actually gained any purchasing power - you're just keeping up. To truly grow your
                wealth, your raises must exceed inflation. Historical inflation averages 2-3% annually, but can
                spike higher during economic uncertainty.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Real vs Nominal Growth</h3>
              <p>
                <strong>Nominal growth</strong> is the actual dollar increase in your salary. <strong>Real growth</strong>
                is your salary increase adjusted for inflation - what your salary is actually worth in today's dollars.
                Real growth is what matters for your standard of living. A 5% nominal raise with 2% inflation equals
                3% real growth.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Career Planning Strategy</h3>
              <p>
                Use this calculator to set realistic salary goals and evaluate job offers. If a new job offers
                higher raises (even with a similar starting salary), it could be worth significantly more over
                5-10 years. Similarly, if your current raises aren't beating inflation, it's time to negotiate
                or look for new opportunities.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Typical Raise Scenarios
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">No Raise (0%)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Salary freeze. You're losing purchasing power equal to the inflation rate each year.
                </p>
                <div className="text-xs text-red-600 font-semibold">
                  ⚠️ Effectively a pay cut
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Cost of Living (2-3%)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Matches inflation. Maintains your purchasing power but doesn't grow your wealth.
                </p>
                <div className="text-xs text-amber-600 font-semibold">
                  ⚠️ Treading water
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Standard (3-5%)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Typical merit raise. Beats inflation by 1-2%, providing modest real growth.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  ✓ Slow growth
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Good Performance (5-7%)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Above-average raise for strong performers. Provides meaningful real growth.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  ✓ Good growth
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Promotion (10-15%)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Internal promotion with increased responsibilities. Significant salary jump.
                </p>
                <div className="text-xs text-blue-600 font-semibold">
                  ✓ Strong growth
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Job Change (15-25%)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Switching companies. Typically the fastest way to increase salary significantly.
                </p>
                <div className="text-xs text-purple-600 font-semibold">
                  ✓ Excellent growth
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Maximizing Your Salary Growth
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Annual Negotiation Strategy</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Document your achievements throughout the year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Research market rates for your role and experience level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Schedule your review meeting proactively, don't wait</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Ask for specific numbers, not "competitive" or "fair"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>If denied, ask what's needed for a raise in 6 months</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">When to Change Jobs</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Your raises consistently lag inflation or market rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>You've been in the same role for 3+ years without promotion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>External offers are 15-20% higher than your current salary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Your skills have outgrown your current position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Limited growth opportunities at your current company</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4">
                  <p className="text-blue-900 font-semibold">
                    💡 Pro Tip: The biggest salary jumps come from changing companies, not internal promotions.
                    Consider external opportunities every 2-3 years to maximize your earning potential.
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
                  What's a good annual raise percentage?
                </h3>
                <p className="text-gray-700">
                  At minimum, your raise should match inflation (2-3%) to maintain purchasing power. A good raise
                  is 4-6%, which provides 1-3% real growth. Excellent raises are 7%+ or come from promotions (10-15%)
                  or job changes (15-25%).
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  How does inflation affect my salary?
                </h3>
                <p className="text-gray-700">
                  Inflation reduces the purchasing power of your salary. If inflation is 3% and you get a 3% raise,
                  you can buy the same amount of goods as last year - you haven't actually gained anything. To grow
                  your wealth, your raises must exceed inflation.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Should I stay at a company with small raises?
                </h3>
                <p className="text-gray-700">
                  If your raises consistently lag inflation or market rates, you're losing money by staying.
                  Consider negotiating harder, or look for external opportunities. Loyalty doesn't pay as well
                  as strategic job changes - the average job change results in a 10-20% salary increase.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  How often should I get a raise?
                </h3>
                <p className="text-gray-700">
                  Most companies do annual reviews and raises. If you're not getting annual raises, that's a red
                  flag. High performers might negotiate mid-year raises or bonuses. If you get a promotion or
                  significantly expand your responsibilities, don't wait for the annual review - negotiate immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <RelatedCalculators currentPage="/salary-timeline/" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
