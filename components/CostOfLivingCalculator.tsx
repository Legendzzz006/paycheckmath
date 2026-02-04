'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import {
  cities,
  getCityBySlug,
  calculateEquivalentSalary,
  calculateCostBreakdown,
  compareQualityOfLife,
  shouldRelocate,
  type CityData,
} from '@/lib/costOfLivingData';
import { trackEvent } from '@/lib/analytics';

export default function CostOfLivingCalculator() {
  const { currency } = useCurrency();
  const [fromCitySlug, setFromCitySlug] = useState('new-york-ny');
  const [toCitySlug, setToCitySlug] = useState('austin-tx');
  const [currentSalary, setCurrentSalary] = useState(100000);
  const [newSalary, setNewSalary] = useState(0);
  const [useEquivalent, setUseEquivalent] = useState(true);

  useEffect(() => {
    trackEvent('calculator_used', 'Calculator', 'cost_of_living_calculator');
  }, []);

  const fromCity = getCityBySlug(fromCitySlug);
  const toCity = getCityBySlug(toCitySlug);

  if (!fromCity || !toCity) return null;

  const equivalentSalary = calculateEquivalentSalary(currentSalary, fromCity, toCity);
  const displayNewSalary = useEquivalent ? equivalentSalary : newSalary;

  const fromCosts = calculateCostBreakdown(currentSalary, fromCity);
  const toCosts = calculateCostBreakdown(displayNewSalary, toCity);
  const comparison = compareQualityOfLife(fromCity, toCity);
  const relocation = shouldRelocate(currentSalary, displayNewSalary, fromCity, toCity);

  const handleFromCityChange = (slug: string) => {
    setFromCitySlug(slug);
    trackEvent('calculator_interaction', 'Engagement', 'col_calculator:changed_from_city');
  };

  const handleToCityChange = (slug: string) => {
    setToCitySlug(slug);
    trackEvent('calculator_interaction', 'Engagement', 'col_calculator:changed_to_city');
  };

  const getRecommendationColor = (rec: 'yes' | 'no' | 'maybe') => {
    switch (rec) {
      case 'yes': return 'green';
      case 'no': return 'red';
      case 'maybe': return 'amber';
    }
  };

  const getRecommendationIcon = (rec: 'yes' | 'no' | 'maybe') => {
    switch (rec) {
      case 'yes': return '✅';
      case 'no': return '❌';
      case 'maybe': return '🤔';
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Compare Cities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current City
            </label>
            <select
              value={fromCitySlug}
              onChange={(e) => handleFromCityChange(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {cities.map(city => (
                <option key={city.slug} value={city.slug}>
                  {city.name}, {city.state}
                </option>
              ))}
            </select>
            <div className="mt-2 text-sm text-gray-600">
              COL Index: {fromCity.colIndex} | Population: {(fromCity.population / 1000000).toFixed(1)}M
            </div>
          </div>

          {/* To City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New City
            </label>
            <select
              value={toCitySlug}
              onChange={(e) => handleToCityChange(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {cities.map(city => (
                <option key={city.slug} value={city.slug}>
                  {city.name}, {city.state}
                </option>
              ))}
            </select>
            <div className="mt-2 text-sm text-gray-600">
              COL Index: {toCity.colIndex} | Population: {(toCity.population / 1000000).toFixed(1)}M
            </div>
          </div>

          {/* Current Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Salary in {fromCity.name}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
              <input
                type="number"
                value={currentSalary || ''}
                onChange={(e) => setCurrentSalary(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* New Salary */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <input
                type="checkbox"
                checked={useEquivalent}
                onChange={(e) => setUseEquivalent(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Use equivalent salary
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
              <input
                type="number"
                value={useEquivalent ? equivalentSalary : (newSalary || '')}
                onChange={(e) => setNewSalary(parseFloat(e.target.value) || 0)}
                disabled={useEquivalent}
                className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {useEquivalent ? 'Auto-calculated based on COL difference' : 'Enter your actual offer'}
            </p>
          </div>
        </div>
      </div>

      {/* Equivalent Salary Highlight */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Salary Equivalence</h3>
        <div className="text-center">
          <div className="text-lg text-gray-700 mb-2">
            {formatCurrency(currentSalary, currency)} in <span className="font-bold">{fromCity.name}</span>
          </div>
          <div className="text-3xl font-bold text-blue-600 my-3">≈</div>
          <div className="text-lg text-gray-700">
            {formatCurrency(equivalentSalary, currency)} in <span className="font-bold">{toCity.name}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 text-center mt-4">
          Based on {((toCity.colIndex / fromCity.colIndex - 1) * 100).toFixed(0)}% 
          {toCity.colIndex > fromCity.colIndex ? ' higher' : ' lower'} cost of living
        </p>
      </div>

      {/* Should You Relocate? */}
      <div className={`bg-gradient-to-br from-${getRecommendationColor(relocation.recommendation)}-50 to-${getRecommendationColor(relocation.recommendation)}-100 border-2 border-${getRecommendationColor(relocation.recommendation)}-300 rounded-xl p-6 shadow-sm`}>
        <div className="flex items-start gap-4">
          <div className="text-5xl">{getRecommendationIcon(relocation.recommendation)}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Should You Relocate?
            </h3>
            <div className="text-xl font-semibold text-gray-800 mb-3">
              {relocation.recommendation === 'yes' && 'Yes, this move makes financial sense'}
              {relocation.recommendation === 'no' && 'No, this move may hurt financially'}
              {relocation.recommendation === 'maybe' && 'Maybe, consider non-financial factors'}
            </div>
            <div className="space-y-2">
              {relocation.reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-600 mb-1">Real Income Change</div>
              <div className={`text-2xl font-bold ${relocation.realIncomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {relocation.realIncomeChange >= 0 ? '+' : ''}{formatCurrency(relocation.realIncomeChange, currency)}
                <span className="text-lg ml-2">
                  ({relocation.realIncomeChangePercent >= 0 ? '+' : ''}{relocation.realIncomeChangePercent.toFixed(1)}%)
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">After adjusting for cost of living</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown Comparison */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Annual Cost Breakdown</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{fromCity.name}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{toCity.name}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">🏠 Housing</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(fromCosts.housing, currency)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(toCosts.housing, currency)}</td>
                <td className={`py-3 px-4 text-right font-semibold ${toCosts.housing < fromCosts.housing ? 'text-green-600' : 'text-red-600'}`}>
                  {toCosts.housing < fromCosts.housing ? '-' : '+'}{formatCurrency(Math.abs(toCosts.housing - fromCosts.housing), currency)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">🛒 Groceries</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(fromCosts.groceries, currency)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(toCosts.groceries, currency)}</td>
                <td className={`py-3 px-4 text-right font-semibold ${toCosts.groceries < fromCosts.groceries ? 'text-green-600' : 'text-red-600'}`}>
                  {toCosts.groceries < fromCosts.groceries ? '-' : '+'}{formatCurrency(Math.abs(toCosts.groceries - fromCosts.groceries), currency)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">🚗 Transportation</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(fromCosts.transport, currency)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(toCosts.transport, currency)}</td>
                <td className={`py-3 px-4 text-right font-semibold ${toCosts.transport < fromCosts.transport ? 'text-green-600' : 'text-red-600'}`}>
                  {toCosts.transport < fromCosts.transport ? '-' : '+'}{formatCurrency(Math.abs(toCosts.transport - fromCosts.transport), currency)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">💡 Utilities</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(fromCosts.utilities, currency)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(toCosts.utilities, currency)}</td>
                <td className={`py-3 px-4 text-right font-semibold ${toCosts.utilities < fromCosts.utilities ? 'text-green-600' : 'text-red-600'}`}>
                  {toCosts.utilities < fromCosts.utilities ? '-' : '+'}{formatCurrency(Math.abs(toCosts.utilities - fromCosts.utilities), currency)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">🏥 Healthcare</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(fromCosts.healthcare, currency)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(toCosts.healthcare, currency)}</td>
                <td className={`py-3 px-4 text-right font-semibold ${toCosts.healthcare < fromCosts.healthcare ? 'text-green-600' : 'text-red-600'}`}>
                  {toCosts.healthcare < fromCosts.healthcare ? '-' : '+'}{formatCurrency(Math.abs(toCosts.healthcare - fromCosts.healthcare), currency)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">🎯 Other</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(fromCosts.other, currency)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(toCosts.other, currency)}</td>
                <td className={`py-3 px-4 text-right font-semibold ${toCosts.other < fromCosts.other ? 'text-green-600' : 'text-red-600'}`}>
                  {toCosts.other < fromCosts.other ? '-' : '+'}{formatCurrency(Math.abs(toCosts.other - fromCosts.other), currency)}
                </td>
              </tr>
              <tr className="bg-gray-50 font-bold">
                <td className="py-3 px-4 text-gray-900">Total Annual Costs</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(fromCosts.total, currency)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(toCosts.total, currency)}</td>
                <td className={`py-3 px-4 text-right ${toCosts.total < fromCosts.total ? 'text-green-600' : 'text-red-600'}`}>
                  {toCosts.total < fromCosts.total ? '-' : '+'}{formatCurrency(Math.abs(toCosts.total - fromCosts.total), currency)}
                </td>
              </tr>
              <tr className="bg-blue-50 font-bold">
                <td className="py-3 px-4 text-gray-900">Disposable Income</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(currentSalary - fromCosts.total, currency)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(displayNewSalary - toCosts.total, currency)}</td>
                <td className={`py-3 px-4 text-right ${(displayNewSalary - toCosts.total) > (currentSalary - fromCosts.total) ? 'text-green-600' : 'text-red-600'}`}>
                  {(displayNewSalary - toCosts.total) > (currentSalary - fromCosts.total) ? '+' : ''}{formatCurrency((displayNewSalary - toCosts.total) - (currentSalary - fromCosts.total), currency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Index Comparison */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Cost Index Comparison</h3>
        
        <div className="space-y-4">
          {comparison.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">{item.category}</span>
                <span className="text-sm text-gray-600">
                  {item.winner === 'from' && `${fromCity.name} wins`}
                  {item.winner === 'to' && `${toCity.name} wins`}
                  {item.winner === 'tie' && 'Similar'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-24 text-sm text-gray-600">{fromCity.name}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className={`absolute inset-0 rounded-full ${item.winner === 'from' ? 'bg-green-500' : 'bg-blue-400'}`}
                        style={{ width: `${(item.fromCity / Math.max(item.fromCity, item.toCity)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm font-semibold text-gray-900">{item.fromCity}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-24 text-sm text-gray-600">{toCity.name}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className={`absolute inset-0 rounded-full ${item.winner === 'to' ? 'bg-green-500' : 'bg-purple-400'}`}
                        style={{ width: `${(item.toCity / Math.max(item.fromCity, item.toCity)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm font-semibold text-gray-900">{item.toCity}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          * Index values: 100 = national average. Lower is better for costs.
        </p>
      </div>

      {/* Housing Market */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 className="text-lg font-bold text-gray-900 mb-4">{fromCity.name} Housing</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Median Rent (1BR)</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(fromCity.medianRent, currency)}/mo</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Median Home Price</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(fromCity.medianHomePrice, currency)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 className="text-lg font-bold text-gray-900 mb-4">{toCity.name} Housing</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Median Rent (1BR)</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(toCity.medianRent, currency)}/mo</div>
              <div className={`text-sm font-semibold ${toCity.medianRent < fromCity.medianRent ? 'text-green-600' : 'text-red-600'}`}>
                {toCity.medianRent < fromCity.medianRent ? '-' : '+'}{formatCurrency(Math.abs(toCity.medianRent - fromCity.medianRent), currency)}/mo
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Median Home Price</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(toCity.medianHomePrice, currency)}</div>
              <div className={`text-sm font-semibold ${toCity.medianHomePrice < fromCity.medianHomePrice ? 'text-green-600' : 'text-red-600'}`}>
                {toCity.medianHomePrice < fromCity.medianHomePrice ? '-' : '+'}{formatCurrency(Math.abs(toCity.medianHomePrice - fromCity.medianHomePrice), currency)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
