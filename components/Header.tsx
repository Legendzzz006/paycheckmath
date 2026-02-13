'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDarkMode } from '@/contexts/DarkModeContext';

const navCategories = [
  {
    title: 'Essential',
    links: [
      { href: '/', label: 'Salary Calculator', icon: '💲' },
      { href: '/salary-to-hourly/', label: 'Salary to Hourly', icon: '⏱️' },
      { href: '/hourly-to-salary/', label: 'Hourly to Salary', icon: '🔄' },
      { href: '/overtime-calculator/', label: 'Overtime Calculator', icon: '⏰' },
      { href: '/biweekly-paycheck-calculator/', label: 'Bi-Weekly Paycheck', icon: '📅' },
      { href: '/take-home-pay-calculator/', label: 'Take-Home Pay', icon: '💰' },
      { href: '/monthly-income-calculator/', label: 'Monthly Income', icon: '📊' },
    ],
  },
  {
    title: 'Career',
    links: [
      { href: '/compare/', label: 'Compare Job Offers', icon: '⚖️' },
      { href: '/negotiation-calculator/', label: 'Salary Negotiation', icon: '💼' },
      { href: '/raise-calculator/', label: 'Raise Calculator', icon: '📈' },
      { href: '/salary-timeline/', label: 'Salary Timeline', icon: '📈' },
      { href: '/salary-history/', label: 'Salary History', icon: '📊' },
    ],
  },
  {
    title: 'Specialized',
    links: [
      { href: '/cost-of-living-calculator/', label: 'Cost of Living', icon: '🏙️' },
      { href: '/freelance-rate-calculator/', label: 'Freelance Rate', icon: '💼' },
      { href: '/part-time-salary-calculator/', label: 'Part-Time Income', icon: '👥' },
      { href: '/salary-comparison-calculator/', label: 'Salary Comparison', icon: '📊' },
      { href: '/inflation-calculator/', label: 'Inflation Calculator', icon: '📉' },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDD, setActiveDD] = useState<string | null>(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const ddRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setActiveDD(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMobileOpen(false); setActiveDD(null); } };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm no-print">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg font-bold">$</span>
          </div>
          <span className="hidden sm:inline">PaycheckMath.com</span>
          <span className="sm:hidden">PaycheckMath</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" ref={ddRef as React.RefObject<HTMLElement>} aria-label="Main navigation">
          {navCategories.map((cat) => (
            <div key={cat.title} className="relative">
              <button
                onClick={() => setActiveDD(activeDD === cat.title ? null : cat.title)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-1"
                aria-expanded={activeDD === cat.title}
              >
                {cat.title}
                <svg className={`w-4 h-4 transition-transform ${activeDD === cat.title ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDD === cat.title && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-fade-in-up z-50">
                  {cat.links.map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors" onClick={() => setActiveDD(null)}>
                      <span className="text-lg" aria-hidden="true">{link.icon}</span>{link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/blog/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all">Blog</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleDarkMode} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto shadow-2xl animate-slide-in-right">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <span className="font-bold text-gray-900">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="p-4 space-y-6" aria-label="Mobile navigation">
              {navCategories.map((cat) => (
                <div key={cat.title}>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{cat.title}</h3>
                  <div className="space-y-1">
                    {cat.links.map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setMobileOpen(false)}>
                        <span className="text-lg" aria-hidden="true">{link.icon}</span>{link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <Link href="/blog/" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setMobileOpen(false)}>
                  <span className="text-lg" aria-hidden="true">📝</span>Blog
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
