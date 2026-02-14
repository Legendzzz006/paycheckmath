'use client';
import { useState } from 'react';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) { setStatus('error'); setErrorMsg('Please enter a valid email address.'); return; }

        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Also store locally so we can remember the user subscribed
                try {
                    localStorage.setItem('newsletterSubscribed', 'true');
                } catch { }

                if (data.alreadySubscribed) {
                    setStatus('already');
                } else {
                    setStatus('success');
                }
                setEmail('');
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Network error. Please check your connection and try again.');
        }
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

    if (status === 'already') {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 text-center">
                <span className="text-3xl mb-2 block">💙</span>
                <p className="font-bold text-gray-900">You&apos;re already subscribed!</p>
                <p className="text-sm text-gray-600 mt-1">Thanks for being a loyal reader.</p>
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
                    onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                    aria-label="Email address"
                    required
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>
            {status === 'error' && <p className="text-red-600 text-xs text-center mt-2">{errorMsg}</p>}
            <p className="text-xs text-gray-500 text-center mt-3">No spam. Unsubscribe anytime.</p>
        </div>
    );
}
