'use client';
import { useState, useEffect } from 'react';

interface RecentCalc {
    salary: number;
    hourly: string;
    date: string;
}

export default function RecentCalculations() {
    const [recents, setRecents] = useState<RecentCalc[]>([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('recentCalcs') || '[]');
            setRecents(stored.slice(0, 5));
        } catch { }
    }, []);

    if (recents.length === 0) return null;

    const handleClick = (salary: number) => {
        window.dispatchEvent(new CustomEvent('set-salary', { detail: salary }));
        // Scroll calculator into view smoothly
        const calcEl = document.getElementById('annualSalary');
        if (calcEl) {
            calcEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            calcEl.focus();
        }
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 no-print">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Recent Calculations
            </h3>
            <div className="space-y-2">
                {recents.map((calc, i) => (
                    <button
                        key={i}
                        onClick={() => handleClick(calc.salary)}
                        className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-100 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-sm group cursor-pointer"
                        aria-label={`Load salary calculation for $${calc.salary.toLocaleString()} per year`}
                    >
                        <span className="font-medium text-gray-900 group-hover:text-blue-600">${calc.salary.toLocaleString()}/yr</span>
                        <span className="text-gray-500">{calc.hourly}/hr</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export function saveRecentCalc(salary: number, hourly: string) {
    try {
        const stored: RecentCalc[] = JSON.parse(localStorage.getItem('recentCalcs') || '[]');
        const filtered = stored.filter(c => c.salary !== salary);
        filtered.unshift({ salary, hourly, date: new Date().toISOString() });
        localStorage.setItem('recentCalcs', JSON.stringify(filtered.slice(0, 10)));
    } catch { }
}
