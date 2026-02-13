import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Calculator from '@/components/Calculator';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdUnit from '@/components/AdUnit';
import NewsletterSignup from '@/components/NewsletterSignup';
import RelatedCalculators from '@/components/RelatedCalculators';

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator - Convert Annual Salary to Hourly Rate',
  description: 'Instantly convert your annual salary to hourly rate. See your daily, weekly, and monthly pay breakdown with this free salary to hourly calculator.',
  keywords: 'salary to hourly, annual salary to hourly rate, salary converter, salary to hourly calculator, convert salary to hourly',
  alternates: { canonical: 'https://paycheckmath.com/salary-to-hourly/' },
  openGraph: { title: 'Salary to Hourly Calculator', description: 'Convert your annual salary to hourly rate instantly.', url: 'https://paycheckmath.com/salary-to-hourly/', images: ['/logo-1200x627.png'] },
};

export default function SalaryToHourlyPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I convert salary to hourly?', acceptedAnswer: { '@type': 'Answer', text: 'Divide your annual salary by the total hours worked in a year. For a standard schedule: salary ÷ 2,080 = hourly rate. Example: $60,000 ÷ 2,080 = $28.85/hour.' } },
      { '@type': 'Question', name: 'What is $50,000 a year hourly?', acceptedAnswer: { '@type': 'Answer', text: 'At 40 hours/week for 52 weeks, $50,000/year equals approximately $24.04/hour.' } },
      { '@type': 'Question', name: 'Why should I know my hourly rate?', acceptedAnswer: { '@type': 'Answer', text: 'Knowing your hourly rate helps you compare job offers, evaluate overtime value, assess freelance opportunities, and understand the true cost of unpaid time off.' } },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Salary to Hourly Calculator' }]} />
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Salary to Hourly Calculator</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Enter your annual salary below to instantly calculate your equivalent hourly rate, daily pay, weekly pay, and monthly income.</p>
        </div>

        <Calculator />
        <AdUnit format="horizontal" />

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">How to Convert Salary to Hourly Rate</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>The salary-to-hourly conversion is simple but powerful. Understanding your hourly rate gives you a clearer picture of what your time is truly worth.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
              <p className="text-center font-bold text-lg text-blue-900">Hourly Rate = Annual Salary ÷ (Hours per Week × Weeks per Year)</p>
            </div>
            <p>For a standard 40-hour work week with 52 weeks per year (2,080 hours total):</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>$40,000/year = <strong>$19.23/hour</strong></li>
              <li>$50,000/year = <strong>$24.04/hour</strong></li>
              <li>$60,000/year = <strong>$28.85/hour</strong></li>
              <li>$75,000/year = <strong>$36.06/hour</strong></li>
              <li>$100,000/year = <strong>$48.08/hour</strong></li>
            </ul>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Convert Salary to Hourly?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Compare jobs accurately:</strong> Different pay structures (salary vs. hourly) make direct comparison difficult. Convert to hourly for an apples-to-apples comparison.</li>
              <li><strong>Evaluate overtime compensation:</strong> Know what your per-hour cost for working extra hours is. Use our <Link href="/overtime-calculator/" className="text-blue-600 hover:underline">Overtime Calculator</Link> for detailed time-and-a-half calculations.</li>
              <li><strong>Assess freelance opportunities:</strong> Compare potential freelance rates against your current hourly earnings to determine if going independent makes financial sense. Try our <Link href="/freelance-rate-calculator/" className="text-blue-600 hover:underline">Freelance Rate Calculator</Link>.</li>
              <li><strong>Budget your time:</strong> Understanding your hourly rate helps prioritize tasks and evaluate whether outsourcing certain work is cost-effective.</li>
              <li><strong>Negotiate raises:</strong> Showing your hourly contribution rate can be a powerful tool in raise negotiations. See our <Link href="/blog/how-to-negotiate-salary/" className="text-blue-600 hover:underline">Salary Negotiation Guide</Link> for tips.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Factors That Affect Your Hourly Rate</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>Your effective hourly rate can vary significantly based on several factors:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hours actually worked:</strong> If you regularly work 50 hours but are paid for 40, your effective rate drops by 20%.</li>
              <li><strong>Paid time off:</strong> More PTO means fewer working hours, which actually increases your effective hourly rate.</li>
              <li><strong>Benefits value:</strong> Health insurance, 401(k) matching, and other benefits add 20-40% to your total compensation value.</li>
              <li><strong>Commute costs:</strong> Time and money spent commuting effectively lower your net hourly earnings.</li>
              <li><strong>Tax implications:</strong> Different pay structures may have different tax treatments. Use our <Link href="/take-home-pay-calculator/" className="text-blue-600 hover:underline">Take-Home Pay Calculator</Link> for net pay estimates.</li>
            </ul>
          </div>
        </section>
        <AdUnit format="horizontal" />

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Salary to Hourly Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead><tr className="bg-gray-50"><th className="text-left py-3 px-4 font-semibold">Annual Salary</th><th className="text-right py-3 px-4 font-semibold">Hourly Rate</th><th className="text-right py-3 px-4 font-semibold">Monthly</th><th className="text-right py-3 px-4 font-semibold">Weekly</th></tr></thead>
              <tbody>
                {[{ s: '$30,000', h: '$14.42', m: '$2,500', w: '$577' }, { s: '$40,000', h: '$19.23', m: '$3,333', w: '$769' }, { s: '$50,000', h: '$24.04', m: '$4,167', w: '$962' }, { s: '$60,000', h: '$28.85', m: '$5,000', w: '$1,154' }, { s: '$70,000', h: '$33.65', m: '$5,833', w: '$1,346' }, { s: '$80,000', h: '$38.46', m: '$6,667', w: '$1,538' }, { s: '$90,000', h: '$43.27', m: '$7,500', w: '$1,731' }, { s: '$100,000', h: '$48.08', m: '$8,333', w: '$1,923' }, { s: '$120,000', h: '$57.69', m: '$10,000', w: '$2,308' }, { s: '$150,000', h: '$72.12', m: '$12,500', w: '$2,885' }].map(row => (
                  <tr key={row.s} className="border-t border-gray-100 hover:bg-gray-50"><td className="py-2 px-4 font-medium">{row.s}</td><td className="py-2 px-4 text-right">{row.h}</td><td className="py-2 px-4 text-right">{row.m}</td><td className="py-2 px-4 text-right">{row.w}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">How do I convert salary to hourly?</h3>
              <p className="text-gray-700 text-sm">Divide your annual salary by 2,080 (40 hrs × 52 weeks). Example: $60,000 ÷ 2,080 = $28.85/hour.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">What is $50,000 a year hourly?</h3>
              <p className="text-gray-700 text-sm">$50,000/year equals approximately $24.04/hour at 40 hours per week for 52 weeks.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">Why should I know my hourly rate?</h3>
              <p className="text-gray-700 text-sm">It helps compare jobs, evaluate freelance opportunities, assess overtime value, and understand the true cost of your time.</p>
            </div>
          </div>
        </section>

        <div className="mt-12"><NewsletterSignup /></div>
        <div className="mt-12"><RelatedCalculators currentPage="/salary-to-hourly/" /></div>
      </main>
      <Footer />
    </div>
  );
}
