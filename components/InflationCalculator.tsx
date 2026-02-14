'use client';
import { useState, useEffect, useRef } from 'react';
import { calculateInflation, type InflationInputs } from '@/lib/inflationCalculations';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import ShareResults from './ShareResults';
import PDFExport from './PDFExport';

export default function InflationCalculator() {
    const { currency } = useCurrency();
    const [inputs, setInputs] = useState<InflationInputs>({ salary: 75000, years: 10, inflationRate: 3, raiseRate: 2 });
    const [animate, setAnimate] = useState(false);
    const prevResult = useRef('');
    const result = calculateInflation(inputs);

    useEffect(() => {
        const nv = JSON.stringify(result.realValue);
        if (prevResult.current && prevResult.current !== nv) setAnimate(true);
        prevResult.current = nv;
        if (animate) { const t = setTimeout(() => setAnimate(false), 300); return () => clearTimeout(t); }
    }, [result, animate]);

    const handleChange = (field: keyof InflationInputs, value: string) => {
        const num = parseFloat(value) || 0;
        if (field === 'salary' && (num < 0 || num > 10000000)) return;
        if (field === 'years' && (num < 0 || num > 50)) return;
        if ((field === 'inflationRate' || field === 'raiseRate') && (num < 0 || num > 50)) return;
        setInputs(prev => ({ ...prev, [field]: num }));
    };

    const isLoss = result.realGainOrLoss < 0;

    return (
        <div className="calculator-card border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Inflation-Adjusted Salary Calculator</h2>
            </div>
            <div className="space-y-5">
                <div>
                    <label htmlFor="inflSalary" className="block text-sm font-semibold text-gray-700 mb-2">Current Annual Salary</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-500 font-medium">{currency.symbol}</span>
                        <input type="number" id="inflSalary" value={inputs.salary || ''} onChange={(e) => handleChange('salary', e.target.value)} className="w-full pl-9 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white" placeholder="75000" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="inflYears" className="block text-sm font-semibold text-gray-700 mb-2">Years</label>
                        <input type="number" id="inflYears" value={inputs.years || ''} onChange={(e) => handleChange('years', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white" placeholder="10" />
                    </div>
                    <div>
                        <label htmlFor="inflRate" className="block text-sm font-semibold text-gray-700 mb-2">Inflation %</label>
                        <input type="number" id="inflRate" value={inputs.inflationRate || ''} onChange={(e) => handleChange('inflationRate', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white" placeholder="3" step="0.1" />
                    </div>
                    <div>
                        <label htmlFor="raiseRate" className="block text-sm font-semibold text-gray-700 mb-2">Annual Raise %</label>
                        <input type="number" id="raiseRate" value={inputs.raiseRate || ''} onChange={(e) => handleChange('raiseRate', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white" placeholder="2" step="0.1" />
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">After {inputs.years} Years</h3>
                <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${animate ? 'stagger-children' : ''}`}>
                    <div className="result-card p-4 sm:p-5 rounded-xl">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Nominal Salary</div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(result.nominalSalary, currency)}</div>
                    </div>
                    <div className="result-card p-4 sm:p-5 rounded-xl" style={{ borderLeftColor: isLoss ? '#ef4444' : '#22c55e' }}>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Real Value (Today&apos;s $)</div>
                        <div className={`text-xl sm:text-2xl font-bold ${isLoss ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(result.realValue, currency)}</div>
                    </div>
                    <div className="result-card p-4 sm:p-5 rounded-xl">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Purchasing Power Loss</div>
                        <div className="text-xl sm:text-2xl font-bold text-orange-600">{result.purchasingPowerLoss}%</div>
                    </div>
                    <div className="result-card p-4 sm:p-5 rounded-xl">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Real Gain/Loss</div>
                        <div className={`text-xl sm:text-2xl font-bold ${isLoss ? 'text-red-600' : 'text-green-600'}`}>{isLoss ? '-' : '+'}{formatCurrency(Math.abs(result.realGainOrLoss), currency)}</div>
                    </div>
                </div>
                {result.yearByYear.length > 0 && (
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-600">Year</th><th className="text-right py-2 px-3 font-semibold text-gray-600">Nominal</th><th className="text-right py-2 px-3 font-semibold text-gray-600">Real Value</th><th className="text-right py-2 px-3 font-semibold text-gray-600">Cum. Inflation</th></tr></thead>
                            <tbody>{result.yearByYear.map(row => (
                                <tr key={row.year} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-2 px-3 text-gray-700">{row.year}</td>
                                    <td className="py-2 px-3 text-right text-gray-900 font-medium">{formatCurrency(row.nominal, currency)}</td>
                                    <td className={`py-2 px-3 text-right font-medium ${row.real < inputs.salary ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(row.real, currency)}</td>
                                    <td className="py-2 px-3 text-right text-orange-600">{row.cumInflation}%</td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                )}
                <div className="flex flex-wrap gap-2 mt-6">
                    <ShareResults title="Inflation Calculator" text="Salary inflation analysis" data={{ 'Current Salary': formatCurrency(inputs.salary, currency), [`After ${inputs.years} years (nominal)`]: formatCurrency(result.nominalSalary, currency), 'Real Value': formatCurrency(result.realValue, currency) }} />
                    <PDFExport
                        title="Inflation-Adjusted Salary Report"
                        subtitle={`${inputs.years}-year projection with ${inputs.inflationRate}% inflation and ${inputs.raiseRate}% annual raises`}
                        accentColor="#ea580c"
                        inputs={{
                            'Current Salary': `${currency.symbol}${inputs.salary.toLocaleString()}`,
                            'Time Period': `${inputs.years} years`,
                            'Inflation Rate': `${inputs.inflationRate}%`,
                            'Annual Raise': `${inputs.raiseRate}%`,
                        }}
                        data={{
                            'Nominal Salary': formatCurrency(result.nominalSalary, currency),
                            'Real Value': formatCurrency(result.realValue, currency),
                            'Purchasing Power Loss': `${result.purchasingPowerLoss}%`,
                            'Real Gain/Loss': `${isLoss ? '-' : '+'}${formatCurrency(Math.abs(result.realGainOrLoss), currency)}`,
                        }}
                        tableData={result.yearByYear.length > 0 ? {
                            headers: ['Year', 'Nominal Salary', 'Real Value', 'Cum. Inflation'],
                            rows: result.yearByYear.map(row => [
                                `Year ${row.year}`,
                                formatCurrency(row.nominal, currency),
                                formatCurrency(row.real, currency),
                                `${row.cumInflation}%`,
                            ]),
                        } : undefined}
                    />
                </div>
            </div>
        </div>
    );
}
