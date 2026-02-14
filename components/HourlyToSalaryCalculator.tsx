'use client';
import { useState, useEffect, useRef } from 'react';
import { calculateHourlyToSalary, type HourlyToSalaryInputs } from '@/lib/hourlyToSalaryCalculations';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import CurrencySelector from './CurrencySelector';
import ShareResults from './ShareResults';
import PDFExport from './PDFExport';

export default function HourlyToSalaryCalculator() {
    const { currency } = useCurrency();
    const [inputs, setInputs] = useState<HourlyToSalaryInputs>({ hourlyRate: 25, hoursPerWeek: 40, weeksPerYear: 52 });
    const [animate, setAnimate] = useState(false);
    const prevResult = useRef('');

    const result = calculateHourlyToSalary(inputs);

    useEffect(() => {
        const newVal = JSON.stringify(result);
        if (prevResult.current && prevResult.current !== newVal) setAnimate(true);
        prevResult.current = newVal;
        if (animate) { const t = setTimeout(() => setAnimate(false), 300); return () => clearTimeout(t); }
    }, [result, animate]);

    const handleChange = (field: keyof HourlyToSalaryInputs, value: string) => {
        const num = parseFloat(value) || 0;
        if (field === 'hourlyRate' && (num < 0 || num > 10000)) return;
        if (field === 'hoursPerWeek' && (num < 0 || num > 168)) return;
        if (field === 'weeksPerYear' && (num < 0 || num > 52)) return;
        setInputs(prev => ({ ...prev, [field]: num }));
    };

    return (
        <div className="calculator-card border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Hourly to Salary Calculator</h2>
                </div>
                <CurrencySelector />
            </div>
            <div className="space-y-5">
                <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-500 font-medium">{currency.symbol}</span>
                        <input type="number" id="hourlyRate" value={inputs.hourlyRate || ''} onChange={(e) => handleChange('hourlyRate', e.target.value)} className="w-full pl-9 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" placeholder="25" aria-label={`Hourly rate in ${currency.name}`} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="htsHoursPerWeek" className="block text-sm font-semibold text-gray-700 mb-2">Hours per Week</label>
                        <input type="number" id="htsHoursPerWeek" value={inputs.hoursPerWeek || ''} onChange={(e) => handleChange('hoursPerWeek', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" placeholder="40" />
                    </div>
                    <div>
                        <label htmlFor="htsWeeksPerYear" className="block text-sm font-semibold text-gray-700 mb-2">Weeks per Year</label>
                        <input type="number" id="htsWeeksPerYear" value={inputs.weeksPerYear || ''} onChange={(e) => handleChange('weeksPerYear', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" placeholder="52" />
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Your Salary Breakdown</h3>
                <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${animate ? 'stagger-children' : ''}`}>
                    <div className="result-card p-4 sm:p-5 rounded-xl"><div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Annual</div><div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">{formatCurrency(result.annual, currency)}</div></div>
                    <div className="result-card p-4 sm:p-5 rounded-xl"><div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Monthly</div><div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">{formatCurrency(result.monthly, currency)}</div></div>
                    <div className="result-card p-4 sm:p-5 rounded-xl"><div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bi-Weekly</div><div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">{formatCurrency(result.biweekly, currency)}</div></div>
                    <div className="result-card p-4 sm:p-5 rounded-xl"><div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Daily</div><div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">{formatCurrency(result.daily, currency)}</div></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                    <ShareResults title="Hourly to Salary" text="My salary conversion" data={{ 'Hourly Rate': formatCurrency(inputs.hourlyRate, currency), 'Annual Salary': formatCurrency(result.annual, currency), 'Monthly': formatCurrency(result.monthly, currency) }} />
                    <PDFExport
                        title="Hourly to Salary Conversion"
                        subtitle={`Converting ${currency.symbol}${inputs.hourlyRate}/hr to annual salary equivalents`}
                        accentColor="#16a34a"
                        inputs={{
                            'Hourly Rate': `${currency.symbol}${inputs.hourlyRate}`,
                            'Hours / Week': `${inputs.hoursPerWeek}`,
                            'Weeks / Year': `${inputs.weeksPerYear}`,
                        }}
                        data={{
                            'Annual Salary': formatCurrency(result.annual, currency),
                            'Monthly Pay': formatCurrency(result.monthly, currency),
                            'Bi-Weekly Pay': formatCurrency(result.biweekly, currency),
                            'Daily Pay': formatCurrency(result.daily, currency),
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
