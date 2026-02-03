'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import {
  calculateFreelanceRate,
  compareFreelanceVsW2,
  calculateTypicalExpenses,
  type FreelanceInput,
} from '@/lib/freelanceCalculations';
import { trackCalculatorUsage, trackCalculatorInteraction } from '@/lib/analytics';

export default function FreelanceCalculator() {
  const { currency } = useCurrency();
  const [input, setInput] = useState<FreelanceInput>({
    desiredSalary: 75000,
    billableHoursPerWeek: 30,
    weeksWorkedPerYear: 48,
    selfEmploymentTaxRate: 15.3,
    incomeTaxRate: 22,
    businessExpenses: calculateTypicalExpenses(false),
    healthInsurance: 6000,
    retirement: 6000,
    ptoWeeks: 2,
    profitMargin: 20,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [compareW2, setCompareW2] = useState(false);
  const [w2Salary, setW2Salary] = useState(75000);

  useEffect(() => {
    trackCalculatorUsage('freelance_calculator');
  }, []);

  const result = calculateFreelanceRate(input);
  const comparison = compareW2 ? compareFreelanceVsW2(
    result.recommendedHourlyRate,
    input.billableHoursPerWeek,
    input.weeksWorkedPerYear,
    w2Salary
  ) : null;

  const updateInput = (field: keyof FreelanceInput, value: string | number) => {
    setInput(prev => ({ ...prev, [field]: typeof value === 'string' ? parseFloat(value) || 0 : value }));
    trackCalculatorInteraction('freelance_calculator', `updated_${field}`);
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Freelance Goals</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Desired Annual Income (Take-Home)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
              <input
                type="number"
                value={input.desiredSalary || ''}
                onChange={(e) => updateInput('desiredSalary', e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">What you want to take home after all expenses</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Billable Hours per Week
            </label>
            <input
              type="number"
              value={input.billableHoursPerWeek || ''}
              onChange={(e) => updateInput('billableHoursPerWeek', e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Hours you can actually bill clients (not admin time)</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weeks Worked per Year
            </label>
            <input
              type="number"
              value={input.weeksWorkedPerYear || ''}
              onChange={(e) => updateInput('weeksWorkedPerYear', e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              max="52"
            />
            <p className="text-xs text-gray-500 mt-1">52 weeks minus vacation/sick time</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Desired Profit Margin (%)
            </label>
            <input
              type="number"
              value={input.profitMargin || ''}
              onChange={(e) => updateInput('profitMargin', e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Extra cushion for business growth</p>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mt-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            {showAdvanced ? '▼ Hide' : '▶ Show'} Advanced Options
          </button>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Self-Employment Tax Rate (%)
              </label>
              <input
                type="number"
                value={input.selfEmploymentTaxRate || ''}
                onChange={(e) => updateInput('selfEmploymentTaxRate', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">15.3% in US (Social Security + Medicare)</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Income Tax Rate (%)
              </label>
              <input
                type="number"
                value={input.incomeTaxRate || ''}
                onChange={(e) => updateInput('incomeTaxRate', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">Federal + state income tax estimate</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Annual Business Expenses
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
                <input
                  type="number"
                  value={input.businessExpenses || ''}
                  onChange={(e) => updateInput('businessExpenses', e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Software, equipment, marketing, etc.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Health Insurance (Annual)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
                <input
                  type="number"
                  value={input.healthInsurance || ''}
                  onChange={(e) => updateInput('healthInsurance', e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Retirement Contribution (Annual)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
                <input
                  type="number"
                  value={input.retirement || ''}
                  onChange={(e) => updateInput('retirement', e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PTO Weeks per Year
              </label>
              <input
                type="number"
                value={input.ptoWeeks || ''}
                onChange={(e) => updateInput('ptoWeeks', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Vacation time you want to take</p>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
          <div className="text-sm font-semibold text-gray-600 mb-2">Minimum Rate</div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {formatCurrency(result.minimumHourlyRate, currency)}/hr
          </div>
          <p className="text-sm text-gray-700">Break-even (no profit)</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
          <div className="text-sm font-semibold text-gray-600 mb-2">Recommended Rate</div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {formatCurrency(result.recommendedHourlyRate, currency)}/hr
          </div>
          <p className="text-sm text-gray-700">With {input.profitMargin}% profit margin</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
          <div className="text-sm font-semibold text-gray-600 mb-2">Premium Rate</div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {formatCurrency(result.premiumHourlyRate, currency)}/hr
          </div>
          <p className="text-sm text-gray-700">For premium clients</p>
        </div>
      </div>

      {/* Annual Projection */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Annual Projection (at Recommended Rate)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">Annual Revenue</span>
                <span className="font-bold text-gray-900">{formatCurrency(result.annualRevenue, currency)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">Total Expenses</span>
                <span className="font-bold text-red-600">-{formatCurrency(result.totalExpenses, currency)}</span>
              </div>
              <div className="flex items-center justify-between py-2 bg-green-50 rounded-lg px-3">
                <span className="font-bold text-gray-900">Net Income</span>
                <span className="font-bold text-green-600 text-xl">{formatCurrency(result.netIncome, currency)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Expense Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Taxes</span>
                <span className="text-gray-900">{formatCurrency(result.breakdown.taxes, currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Benefits (Health + Retirement)</span>
                <span className="text-gray-900">{formatCurrency(result.breakdown.benefits, currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Business Expenses</span>
                <span className="text-gray-900">{formatCurrency(result.breakdown.expenses, currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">PTO Value</span>
                <span className="text-gray-900">{formatCurrency(result.breakdown.pto, currency)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600">Profit Margin</span>
                <span className="text-green-600 font-semibold">{formatCurrency(result.breakdown.profit, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Effective Tax Rate:</strong> {result.effectiveTaxRate.toFixed(1)}% | 
            <strong className="ml-3">Billable Hours:</strong> {input.billableHoursPerWeek * input.weeksWorkedPerYear} hours/year
          </p>
        </div>
      </div>

      {/* W2 Comparison */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Compare to W2 Employment</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={compareW2}
              onChange={(e) => setCompareW2(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-semibold text-gray-700">Show Comparison</span>
          </label>
        </div>

        {compareW2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Equivalent W2 Salary
              </label>
              <div className="relative max-w-xs">
                <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
                <input
                  type="number"
                  value={w2Salary || ''}
                  onChange={(e) => setW2Salary(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {comparison && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Freelance Annual</div>
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(comparison.freelanceAnnual, currency)}</div>
                </div>

                <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">W2 Annual</div>
                  <div className="text-2xl font-bold text-gray-700">{formatCurrency(comparison.w2Annual, currency)}</div>
                </div>

                <div className={`border-l-4 rounded-r-xl p-4 md:col-span-2 ${comparison.difference >= 0 ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'}`}>
                  <div className="text-sm text-gray-600 mb-1">Difference</div>
                  <div className={`text-2xl font-bold ${comparison.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {comparison.difference >= 0 ? '+' : ''}{formatCurrency(comparison.difference, currency)}
                    <span className="text-lg ml-2">({comparison.differencePercent >= 0 ? '+' : ''}{comparison.differencePercent.toFixed(1)}%)</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    Break-even rate: {formatCurrency(comparison.breakEvenRate, currency)}/hr
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Freelance Pricing Tips</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <p className="text-gray-700">
              <strong>Start higher than you think:</strong> It's easier to lower rates than raise them. Your recommended rate accounts for all costs.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <p className="text-gray-700">
              <strong>Track billable vs non-billable time:</strong> Admin, marketing, and sales time isn't billable. Be realistic about billable hours.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <p className="text-gray-700">
              <strong>Offer package deals:</strong> Monthly retainers at a 10-15% discount encourage long-term clients and steady income.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <p className="text-gray-700">
              <strong>Value-based pricing:</strong> For experienced freelancers, charge based on value delivered, not just hours worked.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">5</span>
            <p className="text-gray-700">
              <strong>Review quarterly:</strong> Adjust your rates every 3-6 months as you gain experience and your costs change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
