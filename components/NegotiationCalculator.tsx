'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import { calculateNegotiation, type NegotiationInput, type CounterOffer } from '@/lib/negotiationCalculations';
import { trackCalculatorUsage, trackCalculatorInteraction } from '@/lib/analytics';

export default function NegotiationCalculator() {
  const { currency } = useCurrency();
  const [input, setInput] = useState<NegotiationInput>({
    currentOffer: 75000,
    yearsExperience: 3,
    marketRate: 85000,
    hasCompetingOffer: false,
    competingOfferAmount: 0,
  });
  const [showScripts, setShowScripts] = useState(false);
  const [copiedScript, setCopiedScript] = useState<'email' | 'phone' | null>(null);

  useEffect(() => {
    trackCalculatorUsage('negotiation_calculator');
  }, []);

  const result = calculateNegotiation(input);

  const updateInput = (field: keyof NegotiationInput, value: string | number | boolean) => {
    setInput(prev => ({ ...prev, [field]: value }));
    trackCalculatorInteraction('negotiation_calculator', `updated_${field}`);
  };

  const copyScript = async (type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(result.scripts[type]);
      setCopiedScript(type);
      setTimeout(() => setCopiedScript(null), 2000);
      trackCalculatorInteraction('negotiation_calculator', `copied_${type}_script`);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getConfidenceColor = (confidence: CounterOffer['confidence']) => {
    switch (confidence) {
      case 'conservative': return 'blue';
      case 'moderate': return 'green';
      case 'aggressive': return 'purple';
    }
  };

  const getConfidenceBadge = (confidence: CounterOffer['confidence']) => {
    const colors = {
      conservative: 'bg-blue-100 text-blue-700 border-blue-300',
      moderate: 'bg-green-100 text-green-700 border-green-300',
      aggressive: 'bg-purple-100 text-purple-700 border-purple-300',
    };
    return colors[confidence];
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Situation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Offer Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
              <input
                type="number"
                value={input.currentOffer || ''}
                onChange={(e) => updateInput('currentOffer', parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              value={input.yearsExperience || ''}
              onChange={(e) => updateInput('yearsExperience', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Market Rate (Research)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
              <input
                type="number"
                value={input.marketRate || ''}
                onChange={(e) => updateInput('marketRate', parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Use Glassdoor, Levels.fyi, or Payscale</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <input
                type="checkbox"
                checked={input.hasCompetingOffer}
                onChange={(e) => updateInput('hasCompetingOffer', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              I have a competing offer
            </label>
            {input.hasCompetingOffer && (
              <div className="relative mt-2">
                <span className="absolute left-3 top-3 text-gray-500">{currency.symbol}</span>
                <input
                  type="number"
                  value={input.competingOfferAmount || ''}
                  onChange={(e) => updateInput('competingOfferAmount', parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Competing offer amount"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Counter Offer */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Recommended Counter Offer</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getConfidenceBadge(result.recommendedOffer.confidence)}`}>
              {result.recommendedOffer.confidence.charAt(0).toUpperCase() + result.recommendedOffer.confidence.slice(1)} Approach
            </span>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-600">
              {formatCurrency(result.recommendedOffer.amount, currency)}
            </div>
            <div className="text-lg text-gray-600 mt-1">
              +{result.recommendedOffer.percentage}% increase
            </div>
          </div>
        </div>
        <p className="text-gray-700">{result.recommendedOffer.reasoning}</p>
      </div>

      {/* All Counter Offers */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">All Counter Offer Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.counterOffers.map((offer, index) => (
            <div
              key={index}
              className={`bg-white border-2 rounded-xl p-4 ${
                offer.amount === result.recommendedOffer.amount
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getConfidenceBadge(offer.confidence)}`}>
                  {offer.confidence}
                </span>
                {offer.amount === result.recommendedOffer.amount && (
                  <span className="text-green-600 font-bold text-sm">✓ Recommended</span>
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(offer.amount, currency)}
              </div>
              <div className="text-sm text-gray-600 mb-2">+{offer.percentage}%</div>
              <p className="text-sm text-gray-700">{offer.reasoning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lifetime Value */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Lifetime Value of Negotiation</h3>
        <p className="text-gray-600 mb-6">
          Negotiating from {formatCurrency(input.currentOffer, currency)} to {formatCurrency(result.recommendedOffer.amount, currency)} adds:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4">
            <div className="text-sm font-semibold text-gray-600 mb-1">1 Year</div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(result.lifetimeValue.oneYear, currency)}
            </div>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-4">
            <div className="text-sm font-semibold text-gray-600 mb-1">3 Years</div>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(result.lifetimeValue.threeYears, currency)}
            </div>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-4">
            <div className="text-sm font-semibold text-gray-600 mb-1">5 Years</div>
            <div className="text-2xl font-bold text-amber-600">
              {formatCurrency(result.lifetimeValue.fiveYears, currency)}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          💡 This doesn't include raises, which compound on your base salary. A higher starting salary means higher raises over time.
        </p>
      </div>

      {/* Negotiation Tips */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Negotiation Tips</h3>
        <ul className="space-y-3">
          {result.negotiationTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scripts */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Negotiation Scripts</h3>
          <button
            onClick={() => setShowScripts(!showScripts)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {showScripts ? 'Hide Scripts' : 'Show Scripts'}
          </button>
        </div>

        {showScripts && (
          <div className="space-y-6">
            {/* Email Script */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">📧 Email Script</h4>
                <button
                  onClick={() => copyScript('email')}
                  className="px-3 py-1.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-semibold"
                >
                  {copiedScript === 'email' ? '✓ Copied!' : 'Copy Script'}
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {result.scripts.email}
                </pre>
              </div>
            </div>

            {/* Phone Script */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">📞 Phone Script</h4>
                <button
                  onClick={() => copyScript('phone')}
                  className="px-3 py-1.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-semibold"
                >
                  {copiedScript === 'phone' ? '✓ Copied!' : 'Copy Script'}
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {result.scripts.phone}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
