import type { Metadata } from 'next';
import Link from 'next/link';
import CostOfLivingCalculator from '@/components/CostOfLivingCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Cost of Living Calculator - Compare Cities & Salary Equivalence | PaycheckMath',
  description: 'Compare cost of living between cities and calculate equivalent salaries. See housing, groceries, transport costs and get relocation recommendations.',
  keywords: 'cost of living calculator, city comparison, salary equivalence, relocation calculator, cost of living comparison',
  alternates: {
    canonical: 'https://paycheckmath.com/cost-of-living-calculator',
  },
  openGraph: {
    title: 'Cost of Living Calculator - Compare Cities',
    description: 'Calculate equivalent salaries and compare living costs between major US cities.',
    type: 'website',
    url: 'https://paycheckmath.com/cost-of-living-calculator',
  },
};

export default function CostOfLivingCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cost of Living Calculator',
    description: 'Compare cost of living between cities and calculate equivalent salaries for relocation decisions.',
    url: 'https://paycheckmath.com/cost-of-living-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'City-to-city cost comparison',
      'Equivalent salary calculator',
      'Housing cost analysis',
      'Relocation recommendations',
      'Disposable income comparison',
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
        name: 'Cost of Living Calculator',
        item: 'https://paycheckmath.com/cost-of-living-calculator',
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
              Cost of Living Calculator
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mb-6">
              Compare living costs between cities and calculate equivalent salaries. See exactly how far your money
              goes in different locations and make informed relocation decisions.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4 max-w-3xl">
              <p className="text-blue-900 font-semibold">
                💡 A $100,000 salary in New York City has the same buying power as $63,000 in Austin, Texas.
                Location matters more than you think!
              </p>
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-16">
            <ErrorBoundary>
              <CostOfLivingCalculator />
            </ErrorBoundary>
          </div>

          {/* Educational Content */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Cost of Living
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">What is Cost of Living?</h3>
              <p>
                Cost of living refers to the amount of money needed to maintain a certain standard of living in a
                specific location. It includes housing, food, transportation, healthcare, utilities, and other
                essential expenses. The cost of living index compares these expenses across different cities, with
                100 representing the national average.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Why It Matters for Your Career</h3>
              <p>
                A higher salary doesn't always mean more money in your pocket. A $120,000 job in San Francisco
                might leave you with less disposable income than a $90,000 job in Dallas. When evaluating job
                offers or considering relocation, you need to look at real purchasing power, not just the number
                on your paycheck.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Housing: The Biggest Factor</h3>
              <p>
                Housing typically accounts for 25-35% of your budget and varies dramatically by location. In
                expensive cities like New York or San Francisco, housing can consume 40-50% of your income.
                This is why housing costs have the biggest impact on cost of living differences between cities.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Beyond the Numbers</h3>
              <p>
                While our calculator focuses on financial factors, remember to consider quality of life elements:
                job opportunities, career growth, weather, culture, proximity to family, commute times, and
                lifestyle preferences. The "best" city is the one that balances financial and personal factors
                for your unique situation.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Use This Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Select Your Cities</h3>
                <p className="text-gray-700">
                  Choose your current city and the city you're considering moving to. We cover 26 major US cities
                  with accurate cost of living data.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Enter Your Salary</h3>
                <p className="text-gray-700">
                  Input your current salary or the offer you're considering. The calculator will automatically
                  compute the equivalent salary in the new city.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Review the Breakdown</h3>
                <p className="text-gray-700">
                  See detailed cost comparisons for housing, groceries, transportation, utilities, and healthcare.
                  Understand exactly where your money goes in each city.
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">4. Get Recommendations</h3>
                <p className="text-gray-700">
                  Our calculator analyzes your situation and provides a relocation recommendation based on real
                  disposable income and cost differences.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cost of Living by Category
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Housing</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Rent, mortgage, property taxes, insurance, and maintenance costs.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Typical Range:</strong> 25-40% of income
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🛒</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Groceries</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Food, beverages, and household supplies purchased for home consumption.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Typical Range:</strong> 10-15% of income
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🚗</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Transportation</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Car payments, gas, insurance, maintenance, public transit, and parking.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Typical Range:</strong> 15-20% of income
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Utilities</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Electricity, gas, water, internet, phone, and trash services.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Typical Range:</strong> 5-10% of income
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Healthcare</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Insurance premiums, copays, prescriptions, and medical expenses.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Typical Range:</strong> 8-12% of income
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Other Expenses</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Entertainment, dining out, clothing, personal care, and miscellaneous.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Typical Range:</strong> 20-30% of income
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Relocation Decision Factors
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Financial Factors</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Salary increase vs cost of living increase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Housing affordability (rent or buy)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>State and local tax rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Career growth opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Relocation package and moving costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Long-term earning potential</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quality of Life Factors</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Proximity to family and friends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Climate and weather preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Commute time and transportation options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Cultural fit and lifestyle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Schools and education (if applicable)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Safety and crime rates</span>
                    </li>
                  </ul>
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
                  How accurate is the cost of living data?
                </h3>
                <p className="text-gray-700">
                  Our data is based on aggregated sources including government statistics, real estate data, and
                  consumer price indices. While we strive for accuracy, actual costs vary by neighborhood, lifestyle,
                  and personal spending habits. Use these figures as estimates for comparison purposes.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Should I always choose the city with lower cost of living?
                </h3>
                <p className="text-gray-700">
                  Not necessarily. Higher cost of living cities often offer higher salaries, better career opportunities,
                  and more amenities. Focus on disposable income (what's left after expenses) and quality of life factors
                  rather than just the cost of living index.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  How do taxes affect cost of living?
                </h3>
                <p className="text-gray-700">
                  State and local taxes significantly impact your take-home pay. States like Texas, Florida, and
                  Washington have no state income tax, while California and New York have high state taxes. Our
                  calculator focuses on living expenses, but you should also consider tax differences when comparing cities.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What about remote work opportunities?
                </h3>
                <p className="text-gray-700">
                  Remote work has changed the game. You can now earn a high-COL city salary while living in a
                  low-COL city. However, some companies adjust salaries based on location, so clarify this before
                  relocating. Geographic arbitrage can significantly boost your savings and quality of life.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <RelatedCalculators currentPage="/cost-of-living-calculator/" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
