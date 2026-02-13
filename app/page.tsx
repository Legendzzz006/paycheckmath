import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Calculator from '@/components/Calculator';
import InternalLinks from '@/components/InternalLinks';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdUnit from '@/components/AdUnit';
import RecentCalculations from '@/components/RecentCalculations';
import NewsletterSignup from '@/components/NewsletterSignup';
import Link from 'next/link';

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I convert my annual salary to an hourly rate?', acceptedAnswer: { '@type': 'Answer', text: 'Divide your annual salary by the number of working hours in a year. For a standard 40-hour week with 52 weeks, divide by 2,080. For example, $75,000 ÷ 2,080 = $36.06/hour.' } },
      { '@type': 'Question', name: 'What is the average salary in the US?', acceptedAnswer: { '@type': 'Answer', text: 'As of 2024, the median household income in the US is approximately $74,580. The average (mean) individual salary is around $65,470, though this varies significantly by occupation, location, and experience.' } },
      { '@type': 'Question', name: 'How many work hours are in a year?', acceptedAnswer: { '@type': 'Answer', text: 'A standard work year has 2,080 hours (40 hours/week × 52 weeks). With 2 weeks of paid time off, the actual working hours are approximately 2,000 hours.' } },
    ],
  };

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PaycheckMath Salary Calculator',
    url: 'https://paycheckmath.com',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Free salary and pay calculators for the US. Convert annual salary to hourly, calculate overtime, take-home pay, and more.',
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Salary & Pay Calculators for the US
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Instantly convert your annual salary to hourly, daily, weekly, and monthly pay. Free, accurate, and private — all calculations happen in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <div>
            <Calculator />
          </div>
          <aside className="space-y-6 lg:mt-0">
            <RecentCalculations />
          </aside>
        </div>

        <AdUnit format="horizontal" />

        <section className="mt-12 sm:mt-16" id="calculators">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">All Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { href: '/salary-to-hourly/', icon: '⏱️', title: 'Salary to Hourly', desc: 'Convert annual salary to hourly rate with custom work schedules', color: 'from-blue-50 to-indigo-50', border: 'border-blue-200', hColor: 'group-hover:text-blue-600', hBorder: 'hover:border-blue-500' },
              { href: '/hourly-to-salary/', icon: '🔄', title: 'Hourly to Salary', desc: 'Convert hourly rate to annual, monthly, and weekly salary', color: 'from-blue-50 to-indigo-50', border: 'border-blue-200', hColor: 'group-hover:text-blue-600', hBorder: 'hover:border-blue-500' },
              { href: '/take-home-pay-calculator/', icon: '💰', title: 'Take-Home Pay', desc: 'Calculate your net pay after taxes and deductions', color: 'from-blue-50 to-indigo-50', border: 'border-blue-200', hColor: 'group-hover:text-blue-600', hBorder: 'hover:border-blue-500' },
              { href: '/overtime-calculator/', icon: '⏰', title: 'Overtime Calculator', desc: 'Calculate overtime pay with time-and-a-half rates', color: 'from-purple-50 to-pink-50', border: 'border-purple-200', hColor: 'group-hover:text-purple-600', hBorder: 'hover:border-purple-500' },
              { href: '/biweekly-paycheck-calculator/', icon: '📅', title: 'Bi-Weekly Paycheck', desc: 'See your salary as a bi-weekly paycheck amount', color: 'from-purple-50 to-pink-50', border: 'border-purple-200', hColor: 'group-hover:text-purple-600', hBorder: 'hover:border-purple-500' },
              { href: '/monthly-income-calculator/', icon: '📊', title: 'Monthly Income', desc: 'Calculate your gross and net monthly income', color: 'from-purple-50 to-pink-50', border: 'border-purple-200', hColor: 'group-hover:text-purple-600', hBorder: 'hover:border-purple-500' },
              { href: '/compare/', icon: '⚖️', title: 'Compare Job Offers', desc: 'Compare two job offers side by side with total compensation', color: 'from-blue-50 to-indigo-50', border: 'border-blue-200', hColor: 'group-hover:text-blue-600', hBorder: 'hover:border-blue-500' },
              { href: '/negotiation-calculator/', icon: '💼', title: 'Salary Negotiation', desc: 'Calculate your ideal negotiation range and counter-offers', color: 'from-blue-50 to-indigo-50', border: 'border-blue-200', hColor: 'group-hover:text-blue-600', hBorder: 'hover:border-blue-500' },
              { href: '/raise-calculator/', icon: '📈', title: 'Raise Calculator', desc: 'See how a raise affects your hourly, monthly, and annual pay', color: 'from-blue-50 to-indigo-50', border: 'border-blue-200', hColor: 'group-hover:text-blue-600', hBorder: 'hover:border-blue-500' },
              { href: '/cost-of-living-calculator/', icon: '🏙️', title: 'Cost of Living', desc: 'Compare salary equivalents across different US cities', color: 'from-purple-50 to-pink-50', border: 'border-purple-200', hColor: 'group-hover:text-purple-600', hBorder: 'hover:border-purple-500' },
              { href: '/freelance-rate-calculator/', icon: '💼', title: 'Freelance Rate', desc: 'Calculate your ideal freelance/consulting rate', color: 'from-purple-50 to-pink-50', border: 'border-purple-200', hColor: 'group-hover:text-purple-600', hBorder: 'hover:border-purple-500' },
              { href: '/inflation-calculator/', icon: '📉', title: 'Inflation Calculator', desc: 'See how inflation affects your salary purchasing power', color: 'from-purple-50 to-pink-50', border: 'border-purple-200', hColor: 'group-hover:text-purple-600', hBorder: 'hover:border-purple-500' },
            ].map((calc) => (
              <Link key={calc.href} href={calc.href} className={`bg-gradient-to-br ${calc.color} border-2 ${calc.border} rounded-xl p-5 sm:p-6 ${calc.hBorder} hover:shadow-lg transition-all group text-left`}>
                <span className="text-3xl block mb-3" aria-hidden="true">{calc.icon}</span>
                <h3 className={`font-bold text-gray-900 ${calc.hColor} transition-colors`}>{calc.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <AdUnit format="horizontal" />

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Popular Salary Conversions</h2>
          <InternalLinks limit={16} />
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">How to Use This Calculator</h2>
          <div className="text-gray-700 space-y-4">
            <p>Our salary calculator makes it easy to convert your annual pay into different time periods:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Enter your annual salary</strong> — type in your gross (before-tax) yearly income.</li>
              <li><strong>Adjust your schedule</strong> — modify hours per week and weeks per year if different from the standard 40 hours / 52 weeks.</li>
              <li><strong>Account for PTO</strong> — enter your paid time off weeks for a more accurate hourly rate calculation.</li>
              <li><strong>See instant results</strong> — your hourly, daily, weekly, and monthly pay updates in real-time.</li>
              <li><strong>Share or save</strong> — copy your results to clipboard or print/save as PDF.</li>
            </ol>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Understanding Your Salary</h2>
          <div className="text-gray-700 space-y-4">
            <p>When evaluating job offers or planning your finances, understanding the various breakdowns of your salary is crucial. Here&apos;s what each figure represents:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Annual salary</strong> — your total yearly gross pay before taxes and deductions.</li>
              <li><strong>Hourly rate</strong> — what you earn per hour, calculated based on your work schedule and PTO.</li>
              <li><strong>Daily rate</strong> — your earnings per workday, based on a 5-day work week.</li>
              <li><strong>Weekly pay</strong> — your gross pay for each week of the year.</li>
              <li><strong>Monthly pay</strong> — your annual salary divided by 12 months.</li>
            </ul>
            <p>Keep in mind that these figures represent <strong>gross pay</strong> (before taxes). For your actual take-home pay after federal and state taxes, use our <Link href="/take-home-pay-calculator/" className="text-blue-600 hover:underline">Take-Home Pay Calculator</Link>.</p>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">How do I convert my annual salary to an hourly rate?</h3>
              <p className="text-gray-700 text-sm">Divide your annual salary by the total working hours in a year. For a standard 40-hour week: $75,000 ÷ 2,080 = $36.06/hour.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">What is the average salary in the US?</h3>
              <p className="text-gray-700 text-sm">The median household income is approximately $74,580. Average individual salary is around $65,470, varying by occupation and location.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">How many work hours are in a year?</h3>
              <p className="text-gray-700 text-sm">A standard work year has 2,080 hours (40 hours/week × 52 weeks). With 2 weeks PTO, actual working hours are about 2,000.</p>
            </div>
          </div>
        </section>

        <div className="mt-12 sm:mt-16 bg-amber-50 border-2 border-amber-400 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span aria-hidden="true">⚠️</span> Important Disclaimer
          </h2>
          <p className="text-sm text-gray-700">All calculations are estimates based on gross pay before taxes. Actual take-home pay will vary based on federal, state, and local taxes, as well as deductions. This tool is for informational purposes only and does not constitute financial advice. Read our <Link href="/disclaimer/" className="text-blue-600 underline hover:text-blue-800">full disclaimer</Link>.</p>
        </div>

        <div className="mt-12"><NewsletterSignup /></div>
      </main>
      <Footer />
    </div>
  );
}
