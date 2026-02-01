'use client';

import { useState } from 'react';
import { calculateTakeHome, type TakeHomeInputs } from '@/lib/takeHomeCalculations';
import { formatCurrency } from '@/lib/salaryCalculations';

export default function TakeHomeCalculator() {
  const [inputs, setInputs] = useState<TakeHomeInputs>({
    grossPay: 5000,
    payFrequency: 'monthly',
    federalTaxRate: 12,
    stateTaxRate: 5,
    otherDeductions: 200,
  });

  const breakdown = calculateTakeHome(inputs);

  const handleInputChange = (field: keyof TakeHomeInputs, value: string | number) => {
    if (field === 'payFrequency') {
      setInputs(prev => ({ ...prev, [field]: value as TakeHomeInputs['payFrequency'] }));
    } else {
      const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      setInputs(prev => ({ ...prev, [field]: numValue }));
    }
  };

  return (
    <div className="calculator-card border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Take-Home Pay Calculator</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="grossPay" className="block text-sm font-semibold text-gray-700 mb-2">
            Gross Pay
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-gray-500 font-medium">$</span>
            <input
              type="number"
              id="grossPay"
              value={inputs.grossPay || ''}
              onChange={(e) => handleInputChange('grossPay', e.target.value)}
              className="w-full pl-9 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              placeholder="5000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="payFrequency" className="block text-sm font-semibold text-gray-700 mb-2">
            Pay Frequency
          </label>
          <select
            id="payFrequency"
            value={inputs.payFrequency}
            onChange={(e) => handleInputChange('payFrequency', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
          >
            <option value="hourly">Hourly</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="federalTaxRate" className="block text-sm font-semibold text-gray-700 mb-2">
              Federal Tax %
            </label>
            <input
              type="number"
              id="federalTaxRate"
              value={inputs.federalTaxRate || ''}
              onChange={(e) => handleInputChange('federalTaxRate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              placeholder="12"
              step="0.1"
            />
          </div>

          <div>
            <label htmlFor="stateTaxRate" className="block text-sm font-semibold text-gray-700 mb-2">
              State Tax %
            </label>
            <input
              type="number"
              id="stateTaxRate"
              value={inputs.stateTaxRate || ''}
              onChange={(e) => handleInputChange('stateTaxRate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              placeholder="5"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="otherDeductions" className="block text-sm font-semibold text-gray-700 mb-2">
            Other Deductions (401k, Insurance, etc.)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-gray-500 font-medium">$</span>
            <input
              type="number"
              id="otherDeductions"
              value={inputs.otherDeductions || ''}
              onChange={(e) => handleInputChange('otherDeductions', e.target.value)}
              className="w-full pl-9 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              placeholder="200"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-2 border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Take-Home Pay</h3>
        <div className="space-y-4">
          <div className="result-card p-6 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">Net Pay</span>
              <span className="text-sm font-semibold text-green-600">{breakdown.takeHomePercentage}% of gross</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">{formatCurrency(breakdown.netPay)}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">Deductions Breakdown</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Federal Tax</span>
              <span className="font-semibold text-gray-900">{formatCurrency(breakdown.federalTax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">State Tax</span>
              <span className="font-semibold text-gray-900">{formatCurrency(breakdown.stateTax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">FICA (Social Security + Medicare)</span>
              <span className="font-semibold text-gray-900">{formatCurrency(breakdown.ficaTax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Other Deductions</span>
              <span className="font-semibold text-gray-900">{formatCurrency(breakdown.otherDeductions)}</span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total Deductions</span>
              <span className="font-bold text-red-600">{formatCurrency(breakdown.totalDeductions)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
