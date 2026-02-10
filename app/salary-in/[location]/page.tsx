import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Calculator from '@/components/Calculator';
import ErrorBoundary from '@/components/ErrorBoundary';
import RelatedCalculators from '@/components/RelatedCalculators';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { STATE_SLUGS, generateStatePageContent, US_STATES, calculateAdjustedSalary } from '@/lib/stateData';

interface PageProps {
  params: Promise<{ location: string }>;
}

// Parse location slug like "100000-california" into salary and state
function parseLocation(location: string): { salary: number; state: string } | null {
  const parts = location.split('-');
  if (parts.length < 2) return null;

  const salary = parseInt(parts[0]);
  const state = parts.slice(1).join('-');

  if (isNaN(salary) || !STATE_SLUGS.includes(state)) return null;

  return { salary, state };
}

export async function generateStaticParams() {
  // Generate top 10 salaries × all 50 states = 500 pages
  const topSalaries = [50000, 60000, 70000, 75000, 80000, 90000, 100000, 120000, 150000, 200000];

  return topSalaries.flatMap((salary) =>
    STATE_SLUGS.map((state) => ({
      location: `${salary}-${state}`,
    }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const parsed = parseLocation(location);

  if (!parsed) return { title: 'Salary Not Found' };

  const content = generateStatePageContent(parsed.salary, parsed.state);
  if (!content) return { title: 'Salary Not Found' };

  const canonical = `/salary-in/${location}`;

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      type: 'website',
      url: canonical,
    },
  };
}

export default async function StateSalaryPage({ params }: PageProps) {
  const { location } = await params;
  const parsed = parseLocation(location);

  if (!parsed) notFound();

  const { salary, state: stateParam } = parsed;
  const content = generateStatePageContent(salary, stateParam);

  if (!content) notFound();

  const { state, hourly, monthly, takeHome, takeHomeMonthly, nationalAvgSalary } = content;

  // Calculate equivalent salaries in other states
  const comparisonStates = ['california', 'texas', 'new-york', 'florida']
    .filter(s => s !== stateParam)
    .slice(0, 3)
    .map(s => ({
      slug: s,
      state: US_STATES[s],
      equivalentSalary: calculateAdjustedSalary(salary, stateParam, s),
    }));

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://paycheckmath.com' },
      { '@type': 'ListItem', position: 2, name: state.name, item: `https://paycheckmath.com/salary-in/${location}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-4">
              A ${salary.toLocaleString()} annual salary in {state.name} equals <strong>${hourly.toFixed(2)} per hour</strong>.
              {state.stateTaxRate > 0
                ? ` After ${state.stateTaxRate}% state income tax and federal taxes, your take-home pay is approximately $${takeHomeMonthly.toLocaleString()}/month.`
                : ` ${state.name} has no state income tax, so your take-home pay is approximately $${takeHomeMonthly.toLocaleString()}/month after federal taxes.`
              }
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Cost of Living Context</h3>
                  <p className="text-gray-700">
                    {state.name}'s cost of living is {state.costOfLivingIndex > 100 ? `${Math.round(state.costOfLivingIndex - 100)}% higher` : `${Math.round(100 - state.costOfLivingIndex)}% lower`} than the national average.
                    A ${salary.toLocaleString()} salary here is equivalent to approximately ${nationalAvgSalary.toLocaleString()} in an average-cost state.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <ErrorBoundary>
              <Calculator initialSalary={salary} />
            </ErrorBoundary>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Take-Home Pay Breakdown for {state.name}
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Salary</span>
                      <span className="font-semibold text-gray-900">${salary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Federal Tax (~{content.federalTaxRate}%)</span>
                      <span className="font-semibold text-red-600">-${Math.round(salary * (content.federalTaxRate / 100)).toLocaleString()}</span>
                    </div>
                    {state.stateTaxRate > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">{state.name} State Tax ({state.stateTaxRate}%)</span>
                        <span className="font-semibold text-red-600">-${Math.round(salary * (state.stateTaxRate / 100)).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">FICA (7.65%)</span>
                      <span className="font-semibold text-red-600">-${Math.round(Math.min(salary, 168600) * 0.0765).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t-2 border-gray-200">
                      <span className="font-bold text-gray-900">Take-Home Pay</span>
                      <span className="font-bold text-green-600">${takeHome.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Take-Home</h3>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-2">Estimated Monthly Net Pay</div>
                    <div className="text-4xl font-bold text-gray-900">${takeHomeMonthly.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 mt-2">After all taxes and deductions</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cost of Living in {state.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-sm font-semibold text-gray-600 mb-2">Cost of Living Index</div>
                <div className="text-3xl font-bold text-gray-900">{state.costOfLivingIndex}</div>
                <div className="text-sm text-gray-600 mt-1">National average = 100</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-sm font-semibold text-gray-600 mb-2">State Median Income</div>
                <div className="text-3xl font-bold text-gray-900">${(state.medianIncome / 1000).toFixed(0)}k</div>
                <div className="text-sm text-gray-600 mt-1">Per household</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-sm font-semibold text-gray-600 mb-2">State Income Tax</div>
                <div className="text-3xl font-bold text-gray-900">{state.stateTaxRate}%</div>
                <div className="text-sm text-gray-600 mt-1">{state.stateTaxRate === 0 ? 'No state tax!' : 'Average rate'}</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Major Cities in {state.name}</h3>
              <div className="flex flex-wrap gap-2">
                {state.majorCities.map(city => (
                  <span key={city} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {comparisonStates.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Salary Comparison: {state.name} vs Other States
              </h2>
              <p className="text-gray-600 mb-6">
                To maintain the same standard of living, here's what you'd need to earn in other states:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comparisonStates.map(({ slug, state: compareState, equivalentSalary }) => (
                  <Link
                    key={slug}
                    href={`/salary-in/${equivalentSalary}-${slug}`}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className="text-sm font-semibold text-gray-600 mb-2">{compareState.name}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">${equivalentSalary.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">
                      {equivalentSalary > salary ? 'Higher' : 'Lower'} cost of living
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <RelatedCalculators currentPage={`/salary-in/${location}/`} />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
