import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Us | PaycheckMath',
  description: 'Get in touch with PaycheckMath. We welcome your questions, feedback, and suggestions.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
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
          Contact Us
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            We value your feedback and are here to help. Whether you have questions about our
            calculators, suggestions for improvements, or just want to say hello, we'd love to
            hear from you.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-700 mb-4">
              For general inquiries, feedback, or support:
            </p>
            <p className="text-gray-900 font-medium">
              Email: paycheckmath@gmail.com
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate are your calculations?
              </h3>
              <p className="text-gray-700">
                Our calculations are based on standard formulas and assumptions (40-hour work week,
                52 weeks per year). While we strive for accuracy, actual pay may vary based on your
                specific employment situation, taxes, and deductions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you account for taxes?
              </h3>
              <p className="text-gray-700">
                Currently, our calculators show gross pay before taxes and deductions. Your actual
                take-home pay will be lower after federal taxes, state taxes, FICA taxes, and other
                deductions. We recommend consulting with a tax professional or using a dedicated tax
                calculator for accurate after-tax estimates.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I suggest a new calculator or feature?
              </h3>
              <p className="text-gray-700">
                Absolutely! We're always looking to improve and expand our tools. Send us an email
                with your suggestions, and we'll consider them for future updates.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is this service really free?
              </h3>
              <p className="text-gray-700">
                Yes, PaycheckMath is completely free to use with no hidden fees or registration
                required. We may display minimal advertising to support the site's operation, but
                all calculators remain free and fully functional.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Response Time
            </h3>
            <p className="text-sm text-gray-700">
              We typically respond to inquiries within 1-2 business days. Thank you for your patience.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
