import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="mb-8">
                    <span className="text-8xl font-bold text-blue-600">404</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. Try one of our popular calculators below.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
                    <Link href="/" className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition-all text-center group">
                        <span className="text-3xl block mb-2" aria-hidden="true">💲</span>
                        <h2 className="font-bold text-gray-900 group-hover:text-blue-600">Salary Calculator</h2>
                        <p className="text-sm text-gray-600 mt-1">Convert annual salary to hourly pay</p>
                    </Link>
                    <Link href="/take-home-pay-calculator/" className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition-all text-center group">
                        <span className="text-3xl block mb-2" aria-hidden="true">💰</span>
                        <h2 className="font-bold text-gray-900 group-hover:text-blue-600">Take-Home Pay</h2>
                        <p className="text-sm text-gray-600 mt-1">Calculate net pay after taxes</p>
                    </Link>
                    <Link href="/hourly-to-salary/" className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition-all text-center group">
                        <span className="text-3xl block mb-2" aria-hidden="true">🔄</span>
                        <h2 className="font-bold text-gray-900 group-hover:text-blue-600">Hourly to Salary</h2>
                        <p className="text-sm text-gray-600 mt-1">Convert hourly rate to annual salary</p>
                    </Link>
                    <Link href="/overtime-calculator/" className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5 hover:border-purple-500 hover:shadow-lg transition-all text-center group">
                        <span className="text-3xl block mb-2" aria-hidden="true">⏰</span>
                        <h2 className="font-bold text-gray-900 group-hover:text-purple-600">Overtime Calculator</h2>
                        <p className="text-sm text-gray-600 mt-1">Calculate overtime pay rates</p>
                    </Link>
                    <Link href="/compare/" className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5 hover:border-purple-500 hover:shadow-lg transition-all text-center group">
                        <span className="text-3xl block mb-2" aria-hidden="true">⚖️</span>
                        <h2 className="font-bold text-gray-900 group-hover:text-purple-600">Compare Jobs</h2>
                        <p className="text-sm text-gray-600 mt-1">Compare job offers side by side</p>
                    </Link>
                    <Link href="/blog/" className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5 hover:border-purple-500 hover:shadow-lg transition-all text-center group">
                        <span className="text-3xl block mb-2" aria-hidden="true">📝</span>
                        <h2 className="font-bold text-gray-900 group-hover:text-purple-600">Blog</h2>
                        <p className="text-sm text-gray-600 mt-1">Salary tips and guides</p>
                    </Link>
                </div>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Back to Home
                </Link>
            </main>
            <Footer />
        </div>
    );
}
