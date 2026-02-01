'use client';

import { useState } from 'react';
import { calculateRaise, RaiseInputs } from '@/lib/raiseCalculations';

export default function RaiseCalculator() {
  const [currentSalary, setCurrentSalary] = useState<string>('60000');
  const [raiseType, setRaiseType] = useState<'percentage' | 'amount'>('percentage');
  const [raiseValue, setRaiseValue] = useState<string>('5');

  const inputs: RaiseInputs = {
    currentSalary: parseFloat(currentSalary) || 0,
    raiseType,
    raiseValue: parseFloat(raiseValue) || 0,
  };

  const results = calculateRaise(inputs);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Raise Calculator</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Salary
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="60000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Raise Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRaiseType('percentage')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  raiseType === 'percentage'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Percentage (%)
              </button>
              <button
                onClick={() => setRaiseType('amount')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  raiseType === 'amount'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dollar Amount ($)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {raiseType === 'percentage' ? 'Raise Percentage' : 'Raise Amount'}
            </label>
            <div className="relative">
              {raiseType === 'amount' && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              )}
              <input
                type="number"
                value={raiseValue}
                onChange={(e) => setRaiseValue(e.target.value)}
                className={`w-full ${raiseType === 'amount' ? 'pl-10' : 'pl-4'} pr-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                placeholder={raiseType === 'percentage' ? '5' : '3000'}
                step={raiseType === 'percentage' ? '0.1' : '100'}
              />
              {raiseType === 'percentage' && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">%</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your New Salary</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {formatCurrency(results.newSalary)}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Increase:</span> {formatCurrency(results.raiseAmount)} ({results.raisePercentage.toFixed(2)}%)
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Income Breakdown</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 font-semibold text-gray-700">Period</th>
                  <th className="text-right py-2 font-semibold text-gray-700">Current</th>
                  <th className="text-right py-2 font-semibold text-gray-700">New</th>
                  <th className="text-right py-2 font-semibold text-green-600">Increase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 text-gray-700">Annual</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.current.annual)}</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.new.annual)}</td>
                  <td className="py-3 text-right font-bold text-green-600">{formatCurrency(results.breakdown.increase.annual)}</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-700">Monthly</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.current.monthly)}</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.new.monthly)}</td>
                  <td className="py-3 text-right font-bold text-green-600">{formatCurrency(results.breakdown.increase.monthly)}</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-700">Bi-Weekly</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.current.biweekly)}</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.new.biweekly)}</td>
                  <td className="py-3 text-right font-bold text-green-600">{formatCurrency(results.breakdown.increase.biweekly)}</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-700">Weekly</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.current.weekly)}</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.new.weekly)}</td>
                  <td className="py-3 text-right font-bold text-green-600">{formatCurrency(results.breakdown.increase.weekly)}</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-700">Hourly</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.current.hourly)}</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(results.breakdown.new.hourly)}</td>
                  <td className="py-3 text-right font-bold text-green-600">{formatCurrency(results.breakdown.increase.hourly)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
