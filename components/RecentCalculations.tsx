'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 no-print">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Recent Calculations
            </h3>
            <div className="space-y-2">
                {recents.map((calc, i) => (
                    <Link key={i} href={`/${calc.salary}-a-year-is-how-much-an-hour/`} className="flex items-center justify-between px-3 py-2 bg-white border border-gray-100 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-sm group">
                        <span className="font-medium text-gray-900 group-hover:text-blue-600">${calc.salary.toLocaleString()}/yr</span>
                        <span className="text-gray-500">{calc.hourly}/hr</span>
                    </Link>
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
