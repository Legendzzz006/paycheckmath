'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyConfig, CURRENCIES, getCurrencyByCountry } from '@/lib/currencyConfig';

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrency: (currency: CurrencyConfig) => void;
  detectedCountry: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyConfig>(CURRENCIES.USD);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has a saved preference first
    const savedCurrency = localStorage.getItem('preferredCurrency');
    if (savedCurrency && CURRENCIES[savedCurrency]) {
      setCurrencyState(CURRENCIES[savedCurrency]);
      return;
    }

    // Detect location in background (non-blocking)
    detectUserLocationInBackground();
  }, []);

  const detectUserLocationInBackground = async () => {
    try {
      // Method 1: Try timezone-based detection first (fastest, synchronous)
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const countryFromTimezone = getCountryFromTimezone(timezone);
      
      if (countryFromTimezone) {
        const detectedCurrency = getCurrencyByCountry(countryFromTimezone);
        setDetectedCountry(countryFromTimezone);
        // Only auto-switch if user hasn't manually selected a currency
        if (!localStorage.getItem('preferredCurrency')) {
          setCurrencyState(detectedCurrency);
        }
        return;
      }

      // Method 2: Try IP-based geolocation API (background only, don't block)
      const response = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(2000),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.country_code) {
          const detectedCurrency = getCurrencyByCountry(data.country_code);
          setDetectedCountry(data.country_code);
          // Only auto-switch if user hasn't manually selected a currency
          if (!localStorage.getItem('preferredCurrency')) {
            setCurrencyState(detectedCurrency);
          }
        }
      }
    } catch (error) {
      // Silent fail - user already has USD default
      console.log('Background location detection failed, using USD');
    }
  };

  const setCurrency = (newCurrency: CurrencyConfig) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency.code);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, detectedCountry }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Validate localStorage values before using
function isValidCurrencyCode(code: string): boolean {
  return code in CURRENCIES;
}

// Helper function to map timezone to country
function getCountryFromTimezone(timezone: string): string | null {
  const timezoneMap: Record<string, string> = {
    'America/New_York': 'US',
    'America/Chicago': 'US',
    'America/Denver': 'US',
    'America/Los_Angeles': 'US',
    'America/Phoenix': 'US',
    'America/Toronto': 'CA',
    'America/Vancouver': 'CA',
    'Europe/London': 'GB',
    'Europe/Berlin': 'DE',
    'Europe/Paris': 'FR',
    'Europe/Rome': 'IT',
    'Europe/Madrid': 'ES',
    'Europe/Amsterdam': 'NL',
    'Europe/Brussels': 'BE',
    'Europe/Vienna': 'AT',
    'Europe/Lisbon': 'PT',
    'Europe/Dublin': 'IE',
    'Europe/Helsinki': 'FI',
    'Europe/Athens': 'GR',
    'Europe/Stockholm': 'SE',
    'Europe/Oslo': 'NO',
    'Europe/Copenhagen': 'DK',
    'Europe/Zurich': 'CH',
    'Asia/Tokyo': 'JP',
    'Asia/Shanghai': 'CN',
    'Asia/Kolkata': 'IN',
    'Australia/Sydney': 'AU',
    'Australia/Melbourne': 'AU',
  };

  return timezoneMap[timezone] || null;
}
