import type { Metadata } from 'next';
import Link from 'next/link';
import FreelanceCalculator from '@/components/FreelanceCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Freelance Rate Calculator - Calculate Your Hourly Rate | PaycheckMath',
  description: 'Calculate your freelance hourly rate based on desired salary, expenses, taxes, and benefits. See what you need to charge to match a W2 salary.',
  keywords: 'freelance rate calculator, hourly rate calculator, freelance pricing, contractor rate, self-employed rate calculator',
  alternates: {
    canonical: 'https://paycheckmath.com/freelance-rate-calculator/',
  },
  openGraph: {
    title: 'Freelance Rate Calculator - Know Your Worth',
    description: 'Calculate the hourly rate you need to charge as a freelancer to match your desired salary and cover all expenses.',
    type: 'website',
    url: 'https://paycheckmath.com/freelance-rate-calculator',
  },
};

export default function FreelanceRateCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Freelance Rate Calculator',
    description: 'Calculate your freelance hourly rate accounting for taxes, benefits, expenses, and desired profit margin.',
    url: 'https://paycheckmath.com/freelance-rate-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Hourly rate calculation',
      'Tax and expense accounting',
      'W2 salary comparison',
      'Profit margin planning',
      'Billable hours analysis',
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
        name: 'Freelance Rate Calculator',
        item: 'https://paycheckmath.com/freelance-rate-calculator',
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
              Freelance Rate Calculator
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mb-6">
              Calculate the hourly rate you need to charge as a freelancer or contractor to match your desired
              salary while covering taxes, benefits, expenses, and building in a profit margin.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4 max-w-3xl">
              <p className="text-blue-900 font-semibold">
                💡 Most freelancers undercharge! To match a $75,000 W2 salary, you typically need to charge
                $60-80/hour depending on your expenses and billable hours.
              </p>
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-16">
            <ErrorBoundary>
              <FreelanceCalculator />
            </ErrorBoundary>
          </div>

          {/* Educational Content */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Freelancers Need to Charge More
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">The Hidden Costs of Freelancing</h3>
              <p>
                When you're a W2 employee, your employer pays half of your Social Security and Medicare taxes
                (7.65%), provides health insurance, contributes to retirement, and covers business expenses.
                As a freelancer, you pay all of these costs yourself.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Self-Employment Tax</h3>
              <p>
                Freelancers pay 15.3% self-employment tax (Social Security + Medicare) on top of regular income
                taxes. This alone means you need to charge significantly more than your desired take-home pay.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Billable vs Non-Billable Hours</h3>
              <p>
                Not all your working hours are billable. You'll spend time on marketing, admin, invoicing,
                client communication, and professional development. If you work 40 hours per week, you might
                only bill 25-30 hours. This dramatically affects your effective hourly rate.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Benefits You Must Self-Fund</h3>
              <p>
                Health insurance, retirement contributions, paid time off, and sick leave all come out of your
                pocket. These benefits can easily cost $15,000-20,000 per year, which must be built into your rate.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Freelance Pricing Strategies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Hourly Billing</h3>
                <p className="text-gray-700 mb-3">
                  Charge by the hour for ongoing work or projects with uncertain scope. Good for beginners
                  and maintenance work.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Pros:</strong> Simple, fair for variable work<br />
                  <strong>Cons:</strong> Income capped by hours, penalizes efficiency
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Project-Based</h3>
                <p className="text-gray-700 mb-3">
                  Fixed price for defined deliverables. Better for experienced freelancers who can estimate
                  accurately.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Pros:</strong> Higher earnings potential, rewards efficiency<br />
                  <strong>Cons:</strong> Risk of scope creep, requires good estimation
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Retainer</h3>
                <p className="text-gray-700 mb-3">
                  Monthly fee for ongoing availability and work. Provides steady income and client commitment.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Pros:</strong> Predictable income, client loyalty<br />
                  <strong>Cons:</strong> May limit other opportunities, requires clear boundaries
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Value-Based</h3>
                <p className="text-gray-700 mb-3">
                  Price based on the value delivered to the client, not time spent. Highest earning potential.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Pros:</strong> Highest rates, rewards expertise<br />
                  <strong>Cons:</strong> Requires strong positioning, harder to justify
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Common Freelance Expenses
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Essential Expenses</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Software & Tools:</strong> $100-300/month (design, project management, accounting)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Equipment:</strong> $1,000-2,000/year (computer, phone, peripherals)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Internet & Phone:</strong> $100-150/month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Accounting & Legal:</strong> $1,000-2,000/year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Insurance:</strong> $1,000-2,000/year (professional liability)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Optional Expenses</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Coworking Space:</strong> $200-500/month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Marketing:</strong> $100-500/month (ads, website, branding)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Education:</strong> $1,000-3,000/year (courses, conferences)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Travel:</strong> Variable (client meetings, conferences)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Subcontractors:</strong> Variable (when you need help)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Typical Total:</strong> $10,000-15,000/year for essential expenses, $15,000-25,000/year
                  with optional expenses. These costs must be built into your hourly rate.
                </p>
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
                  How much should I charge as a beginner freelancer?
                </h3>
                <p className="text-gray-700">
                  Start with your minimum rate (break-even) and gradually increase as you gain experience and
                  testimonials. Even beginners should charge enough to cover all costs. Don't undervalue yourself
                  - clients often associate low rates with low quality.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Should I charge different rates for different clients?
                </h3>
                <p className="text-gray-700">
                  Yes, it's common to have different rates based on project complexity, client budget, urgency,
                  and your relationship with the client. Premium clients who value your expertise should pay
                  premium rates. Long-term retainer clients might get a small discount for commitment.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  How often should I raise my rates?
                </h3>
                <p className="text-gray-700">
                  Review your rates every 6-12 months. Raise rates for new clients immediately, and give existing
                  clients 30-60 days notice. A 10-15% annual increase is reasonable as you gain experience. Your
                  rates should grow with your skills and market demand.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What if clients say I'm too expensive?
                </h3>
                <p className="text-gray-700">
                  Not every client is your ideal client. If they can't afford your rates, they're not a good fit.
                  Focus on finding clients who value quality and can pay professional rates. Competing on price
                  is a race to the bottom. Compete on value instead.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <RelatedCalculators currentPage="/freelance-rate-calculator/" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
