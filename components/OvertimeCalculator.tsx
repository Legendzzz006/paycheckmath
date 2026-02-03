'use client';

import { useState } from 'react';
import { calculateOvertime, type OvertimeInputs } from '@/lib/overtimeCalculations';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import CurrencySelector from './CurrencySelector';

export default function OvertimeCalculator() {
  const { currency } = useCurrency();
  const [inputs, setInputs] = useState<OvertimeInputs>({
    hourlyRate: 20,
    regularHours: 40,
    overtimeHours: 10,
    overtimeMultiplier: 1.5,
  });

  const breakdown = calculateOvertime(inputs);

  const handleInputChange = (field: keyof OvertimeInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="calculator-card border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Overtime Calculator</h2>
        </div>
        <CurrencySelector />
      </div>
      
      <div className="space-y-5">
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
              className="w-full pl-9 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              placeholder="20"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="regularHours" className="block text-sm font-semibold text-gray-700 mb-2">
              Regular Hours
            </label>
            <input
              type="number"
              id="regularHours"
              value={inputs.regularHours || ''}
              onChange={(e) => handleInputChange('regularHours', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              placeholder="40"
            />
          </div>

          <div>
            <label htmlFor="overtimeHours" className="block text-sm font-semibold text-gray-700 mb-2">
              Overtime Hours
            </label>
            <input
              type="number"
              id="overtimeHours"
              value={inputs.overtimeHours || ''}
              onChange={(e) => handleInputChange('overtimeHours', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              placeholder="10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="overtimeMultiplier" className="block text-sm font-semibold text-gray-700 mb-2">
            Overtime Rate
          </label>
          <select
            id="overtimeMultiplier"
            value={inputs.overtimeMultiplier}
            onChange={(e) => handleInputChange('overtimeMultiplier', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
          >
            <option value="1.5">Time and a Half (1.5x)</option>
            <option value="2">Double Time (2x)</option>
            <option value="2.5">Double Time and a Half (2.5x)</option>
          </select>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-2 border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Overtime Pay</h3>
        <div className="space-y-4">
          <div className="bg-white border-2 border-gray-200 p-5 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Regular Pay</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(breakdown.regularPay, currency)}</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-xl">
            <div className="text-sm text-blue-700 font-semibold mb-1">Overtime Pay</div>
            <div className="text-2xl font-bold text-blue-900">{formatCurrency(breakdown.overtimePay, currency)}</div>
          </div>
          <div className="result-card p-5 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Total Pay</div>
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(breakdown.totalPay, currency)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Effective Hourly Rate</div>
            <div className="text-lg font-semibold text-gray-900">{formatCurrency(breakdown.effectiveHourlyRate, currency)}/hour</div>
          </div>
        </div>
      </div>
    </div>
  );
}
