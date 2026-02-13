import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HourlyToSalaryCalculator from '@/components/HourlyToSalaryCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdUnit from '@/components/AdUnit';
import NewsletterSignup from '@/components/NewsletterSignup';
import RelatedCalculators from '@/components/RelatedCalculators';

export const metadata: Metadata = {
    title: 'Hourly to Salary Calculator - Convert Hourly Rate to Annual Salary',
    description: 'Instantly convert your hourly rate to annual salary, monthly, bi-weekly, weekly, and daily pay. Free hourly-to-salary calculator with accurate US wage conversions.',
    keywords: 'hourly to salary, convert hourly to annual, hourly rate to salary calculator, hourly wage to yearly salary',
    alternates: { canonical: 'https://paycheckmath.com/hourly-to-salary/' },
    openGraph: {
        title: 'Hourly to Salary Calculator',
        description: 'Convert your hourly rate to annual salary instantly.',
        url: 'https://paycheckmath.com/hourly-to-salary/',
        images: ['/logo-1200x627.png'],
    },
};

export default function HourlyToSalaryPage() {
    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do I convert my hourly rate to annual salary?', acceptedAnswer: { '@type': 'Answer', text: 'Multiply your hourly rate by the number of hours you work per week, then multiply by 52 (weeks per year). For example, $25/hour × 40 hours × 52 weeks = $52,000/year.' } },
            { '@type': 'Question', name: 'Is a $30/hour rate good?', acceptedAnswer: { '@type': 'Answer', text: '$30/hour equals approximately $62,400/year, which is above the US median household income. Whether it\'s "good" depends on your location, cost of living, and personal circumstances.' } },
            { '@type': 'Question', name: 'How much is $20 an hour annually?', acceptedAnswer: { '@type': 'Answer', text: 'At 40 hours per week and 52 weeks per year, $20/hour equals $41,600 per year before taxes.' } },
        ],
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
                <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Hourly to Salary Calculator' }]} />
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Hourly to Salary Calculator</h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Enter your hourly rate to instantly calculate your equivalent annual salary, monthly income, bi-weekly paycheck, and more.</p>
                </div>
                <HourlyToSalaryCalculator />
                <AdUnit format="horizontal" />

                <section className="mt-12 sm:mt-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">How to Convert Hourly Rate to Salary</h2>
                    <div className="prose max-w-none text-gray-700 space-y-4">
                        <p>Converting an hourly rate to an annual salary is straightforward. The basic formula is:</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
                            <p className="text-center font-bold text-lg text-blue-900">Annual Salary = Hourly Rate × Hours per Week × Weeks per Year</p>
                        </div>
                        <p>For a standard full-time position working 40 hours per week for 52 weeks, simply multiply your hourly rate by 2,080 (40 × 52) to get your annual salary. For example, if you earn $25 per hour, your annual salary would be $25 × 2,080 = $52,000.</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-8">Common Hourly to Salary Conversions</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-gray-200 rounded-lg">
                                <thead><tr className="bg-gray-50"><th className="text-left py-3 px-4 font-semibold">Hourly Rate</th><th className="text-right py-3 px-4 font-semibold">Annual Salary</th><th className="text-right py-3 px-4 font-semibold">Monthly</th></tr></thead>
                                <tbody>
                                    {[{ r: 15, a: '$31,200', m: '$2,600' }, { r: 20, a: '$41,600', m: '$3,467' }, { r: 25, a: '$52,000', m: '$4,333' }, { r: 30, a: '$62,400', m: '$5,200' }, { r: 35, a: '$72,800', m: '$6,067' }, { r: 40, a: '$83,200', m: '$6,933' }, { r: 50, a: '$104,000', m: '$8,667' }, { r: 75, a: '$156,000', m: '$13,000' }].map(row => (
                                        <tr key={row.r} className="border-t border-gray-100 hover:bg-gray-50"><td className="py-2 px-4 font-medium">${row.r}/hr</td><td className="py-2 px-4 text-right">{row.a}</td><td className="py-2 px-4 text-right">{row.m}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mt-8">Why Convert Hourly Rate to Salary?</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Comparing job offers:</strong> When one offer is salary-based and another is hourly, converting makes comparison easy.</li>
                            <li><strong>Financial planning:</strong> Knowing your annual income helps with budgeting, loan applications, and investment planning.</li>
                            <li><strong>Negotiating benefits:</strong> Understanding your total annual compensation helps evaluate the full package including benefits, PTO, and bonuses.</li>
                            <li><strong>Tax planning:</strong> Annual salary figures are used for tax bracket calculations and withholding estimates.</li>
                        </ul>
                        <h3 className="text-xl font-bold text-gray-900 mt-8">Factors That Affect Your Actual Earnings</h3>
                        <p>Keep in mind that your actual annual earnings may differ from the simple calculation due to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Overtime:</strong> Hours beyond 40/week are typically paid at 1.5× your regular rate under the FLSA.</li>
                            <li><strong>Unpaid time off:</strong> If you take unpaid leave, your actual annual earnings will be lower.</li>
                            <li><strong>Variable hours:</strong> If your hours fluctuate week to week, your annual total will vary.</li>
                            <li><strong>Benefits value:</strong> Salaried positions often include health insurance, 401(k) matching, and paid time off which add significant value.</li>
                        </ul>
                    </div>
                </section>
                <AdUnit format="horizontal" />

                <section className="mt-12 sm:mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                            <h3 className="font-bold text-gray-900 mb-2">How do I convert my hourly rate to annual salary?</h3>
                            <p className="text-gray-700 text-sm">Multiply your hourly rate by the number of hours you work per week, then multiply by 52 (weeks per year). For example, $25/hour × 40 hours × 52 weeks = $52,000/year.</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                            <h3 className="font-bold text-gray-900 mb-2">Is a $30/hour rate good?</h3>
                            <p className="text-gray-700 text-sm">$30/hour equals approximately $62,400/year, which is above the US median household income. Whether it&apos;s &quot;good&quot; depends on your location, cost of living, and personal circumstances.</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                            <h3 className="font-bold text-gray-900 mb-2">How much is $20 an hour annually?</h3>
                            <p className="text-gray-700 text-sm">At 40 hours per week and 52 weeks per year, $20/hour equals $41,600 per year before taxes.</p>
                        </div>
                    </div>
                </section>

                <div className="mt-12"><NewsletterSignup /></div>
                <div className="mt-12"><RelatedCalculators currentPage="/hourly-to-salary/" /></div>
            </main>
            <Footer />
        </div>
    );
}
