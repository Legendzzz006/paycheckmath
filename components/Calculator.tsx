'use client';

import { useState, useEffect, useRef } from 'react';
import { calculateSalaryBreakdown, formatCurrency, type CalculatorInputs } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import { trackEvent } from '@/lib/analytics';
import CurrencySelector from './CurrencySelector';
import ShareResults from './ShareResults';
import PDFExport from './PDFExport';
import { saveRecentCalc } from './RecentCalculations';

interface CalculatorProps {
  initialSalary?: number;
}

export default function Calculator({ initialSalary = 75000 }: CalculatorProps) {
  const { currency } = useCurrency();
  const startTimeRef = useRef<number>(Date.now());
  const hasTrackedUsage = useRef<boolean>(false);
  const [animate, setAnimate] = useState(false);
  const prevBreakdown = useRef<string>('');
  const [mounted, setMounted] = useState(false);

  const [inputs, setInputs] = useState<CalculatorInputs>({
    annualSalary: initialSalary,
    hoursPerWeek: currency.workingHoursPerWeek,
    weeksPerYear: currency.workingWeeksPerYear,
    paidTimeOffWeeks: currency.paidTimeOffWeeks,
  });

  const breakdown = calculateSalaryBreakdown(inputs);

  useEffect(() => { setMounted(true); }, []);

  // Trigger animation on value change
  useEffect(() => {
    const key = JSON.stringify(breakdown);
    if (prevBreakdown.current && prevBreakdown.current !== key) {
      setAnimate(true);
      // Save to recent calculations
      if (inputs.annualSalary > 0) {
        saveRecentCalc(inputs.annualSalary, formatCurrency(breakdown.hourly, currency));
      }
    }
    prevBreakdown.current = key;
    if (animate) {
      const t = setTimeout(() => setAnimate(false), 400);
      return () => clearTimeout(t);
    }
  }, [breakdown, animate, inputs.annualSalary, currency]);

  useEffect(() => {
    if (!hasTrackedUsage.current) {
      trackEvent('calculator_used', 'Calculator', 'salary_calculator', initialSalary);
      hasTrackedUsage.current = true;
    }
  }, [initialSalary]);

  useEffect(() => {
    return () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 5) {
        trackEvent('time_on_calculator', 'Engagement', 'salary_calculator', timeSpent);
      }
    };
  }, []);

  useEffect(() => {
    if (initialSalary && initialSalary !== inputs.annualSalary) {
      setInputs(prev => ({ ...prev, annualSalary: initialSalary }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSalary]);

  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      hoursPerWeek: currency.workingHoursPerWeek,
      weeksPerYear: currency.workingWeeksPerYear,
      paidTimeOffWeeks: currency.paidTimeOffWeeks,
    }));
  }, [currency]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (field === 'annualSalary' && (numValue < 0 || numValue > 10000000)) return;
    if (field === 'hoursPerWeek' && (numValue < 0 || numValue > 168)) return;
    if (field === 'weeksPerYear' && (numValue < 0 || numValue > 52)) return;
    if (field === 'paidTimeOffWeeks' && (numValue < 0 || numValue > 52)) return;
    setInputs(prev => ({ ...prev, [field]: numValue }));
    trackEvent('calculator_interaction', 'Engagement', `salary_calculator:changed_${field}`);
  };

  if (!mounted) {
    return (
      <div className="calculator-card border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg" aria-busy="true">
        <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 skeleton" /><div className="h-7 w-48 skeleton" /></div>
        <div className="space-y-5"><div><div className="h-4 w-24 skeleton mb-2" /><div className="h-12 w-full skeleton" /></div>
          <div className="grid grid-cols-2 gap-4"><div><div className="h-4 w-28 skeleton mb-2" /><div className="h-12 skeleton" /></div><div><div className="h-4 w-28 skeleton mb-2" /><div className="h-12 skeleton" /></div></div></div>
        <div className="mt-8 pt-8 border-t-2 border-gray-100"><div className="h-6 w-40 skeleton mb-6" /><div className="grid grid-cols-2 gap-3"><div className="h-24 skeleton" /><div className="h-24 skeleton" /><div className="h-24 skeleton" /><div className="h-24 skeleton" /></div></div>
      </div>
    );
  }

  return (
    <div className="calculator-card border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Salary Calculator</h2>
        </div>
        <CurrencySelector />
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="annualSalary" className="block text-sm font-semibold text-gray-700 mb-2">Annual Salary</label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-gray-500 font-medium">{currency.symbol}</span>
            <input type="number" id="annualSalary" value={inputs.annualSalary || ''} onChange={(e) => handleInputChange('annualSalary', e.target.value)} className="w-full pl-9 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" placeholder="75000" aria-label={`Annual salary in ${currency.name}`} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hoursPerWeek" className="block text-sm font-semibold text-gray-700 mb-2">Hours per Week</label>
            <input type="number" id="hoursPerWeek" value={inputs.hoursPerWeek || ''} onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" placeholder="40" aria-label="Hours worked per week" />
          </div>
          <div>
            <label htmlFor="weeksPerYear" className="block text-sm font-semibold text-gray-700 mb-2">Weeks per Year</label>
            <input type="number" id="weeksPerYear" value={inputs.weeksPerYear || ''} onChange={(e) => handleInputChange('weeksPerYear', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" placeholder="52" aria-label="Weeks worked per year" />
          </div>
        </div>
        <div>
          <label htmlFor="paidTimeOff" className="block text-sm font-semibold text-gray-700 mb-2">Paid Time Off (weeks)</label>
          <input type="number" id="paidTimeOff" value={inputs.paidTimeOffWeeks || ''} onChange={(e) => handleInputChange('paidTimeOffWeeks', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" placeholder="0" aria-label="Paid time off in weeks" />
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-2 border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Pay Breakdown</h3>
        <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${animate ? 'stagger-children' : ''}`}>
          <div className={`result-card p-4 sm:p-5 rounded-xl ${animate ? 'animate-count-pulse' : ''}`}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Hourly</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">{formatCurrency(breakdown.hourly, currency)}</div>
          </div>
          <div className={`result-card p-4 sm:p-5 rounded-xl ${animate ? 'animate-count-pulse' : ''}`}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Daily</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">{formatCurrency(breakdown.daily, currency)}</div>
          </div>
          <div className={`result-card p-4 sm:p-5 rounded-xl ${animate ? 'animate-count-pulse' : ''}`}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Weekly</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">{formatCurrency(breakdown.weekly, currency)}</div>
          </div>
          <div className={`result-card p-4 sm:p-5 rounded-xl ${animate ? 'animate-count-pulse' : ''}`}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Monthly</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">{formatCurrency(breakdown.monthly, currency)}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          <ShareResults title="Salary Breakdown" text={`Salary: ${formatCurrency(breakdown.annual, currency)}/year`} data={{ 'Annual': formatCurrency(breakdown.annual, currency), 'Hourly': formatCurrency(breakdown.hourly, currency), 'Daily': formatCurrency(breakdown.daily, currency), 'Weekly': formatCurrency(breakdown.weekly, currency), 'Monthly': formatCurrency(breakdown.monthly, currency) }} />
          <PDFExport title="Salary Breakdown" />
        </div>
      </div>
      <div className="print-watermark">
        <p>📊 Calculated using <strong>PaycheckMath.com</strong> — Free Salary &amp; Pay Calculators</p>
        <p>Visit: https://paycheckmath.com</p>
      </div>
    </div>
  );
}
