'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                const timer = setTimeout(() => setVisible(true), 2000);
                return () => clearTimeout(timer);
            }
        } catch { }
    }, []);

    const accept = () => {
        try { localStorage.setItem('cookieConsent', 'accepted'); } catch { }
        setVisible(false);
    };

    const decline = () => {
        try { localStorage.setItem('cookieConsent', 'declined'); } catch { }
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 no-print animate-slide-up">
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">🍪 We use cookies</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            We use cookies and similar technologies to improve your experience, analyze traffic, and serve personalized ads via Google AdSense.
                            By clicking &quot;Accept&quot;, you consent to our use of cookies. See our{' '}
                            <a href="/privacy-policy/" className="text-blue-600 underline hover:text-blue-800">Privacy Policy</a> for details.
                        </p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                        <button onClick={decline} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Decline
                        </button>
                        <button onClick={accept} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
