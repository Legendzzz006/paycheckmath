import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdUnit from '@/components/AdUnit';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata: Metadata = {
    title: 'Blog - Salary Tips, Career Guides & Financial Insights',
    description: 'Expert articles on salary negotiation, tax planning, career growth, and financial literacy. Learn how to maximize your income and build wealth.',
    alternates: { canonical: 'https://paycheckmath.com/blog/' },
    openGraph: { title: 'PaycheckMath Blog', description: 'Salary tips, career guides, and financial insights.', url: 'https://paycheckmath.com/blog/', images: ['/logo-1200x627.png'] },
};

const articles = [
    { slug: 'how-to-negotiate-salary', title: 'How to Negotiate Your Salary: A Complete Guide', excerpt: 'Master the art of salary negotiation with proven strategies, scripts, and timing tips that can increase your earnings by 10-20%.', date: 'February 10, 2026', readTime: '8 min read', category: 'Career', icon: '💼' },
    { slug: 'understanding-tax-brackets', title: 'Understanding US Tax Brackets in 2026', excerpt: 'Learn how marginal tax rates work, calculate your effective tax rate, and discover strategies to optimize your tax situation.', date: 'February 8, 2026', readTime: '7 min read', category: 'Finance', icon: '📊' },
    { slug: 'salary-vs-hourly', title: 'Salary vs Hourly: Which Is Better for You?', excerpt: 'Compare the pros and cons of salary vs. hourly compensation, including benefits, overtime, flexibility, and long-term career impacts.', date: 'February 5, 2026', readTime: '6 min read', category: 'Career', icon: '⚖️' },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
                <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Salary & Career Blog</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Expert insights on salary negotiation, tax planning, and career growth to help you maximize your earnings.</p>
                </div>
                <div className="space-y-6">
                    {articles.map((article) => (
                        <Link key={article.slug} href={`/blog/${article.slug}/`} className="block bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-blue-300 hover:shadow-lg transition-all group">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl flex-shrink-0" aria-hidden="true">{article.icon}</span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{article.category}</span>
                                        <span className="text-xs text-gray-500">{article.date}</span>
                                        <span className="text-xs text-gray-500">· {article.readTime}</span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{article.title}</h2>
                                    <p className="text-gray-600">{article.excerpt}</p>
                                    <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm mt-3 group-hover:gap-2 transition-all">
                                        Read article
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <AdUnit format="horizontal" />
                <div className="mt-12"><NewsletterSignup /></div>
            </main>
            <Footer />
        </div>
    );
}
