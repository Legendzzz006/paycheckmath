import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | PaycheckMath',
  description: 'Privacy Policy for PaycheckMath - Learn how we collect, use, and protect your information.',
  alternates: { canonical: 'https://paycheckmath.com/privacy-policy/' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-600 mb-8">
            Last Updated: February 1, 2026
          </p>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            At PaycheckMath, we are committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit
            our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Information We Collect
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Information You Provide
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our calculators process the salary and wage information you enter directly in your
            browser. This information is not transmitted to our servers or stored in any way.
            All calculations are performed locally on your device.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Automatically Collected Information
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            When you visit our website, we may automatically collect certain information about
            your device, including:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Device type and screen resolution</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new features, products, and services</li>
            <li>Communicate with you for customer service and support</li>
            <li>Detect and prevent fraud and abuse</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We may use cookies and similar tracking technologies to track activity on our website
            and store certain information. Cookies are files with a small amount of data that are
            sent to your browser from a website and stored on your device.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is
            being sent. However, if you do not accept cookies, you may not be able to use some
            portions of our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Third-Party Services
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Google AdSense
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We use Google AdSense to display advertisements on our website. Google AdSense uses
            cookies to serve ads based on your prior visits to our website or other websites.
            Google's use of advertising cookies enables it and its partners to serve ads based on
            your visit to our site and/or other sites on the Internet.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You may opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Google Ads Settings
            </a>.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Analytics
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We may use third-party analytics services to monitor and analyze web traffic. These
            services may use cookies and similar technologies to collect information about your
            use of our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Data Security
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We implement appropriate technical and organizational security measures to protect
            your information. However, please note that no method of transmission over the Internet
            or method of electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Children's Privacy
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our website is not intended for children under the age of 13. We do not knowingly
            collect personal information from children under 13. If you are a parent or guardian
            and believe your child has provided us with personal information, please contact us.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Your Privacy Rights
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Depending on your location, you may have certain rights regarding your personal
            information, including:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to object to processing of your information</li>
            <li>The right to data portability</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You are advised to review this Privacy Policy periodically for any changes. Changes
            to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="text-gray-900 font-medium mb-4">
            Email: paycheckmath@gmail.com
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You can also visit our{' '}
            <Link href="/contact/" className="text-blue-600 hover:text-blue-800 underline">
              contact page
            </Link>{' '}
            for more information.
          </p>
        </div>
      </main>

      <Footer />
    </div >
  );
}
