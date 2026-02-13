import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdUnit from '@/components/AdUnit';

export const metadata: Metadata = {
  title: 'About PaycheckMath - Our Mission & Team',
  description: 'Learn about PaycheckMath, our mission to make salary information transparent, and the team behind the free salary calculators used by thousands.',
  alternates: { canonical: 'https://paycheckmath.com/about/' },
  openGraph: { title: 'About PaycheckMath', description: 'Our mission to make salary information transparent and accessible.', url: 'https://paycheckmath.com/about/', images: ['/logo-1200x627.png'] },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">About PaycheckMath</h1>

        <div className="prose max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p>PaycheckMath was built with a simple mission: <strong>make salary information transparent, accessible, and easy to understand</strong>. We believe everyone deserves to know exactly what their time is worth — whether you&apos;re evaluating a job offer, negotiating a raise, or planning your finances.</p>
            <p>Too many workers accept salaries without fully understanding their hourly rate, take-home pay, or how their compensation compares to market rates. Our free calculators empower you with the numbers you need to make informed career and financial decisions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Why We Built This</h2>
            <p>We noticed that most salary calculators online are either cluttered with ads, overly complicated, or require personal information to use. PaycheckMath takes a different approach:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>100% free</strong> — no premium tiers, no hidden features.</li>
              <li><strong>No data collection</strong> — all calculations happen in your browser. We never see or store your salary information.</li>
              <li><strong>Instant results</strong> — no forms to submit, no email required. Just enter a number and see the breakdown.</li>
              <li><strong>Mobile-first design</strong> — works perfectly on phones, tablets, and desktops.</li>
              <li><strong>Accurate calculations</strong> — our formulas account for work hours, PTO, overtime, and more.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">About the Team</h2>
            <p>PaycheckMath is created and maintained by a team of developers and financial enthusiasts based in the United States. Our team combines expertise in:</p>
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
                <span className="text-3xl block mb-2" aria-hidden="true">💻</span>
                <h3 className="font-bold text-gray-900">Web Development</h3>
                <p className="text-sm text-gray-600 mt-1">Modern, fast, accessible web applications</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
                <span className="text-3xl block mb-2" aria-hidden="true">📊</span>
                <h3 className="font-bold text-gray-900">Financial Literacy</h3>
                <p className="text-sm text-gray-600 mt-1">Making complex financial concepts simple</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                <span className="text-3xl block mb-2" aria-hidden="true">🎯</span>
                <h3 className="font-bold text-gray-900">User Experience</h3>
                <p className="text-sm text-gray-600 mt-1">Intuitive, beautiful, and useful tools</p>
              </div>
            </div>
            <p>We&apos;re passionate about helping people understand their compensation and make better career decisions. Every calculator on this site was built with real-world use cases in mind, informed by feedback from thousands of users.</p>
          </section>
          <AdUnit format="horizontal" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900">What Makes Us Different</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">🔒</span>
                <div>
                  <h3 className="font-bold text-gray-900">Privacy First</h3>
                  <p className="text-sm text-gray-600">Your salary data never leaves your device. We use client-side calculations — nothing is sent to any server.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">⚡</span>
                <div>
                  <h3 className="font-bold text-gray-900">Lightning Fast</h3>
                  <p className="text-sm text-gray-600">Results update instantly as you type. No loading spinners, no waiting.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">🌍</span>
                <div>
                  <h3 className="font-bold text-gray-900">Multi-Currency Support</h3>
                  <p className="text-sm text-gray-600">Auto-detects your location for currency settings, with support for multiple currencies.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">📱</span>
                <div>
                  <h3 className="font-bold text-gray-900">Works Everywhere</h3>
                  <p className="text-sm text-gray-600">Responsive design that works perfectly on phones, tablets, and desktop computers. Also works offline as a Progressive Web App.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Our Content Standards</h2>
            <p>Every article and tool on PaycheckMath is:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Researched:</strong> Built on data from the Bureau of Labor Statistics, IRS publications, and industry sources.</li>
              <li><strong>Reviewed:</strong> Checked for accuracy by team members with financial expertise.</li>
              <li><strong>Updated regularly:</strong> We keep tax brackets, inflation data, and cost of living figures current.</li>
              <li><strong>Transparent:</strong> We clearly label all calculations as estimates and encourage users to consult professionals for personalized advice.</li>
            </ul>
          </section>

          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
            <p>We love hearing from our users! Whether you have a suggestion for a new calculator, found an issue, or just want to say hello:</p>
            <p className="mt-3">📧 Email us at <a href="mailto:paycheckmath@gmail.com" className="text-blue-600 font-semibold hover:underline">paycheckmath@gmail.com</a></p>
            <p className="mt-2">Or visit our <Link href="/contact/" className="text-blue-600 font-semibold hover:underline">Contact Page</Link> to send us a message directly.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
