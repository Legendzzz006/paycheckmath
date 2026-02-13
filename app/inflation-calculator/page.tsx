import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InflationCalculator from '@/components/InflationCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdUnit from '@/components/AdUnit';
import NewsletterSignup from '@/components/NewsletterSignup';
import RelatedCalculators from '@/components/RelatedCalculators';

export const metadata: Metadata = {
    title: 'Inflation-Adjusted Salary Calculator - Real Purchasing Power',
    description: 'Calculate how inflation affects your salary over time. See your real purchasing power, compare nominal vs. adjusted salary, and plan raises to keep up with inflation.',
    keywords: 'inflation calculator, salary inflation, purchasing power, inflation adjusted salary, real wage calculator, salary erosion',
    alternates: { canonical: 'https://paycheckmath.com/inflation-calculator/' },
    openGraph: {
        title: 'Inflation-Adjusted Salary Calculator',
        description: 'See how inflation impacts your salary purchasing power over time.',
        url: 'https://paycheckmath.com/inflation-calculator/',
        images: ['/logo-1200x627.png'],
    },
};

export default function InflationCalculatorPage() {
    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How does inflation affect my salary?', acceptedAnswer: { '@type': 'Answer', text: 'Inflation reduces the purchasing power of your money over time. If your salary stays the same but prices rise by 3% per year, you can effectively buy 3% less with each passing year. This means you need regular raises just to maintain your current standard of living.' } },
            { '@type': 'Question', name: 'What is a good raise to keep up with inflation?', acceptedAnswer: { '@type': 'Answer', text: 'To maintain your purchasing power, your annual raise should at least match the inflation rate. The historical average US inflation rate is around 3%, so a 3% annual raise would keep you even. Anything above inflation represents a real increase in your purchasing power.' } },
            { '@type': 'Question', name: 'How much has inflation reduced my salary worth?', acceptedAnswer: { '@type': 'Answer', text: 'Use our inflation calculator to find out. Enter your salary, the number of years, and the inflation rate. The calculator will show you exactly how much purchasing power you\'ve lost and what your salary is really worth in today\'s dollars.' } },
        ],
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
                <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Inflation Calculator' }]} />
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Inflation-Adjusted Salary Calculator</h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">See how inflation erodes your salary&#39;s purchasing power over time and whether your raises are actually keeping up.</p>
                </div>
                <InflationCalculator />
                <AdUnit format="horizontal" />

                <section className="mt-12 sm:mt-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Understanding Salary Inflation</h2>
                    <div className="prose max-w-none text-gray-700 space-y-4">
                        <p>Inflation is the gradual increase in prices over time, which means each dollar you earn buys a little less each year. Even with regular raises, your <strong>real purchasing power</strong> may be declining if those raises don&apos;t keep pace with inflation.</p>
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 my-6">
                            <h3 className="font-bold text-orange-900 mb-2">💡 Key Insight</h3>
                            <p className="text-orange-800">A salary of $75,000 today with 3% annual inflation would need to be $100,794 in 10 years just to maintain the same purchasing power. Without adequate raises, you&apos;re effectively taking a pay cut every year.</p>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mt-8">How Inflation Affects Your Salary</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Grocery costs:</strong> A grocery bill of $200/week at 3% inflation becomes $269/week in 10 years.</li>
                            <li><strong>Housing:</strong> Rent and mortgage payments tend to increase with inflation, consuming more of a stagnant salary.</li>
                            <li><strong>Healthcare:</strong> Medical costs often rise faster than general inflation, further eroding purchasing power.</li>
                            <li><strong>Education:</strong> Tuition costs typically increase at 4-6% annually, outpacing general inflation.</li>
                        </ul>
                        <h3 className="text-xl font-bold text-gray-900 mt-8">Strategies to Beat Inflation</h3>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li><strong>Negotiate annual raises above inflation:</strong> Aim for raises of at least inflation + 1-2% to grow your real income.</li>
                            <li><strong>Invest in skills:</strong> Higher-demand skills command higher salaries that can outpace inflation.</li>
                            <li><strong>Consider job changes:</strong> Switching jobs often provides larger salary jumps than annual raises.</li>
                            <li><strong>Invest wisely:</strong> Long-term investments in stocks and real estate historically outperform inflation.</li>
                            <li><strong>Track your expenses:</strong> Understanding where your money goes helps you optimize spending.</li>
                        </ol>
                        <h3 className="text-xl font-bold text-gray-900 mt-8">Historical US Inflation Rates</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-gray-200 rounded-lg">
                                <thead><tr className="bg-gray-50"><th className="text-left py-3 px-4 font-semibold">Period</th><th className="text-right py-3 px-4 font-semibold">Avg. Annual Inflation</th></tr></thead>
                                <tbody>
                                    {[{ p: '2020-2025', r: '4.2%' }, { p: '2015-2020', r: '1.8%' }, { p: '2010-2015', r: '1.5%' }, { p: '2000-2010', r: '2.6%' }, { p: '1990-2000', r: '3.0%' }, { p: 'Historical Average (1913-2025)', r: '3.2%' }].map(row => (
                                        <tr key={row.p} className="border-t border-gray-100"><td className="py-2 px-4">{row.p}</td><td className="py-2 px-4 text-right font-medium">{row.r}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <AdUnit format="horizontal" />

                <section className="mt-12 sm:mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                            <h3 className="font-bold text-gray-900 mb-2">How does inflation affect my salary?</h3>
                            <p className="text-gray-700 text-sm">Inflation reduces the purchasing power of your money over time. If your salary stays the same but prices rise by 3% per year, you can effectively buy 3% less each year.</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                            <h3 className="font-bold text-gray-900 mb-2">What is a good raise to keep up with inflation?</h3>
                            <p className="text-gray-700 text-sm">Your annual raise should at least match the inflation rate (historically ~3% in the US). Anything above inflation represents a real increase.</p>
                        </div>
                    </div>
                </section>

                <div className="mt-12"><NewsletterSignup /></div>
                <div className="mt-12"><RelatedCalculators currentPage="/inflation-calculator/" /></div>
            </main>
            <Footer />
        </div>
    );
}
