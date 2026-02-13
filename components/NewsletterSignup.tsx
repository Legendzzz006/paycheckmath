'use client';
import { useState } from 'react';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) { setStatus('error'); return; }
        try {
            const existing = JSON.parse(localStorage.getItem('newsletterSignups') || '[]');
            existing.push({ email, date: new Date().toISOString() });
            localStorage.setItem('newsletterSignups', JSON.stringify(existing));
            localStorage.setItem('newsletterSubscribed', 'true');
        } catch { }
        setStatus('success');
        setEmail('');
    };

    if (status === 'success') {
        return (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
                <span className="text-3xl mb-2 block">✅</span>
                <p className="font-bold text-gray-900">Thanks for subscribing!</p>
                <p className="text-sm text-gray-600 mt-1">You&apos;ll receive salary insights and tips.</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-4">
                <span className="text-3xl mb-2 block">📬</span>
                <h3 className="text-xl font-bold text-gray-900">Get Salary Insights</h3>
                <p className="text-sm text-gray-600 mt-1">Free tips on salary negotiation, tax planning, and career growth.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                    aria-label="Email address"
                    required
                />
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                    Subscribe
                </button>
            </form>
            {status === 'error' && <p className="text-red-600 text-xs text-center mt-2">Please enter a valid email address.</p>}
            <p className="text-xs text-gray-500 text-center mt-3">No spam. Unsubscribe anytime.</p>
        </div>
    );
}
