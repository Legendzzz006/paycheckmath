'use client';

import { useCurrency } from '@/contexts/CurrencyContext';
import { CURRENCIES } from '@/lib/currencyConfig';
import { useState } from 'react';

export default function CurrencySelector() {
  const { currency, setCurrency, detectedCountry } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (currencyCode: string) => {
    setCurrency(CURRENCIES[currencyCode]);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select currency"
      >
        <span className="text-lg font-semibold">{currency.symbol}</span>
        <span className="text-sm font-medium text-gray-700">{currency.code}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
            {detectedCountry && (
              <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
                <p className="text-xs text-blue-600 font-medium">
                  Auto-detected location
                </p>
              </div>
            )}
            <div className="py-2">
              {Object.values(CURRENCIES).map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                    currency.code === curr.code ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-semibold w-8">{curr.symbol}</span>
                    <div>
                      <div className="font-medium text-gray-900">{curr.code}</div>
                      <div className="text-xs text-gray-500">{curr.name}</div>
                    </div>
                  </div>
                  {currency.code === curr.code && (
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
