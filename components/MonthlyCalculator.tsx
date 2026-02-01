'use client';

import { useState } from 'react';
import { calculateMonthly, MonthlyInputs } from '@/lib/monthlyCalculations';

export default function MonthlyCalculator() {
  const [inputType, setInputType] = useState<'annual' | 'monthly' | 'weekly' | 'hourly'>('annual');
  const [amount, setAmount] = useState<string>('60000');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [weeksPerYear, setWeeksPerYear] = useState<string>('52');

  const inputs: MonthlyInputs = {
    inputType,
    amount: parseFloat(amount) || 0,
    hoursPerWeek: parseFloat(hoursPerWeek) || 40,
    weeksPerYear: parseFloat(weeksPerYear) || 52,
  };

  const results = calculateMonthly(inputs);

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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Monthly Income</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Input Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['annual', 'monthly', 'weekly', 'hourly'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setInputType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    inputType === type
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
              {inputType === 'annual' && 'Annual Salary'}
              {inputType === 'monthly' && 'Monthly Income'}
              {inputType === 'weekly' && 'Weekly Pay'}
              {inputType === 'hourly' && 'Hourly Rate'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="0"
              />
            </div>
          </div>

          {inputType === 'hourly' && (
            <>
              <div>
                <label htmlFor="hoursPerWeek" className="block text-sm font-semibold text-gray-700 mb-2">
                  Hours Per Week
                </label>
                <input
                  type="number"
                  id="hoursPerWeek"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="40"
                />
              </div>

              <div>
                <label htmlFor="weeksPerYear" className="block text-sm font-semibold text-gray-700 mb-2">
                  Weeks Per Year
                </label>
                <input
                  type="number"
                  id="weeksPerYear"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="52"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Income Breakdown</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Monthly</div>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(results.monthly)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Annual</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.annual)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Bi-Weekly</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(results.biweekly)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Weekly</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(results.weekly)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Daily</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(results.daily)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Hourly</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(results.hourly)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
