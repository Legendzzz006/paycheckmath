'use client';

import { useState } from 'react';
import { calculateComparison, ComparisonInputs } from '@/lib/comparisonCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/lib/salaryCalculations';
import CurrencySelector from './CurrencySelector';

export default function ComparisonCalculator() {
  const { currency } = useCurrency();
  const [salaryAmount, setSalaryAmount] = useState<string>('75000');
  const [hourlyRate, setHourlyRate] = useState<string>('36');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [weeksPerYear, setWeeksPerYear] = useState<string>('52');
  const [salaryBenefits, setSalaryBenefits] = useState<string>('10000');
  const [hourlyBenefits, setHourlyBenefits] = useState<string>('2000');

  const inputs: ComparisonInputs = {
    salaryAmount: parseFloat(salaryAmount) || 0,
    hourlyRate: parseFloat(hourlyRate) || 0,
    hoursPerWeek: parseFloat(hoursPerWeek) || 40,
    weeksPerYear: parseFloat(weeksPerYear) || 52,
    salaryBenefitsValue: parseFloat(salaryBenefits) || 0,
    hourlyBenefitsValue: parseFloat(hourlyBenefits) || 0,
  };

  const results = calculateComparison(inputs);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Compare Salary vs Hourly</h2>
          <CurrencySelector />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Salary Job */}
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Salary Position</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Annual Salary
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currency.symbol}</span>
                  <input
                    type="number"
                    value={salaryAmount}
                    onChange={(e) => setSalaryAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="75000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Annual Benefits Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currency.symbol}</span>
                  <input
                    type="number"
                    value={salaryBenefits}
                    onChange={(e) => setSalaryBenefits(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="10000"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">Health insurance, 401k match, PTO, etc.</p>
              </div>
            </div>
          </div>

          {/* Hourly Job */}
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Hourly Position</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hourly Rate
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currency.symbol}</span>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="36.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Annual Benefits Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currency.symbol}</span>
                  <input
                    type="number"
                    value={hourlyBenefits}
                    onChange={(e) => setHourlyBenefits(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="2000"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">Health insurance, 401k match, PTO, etc.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hours Per Week
            </label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weeks Per Year
            </label>
            <input
              type="number"
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="52"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* Winner Banner */}
        <div className={`rounded-xl p-6 border-2 ${
          results.difference.betterOption === 'salary' 
            ? 'bg-blue-50 border-blue-300' 
            : results.difference.betterOption === 'hourly'
            ? 'bg-green-50 border-green-300'
            : 'bg-gray-50 border-gray-300'
        }`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {results.difference.betterOption === 'equal' 
              ? '🤝 Both Options Are Equal' 
              : results.difference.betterOption === 'salary'
              ? '💼 Salary Position Pays More'
              : '⏰ Hourly Position Pays More'}
          </h3>
          <p className="text-gray-700">
            {results.difference.betterOption === 'equal' 
              ? 'Both positions offer essentially the same total compensation.'
              : `The ${results.difference.betterOption} position pays ${formatCurrency(Math.abs(results.difference.annual), currency)} more per year (${Math.abs(results.difference.percentage).toFixed(1)}%).`}
          </p>
        </div>

        {/* Detailed Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Salary Details */}
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h4 className="font-bold text-gray-900 mb-4">Salary Position</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Base Salary:</span>
                <span className="font-bold">{formatCurrency(results.salary.annual, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">With Benefits:</span>
                <span className="font-bold text-blue-600">{formatCurrency(results.salary.withBenefits, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Effective Hourly:</span>
                <span className="font-bold">{formatCurrency(results.salary.effectiveHourly, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Monthly:</span>
                <span className="font-bold">{formatCurrency(results.salary.monthly, currency)}</span>
              </div>
            </div>
          </div>

          {/* Hourly Details */}
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h4 className="font-bold text-gray-900 mb-4">Hourly Position</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Annual Earnings:</span>
                <span className="font-bold">{formatCurrency(results.hourly.annual, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">With Benefits:</span>
                <span className="font-bold text-green-600">{formatCurrency(results.hourly.withBenefits, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Effective Hourly:</span>
                <span className="font-bold">{formatCurrency(results.hourly.effectiveHourly, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Monthly:</span>
                <span className="font-bold">{formatCurrency(results.hourly.monthly, currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
