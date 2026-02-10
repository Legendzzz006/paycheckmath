import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Disclaimer | PaycheckMath',
  description: 'Important disclaimer and terms of use for PaycheckMath salary and wage calculators.',
  alternates: {
    canonical: '/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">$</span>
            </div>
            PaycheckMath.com
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Disclaimer
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-600 mb-8">
            Last Updated: February 1, 2026
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            General Information
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            The information provided by PaycheckMath is for general informational and
            educational purposes only. All calculations, estimates, and information on this
            website are provided in good faith, however we make no representation or warranty
            of any kind, express or implied, regarding the accuracy, adequacy, validity,
            reliability, availability, or completeness of any information on the site.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Not Financial or Tax Advice
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            The calculators and information on PaycheckMath are not intended to provide
            financial, tax, legal, or accounting advice. The calculations are based on standard
            assumptions and do not account for individual circumstances, tax situations, or
            specific employment agreements.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You should consult with qualified professionals (such as certified public accountants,
            financial advisors, or tax attorneys) for advice specific to your situation before
            making any financial decisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Calculation Methodology
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our salary calculators use standard formulas based on typical US work schedules:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>40 hours per week as the standard full-time schedule</li>
            <li>52 weeks per year</li>
            <li>2,080 total working hours per year (40 × 52)</li>
          </ul>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Actual pay may vary based on your specific employment situation, including but not
            limited to: actual hours worked, overtime, bonuses, commissions, paid time off,
            holidays, sick leave, and other factors.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Gross vs. Net Pay
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            All calculations on this website show gross pay (before taxes and deductions). Your
            actual take-home pay (net pay) will be lower after accounting for:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Federal income tax</li>
            <li>State income tax (where applicable)</li>
            <li>Social Security tax (FICA)</li>
            <li>Medicare tax</li>
            <li>Health insurance premiums</li>
            <li>Retirement contributions</li>
            <li>Other deductions</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            No Guarantee of Accuracy
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            While we strive to provide accurate calculations, we do not guarantee that the
            information on this website is correct, complete, or up-to-date. Tax laws,
            regulations, and standard practices change frequently, and we may not immediately
            reflect these changes on our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Under no circumstance shall PaycheckMath have any liability to you for any loss
            or damage of any kind incurred as a result of the use of the site or reliance on any
            information provided on the site. Your use of the site and your reliance on any
            information on the site is solely at your own risk.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            External Links
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This website may contain links to external websites that are not provided or
            maintained by us. We do not guarantee the accuracy, relevance, timeliness, or
            completeness of any information on these external websites.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Changes to This Disclaimer
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We reserve the right to modify this disclaimer at any time. Changes will be effective
            immediately upon posting to the website. Your continued use of the website following
            the posting of changes constitutes your acceptance of such changes.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Contact Information
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            If you have any questions about this disclaimer, please{' '}
            <Link href="/contact/" className="text-blue-600 hover:text-blue-800 underline">
              contact us
            </Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
