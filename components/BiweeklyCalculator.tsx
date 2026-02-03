'use client';

import { useState } from 'react';
import { calculateBiweekly, type BiweeklyInputs } from '@/lib/biweeklyCalculations';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import CurrencySelector from './CurrencySelector';

export default function BiweeklyCalculator() {
  const { currency } = useCurrency();
  const [inputType, setInputType] = useState<'salary' | 'hourly'>('salary');
  const [inputs, setInputs] = useState<BiweeklyInputs>({
    annualSalary: 60000,
    hourlyRate: 25,
    hoursPerWeek: 40,
  });

  const breakdown = calculateBiweekly(
    inputType === 'salary' 
      ? { annualSalary: inputs.annualSalary }
      : { hourlyRate: inputs.hourlyRate, hoursPerWeek: inputs.hoursPerWeek }
  );

  const handleInputChange = (field: keyof BiweeklyInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="calculator-card border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Bi-Weekly Paycheck Calculator</h2>
        </div>
        <CurrencySelector />
      </div>
      
      <div className="mb-6">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setInputType('salary')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
              inputType === 'salary'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annual Salary
          </button>
          <button
            onClick={() => setInputType('hourly')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
              inputType === 'hourly'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Hourly Rate
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {inputType === 'salary' ? (
          <div>
            <label htmlFor="annualSalary" className="block text-sm font-semibold text-gray-700 mb-2">
              Annual Salary
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-500 font-medium">{currency.symbol}</span>
              <input
                type="number"
                id="annualSalary"
                value={inputs.annualSalary || ''}
                onChange={(e) => handleInputChange('annualSalary', e.target.value)}
                className="w-full pl-9 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                placeholder="60000"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-semibold text-gray-700 mb-2">
                Hourly Rate
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-500 font-medium">{currency.symbol}</span>
                <input
                  type="number"
                  id="hourlyRate"
                  value={inputs.hourlyRate || ''}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className="w-full pl-9 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  placeholder="25"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label htmlFor="hoursPerWeek" className="block text-sm font-semibold text-gray-700 mb-2">
                Hours/Week
              </label>
              <input
                type="number"
                id="hoursPerWeek"
                value={inputs.hoursPerWeek || ''}
                onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                placeholder="40"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-8 border-t-2 border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Bi-Weekly Pay</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="result-card p-5 rounded-xl col-span-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bi-Weekly Paycheck</div>
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(breakdown.biweeklyGross, currency)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-xs text-gray-600 mb-1">Weekly</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(breakdown.weeklyPay, currency)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-xs text-gray-600 mb-1">Monthly</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(breakdown.monthlyEquivalent, currency)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl col-span-2">
            <div className="text-xs text-gray-600 mb-1">Annual</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(breakdown.annualEquivalent, currency)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
