import type { Metadata } from 'next';
import Link from 'next/link';
import NegotiationCalculator from '@/components/NegotiationCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Salary Negotiation Calculator - Counter Offer & Scripts | PaycheckMath',
  description: 'Calculate your ideal counter offer with our salary negotiation calculator. Get personalized negotiation scripts, lifetime value analysis, and expert tips to maximize your salary.',
  keywords: 'salary negotiation calculator, counter offer calculator, salary negotiation tips, negotiation scripts, job offer negotiation',
  alternates: {
    canonical: '/negotiation-calculator',
  },
  openGraph: {
    title: 'Salary Negotiation Calculator - Maximize Your Offer',
    description: 'Calculate counter offers, get negotiation scripts, and see the lifetime value of negotiating your salary.',
    type: 'website',
    url: 'https://paycheckmath.com/negotiation-calculator',
  },
};

export default function NegotiationCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Salary Negotiation Calculator',
    description: 'Calculate counter offers and get personalized negotiation scripts to maximize your salary.',
    url: 'https://paycheckmath.com/negotiation-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Counter offer calculations',
      'Personalized negotiation scripts',
      'Lifetime value analysis',
      'Market rate comparison',
      'Competing offer leverage',
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
        name: 'Negotiation Calculator',
        item: 'https://paycheckmath.com/negotiation-calculator',
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
              Salary Negotiation Calculator
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mb-6">
              Calculate your ideal counter offer, see the lifetime value of negotiating, and get personalized scripts
              to confidently negotiate your salary. Don't leave money on the table.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4 max-w-3xl">
              <p className="text-blue-900 font-semibold">
                💡 Did you know? 70% of employers expect candidates to negotiate, but only 37% actually do.
                Those who negotiate earn an average of $5,000 more per year.
              </p>
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-16">
            <ErrorBoundary>
              <NegotiationCalculator />
            </ErrorBoundary>
          </div>

          {/* Educational Content */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Salary Negotiation Matters
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">The Compound Effect</h3>
              <p>
                Your starting salary isn't just about year one - it's the foundation for your entire career. Raises,
                bonuses, and future job offers are typically based on your current salary. A $5,000 increase today
                could mean $50,000+ more over a decade when you factor in raises and compounding.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Employers Expect It</h3>
              <p>
                Most employers build negotiation room into their initial offers. They expect candidates to counter
                and have already budgeted for it. By not negotiating, you're actually leaving money that was already
                allocated for you on the table.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">It Shows Confidence</h3>
              <p>
                Negotiating professionally demonstrates that you know your worth and can advocate for yourself.
                These are valuable traits that employers respect. A well-handled negotiation can actually strengthen
                your relationship with your future employer.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">When to Negotiate</h3>
              <p>
                The best time to negotiate is after you receive a written offer but before you accept. This is when
                you have maximum leverage - they've decided they want you, but you haven't committed yet. Never
                negotiate before receiving an official offer.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Use This Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Enter Your Offer</h3>
                <p className="text-gray-700">
                  Input the salary amount from your job offer. Make sure you have a written offer before negotiating.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Add Your Experience</h3>
                <p className="text-gray-700">
                  Enter your years of relevant experience. More experience typically justifies higher counter offers.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Research Market Rate</h3>
                <p className="text-gray-700">
                  Use Glassdoor, Levels.fyi, or Payscale to find the market rate for your role. This is your strongest
                  negotiation leverage.
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">4. Get Your Counter Offer</h3>
                <p className="text-gray-700">
                  Review the recommended counter offer and choose your approach. Use the provided scripts to
                  communicate professionally.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Negotiation Best Practices
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Do's ✅</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Research market rates thoroughly before negotiating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Wait for a written offer before discussing salary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Express enthusiasm about the role and company</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Focus on your value and market data, not personal needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Be prepared to discuss the entire compensation package</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Practice your pitch with a friend or mentor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Get everything in writing before accepting</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Don'ts ❌</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Don't negotiate before receiving an official offer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Don't make it personal or emotional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Don't lie about competing offers or market rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Don't give ultimatums unless you're prepared to walk away</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Don't accept immediately - take time to review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Don't negotiate multiple times on the same offer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Don't forget to consider the total package, not just salary</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Beyond Base Salary
            </h2>

            <p className="text-gray-700 mb-6">
              If the employer can't meet your salary request, consider negotiating these other components:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">💰 Signing Bonus</h4>
                <p className="text-sm text-gray-600">One-time payment to bridge the gap</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">📈 Performance Bonus</h4>
                <p className="text-sm text-gray-600">Higher bonus percentage or targets</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">🎯 Equity/Stock Options</h4>
                <p className="text-sm text-gray-600">More shares or better vesting schedule</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">🏖️ Additional PTO</h4>
                <p className="text-sm text-gray-600">Extra vacation days or flexible time off</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">🏠 Remote Work</h4>
                <p className="text-sm text-gray-600">Work from home flexibility</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">📚 Professional Development</h4>
                <p className="text-sm text-gray-600">Training budget or conference attendance</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">⏰ Flexible Schedule</h4>
                <p className="text-sm text-gray-600">Flexible hours or compressed work week</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">📊 Early Review</h4>
                <p className="text-sm text-gray-600">Performance review at 6 months vs 12</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">🚗 Relocation Package</h4>
                <p className="text-sm text-gray-600">Moving expenses or temporary housing</p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <RelatedCalculators currentPage="/negotiation-calculator/" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
