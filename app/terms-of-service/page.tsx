import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | PaycheckMath',
  description: 'Terms of Service for PaycheckMath - Read our terms and conditions for using our salary calculators.',
};

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-600 mb-8">
            Last Updated: February 1, 2026
          </p>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Welcome to PaycheckMath. By accessing or using our website, you agree to be bound by 
            these Terms of Service. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            By accessing and using PaycheckMath.com (the "Website"), you accept and agree to be 
            bound by the terms and provision of this agreement. If you do not agree to these Terms 
            of Service, please do not use our Website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            2. Use of Service
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            PaycheckMath provides free salary and wage calculation tools for informational and 
            educational purposes. You agree to use the Website only for lawful purposes and in a 
            way that does not infringe the rights of others or restrict their use of the Website.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Permitted Uses
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Personal salary and wage calculations</li>
            <li>Comparing job offers and compensation packages</li>
            <li>Educational and informational purposes</li>
            <li>Financial planning and budgeting</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Prohibited Uses
          </h3>
          <p className="text-gray-700 mb-2 leading-relaxed">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Use the Website for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the Website or servers</li>
            <li>Use automated systems to access the Website without permission</li>
            <li>Copy, reproduce, or redistribute our content without permission</li>
            <li>Use the Website to transmit viruses or malicious code</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            3. Intellectual Property Rights
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            The Website and its original content, features, and functionality are owned by 
            PaycheckMath and are protected by international copyright, trademark, patent, trade 
            secret, and other intellectual property laws.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You may not copy, modify, distribute, sell, or lease any part of our Website or 
            included software without our express written permission.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            4. Disclaimer of Warranties
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            THE WEBSITE AND ALL INFORMATION, CONTENT, MATERIALS, AND SERVICES ARE PROVIDED "AS IS" 
            AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We do not warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>The Website will be available at all times or without interruption</li>
            <li>The calculations provided are accurate or complete</li>
            <li>The Website will be free from errors, viruses, or other harmful components</li>
            <li>The results obtained from using the Website will meet your requirements</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, PAYCHECKMATH SHALL NOT BE LIABLE FOR ANY 
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF 
            PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, 
            USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You acknowledge that you use the Website and its calculators at your own risk and that 
            you should verify all calculations independently before making any financial decisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            6. Accuracy of Information
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            While we strive to provide accurate calculations, we make no representations or 
            warranties about the accuracy, reliability, completeness, or timeliness of any 
            information on the Website.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            All calculations are based on standard assumptions and may not reflect your specific 
            situation. You should consult with qualified professionals for advice tailored to your 
            circumstances.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            7. Third-Party Links
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our Website may contain links to third-party websites or services that are not owned 
            or controlled by PaycheckMath. We have no control over and assume no responsibility 
            for the content, privacy policies, or practices of any third-party websites or services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            8. Advertising
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We may display third-party advertisements on our Website. These advertisers may use 
            cookies and other tracking technologies to collect information about your visits to 
            this and other websites to provide advertisements about goods and services of interest 
            to you.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            9. Modifications to Service
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We reserve the right to modify or discontinue, temporarily or permanently, the Website 
            or any features or portions thereof without prior notice. You agree that we will not 
            be liable for any modification, suspension, or discontinuance of the Website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            10. Changes to Terms
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. We will notify 
            users of any material changes by posting the new Terms of Service on this page and 
            updating the "Last Updated" date.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Your continued use of the Website after any such changes constitutes your acceptance 
            of the new Terms of Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            11. Governing Law
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of the United 
            States, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            12. Contact Information
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <p className="text-gray-900 font-medium mb-4">
            Email: paycheckmath@gmail.com
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You can also visit our{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              contact page
            </Link>{' '}
            for more information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            13. Severability
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            If any provision of these Terms is found to be unenforceable or invalid, that provision 
            will be limited or eliminated to the minimum extent necessary so that these Terms will 
            otherwise remain in full force and effect.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            14. Entire Agreement
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            These Terms of Service, together with our Privacy Policy and Disclaimer, constitute 
            the entire agreement between you and PaycheckMath regarding the use of the Website.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
