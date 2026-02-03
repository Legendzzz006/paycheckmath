'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import {
  calculateSalaryTimeline,
  compareRaiseScenarios,
  typicalRaiseScenarios,
  type TimelineInput,
} from '@/lib/salaryTimelineCalculations';
import { trackCalculatorUsage, trackCalculatorInteraction } from '@/lib/analytics';

export default function SalaryTimelineCalculator() {
  const { currency } = useCurrency();
  const [input, setInput] = useState<TimelineInput>({
    currentSalary: 75000,
    annualRaisePercent: 3,
    years: 10,
    inflationRate: 2.5,
  });
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    trackCalculatorUsage('salary_timeline_calculator');
  }, []);

  const result = calculateSalaryTimeline(input);
  const comparison = showComparison ? compareRaiseScenarios(
    input.currentSalary,
    input.years,
    input.inflationRate,
    typicalRaiseScenarios
  ) : null;

  const updateInput = (field: keyof TimelineInput, value: string | number) => {
    setInput(prev => ({ ...prev, [field]: typeof value === 'string' ? parseFloat(value) || 0 : value }));
    trackCalculatorInteraction('timeline_calculator', `updated_${field}`);
  };

  const beatsInflation = input.annualRaisePercent > input.inflationRate;

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Salary Projection</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Salary
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
              <input
                type="number"
                value={input.currentSalary || ''}
                onChange={(e) => updateInput('currentSalary', e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Annual Raise (%)
            </label>
            <input
              type="number"
              value={input.annualRaisePercent || ''}
              onChange={(e) => updateInput('annualRaisePercent', e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              step="0.5"
            />
            <p className="text-xs text-gray-500 mt-1">Typical: 2-5% annually</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Years to Project
            </label>
            <input
              type="number"
              value={input.years || ''}
              onChange={(e) => updateInput('years', e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Inflation Rate (%)
            </label>
            <input
              type="number"
              value={input.inflationRate || ''}
              onChange={(e) => updateInput('inflationRate', e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">Historical average: 2-3%</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-600 mb-1">Final Salary</div>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(result.finalSalary, currency)}</div>
          <div className="text-xs text-gray-600 mt-1">After {input.years} years</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-600 mb-1">Total Earnings</div>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(result.totalEarnings, currency)}</div>
          <div className="text-xs text-gray-600 mt-1">Cumulative over {input.years} years</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-600 mb-1">Total Growth</div>
          <div className="text-2xl font-bold text-purple-600">+{result.totalGrowthPercent}%</div>
          <div className="text-xs text-gray-600 mt-1">{formatCurrency(result.totalGrowth, currency)} increase</div>
        </div>

        <div className={`bg-gradient-to-br border-2 rounded-xl p-4 ${beatsInflation ? 'from-green-50 to-emerald-50 border-green-200' : 'from-red-50 to-orange-50 border-red-200'}`}>
          <div className="text-sm font-semibold text-gray-600 mb-1">vs Inflation</div>
          <div className={`text-2xl font-bold ${beatsInflation ? 'text-green-600' : 'text-red-600'}`}>
            {beatsInflation ? '✓ Beating' : '✗ Losing'}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {beatsInflation ? `+${(input.annualRaisePercent - input.inflationRate).toFixed(1)}% real growth` : `${(input.annualRaisePercent - input.inflationRate).toFixed(1)}% real loss`}
          </div>
        </div>
      </div>

      {/* Timeline Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Year-by-Year Breakdown</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Year</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Salary</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Raise</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Real Value</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Purchasing Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {result.yearlyData.map((data) => (
                <tr key={data.year} className={data.year === 1 ? 'bg-blue-50' : ''}>
                  <td className="py-3 px-4 font-medium text-gray-900">Year {data.year}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    {formatCurrency(data.salary, currency)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {data.raise > 0 ? `+${formatCurrency(data.raise, currency)}` : '-'}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {formatCurrency(data.realValue, currency)}
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${data.purchasingPower >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.purchasingPower}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Real Value:</strong> Salary adjusted for inflation (what it's worth in today's dollars) | 
            <strong className="ml-3">Purchasing Power:</strong> Buying power relative to Year 1 (100% = same as start)
          </p>
        </div>
      </div>

      {/* Inflation Impact */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">The Impact of Inflation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">Nominal Earnings</span>
                <span className="font-bold text-gray-900">{formatCurrency(result.totalEarnings, currency)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">Real Earnings (Inflation-Adjusted)</span>
                <span className="font-bold text-gray-900">{formatCurrency(result.totalRealEarnings, currency)}</span>
              </div>
              <div className="flex items-center justify-between py-2 bg-red-50 rounded-lg px-3">
                <span className="font-bold text-gray-900">Inflation Impact</span>
                <span className="font-bold text-red-600">-{formatCurrency(result.inflationImpact, currency)}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-4">
            <h4 className="font-bold text-gray-900 mb-2">💡 Key Insight</h4>
            <p className="text-sm text-gray-700">
              {beatsInflation ? (
                <>
                  Your {input.annualRaisePercent}% annual raises are beating the {input.inflationRate}% inflation rate, 
                  meaning your purchasing power is actually growing by {(input.annualRaisePercent - input.inflationRate).toFixed(1)}% 
                  per year. Keep it up!
                </>
              ) : (
                <>
                  Your {input.annualRaisePercent}% annual raises are NOT keeping up with {input.inflationRate}% inflation. 
                  You're losing {(input.inflationRate - input.annualRaisePercent).toFixed(1)}% of purchasing power each year. 
                  You need at least {input.inflationRate}% raises just to maintain your current standard of living.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Comparison */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Compare Raise Scenarios</h3>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
          >
            {showComparison ? 'Hide' : 'Show'} Comparison
          </button>
        </div>

        {showComparison && comparison && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Scenario</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Annual Raise</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Final Salary</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Earnings</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">vs Inflation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparison.map((scenario, index) => (
                  <tr key={index} className={scenario.raisePercent === input.annualRaisePercent ? 'bg-blue-50' : ''}>
                    <td className="py-3 px-4 font-medium text-gray-900">{scenario.name}</td>
                    <td className="py-3 px-4 text-right text-gray-700">{scenario.raisePercent}%</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                      {formatCurrency(scenario.finalSalary, currency)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {formatCurrency(scenario.totalEarnings, currency)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {scenario.beatsInflation ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">✓ Beats</span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">✗ Loses</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Career Growth Tips</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <p className="text-gray-700">
              <strong>Negotiate annually:</strong> Don't wait for your employer to offer raises. Proactively negotiate 
              every year based on your performance and market rates.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <p className="text-gray-700">
              <strong>Beat inflation:</strong> Aim for raises that exceed inflation (currently ~{input.inflationRate}%). 
              Otherwise, you're effectively taking a pay cut each year.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <p className="text-gray-700">
              <strong>Job hop strategically:</strong> The biggest salary jumps (10-20%) typically come from changing 
              companies, not internal promotions. Consider external opportunities every 2-3 years.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <p className="text-gray-700">
              <strong>Track your growth:</strong> Use our Salary History Tracker to monitor your actual raises over time 
              and identify patterns in your career progression.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">5</span>
            <p className="text-gray-700">
              <strong>Compound effect matters:</strong> A 5% raise vs 3% raise might seem small, but over 10 years it's 
              a difference of tens of thousands of dollars. Every percentage point counts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
